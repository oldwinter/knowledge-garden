'use strict';

var obsidian = require('obsidian');

// Simplified Commands Framework
const commands = {}; //new Map;
function command(id, name, hotkeys = [], cmd = {}) {
    // Allow hotkeys to be expressed as a string, array of strings,
    // object, or array of objects.  (Normalize to an array first.)
    if (typeof hotkeys === "string")
        hotkeys = [hotkeys];
    if (typeof hotkeys === "object" && hotkeys.key)
        hotkeys = [hotkeys];
    let keys = hotkeys.map(function (key) {
        // If a hotkey is an object already, no need to process it
        if (typeof key === "object")
            return key;
        // Convert strings to Obsidian's hotkey format
        let parts = key.split("+");
        return { modifiers: parts, key: parts.pop() || "+" }; // empty last part = e.g. 'Mod++'
    });
    Object.assign(cmd, { id, name, hotkeys: keys });
    // Save the command data under a unique symbol
    const sym = Symbol("cmd:" + id);
    commands[sym] = cmd;
    return sym;
}
function addCommands(plugin, cmdset) {
    // Extract command symbols from cmdset and register them, bound to the plugin for methods
    Object.getOwnPropertySymbols(cmdset).forEach(sym => {
        const cmd = commands[sym], method = cmdset[sym];
        if (cmd)
            plugin.addCommand(Object.assign({}, cmd, {
                checkCallback(check) {
                    // Call the method body with the plugin as 'this'
                    const cb = method.call(plugin);
                    // It then returns a closure if the command is ready to execute, and
                    // we call that closure unless this is just a check for availability
                    return (check || typeof cb !== "function") ? !!cb : (cb(), true);
                }
            }));
    });
}

function around(obj, factories) {
    const removers = Object.keys(factories).map(key => around1(obj, key, factories[key]));
    return removers.length === 1 ? removers[0] : function () { removers.forEach(r => r()); };
}
function around1(obj, method, createWrapper) {
    const original = obj[method], hadOwn = obj.hasOwnProperty(method);
    let current = createWrapper(original);
    // Let our wrapper inherit static props from the wrapping method,
    // and the wrapping method, props from the original method
    if (original)
        Object.setPrototypeOf(current, original);
    Object.setPrototypeOf(wrapper, current);
    obj[method] = wrapper;
    // Return a callback to allow safe removal
    return remove;
    function wrapper(...args) {
        // If we have been deactivated and are no longer wrapped, remove ourselves
        if (current === original && obj[method] === wrapper)
            remove();
        return current.apply(this, args);
    }
    function remove() {
        // If no other patches, just do a direct removal
        if (obj[method] === wrapper) {
            if (hadOwn)
                obj[method] = original;
            else
                delete obj[method];
        }
        if (current === original)
            return;
        // Else pass future calls through, and remove wrapper from the prototype chain
        current = original;
        Object.setPrototypeOf(wrapper, original || Function);
    }
}

const HIST_ATTR = "pane-relief:history-v1";
const SERIAL_PROP = "pane-relief:history-v1";
const domLeaves = new WeakMap();
class HistoryEntry {
    constructor(rawState) {
        this.setState(rawState);
    }
    get viewState() {
        return JSON.parse(this.raw.state || "{}");
    }
    setState(rawState) {
        this.raw = rawState;
        this.eState = JSON.parse(rawState.eState || "null");
        this.path = this.viewState.state?.file;
    }
    onRename(file, oldPath) {
        if (this.path === oldPath) {
            const viewState = this.viewState;
            this.path = viewState.state.file = file.path;
            this.raw.state = JSON.stringify(viewState);
        }
    }
    go(leaf) {
        let { viewState, path, eState } = this;
        let file = path && app?.vault.getAbstractFileByPath(path);
        if (path && !file) {
            new obsidian.Notice("Missing file: " + path);
            viewState = { type: "empty", state: {} };
            eState = undefined;
        }
        leaf.setViewState({ ...viewState, active: true, popstate: true }, eState);
    }
    replaceState(rawState) {
        if (rawState.state !== this.raw.state) {
            const viewState = JSON.parse(rawState.state || "{}");
            // Don't replace a file with an empty in the history
            if (viewState.type === "empty")
                return true;
            // File is different from existing file: should be a push instead
            if (this.path && this.path !== viewState?.state?.file)
                return false;
            if (viewState.type === "media-view") {
                const oldInfo = JSON.stringify(this.viewState.state.info);
                const newInfo = JSON.stringify(viewState.state.info);
                if (oldInfo !== newInfo)
                    return false;
            }
        }
        this.setState(rawState);
        return true;
    }
}
class History {
    constructor(leaf, { pos, stack } = { pos: 0, stack: [] }) {
        this.leaf = leaf;
        this.leaf = leaf;
        this.pos = pos;
        this.stack = stack.map(raw => new HistoryEntry(raw));
    }
    static current() {
        return this.forLeaf(app.workspace.activeLeaf) || new this();
    }
    static forLeaf(leaf) {
        if (leaf)
            domLeaves.set(leaf.containerEl, leaf);
        if (leaf)
            return leaf[HIST_ATTR] instanceof this ?
                leaf[HIST_ATTR] :
                leaf[HIST_ATTR] = new this(leaf, leaf[HIST_ATTR]?.serialize() || undefined);
    }
    cloneTo(leaf) {
        return leaf[HIST_ATTR] = new History(leaf, this.serialize());
    }
    onRename(file, oldPath) {
        for (const histEntry of this.stack)
            histEntry.onRename(file, oldPath);
    }
    serialize() { return { pos: this.pos, stack: this.stack.map(e => e.raw) }; }
    get state() { return this.stack[this.pos]?.raw || null; }
    get length() { return this.stack.length; }
    back() { this.go(-1); }
    forward() { this.go(1); }
    lookAhead() { return this.stack.slice(0, this.pos).reverse(); }
    lookBehind() { return this.stack.slice(this.pos + 1); }
    announce() {
        app?.workspace?.trigger("pane-relief:update-history", this.leaf, this);
    }
    goto(pos) {
        if (!this.leaf)
            return;
        if (this.leaf.pinned)
            return new obsidian.Notice("Pinned pane: unpin before going forward or back"), undefined;
        if (this.leaf.working)
            return new obsidian.Notice("Pane is busy: please wait before navigating further"), undefined;
        pos = this.pos = Math.max(0, Math.min(pos, this.stack.length - 1));
        this.stack[pos]?.go(this.leaf);
        this.announce();
    }
    go(by, force) {
        if (!this.leaf || !by)
            return; // no-op
        // prevent wraparound
        const newPos = Math.max(0, Math.min(this.pos - by, this.stack.length - 1));
        if (force || newPos !== this.pos) {
            this.goto(newPos);
        }
        else {
            new obsidian.Notice(`No more ${by < 0 ? "back" : "forward"} history for pane`);
        }
    }
    replaceState(rawState, title, url) {
        const entry = this.stack[this.pos];
        if (!entry) {
            this.stack[this.pos] = new HistoryEntry(rawState);
        }
        else if (!entry.replaceState(rawState)) {
            // replaceState was erroneously called with a new file for the same leaf;
            // force a pushState instead (fixes the issue reported here: https://forum.obsidian.md/t/18518)
            this.pushState(rawState, title, url);
        }
    }
    pushState(rawState, title, url) {
        //console.log("pushing", rawState)
        this.stack.splice(0, this.pos, new HistoryEntry(rawState));
        this.pos = 0;
        // Limit "back" to 20
        while (this.stack.length > 20)
            this.stack.pop();
        this.announce();
    }
}
function installHistory(plugin) {
    // Monkeypatch: include history in leaf serialization (so it's persisted with the workspace)
    // and check for popstate events (to suppress them)
    plugin.register(around(obsidian.WorkspaceLeaf.prototype, {
        serialize(old) {
            return function serialize() {
                const result = old.call(this);
                if (this[HIST_ATTR])
                    result[SERIAL_PROP] = this[HIST_ATTR].serialize();
                return result;
            };
        },
        setViewState(old) {
            return function setViewState(vs, es) {
                if (vs.popstate && window.event?.type === "popstate") {
                    return Promise.resolve();
                }
                return old.call(this, vs, es);
            };
        }
    }));
    plugin.register(around(app.workspace, {
        // Monkeypatch: load history during leaf load, if present
        deserializeLayout(old) {
            return async function deserializeLayout(state, ...etc) {
                let result = await old.call(this, state, ...etc);
                if (state.type === "leaf") {
                    if (!result) {
                        // Retry loading the pane as an empty
                        state.state.type = 'empty';
                        result = await old.call(this, state, ...etc);
                        if (!result)
                            return result;
                    }
                    if (state[SERIAL_PROP])
                        result[HIST_ATTR] = new History(result, state[SERIAL_PROP]);
                }
                return result;
            };
        },
        // Monkeypatch: keep Obsidian from pushing history in setActiveLeaf
        setActiveLeaf(old) {
            return function setActiveLeaf(leaf, ...etc) {
                const unsub = around(this, {
                    recordHistory(old) {
                        return function (leaf, _push, ...args) {
                            // Always update state in place
                            return old.call(this, leaf, false, ...args);
                        };
                    }
                });
                try {
                    return old.call(this, leaf, ...etc);
                }
                finally {
                    unsub();
                }
            };
        },
    }));
    // Override default mouse history behavior.  We need this because 1) Electron will use the built-in
    // history object if we don't (instead of our wrapper), and 2) we want the click to apply to the leaf
    // that was under the mouse, rather than whichever leaf was active.
    document.addEventListener("mouseup", historyHandler, true);
    plugin.register(() => {
        document.removeEventListener("mouseup", historyHandler, true);
    });
    function historyHandler(e) {
        if (e.button !== 3 && e.button !== 4)
            return;
        e.preventDefault();
        e.stopPropagation(); // prevent default behavior
        const target = e.target.matchParent(".workspace-leaf");
        if (target && e.type === "mouseup") {
            let leaf = domLeaves.get(target);
            if (!leaf)
                app.workspace.iterateAllLeaves(l => leaf = (l.containerEl === target) ? l : leaf);
            if (!leaf)
                return false;
            if (e.button == 3) {
                History.forLeaf(leaf).back();
            }
            if (e.button == 4) {
                History.forLeaf(leaf).forward();
            }
        }
        return false;
    }
    // Proxy the window history with a wrapper that delegates to the active leaf's History object,
    const realHistory = window.history;
    plugin.register(() => window.history = realHistory);
    Object.defineProperty(window, "history", { enumerable: true, configurable: true, writable: true, value: {
            get state() { return History.current().state; },
            get length() { return History.current().length; },
            back() { this.go(-1); },
            forward() { this.go(1); },
            go(by) { History.current().go(by); },
            replaceState(state, title, url) { History.current().replaceState(state, title, url); },
            pushState(state, title, url) { History.current().pushState(state, title, url); },
            get scrollRestoration() { return realHistory.scrollRestoration; },
            set scrollRestoration(val) { realHistory.scrollRestoration = val; },
        } });
}

/**
 * Component that belongs to a plugin + window. e.g.:
 *
 *     class TitleWidget extends PerWindowComponent<MyPlugin> {
 *         onload() {
 *             // do stuff with this.plugin and this.win ...
 *         }
 *     }
 *
 *     class MyPlugin extends Plugin {
 *         titleWidgets = TitleWidget.perWindow(this);
 *         ...
 *     }
 *
 * This will automatically create a title widget for each window as it's opened, and
 * on plugin load.  The plugin's `.titleWidgets` will also be a WindowManager that can
 * look up the title widget for a given window, leaf, or view, or return a list of
 * all of them.  See WindowManager for the full API.
 *
 * If you want your components to be created on demand instead of automatically when
 * window(s) are opened, you can pass `false` as the second argument to `perWindow()`.
 */
class PerWindowComponent extends obsidian.Component {
    constructor(plugin, win, root) {
        super();
        this.plugin = plugin;
        this.win = win;
        this.root = root;
    }
    static perWindow(plugin) {
        return new WindowManager(plugin, this);
    }
}
/**
 * Manage per-window components
 */
class WindowManager extends obsidian.Component {
    constructor(plugin, factory) {
        super();
        this.plugin = plugin;
        this.factory = factory;
        this.instances = new WeakMap();
        this.watching = false;
        plugin.addChild(this);
    }
    watch() {
        // Defer watch until plugin is loaded
        if (!this._loaded)
            this.onload = () => this.watch();
        else if (!this.watching) {
            const { workspace } = app;
            this.watching = true;
            this.registerEvent(workspace.on("window-open", (_, win) => {
                workspace.onLayoutReady(() => setImmediate(() => this.forWindow(win)));
            }));
            workspace.onLayoutReady(() => setImmediate(() => this.forAll()));
        }
        return this;
    }
    forWindow(win = window.activeWindow ?? window, create = true) {
        let inst = this.instances.get(win);
        if (!inst && create) {
            inst = new this.factory(this.plugin, win, containerForWindow(win));
            if (inst) {
                this.instances.set(win, inst);
                inst.registerDomEvent(win, "beforeunload", () => {
                    this.removeChild(inst);
                    this.instances.delete(win);
                });
                this.addChild(inst);
            }
        }
        return inst || undefined;
    }
    forDom(el, create = true) {
        return this.forWindow(windowForDom(el), create);
    }
    forLeaf(leaf, create = true) {
        return this.forDom(leaf.containerEl, create);
    }
    forView(view, create = true) {
        return this.forDom(view.containerEl, create);
    }
    windows() {
        const windows = [window], { floatingSplit } = app.workspace;
        if (floatingSplit) {
            for (const split of floatingSplit.children)
                if (split.win)
                    windows.push(split.win);
        }
        return windows;
    }
    forAll(create = true) {
        return this.windows().map(win => this.forWindow(win, create)).filter(t => t);
    }
}
function windowForDom(el) {
    return (el.ownerDocument || el).defaultView;
}
function containerForWindow(win) {
    if (win === window)
        return app.workspace.rootSplit;
    const { floatingSplit } = app.workspace;
    if (floatingSplit) {
        for (const split of floatingSplit.children)
            if (win === split.win)
                return split;
    }
}

