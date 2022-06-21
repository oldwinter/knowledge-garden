'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var SlidingPanesSettings = /** @class */ (function () {
    function SlidingPanesSettings() {
        this.headerWidth = 32;
        this.leafDesktopWidth = 700;
        this.leafMobileWidth = 350;
        this.leafAutoWidth = false;
        this.disabled = false;
        this.rotateHeaders = true;
        this.headerAlt = false;
        this.orienation = "mixed";
        this.stackingEnabled = true;
        this.smoothAnimation = true;
    }
    return SlidingPanesSettings;
}());
var SlidingPanesSettingTab = /** @class */ (function (_super) {
    __extends(SlidingPanesSettingTab, _super);
    function SlidingPanesSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SlidingPanesSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Toggle Sliding Panes")
            .setDesc("Turns sliding panes on or off globally")
            .addToggle(function (toggle) { return toggle.setValue(!_this.plugin.settings.disabled)
            .onChange(function (value) {
            _this.plugin.settings.disabled = !value;
            _this.plugin.saveData(_this.plugin.settings);
            if (_this.plugin.settings.disabled) {
                _this.plugin.disable();
            }
            else {
                _this.plugin.enable();
            }
        }); });
        new obsidian.Setting(containerEl)
            .setName('Smooth Animation')
            .setDesc('Whether to use smooth animation (on) or snapping (off)')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.smoothAnimation)
            .onChange(function (value) {
            _this.plugin.settings.smoothAnimation = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Auto Width')
            .setDesc('If on, the width of the pane should fill the available space')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.leafAutoWidth)
            .onChange(function (value) {
            _this.plugin.settings.leafAutoWidth = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Width on Desktop')
            .setDesc('The width of a single pane (only if auto width is off)')
            .addText(function (text) { return text.setPlaceholder('Example: 700')
            .setValue((_this.plugin.settings.leafDesktopWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.leafDesktopWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Width on Mobile')
            .setDesc('The width of a single pane (only if auto width is off)')
            .addText(function (text) { return text.setPlaceholder('Example: 350')
            .setValue((_this.plugin.settings.leafMobileWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.leafMobileWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Toggle rotated headers")
            .setDesc("Rotates headers to use as spines")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.rotateHeaders)
            .onChange(function (value) {
            _this.plugin.settings.rotateHeaders = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Swap rotated header direction")
            .setDesc("Swaps the direction of rotated headers")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.headerAlt)
            .onChange(function (value) {
            _this.plugin.settings.headerAlt = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Header text orientation")
            .setDesc("Select the header text orientation")
            .addDropdown(function (dropdown) {
            dropdown.addOption("sideway", "Sideway");
            dropdown.addOption("mixed", "Mixed");
            dropdown.addOption("upright", "Upright");
            dropdown.setValue(_this.plugin.settings.orienation);
            dropdown.onChange(function (value) {
                _this.plugin.settings.orienation = value;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Toggle stacking")
            .setDesc("Panes will stack up to the left and right")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.stackingEnabled)
            .onChange(function (value) {
            _this.plugin.settings.stackingEnabled = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Spine Width')
            .setDesc('The width of the rotated header (or gap) for stacking')
            .addText(function (text) { return text.setPlaceholder('Example: 32')
            .setValue((_this.plugin.settings.headerWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.headerWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return SlidingPanesSettingTab;
}(obsidian.PluginSettingTab));
var SlidingPanesCommands = /** @class */ (function () {
    function SlidingPanesCommands(plugin) {
        this.plugin = plugin;
    }
    SlidingPanesCommands.prototype.addToggleSettingCommand = function (id, name, settingName) {
        var _this = this;
        this.plugin.addCommand({
            id: id,
            name: name,
            callback: function () {
                // switch the setting, save and refresh
                //@ts-ignore
                _this.plugin.settings[settingName] = !_this.plugin.settings[settingName];
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            }
        });
    };
    SlidingPanesCommands.prototype.addCommands = function () {
        var _this = this;
        // add the toggle on/off command
        this.plugin.addCommand({
            id: 'toggle-sliding-panes',
            name: 'Toggle Sliding Panes',
            callback: function () {
                // switch the disabled setting and save
                _this.plugin.settings.disabled = !_this.plugin.settings.disabled;
                _this.plugin.saveData(_this.plugin.settings);
                // disable or enable as necessary
                _this.plugin.settings.disabled ? _this.plugin.disable() : _this.plugin.enable();
            }
        });
        // add a command to toggle smooth animation
        this.addToggleSettingCommand('toggle-sliding-panes-smooth-animation', 'Toggle Smooth Animation', 'smoothAnimation');
        // add a command to toggle leaf auto width
        this.addToggleSettingCommand('toggle-sliding-panes-leaf-auto-width', 'Toggle Leaf Auto Width', 'leafAutoWidth');
        // add a command to toggle stacking
        this.addToggleSettingCommand('toggle-sliding-panes-stacking', 'Toggle Stacking', 'stackingEnabled');
        // add a command to toggle rotated headers
        this.addToggleSettingCommand('toggle-sliding-panes-rotated-headers', 'Toggle Rotated Headers', 'rotateHeaders');
        // add a command to toggle swapped header direction
        this.addToggleSettingCommand('toggle-sliding-panes-header-alt', 'Swap rotated header direction', 'headerAlt');
    };
    return SlidingPanesCommands;
}());

var PluginBase = /** @class */ (function (_super) {
    __extends(PluginBase, _super);
    function PluginBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // runs when the plugin is loaded
        _this.onload = function () {
            // add in the required command pallete commands
            _this.addCommands();
            // add in any settings
            _this.addSettings();
            // wait for layout to be ready to perform the rest
            _this.app.workspace.onLayoutReady(_this.onLayoutReady);
        };
        // runs when the plugin is onloaded
        _this.onunload = function () {
            // run through the disable steps
            _this.disable();
        };
        // runs once the layout is ready the first time the plugin is started
        _this.onLayoutReady = function () {
            _this.enable();
        };
        // perform any setup required to enable the plugin
        _this.enable = function () {
            document.body.toggleClass(_this.className, true);
        };
        // perform any required disable steps, leave nothing behind
        _this.disable = function () {
            document.body.toggleClass(_this.className, false);
        };
        // add in any required command pallete commands
        _this.addCommands = function () { };
        // add in any settings
        _this.addSettings = function () { };
        return _this;
    }
    Object.defineProperty(PluginBase.prototype, "className", {
        get: function () {
            if (!this._cachedClassName) {
                this._cachedClassName = 'plugin-' + this.manifest.id;
                if (this._cachedClassName.endsWith('-obsidian')) {
                    this._cachedClassName = this._cachedClassName.substring(0, this._cachedClassName.lastIndexOf('-obsidian'));
                }
            }
            return this._cachedClassName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PluginBase.prototype, "rootSplit", {
        // helper property to get the rootSplit with some extra properties
        get: function () { return this.app.workspace.rootSplit; },
        enumerable: false,
        configurable: true
    });
    return PluginBase;
}(obsidian.Plugin));

var SlidingPanesPlugin = /** @class */ (function (_super) {
    __extends(SlidingPanesPlugin, _super);
    function SlidingPanesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // helper variables
        _this.activeLeafIndex = 0;
        _this.prevRootLeaves = [];
        // runs when the plugin is loaded
        _this.onload = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // load settings
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [new SlidingPanesSettings()];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        // load settings
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        // add in the required command pallete commands
                        this.addCommands();
                        // add in any settings
                        this.addSettings();
                        // wait for layout to be ready to perform the rest
                        this.app.workspace.onLayoutReady(this.onLayoutReady);
                        return [2 /*return*/];
                }
            });
        }); };
        // add in any required command pallete commands
        _this.addCommands = function () {
            // add the commands
            new SlidingPanesCommands(_this).addCommands();
        };
        // add in any settings
        _this.addSettings = function () {
            // add the settings tab
            _this.addSettingTab(new SlidingPanesSettingTab(_this.app, _this));
        };
        // enable andy mode
        _this.enable = function () {
            var _a;
            if (!((_a = _this.settings) === null || _a === void 0 ? void 0 : _a.disabled)) {
                // add the event handlers
                _this.registerEvent(_this.app.workspace.on('resize', _this.handleResize));
                _this.registerEvent(_this.app.workspace.on('layout-change', _this.handleLayoutChange));
                _this.registerEvent(_this.app.workspace.on('active-leaf-change', _this.handleActiveLeafChange));
                _this.registerEvent(_this.app.vault.on('delete', _this.handleDelete));
                // wait for layout to be ready to perform the rest
                if (_this.app.workspace.layoutReady)
                    _this.reallyEnable();
            }
        };
        // really enable things (once the layout is ready)
        _this.reallyEnable = function () {
            // we don't need the event handler anymore
            _this.app.workspace.off('layout-ready', _this.reallyEnable);
            // backup the function so I can restore it
            _this.rootSplitAny.oldOnChildResizeStart = _this.rootSplitAny.onChildResizeStart;
            _this.rootSplitAny.onChildResizeStart = _this.onChildResizeStart;
            // add some extra classes that can't fit in the styles.css
            // because they use settings
            _this.addStyle();
            // do all the calucations necessary for the workspace leaves
            _this.recalculateLeaves();
        };
        // shut down andy mode
        _this.disable = function () {
            // get rid of the extra style tag we added
            _this.removeStyle();
            // iterate through the root leaves to remove the stuff we added
            _this.rootLeaves.forEach(_this.clearLeaf);
            // restore the default functionality
            _this.rootSplitAny.onChildResizeStart = _this.rootSplitAny.oldOnChildResizeStart;
        };
        _this.clearLeaf = function (leaf) {
            leaf.containerEl.style.width = null;
            leaf.containerEl.style.left = null;
            leaf.containerEl.style.right = null;
            leaf.containerEl.classList.remove('mod-am-left-of-active');
            leaf.containerEl.classList.remove('mod-am-right-of-active');
            var iconEl = leaf.view.iconEl;
            var iconText = iconEl.getAttribute("aria-label");
            if (iconText.includes("(")) {
                iconEl.setAttribute("aria-label", iconText.substring(iconText.lastIndexOf('(') + 1, iconText.lastIndexOf(')')));
            }
        };
        // refresh funcion for when we change settings
        _this.refresh = function () {
            // re-load the style
            _this.updateStyle();
            // recalculate leaf positions
            _this.recalculateLeaves();
        };
        // remove the stlying elements we've created
        _this.removeStyle = function () {
            var el = document.getElementById('plugin-sliding-panes');
            if (el)
                el.remove();
            document.body.classList.remove('plugin-sliding-panes');
            document.body.classList.remove('plugin-sliding-panes-rotate-header');
            document.body.classList.remove('plugin-sliding-panes-header-alt');
            document.body.classList.remove('plugin-sliding-panes-stacking');
        };
        // add the styling elements we need
        _this.addStyle = function () {
            // add a css block for our settings-dependent styles
            var css = document.createElement('style');
            css.id = 'plugin-sliding-panes';
            document.getElementsByTagName("head")[0].appendChild(css);
            // add the main class
            document.body.classList.add('plugin-sliding-panes');
            // update the style with the settings-dependent styles
            _this.updateStyle();
        };
        // update the styles (at the start, or as the result of a settings change)
        _this.updateStyle = function () {
            // if we've got rotate headers on, add the class which enables it
            document.body.classList.toggle('plugin-sliding-panes-rotate-header', _this.settings.rotateHeaders);
            document.body.classList.toggle('plugin-sliding-panes-header-alt', _this.settings.headerAlt);
            // do the same for stacking
            document.body.classList.toggle('plugin-sliding-panes-stacking', _this.settings.stackingEnabled);
            // get the custom css element
            var el = document.getElementById('plugin-sliding-panes');
            if (!el)
                throw "plugin-sliding-panes element not found!";
            else {
                // set the settings-dependent css
                el.innerText = "body.plugin-sliding-panes{--header-width:".concat(_this.settings.headerWidth, "px;}");
                if (!_this.settings.leafAutoWidth) {
                    if (obsidian.Platform.isDesktop) {
                        el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf{width:".concat(_this.settings.leafDesktopWidth + _this.settings.headerWidth, "px;}");
                    }
                    else {
                        el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf{width:".concat(_this.settings.leafMobileWidth + _this.settings.headerWidth, "px;}");
                    }
                }
            }
            if (_this.settings.rotateHeaders) {
                _this.selectOrientation(_this.settings.orienation);
            }
        };
        _this.handleResize = function () {
            if (_this.app.workspace.layoutReady) {
                _this.recalculateLeaves();
            }
        };
        _this.handleLayoutChange = function () {
            var rootLeaves = _this.rootLeaves;
            if (rootLeaves.length < _this.prevRootLeaves.length) {
                _this.prevRootLeaves.forEach(function (leaf) {
                    if (!rootLeaves.contains(leaf)) {
                        _this.clearLeaf(leaf);
                    }
                });
            }
            _this.prevRootLeaves = _this.rootLeaves;
            //this.recalculateLeaves();
        };
        // Recalculate the leaf sizing and positions
        _this.recalculateLeaves = function () {
            // rootSplit.children is undocumented for now, but it's easier to use for what we're doing.
            // we only want leaves at the root of the root split
            // (this is to fix compatibility with backlinks in document and other such plugins)
            var rootContainerEl = _this.rootContainerEl;
            var rootLeaves = _this.rootLeaves;
            var leafCount = rootLeaves.length;
            var totalWidth = 0;
            // iterate through all the root-level leaves
            var widthChange = false;
            rootLeaves.forEach(function (leaf, i) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                containerEl.style.flex = null;
                var oldWidth = containerEl.clientWidth;
                if (_this.settings.leafAutoWidth) {
                    containerEl.style.width = (rootContainerEl.clientWidth - ((leafCount - 1) * _this.settings.headerWidth)) + "px";
                }
                else {
                    containerEl.style.width = null;
                }
                if (oldWidth == containerEl.clientWidth)
                    widthChange = true;
                containerEl.style.left = _this.settings.stackingEnabled
                    ? (i * _this.settings.headerWidth) + "px"
                    : null;
                containerEl.style.right = _this.settings.stackingEnabled
                    ? (((leafCount - i) * _this.settings.headerWidth) - containerEl.clientWidth) + "px"
                    : null;
                // keep track of the total width of all leaves
                totalWidth += containerEl.clientWidth;
                var iconEl = leaf.view.iconEl;
                var iconText = iconEl.getAttribute("aria-label");
                if (!iconText.includes("(")) {
                    iconEl.setAttribute("aria-label", "".concat(leaf.getDisplayText(), " (").concat(iconText, ")"));
                }
            });
            // if the total width of all leaves is less than the width available,
            // add back the flex class so they fill the space
            if (totalWidth < rootContainerEl.clientWidth) {
                rootLeaves.forEach(function (leaf) {
                    leaf.containerEl.style.flex = '1 0 0';
                });
            }
            var activeLeaf = _this.app.workspace.getLeaf();
            if (widthChange)
                _this.focusLeaf(activeLeaf, !_this.settings.leafAutoWidth);
        };
        _this.handleActiveLeafChange = function (leaf) {
            if (leaf) {
                _this.focusLeaf(leaf);
            }
        };
        // hande when a file is deleted
        _this.handleDelete = function (file) {
            // close any leaves with the deleted file open
            // detaching a leaf while iterating messes with the iteration
            var leavesToDetach = [];
            _this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.view instanceof obsidian.FileView && leaf.view.file == file) {
                    leavesToDetach.push(leaf);
                }
            });
            leavesToDetach.forEach(function (leaf) { return leaf.detach(); });
        };
        // overriden function for rootSplit child resize
        _this.onChildResizeStart = function (leaf, event) {
            // only really apply this to vertical splits
            if (_this.rootSplitAny.direction === "vertical") {
                // this is the width the leaf started at before resize
                var startWidth_1 = leaf.containerEl.clientWidth;
                // the mousemove event to trigger while resizing
                var mousemove_1 = function (e) {
                    // get the difference between the first position and current
                    var deltaX = e.pageX - event.pageX;
                    // adjust the start width by the delta
                    leaf.containerEl.style.width = "".concat(startWidth_1 + deltaX, "px");
                };
                // the mouseup event to trigger at the end of resizing
                var mouseup_1 = function () {
                    // if stacking is enabled, we need to re-jig the "right" value
                    if (_this.settings.stackingEnabled) {
                        // we need the leaf count and index to calculate the correct value
                        var rootLeaves = _this.rootLeaves;
                        var leafCount = rootLeaves.length;
                        var leafIndex = rootLeaves.findIndex(function (l) { return l == leaf; });
                        leaf.containerEl.style.right = (((leafCount - leafIndex - 1) * _this.settings.headerWidth) - leaf.containerEl.clientWidth) + "px";
                    }
                    // remove these event listeners. We're done with them
                    document.removeEventListener("mousemove", mousemove_1);
                    document.removeEventListener("mouseup", mouseup_1);
                };
                // Add the above two event listeners
                document.addEventListener("mousemove", mousemove_1);
                document.addEventListener("mouseup", mouseup_1);
            }
        };
        return _this;
    }
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootSplitAny", {
        // helper gets for any casts (for undocumented API stuff)
        get: function () { return this.rootSplit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootContainerEl", {
        get: function () { return this.app.workspace.rootSplit.containerEl; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootLeaves", {
        get: function () {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = [];
            this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.containerEl.parentElement === rootContainerEl) {
                    rootLeaves.push(leaf);
                }
            });
            return rootLeaves;
        },
        enumerable: false,
        configurable: true
    });
    SlidingPanesPlugin.prototype.selectOrientation = function (orient) {
        document.body.classList.toggle('plugin-sliding-select-orientation-mixed', orient == 'mixed');
        document.body.classList.toggle('plugin-sliding-select-orientation-upright', orient == 'upright');
        document.body.classList.toggle('plugin-sliding-select-orientation-sideway', orient == 'sideway');
    };
    SlidingPanesPlugin.prototype.focusLeaf = function (activeLeaf, animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        // get back to the leaf which has been andy'd (`any` because parentSplit is undocumented)
        while (activeLeaf != null && activeLeaf.parentSplit != null && activeLeaf.parentSplit != this.app.workspace.rootSplit) {
            activeLeaf = activeLeaf.parentSplit;
        }
        if (activeLeaf != null && this.rootSplit && activeLeaf.parentSplit == this.rootSplit) {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = this.rootLeaves;
            var leafCount = rootLeaves.length;
            // get the index of the active leaf
            // also, get the position of this leaf, so we can scroll to it
            // as leaves are resizable, we have to iterate through all leaves to the
            // left until we get to the active one and add all their widths together
            var position_1 = 0;
            this.activeLeafIndex = -1;
            rootLeaves.forEach(function (leaf, index) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                // this is the active one
                if (leaf == activeLeaf) {
                    _this.activeLeafIndex = index;
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else if (_this.activeLeafIndex == -1 || index < _this.activeLeafIndex) {
                    // this is before the active one, add the width
                    position_1 += containerEl.clientWidth;
                    containerEl.classList.add('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else {
                    // this is right of the active one
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.add('mod-am-right-of-active');
                }
            });
            // get this leaf's left value (the amount of space to the left for sticky headers)
            var left = parseInt(activeLeaf.containerEl.style.left) || 0;
            // the amount of space to the right we need to leave for sticky headers
            var headersToRightWidth = this.settings.stackingEnabled ? (leafCount - this.activeLeafIndex - 1) * this.settings.headerWidth : 0;
            // determine whether to request 'smooth' animations or 'auto' snap
            var behavior = animated && this.settings.smoothAnimation ? 'smooth' : 'auto';
            // it's too far left
            if (rootContainerEl.scrollLeft > position_1 - left) {
                // scroll the left side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 - left, top: 0, behavior: behavior });
            }
            // it's too far right
            else if (rootContainerEl.scrollLeft + rootContainerEl.clientWidth < position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth) {
                // scroll the right side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth - rootContainerEl.clientWidth, top: 0, behavior: behavior });
            }
        }
    };
    return SlidingPanesPlugin;
}(PluginBase));

module.exports = SlidingPanesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9wbHVnaW4tYmFzZS50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IHR5cGUgT3JpZW50YXRpb24gPSBcInNpZGV3YXlcIiB8IFwibWl4ZWRcIiB8IFwidXByaWdodFwiXG5cbmRlY2xhcmUgY2xhc3MgU2xpZGluZ1BhbmVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFNsaWRpbmdQYW5lc1NldHRpbmdzO1xuICBkaXNhYmxlKCk6IHZvaWQ7XG4gIGVuYWJsZSgpOiB2b2lkO1xuICByZWZyZXNoKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNTZXR0aW5ncyB7XG4gIGhlYWRlcldpZHRoOiBudW1iZXIgPSAzMjtcbiAgbGVhZkRlc2t0b3BXaWR0aDogbnVtYmVyID0gNzAwO1xuICBsZWFmTW9iaWxlV2lkdGg6IG51bWJlciA9IDM1MDtcbiAgbGVhZkF1dG9XaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICByb3RhdGVIZWFkZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgaGVhZGVyQWx0OiBib29sZWFuID0gZmFsc2U7XG4gIG9yaWVuYXRpb246IE9yaWVudGF0aW9uID0gXCJtaXhlZFwiO1xuICBzdGFja2luZ0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBzbW9vdGhBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xufVxuXG5leHBvcnQgY2xhc3MgU2xpZGluZ1BhbmVzU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXG4gIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTbGlkaW5nUGFuZXNQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgU2xpZGluZyBQYW5lc1wiKVxuICAgICAgLnNldERlc2MoXCJUdXJucyBzbGlkaW5nIHBhbmVzIG9uIG9yIG9mZiBnbG9iYWxseVwiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZClcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkID0gIXZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1Ntb290aCBBbmltYXRpb24nKVxuICAgICAgLnNldERlc2MoJ1doZXRoZXIgdG8gdXNlIHNtb290aCBhbmltYXRpb24gKG9uKSBvciBzbmFwcGluZyAob2ZmKScpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc21vb3RoQW5pbWF0aW9uKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc21vb3RoQW5pbWF0aW9uID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnTGVhZiBBdXRvIFdpZHRoJylcbiAgICAgIC5zZXREZXNjKCdJZiBvbiwgdGhlIHdpZHRoIG9mIHRoZSBwYW5lIHNob3VsZCBmaWxsIHRoZSBhdmFpbGFibGUgc3BhY2UnKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnTGVhZiBXaWR0aCBvbiBEZXNrdG9wJylcbiAgICAgIC5zZXREZXNjKCdUaGUgd2lkdGggb2YgYSBzaW5nbGUgcGFuZSAob25seSBpZiBhdXRvIHdpZHRoIGlzIG9mZiknKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiA3MDAnKVxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZEZXNrdG9wV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmRGVza3RvcFdpZHRoID0gcGFyc2VJbnQodmFsdWUudHJpbSgpKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdMZWFmIFdpZHRoIG9uIE1vYmlsZScpXG4gICAgICAuc2V0RGVzYygnVGhlIHdpZHRoIG9mIGEgc2luZ2xlIHBhbmUgKG9ubHkgaWYgYXV0byB3aWR0aCBpcyBvZmYpJylcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignRXhhbXBsZTogMzUwJylcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmTW9iaWxlV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmTW9iaWxlV2lkdGggPSBwYXJzZUludCh2YWx1ZS50cmltKCkpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgcm90YXRlZCBoZWFkZXJzXCIpXG4gICAgICAuc2V0RGVzYyhcIlJvdGF0ZXMgaGVhZGVycyB0byB1c2UgYXMgc3BpbmVzXCIpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mucm90YXRlSGVhZGVycylcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnJvdGF0ZUhlYWRlcnMgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU3dhcCByb3RhdGVkIGhlYWRlciBkaXJlY3Rpb25cIilcbiAgICAgIC5zZXREZXNjKFwiU3dhcHMgdGhlIGRpcmVjdGlvbiBvZiByb3RhdGVkIGhlYWRlcnNcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJBbHQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJBbHQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAuc2V0TmFtZShcIkhlYWRlciB0ZXh0IG9yaWVudGF0aW9uXCIpXG4gICAgLnNldERlc2MoXCJTZWxlY3QgdGhlIGhlYWRlciB0ZXh0IG9yaWVudGF0aW9uXCIpXG4gICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwic2lkZXdheVwiLCBcIlNpZGV3YXlcIilcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcIm1peGVkXCIsIFwiTWl4ZWRcIilcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcInVwcmlnaHRcIiwgXCJVcHJpZ2h0XCIpXG4gICAgICBkcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcmllbmF0aW9uKVxuICAgICAgZHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlOiBPcmllbnRhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcmllbmF0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgfSl9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgc3RhY2tpbmdcIilcbiAgICAgIC5zZXREZXNjKFwiUGFuZXMgd2lsbCBzdGFjayB1cCB0byB0aGUgbGVmdCBhbmQgcmlnaHRcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdTcGluZSBXaWR0aCcpXG4gICAgICAuc2V0RGVzYygnVGhlIHdpZHRoIG9mIHRoZSByb3RhdGVkIGhlYWRlciAob3IgZ2FwKSBmb3Igc3RhY2tpbmcnKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiAzMicpXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNDb21tYW5kcyB7XG4gIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbikge1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgc2V0dGluZ05hbWU6c3RyaW5nKSB7XG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogaWQsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBzZXR0aW5nLCBzYXZlIGFuZCByZWZyZXNoXG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5nc1tzZXR0aW5nTmFtZV0gPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbW1hbmRzKCk6IHZvaWQge1xuICAgIC8vIGFkZCB0aGUgdG9nZ2xlIG9uL29mZiBjb21tYW5kXG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzJyxcbiAgICAgIG5hbWU6ICdUb2dnbGUgU2xpZGluZyBQYW5lcycsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAvLyBzd2l0Y2ggdGhlIGRpc2FibGVkIHNldHRpbmcgYW5kIHNhdmVcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblxuICAgICAgICAvLyBkaXNhYmxlIG9yIGVuYWJsZSBhcyBuZWNlc3NhcnlcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPyB0aGlzLnBsdWdpbi5kaXNhYmxlKCkgOiB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHNtb290aCBhbmltYXRpb25cbiAgICB0aGlzLmFkZFRvZ2dsZVNldHRpbmdDb21tYW5kKCd0b2dnbGUtc2xpZGluZy1wYW5lcy1zbW9vdGgtYW5pbWF0aW9uJywgJ1RvZ2dsZSBTbW9vdGggQW5pbWF0aW9uJywgJ3Ntb290aEFuaW1hdGlvbicpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgbGVhZiBhdXRvIHdpZHRoXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtbGVhZi1hdXRvLXdpZHRoJywgJ1RvZ2dsZSBMZWFmIEF1dG8gV2lkdGgnLCAnbGVhZkF1dG9XaWR0aCcpO1xuICAgIFxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHN0YWNraW5nXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtc3RhY2tpbmcnLCAnVG9nZ2xlIFN0YWNraW5nJywgJ3N0YWNraW5nRW5hYmxlZCcpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgcm90YXRlZCBoZWFkZXJzXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtcm90YXRlZC1oZWFkZXJzJywgJ1RvZ2dsZSBSb3RhdGVkIEhlYWRlcnMnLCAncm90YXRlSGVhZGVycycpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgc3dhcHBlZCBoZWFkZXIgZGlyZWN0aW9uXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtaGVhZGVyLWFsdCcsICdTd2FwIHJvdGF0ZWQgaGVhZGVyIGRpcmVjdGlvbicsICdoZWFkZXJBbHQnKTtcbiAgfVxufSIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IFBsdWdpbiwgV29ya3NwYWNlU3BsaXQgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8vIGludGVyZmFjZSBmb3IgZXh0ZW5kaW5nIFdvcmtzcGFjZVNwbGl0IHdpdGggdW5kb2N1bWVudGVkIHByb3BlcnRpZXNcbmV4cG9ydCBpbnRlcmZhY2UgV29ya3NwYWNlU3BsaXRFeHQgZXh0ZW5kcyBXb3Jrc3BhY2VTcGxpdCB7XG4gIC8vIHRoZSBjb250YWluZXIgZWxlbWVudCBvZiBhIGxlYWZcbiAgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGx1Z2luQmFzZSBleHRlbmRzIFBsdWdpbiB7XG5cbiAgLy8gZ2V0IHRoZSBjbGFzcyBuYW1lIGZvciB0aGUgcGx1Z2luXG4gIHByaXZhdGUgX2NhY2hlZENsYXNzTmFtZTogc3RyaW5nO1xuICBnZXQgY2xhc3NOYW1lKCkge1xuICAgIGlmICghdGhpcy5fY2FjaGVkQ2xhc3NOYW1lKSB7XG4gICAgICB0aGlzLl9jYWNoZWRDbGFzc05hbWUgPSAncGx1Z2luLScgKyB0aGlzLm1hbmlmZXN0LmlkO1xuICAgICAgaWYgKHRoaXMuX2NhY2hlZENsYXNzTmFtZS5lbmRzV2l0aCgnLW9ic2lkaWFuJykpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkQ2xhc3NOYW1lID0gdGhpcy5fY2FjaGVkQ2xhc3NOYW1lLnN1YnN0cmluZygwLCB0aGlzLl9jYWNoZWRDbGFzc05hbWUubGFzdEluZGV4T2YoJy1vYnNpZGlhbicpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkQ2xhc3NOYW1lO1xuICB9XG5cbiAgLy8gaGVscGVyIHByb3BlcnR5IHRvIGdldCB0aGUgcm9vdFNwbGl0IHdpdGggc29tZSBleHRyYSBwcm9wZXJ0aWVzXG4gIGdldCByb290U3BsaXQoKSB7IHJldHVybiB0aGlzLmFwcC53b3Jrc3BhY2Uucm9vdFNwbGl0IGFzIFdvcmtzcGFjZVNwbGl0RXh0OyB9XG5cbiAgLy8gcnVucyB3aGVuIHRoZSBwbHVnaW4gaXMgbG9hZGVkXG4gIG9ubG9hZCA9ICgpID0+IHtcbiAgICAvLyBhZGQgaW4gdGhlIHJlcXVpcmVkIGNvbW1hbmQgcGFsbGV0ZSBjb21tYW5kc1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcblxuICAgIC8vIGFkZCBpbiBhbnkgc2V0dGluZ3NcbiAgICB0aGlzLmFkZFNldHRpbmdzKCk7XG5cbiAgICAvLyB3YWl0IGZvciBsYXlvdXQgdG8gYmUgcmVhZHkgdG8gcGVyZm9ybSB0aGUgcmVzdFxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KHRoaXMub25MYXlvdXRSZWFkeSk7XG4gIH1cblxuICAvLyBydW5zIHdoZW4gdGhlIHBsdWdpbiBpcyBvbmxvYWRlZFxuICBvbnVubG9hZCA9ICgpID0+IHtcbiAgICAvLyBydW4gdGhyb3VnaCB0aGUgZGlzYWJsZSBzdGVwc1xuICAgIHRoaXMuZGlzYWJsZSgpO1xuICB9XG5cbiAgLy8gcnVucyBvbmNlIHRoZSBsYXlvdXQgaXMgcmVhZHkgdGhlIGZpcnN0IHRpbWUgdGhlIHBsdWdpbiBpcyBzdGFydGVkXG4gIG9uTGF5b3V0UmVhZHkgPSAoKSA9PiB7XG4gICAgdGhpcy5lbmFibGUoKTtcbiAgfVxuICBcbiAgLy8gcGVyZm9ybSBhbnkgc2V0dXAgcmVxdWlyZWQgdG8gZW5hYmxlIHRoZSBwbHVnaW5cbiAgZW5hYmxlID0gKCk6IHZvaWQgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkudG9nZ2xlQ2xhc3ModGhpcy5jbGFzc05hbWUsIHRydWUpO1xuICB9XG5cbiAgLy8gcGVyZm9ybSBhbnkgcmVxdWlyZWQgZGlzYWJsZSBzdGVwcywgbGVhdmUgbm90aGluZyBiZWhpbmRcbiAgZGlzYWJsZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3NOYW1lLCBmYWxzZSk7XG4gIH1cblxuICAvLyBhZGQgaW4gYW55IHJlcXVpcmVkIGNvbW1hbmQgcGFsbGV0ZSBjb21tYW5kc1xuICBhZGRDb21tYW5kcyA9ICgpOiB2b2lkID0+IHsgfTtcblxuICAvLyBhZGQgaW4gYW55IHNldHRpbmdzXG4gIGFkZFNldHRpbmdzID0gKCk6IHZvaWQgPT4geyB9O1xufVxuIiwiaW1wb3J0IHsgRmlsZVZpZXcsIFBsdWdpbiwgVEFic3RyYWN0RmlsZSwgV29ya3NwYWNlTGVhZiwgV29ya3NwYWNlSXRlbSwgV29ya3NwYWNlU3BsaXQsIFBsYXRmb3JtLCBURmlsZSB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFdvcmtzcGFjZUl0ZW1FeHQgfSBmcm9tICcuL29ic2lkaWFuLWV4dCc7XG5pbXBvcnQgeyBFZGl0b3IsIFBvc2l0aW9uLCBUb2tlbiB9IGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgU2xpZGluZ1BhbmVzU2V0dGluZ3MsIFNsaWRpbmdQYW5lc1NldHRpbmdUYWIsIFNsaWRpbmdQYW5lc0NvbW1hbmRzLCBPcmllbnRhdGlvbiB9IGZyb20gJy4vc2V0dGluZ3MnO1xuaW1wb3J0IHsgUGx1Z2luQmFzZSB9IGZyb20gJy4vcGx1Z2luLWJhc2UnXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGluZ1BhbmVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luQmFzZSB7XG4gIHNldHRpbmdzOiBTbGlkaW5nUGFuZXNTZXR0aW5ncztcblxuICAvLyBoZWxwZXIgdmFyaWFibGVzXG4gIHByaXZhdGUgYWN0aXZlTGVhZkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIC8vIGhlbHBlciBnZXRzIGZvciBhbnkgY2FzdHMgKGZvciB1bmRvY3VtZW50ZWQgQVBJIHN0dWZmKVxuICBwcml2YXRlIGdldCByb290U3BsaXRBbnkoKTogYW55IHsgcmV0dXJuIHRoaXMucm9vdFNwbGl0IGFzIGFueTsgfVxuICBwcml2YXRlIGdldCByb290Q29udGFpbmVyRWwoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gKHRoaXMuYXBwLndvcmtzcGFjZS5yb290U3BsaXQgYXMgV29ya3NwYWNlSXRlbSBhcyBXb3Jrc3BhY2VJdGVtRXh0KS5jb250YWluZXJFbDsgfVxuICBwcml2YXRlIGdldCByb290TGVhdmVzKCk6IFdvcmtzcGFjZUxlYWZbXSB7XG4gICAgY29uc3Qgcm9vdENvbnRhaW5lckVsID0gdGhpcy5yb290Q29udGFpbmVyRWw7XG4gICAgbGV0IHJvb3RMZWF2ZXM6IFdvcmtzcGFjZUxlYWZbXSA9IFtdO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlUm9vdExlYXZlcygobGVhZjogYW55KSA9PiB7XG4gICAgICBpZiAobGVhZi5jb250YWluZXJFbC5wYXJlbnRFbGVtZW50ID09PSByb290Q29udGFpbmVyRWwpIHtcbiAgICAgICAgcm9vdExlYXZlcy5wdXNoKGxlYWYpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RMZWF2ZXM7XG4gIH1cbiAgcHJpdmF0ZSBwcmV2Um9vdExlYXZlczogV29ya3NwYWNlTGVhZltdID0gW107XG5cbiAgLy8gcnVucyB3aGVuIHRoZSBwbHVnaW4gaXMgbG9hZGVkXG4gIG9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgICAvLyBsb2FkIHNldHRpbmdzXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IFNsaWRpbmdQYW5lc1NldHRpbmdzKCksIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cbiAgICAvLyBhZGQgaW4gdGhlIHJlcXVpcmVkIGNvbW1hbmQgcGFsbGV0ZSBjb21tYW5kc1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcblxuICAgIC8vIGFkZCBpbiBhbnkgc2V0dGluZ3NcbiAgICB0aGlzLmFkZFNldHRpbmdzKCk7XG5cbiAgICAvLyB3YWl0IGZvciBsYXlvdXQgdG8gYmUgcmVhZHkgdG8gcGVyZm9ybSB0aGUgcmVzdFxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KHRoaXMub25MYXlvdXRSZWFkeSk7XG4gIH1cblxuICAvLyBhZGQgaW4gYW55IHJlcXVpcmVkIGNvbW1hbmQgcGFsbGV0ZSBjb21tYW5kc1xuICBhZGRDb21tYW5kcyA9ICgpID0+IHtcbiAgICAvLyBhZGQgdGhlIGNvbW1hbmRzXG4gICAgbmV3IFNsaWRpbmdQYW5lc0NvbW1hbmRzKHRoaXMpLmFkZENvbW1hbmRzKCk7XG4gIH1cblxuICAvLyBhZGQgaW4gYW55IHNldHRpbmdzXG4gIGFkZFNldHRpbmdzID0gKCkgPT4ge1xuICAgIC8vIGFkZCB0aGUgc2V0dGluZ3MgdGFiXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTbGlkaW5nUGFuZXNTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gIH1cblxuICAvLyBlbmFibGUgYW5keSBtb2RlXG4gIGVuYWJsZSA9ICgpID0+IHtcbiAgICBpZighdGhpcy5zZXR0aW5ncz8uZGlzYWJsZWQpIHtcbiAgICAgIC8vIGFkZCB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtY2hhbmdlJywgdGhpcy5oYW5kbGVMYXlvdXRDaGFuZ2UpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2FjdGl2ZS1sZWFmLWNoYW5nZScsIHRoaXMuaGFuZGxlQWN0aXZlTGVhZkNoYW5nZSkpO1xuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLnZhdWx0Lm9uKCdkZWxldGUnLCB0aGlzLmhhbmRsZURlbGV0ZSkpO1xuXG4gICAgICAvLyB3YWl0IGZvciBsYXlvdXQgdG8gYmUgcmVhZHkgdG8gcGVyZm9ybSB0aGUgcmVzdFxuICAgICAgaWYodGhpcy5hcHAud29ya3NwYWNlLmxheW91dFJlYWR5KSB0aGlzLnJlYWxseUVuYWJsZSgpIFxuICAgIH1cbiAgfVxuXG4gIC8vIHJlYWxseSBlbmFibGUgdGhpbmdzIChvbmNlIHRoZSBsYXlvdXQgaXMgcmVhZHkpXG4gIHJlYWxseUVuYWJsZSA9ICgpID0+IHtcbiAgICAvLyB3ZSBkb24ndCBuZWVkIHRoZSBldmVudCBoYW5kbGVyIGFueW1vcmVcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub2ZmKCdsYXlvdXQtcmVhZHknLCB0aGlzLnJlYWxseUVuYWJsZSk7XG5cbiAgICAvLyBiYWNrdXAgdGhlIGZ1bmN0aW9uIHNvIEkgY2FuIHJlc3RvcmUgaXRcbiAgICB0aGlzLnJvb3RTcGxpdEFueS5vbGRPbkNoaWxkUmVzaXplU3RhcnQgPSB0aGlzLnJvb3RTcGxpdEFueS5vbkNoaWxkUmVzaXplU3RhcnQ7XG4gICAgdGhpcy5yb290U3BsaXRBbnkub25DaGlsZFJlc2l6ZVN0YXJ0ID0gdGhpcy5vbkNoaWxkUmVzaXplU3RhcnQ7XG5cbiAgICAvLyBhZGQgc29tZSBleHRyYSBjbGFzc2VzIHRoYXQgY2FuJ3QgZml0IGluIHRoZSBzdHlsZXMuY3NzXG4gICAgLy8gYmVjYXVzZSB0aGV5IHVzZSBzZXR0aW5nc1xuICAgIHRoaXMuYWRkU3R5bGUoKTtcblxuICAgIC8vIGRvIGFsbCB0aGUgY2FsdWNhdGlvbnMgbmVjZXNzYXJ5IGZvciB0aGUgd29ya3NwYWNlIGxlYXZlc1xuICAgIHRoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgfVxuXG4gIC8vIHNodXQgZG93biBhbmR5IG1vZGVcbiAgZGlzYWJsZSA9ICgpID0+IHtcblxuICAgIC8vIGdldCByaWQgb2YgdGhlIGV4dHJhIHN0eWxlIHRhZyB3ZSBhZGRlZFxuICAgIHRoaXMucmVtb3ZlU3R5bGUoKTtcblxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0aGUgcm9vdCBsZWF2ZXMgdG8gcmVtb3ZlIHRoZSBzdHVmZiB3ZSBhZGRlZFxuICAgIHRoaXMucm9vdExlYXZlcy5mb3JFYWNoKHRoaXMuY2xlYXJMZWFmKTtcblxuICAgIC8vIHJlc3RvcmUgdGhlIGRlZmF1bHQgZnVuY3Rpb25hbGl0eVxuICAgIHRoaXMucm9vdFNwbGl0QW55Lm9uQ2hpbGRSZXNpemVTdGFydCA9IHRoaXMucm9vdFNwbGl0QW55Lm9sZE9uQ2hpbGRSZXNpemVTdGFydDtcbiAgfVxuXG4gIGNsZWFyTGVhZiA9IChsZWFmOiBhbnkpID0+IHtcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLndpZHRoID0gbnVsbDtcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLmxlZnQgPSBudWxsO1xuICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUucmlnaHQgPSBudWxsO1xuICAgIGxlYWYuY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgbGVhZi5jb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tcmlnaHQtb2YtYWN0aXZlJyk7XG5cbiAgICBjb25zdCBpY29uRWwgPSAobGVhZi52aWV3IGFzIGFueSkuaWNvbkVsO1xuICAgIGNvbnN0IGljb25UZXh0OnN0cmluZyA9IGljb25FbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIpO1xuICAgIGlmIChpY29uVGV4dC5pbmNsdWRlcyhcIihcIikpIHtcbiAgICAgIGljb25FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGljb25UZXh0LnN1YnN0cmluZyhpY29uVGV4dC5sYXN0SW5kZXhPZignKCcpICsgMSwgaWNvblRleHQubGFzdEluZGV4T2YoJyknKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHJlZnJlc2ggZnVuY2lvbiBmb3Igd2hlbiB3ZSBjaGFuZ2Ugc2V0dGluZ3NcbiAgcmVmcmVzaCA9ICgpID0+IHtcbiAgICAvLyByZS1sb2FkIHRoZSBzdHlsZVxuICAgIHRoaXMudXBkYXRlU3R5bGUoKVxuICAgIC8vIHJlY2FsY3VsYXRlIGxlYWYgcG9zaXRpb25zXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUxlYXZlcygpO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHRoZSBzdGx5aW5nIGVsZW1lbnRzIHdlJ3ZlIGNyZWF0ZWRcbiAgcmVtb3ZlU3R5bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcbiAgICBpZiAoZWwpIGVsLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLXJvdGF0ZS1oZWFkZXInKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLWhlYWRlci1hbHQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLXN0YWNraW5nJyk7XG4gIH1cblxuICAvLyBhZGQgdGhlIHN0eWxpbmcgZWxlbWVudHMgd2UgbmVlZFxuICBhZGRTdHlsZSA9ICgpID0+IHtcbiAgICAvLyBhZGQgYSBjc3MgYmxvY2sgZm9yIG91ciBzZXR0aW5ncy1kZXBlbmRlbnQgc3R5bGVzXG4gICAgY29uc3QgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjc3MuaWQgPSAncGx1Z2luLXNsaWRpbmctcGFuZXMnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xuXG4gICAgLy8gYWRkIHRoZSBtYWluIGNsYXNzXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbHVnaW4tc2xpZGluZy1wYW5lcycpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBzdHlsZSB3aXRoIHRoZSBzZXR0aW5ncy1kZXBlbmRlbnQgc3R5bGVzXG4gICAgdGhpcy51cGRhdGVTdHlsZSgpO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBzdHlsZXMgKGF0IHRoZSBzdGFydCwgb3IgYXMgdGhlIHJlc3VsdCBvZiBhIHNldHRpbmdzIGNoYW5nZSlcbiAgdXBkYXRlU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gaWYgd2UndmUgZ290IHJvdGF0ZSBoZWFkZXJzIG9uLCBhZGQgdGhlIGNsYXNzIHdoaWNoIGVuYWJsZXMgaXRcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLXJvdGF0ZS1oZWFkZXInLCB0aGlzLnNldHRpbmdzLnJvdGF0ZUhlYWRlcnMpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtaGVhZGVyLWFsdCcsIHRoaXMuc2V0dGluZ3MuaGVhZGVyQWx0KVxuICAgIC8vIGRvIHRoZSBzYW1lIGZvciBzdGFja2luZ1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtc3RhY2tpbmcnLCB0aGlzLnNldHRpbmdzLnN0YWNraW5nRW5hYmxlZCk7XG4gICAgXG4gICAgLy8gZ2V0IHRoZSBjdXN0b20gY3NzIGVsZW1lbnRcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVnaW4tc2xpZGluZy1wYW5lcycpO1xuICAgIGlmICghZWwpIHRocm93IFwicGx1Z2luLXNsaWRpbmctcGFuZXMgZWxlbWVudCBub3QgZm91bmQhXCI7XG4gICAgZWxzZSB7XG4gICAgICAvLyBzZXQgdGhlIHNldHRpbmdzLWRlcGVuZGVudCBjc3NcbiAgICAgIGVsLmlubmVyVGV4dCA9IGBib2R5LnBsdWdpbi1zbGlkaW5nLXBhbmVzey0taGVhZGVyLXdpZHRoOiR7dGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aH1weDt9YDtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoKSB7XG4gICAgICAgIGlmIChQbGF0Zm9ybS5pc0Rlc2t0b3ApIHtcbiAgICAgICAgICBlbC5pbm5lclRleHQgKz0gYGJvZHkucGx1Z2luLXNsaWRpbmctcGFuZXMgLm1vZC1yb290Pi53b3Jrc3BhY2UtbGVhZnt3aWR0aDoke3RoaXMuc2V0dGluZ3MubGVhZkRlc2t0b3BXaWR0aCArIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZWwuaW5uZXJUZXh0ICs9IGBib2R5LnBsdWdpbi1zbGlkaW5nLXBhbmVzIC5tb2Qtcm9vdD4ud29ya3NwYWNlLWxlYWZ7d2lkdGg6JHt0aGlzLnNldHRpbmdzLmxlYWZNb2JpbGVXaWR0aCArIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKHRoaXMuc2V0dGluZ3Mucm90YXRlSGVhZGVycyl7XG4gICAgICB0aGlzLnNlbGVjdE9yaWVudGF0aW9uKHRoaXMuc2V0dGluZ3Mub3JpZW5hdGlvbik7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0T3JpZW50YXRpb24ob3JpZW50OiBPcmllbnRhdGlvbikge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctc2VsZWN0LW9yaWVudGF0aW9uLW1peGVkJywgb3JpZW50ID09ICdtaXhlZCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctc2VsZWN0LW9yaWVudGF0aW9uLXVwcmlnaHQnLCBvcmllbnQgPT0gJ3VwcmlnaHQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXNlbGVjdC1vcmllbnRhdGlvbi1zaWRld2F5Jywgb3JpZW50ID09ICdzaWRld2F5Jyk7XG4gIH1cblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5sYXlvdXRSZWFkeSkge1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxlYXZlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUxheW91dENoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgIGlmIChyb290TGVhdmVzLmxlbmd0aCA8IHRoaXMucHJldlJvb3RMZWF2ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnByZXZSb290TGVhdmVzLmZvckVhY2goKGxlYWY6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJvb3RMZWF2ZXMuY29udGFpbnMobGVhZikpIHtcbiAgICAgICAgICB0aGlzLmNsZWFyTGVhZihsZWFmKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5wcmV2Um9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICAvL3RoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgfVxuXG4gIC8vIFJlY2FsY3VsYXRlIHRoZSBsZWFmIHNpemluZyBhbmQgcG9zaXRpb25zXG4gIHJlY2FsY3VsYXRlTGVhdmVzID0gKCkgPT4ge1xuICAgIC8vIHJvb3RTcGxpdC5jaGlsZHJlbiBpcyB1bmRvY3VtZW50ZWQgZm9yIG5vdywgYnV0IGl0J3MgZWFzaWVyIHRvIHVzZSBmb3Igd2hhdCB3ZSdyZSBkb2luZy5cbiAgICAvLyB3ZSBvbmx5IHdhbnQgbGVhdmVzIGF0IHRoZSByb290IG9mIHRoZSByb290IHNwbGl0XG4gICAgLy8gKHRoaXMgaXMgdG8gZml4IGNvbXBhdGliaWxpdHkgd2l0aCBiYWNrbGlua3MgaW4gZG9jdW1lbnQgYW5kIG90aGVyIHN1Y2ggcGx1Z2lucylcbiAgICBjb25zdCByb290Q29udGFpbmVyRWwgPSB0aGlzLnJvb3RDb250YWluZXJFbDtcbiAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgIGNvbnN0IGxlYWZDb3VudCA9IHJvb3RMZWF2ZXMubGVuZ3RoO1xuXG4gICAgbGV0IHRvdGFsV2lkdGggPSAwO1xuXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCB0aGUgcm9vdC1sZXZlbCBsZWF2ZXNcbiAgICBsZXQgd2lkdGhDaGFuZ2UgPSBmYWxzZTtcbiAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGk6IG51bWJlcikgPT4ge1xuXG4gICAgICAvLyBAdHMtaWdub3JlIHRvIGdldCB0aGUgdW5kb2N1bWVudGVkIGNvbnRhaW5lckVsXG4gICAgICBjb25zdCBjb250YWluZXJFbCA9IGxlYWYuY29udGFpbmVyRWw7XG5cbiAgICAgIGNvbnRhaW5lckVsLnN0eWxlLmZsZXggPSBudWxsO1xuICAgICAgY29uc3Qgb2xkV2lkdGggPSBjb250YWluZXJFbC5jbGllbnRXaWR0aDtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpIHtcbiAgICAgICAgY29udGFpbmVyRWwuc3R5bGUud2lkdGggPSAocm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoIC0gKChsZWFmQ291bnQgLSAxKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpKSArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXJFbC5zdHlsZS53aWR0aCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAob2xkV2lkdGggPT0gY29udGFpbmVyRWwuY2xpZW50V2lkdGgpIHdpZHRoQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgY29udGFpbmVyRWwuc3R5bGUubGVmdCA9IHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkXG4gICAgICAgID8gKGkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoKSArIFwicHhcIlxuICAgICAgICA6IG51bGw7XG4gICAgICBjb250YWluZXJFbC5zdHlsZS5yaWdodCA9IHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkXG4gICAgICAgID8gKCgobGVhZkNvdW50IC0gaSkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoKSAtIGNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSArIFwicHhcIlxuICAgICAgICA6IG51bGw7XG4gICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgbGVhdmVzXG4gICAgICB0b3RhbFdpZHRoICs9IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoO1xuXG4gICAgICBjb25zdCBpY29uRWwgPSAobGVhZi52aWV3IGFzIGFueSkuaWNvbkVsO1xuICAgICAgY29uc3QgaWNvblRleHQgPSBpY29uRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICAgIGlmICghaWNvblRleHQuaW5jbHVkZXMoXCIoXCIpKSB7XG4gICAgICAgIGljb25FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGAke2xlYWYuZ2V0RGlzcGxheVRleHQoKX0gKCR7aWNvblRleHR9KWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgdGhlIHRvdGFsIHdpZHRoIG9mIGFsbCBsZWF2ZXMgaXMgbGVzcyB0aGFuIHRoZSB3aWR0aCBhdmFpbGFibGUsXG4gICAgLy8gYWRkIGJhY2sgdGhlIGZsZXggY2xhc3Mgc28gdGhleSBmaWxsIHRoZSBzcGFjZVxuICAgIGlmICh0b3RhbFdpZHRoIDwgcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoKSB7XG4gICAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IGFueSkgPT4ge1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLmZsZXggPSAnMSAwIDAnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGFjdGl2ZUxlYWY6IFdvcmtzcGFjZUl0ZW1FeHQgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0TGVhZigpIGFzIFdvcmtzcGFjZUl0ZW0gYXMgV29ya3NwYWNlSXRlbUV4dDtcbiAgICBpZih3aWR0aENoYW5nZSkgdGhpcy5mb2N1c0xlYWYoYWN0aXZlTGVhZiwgIXRoaXMuc2V0dGluZ3MubGVhZkF1dG9XaWR0aCk7XG4gIH1cblxuICBoYW5kbGVBY3RpdmVMZWFmQ2hhbmdlID0gKGxlYWY6IFdvcmtzcGFjZUxlYWYgfCBudWxsKSA9PntcbiAgICBpZiAobGVhZikge1xuICAgICAgdGhpcy5mb2N1c0xlYWYobGVhZiBhcyBXb3Jrc3BhY2VJdGVtIGFzIFdvcmtzcGFjZUl0ZW1FeHQpO1xuICAgIH1cbiAgfVxuXG4gIGZvY3VzTGVhZihhY3RpdmVMZWFmOldvcmtzcGFjZUl0ZW1FeHQsIGFuaW1hdGVkOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIC8vIGdldCBiYWNrIHRvIHRoZSBsZWFmIHdoaWNoIGhhcyBiZWVuIGFuZHknZCAoYGFueWAgYmVjYXVzZSBwYXJlbnRTcGxpdCBpcyB1bmRvY3VtZW50ZWQpXG4gICAgd2hpbGUgKGFjdGl2ZUxlYWYgIT0gbnVsbCAmJiBhY3RpdmVMZWFmLnBhcmVudFNwbGl0ICE9IG51bGwgJiYgYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCAhPSB0aGlzLmFwcC53b3Jrc3BhY2Uucm9vdFNwbGl0KSB7XG4gICAgICBhY3RpdmVMZWFmID0gYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCBhcyBXb3Jrc3BhY2VJdGVtRXh0O1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVMZWFmICE9IG51bGwgJiYgdGhpcy5yb290U3BsaXQgJiYgYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCA9PSB0aGlzLnJvb3RTcGxpdCkge1xuXG4gICAgICBjb25zdCByb290Q29udGFpbmVyRWwgPSB0aGlzLnJvb3RDb250YWluZXJFbDtcbiAgICAgIGNvbnN0IHJvb3RMZWF2ZXMgPSB0aGlzLnJvb3RMZWF2ZXM7XG4gICAgICBjb25zdCBsZWFmQ291bnQgPSByb290TGVhdmVzLmxlbmd0aDtcblxuICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIGxlYWZcbiAgICAgIC8vIGFsc28sIGdldCB0aGUgcG9zaXRpb24gb2YgdGhpcyBsZWFmLCBzbyB3ZSBjYW4gc2Nyb2xsIHRvIGl0XG4gICAgICAvLyBhcyBsZWF2ZXMgYXJlIHJlc2l6YWJsZSwgd2UgaGF2ZSB0byBpdGVyYXRlIHRocm91Z2ggYWxsIGxlYXZlcyB0byB0aGVcbiAgICAgIC8vIGxlZnQgdW50aWwgd2UgZ2V0IHRvIHRoZSBhY3RpdmUgb25lIGFuZCBhZGQgYWxsIHRoZWlyIHdpZHRocyB0b2dldGhlclxuICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuYWN0aXZlTGVhZkluZGV4ID0gLTE7XG4gICAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IFdvcmtzcGFjZUl0ZW0sIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSB0byBnZXQgdGhlIHVuZG9jdW1lbnRlZCBjb250YWluZXJFbFxuICAgICAgICBjb25zdCBjb250YWluZXJFbCA9IGxlYWYuY29udGFpbmVyRWw7XG5cbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgYWN0aXZlIG9uZVxuICAgICAgICBpZiAobGVhZiA9PSBhY3RpdmVMZWFmKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVMZWFmSW5kZXggPSBpbmRleDtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tbGVmdC1vZi1hY3RpdmUnKTtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tcmlnaHQtb2YtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmFjdGl2ZUxlYWZJbmRleCA9PSAtMSB8fCBpbmRleCA8IHRoaXMuYWN0aXZlTGVhZkluZGV4KSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBiZWZvcmUgdGhlIGFjdGl2ZSBvbmUsIGFkZCB0aGUgd2lkdGhcbiAgICAgICAgICBwb3NpdGlvbiArPSBjb250YWluZXJFbC5jbGllbnRXaWR0aDtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdtb2QtYW0tbGVmdC1vZi1hY3RpdmUnKTtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tcmlnaHQtb2YtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyByaWdodCBvZiB0aGUgYWN0aXZlIG9uZVxuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1sZWZ0LW9mLWFjdGl2ZScpO1xuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ21vZC1hbS1yaWdodC1vZi1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIGdldCB0aGlzIGxlYWYncyBsZWZ0IHZhbHVlICh0aGUgYW1vdW50IG9mIHNwYWNlIHRvIHRoZSBsZWZ0IGZvciBzdGlja3kgaGVhZGVycylcbiAgICAgIGNvbnN0IGxlZnQgPSBwYXJzZUludChhY3RpdmVMZWFmLmNvbnRhaW5lckVsLnN0eWxlLmxlZnQpIHx8IDA7XG4gICAgICAvLyB0aGUgYW1vdW50IG9mIHNwYWNlIHRvIHRoZSByaWdodCB3ZSBuZWVkIHRvIGxlYXZlIGZvciBzdGlja3kgaGVhZGVyc1xuICAgICAgY29uc3QgaGVhZGVyc1RvUmlnaHRXaWR0aCA9IHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkID8gKGxlYWZDb3VudCAtIHRoaXMuYWN0aXZlTGVhZkluZGV4IC0gMSkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoIDogMDtcblxuICAgICAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gcmVxdWVzdCAnc21vb3RoJyBhbmltYXRpb25zIG9yICdhdXRvJyBzbmFwXG4gICAgICBsZXQgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yID0gYW5pbWF0ZWQgJiYgdGhpcy5zZXR0aW5ncy5zbW9vdGhBbmltYXRpb24gPyAnc21vb3RoJyA6ICdhdXRvJztcblxuICAgICAgLy8gaXQncyB0b28gZmFyIGxlZnRcbiAgICAgIGlmIChyb290Q29udGFpbmVyRWwuc2Nyb2xsTGVmdCA+IHBvc2l0aW9uIC0gbGVmdCkge1xuICAgICAgICAvLyBzY3JvbGwgdGhlIGxlZnQgc2lkZSBvZiB0aGUgcGFuZSBpbnRvIHZpZXdcbiAgICAgICAgcm9vdENvbnRhaW5lckVsLnNjcm9sbFRvKHsgbGVmdDogcG9zaXRpb24gLSBsZWZ0LCB0b3A6IDAsIGJlaGF2aW9yOiBiZWhhdmlvciB9KTtcbiAgICAgIH1cbiAgICAgIC8vIGl0J3MgdG9vIGZhciByaWdodFxuICAgICAgZWxzZSBpZiAocm9vdENvbnRhaW5lckVsLnNjcm9sbExlZnQgKyByb290Q29udGFpbmVyRWwuY2xpZW50V2lkdGggPCBwb3NpdGlvbiArIGFjdGl2ZUxlYWYuY29udGFpbmVyRWwuY2xpZW50V2lkdGggKyBoZWFkZXJzVG9SaWdodFdpZHRoKSB7XG4gICAgICAgIC8vIHNjcm9sbCB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgcGFuZSBpbnRvIHZpZXdcbiAgICAgICAgcm9vdENvbnRhaW5lckVsLnNjcm9sbFRvKHsgbGVmdDogcG9zaXRpb24gKyBhY3RpdmVMZWFmLmNvbnRhaW5lckVsLmNsaWVudFdpZHRoICsgaGVhZGVyc1RvUmlnaHRXaWR0aCAtIHJvb3RDb250YWluZXJFbC5jbGllbnRXaWR0aCwgdG9wOiAwLCBiZWhhdmlvcjogYmVoYXZpb3IgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGUgd2hlbiBhIGZpbGUgaXMgZGVsZXRlZFxuICBoYW5kbGVEZWxldGUgPSAoZmlsZTogVEFic3RyYWN0RmlsZSkgPT4ge1xuICAgIC8vIGNsb3NlIGFueSBsZWF2ZXMgd2l0aCB0aGUgZGVsZXRlZCBmaWxlIG9wZW5cbiAgICAvLyBkZXRhY2hpbmcgYSBsZWFmIHdoaWxlIGl0ZXJhdGluZyBtZXNzZXMgd2l0aCB0aGUgaXRlcmF0aW9uXG4gICAgY29uc3QgbGVhdmVzVG9EZXRhY2g6IFdvcmtzcGFjZUxlYWZbXSA9IFtdO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlUm9vdExlYXZlcygobGVhZjogV29ya3NwYWNlTGVhZikgPT4ge1xuICAgICAgaWYgKGxlYWYudmlldyBpbnN0YW5jZW9mIEZpbGVWaWV3ICYmIGxlYWYudmlldy5maWxlID09IGZpbGUpIHtcbiAgICAgICAgbGVhdmVzVG9EZXRhY2gucHVzaChsZWFmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZWF2ZXNUb0RldGFjaC5mb3JFYWNoKGxlYWYgPT4gbGVhZi5kZXRhY2goKSk7XG4gIH07XG5cbiAgLy8gb3ZlcnJpZGVuIGZ1bmN0aW9uIGZvciByb290U3BsaXQgY2hpbGQgcmVzaXplXG4gIG9uQ2hpbGRSZXNpemVTdGFydCA9IChsZWFmOiBhbnksIGV2ZW50OiBhbnkpID0+IHtcblxuICAgIC8vIG9ubHkgcmVhbGx5IGFwcGx5IHRoaXMgdG8gdmVydGljYWwgc3BsaXRzXG4gICAgaWYgKHRoaXMucm9vdFNwbGl0QW55LmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSB3aWR0aCB0aGUgbGVhZiBzdGFydGVkIGF0IGJlZm9yZSByZXNpemVcbiAgICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBsZWFmLmNvbnRhaW5lckVsLmNsaWVudFdpZHRoO1xuXG4gICAgICAvLyB0aGUgbW91c2Vtb3ZlIGV2ZW50IHRvIHRyaWdnZXIgd2hpbGUgcmVzaXppbmdcbiAgICAgIGNvbnN0IG1vdXNlbW92ZSA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgLy8gZ2V0IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGZpcnN0IHBvc2l0aW9uIGFuZCBjdXJyZW50XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IGUucGFnZVggLSBldmVudC5wYWdlWDtcbiAgICAgICAgLy8gYWRqdXN0IHRoZSBzdGFydCB3aWR0aCBieSB0aGUgZGVsdGFcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS53aWR0aCA9IGAke3N0YXJ0V2lkdGggKyBkZWx0YVh9cHhgO1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgbW91c2V1cCBldmVudCB0byB0cmlnZ2VyIGF0IHRoZSBlbmQgb2YgcmVzaXppbmdcbiAgICAgIGNvbnN0IG1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIG5lZWQgdG8gcmUtamlnIHRoZSBcInJpZ2h0XCIgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkKSB7XG4gICAgICAgICAgLy8gd2UgbmVlZCB0aGUgbGVhZiBjb3VudCBhbmQgaW5kZXggdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHZhbHVlXG4gICAgICAgICAgY29uc3Qgcm9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICAgICAgICBjb25zdCBsZWFmQ291bnQgPSByb290TGVhdmVzLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCBsZWFmSW5kZXggPSByb290TGVhdmVzLmZpbmRJbmRleCgobDogYW55KSA9PiBsID09IGxlYWYpO1xuICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUucmlnaHQgPSAoKChsZWFmQ291bnQgLSBsZWFmSW5kZXggLSAxKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpIC0gbGVhZi5jb250YWluZXJFbC5jbGllbnRXaWR0aCkgKyBcInB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlc2UgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSBkb25lIHdpdGggdGhlbVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlbW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXApO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIGFib3ZlIHR3byBldmVudCBsaXN0ZW5lcnNcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2Vtb3ZlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXApO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGx1Z2luIiwiUGxhdGZvcm0iLCJGaWxlVmlldyJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtB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
