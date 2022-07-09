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
    isEmpty() {
        const viewState = JSON.parse(this.raw.state || "{}");
        return (viewState.type === "empty");
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
        const entry = this.stack[this.pos];
        if (entry && entry.isEmpty())
            return this.replaceState(rawState, title, url);
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
                    const parent = self.parentFor(leaf), oldParent = self.parentFor(app.workspace.activeLeaf);
                    if (parent && oldParent && parent !== oldParent &&
                        oldParent.containerEl?.matchParent(".hover-popover.is-active.snap-to-viewport") &&
                        parent.containerEl?.ownerDocument === oldParent.containerEl.ownerDocument &&
                        !parent.containerEl.matchParent(".hover-popover")) {
                        // Switching from maximized popover to non-popover; de-maximize it first
                        app.commands.executeCommandById("obsidian-hover-editor:restore-active-popover");
                    }
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
        this.register(
        // Support "Customizable Page Header and Title Bar" buttons
        onElement(this.owner.win.document.body, "contextmenu", `.view-header > .view-actions > .view-action[class*="app:go-${this.kind}"]`, (evt, target) => {
            const el = target.matchParent(".workspace-leaf");
            const leaf = this.owner.leaves().filter(leaf => leaf.containerEl === el).pop();
            if (!leaf)
                return;
            evt.preventDefault();
            evt.stopImmediatePropagation();
            this.openMenu(evt, History.forLeaf(leaf));
        }, { capture: true }));
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
        const states = history[this.dir < 0 ? "lookBehind" : "lookAhead"]();
        if (el === this.containerEl)
            this.setCount(states.length);
        setTooltip(el, states.length ?
            this.oldLabel + "\n" + this.formatState(states[0]).title :
            `No ${this.kind} history`);
        el.toggleClass("mod-active", states.length > 0);
    }
    openMenu(evt, history = this.history) {
        const states = history[this.dir < 0 ? "lookBehind" : "lookAhead"]();
        if (!states.length)
            return;
        const menu = new obsidian.Menu();
        menu.dom.addClass("pane-relief-history-menu");
        menu.dom.on("mousedown", ".menu-item", e => { e.stopPropagation(); }, true);
        states.map(this.formatState.bind(this)).forEach((info, idx) => this.menuItem(info, idx, menu, history));
        menu.showAtPosition({ x: evt.clientX, y: evt.clientY + 20 });
        this.owner.historyIsOpen = true;
        menu.onHide(() => { this.owner.historyIsOpen = false; this.owner.display(); });
    }
    menuItem(info, idx, menu, history) {
        const { dir, kind } = this;
        menu.addItem(i => { createItem(i); if (info.file)
            setupFileEvents(i.dom); });
        return;
        function createItem(i, prefix = "") {
            i.setIcon(info.icon).setTitle(prefix + info.title).onClick(e => {
                // Check for ctrl/cmd/middle button and split leaf + copy history
                if (obsidian.Keymap.isModifier(e, "Mod") || 1 === e.button) {
                    history = history.cloneTo(app.workspace.splitActiveLeaf());
                }
                history.go((idx + 1) * dir, true);
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
                menu.addItem(i => createItem(i, `Go ${kind} to `)).addSeparator();
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
        let leaf = app.workspace.activeLeaf;
        const root = leaf.getRoot();
        if (root === app.workspace.leftSplit || root === app.workspace.rightSplit) {
            // Workaround for 0.15.3 sidebar tabs stealing focus
            leaf = app.workspace.getMostRecentLeaf(app.workspace.rootSplit);
        }
        const nav = this.nav.forLeaf(leaf);
        leaf = gotoNth(nav.leaves(), leaf, n, relative);
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
        if (children.length === 1) {
            const popoverEl = leaf.containerEl.matchParent(".hover-popover");
            if (popoverEl && relative && Math.abs(toPos) === 1) {
                // Allow swapping popovers in the stack
                let neighbor = popoverEl;
                while (neighbor && (neighbor === popoverEl || !neighbor.matches(".hover-popover")))
                    neighbor = toPos < 0 ? neighbor.previousElementSibling : neighbor.nextElementSibling;
                if (neighbor)
                    return () => {
                        if (toPos < 0)
                            neighbor.parentElement.insertBefore(popoverEl, neighbor);
                        else
                            neighbor.parentElement.insertBefore(neighbor, popoverEl);
                        app.workspace.onLayoutChange();
                    };
            }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2NvbW1hbmRzLnRzIiwibm9kZV9tb2R1bGVzLy5wbnBtL21vbmtleS1hcm91bmRAMi4zLjAvbm9kZV9tb2R1bGVzL21vbmtleS1hcm91bmQvbWpzL2luZGV4LmpzIiwic3JjL0hpc3RvcnkudHMiLCJzcmMvbWF4aW1pemluZy50cyIsInNyYy9QZXJXaW5kb3dDb21wb25lbnQudHMiLCJzcmMvTmF2aWdhdG9yLnRzIiwic3JjL3BhbmUtcmVsaWVmLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNpbXBsaWZpZWQgQ29tbWFuZHMgRnJhbWV3b3JrXG5cbmltcG9ydCB7Q29tbWFuZCwgSG90a2V5LCBNb2RpZmllciwgUGx1Z2lufSBmcm9tIFwib2JzaWRpYW5cIlxuXG50eXBlIEtleURlZiA9IEhvdGtleSB8IHN0cmluZ1xuXG5jb25zdCBjb21tYW5kczogUmVjb3JkPHN5bWJvbCwgQ29tbWFuZD4gPSB7fTsgLy9uZXcgTWFwO1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZChpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGhvdGtleXM6IEtleURlZiB8IEtleURlZltdID0gW10sIGNtZD17fSkge1xuXG4gICAgLy8gQWxsb3cgaG90a2V5cyB0byBiZSBleHByZXNzZWQgYXMgYSBzdHJpbmcsIGFycmF5IG9mIHN0cmluZ3MsXG4gICAgLy8gb2JqZWN0LCBvciBhcnJheSBvZiBvYmplY3RzLiAgKE5vcm1hbGl6ZSB0byBhbiBhcnJheSBmaXJzdC4pXG4gICAgaWYgKHR5cGVvZiBob3RrZXlzID09PSBcInN0cmluZ1wiKSBob3RrZXlzID0gW2hvdGtleXNdO1xuICAgIGlmICh0eXBlb2YgaG90a2V5cyA9PT0gXCJvYmplY3RcIiAmJiAoaG90a2V5cyBhcyBIb3RrZXkpLmtleSkgaG90a2V5cyA9IFtob3RrZXlzIGFzIEhvdGtleV07XG5cbiAgICBsZXQga2V5czogSG90a2V5W10gPSAoaG90a2V5cyBhcyBLZXlEZWZbXSkubWFwKGZ1bmN0aW9uKGtleSk6IEhvdGtleSB7XG4gICAgICAgIC8vIElmIGEgaG90a2V5IGlzIGFuIG9iamVjdCBhbHJlYWR5LCBubyBuZWVkIHRvIHByb2Nlc3MgaXRcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIpIHJldHVybiBrZXk7XG4gICAgICAgIC8vIENvbnZlcnQgc3RyaW5ncyB0byBPYnNpZGlhbidzIGhvdGtleSBmb3JtYXRcbiAgICAgICAgbGV0IHBhcnRzID0ga2V5LnNwbGl0KFwiK1wiKVxuICAgICAgICByZXR1cm4geyBtb2RpZmllcnM6IHBhcnRzIGFzIE1vZGlmaWVyW10sIGtleTogcGFydHMucG9wKCkgfHwgXCIrXCIgfSAgLy8gZW1wdHkgbGFzdCBwYXJ0ID0gZS5nLiAnTW9kKysnXG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbihjbWQsIHtpZCwgbmFtZSwgaG90a2V5czoga2V5c30pO1xuXG4gICAgLy8gU2F2ZSB0aGUgY29tbWFuZCBkYXRhIHVuZGVyIGEgdW5pcXVlIHN5bWJvbFxuICAgIGNvbnN0IHN5bSA9IFN5bWJvbChcImNtZDpcIiArIGlkKTtcbiAgICBjb21tYW5kc1tzeW1dID0gY21kIGFzIENvbW1hbmQ7XG4gICAgcmV0dXJuIHN5bTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1hbmRzPFAgZXh0ZW5kcyBQbHVnaW4+KFxuICAgIHBsdWdpbjogUCxcbiAgICBjbWRzZXQ6IFJlY29yZDxzeW1ib2wsICh0aGlzQXJnOiBQKSA9PiBib29sZWFuIHwgKCgpID0+IGFueSk+XG4pIHtcbiAgICAvLyBFeHRyYWN0IGNvbW1hbmQgc3ltYm9scyBmcm9tIGNtZHNldCBhbmQgcmVnaXN0ZXIgdGhlbSwgYm91bmQgdG8gdGhlIHBsdWdpbiBmb3IgbWV0aG9kc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY21kc2V0KS5mb3JFYWNoKHN5bSA9PiB7XG4gICAgICAgIGNvbnN0IGNtZCA9IGNvbW1hbmRzW3N5bV0sIG1ldGhvZCA9IGNtZHNldFtzeW1dO1xuICAgICAgICBpZiAoY21kKSBwbHVnaW4uYWRkQ29tbWFuZChPYmplY3QuYXNzaWduKHt9LCBjbWQsIHtcbiAgICAgICAgICAgIGNoZWNrQ2FsbGJhY2soY2hlY2s6IGJvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBtZXRob2QgYm9keSB3aXRoIHRoZSBwbHVnaW4gYXMgJ3RoaXMnXG4gICAgICAgICAgICAgICAgY29uc3QgY2IgPSBtZXRob2QuY2FsbChwbHVnaW4pO1xuICAgICAgICAgICAgICAgIC8vIEl0IHRoZW4gcmV0dXJucyBhIGNsb3N1cmUgaWYgdGhlIGNvbW1hbmQgaXMgcmVhZHkgdG8gZXhlY3V0ZSwgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UgY2FsbCB0aGF0IGNsb3N1cmUgdW5sZXNzIHRoaXMgaXMganVzdCBhIGNoZWNrIGZvciBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gKGNoZWNrIHx8IHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKSA/ICEhY2IgOiAoY2IoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KVxufSIsImV4cG9ydCBmdW5jdGlvbiBhcm91bmQob2JqLCBmYWN0b3JpZXMpIHtcbiAgICBjb25zdCByZW1vdmVycyA9IE9iamVjdC5rZXlzKGZhY3RvcmllcykubWFwKGtleSA9PiBhcm91bmQxKG9iaiwga2V5LCBmYWN0b3JpZXNba2V5XSkpO1xuICAgIHJldHVybiByZW1vdmVycy5sZW5ndGggPT09IDEgPyByZW1vdmVyc1swXSA6IGZ1bmN0aW9uICgpIHsgcmVtb3ZlcnMuZm9yRWFjaChyID0+IHIoKSk7IH07XG59XG5mdW5jdGlvbiBhcm91bmQxKG9iaiwgbWV0aG9kLCBjcmVhdGVXcmFwcGVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBvYmpbbWV0aG9kXSwgaGFkT3duID0gb2JqLmhhc093blByb3BlcnR5KG1ldGhvZCk7XG4gICAgbGV0IGN1cnJlbnQgPSBjcmVhdGVXcmFwcGVyKG9yaWdpbmFsKTtcbiAgICAvLyBMZXQgb3VyIHdyYXBwZXIgaW5oZXJpdCBzdGF0aWMgcHJvcHMgZnJvbSB0aGUgd3JhcHBpbmcgbWV0aG9kLFxuICAgIC8vIGFuZCB0aGUgd3JhcHBpbmcgbWV0aG9kLCBwcm9wcyBmcm9tIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICBpZiAob3JpZ2luYWwpXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjdXJyZW50LCBvcmlnaW5hbCk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHdyYXBwZXIsIGN1cnJlbnQpO1xuICAgIG9ialttZXRob2RdID0gd3JhcHBlcjtcbiAgICAvLyBSZXR1cm4gYSBjYWxsYmFjayB0byBhbGxvdyBzYWZlIHJlbW92YWxcbiAgICByZXR1cm4gcmVtb3ZlO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGJlZW4gZGVhY3RpdmF0ZWQgYW5kIGFyZSBubyBsb25nZXIgd3JhcHBlZCwgcmVtb3ZlIG91cnNlbHZlc1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwgJiYgb2JqW21ldGhvZF0gPT09IHdyYXBwZXIpXG4gICAgICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgLy8gSWYgbm8gb3RoZXIgcGF0Y2hlcywganVzdCBkbyBhIGRpcmVjdCByZW1vdmFsXG4gICAgICAgIGlmIChvYmpbbWV0aG9kXSA9PT0gd3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKGhhZE93bilcbiAgICAgICAgICAgICAgICBvYmpbbWV0aG9kXSA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbbWV0aG9kXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEVsc2UgcGFzcyBmdXR1cmUgY2FsbHMgdGhyb3VnaCwgYW5kIHJlbW92ZSB3cmFwcGVyIGZyb20gdGhlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICBjdXJyZW50ID0gb3JpZ2luYWw7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBvcmlnaW5hbCB8fCBGdW5jdGlvbik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwZShrZXksIG9sZEZuLCBuZXdGbikge1xuICAgIGNoZWNrW2tleV0gPSBrZXk7XG4gICAgcmV0dXJuIGNoZWNrO1xuICAgIGZ1bmN0aW9uIGNoZWNrKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIChvbGRGbltrZXldID09PSBrZXkgPyBvbGRGbiA6IG5ld0ZuKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXIocHJvbWlzZSwgY2IpIHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGNiLCBjYik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKGFzeW5jRnVuY3Rpb24pIHtcbiAgICBsZXQgbGFzdFJ1biA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gbGFzdFJ1biA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgYWZ0ZXIobGFzdFJ1biwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFzeW5jRnVuY3Rpb24uYXBwbHkodGhpcywgYXJncykudGhlbihyZXMsIHJlaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdyYXBwZXIuYWZ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0UnVuID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7IGFmdGVyKGxhc3RSdW4sIHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCJpbXBvcnQge05vdGljZSwgVEFic3RyYWN0RmlsZSwgVmlld1N0YXRlLCBXb3Jrc3BhY2VMZWFmfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge2Fyb3VuZH0gZnJvbSBcIm1vbmtleS1hcm91bmRcIjtcbmltcG9ydCBQYW5lUmVsaWVmIGZyb20gXCIuL3BhbmUtcmVsaWVmXCI7XG5cbmNvbnN0IEhJU1RfQVRUUiA9IFwicGFuZS1yZWxpZWY6aGlzdG9yeS12MVwiO1xuY29uc3QgU0VSSUFMX1BST1AgPSBcInBhbmUtcmVsaWVmOmhpc3RvcnktdjFcIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlIHtcbiAgICAgICAgZGVzZXJpYWxpemVMYXlvdXQoc3RhdGU6IGFueSwgLi4uZXRjOiBhbnlbXSk6IFByb21pc2U8V29ya3NwYWNlSXRlbT5cbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIFtISVNUX0FUVFJdOiBIaXN0b3J5XG4gICAgICAgIHBpbm5lZDogYm9vbGVhblxuICAgICAgICB3b3JraW5nOiBib29sZWFuXG4gICAgICAgIHNlcmlhbGl6ZSgpOiBhbnlcbiAgICB9XG5cbiAgICBpbnRlcmZhY2UgVmlld1N0YXRlIHtcbiAgICAgICAgcG9wc3RhdGU/OiBib29sZWFuXG4gICAgfVxufVxuXG5cbmV4cG9ydCBjb25zdCBkb21MZWF2ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5pbnRlcmZhY2UgUHVzaFN0YXRlIHtcbiAgICBzdGF0ZTogc3RyaW5nXG4gICAgZVN0YXRlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEhpc3RvcnlFbnRyeSB7XG5cbiAgICByYXc6IFB1c2hTdGF0ZVxuICAgIGVTdGF0ZTogYW55XG4gICAgcGF0aDogc3RyaW5nXG5cbiAgICBjb25zdHJ1Y3RvcihyYXdTdGF0ZTogUHVzaFN0YXRlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocmF3U3RhdGUpO1xuICAgIH1cblxuXG4gICAgZ2V0IHZpZXdTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5yYXcuc3RhdGUgfHwgXCJ7fVwiKVxuICAgIH1cblxuICAgIHNldFN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUpIHtcbiAgICAgICAgdGhpcy5yYXcgPSByYXdTdGF0ZTtcbiAgICAgICAgdGhpcy5lU3RhdGUgPSBKU09OLnBhcnNlKHJhd1N0YXRlLmVTdGF0ZSB8fCBcIm51bGxcIik7XG4gICAgICAgIHRoaXMucGF0aCA9IHRoaXMudmlld1N0YXRlLnN0YXRlPy5maWxlO1xuICAgIH1cblxuICAgIG9uUmVuYW1lKGZpbGU6IFRBYnN0cmFjdEZpbGUsIG9sZFBhdGg6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wYXRoID09PSBvbGRQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3U3RhdGUgPSB0aGlzLnZpZXdTdGF0ZVxuICAgICAgICAgICAgdGhpcy5wYXRoID0gdmlld1N0YXRlLnN0YXRlLmZpbGUgPSBmaWxlLnBhdGhcbiAgICAgICAgICAgIHRoaXMucmF3LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkodmlld1N0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdvKGxlYWY/OiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIGxldCB7dmlld1N0YXRlLCBwYXRoLCBlU3RhdGV9ID0gdGhpcztcbiAgICAgICAgbGV0IGZpbGUgPSBwYXRoICYmIGFwcD8udmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpO1xuICAgICAgICBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIk1pc3NpbmcgZmlsZTogXCIrcGF0aCk7XG4gICAgICAgICAgICB2aWV3U3RhdGUgPSB7dHlwZTogXCJlbXB0eVwiLCBzdGF0ZTp7fX07XG4gICAgICAgICAgICBlU3RhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGVhZi5zZXRWaWV3U3RhdGUoey4uLnZpZXdTdGF0ZSwgYWN0aXZlOiB0cnVlLCBwb3BzdGF0ZTogdHJ1ZX0sIGVTdGF0ZSk7XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgY29uc3Qgdmlld1N0YXRlID0gSlNPTi5wYXJzZSh0aGlzLnJhdy5zdGF0ZSB8fCBcInt9XCIpO1xuICAgICAgICByZXR1cm4gKHZpZXdTdGF0ZS50eXBlID09PSBcImVtcHR5XCIpO1xuICAgIH1cblxuICAgIHJlcGxhY2VTdGF0ZShyYXdTdGF0ZTogUHVzaFN0YXRlKSB7XG4gICAgICAgIGlmIChyYXdTdGF0ZS5zdGF0ZSAhPT0gdGhpcy5yYXcuc3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdTdGF0ZSA9IEpTT04ucGFyc2UocmF3U3RhdGUuc3RhdGUgfHwgXCJ7fVwiKTtcbiAgICAgICAgICAgIC8vIERvbid0IHJlcGxhY2UgYSBmaWxlIHdpdGggYW4gZW1wdHkgaW4gdGhlIGhpc3RvcnlcbiAgICAgICAgICAgIGlmICh2aWV3U3RhdGUudHlwZSA9PT0gXCJlbXB0eVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIC8vIEZpbGUgaXMgZGlmZmVyZW50IGZyb20gZXhpc3RpbmcgZmlsZTogc2hvdWxkIGJlIGEgcHVzaCBpbnN0ZWFkXG4gICAgICAgICAgICBpZiAodGhpcy5wYXRoICYmIHRoaXMucGF0aCAhPT0gdmlld1N0YXRlPy5zdGF0ZT8uZmlsZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHZpZXdTdGF0ZS50eXBlID09PSBcIm1lZGlhLXZpZXdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEluZm8gPSBKU09OLnN0cmluZ2lmeSh0aGlzLnZpZXdTdGF0ZS5zdGF0ZS5pbmZvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbmZvID0gSlNPTi5zdHJpbmdpZnkodmlld1N0YXRlLnN0YXRlLmluZm8pO1xuICAgICAgICAgICAgICAgIGlmIChvbGRJbmZvICE9PSBuZXdJbmZvKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShyYXdTdGF0ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIFNlcmlhbGl6YWJsZUhpc3Rvcnkge1xuICAgIHBvczogbnVtYmVyXG4gICAgc3RhY2s6IFB1c2hTdGF0ZVtdXG59XG5cbmV4cG9ydCBjbGFzcyBIaXN0b3J5IHtcbiAgICBzdGF0aWMgY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yTGVhZihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpIHx8IG5ldyB0aGlzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckxlYWYobGVhZjogV29ya3NwYWNlTGVhZikge1xuICAgICAgICBpZiAobGVhZikgZG9tTGVhdmVzLnNldChsZWFmLmNvbnRhaW5lckVsLCBsZWFmKTtcbiAgICAgICAgaWYgKGxlYWYpIHJldHVybiBsZWFmW0hJU1RfQVRUUl0gaW5zdGFuY2VvZiB0aGlzID9cbiAgICAgICAgICAgIGxlYWZbSElTVF9BVFRSXSA6XG4gICAgICAgICAgICBsZWFmW0hJU1RfQVRUUl0gPSBuZXcgdGhpcyhsZWFmLCBsZWFmW0hJU1RfQVRUUl0/LnNlcmlhbGl6ZSgpIHx8IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgcG9zOiBudW1iZXJcbiAgICBzdGFjazogSGlzdG9yeUVudHJ5W11cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsZWFmPzogV29ya3NwYWNlTGVhZiwge3Bvcywgc3RhY2t9OiBTZXJpYWxpemFibGVIaXN0b3J5ID0ge3BvczowLCBzdGFjazpbXX0pIHtcbiAgICAgICAgdGhpcy5sZWFmID0gbGVhZjtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBzdGFjay5tYXAocmF3ID0+IG5ldyBIaXN0b3J5RW50cnkocmF3KSk7XG4gICAgfVxuXG4gICAgY2xvbmVUbyhsZWFmOiBXb3Jrc3BhY2VMZWFmKSB7XG4gICAgICAgIHJldHVybiBsZWFmW0hJU1RfQVRUUl0gPSBuZXcgSGlzdG9yeShsZWFmLCB0aGlzLnNlcmlhbGl6ZSgpKTtcbiAgICB9XG5cbiAgICBvblJlbmFtZShmaWxlOiBUQWJzdHJhY3RGaWxlLCBvbGRQYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yKGNvbnN0IGhpc3RFbnRyeSBvZiB0aGlzLnN0YWNrKSBoaXN0RW50cnkub25SZW5hbWUoZmlsZSwgb2xkUGF0aCk7XG4gICAgfVxuXG4gICAgc2VyaWFsaXplKCk6IFNlcmlhbGl6YWJsZUhpc3RvcnkgeyByZXR1cm4ge3BvczogdGhpcy5wb3MsIHN0YWNrOiB0aGlzLnN0YWNrLm1hcChlID0+IGUucmF3KX07IH1cblxuICAgIGdldCBzdGF0ZSgpIHsgcmV0dXJuIHRoaXMuc3RhY2tbdGhpcy5wb3NdPy5yYXcgfHwgbnVsbDsgfVxuICAgIGdldCBsZW5ndGgoKSB7IHJldHVybiB0aGlzLnN0YWNrLmxlbmd0aDsgfVxuXG4gICAgYmFjaygpICAgIHsgdGhpcy5nbygtMSk7IH1cbiAgICBmb3J3YXJkKCkgeyB0aGlzLmdvKCAxKTsgfVxuXG4gICAgbG9va0FoZWFkKCkgeyByZXR1cm4gdGhpcy5zdGFjay5zbGljZSgwLCB0aGlzLnBvcykucmV2ZXJzZSgpOyB9XG4gICAgbG9va0JlaGluZCgpIHsgcmV0dXJuIHRoaXMuc3RhY2suc2xpY2UodGhpcy5wb3MrMSk7IH1cblxuICAgIGFubm91bmNlKCkge1xuICAgICAgICBhcHA/LndvcmtzcGFjZT8udHJpZ2dlcihcInBhbmUtcmVsaWVmOnVwZGF0ZS1oaXN0b3J5XCIsIHRoaXMubGVhZiwgdGhpcyk7XG4gICAgfVxuXG4gICAgZ290byhwb3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubGVhZikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5sZWFmLnBpbm5lZCkgcmV0dXJuIG5ldyBOb3RpY2UoXCJQaW5uZWQgcGFuZTogdW5waW4gYmVmb3JlIGdvaW5nIGZvcndhcmQgb3IgYmFja1wiKSwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5sZWFmLndvcmtpbmcpIHJldHVybiBuZXcgTm90aWNlKFwiUGFuZSBpcyBidXN5OiBwbGVhc2Ugd2FpdCBiZWZvcmUgbmF2aWdhdGluZyBmdXJ0aGVyXCIpLCB1bmRlZmluZWQ7XG4gICAgICAgIHBvcyA9IHRoaXMucG9zID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocG9zLCB0aGlzLnN0YWNrLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgdGhpcy5zdGFja1twb3NdPy5nbyh0aGlzLmxlYWYpO1xuICAgICAgICB0aGlzLmFubm91bmNlKCk7XG4gICAgfVxuXG4gICAgZ28oYnk6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5sZWFmIHx8ICFieSkgcmV0dXJuOyAgLy8gbm8tb3BcbiAgICAgICAgLy8gcHJldmVudCB3cmFwYXJvdW5kXG4gICAgICAgIGNvbnN0IG5ld1BvcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMucG9zIC0gYnksIHRoaXMuc3RhY2subGVuZ3RoIC0gMSkpO1xuICAgICAgICBpZiAoZm9yY2UgfHwgbmV3UG9zICE9PSB0aGlzLnBvcykge1xuICAgICAgICAgICAgdGhpcy5nb3RvKG5ld1Bvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKGBObyBtb3JlICR7YnkgPCAwID8gXCJiYWNrXCIgOiBcImZvcndhcmRcIn0gaGlzdG9yeSBmb3IgcGFuZWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZVN0YXRlKHJhd1N0YXRlOiBQdXNoU3RhdGUsIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKXtcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLnN0YWNrW3RoaXMucG9zXTtcbiAgICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5zdGFja1t0aGlzLnBvc10gPSBuZXcgSGlzdG9yeUVudHJ5KHJhd1N0YXRlKTtcbiAgICAgICAgfSBlbHNlIGlmICghZW50cnkucmVwbGFjZVN0YXRlKHJhd1N0YXRlKSkge1xuICAgICAgICAgICAgLy8gcmVwbGFjZVN0YXRlIHdhcyBlcnJvbmVvdXNseSBjYWxsZWQgd2l0aCBhIG5ldyBmaWxlIGZvciB0aGUgc2FtZSBsZWFmO1xuICAgICAgICAgICAgLy8gZm9yY2UgYSBwdXNoU3RhdGUgaW5zdGVhZCAoZml4ZXMgdGhlIGlzc3VlIHJlcG9ydGVkIGhlcmU6IGh0dHBzOi8vZm9ydW0ub2JzaWRpYW4ubWQvdC8xODUxOClcbiAgICAgICAgICAgIHRoaXMucHVzaFN0YXRlKHJhd1N0YXRlLCB0aXRsZSwgdXJsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1c2hTdGF0ZShyYXdTdGF0ZTogUHVzaFN0YXRlLCB0aXRsZTogc3RyaW5nLCB1cmw6IHN0cmluZykgICB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJwdXNoaW5nXCIsIHJhd1N0YXRlKVxuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuc3RhY2tbdGhpcy5wb3NdO1xuICAgICAgICBpZiAoZW50cnkgJiYgZW50cnkuaXNFbXB0eSgpKSByZXR1cm4gdGhpcy5yZXBsYWNlU3RhdGUocmF3U3RhdGUsIHRpdGxlLCB1cmwpO1xuICAgICAgICB0aGlzLnN0YWNrLnNwbGljZSgwLCB0aGlzLnBvcywgbmV3IEhpc3RvcnlFbnRyeShyYXdTdGF0ZSkpO1xuICAgICAgICB0aGlzLnBvcyA9IDA7XG4gICAgICAgIC8vIExpbWl0IFwiYmFja1wiIHRvIDIwXG4gICAgICAgIHdoaWxlICh0aGlzLnN0YWNrLmxlbmd0aCA+IDIwKSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgICB0aGlzLmFubm91bmNlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbEhpc3RvcnkocGx1Z2luOiBQYW5lUmVsaWVmKSB7XG5cbiAgICAvLyBNb25rZXlwYXRjaDogaW5jbHVkZSBoaXN0b3J5IGluIGxlYWYgc2VyaWFsaXphdGlvbiAoc28gaXQncyBwZXJzaXN0ZWQgd2l0aCB0aGUgd29ya3NwYWNlKVxuICAgIC8vIGFuZCBjaGVjayBmb3IgcG9wc3RhdGUgZXZlbnRzICh0byBzdXBwcmVzcyB0aGVtKVxuICAgIHBsdWdpbi5yZWdpc3Rlcihhcm91bmQoV29ya3NwYWNlTGVhZi5wcm90b3R5cGUsIHtcbiAgICAgICAgc2VyaWFsaXplKG9sZCkgeyByZXR1cm4gZnVuY3Rpb24gc2VyaWFsaXplKCl7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvbGQuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzW0hJU1RfQVRUUl0pIHJlc3VsdFtTRVJJQUxfUFJPUF0gPSB0aGlzW0hJU1RfQVRUUl0uc2VyaWFsaXplKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9fSxcbiAgICAgICAgc2V0Vmlld1N0YXRlKG9sZCkgeyByZXR1cm4gZnVuY3Rpb24gc2V0Vmlld1N0YXRlKHZzLCBlcyl7XG4gICAgICAgICAgICBpZiAodnMucG9wc3RhdGUgJiYgd2luZG93LmV2ZW50Py50eXBlID09PSBcInBvcHN0YXRlXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2xkLmNhbGwodGhpcywgdnMsIGVzKTtcbiAgICAgICAgfX1cbiAgICB9KSk7XG5cbiAgICBwbHVnaW4ucmVnaXN0ZXIoYXJvdW5kKGFwcC53b3Jrc3BhY2UsIHtcbiAgICAgICAgLy8gTW9ua2V5cGF0Y2g6IGxvYWQgaGlzdG9yeSBkdXJpbmcgbGVhZiBsb2FkLCBpZiBwcmVzZW50XG4gICAgICAgIGRlc2VyaWFsaXplTGF5b3V0KG9sZCkgeyByZXR1cm4gYXN5bmMgZnVuY3Rpb24gZGVzZXJpYWxpemVMYXlvdXQoc3RhdGUsIC4uLmV0YzogYW55W10pe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG9sZC5jYWxsKHRoaXMsIHN0YXRlLCAuLi5ldGMpO1xuICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwibGVhZlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0cnkgbG9hZGluZyB0aGUgcGFuZSBhcyBhbiBlbXB0eVxuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5zdGF0ZS50eXBlID0gJ2VtcHR5JztcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgb2xkLmNhbGwodGhpcywgc3RhdGUsIC4uLmV0Yyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVbU0VSSUFMX1BST1BdKSByZXN1bHRbSElTVF9BVFRSXSA9IG5ldyBIaXN0b3J5KHJlc3VsdCwgc3RhdGVbU0VSSUFMX1BST1BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH19LFxuICAgICAgICAvLyBNb25rZXlwYXRjaDoga2VlcCBPYnNpZGlhbiBmcm9tIHB1c2hpbmcgaGlzdG9yeSBpbiBzZXRBY3RpdmVMZWFmXG4gICAgICAgIHNldEFjdGl2ZUxlYWYob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXRBY3RpdmVMZWFmKGxlYWYsIC4uLmV0Yykge1xuICAgICAgICAgICAgY29uc3QgdW5zdWIgPSBhcm91bmQodGhpcywge1xuICAgICAgICAgICAgICAgIHJlY29yZEhpc3Rvcnkob2xkKSB7IHJldHVybiBmdW5jdGlvbiAobGVhZjogV29ya3NwYWNlTGVhZiwgX3B1c2g6IGJvb2xlYW4sIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFsd2F5cyB1cGRhdGUgc3RhdGUgaW4gcGxhY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5jYWxsKHRoaXMsIGxlYWYsIGZhbHNlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9OyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5jYWxsKHRoaXMsIGxlYWYsIC4uLmV0Yyk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHVuc3ViKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH19LFxuICAgIH0pKTtcblxuICAgIC8vIFByb3h5IHRoZSB3aW5kb3cgaGlzdG9yeSB3aXRoIGEgd3JhcHBlciB0aGF0IGRlbGVnYXRlcyB0byB0aGUgYWN0aXZlIGxlYWYncyBIaXN0b3J5IG9iamVjdCxcbiAgICBjb25zdCByZWFsSGlzdG9yeSA9IHdpbmRvdy5oaXN0b3J5O1xuICAgIHBsdWdpbi5yZWdpc3RlcigoKSA9PiAod2luZG93IGFzIGFueSkuaGlzdG9yeSA9IHJlYWxIaXN0b3J5KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCBcImhpc3RvcnlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlLCB2YWx1ZToge1xuICAgICAgICBnZXQgc3RhdGUoKSAgICAgIHsgcmV0dXJuIEhpc3RvcnkuY3VycmVudCgpLnN0YXRlOyB9LFxuICAgICAgICBnZXQgbGVuZ3RoKCkgICAgIHsgcmV0dXJuIEhpc3RvcnkuY3VycmVudCgpLmxlbmd0aDsgfSxcblxuICAgICAgICBiYWNrKCkgICAgeyBpZiAoIXBsdWdpbi5pc1N5bnRoZXRpY0hpc3RvcnlFdmVudCgzKSkgdGhpcy5nbygtMSk7IH0sXG4gICAgICAgIGZvcndhcmQoKSB7IGlmICghcGx1Z2luLmlzU3ludGhldGljSGlzdG9yeUV2ZW50KDQpKSB0aGlzLmdvKCAxKTsgfSxcbiAgICAgICAgZ28oYnk6IG51bWJlcikgICAgeyBIaXN0b3J5LmN1cnJlbnQoKS5nbyhieSk7IH0sXG5cbiAgICAgICAgcmVwbGFjZVN0YXRlKHN0YXRlOiBQdXNoU3RhdGUsIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKXsgSGlzdG9yeS5jdXJyZW50KCkucmVwbGFjZVN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTsgfSxcbiAgICAgICAgcHVzaFN0YXRlKHN0YXRlOiBQdXNoU3RhdGUsIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKSAgIHsgSGlzdG9yeS5jdXJyZW50KCkucHVzaFN0YXRlKHN0YXRlLCB0aXRsZSwgdXJsKTsgfSxcblxuICAgICAgICBnZXQgc2Nyb2xsUmVzdG9yYXRpb24oKSAgICB7IHJldHVybiByZWFsSGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbjsgfSxcbiAgICAgICAgc2V0IHNjcm9sbFJlc3RvcmF0aW9uKHZhbCkgeyByZWFsSGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9IHZhbDsgfSxcbiAgICB9fSk7XG5cbn1cbiIsImltcG9ydCB7IGFyb3VuZCB9IGZyb20gXCJtb25rZXktYXJvdW5kXCI7XG5pbXBvcnQgeyBDb21wb25lbnQsIGRlYm91bmNlLCBXb3Jrc3BhY2VJdGVtLCBXb3Jrc3BhY2VMZWFmLCBXb3Jrc3BhY2VQYXJlbnQgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlIHtcbiAgICAgICAgZ2V0TW9zdFJlY2VudExlYWYocm9vdDogV29ya3NwYWNlUGFyZW50KTogV29ya3NwYWNlTGVhZlxuICAgICAgICByZXF1ZXN0QWN0aXZlTGVhZkV2ZW50cygpOiB2b2lkXG4gICAgfVxuICAgIGludGVyZmFjZSBXb3Jrc3BhY2VJdGVtIHtcbiAgICAgICAgZ2V0Q29udGFpbmVyPygpOiBXb3Jrc3BhY2VQYXJlbnRcbiAgICB9XG4gICAgaW50ZXJmYWNlIEFwcCB7XG4gICAgICAgIGNvbW1hbmRzOiB7XG4gICAgICAgICAgICBleGVjdXRlQ29tbWFuZEJ5SWQoaWQ6IHN0cmluZywgZXZlbnQ/OiBFdmVudCk6IGJvb2xlYW5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBFZmZpY2llbnRseSB1cGRhdGUgYSBjbGFzcyBvbiBhIHdvcmtzcGFjZSBpdGVtLCBvbmx5IHRvdWNoaW5nIHdoZXJlIGNoYW5nZXMgYXJlIG5lZWRlZFxuICpcbiAqIEBwYXJhbSBpdGVtIFRoZSB3b3Jrc3BhY2UgaXRlbSB0byBhZGQgb3IgcmVtb3ZlIHRoZSBjbGFzcyBmcm9tXG4gKiBAcGFyYW0gY2xzIFRoZSBjbGFzcyB0byBhZGQgb3IgcmVtb3ZlXG4gKiBAcGFyYW0gc3RhdGUgQm9vbGVhbiwgZmxhZyB0byBhZGQgb3IgcmVtb3ZlLCBkZWZhdWx0cyB0byBvcHBvc2l0ZSBvZiBjdXJyZW50IHN0YXRlXG4gKiBAcmV0dXJucyBib29sZWFuIGZvciB0aGUgc3RhdGUgb2YgdGhlIGNsYXNzIGFmdGVyd2FyZHNcbiAqL1xuZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoaXRlbTogV29ya3NwYWNlSXRlbSwgY2xzOiBzdHJpbmcsIHN0YXRlPzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGVsID0gaXRlbS5jb250YWluZXJFbCwgaGFkID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscyk7XG4gICAgc3RhdGUgPSBzdGF0ZSA/PyAhaGFkO1xuICAgIGlmIChzdGF0ZSAhPT0gaGFkKSB7IHN0YXRlID8gZWwuY2xhc3NMaXN0LmFkZChjbHMpIDogZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpOyB9XG4gICAgcmV0dXJuIHN0YXRlO1xufVxuXG5leHBvcnQgY2xhc3MgTWF4aW1pemVyIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIG9ubG9hZCgpIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KGFwcC53b3Jrc3BhY2Uub24oXCJsYXlvdXQtY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGFyZW50IG9mIHRoaXMucGFyZW50cygpKSB0aGlzLnJlZnJlc2gocGFyZW50KTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgIHRoaXMucmVnaXN0ZXIoYXJvdW5kKGFwcC53b3Jrc3BhY2UsIHtcbiAgICAgICAgICAgIHNldEFjdGl2ZUxlYWYob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXRBY3RpdmVMZWFmKGxlYWYsIHB1c2hIaXN0b3J5LCBmb2N1cykge1xuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gZG8gdGhpcyBoZXJlIHNvIHRoYXQgTWFya2Rvd25WaWV3IGNhbiBiZSBmb2N1c2VkIGluIHRoZSBuZXcgcGFuZVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHNlbGYucGFyZW50Rm9yKGxlYWYpLCBvbGRQYXJlbnQgPSBzZWxmLnBhcmVudEZvcihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50ICYmIG9sZFBhcmVudCAmJiBwYXJlbnQgIT09IG9sZFBhcmVudCAmJlxuICAgICAgICAgICAgICAgICAgICBvbGRQYXJlbnQuY29udGFpbmVyRWw/Lm1hdGNoUGFyZW50KFwiLmhvdmVyLXBvcG92ZXIuaXMtYWN0aXZlLnNuYXAtdG8tdmlld3BvcnRcIikgJiZcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNvbnRhaW5lckVsPy5vd25lckRvY3VtZW50ID09PSBvbGRQYXJlbnQuY29udGFpbmVyRWwub3duZXJEb2N1bWVudCAmJlxuICAgICAgICAgICAgICAgICAgICAhcGFyZW50LmNvbnRhaW5lckVsLm1hdGNoUGFyZW50KFwiLmhvdmVyLXBvcG92ZXJcIilcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3dpdGNoaW5nIGZyb20gbWF4aW1pemVkIHBvcG92ZXIgdG8gbm9uLXBvcG92ZXI7IGRlLW1heGltaXplIGl0IGZpcnN0XG4gICAgICAgICAgICAgICAgICAgIGFwcC5jb21tYW5kcy5leGVjdXRlQ29tbWFuZEJ5SWQoXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3I6cmVzdG9yZS1hY3RpdmUtcG9wb3ZlclwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkgc2VsZi5yZWZyZXNoKHBhcmVudCwgcGFyZW50LmNvbnRhaW5lckVsLmhhc0NsYXNzKFwic2hvdWxkLW1heGltaXplXCIpID8gbGVhZiA6IG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvbGQuY2FsbCh0aGlzLCBsZWFmLCBwdXNoSGlzdG9yeSwgZm9jdXMpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICAvLyBVbi1tYXhpbWl6ZSBhbGwgcGFuZXNcbiAgICAgICAgZm9yIChjb25zdCBwYXJlbnQgb2YgdGhpcy5wYXJlbnRzKCkpIHRoaXMucmVmcmVzaChwYXJlbnQsIG51bGwpO1xuICAgIH1cblxuICAgIHRvZ2dsZU1heGltaXplKGxlYWYgPSBhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5wYXJlbnRGb3IobGVhZik7XG4gICAgICAgIGlmICghcGFyZW50KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHBvcG92ZXJFbCA9IHBhcmVudC5jb250YWluZXJFbC5tYXRjaFBhcmVudChcIi5ob3Zlci1wb3BvdmVyXCIpO1xuICAgICAgICBpZiAocG9wb3ZlckVsICYmIGFwcC5wbHVnaW5zLnBsdWdpbnNbXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3JcIl0pIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHNpbmdsZSBsZWFmIGluIGEgcG9wb3ZlclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDsgYXBwLndvcmtzcGFjZS5pdGVyYXRlTGVhdmVzKCgpID0+IHsgY291bnQrKzsgfSwgcGFyZW50KTtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIE1heGltaXplIG9yIHJlc3RvcmUgdGhlIHBvcG92ZXIgaW5zdGVhZCBvZiB0aGUgbGVhZlxuICAgICAgICAgICAgICAgIGFwcC5jb21tYW5kcy5leGVjdXRlQ29tbWFuZEJ5SWQoXG4gICAgICAgICAgICAgICAgICAgIFwib2JzaWRpYW4taG92ZXItZWRpdG9yOlwiICsgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wb3ZlckVsLmhhc0NsYXNzKFwic25hcC10by12aWV3cG9ydFwiKSA/IFwicmVzdG9yZS1hY3RpdmUtcG9wb3ZlclwiIDogXCJzbmFwLWFjdGl2ZS1wb3BvdmVyLXRvLXZpZXdwb3J0XCJcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJlbnQpIHRoaXMucmVmcmVzaChwYXJlbnQsIHRvZ2dsZUNsYXNzKHBhcmVudCwgXCJzaG91bGQtbWF4aW1pemVcIikgPyBsZWFmIDogbnVsbCk7XG4gICAgfVxuXG4gICAgbGFzdE1heGltaXplZChwYXJlbnQ6IFdvcmtzcGFjZVBhcmVudCkge1xuICAgICAgICBsZXQgcmVzdWx0OiBXb3Jrc3BhY2VMZWFmID0gbnVsbDtcbiAgICAgICAgYXBwLndvcmtzcGFjZS5pdGVyYXRlTGVhdmVzKGxlYWYgPT4geyBpZiAobGVhZi5jb250YWluZXJFbC5oYXNDbGFzcyhcImlzLW1heGltaXplZFwiKSkgcmVzdWx0ID0gbGVhZjsgfSwgcGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCB8fCBhcHAud29ya3NwYWNlLmdldE1vc3RSZWNlbnRMZWFmKCk7XG4gICAgfVxuXG4gICAgZml4U2xpZGluZ1BhbmVzID0gZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICBpZiAoKGFwcC5wbHVnaW5zLnBsdWdpbnMgYXMgYW55KVtcInNsaWRpbmctcGFuZXMtb2JzaWRpYW5cIl0pIHtcbiAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub25MYXlvdXRDaGFuZ2UoKTtcbiAgICAgICAgICAgIGFwcC53b3Jrc3BhY2UucmVxdWVzdEFjdGl2ZUxlYWZFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH0sIDUpO1xuXG4gICAgcmVmcmVzaChcbiAgICAgICAgcGFyZW50OiBXb3Jrc3BhY2VQYXJlbnQsXG4gICAgICAgIGxlYWY6IFdvcmtzcGFjZUxlYWYgPVxuICAgICAgICAgICAgcGFyZW50LmNvbnRhaW5lckVsLmhhc0NsYXNzKFwic2hvdWxkLW1heGltaXplXCIpID8gdGhpcy5sYXN0TWF4aW1pemVkKHBhcmVudCkgOiBudWxsXG4gICAgKSB7XG4gICAgICAgIGZ1bmN0aW9uIHdhbGsocGFyZW50OiBXb3Jrc3BhY2VQYXJlbnQpIHtcbiAgICAgICAgICAgIGxldCBoYXZlTWF0Y2ggPSBmYWxzZSwgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFdvcmtzcGFjZUxlYWYpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoaXRlbSwgXCJpcy1tYXhpbWl6ZWRcIiwgIG1hdGNoID0gKGxlYWYgPT09IGl0ZW0pKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiBXb3Jrc3BhY2VQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB3YWxrKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoYXZlTWF0Y2ggfHw9IG1hdGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvZ2dsZUNsYXNzKHBhcmVudCwgXCJoYXMtbWF4aW1pemVkXCIsIGhhdmVNYXRjaCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGFkTWF4ID0gcGFyZW50LmNvbnRhaW5lckVsLmhhc0NsYXNzKFwiaGFzLW1heGltaXplZFwiKTtcbiAgICAgICAgaWYgKCF3YWxrKHBhcmVudCkpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHBhcmVudCwgXCJzaG91bGQtbWF4aW1pemVcIiwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKGhhZE1heCkgdGhpcy5maXhTbGlkaW5nUGFuZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhcmVudHMoKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudHM6IFdvcmtzcGFjZVBhcmVudFtdID0gW2FwcC53b3Jrc3BhY2Uucm9vdFNwbGl0XVxuICAgICAgICBwYXJlbnRzLmNvbmNhdChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuID8/IFtdKTtcbiAgICAgICAgY29uc3QgcG9wb3ZlcnMgPSBhcHAucGx1Z2lucy5wbHVnaW5zW1wib2JzaWRpYW4taG92ZXItZWRpdG9yXCJdPy5hY3RpdmVQb3BvdmVycztcbiAgICAgICAgaWYgKHBvcG92ZXJzKSBmb3IgKGNvbnN0IHBvcG92ZXIgb2YgcG9wb3ZlcnMpIHtcbiAgICAgICAgICAgIGlmIChwb3BvdmVyLnJvb3RTcGxpdCkgcGFyZW50cy5wdXNoKHBvcG92ZXIucm9vdFNwbGl0KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnRzO1xuICAgIH1cblxuICAgIHBhcmVudEZvcihsZWFmOiBXb3Jrc3BhY2VMZWFmKTogV29ya3NwYWNlUGFyZW50IHtcbiAgICAgICAgaWYgKCFsZWFmIHx8IGxlYWYuY29udGFpbmVyRWwubWF0Y2hQYXJlbnQoXCIud29ya3NwYWNlLXRhYnNcIikpIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBsZWFmLmdldENvbnRhaW5lcj8uKCk7XG4gICAgICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLmNvbnRhaW5lckVsLmhhc0NsYXNzKFwibW9kLXJvb3RcIikpIHJldHVybiBjb250YWluZXI7XG4gICAgICAgIGNvbnN0IHBvcG92ZXJFbCA9IGxlYWYuY29udGFpbmVyRWwubWF0Y2hQYXJlbnQoXCIuaG92ZXItcG9wb3ZlclwiKTtcbiAgICAgICAgaWYgKHBvcG92ZXJFbCkge1xuICAgICAgICAgICAgY29uc3QgcG9wb3ZlcnMgPSBhcHAucGx1Z2lucy5wbHVnaW5zW1wib2JzaWRpYW4taG92ZXItZWRpdG9yXCJdPy5hY3RpdmVQb3BvdmVycztcbiAgICAgICAgICAgIGlmIChwb3BvdmVycykgZm9yIChjb25zdCBwb3BvdmVyIG9mIHBvcG92ZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvcG92ZXJFbC5jb250YWlucyhwb3BvdmVyLnJvb3RTcGxpdC5jb250YWluZXJFbCkpIHJldHVybiBwb3BvdmVyLnJvb3RTcGxpdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXBwLndvcmtzcGFjZS5yb290U3BsaXQ7XG4gICAgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgUGx1Z2luLCBWaWV3LCBXb3Jrc3BhY2VMZWFmLCBXb3Jrc3BhY2VQYXJlbnQsIFdvcmtzcGFjZVNwbGl0LCBXb3Jrc3BhY2VXaW5kb3cgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCBiZWxvbmdzIHRvIGEgcGx1Z2luICsgd2luZG93LiBlLmcuOlxuICpcbiAqICAgICBjbGFzcyBUaXRsZVdpZGdldCBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxNeVBsdWdpbj4ge1xuICogICAgICAgICBvbmxvYWQoKSB7XG4gKiAgICAgICAgICAgICAvLyBkbyBzdHVmZiB3aXRoIHRoaXMucGx1Z2luIGFuZCB0aGlzLndpbiAuLi5cbiAqICAgICAgICAgfVxuICogICAgIH1cbiAqXG4gKiAgICAgY2xhc3MgTXlQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICogICAgICAgICB0aXRsZVdpZGdldHMgPSBUaXRsZVdpZGdldC5wZXJXaW5kb3codGhpcyk7XG4gKiAgICAgICAgIC4uLlxuICogICAgIH1cbiAqXG4gKiBUaGlzIHdpbGwgYXV0b21hdGljYWxseSBjcmVhdGUgYSB0aXRsZSB3aWRnZXQgZm9yIGVhY2ggd2luZG93IGFzIGl0J3Mgb3BlbmVkLCBhbmRcbiAqIG9uIHBsdWdpbiBsb2FkLiAgVGhlIHBsdWdpbidzIGAudGl0bGVXaWRnZXRzYCB3aWxsIGFsc28gYmUgYSBXaW5kb3dNYW5hZ2VyIHRoYXQgY2FuXG4gKiBsb29rIHVwIHRoZSB0aXRsZSB3aWRnZXQgZm9yIGEgZ2l2ZW4gd2luZG93LCBsZWFmLCBvciB2aWV3LCBvciByZXR1cm4gYSBsaXN0IG9mXG4gKiBhbGwgb2YgdGhlbS4gIFNlZSBXaW5kb3dNYW5hZ2VyIGZvciB0aGUgZnVsbCBBUEkuXG4gKlxuICogSWYgeW91IHdhbnQgeW91ciBjb21wb25lbnRzIHRvIGJlIGNyZWF0ZWQgb24gZGVtYW5kIGluc3RlYWQgb2YgYXV0b21hdGljYWxseSB3aGVuXG4gKiB3aW5kb3cocykgYXJlIG9wZW5lZCwgeW91IGNhbiBwYXNzIGBmYWxzZWAgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byBgcGVyV2luZG93KClgLlxuICovXG5leHBvcnQgY2xhc3MgUGVyV2luZG93Q29tcG9uZW50PFAgZXh0ZW5kcyBQbHVnaW4+IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGdldCByb290KCk6IFdvcmtzcGFjZVBhcmVudCB7XG4gICAgICAgIHJldHVybiBjb250YWluZXJGb3JXaW5kb3codGhpcy53aW4pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwbHVnaW46IFAsIHB1YmxpYyB3aW46IFdpbmRvdykge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHN0YXRpYyBwZXJXaW5kb3c8VCBleHRlbmRzIFBlcldpbmRvd0NvbXBvbmVudDxQPiwgUCBleHRlbmRzIFBsdWdpbj4oXG4gICAgICAgIHRoaXM6IG5ldyAocGx1Z2luOiBQLCB3aW46IFdpbmRvdykgPT4gVCxcbiAgICAgICAgcGx1Z2luOiBQXG4gICAgKSB7XG4gICAgICAgIHJldHVybiBuZXcgV2luZG93TWFuYWdlcihwbHVnaW4sIHRoaXMpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgcGVyLXdpbmRvdyBjb21wb25lbnRzXG4gKi9cbmV4cG9ydCBjbGFzcyBXaW5kb3dNYW5hZ2VyPFQgZXh0ZW5kcyBQZXJXaW5kb3dDb21wb25lbnQ8UD4sIFAgZXh0ZW5kcyBQbHVnaW4+IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBpbnN0YW5jZXMgPSBuZXcgV2Vha01hcDxXaW5kb3csIFQ+KCk7XG5cbiAgICB3YXRjaGluZzogYm9vbGVhbiA9IGZhbHNlXG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBwbHVnaW46IFAsXG4gICAgICAgIHB1YmxpYyBmYWN0b3J5OiBuZXcgKHBsdWdpbjogUCwgd2luOiBXaW5kb3cpID0+IFQsICAvLyBUaGUgY2xhc3Mgb2YgdGhpbmcgdG8gbWFuYWdlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHBsdWdpbi5hZGRDaGlsZCh0aGlzKTtcbiAgICB9XG5cbiAgICB3YXRjaCgpOiB0aGlzIHtcbiAgICAgICAgLy8gRGVmZXIgd2F0Y2ggdW50aWwgcGx1Z2luIGlzIGxvYWRlZFxuICAgICAgICBpZiAoIXRoaXMuX2xvYWRlZCkgdGhpcy5vbmxvYWQgPSAoKSA9PiB0aGlzLndhdGNoKCk7XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLndhdGNoaW5nKSB7XG4gICAgICAgICAgICBjb25zdCB7d29ya3NwYWNlfSA9IGFwcDtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgICAgIHdvcmtzcGFjZS5vbihcIndpbmRvdy1vcGVuXCIsIChfLCB3aW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoKCkgPT4gc2V0SW1tZWRpYXRlKCgpID0+IHRoaXMuZm9yV2luZG93KHdpbikpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHNldEltbWVkaWF0ZSgoKSA9PiB0aGlzLmZvckFsbCgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZm9yV2luZG93KCk6IFQ7XG4gICAgZm9yV2luZG93KHdpbjogV2luZG93KTogVDtcbiAgICBmb3JXaW5kb3cod2luOiBXaW5kb3csIGNyZWF0ZTogdHJ1ZSk6IFQ7XG4gICAgZm9yV2luZG93KHdpbjogV2luZG93LCBjcmVhdGU6IGJvb2xlYW4pOiBUIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9yV2luZG93KHdpbjogV2luZG93ID0gd2luZG93LmFjdGl2ZVdpbmRvdyA/PyB3aW5kb3csIGNyZWF0ZSA9IHRydWUpOiBUIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgbGV0IGluc3QgPSB0aGlzLmluc3RhbmNlcy5nZXQod2luKTtcbiAgICAgICAgaWYgKCFpbnN0ICYmIGNyZWF0ZSkge1xuICAgICAgICAgICAgaW5zdCA9IG5ldyB0aGlzLmZhY3RvcnkodGhpcy5wbHVnaW4sIHdpbik7XG4gICAgICAgICAgICBpZiAoaW5zdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNldCh3aW4sIGluc3QhKTtcbiAgICAgICAgICAgICAgICBpbnN0LnJlZ2lzdGVyRG9tRXZlbnQod2luLCBcImJlZm9yZXVubG9hZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoaW5zdCEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5kZWxldGUod2luKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENoaWxkKGluc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0IHx8IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBmb3JEb20oZWw6IEhUTUxFbGVtZW50KTogVDtcbiAgICBmb3JEb20oZWw6IEhUTUxFbGVtZW50LCBjcmVhdGU6IHRydWUpOiBUO1xuICAgIGZvckRvbShlbDogSFRNTEVsZW1lbnQsIGNyZWF0ZTogYm9vbGVhbik6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3JEb20oZWw6IEhUTUxFbGVtZW50LCBjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcldpbmRvdyh3aW5kb3dGb3JEb20oZWwpLCBjcmVhdGUpO1xuICAgIH1cblxuICAgIGZvckxlYWYobGVhZjogV29ya3NwYWNlTGVhZik6IFQ7XG4gICAgZm9yTGVhZihsZWFmOiBXb3Jrc3BhY2VMZWFmLCBjcmVhdGU6IHRydWUpOiBUO1xuICAgIGZvckxlYWYobGVhZjogV29ya3NwYWNlTGVhZiwgY3JlYXRlOiBib29sZWFuKTogVCB8IHVuZGVmaW5lZDtcblxuICAgIGZvckxlYWYobGVhZjogV29ya3NwYWNlTGVhZiwgY3JlYXRlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JEb20obGVhZi5jb250YWluZXJFbCwgY3JlYXRlKTtcbiAgICB9XG5cbiAgICBmb3JWaWV3KHZpZXc6IFZpZXcpOiBUO1xuICAgIGZvclZpZXcodmlldzogVmlldywgY3JlYXRlOiB0cnVlKTogVDtcbiAgICBmb3JWaWV3KHZpZXc6IFZpZXcsIGNyZWF0ZTogYm9vbGVhbik6IFQgfCB1bmRlZmluZWQ7XG5cbiAgICBmb3JWaWV3KHZpZXc6IFZpZXcsIGNyZWF0ZSA9IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yTGVhZih2aWV3LmxlYWYsIGNyZWF0ZSk7XG4gICAgfVxuXG4gICAgd2luZG93cygpIHtcbiAgICAgICAgY29uc3Qgd2luZG93czogV2luZG93W10gPSBbd2luZG93XSwge2Zsb2F0aW5nU3BsaXR9ID0gYXBwLndvcmtzcGFjZTtcbiAgICAgICAgaWYgKGZsb2F0aW5nU3BsaXQpIHtcbiAgICAgICAgICAgIGZvcihjb25zdCBzcGxpdCBvZiBmbG9hdGluZ1NwbGl0LmNoaWxkcmVuKSBpZiAoc3BsaXQud2luKSB3aW5kb3dzLnB1c2goc3BsaXQud2luKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2luZG93cztcbiAgICB9XG5cbiAgICBmb3JBbGwoY3JlYXRlID0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy53aW5kb3dzKCkubWFwKHdpbiA9PiB0aGlzLmZvcldpbmRvdyh3aW4sIGNyZWF0ZSkpLmZpbHRlcih0ID0+IHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJvb3RNYW5hZ2VyPFQgZXh0ZW5kcyBQZXJXaW5kb3dDb21wb25lbnQ8UD4sIFAgZXh0ZW5kcyBQbHVnaW4+IGV4dGVuZHMgV2luZG93TWFuYWdlcjxULFA+IHtcbiAgICBpbnN0YW5jZXM6IFdlYWtNYXA8V2luZG93fFdvcmtzcGFjZVBhcmVudCwgVD47XG5cbiAgICBmb3JEb20oZWw6IEhUTUxFbGVtZW50LCBjcmVhdGUgPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBvcG92ZXJFbCA9IGVsLm1hdGNoUGFyZW50KFwiLmhvdmVyLXBvcG92ZXJcIik7XG4gICAgICAgIGlmICghcG9wb3ZlckVsKSByZXR1cm4gdGhpcy5mb3JXaW5kb3cod2luZG93Rm9yRG9tKGVsKSwgY3JlYXRlKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dGb3JEb20oZWw6IE5vZGUpIHtcbiAgICByZXR1cm4gKGVsLm93bmVyRG9jdW1lbnQgfHwgPERvY3VtZW50PmVsKS5kZWZhdWx0VmlldyE7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5lckZvcldpbmRvdyh3aW46IFdpbmRvdyk6IFdvcmtzcGFjZVBhcmVudCB7XG4gICAgaWYgKHdpbiA9PT0gd2luZG93KSByZXR1cm4gYXBwLndvcmtzcGFjZS5yb290U3BsaXQ7XG4gICAgY29uc3Qge2Zsb2F0aW5nU3BsaXR9ID0gYXBwLndvcmtzcGFjZTtcbiAgICBpZiAoZmxvYXRpbmdTcGxpdCkge1xuICAgICAgICBmb3IoY29uc3Qgc3BsaXQgb2YgZmxvYXRpbmdTcGxpdC5jaGlsZHJlbikgaWYgKHdpbiA9PT0gc3BsaXQud2luKSByZXR1cm4gc3BsaXQ7XG4gICAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgLy8gQmFja3dhcmQgY29tcGF0aWJpbGl0eSBmb3Igc2luZ2xlLXdpbmRvdyBPYnNpZGlhbiAoPDAuMTUpXG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIGFjdGl2ZVdpbmRvdz86IFdpbmRvd1xuICAgIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlIHtcbiAgICAgICAgZmxvYXRpbmdTcGxpdD86IHsgY2hpbGRyZW46IFdvcmtzcGFjZVdpbmRvd1tdIH07XG4gICAgICAgIG9wZW5Qb3BvdXQ/KCk6IFdvcmtzcGFjZVNwbGl0O1xuICAgICAgICBvcGVuUG9wb3V0TGVhZj8oKTogV29ya3NwYWNlTGVhZjtcbiAgICAgICAgb24obmFtZTogJ3dpbmRvdy1vcGVuJywgY2FsbGJhY2s6ICh3aW46IFdvcmtzcGFjZVdpbmRvdywgd2luZG93OiBXaW5kb3cpID0+IGFueSwgY3R4PzogYW55KTogRXZlbnRSZWY7XG4gICAgfVxuICAgIGludGVyZmFjZSBXb3Jrc3BhY2VXaW5kb3cgZXh0ZW5kcyBXb3Jrc3BhY2VQYXJlbnQge1xuICAgICAgICB3aW46IFdpbmRvd1xuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIGNvbnRhaW5lckVsOiBIVE1MRGl2RWxlbWVudDtcbiAgICB9XG4gICAgaW50ZXJmYWNlIENvbXBvbmVudCB7XG4gICAgICAgIF9sb2FkZWQ6IGJvb2xlYW5cbiAgICB9XG59XG4iLCJpbXBvcnQge01lbnUsIEtleW1hcCwgQ29tcG9uZW50LCBXb3Jrc3BhY2VMZWFmLCBURmlsZSwgTWVudUl0ZW19IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7ZG9tTGVhdmVzLCBIaXN0b3J5LCBIaXN0b3J5RW50cnl9IGZyb20gXCIuL0hpc3RvcnlcIjtcbmltcG9ydCBQYW5lUmVsaWVmIGZyb20gJy4vcGFuZS1yZWxpZWYnO1xuaW1wb3J0IHtQZXJXaW5kb3dDb21wb25lbnR9IGZyb20gJy4vUGVyV2luZG93Q29tcG9uZW50JztcblxuZGVjbGFyZSBtb2R1bGUgXCJvYnNpZGlhblwiIHtcbiAgICBpbnRlcmZhY2UgTWVudSB7XG4gICAgICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICB9XG4gICAgaW50ZXJmYWNlIE1lbnVJdGVtIHtcbiAgICAgICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgQXBwIHtcbiAgICAgICAgZHJhZ01hbmFnZXI6IERyYWdNYW5hZ2VyXG4gICAgfVxuICAgIGludGVyZmFjZSBEcmFnTWFuYWdlciB7XG4gICAgICAgIGRyYWdGaWxlKGV2ZW50OiBEcmFnRXZlbnQsIGZpbGU6IFRGaWxlKTogRHJhZ0RhdGFcbiAgICAgICAgb25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCwgZHJhZ0RhdGE6IERyYWdEYXRhKTogdm9pZFxuICAgIH1cbiAgICBpbnRlcmZhY2UgRHJhZ0RhdGEge31cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIGFjdGl2ZVRpbWU6IG51bWJlclxuICAgIH1cbn1cblxuaW50ZXJmYWNlIEZpbGVJbmZvIHtcbiAgICBpY29uOiBzdHJpbmdcbiAgICB0aXRsZTogc3RyaW5nXG4gICAgZmlsZTogVEZpbGVcbiAgICB0eXBlOiBzdHJpbmdcbiAgICBzdGF0ZTogYW55XG4gICAgZVN0YXRlOiBhbnlcbn1cblxuXG5jb25zdCB2aWV3dHlwZUljb25zOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIG1hcmtkb3duOiBcImRvY3VtZW50XCIsXG4gICAgaW1hZ2U6IFwiaW1hZ2UtZmlsZVwiLFxuICAgIGF1ZGlvOiBcImF1ZGlvLWZpbGVcIixcbiAgICB2aWRlbzogXCJhdWRpby1maWxlXCIsXG4gICAgcGRmOiBcInBkZi1maWxlXCIsXG4gICAgbG9jYWxncmFwaDogXCJkb3QtbmV0d29ya1wiLFxuICAgIG91dGxpbmU6IFwiYnVsbGV0LWxpc3RcIixcbiAgICBiYWNrbGluazogXCJsaW5rXCIsXG5cbiAgICAvLyB0aGlyZC1wYXJ0eSBwbHVnaW5zXG4gICAga2FuYmFuOiBcImJsb2Nrc1wiLFxuICAgIGV4Y2FsaWRyYXc6IFwiZXhjYWxpZHJhdy1pY29uXCIsXG4gICAgXCJtZWRpYS12aWV3XCI6IFwiYXVkaW8tZmlsZVwiLFxufVxuXG5jb25zdCBub25GaWxlVmlld3M6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHtcbiAgICBncmFwaDogW1wiZG90LW5ldHdvcmtcIiwgXCJHcmFwaCBWaWV3XCJdLFxuICAgIFwiZmlsZS1leHBsb3JlclwiOiBbXCJmb2xkZXJcIiwgXCJGaWxlIEV4cGxvcmVyXCJdLFxuICAgIHN0YXJyZWQ6IFtcInN0YXJcIiwgXCJTdGFycmVkIEZpbGVzXCJdLFxuICAgIHRhZzogW1widGFnXCIsIFwiVGFncyBWaWV3XCJdLFxuXG4gICAgLy8gdGhpcmQtcGFydHkgcGx1Z2luc1xuICAgIFwicmVjZW50LWZpbGVzXCI6IFtcImNsb2NrXCIsIFwiUmVjZW50IEZpbGVzXCJdLFxuICAgIGNhbGVuZGFyOiBbXCJjYWxlbmRhci13aXRoLWNoZWNrbWFya1wiLCBcIkNhbGVuZGFyXCJdLFxuICAgIGVtcHR5OiBbXCJjcm9zc1wiLCBcIk5vIGZpbGVcIl1cbn1cblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb24gZXh0ZW5kcyBQZXJXaW5kb3dDb21wb25lbnQ8UGFuZVJlbGllZj4ge1xuICAgIGJhY2s6IE5hdmlnYXRvclxuICAgIGZvcndhcmQ6IE5hdmlnYXRvclxuICAgIC8vIFNldCB0byB0cnVlIHdoaWxlIGVpdGhlciBtZW51IGlzIG9wZW4sIHNvIHdlIGRvbid0IHN3aXRjaCBpdCBvdXRcbiAgICBoaXN0b3J5SXNPcGVuID0gZmFsc2U7XG5cbiAgICBkaXNwbGF5KGxlYWYgPSB0aGlzLmxhdGVzdExlYWYoKSkge1xuICAgICAgICBpZiAodGhpcy5oaXN0b3J5SXNPcGVuKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5fbG9hZGVkKSB7IHRoaXMubG9hZCgpOyByZXR1cm47IH1cbiAgICAgICAgdGhpcy53aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhpc3RvcnkgPSBsZWFmID8gSGlzdG9yeS5mb3JMZWFmKGxlYWYpIDogbmV3IEhpc3RvcnkoKTtcbiAgICAgICAgICAgIHRoaXMuYmFjay5zZXRIaXN0b3J5KGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgICAgICBpZiAobGVhZikgdGhpcy51cGRhdGVMZWFmKGxlYWYsIGhpc3RvcnkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxlYXZlcygpIHtcbiAgICAgICAgY29uc3QgbGVhdmVzOiBXb3Jrc3BhY2VMZWFmW10gPSBbXTtcbiAgICAgICAgY29uc3QgY2IgPSAobGVhZjogV29ya3NwYWNlTGVhZikgPT4geyBsZWF2ZXMucHVzaChsZWFmKTsgfTtcbiAgICAgICAgYXBwLndvcmtzcGFjZS5pdGVyYXRlTGVhdmVzKGNiLCB0aGlzLnJvb3QpO1xuXG4gICAgICAgIC8vIFN1cHBvcnQgSG92ZXIgRWRpdG9yc1xuICAgICAgICBjb25zdCBwb3BvdmVycyA9IGFwcC5wbHVnaW5zLnBsdWdpbnNbXCJvYnNpZGlhbi1ob3Zlci1lZGl0b3JcIl0/LmFjdGl2ZVBvcG92ZXJzO1xuICAgICAgICBpZiAocG9wb3ZlcnMpIGZvciAoY29uc3QgcG9wb3ZlciBvZiBwb3BvdmVycykge1xuICAgICAgICAgICAgaWYgKHBvcG92ZXIuaG92ZXJFbC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3ICE9PSB0aGlzLndpbikgY29udGludWU7IC8vIG11c3QgYmUgaW4gc2FtZSB3aW5kb3dcbiAgICAgICAgICAgIGVsc2UgaWYgKHBvcG92ZXIucm9vdFNwbGl0KSBhcHAud29ya3NwYWNlLml0ZXJhdGVMZWF2ZXMoY2IsIHBvcG92ZXIucm9vdFNwbGl0KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHBvcG92ZXIubGVhZikgY2IocG9wb3Zlci5sZWFmKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGVhdmVzO1xuICAgIH1cblxuICAgIGxhdGVzdExlYWYoKSB7XG4gICAgICAgIGxldCBsZWFmID0gYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAobGVhZiAmJiB0aGlzLnBsdWdpbi5uYXYuZm9yTGVhZihsZWFmKSA9PT0gdGhpcykgcmV0dXJuIGxlYWY7XG4gICAgICAgIHJldHVybiB0aGlzLmxlYXZlcygpLnJlZHVjZSgoYmVzdCwgbGVhZik9PnsgcmV0dXJuICghYmVzdCB8fCBiZXN0LmFjdGl2ZVRpbWUgPCBsZWFmLmFjdGl2ZVRpbWUpID8gbGVhZiA6IGJlc3Q7IH0sIG51bGwpO1xuICAgIH1cblxuICAgIG9ubG9hZCgpIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBtb3VzZSBoaXN0b3J5IGJlaGF2aW9yLiAgV2UgbmVlZCB0aGlzIGJlY2F1c2UgMSkgRWxlY3Ryb24gd2lsbCB1c2UgdGhlIGJ1aWx0LWluXG4gICAgICAgIC8vIGhpc3Rvcnkgb2JqZWN0IGlmIHdlIGRvbid0IChpbnN0ZWFkIG9mIG91ciB3cmFwcGVyKSwgYW5kIDIpIHdlIHdhbnQgdGhlIGNsaWNrIHRvIGFwcGx5IHRvIHRoZSBsZWFmXG4gICAgICAgIC8vIHRoYXQgd2FzIHVuZGVyIHRoZSBtb3VzZSwgcmF0aGVyIHRoYW4gd2hpY2hldmVyIGxlYWYgd2FzIGFjdGl2ZS5cbiAgICAgICAgY29uc3Qge2RvY3VtZW50fSA9IHRoaXMud2luO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoaXN0b3J5SGFuZGxlciwgdHJ1ZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGlzdG9yeUhhbmRsZXIsIHRydWUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpc3RvcnlIYW5kbGVyLCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGlzdG9yeUhhbmRsZXIsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gaGlzdG9yeUhhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgICAgICAgICAgaWYgKGUuYnV0dG9uICE9PSAzICYmIGUuYnV0dG9uICE9PSA0KSByZXR1cm47XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IGUuc3RvcFByb3BhZ2F0aW9uKCk7ICAvLyBwcmV2ZW50IGRlZmF1bHQgYmVoYXZpb3JcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkubWF0Y2hQYXJlbnQoXCIud29ya3NwYWNlLWxlYWZcIik7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIGUudHlwZSA9PT0gXCJtb3VzZXVwXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVhZiA9IGRvbUxlYXZlcy5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoIWxlYWYpIGFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhsID0+IGxlYWYgPSAobC5jb250YWluZXJFbCA9PT0gdGFyZ2V0KSA/IGwgOiBsZWFmKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxlYWYpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gMykgeyBIaXN0b3J5LmZvckxlYWYobGVhZikuYmFjaygpOyB9XG4gICAgICAgICAgICAgICAgaWYgKGUuYnV0dG9uID09IDQpIHsgSGlzdG9yeS5mb3JMZWFmKGxlYWYpLmZvcndhcmQoKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrICAgID0gbmV3IE5hdmlnYXRvcih0aGlzLCBcImJhY2tcIiwgLTEpKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5mb3J3YXJkID0gbmV3IE5hdmlnYXRvcih0aGlzLCBcImZvcndhcmRcIiwgMSkpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgICB0aGlzLm51bWJlclBhbmVzKCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoYXBwLndvcmtzcGFjZS5vbihcImxheW91dC1jaGFuZ2VcIiwgdGhpcy5udW1iZXJQYW5lcywgdGhpcykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgdGhpcy51bk51bWJlclBhbmVzKCk7XG4gICAgICAgIHRoaXMud2luLmRvY3VtZW50LmJvZHkuZmluZEFsbChcIi53b3Jrc3BhY2UtbGVhZlwiKS5mb3JFYWNoKGxlYWZFbCA9PiB7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIENQSEFUQiBidXR0b24gbGFiZWxzXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gbGVhZkVsLmZpbmQoXCIudmlldy1oZWFkZXIgPiAudmlldy1hY3Rpb25zXCIpO1xuICAgICAgICAgICAgY29uc3QgZndkID0gYWN0aW9ucz8uZmluZCgnLnZpZXctYWN0aW9uW2NsYXNzKj1cIiBhcHA6Z28tZm9yd2FyZFwiXScpO1xuICAgICAgICAgICAgY29uc3QgYmFjayA9IGFjdGlvbnM/LmZpbmQoJy52aWV3LWFjdGlvbltjbGFzcyo9XCIgYXBwOmdvLWJhY2tcIl0nKTtcbiAgICAgICAgICAgIGlmIChmd2QpICBzZXRUb29sdGlwKGZ3ZCwgdGhpcy5mb3J3YXJkLm9sZExhYmVsKTtcbiAgICAgICAgICAgIGlmIChiYWNrKSBzZXRUb29sdGlwKGZ3ZCwgdGhpcy5iYWNrLm9sZExhYmVsKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1bk51bWJlclBhbmVzKHNlbGVjdG9yID0gXCIud29ya3NwYWNlLWxlYWZcIikge1xuICAgICAgICB0aGlzLndpbi5kb2N1bWVudC5ib2R5LmZpbmRBbGwoc2VsZWN0b3IpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWxhYmVsXCIpO1xuICAgICAgICAgICAgZWwudG9nZ2xlQ2xhc3MoXCJoYXMtcGFuZS1yZWxpZWYtbGFiZWxcIiwgZmFsc2UpO1xuICAgICAgICAgICAgZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWZvcndhcmQtY291bnRcIik7XG4gICAgICAgICAgICBlbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtYmFja3dhcmQtY291bnRcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZUxlYWYobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSA9IEhpc3RvcnkuZm9yTGVhZihsZWFmKSkge1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1mb3J3YXJkLWNvdW50XCIsICdcIicrKGhpc3RvcnkubG9va0FoZWFkKCkubGVuZ3RoIHx8IFwiXCIpKydcIicpO1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1iYWNrd2FyZC1jb3VudFwiLCAnXCInKyhoaXN0b3J5Lmxvb2tCZWhpbmQoKS5sZW5ndGggfHwgXCJcIikrJ1wiJyk7XG5cbiAgICAgICAgLy8gQWRkIGxhYmVscyBmb3IgQ1BIQVRCIG5hdiBidXR0b25zXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBsZWFmLmNvbnRhaW5lckVsLmZpbmQoXCIudmlldy1oZWFkZXIgPiAudmlldy1hY3Rpb25zXCIpO1xuICAgICAgICBjb25zdCBmd2QgPSBhY3Rpb25zPy5maW5kKCcudmlldy1hY3Rpb25bY2xhc3MqPVwiIGFwcDpnby1mb3J3YXJkXCJdJyk7XG4gICAgICAgIGNvbnN0IGJhY2sgPSBhY3Rpb25zPy5maW5kKCcudmlldy1hY3Rpb25bY2xhc3MqPVwiIGFwcDpnby1iYWNrXCJdJyk7XG4gICAgICAgIGlmIChmd2QpIHRoaXMuZm9yd2FyZC51cGRhdGVEaXNwbGF5KGhpc3RvcnksIGZ3ZCk7XG4gICAgICAgIGlmIChiYWNrKSB0aGlzLmJhY2sudXBkYXRlRGlzcGxheShoaXN0b3J5LCBiYWNrKTtcbiAgICB9XG5cbiAgICBudW1iZXJQYW5lcygpIHtcbiAgICAgICAgdGhpcy53aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHVubnVtYmVyIHNpZGViYXIgcGFuZXMgaW4gbWFpbiB3aW5kb3csIGlmIHNvbWV0aGluZyB3YXMgbW92ZWQgdGhlcmVcbiAgICAgICAgICAgIGlmICh0aGlzLndpbiA9PT0gd2luZG93KSB0aGlzLnVuTnVtYmVyUGFuZXMoXCIud29ya3NwYWNlLXRhYnMgPiAud29ya3NwYWNlLWxlYWZcIik7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwLCBsYXN0TGVhZjogV29ya3NwYWNlTGVhZiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmxlYXZlcygpLmZvckVhY2gobGVhZiA9PiB7XG4gICAgICAgICAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtbGFiZWxcIiwgKytjb3VudCA8IDkgPyBcIlwiK2NvdW50IDogXCJcIik7XG4gICAgICAgICAgICAgICAgbGVhZi5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcImhhcy1wYW5lLXJlbGllZi1sYWJlbFwiLCBjb3VudDw5KTtcbiAgICAgICAgICAgICAgICBsYXN0TGVhZiA9IGxlYWY7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMZWFmKGxlYWYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY291bnQ+OCkge1xuICAgICAgICAgICAgICAgIGxhc3RMZWFmPy5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtbGFiZWxcIiwgXCI5XCIpO1xuICAgICAgICAgICAgICAgIGxhc3RMZWFmPy5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcImhhcy1wYW5lLXJlbGllZi1sYWJlbFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvblVwZGF0ZUhpc3RvcnkobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSkge1xuICAgICAgICB0aGlzLndpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVMZWFmKGxlYWYpOyAvLyB1cGRhdGUgbGVhZidzIHN0YXRzIGFuZCBidXR0b25zXG4gICAgICAgICAgICAvLyB1cGRhdGUgd2luZG93J3MgbmF2IGFycm93c1xuICAgICAgICAgICAgaWYgKGhpc3RvcnkgPT09IHRoaXMuZm9yd2FyZC5oaXN0b3J5KSB0aGlzLmZvcndhcmQuc2V0SGlzdG9yeShoaXN0b3J5KTtcbiAgICAgICAgICAgIGlmIChoaXN0b3J5ID09PSB0aGlzLmJhY2suaGlzdG9yeSkgICAgdGhpcy5iYWNrLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgaG92ZXJTb3VyY2UgPSBcInBhbmUtcmVsaWVmOmhpc3RvcnktbWVudVwiO1xuXG4gICAgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50XG4gICAgY291bnQ6IEhUTUxTcGFuRWxlbWVudFxuICAgIGhpc3Rvcnk6IEhpc3RvcnkgPSBudWxsO1xuICAgIG9sZExhYmVsOiBzdHJpbmdcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogTmF2aWdhdGlvbiwgcHVibGljIGtpbmQ6ICdmb3J3YXJkJ3wnYmFjaycsIHB1YmxpYyBkaXI6IG51bWJlcikgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBvbmxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwgPSB0aGlzLm93bmVyLndpbi5kb2N1bWVudC5ib2R5LmZpbmQoXG4gICAgICAgICAgICBgLnRpdGxlYmFyIC50aXRsZWJhci1idXR0b24tY29udGFpbmVyLm1vZC1sZWZ0IC50aXRsZWJhci1idXR0b24ubW9kLSR7dGhpcy5raW5kfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlU3Bhbih7cHJlcGVuZDogdGhpcy5raW5kID09PSBcImJhY2tcIiwgY2xzOiBcImhpc3RvcnktY291bnRlclwifSk7XG4gICAgICAgIHRoaXMuaGlzdG9yeSA9IG51bGw7XG4gICAgICAgIHRoaXMub2xkTGFiZWwgPSB0aGlzLmNvbnRhaW5lckVsLmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJEb21FdmVudCh0aGlzLmNvbnRhaW5lckVsLCBcImNvbnRleHRtZW51XCIsIHRoaXMub3Blbk1lbnUuYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbnN0IG9uQ2xpY2sgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgT2JzaWRpYW4gdG8gc3dpdGNoIHdpbmRvdyBvciBmb3J3YXJkIHRoZSBldmVudFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgLy8gRG8gdGhlIG5hdmlnYXRpb25cbiAgICAgICAgICAgIHRoaXMuaGlzdG9yeT8uW3RoaXMua2luZF0oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlZ2lzdGVyKCgpID0+IHRoaXMuY29udGFpbmVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xpY2ssIHRydWUpKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25DbGljaywgdHJ1ZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXIoXG4gICAgICAgICAgICAvLyBTdXBwb3J0IFwiQ3VzdG9taXphYmxlIFBhZ2UgSGVhZGVyIGFuZCBUaXRsZSBCYXJcIiBidXR0b25zXG4gICAgICAgICAgICBvbkVsZW1lbnQoXG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci53aW4uZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAgICAgICBcImNvbnRleHRtZW51XCIsXG4gICAgICAgICAgICAgICAgYC52aWV3LWhlYWRlciA+IC52aWV3LWFjdGlvbnMgPiAudmlldy1hY3Rpb25bY2xhc3MqPVwiYXBwOmdvLSR7dGhpcy5raW5kfVwiXWAsXG4gICAgICAgICAgICAgICAgKGV2dCwgdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGFyZ2V0Lm1hdGNoUGFyZW50KFwiLndvcmtzcGFjZS1sZWFmXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZWFmID0gdGhpcy5vd25lci5sZWF2ZXMoKS5maWx0ZXIobGVhZiA9PiBsZWFmLmNvbnRhaW5lckVsID09PSBlbCkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbGVhZikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5NZW51KGV2dCwgSGlzdG9yeS5mb3JMZWFmKGxlYWYpKTtcbiAgICAgICAgICAgICAgICB9LCB7Y2FwdHVyZTogdHJ1ZX1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgc2V0VG9vbHRpcCh0aGlzLmNvbnRhaW5lckVsLCB0aGlzLm9sZExhYmVsKTtcbiAgICAgICAgdGhpcy5jb3VudC5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcIm1vZC1hY3RpdmVcIiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHNldENvdW50KG51bTogbnVtYmVyKSB7IHRoaXMuY291bnQudGV4dENvbnRlbnQgPSBcIlwiICsgKG51bSB8fCBcIlwiKTsgfVxuXG4gICAgc2V0SGlzdG9yeShoaXN0b3J5ID0gSGlzdG9yeS5jdXJyZW50KCkpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KHRoaXMuaGlzdG9yeSA9IGhpc3RvcnkpO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoaGlzdG9yeTogSGlzdG9yeSwgZWwgPSB0aGlzLmNvbnRhaW5lckVsKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlcyA9IGhpc3RvcnlbdGhpcy5kaXIgPCAwID8gXCJsb29rQmVoaW5kXCIgOiBcImxvb2tBaGVhZFwiXSgpO1xuICAgICAgICBpZiAoZWw9PT10aGlzLmNvbnRhaW5lckVsKSB0aGlzLnNldENvdW50KHN0YXRlcy5sZW5ndGgpO1xuICAgICAgICBzZXRUb29sdGlwKGVsLCBzdGF0ZXMubGVuZ3RoID9cbiAgICAgICAgICAgIHRoaXMub2xkTGFiZWwgKyBcIlxcblwiICsgdGhpcy5mb3JtYXRTdGF0ZShzdGF0ZXNbMF0pLnRpdGxlIDpcbiAgICAgICAgICAgIGBObyAke3RoaXMua2luZH0gaGlzdG9yeWBcbiAgICAgICAgKTtcbiAgICAgICAgZWwudG9nZ2xlQ2xhc3MoXCJtb2QtYWN0aXZlXCIsIHN0YXRlcy5sZW5ndGggPiAwKTtcbiAgICB9XG5cbiAgICBvcGVuTWVudShldnQ6IHtjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlcn0sIGhpc3RvcnkgPSB0aGlzLmhpc3RvcnkpIHtcbiAgICAgICAgY29uc3Qgc3RhdGVzID0gaGlzdG9yeVt0aGlzLmRpciA8IDAgPyBcImxvb2tCZWhpbmRcIiA6IFwibG9va0FoZWFkXCJdKCk7XG4gICAgICAgIGlmICghc3RhdGVzLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoKTtcbiAgICAgICAgbWVudS5kb20uYWRkQ2xhc3MoXCJwYW5lLXJlbGllZi1oaXN0b3J5LW1lbnVcIik7XG4gICAgICAgIG1lbnUuZG9tLm9uKFwibW91c2Vkb3duXCIsIFwiLm1lbnUtaXRlbVwiLCBlID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO30sIHRydWUpO1xuICAgICAgICBzdGF0ZXMubWFwKHRoaXMuZm9ybWF0U3RhdGUuYmluZCh0aGlzKSkuZm9yRWFjaChcbiAgICAgICAgICAgIChpbmZvOiBGaWxlSW5mbywgaWR4KSA9PiB0aGlzLm1lbnVJdGVtKGluZm8sIGlkeCwgbWVudSwgaGlzdG9yeSlcbiAgICAgICAgKTtcbiAgICAgICAgbWVudS5zaG93QXRQb3NpdGlvbih7eDogZXZ0LmNsaWVudFgsIHk6IGV2dC5jbGllbnRZICsgMjB9KTtcbiAgICAgICAgdGhpcy5vd25lci5oaXN0b3J5SXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgbWVudS5vbkhpZGUoKCkgPT4geyB0aGlzLm93bmVyLmhpc3RvcnlJc09wZW4gPSBmYWxzZTsgdGhpcy5vd25lci5kaXNwbGF5KCk7IH0pO1xuICAgIH1cblxuICAgIG1lbnVJdGVtKGluZm86IEZpbGVJbmZvLCBpZHg6IG51bWJlciwgbWVudTogTWVudSwgaGlzdG9yeTogSGlzdG9yeSkge1xuICAgICAgICBjb25zdCB7ZGlyLCBraW5kfSA9IHRoaXM7XG4gICAgICAgIG1lbnUuYWRkSXRlbShpID0+IHsgY3JlYXRlSXRlbShpKTsgaWYgKGluZm8uZmlsZSkgc2V0dXBGaWxlRXZlbnRzKGkuZG9tKTsgfSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVJdGVtKGk6IE1lbnVJdGVtLCBwcmVmaXg9XCJcIikge1xuICAgICAgICAgICAgaS5zZXRJY29uKGluZm8uaWNvbikuc2V0VGl0bGUocHJlZml4ICsgaW5mby50aXRsZSkub25DbGljayhlID0+IHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgY3RybC9jbWQvbWlkZGxlIGJ1dHRvbiBhbmQgc3BsaXQgbGVhZiArIGNvcHkgaGlzdG9yeVxuICAgICAgICAgICAgICAgIGlmIChLZXltYXAuaXNNb2RpZmllcihlLCBcIk1vZFwiKSB8fCAxID09PSAoZSBhcyBNb3VzZUV2ZW50KS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeSA9IGhpc3RvcnkuY2xvbmVUbyhhcHAud29ya3NwYWNlLnNwbGl0QWN0aXZlTGVhZigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5nbygoaWR4KzEpICogZGlyLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBGaWxlRXZlbnRzKGRvbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEhvdmVyIHByZXZpZXdcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoJ2hvdmVyLWxpbmsnLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBlLCBzb3VyY2U6IE5hdmlnYXRvci5ob3ZlclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJQYXJlbnQ6IG1lbnUuZG9tLCB0YXJnZXRFbDogZG9tLCBsaW5rdGV4dDogaW5mby5maWxlLnBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBEcmFnIG1lbnUgaXRlbSB0byBtb3ZlIG9yIGxpbmsgZmlsZVxuICAgICAgICAgICAgZG9tLnNldEF0dHIoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHJhZ01hbmFnZXIgPSBhcHAuZHJhZ01hbmFnZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZHJhZ0RhdGEgPSBkcmFnTWFuYWdlci5kcmFnRmlsZShlLCBpbmZvLmZpbGUpO1xuICAgICAgICAgICAgICAgIGRyYWdNYW5hZ2VyLm9uRHJhZ1N0YXJ0KGUsIGRyYWdEYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBlID0+IG1lbnUuaGlkZSgpKTtcblxuICAgICAgICAgICAgLy8gRmlsZSBtZW51XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnUgPSBuZXcgTWVudSgpO1xuICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbShpID0+IGNyZWF0ZUl0ZW0oaSwgYEdvICR7a2luZH0gdG8gYCkpLmFkZFNlcGFyYXRvcigpO1xuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2UudHJpZ2dlcihcbiAgICAgICAgICAgICAgICAgICAgXCJmaWxlLW1lbnVcIiwgbWVudSwgaW5mby5maWxlLCBcImxpbmstY29udGV4dC1tZW51XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIG1lbnUuc2hvd0F0UG9zaXRpb24oe3g6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZfSk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTsgLy8ga2VlcCB0aGUgcGFyZW50IG1lbnUgb3BlbiBmb3Igbm93XG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcm1hdFN0YXRlKGVudHJ5OiBIaXN0b3J5RW50cnkpOiBGaWxlSW5mbyB7XG4gICAgICAgIGNvbnN0IHt2aWV3U3RhdGU6IHt0eXBlLCBzdGF0ZX0sIGVTdGF0ZSwgcGF0aH0gPSBlbnRyeTtcbiAgICAgICAgY29uc3QgZmlsZSA9IHBhdGggJiYgYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKSBhcyBURmlsZTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtpY29uOiBcIlwiLCB0aXRsZTogXCJcIiwgZmlsZSwgdHlwZSwgc3RhdGUsIGVTdGF0ZX07XG5cbiAgICAgICAgaWYgKG5vbkZpbGVWaWV3c1t0eXBlXSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBub25GaWxlVmlld3NbdHlwZV07XG4gICAgICAgIH0gZWxzZSBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBbXCJ0cmFzaFwiLCBcIk1pc3NpbmcgZmlsZSBcIitwYXRoXTtcbiAgICAgICAgfSBlbHNlIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIGluZm8uaWNvbiA9IHZpZXd0eXBlSWNvbnNbdHlwZV0gPz8gXCJkb2N1bWVudFwiO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwibWFya2Rvd25cIiAmJiBzdGF0ZS5tb2RlID09PSBcInByZXZpZXdcIikgaW5mby5pY29uID0gXCJsaW5lcy1vZi10ZXh0XCI7XG4gICAgICAgICAgICBpbmZvLnRpdGxlID0gZmlsZSA/IGZpbGUuYmFzZW5hbWUgKyAoZmlsZS5leHRlbnNpb24gIT09IFwibWRcIiA/IFwiLlwiK2ZpbGUuZXh0ZW5zaW9uIDogXCJcIikgOiBcIk5vIGZpbGVcIjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm1lZGlhLXZpZXdcIiAmJiAhZmlsZSkgaW5mby50aXRsZSA9IHN0YXRlLmluZm8/LmZpbGVuYW1lID8/IGluZm8udGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoXCJwYW5lLXJlbGllZjpmb3JtYXQtaGlzdG9yeS1pdGVtXCIsIGluZm8pO1xuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkVsZW1lbnQ8SyBleHRlbmRzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA+KFxuICAgIGVsOiBIVE1MRWxlbWVudCxcbiAgICBldmVudDogSyxcbiAgICBzZWxlY3Rvcjogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAodGhpczogSFRNTEVsZW1lbnQsIGV2OiBIVE1MRWxlbWVudEV2ZW50TWFwW0tdLCBkZWxlZ2F0ZVRhcmdldDogSFRNTEVsZW1lbnQpID0+IGFueSxcbiAgICBvcHRpb25zPzogYm9vbGVhbiB8IEFkZEV2ZW50TGlzdGVuZXJPcHRpb25zXG4pIHtcbiAgICBlbC5vbihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKVxuICAgIHJldHVybiAoKSA9PiBlbC5vZmYoZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHNldFRvb2x0aXAoZWw6IEhUTUxFbGVtZW50LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICBpZiAodGV4dCkgZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0ZXh0IHx8IHVuZGVmaW5lZCk7XG4gICAgZWxzZSBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xufSIsImltcG9ydCB7UGx1Z2luLCBURmlsZSwgV29ya3NwYWNlVGFic30gZnJvbSAnb2JzaWRpYW4nO1xuaW1wb3J0IHthZGRDb21tYW5kcywgY29tbWFuZH0gZnJvbSBcIi4vY29tbWFuZHNcIjtcbmltcG9ydCB7SGlzdG9yeSwgaW5zdGFsbEhpc3Rvcnl9IGZyb20gXCIuL0hpc3RvcnlcIjtcbmltcG9ydCB7IE1heGltaXplciB9IGZyb20gJy4vbWF4aW1pemluZyc7XG5pbXBvcnQge05hdmlnYXRpb24sIE5hdmlnYXRvciwgb25FbGVtZW50fSBmcm9tIFwiLi9OYXZpZ2F0b3JcIjtcblxuaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuXG5kZWNsYXJlIG1vZHVsZSBcIm9ic2lkaWFuXCIge1xuICAgIGludGVyZmFjZSBXb3Jrc3BhY2Uge1xuICAgICAgICBvbih0eXBlOiBcInBhbmUtcmVsaWVmOnVwZGF0ZS1oaXN0b3J5XCIsIGNhbGxiYWNrOiAobGVhZjogV29ya3NwYWNlTGVhZiwgaGlzdG9yeTogSGlzdG9yeSkgPT4gYW55LCBjdHg/OiBhbnkpOiBFdmVudFJlZjtcbiAgICAgICAgcmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2Uoc291cmNlOiBzdHJpbmcsIGluZm86IHtkaXNwbGF5OiBzdHJpbmcsIGRlZmF1bHRNb2Q/OiBib29sZWFufSk6IHZvaWRcbiAgICAgICAgdW5yZWdpc3RlckhvdmVyTGlua1NvdXJjZShzb3VyY2U6IHN0cmluZyk6IHZvaWRcbiAgICAgICAgaXRlcmF0ZUxlYXZlcyhjYWxsYmFjazogKGl0ZW06IFdvcmtzcGFjZUxlYWYpID0+IHVua25vd24sIGl0ZW06IFdvcmtzcGFjZVBhcmVudCk6IGJvb2xlYW47XG4gICAgICAgIG9uTGF5b3V0Q2hhbmdlKCk6IHZvaWRcbiAgICB9XG4gICAgaW50ZXJmYWNlIEFwcCB7XG4gICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgICAgICAgICBcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBvcG92ZXJzOiBIb3ZlclBvcG92ZXJbXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlSXRlbSB7XG4gICAgICAgIGNvbnRhaW5lckVsOiBIVE1MRGl2RWxlbWVudFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlUGFyZW50IHtcbiAgICAgICAgY2hpbGRyZW46IFdvcmtzcGFjZUl0ZW1bXVxuICAgICAgICByZWNvbXB1dGVDaGlsZHJlbkRpbWVuc2lvbnMoKTogdm9pZFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlVGFicyBleHRlbmRzIFdvcmtzcGFjZVBhcmVudCB7XG4gICAgICAgIHNlbGVjdFRhYihsZWFmOiBXb3Jrc3BhY2VMZWFmKTogdm9pZFxuICAgIH1cbiAgICBpbnRlcmZhY2UgV29ya3NwYWNlTGVhZiB7XG4gICAgICAgIHBhcmVudFNwbGl0OiBXb3Jrc3BhY2VQYXJlbnRcbiAgICB9XG4gICAgaW50ZXJmYWNlIEhvdmVyUG9wb3ZlciB7XG4gICAgICAgIGxlYWY/OiBXb3Jrc3BhY2VMZWFmXG4gICAgICAgIHJvb3RTcGxpdD86IFdvcmtzcGFjZVNwbGl0XG4gICAgICAgIGhvdmVyRWw6IEhUTUxFbGVtZW50XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW5lUmVsaWVmIGV4dGVuZHMgUGx1Z2luIHtcblxuICAgIG5hdiA9IE5hdmlnYXRpb24ucGVyV2luZG93KHRoaXMpLndhdGNoKCk7XG4gICAgbWF4ID0gdGhpcy5hZGRDaGlsZChuZXcgTWF4aW1pemVyKTtcblxuICAgIG9ubG9hZCgpIHtcbiAgICAgICAgaW5zdGFsbEhpc3RvcnkodGhpcyk7XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5yZWdpc3RlckhvdmVyTGlua1NvdXJjZShOYXZpZ2F0b3IuaG92ZXJTb3VyY2UsIHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdIaXN0b3J5IGRyb3Bkb3ducycsIGRlZmF1bHRNb2Q6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbihcInJlbmFtZVwiLCAoZmlsZSwgb2xkUGF0aCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKFxuICAgICAgICAgICAgICAgICAgICBsZWFmID0+IEhpc3RvcnkuZm9yTGVhZihsZWFmKS5vblJlbmFtZShmaWxlLCBvbGRQYXRoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5vbihcImFjdGl2ZS1sZWFmLWNoYW5nZVwiLCBsZWFmID0+IHRoaXMubmF2LmZvckxlYWYobGVhZikuZGlzcGxheShsZWFmKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoXG4gICAgICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5vbihcInBhbmUtcmVsaWVmOnVwZGF0ZS1oaXN0b3J5XCIsIChsZWFmLCBoaXN0b3J5KSA9PiB0aGlzLm5hdi5mb3JMZWFmKGxlYWYpLm9uVXBkYXRlSGlzdG9yeShsZWFmLCBoaXN0b3J5KSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZENvbW1hbmRzKHRoaXMsIHtcbiAgICAgICAgICAgIFtjb21tYW5kKFwic3dhcC1wcmV2XCIsIFwiU3dhcCBwYW5lIHdpdGggcHJldmlvdXMgaW4gc3BsaXRcIiwgIFwiTW9kK1NoaWZ0K1BhZ2VVcFwiKV0gICAoKXsgcmV0dXJuIHRoaXMubGVhZlBsYWNlcigtMSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInN3YXAtbmV4dFwiLCBcIlN3YXAgcGFuZSB3aXRoIG5leHQgaW4gc3BsaXRcIiwgICAgICBcIk1vZCtTaGlmdCtQYWdlRG93blwiKV0gKCl7IHJldHVybiB0aGlzLmxlYWZQbGFjZXIoIDEpOyB9LFxuXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLXByZXZcIiwgIFwiQ3ljbGUgdG8gcHJldmlvdXMgd29ya3NwYWNlIHBhbmVcIiwgICBcIk1vZCtQYWdlVXBcIiAgKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigtMSwgdHJ1ZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLW5leHRcIiwgIFwiQ3ljbGUgdG8gbmV4dCB3b3Jrc3BhY2UgcGFuZVwiLCAgICAgICBcIk1vZCtQYWdlRG93blwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZiggMSwgdHJ1ZSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLXByZXZcIiwgXCJDeWNsZSB0byBwcmV2aW91cyB3aW5kb3dcIiwgW10gKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coLTEsIHRydWUpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tbmV4dFwiLCBcIkN5Y2xlIHRvIG5leHQgd2luZG93XCIsICAgICBbXSApXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyggMSwgdHJ1ZSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tMXN0XCIsICAgXCJKdW1wIHRvIDFzdCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzFcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoMCk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTJuZFwiLCAgIFwiSnVtcCB0byAybmQgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCsyXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDEpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby0zcmRcIiwgICBcIkp1bXAgdG8gM3JkIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrM1wiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigyKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tNHRoXCIsICAgXCJKdW1wIHRvIDR0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzRcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoMyk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTV0aFwiLCAgIFwiSnVtcCB0byA1dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs1XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDQpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby02dGhcIiwgICBcIkp1bXAgdG8gNnRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrNlwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig1KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tN3RoXCIsICAgXCJKdW1wIHRvIDd0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzdcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoNik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTh0aFwiLCAgIFwiSnVtcCB0byA4dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs4XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDcpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby1sYXN0XCIsICBcIkp1bXAgdG8gbGFzdCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgXCJBbHQrOVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig5OTk5OTk5OSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTFzdFwiLCAgIFwiU3dpdGNoIHRvIDFzdCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coMCk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi0ybmRcIiwgICBcIlN3aXRjaCB0byAybmQgd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDEpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tM3JkXCIsICAgXCJTd2l0Y2ggdG8gM3JkIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdygyKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTR0aFwiLCAgIFwiU3dpdGNoIHRvIDR0aCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coMyk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi01dGhcIiwgICBcIlN3aXRjaCB0byA1dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDQpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tNnRoXCIsICAgXCJTd2l0Y2ggdG8gNnRoIHdpbmRvd1wiLCAgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg1KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwid2luLTd0aFwiLCAgIFwiU3dpdGNoIHRvIDd0aCB3aW5kb3dcIiwgIFtdKV0gKCkgeyBpZiAoYXBwLndvcmtzcGFjZS5mbG9hdGluZ1NwbGl0Py5jaGlsZHJlbi5sZW5ndGgpIHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhXaW5kb3coNik7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcIndpbi04dGhcIiwgICBcIlN3aXRjaCB0byA4dGggd2luZG93XCIsICBbXSldICgpIHsgaWYgKGFwcC53b3Jrc3BhY2UuZmxvYXRpbmdTcGxpdD8uY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoV2luZG93KDcpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJ3aW4tbGFzdFwiLCAgXCJTd2l0Y2ggdG8gbGFzdCB3aW5kb3dcIiwgW10pXSAoKSB7IGlmIChhcHAud29ya3NwYWNlLmZsb2F0aW5nU3BsaXQ/LmNoaWxkcmVuLmxlbmd0aCkgcmV0dXJuICgpID0+IHRoaXMuZ290b050aFdpbmRvdyg5OTk5OTk5OSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTFzdFwiLCAgXCJQbGFjZSBhcyAxc3QgcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCsxXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZigwLCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC0ybmRcIiwgIFwiUGxhY2UgYXMgMm5kIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrMlwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMSwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtM3JkXCIsICBcIlBsYWNlIGFzIDNyZCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzNcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDIsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTR0aFwiLCAgXCJQbGFjZSBhcyA0dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs0XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZigzLCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC01dGhcIiwgIFwiUGxhY2UgYXMgNXRoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrNVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoNCwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtNnRoXCIsICBcIlBsYWNlIGFzIDZ0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzZcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDUsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTd0aFwiLCAgXCJQbGFjZSBhcyA3dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs3XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig2LCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC04dGhcIiwgIFwiUGxhY2UgYXMgOHRoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrOFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoNywgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtbGFzdFwiLCBcIlBsYWNlIGFzIGxhc3QgcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgXCJNb2QrQWx0KzlcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDk5OTk5OTk5LCBmYWxzZSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwibWF4aW1pemVcIiwgXCJNYXhpbWl6ZSBhY3RpdmUgcGFuZSAoVG9nZ2xlKVwiLCBbXSldICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXgucGFyZW50Rm9yKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZikpIHJldHVybiAoKSA9PiB0aGlzLm1heC50b2dnbGVNYXhpbWl6ZSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb251bmxvYWQoKSB7XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS51bnJlZ2lzdGVySG92ZXJMaW5rU291cmNlKE5hdmlnYXRvci5ob3ZlclNvdXJjZSk7XG4gICAgfVxuXG4gICAgZ290b050aExlYWYobjogbnVtYmVyLCByZWxhdGl2ZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgbGVhZiA9IGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGxlYWYuZ2V0Um9vdCgpO1xuICAgICAgICBpZiAocm9vdCA9PT0gYXBwLndvcmtzcGFjZS5sZWZ0U3BsaXQgfHwgcm9vdCA9PT0gYXBwLndvcmtzcGFjZS5yaWdodFNwbGl0KSB7XG4gICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciAwLjE1LjMgc2lkZWJhciB0YWJzIHN0ZWFsaW5nIGZvY3VzXG4gICAgICAgICAgICBsZWFmID0gYXBwLndvcmtzcGFjZS5nZXRNb3N0UmVjZW50TGVhZihhcHAud29ya3NwYWNlLnJvb3RTcGxpdCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmF2ID0gdGhpcy5uYXYuZm9yTGVhZihsZWFmKTtcbiAgICAgICAgbGVhZiA9IGdvdG9OdGgobmF2LmxlYXZlcygpLCBsZWFmLCBuLCByZWxhdGl2ZSk7XG4gICAgICAgICFsZWFmIHx8IHRoaXMuYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgIH1cblxuICAgIGdvdG9OdGhXaW5kb3cobjogbnVtYmVyLCByZWxhdGl2ZTogYm9vbGVhbikge1xuICAgICAgICBjb25zdCBuYXYgPSBnb3RvTnRoKHRoaXMubmF2LmZvckFsbCgpLCB0aGlzLm5hdi5mb3JMZWFmKGFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiksIG4sIHJlbGF0aXZlKTtcbiAgICAgICAgY29uc3QgbGVhZiA9IG5hdj8ubGF0ZXN0TGVhZigpO1xuICAgICAgICBpZiAobGVhZikgYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIHRydWUsIHRydWUpO1xuICAgICAgICAobmF2Py53aW4gYXMgYW55KS5yZXF1aXJlPy4oJ2VsZWN0cm9uJyk/LnJlbW90ZT8uZ2V0Q3VycmVudFdpbmRvdygpPy5mb2N1cygpO1xuICAgIH1cblxuICAgIHBsYWNlTGVhZih0b1BvczogbnVtYmVyLCByZWxhdGl2ZT10cnVlKSB7XG4gICAgICAgIGNvbnN0IGNiID0gdGhpcy5sZWFmUGxhY2VyKHRvUG9zLCByZWxhdGl2ZSk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICBsZWFmUGxhY2VyKHRvUG9zOiBudW1iZXIsIHJlbGF0aXZlPXRydWUpIHtcbiAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xuICAgICAgICBpZiAoIWxlYWYpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBjb25zdFxuICAgICAgICAgICAgcGFyZW50U3BsaXQgPSBsZWFmLnBhcmVudFNwbGl0LFxuICAgICAgICAgICAgY2hpbGRyZW4gPSBwYXJlbnRTcGxpdC5jaGlsZHJlbixcbiAgICAgICAgICAgIGZyb21Qb3MgPSBjaGlsZHJlbi5pbmRleE9mKGxlYWYpXG4gICAgICAgIDtcbiAgICAgICAgaWYgKGZyb21Qb3MgPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBjb25zdCBwb3BvdmVyRWwgPSBsZWFmLmNvbnRhaW5lckVsLm1hdGNoUGFyZW50KFwiLmhvdmVyLXBvcG92ZXJcIik7XG4gICAgICAgICAgICBpZiAocG9wb3ZlckVsICYmIHJlbGF0aXZlICYmIE1hdGguYWJzKHRvUG9zKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIC8vIEFsbG93IHN3YXBwaW5nIHBvcG92ZXJzIGluIHRoZSBzdGFja1xuICAgICAgICAgICAgICAgIGxldCBuZWlnaGJvciA9IHBvcG92ZXJFbDtcbiAgICAgICAgICAgICAgICB3aGlsZSAobmVpZ2hib3IgJiYgKG5laWdoYm9yID09PSBwb3BvdmVyRWwgfHwgIW5laWdoYm9yLm1hdGNoZXMoXCIuaG92ZXItcG9wb3ZlclwiKSkpXG4gICAgICAgICAgICAgICAgICAgIG5laWdoYm9yID0gdG9Qb3MgPCAwID8gbmVpZ2hib3IucHJldmlvdXNFbGVtZW50U2libGluZyA6IG5laWdoYm9yLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3IpIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b1BvcyA8IDApIG5laWdoYm9yLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHBvcG92ZXJFbCwgbmVpZ2hib3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIG5laWdoYm9yLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5laWdoYm9yLCBwb3BvdmVyRWwpO1xuICAgICAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLm9uTGF5b3V0Q2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgICB0b1BvcyArPSBmcm9tUG9zO1xuICAgICAgICAgICAgaWYgKHRvUG9zIDwgMCB8fCB0b1BvcyA+PSBjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b1BvcyA+PSBjaGlsZHJlbi5sZW5ndGgpIHRvUG9zID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0b1BvcyA8IDApIHRvUG9zID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tUG9zID09IHRvUG9zKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gY2hpbGRyZW5bdG9Qb3NdO1xuICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKGZyb21Qb3MsIDEpO1xuICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKHRvUG9zLCAgIDAsIGxlYWYpO1xuICAgICAgICAgICAgaWYgKChwYXJlbnRTcGxpdCBhcyBXb3Jrc3BhY2VUYWJzKS5zZWxlY3RUYWIpIHtcbiAgICAgICAgICAgICAgICAocGFyZW50U3BsaXQgYXMgV29ya3NwYWNlVGFicykuc2VsZWN0VGFiKGxlYWYpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdGhlci5jb250YWluZXJFbC5pbnNlcnRBZGphY2VudEVsZW1lbnQoZnJvbVBvcyA+IHRvUG9zID8gXCJiZWZvcmViZWdpblwiIDogXCJhZnRlcmVuZFwiLCBsZWFmLmNvbnRhaW5lckVsKTtcbiAgICAgICAgICAgICAgICBwYXJlbnRTcGxpdC5yZWNvbXB1dGVDaGlsZHJlbkRpbWVuc2lvbnMoKTtcbiAgICAgICAgICAgICAgICBsZWFmLm9uUmVzaXplKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uTGF5b3V0Q2hhbmdlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBGb3JjZSBmb2N1cyBiYWNrIHRvIHBhbmU7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5zZXRBY3RpdmVMZWFmKGxlYWYsIGZhbHNlLCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTeW50aGV0aWNIaXN0b3J5RXZlbnQoYnV0dG9uOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgd2luID0gdGhpcy5uYXYud2luZG93cygpLmZpbHRlcih3aW4gPT5cbiAgICAgICAgICAgIHdpbi5ldmVudCAmJiAod2luLmV2ZW50IGFzIE1vdXNlRXZlbnQpLmJ1dHRvbiA9PT0gYnV0dG9uXG4gICAgICAgICkucG9wKCk7XG4gICAgICAgIGlmICh3aW4gJiYgd2luLmV2ZW50LnR5cGUgPT09IFwibW91c2Vkb3duXCIpIHtcbiAgICAgICAgICAgIHdpbi5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgd2luLmV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ290b050aDxUPihpdGVtczogVFtdLCBjdXJyZW50OiBULCBuOiBudW1iZXIsIHJlbGF0aXZlOiBib29sZWFuKTogVCB7XG4gICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgIG4gKz0gaXRlbXMuaW5kZXhPZihjdXJyZW50KTtcbiAgICAgICAgbiA9IChuICsgaXRlbXMubGVuZ3RoKSAlIGl0ZW1zLmxlbmd0aDsgIC8vIHdyYXAgYXJvdW5kXG4gICAgfVxuICAgIHJldHVybiBpdGVtc1tuID49IGl0ZW1zLmxlbmd0aCA/IGl0ZW1zLmxlbmd0aC0xIDogbl07XG59Il0sIm5hbWVzIjpbIk5vdGljZSIsIldvcmtzcGFjZUxlYWYiLCJDb21wb25lbnQiLCJkZWJvdW5jZSIsIldvcmtzcGFjZVBhcmVudCIsIk1lbnUiLCJLZXltYXAiLCJURmlsZSIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBTUEsTUFBTSxRQUFRLEdBQTRCLEVBQUUsQ0FBQztBQUU3QixTQUFBLE9BQU8sQ0FBQyxFQUFVLEVBQUUsSUFBWSxFQUFFLE9BQUEsR0FBNkIsRUFBRSxFQUFFLEdBQUcsR0FBQyxFQUFFLEVBQUE7OztJQUlyRixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVE7QUFBRSxRQUFBLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JELElBQUEsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUssT0FBa0IsQ0FBQyxHQUFHO0FBQUUsUUFBQSxPQUFPLEdBQUcsQ0FBQyxPQUFpQixDQUFDLENBQUM7QUFFMUYsSUFBQSxJQUFJLElBQUksR0FBYyxPQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBQTs7UUFFdkQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO0FBQUUsWUFBQSxPQUFPLEdBQUcsQ0FBQzs7UUFFeEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixRQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBbUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3RFLEtBQUMsQ0FBQyxDQUFDO0FBQ0gsSUFBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7O0lBRzlDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDaEMsSUFB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QUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFJLG1DQUFtQyxFQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBSSxtQ0FBbUMsRUFBRyxPQUFPLENBQUMsQ0FBQyxHQUFNLEVBQUEsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUksbUNBQW1DLEVBQUcsT0FBTyxDQUFDLENBQUMsR0FBTSxFQUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFJLG1DQUFtQyxFQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzdHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBSSxtQ0FBbUMsRUFBRyxPQUFPLENBQUMsQ0FBQyxHQUFNLEVBQUEsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUksbUNBQW1DLEVBQUcsT0FBTyxDQUFDLENBQUMsR0FBTSxFQUFBLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDN0csQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFHLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQU0sRUFBQSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBRXBILFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2hKLFlBQUEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFJLHNCQUFzQixFQUFHLEVB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