const viewtypeIcons = {
    markdown: "document",
    image: "image-file",
    audio: "audio-file",
    video: "audio-file",
    pdf: "pdf-file",
    localgraph: "dot-network",
    outline: "bullet-list",
    backlink: "link",
    // third-party plugins
    kanban: "blocks",
    excalidraw: "excalidraw-icon",
    "media-view": "audio-file",
};
const nonFileViews = {
    graph: ["dot-network", "Graph View"],
    "file-explorer": ["folder", "File Explorer"],
    starred: ["star", "Starred Files"],
    tag: ["tag", "Tags View"],
    // third-party plugins
    "recent-files": ["clock", "Recent Files"],
    calendar: ["calendar-with-checkmark", "Calendar"],
    empty: ["cross", "No file"]
};
class Navigation extends PerWindowComponent {
    constructor() {
        super(...arguments);
        // Set to true while either menu is open, so we don't switch it out
        this.historyIsOpen = false;
    }
    display(leaf = this.latestLeaf()) {
        if (this.historyIsOpen)
            return;
        if (!this._loaded) {
            this.load();
            return;
        }
        this.win.requestAnimationFrame(() => {
            const history = leaf ? History.forLeaf(leaf) : new History();
            this.back.setHistory(history);
            this.forward.setHistory(history);
            this.updateLeaf(leaf, history);
        });
    }
    leaves() {
        const leaves = [];
        const cb = (leaf) => { leaves.push(leaf); };
        app.workspace.iterateLeaves(cb, this.root);
        // Support Hover Editors
        const popovers = app.plugins.plugins["obsidian-hover-editor"]?.activePopovers;
        if (popovers)
            for (const popover of popovers) {
                if (popover.hoverEl.ownerDocument.defaultView !== this.win)
                    continue; // must be in same window
                else if (popover.rootSplit)
                    app.workspace.iterateLeaves(cb, popover.rootSplit);
                else if (popover.leaf)
                    cb(popover.leaf);
            }
        return leaves;
    }
    latestLeaf() {
        let leaf = app.workspace.activeLeaf;
        if (leaf && this.plugin.nav.forLeaf(leaf) === this)
            return leaf;
        return this.leaves().reduce((best, leaf) => { return (!best || best.activeTime < leaf.activeTime) ? leaf : best; });
    }
    onload() {
        app.workspace.onLayoutReady(() => {
            this.addChild(this.back = new Navigator(this, "back", -1));
            this.addChild(this.forward = new Navigator(this, "forward", 1));
            this.display();
            this.numberPanes();
            this.registerEvent(app.workspace.on("layout-change", this.numberPanes, this));
            this.register(
            // Support "Customizable Page Header and Title Bar" buttons
            onElement(this.win.document.body, "contextmenu", ".view-header > .view-actions > .view-action", (evt, target) => {
                const dir = ((target.matches('[class*=" app:go-forward"]') && "forward") ||
                    (target.matches('[class*=" app:go-back"]') && "back"));
                if (!dir)
                    return;
                const el = target.matchParent(".workspace-leaf");
                const leaf = this.leaves().filter(leaf => leaf.containerEl === el).pop();
                if (!leaf)
                    return;
                evt.preventDefault();
                evt.stopImmediatePropagation();
                this.display(leaf);
                this[dir].openMenu(evt);
            }, { capture: true }));
        });
    }
    onunload() {
        this.unNumberPanes();
        this.win.document.body.findAll(".workspace-leaf").forEach(leafEl => {
            // Restore CPHATB button labels
            const actions = leafEl.find(".view-header > .view-actions");
            const fwd = actions?.find('.view-action[class*=" app:go-forward"]');
            const back = actions?.find('.view-action[class*=" app:go-back"]');
            if (fwd)
                setTooltip(fwd, this.forward.oldLabel);
            if (back)
                setTooltip(fwd, this.back.oldLabel);
        });
    }
    unNumberPanes(selector = ".workspace-leaf") {
        this.win.document.body.findAll(selector).forEach(el => {
            el.style.removeProperty("--pane-relief-label");
            el.toggleClass("has-pane-relief-label", false);
            el.style.removeProperty("--pane-relief-forward-count");
            el.style.removeProperty("--pane-relief-backward-count");
        });
    }
    updateLeaf(leaf, history = History.forLeaf(leaf)) {
        leaf.containerEl.style.setProperty("--pane-relief-forward-count", '"' + (history.lookAhead().length || "") + '"');
        leaf.containerEl.style.setProperty("--pane-relief-backward-count", '"' + (history.lookBehind().length || "") + '"');
        // Add labels for CPHATB nav buttons
        const actions = leaf.containerEl.find(".view-header > .view-actions");
        const fwd = actions?.find('.view-action[class*=" app:go-forward"]');
        const back = actions?.find('.view-action[class*=" app:go-back"]');
        if (fwd)
            this.forward.updateDisplay(history, fwd);
        if (back)
            this.back.updateDisplay(history, back);
    }
    numberPanes() {
        this.win.requestAnimationFrame(() => {
            // unnumber sidebar panes in main window, if something was moved there
            if (this.win === window)
                this.unNumberPanes(".workspace-tabs > .workspace-leaf");
            let count = 0, lastLeaf = null;
            this.leaves().forEach(leaf => {
                leaf.containerEl.style.setProperty("--pane-relief-label", ++count < 9 ? "" + count : "");
                leaf.containerEl.toggleClass("has-pane-relief-label", count < 9);
                lastLeaf = leaf;
                this.updateLeaf(leaf);
            });
            if (count > 8) {
                lastLeaf?.containerEl.style.setProperty("--pane-relief-label", "9");
                lastLeaf?.containerEl.toggleClass("has-pane-relief-label", true);
            }
        });
    }
    onUpdateHistory(leaf, history) {
        this.win.requestAnimationFrame(() => {
            this.updateLeaf(leaf); // update leaf's stats and buttons
            // update window's nav arrows
            if (history === this.forward.history)
                this.forward.setHistory(history);
            if (history === this.back.history)
                this.back.setHistory(history);
        });
    }
}
class Navigator extends obsidian.Component {
    constructor(owner, kind, dir) {
        super();
        this.owner = owner;
        this.kind = kind;
        this.dir = dir;
        this.history = null;
    }
    onload() {
        this.containerEl = this.owner.win.document.body.find(`.titlebar .titlebar-button-container.mod-left .titlebar-button.mod-${this.kind}`);
        this.count = this.containerEl.createSpan({ prepend: this.kind === "back", cls: "history-counter" });
        this.history = null;
        this.states = [];
        this.oldLabel = this.containerEl.getAttribute("aria-label");
        this.registerDomEvent(this.containerEl, "contextmenu", this.openMenu.bind(this));
        const onClick = (e) => {
            // Don't allow Obsidian to switch window or forward the event
            e.preventDefault();
            e.stopImmediatePropagation();
            // Do the navigation
            this.history?.[this.kind]();
        };
        this.register(() => this.containerEl.removeEventListener("click", onClick, true));
        this.containerEl.addEventListener("click", onClick, true);
    }
    onunload() {
        setTooltip(this.containerEl, this.oldLabel);
        this.count.detach();
        this.containerEl.toggleClass("mod-active", false);
    }
    setCount(num) { this.count.textContent = "" + (num || ""); }
    setHistory(history = History.current()) {
        this.updateDisplay(this.history = history);
    }
    updateDisplay(history, el = this.containerEl) {
        const states = this.states = history[this.dir < 0 ? "lookBehind" : "lookAhead"]();
        if (el === this.containerEl)
            this.setCount(states.length);
        setTooltip(el, states.length ?
            this.oldLabel + "\n" + this.formatState(states[0]).title :
            `No ${this.kind} history`);
        el.toggleClass("mod-active", states.length > 0);
    }
    openMenu(evt) {
        if (!this.states.length)
            return;
        const menu = new obsidian.Menu();
        menu.dom.addClass("pane-relief-history-menu");
        menu.dom.on("mousedown", ".menu-item", e => { e.stopPropagation(); }, true);
        this.states.map(this.formatState.bind(this)).forEach((info, idx) => this.menuItem(info, idx, menu));
        menu.showAtPosition({ x: evt.clientX, y: evt.clientY + 20 });
        this.owner.historyIsOpen = true;
        menu.onHide(() => { this.owner.historyIsOpen = false; this.owner.display(); });
    }
    menuItem(info, idx, menu) {
        const my = this;
        menu.addItem(i => { createItem(i); if (info.file)
            setupFileEvents(i.dom); });
        return;
        function createItem(i, prefix = "") {
            i.setIcon(info.icon).setTitle(prefix + info.title).onClick(e => {
                let history = my.history;
                // Check for ctrl/cmd/middle button and split leaf + copy history
                if (obsidian.Keymap.isModifier(e, "Mod") || 1 === e.button) {
                    history = history.cloneTo(app.workspace.splitActiveLeaf());
                }
                history.go((idx + 1) * my.dir, true);
            });
        }
        function setupFileEvents(dom) {
            // Hover preview
            dom.addEventListener('mouseover', e => {
                app.workspace.trigger('hover-link', {
                    event: e, source: Navigator.hoverSource,
                    hoverParent: menu.dom, targetEl: dom, linktext: info.file.path
                });
            });
            // Drag menu item to move or link file
            dom.setAttr('draggable', 'true');
            dom.addEventListener('dragstart', e => {
                const dragManager = app.dragManager;
                const dragData = dragManager.dragFile(e, info.file);
                dragManager.onDragStart(e, dragData);
            });
            dom.addEventListener('dragend', e => menu.hide());
            // File menu
            dom.addEventListener("contextmenu", e => {
                const menu = new obsidian.Menu();
                menu.addItem(i => createItem(i, `Go ${my.kind} to `)).addSeparator();
                app.workspace.trigger("file-menu", menu, info.file, "link-context-menu");
                menu.showAtPosition({ x: e.clientX, y: e.clientY });
                e.stopPropagation(); // keep the parent menu open for now
            }, true);
        }
    }
    formatState(entry) {
        const { viewState: { type, state }, eState, path } = entry;
        const file = path && app.vault.getAbstractFileByPath(path);
        const info = { icon: "", title: "", file, type, state, eState };
        if (nonFileViews[type]) {
            [info.icon, info.title] = nonFileViews[type];
        }
        else if (path && !file) {
            [info.icon, info.title] = ["trash", "Missing file " + path];
        }
        else if (file instanceof obsidian.TFile) {
            info.icon = viewtypeIcons[type] ?? "document";
            if (type === "markdown" && state.mode === "preview")
                info.icon = "lines-of-text";
            info.title = file ? file.basename + (file.extension !== "md" ? "." + file.extension : "") : "No file";
            if (type === "media-view" && !file)
                info.title = state.info?.filename ?? info.title;
        }
        app.workspace.trigger("pane-relief:format-history-item", info);
        return info;
    }
}
Navigator.hoverSource = "pane-relief:history-menu";
function onElement(el, event, selector, callback, options) {
    el.on(event, selector, callback, options);
    return () => el.off(event, selector, callback, options);
}
function setTooltip(el, text) {
    if (text)
        el.setAttribute("aria-label", text || undefined);
    else
        el.removeAttribute("aria-label");
}

