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
    // Proxy the window history with a wrapper that delegates to the active leaf's History object,
    const realHistory = window.history;
    plugin.register(() => window.history = realHistory);
    Object.defineProperty(window, "history", { enumerable: true, configurable: true, writable: true, value: {
            get state() { return History.current().state; },
            get length() { return History.current().length; },
            back() { if (!plugin.isSyntheticHistoryEvent(3))
                this.go(-1); },
            forward() { if (!plugin.isSyntheticHistoryEvent(4))
                this.go(1); },
            go(by) { History.current().go(by); },
            replaceState(state, title, url) { History.current().replaceState(state, title, url); },
            pushState(state, title, url) { History.current().pushState(state, title, url); },
            get scrollRestoration() { return realHistory.scrollRestoration; },
            set scrollRestoration(val) { realHistory.scrollRestoration = val; },
        } });
}

/**
 * Efficiently update a class on a workspace item, only touching where changes are needed
 *
 * @param item The workspace item to add or remove the class from
 * @param cls The class to add or remove
 * @param state Boolean, flag to add or remove, defaults to opposite of current state
 * @returns boolean for the state of the class afterwards
 */
function toggleClass(item, cls, state) {
    const el = item.containerEl, had = el.classList.contains(cls);
    state = state ?? !had;
    if (state !== had) {
        state ? el.classList.add(cls) : el.classList.remove(cls);
    }
    return state;
}
class Maximizer extends obsidian.Component {
    constructor() {
        super(...arguments);
        this.fixSlidingPanes = obsidian.debounce(() => {
            if (app.plugins.plugins["sliding-panes-obsidian"]) {
                app.workspace.onLayoutChange();
                app.workspace.requestActiveLeafEvents();
            }
        }, 5);
    }
    onload() {
        this.registerEvent(app.workspace.on("layout-change", () => {
            for (const parent of this.parents())
                this.refresh(parent);
        }));
        const self = this;
        this.register(around(app.workspace, {
            setActiveLeaf(old) {
                return function setActiveLeaf(leaf, pushHistory, focus) {
                    // We have to do this here so that MarkdownView can be focused in the new pane
                    const parent = self.parentFor(leaf);
                    if (parent)
                        self.refresh(parent, parent.containerEl.hasClass("should-maximize") ? leaf : null);
                    return old.call(this, leaf, pushHistory, focus);
                };
            }
        }));
    }
    onunload() {
        // Un-maximize all panes
        for (const parent of this.parents())
            this.refresh(parent, null);
    }
    toggleMaximize(leaf = app.workspace.activeLeaf) {
        const parent = this.parentFor(leaf);
        if (!parent)
            return;
        const popoverEl = parent.containerEl.matchParent(".hover-popover");
        if (popoverEl && app.plugins.plugins["obsidian-hover-editor"]) {
            // Check if single leaf in a popover
            let count = 0;
            app.workspace.iterateLeaves(() => { count++; }, parent);
            if (count === 1) {
                // Maximize or restore the popover instead of the leaf
                app.commands.executeCommandById("obsidian-hover-editor:" + (popoverEl.hasClass("snap-to-viewport") ? "restore-active-popover" : "snap-active-popover-to-viewport"));
                return;
            }
        }
        if (parent)
            this.refresh(parent, toggleClass(parent, "should-maximize") ? leaf : null);
    }
    lastMaximized(parent) {
        let result = null;
        app.workspace.iterateLeaves(leaf => { if (leaf.containerEl.hasClass("is-maximized"))
            result = leaf; }, parent);
        return result || app.workspace.getMostRecentLeaf();
    }
    refresh(parent, leaf = parent.containerEl.hasClass("should-maximize") ? this.lastMaximized(parent) : null) {
        function walk(parent) {
            let haveMatch = false, match = false;
            for (const item of parent.children) {
                if (item instanceof obsidian.WorkspaceLeaf) {
                    toggleClass(item, "is-maximized", match = (leaf === item));
                }
                else if (item instanceof obsidian.WorkspaceParent) {
                    match = walk(item);
                }
                haveMatch || (haveMatch = match);
            }
            return toggleClass(parent, "has-maximized", haveMatch);
        }
        const hadMax = parent.containerEl.hasClass("has-maximized");
        if (!walk(parent)) {
            toggleClass(parent, "should-maximize", false);
            if (hadMax)
                this.fixSlidingPanes();
        }
    }
    parents() {
        const parents = [app.workspace.rootSplit];
        parents.concat(app.workspace.floatingSplit?.children ?? []);
        const popovers = app.plugins.plugins["obsidian-hover-editor"]?.activePopovers;
        if (popovers)
            for (const popover of popovers) {
                if (popover.rootSplit)
                    parents.push(popover.rootSplit);
            }
        return parents;
    }
    parentFor(leaf) {
        if (!leaf || leaf.containerEl.matchParent(".workspace-tabs"))
            return null;
        const container = leaf.getContainer?.();
        if (container && container.containerEl.hasClass("mod-root"))
            return container;
        const popoverEl = leaf.containerEl.matchParent(".hover-popover");
        if (popoverEl) {
            const popovers = app.plugins.plugins["obsidian-hover-editor"]?.activePopovers;
            if (popovers)
                for (const popover of popovers) {
                    if (popoverEl.contains(popover.rootSplit.containerEl))
                        return popover.rootSplit;
                }
        }
        return app.workspace.rootSplit;
    }
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
    constructor(plugin, win) {
        super();
        this.plugin = plugin;
        this.win = win;
    }
    get root() {
        return containerForWindow(this.win);
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
            inst = new this.factory(this.plugin, win);
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
        return this.forLeaf(view.leaf, create);
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
            if (leaf)
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
        return this.leaves().reduce((best, leaf) => { return (!best || best.activeTime < leaf.activeTime) ? leaf : best; }, null);
    }
    onload() {
        // Override default mouse history behavior.  We need this because 1) Electron will use the built-in
        // history object if we don't (instead of our wrapper), and 2) we want the click to apply to the leaf
        // that was under the mouse, rather than whichever leaf was active.
        const { document } = this.win;
        document.addEventListener("mouseup", historyHandler, true);
        document.addEventListener("mousedown", historyHandler, true);
        this.register(() => {
            document.removeEventListener("mouseup", historyHandler, true);
            document.removeEventListener("mousedown", historyHandler, true);
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
        this.nav = Navigation.perWindow(this).watch();
        this.max = this.addChild(new Maximizer);
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
            [command("put-last", "Place as last pane in the split", "Mod+Alt+9")]() { return () => this.placeLeaf(99999999, false); },
            [command("maximize", "Maximize active pane (Toggle)", [])]() {
                if (this.max.parentFor(app.workspace.activeLeaf))
                    return () => this.max.toggleMaximize();
            },
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
    isSyntheticHistoryEvent(button) {
        const win = this.nav.windows().filter(win => win.event && win.event.button === button).pop();
        if (win && win.event.type === "mousedown") {
            win.event.preventDefault();
            win.event.stopImmediatePropagation();
            return true;
        }
        return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzLnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL21vbmtleS1hcm91bmRAMi4zLjAvbm9kZV9tb2R1bGVzL21vbmtleS1hcm91bmQvbWpzL2luZGV4LmpzIiwic3JjL0hpc3RvcnkudHMiLCJzcmMvbWF4aW1pemluZy50cyIsInNyYy9QZXJXaW5kb3dDb21wb25lbnQudHMiLCJzcmMvTmF2aWdhdG9yLnRzIiwic3JjL3BhbmUtcmVsaWVmLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNpbXBsaWZpZWQgQ29tbWFuZHMgRnJhbWV3b3JrXG5cbmltcG9ydCB7Q29tbWFuZCwgSG90a2V5LCBNb2RpZmllciwgUGx1Z2lufSBmcm9tIFwib2JzaWRpYW5cIlxuXG50eXBlIEtleURlZiA9IEhvdGtleSB8IHN0cmluZ1xuXG5jb25zdCBjb21tYW5kczogUmVjb3JkPHN5bWJvbCwgQ29tbWFuZD4gPSB7fTsgLy9uZXcgTWFwO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGhvdGtleXM6IEtleURlZiB8IEtleURlZltdID0gW10sIGNtZD17fSkge1xuXG4gICAgLy8gQWxsb3cgaG90a2V5cyB0byBiZSBleHByZXNzZWQgYXMgYSBzdHJpbmcsIGFycmF5IG9mIHN0cmluZ3MsXG4gICAgLy8gb2JqZWN0LCBvciBhcnJheSBvZiBvYmplY3RzLiAgKE5vcm1hbGl6ZSB0byBhbiBhcnJheSBmaXJzdC4pXG4gICAgaWYgKHR5cGVvZiBob3RrZXlzID09PSBcInN0cmluZ1wiKSBob3RrZXlzID0gW2hvdGtleXNdO1xuICAgIGlmICh0eXBlb2YgaG90a2V5cyA9PT0gXCJvYmplY3RcIiAmJiAoaG90a2V5cyBhcyBIb3RrZXkpLmtleSkgaG90a2V5cyA9IFtob3RrZXlzIGFzIEhvdGtleV07XG5cbiAgICBsZXQga2V5czogSG90a2V5W10gPSAoaG90a2V5cyBhcyBLZXlEZWZbXSkubWFwKGZ1bmN0aW9uKGtleSk6IEhvdGtleSB7XG4gICAgICAgIC8vIElmIGEgaG90a2V5IGlzIGFuIG9iamVjdCBhbHJlYWR5LCBubyBuZWVkIHRvIHByb2Nlc3MgaXRcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIpIHJldHVybiBrZXk7XG4gICAgICAgIC8vIENvbnZlcnQgc3RyaW5ncyB0byBPYnNpZGlhbidzIGhvdGtleSBmb3JtYXRcbiAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiK1wiKVxuICAgICAgICByZXR1cm4geyBtb2RpZmllcnM6IHBhcnRzIGFzIE1vZGlmaWVyW10sIGtleTogcGFydHMucG9wKCkgfHwgXCIrXCIgfSAgLy8gZW1wdHkgbGFzdCBwYXJ0ID0gZS5nLiAnTW9kKysnXG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihjbWQsIHtpZCwgbmFtZSwgaG90a2V5czoga2V5c30pO1xuXG4gICAgLy8gU2F2ZSB0aGUgY29tbWFuZCBkYXRhIHVuZGVyIGEgdW5pcXVlIHN5bWJvbFxuICAgIGNvbnN0IHN5bSA9IFN5bWJvbChcImNtZDpcIiArIGlkKTtcbiAgICBjb21tYW5kc1tzeW1dID0gY21kIGFzIENvbW1hbmQ7XG4gICAgcmV0dXJuIHN5bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1hbmRzPFAgZXh0ZW5kcyBQbHVnaW4+KFxuICAgIHBsdWdpbjogUCxcbiAgICBjbWRzZXQ6IFJlY29yZDxzeW1ib2wsICh0aGlzQXJnOiBQKSA9PiBib29sZWFuIHwgKCgpID0+IGFueSk+XG4pIHtcbiAgICAvLyBFeHRyYWN0IGNvbW1hbmQgc3ltYm9scyBmcm9tIGNtZHNldCBhbmQgcmVnaXN0ZXIgdGhlbSwgYm91bmQgdG8gdGhlIHBsdWdpbiBmb3IgbWV0aG9kc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY21kc2V0KS5mb3JFYWNoKHN5bSA9PiB7XG4gICAgICAgIGNvbnN0IGNtZCA9IGNvbW1hbmRzW3N5bV0sIG1ldGhvZCA9IGNtZHNldFtzeW1dO1xuICAgICAgICBpZiAoY21kKSBwbHVnaW4uYWRkQ29tbWFuZChPYmplY3QuYXNzaWduKHt9LCBjbWQsIHtcbiAgICAgICAgICAgIGNoZWNrQ2FsbGJhY2soY2hlY2s6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBtZXRob2QgYm9keSB3aXRoIHRoZSBwbHVnaW4gYXMgJ3RoaXMnXG4gICAgICAgICAgICAgICAgY29uc3QgY2IgPSBtZXRob2QuY2FsbChwbHVnaW4pO1xuICAgICAgICAgICAgICAgIC8vIEl0IHRoZW4gcmV0dXJucyBhIGNsb3N1cmUgaWYgdGhlIGNvbW1hbmQgaXMgcmVhZHkgdG8gZXhlY3V0ZSwgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UgY2FsbCB0aGF0IGNsb3N1cmUgdW5sZXNzIHRoaXMgaXMganVzdCBhIGNoZWNrIGZvciBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gKGNoZWNrIHx8IHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKSA/ICEhY2IgOiAoY2IoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KVxufSIsImV4cG9ydCBmdW5jdGlvbiBhcm91bmQob2JqLCBmYWN0b3JpZXMpIHtcbiAgICBjb25zdCByZW1vdmVycyA9IE9iamVjdC5rZXlzKGZhY3RvcmllcykubWFwKGtleSA9PiBhcm91bmQxKG9iaiwga2V5LCBmYWN0b3JpZXNba2V5XSkpO1xuICAgIHJldHVybiByZW1vdmVycy5sZW5ndGggPT09IDEgPyByZW1vdmVyc1swXSA6IGZ1bmN0aW9uICgpIHsgcmVtb3ZlcnMuZm9yRWFjaChyID0+IHIoKSk7IH07XG59XG5mdW5jdGlvbiBhcm91bmQxKG9iaiwgbWV0aG9kLCBjcmVhdGVXcmFwcGVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBvYmpbbWV0aG9kXSwgaGFkT3duID0gb2JqLmhhc093blByb3BlcnR5KG1ldGhvZCk7XG4gICAgbGV0IGN1cnJlbnQgPSBjcmVhdGVXcmFwcGVyKG9yaWdpbmFsKTtcbiAgICAvLyBMZXQgb3VyIHdyYXBwZXIgaW5oZXJpdCBzdGF0aWMgcHJvcHMgZnJvbSB0aGUgd3JhcHBpbmcgbWV0aG9kLFxuICAgIC8vIGFuZCB0aGUgd3JhcHBpbmcgbWV0aG9kLCBwcm9wcyBmcm9tIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICBpZiAob3JpZ2luYWwpXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjdXJyZW50LCBvcmlnaW5hbCk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHdyYXBwZXIsIGN1cnJlbnQpO1xuICAgIG9ialttZXRob2RdID0gd3JhcHBlcjtcbiAgICAvLyBSZXR1cm4gYSBjYWxsYmFjayB0byBhbGxvdyBzYWZlIHJlbW92YWxcbiAgICByZXR1cm4gcmVtb3ZlO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGJlZW4gZGVhY3RpdmF0ZWQgYW5kIGFyZSBubyBsb25nZXIgd3JhcHBlZCwgcmVtb3ZlIG91cnNlbHZlc1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwgJiYgb2JqW21ldGhvZF0gPT09IHdyYXBwZXIpXG4gICAgICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgLy8gSWYgbm8gb3RoZXIgcGF0Y2hlcywganVzdCBkbyBhIGRpcmVjdCByZW1vdmFsXG4gICAgICAgIGlmIChvYmpbbWV0aG9kXSA9PT0gd3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKGhhZE93bilcbiAgICAgICAgICAgICAgICBvYmpbbWV0aG9kXSA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbbWV0aG9kXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEVsc2UgcGFzcyBmdXR1cmUgY2FsbHMgdGhyb3VnaCwgYW5kIHJlbW92ZSB3cmFwcGVyIGZyb20gdGhlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICBjdXJyZW50ID0gb3JpZ2luYWw7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBvcmlnaW5hbCB8fCBGdW5jdGlvbik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwZShrZXksIG9sZEZuLCBuZXdGbikge1xuICAgIGNoZWNrW2tleV0gPSBrZXk7XG4gICAgcmV0dXJuIGNoZWNrO1xuICAgIGZ1bmN0aW9uIGNoZWNrKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIChvbGRGbltrZXldID09PSBrZXkgPyBvbGRGbiA6IG5ld0ZuKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXIocHJvbWlzZSwgY2IpIHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGNiLCBjYik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKGFzeW5jRnVuY3Rpb24pIHtcbiAgICBsZXQgbGFzdFJ1biA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gbGFzdFJ1biA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgYWZ0ZXIobGFzdFJ1biwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFzeW5jRnVuY3Rpb24uYXBwbHkodGhpcywgYXJncykudGhlbihyZXMsIHJlaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdyYXBwZXIuYWZ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0UnVuID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7IGFmdGVyKGxhc3RSdW4sIHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCJpbXBvcnQge05vdGljZSwgVEFic3RyYWN0RmlsZSwgVmlld1N0YXRlLCBXb3Jrc3BhY2VMZWFmfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge2Fyb3VuZH0gZnJvbSBcIm1vbmtleS1hcm91bmRcIjtcbmltcG9ydCBQYW5lUmVsaWVmIGZyb20gXCIuL3BhbmUtcmVsaWVmXCI7XG5cbmNvbnN0IEhJU1RfQVRUUiA9IFwicGFuZS1yZWxpZWY6aGlzdG9yeS12MVwiO1xuY29uc3QgU0VSSUFMX1BST1AgPSBcInBhbmUtcmVsaWVmOmhpc3RvcnktdjFcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlIHtcbiAgICAgICAgZGVzZXJpYWxpemVMYXlvdXQoc3RhdGU6IGFueSwgLi4uZXRjOiBhbnlbXSk6IFByb21pc2U8V29ya3NwYWNlSXRlbT5cbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIFtISVNUX0FUVFJdOiBIaXN0b3J5XG4gICAgICAgIHBpbm5lZDogYm9vbGVhblxuICAgICAgICB3b3JraW5nOiBib29sZWFuXG4gICAgICAgIHNlcmlhbGl6ZSgpOiBhbnlcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgICAgICAgcG9wc3RhdGU/OiBib29sZWFuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBkb21MZWF2ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5pbnRlcmZhY2UgUHVzaFN0YXRlIHtcbiAgICBzdGF0ZTogc3RyaW5nXG4gICAgZVN0YXRlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEhpc3RvcnlFbnRyeSB7XG5cbiAgICByYXc6IFB1c2hTdGF0ZVxuICAgIGVTdGF0ZTogYW55XG4gICAgcGF0aDogc3RyaW5nXG5cbiAgICBjb25zdHJ1Y3RvcihyYXdTdGF0ZTogUHVzaFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocmF3U3RhdGUpO1xuICAgIH1cblxuXG4gICAgZ2V0IHZpZXdTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5yYXcuc3RhdGUgfHwgXCJ7fVwiKVxuICAgIH1cblxuICAgIHNldFN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yYXcgPSByYXdTdGF0ZTtcbiAgICAgICAgdGhpcy5lU3RhdGUgPSBKU09OLnBhcnNlKHJhd1N0YXRlLmVTdGF0ZSB8fCBcIm51bGxcIik7XG4gICAgICAgIHRoaXMucGF0aCA9IHRoaXMudmlld1N0YXRlLnN0YXRlPy5maWxlO1xuICAgIH1cblxuICAgIG9uUmVuYW1lKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wYXRoID09PSBvbGRQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3U3RhdGUgPSB0aGlzLnZpZXdTdGF0ZVxuICAgICAgICAgICAgdGhpcy5wYXRoID0gdmlld1N0YXRlLnN0YXRlLmZpbGUgPSBmaWxlLnBhdGhcbiAgICAgICAgICAgIHRoaXMucmF3LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkodmlld1N0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvKGxlYWY/OiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIGxldCB7dmlld1N0YXRlLCBwYXRoLCBlU3RhdGV9ID0gdGhpcztcbiAgICAgICAgbGV0IGZpbGUgPSBwYXRoICYmIGFwcD8udmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpO1xuICAgICAgICBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIk1pc3NpbmcgZmlsZTogXCIrcGF0aCk7XG4gICAgICAgICAgICB2aWV3U3RhdGUgPSB7dHlwZTogXCJlbXB0eVwiLCBzdGF0ZTp7fX07XG4gICAgICAgICAgICBlU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVhZi5zZXRWaWV3U3RhdGUoey4uLnZpZXdTdGF0ZSwgYWN0aXZlOiB0cnVlLCBwb3BzdGF0ZTogdHJ1ZX0sIGVTdGF0ZSk7XG4gICAgfVxuXG4gICAgcmVwbGFjZVN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUpIHtcbiAgICAgICAgaWYgKHJhd1N0YXRlLnN0YXRlICE9PSB0aGlzLnJhdy5zdGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgdmlld1N0YXRlID0gSlNPTi5wYXJzZShyYXdTdGF0ZS5zdGF0ZSB8fCBcInt9XCIpO1xuICAgICAgICAgICAgLy8gRG9uJ3QgcmVwbGFjZSBhIGZpbGUgd2l0aCBhbiBlbXB0eSBpbiB0aGUgaGlzdG9yeVxuICAgICAgICAgICAgaWYgKHZpZXdTdGF0ZS50eXBlID09PSBcImVtcHR5XCIpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgLy8gRmlsZSBpcyBkaWZmZXJlbnQgZnJvbSBleGlzdGluZyBmaWxlOiBzaG91bGQgYmUgYSBwdXNoIGluc3RlYWRcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdGggJiYgdGhpcy5wYXRoICE9PSB2aWV3U3RhdGU/LnN0YXRlPy5maWxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAodmlld1N0YXRlLnR5cGUgPT09IFwibWVkaWEtdmlld1wiKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkSW5mbyA9IEpTT04uc3RyaW5naWZ5KHRoaXMudmlld1N0YXRlLnN0YXRlLmluZm8pO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0luZm8gPSBKU09OLnN0cmluZ2lmeSh2aWV3U3RhdGUuc3RhdGUuaW5mbyk7XG4gICAgICAgICAgICAgICAgaWYgKG9sZEluZm8gIT09IG5ld0luZm8pIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHJhd1N0YXRlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5pbnRlcmZhY2UgU2VyaWFsaXphYmxlSGlzdG9yeSB7XG4gICAgcG9zOiBudW1iZXJcbiAgICBzdGFjazogUHVzaFN0YXRlW11cbn1cblxuZXhwb3J0IGNsYXNzIEhpc3Rvcnkge1xuICAgIHN0YXRpYyBjdXJyZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JMZWFmKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZikgfHwgbmV3IHRoaXMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIGlmIChsZWFmKSBkb21MZWF2ZXMuc2V0KGxlYWYuY29udGFpbmVyRWwsIGxlYWYpO1xuICAgICAgICBpZiAobGVhZikgcmV0dXJuIGxlYWZbSElTVF9BVFRSXSBpbnN0YW5jZW9mIHRoaXMgP1xuICAgICAgICAgICAgbGVhZltISVNUX0FUVFJdIDpcbiAgICAgICAgICAgIGxlYWZbSElTVF9BVFRSXSA9IG5ldyB0aGlzKGxlYWYsIGxlYWZbSElTVF9BVFRSXT8uc2VyaWFsaXplKCkgfHwgdW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBwb3M6IG51bWJlclxuICAgIHN0YWNrOiBIaXN0b3J5RW50cnlbXVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGxlYWY/OiBXb3Jrc3BhY2VMZWFmLCB7cG9zLCBzdGFja306IFNlcmlhbGl6YWJsZUhpc3RvcnkgPSB7cG9zOjAsIHN0YWNrOltdfSkge1xuICAgICAgICB0aGlzLmxlYWYgPSBsZWFmO1xuICAgICAgICB0aGlzLnBvcyA9IHBvcztcbiAgICAgICAgdGhpcy5zdGFjayA9IHN0YWNrLm1hcChyYXcgPT4gbmV3IEhpc3RvcnlFbnRyeShyYXcpKTtcbiAgICB9XG5cbiAgICBjbG9uZVRvKGxlYWY6IFdvcmtzcGFjZUxlYWYpIHtcbiAgICAgICAgcmV0dXJuIGxlYWZbSElTVF9BVFRSXSA9IG5ldyBIaXN0b3J5KGxlYWYsIHRoaXMuc2VyaWFsaXplKCkpO1xuICAgIH1cblxuICAgIG9uUmVuYW1lKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgICAgICBmb3IoY29uc3QgaGlzdEVudHJ5IG9mIHRoaXMuc3RhY2spIGhpc3RFbnRyeS5vblJlbmFtZShmaWxlLCBvbGRQYXRoKTtcbiAgICB9XG5cbiAgICBzZXJpYWxpemUoKTogU2VyaWFsaXphYmxlSGlzdG9yeSB7IHJldHVybiB7cG9zOiB0aGlzLnBvcywgc3RhY2s6IHRoaXMuc3RhY2subWFwKGUgPT4gZS5yYXcpfTsgfVxuXG4gICAgZ2V0IHN0YXRlKCkgeyByZXR1cm4gdGhpcy5zdGFja1t0aGlzLnBvc10/LnJhdyB8fCBudWxsOyB9XG4gICAgZ2V0IGxlbmd0aCgpIHsgcmV0dXJuIHRoaXMuc3RhY2subGVuZ3RoOyB9XG5cbiAgICBiYWNrKCkgICAgeyB0aGlzLmdvKC0xKTsgfVxuICAgIGZvcndhcmQoKSB7IHRoaXMuZ28oIDEpOyB9XG5cbiAgICBsb29rQWhlYWQoKSB7IHJldHVybiB0aGlzLnN0YWNrLnNsaWNlKDAsIHRoaXMucG9zKS5yZXZlcnNlKCk7IH1cbiAgICBsb29rQmVoaW5kKCkgeyByZXR1cm4gdGhpcy5zdGFjay5zbGljZSh0aGlzLnBvcysxKTsgfVxuXG4gICAgYW5ub3VuY2UoKSB7XG4gICAgICAgIGFwcD8ud29ya3NwYWNlPy50cmlnZ2VyKFwicGFuZS1yZWxpZWY6dXBkYXRlLWhpc3RvcnlcIiwgdGhpcy5sZWFmLCB0aGlzKTtcbiAgICB9XG5cbiAgICBnb3RvKHBvczogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5sZWFmKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmxlYWYucGlubmVkKSByZXR1cm4gbmV3IE5vdGljZShcIlBpbm5lZCBwYW5lOiB1bnBpbiBiZWZvcmUgZ29pbmcgZm9yd2FyZCBvciBiYWNrXCIpLCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmxlYWYud29ya2luZykgcmV0dXJuIG5ldyBOb3RpY2UoXCJQYW5lIGlzIGJ1c3k6IHBsZWFzZSB3YWl0IGJlZm9yZSBuYXZpZ2F0aW5nIGZ1cnRoZXJcIiksIHVuZGVmaW5lZDtcbiAgICAgICAgcG9zID0gdGhpcy5wb3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwb3MsIHRoaXMuc3RhY2subGVuZ3RoIC0gMSkpO1xuICAgICAgICB0aGlzLnN0YWNrW3Bvc10/LmdvKHRoaXMubGVhZik7XG4gICAgICAgIHRoaXMuYW5ub3VuY2UoKTtcbiAgICB9XG5cbiAgICBnbyhieTogbnVtYmVyLCBmb3JjZT86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLmxlYWYgfHwgIWJ5KSByZXR1cm47ICAvLyBuby1vcFxuICAgICAgICAvLyBwcmV2ZW50IHdyYXBhcm91bmRcbiAgICAgICAgY29uc3QgbmV3UG9zID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5wb3MgLSBieSwgdGhpcy5zdGFjay5sZW5ndGggLSAxKSk7XG4gICAgICAgIGlmIChmb3JjZSB8fCBuZXdQb3MgIT09IHRoaXMucG9zKSB7XG4gICAgICAgICAgICB0aGlzLmdvdG8obmV3UG9zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYE5vIG1vcmUgJHtieSA8IDAgPyBcImJhY2tcIiA6IFwiZm9yd2FyZFwifSBoaXN0b3J5IGZvciBwYW5lYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBsYWNlU3RhdGUocmF3U3RhdGU6IFB1c2hTdGF0ZSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpe1xuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuc3RhY2tbdGhpcy5wb3NdO1xuICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnN0YWNrW3RoaXMucG9zXSA9IG5ldyBIaXN0b3J5RW50cnkocmF3U3RhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlbnRyeS5yZXBsYWNlU3RhdGUocmF3U3RhdGUpKSB7XG4gICAgICAgICAgICAvLyByZXBsYWNlU3RhdGUgd2FzIGVycm9uZW91c2x5IGNhbGxlZCB3aXRoIGEgbmV3IGZpbGUgZm9yIHRoZSBzYW1lIGxlYWY7XG4gICAgICAgICAgICAvLyBmb3JjZSBhIHB1c2hTdGF0ZSBpbnN0ZWFkIChmaXhlcyB0aGUgaXNzdWUgcmVwb3J0ZWQgaGVyZTogaHR0cHM6Ly9mb3J1bS5vYnNpZGlhbi5tZC90LzE4NTE4KVxuICAgICAgICAgICAgdGhpcy5wdXNoU3RhdGUocmF3U3RhdGUsIHRpdGxlLCB1cmwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaFN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUsIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKSAgIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInB1c2hpbmdcIiwgcmF3U3RhdGUpXG4gICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKDAsIHRoaXMucG9zLCBuZXcgSGlzdG9yeUVudHJ5KHJhd1N0YXRlKSk7XG4gICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgLy8gTGltaXQgXCJiYWNrXCIgdG8gMjBcbiAgICAgICAgd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoID4gMjApIHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICAgIHRoaXMuYW5ub3VuY2UoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsSGlzdG9yeShwbHVnaW46IFBhbmVSZWxpZWYpIHtcblxuICAgIC8vIE1vbmtleXBhdGNoOiBpbmNsdWRlIGhpc3RvcnkgaW4gbGVhZiBzZXJpYWxpemF0aW9uIChzbyBpdCdzIHBlcnNpc3RlZCB3aXRoIHRoZSB3b3Jrc3BhY2UpXG4gICAgLy8gYW5kIGNoZWNrIGZvciBwb3BzdGF0ZSBldmVudHMgKHRvIHN1cHByZXNzIHRoZW0pXG4gICAgcGx1Z2luLnJlZ2lzdGVyKGFyb3VuZChXb3Jrc3BhY2VMZWFmLnByb3RvdHlwZSwge1xuICAgICAgICBzZXJpYWxpemUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXJpYWxpemUoKXtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9sZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXNbSElTVF9BVFRSXSkgcmVzdWx0W1NFUklBTF9QUk9QXSA9IHRoaXNbSElTVF9BVFRSXS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH19LFxuICAgICAgICBzZXRWaWV3U3RhdGUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXRWaWV3U3RhdGUodnMsIGVzKXtcbiAgICAgICAgICAgIGlmICh2cy5wb3BzdGF0ZSAmJiB3aW5kb3cuZXZlbnQ/LnR5cGUgPT09IFwicG9wc3RhdGVcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbGQuY2FsbCh0aGlzLCB2cywgZXMpO1xuICAgICAgICB9fVxuICAgIH0pKTtcblxuICAgIHBsdWdpbi5yZWdpc3Rlcihhcm91bmQoYXBwLndvcmtzcGFjZSwge1xuICAgICAgICAvLyBNb25rZXlwYXRjaDogbG9hZCBoaXN0b3J5IGR1cmluZyBsZWFmIGxvYWQsIGlmIHByZXNlbnRcbiAgICAgICAgZGVzZXJpYWxpemVMYXlvdXQob2xkKSB7IHJldHVybiBhc3luYyBmdW5jdGlvbiBkZXNlcmlhbGl6ZUxheW91dChzdGF0ZSwgLi4uZXRjOiBhbnlbXSl7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgb2xkLmNhbGwodGhpcywgc3RhdGUsIC4uLmV0Yyk7XG4gICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJsZWFmXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXRyeSBsb2FkaW5nIHRoZSBwYW5lIGFzIGFuIGVtcHR5XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnN0YXRlLnR5cGUgPSAnZW1wdHknO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCBvbGQuY2FsbCh0aGlzLCBzdGF0ZSwgLi4uZXRjKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZVtTRVJJQUxfUFJPUF0pIHJlc3VsdFtISVNUX0FUVFJdID0gbmV3IEhpc3RvcnkocmVzdWx0LCBzdGF0ZVtTRVJJQUxfUFJPUF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfX0sXG4gICAgICAgIC8vIE1vbmtleXBhdGNoOiBrZWVwIE9ic2lkaWFuIGZyb20gcHVzaGluZyBoaXN0b3J5IGluIHNldEFjdGl2ZUxlYWZcbiAgICAgICAgc2V0QWN0aXZlTGVhZihvbGQpIHsgcmV0dXJuIGZ1bmN0aW9uIHNldEFjdGl2ZUxlYWYobGVhZiwgLi4uZXRjKSB7XG4gICAgICAgICAgICBjb25zdCB1bnN1YiA9IGFyb3VuZCh0aGlzLCB7XG4gICAgICAgICAgICAgICAgcmVjb3JkSGlzdG9yeShvbGQpIHsgcmV0dXJuIGZ1bmN0aW9uIChsZWFmOiBXb3Jrc3BhY2VMZWFmLCBfcHVzaDogYm9vbGVhbiwgLi4uYXJnczogYW55W10pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWx3YXlzIHVwZGF0ZSBzdGF0ZSBpbiBwbGFjZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2xkLmNhbGwodGhpcywgbGVhZiwgZmFsc2UsIC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH07IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkLmNhbGwodGhpcywgbGVhZiwgLi4uZXRjKTtcbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfX0sXG4gICAgfSkpO1xuXG4gICAgLy8gUHJveHkgdGhlIHdpbmRvdyBoaXN0b3J5IHdpdGggYSB3cmFwcGVyIHRoYXQgZGVsZWdhdGVzIHRvIHRoZSBhY3RpdmUgbGVhZidzIEhpc3Rvcnkgb2JqZWN0LFxuICAgIGNvbnN0IHJlYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gICAgcGx1Z2luLnJlZ2lzdGVyKCgpID0+ICh3aW5kb3cgYXMgYW55KS5oaXN0b3J5ID0gcmVhbEhpc3RvcnkpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiaGlzdG9yeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB7XG4gICAgICAgIGdldCBzdGF0ZSgpICAgICAgeyByZXR1cm4gSGlzdG9yeS5jdXJyZW50KCkuc3RhdGU7IH0sXG4gICAgICAgIGdldCBsZW5ndGgoKSAgICAgeyByZXR1cm4gSGlzdG9yeS5jdXJyZW50KCkubGVuZ3RoOyB9LFxuXG4gICAgICAgIGJhY2soKSAgICB7IGlmICghcGx1Z2luLmlzU3ludGhldGljSGlzdG9yeUV2ZW50KDMpKSB0aGlzLmdvKC0xKTsgfSxcbiAgICAgICAgZm9yd2FyZCgpIHsgaWYgKCFwbHVnaW4uaXNTeW50aGV0aWNIaXN0b3J5RXZlbnQoNCkpIHRoaXMuZ28oIDEpOyB9LFxuICAgICAgICBnbyhieTogbnVtYmVyKSAgICB7IEhpc3RvcnkuY3VycmVudCgpLmdvKGJ5KTsgfSxcblxuICAgICAgICByZXBsYWNlU3RhdGUoc3RhdGU6IFB1c2hTdGF0ZSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpeyBIaXN0b3J5LmN1cnJlbnQoKS5yZXBsYWNlU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpOyB9LFxuICAgICAgICBwdXNoU3RhdGUoc3RhdGU6IFB1c2hTdGF0ZSwgdGl0bGU6IHN0cmluZywgdXJsOiBzdHJpbmcpICAgeyBIaXN0b3J5LmN1cnJlbnQoKS5wdXNoU3RhdGUoc3RhdGUsIHRpdGxlLCB1cmwpOyB9LFxuXG4gICAgICAgIGdldCBzY3JvbGxSZXN0b3JhdGlvbigpICAgIHsgcmV0dXJuIHJlYWxIaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uOyB9LFxuICAgICAgICBzZXQgc2Nyb2xsUmVzdG9yYXRpb24odmFsKSB7IHJlYWxIaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gdmFsOyB9LFxuICAgIH19KTtcblxufVxuIiwiaW1wb3J0IHsgYXJvdW5kIH0gZnJvbSBcIm1vbmtleS1hcm91bmRcIjtcbmltcG9ydCB7IENvbXBvbmVudCwgZGVib3VuY2UsIFdvcmtzcGFjZUl0ZW0sIFdvcmtzcGFjZUxlYWYsIFdvcmtzcGFjZVBhcmVudCB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBXb3Jrc3BhY2Uge1xuICAgICAgICBnZXRNb3N0UmVjZW50TGVhZihyb290OiBXb3Jrc3BhY2VQYXJlbnQpOiBXb3Jrc3BhY2VMZWFmXG4gICAgICAgIHJlcXVlc3RBY3RpdmVMZWFmRXZlbnRzKCk6IHZvaWRcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZUl0ZW0ge1xuICAgICAgICBnZXRDb250YWluZXI/KCk6IFdvcmtzcGFjZVBhcmVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgQXBwIHtcbiAgICAgICAgY29tbWFuZHM6IHtcbiAgICAgICAgICAgIGV4ZWN1dGVDb21tYW5kQnlJZChpZDogc3RyaW5nLCBldmVudD86IEV2ZW50KTogYm9vbGVhblxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEVmZmljaWVudGx5IHVwZGF0ZSBhIGNsYXNzIG9uIGEgd29ya3NwYWNlIGl0ZW0sIG9ubHkgdG91Y2hpbmcgd2hlcmUgY2hhbmdlcyBhcmUgbmVlZGVkXG4gKlxuICogQHBhcmFtIGl0ZW0gVGhlIHdvcmtzcGFjZSBpdGVtIHRvIGFkZCBvciByZW1vdmUgdGhlIGNsYXNzIGZyb21cbiAqIEBwYXJhbSBjbHMgVGhlIGNsYXNzIHRvIGFkZCBvciByZW1vdmVcbiAqIEBwYXJhbSBzdGF0ZSBCb29sZWFuLCBmbGFnIHRvIGFkZCBvciByZW1vdmUsIGRlZmF1bHRzIHRvIG9wcG9zaXRlIG9mIGN1cnJlbnQgc3RhdGVcbiAqIEByZXR1cm5zIGJvb2xlYW4gZm9yIHRoZSBzdGF0ZSBvZiB0aGUgY2xhc3MgYWZ0ZXJ3YXJkc1xuICovXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhpdGVtOiBXb3Jrc3BhY2VJdGVtLCBjbHM6IHN0cmluZywgc3RhdGU/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZWwgPSBpdGVtLmNvbnRhaW5lckVsLCBoYWQgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgICBzdGF0ZSA9IHN0YXRlID8/ICFoYWQ7XG4gICAgaWYgKHN0YXRlICE9PSBoYWQpIHsgc3RhdGUgPyBlbC5jbGFzc0xpc3QuYWRkKGNscykgOiBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7IH1cbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmV4cG9ydCBjbGFzcyBNYXhpbWl6ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgb25sb2FkKCkge1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoYXBwLndvcmtzcGFjZS5vbihcImxheW91dC1jaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJlbnQgb2YgdGhpcy5wYXJlbnRzKCkpIHRoaXMucmVmcmVzaChwYXJlbnQpO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgdGhpcy5yZWdpc3Rlcihhcm91bmQoYXBwLndvcmtzcGFjZSwge1xuICAgICAgICAgICAgc2V0QWN0aXZlTGVhZihvbGQpIHsgcmV0dXJuIGZ1bmN0aW9uIHNldEFjdGl2ZUxlYWYobGVhZiwgcHVzaEhpc3RvcnksIGZvY3VzKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBkbyB0aGlzIGhlcmUgc28gdGhhdCBNYXJrZG93blZpZXcgY2FuIGJlIGZvY3VzZWQgaW4gdGhlIG5ldyBwYW5lXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gc2VsZi5wYXJlbnRGb3IobGVhZilcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50KSBzZWxmLnJlZnJlc2gocGFyZW50LCBwYXJlbnQuY29udGFpbmVyRWwuaGFzQ2xhc3MoXCJzaG91bGQtbWF4aW1pemVcIikgPyBsZWFmIDogbnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5jYWxsKHRoaXMsIGxlYWYsIHB1c2hIaXN0b3J5LCBmb2N1cyk7XG4gICAgICAgICAgICB9fVxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIC8vIFVuLW1heGltaXplIGFsbCBwYW5lc1xuICAgICAgICBmb3IgKGNvbnN0IHBhcmVudCBvZiB0aGlzLnBhcmVudHMoKSkgdGhpcy5yZWZyZXNoKHBhcmVudCwgbnVsbCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlTWF4aW1pemUobGVhZiA9IGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZikge1xuICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnBhcmVudEZvcihsZWFmKTtcbiAgICAgICAgaWYgKCFwYXJlbnQpIHJldHVybjtcbiAgICAgICAgY29uc3QgcG9wb3ZlckVsID0gcGFyZW50LmNvbnRhaW5lckVsLm1hdGNoUGFyZW50KFwiLmhvdmVyLXBvcG92ZXJcIik7XG4gICAgICAgIGlmIChwb3BvdmVyRWwgJiYgYXBwLnBsdWdpbnMucGx1Z2luc1tcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiXSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgc2luZ2xlIGxlYWYgaW4gYSBwb3BvdmVyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwOyBhcHAud29ya3NwYWNlLml0ZXJhdGVMZWF2ZXMoKCkgPT4geyBjb3VudCsrOyB9LCBwYXJlbnQpO1xuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgLy8gTWF4aW1pemUgb3IgcmVzdG9yZSB0aGUgcG9wb3ZlciBpbnN0ZWFkIG9mIHRoZSBsZWFmXG4gICAgICAgICAgICAgICAgYXBwLmNvbW1hbmRzLmV4ZWN1dGVDb21tYW5kQnlJZChcbiAgICAgICAgICAgICAgICAgICAgXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3I6XCIgKyAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3BvdmVyRWwuaGFzQ2xhc3MoXCJzbmFwLXRvLXZpZXdwb3J0XCIpID8gXCJyZXN0b3JlLWFjdGl2ZS1wb3BvdmVyXCIgOiBcInNuYXAtYWN0aXZlLXBvcG92ZXItdG8tdmlld3BvcnRcIlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmVudCkgdGhpcy5yZWZyZXNoKHBhcmVudCwgdG9nZ2xlQ2xhc3MocGFyZW50LCBcInNob3VsZC1tYXhpbWl6ZVwiKSA/IGxlYWYgOiBudWxsKTtcbiAgICB9XG5cbiAgICBsYXN0TWF4aW1pemVkKHBhcmVudDogV29ya3NwYWNlUGFyZW50KSB7XG4gICAgICAgIGxldCByZXN1bHQ6IFdvcmtzcGFjZUxlYWYgPSBudWxsO1xuICAgICAgICBhcHAud29ya3NwYWNlLml0ZXJhdGVMZWF2ZXMobGVhZiA9PiB7IGlmIChsZWFmLmNvbnRhaW5lckVsLmhhc0NsYXNzKFwiaXMtbWF4aW1pemVkXCIpKSByZXN1bHQgPSBsZWFmOyB9LCBwYXJlbnQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0IHx8IGFwcC53b3Jrc3BhY2UuZ2V0TW9zdFJlY2VudExlYWYoKTtcbiAgICB9XG5cbiAgICBmaXhTbGlkaW5nUGFuZXMgPSBkZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgIGlmICgoYXBwLnBsdWdpbnMucGx1Z2lucyBhcyBhbnkpW1wic2xpZGluZy1wYW5lcy1vYnNpZGlhblwiXSkge1xuICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5vbkxheW91dENoYW5nZSgpO1xuICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5yZXF1ZXN0QWN0aXZlTGVhZkV2ZW50cygpO1xuICAgICAgICB9XG4gICAgfSwgNSk7XG5cbiAgICByZWZyZXNoKFxuICAgICAgICBwYXJlbnQ6IFdvcmtzcGFjZVBhcmVudCxcbiAgICAgICAgbGVhZjogV29ya3NwYWNlTGVhZiA9XG4gICAgICAgICAgICBwYXJlbnQuY29udGFpbmVyRWwuaGFzQ2xhc3MoXCJzaG91bGQtbWF4aW1pemVcIikgPyB0aGlzLmxhc3RNYXhpbWl6ZWQocGFyZW50KSA6IG51bGxcbiAgICApIHtcbiAgICAgICAgZnVuY3Rpb24gd2FsayhwYXJlbnQ6IFdvcmtzcGFjZVBhcmVudCkge1xuICAgICAgICAgICAgbGV0IGhhdmVNYXRjaCA9IGZhbHNlLCBtYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHBhcmVudC5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgV29ya3NwYWNlTGVhZikge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVDbGFzcyhpdGVtLCBcImlzLW1heGltaXplZFwiLCAgbWF0Y2ggPSAobGVhZiA9PT0gaXRlbSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbSBpbnN0YW5jZW9mIFdvcmtzcGFjZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHdhbGsoaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhdmVNYXRjaCB8fD0gbWF0Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9nZ2xlQ2xhc3MocGFyZW50LCBcImhhcy1tYXhpbWl6ZWRcIiwgaGF2ZU1hdGNoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBoYWRNYXggPSBwYXJlbnQuY29udGFpbmVyRWwuaGFzQ2xhc3MoXCJoYXMtbWF4aW1pemVkXCIpO1xuICAgICAgICBpZiAoIXdhbGsocGFyZW50KSkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MocGFyZW50LCBcInNob3VsZC1tYXhpbWl6ZVwiLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoaGFkTWF4KSB0aGlzLmZpeFNsaWRpbmdQYW5lcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFyZW50cygpIHtcbiAgICAgICAgY29uc3QgcGFyZW50czogV29ya3NwYWNlUGFyZW50W10gPSBbYXBwLndvcmtzcGFjZS5yb290U3BsaXRdXG4gICAgICAgIHBhcmVudHMuY29uY2F0KGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4gPz8gW10pO1xuICAgICAgICBjb25zdCBwb3BvdmVycyA9IGFwcC5wbHVnaW5zLnBsdWdpbnNbXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3JcIl0/LmFjdGl2ZVBvcG92ZXJzO1xuICAgICAgICBpZiAocG9wb3ZlcnMpIGZvciAoY29uc3QgcG9wb3ZlciBvZiBwb3BvdmVycykge1xuICAgICAgICAgICAgaWYgKHBvcG92ZXIucm9vdFNwbGl0KSBwYXJlbnRzLnB1c2gocG9wb3Zlci5yb290U3BsaXQpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhcmVudHM7XG4gICAgfVxuXG4gICAgcGFyZW50Rm9yKGxlYWY6IFdvcmtzcGFjZUxlYWYpOiBXb3Jrc3BhY2VQYXJlbnQge1xuICAgICAgICBpZiAoIWxlYWYgfHwgbGVhZi5jb250YWluZXJFbC5tYXRjaFBhcmVudChcIi53b3Jrc3BhY2UtdGFic1wiKSkgcmV0dXJuIG51bGw7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGxlYWYuZ2V0Q29udGFpbmVyPy4oKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuY29udGFpbmVyRWwuaGFzQ2xhc3MoXCJtb2Qtcm9vdFwiKSkgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICAgICAgY29uc3QgcG9wb3ZlckVsID0gbGVhZi5jb250YWluZXJFbC5tYXRjaFBhcmVudChcIi5ob3Zlci1wb3BvdmVyXCIpO1xuICAgICAgICBpZiAocG9wb3ZlckVsKSB7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVycyA9IGFwcC5wbHVnaW5zLnBsdWdpbnNbXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3JcIl0/LmFjdGl2ZVBvcG92ZXJzO1xuICAgICAgICAgICAgaWYgKHBvcG92ZXJzKSBmb3IgKGNvbnN0IHBvcG92ZXIgb2YgcG9wb3ZlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9wb3ZlckVsLmNvbnRhaW5zKHBvcG92ZXIucm9vdFNwbGl0LmNvbnRhaW5lckVsKSkgcmV0dXJuIHBvcG92ZXIucm9vdFNwbGl0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcHAud29ya3NwYWNlLnJvb3RTcGxpdDtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBQbHVnaW4sIFZpZXcsIFdvcmtzcGFjZUxlYWYsIFdvcmtzcGFjZVBhcmVudCwgV29ya3NwYWNlU3BsaXQsIFdvcmtzcGFjZVdpbmRvdyB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG4vKipcbiAqIENvbXBvbmVudCB0aGF0IGJlbG9uZ3MgdG8gYSBwbHVnaW4gKyB3aW5kb3cuIGUuZy46XG4gKlxuICogICAgIGNsYXNzIFRpdGxlV2lkZ2V0IGV4dGVuZHMgUGVyV2luZG93Q29tcG9uZW50PE15UGx1Z2luPiB7XG4gKiAgICAgICAgIG9ubG9hZCgpIHtcbiAqICAgICAgICAgICAgIC8vIGRvIHN0dWZmIHdpdGggdGhpcy5wbHVnaW4gYW5kIHRoaXMud2luIC4uLlxuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqICAgICBjbGFzcyBNeVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gKiAgICAgICAgIHRpdGxlV2lkZ2V0cyA9IFRpdGxlV2lkZ2V0LnBlcldpbmRvdyh0aGlzKTtcbiAqICAgICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIFRoaXMgd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBhIHRpdGxlIHdpZGdldCBmb3IgZWFjaCB3aW5kb3cgYXMgaXQncyBvcGVuZWQsIGFuZFxuICogb24gcGx1Z2luIGxvYWQuICBUaGUgcGx1Z2luJ3MgYC50aXRsZVdpZGdldHNgIHdpbGwgYWxzbyBiZSBhIFdpbmRvd01hbmFnZXIgdGhhdCBjYW5cbiAqIGxvb2sgdXAgdGhlIHRpdGxlIHdpZGdldCBmb3IgYSBnaXZlbiB3aW5kb3csIGxlYWYsIG9yIHZpZXcsIG9yIHJldHVybiBhIGxpc3Qgb2ZcbiAqIGFsbCBvZiB0aGVtLiAgU2VlIFdpbmRvd01hbmFnZXIgZm9yIHRoZSBmdWxsIEFQSS5cbiAqXG4gKiBJZiB5b3Ugd2FudCB5b3VyIGNvbXBvbmVudHMgdG8gYmUgY3JlYXRlZCBvbiBkZW1hbmQgaW5zdGVhZCBvZiBhdXRvbWF0aWNhbGx5IHdoZW5cbiAqIHdpbmRvdyhzKSBhcmUgb3BlbmVkLCB5b3UgY2FuIHBhc3MgYGZhbHNlYCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIGBwZXJXaW5kb3coKWAuXG4gKi9cbmV4cG9ydCBjbGFzcyBQZXJXaW5kb3dDb21wb25lbnQ8UCBleHRlbmRzIFBsdWdpbj4gZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgZ2V0IHJvb3QoKTogV29ya3NwYWNlUGFyZW50IHtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckZvcldpbmRvdyh0aGlzLndpbik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIHBsdWdpbjogUCwgcHVibGljIHdpbjogV2luZG93KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHBlcldpbmRvdzxUIGV4dGVuZHMgUGVyV2luZG93Q29tcG9uZW50PFA+LCBQIGV4dGVuZHMgUGx1Z2luPihcbiAgICAgICAgdGhpczogbmV3IChwbHVnaW46IFAsIHdpbjogV2luZG93KSA9PiBULFxuICAgICAgICBwbHVnaW46IFBcbiAgICApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXaW5kb3dNYW5hZ2VyKHBsdWdpbiwgdGhpcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIE1hbmFnZSBwZXItd2luZG93IGNvbXBvbmVudHNcbiAqL1xuZXhwb3J0IGNsYXNzIFdpbmRvd01hbmFnZXI8VCBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQPiwgUCBleHRlbmRzIFBsdWdpbj4gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGluc3RhbmNlcyA9IG5ldyBXZWFrTWFwPFdpbmRvdywgVD4oKTtcblxuICAgIHdhdGNoaW5nOiBib29sZWFuID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIHBsdWdpbjogUCxcbiAgICAgICAgcHVibGljIGZhY3Rvcnk6IG5ldyAocGx1Z2luOiBQLCB3aW46IFdpbmRvdykgPT4gVCwgIC8vIFRoZSBjbGFzcyBvZiB0aGluZyB0byBtYW5hZ2VcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgcGx1Z2luLmFkZENoaWxkKHRoaXMpO1xuICAgIH1cblxuICAgIHdhdGNoKCk6IHRoaXMge1xuICAgICAgICAvLyBEZWZlciB3YXRjaCB1bnRpbCBwbHVnaW4gaXMgbG9hZGVkXG4gICAgICAgIGlmICghdGhpcy5fbG9hZGVkKSB0aGlzLm9ubG9hZCA9ICgpID0+IHRoaXMud2F0Y2goKTtcbiAgICAgICAgZWxzZSBpZiAoIXRoaXMud2F0Y2hpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IHt3b3Jrc3BhY2V9ID0gYXBwO1xuICAgICAgICAgICAgdGhpcy53YXRjaGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICAgICAgd29ya3NwYWNlLm9uKFwid2luZG93LW9wZW5cIiwgKF8sIHdpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiBzZXRJbW1lZGlhdGUoKCkgPT4gdGhpcy5mb3JXaW5kb3cod2luKSkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4gc2V0SW1tZWRpYXRlKCgpID0+IHRoaXMuZm9yQWxsKCkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmb3JXaW5kb3coKTogVDtcbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3cpOiBUO1xuICAgIGZvcldpbmRvdyh3aW46IFdpbmRvdywgY3JlYXRlOiB0cnVlKTogVDtcbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3csIGNyZWF0ZTogYm9vbGVhbik6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3cgPSB3aW5kb3cuYWN0aXZlV2luZG93ID8/IHdpbmRvdywgY3JlYXRlID0gdHJ1ZSk6IFQgfCB1bmRlZmluZWQge1xuICAgICAgICBsZXQgaW5zdCA9IHRoaXMuaW5zdGFuY2VzLmdldCh3aW4pO1xuICAgICAgICBpZiAoIWluc3QgJiYgY3JlYXRlKSB7XG4gICAgICAgICAgICBpbnN0ID0gbmV3IHRoaXMuZmFjdG9yeSh0aGlzLnBsdWdpbiwgd2luKTtcbiAgICAgICAgICAgIGlmIChpbnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuc2V0KHdpbiwgaW5zdCEpO1xuICAgICAgICAgICAgICAgIGluc3QucmVnaXN0ZXJEb21FdmVudCh3aW4sIFwiYmVmb3JldW5sb2FkXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZChpbnN0ISk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmRlbGV0ZSh3aW4pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW5zdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3QgfHwgdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvckRvbShlbDogSFRNTEVsZW1lbnQpOiBUO1xuICAgIGZvckRvbShlbDogSFRNTEVsZW1lbnQsIGNyZWF0ZTogdHJ1ZSk6IFQ7XG4gICAgZm9yRG9tKGVsOiBIVE1MRWxlbWVudCwgY3JlYXRlOiBib29sZWFuKTogVCB8IHVuZGVmaW5lZDtcblxuICAgIGZvckRvbShlbDogSFRNTEVsZW1lbnQsIGNyZWF0ZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yV2luZG93KHdpbmRvd0ZvckRvbShlbCksIGNyZWF0ZSk7XG4gICAgfVxuXG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmKTogVDtcbiAgICBmb3JMZWFmKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGNyZWF0ZTogdHJ1ZSk6IFQ7XG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBjcmVhdGU6IGJvb2xlYW4pOiBUIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvckRvbShsZWFmLmNvbnRhaW5lckVsLCBjcmVhdGUpO1xuICAgIH1cblxuICAgIGZvclZpZXcodmlldzogVmlldyk6IFQ7XG4gICAgZm9yVmlldyh2aWV3OiBWaWV3LCBjcmVhdGU6IHRydWUpOiBUO1xuICAgIGZvclZpZXcodmlldzogVmlldywgY3JlYXRlOiBib29sZWFuKTogVCB8IHVuZGVmaW5lZDtcblxuICAgIGZvclZpZXcodmlldzogVmlldywgY3JlYXRlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JMZWFmKHZpZXcubGVhZiwgY3JlYXRlKTtcbiAgICB9XG5cbiAgICB3aW5kb3dzKCkge1xuICAgICAgICBjb25zdCB3aW5kb3dzOiBXaW5kb3dbXSA9IFt3aW5kb3ddLCB7ZmxvYXRpbmdTcGxpdH0gPSBhcHAud29ya3NwYWNlO1xuICAgICAgICBpZiAoZmxvYXRpbmdTcGxpdCkge1xuICAgICAgICAgICAgZm9yKGNvbnN0IHNwbGl0IG9mIGZsb2F0aW5nU3BsaXQuY2hpbGRyZW4pIGlmIChzcGxpdC53aW4pIHdpbmRvd3MucHVzaChzcGxpdC53aW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aW5kb3dzO1xuICAgIH1cblxuICAgIGZvckFsbChjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpbmRvd3MoKS5tYXAod2luID0+IHRoaXMuZm9yV2luZG93KHdpbiwgY3JlYXRlKSkuZmlsdGVyKHQgPT4gdCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUm9vdE1hbmFnZXI8VCBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQPiwgUCBleHRlbmRzIFBsdWdpbj4gZXh0ZW5kcyBXaW5kb3dNYW5hZ2VyPFQsUD4ge1xuICAgIGluc3RhbmNlczogV2Vha01hcDxXaW5kb3d8V29ya3NwYWNlUGFyZW50LCBUPjtcblxuICAgIGZvckRvbShlbDogSFRNTEVsZW1lbnQsIGNyZWF0ZSA9IHRydWUpIHtcbiAgICAgICAgY29uc3QgcG9wb3ZlckVsID0gZWwubWF0Y2hQYXJlbnQoXCIuaG92ZXItcG9wb3ZlclwiKTtcbiAgICAgICAgaWYgKCFwb3BvdmVyRWwpIHJldHVybiB0aGlzLmZvcldpbmRvdyh3aW5kb3dGb3JEb20oZWwpLCBjcmVhdGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpbmRvd0ZvckRvbShlbDogTm9kZSkge1xuICAgIHJldHVybiAoZWwub3duZXJEb2N1bWVudCB8fCA8RG9jdW1lbnQ+ZWwpLmRlZmF1bHRWaWV3ITtcbn1cblxuZnVuY3Rpb24gY29udGFpbmVyRm9yV2luZG93KHdpbjogV2luZG93KTogV29ya3NwYWNlUGFyZW50IHtcbiAgICBpZiAod2luID09PSB3aW5kb3cpIHJldHVybiBhcHAud29ya3NwYWNlLnJvb3RTcGxpdDtcbiAgICBjb25zdCB7ZmxvYXRpbmdTcGxpdH0gPSBhcHAud29ya3NwYWNlO1xuICAgIGlmIChmbG9hdGluZ1NwbGl0KSB7XG4gICAgICAgIGZvcihjb25zdCBzcGxpdCBvZiBmbG9hdGluZ1NwbGl0LmNoaWxkcmVuKSBpZiAod2luID09PSBzcGxpdC53aW4pIHJldHVybiBzcGxpdDtcbiAgICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IGZvciBzaW5nbGUtd2luZG93IE9ic2lkaWFuICg8MC4xNSlcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgYWN0aXZlV2luZG93PzogV2luZG93XG4gICAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBXb3Jrc3BhY2Uge1xuICAgICAgICBmbG9hdGluZ1NwbGl0PzogeyBjaGlsZHJlbjogV29ya3NwYWNlV2luZG93W10gfTtcbiAgICAgICAgb3BlblBvcG91dD8oKTogV29ya3NwYWNlU3BsaXQ7XG4gICAgICAgIG9wZW5Qb3BvdXRMZWFmPygpOiBXb3Jrc3BhY2VMZWFmO1xuICAgICAgICBvbihuYW1lOiAnd2luZG93LW9wZW4nLCBjYWxsYmFjazogKHdpbjogV29ya3NwYWNlV2luZG93LCB3aW5kb3c6IFdpbmRvdykgPT4gYW55LCBjdHg/OiBhbnkpOiBFdmVudFJlZjtcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZVdpbmRvdyBleHRlbmRzIFdvcmtzcGFjZVBhcmVudCB7XG4gICAgICAgIHdpbjogV2luZG93XG4gICAgfVxuICAgIGludGVyZmFjZSBXb3Jrc3BhY2VMZWFmIHtcbiAgICAgICAgY29udGFpbmVyRWw6IEhUTUxEaXZFbGVtZW50O1xuICAgIH1cbiAgICBpbnRlcmZhY2UgQ29tcG9uZW50IHtcbiAgICAgICAgX2xvYWRlZDogYm9vbGVhblxuICAgIH1cbn1cbiIsImltcG9ydCB7TWVudSwgS2V5bWFwLCBDb21wb25lbnQsIFdvcmtzcGFjZUxlYWYsIFRGaWxlLCBNZW51SXRlbX0gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHtkb21MZWF2ZXMsIEhpc3RvcnksIEhpc3RvcnlFbnRyeX0gZnJvbSBcIi4vSGlzdG9yeVwiO1xuaW1wb3J0IFBhbmVSZWxpZWYgZnJvbSAnLi9wYW5lLXJlbGllZic7XG5pbXBvcnQge1BlcldpbmRvd0NvbXBvbmVudH0gZnJvbSAnLi9QZXJXaW5kb3dDb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBNZW51IHtcbiAgICAgICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgTWVudUl0ZW0ge1xuICAgICAgICBkb206IEhUTUxFbGVtZW50XG4gICAgfVxuICAgIGludGVyZmFjZSBBcHAge1xuICAgICAgICBkcmFnTWFuYWdlcjogRHJhZ01hbmFnZXJcbiAgICB9XG4gICAgaW50ZXJmYWNlIERyYWdNYW5hZ2VyIHtcbiAgICAgICAgZHJhZ0ZpbGUoZXZlbnQ6IERyYWdFdmVudCwgZmlsZTogVEZpbGUpOiBEcmFnRGF0YVxuICAgICAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50LCBkcmFnRGF0YTogRHJhZ0RhdGEpOiB2b2lkXG4gICAgfVxuICAgIGludGVyZmFjZSBEcmFnRGF0YSB7fVxuICAgIGludGVyZmFjZSBXb3Jrc3BhY2VMZWFmIHtcbiAgICAgICAgYWN0aXZlVGltZTogbnVtYmVyXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgRmlsZUluZm8ge1xuICAgIGljb246IHN0cmluZ1xuICAgIHRpdGxlOiBzdHJpbmdcbiAgICBmaWxlOiBURmlsZVxuICAgIHR5cGU6IHN0cmluZ1xuICAgIHN0YXRlOiBhbnlcbiAgICBlU3RhdGU6IGFueVxufVxuXG5cbmNvbnN0IHZpZXd0eXBlSWNvbnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgbWFya2Rvd246IFwiZG9jdW1lbnRcIixcbiAgICBpbWFnZTogXCJpbWFnZS1maWxlXCIsXG4gICAgYXVkaW86IFwiYXVkaW8tZmlsZVwiLFxuICAgIHZpZGVvOiBcImF1ZGlvLWZpbGVcIixcbiAgICBwZGY6IFwicGRmLWZpbGVcIixcbiAgICBsb2NhbGdyYXBoOiBcImRvdC1uZXR3b3JrXCIsXG4gICAgb3V0bGluZTogXCJidWxsZXQtbGlzdFwiLFxuICAgIGJhY2tsaW5rOiBcImxpbmtcIixcblxuICAgIC8vIHRoaXJkLXBhcnR5IHBsdWdpbnNcbiAgICBrYW5iYW46IFwiYmxvY2tzXCIsXG4gICAgZXhjYWxpZHJhdzogXCJleGNhbGlkcmF3LWljb25cIixcbiAgICBcIm1lZGlhLXZpZXdcIjogXCJhdWRpby1maWxlXCIsXG59XG5cbmNvbnN0IG5vbkZpbGVWaWV3czogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+ID0ge1xuICAgIGdyYXBoOiBbXCJkb3QtbmV0d29ya1wiLCBcIkdyYXBoIFZpZXdcIl0sXG4gICAgXCJmaWxlLWV4cGxvcmVyXCI6IFtcImZvbGRlclwiLCBcIkZpbGUgRXhwbG9yZXJcIl0sXG4gICAgc3RhcnJlZDogW1wic3RhclwiLCBcIlN0YXJyZWQgRmlsZXNcIl0sXG4gICAgdGFnOiBbXCJ0YWdcIiwgXCJUYWdzIFZpZXdcIl0sXG5cbiAgICAvLyB0aGlyZC1wYXJ0eSBwbHVnaW5zXG4gICAgXCJyZWNlbnQtZmlsZXNcIjogW1wiY2xvY2tcIiwgXCJSZWNlbnQgRmlsZXNcIl0sXG4gICAgY2FsZW5kYXI6IFtcImNhbGVuZGFyLXdpdGgtY2hlY2ttYXJrXCIsIFwiQ2FsZW5kYXJcIl0sXG4gICAgZW1wdHk6IFtcImNyb3NzXCIsIFwiTm8gZmlsZVwiXVxufVxuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQYW5lUmVsaWVmPiB7XG4gICAgYmFjazogTmF2aWdhdG9yXG4gICAgZm9yd2FyZDogTmF2aWdhdG9yXG4gICAgLy8gU2V0IHRvIHRydWUgd2hpbGUgZWl0aGVyIG1lbnUgaXMgb3Blbiwgc28gd2UgZG9uJ3Qgc3dpdGNoIGl0IG91dFxuICAgIGhpc3RvcnlJc09wZW4gPSBmYWxzZTtcblxuICAgIGRpc3BsYXkobGVhZiA9IHRoaXMubGF0ZXN0TGVhZigpKSB7XG4gICAgICAgIGlmICh0aGlzLmhpc3RvcnlJc09wZW4pIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2FkZWQpIHsgdGhpcy5sb2FkKCk7IHJldHVybjsgfVxuICAgICAgICB0aGlzLndpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGlzdG9yeSA9IGxlYWYgPyBIaXN0b3J5LmZvckxlYWYobGVhZikgOiBuZXcgSGlzdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5iYWNrLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQuc2V0SGlzdG9yeShoaXN0b3J5KTtcbiAgICAgICAgICAgIGlmIChsZWFmKSB0aGlzLnVwZGF0ZUxlYWYobGVhZiwgaGlzdG9yeSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGVhdmVzKCkge1xuICAgICAgICBjb25zdCBsZWF2ZXM6IFdvcmtzcGFjZUxlYWZbXSA9IFtdO1xuICAgICAgICBjb25zdCBjYiA9IChsZWFmOiBXb3Jrc3BhY2VMZWFmKSA9PiB7IGxlYXZlcy5wdXNoKGxlYWYpOyB9O1xuICAgICAgICBhcHAud29ya3NwYWNlLml0ZXJhdGVMZWF2ZXMoY2IsIHRoaXMucm9vdCk7XG5cbiAgICAgICAgLy8gU3VwcG9ydCBIb3ZlciBFZGl0b3JzXG4gICAgICAgIGNvbnN0IHBvcG92ZXJzID0gYXBwLnBsdWdpbnMucGx1Z2luc1tcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiXT8uYWN0aXZlUG9wb3ZlcnM7XG4gICAgICAgIGlmIChwb3BvdmVycykgZm9yIChjb25zdCBwb3BvdmVyIG9mIHBvcG92ZXJzKSB7XG4gICAgICAgICAgICBpZiAocG9wb3Zlci5ob3ZlckVsLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgIT09IHRoaXMud2luKSBjb250aW51ZTsgLy8gbXVzdCBiZSBpbiBzYW1lIHdpbmRvd1xuICAgICAgICAgICAgZWxzZSBpZiAocG9wb3Zlci5yb290U3BsaXQpIGFwcC53b3Jrc3BhY2UuaXRlcmF0ZUxlYXZlcyhjYiwgcG9wb3Zlci5yb290U3BsaXQpO1xuICAgICAgICAgICAgZWxzZSBpZiAocG9wb3Zlci5sZWFmKSBjYihwb3BvdmVyLmxlYWYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZWF2ZXM7XG4gICAgfVxuXG4gICAgbGF0ZXN0TGVhZigpIHtcbiAgICAgICAgbGV0IGxlYWYgPSBhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XG4gICAgICAgIGlmIChsZWFmICYmIHRoaXMucGx1Z2luLm5hdi5mb3JMZWFmKGxlYWYpID09PSB0aGlzKSByZXR1cm4gbGVhZjtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVhdmVzKCkucmVkdWNlKChiZXN0LCBsZWFmKT0+eyByZXR1cm4gKCFiZXN0IHx8IGJlc3QuYWN0aXZlVGltZSA8IGxlYWYuYWN0aXZlVGltZSkgPyBsZWFmIDogYmVzdDsgfSwgbnVsbCk7XG4gICAgfVxuXG4gICAgb25sb2FkKCkge1xuICAgICAgICAvLyBPdmVycmlkZSBkZWZhdWx0IG1vdXNlIGhpc3RvcnkgYmVoYXZpb3IuICBXZSBuZWVkIHRoaXMgYmVjYXVzZSAxKSBFbGVjdHJvbiB3aWxsIHVzZSB0aGUgYnVpbHQtaW5cbiAgICAgICAgLy8gaGlzdG9yeSBvYmplY3QgaWYgd2UgZG9uJ3QgKGluc3RlYWQgb2Ygb3VyIHdyYXBwZXIpLCBhbmQgMikgd2Ugd2FudCB0aGUgY2xpY2sgdG8gYXBwbHkgdG8gdGhlIGxlYWZcbiAgICAgICAgLy8gdGhhdCB3YXMgdW5kZXIgdGhlIG1vdXNlLCByYXRoZXIgdGhhbiB3aGljaGV2ZXIgbGVhZiB3YXMgYWN0aXZlLlxuICAgICAgICBjb25zdCB7ZG9jdW1lbnR9ID0gdGhpcy53aW47XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpc3RvcnlIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoaXN0b3J5SGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgaGlzdG9yeUhhbmRsZXIsIHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoaXN0b3J5SGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBoaXN0b3J5SGFuZGxlcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZS5idXR0b24gIT09IDMgJiYgZS5idXR0b24gIT09IDQpIHJldHVybjtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgZS5zdG9wUHJvcGFnYXRpb24oKTsgIC8vIHByZXZlbnQgZGVmYXVsdCBiZWhhdmlvclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5tYXRjaFBhcmVudChcIi53b3Jrc3BhY2UtbGVhZlwiKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgZS50eXBlID09PSBcIm1vdXNldXBcIikge1xuICAgICAgICAgICAgICAgIGxldCBsZWFmID0gZG9tTGVhdmVzLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGlmICghbGVhZikgYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKGwgPT4gbGVhZiA9IChsLmNvbnRhaW5lckVsID09PSB0YXJnZXQpID8gbCA6IGxlYWYpO1xuICAgICAgICAgICAgICAgIGlmICghbGVhZikgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSAzKSB7IEhpc3RvcnkuZm9yTGVhZihsZWFmKS5iYWNrKCk7IH1cbiAgICAgICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gNCkgeyBIaXN0b3J5LmZvckxlYWYobGVhZikuZm9yd2FyZCgpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBhcHAud29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmJhY2sgICAgPSBuZXcgTmF2aWdhdG9yKHRoaXMsIFwiYmFja1wiLCAtMSkpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZvcndhcmQgPSBuZXcgTmF2aWdhdG9yKHRoaXMsIFwiZm9yd2FyZFwiLCAxKSk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgICAgIHRoaXMubnVtYmVyUGFuZXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudChhcHAud29ya3NwYWNlLm9uKFwibGF5b3V0LWNoYW5nZVwiLCB0aGlzLm51bWJlclBhbmVzLCB0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKFxuICAgICAgICAgICAgICAgIC8vIFN1cHBvcnQgXCJDdXN0b21pemFibGUgUGFnZSBIZWFkZXIgYW5kIFRpdGxlIEJhclwiIGJ1dHRvbnNcbiAgICAgICAgICAgICAgICBvbkVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luLmRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICAgICAgICAgIFwiY29udGV4dG1lbnVcIixcbiAgICAgICAgICAgICAgICAgICAgXCIudmlldy1oZWFkZXIgPiAudmlldy1hY3Rpb25zID4gLnZpZXctYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIChldnQsIHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlyID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQubWF0Y2hlcygnW2NsYXNzKj1cIiBhcHA6Z28tZm9yd2FyZFwiXScpICYmIFwiZm9yd2FyZFwiKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQubWF0Y2hlcygnW2NsYXNzKj1cIiBhcHA6Z28tYmFja1wiXScpICAgICYmIFwiYmFja1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGlyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRhcmdldC5tYXRjaFBhcmVudChcIi53b3Jrc3BhY2UtbGVhZlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmxlYXZlcygpLmZpbHRlcihsZWFmID0+IGxlYWYuY29udGFpbmVyRWwgPT09IGVsKS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVhZikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXkobGVhZik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2Rpcl0ub3Blbk1lbnUoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfSwge2NhcHR1cmU6IHRydWV9XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIHRoaXMudW5OdW1iZXJQYW5lcygpO1xuICAgICAgICB0aGlzLndpbi5kb2N1bWVudC5ib2R5LmZpbmRBbGwoXCIud29ya3NwYWNlLWxlYWZcIikuZm9yRWFjaChsZWFmRWwgPT4ge1xuICAgICAgICAgICAgLy8gUmVzdG9yZSBDUEhBVEIgYnV0dG9uIGxhYmVsc1xuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGxlYWZFbC5maW5kKFwiLnZpZXctaGVhZGVyID4gLnZpZXctYWN0aW9uc1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGZ3ZCA9IGFjdGlvbnM/LmZpbmQoJy52aWV3LWFjdGlvbltjbGFzcyo9XCIgYXBwOmdvLWZvcndhcmRcIl0nKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2sgPSBhY3Rpb25zPy5maW5kKCcudmlldy1hY3Rpb25bY2xhc3MqPVwiIGFwcDpnby1iYWNrXCJdJyk7XG4gICAgICAgICAgICBpZiAoZndkKSAgc2V0VG9vbHRpcChmd2QsIHRoaXMuZm9yd2FyZC5vbGRMYWJlbCk7XG4gICAgICAgICAgICBpZiAoYmFjaykgc2V0VG9vbHRpcChmd2QsIHRoaXMuYmFjay5vbGRMYWJlbCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdW5OdW1iZXJQYW5lcyhzZWxlY3RvciA9IFwiLndvcmtzcGFjZS1sZWFmXCIpIHtcbiAgICAgICAgdGhpcy53aW4uZG9jdW1lbnQuYm9keS5maW5kQWxsKHNlbGVjdG9yKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1sYWJlbFwiKTtcbiAgICAgICAgICAgIGVsLnRvZ2dsZUNsYXNzKFwiaGFzLXBhbmUtcmVsaWVmLWxhYmVsXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1mb3J3YXJkLWNvdW50XCIpO1xuICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWJhY2t3YXJkLWNvdW50XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVMZWFmKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGhpc3Rvcnk6IEhpc3RvcnkgPSBIaXN0b3J5LmZvckxlYWYobGVhZikpIHtcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtZm9yd2FyZC1jb3VudFwiLCAnXCInKyhoaXN0b3J5Lmxvb2tBaGVhZCgpLmxlbmd0aCB8fCBcIlwiKSsnXCInKTtcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtYmFja3dhcmQtY291bnRcIiwgJ1wiJysoaGlzdG9yeS5sb29rQmVoaW5kKCkubGVuZ3RoIHx8IFwiXCIpKydcIicpO1xuXG4gICAgICAgIC8vIEFkZCBsYWJlbHMgZm9yIENQSEFUQiBuYXYgYnV0dG9uc1xuICAgICAgICBjb25zdCBhY3Rpb25zID0gbGVhZi5jb250YWluZXJFbC5maW5kKFwiLnZpZXctaGVhZGVyID4gLnZpZXctYWN0aW9uc1wiKTtcbiAgICAgICAgY29uc3QgZndkID0gYWN0aW9ucz8uZmluZCgnLnZpZXctYWN0aW9uW2NsYXNzKj1cIiBhcHA6Z28tZm9yd2FyZFwiXScpO1xuICAgICAgICBjb25zdCBiYWNrID0gYWN0aW9ucz8uZmluZCgnLnZpZXctYWN0aW9uW2NsYXNzKj1cIiBhcHA6Z28tYmFja1wiXScpO1xuICAgICAgICBpZiAoZndkKSB0aGlzLmZvcndhcmQudXBkYXRlRGlzcGxheShoaXN0b3J5LCBmd2QpO1xuICAgICAgICBpZiAoYmFjaykgdGhpcy5iYWNrLnVwZGF0ZURpc3BsYXkoaGlzdG9yeSwgYmFjayk7XG4gICAgfVxuXG4gICAgbnVtYmVyUGFuZXMoKSB7XG4gICAgICAgIHRoaXMud2luLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyB1bm51bWJlciBzaWRlYmFyIHBhbmVzIGluIG1haW4gd2luZG93LCBpZiBzb21ldGhpbmcgd2FzIG1vdmVkIHRoZXJlXG4gICAgICAgICAgICBpZiAodGhpcy53aW4gPT09IHdpbmRvdykgdGhpcy51bk51bWJlclBhbmVzKFwiLndvcmtzcGFjZS10YWJzID4gLndvcmtzcGFjZS1sZWFmXCIpO1xuICAgICAgICAgICAgbGV0IGNvdW50ID0gMCwgbGFzdExlYWY6IFdvcmtzcGFjZUxlYWYgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5sZWF2ZXMoKS5mb3JFYWNoKGxlYWYgPT4ge1xuICAgICAgICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWxhYmVsXCIsICsrY291bnQgPCA5ID8gXCJcIitjb3VudCA6IFwiXCIpO1xuICAgICAgICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwudG9nZ2xlQ2xhc3MoXCJoYXMtcGFuZS1yZWxpZWYtbGFiZWxcIiwgY291bnQ8OSk7XG4gICAgICAgICAgICAgICAgbGFzdExlYWYgPSBsZWFmO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGVhZihsZWFmKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNvdW50PjgpIHtcbiAgICAgICAgICAgICAgICBsYXN0TGVhZj8uY29udGFpbmVyRWwuc3R5bGUuc2V0UHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWxhYmVsXCIsIFwiOVwiKTtcbiAgICAgICAgICAgICAgICBsYXN0TGVhZj8uY29udGFpbmVyRWwudG9nZ2xlQ2xhc3MoXCJoYXMtcGFuZS1yZWxpZWYtbGFiZWxcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25VcGRhdGVIaXN0b3J5KGxlYWY6IFdvcmtzcGFjZUxlYWYsIGhpc3Rvcnk6IEhpc3RvcnkpIHtcbiAgICAgICAgdGhpcy53aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGVhZihsZWFmKTsgLy8gdXBkYXRlIGxlYWYncyBzdGF0cyBhbmQgYnV0dG9uc1xuICAgICAgICAgICAgLy8gdXBkYXRlIHdpbmRvdydzIG5hdiBhcnJvd3NcbiAgICAgICAgICAgIGlmIChoaXN0b3J5ID09PSB0aGlzLmZvcndhcmQuaGlzdG9yeSkgdGhpcy5mb3J3YXJkLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgICAgICBpZiAoaGlzdG9yeSA9PT0gdGhpcy5iYWNrLmhpc3RvcnkpICAgIHRoaXMuYmFjay5zZXRIaXN0b3J5KGhpc3RvcnkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOYXZpZ2F0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgc3RhdGljIGhvdmVyU291cmNlID0gXCJwYW5lLXJlbGllZjpoaXN0b3J5LW1lbnVcIjtcblxuICAgIGNvbnRhaW5lckVsOiBIVE1MRWxlbWVudFxuICAgIGNvdW50OiBIVE1MU3BhbkVsZW1lbnRcbiAgICBoaXN0b3J5OiBIaXN0b3J5ID0gbnVsbDtcbiAgICBzdGF0ZXM6IEhpc3RvcnlFbnRyeVtdO1xuICAgIG9sZExhYmVsOiBzdHJpbmdcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogTmF2aWdhdGlvbiwgcHVibGljIGtpbmQ6ICdmb3J3YXJkJ3wnYmFjaycsIHB1YmxpYyBkaXI6IG51bWJlcikgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbmxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwgPSB0aGlzLm93bmVyLndpbi5kb2N1bWVudC5ib2R5LmZpbmQoXG4gICAgICAgICAgICBgLnRpdGxlYmFyIC50aXRsZWJhci1idXR0b24tY29udGFpbmVyLm1vZC1sZWZ0IC50aXRsZWJhci1idXR0b24ubW9kLSR7dGhpcy5raW5kfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlU3Bhbih7cHJlcGVuZDogdGhpcy5raW5kID09PSBcImJhY2tcIiwgY2xzOiBcImhpc3RvcnktY291bnRlclwifSk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gW107XG4gICAgICAgIHRoaXMub2xkTGFiZWwgPSB0aGlzLmNvbnRhaW5lckVsLmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEb21FdmVudCh0aGlzLmNvbnRhaW5lckVsLCBcImNvbnRleHRtZW51XCIsIHRoaXMub3Blbk1lbnUuYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgT2JzaWRpYW4gdG8gc3dpdGNoIHdpbmRvdyBvciBmb3J3YXJkIHRoZSBldmVudFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gRG8gdGhlIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeT8uW3RoaXMua2luZF0oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IHRoaXMuY29udGFpbmVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIHRydWUpKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIHNldFRvb2x0aXAodGhpcy5jb250YWluZXJFbCwgdGhpcy5vbGRMYWJlbCk7XG4gICAgICAgIHRoaXMuY291bnQuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwudG9nZ2xlQ2xhc3MoXCJtb2QtYWN0aXZlXCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBzZXRDb3VudChudW06IG51bWJlcikgeyB0aGlzLmNvdW50LnRleHRDb250ZW50ID0gXCJcIiArIChudW0gfHwgXCJcIik7IH1cblxuICAgIHNldEhpc3RvcnkoaGlzdG9yeSA9IEhpc3RvcnkuY3VycmVudCgpKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSh0aGlzLmhpc3RvcnkgPSBoaXN0b3J5KTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNwbGF5KGhpc3Rvcnk6IEhpc3RvcnksIGVsID0gdGhpcy5jb250YWluZXJFbCkge1xuICAgICAgICBjb25zdCBzdGF0ZXMgPSB0aGlzLnN0YXRlcyA9IGhpc3RvcnlbdGhpcy5kaXIgPCAwID8gXCJsb29rQmVoaW5kXCIgOiBcImxvb2tBaGVhZFwiXSgpO1xuICAgICAgICBpZiAoZWw9PT10aGlzLmNvbnRhaW5lckVsKSB0aGlzLnNldENvdW50KHN0YXRlcy5sZW5ndGgpO1xuICAgICAgICBzZXRUb29sdGlwKGVsLCBzdGF0ZXMubGVuZ3RoID9cbiAgICAgICAgICAgIHRoaXMub2xkTGFiZWwgKyBcIlxcblwiICsgdGhpcy5mb3JtYXRTdGF0ZShzdGF0ZXNbMF0pLnRpdGxlIDpcbiAgICAgICAgICAgIGBObyAke3RoaXMua2luZH0gaGlzdG9yeWBcbiAgICAgICAgKTtcbiAgICAgICAgZWwudG9nZ2xlQ2xhc3MoXCJtb2QtYWN0aXZlXCIsIHN0YXRlcy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBvcGVuTWVudShldnQ6IHtjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcn0pIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlcy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWVudSA9IG5ldyBNZW51KCk7XG4gICAgICAgIG1lbnUuZG9tLmFkZENsYXNzKFwicGFuZS1yZWxpZWYtaGlzdG9yeS1tZW51XCIpO1xuICAgICAgICBtZW51LmRvbS5vbihcIm1vdXNlZG93blwiLCBcIi5tZW51LWl0ZW1cIiwgZSA9PiB7ZS5zdG9wUHJvcGFnYXRpb24oKTt9LCB0cnVlKTtcbiAgICAgICAgdGhpcy5zdGF0ZXMubWFwKHRoaXMuZm9ybWF0U3RhdGUuYmluZCh0aGlzKSkuZm9yRWFjaChcbiAgICAgICAgICAgIChpbmZvOiBGaWxlSW5mbywgaWR4KSA9PiB0aGlzLm1lbnVJdGVtKGluZm8sIGlkeCwgbWVudSlcbiAgICAgICAgKTtcbiAgICAgICAgbWVudS5zaG93QXRQb3NpdGlvbih7eDogZXZ0LmNsaWVudFgsIHk6IGV2dC5jbGllbnRZICsgMjB9KTtcbiAgICAgICAgdGhpcy5vd25lci5oaXN0b3J5SXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgbWVudS5vbkhpZGUoKCkgPT4geyB0aGlzLm93bmVyLmhpc3RvcnlJc09wZW4gPSBmYWxzZTsgdGhpcy5vd25lci5kaXNwbGF5KCk7IH0pO1xuICAgIH1cblxuICAgIG1lbnVJdGVtKGluZm86IEZpbGVJbmZvLCBpZHg6IG51bWJlciwgbWVudTogTWVudSkge1xuICAgICAgICBjb25zdCBteSA9IHRoaXM7XG4gICAgICAgIG1lbnUuYWRkSXRlbShpID0+IHsgY3JlYXRlSXRlbShpKTsgaWYgKGluZm8uZmlsZSkgc2V0dXBGaWxlRXZlbnRzKGkuZG9tKTsgfSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKGk6IE1lbnVJdGVtLCBwcmVmaXg9XCJcIikge1xuICAgICAgICAgICAgaS5zZXRJY29uKGluZm8uaWNvbikuc2V0VGl0bGUocHJlZml4ICsgaW5mby50aXRsZSkub25DbGljayhlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaGlzdG9yeSA9IG15Lmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGN0cmwvY21kL21pZGRsZSBidXR0b24gYW5kIHNwbGl0IGxlYWYgKyBjb3B5IGhpc3RvcnlcbiAgICAgICAgICAgICAgICBpZiAoS2V5bWFwLmlzTW9kaWZpZXIoZSwgXCJNb2RcIikgfHwgMSA9PT0gKGUgYXMgTW91c2VFdmVudCkuYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBoaXN0b3J5LmNsb25lVG8oYXBwLndvcmtzcGFjZS5zcGxpdEFjdGl2ZUxlYWYoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhpc3RvcnkuZ28oKGlkeCsxKSAqIG15LmRpciwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwRmlsZUV2ZW50cyhkb206IEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBIb3ZlciBwcmV2aWV3XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwLndvcmtzcGFjZS50cmlnZ2VyKCdob3Zlci1saW5rJywge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZSwgc291cmNlOiBOYXZpZ2F0b3IuaG92ZXJTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgIGhvdmVyUGFyZW50OiBtZW51LmRvbSwgdGFyZ2V0RWw6IGRvbSwgbGlua3RleHQ6IGluZm8uZmlsZS5wYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRHJhZyBtZW51IGl0ZW0gdG8gbW92ZSBvciBsaW5rIGZpbGVcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRyYWdNYW5hZ2VyID0gYXBwLmRyYWdNYW5hZ2VyO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRyYWdEYXRhID0gZHJhZ01hbmFnZXIuZHJhZ0ZpbGUoZSwgaW5mby5maWxlKTtcbiAgICAgICAgICAgICAgICBkcmFnTWFuYWdlci5vbkRyYWdTdGFydChlLCBkcmFnRGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZSA9PiBtZW51LmhpZGUoKSk7XG5cbiAgICAgICAgICAgIC8vIEZpbGUgbWVudVxuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoKTtcbiAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oaSA9PiBjcmVhdGVJdGVtKGksIGBHbyAke215LmtpbmR9IHRvIGApKS5hZGRTZXBhcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZS1tZW51XCIsIG1lbnUsIGluZm8uZmlsZSwgXCJsaW5rLWNvbnRleHQtbWVudVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3dBdFBvc2l0aW9uKHt4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WX0pO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIGtlZXAgdGhlIHBhcmVudCBtZW51IG9wZW4gZm9yIG5vd1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtYXRTdGF0ZShlbnRyeTogSGlzdG9yeUVudHJ5KTogRmlsZUluZm8ge1xuICAgICAgICBjb25zdCB7dmlld1N0YXRlOiB7dHlwZSwgc3RhdGV9LCBlU3RhdGUsIHBhdGh9ID0gZW50cnk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBwYXRoICYmIGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGF0aCkgYXMgVEZpbGU7XG4gICAgICAgIGNvbnN0IGluZm8gPSB7aWNvbjogXCJcIiwgdGl0bGU6IFwiXCIsIGZpbGUsIHR5cGUsIHN0YXRlLCBlU3RhdGV9O1xuXG4gICAgICAgIGlmIChub25GaWxlVmlld3NbdHlwZV0pIHtcbiAgICAgICAgICAgIFtpbmZvLmljb24sIGluZm8udGl0bGVdID0gbm9uRmlsZVZpZXdzW3R5cGVdO1xuICAgICAgICB9IGVsc2UgaWYgKHBhdGggJiYgIWZpbGUpIHtcbiAgICAgICAgICAgIFtpbmZvLmljb24sIGluZm8udGl0bGVdID0gW1widHJhc2hcIiwgXCJNaXNzaW5nIGZpbGUgXCIrcGF0aF07XG4gICAgICAgIH0gZWxzZSBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICBpbmZvLmljb24gPSB2aWV3dHlwZUljb25zW3R5cGVdID8/IFwiZG9jdW1lbnRcIjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm1hcmtkb3duXCIgJiYgc3RhdGUubW9kZSA9PT0gXCJwcmV2aWV3XCIpIGluZm8uaWNvbiA9IFwibGluZXMtb2YtdGV4dFwiO1xuICAgICAgICAgICAgaW5mby50aXRsZSA9IGZpbGUgPyBmaWxlLmJhc2VuYW1lICsgKGZpbGUuZXh0ZW5zaW9uICE9PSBcIm1kXCIgPyBcIi5cIitmaWxlLmV4dGVuc2lvbiA6IFwiXCIpIDogXCJObyBmaWxlXCI7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJtZWRpYS12aWV3XCIgJiYgIWZpbGUpIGluZm8udGl0bGUgPSBzdGF0ZS5pbmZvPy5maWxlbmFtZSA/PyBpbmZvLnRpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwLndvcmtzcGFjZS50cmlnZ2VyKFwicGFuZS1yZWxpZWY6Zm9ybWF0LWhpc3RvcnktaXRlbVwiLCBpbmZvKTtcbiAgICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb25FbGVtZW50PEsgZXh0ZW5kcyBrZXlvZiBIVE1MRWxlbWVudEV2ZW50TWFwPihcbiAgICBlbDogSFRNTEVsZW1lbnQsXG4gICAgZXZlbnQ6IEssXG4gICAgc2VsZWN0b3I6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKHRoaXM6IEhUTUxFbGVtZW50LCBldjogSFRNTEVsZW1lbnRFdmVudE1hcFtLXSwgZGVsZWdhdGVUYXJnZXQ6IEhUTUxFbGVtZW50KSA9PiBhbnksXG4gICAgb3B0aW9ucz86IGJvb2xlYW4gfCBBZGRFdmVudExpc3RlbmVyT3B0aW9uc1xuKSB7XG4gICAgZWwub24oZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucylcbiAgICByZXR1cm4gKCkgPT4gZWwub2ZmKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBzZXRUb29sdGlwKGVsOiBIVE1MRWxlbWVudCwgdGV4dDogc3RyaW5nKSB7XG4gICAgaWYgKHRleHQpIGVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdGV4dCB8fCB1bmRlZmluZWQpO1xuICAgIGVsc2UgZWwucmVtb3ZlQXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbn0iLCJpbXBvcnQge1BsdWdpbiwgVEZpbGUsIFdvcmtzcGFjZVRhYnN9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7YWRkQ29tbWFuZHMsIGNvbW1hbmR9IGZyb20gXCIuL2NvbW1hbmRzXCI7XG5pbXBvcnQge0hpc3RvcnksIGluc3RhbGxIaXN0b3J5fSBmcm9tIFwiLi9IaXN0b3J5XCI7XG5pbXBvcnQgeyBNYXhpbWl6ZXIgfSBmcm9tICcuL21heGltaXppbmcnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uLCBOYXZpZ2F0b3IsIG9uRWxlbWVudH0gZnJvbSBcIi4vTmF2aWdhdG9yXCI7XG5cbmltcG9ydCBcIi4vc3R5bGVzLnNjc3NcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlIHtcbiAgICAgICAgb24odHlwZTogXCJwYW5lLXJlbGllZjp1cGRhdGUtaGlzdG9yeVwiLCBjYWxsYmFjazogKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGhpc3Rvcnk6IEhpc3RvcnkpID0+IGFueSwgY3R4PzogYW55KTogRXZlbnRSZWY7XG4gICAgICAgIHJlZ2lzdGVySG92ZXJMaW5rU291cmNlKHNvdXJjZTogc3RyaW5nLCBpbmZvOiB7ZGlzcGxheTogc3RyaW5nLCBkZWZhdWx0TW9kPzogYm9vbGVhbn0pOiB2b2lkXG4gICAgICAgIHVucmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2Uoc291cmNlOiBzdHJpbmcpOiB2b2lkXG4gICAgICAgIGl0ZXJhdGVMZWF2ZXMoY2FsbGJhY2s6IChpdGVtOiBXb3Jrc3BhY2VMZWFmKSA9PiB1bmtub3duLCBpdGVtOiBXb3Jrc3BhY2VQYXJlbnQpOiBib29sZWFuO1xuICAgICAgICBvbkxheW91dENoYW5nZSgpOiB2b2lkXG4gICAgfVxuICAgIGludGVyZmFjZSBBcHAge1xuICAgICAgICBwbHVnaW5zOiB7XG4gICAgICAgICAgICBwbHVnaW5zOiB7XG4gICAgICAgICAgICAgICAgXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3JcIjoge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVQb3BvdmVyczogSG92ZXJQb3BvdmVyW11cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZUl0ZW0ge1xuICAgICAgICBjb250YWluZXJFbDogSFRNTERpdkVsZW1lbnRcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZVBhcmVudCB7XG4gICAgICAgIGNoaWxkcmVuOiBXb3Jrc3BhY2VJdGVtW11cbiAgICAgICAgcmVjb21wdXRlQ2hpbGRyZW5EaW1lbnNpb25zKCk6IHZvaWRcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZVRhYnMgZXh0ZW5kcyBXb3Jrc3BhY2VQYXJlbnQge1xuICAgICAgICBzZWxlY3RUYWIobGVhZjogV29ya3NwYWNlTGVhZik6IHZvaWRcbiAgICB9XG4gICAgaW50ZXJmYWNlIFdvcmtzcGFjZUxlYWYge1xuICAgICAgICBwYXJlbnRTcGxpdDogV29ya3NwYWNlUGFyZW50XG4gICAgfVxuICAgIGludGVyZmFjZSBIb3ZlclBvcG92ZXIge1xuICAgICAgICBsZWFmPzogV29ya3NwYWNlTGVhZlxuICAgICAgICByb290U3BsaXQ/OiBXb3Jrc3BhY2VTcGxpdFxuICAgICAgICBob3ZlckVsOiBIVE1MRWxlbWVudFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZVJlbGllZiBleHRlbmRzIFBsdWdpbiB7XG5cbiAgICBuYXYgPSBOYXZpZ2F0aW9uLnBlcldpbmRvdyh0aGlzKS53YXRjaCgpO1xuICAgIG1heCA9IHRoaXMuYWRkQ2hpbGQobmV3IE1heGltaXplcik7XG5cbiAgICBvbmxvYWQoKSB7XG4gICAgICAgIGluc3RhbGxIaXN0b3J5KHRoaXMpO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2UoTmF2aWdhdG9yLmhvdmVyU291cmNlLCB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnSGlzdG9yeSBkcm9wZG93bnMnLCBkZWZhdWx0TW9kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAudmF1bHQub24oXCJyZW5hbWVcIiwgKGZpbGUsIG9sZFBhdGgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhcbiAgICAgICAgICAgICAgICAgICAgbGVhZiA9PiBIaXN0b3J5LmZvckxlYWYobGVhZikub25SZW5hbWUoZmlsZSwgb2xkUGF0aClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgbGVhZiA9PiB0aGlzLm5hdi5mb3JMZWFmKGxlYWYpLmRpc3BsYXkobGVhZikpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub24oXCJwYW5lLXJlbGllZjp1cGRhdGUtaGlzdG9yeVwiLCAobGVhZiwgaGlzdG9yeSkgPT4gdGhpcy5uYXYuZm9yTGVhZihsZWFmKS5vblVwZGF0ZUhpc3RvcnkobGVhZiwgaGlzdG9yeSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGRDb21tYW5kcyh0aGlzLCB7XG4gICAgICAgICAgICBbY29tbWFuZChcInN3YXAtcHJldlwiLCBcIlN3YXAgcGFuZSB3aXRoIHByZXZpb3VzIGluIHNwbGl0XCIsICBcIk1vZCtTaGlmdCtQYWdlVXBcIildICAgKCl7IHJldHVybiB0aGlzLmxlYWZQbGFjZXIoLTEpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJzd2FwLW5leHRcIiwgXCJTd2FwIHBhbmUgd2l0aCBuZXh0IGluIHNwbGl0XCIsICAgICAgXCJNb2QrU2hpZnQrUGFnZURvd25cIildICgpeyByZXR1cm4gdGhpcy5sZWFmUGxhY2VyKCAxKTsgfSxcblxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby1wcmV2XCIsICBcIkN5Y2xlIHRvIHByZXZpb3VzIHdvcmtzcGFjZSBwYW5lXCIsICAgXCJNb2QrUGFnZVVwXCIgICldICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoLTEsIHRydWUpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby1uZXh0XCIsICBcIkN5Y2xlIHRvIG5leHQgd29ya3NwYWNlIHBhbmVcIiwgICAgICAgXCJNb2QrUGFnZURvd25cIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoIDEsIHRydWUpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi1wcmV2XCIsIFwiQ3ljbGUgdG8gcHJldmlvdXMgd2luZG93XCIsIFtdICldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KC0xLCB0cnVlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLW5leHRcIiwgXCJDeWNsZSB0byBuZXh0IHdpbmRvd1wiLCAgICAgW10gKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coIDEsIHRydWUpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTFzdFwiLCAgIFwiSnVtcCB0byAxc3QgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCsxXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDApOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby0ybmRcIiwgICBcIkp1bXAgdG8gMm5kIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrMlwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigxKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tM3JkXCIsICAgXCJKdW1wIHRvIDNyZCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzNcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoMik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTR0aFwiLCAgIFwiSnVtcCB0byA0dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs0XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDMpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby01dGhcIiwgICBcIkp1bXAgdG8gNXRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrNVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig0KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tNnRoXCIsICAgXCJKdW1wIHRvIDZ0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzZcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoNSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTd0aFwiLCAgIFwiSnVtcCB0byA3dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs3XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDYpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby04dGhcIiwgICBcIkp1bXAgdG8gOHRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrOFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig3KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tbGFzdFwiLCAgXCJKdW1wIHRvIGxhc3QgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsIFwiQWx0KzlcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoOTk5OTk5OTkpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi0xc3RcIiwgICBcIlN3aXRjaCB0byAxc3Qgd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDApOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tMm5kXCIsICAgXCJTd2l0Y2ggdG8gMm5kIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdygxKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTNyZFwiLCAgIFwiU3dpdGNoIHRvIDNyZCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coMik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi00dGhcIiwgICBcIlN3aXRjaCB0byA0dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDMpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tNXRoXCIsICAgXCJTd2l0Y2ggdG8gNXRoIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg0KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTZ0aFwiLCAgIFwiU3dpdGNoIHRvIDZ0aCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coNSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi03dGhcIiwgICBcIlN3aXRjaCB0byA3dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDYpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tOHRoXCIsICAgXCJTd2l0Y2ggdG8gOHRoIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg3KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLWxhc3RcIiwgIFwiU3dpdGNoIHRvIGxhc3Qgd2luZG93XCIsIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coOTk5OTk5OTkpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC0xc3RcIiwgIFwiUGxhY2UgYXMgMXN0IHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrMVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMCwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtMm5kXCIsICBcIlBsYWNlIGFzIDJuZCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzJcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDEsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTNyZFwiLCAgXCJQbGFjZSBhcyAzcmQgcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCszXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZigyLCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC00dGhcIiwgIFwiUGxhY2UgYXMgNHRoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrNFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMywgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtNXRoXCIsICBcIlBsYWNlIGFzIDV0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzVcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDQsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTZ0aFwiLCAgXCJQbGFjZSBhcyA2dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs2XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig1LCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC03dGhcIiwgIFwiUGxhY2UgYXMgN3RoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrN1wiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoNiwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtOHRoXCIsICBcIlBsYWNlIGFzIDh0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzhcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDcsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LWxhc3RcIiwgXCJQbGFjZSBhcyBsYXN0IHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgIFwiTW9kK0FsdCs5XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig5OTk5OTk5OSwgZmFsc2UpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcIm1heGltaXplXCIsIFwiTWF4aW1pemUgYWN0aXZlIHBhbmUgKFRvZ2dsZSlcIiwgW10pXSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4LnBhcmVudEZvcihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpKSByZXR1cm4gKCkgPT4gdGhpcy5tYXgudG9nZ2xlTWF4aW1pemUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UudW5yZWdpc3RlckhvdmVyTGlua1NvdXJjZShOYXZpZ2F0b3IuaG92ZXJTb3VyY2UpO1xuICAgIH1cblxuICAgIGdvdG9OdGhMZWFmKG46IG51bWJlciwgcmVsYXRpdmU6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgbmF2ID0gdGhpcy5uYXYuZm9yTGVhZihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpO1xuICAgICAgICBjb25zdCBsZWFmID0gZ290b050aChuYXYubGVhdmVzKCksIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLCBuLCByZWxhdGl2ZSk7XG4gICAgICAgICFsZWFmIHx8IHRoaXMuYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGdvdG9OdGhXaW5kb3cobjogbnVtYmVyLCByZWxhdGl2ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuYXYgPSBnb3RvTnRoKHRoaXMubmF2LmZvckFsbCgpLCB0aGlzLm5hdi5mb3JMZWFmKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiksIG4sIHJlbGF0aXZlKTtcbiAgICAgICAgY29uc3QgbGVhZiA9IG5hdj8ubGF0ZXN0TGVhZigpO1xuICAgICAgICBpZiAobGVhZikgYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgICAgICAobmF2Py53aW4gYXMgYW55KS5yZXF1aXJlPy4oJ2VsZWN0cm9uJyk/LnJlbW90ZT8uZ2V0Q3VycmVudFdpbmRvdygpPy5mb2N1cygpO1xuICAgIH1cblxuICAgIHBsYWNlTGVhZih0b1BvczogbnVtYmVyLCByZWxhdGl2ZT10cnVlKSB7XG4gICAgICAgIGNvbnN0IGNiID0gdGhpcy5sZWFmUGxhY2VyKHRvUG9zLCByZWxhdGl2ZSk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICBsZWFmUGxhY2VyKHRvUG9zOiBudW1iZXIsIHJlbGF0aXZlPXRydWUpIHtcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAoIWxlYWYpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdFxuICAgICAgICAgICAgcGFyZW50U3BsaXQgPSBsZWFmLnBhcmVudFNwbGl0LFxuICAgICAgICAgICAgY2hpbGRyZW4gPSBwYXJlbnRTcGxpdC5jaGlsZHJlbixcbiAgICAgICAgICAgIGZyb21Qb3MgPSBjaGlsZHJlbi5pbmRleE9mKGxlYWYpXG4gICAgICAgIDtcbiAgICAgICAgaWYgKGZyb21Qb3MgPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgIHRvUG9zICs9IGZyb21Qb3M7XG4gICAgICAgICAgICBpZiAodG9Qb3MgPCAwIHx8IHRvUG9zID49IGNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRvUG9zID49IGNoaWxkcmVuLmxlbmd0aCkgdG9Qb3MgPSBjaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHRvUG9zIDwgMCkgdG9Qb3MgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21Qb3MgPT0gdG9Qb3MpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3RoZXIgPSBjaGlsZHJlblt0b1Bvc107XG4gICAgICAgICAgICBjaGlsZHJlbi5zcGxpY2UoZnJvbVBvcywgMSk7XG4gICAgICAgICAgICBjaGlsZHJlbi5zcGxpY2UodG9Qb3MsICAgMCwgbGVhZik7XG4gICAgICAgICAgICBpZiAoKHBhcmVudFNwbGl0IGFzIFdvcmtzcGFjZVRhYnMpLnNlbGVjdFRhYikge1xuICAgICAgICAgICAgICAgIChwYXJlbnRTcGxpdCBhcyBXb3Jrc3BhY2VUYWJzKS5zZWxlY3RUYWIobGVhZik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG90aGVyLmNvbnRhaW5lckVsLmluc2VydEFkamFjZW50RWxlbWVudChmcm9tUG9zID4gdG9Qb3MgPyBcImJlZm9yZWJlZ2luXCIgOiBcImFmdGVyZW5kXCIsIGxlYWYuY29udGFpbmVyRWwpO1xuICAgICAgICAgICAgICAgIHBhcmVudFNwbGl0LnJlY29tcHV0ZUNoaWxkcmVuRGltZW5zaW9ucygpO1xuICAgICAgICAgICAgICAgIGxlYWYub25SZXNpemUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRDaGFuZ2UoKTtcblxuICAgICAgICAgICAgICAgIC8vIEZvcmNlIGZvY3VzIGJhY2sgdG8gcGFuZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnNldEFjdGl2ZUxlYWYobGVhZiwgZmFsc2UsIHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1N5bnRoZXRpY0hpc3RvcnlFdmVudChidXR0b246IG51bWJlcikge1xuICAgICAgICBjb25zdCB3aW4gPSB0aGlzLm5hdi53aW5kb3dzKCkuZmlsdGVyKHdpbiA9PlxuICAgICAgICAgICAgd2luLmV2ZW50ICYmICh3aW4uZXZlbnQgYXMgTW91c2VFdmVudCkuYnV0dG9uID09PSBidXR0b25cbiAgICAgICAgKS5wb3AoKTtcbiAgICAgICAgaWYgKHdpbiAmJiB3aW4uZXZlbnQudHlwZSA9PT0gXCJtb3VzZWRvd25cIikge1xuICAgICAgICAgICAgd2luLmV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB3aW4uZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnb3RvTnRoPFQ+KGl0ZW1zOiBUW10sIGN1cnJlbnQ6IFQsIG46IG51bWJlciwgcmVsYXRpdmU6IGJvb2xlYW4pOiBUIHtcbiAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgbiArPSBpdGVtcy5pbmRleE9mKGN1cnJlbnQpO1xuICAgICAgICBuID0gKG4gKyBpdGVtcy5sZW5ndGgpICUgaXRlbXMubGVuZ3RoOyAgLy8gd3JhcCBhcm91bmRcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zW24gPj0gaXRlbXMubGVuZ3RoID8gaXRlbXMubGVuZ3RoLTEgOiBuXTtcbn0iXSwibmFtZXMiOlsiTm90aWNlIiwiV29ya3NwYWNlTGVhZiIsIkNvbXBvbmVudCIsImRlYm91bmNlIiwiV29ya3NwYWNlUGFyZW50IiwiTWVudSIsIktleW1hcCIsIlRGaWxlIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFNQSxNQUFNLFFBQVEsR0FBNEIsRUFBRSxDQUFDO0FBRTdCLFNBQUEsT0FBTyxDQUFDLEVBQVUsRUFBRSxJQUFZLEVBQUUsT0FBQSxHQUE2QixFQUFFLEVBQUUsR0FBRyxHQUFDLEVBQUUsRUFBQTs7O0lBSXJGLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUTtBQUFFLFFBQUEsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckQsSUFBQSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSyxPQUFrQixDQUFDLEdBQUc7QUFBRSxRQUFBLE9BQU8sR0FBRyxDQUFDLE9BQWlCLENBQUMsQ0FBQztBQUUxRixJQUFBLElBQUksSUFBSSxHQUFjLE9BQW9CLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFBOztRQUV2RCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7QUFBRSxZQUFBLE9BQU8sR0FBRyxDQUFDOztRQUV4QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLFFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFtQixFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUE7QUFDdEUsS0FBQyxDQUFDLENBQUM7QUFDSCxJQUFBLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUMsRUFBRSxFQUFF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QUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUU7SUFDekQsSUFBSSxNQUFNLEdBQUssRUFBQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFFMUMsSUFBSSxHQUFBLEVBQVEsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDMUIsT0FBTyxHQUFBLEVBQUssSUFBSSxDQUFDLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBRTFCLElBQUEsU0FBUyxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQy9ELElBQUEsVUFBVSxLQUFLLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBRXJELFFBQVEsR0FBQTtBQUNKLFFBQUEsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUMxRTtBQUVELElBQUEsSUFBSSxDQUFDLEdBQVcsRUFBQTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU87QUFDdkIsUUFBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtBQUFFLFlBQUEsT0FBTyxJQUFJQSxlQUFNLENBQUMsaURBQWlELENBQUMsRUFBRSxTQUFTLENBQUM7QUFDdEcsUUFBQSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztBQUFFLFlBQUEsT0FBTyxJQUFJQSxlQUFNLENBQUMscURBQXFELENBQUMsRUFBRSxTQUFTLENBQUM7UUFDM0csR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFD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YUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEosWUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUksc0JBQXNCLEVBQUcsRUFBRSxDQUFDLENBQUMsS0FBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEosWUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUksc0JBQXNCLEVBQUcsRUFBRSxDQUFDLENBQUMsS0FBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEosWUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUksc0JBQXNCLEVBQUcsRUFBRSxDQUFDLENBQUMsS0FBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEosWUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUksc0JBQXNCLEVBQUcsRUFBRSxDQUFDLENBQUMsS0FBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEosWUFBQSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUksc0JBQXNCLEVBQUcsRUFBRSxDQUFDLENBQUMsS0FBTSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7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
