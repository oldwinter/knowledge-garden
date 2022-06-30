'use strict';

var obsidian = require('obsidian');

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

// Simplified Commands Framework

const commands = {};

function command(id, name, hotkeys=[], cmd={}) {

    // Allow hotkeys to be expressed as a string, array of strings,
    // object, or array of objects.  (Normalize to an array first.)
    if (typeof hotkeys === "string") hotkeys = [hotkeys];
    if (typeof hotkeys === "object" && hotkeys.key) hotkeys = [hotkeys];

    hotkeys = hotkeys.map(function(key) {
        // If a hotkey is an object already, no need to process it
        if (typeof key === "object") return key;
        // Convert strings to Obsidian's hotkey format
        key = key.split("+");
        return { modifiers: key, key: key.pop() || "+" }  // empty last part = e.g. 'Mod++'
    });
    Object.assign(cmd, {id, name, hotkeys});

    // Save the command data under a unique symbol
    const sym = Symbol("cmd:" + id);
    commands[sym] = cmd;
    return sym;
}

function addCommands(plugin, cmdset) {
    // Extract command symbols from cmdset and register them, bound to the plugin for methods
    Object.getOwnPropertySymbols(cmdset).forEach(sym => {
        const cmd = commands[sym], method = cmdset[sym];
        if (cmd) plugin.addCommand(Object.assign({}, cmd, {
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

const HIST_ATTR = "pane-relief:history-v1";
const SERIAL_PROP = "pane-relief:history-v1";

const domLeaves = new WeakMap();

class HistoryEntry {
    constructor(rawState) {
        this.setState(rawState);
    }

    setState(rawState) {
        this.raw = rawState;
        this.viewState = JSON.parse(rawState.state || "{}");
        this.eState = JSON.parse(rawState.eState || "null");
        this.path = this.viewState.state?.file;
    }

    onRename(file, oldPath) {
        if (this.path === oldPath) {
            this.path = this.viewState.state.file = file.path;
            this.raw.state = JSON.stringify(this.viewState);
        }
    }

    go(leaf) {
        let {viewState, path, eState} = this;
        let file = path && leaf?.app?.vault.getAbstractFileByPath(path);
        if (path && !file) {
            new obsidian.Notice("Missing file: "+path);
            viewState = {type: "empty", state:{}};
            eState = undefined;
        }
        leaf.setViewState({...viewState, active: true, popstate: true}, eState);
    }

    replaceState(rawState) {
        if (rawState.state !== this.raw.state) {
            const viewState = JSON.parse(rawState.state || "{}");
            // Don't replace a file with an empty in the history
            if (viewState.type === "empty") return true;
            // File is different from existing file: should be a push instead
            if (this.path && this.path !== viewState?.state?.file) return false;
            if (viewState.type === "media-view") {
                const oldInfo = JSON.stringify(this.viewState.state.info);
                const newInfo = JSON.stringify(viewState.state.info);
                if (oldInfo !== newInfo) return false;
            }
        }
        this.setState(rawState);
        return true;
    }
}

class History {
    static current(app) {
        return this.forLeaf(app.workspace.activeLeaf) || new this();
    }

    static forLeaf(leaf) {
        if (leaf) domLeaves.set(leaf.containerEl, leaf);
        if (leaf) return leaf[HIST_ATTR] instanceof this ?
            leaf[HIST_ATTR] :
            leaf[HIST_ATTR] = new this(leaf, leaf[HIST_ATTR]?.serialize() || undefined);
    }

    constructor(leaf, {pos, stack} = {pos:0, stack:[]}) {
        this.leaf = leaf;
        this.pos = pos;
        this.stack = stack.map(raw => new HistoryEntry(raw));
    }

    cloneTo(leaf) {
        return leaf[HIST_ATTR] = new this.constructor(leaf, this.serialize());
    }

    onRename(file, oldPath) {
        for(const histEntry of this.stack) histEntry.onRename(file, oldPath);
    }

    serialize() { return {pos: this.pos, stack: this.stack.map(e => e.raw)}; }

    get state() { return this.stack[this.pos]?.raw || null; }
    get length() { return this.stack.length; }

    back()    { this.go(-1); }
    forward() { this.go( 1); }

    lookAhead() { return this.stack.slice(0, this.pos).reverse(); }
    lookBehind() { return this.stack.slice(this.pos+1); }

    goto(pos) {
        if (!this.leaf) return;
        if (this.leaf.pinned) return new obsidian.Notice("Pinned pane: unpin before going forward or back"), undefined;
        if (this.leaf.working) return new obsidian.Notice("Pane is busy: please wait before navigating further"), undefined;
        pos = this.pos = Math.max(0, Math.min(pos, this.stack.length - 1));
        this.stack[pos]?.go(this.leaf);
        this.leaf.app?.workspace?.trigger("pane-relief:update-history", this.leaf, this);
    }

    go(by, force) {
        if (!this.leaf || !by) return;  // no-op
        // prevent wraparound
        const newPos = Math.max(0, Math.min(this.pos - by, this.stack.length - 1));
        if (force || newPos !== this.pos) {
            this.goto(newPos);
        } else {
            new obsidian.Notice(`No more ${by < 0 ? "back" : "forward"} history for pane`);
        }
    }

    replaceState(rawState, title, url){
        const entry = this.stack[this.pos];
        if (!entry) {
            this.stack[this.pos] = new HistoryEntry(rawState);
        } else if (!entry.replaceState(rawState)) {
            // replaceState was erroneously called with a new file for the same leaf;
            // force a pushState instead (fixes the issue reported here: https://forum.obsidian.md/t/18518)
            this.pushState(rawState, title, url);
        }
    }

    pushState(rawState, title, url)   {
        //console.log("pushing", rawState)
        this.stack.splice(0, this.pos, new HistoryEntry(rawState));
        this.pos = 0;
        // Limit "back" to 20
        while (this.stack.length > 20) this.stack.pop();
        this.leaf.app?.workspace?.trigger("pane-relief:update-history", this.leaf, this);
    }
}

function installHistory(plugin) {

    const app = plugin.app;

    // Monkeypatch: include history in leaf serialization (so it's persisted with the workspace)
    // and check for popstate events (to suppress them)
    plugin.register(around(obsidian.WorkspaceLeaf.prototype, {
        serialize(old) { return function serialize(){
            const result = old.call(this);
            if (this[HIST_ATTR]) result[SERIAL_PROP] = this[HIST_ATTR].serialize();
            return result;
        }},
        setViewState(old) { return function setViewState(vs, es){
            if (vs.popstate && window.event?.type === "popstate") {
                return Promise.resolve();
            }
            return old.call(this, vs, es);
        }}
    }));

    plugin.register(around(app.workspace, {
        // Monkeypatch: load history during leaf load, if present
        deserializeLayout(old) { return async function deserializeLayout(state, ...etc){
            let result = await old.call(this, state, ...etc);
            if (state.type === "leaf") {
                if (!result) {
                    // Retry loading the pane as an empty
                    state.state.type = 'empty';
                    result = await old.call(this, state, ...etc);
                    if (!result) return result;
                }
                if (state[SERIAL_PROP]) result[HIST_ATTR] = new History(result, state[SERIAL_PROP]);
            }
            return result;
        }},
        // Monkeypatch: keep Obsidian from pushing history in setActiveLeaf
        setActiveLeaf(old) { return function setActiveLeaf(leaf, ...etc) {
            const unsub = around(this, {
                recordHistory(old) { return function (leaf, _push, ...args) {
                    // Always update state in place
                    return old.call(this, leaf, false, ...args);
                }; }
            });
            try {
                return old.call(this, leaf, ...etc);
            } finally {
                unsub();
            }
        }},
    }));

    // Override default mouse history behavior.  We need this because 1) Electron will use the built-in
    // history object if we don't (instead of our wrapper), and 2) we want the click to apply to the leaf
    // that was under the mouse, rather than whichever leaf was active.
    document.addEventListener("mouseup", historyHandler, true);
    plugin.register(() => {
        document.removeEventListener("mouseup", historyHandler, true);
    });
    function historyHandler(e) {
        if (e.button !== 3 && e.button !== 4) return;
        e.preventDefault(); e.stopPropagation();  // prevent default behavior
        const target = e.target.matchParent(".workspace-leaf");
        if (target && e.type === "mouseup") {
            let leaf = domLeaves.get(target);
            if (!leaf) app.workspace.iterateAllLeaves(l => leaf = (l.containerEl === target) ? l : leaf);
            if (!leaf) return false;
            if (e.button == 3) { History.forLeaf(leaf).back(); }
            if (e.button == 4) { History.forLeaf(leaf).forward(); }
        }
        return false;
    }

    // Proxy the window history with a wrapper that delegates to the active leaf's History object,
    const realHistory = window.history;
    plugin.register(() => window.history = realHistory);
    Object.defineProperty(window, "history", { enumerable: true, configurable: true, writable: true, value: {
        get state()      { return History.current(app).state; },
        get length()     { return History.current(app).length; },

        back()    { this.go(-1); },
        forward() { this.go( 1); },
        go(by)    { History.current(app).go(by); },

        replaceState(state, title, url){ History.current(app).replaceState(state, title, url); },
        pushState(state, title, url)   { History.current(app).pushState(state, title, url); },

        get scrollRestoration()    { return realHistory.scrollRestoration; },
        set scrollRestoration(val) { realHistory.scrollRestoration = val; },
    }});

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

class Navigator extends obsidian.Component {

    static hoverSource = "pane-relief:history-menu";

    constructor(plugin, kind, dir)  {
        super();
        this.plugin = plugin;
        this.app = plugin.app;
        this.kind = kind;
        this.dir = dir;
    }

    onload() {
        this.containerEl = document.body.find(
            `.titlebar .titlebar-button-container.mod-left .titlebar-button.mod-${this.kind}`
        );
        this.count = this.containerEl.createSpan({prepend: this.kind === "back", cls: "history-counter"});
        this.leaf = null;
        this.history = null;
        this.states = [];
        this.oldLabel = this.containerEl.getAttribute("aria-label");
        this.registerDomEvent(this.containerEl, "contextmenu", this.openMenu.bind(this));
    }

    onunload() {
        this.setTooltip(this.oldLabel);
        this.count.detach();
        this.containerEl.toggleClass("mod-active", false);
    }

    setCount(num) { this.count.textContent = num || ""; }

    setTooltip(text) {
        if (text) this.containerEl.setAttribute("aria-label", text || undefined);
        else this.containerEl.removeAttribute("aria-label");
    }

    setHistory(history = History.current(this.app)) {
        this.history = history;
        const states = this.states = history[this.dir < 0 ? "lookBehind" : "lookAhead"].call(history);
        this.setCount(states.length);
        this.setTooltip(states.length ?
            this.oldLabel + "\n" + this.formatState(states[0]).title :
            `No ${this.kind} history`
        );
        this.containerEl.toggleClass("mod-active", states.length > 0);
    }

    openMenu(evt) {
        if (!this.states.length) return;
        const menu = createMenu(this.app);
        menu.dom.addClass("pane-relief-history-menu");
        menu.dom.on("mousedown", ".menu-item", e => {e.stopPropagation();}, true);
        this.states.map(this.formatState.bind(this)).forEach(
            (info, idx) => this.menuItem(info, idx, menu)
        );
        menu.showAtPosition({x: evt.clientX, y: evt.clientY + 20});
        this.plugin.historyIsOpen = true;
        menu.onHide(() => { this.plugin.historyIsOpen = false; this.plugin.display(); });
    }

    menuItem(info, idx, menu) {
        const my = this;
        menu.addItem(i => { createItem(i); if (info.file) setupFileEvents(i.dom); });
        return;

        function createItem(i, prefix="") {
            i.setIcon(info.icon).setTitle(prefix + info.title).onClick(e => {
                let history = my.history;
                // Check for ctrl/cmd/middle button and split leaf + copy history
                if (obsidian.Keymap.isModifier(e, "Mod") || 1 === e.button) {
                    history = history.cloneTo(my.app.workspace.splitActiveLeaf());
                }
                history.go((idx+1) * my.dir, true);
            });
        }

        function setupFileEvents(dom) {
            // Hover preview
            dom.addEventListener('mouseover', e => {
                my.app.workspace.trigger('hover-link', {
                    event: e, source: Navigator.hoverSource,
                    hoverParent: menu.dom, targetEl: dom, linktext: info.file.path
                });
            });

            // Drag menu item to move or link file
            dom.setAttr('draggable', 'true');
            dom.addEventListener('dragstart', e => {
                const dragManager = my.app.dragManager;
                const dragData = dragManager.dragFile(e, info.file);
                dragManager.onDragStart(e, dragData);
            });
            dom.addEventListener('dragend', e => menu.hide());

            // File menu
            dom.addEventListener("contextmenu", e => {
                const menu = createMenu(my.app);
                menu.addItem(i => createItem(i, `Go ${my.kind} to `)).addSeparator();
                my.app.workspace.trigger(
                    "file-menu", menu, info.file, "link-context-menu"
                );
                menu.showAtPosition({x: e.clientX, y: e.clientY});
                e.stopPropagation(); // keep the parent menu open for now
            }, true);
        }
    }

    formatState(entry) {
        const {viewState: {type, state}, eState, path} = entry;
        const file = path && this.app.vault.getAbstractFileByPath(path);
        const info = {icon: "", title: "", file, type, state, eState};

        if (nonFileViews[type]) {
            [info.icon, info.title] = nonFileViews[type];
        } else if (path && !file) {
            [info.icon, info.title] = ["trash", "Missing file "+path];
        } else {
            info.icon = viewtypeIcons[type] ?? "document";
            if (type === "markdown" && state.mode === "preview") info.icon = "lines-of-text";
            info.title = file ? file.basename + (file.extension !== "md" ? "."+file.extension : "") : "No file";
            if (type === "media-view" && !file) info.title = state.info?.filename ?? info.title;
        }

        this.app.workspace.trigger("pane-relief:format-history-item", info);
        return info;
    }
}

function onElement(el, event, selector, callback, options) {
    el.on(event, selector, callback, options);
    return () => el.off(event, selector, callback, options);
}

function createMenu(app) {
    const menu = new obsidian.Menu(app);
    menu.register(
        // XXX this really should be a scope push
        onElement(document, "keydown", "*", e => {
            if (e.key==="Escape") {
                e.preventDefault();
                e.stopPropagation();
                menu.hide();
            }
        }, {capture: true})
    );
    return menu;
}

class PaneRelief extends obsidian.Plugin {

    onload() {
        installHistory(this);
        this.leafMap = new WeakMap();

        this.app.workspace.registerHoverLinkSource(Navigator.hoverSource, {
            display: 'History dropdowns', defaultMod: true
        });
        this.app.workspace.onLayoutReady(() => {
            this.setupDisplay();
            this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
                if (file instanceof obsidian.TFile) this.app.workspace.iterateAllLeaves(
                    leaf => History.forLeaf(leaf).onRename(file, oldPath)
                );
            }));
            this.registerEvent(this.app.workspace.on("pane-relief:update-history", (leaf, history) => {
                this.updateLeaf(leaf);
                if (leaf === this.app.workspace.activeLeaf) this.display(history);
            }));
            this.registerEvent(this.app.workspace.on("active-leaf-change", leaf => this.display(History.forLeaf(leaf))));
            if (this.app.workspace.activeLeaf) this.display(History.forLeaf(this.app.workspace.activeLeaf));
            this.registerEvent(this.app.workspace.on("layout-change", this.numberPanes, this));
            this.numberPanes();
            this.register(
                onElement(
                    document.body, "contextmenu", ".view-header > .view-actions > .view-action", (evt, target) => {
                        const nav = (
                            (target.matches('[class*=" app:go-forward"]') && this.forward) ||
                            (target.matches('[class*=" app:go-back"]')    && this.back)
                        );
                        if (!nav) return;
                        const leaf = this.leafMap.get(target.matchParent(".workspace-leaf"));
                        if (!leaf) return;
                        this.display(History.forLeaf(leaf));
                        nav.openMenu(evt);
                        this.display();
                    }, {capture: true}
                )
            );
        });

        this.register(around(obsidian.WorkspaceLeaf.prototype, {
            // Workaround for https://github.com/obsidianmd/obsidian-api/issues/47
            setEphemeralState(old) { return function(state){
                if (state?.focus) {
                    const {activeElement} = document;
                    if (activeElement instanceof Node && !this.containerEl.contains(activeElement)) {
                        activeElement.blur?.();
                    }
                }
                return old.call(this, state);
            }}
        }));

        addCommands(this, {
            [command("swap-prev", "Swap pane with previous in split",  "Mod+Shift+PageUp")]   (){ return this.leafPlacer(-1); },
            [command("swap-next", "Swap pane with next in split",      "Mod+Shift+PageDown")] (){ return this.leafPlacer( 1); },

            [command("go-prev",  "Cycle to previous workspace pane",   "Mod+PageUp"  )] () { return () => this.gotoNthLeaf(-1, true); },
            [command("go-next",  "Cycle to next workspace pane",       "Mod+PageDown")] () { return () => this.gotoNthLeaf( 1, true); },

            [command("go-1st",   "Jump to 1st pane in the workspace",  "Alt+1")] () { return () => this.gotoNthLeaf(0); },
            [command("go-2nd",   "Jump to 2nd pane in the workspace",  "Alt+2")] () { return () => this.gotoNthLeaf(1); },
            [command("go-3rd",   "Jump to 3rd pane in the workspace",  "Alt+3")] () { return () => this.gotoNthLeaf(2); },
            [command("go-4th",   "Jump to 4th pane in the workspace",  "Alt+4")] () { return () => this.gotoNthLeaf(3); },
            [command("go-5th",   "Jump to 5th pane in the workspace",  "Alt+5")] () { return () => this.gotoNthLeaf(4); },
            [command("go-6th",   "Jump to 6th pane in the workspace",  "Alt+6")] () { return () => this.gotoNthLeaf(5); },
            [command("go-7th",   "Jump to 7th pane in the workspace",  "Alt+7")] () { return () => this.gotoNthLeaf(6); },
            [command("go-8th",   "Jump to 8th pane in the workspace",  "Alt+8")] () { return () => this.gotoNthLeaf(7); },
            [command("go-last",  "Jump to last pane in the workspace", "Alt+9")] () { return () => this.gotoNthLeaf(99999999); },

            [command("put-1st",  "Place as 1st pane in the split",     "Mod+Alt+1")] () { return () => this.placeLeaf(0, false); },
            [command("put-2nd",  "Place as 2nd pane in the split",     "Mod+Alt+2")] () { return () => this.placeLeaf(1, false); },
            [command("put-3rd",  "Place as 3rd pane in the split",     "Mod+Alt+3")] () { return () => this.placeLeaf(2, false); },
            [command("put-4th",  "Place as 4th pane in the split",     "Mod+Alt+4")] () { return () => this.placeLeaf(3, false); },
            [command("put-5th",  "Place as 5th pane in the split",     "Mod+Alt+5")] () { return () => this.placeLeaf(4, false); },
            [command("put-6th",  "Place as 6th pane in the split",     "Mod+Alt+6")] () { return () => this.placeLeaf(5, false); },
            [command("put-7th",  "Place as 7th pane in the split",     "Mod+Alt+7")] () { return () => this.placeLeaf(6, false); },
            [command("put-8th",  "Place as 8th pane in the split",     "Mod+Alt+8")] () { return () => this.placeLeaf(7, false); },
            [command("put-last", "Place as last pane in the split",    "Mod+Alt+9")] () { return () => this.placeLeaf(99999999, false); }
        });
    }

    setupDisplay() {
        this.addChild(this.back    = new Navigator(this, "back", -1));
        this.addChild(this.forward = new Navigator(this, "forward", 1));
    }

    // Set to true while either menu is open, so we don't switch it out
    historyIsOpen = false;

    display(history = History.forLeaf(this.app.workspace.activeLeaf)) {
        if (this.historyIsOpen) return;
        this.back.setHistory(history);
        this.forward.setHistory(history);
    }

    iterateRootLeaves(cb) {
        if (this.app.workspace.iterateRootLeaves(cb)) return true;

        // Support Hover Editors
        const popovers = this.app.plugins.plugins["obsidian-hover-editor"]?.activePopovers;
        if (popovers) for (const popover of popovers) {
            // More recent plugin: we can skip the scan
            if (popover.constructor.iteratePopoverLeaves) return false;
            if (popover.leaf && cb(popover.leaf)) return true;
            if (popover.rootSplit && this.app.workspace.iterateLeaves(cb, popover.rootSplit)) return true;
        }

        return false;
    }

    updateLeaf(leaf) {
        const history = History.forLeaf(leaf);
        leaf.containerEl.style.setProperty("--pane-relief-forward-count", '"'+(history.lookAhead().length || "")+'"');
        leaf.containerEl.style.setProperty("--pane-relief-backward-count", '"'+(history.lookBehind().length || "")+'"');
        this.leafMap.set(leaf.containerEl, leaf);
    }

    numberPanes() {
        let count = 0, lastLeaf = null;
        this.iterateRootLeaves(leaf => {
            leaf.containerEl.style.setProperty("--pane-relief-label", ++count < 9 ? count : "");
            leaf.containerEl.toggleClass("has-pane-relief-label", count<9);
            lastLeaf = leaf;
        });
        if (count>8) {
            lastLeaf?.containerEl.style.setProperty("--pane-relief-label", "9");
            lastLeaf?.containerEl.toggleClass("has-pane-relief-label", true);
        }
        this.app.workspace.iterateAllLeaves(leaf => this.updateLeaf(leaf));
    }

    onunload() {
        this.app.workspace.unregisterHoverLinkSource(Navigator.hoverSource);
        this.iterateRootLeaves(leaf => {
            leaf.containerEl.style.removeProperty("--pane-relief-label");
            leaf.containerEl.toggleClass("has-pane-relief-label", false);
        });
        this.app.workspace.iterateAllLeaves(leaf => {
            leaf.containerEl.style.removeProperty("--pane-relief-forward-count");
            leaf.containerEl.style.removeProperty("--pane-relief-backward-count");
        });
    }

    gotoNthLeaf(n, relative) {
        const leaves = [];
        this.iterateRootLeaves((leaf) => (leaves.push(leaf), false));
        if (relative) {
            n += leaves.indexOf(this.app.workspace.activeLeaf);
            n = (n + leaves.length) % leaves.length;  // wrap around
        }
        const leaf = leaves[n>=leaves.length ? leaves.length-1 : n];
        !leaf || this.app.workspace.setActiveLeaf(leaf, true, true);
    }

    placeLeaf(toPos, relative=true) {
        const cb = this.leafPlacer(toPos, relative);
        if (cb) cb();
    }

    leafPlacer(toPos, relative=true) {
        const leaf = this.app.workspace.activeLeaf;
        if (!leaf) return false;

        const
            parentSplit = leaf.parentSplit,
            children = parentSplit.children,
            fromPos = children.indexOf(leaf)
        ;
        if (fromPos == -1) return false;

        if (relative) {
            toPos += fromPos;
            if (toPos < 0 || toPos >= children.length) return false;
        } else {
            if (toPos >= children.length) toPos = children.length - 1;
            if (toPos < 0) toPos = 0;
        }

        if (fromPos == toPos) return false;

        return () => {
            const other = children[toPos];
            children.splice(fromPos, 1);
            children.splice(toPos,   0, leaf);
            if (parentSplit.selectTab) {
                parentSplit.selectTab(leaf);
            } else {
                other.containerEl.insertAdjacentElement(fromPos > toPos ? "beforebegin" : "afterend", leaf.containerEl);
                parentSplit.recomputeChildrenDimensions();
                leaf.onResize();
                this.app.workspace.onLayoutChange();

                // Force focus back to pane;
                this.app.workspace.activeLeaf = null;
                this.app.workspace.setActiveLeaf(leaf, false, true);
            }
        }
    }
}

module.exports = PaneRelief;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLnlhcm4vY2FjaGUvbW9ua2V5LWFyb3VuZC1ucG0tMi4zLjAtOWYxZGEwYTM5OS1jYWYyYTI2NTc5LnppcC9ub2RlX21vZHVsZXMvbW9ua2V5LWFyb3VuZC9tanMvaW5kZXguanMiLCJzcmMvY29tbWFuZHMuanMiLCJzcmMvSGlzdG9yeS5qcyIsInNyYy9OYXZpZ2F0b3IuanMiLCJzcmMvcGx1Z2luLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBhcm91bmQob2JqLCBmYWN0b3JpZXMpIHtcbiAgICBjb25zdCByZW1vdmVycyA9IE9iamVjdC5rZXlzKGZhY3RvcmllcykubWFwKGtleSA9PiBhcm91bmQxKG9iaiwga2V5LCBmYWN0b3JpZXNba2V5XSkpO1xuICAgIHJldHVybiByZW1vdmVycy5sZW5ndGggPT09IDEgPyByZW1vdmVyc1swXSA6IGZ1bmN0aW9uICgpIHsgcmVtb3ZlcnMuZm9yRWFjaChyID0+IHIoKSk7IH07XG59XG5mdW5jdGlvbiBhcm91bmQxKG9iaiwgbWV0aG9kLCBjcmVhdGVXcmFwcGVyKSB7XG4gICAgY29uc3Qgb3JpZ2luYWwgPSBvYmpbbWV0aG9kXSwgaGFkT3duID0gb2JqLmhhc093blByb3BlcnR5KG1ldGhvZCk7XG4gICAgbGV0IGN1cnJlbnQgPSBjcmVhdGVXcmFwcGVyKG9yaWdpbmFsKTtcbiAgICAvLyBMZXQgb3VyIHdyYXBwZXIgaW5oZXJpdCBzdGF0aWMgcHJvcHMgZnJvbSB0aGUgd3JhcHBpbmcgbWV0aG9kLFxuICAgIC8vIGFuZCB0aGUgd3JhcHBpbmcgbWV0aG9kLCBwcm9wcyBmcm9tIHRoZSBvcmlnaW5hbCBtZXRob2RcbiAgICBpZiAob3JpZ2luYWwpXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjdXJyZW50LCBvcmlnaW5hbCk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHdyYXBwZXIsIGN1cnJlbnQpO1xuICAgIG9ialttZXRob2RdID0gd3JhcHBlcjtcbiAgICAvLyBSZXR1cm4gYSBjYWxsYmFjayB0byBhbGxvdyBzYWZlIHJlbW92YWxcbiAgICByZXR1cm4gcmVtb3ZlO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGJlZW4gZGVhY3RpdmF0ZWQgYW5kIGFyZSBubyBsb25nZXIgd3JhcHBlZCwgcmVtb3ZlIG91cnNlbHZlc1xuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwgJiYgb2JqW21ldGhvZF0gPT09IHdyYXBwZXIpXG4gICAgICAgICAgICByZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgICAgLy8gSWYgbm8gb3RoZXIgcGF0Y2hlcywganVzdCBkbyBhIGRpcmVjdCByZW1vdmFsXG4gICAgICAgIGlmIChvYmpbbWV0aG9kXSA9PT0gd3JhcHBlcikge1xuICAgICAgICAgICAgaWYgKGhhZE93bilcbiAgICAgICAgICAgICAgICBvYmpbbWV0aG9kXSA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbbWV0aG9kXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudCA9PT0gb3JpZ2luYWwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIC8vIEVsc2UgcGFzcyBmdXR1cmUgY2FsbHMgdGhyb3VnaCwgYW5kIHJlbW92ZSB3cmFwcGVyIGZyb20gdGhlIHByb3RvdHlwZSBjaGFpblxuICAgICAgICBjdXJyZW50ID0gb3JpZ2luYWw7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih3cmFwcGVyLCBvcmlnaW5hbCB8fCBGdW5jdGlvbik7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZHVwZShrZXksIG9sZEZuLCBuZXdGbikge1xuICAgIGNoZWNrW2tleV0gPSBrZXk7XG4gICAgcmV0dXJuIGNoZWNrO1xuICAgIGZ1bmN0aW9uIGNoZWNrKC4uLmFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIChvbGRGbltrZXldID09PSBrZXkgPyBvbGRGbiA6IG5ld0ZuKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXIocHJvbWlzZSwgY2IpIHtcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKGNiLCBjYik7XG59XG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKGFzeW5jRnVuY3Rpb24pIHtcbiAgICBsZXQgbGFzdFJ1biA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGZ1bmN0aW9uIHdyYXBwZXIoLi4uYXJncykge1xuICAgICAgICByZXR1cm4gbGFzdFJ1biA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgYWZ0ZXIobGFzdFJ1biwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFzeW5jRnVuY3Rpb24uYXBwbHkodGhpcywgYXJncykudGhlbihyZXMsIHJlaik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdyYXBwZXIuYWZ0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBsYXN0UnVuID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7IGFmdGVyKGxhc3RSdW4sIHJlcyk7IH0pO1xuICAgIH07XG4gICAgcmV0dXJuIHdyYXBwZXI7XG59XG4iLCIvLyBTaW1wbGlmaWVkIENvbW1hbmRzIEZyYW1ld29ya1xuXG5jb25zdCBjb21tYW5kcyA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZChpZCwgbmFtZSwgaG90a2V5cz1bXSwgY21kPXt9KSB7XG5cbiAgICAvLyBBbGxvdyBob3RrZXlzIHRvIGJlIGV4cHJlc3NlZCBhcyBhIHN0cmluZywgYXJyYXkgb2Ygc3RyaW5ncyxcbiAgICAvLyBvYmplY3QsIG9yIGFycmF5IG9mIG9iamVjdHMuICAoTm9ybWFsaXplIHRvIGFuIGFycmF5IGZpcnN0LilcbiAgICBpZiAodHlwZW9mIGhvdGtleXMgPT09IFwic3RyaW5nXCIpIGhvdGtleXMgPSBbaG90a2V5c107XG4gICAgaWYgKHR5cGVvZiBob3RrZXlzID09PSBcIm9iamVjdFwiICYmIGhvdGtleXMua2V5KSBob3RrZXlzID0gW2hvdGtleXNdO1xuXG4gICAgaG90a2V5cyA9IGhvdGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAvLyBJZiBhIGhvdGtleSBpcyBhbiBvYmplY3QgYWxyZWFkeSwgbm8gbmVlZCB0byBwcm9jZXNzIGl0XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKSByZXR1cm4ga2V5O1xuICAgICAgICAvLyBDb252ZXJ0IHN0cmluZ3MgdG8gT2JzaWRpYW4ncyBob3RrZXkgZm9ybWF0XG4gICAgICAgIGtleSA9IGtleS5zcGxpdChcIitcIilcbiAgICAgICAgcmV0dXJuIHsgbW9kaWZpZXJzOiBrZXksIGtleToga2V5LnBvcCgpIHx8IFwiK1wiIH0gIC8vIGVtcHR5IGxhc3QgcGFydCA9IGUuZy4gJ01vZCsrJ1xuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24oY21kLCB7aWQsIG5hbWUsIGhvdGtleXN9KTtcblxuICAgIC8vIFNhdmUgdGhlIGNvbW1hbmQgZGF0YSB1bmRlciBhIHVuaXF1ZSBzeW1ib2xcbiAgICBjb25zdCBzeW0gPSBTeW1ib2woXCJjbWQ6XCIgKyBpZCk7XG4gICAgY29tbWFuZHNbc3ltXSA9IGNtZDtcbiAgICByZXR1cm4gc3ltO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29tbWFuZHMocGx1Z2luLCBjbWRzZXQpIHtcbiAgICAvLyBFeHRyYWN0IGNvbW1hbmQgc3ltYm9scyBmcm9tIGNtZHNldCBhbmQgcmVnaXN0ZXIgdGhlbSwgYm91bmQgdG8gdGhlIHBsdWdpbiBmb3IgbWV0aG9kc1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoY21kc2V0KS5mb3JFYWNoKHN5bSA9PiB7XG4gICAgICAgIGNvbnN0IGNtZCA9IGNvbW1hbmRzW3N5bV0sIG1ldGhvZCA9IGNtZHNldFtzeW1dO1xuICAgICAgICBpZiAoY21kKSBwbHVnaW4uYWRkQ29tbWFuZChPYmplY3QuYXNzaWduKHt9LCBjbWQsIHtcbiAgICAgICAgICAgIGNoZWNrQ2FsbGJhY2soY2hlY2spIHtcbiAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBtZXRob2QgYm9keSB3aXRoIHRoZSBwbHVnaW4gYXMgJ3RoaXMnXG4gICAgICAgICAgICAgICAgY29uc3QgY2IgPSBtZXRob2QuY2FsbChwbHVnaW4pO1xuICAgICAgICAgICAgICAgIC8vIEl0IHRoZW4gcmV0dXJucyBhIGNsb3N1cmUgaWYgdGhlIGNvbW1hbmQgaXMgcmVhZHkgdG8gZXhlY3V0ZSwgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UgY2FsbCB0aGF0IGNsb3N1cmUgdW5sZXNzIHRoaXMgaXMganVzdCBhIGNoZWNrIGZvciBhdmFpbGFiaWxpdHlcbiAgICAgICAgICAgICAgICByZXR1cm4gKGNoZWNrIHx8IHR5cGVvZiBjYiAhPT0gXCJmdW5jdGlvblwiKSA/ICEhY2IgOiAoY2IoKSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KVxufSIsImltcG9ydCB7Tm90aWNlLCBXb3Jrc3BhY2VMZWFmfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge2Fyb3VuZH0gZnJvbSBcIm1vbmtleS1hcm91bmRcIjtcblxuY29uc3QgSElTVF9BVFRSID0gXCJwYW5lLXJlbGllZjpoaXN0b3J5LXYxXCI7XG5jb25zdCBTRVJJQUxfUFJPUCA9IFwicGFuZS1yZWxpZWY6aGlzdG9yeS12MVwiO1xuXG5jb25zdCBkb21MZWF2ZXMgPSBuZXcgV2Vha01hcCgpO1xuXG5mdW5jdGlvbiBwYXJzZShzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Ygc3RhdGUuc3RhdGUgPT09IFwic3RyaW5nXCIpIHN0YXRlLnN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZS5zdGF0ZSk7XG4gICAgaWYgKHR5cGVvZiBzdGF0ZS5lU3RhdGUgPT09IFwic3RyaW5nXCIpIHN0YXRlLmVTdGF0ZSA9IEpTT04ucGFyc2Uoc3RhdGUuZVN0YXRlKTtcbiAgICByZXR1cm4gc3RhdGU7XG59XG5cbmNsYXNzIEhpc3RvcnlFbnRyeSB7XG4gICAgY29uc3RydWN0b3IocmF3U3RhdGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShyYXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgc2V0U3RhdGUocmF3U3RhdGUpIHtcbiAgICAgICAgdGhpcy5yYXcgPSByYXdTdGF0ZTtcbiAgICAgICAgdGhpcy52aWV3U3RhdGUgPSBKU09OLnBhcnNlKHJhd1N0YXRlLnN0YXRlIHx8IFwie31cIik7XG4gICAgICAgIHRoaXMuZVN0YXRlID0gSlNPTi5wYXJzZShyYXdTdGF0ZS5lU3RhdGUgfHwgXCJudWxsXCIpO1xuICAgICAgICB0aGlzLnBhdGggPSB0aGlzLnZpZXdTdGF0ZS5zdGF0ZT8uZmlsZTtcbiAgICB9XG5cbiAgICBvblJlbmFtZShmaWxlLCBvbGRQYXRoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhdGggPT09IG9sZFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IHRoaXMudmlld1N0YXRlLnN0YXRlLmZpbGUgPSBmaWxlLnBhdGhcbiAgICAgICAgICAgIHRoaXMucmF3LnN0YXRlID0gSlNPTi5zdHJpbmdpZnkodGhpcy52aWV3U3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ28obGVhZikge1xuICAgICAgICBsZXQge3ZpZXdTdGF0ZSwgcGF0aCwgZVN0YXRlfSA9IHRoaXM7XG4gICAgICAgIGxldCBmaWxlID0gcGF0aCAmJiBsZWFmPy5hcHA/LnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKTtcbiAgICAgICAgaWYgKHBhdGggJiYgIWZpbGUpIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJNaXNzaW5nIGZpbGU6IFwiK3BhdGgpO1xuICAgICAgICAgICAgdmlld1N0YXRlID0ge3R5cGU6IFwiZW1wdHlcIiwgc3RhdGU6e319O1xuICAgICAgICAgICAgZVN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGxlYWYuc2V0Vmlld1N0YXRlKHsuLi52aWV3U3RhdGUsIGFjdGl2ZTogdHJ1ZSwgcG9wc3RhdGU6IHRydWV9LCBlU3RhdGUpO1xuICAgIH1cblxuICAgIHJlcGxhY2VTdGF0ZShyYXdTdGF0ZSkge1xuICAgICAgICBpZiAocmF3U3RhdGUuc3RhdGUgIT09IHRoaXMucmF3LnN0YXRlKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3U3RhdGUgPSBKU09OLnBhcnNlKHJhd1N0YXRlLnN0YXRlIHx8IFwie31cIik7XG4gICAgICAgICAgICAvLyBEb24ndCByZXBsYWNlIGEgZmlsZSB3aXRoIGFuIGVtcHR5IGluIHRoZSBoaXN0b3J5XG4gICAgICAgICAgICBpZiAodmlld1N0YXRlLnR5cGUgPT09IFwiZW1wdHlcIikgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAvLyBGaWxlIGlzIGRpZmZlcmVudCBmcm9tIGV4aXN0aW5nIGZpbGU6IHNob3VsZCBiZSBhIHB1c2ggaW5zdGVhZFxuICAgICAgICAgICAgaWYgKHRoaXMucGF0aCAmJiB0aGlzLnBhdGggIT09IHZpZXdTdGF0ZT8uc3RhdGU/LmZpbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICh2aWV3U3RhdGUudHlwZSA9PT0gXCJtZWRpYS12aWV3XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRJbmZvID0gSlNPTi5zdHJpbmdpZnkodGhpcy52aWV3U3RhdGUuc3RhdGUuaW5mbyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5mbyA9IEpTT04uc3RyaW5naWZ5KHZpZXdTdGF0ZS5zdGF0ZS5pbmZvKTtcbiAgICAgICAgICAgICAgICBpZiAob2xkSW5mbyAhPT0gbmV3SW5mbykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUocmF3U3RhdGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBIaXN0b3J5IHtcbiAgICBzdGF0aWMgY3VycmVudChhcHApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yTGVhZihhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpIHx8IG5ldyB0aGlzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZvckxlYWYobGVhZikge1xuICAgICAgICBpZiAobGVhZikgZG9tTGVhdmVzLnNldChsZWFmLmNvbnRhaW5lckVsLCBsZWFmKTtcbiAgICAgICAgaWYgKGxlYWYpIHJldHVybiBsZWFmW0hJU1RfQVRUUl0gaW5zdGFuY2VvZiB0aGlzID9cbiAgICAgICAgICAgIGxlYWZbSElTVF9BVFRSXSA6XG4gICAgICAgICAgICBsZWFmW0hJU1RfQVRUUl0gPSBuZXcgdGhpcyhsZWFmLCBsZWFmW0hJU1RfQVRUUl0/LnNlcmlhbGl6ZSgpIHx8IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobGVhZiwge3Bvcywgc3RhY2t9ID0ge3BvczowLCBzdGFjazpbXX0pIHtcbiAgICAgICAgdGhpcy5sZWFmID0gbGVhZjtcbiAgICAgICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBzdGFjay5tYXAocmF3ID0+IG5ldyBIaXN0b3J5RW50cnkocmF3KSk7XG4gICAgfVxuXG4gICAgY2xvbmVUbyhsZWFmKSB7XG4gICAgICAgIHJldHVybiBsZWFmW0hJU1RfQVRUUl0gPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihsZWFmLCB0aGlzLnNlcmlhbGl6ZSgpKTtcbiAgICB9XG5cbiAgICBvblJlbmFtZShmaWxlLCBvbGRQYXRoKSB7XG4gICAgICAgIGZvcihjb25zdCBoaXN0RW50cnkgb2YgdGhpcy5zdGFjaykgaGlzdEVudHJ5Lm9uUmVuYW1lKGZpbGUsIG9sZFBhdGgpO1xuICAgIH1cblxuICAgIHNlcmlhbGl6ZSgpIHsgcmV0dXJuIHtwb3M6IHRoaXMucG9zLCBzdGFjazogdGhpcy5zdGFjay5tYXAoZSA9PiBlLnJhdyl9OyB9XG5cbiAgICBnZXQgc3RhdGUoKSB7IHJldHVybiB0aGlzLnN0YWNrW3RoaXMucG9zXT8ucmF3IHx8IG51bGw7IH1cbiAgICBnZXQgbGVuZ3RoKCkgeyByZXR1cm4gdGhpcy5zdGFjay5sZW5ndGg7IH1cblxuICAgIGJhY2soKSAgICB7IHRoaXMuZ28oLTEpOyB9XG4gICAgZm9yd2FyZCgpIHsgdGhpcy5nbyggMSk7IH1cblxuICAgIGxvb2tBaGVhZCgpIHsgcmV0dXJuIHRoaXMuc3RhY2suc2xpY2UoMCwgdGhpcy5wb3MpLnJldmVyc2UoKTsgfVxuICAgIGxvb2tCZWhpbmQoKSB7IHJldHVybiB0aGlzLnN0YWNrLnNsaWNlKHRoaXMucG9zKzEpOyB9XG5cbiAgICBnb3RvKHBvcykge1xuICAgICAgICBpZiAoIXRoaXMubGVhZikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5sZWFmLnBpbm5lZCkgcmV0dXJuIG5ldyBOb3RpY2UoXCJQaW5uZWQgcGFuZTogdW5waW4gYmVmb3JlIGdvaW5nIGZvcndhcmQgb3IgYmFja1wiKSwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5sZWFmLndvcmtpbmcpIHJldHVybiBuZXcgTm90aWNlKFwiUGFuZSBpcyBidXN5OiBwbGVhc2Ugd2FpdCBiZWZvcmUgbmF2aWdhdGluZyBmdXJ0aGVyXCIpLCB1bmRlZmluZWQ7XG4gICAgICAgIHBvcyA9IHRoaXMucG9zID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocG9zLCB0aGlzLnN0YWNrLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgdGhpcy5zdGFja1twb3NdPy5nbyh0aGlzLmxlYWYpO1xuICAgICAgICB0aGlzLmxlYWYuYXBwPy53b3Jrc3BhY2U/LnRyaWdnZXIoXCJwYW5lLXJlbGllZjp1cGRhdGUtaGlzdG9yeVwiLCB0aGlzLmxlYWYsIHRoaXMpO1xuICAgIH1cblxuICAgIGdvKGJ5LCBmb3JjZSkge1xuICAgICAgICBpZiAoIXRoaXMubGVhZiB8fCAhYnkpIHJldHVybjsgIC8vIG5vLW9wXG4gICAgICAgIC8vIHByZXZlbnQgd3JhcGFyb3VuZFxuICAgICAgICBjb25zdCBuZXdQb3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnBvcyAtIGJ5LCB0aGlzLnN0YWNrLmxlbmd0aCAtIDEpKTtcbiAgICAgICAgaWYgKGZvcmNlIHx8IG5ld1BvcyAhPT0gdGhpcy5wb3MpIHtcbiAgICAgICAgICAgIHRoaXMuZ290byhuZXdQb3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3IE5vdGljZShgTm8gbW9yZSAke2J5IDwgMCA/IFwiYmFja1wiIDogXCJmb3J3YXJkXCJ9IGhpc3RvcnkgZm9yIHBhbmVgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlcGxhY2VTdGF0ZShyYXdTdGF0ZSwgdGl0bGUsIHVybCl7XG4gICAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5zdGFja1t0aGlzLnBvc107XG4gICAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhY2tbdGhpcy5wb3NdID0gbmV3IEhpc3RvcnlFbnRyeShyYXdTdGF0ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWVudHJ5LnJlcGxhY2VTdGF0ZShyYXdTdGF0ZSkpIHtcbiAgICAgICAgICAgIC8vIHJlcGxhY2VTdGF0ZSB3YXMgZXJyb25lb3VzbHkgY2FsbGVkIHdpdGggYSBuZXcgZmlsZSBmb3IgdGhlIHNhbWUgbGVhZjtcbiAgICAgICAgICAgIC8vIGZvcmNlIGEgcHVzaFN0YXRlIGluc3RlYWQgKGZpeGVzIHRoZSBpc3N1ZSByZXBvcnRlZCBoZXJlOiBodHRwczovL2ZvcnVtLm9ic2lkaWFuLm1kL3QvMTg1MTgpXG4gICAgICAgICAgICB0aGlzLnB1c2hTdGF0ZShyYXdTdGF0ZSwgdGl0bGUsIHVybCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoU3RhdGUocmF3U3RhdGUsIHRpdGxlLCB1cmwpICAge1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwicHVzaGluZ1wiLCByYXdTdGF0ZSlcbiAgICAgICAgdGhpcy5zdGFjay5zcGxpY2UoMCwgdGhpcy5wb3MsIG5ldyBIaXN0b3J5RW50cnkocmF3U3RhdGUpKTtcbiAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICAvLyBMaW1pdCBcImJhY2tcIiB0byAyMFxuICAgICAgICB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGggPiAyMCkgdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgdGhpcy5sZWFmLmFwcD8ud29ya3NwYWNlPy50cmlnZ2VyKFwicGFuZS1yZWxpZWY6dXBkYXRlLWhpc3RvcnlcIiwgdGhpcy5sZWFmLCB0aGlzKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGxIaXN0b3J5KHBsdWdpbikge1xuXG4gICAgY29uc3QgYXBwID0gcGx1Z2luLmFwcDtcblxuICAgIC8vIE1vbmtleXBhdGNoOiBpbmNsdWRlIGhpc3RvcnkgaW4gbGVhZiBzZXJpYWxpemF0aW9uIChzbyBpdCdzIHBlcnNpc3RlZCB3aXRoIHRoZSB3b3Jrc3BhY2UpXG4gICAgLy8gYW5kIGNoZWNrIGZvciBwb3BzdGF0ZSBldmVudHMgKHRvIHN1cHByZXNzIHRoZW0pXG4gICAgcGx1Z2luLnJlZ2lzdGVyKGFyb3VuZChXb3Jrc3BhY2VMZWFmLnByb3RvdHlwZSwge1xuICAgICAgICBzZXJpYWxpemUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXJpYWxpemUoKXtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9sZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXNbSElTVF9BVFRSXSkgcmVzdWx0W1NFUklBTF9QUk9QXSA9IHRoaXNbSElTVF9BVFRSXS5zZXJpYWxpemUoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH19LFxuICAgICAgICBzZXRWaWV3U3RhdGUob2xkKSB7IHJldHVybiBmdW5jdGlvbiBzZXRWaWV3U3RhdGUodnMsIGVzKXtcbiAgICAgICAgICAgIGlmICh2cy5wb3BzdGF0ZSAmJiB3aW5kb3cuZXZlbnQ/LnR5cGUgPT09IFwicG9wc3RhdGVcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbGQuY2FsbCh0aGlzLCB2cywgZXMpO1xuICAgICAgICB9fVxuICAgIH0pKTtcblxuICAgIHBsdWdpbi5yZWdpc3Rlcihhcm91bmQoYXBwLndvcmtzcGFjZSwge1xuICAgICAgICAvLyBNb25rZXlwYXRjaDogbG9hZCBoaXN0b3J5IGR1cmluZyBsZWFmIGxvYWQsIGlmIHByZXNlbnRcbiAgICAgICAgZGVzZXJpYWxpemVMYXlvdXQob2xkKSB7IHJldHVybiBhc3luYyBmdW5jdGlvbiBkZXNlcmlhbGl6ZUxheW91dChzdGF0ZSwgLi4uZXRjKXtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBvbGQuY2FsbCh0aGlzLCBzdGF0ZSwgLi4uZXRjKTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImxlYWZcIikge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHJ5IGxvYWRpbmcgdGhlIHBhbmUgYXMgYW4gZW1wdHlcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuc3RhdGUudHlwZSA9ICdlbXB0eSc7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IG9sZC5jYWxsKHRoaXMsIHN0YXRlLCAuLi5ldGMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlW1NFUklBTF9QUk9QXSkgcmVzdWx0W0hJU1RfQVRUUl0gPSBuZXcgSGlzdG9yeShyZXN1bHQsIHN0YXRlW1NFUklBTF9QUk9QXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9fSxcbiAgICAgICAgLy8gTW9ua2V5cGF0Y2g6IGtlZXAgT2JzaWRpYW4gZnJvbSBwdXNoaW5nIGhpc3RvcnkgaW4gc2V0QWN0aXZlTGVhZlxuICAgICAgICBzZXRBY3RpdmVMZWFmKG9sZCkgeyByZXR1cm4gZnVuY3Rpb24gc2V0QWN0aXZlTGVhZihsZWFmLCAuLi5ldGMpIHtcbiAgICAgICAgICAgIGNvbnN0IHVuc3ViID0gYXJvdW5kKHRoaXMsIHtcbiAgICAgICAgICAgICAgICByZWNvcmRIaXN0b3J5KG9sZCkgeyByZXR1cm4gZnVuY3Rpb24gKGxlYWYsIF9wdXNoLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFsd2F5cyB1cGRhdGUgc3RhdGUgaW4gcGxhY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5jYWxsKHRoaXMsIGxlYWYsIGZhbHNlLCAuLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9OyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZC5jYWxsKHRoaXMsIGxlYWYsIC4uLmV0Yyk7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHVuc3ViKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH19LFxuICAgIH0pKTtcblxuICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgbW91c2UgaGlzdG9yeSBiZWhhdmlvci4gIFdlIG5lZWQgdGhpcyBiZWNhdXNlIDEpIEVsZWN0cm9uIHdpbGwgdXNlIHRoZSBidWlsdC1pblxuICAgIC8vIGhpc3Rvcnkgb2JqZWN0IGlmIHdlIGRvbid0IChpbnN0ZWFkIG9mIG91ciB3cmFwcGVyKSwgYW5kIDIpIHdlIHdhbnQgdGhlIGNsaWNrIHRvIGFwcGx5IHRvIHRoZSBsZWFmXG4gICAgLy8gdGhhdCB3YXMgdW5kZXIgdGhlIG1vdXNlLCByYXRoZXIgdGhhbiB3aGljaGV2ZXIgbGVhZiB3YXMgYWN0aXZlLlxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGhpc3RvcnlIYW5kbGVyLCB0cnVlKTtcbiAgICBwbHVnaW4ucmVnaXN0ZXIoKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBoaXN0b3J5SGFuZGxlciwgdHJ1ZSk7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gaGlzdG9yeUhhbmRsZXIoZSkge1xuICAgICAgICBpZiAoZS5idXR0b24gIT09IDMgJiYgZS5idXR0b24gIT09IDQpIHJldHVybjtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBlLnN0b3BQcm9wYWdhdGlvbigpOyAgLy8gcHJldmVudCBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0Lm1hdGNoUGFyZW50KFwiLndvcmtzcGFjZS1sZWFmXCIpO1xuICAgICAgICBpZiAodGFyZ2V0ICYmIGUudHlwZSA9PT0gXCJtb3VzZXVwXCIpIHtcbiAgICAgICAgICAgIGxldCBsZWFmID0gZG9tTGVhdmVzLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFsZWFmKSBhcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobCA9PiBsZWFmID0gKGwuY29udGFpbmVyRWwgPT09IHRhcmdldCkgPyBsIDogbGVhZik7XG4gICAgICAgICAgICBpZiAoIWxlYWYpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSAzKSB7IEhpc3RvcnkuZm9yTGVhZihsZWFmKS5iYWNrKCk7IH1cbiAgICAgICAgICAgIGlmIChlLmJ1dHRvbiA9PSA0KSB7IEhpc3RvcnkuZm9yTGVhZihsZWFmKS5mb3J3YXJkKCk7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUHJveHkgdGhlIHdpbmRvdyBoaXN0b3J5IHdpdGggYSB3cmFwcGVyIHRoYXQgZGVsZWdhdGVzIHRvIHRoZSBhY3RpdmUgbGVhZidzIEhpc3Rvcnkgb2JqZWN0LFxuICAgIGNvbnN0IHJlYWxIaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gICAgcGx1Z2luLnJlZ2lzdGVyKCgpID0+IHdpbmRvdy5oaXN0b3J5ID0gcmVhbEhpc3RvcnkpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3csIFwiaGlzdG9yeVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUsIHZhbHVlOiB7XG4gICAgICAgIGdldCBzdGF0ZSgpICAgICAgeyByZXR1cm4gSGlzdG9yeS5jdXJyZW50KGFwcCkuc3RhdGU7IH0sXG4gICAgICAgIGdldCBsZW5ndGgoKSAgICAgeyByZXR1cm4gSGlzdG9yeS5jdXJyZW50KGFwcCkubGVuZ3RoOyB9LFxuXG4gICAgICAgIGJhY2soKSAgICB7IHRoaXMuZ28oLTEpOyB9LFxuICAgICAgICBmb3J3YXJkKCkgeyB0aGlzLmdvKCAxKTsgfSxcbiAgICAgICAgZ28oYnkpICAgIHsgSGlzdG9yeS5jdXJyZW50KGFwcCkuZ28oYnkpOyB9LFxuXG4gICAgICAgIHJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCl7IEhpc3RvcnkuY3VycmVudChhcHApLnJlcGxhY2VTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCk7IH0sXG4gICAgICAgIHB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCkgICB7IEhpc3RvcnkuY3VycmVudChhcHApLnB1c2hTdGF0ZShzdGF0ZSwgdGl0bGUsIHVybCk7IH0sXG5cbiAgICAgICAgZ2V0IHNjcm9sbFJlc3RvcmF0aW9uKCkgICAgeyByZXR1cm4gcmVhbEhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb247IH0sXG4gICAgICAgIHNldCBzY3JvbGxSZXN0b3JhdGlvbih2YWwpIHsgcmVhbEhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSB2YWw7IH0sXG4gICAgfX0pO1xuXG59XG4iLCJpbXBvcnQge01lbnUsIEtleW1hcCwgQ29tcG9uZW50fSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge0hpc3Rvcnl9IGZyb20gXCIuL0hpc3RvcnlcIjtcblxuY29uc3Qgdmlld3R5cGVJY29ucyA9IHtcbiAgICBtYXJrZG93bjogXCJkb2N1bWVudFwiLFxuICAgIGltYWdlOiBcImltYWdlLWZpbGVcIixcbiAgICBhdWRpbzogXCJhdWRpby1maWxlXCIsXG4gICAgdmlkZW86IFwiYXVkaW8tZmlsZVwiLFxuICAgIHBkZjogXCJwZGYtZmlsZVwiLFxuICAgIGxvY2FsZ3JhcGg6IFwiZG90LW5ldHdvcmtcIixcbiAgICBvdXRsaW5lOiBcImJ1bGxldC1saXN0XCIsXG4gICAgYmFja2xpbms6IFwibGlua1wiLFxuXG4gICAgLy8gdGhpcmQtcGFydHkgcGx1Z2luc1xuICAgIGthbmJhbjogXCJibG9ja3NcIixcbiAgICBleGNhbGlkcmF3OiBcImV4Y2FsaWRyYXctaWNvblwiLFxuICAgIFwibWVkaWEtdmlld1wiOiBcImF1ZGlvLWZpbGVcIixcbn1cblxuY29uc3Qgbm9uRmlsZVZpZXdzID0ge1xuICAgIGdyYXBoOiBbXCJkb3QtbmV0d29ya1wiLCBcIkdyYXBoIFZpZXdcIl0sXG4gICAgXCJmaWxlLWV4cGxvcmVyXCI6IFtcImZvbGRlclwiLCBcIkZpbGUgRXhwbG9yZXJcIl0sXG4gICAgc3RhcnJlZDogW1wic3RhclwiLCBcIlN0YXJyZWQgRmlsZXNcIl0sXG4gICAgdGFnOiBbXCJ0YWdcIiwgXCJUYWdzIFZpZXdcIl0sXG5cbiAgICAvLyB0aGlyZC1wYXJ0eSBwbHVnaW5zXG4gICAgXCJyZWNlbnQtZmlsZXNcIjogW1wiY2xvY2tcIiwgXCJSZWNlbnQgRmlsZXNcIl0sXG4gICAgY2FsZW5kYXI6IFtcImNhbGVuZGFyLXdpdGgtY2hlY2ttYXJrXCIsIFwiQ2FsZW5kYXJcIl0sXG4gICAgZW1wdHk6IFtcImNyb3NzXCIsIFwiTm8gZmlsZVwiXVxufVxuXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBob3ZlclNvdXJjZSA9IFwicGFuZS1yZWxpZWY6aGlzdG9yeS1tZW51XCI7XG5cbiAgICBjb25zdHJ1Y3RvcihwbHVnaW4sIGtpbmQsIGRpcikgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuYXBwID0gcGx1Z2luLmFwcDtcbiAgICAgICAgdGhpcy5raW5kID0ga2luZDtcbiAgICAgICAgdGhpcy5kaXIgPSBkaXI7XG4gICAgfVxuXG4gICAgb25sb2FkKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsID0gZG9jdW1lbnQuYm9keS5maW5kKFxuICAgICAgICAgICAgYC50aXRsZWJhciAudGl0bGViYXItYnV0dG9uLWNvbnRhaW5lci5tb2QtbGVmdCAudGl0bGViYXItYnV0dG9uLm1vZC0ke3RoaXMua2luZH1gXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY291bnQgPSB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZVNwYW4oe3ByZXBlbmQ6IHRoaXMua2luZCA9PT0gXCJiYWNrXCIsIGNsczogXCJoaXN0b3J5LWNvdW50ZXJcIn0pO1xuICAgICAgICB0aGlzLmxlYWYgPSBudWxsO1xuICAgICAgICB0aGlzLmhpc3RvcnkgPSBudWxsO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IFtdO1xuICAgICAgICB0aGlzLm9sZExhYmVsID0gdGhpcy5jb250YWluZXJFbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRG9tRXZlbnQodGhpcy5jb250YWluZXJFbCwgXCJjb250ZXh0bWVudVwiLCB0aGlzLm9wZW5NZW51LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG9udW5sb2FkKCkge1xuICAgICAgICB0aGlzLnNldFRvb2x0aXAodGhpcy5vbGRMYWJlbCk7XG4gICAgICAgIHRoaXMuY291bnQuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRWwudG9nZ2xlQ2xhc3MoXCJtb2QtYWN0aXZlXCIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBzZXRDb3VudChudW0pIHsgdGhpcy5jb3VudC50ZXh0Q29udGVudCA9IG51bSB8fCBcIlwiOyB9XG5cbiAgICBzZXRUb29sdGlwKHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQpIHRoaXMuY29udGFpbmVyRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0ZXh0IHx8IHVuZGVmaW5lZCk7XG4gICAgICAgIGVsc2UgdGhpcy5jb250YWluZXJFbC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xuICAgIH1cblxuICAgIHNldEhpc3RvcnkoaGlzdG9yeSA9IEhpc3RvcnkuY3VycmVudCh0aGlzLmFwcCkpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5ID0gaGlzdG9yeTtcbiAgICAgICAgY29uc3Qgc3RhdGVzID0gdGhpcy5zdGF0ZXMgPSBoaXN0b3J5W3RoaXMuZGlyIDwgMCA/IFwibG9va0JlaGluZFwiIDogXCJsb29rQWhlYWRcIl0uY2FsbChoaXN0b3J5KTtcbiAgICAgICAgdGhpcy5zZXRDb3VudChzdGF0ZXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5zZXRUb29sdGlwKHN0YXRlcy5sZW5ndGggP1xuICAgICAgICAgICAgdGhpcy5vbGRMYWJlbCArIFwiXFxuXCIgKyB0aGlzLmZvcm1hdFN0YXRlKHN0YXRlc1swXSkudGl0bGUgOlxuICAgICAgICAgICAgYE5vICR7dGhpcy5raW5kfSBoaXN0b3J5YFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLnRvZ2dsZUNsYXNzKFwibW9kLWFjdGl2ZVwiLCBzdGF0ZXMubGVuZ3RoID4gMCk7XG4gICAgfVxuXG4gICAgb3Blbk1lbnUoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZXMubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG1lbnUgPSBjcmVhdGVNZW51KHRoaXMuYXBwKTtcbiAgICAgICAgbWVudS5kb20uYWRkQ2xhc3MoXCJwYW5lLXJlbGllZi1oaXN0b3J5LW1lbnVcIik7XG4gICAgICAgIG1lbnUuZG9tLm9uKFwibW91c2Vkb3duXCIsIFwiLm1lbnUtaXRlbVwiLCBlID0+IHtlLnN0b3BQcm9wYWdhdGlvbigpO30sIHRydWUpO1xuICAgICAgICB0aGlzLnN0YXRlcy5tYXAodGhpcy5mb3JtYXRTdGF0ZS5iaW5kKHRoaXMpKS5mb3JFYWNoKFxuICAgICAgICAgICAgKGluZm8sIGlkeCkgPT4gdGhpcy5tZW51SXRlbShpbmZvLCBpZHgsIG1lbnUpXG4gICAgICAgICk7XG4gICAgICAgIG1lbnUuc2hvd0F0UG9zaXRpb24oe3g6IGV2dC5jbGllbnRYLCB5OiBldnQuY2xpZW50WSArIDIwfSk7XG4gICAgICAgIHRoaXMucGx1Z2luLmhpc3RvcnlJc09wZW4gPSB0cnVlO1xuICAgICAgICBtZW51Lm9uSGlkZSgoKSA9PiB7IHRoaXMucGx1Z2luLmhpc3RvcnlJc09wZW4gPSBmYWxzZTsgdGhpcy5wbHVnaW4uZGlzcGxheSgpOyB9KTtcbiAgICB9XG5cbiAgICBtZW51SXRlbShpbmZvLCBpZHgsIG1lbnUpIHtcbiAgICAgICAgY29uc3QgbXkgPSB0aGlzO1xuICAgICAgICBtZW51LmFkZEl0ZW0oaSA9PiB7IGNyZWF0ZUl0ZW0oaSk7IGlmIChpbmZvLmZpbGUpIHNldHVwRmlsZUV2ZW50cyhpLmRvbSk7IH0pO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlSXRlbShpLCBwcmVmaXg9XCJcIikge1xuICAgICAgICAgICAgaS5zZXRJY29uKGluZm8uaWNvbikuc2V0VGl0bGUocHJlZml4ICsgaW5mby50aXRsZSkub25DbGljayhlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaGlzdG9yeSA9IG15Lmhpc3Rvcnk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGN0cmwvY21kL21pZGRsZSBidXR0b24gYW5kIHNwbGl0IGxlYWYgKyBjb3B5IGhpc3RvcnlcbiAgICAgICAgICAgICAgICBpZiAoS2V5bWFwLmlzTW9kaWZpZXIoZSwgXCJNb2RcIikgfHwgMSA9PT0gZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeSA9IGhpc3RvcnkuY2xvbmVUbyhteS5hcHAud29ya3NwYWNlLnNwbGl0QWN0aXZlTGVhZigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5nbygoaWR4KzEpICogbXkuZGlyLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBGaWxlRXZlbnRzKGRvbSkge1xuICAgICAgICAgICAgLy8gSG92ZXIgcHJldmlld1xuICAgICAgICAgICAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGUgPT4ge1xuICAgICAgICAgICAgICAgIG15LmFwcC53b3Jrc3BhY2UudHJpZ2dlcignaG92ZXItbGluaycsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGUsIHNvdXJjZTogTmF2aWdhdG9yLmhvdmVyU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBob3ZlclBhcmVudDogbWVudS5kb20sIHRhcmdldEVsOiBkb20sIGxpbmt0ZXh0OiBpbmZvLmZpbGUucGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIERyYWcgbWVudSBpdGVtIHRvIG1vdmUgb3IgbGluayBmaWxlXG4gICAgICAgICAgICBkb20uc2V0QXR0cignZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkcmFnTWFuYWdlciA9IG15LmFwcC5kcmFnTWFuYWdlcjtcbiAgICAgICAgICAgICAgICBjb25zdCBkcmFnRGF0YSA9IGRyYWdNYW5hZ2VyLmRyYWdGaWxlKGUsIGluZm8uZmlsZSk7XG4gICAgICAgICAgICAgICAgZHJhZ01hbmFnZXIub25EcmFnU3RhcnQoZSwgZHJhZ0RhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGUgPT4gbWVudS5oaWRlKCkpO1xuXG4gICAgICAgICAgICAvLyBGaWxlIG1lbnVcbiAgICAgICAgICAgIGRvbS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVudSA9IGNyZWF0ZU1lbnUobXkuYXBwKTtcbiAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oaSA9PiBjcmVhdGVJdGVtKGksIGBHbyAke215LmtpbmR9IHRvIGApKS5hZGRTZXBhcmF0b3IoKTtcbiAgICAgICAgICAgICAgICBteS5hcHAud29ya3NwYWNlLnRyaWdnZXIoXG4gICAgICAgICAgICAgICAgICAgIFwiZmlsZS1tZW51XCIsIG1lbnUsIGluZm8uZmlsZSwgXCJsaW5rLWNvbnRleHQtbWVudVwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBtZW51LnNob3dBdFBvc2l0aW9uKHt4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WX0pO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7IC8vIGtlZXAgdGhlIHBhcmVudCBtZW51IG9wZW4gZm9yIG5vd1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3JtYXRTdGF0ZShlbnRyeSkge1xuICAgICAgICBjb25zdCB7dmlld1N0YXRlOiB7dHlwZSwgc3RhdGV9LCBlU3RhdGUsIHBhdGh9ID0gZW50cnk7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBwYXRoICYmIHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXRoKTtcbiAgICAgICAgY29uc3QgaW5mbyA9IHtpY29uOiBcIlwiLCB0aXRsZTogXCJcIiwgZmlsZSwgdHlwZSwgc3RhdGUsIGVTdGF0ZX07XG5cbiAgICAgICAgaWYgKG5vbkZpbGVWaWV3c1t0eXBlXSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBub25GaWxlVmlld3NbdHlwZV07XG4gICAgICAgIH0gZWxzZSBpZiAocGF0aCAmJiAhZmlsZSkge1xuICAgICAgICAgICAgW2luZm8uaWNvbiwgaW5mby50aXRsZV0gPSBbXCJ0cmFzaFwiLCBcIk1pc3NpbmcgZmlsZSBcIitwYXRoXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZm8uaWNvbiA9IHZpZXd0eXBlSWNvbnNbdHlwZV0gPz8gXCJkb2N1bWVudFwiO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwibWFya2Rvd25cIiAmJiBzdGF0ZS5tb2RlID09PSBcInByZXZpZXdcIikgaW5mby5pY29uID0gXCJsaW5lcy1vZi10ZXh0XCI7XG4gICAgICAgICAgICBpbmZvLnRpdGxlID0gZmlsZSA/IGZpbGUuYmFzZW5hbWUgKyAoZmlsZS5leHRlbnNpb24gIT09IFwibWRcIiA/IFwiLlwiK2ZpbGUuZXh0ZW5zaW9uIDogXCJcIikgOiBcIk5vIGZpbGVcIjtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm1lZGlhLXZpZXdcIiAmJiAhZmlsZSkgaW5mby50aXRsZSA9IHN0YXRlLmluZm8/LmZpbGVuYW1lID8/IGluZm8udGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UudHJpZ2dlcihcInBhbmUtcmVsaWVmOmZvcm1hdC1oaXN0b3J5LWl0ZW1cIiwgaW5mbyk7XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uRWxlbWVudChlbCwgZXZlbnQsIHNlbGVjdG9yLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGVsLm9uKGV2ZW50LCBzZWxlY3RvciwgY2FsbGJhY2ssIG9wdGlvbnMpXG4gICAgcmV0dXJuICgpID0+IGVsLm9mZihldmVudCwgc2VsZWN0b3IsIGNhbGxiYWNrLCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTWVudShhcHApIHtcbiAgICBjb25zdCBtZW51ID0gbmV3IE1lbnUoYXBwKTtcbiAgICBtZW51LnJlZ2lzdGVyKFxuICAgICAgICAvLyBYWFggdGhpcyByZWFsbHkgc2hvdWxkIGJlIGEgc2NvcGUgcHVzaFxuICAgICAgICBvbkVsZW1lbnQoZG9jdW1lbnQsIFwia2V5ZG93blwiLCBcIipcIiwgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXk9PT1cIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgbWVudS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtjYXB0dXJlOiB0cnVlfSlcbiAgICApO1xuICAgIHJldHVybiBtZW51O1xufSIsImltcG9ydCB7IGFyb3VuZCB9IGZyb20gJ21vbmtleS1hcm91bmQnO1xuaW1wb3J0IHtQbHVnaW4sIFRGaWxlLCBXb3Jrc3BhY2VMZWFmfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQge2FkZENvbW1hbmRzLCBjb21tYW5kfSBmcm9tIFwiLi9jb21tYW5kc1wiO1xuaW1wb3J0IHtIaXN0b3J5LCBpbnN0YWxsSGlzdG9yeX0gZnJvbSBcIi4vSGlzdG9yeVwiO1xuaW1wb3J0IHtOYXZpZ2F0b3IsIG9uRWxlbWVudH0gZnJvbSBcIi4vTmF2aWdhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVSZWxpZWYgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gICAgb25sb2FkKCkge1xuICAgICAgICBpbnN0YWxsSGlzdG9yeSh0aGlzKTtcbiAgICAgICAgdGhpcy5sZWFmTWFwID0gbmV3IFdlYWtNYXAoKTtcblxuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UucmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2UoTmF2aWdhdG9yLmhvdmVyU291cmNlLCB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnSGlzdG9yeSBkcm9wZG93bnMnLCBkZWZhdWx0TW9kOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldHVwRGlzcGxheSgpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLnZhdWx0Lm9uKFwicmVuYW1lXCIsIChmaWxlLCBvbGRQYXRoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkgdGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMoXG4gICAgICAgICAgICAgICAgICAgIGxlYWYgPT4gSGlzdG9yeS5mb3JMZWFmKGxlYWYpLm9uUmVuYW1lKGZpbGUsIG9sZFBhdGgpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJwYW5lLXJlbGllZjp1cGRhdGUtaGlzdG9yeVwiLCAobGVhZiwgaGlzdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGVhZihsZWFmKTtcbiAgICAgICAgICAgICAgICBpZiAobGVhZiA9PT0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpIHRoaXMuZGlzcGxheShoaXN0b3J5KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJhY3RpdmUtbGVhZi1jaGFuZ2VcIiwgbGVhZiA9PiB0aGlzLmRpc3BsYXkoSGlzdG9yeS5mb3JMZWFmKGxlYWYpKSkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmKSB0aGlzLmRpc3BsYXkoSGlzdG9yeS5mb3JMZWFmKHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmKSk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKFwibGF5b3V0LWNoYW5nZVwiLCB0aGlzLm51bWJlclBhbmVzLCB0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLm51bWJlclBhbmVzKCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKFxuICAgICAgICAgICAgICAgIG9uRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keSwgXCJjb250ZXh0bWVudVwiLCBcIi52aWV3LWhlYWRlciA+IC52aWV3LWFjdGlvbnMgPiAudmlldy1hY3Rpb25cIiwgKGV2dCwgdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuYXYgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRhcmdldC5tYXRjaGVzKCdbY2xhc3MqPVwiIGFwcDpnby1mb3J3YXJkXCJdJykgJiYgdGhpcy5mb3J3YXJkKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0YXJnZXQubWF0Y2hlcygnW2NsYXNzKj1cIiBhcHA6Z28tYmFja1wiXScpICAgICYmIHRoaXMuYmFjaylcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hdikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVhZiA9IHRoaXMubGVhZk1hcC5nZXQodGFyZ2V0Lm1hdGNoUGFyZW50KFwiLndvcmtzcGFjZS1sZWFmXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGVhZikgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5KEhpc3RvcnkuZm9yTGVhZihsZWFmKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYub3Blbk1lbnUoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCB7Y2FwdHVyZTogdHJ1ZX1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyKGFyb3VuZChXb3Jrc3BhY2VMZWFmLnByb3RvdHlwZSwge1xuICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL29ic2lkaWFubWQvb2JzaWRpYW4tYXBpL2lzc3Vlcy80N1xuICAgICAgICAgICAgc2V0RXBoZW1lcmFsU3RhdGUob2xkKSB7IHJldHVybiBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlPy5mb2N1cykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7YWN0aXZlRWxlbWVudH0gPSBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlICYmICF0aGlzLmNvbnRhaW5lckVsLmNvbnRhaW5zKGFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50LmJsdXI/LigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvbGQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgYWRkQ29tbWFuZHModGhpcywge1xuICAgICAgICAgICAgW2NvbW1hbmQoXCJzd2FwLXByZXZcIiwgXCJTd2FwIHBhbmUgd2l0aCBwcmV2aW91cyBpbiBzcGxpdFwiLCAgXCJNb2QrU2hpZnQrUGFnZVVwXCIpXSAgICgpeyByZXR1cm4gdGhpcy5sZWFmUGxhY2VyKC0xKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwic3dhcC1uZXh0XCIsIFwiU3dhcCBwYW5lIHdpdGggbmV4dCBpbiBzcGxpdFwiLCAgICAgIFwiTW9kK1NoaWZ0K1BhZ2VEb3duXCIpXSAoKXsgcmV0dXJuIHRoaXMubGVhZlBsYWNlciggMSk7IH0sXG5cbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tcHJldlwiLCAgXCJDeWNsZSB0byBwcmV2aW91cyB3b3Jrc3BhY2UgcGFuZVwiLCAgIFwiTW9kK1BhZ2VVcFwiICApXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKC0xLCB0cnVlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tbmV4dFwiLCAgXCJDeWNsZSB0byBuZXh0IHdvcmtzcGFjZSBwYW5lXCIsICAgICAgIFwiTW9kK1BhZ2VEb3duXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKCAxLCB0cnVlKTsgfSxcblxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby0xc3RcIiwgICBcIkp1bXAgdG8gMXN0IHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrMVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigwKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tMm5kXCIsICAgXCJKdW1wIHRvIDJuZCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzJcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoMSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTNyZFwiLCAgIFwiSnVtcCB0byAzcmQgcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCszXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDIpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby00dGhcIiwgICBcIkp1bXAgdG8gNHRoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrNFwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZigzKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tNXRoXCIsICAgXCJKdW1wIHRvIDV0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzVcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoNCk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLTZ0aFwiLCAgIFwiSnVtcCB0byA2dGggcGFuZSBpbiB0aGUgd29ya3NwYWNlXCIsICBcIkFsdCs2XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDUpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJnby03dGhcIiwgICBcIkp1bXAgdG8gN3RoIHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCAgXCJBbHQrN1wiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5nb3RvTnRoTGVhZig2KTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwiZ28tOHRoXCIsICAgXCJKdW1wIHRvIDh0aCBwYW5lIGluIHRoZSB3b3Jrc3BhY2VcIiwgIFwiQWx0KzhcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMuZ290b050aExlYWYoNyk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcImdvLWxhc3RcIiwgIFwiSnVtcCB0byBsYXN0IHBhbmUgaW4gdGhlIHdvcmtzcGFjZVwiLCBcIkFsdCs5XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLmdvdG9OdGhMZWFmKDk5OTk5OTk5KTsgfSxcblxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtMXN0XCIsICBcIlBsYWNlIGFzIDFzdCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzFcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDAsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTJuZFwiLCAgXCJQbGFjZSBhcyAybmQgcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCsyXCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZigxLCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC0zcmRcIiwgIFwiUGxhY2UgYXMgM3JkIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrM1wiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoMiwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtNHRoXCIsICBcIlBsYWNlIGFzIDR0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzRcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDMsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTV0aFwiLCAgXCJQbGFjZSBhcyA1dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs1XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig0LCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC02dGhcIiwgIFwiUGxhY2UgYXMgNnRoIHBhbmUgaW4gdGhlIHNwbGl0XCIsICAgICBcIk1vZCtBbHQrNlwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoNSwgZmFsc2UpOyB9LFxuICAgICAgICAgICAgW2NvbW1hbmQoXCJwdXQtN3RoXCIsICBcIlBsYWNlIGFzIDd0aCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICAgXCJNb2QrQWx0KzdcIildICgpIHsgcmV0dXJuICgpID0+IHRoaXMucGxhY2VMZWFmKDYsIGZhbHNlKTsgfSxcbiAgICAgICAgICAgIFtjb21tYW5kKFwicHV0LTh0aFwiLCAgXCJQbGFjZSBhcyA4dGggcGFuZSBpbiB0aGUgc3BsaXRcIiwgICAgIFwiTW9kK0FsdCs4XCIpXSAoKSB7IHJldHVybiAoKSA9PiB0aGlzLnBsYWNlTGVhZig3LCBmYWxzZSk7IH0sXG4gICAgICAgICAgICBbY29tbWFuZChcInB1dC1sYXN0XCIsIFwiUGxhY2UgYXMgbGFzdCBwYW5lIGluIHRoZSBzcGxpdFwiLCAgICBcIk1vZCtBbHQrOVwiKV0gKCkgeyByZXR1cm4gKCkgPT4gdGhpcy5wbGFjZUxlYWYoOTk5OTk5OTksIGZhbHNlKTsgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXR1cERpc3BsYXkoKSB7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5iYWNrICAgID0gbmV3IE5hdmlnYXRvcih0aGlzLCBcImJhY2tcIiwgLTEpKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZvcndhcmQgPSBuZXcgTmF2aWdhdG9yKHRoaXMsIFwiZm9yd2FyZFwiLCAxKSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRvIHRydWUgd2hpbGUgZWl0aGVyIG1lbnUgaXMgb3Blbiwgc28gd2UgZG9uJ3Qgc3dpdGNoIGl0IG91dFxuICAgIGhpc3RvcnlJc09wZW4gPSBmYWxzZTtcblxuICAgIGRpc3BsYXkoaGlzdG9yeSA9IEhpc3RvcnkuZm9yTGVhZih0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZikpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlzdG9yeUlzT3BlbikgcmV0dXJuO1xuICAgICAgICB0aGlzLmJhY2suc2V0SGlzdG9yeShoaXN0b3J5KTtcbiAgICAgICAgdGhpcy5mb3J3YXJkLnNldEhpc3RvcnkoaGlzdG9yeSk7XG4gICAgfVxuXG4gICAgaXRlcmF0ZVJvb3RMZWF2ZXMoY2IpIHtcbiAgICAgICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlUm9vdExlYXZlcyhjYikpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIFN1cHBvcnQgSG92ZXIgRWRpdG9yc1xuICAgICAgICBjb25zdCBwb3BvdmVycyA9IHRoaXMuYXBwLnBsdWdpbnMucGx1Z2luc1tcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiXT8uYWN0aXZlUG9wb3ZlcnM7XG4gICAgICAgIGlmIChwb3BvdmVycykgZm9yIChjb25zdCBwb3BvdmVyIG9mIHBvcG92ZXJzKSB7XG4gICAgICAgICAgICAvLyBNb3JlIHJlY2VudCBwbHVnaW46IHdlIGNhbiBza2lwIHRoZSBzY2FuXG4gICAgICAgICAgICBpZiAocG9wb3Zlci5jb25zdHJ1Y3Rvci5pdGVyYXRlUG9wb3ZlckxlYXZlcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHBvcG92ZXIubGVhZiAmJiBjYihwb3BvdmVyLmxlYWYpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwb3BvdmVyLnJvb3RTcGxpdCAmJiB0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUxlYXZlcyhjYiwgcG9wb3Zlci5yb290U3BsaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGVMZWFmKGxlYWYpIHtcbiAgICAgICAgY29uc3QgaGlzdG9yeSA9IEhpc3RvcnkuZm9yTGVhZihsZWFmKTtcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtZm9yd2FyZC1jb3VudFwiLCAnXCInKyhoaXN0b3J5Lmxvb2tBaGVhZCgpLmxlbmd0aCB8fCBcIlwiKSsnXCInKTtcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtYmFja3dhcmQtY291bnRcIiwgJ1wiJysoaGlzdG9yeS5sb29rQmVoaW5kKCkubGVuZ3RoIHx8IFwiXCIpKydcIicpO1xuICAgICAgICB0aGlzLmxlYWZNYXAuc2V0KGxlYWYuY29udGFpbmVyRWwsIGxlYWYpO1xuICAgIH1cblxuICAgIG51bWJlclBhbmVzKCkge1xuICAgICAgICBsZXQgY291bnQgPSAwLCBsYXN0TGVhZiA9IG51bGw7XG4gICAgICAgIHRoaXMuaXRlcmF0ZVJvb3RMZWF2ZXMobGVhZiA9PiB7XG4gICAgICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnNldFByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1sYWJlbFwiLCArK2NvdW50IDwgOSA/IGNvdW50IDogXCJcIik7XG4gICAgICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnRvZ2dsZUNsYXNzKFwiaGFzLXBhbmUtcmVsaWVmLWxhYmVsXCIsIGNvdW50PDkpO1xuICAgICAgICAgICAgbGFzdExlYWYgPSBsZWFmO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNvdW50PjgpIHtcbiAgICAgICAgICAgIGxhc3RMZWFmPy5jb250YWluZXJFbC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tcGFuZS1yZWxpZWYtbGFiZWxcIiwgXCI5XCIpO1xuICAgICAgICAgICAgbGFzdExlYWY/LmNvbnRhaW5lckVsLnRvZ2dsZUNsYXNzKFwiaGFzLXBhbmUtcmVsaWVmLWxhYmVsXCIsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKGxlYWYgPT4gdGhpcy51cGRhdGVMZWFmKGxlYWYpKTtcbiAgICB9XG5cbiAgICBvbnVubG9hZCgpIHtcbiAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnVucmVnaXN0ZXJIb3ZlckxpbmtTb3VyY2UoTmF2aWdhdG9yLmhvdmVyU291cmNlKTtcbiAgICAgICAgdGhpcy5pdGVyYXRlUm9vdExlYXZlcyhsZWFmID0+IHtcbiAgICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWxhYmVsXCIpO1xuICAgICAgICAgICAgbGVhZi5jb250YWluZXJFbC50b2dnbGVDbGFzcyhcImhhcy1wYW5lLXJlbGllZi1sYWJlbFwiLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhsZWFmID0+IHtcbiAgICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCItLXBhbmUtcmVsaWVmLWZvcndhcmQtY291bnRcIik7XG4gICAgICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiLS1wYW5lLXJlbGllZi1iYWNrd2FyZC1jb3VudFwiKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnb3RvTnRoTGVhZihuLCByZWxhdGl2ZSkge1xuICAgICAgICBjb25zdCBsZWF2ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pdGVyYXRlUm9vdExlYXZlcygobGVhZikgPT4gKGxlYXZlcy5wdXNoKGxlYWYpLCBmYWxzZSkpO1xuICAgICAgICBpZiAocmVsYXRpdmUpIHtcbiAgICAgICAgICAgIG4gKz0gbGVhdmVzLmluZGV4T2YodGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYpO1xuICAgICAgICAgICAgbiA9IChuICsgbGVhdmVzLmxlbmd0aCkgJSBsZWF2ZXMubGVuZ3RoOyAgLy8gd3JhcCBhcm91bmRcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZWFmID0gbGVhdmVzW24+PWxlYXZlcy5sZW5ndGggPyBsZWF2ZXMubGVuZ3RoLTEgOiBuXTtcbiAgICAgICAgIWxlYWYgfHwgdGhpcy5hcHAud29ya3NwYWNlLnNldEFjdGl2ZUxlYWYobGVhZiwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGxhY2VMZWFmKHRvUG9zLCByZWxhdGl2ZT10cnVlKSB7XG4gICAgICAgIGNvbnN0IGNiID0gdGhpcy5sZWFmUGxhY2VyKHRvUG9zLCByZWxhdGl2ZSk7XG4gICAgICAgIGlmIChjYikgY2IoKTtcbiAgICB9XG5cbiAgICBsZWFmUGxhY2VyKHRvUG9zLCByZWxhdGl2ZT10cnVlKSB7XG4gICAgICAgIGNvbnN0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgaWYgKCFsZWFmKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgY29uc3RcbiAgICAgICAgICAgIHBhcmVudFNwbGl0ID0gbGVhZi5wYXJlbnRTcGxpdCxcbiAgICAgICAgICAgIGNoaWxkcmVuID0gcGFyZW50U3BsaXQuY2hpbGRyZW4sXG4gICAgICAgICAgICBmcm9tUG9zID0gY2hpbGRyZW4uaW5kZXhPZihsZWFmKVxuICAgICAgICA7XG4gICAgICAgIGlmIChmcm9tUG9zID09IC0xKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKHJlbGF0aXZlKSB7XG4gICAgICAgICAgICB0b1BvcyArPSBmcm9tUG9zO1xuICAgICAgICAgICAgaWYgKHRvUG9zIDwgMCB8fCB0b1BvcyA+PSBjaGlsZHJlbi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b1BvcyA+PSBjaGlsZHJlbi5sZW5ndGgpIHRvUG9zID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0b1BvcyA8IDApIHRvUG9zID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tUG9zID09IHRvUG9zKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG90aGVyID0gY2hpbGRyZW5bdG9Qb3NdO1xuICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKGZyb21Qb3MsIDEpO1xuICAgICAgICAgICAgY2hpbGRyZW4uc3BsaWNlKHRvUG9zLCAgIDAsIGxlYWYpO1xuICAgICAgICAgICAgaWYgKHBhcmVudFNwbGl0LnNlbGVjdFRhYikge1xuICAgICAgICAgICAgICAgIHBhcmVudFNwbGl0LnNlbGVjdFRhYihsZWFmKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb3RoZXIuY29udGFpbmVyRWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGZyb21Qb3MgPiB0b1BvcyA/IFwiYmVmb3JlYmVnaW5cIiA6IFwiYWZ0ZXJlbmRcIiwgbGVhZi5jb250YWluZXJFbCk7XG4gICAgICAgICAgICAgICAgcGFyZW50U3BsaXQucmVjb21wdXRlQ2hpbGRyZW5EaW1lbnNpb25zKCk7XG4gICAgICAgICAgICAgICAgbGVhZi5vblJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dENoYW5nZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gRm9yY2UgZm9jdXMgYmFjayB0byBwYW5lO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihsZWFmLCBmYWxzZSwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl0sIm5hbWVzIjpbIk5vdGljZSIsIldvcmtzcGFjZUxlYWYiLCJDb21wb25lbnQiLCJLZXltYXAiLCJNZW51IiwiUGx1Z2luIiwiVEZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO0FBQ3ZDLElBQUksTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUYsSUFBSSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDN0YsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFO0FBQzdDLElBQUksTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxD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QUFLLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0UsS0FBSztBQUNMO0FBQ0EsSUFBSSxTQUFTLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzlFO0FBQ0EsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFO0FBQzdELElBQUksSUFBSSxNQUFNLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDOUM7QUFDQSxJQUFJLElBQUksTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzlCLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzlCO0FBQ0EsSUFBSSxTQUFTLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtBQUNuRSxJQUFJLFVBQVUsR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pEO0FBQ0EsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ2QsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPO0FBQy9CLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLElB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QUFDLFlBQVksQ0FBQyxDQUFDO0FBQzVELEtBQUs7QUFDTDtBQUNBLElBQUksVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwRCxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQy9CLFFBQVEsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTTtBQUNyQyxZQUFZLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUNwRSxZQUFZLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3JDLFNBQVMsQ0FBQztBQUNWLFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEUsS0FBSztBQUNMO0FBQ0EsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ2xCLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU87QUFDeEMsUUFBUSxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUN0RCxRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxD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SSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pILFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ2hJO0FBQ0EsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLE1BQU0sV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xJLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLGdDQUFnQyxNQUFNLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNsSSxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxnQ0FBZ0MsTUFBTSxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbEksWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLE1BQU0sV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xJLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLGdDQUFnQyxNQUFNLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNsSSxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxnQ0FBZ0MsTUFBTSxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbEksWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsZ0NBQWdDLE1BQU0sV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxD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