class PaneRelief extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.nav = new WindowManager(this, Navigation).watch();
    }
    onload() {
        installHistory(this);
        this.app.workspace.registerHoverLinkSource(Navigator.hoverSource, {
            display: 'History dropdowns', defaultMod: true
        });
        this.app.workspace.onLayoutReady(() => {
            this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
                if (file instanceof obsidian.TFile)
                    this.app.workspace.iterateAllLeaves(leaf => History.forLeaf(leaf).onRename(file, oldPath));
            }));
            this.registerEvent(app.workspace.on("active-leaf-change", leaf => this.nav.forLeaf(leaf).display(leaf)));
            this.registerEvent(app.workspace.on("pane-relief:update-history", (leaf, history) => this.nav.forLeaf(leaf).onUpdateHistory(leaf, history)));
        });
        addCommands(this, {
            [command("swap-prev", "Swap pane with previous in split", "Mod+Shift+PageUp")]() { return this.leafPlacer(-1); },
            [command("swap-next", "Swap pane with next in split", "Mod+Shift+PageDown")]() { return this.leafPlacer(1); },
            [command("go-prev", "Cycle to previous workspace pane", "Mod+PageUp")]() { return () => this.gotoNthLeaf(-1, true); },
            [command("go-next", "Cycle to next workspace pane", "Mod+PageDown")]() { return () => this.gotoNthLeaf(1, true); },
            [command("win-prev", "Cycle to previous window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(-1, true); },
            [command("win-next", "Cycle to next window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(1, true); },
            [command("go-1st", "Jump to 1st pane in the workspace", "Alt+1")]() { return () => this.gotoNthLeaf(0); },
            [command("go-2nd", "Jump to 2nd pane in the workspace", "Alt+2")]() { return () => this.gotoNthLeaf(1); },
            [command("go-3rd", "Jump to 3rd pane in the workspace", "Alt+3")]() { return () => this.gotoNthLeaf(2); },
            [command("go-4th", "Jump to 4th pane in the workspace", "Alt+4")]() { return () => this.gotoNthLeaf(3); },
            [command("go-5th", "Jump to 5th pane in the workspace", "Alt+5")]() { return () => this.gotoNthLeaf(4); },
            [command("go-6th", "Jump to 6th pane in the workspace", "Alt+6")]() { return () => this.gotoNthLeaf(5); },
            [command("go-7th", "Jump to 7th pane in the workspace", "Alt+7")]() { return () => this.gotoNthLeaf(6); },
            [command("go-8th", "Jump to 8th pane in the workspace", "Alt+8")]() { return () => this.gotoNthLeaf(7); },
            [command("go-last", "Jump to last pane in the workspace", "Alt+9")]() { return () => this.gotoNthLeaf(99999999); },
            [command("win-1st", "Switch to 1st window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(0); },
            [command("win-2nd", "Switch to 2nd window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(1); },
            [command("win-3rd", "Switch to 3rd window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(2); },
            [command("win-4th", "Switch to 4th window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(3); },
            [command("win-5th", "Switch to 5th window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(4); },
            [command("win-6th", "Switch to 6th window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(5); },
            [command("win-7th", "Switch to 7th window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(6); },
            [command("win-8th", "Switch to 8th window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(7); },
            [command("win-last", "Switch to last window", [])]() { if (app.workspace.floatingSplit?.children.length)
                return () => this.gotoNthWindow(99999999); },
            [command("put-1st", "Place as 1st pane in the split", "Mod+Alt+1")]() { return () => this.placeLeaf(0, false); },
            [command("put-2nd", "Place as 2nd pane in the split", "Mod+Alt+2")]() { return () => this.placeLeaf(1, false); },
            [command("put-3rd", "Place as 3rd pane in the split", "Mod+Alt+3")]() { return () => this.placeLeaf(2, false); },
            [command("put-4th", "Place as 4th pane in the split", "Mod+Alt+4")]() { return () => this.placeLeaf(3, false); },
            [command("put-5th", "Place as 5th pane in the split", "Mod+Alt+5")]() { return () => this.placeLeaf(4, false); },
            [command("put-6th", "Place as 6th pane in the split", "Mod+Alt+6")]() { return () => this.placeLeaf(5, false); },
            [command("put-7th", "Place as 7th pane in the split", "Mod+Alt+7")]() { return () => this.placeLeaf(6, false); },
            [command("put-8th", "Place as 8th pane in the split", "Mod+Alt+8")]() { return () => this.placeLeaf(7, false); },
            [command("put-last", "Place as last pane in the split", "Mod+Alt+9")]() { return () => this.placeLeaf(99999999, false); }
        });
    }
    onunload() {
        this.app.workspace.unregisterHoverLinkSource(Navigator.hoverSource);
    }
    gotoNthLeaf(n, relative) {
        const nav = this.nav.forLeaf(app.workspace.activeLeaf);
        const leaf = gotoNth(nav.leaves(), this.app.workspace.activeLeaf, n, relative);
        !leaf || this.app.workspace.setActiveLeaf(leaf, true, true);
    }
    gotoNthWindow(n, relative) {
        const nav = gotoNth(this.nav.forAll(), this.nav.forLeaf(app.workspace.activeLeaf), n, relative);
        const leaf = nav?.latestLeaf();
        if (leaf)
            app.workspace.setActiveLeaf(leaf, true, true);
        nav?.win.require?.('electron')?.remote?.getCurrentWindow()?.focus();
    }
    placeLeaf(toPos, relative = true) {
        const cb = this.leafPlacer(toPos, relative);
        if (cb)
            cb();
    }
    leafPlacer(toPos, relative = true) {
        const leaf = this.app.workspace.activeLeaf;
        if (!leaf)
            return false;
        const parentSplit = leaf.parentSplit, children = parentSplit.children, fromPos = children.indexOf(leaf);
        if (fromPos == -1)
            return false;
        if (relative) {
            toPos += fromPos;
            if (toPos < 0 || toPos >= children.length)
                return false;
        }
        else {
            if (toPos >= children.length)
                toPos = children.length - 1;
            if (toPos < 0)
                toPos = 0;
        }
        if (fromPos == toPos)
            return false;
        return () => {
            const other = children[toPos];
            children.splice(fromPos, 1);
            children.splice(toPos, 0, leaf);
            if (parentSplit.selectTab) {
                parentSplit.selectTab(leaf);
            }
            else {
                other.containerEl.insertAdjacentElement(fromPos > toPos ? "beforebegin" : "afterend", leaf.containerEl);
                parentSplit.recomputeChildrenDimensions();
                leaf.onResize();
                this.app.workspace.onLayoutChange();
                // Force focus back to pane;
                this.app.workspace.activeLeaf = null;
                this.app.workspace.setActiveLeaf(leaf, false, true);
            }
        };
    }
}
function gotoNth(items, current, n, relative) {
    if (relative) {
        n += items.indexOf(current);
        n = (n + items.length) % items.length; // wrap around
    }
    return items[n >= items.length ? items.length - 1 : n];
}

module.exports = PaneRelief;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzLnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL21vbmtleS1hcm91bmRAMi4zLjAvbm9kZV9tb2R1bGVzL21vbmtleS1hcm91bmQvbWpzL2luZGV4LmpzIiwic3JjL0hpc3RvcnkudHMiLCJzcmMvUGVyV2luZG93Q29tcG9uZW50LnRzIiwic3JjL05hdmlnYXRvci50cyIsInNyYy9wYW5lLXJlbGllZi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTaW1wbGlmaWVkIENvbW1hbmRzIEZyYW1ld29ya1xuXG5pbXBvcnQge0NvbW1hbmQsIEhvdGtleSwgTW9kaWZpZXIsIFBsdWdpbn0gZnJvbSBcIm9ic2lkaWFuXCJcblxudHlwZSBLZXlEZWYgPSBIb3RrZXkgfCBzdHJpbmdcblxuY29uc3QgY29tbWFuZHM6IFJlY29yZDxzeW1ib2wsIENvbW1hbmQ+ID0ge307IC8vbmV3IE1hcDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1hbmQoaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBob3RrZXlzOiBLZXlEZWYgfCBLZXlEZWZbXSA9IFtdLCBjbWQ9e30pIHtcblxuICAgIC8vIEFsbG93IGhvdGtleXMgdG8gYmUgZXhwcmVzc2VkIGFzIGEgc3RyaW5nLCBhcnJheSBvZiBzdHJpbmdzLFxuICAgIC8vIG9iamVjdCwgb3IgYXJyYXkgb2Ygb2JqZWN0cy4gIChOb3JtYWxpemUgdG8gYW4gYXJyYXkgZmlyc3QuKVxuICAgIGlmICh0eXBlb2YgaG90a2V5cyA9PT0gXCJzdHJpbmdcIikgaG90a2V5cyA9IFtob3RrZXlzXTtcbiAgICBpZiAodHlwZW9mIGhvdGtleXMgPT09IFwib2JqZWN0XCIgJiYgKGhvdGtleXMgYXMgSG90a2V5KS5rZXkpIGhvdGtleXMgPSBbaG90a2V5cyBhcyBIb3RrZXldO1xuXG4gICAgbGV0IGtleXM6IEhvdGtleVtdID0gKGhvdGtleXMgYXMgS2V5RGVmW10pLm1hcChmdW5jdGlvbihrZXkpOiBIb3RrZXkge1xuICAgICAgICAvLyBJZiBhIGhvdGtleSBpcyBhbiBvYmplY3QgYWxyZWFkeSwgbm8gbmVlZCB0byBwcm9jZXNzIGl0XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKSByZXR1cm4ga2V5O1xuICAgICAgICAvLyBDb252ZXJ0IHN0cmluZ3MgdG8gT2JzaWRpYW4ncyBob3RrZXkgZm9ybWF0XG4gICAgICAgIGxldCBwYXJ0cyA9IGtleS5zcGxpdChcIitcIilcbiAgICAgICAgcmV0dXJuIHsgbW9kaWZpZXJzOiBwYXJ0cyBhcyBNb2RpZmllcltdLCBrZXk6IHBhcnRzLnBvcCgpIHx8IFwiK1wiIH0gIC8vIGVtcHR5IGxhc3QgcGFydCA9IGUuZy4gJ01vZCsrJ1xuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oY21kLCB7aWQsIG5hbWUsIGhvdGtleXM6IGtleXN9KTtcblxuICAgIC8vIFNhdmUgdGhlIGNvbW1hbmQgZGF0YSB1bmRlciBhIHVuaXF1ZSBzeW1ib2xcbiAgICBjb25zdCBzeW0gPSBTeW1ib2woXCJjbWQ6XCIgKyBpZCk7XG4gICAgY29tbWFuZHNbc3ltXSA9IGNtZCBhcyBDb21tYW5kO1xuICAgIHJldHVybiBzeW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDb21tYW5kczxQIGV4dGVuZHMgUGx1Z2luPihcbiAgICBwbHVnaW46IFAsXG4gICAgY21kc2V0OiBSZWNvcmQ8c3ltYm9sLCAodGhpc0FyZzogUCkgPT4gYm9vbGVhbiB8ICgoKSA9PiBhbnkpPlxuKSB7XG4gICAgLy8gRXh0cmFjdCBjb21tYW5kIHN5bWJvbHMgZnJvbSBjbWRzZXQgYW5kIHJlZ2lzdGVyIHRoZW0sIGJvdW5kIHRvIHRoZSBwbHVnaW4gZm9yIG1ldGhvZHNcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGNtZHNldCkuZm9yRWFjaChzeW0gPT4ge1xuICAgICAgICBjb25zdCBjbWQgPSBjb21tYW5kc1tzeW1dLCBtZXRob2QgPSBjbWRzZXRbc3ltXTtcbiAgICAgICAgaWYgKGNtZCkgcGx1Z2luLmFkZENvbW1hbmQoT2JqZWN0LmFzc2lnbih7fSwgY21kLCB7XG4gICAgICAgICAgICBjaGVja0NhbGxiYWNrKGNoZWNrOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgbWV0aG9kIGJvZHkgd2l0aCB0aGUgcGx1Z2luIGFzICd0aGlzJ1xuICAgICAgICAgICAgICAgIGNvbnN0IGNiID0gbWV0aG9kLmNhbGwocGx1Z2luKTtcbiAgICAgICAgICAgICAgICAvLyBJdCB0aGVuIHJldHVybnMgYSBjbG9zdXJlIGlmIHRoZSBjb21tYW5kIGlzIHJlYWR5IHRvIGV4ZWN1dGUsIGFuZFxuICAgICAgICAgICAgICAgIC8vIHdlIGNhbGwgdGhhdCBjbG9zdXJlIHVubGVzcyB0aGlzIGlzIGp1c3QgYSBjaGVjayBmb3IgYXZhaWxhYmlsaXR5XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjaGVjayB8fCB0eXBlb2YgY2IgIT09IFwiZnVuY3Rpb25cIikgPyAhIWNiIDogKGNiKCksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSlcbn0iLCJleHBvcnQgZnVuY3Rpb24gYXJvdW5kKG9iaiwgZmFjdG9yaWVzKSB7XG4gICAgY29uc3QgcmVtb3ZlcnMgPSBPYmplY3Qua2V5cyhmYWN0b3JpZXMpLm1hcChrZXkgPT4gYXJvdW5kMShvYmosIGtleSwgZmFjdG9yaWVzW2tleV0pKTtcbiAgICByZXR1cm4gcmVtb3ZlcnMubGVuZ3RoID09PSAxID8gcmVtb3ZlcnNbMF0gOiBmdW5jdGlvbiAoKSB7IHJlbW92ZXJzLmZvckVhY2gociA9PiByKCkpOyB9O1xufVxuZnVuY3Rpb24gYXJvdW5kMShvYmosIG1ldGhvZCwgY3JlYXRlV3JhcHBlcikge1xuICAgIGNvbnN0IG9yaWdpbmFsID0gb2JqW21ldGhvZF0sIGhhZE93biA9IG9iai5oYXNPd25Qcm9wZXJ0eShtZXRob2QpO1xuICAgIGxldCBjdXJyZW50ID0gY3JlYXRlV3JhcHBlcihvcmlnaW5hbCk7XG4gICAgLy8gTGV0IG91ciB3cmFwcGVyIGluaGVyaXQgc3RhdGljIHByb3BzIGZyb20gdGhlIHdyYXBwaW5nIG1ldGhvZCxcbiAgICAvLyBhbmQgdGhlIHdyYXBwaW5nIG1ldGhvZCwgcHJvcHMgZnJvbSB0aGUgb3JpZ2luYWwgbWV0aG9kXG4gICAgaWYgKG9yaWdpbmFsKVxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY3VycmVudCwgb3JpZ2luYWwpO1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBjdXJyZW50KTtcbiAgICBvYmpbbWV0aG9kXSA9IHdyYXBwZXI7XG4gICAgLy8gUmV0dXJuIGEgY2FsbGJhY2sgdG8gYWxsb3cgc2FmZSByZW1vdmFsXG4gICAgcmV0dXJuIHJlbW92ZTtcbiAgICBmdW5jdGlvbiB3cmFwcGVyKC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBiZWVuIGRlYWN0aXZhdGVkIGFuZCBhcmUgbm8gbG9uZ2VyIHdyYXBwZWQsIHJlbW92ZSBvdXJzZWx2ZXNcbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG9yaWdpbmFsICYmIG9ialttZXRob2RdID09PSB3cmFwcGVyKVxuICAgICAgICAgICAgcmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICAgIC8vIElmIG5vIG90aGVyIHBhdGNoZXMsIGp1c3QgZG8gYSBkaXJlY3QgcmVtb3ZhbFxuICAgICAgICBpZiAob2JqW21ldGhvZF0gPT09IHdyYXBwZXIpIHtcbiAgICAgICAgICAgIGlmIChoYWRPd24pXG4gICAgICAgICAgICAgICAgb2JqW21ldGhvZF0gPSBvcmlnaW5hbDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW21ldGhvZF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPT09IG9yaWdpbmFsKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBFbHNlIHBhc3MgZnV0dXJlIGNhbGxzIHRocm91Z2gsIGFuZCByZW1vdmUgd3JhcHBlciBmcm9tIHRoZSBwcm90b3R5cGUgY2hhaW5cbiAgICAgICAgY3VycmVudCA9IG9yaWdpbmFsO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2Yod3JhcHBlciwgb3JpZ2luYWwgfHwgRnVuY3Rpb24pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWR1cGUoa2V5LCBvbGRGbiwgbmV3Rm4pIHtcbiAgICBjaGVja1trZXldID0ga2V5O1xuICAgIHJldHVybiBjaGVjaztcbiAgICBmdW5jdGlvbiBjaGVjayguLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiAob2xkRm5ba2V5XSA9PT0ga2V5ID8gb2xkRm4gOiBuZXdGbikuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyKHByb21pc2UsIGNiKSB7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbihjYiwgY2IpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZShhc3luY0Z1bmN0aW9uKSB7XG4gICAgbGV0IGxhc3RSdW4gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICBmdW5jdGlvbiB3cmFwcGVyKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGxhc3RSdW4gPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIGFmdGVyKGxhc3RSdW4sICgpID0+IHtcbiAgICAgICAgICAgICAgICBhc3luY0Z1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpLnRoZW4ocmVzLCByZWopO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB3cmFwcGVyLmFmdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbGFzdFJ1biA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4geyBhZnRlcihsYXN0UnVuLCByZXMpOyB9KTtcbiAgICB9O1xuICAgIHJldHVybiB3cmFwcGVyO1xufVxuIiwiaW1wb3J0IHtOb3RpY2UsIFRBYnN0cmFjdEZpbGUsIFZpZXdTdGF0ZSwgV29ya3NwYWNlTGVhZn0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHthcm91bmR9IGZyb20gXCJtb25rZXktYXJvdW5kXCI7XG5pbXBvcnQgUGFuZVJlbGllZiBmcm9tIFwiLi9wYW5lLXJlbGllZlwiO1xuXG5jb25zdCBISVNUX0FUVFIgPSBcInBhbmUtcmVsaWVmOmhpc3RvcnktdjFcIjtcbmNvbnN0IFNFUklBTF9QUk9QID0gXCJwYW5lLXJlbGllZjpoaXN0b3J5LXYxXCI7XG5cbmRlY2xhcmUgbW9kdWxlIFwib2JzaWRpYW5cIiB7XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZSB7XG4gICAgICAgIGRlc2VyaWFsaXplTGF5b3V0KHN0YXRlOiBhbnksIC4uLmV0YzogYW55W10pOiBQcm9taXNlPFdvcmtzcGFjZUl0ZW0+XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZUxlYWYge1xuICAgICAgICBbSElTVF9BVFRSXTogSGlzdG9yeVxuICAgICAgICBwaW5uZWQ6IGJvb2xlYW5cbiAgICAgICAgd29ya2luZzogYm9vbGVhblxuICAgICAgICBzZXJpYWxpemUoKTogYW55XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIFZpZXdTdGF0ZSB7XG4gICAgICAgIHBvcHN0YXRlPzogYm9vbGVhblxuICAgIH1cbn1cblxuXG5jb25zdCBkb21MZWF2ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5pbnRlcmZhY2UgUHVzaFN0YXRlIHtcbiAgICBzdGF0ZTogc3RyaW5nXG4gICAgZVN0YXRlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEhpc3RvcnlFbnRyeSB7XG5cbiAgICByYXc6IFB1c2hTdGF0ZVxuICAgIGVTdGF0ZTogYW55XG4gICAgcGF0aDogc3RyaW5nXG5cbiAgICBjb25zdHJ1Y3RvcihyYXdTdGF0ZTogUHVzaFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocmF3U3RhdGUpO1xuICAgIH1cblxuXG4gICAgZ2V0IHZpZXdTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5yYXcuc3RhdGUgfHwgXCJ7fVwiKVxuICAgIH1cblxuICAgIHNldFN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yYXcgPSByYXdTdGF0ZTtcbiAgICAgICAgdGhpcy5lU3RhdGUgPSBKU09OLnBhcnNlKHJhd1N0YXRlLmVTdGF0ZSB8fCBcIm51bGxcIik7XG4gICAgICAgIHRoaXMucGF0aCA9IHRoaXMudmlld1N0YXRlLnN0YXRlPy5maWxlO1xuICAgIH1cblxuICAgIG9uUmVuYW1lKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wYXRoID09PSBvbGRQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3U3RhdGUgPSB0aGlzLnZpZXdTdGF0ZVxuICAgICAgICAgICAgdGhpcy5wYXRoID0gdmlld1N0YXRlLnN0YXRlLmZpbGUgPSBmaWxlLnBhdGhcbiAgICAgICAgICAgIHRoaXMucmF3LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkodmlld1N0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvKGxlYWY/OiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIGxldCB7dmlld1N0YXRlLCBwYXRoLCBlU3RhdGV9ID0gdGhpcztcbiAgICAgICAgbGV0IGZpbGUgPSBwYXRoICYmIGFwcD8udmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpO1xuICAgICAgICBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIk1pc3NpbmcgZmlsZTogXCIrcGF0aCk7XG4gICAgICAgICAgICB2aWV3U3RhdGUgPSB7dHlwZTogXCJlbXB0eVwiLCBzdGF0ZTp7fX07XG4gICAgICAgICAgICBlU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVhZi5zZXRWaWV3U3RhdGUoey4uLnZpZXdTdGF0ZSwgYWN0aXZlOiB0cnVlLCBwb3BzdGF0ZTogdHJ1ZX0sIGVTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmVwbGFjZVN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUpIHtcbiAgICAgICAgaWYgKHJhd1N0YXRlLnN0YXRlICE9PSB0aGlzLnJhdy5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgdmlld1N0YXRlID0gSlNPTi5wYXJzZShyYXdTdGF0ZS5zdGF0ZSB8fCBcInt9XCIpO1xuICAgICAgICAgICAgLy8gRG9uJ3QgcmVwbGFjZSBhIGZpbGUgd2l0aCBhbiBlbXB0eSBpbiB0aGUgaGlzdG9yeVxuICAgICAgICAgICAgaWYgKHZpZXdTdGF0ZS50eXBlID09PSBcImVtcHR5XCIpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgLy8gRmlsZSBpcyBkaWZmZXJlbnQgZnJvbSBleGlzdGluZyBmaWxlOiBzaG91bGQgYmUgYSBwdXNoIGluc3RlYWRcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdGggJiYgdGhpcy5wYXRoICE9PSB2aWV3U3RhdGU/LnN0YXRlPy5maWxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAodmlld1N0YXRlLnR5cGUgPT09IFwibWVkaWEtdmlld1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkSW5mbyA9IEpTT04uc3RyaW5naWZ5KHRoaXMudmlld1N0YXRlLnN0YXRlLmluZm8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luZm8gPSBKU09OLnN0cmluZ2lmeSh2aWV3U3RhdGUuc3RhdGUuaW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEluZm8gIT09IG5ld0luZm8pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHJhd1N0YXRlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgU2VyaWFsaXphYmxlSGlzdG9yeSB7XG4gICAgcG9zOiBudW1iZXJcbiAgICBzdGFjazogUHVzaFN0YXRlW11cbn1cblxuZXhwb3J0IGNsYXNzIEhpc3Rvcnkge1xuICAgIHN0YXRpYyBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JMZWFmKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZikgfHwgbmV3IHRoaXMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIGlmIChsZWFmKSBkb21MZWF2ZXMuc2V0KGxlYWYuY29udGFpbmVyRWwsIGxlYWYpO1xuICAgICAgICBpZiAobGVhZikgcmV0dXJuIGxlYWZbSElTVF9BVFRSXSBpbnN0YW5jZW9mIHRoaXMgP1xuICAgICAgICAgICAgbGVhZltISVNUX0FUVFJdIDpcbiAgICAgICAgICAgIGxlYWZbSElTVF9BVFRSXSA9IG5ldyB0aGlzKGxlYWYsIGxlYWZbSElTVF9BVFRSXT8uc2VyaWFsaXplKCkgfHwgdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwb3M6IG51bWJlclxuICAgIHN0YWNrOiBIaXN0b3J5RW50cnlbXVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGxlYWY/OiBXb3Jrc3BhY2VMZWFmLCB7cG9zLCBzdGFja306IFNlcmlhbGl6YWJsZUhpc3RvcnkgPSB7cG9zOjAsIHN0YWNrOltdfSkge1xuICAgICAgICB0aGlzLmxlYWYgPSBsZWFmO1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy5zdGFjayA9IHN0YWNrLm1hcChyYXcgPT4gbmV3IEhpc3RvcnlFbnRyeShyYXcpKTtcbiAgICB9XG5cbiAgICBjbG9uZVRvKGxlYWY6IFdvcmtzcGFjZUxlYWYpIHtcbiAgICAgICAgcmV0dXJuIGxlYWZbSElTVF9BVFRSXSA9IG5ldyBIaXN0b3J5KGxlYWYsIHRoaXMuc2VyaWFsaXplKCkpO1xuICAgIH1cblxuICAgIG9uUmVuYW1lKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgICAgICBmb3IoY29uc3QgaGlzdEVudHJ5IG9mIHRoaXMuc3RhY2spIGhpc3RFbnRyeS5vblJlbmFtZShmaWxlLCBvbGRQYXRoKTtcbiAgICB9XG5cbiAgICBzZXJpYWxpemUoKTogU2VyaWFsaXphYmxlSGlzdG9yeSB7IHJldHVybiB7cG9zOiB0aGlzLnBvcywgc3RhY2s6IHRoaXMuc3RhY2subWFwKGUgPT4gZS5yYXcpfTsgfVxuXG4gICAgZ2V0IHN0YXRlKCkgeyByZXR1cm4gdGhpcy5zdGFja1t0aGlzLnBvc10/LnJhdyB8fCBudWxsOyB9XG4gICAgZ2V0IGxlbmd0aCgpIHsgcmV0dXJuIHRoaXMuc3RhY2subGVuZ3RoOyB9XG5cbiAgICBiYWNrKCkgICAgeyB0aGlzLmdvKC0xKTsgfVxuICAgIGZvcndhcmQoKSB7IHRoaXMuZ28oIDEpOyB9XG5cbiAgICBsb29rQWhlYWQoKSB7IHJldHVybiB0aGlzLnN0YWNrLnNsaWNlKDAsIHRoaXMucG9zKS5yZXZlcnNlKCk7IH1cbiAgICBsb29rQmVoaW5kKCkgeyByZXR1cm4gdGhpcy5zdGFjay5zbGljZSh0aGlzLnBvcysxKTsgfVxuXG4gICAgYW5ub3VuY2UoKSB7XG4gICAgICAgIGFwcD8ud29ya3NwYWNlPy50cmlnZ2VyKFwicGFuZS1yZWxpZWY6dXBkYXRlLWhpc3RvcnlcIiwgdGhpcy5sZWFmLCB0aGlzKTtcbiAgICB9XG5cbiAgICBnb3RvKHBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5sZWFmKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmxlYWYucGlubmVkKSByZXR1cm4gbmV3IE5vdGljZShcIlBpbm5lZCBwYW5lOiB1bnBpbiBiZWZvcmUgZ29pbmcgZm9yd2FyZCBvciBiYWNrXCIpLCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmxlYWYud29ya2luZykgcmV0dXJuIG5ldyBOb3RpY2UoXCJQYW5lIGlzIGJ1c3k6IHBsZWFzZSB3YWl0IGJlZm9yZSBuYXZpZ2F0aW5nIGZ1cnRoZXJcIiksIHVuZGVmaW5lZDtcbiAgICAgICAgcG9zID0gdGhpcy5wb3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwb3MsIHRoaXMuc3RhY2subGVuZ3RoIC0gMSkpO1xuICAgICAgICB0aGlzLnN0YWNrW3Bvc10/LmdvKHRoaXMubGVhZik7XG4gICAgICAgIHRoaXMuYW5ub3VuY2UoKTtcbiAgICB9XG5cbiAgICBnbyhieTogbnVtYmVyLCBmb3JjZT86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmxlYWYgfHwgIWJ5KSByZXR1cm47ICAvLyBuby1vcFxuICAgICAgICAvLyBwcmV2ZW50IHdyYXBhcm91bmRcbiAgICAgICAgY29uc3QgbmV3UG9zID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5wb3MgLSBieSwgdGhpcy5zdGFjay5sZW5ndGggLSAxKSk7XG4gICAgICAgIGlmIChmb3JjZSB8fCBuZXdQb3MgIT09IHRoaXMucG9zKSB7XG4gICAgICAgICAgICB0aGlzLmdvdG8obmV3UG9zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYE5vIG1vcmUgJHtieSA8IDAgPyBcImJhY2tcIiA6IFwiZm9yd2FyZFwifSBoaXN0b3J5IGZvciBwYW5lYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBsYWNlU3RhdGUocmF3U3RhdGU6IFB1c2hTdGF0ZSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpe1xuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuc3RhY2tbdGhpcy5wb3NdO1xuICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnN0YWNrW3RoaXMucG9zXSA9IG5ldyBIaXN0b3J5RW50cnkocmF3U3RhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlbnRyeS5yZXBsYWNlU3RhdGUocmF3U3RhdGUpKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlU3RhdGUgd2FzIGVycm9uZW91c2x5IGNhbGxlZCB3aXRoIGEgbmV3IGZpbGUgZm9yIHRoZSBzYW1lIGxlYWY7XG4gICAgICAgICAgICAvLyBmb3JjZSBhIHB1c2hTdGF0ZSBpbnN0ZWFkIChmaXhlcyB0aGUgaXNzdWUgcmVwb3J0ZWQgaGVyZTogaHR0cHM6Ly9mb3J1bS5vYnNpZGlhbi5tZC90LzE4NTE4KVxuICAgICAgICAgICAgdGhpcy5wdXNoU3RhdGUocmF3U3RhdGUsIHRpdGxlLCB1cmwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaFN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUsIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKSAgIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInB1c2hpbmdcIiwgcmF3U3RhdGUpXG4gICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKDAsIHRoaXMucG9zLCBuZXcgSGlzdG9yeUVudHJ5KHJhd1N0YXRlKSk7XG4gICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgLy8gTGltaXQgXCJiYWNrXCIgdG8gMjBcbiAgICAgICAgd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMjApIHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgIHRoaXMuYW5ub3VuY2UoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsSGlzdG9yeShwbHVnaW46IFBhbmVSZWxpZWYpIHtcblxuICAgIC8vIE1vbmtleXBhdGNoOiBpbmNsdWRlIGhpc3RvcnkgaW4gbGVhZiBzZXJpYWxpemF0aW9uIChzbyBpdCdzIHBlcnNpc3RlZCB3aXRoIHRoZSB3b3Jrc3BhY2UpXG4gICAgLy8gYW5kIGNoZWNrIGZvciBwb3BzdGF0ZSBldmVudHMgKHRvIHN1cHByZXNzIHRoZW0pXG4gICAgcGx1Z2luLnJlZ2lzdGVyKGFyb3VuZChXb3Jrc3BhY2VMZWFmLnByb3RvdHlwZSwge1xuICAgICAgICBzZXJpYWxpemUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXJpYWxpemUoKXtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9sZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXNbSElTVF9BVFRSXSkgcmVzdWx0W1NFUklBTF9QUk9QXSA9IHRoaXNbSElTVF9BVFRSXS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH19LFxuICAgICAgICBzZXRWaWV3U3RhdGUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXRWaWV3U3RhdGUodnMsIGVzKXtcbiAgICAgICAgICAgIGlmICh2cy5wb3BzdGF0ZSAmJiB3aW5kb3cuZXZlbnQ/LnR5cGUgPT09IFwicG9wc3RhdGVcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbGQuY2FsbCh0aGlzLCB2cywgZXMpO1xuICAgICAgICB9fVxuICAgIH0pKTtcblxuICAgIHBsdWdpbi5yZWdpc3Rlcihhcm91bmQoYXBwLndvcmtzcGFjZSwge1xuICAgICAgICAvLyBNb25rZXlwYXRjaDogbG9hZCBoaXN0b3J5IGR1cmluZyBsZWFmIGxvYWQsIGlmIHByZXNlbnRcbiAgICAgICAgZGVzZXJpYWxpemVMYXlvdXQob2xkKSB7IHJldHVybiBhc3luYyBmdW5jdGlvbiBkZXNlcmlhbGl6ZUxheW91dChzdGF0ZSwgLi4uZXRjOiBhbnlbXSl7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgb2xkLmNhbGwodGhpcywgc3RhdGUsIC4uLmV0Yyk7XG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJsZWFmXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXRyeSBsb2FkaW5nIHRoZSBwYW5lIGFzIGFuIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnN0YXRlLnR5cGUgPSAnZW1wdHknO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBvbGQuY2FsbCh0aGlzLCBzdGF0ZSwgLi4uZXRjKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZVtTRVJJQUxfUFJPUF0pIHJlc3VsdFtISVNUX0FUVFJdID0gbmV3IEhpc3RvcnkocmVzdWx0LCBzdGF0ZVtTRVJJQUxfUFJPUF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfX0sXG4gICAgICAgIC8vIE1vbmtleXBhdGNoOiBrZWVwIE9ic2lkaWFuIGZyb20gcHVzaGluZyBoaXN0b3J5IGluIHNldEFjdGl2ZUxlYWZcbiAgICAgICAgc2V0QWN0aXZlTGVhZihvbGQpIHsgcmV0dXJuIGZ1bmN0aW9uIHNldEFjdGl2ZUxlYWYobGVhZiwgLi4uZXRjKSB7XG4gICAgICAgICAgICBjb25zdCB1bnN1YiA9IGFyb3VuZCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgcmVjb3JkSGlzdG9yeShvbGQpIHsgcmV0dXJuIGZ1bmN0aW9uIChsZWFmOiBXb3Jrc3BhY2VMZWFmLCBfcHVzaDogYm9vbGVhbiwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWx3YXlzIHVwZGF0ZSBzdGF0ZSBpbiBwbGFjZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2xkLmNhbGwodGhpcywgbGVhZiwgZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH07IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLmNhbGwodGhpcywgbGVhZiwgLi4uZXRjKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX0sXG4gICAgfSkpO1xuXG4gICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBtb3VzZSBoaXN0b3J5IGJlaGF2aW9yLiAgV2UgbmVlZCB0aGlzIGJlY2F1c2UgMSkgRWxlY3Ryb24gd2lsbCB1c2UgdGhlIGJ1aWx0LWluXG4gICAgLy8gaGlzdG9yeSBvYmplY3QgaWYgd2UgZG9uJ3QgKGluc3RlYWQgb2Ygb3VyIHdyYXBwZXIpLCBhbmQgMikgd2Ugd2FudCB0aGUgY2xpY2sgdG8gYXBwbHkgdG8gdGhlIGxlYWZcbiAgICAvLyB0aGF0IHdhcyB1bmRlciB0aGUgbW91c2UsIHJhdGhlciB0aGFuIHdoaWNoZXZlciBsZWFmIHdhcyBhY3RpdmUuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGlzdG9yeUhhbmRsZXIsIHRydWUpO1xuICAgIHBsdWdpbi5yZWdpc3RlcigoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpc3RvcnlIYW5kbGVyLCB0cnVlKTtcbiAgICB9KTtcbiAgICBmdW5jdGlvbiBoaXN0b3J5SGFuZGxlcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmIChlLmJ1dHRvbiAhPT0gMyAmJiBlLmJ1dHRvbiAhPT0gNCkgcmV0dXJuO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3JcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5tYXRjaFBhcmVudChcIi53b3Jrc3BhY2UtbGVhZlwiKTtcbiAgICAgICAgaWYgKHRhcmdldCAmJiBlLnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICBsZXQgbGVhZiA9IGRvbUxlYXZlcy5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICghbGVhZikgYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKGwgPT4gbGVhZiA9IChsLmNvbnRhaW5lckVsID09PSB0YXJnZXQpID8gbCA6IGxlYWYpO1xuICAgICAgICAgICAgaWYgKCFsZWFmKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gMykgeyBIaXN0b3J5LmZvckxlYWYobGVhZikuYmFjaygpOyB9XG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gNCkgeyBIaXN0b3J5LmZvckxlYWYobGVhZikuZm9yd2FyZCgpOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFByb3h5IHRoZSB3aW5kb3cgaGlzdG9yeSB3aXRoIGEgd3JhcHBlciB0aGF0IGRlbGVnYXRlcyB0byB0aGUgYWN0aXZlIGxlYWYncyBIaXN0b3J5IG9iamVjdCxcbiAgICBjb25zdCByZWFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICAgIHBsdWdpbi5yZWdpc3RlcigoKSA9PiAod2luZG93IGFzIGFueSkuaGlzdG9yeSA9IHJlYWxIaXN0b3J5KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImhpc3RvcnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZToge1xuICAgICAgICBnZXQgc3RhdGUoKSAgICAgIHsgcmV0dXJuIEhpc3RvcnkuY3VycmVudCgpLnN0YXRlOyB9LFxuICAgICAgICBnZXQgbGVuZ3RoKCkgICAgIHsgcmV0dXJuIEhpc3RvcnkuY3VycmVudCgpLmxlbmd0aDsgfSxcblxuICAgICAgICBiYWNrKCkgICAgeyB0aGlzLmdvKC0xKTsgfSxcbiAgICAgICAgZm9yd2FyZCgpIHsgdGhpcy5nbyggMSk7IH0sXG4gICAgICAgIGdvKGJ5OiBudW1iZXIpICAgIHsgSGlzdG9yeS5jdXJyZW50KCkuZ28oYnkpOyB9LFxuXG4gICAgICAgIHJlcGxhY2VTdGF0ZShzdGF0ZTogUHVzaFN0YXRlLCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZyl7IEhpc3RvcnkuY3VycmVudCgpLnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCk7IH0sXG4gICAgICAgIHB1c2hTdGF0ZShzdGF0ZTogUHVzaFN0YXRlLCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZykgICB7IEhpc3RvcnkuY3VycmVudCgpLnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCk7IH0sXG5cbiAgICAgICAgZ2V0IHNjcm9sbFJlc3RvcmF0aW9uKCkgICAgeyByZXR1cm4gcmVhbEhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb247IH0sXG4gICAgICAgIHNldCBzY3JvbGxSZXN0b3JhdGlvbih2YWwpIHsgcmVhbEhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSB2YWw7IH0sXG4gICAgfX0pO1xuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFBsdWdpbiwgVmlldywgV29ya3NwYWNlTGVhZiwgV29ya3NwYWNlUGFyZW50LCBXb3Jrc3BhY2VTcGxpdCwgV29ya3NwYWNlV2luZG93IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgYmVsb25ncyB0byBhIHBsdWdpbiArIHdpbmRvdy4gZS5nLjpcbiAqXG4gKiAgICAgY2xhc3MgVGl0bGVXaWRnZXQgZXh0ZW5kcyBQZXJXaW5kb3dDb21wb25lbnQ8TXlQbHVnaW4+IHtcbiAqICAgICAgICAgb25sb2FkKCkge1xuICogICAgICAgICAgICAgLy8gZG8gc3R1ZmYgd2l0aCB0aGlzLnBsdWdpbiBhbmQgdGhpcy53aW4gLi4uXG4gKiAgICAgICAgIH1cbiAqICAgICB9XG4gKlxuICogICAgIGNsYXNzIE15UGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAqICAgICAgICAgdGl0bGVXaWRnZXRzID0gVGl0bGVXaWRnZXQucGVyV2luZG93KHRoaXMpO1xuICogICAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogVGhpcyB3aWxsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGEgdGl0bGUgd2lkZ2V0IGZvciBlYWNoIHdpbmRvdyBhcyBpdCdzIG9wZW5lZCwgYW5kXG4gKiBvbiBwbHVnaW4gbG9hZC4gIFRoZSBwbHVnaW4ncyBgLnRpdGxlV2lkZ2V0c2Agd2lsbCBhbHNvIGJlIGEgV2luZG93TWFuYWdlciB0aGF0IGNhblxuICogbG9vayB1cCB0aGUgdGl0bGUgd2lkZ2V0IGZvciBhIGdpdmVuIHdpbmRvdywgbGVhZiwgb3Igdmlldywgb3IgcmV0dXJuIGEgbGlzdCBvZlxuICogYWxsIG9mIHRoZW0uICBTZWUgV2luZG93TWFuYWdlciBmb3IgdGhlIGZ1bGwgQVBJLlxuICpcbiAqIElmIHlvdSB3YW50IHlvdXIgY29tcG9uZW50cyB0byBiZSBjcmVhdGVkIG9uIGRlbWFuZCBpbnN0ZWFkIG9mIGF1dG9tYXRpY2FsbHkgd2hlblxuICogd2luZG93KHMpIGFyZSBvcGVuZWQsIHlvdSBjYW4gcGFzcyBgZmFsc2VgIGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgdG8gYHBlcldpbmRvdygpYC5cbiAqL1xuZXhwb3J0IGNsYXNzIFBlcldpbmRvd0NvbXBvbmVudDxQIGV4dGVuZHMgUGx1Z2luPiBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGx1Z2luOiBQLCBwdWJsaWMgd2luOiBXaW5kb3csIHB1YmxpYyByb290OiBXb3Jrc3BhY2VXaW5kb3cgfCBXb3Jrc3BhY2VTcGxpdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwZXJXaW5kb3c8VCBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQPiwgUCBleHRlbmRzIFBsdWdpbj4oXG4gICAgICAgIHRoaXM6IG5ldyAocGx1Z2luOiBQLCB3aW46IFdpbmRvdykgPT4gVCxcbiAgICAgICAgcGx1Z2luOiBQXG4gICAgKSB7XG4gICAgICAgIHJldHVybiBuZXcgV2luZG93TWFuYWdlcihwbHVnaW4sIHRoaXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgcGVyLXdpbmRvdyBjb21wb25lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dNYW5hZ2VyPFQgZXh0ZW5kcyBQZXJXaW5kb3dDb21wb25lbnQ8UD4sIFAgZXh0ZW5kcyBQbHVnaW4+IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBpbnN0YW5jZXMgPSBuZXcgV2Vha01hcDxXaW5kb3csIFQ+KCk7XG5cbiAgICB3YXRjaGluZzogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBwbHVnaW46IFAsXG4gICAgICAgIHB1YmxpYyBmYWN0b3J5OiBuZXcgKHBsdWdpbjogUCwgd2luOiBXaW5kb3csIHJvb3Q6IFdvcmtzcGFjZVBhcmVudCkgPT4gVCwgIC8vIFRoZSBjbGFzcyBvZiB0aGluZyB0byBtYW5hZ2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcGx1Z2luLmFkZENoaWxkKHRoaXMpO1xuICAgIH1cblxuICAgIHdhdGNoKCk6IHRoaXMge1xuICAgICAgICAvLyBEZWZlciB3YXRjaCB1bnRpbCBwbHVnaW4gaXMgbG9hZGVkXG4gICAgICAgIGlmICghdGhpcy5fbG9hZGVkKSB0aGlzLm9ubG9hZCA9ICgpID0+IHRoaXMud2F0Y2goKTtcbiAgICAgICAgZWxzZSBpZiAoIXRoaXMud2F0Y2hpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHt3b3Jrc3BhY2V9ID0gYXBwO1xuICAgICAgICAgICAgdGhpcy53YXRjaGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICAgICAgd29ya3NwYWNlLm9uKFwid2luZG93LW9wZW5cIiwgKF8sIHdpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiBzZXRJbW1lZGlhdGUoKCkgPT4gdGhpcy5mb3JXaW5kb3cod2luKSkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4gc2V0SW1tZWRpYXRlKCgpID0+IHRoaXMuZm9yQWxsKCkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmb3JXaW5kb3coKTogVDtcbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3cpOiBUO1xuICAgIGZvcldpbmRvdyh3aW46IFdpbmRvdywgY3JlYXRlOiB0cnVlKTogVDtcbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3csIGNyZWF0ZTogYm9vbGVhbik6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3cgPSB3aW5kb3cuYWN0aXZlV2luZG93ID8/IHdpbmRvdywgY3JlYXRlID0gdHJ1ZSk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgaW5zdCA9IHRoaXMuaW5zdGFuY2VzLmdldCh3aW4pO1xuICAgICAgICBpZiAoIWluc3QgJiYgY3JlYXRlKSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IHRoaXMuZmFjdG9yeSh0aGlzLnBsdWdpbiwgd2luLCBjb250YWluZXJGb3JXaW5kb3cod2luKSk7XG4gICAgICAgICAgICBpZiAoaW5zdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNldCh3aW4sIGluc3QhKTtcbiAgICAgICAgICAgICAgICBpbnN0LnJlZ2lzdGVyRG9tRXZlbnQod2luLCBcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoaW5zdCEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5kZWxldGUod2luKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKGluc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0IHx8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmb3JEb20oZWw6IE5vZGUpOiBUO1xuICAgIGZvckRvbShlbDogTm9kZSwgY3JlYXRlOiB0cnVlKTogVDtcbiAgICBmb3JEb20oZWw6IE5vZGUsIGNyZWF0ZTogYm9vbGVhbik6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3JEb20oZWw6IE5vZGUsIGNyZWF0ZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yV2luZG93KHdpbmRvd0ZvckRvbShlbCksIGNyZWF0ZSk7XG4gICAgfVxuXG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmKTogVDtcbiAgICBmb3JMZWFmKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGNyZWF0ZTogdHJ1ZSk6IFQ7XG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBjcmVhdGU6IGJvb2xlYW4pOiBUIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvckRvbShsZWFmLmNvbnRhaW5lckVsLCBjcmVhdGUpO1xuICAgIH1cblxuICAgIGZvclZpZXcodmlldzogVmlldyk6IFQ7XG4gICAgZm9yVmlldyh2aWV3OiBWaWV3LCBjcmVhdGU6IHRydWUpOiBUO1xuICAgIGZvclZpZXcodmlldzogVmlldywgY3JlYXRlOiBib29sZWFuKTogVCB8IHVuZGVmaW5lZDtcblxuICAgIGZvclZpZXcodmlldzogVmlldywgY3JlYXRlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JEb20odmlldy5jb250YWluZXJFbCwgY3JlYXRlKTtcbiAgICB9XG5cbiAgICB3aW5kb3dzKCkge1xuICAgICAgICBjb25zdCB3aW5kb3dzOiBXaW5kb3dbXSA9IFt3aW5kb3ddLCB7ZmxvYXRpbmdTcGxpdH0gPSBhcHAud29ya3NwYWNlO1xuICAgICAgICBpZiAoZmxvYXRpbmdTcGxpdCkge1xuICAgICAgICAgICAgZm9yKGNvbnN0IHNwbGl0IG9mIGZsb2F0aW5nU3BsaXQuY2hpbGRyZW4pIGlmIChzcGxpdC53aW4pIHdpbmRvd3MucHVzaChzcGxpdC53aW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aW5kb3dzO1xuICAgIH1cblxuICAgIGZvckFsbChjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpbmRvd3MoKS5tYXAod2luID0+IHRoaXMuZm9yV2luZG93KHdpbiwgY3JlYXRlKSkuZmlsdGVyKHQgPT4gdCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2luZG93Rm9yRG9tKGVsOiBOb2RlKSB7XG4gICAgcmV0dXJuIChlbC5vd25lckRvY3VtZW50IHx8IDxEb2N1bWVudD5lbCkuZGVmYXVsdFZpZXchO1xufVxuXG5mdW5jdGlvbiBjb250YWluZXJGb3JXaW5kb3cod2luOiBXaW5kb3cpOiBXb3Jrc3BhY2VQYXJlbnQge1xuICAgIGlmICh3aW4gPT09IHdpbmRvdykgcmV0dXJuIGFwcC53b3Jrc3BhY2Uucm9vdFNwbGl0O1xuICAgIGNvbnN0IHtmbG9hdGluZ1NwbGl0fSA9IGFwcC53b3Jrc3BhY2U7XG4gICAgaWYgKGZsb2F0aW5nU3BsaXQpIHtcbiAgICAgICAgZm9yKGNvbnN0IHNwbGl0IG9mIGZsb2F0aW5nU3BsaXQuY2hpbGRyZW4pIGlmICh3aW4gPT09IHNwbGl0LndpbikgcmV0dXJuIHNwbGl0O1xuICAgIH1cbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICAgIC8vIEJhY2t3YXJkIGNvbXBhdGliaWxpdHkgZm9yIHNpbmdsZS13aW5kb3cgT2JzaWRpYW4gKDwwLjE1KVxuICAgIGludGVyZmFjZSBXaW5kb3cge1xuICAgICAgICBhY3RpdmVXaW5kb3c/OiBXaW5kb3dcbiAgICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlIFwib2JzaWRpYW5cIiB7XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZSB7XG4gICAgICAgIGZsb2F0aW5nU3BsaXQ/OiB7IGNoaWxkcmVuOiBXb3Jrc3BhY2VXaW5kb3dbXSB9O1xuICAgICAgICBvcGVuUG9wb3V0PygpOiBXb3Jrc3BhY2VTcGxpdDtcbiAgICAgICAgb3BlblBvcG91dExlYWY/KCk6IFdvcmtzcGFjZUxlYWY7XG4gICAgICAgIG9uKG5hbWU6ICd3aW5kb3ctb3BlbicsIGNhbGxiYWNrOiAod2luOiBXb3Jrc3BhY2VXaW5kb3csIHdpbmRvdzogV2luZG93KSA9PiBhbnksIGN0eD86IGFueSk6IEV2ZW50UmVmO1xuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlV2luZG93IGV4dGVuZHMgV29ya3NwYWNlUGFyZW50IHtcbiAgICAgICAgd2luOiBXaW5kb3dcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZUxlYWYge1xuICAgICAgICBjb250YWluZXJFbDogSFRNTERpdkVsZW1lbnQ7XG4gICAgfVxuICAgIGludGVyZmFjZSBDb21wb25lbnQge1xuICAgICAgICBfbG9hZGVkOiBib29sZWFuXG4gICAgfVxufVxuIiwiaW1wb3J0IHtNZW51LCBLZXltYXAsIENvbXBvbmVudCwgV29ya3NwYWNlTGVhZiwgVEZpbGUsIE1lbnVJdGVtfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge0hpc3RvcnksIEhpc3RvcnlFbnRyeX0gZnJvbSBcIi4vSGlzdG9yeVwiO1xuaW1wb3J0IFBhbmVSZWxpZWYgZnJvbSAnLi9wYW5lLXJlbGllZic7XG5pbXBvcnQge1BlcldpbmRvd0NvbXBvbmVudH0gZnJvbSAnLi9QZXJXaW5kb3dDb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBNZW51IHtcbiAgICAgICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgTWVudUl0ZW0ge1xuICAgICAgICBkb206IEhUTUxFbGVtZW50XG4gICAgfVxuICAgIGludGVyZmFjZSBBcHAge1xuICAgICAgICBkcmFnTWFuYWdlcjogRHJhZ01hbmFnZXJcbiAgICB9XG4gICAgaW50ZXJmYWNlIERyYWdNYW5hZ2VyIHtcbiAgICAgICAgZHJhZ0ZpbGUoZXZlbnQ6IERyYWdFdmVudCwgZmlsZTogVEZpbGUpOiBEcmFnRGF0YVxuICAgICAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50LCBkcmFnRGF0YTogRHJhZ0RhdGEpOiB2b2lkXG4gICAgfVxuICAgIGludGVyZmFjZSBEcmFnRGF0YSB7fVxuICAgIGludGVyZmFjZSBXb3Jrc3BhY2VMZWFmIHtcbiAgICAgICAgYWN0aXZlVGltZTogbnVtYmVyXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgRmlsZUluZm8ge1xuICAgIGljb246IHN0cmluZ1xuICAgIHRpdGxlOiBzdHJpbmdcbiAgICBmaWxlOiBURmlsZVxuICAgIHR5cGU6IHN0cmluZ1xuICAgIHN0YXRlOiBhbnlcbiAgICBlU3RhdGU6IGFueVxufVxuXG5cbmNvbnN0IHZpZXd0eXBlSWNvbnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgbWFya2Rvd246IFwiZG9jdW1lbnRcIixcbiAgICBpbWFnZTogXCJpbWFnZS1maWxlXCIsXG4gICAgYXVkaW86IFwiYXVkaW8tZmlsZVwiLFxuICAgIHZpZGVvOiBcImF1ZGlvLWZpbGVcIixcbiAgICBwZGY6IFwicGRmLWZpbGVcIixcbiAgICBsb2NhbGdyYXBoOiBcImRvdC1uZXR3b3JrXCIsXG4gICAgb3V0bGluZTogXCJidWxsZXQtbGlzdFwiLFxuICAgIGJhY2tsaW5rOiBcImxpbmtcIixcblxuICAgIC8vIHRoaXJkLXBhcnR5IHBsdWdpbnNcbiAgICBrYW5iYW46IFwiYmxvY2tzXCIsXG4gICAgZXhjYWxpZHJhdzogXCJleGNhbGlkcmF3LWljb25cIixcbiAgICBcIm1lZGlhLXZpZXdcIjogXCJhdWRpby1maWxlXCIsXG59XG5cbmNvbnN0IG5vbkZpbGVWaWV3czogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge1xuICAgIGdyYXBoOiBbXCJkb3QtbmV0d29ya1wiLCBcIkdyYXBoIFZpZXdcIl0sXG4gICAgXCJmaWxlLWV4cGxvcmVyXCI6IFtcImZvbGRlclwiLCBcIkZpbGUgRXhwbG9yZXJcIl0sXG4gICAgc3RhcnJlZDogW1wic3RhclwiLCBcIlN0YXJyZWQgRmlsZXNcIl0sXG4gICAgdGFnOiBbXCJ0YWdcIiwgXCJUYWdzIFZpZXdcIl0sXG5cbiAgICAvLyB0aGlyZC1wYXJ0eSBwbHVnaW5zXG4gICAgXCJyZWNlbnQtZmlsZXNcIjogW1wiY2xvY2tcIiwgXCJSZWNlbnQgRmlsZXNcIl0sXG4gICAgY2FsZW5kYXI6IFtcImNhbGVuZGFyLXdpdGgtY2hlY2ttYXJrXCIsIFwiQ2FsZW5kYXJcIl0sXG4gICAgZW1wdHk6IFtcImNyb3NzXCIsIFwiTm8gZmlsZVwiXVxufVxuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQYW5lUmVsaWVmPiB7XG4gICAgYmFjazogTmF2aWdhdG9yXG4gICAgZm9yd2FyZDogTmF2aWdhdG9yXG4gICAgLy8gU2V0IHRvIHRydWUgd2hpbGUgZWl0aGVyIG1lbnUgaXMgb3Blbiwgc28gd2UgZG9uJ3Qgc3dpdGNoIGl0IG91dFxuICAgIGhpc3RvcnlJc09wZW4gPSBmYWxzZTtcblxuICAgIGRpc3BsYXkobGVhZiA9IHRoaXMubGF0ZXN0TGVhZigpKSB7XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlJc09wZW4pIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2FkZWQpIHsgdGhpcy5sb2FkKCk7IHJldHVybjsgfVxuICAgICAgICB0aGlzLndpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IGxlYWYgPyBIaXN0b3J5LmZvckxlYWYobGVhZikgOiBuZXcgSGlzdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5iYWNrLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQuc2V0SGlzdG9yeShoaXN0b3J5KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGVhZihsZWFmLCBoaXN0b3J5KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZWF2ZXMoKSB7XG4gICAgICAgIGNvbnN0IGxlYXZlczogV29ya3NwYWNlTGVhZltdID0gW107XG4gICAgICAgIGNvbnN0IGNiID0gKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHsgbGVhdmVzLnB1c2gobGVhZik7IH07XG4gICAgICAgIGFwcC53b3Jrc3BhY2UuaXRlcmF0ZUxlYXZlcyhjYiwgdGhpcy5yb290KTtcblxuICAgICAgICAvLyBTdXBwb3J0IEhvdmVyIEVkaXRvcnNcbiAgICAgICAgY29uc3QgcG9wb3ZlcnMgPSBhcHAucGx1Z2lucy5wbHVnaW5zW1wib2JzaWRpYW4taG92ZXItZWRpdG9yXCJdPy5hY3RpdmVQb3BvdmVycztcbiAgICAgICAgaWYgKHBvcG92ZXJzKSBmb3IgKGNvbnN0IHBvcG92ZXIgb2YgcG9wb3ZlcnMpIHtcbiAgICAgICAgICAgIGlmIChwb3BvdmVyLmhvdmVyRWwub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyAhPT0gdGhpcy53aW4pIGNvbnRpbnVlOyAvLyBtdXN0IGJlIGluIHNhbWUgd2luZG93XG4gICAgICAgICAgICBlbHNlIGlmIChwb3BvdmVyLnJvb3RTcGxpdCkgYXBwLndvcmtzcGFjZS5pdGVyYXRlTGVhdmVzKGNiLCBwb3BvdmVyLnJvb3RTcGxpdCk7XG4gICAgICAgICAgICBlbHNlIGlmIChwb3BvdmVyLmxlYWYpIGNiKHBvcG92ZXIubGVhZik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxlYXZlcztcbiAgICB9XG5cbiAgICBsYXRlc3RMZWFmKCkge1xuICAgICAgICBsZXQgbGVhZiA9IGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgaWYgKGxlYWYgJiYgdGhpcy5wbHVnaW4ubmF2LmZvckxlYWYobGVhZikgPT09IHRoaXMpIHJldHVybiBsZWFmO1xuICAgICAgICByZXR1cm4gdGhpcy5sZWF2ZXMoKS5yZWR1Y2UoKGJlc3QsIGxlYWYpPT57IHJldHVybiAoIWJlc3QgfHwgYmVzdC5hY3RpdmVUaW1lIDwgbGVhZi5hY3RpdmVUaW1lKSA/IGxlYWYgOiBiZXN0OyB9KTtcbiAgICB9XG5cbiAgICBvbmxvYWQoKSB7XG4gICAgICAgIGFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYmFjayAgICA9IG5ldyBOYXZpZ2F0b3IodGhpcywgXCJiYWNrXCIsIC0xKSk7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuZm9yd2FyZCA9IG5ldyBOYXZpZ2F0b3IodGhpcywgXCJmb3J3YXJkXCIsIDEpKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJQYW5lcygpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KGFwcC53b3Jrc3BhY2Uub24oXCJsYXlvdXQtY2hhbmdlXCIsIHRoaXMubnVtYmVyUGFuZXMsIHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXIoXG4gICAgICAgICAgICAgICAgLy8gU3VwcG9ydCBcIkN1c3RvbWl6YWJsZSBQYWdlIEhlYWRlciBhbmQgVGl0bGUgQmFyXCIgYnV0dG9uc1xuICAgICAgICAgICAgICAgIG9uRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aW4uZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAgICAgICAgICAgXCJjb250ZXh0bWVudVwiLFxuICAgICAgICAgICAgICAgICAgICBcIi52aWV3LWhlYWRlciA+IC52aWV3LWFjdGlvbnMgPiAudmlldy1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgKGV2dCwgdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldC5tYXRjaGVzKCdbY2xhc3MqPVwiIGFwcDpnby1mb3J3YXJkXCJdJykgJiYgXCJmb3J3YXJkXCIpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldC5tYXRjaGVzKCdbY2xhc3MqPVwiIGFwcDpnby1iYWNrXCJdJykgICAgJiYgXCJiYWNrXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkaXIpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGFyZ2V0Lm1hdGNoUGFyZW50KFwiLndvcmtzcGFjZS1sZWFmXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMubGVhdmVzKCkuZmlsdGVyKGxlYWYgPT4gbGVhZi5jb250YWluZXJFbCA9PT0gZWwpLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsZWFmKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheShsZWFmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbZGlyXS5vcGVuTWVudShldnQpO1xuICAgICAgICAgICAgICAgICAgICB9LCB7Y2FwdHVyZTogdHJ1ZX1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgdGhpcy51bk51bWJlclBhbmVzKCk7XG4gICAgICAgIHRoaXMud2luLmRvY3VtZW50LmJvZHkuZmluZEFsbChcIi53b3Jrc3BhY2UtbGVhZlwiKS5mb3JFYWNoKGxlYWZFbCA9PiB7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIENQSEFUQiBidXR0b24gbGFiZWxzXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gbGVhZkVsLmZpbmQoXCIudmlldy1oZWFkZXIgPiAudmlldy1hY3Rpb25zXCIpO1xuICAgICAgICAgICAgY29uc3QgZndkID0gYWN0aW9ucz8uZmluZCgnLnZpZXctYWN0aW9uW2NsYXNzKj1cIiBhcHA6Z28tZm9yd2FyZFwiXScpO1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGFjdGlvbnM/LmZpbmQoJy52aWV3LWFjdGlvbltjbGFzcyo9XCIgYXBwOmdvLWJhY2tcIl0nKTtcbiAgICAgICAgICAgIGlmIChmd2QpICBzZXRUb29sdGlwKGZ3ZCwgdGhpcy5mb3J3YXJkLm9sZExhYmVsKTtcbiAgICAgICAgICAgIGlmIChiYWNrKSBzZXRUb29sdGlwKGZ3ZCwgdGhpcy5iYWNrLm9sZExhYmVsKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1bk51bWJlclBhbmVzKHNlbGVjdG9yID0gXCIud29ya3NwYWNlLWxlYWZcIikge1xuICAgICAgICB0aGlzLndpbi5kb2N1bWVudC5ib2R5LmZpbmRBbGwoc2VsZWN0b3IpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWxhYmVsXCIpO1xuICAgICAgICAgICAgZWwudG9nZ2xlQ2xhc3MoXCJoYXMtcGFuZS1yZWxpZWYtbGFiZWxcIiwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWZvcndhcmQtY291bnRcIik7XG4gICAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtYmFja3dhcmQtY291bnRcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUxlYWYobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSA9IEhpc3RvcnkuZm9yTGVhZihsZWFmKSkge1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1mb3J3YXJkLWNvdW50XCIsICdcIicrKGhpc3RvcnkubG9va0FoZWFkKCkubGVuZ3RoIHx8IFwiXCIpKydcIicpO1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1iYWNrd2FyZC1jb3VudFwiLCAnXCInKyhoaXN0b3J5Lmxvb2tCZWhpbmQoKS5sZW5ndGggfHwgXCJcIikrJ1wiJyk7XG5cbiAgICAgICAgLy8gQWRkIGxhYmVscyBmb3IgQ1BIQVRCIG5hdiBidXR0b25zXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBsZWFmLmNvbnRhaW5lckVsLmZpbmQoXCIudmlldy1oZWFkZXIgPiAudmlldy1hY3Rpb25zXCIpO1xuICAgICAgICBjb25zdCBmd2QgPSBhY3Rpb25zPy5maW5kKCcudmlldy1hY3Rpb25bY2xhc3MqPVwiIGFwcDpnby1mb3J3YXJkXCJdJyk7XG4gICAgICAgIGNvbnN0IGJhY2sgPSBhY3Rpb25zPy5maW5kKCcudmlldy1hY3Rpb25bY2xhc3MqPVwiIGFwcDpnby1iYWNrXCJdJyk7XG4gICAgICAgIGlmIChmd2QpIHRoaXMuZm9yd2FyZC51cGRhdGVEaXNwbGF5KGhpc3RvcnksIGZ3ZCk7XG4gICAgICAgIGlmIChiYWNrKSB0aGlzLmJhY2sudXBkYXRlRGlzcGxheShoaXN0b3J5LCBiYWNrKTtcbiAgICB9XG5cbiAgICBudW1iZXJQYW5lcygpIHtcbiAgICAgICAgdGhpcy53aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHVubnVtYmVyIHNpZGViYXIgcGFuZXMgaW4gbWFpbiB3aW5kb3csIGlmIHNvbWV0aGluZyB3YXMgbW92ZWQgdGhlcmVcbiAgICAgICAgICAgIGlmICh0aGlzLndpbiA9PT0gd2luZG93KSB0aGlzLnVuTnVtYmVyUGFuZXMoXCIud29ya3NwYWNlLXRhYnMgPiAud29ya3NwYWNlLWxlYWZcIik7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwLCBsYXN0TGVhZjogV29ya3NwYWNlTGVhZiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxlYXZlcygpLmZvckVhY2gobGVhZiA9PiB7XG4gICAgICAgICAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtbGFiZWxcIiwgKytjb3VudCA8IDkgPyBcIlwiK2NvdW50IDogXCJcIik7XG4gICAgICAgICAgICAgICAgbGVhZi5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcImhhcy1wYW5lLXJlbGllZi1sYWJlbFwiLCBjb3VudDw5KTtcbiAgICAgICAgICAgICAgICBsYXN0TGVhZiA9IGxlYWY7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMZWFmKGxlYWYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY291bnQ+OCkge1xuICAgICAgICAgICAgICAgIGxhc3RMZWFmPy5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtbGFiZWxcIiwgXCI5XCIpO1xuICAgICAgICAgICAgICAgIGxhc3RMZWFmPy5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcImhhcy1wYW5lLXJlbGllZi1sYWJlbFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblVwZGF0ZUhpc3RvcnkobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSkge1xuICAgICAgICB0aGlzLndpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMZWFmKGxlYWYpOyAvLyB1cGRhdGUgbGVhZidzIHN0YXRzIGFuZCBidXR0b25zXG4gICAgICAgICAgICAvLyB1cGRhdGUgd2luZG93J3MgbmF2IGFycm93c1xuICAgICAgICAgICAgaWYgKGhpc3RvcnkgPT09IHRoaXMuZm9yd2FyZC5oaXN0b3J5KSB0aGlzLmZvcndhcmQuc2V0SGlzdG9yeShoaXN0b3J5KTtcbiAgICAgICAgICAgIGlmIChoaXN0b3J5ID09PSB0aGlzLmJhY2suaGlzdG9yeSkgICAgdGhpcy5iYWNrLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgaG92ZXJTb3VyY2UgPSBcInBhbmUtcmVsaWVmOmhpc3RvcnktbWVudVwiO1xuXG4gICAgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50XG4gICAgY291bnQ6IEhUTUxTcGFuRWxlbWVudFxuICAgIGhpc3Rvcnk6IEhpc3RvcnkgPSBudWxsO1xuICAgIHN0YXRlczogSGlzdG9yeUVudHJ5W107XG4gICAgb2xkTGFiZWw6IHN0cmluZ1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBOYXZpZ2F0aW9uLCBwdWJsaWMga2luZDogJ2ZvcndhcmQnfCdiYWNrJywgcHVibGljIGRpcjogbnVtYmVyKSAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIG9ubG9hZCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbCA9IHRoaXMub3duZXIud2luLmRvY3VtZW50LmJvZHkuZmluZChcbiAgICAgICAgICAgIGAudGl0bGViYXIgLnRpdGxlYmFyLWJ1dHRvbi1jb250YWluZXIubW9kLWxlZnQgLnRpdGxlYmFyLWJ1dHRvbi5tb2QtJHt0aGlzLmtpbmR9YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvdW50ID0gdGhpcy5jb250YWluZXJFbC5jcmVhdGVTcGFuKHtwcmVwZW5kOiB0aGlzLmtpbmQgPT09IFwiYmFja1wiLCBjbHM6IFwiaGlzdG9yeS1jb3VudGVyXCJ9KTtcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5vbGRMYWJlbCA9IHRoaXMuY29udGFpbmVyRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckRvbUV2ZW50KHRoaXMuY29udGFpbmVyRWwsIFwiY29udGV4dG1lbnVcIiwgdGhpcy5vcGVuTWVudS5iaW5kKHRoaXMpKTtcbiAgICAgICAgY29uc3Qgb25DbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBPYnNpZGlhbiB0byBzd2l0Y2ggd2luZG93IG9yIGZvcndhcmQgdGhlIGV2ZW50XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAvLyBEbyB0aGUgbmF2aWdhdGlvblxuICAgICAgICAgICAgdGhpcy5oaXN0b3J5Py5bdGhpcy5raW5kXSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKCkgPT4gdGhpcy5jb250YWluZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgdHJ1ZSkpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbkNsaWNrLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgc2V0VG9vbHRpcCh0aGlzLmNvbnRhaW5lckVsLCB0aGlzLm9sZExhYmVsKTtcbiAgICAgICAgdGhpcy5jb3VudC5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcIm1vZC1hY3RpdmVcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNldENvdW50KG51bTogbnVtYmVyKSB7IHRoaXMuY291bnQudGV4dENvbnRlbnQgPSBcIlwiICsgKG51bSB8fCBcIlwiKTsgfVxuXG4gICAgc2V0SGlzdG9yeShoaXN0b3J5ID0gSGlzdG9yeS5jdXJyZW50KCkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuaGlzdG9yeSA9IGhpc3RvcnkpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoaGlzdG9yeTogSGlzdG9yeSwgZWwgPSB0aGlzLmNvbnRhaW5lckVsKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlcyA9IHRoaXMuc3RhdGVzID0gaGlzdG9yeVt0aGlzLmRpciA8IDAgPyBcImxvb2tCZWhpbmRcIiA6IFwibG9va0FoZWFkXCJdKCk7XG4gICAgICAgIGlmIChlbD09PXRoaXMuY29udGFpbmVyRWwpIHRoaXMuc2V0Q291bnQoc3RhdGVzLmxlbmd0aCk7XG4gICAgICAgIHNldFRvb2x0aXAoZWwsIHN0YXRlcy5sZW5ndGggP1xuICAgICAgICAgICAgdGhpcy5vbGRMYWJlbCArIFwiXFxuXCIgKyB0aGlzLmZvcm1hdFN0YXRlKHN0YXRlc1swXSkudGl0bGUgOlxuICAgICAgICAgICAgYE5vICR7dGhpcy5raW5kfSBoaXN0b3J5YFxuICAgICAgICApO1xuICAgICAgICBlbC50b2dnbGVDbGFzcyhcIm1vZC1hY3RpdmVcIiwgc3RhdGVzLmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIG9wZW5NZW51KGV2dDoge2NsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyfSkge1xuICAgICAgICBpZiAoIXRoaXMuc3RhdGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoKTtcbiAgICAgICAgbWVudS5kb20uYWRkQ2xhc3MoXCJwYW5lLXJlbGllZi1oaXN0b3J5LW1lbnVcIik7XG4gICAgICAgIG1lbnUuZG9tLm9uKFwibW91c2Vkb3duXCIsIFwiLm1lbnUtaXRlbVwiLCBlID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO30sIHRydWUpO1xuICAgICAgICB0aGlzLnN0YXRlcy5tYXAodGhpcy5mb3JtYXRTdGF0ZS5iaW5kKHRoaXMpKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGluZm86IEZpbGVJbmZvLCBpZHgpID0+IHRoaXMubWVudUl0ZW0oaW5mbywgaWR4LCBtZW51KVxuICAgICAgICApO1xuICAgICAgICBtZW51LnNob3dBdFBvc2l0aW9uKHt4OiBldnQuY2xpZW50WCwgeTogZXZ0LmNsaWVudFkgKyAyMH0pO1xuICAgICAgICB0aGlzLm93bmVyLmhpc3RvcnlJc09wZW4gPSB0cnVlO1xuICAgICAgICBtZW51Lm9uSGlkZSgoKSA9PiB7IHRoaXMub3duZXIuaGlzdG9yeUlzT3BlbiA9IGZhbHNlOyB0aGlzLm93bmVyLmRpc3BsYXkoKTsgfSk7XG4gICAgfVxuXG4gICAgbWVudUl0ZW0oaW5mbzogRmlsZUluZm8sIGlkeDogbnVtYmVyLCBtZW51OiBNZW51KSB7XG4gICAgICAgIGNvbnN0IG15ID0gdGhpcztcbiAgICAgICAgbWVudS5hZGRJdGVtKGkgPT4geyBjcmVhdGVJdGVtKGkpOyBpZiAoaW5mby5maWxlKSBzZXR1cEZpbGVFdmVudHMoaS5kb20pOyB9KTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUl0ZW0oaTogTWVudUl0ZW0sIHByZWZpeD1cIlwiKSB7XG4gICAgICAgICAgICBpLnNldEljb24oaW5mby5pY29uKS5zZXRUaXRsZShwcmVmaXggKyBpbmZvLnRpdGxlKS5vbkNsaWNrKGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBoaXN0b3J5ID0gbXkuaGlzdG9yeTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgY3RybC9jbWQvbWlkZGxlIGJ1dHRvbiBhbmQgc3BsaXQgbGVhZiArIGNvcHkgaGlzdG9yeVxuICAgICAgICAgICAgICAgIGlmIChLZXltYXAuaXNNb2RpZmllcihlLCBcIk1vZFwiKSB8fCAxID09PSAoZSBhcyBNb3VzZUV2ZW50KS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeSA9IGhpc3RvcnkuY2xvbmVUbyhhcHAud29ya3NwYWNlLnNwbGl0QWN0aXZlTGVhZigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5nbygoaWR4KzEpICogbXkuZGlyLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBGaWxlRXZlbnRzKGRvbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEhvdmVyIHByZXZpZXdcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoJ2hvdmVyLWxpbmsnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBlLCBzb3VyY2U6IE5hdmlnYXRvci5ob3ZlclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJQYXJlbnQ6IG1lbnUuZG9tLCB0YXJnZXRFbDogZG9tLCBsaW5rdGV4dDogaW5mby5maWxlLnBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBEcmFnIG1lbnUgaXRlbSB0byBtb3ZlIG9yIGxpbmsgZmlsZVxuICAgICAgICAgICAgZG9tLnNldEF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHJhZ01hbmFnZXIgPSBhcHAuZHJhZ01hbmFnZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZHJhZ0RhdGEgPSBkcmFnTWFuYWdlci5kcmFnRmlsZShlLCBpbmZvLmZpbGUpO1xuICAgICAgICAgICAgICAgIGRyYWdNYW5hZ2VyLm9uRHJhZ1N0YXJ0KGUsIGRyYWdEYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBlID0+IG1lbnUuaGlkZSgpKTtcblxuICAgICAgICAgICAgLy8gRmlsZSBtZW51XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnUgPSBuZXcgTWVudSgpO1xuICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbShpID0+IGNyZWF0ZUl0ZW0oaSwgYEdvICR7bXkua2luZH0gdG8gYCkpLmFkZFNlcGFyYXRvcigpO1xuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2UudHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxlLW1lbnVcIiwgbWVudSwgaW5mby5maWxlLCBcImxpbmstY29udGV4dC1tZW51XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG1lbnUuc2hvd0F0UG9zaXRpb24oe3g6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZfSk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8ga2VlcCB0aGUgcGFyZW50IG1lbnUgb3BlbiBmb3Igbm93XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdFN0YXRlKGVudHJ5OiBIaXN0b3J5RW50cnkpOiBGaWxlSW5mbyB7XG4gICAgICAgIGNvbnN0IHt2aWV3U3RhdGU6IHt0eXBlLCBzdGF0ZX0sIGVTdGF0ZSwgcGF0aH0gPSBlbnRyeTtcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhdGggJiYgYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKSBhcyBURmlsZTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtpY29uOiBcIlwiLCB0aXRsZTogXCJcIiwgZmlsZSwgdHlwZSwgc3RhdGUsIGVTdGF0ZX07XG5cbiAgICAgICAgaWYgKG5vbkZpbGVWaWV3c1t0eXBlXSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBub25GaWxlVmlld3NbdHlwZV07XG4gICAgICAgIH0gZWxzZSBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBbXCJ0cmFzaFwiLCBcIk1pc3NpbmcgZmlsZSBcIitwYXRoXTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIGluZm8uaWNvbiA9IHZpZXd0eXBlSWNvbnNbdHlwZV0gPz8gXCJkb2N1bWVudFwiO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwibWFya2Rvd25cIiAmJiBzdGF0ZS5tb2RlID09PSBcInByZXZpZXdcIikgaW5mby5pY29uID0gXCJsaW5lcy1vZi10ZXh0XCI7XG4gICAgICAgICAgICBpbmZvLnRpdGxlID0gZmlsZSA/IGZpbGUuYmFzZW5hbWUgKyAoZmlsZS5leHRlbnNpb24gIT09IFwibWRcIiA/IFwiLlwiK2ZpbGUuZXh0ZW5zaW9uIDogXCJcIikgOiBcIk5vIGZpbGVcIjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm1lZGlhLXZpZXdcIiAmJiAhZmlsZSkgaW5mby50aXRsZSA9IHN0YXRlLmluZm8/LmZpbGVuYW1lID8/IGluZm8udGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoXCJwYW5lLXJlbGllZjpmb3JtYXQtaGlzdG9yeS1pdGVtXCIsIGluZm8pO1xuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KFxuICAgIGVsOiBIVE1MRWxlbWVudCxcbiAgICBldmVudDogSyxcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAodGhpczogSFRNTEVsZW1lbnQsIGV2OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLCBkZWxlZ2F0ZVRhcmdldDogSFRNTEVsZW1lbnQpID0+IGFueSxcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXG4pIHtcbiAgICBlbC5vbihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKVxuICAgIHJldHVybiAoKSA9PiBlbC5vZmYoZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXAoZWw6IEhUTUxFbGVtZW50LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBpZiAodGV4dCkgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0ZXh0IHx8IHVuZGVmaW5lZCk7XG4gICAgZWxzZSBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xufSIsImltcG9ydCB7UGx1Z2luLCBURmlsZSwgV29ya3NwYWNlTGVhZiwgV29ya3NwYWNlU3BsaXQsIFdvcmtzcGFjZVRhYnN9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7YWRkQ29tbWFuZHMsIGNvbW1hbmR9IGZyb20gXCIuL2NvbW1hbmRzXCI7XG5pbXBvcnQge0hpc3RvcnksIGluc3RhbGxIaXN0b3J5fSBmcm9tIFwiLi9IaXN0b3J5XCI7XG5pbXBvcnQge05hdmlnYXRpb24sIE5hdmlnYXRvciwgb25FbGVtZW50fSBmcm9tIFwiLi9OYXZpZ2F0b3JcIjtcbmltcG9ydCB7V2luZG93TWFuYWdlcn0gZnJvbSAnLi9QZXJXaW5kb3dDb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBXb3Jrc3BhY2Uge1xuICAgICAgICBvbih0eXBlOiBcInBhbmUtcmVsaWVmOnVwZGF0ZS1oaXN0b3J5XCIsIGNhbGxiYWNrOiAobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSkgPT4gYW55LCBjdHg/OiBhbnkpOiBFdmVudFJlZjtcbiAgICAgICAgcmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2Uoc291cmNlOiBzdHJpbmcsIGluZm86IHtkaXNwbGF5OiBzdHJpbmcsIGRlZmF1bHRNb2Q/OiBib29sZWFufSk6IHZvaWRcbiAgICAgICAgdW5yZWdpc3RlckhvdmVyTGlua1NvdXJjZShzb3VyY2U6IHN0cmluZyk6IHZvaWRcbiAgICAgICAgaXRlcmF0ZUxlYXZlcyhjYWxsYmFjazogKGl0ZW06IFdvcmtzcGFjZUxlYWYpID0+IHVua25vd24sIGl0ZW06IFdvcmtzcGFjZVBhcmVudCk6IGJvb2xlYW47XG4gICAgICAgIG9uTGF5b3V0Q2hhbmdlKCk6IHZvaWRcbiAgICB9XG4gICAgaW50ZXJmYWNlIEFwcCB7XG4gICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICAgICAgICBcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBvcG92ZXJzOiBIb3ZlclBvcG92ZXJbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlSXRlbSB7XG4gICAgICAgIGNvbnRhaW5lckVsOiBIVE1MRGl2RWxlbWVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlUGFyZW50IHtcbiAgICAgICAgY2hpbGRyZW46IFdvcmtzcGFjZUl0ZW1bXVxuICAgICAgICByZWNvbXB1dGVDaGlsZHJlbkRpbWVuc2lvbnMoKTogdm9pZFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlVGFicyBleHRlbmRzIFdvcmtzcGFjZVBhcmVudCB7XG4gICAgICAgIHNlbGVjdFRhYihsZWFmOiBXb3Jrc3BhY2VMZWFmKTogdm9pZFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIHBhcmVudFNwbGl0OiBXb3Jrc3BhY2VQYXJlbnRcbiAgICB9XG4gICAgaW50ZXJmYWNlIEhvdmVyUG9wb3ZlciB7XG4gICAgICAgIGxlYWY/OiBXb3Jrc3BhY2VMZWFmXG4gICAgICAgIHJvb3RTcGxpdD86IFdvcmtzcGFjZVNwbGl0XG4gICAgICAgIGhvdmVyRWw6IEhUTUxFbGVtZW50XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lUmVsaWVmIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgIG5hdiA9IG5ldyBXaW5kb3dNYW5hZ2VyKHRoaXMsIE5hdmlnYXRpb24pLndhdGNoKCk7XG5cbiAgICBvbmxvYWQoKSB7XG4gICAgICAgIGluc3RhbGxIaXN0b3J5KHRoaXMpO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2UoTmF2aWdhdG9yLmhvdmVyU291cmNlLCB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnSGlzdG9yeSBkcm9wZG93bnMnLCBkZWZhdWx0TW9kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oXCJyZW5hbWVcIiwgKGZpbGUsIG9sZFBhdGgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhcbiAgICAgICAgICAgICAgICAgICAgbGVhZiA9PiBIaXN0b3J5LmZvckxlYWYobGVhZikub25SZW5hbWUoZmlsZSwgb2xkUGF0aClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgbGVhZiA9PiB0aGlzLm5hdi5mb3JMZWFmKGxlYWYpLmRpc3BsYXkobGVhZikpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub24oXCJwYW5lLXJlbGllZjp1cGRhdGUtaGlzdG9yeVwiLCAobGVhZiwgaGlzdG9yeSkgPT4gdGhpcy5uYXYuZm9yTGVhZihsZWFmKS5vblVwZGF0ZUhpc3RvcnkobGVhZiwgaGlzdG9yeSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRDb21tYW5kcyh0aGlzLCB7XG4gICAgICAgICAgICBbY29tbWFuZChcInN3YXAtcHJldlwiLCBcIlN3YXAgcGFuZSB3aXRoIHByZXZpb3VzIGluIHNwbGl0XCIsICBcIk1vZCtTaGlmdCtQYWdlVXBcIildICAgKCl7IHJldHVybiB0aGlzLmxlYWZQbGFjZXIoLTEpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJzd2FwLW5leHRcIiwgXCJTd2FwIHBhbmUgd2l0aCBuZXh0IGluIHNwbGl0XCIsICAgICAgXCJNb2QrU2hpZnQrUGFnZURvd25cIildICgpeyByZXR1cm4gdGhpcy5sZWFmUGxhY2VyKCAxKTsgfSxcblxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby1wcmV2XCIsICBcIkN5Y2xlIHRvIHByZXZpb3VzIHdvcmtzcGFjZSBwYW5lXCIsICAgXCJNb2QrUGFnZVVwXCIgICldICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoLTEsIHRydWUpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby1uZXh0XCIsICBcIkN5Y2xlIHRvIG5leHQgd29ya3NwYWNlIHBhbmVcIiwgICAgICAgXCJNb2QrUGFnZURvd25cIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoIDEsIHRydWUpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi1wcmV2XCIsIFwiQ3ljbGUgdG8gcHJldmlvdXMgd2luZG93XCIsIFtdICldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KC0xLCB0cnVlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLW5leHRcIiwgXCJDeWNsZSB0byBuZXh0IHdpbmRvd1wiLCAgICAgW10gKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coIDEsIHRydWUpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTFzdFwiLCAgIFwiSnVtcCB0byAxc3QgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCsxXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDApOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby0ybmRcIiwgICBcIkp1bXAgdG8gMm5kIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrMlwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigxKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tM3JkXCIsICAgXCJKdW1wIHRvIDNyZCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzNcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoMik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTR0aFwiLCAgIFwiSnVtcCB0byA0dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs0XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDMpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby01dGhcIiwgICBcIkp1bXAgdG8gNXRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrNVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig0KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tNnRoXCIsICAgXCJKdW1wIHRvIDZ0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzZcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoNSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTd0aFwiLCAgIFwiSnVtcCB0byA3dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs3XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDYpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby04dGhcIiwgICBcIkp1bXAgdG8gOHRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrOFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig3KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tbGFzdFwiLCAgXCJKdW1wIHRvIGxhc3QgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsIFwiQWx0KzlcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoOTk5OTk5OTkpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi0xc3RcIiwgICBcIlN3aXRjaCB0byAxc3Qgd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDApOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tMm5kXCIsICAgXCJTd2l0Y2ggdG8gMm5kIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdygxKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTNyZFwiLCAgIFwiU3dpdGNoIHRvIDNyZCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coMik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi00dGhcIiwgICBcIlN3aXRjaCB0byA0dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDMpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tNXRoXCIsICAgXCJTd2l0Y2ggdG8gNXRoIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg0KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTZ0aFwiLCAgIFwiU3dpdGNoIHRvIDZ0aCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coNSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi03dGhcIiwgICBcIlN3aXRjaCB0byA3dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDYpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tOHRoXCIsICAgXCJTd2l0Y2ggdG8gOHRoIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg3KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLWxhc3RcIiwgIFwiU3dpdGNoIHRvIGxhc3Qgd2luZG93XCIsIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coOTk5OTk5OTkpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC0xc3RcIiwgIFwiUGxhY2UgYXMgMXN0IHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrMVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMCwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtMm5kXCIsICBcIlBsYWNlIGFzIDJuZCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzJcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDEsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTNyZFwiLCAgXCJQbGFjZSBhcyAzcmQgcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCszXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZigyLCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC00dGhcIiwgIFwiUGxhY2UgYXMgNHRoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrNFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMywgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtNXRoXCIsICBcIlBsYWNlIGFzIDV0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzVcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDQsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTZ0aFwiLCAgXCJQbGFjZSBhcyA2dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs2XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig1LCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC03dGhcIiwgIFwiUGxhY2UgYXMgN3RoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrN1wiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoNiwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtOHRoXCIsICBcIlBsYWNlIGFzIDh0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzhcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDcsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LWxhc3RcIiwgXCJQbGFjZSBhcyBsYXN0IHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgIFwiTW9kK0FsdCs5XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig5OTk5OTk5OSwgZmFsc2UpOyB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UudW5yZWdpc3RlckhvdmVyTGlua1NvdXJjZShOYXZpZ2F0b3IuaG92ZXJTb3VyY2UpO1xuICAgIH1cblxuICAgIGdvdG9OdGhMZWFmKG46IG51bWJlciwgcmVsYXRpdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmF2ID0gdGhpcy5uYXYuZm9yTGVhZihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpO1xuICAgICAgICBjb25zdCBsZWFmID0gZ290b050aChuYXYubGVhdmVzKCksIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLCBuLCByZWxhdGl2ZSk7XG4gICAgICAgICFsZWFmIHx8IHRoaXMuYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGdvdG9OdGhXaW5kb3cobjogbnVtYmVyLCByZWxhdGl2ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuYXYgPSBnb3RvTnRoKHRoaXMubmF2LmZvckFsbCgpLCB0aGlzLm5hdi5mb3JMZWFmKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiksIG4sIHJlbGF0aXZlKTtcbiAgICAgICAgY29uc3QgbGVhZiA9IG5hdj8ubGF0ZXN0TGVhZigpO1xuICAgICAgICBpZiAobGVhZikgYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgICAgICAobmF2Py53aW4gYXMgYW55KS5yZXF1aXJlPy4oJ2VsZWN0cm9uJyk/LnJlbW90ZT8uZ2V0Q3VycmVudFdpbmRvdygpPy5mb2N1cygpO1xuICAgIH1cblxuICAgIHBsYWNlTGVhZih0b1BvczogbnVtYmVyLCByZWxhdGl2ZT10cnVlKSB7XG4gICAgICAgIGNvbnN0IGNiID0gdGhpcy5sZWFmUGxhY2VyKHRvUG9zLCByZWxhdGl2ZSk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICBsZWFmUGxhY2VyKHRvUG9zOiBudW1iZXIsIHJlbGF0aXZlPXRydWUpIHtcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAoIWxlYWYpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdFxuICAgICAgICAgICAgcGFyZW50U3BsaXQgPSBsZWFmLnBhcmVudFNwbGl0LFxuICAgICAgICAgICAgY2hpbGRyZW4gPSBwYXJlbnRTcGxpdC5jaGlsZHJlbixcbiAgICAgICAgICAgIGZyb21Qb3MgPSBjaGlsZHJlbi5pbmRleE9mKGxlYWYpXG4gICAgICAgIDtcbiAgICAgICAgaWYgKGZyb21Qb3MgPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgIHRvUG9zICs9IGZyb21Qb3M7XG4gICAgICAgICAgICBpZiAodG9Qb3MgPCAwIHx8IHRvUG9zID49IGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRvUG9zID49IGNoaWxkcmVuLmxlbmd0aCkgdG9Qb3MgPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHRvUG9zIDwgMCkgdG9Qb3MgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21Qb3MgPT0gdG9Qb3MpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBjaGlsZHJlblt0b1Bvc107XG4gICAgICAgICAgICBjaGlsZHJlbi5zcGxpY2UoZnJvbVBvcywgMSk7XG4gICAgICAgICAgICBjaGlsZHJlbi5zcGxpY2UodG9Qb3MsICAgMCwgbGVhZik7XG4gICAgICAgICAgICBpZiAoKHBhcmVudFNwbGl0IGFzIFdvcmtzcGFjZVRhYnMpLnNlbGVjdFRhYikge1xuICAgICAgICAgICAgICAgIChwYXJlbnRTcGxpdCBhcyBXb3Jrc3BhY2VUYWJzKS5zZWxlY3RUYWIobGVhZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyLmNvbnRhaW5lckVsLmluc2VydEFkamFjZW50RWxlbWVudChmcm9tUG9zID4gdG9Qb3MgPyBcImJlZm9yZWJlZ2luXCIgOiBcImFmdGVyZW5kXCIsIGxlYWYuY29udGFpbmVyRWwpO1xuICAgICAgICAgICAgICAgIHBhcmVudFNwbGl0LnJlY29tcHV0ZUNoaWxkcmVuRGltZW5zaW9ucygpO1xuICAgICAgICAgICAgICAgIGxlYWYub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRDaGFuZ2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGZvY3VzIGJhY2sgdG8gcGFuZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnNldEFjdGl2ZUxlYWYobGVhZiwgZmFsc2UsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdvdG9OdGg8VD4oaXRlbXM6IFRbXSwgY3VycmVudDogVCwgbjogbnVtYmVyLCByZWxhdGl2ZTogYm9vbGVhbik6IFQge1xuICAgIGlmIChyZWxhdGl2ZSkge1xuICAgICAgICBuICs9IGl0ZW1zLmluZGV4T2YoY3VycmVudCk7XG4gICAgICAgIG4gPSAobiArIGl0ZW1zLmxlbmd0aCkgJSBpdGVtcy5sZW5ndGg7ICAvLyB3cmFwIGFyb3VuZFxuICAgIH1cbiAgICByZXR1cm4gaXRlbXNbbiA+PSBpdGVtcy5sZW5ndGggPyBpdGVtcy5sZW5ndGgtMSA6IG5dO1xufSJdLCJuYW1lcyI6WyJOb3RpY2UiLCJXb3Jrc3BhY2VMZWFmIiwiQ29tcG9uZW50IiwiTWVudSIsIktleW1hcCIsIlRGaWxlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFNQSxNQUFNLFFBQVEsR0FBNEIsRUFBRSxDQUFDO0FBRTdCLFNBQUEsT0FBTyxDQUFDLEVBQVUsRUFBRSxJQUFZLEVBQUUsT0FBQSxHQUE2QixFQUFFLEVBQUUsR0FBRyxHQUFDLEVBQUUsRUFBQTs7O0lBSXJGLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtBQUFFLFFBQUEsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckQsSUFBQSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSyxPQUFrQixDQUFDLEdBQUc7QUFBRSxRQUFBLE9BQU8sR0FBRyxDQUFDLE9BQWlCLENBQUMsQ0FBQztBQUUxRixJQUFBLElBQUksSUFBSSxHQUFjLE9BQW9CLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFBOztRQUV2RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7QUFBRSxZQUFBLE9BQU8sR0FBRyxDQUFDOztRQUV4QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLFFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFtQixFQUFFLEdBQUcsRUFBRSxL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LENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBSSxtQ0FBbUMsRUFBRyxPQUFPLENBQUMsQ0FBQyxHQUFNLEVBQUEsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUksbUNBQW1DLEVBQUcsT0FBTyxDQUFDLENBQUMsR0FBTSxFQUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFJLG1DQUFtQyxFQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBSSxtQ0FBbUMsRUFBRyxPQUFPLENBQUMsQ0FBQyxHQUFNLEVBQUEsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUksbUNBQW1DLEVBQUcsT0FBTyxDQUFDLENBQUMsR0FBTSxFQUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFJLG1DQUFtQyxFQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBSSxtQ0FBbUMsRUFBRyxPQUFPLENBQUMsQ0FBQyxHQUFNLEVBQUEsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUksbUNBQW1DLEVBQUcsT0FBTyxDQUFDLENBQUMsR0FBTSxFQUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFHLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBRXBILFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFHLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBRXZKLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRyxnQ0FBZ0MsRUFBTSxXQUFXLENBQUMsQ0FBQyxHQUFBLEVBQU0sT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEgsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFHLGdDQUFnQyxFQUFNLFdBQVcsQ0FBQyxDQUFDLEdBQUEsRUFBTSxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0SCxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUcsZ0NBQWdDLEVBQU0sV0FBVyxDQUFDLENBQUMsR0FBQSxFQUFNLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RILENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRyxnQ0FBZ0MsRUFBTSxXQUFXLENBQUMsQ0FBQyxHQUFBLEVBQU0sT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEgsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFHLGdDQUFnQyxFQUFNLFdBQVcsQ0FBQyxDQUFDLEdBQUEsRUFBTSxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0SCxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUcsZ0NBQWdDLEVBQU0sV0FBVyxDQUFDLENBQUMsR0FBQSxFQUFNLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RILENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRyxnQ0FBZ0MsRUFBTSxXQUFXLENBQUMsQ0FBQyxHQUFBLEVBQU0sT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEgsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFHLGdDQUFnQyxFQUFNLFdBQVcsQ0FBQyxDQUFDLEdBQUEsRUFBTSxPQUFPLE1BQU0sSUFB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
