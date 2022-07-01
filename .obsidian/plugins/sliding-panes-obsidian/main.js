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
    return PluginBase;
}(obsidian.Plugin));

var MIN_PANE_WIDTH = 200;
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
                _this.registerEvent(_this.app.workspace.on('window-open', _this.handleWindowOpen));
                _this.registerEvent(_this.app.vault.on('delete', _this.handleDelete));
                // wait for layout to be ready to perform the rest
                if (_this.app.workspace.layoutReady)
                    _this.reallyEnable();
            }
        };
        _this.handleWindowOpen = function (window) {
            _this.swizzleChildResize(window);
        };
        // really enable things (once the layout is ready)
        _this.reallyEnable = function () {
            // we don't need the event handler anymore
            _this.app.workspace.off('layout-ready', _this.reallyEnable);
            // add some extra classes that can't fit in the styles.css
            // because they use settings
            _this.addStyle();
            // get and loop through the root splits (there may be more than one if using popout windows)
            var rootSplits = _this.getRootSplits();
            rootSplits.forEach(function (rootSplit) {
                _this.swizzleChildResize(rootSplit);
            });
            // do all the calucations necessary for the workspace leaves
            _this.recalculateLeaves();
        };
        // shut down andy mode
        _this.disable = function () {
            // get rid of the extra style tag we added
            _this.removeStyle();
            // get and loop through the root splits (there may be more than one if using popout windows)
            var rootSplits = _this.getRootSplits();
            rootSplits.forEach(function (rootSplit) {
                _this.unswizzleChildResize(rootSplit);
                var rootLeaves = rootSplit.children;
                // loop through all the leaves
                rootLeaves.forEach(_this.clearLeaf);
            });
            _this.app.workspace.off('resize', _this.handleResize);
            _this.app.workspace.off('layout-change', _this.handleLayoutChange);
            _this.app.workspace.off('active-leaf-change', _this.handleActiveLeafChange);
            _this.app.workspace.off('window-open', _this.handleWindowOpen);
            _this.app.vault.off('delete', _this.handleDelete);
        };
        _this.clearLeaf = function (leaf) {
            leaf.containerEl.style.width = null;
            leaf.containerEl.style.left = null;
            leaf.containerEl.style.right = null;
            leaf.containerEl.style.flex = null;
            leaf.containerEl.style.flexGrow = leaf.dimension;
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
                        el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf,body.plugin-sliding-panes .mod-root>.workspace-split{width:".concat(_this.settings.leafDesktopWidth + _this.settings.headerWidth, "px;}");
                    }
                    else {
                        el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf,body.plugin-sliding-panes .mod-root>.workspace-split{width:".concat(_this.settings.leafMobileWidth + _this.settings.headerWidth, "px;}");
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
            // get and loop through the root splits (there may be more than one if using popout windows)
            var rootSplits = _this.getRootSplits();
            var rootLeaves = [];
            rootSplits.forEach(function (rootSplit) {
                rootLeaves.push.apply(rootLeaves, rootSplit.children);
            });
            if (rootLeaves.length < _this.prevRootLeaves.length) {
                _this.prevRootLeaves.forEach(function (leaf) {
                    if (!rootLeaves.contains(leaf)) {
                        _this.clearLeaf(leaf);
                    }
                });
            }
            _this.prevRootLeaves = rootLeaves;
            //this.recalculateLeaves();
        };
        _this.unswizzleChildResize = function (rootSplit) {
            rootSplit.onChildResizeStart = rootSplit.oldChildResizeStart;
        };
        _this.swizzleChildResize = function (rootSplit) {
            rootSplit.oldChildResizeStart = rootSplit.onChildResizeStart;
            rootSplit.onChildResizeStart = function (leaf, event) {
                // only really apply this to vertical splits
                if (rootSplit.direction === "vertical") {
                    // this is the width the leaf started at before resize
                    var startWidth_1 = leaf.width;
                    // the mousemove event to trigger while resizing
                    var mousemove_1 = function (e) {
                        // get the difference between the first position and current
                        var deltaX = e.pageX - event.pageX;
                        // adjust the start width by the delta
                        leaf.width = startWidth_1 + deltaX;
                        if (leaf.width < MIN_PANE_WIDTH)
                            leaf.width = MIN_PANE_WIDTH;
                        leaf.containerEl.style.width = leaf.width + "px";
                    };
                    // the mouseup event to trigger at the end of resizing
                    var mouseup_1 = function () {
                        // if stacking is enabled, we need to re-jig the "right" value
                        if (_this.settings.stackingEnabled) {
                            // we need the leaf count and index to calculate the correct value
                            var rootLeaves = rootSplit.children;
                            var leafCount = rootLeaves.length;
                            var leafIndex = rootLeaves.findIndex(function (l) { return l == leaf; });
                            for (var i = leafIndex; i < leafCount; i++) {
                                rootLeaves[i].containerEl.style.right = (((leafCount - i) * _this.settings.headerWidth) - rootLeaves[i].width) + "px";
                            }
                        }
                        // remove these event listeners. We're done with them
                        rootSplit.doc.removeEventListener("mousemove", mousemove_1);
                        rootSplit.doc.removeEventListener("mouseup", mouseup_1);
                        document.body.removeClass("is-grabbing");
                    };
                    // Add the above two event listeners
                    rootSplit.doc.addEventListener("mousemove", mousemove_1);
                    rootSplit.doc.addEventListener("mouseup", mouseup_1);
                    document.body.addClass("is-grabbing");
                }
            };
        };
        // Recalculate the leaf sizing and positions
        _this.recalculateLeaves = function () {
            var activeLeaf = _this.app.workspace.getLeaf();
            // get and loop through the root splits (there may be more than one if using popout windows)
            var rootSplits = _this.getRootSplits();
            rootSplits.forEach(function (rootSplit) {
                var rootContainerEl = rootSplit.containerEl;
                // get the client width of the root container once, before looping through the leaves
                var rootContainerElWidth = rootContainerEl.clientWidth;
                var rootLeaves = rootSplit.children;
                var leafCount = rootLeaves.length;
                var leafWidth = _this.settings.leafAutoWidth
                    ? (rootContainerElWidth - ((leafCount - 1) * _this.settings.headerWidth))
                    : (obsidian.Platform.isDesktop ? _this.settings.leafDesktopWidth : _this.settings.leafMobileWidth);
                var totalWidthEstimate = leafCount * leafWidth;
                var widthChange = false;
                // loop through all the leaves
                rootLeaves.forEach(function (leaf, i) {
                    var containerEl = leaf.containerEl;
                    // the default values for the leaf
                    var flex = '1 0 0';
                    var width = leaf.width;
                    // if the leaf was previously "flex", then the width will be out of whack
                    if (containerEl.style.flexBasis)
                        width = leafWidth;
                    var left = null;
                    var right = null;
                    if (totalWidthEstimate > rootContainerElWidth) {
                        // if the total width is greater than the root container width, we need to limit the leaves
                        flex = null;
                        if (!width)
                            width = leafWidth;
                        if (_this.settings.stackingEnabled) {
                            // if stacking is enabled, we need to set the left and right values
                            left = (i * _this.settings.headerWidth) + "px";
                            right = (((leafCount - i) * _this.settings.headerWidth) - leafWidth) + "px";
                        }
                    }
                    // set the html attributes for the leaf (if they have changed)
                    if (containerEl.style.flex != flex || containerEl.style.width != width + "px" || containerEl.style.left != left || containerEl.style.right != right) {
                        widthChange = containerEl.style.width != width + "px";
                        var style = { flex: flex, left: left, right: right, width: width + "px" };
                        Object.assign(containerEl.style, style);
                    }
                    // set the leaf's width for later reference
                    leaf.width = width;
                    if (leaf instanceof obsidian.WorkspaceLeaf) {
                        var iconEl = leaf.view.iconEl;
                        var iconText = iconEl.getAttribute("aria-label");
                        if (!iconText.includes("(")) {
                            iconEl.setAttribute("aria-label", "".concat(leaf.getDisplayText(), " (").concat(iconText, ")"));
                        }
                    }
                });
                // if the active leaf is in the current container, and the width has changed, refocus the active leaf
                if (activeLeaf.getContainer() === rootSplit && widthChange)
                    _this.focusLeaf(activeLeaf, !_this.settings.leafAutoWidth);
            });
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
        _this.getRootSplits = function () {
            var rootSplits = [];
            // push the main window's root split to the list
            rootSplits.push(_this.app.workspace.rootSplit);
            var floatingSplit = _this.app.workspace.floatingSplit;
            floatingSplit.children.forEach(function (child) {
                // if this is a window, push it to the list 
                if (child instanceof obsidian.WorkspaceWindow) {
                    rootSplits.push(child);
                }
            });
            return rootSplits;
        };
        return _this;
    }
    SlidingPanesPlugin.prototype.selectOrientation = function (orient) {
        document.body.classList.toggle('plugin-sliding-select-orientation-mixed', orient == 'mixed');
        document.body.classList.toggle('plugin-sliding-select-orientation-upright', orient == 'upright');
        document.body.classList.toggle('plugin-sliding-select-orientation-sideway', orient == 'sideway');
    };
    SlidingPanesPlugin.prototype.focusLeaf = function (activeLeaf, animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        var rootSplit = activeLeaf.getContainer();
        while (activeLeaf != null && activeLeaf.parentSplit != null && activeLeaf.parentSplit !== rootSplit) {
            activeLeaf = activeLeaf.parentSplit;
        }
        if (activeLeaf != null && activeLeaf.parentSplit != null && activeLeaf.parentSplit === rootSplit) {
            var rootContainerEl = rootSplit.containerEl;
            var rootLeaves = rootSplit.children;
            var leafCount = rootLeaves.length;
            // get the index of the active leaf
            // also, get the position of this leaf, so we can scroll to it
            // as leaves are resizable, we have to iterate through all leaves to the
            // left until we get to the active one and add all their widths together
            var position_1 = 0;
            this.activeLeafIndex = -1;
            rootLeaves.forEach(function (leaf, index) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9wbHVnaW4tYmFzZS50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IHR5cGUgT3JpZW50YXRpb24gPSBcInNpZGV3YXlcIiB8IFwibWl4ZWRcIiB8IFwidXByaWdodFwiXG5cbmRlY2xhcmUgY2xhc3MgU2xpZGluZ1BhbmVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFNsaWRpbmdQYW5lc1NldHRpbmdzO1xuICBkaXNhYmxlKCk6IHZvaWQ7XG4gIGVuYWJsZSgpOiB2b2lkO1xuICByZWZyZXNoKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNTZXR0aW5ncyB7XG4gIGhlYWRlcldpZHRoOiBudW1iZXIgPSAzMjtcbiAgbGVhZkRlc2t0b3BXaWR0aDogbnVtYmVyID0gNzAwO1xuICBsZWFmTW9iaWxlV2lkdGg6IG51bWJlciA9IDM1MDtcbiAgbGVhZkF1dG9XaWR0aDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICByb3RhdGVIZWFkZXJzOiBib29sZWFuID0gdHJ1ZTtcbiAgaGVhZGVyQWx0OiBib29sZWFuID0gZmFsc2U7XG4gIG9yaWVuYXRpb246IE9yaWVudGF0aW9uID0gXCJtaXhlZFwiO1xuICBzdGFja2luZ0VuYWJsZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICBzbW9vdGhBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xufVxuXG5leHBvcnQgY2xhc3MgU2xpZGluZ1BhbmVzU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXG4gIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBTbGlkaW5nUGFuZXNQbHVnaW4pIHtcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gIH1cblxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgU2xpZGluZyBQYW5lc1wiKVxuICAgICAgLnNldERlc2MoXCJUdXJucyBzbGlkaW5nIHBhbmVzIG9uIG9yIG9mZiBnbG9iYWxseVwiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZClcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkID0gIXZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmRpc2FibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1Ntb290aCBBbmltYXRpb24nKVxuICAgICAgLnNldERlc2MoJ1doZXRoZXIgdG8gdXNlIHNtb290aCBhbmltYXRpb24gKG9uKSBvciBzbmFwcGluZyAob2ZmKScpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc21vb3RoQW5pbWF0aW9uKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc21vb3RoQW5pbWF0aW9uID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnTGVhZiBBdXRvIFdpZHRoJylcbiAgICAgIC5zZXREZXNjKCdJZiBvbiwgdGhlIHdpZHRoIG9mIHRoZSBwYW5lIHNob3VsZCBmaWxsIHRoZSBhdmFpbGFibGUgc3BhY2UnKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnTGVhZiBXaWR0aCBvbiBEZXNrdG9wJylcbiAgICAgIC5zZXREZXNjKCdUaGUgd2lkdGggb2YgYSBzaW5nbGUgcGFuZSAob25seSBpZiBhdXRvIHdpZHRoIGlzIG9mZiknKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiA3MDAnKVxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZEZXNrdG9wV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmRGVza3RvcFdpZHRoID0gcGFyc2VJbnQodmFsdWUudHJpbSgpKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdMZWFmIFdpZHRoIG9uIE1vYmlsZScpXG4gICAgICAuc2V0RGVzYygnVGhlIHdpZHRoIG9mIGEgc2luZ2xlIHBhbmUgKG9ubHkgaWYgYXV0byB3aWR0aCBpcyBvZmYpJylcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignRXhhbXBsZTogMzUwJylcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmTW9iaWxlV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmTW9iaWxlV2lkdGggPSBwYXJzZUludCh2YWx1ZS50cmltKCkpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgcm90YXRlZCBoZWFkZXJzXCIpXG4gICAgICAuc2V0RGVzYyhcIlJvdGF0ZXMgaGVhZGVycyB0byB1c2UgYXMgc3BpbmVzXCIpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mucm90YXRlSGVhZGVycylcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnJvdGF0ZUhlYWRlcnMgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiU3dhcCByb3RhdGVkIGhlYWRlciBkaXJlY3Rpb25cIilcbiAgICAgIC5zZXREZXNjKFwiU3dhcHMgdGhlIGRpcmVjdGlvbiBvZiByb3RhdGVkIGhlYWRlcnNcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJBbHQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJBbHQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAuc2V0TmFtZShcIkhlYWRlciB0ZXh0IG9yaWVudGF0aW9uXCIpXG4gICAgLnNldERlc2MoXCJTZWxlY3QgdGhlIGhlYWRlciB0ZXh0IG9yaWVudGF0aW9uXCIpXG4gICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwic2lkZXdheVwiLCBcIlNpZGV3YXlcIilcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcIm1peGVkXCIsIFwiTWl4ZWRcIilcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcInVwcmlnaHRcIiwgXCJVcHJpZ2h0XCIpXG4gICAgICBkcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcmllbmF0aW9uKVxuICAgICAgZHJvcGRvd24ub25DaGFuZ2UoKHZhbHVlOiBPcmllbnRhdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcmllbmF0aW9uID0gdmFsdWU7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgfSl9KTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgc3RhY2tpbmdcIilcbiAgICAgIC5zZXREZXNjKFwiUGFuZXMgd2lsbCBzdGFjayB1cCB0byB0aGUgbGVmdCBhbmQgcmlnaHRcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdTcGluZSBXaWR0aCcpXG4gICAgICAuc2V0RGVzYygnVGhlIHdpZHRoIG9mIHRoZSByb3RhdGVkIGhlYWRlciAob3IgZ2FwKSBmb3Igc3RhY2tpbmcnKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiAzMicpXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNDb21tYW5kcyB7XG4gIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbikge1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgc2V0dGluZ05hbWU6c3RyaW5nKSB7XG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogaWQsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBzZXR0aW5nLCBzYXZlIGFuZCByZWZyZXNoXG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5nc1tzZXR0aW5nTmFtZV0gPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbW1hbmRzKCk6IHZvaWQge1xuICAgIC8vIGFkZCB0aGUgdG9nZ2xlIG9uL29mZiBjb21tYW5kXG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzJyxcbiAgICAgIG5hbWU6ICdUb2dnbGUgU2xpZGluZyBQYW5lcycsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAvLyBzd2l0Y2ggdGhlIGRpc2FibGVkIHNldHRpbmcgYW5kIHNhdmVcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblxuICAgICAgICAvLyBkaXNhYmxlIG9yIGVuYWJsZSBhcyBuZWNlc3NhcnlcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPyB0aGlzLnBsdWdpbi5kaXNhYmxlKCkgOiB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHNtb290aCBhbmltYXRpb25cbiAgICB0aGlzLmFkZFRvZ2dsZVNldHRpbmdDb21tYW5kKCd0b2dnbGUtc2xpZGluZy1wYW5lcy1zbW9vdGgtYW5pbWF0aW9uJywgJ1RvZ2dsZSBTbW9vdGggQW5pbWF0aW9uJywgJ3Ntb290aEFuaW1hdGlvbicpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgbGVhZiBhdXRvIHdpZHRoXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtbGVhZi1hdXRvLXdpZHRoJywgJ1RvZ2dsZSBMZWFmIEF1dG8gV2lkdGgnLCAnbGVhZkF1dG9XaWR0aCcpO1xuICAgIFxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHN0YWNraW5nXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtc3RhY2tpbmcnLCAnVG9nZ2xlIFN0YWNraW5nJywgJ3N0YWNraW5nRW5hYmxlZCcpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgcm90YXRlZCBoZWFkZXJzXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtcm90YXRlZC1oZWFkZXJzJywgJ1RvZ2dsZSBSb3RhdGVkIEhlYWRlcnMnLCAncm90YXRlSGVhZGVycycpO1xuXG4gICAgLy8gYWRkIGEgY29tbWFuZCB0byB0b2dnbGUgc3dhcHBlZCBoZWFkZXIgZGlyZWN0aW9uXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtaGVhZGVyLWFsdCcsICdTd2FwIHJvdGF0ZWQgaGVhZGVyIGRpcmVjdGlvbicsICdoZWFkZXJBbHQnKTtcbiAgfVxufSIsImltcG9ydCAnLi9zdHlsZXMuc2NzcydcbmltcG9ydCB7IFBsdWdpbiB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBsdWdpbkJhc2UgZXh0ZW5kcyBQbHVnaW4ge1xuXG4gIC8vIGdldCB0aGUgY2xhc3MgbmFtZSBmb3IgdGhlIHBsdWdpblxuICBwcml2YXRlIF9jYWNoZWRDbGFzc05hbWU6IHN0cmluZztcbiAgZ2V0IGNsYXNzTmFtZSgpIHtcbiAgICBpZiAoIXRoaXMuX2NhY2hlZENsYXNzTmFtZSkge1xuICAgICAgdGhpcy5fY2FjaGVkQ2xhc3NOYW1lID0gJ3BsdWdpbi0nICsgdGhpcy5tYW5pZmVzdC5pZDtcbiAgICAgIGlmICh0aGlzLl9jYWNoZWRDbGFzc05hbWUuZW5kc1dpdGgoJy1vYnNpZGlhbicpKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlZENsYXNzTmFtZSA9IHRoaXMuX2NhY2hlZENsYXNzTmFtZS5zdWJzdHJpbmcoMCwgdGhpcy5fY2FjaGVkQ2xhc3NOYW1lLmxhc3RJbmRleE9mKCctb2JzaWRpYW4nKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZENsYXNzTmFtZTtcbiAgfVxuXG4gIC8vIHJ1bnMgd2hlbiB0aGUgcGx1Z2luIGlzIGxvYWRlZFxuICBvbmxvYWQgPSAoKSA9PiB7XG4gICAgLy8gYWRkIGluIHRoZSByZXF1aXJlZCBjb21tYW5kIHBhbGxldGUgY29tbWFuZHNcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG5cbiAgICAvLyBhZGQgaW4gYW55IHNldHRpbmdzXG4gICAgdGhpcy5hZGRTZXR0aW5ncygpO1xuXG4gICAgLy8gd2FpdCBmb3IgbGF5b3V0IHRvIGJlIHJlYWR5IHRvIHBlcmZvcm0gdGhlIHJlc3RcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSh0aGlzLm9uTGF5b3V0UmVhZHkpO1xuICB9XG5cbiAgLy8gcnVucyB3aGVuIHRoZSBwbHVnaW4gaXMgb25sb2FkZWRcbiAgb251bmxvYWQgPSAoKSA9PiB7XG4gICAgLy8gcnVuIHRocm91Z2ggdGhlIGRpc2FibGUgc3RlcHNcbiAgICB0aGlzLmRpc2FibGUoKTtcbiAgfVxuXG4gIC8vIHJ1bnMgb25jZSB0aGUgbGF5b3V0IGlzIHJlYWR5IHRoZSBmaXJzdCB0aW1lIHRoZSBwbHVnaW4gaXMgc3RhcnRlZFxuICBvbkxheW91dFJlYWR5ID0gKCkgPT4ge1xuICAgIHRoaXMuZW5hYmxlKCk7XG4gIH1cbiAgXG4gIC8vIHBlcmZvcm0gYW55IHNldHVwIHJlcXVpcmVkIHRvIGVuYWJsZSB0aGUgcGx1Z2luXG4gIGVuYWJsZSA9ICgpOiB2b2lkID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LnRvZ2dsZUNsYXNzKHRoaXMuY2xhc3NOYW1lLCB0cnVlKTtcbiAgfVxuXG4gIC8vIHBlcmZvcm0gYW55IHJlcXVpcmVkIGRpc2FibGUgc3RlcHMsIGxlYXZlIG5vdGhpbmcgYmVoaW5kXG4gIGRpc2FibGUgPSAoKTogdm9pZCA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS50b2dnbGVDbGFzcyh0aGlzLmNsYXNzTmFtZSwgZmFsc2UpO1xuICB9XG5cbiAgLy8gYWRkIGluIGFueSByZXF1aXJlZCBjb21tYW5kIHBhbGxldGUgY29tbWFuZHNcbiAgYWRkQ29tbWFuZHMgPSAoKTogdm9pZCA9PiB7IH07XG5cbiAgLy8gYWRkIGluIGFueSBzZXR0aW5nc1xuICBhZGRTZXR0aW5ncyA9ICgpOiB2b2lkID0+IHsgfTtcbn1cbiIsImltcG9ydCB7IEZpbGVWaWV3LCBUQWJzdHJhY3RGaWxlLCBXb3Jrc3BhY2VMZWFmLCBQbGF0Zm9ybSwgV29ya3NwYWNlV2luZG93LCBXb3Jrc3BhY2VQYXJlbnQsIFdvcmtzcGFjZUl0ZW0gfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgeyBXb3Jrc3BhY2VFeHQsIFdvcmtzcGFjZUl0ZW1FeHQsIFdvcmtzcGFjZVBhcmVudEV4dCB9IGZyb20gJy4vb2JzaWRpYW4tZXh0JztcbmltcG9ydCB7IFNsaWRpbmdQYW5lc1NldHRpbmdzLCBTbGlkaW5nUGFuZXNTZXR0aW5nVGFiLCBTbGlkaW5nUGFuZXNDb21tYW5kcywgT3JpZW50YXRpb24gfSBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCB7IFBsdWdpbkJhc2UgfSBmcm9tICcuL3BsdWdpbi1iYXNlJ1xuXG5jb25zdCBNSU5fUEFORV9XSURUSCA9IDIwMDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRpbmdQYW5lc1BsdWdpbiBleHRlbmRzIFBsdWdpbkJhc2Uge1xuICBzZXR0aW5nczogU2xpZGluZ1BhbmVzU2V0dGluZ3M7XG5cbiAgLy8gaGVscGVyIHZhcmlhYmxlc1xuICBwcml2YXRlIGFjdGl2ZUxlYWZJbmRleDogbnVtYmVyID0gMDtcblxuICBwcml2YXRlIHByZXZSb290TGVhdmVzOiBXb3Jrc3BhY2VJdGVtRXh0W10gPSBbXTtcbiAgXG4gIC8vIHJ1bnMgd2hlbiB0aGUgcGx1Z2luIGlzIGxvYWRlZFxuICBvbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gbG9hZCBzZXR0aW5nc1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBTbGlkaW5nUGFuZXNTZXR0aW5ncygpLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXG4gICAgLy8gYWRkIGluIHRoZSByZXF1aXJlZCBjb21tYW5kIHBhbGxldGUgY29tbWFuZHNcbiAgICB0aGlzLmFkZENvbW1hbmRzKCk7XG5cbiAgICAvLyBhZGQgaW4gYW55IHNldHRpbmdzXG4gICAgdGhpcy5hZGRTZXR0aW5ncygpO1xuXG4gICAgLy8gd2FpdCBmb3IgbGF5b3V0IHRvIGJlIHJlYWR5IHRvIHBlcmZvcm0gdGhlIHJlc3RcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSh0aGlzLm9uTGF5b3V0UmVhZHkpO1xuICB9XG5cbiAgLy8gYWRkIGluIGFueSByZXF1aXJlZCBjb21tYW5kIHBhbGxldGUgY29tbWFuZHNcbiAgYWRkQ29tbWFuZHMgPSAoKSA9PiB7XG4gICAgLy8gYWRkIHRoZSBjb21tYW5kc1xuICAgIG5ldyBTbGlkaW5nUGFuZXNDb21tYW5kcyh0aGlzKS5hZGRDb21tYW5kcygpO1xuICB9XG5cbiAgLy8gYWRkIGluIGFueSBzZXR0aW5nc1xuICBhZGRTZXR0aW5ncyA9ICgpID0+IHtcbiAgICAvLyBhZGQgdGhlIHNldHRpbmdzIHRhYlxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2xpZGluZ1BhbmVzU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuICB9XG5cbiAgLy8gZW5hYmxlIGFuZHkgbW9kZVxuICBlbmFibGUgPSAoKSA9PiB7XG4gICAgaWYoIXRoaXMuc2V0dGluZ3M/LmRpc2FibGVkKSB7XG4gICAgICAvLyBhZGQgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSkpO1xuICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbignbGF5b3V0LWNoYW5nZScsIHRoaXMuaGFuZGxlTGF5b3V0Q2hhbmdlKSk7XG4gICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdhY3RpdmUtbGVhZi1jaGFuZ2UnLCB0aGlzLmhhbmRsZUFjdGl2ZUxlYWZDaGFuZ2UpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ3dpbmRvdy1vcGVuJywgdGhpcy5oYW5kbGVXaW5kb3dPcGVuKSlcbiAgICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignZGVsZXRlJywgdGhpcy5oYW5kbGVEZWxldGUpKTtcblxuICAgICAgLy8gd2FpdCBmb3IgbGF5b3V0IHRvIGJlIHJlYWR5IHRvIHBlcmZvcm0gdGhlIHJlc3RcbiAgICAgIGlmKHRoaXMuYXBwLndvcmtzcGFjZS5sYXlvdXRSZWFkeSkgdGhpcy5yZWFsbHlFbmFibGUoKSBcbiAgICB9XG4gIH1cblxuICBoYW5kbGVXaW5kb3dPcGVuID0gKHdpbmRvdzogV29ya3NwYWNlV2luZG93KSA9PiB7XG4gICAgdGhpcy5zd2l6emxlQ2hpbGRSZXNpemUod2luZG93IGFzIFdvcmtzcGFjZVBhcmVudCBhcyBXb3Jrc3BhY2VQYXJlbnRFeHQpXG4gIH1cblxuICAvLyByZWFsbHkgZW5hYmxlIHRoaW5ncyAob25jZSB0aGUgbGF5b3V0IGlzIHJlYWR5KVxuICByZWFsbHlFbmFibGUgPSAoKSA9PiB7XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0aGUgZXZlbnQgaGFuZGxlciBhbnltb3JlXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9mZignbGF5b3V0LXJlYWR5JywgdGhpcy5yZWFsbHlFbmFibGUpO1xuXG4gICAgLy8gYWRkIHNvbWUgZXh0cmEgY2xhc3NlcyB0aGF0IGNhbid0IGZpdCBpbiB0aGUgc3R5bGVzLmNzc1xuICAgIC8vIGJlY2F1c2UgdGhleSB1c2Ugc2V0dGluZ3NcbiAgICB0aGlzLmFkZFN0eWxlKCk7XG5cbiAgICAvLyBnZXQgYW5kIGxvb3AgdGhyb3VnaCB0aGUgcm9vdCBzcGxpdHMgKHRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIGlmIHVzaW5nIHBvcG91dCB3aW5kb3dzKVxuICAgIGNvbnN0IHJvb3RTcGxpdHMgPSB0aGlzLmdldFJvb3RTcGxpdHMoKTtcbiAgICByb290U3BsaXRzLmZvckVhY2goKHJvb3RTcGxpdDogV29ya3NwYWNlUGFyZW50RXh0KSA9PiB7XG4gICAgICB0aGlzLnN3aXp6bGVDaGlsZFJlc2l6ZShyb290U3BsaXQpXG4gICAgfSk7XG5cbiAgICAvLyBkbyBhbGwgdGhlIGNhbHVjYXRpb25zIG5lY2Vzc2FyeSBmb3IgdGhlIHdvcmtzcGFjZSBsZWF2ZXNcbiAgICB0aGlzLnJlY2FsY3VsYXRlTGVhdmVzKCk7XG4gIH1cblxuICAvLyBzaHV0IGRvd24gYW5keSBtb2RlXG4gIGRpc2FibGUgPSAoKSA9PiB7XG5cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSBleHRyYSBzdHlsZSB0YWcgd2UgYWRkZWRcbiAgICB0aGlzLnJlbW92ZVN0eWxlKCk7XG5cbiAgICAvLyBnZXQgYW5kIGxvb3AgdGhyb3VnaCB0aGUgcm9vdCBzcGxpdHMgKHRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIGlmIHVzaW5nIHBvcG91dCB3aW5kb3dzKVxuICAgIGNvbnN0IHJvb3RTcGxpdHMgPSB0aGlzLmdldFJvb3RTcGxpdHMoKTtcbiAgICByb290U3BsaXRzLmZvckVhY2goKHJvb3RTcGxpdDogV29ya3NwYWNlUGFyZW50RXh0KSA9PiB7XG4gICAgICB0aGlzLnVuc3dpenpsZUNoaWxkUmVzaXplKHJvb3RTcGxpdClcbiAgICAgIGNvbnN0IHJvb3RMZWF2ZXM6V29ya3NwYWNlSXRlbUV4dFtdID0gcm9vdFNwbGl0LmNoaWxkcmVuXG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGxlYXZlc1xuICAgICAgcm9vdExlYXZlcy5mb3JFYWNoKHRoaXMuY2xlYXJMZWFmKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vZmYoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKVxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vZmYoJ2xheW91dC1jaGFuZ2UnLCB0aGlzLmhhbmRsZUxheW91dENoYW5nZSlcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub2ZmKCdhY3RpdmUtbGVhZi1jaGFuZ2UnLCB0aGlzLmhhbmRsZUFjdGl2ZUxlYWZDaGFuZ2UpXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9mZignd2luZG93LW9wZW4nLCB0aGlzLmhhbmRsZVdpbmRvd09wZW4pXG4gICAgdGhpcy5hcHAudmF1bHQub2ZmKCdkZWxldGUnLCB0aGlzLmhhbmRsZURlbGV0ZSlcbiAgfVxuXG4gIGNsZWFyTGVhZiA9IChsZWFmOiBhbnkpID0+IHtcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLndpZHRoID0gbnVsbFxuICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUubGVmdCA9IG51bGxcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnJpZ2h0ID0gbnVsbFxuICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUuZmxleCA9IG51bGxcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLmZsZXhHcm93ID0gbGVhZi5kaW1lbnNpb25cbiAgICBsZWFmLmNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1sZWZ0LW9mLWFjdGl2ZScpO1xuICAgIGxlYWYuY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuXG4gICAgY29uc3QgaWNvbkVsID0gbGVhZi52aWV3Lmljb25FbDtcbiAgICBjb25zdCBpY29uVGV4dDpzdHJpbmcgPSBpY29uRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICBpZiAoaWNvblRleHQuaW5jbHVkZXMoXCIoXCIpKSB7XG4gICAgICBpY29uRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpY29uVGV4dC5zdWJzdHJpbmcoaWNvblRleHQubGFzdEluZGV4T2YoJygnKSArIDEsIGljb25UZXh0Lmxhc3RJbmRleE9mKCcpJykpKTtcbiAgICB9XG4gIH1cblxuICAvLyByZWZyZXNoIGZ1bmNpb24gZm9yIHdoZW4gd2UgY2hhbmdlIHNldHRpbmdzXG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgLy8gcmUtbG9hZCB0aGUgc3R5bGVcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKClcbiAgICAvLyByZWNhbGN1bGF0ZSBsZWFmIHBvc2l0aW9uc1xuICAgIHRoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSB0aGUgc3RseWluZyBlbGVtZW50cyB3ZSd2ZSBjcmVhdGVkXG4gIHJlbW92ZVN0eWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG4gICAgaWYgKGVsKSBlbC5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1yb3RhdGUtaGVhZGVyJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1oZWFkZXItYWx0Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1zdGFja2luZycpO1xuICB9XG5cbiAgLy8gYWRkIHRoZSBzdHlsaW5nIGVsZW1lbnRzIHdlIG5lZWRcbiAgYWRkU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gYWRkIGEgY3NzIGJsb2NrIGZvciBvdXIgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuICAgIGNvbnN0IGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY3NzLmlkID0gJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcblxuICAgIC8vIGFkZCB0aGUgbWFpbiBjbGFzc1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgc3R5bGUgd2l0aCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgc3R5bGVzIChhdCB0aGUgc3RhcnQsIG9yIGFzIHRoZSByZXN1bHQgb2YgYSBzZXR0aW5ncyBjaGFuZ2UpXG4gIHVwZGF0ZVN0eWxlID0gKCkgPT4ge1xuICAgIC8vIGlmIHdlJ3ZlIGdvdCByb3RhdGUgaGVhZGVycyBvbiwgYWRkIHRoZSBjbGFzcyB3aGljaCBlbmFibGVzIGl0XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1yb3RhdGUtaGVhZGVyJywgdGhpcy5zZXR0aW5ncy5yb3RhdGVIZWFkZXJzKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLWhlYWRlci1hbHQnLCB0aGlzLnNldHRpbmdzLmhlYWRlckFsdClcbiAgICAvLyBkbyB0aGUgc2FtZSBmb3Igc3RhY2tpbmdcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLXN0YWNraW5nJywgdGhpcy5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpO1xuICAgIFxuICAgIC8vIGdldCB0aGUgY3VzdG9tIGNzcyBlbGVtZW50XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcbiAgICBpZiAoIWVsKSB0aHJvdyBcInBsdWdpbi1zbGlkaW5nLXBhbmVzIGVsZW1lbnQgbm90IGZvdW5kIVwiO1xuICAgIGVsc2Uge1xuICAgICAgLy8gc2V0IHRoZSBzZXR0aW5ncy1kZXBlbmRlbnQgY3NzXG4gICAgICBlbC5pbm5lclRleHQgPSBgYm9keS5wbHVnaW4tc2xpZGluZy1wYW5lc3stLWhlYWRlci13aWR0aDoke3RoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MubGVhZkF1dG9XaWR0aCkge1xuICAgICAgICBpZiAoUGxhdGZvcm0uaXNEZXNrdG9wKSB7XG4gICAgICAgICAgZWwuaW5uZXJUZXh0ICs9IGBib2R5LnBsdWdpbi1zbGlkaW5nLXBhbmVzIC5tb2Qtcm9vdD4ud29ya3NwYWNlLWxlYWYsYm9keS5wbHVnaW4tc2xpZGluZy1wYW5lcyAubW9kLXJvb3Q+LndvcmtzcGFjZS1zcGxpdHt3aWR0aDoke3RoaXMuc2V0dGluZ3MubGVhZkRlc2t0b3BXaWR0aCArIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZWwuaW5uZXJUZXh0ICs9IGBib2R5LnBsdWdpbi1zbGlkaW5nLXBhbmVzIC5tb2Qtcm9vdD4ud29ya3NwYWNlLWxlYWYsYm9keS5wbHVnaW4tc2xpZGluZy1wYW5lcyAubW9kLXJvb3Q+LndvcmtzcGFjZS1zcGxpdHt3aWR0aDoke3RoaXMuc2V0dGluZ3MubGVhZk1vYmlsZVdpZHRoICsgdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aH1weDt9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5yb3RhdGVIZWFkZXJzKXtcbiAgICAgIHRoaXMuc2VsZWN0T3JpZW50YXRpb24odGhpcy5zZXR0aW5ncy5vcmllbmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBzZWxlY3RPcmllbnRhdGlvbihvcmllbnQ6IE9yaWVudGF0aW9uKSB7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1zZWxlY3Qtb3JpZW50YXRpb24tbWl4ZWQnLCBvcmllbnQgPT0gJ21peGVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1zZWxlY3Qtb3JpZW50YXRpb24tdXByaWdodCcsIG9yaWVudCA9PSAndXByaWdodCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctc2VsZWN0LW9yaWVudGF0aW9uLXNpZGV3YXknLCBvcmllbnQgPT0gJ3NpZGV3YXknKTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5hcHAud29ya3NwYWNlLmxheW91dFJlYWR5KSB7XG4gICAgICB0aGlzLnJlY2FsY3VsYXRlTGVhdmVzKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTGF5b3V0Q2hhbmdlID0gKCkgPT4ge1xuICAgIFxuICAgIC8vIGdldCBhbmQgbG9vcCB0aHJvdWdoIHRoZSByb290IHNwbGl0cyAodGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmUgaWYgdXNpbmcgcG9wb3V0IHdpbmRvd3MpXG4gICAgY29uc3Qgcm9vdFNwbGl0cyA9IHRoaXMuZ2V0Um9vdFNwbGl0cygpO1xuICAgIGNvbnN0IHJvb3RMZWF2ZXM6V29ya3NwYWNlSXRlbUV4dFtdID0gW107XG4gICAgcm9vdFNwbGl0cy5mb3JFYWNoKChyb290U3BsaXQ6IFdvcmtzcGFjZVBhcmVudEV4dCkgPT4ge1xuICAgICAgcm9vdExlYXZlcy5wdXNoKC4uLnJvb3RTcGxpdC5jaGlsZHJlbilcbiAgICB9KTtcbiAgICBpZiAocm9vdExlYXZlcy5sZW5ndGggPCB0aGlzLnByZXZSb290TGVhdmVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcmV2Um9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyb290TGVhdmVzLmNvbnRhaW5zKGxlYWYpKSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxlYWYobGVhZik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMucHJldlJvb3RMZWF2ZXMgPSByb290TGVhdmVzO1xuICAgIC8vdGhpcy5yZWNhbGN1bGF0ZUxlYXZlcygpO1xuICB9XG5cbiAgdW5zd2l6emxlQ2hpbGRSZXNpemUgPSAocm9vdFNwbGl0OiBXb3Jrc3BhY2VQYXJlbnRFeHQpID0+IHtcbiAgICByb290U3BsaXQub25DaGlsZFJlc2l6ZVN0YXJ0ID0gcm9vdFNwbGl0Lm9sZENoaWxkUmVzaXplU3RhcnQ7XG4gIH1cblxuICBzd2l6emxlQ2hpbGRSZXNpemUgPSAocm9vdFNwbGl0OiBXb3Jrc3BhY2VQYXJlbnRFeHQpID0+IHtcbiAgICByb290U3BsaXQub2xkQ2hpbGRSZXNpemVTdGFydCA9IHJvb3RTcGxpdC5vbkNoaWxkUmVzaXplU3RhcnRcbiAgICByb290U3BsaXQub25DaGlsZFJlc2l6ZVN0YXJ0ID0gKGxlYWY6IFdvcmtzcGFjZUl0ZW1FeHQsIGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAvLyBvbmx5IHJlYWxseSBhcHBseSB0aGlzIHRvIHZlcnRpY2FsIHNwbGl0c1xuICAgICAgaWYgKHJvb3RTcGxpdC5kaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSB3aWR0aCB0aGUgbGVhZiBzdGFydGVkIGF0IGJlZm9yZSByZXNpemVcbiAgICAgICAgY29uc3Qgc3RhcnRXaWR0aCA9IGxlYWYud2lkdGg7XG4gIFxuICAgICAgICAvLyB0aGUgbW91c2Vtb3ZlIGV2ZW50IHRvIHRyaWdnZXIgd2hpbGUgcmVzaXppbmdcbiAgICAgICAgY29uc3QgbW91c2Vtb3ZlID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAgIC8vIGdldCB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBmaXJzdCBwb3NpdGlvbiBhbmQgY3VycmVudFxuICAgICAgICAgIGNvbnN0IGRlbHRhWCA9IGUucGFnZVggLSBldmVudC5wYWdlWDtcbiAgICAgICAgICAvLyBhZGp1c3QgdGhlIHN0YXJ0IHdpZHRoIGJ5IHRoZSBkZWx0YVxuICAgICAgICAgIGxlYWYud2lkdGggPSBzdGFydFdpZHRoICsgZGVsdGFYXG4gICAgICAgICAgaWYobGVhZi53aWR0aCA8IE1JTl9QQU5FX1dJRFRIKSBsZWFmLndpZHRoID0gTUlOX1BBTkVfV0lEVEg7XG4gICAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS53aWR0aCA9IGxlYWYud2lkdGggKyBcInB4XCI7XG4gICAgICAgIH1cbiAgXG4gICAgICAgIC8vIHRoZSBtb3VzZXVwIGV2ZW50IHRvIHRyaWdnZXIgYXQgdGhlIGVuZCBvZiByZXNpemluZ1xuICAgICAgICBjb25zdCBtb3VzZXVwID0gKCkgPT4ge1xuICAgICAgICAgIC8vIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIG5lZWQgdG8gcmUtamlnIHRoZSBcInJpZ2h0XCIgdmFsdWVcbiAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdGhlIGxlYWYgY291bnQgYW5kIGluZGV4IHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCB2YWx1ZVxuICAgICAgICAgICAgY29uc3Qgcm9vdExlYXZlcyA9IHJvb3RTcGxpdC5jaGlsZHJlbjtcbiAgICAgICAgICAgIGNvbnN0IGxlYWZDb3VudCA9IHJvb3RMZWF2ZXMubGVuZ3RoO1xuICAgICAgICAgICAgY29uc3QgbGVhZkluZGV4ID0gcm9vdExlYXZlcy5maW5kSW5kZXgoKGw6IGFueSkgPT4gbCA9PSBsZWFmKTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IGxlYWZJbmRleDsgaSA8IGxlYWZDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgIHJvb3RMZWF2ZXNbaV0uY29udGFpbmVyRWwuc3R5bGUucmlnaHQgPSAoKChsZWFmQ291bnQgLSBpKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpIC0gcm9vdExlYXZlc1tpXS53aWR0aCkgKyBcInB4XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICBcbiAgICAgICAgICAvLyByZW1vdmUgdGhlc2UgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSBkb25lIHdpdGggdGhlbVxuICAgICAgICAgIHJvb3RTcGxpdC5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZW1vdmUpO1xuICAgICAgICAgIHJvb3RTcGxpdC5kb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cCk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcyhcImlzLWdyYWJiaW5nXCIpO1xuICAgICAgICB9XG4gIFxuICAgICAgICAvLyBBZGQgdGhlIGFib3ZlIHR3byBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgcm9vdFNwbGl0LmRvYy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlbW92ZSk7XG4gICAgICAgIHJvb3RTcGxpdC5kb2MuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkQ2xhc3MoXCJpcy1ncmFiYmluZ1wiKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlY2FsY3VsYXRlIHRoZSBsZWFmIHNpemluZyBhbmQgcG9zaXRpb25zXG4gIHJlY2FsY3VsYXRlTGVhdmVzID0gKCkgPT4ge1xuICAgIGxldCBhY3RpdmVMZWFmOiBXb3Jrc3BhY2VJdGVtRXh0ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldExlYWYoKSBhcyBXb3Jrc3BhY2VJdGVtIGFzIFdvcmtzcGFjZUl0ZW1FeHQ7XG4gICAgLy8gZ2V0IGFuZCBsb29wIHRocm91Z2ggdGhlIHJvb3Qgc3BsaXRzICh0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBpZiB1c2luZyBwb3BvdXQgd2luZG93cylcbiAgICBjb25zdCByb290U3BsaXRzID0gdGhpcy5nZXRSb290U3BsaXRzKCk7XG4gICAgcm9vdFNwbGl0cy5mb3JFYWNoKChyb290U3BsaXQ6IFdvcmtzcGFjZVBhcmVudEV4dCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdENvbnRhaW5lckVsOkhUTUxFbGVtZW50ID0gcm9vdFNwbGl0LmNvbnRhaW5lckVsXG5cbiAgICAgIC8vIGdldCB0aGUgY2xpZW50IHdpZHRoIG9mIHRoZSByb290IGNvbnRhaW5lciBvbmNlLCBiZWZvcmUgbG9vcGluZyB0aHJvdWdoIHRoZSBsZWF2ZXNcbiAgICAgIGNvbnN0IHJvb3RDb250YWluZXJFbFdpZHRoID0gcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoXG4gICAgICBcbiAgICAgIGNvbnN0IHJvb3RMZWF2ZXM6V29ya3NwYWNlSXRlbUV4dFtdID0gcm9vdFNwbGl0LmNoaWxkcmVuXG4gICAgICBsZXQgbGVhZkNvdW50ID0gcm9vdExlYXZlcy5sZW5ndGg7XG5cbiAgICAgIGNvbnN0IGxlYWZXaWR0aCA9IHRoaXMuc2V0dGluZ3MubGVhZkF1dG9XaWR0aCBcbiAgICAgICAgPyAocm9vdENvbnRhaW5lckVsV2lkdGggLSAoKGxlYWZDb3VudCAtIDEpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCkpXG4gICAgICAgIDogKFBsYXRmb3JtLmlzRGVza3RvcCA/IHRoaXMuc2V0dGluZ3MubGVhZkRlc2t0b3BXaWR0aCA6IHRoaXMuc2V0dGluZ3MubGVhZk1vYmlsZVdpZHRoKTtcbiAgICAgICAgXG4gICAgICBsZXQgdG90YWxXaWR0aEVzdGltYXRlID0gbGVhZkNvdW50ICogbGVhZldpZHRoO1xuICAgICAgbGV0IHRvdGFsV2lkdGggPSAwO1xuICAgICAgbGV0IHdpZHRoQ2hhbmdlID0gZmFsc2U7XG5cbiAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGxlYXZlc1xuICAgICAgcm9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBXb3Jrc3BhY2VJdGVtRXh0LCBpOm51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXJFbCA9IGxlYWYuY29udGFpbmVyRWw7XG4gICAgICAgIC8vIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGhlIGxlYWZcbiAgICAgICAgbGV0IGZsZXggPSAnMSAwIDAnXG4gICAgICAgIGxldCB3aWR0aCA9IGxlYWYud2lkdGg7XG4gICAgICAgIC8vIGlmIHRoZSBsZWFmIHdhcyBwcmV2aW91c2x5IFwiZmxleFwiLCB0aGVuIHRoZSB3aWR0aCB3aWxsIGJlIG91dCBvZiB3aGFja1xuICAgICAgICBpZihjb250YWluZXJFbC5zdHlsZS5mbGV4QmFzaXMpIHdpZHRoID0gbGVhZldpZHRoXG4gICAgICAgIGxldCBsZWZ0ID0gbnVsbFxuICAgICAgICBsZXQgcmlnaHQgPSBudWxsXG5cbiAgICAgICAgaWYgKHRvdGFsV2lkdGhFc3RpbWF0ZSA+IHJvb3RDb250YWluZXJFbFdpZHRoKSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHRvdGFsIHdpZHRoIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcm9vdCBjb250YWluZXIgd2lkdGgsIHdlIG5lZWQgdG8gbGltaXQgdGhlIGxlYXZlc1xuICAgICAgICAgIGZsZXggPSBudWxsXG4gICAgICAgICAgaWYoIXdpZHRoKSB3aWR0aCA9IGxlYWZXaWR0aFxuICAgICAgICAgIGlmKHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkKXtcbiAgICAgICAgICAgIC8vIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIG5lZWQgdG8gc2V0IHRoZSBsZWZ0IGFuZCByaWdodCB2YWx1ZXNcbiAgICAgICAgICAgIGxlZnQgPSAoaSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpICsgXCJweFwiXG4gICAgICAgICAgICByaWdodCA9ICgoKGxlYWZDb3VudCAtIGkpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCkgLSBsZWFmV2lkdGgpICsgXCJweFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBodG1sIGF0dHJpYnV0ZXMgZm9yIHRoZSBsZWFmIChpZiB0aGV5IGhhdmUgY2hhbmdlZClcbiAgICAgICAgaWYoY29udGFpbmVyRWwuc3R5bGUuZmxleCAhPSBmbGV4IHx8IGNvbnRhaW5lckVsLnN0eWxlLndpZHRoICE9IHdpZHRoICsgXCJweFwiIHx8IGNvbnRhaW5lckVsLnN0eWxlLmxlZnQgIT0gbGVmdCB8fCBjb250YWluZXJFbC5zdHlsZS5yaWdodCAhPSByaWdodCl7XG4gICAgICAgICAgd2lkdGhDaGFuZ2UgPSBjb250YWluZXJFbC5zdHlsZS53aWR0aCAhPSB3aWR0aCArIFwicHhcIlxuICAgICAgICAgIGNvbnN0IHN0eWxlID0ge2ZsZXgsIGxlZnQsIHJpZ2h0LCB3aWR0aDogd2lkdGggKyBcInB4XCJ9XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihjb250YWluZXJFbC5zdHlsZSwgc3R5bGUpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdGhlIGxlYWYncyB3aWR0aCBmb3IgbGF0ZXIgcmVmZXJlbmNlXG4gICAgICAgIGxlYWYud2lkdGggPSB3aWR0aFxuICAgICAgICB0b3RhbFdpZHRoICs9IHdpZHRoXG5cbiAgICAgICAgaWYobGVhZiBpbnN0YW5jZW9mIFdvcmtzcGFjZUxlYWYpe1xuICAgICAgICAgIGNvbnN0IGljb25FbCA9IChsZWFmLnZpZXcgYXMgYW55KS5pY29uRWw7XG4gICAgICAgICAgY29uc3QgaWNvblRleHQgPSBpY29uRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICAgICAgICBpZiAoIWljb25UZXh0LmluY2x1ZGVzKFwiKFwiKSkge1xuICAgICAgICAgICAgaWNvbkVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgYCR7bGVhZi5nZXREaXNwbGF5VGV4dCgpfSAoJHtpY29uVGV4dH0pYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaWYgdGhlIGFjdGl2ZSBsZWFmIGlzIGluIHRoZSBjdXJyZW50IGNvbnRhaW5lciwgYW5kIHRoZSB3aWR0aCBoYXMgY2hhbmdlZCwgcmVmb2N1cyB0aGUgYWN0aXZlIGxlYWZcbiAgICAgIGlmKGFjdGl2ZUxlYWYuZ2V0Q29udGFpbmVyKCkgYXMgdW5rbm93biBhcyBXb3Jrc3BhY2VQYXJlbnRFeHQgPT09IHJvb3RTcGxpdCAmJiB3aWR0aENoYW5nZSkgdGhpcy5mb2N1c0xlYWYoYWN0aXZlTGVhZiwgIXRoaXMuc2V0dGluZ3MubGVhZkF1dG9XaWR0aCk7XG4gICAgfSlcbiAgfVxuXG4gIGhhbmRsZUFjdGl2ZUxlYWZDaGFuZ2UgPSAobGVhZjogV29ya3NwYWNlTGVhZiB8IG51bGwpID0+e1xuICAgIGlmIChsZWFmKSB7XG4gICAgICB0aGlzLmZvY3VzTGVhZihsZWFmIGFzIFdvcmtzcGFjZUl0ZW0gYXMgV29ya3NwYWNlSXRlbUV4dCk7XG4gICAgfVxuICB9XG4gIFxuICBmb2N1c0xlYWYoYWN0aXZlTGVhZjpXb3Jrc3BhY2VJdGVtRXh0LCBhbmltYXRlZDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zdCByb290U3BsaXQgPSBhY3RpdmVMZWFmLmdldENvbnRhaW5lcigpIGFzIHVua25vd24gYXMgV29ya3NwYWNlUGFyZW50RXh0O1xuICAgIHdoaWxlIChhY3RpdmVMZWFmICE9IG51bGwgJiYgYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCAhPSBudWxsICYmIGFjdGl2ZUxlYWYucGFyZW50U3BsaXQgIT09IHJvb3RTcGxpdCkge1xuICAgICAgYWN0aXZlTGVhZiA9IGFjdGl2ZUxlYWYucGFyZW50U3BsaXQ7XG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZUxlYWYgIT0gbnVsbCAmJiBhY3RpdmVMZWFmLnBhcmVudFNwbGl0ICE9IG51bGwgJiYgYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCA9PT0gcm9vdFNwbGl0KSB7XG5cbiAgICAgIGNvbnN0IHJvb3RDb250YWluZXJFbCA9IHJvb3RTcGxpdC5jb250YWluZXJFbDtcbiAgICAgIGNvbnN0IHJvb3RMZWF2ZXMgPSByb290U3BsaXQuY2hpbGRyZW47XG4gICAgICBjb25zdCBsZWFmQ291bnQgPSByb290TGVhdmVzLmxlbmd0aDtcblxuICAgICAgLy8gZ2V0IHRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIGxlYWZcbiAgICAgIC8vIGFsc28sIGdldCB0aGUgcG9zaXRpb24gb2YgdGhpcyBsZWFmLCBzbyB3ZSBjYW4gc2Nyb2xsIHRvIGl0XG4gICAgICAvLyBhcyBsZWF2ZXMgYXJlIHJlc2l6YWJsZSwgd2UgaGF2ZSB0byBpdGVyYXRlIHRocm91Z2ggYWxsIGxlYXZlcyB0byB0aGVcbiAgICAgIC8vIGxlZnQgdW50aWwgd2UgZ2V0IHRvIHRoZSBhY3RpdmUgb25lIGFuZCBhZGQgYWxsIHRoZWlyIHdpZHRocyB0b2dldGhlclxuICAgICAgbGV0IHBvc2l0aW9uID0gMDtcbiAgICAgIHRoaXMuYWN0aXZlTGVhZkluZGV4ID0gLTE7XG4gICAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IFdvcmtzcGFjZUl0ZW1FeHQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSBsZWFmLmNvbnRhaW5lckVsO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGFjdGl2ZSBvbmVcbiAgICAgICAgaWYgKGxlYWYgPT0gYWN0aXZlTGVhZikge1xuICAgICAgICAgIHRoaXMuYWN0aXZlTGVhZkluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5hY3RpdmVMZWFmSW5kZXggPT0gLTEgfHwgaW5kZXggPCB0aGlzLmFjdGl2ZUxlYWZJbmRleCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgYmVmb3JlIHRoZSBhY3RpdmUgb25lLCBhZGQgdGhlIHdpZHRoXG4gICAgICAgICAgcG9zaXRpb24gKz0gY29udGFpbmVyRWwuY2xpZW50V2lkdGg7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LmFkZCgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgaXMgcmlnaHQgb2YgdGhlIGFjdGl2ZSBvbmVcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tbGVmdC1vZi1hY3RpdmUnKTtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdtb2QtYW0tcmlnaHQtb2YtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBnZXQgdGhpcyBsZWFmJ3MgbGVmdCB2YWx1ZSAodGhlIGFtb3VudCBvZiBzcGFjZSB0byB0aGUgbGVmdCBmb3Igc3RpY2t5IGhlYWRlcnMpXG4gICAgICBjb25zdCBsZWZ0ID0gcGFyc2VJbnQoYWN0aXZlTGVhZi5jb250YWluZXJFbC5zdHlsZS5sZWZ0KSB8fCAwO1xuICAgICAgLy8gdGhlIGFtb3VudCBvZiBzcGFjZSB0byB0aGUgcmlnaHQgd2UgbmVlZCB0byBsZWF2ZSBmb3Igc3RpY2t5IGhlYWRlcnNcbiAgICAgIGNvbnN0IGhlYWRlcnNUb1JpZ2h0V2lkdGggPSB0aGlzLnNldHRpbmdzLnN0YWNraW5nRW5hYmxlZCA/IChsZWFmQ291bnQgLSB0aGlzLmFjdGl2ZUxlYWZJbmRleCAtIDEpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCA6IDA7XG5cbiAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRvIHJlcXVlc3QgJ3Ntb290aCcgYW5pbWF0aW9ucyBvciAnYXV0bycgc25hcFxuICAgICAgbGV0IGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvciA9IGFuaW1hdGVkICYmIHRoaXMuc2V0dGluZ3Muc21vb3RoQW5pbWF0aW9uID8gJ3Ntb290aCcgOiAnYXV0byc7XG5cbiAgICAgIC8vIGl0J3MgdG9vIGZhciBsZWZ0XG4gICAgICBpZiAocm9vdENvbnRhaW5lckVsLnNjcm9sbExlZnQgPiBwb3NpdGlvbiAtIGxlZnQpIHtcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHBhbmUgaW50byB2aWV3XG4gICAgICAgIHJvb3RDb250YWluZXJFbC5zY3JvbGxUbyh7IGxlZnQ6IHBvc2l0aW9uIC0gbGVmdCwgdG9wOiAwLCBiZWhhdmlvcjogYmVoYXZpb3IgfSk7XG4gICAgICB9XG4gICAgICAvLyBpdCdzIHRvbyBmYXIgcmlnaHRcbiAgICAgIGVsc2UgaWYgKHJvb3RDb250YWluZXJFbC5zY3JvbGxMZWZ0ICsgcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoIDwgcG9zaXRpb24gKyBhY3RpdmVMZWFmLmNvbnRhaW5lckVsLmNsaWVudFdpZHRoICsgaGVhZGVyc1RvUmlnaHRXaWR0aCkge1xuICAgICAgICAvLyBzY3JvbGwgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHBhbmUgaW50byB2aWV3XG4gICAgICAgIHJvb3RDb250YWluZXJFbC5zY3JvbGxUbyh7IGxlZnQ6IHBvc2l0aW9uICsgYWN0aXZlTGVhZi5jb250YWluZXJFbC5jbGllbnRXaWR0aCArIGhlYWRlcnNUb1JpZ2h0V2lkdGggLSByb290Q29udGFpbmVyRWwuY2xpZW50V2lkdGgsIHRvcDogMCwgYmVoYXZpb3I6IGJlaGF2aW9yIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIGhhbmRlIHdoZW4gYSBmaWxlIGlzIGRlbGV0ZWRcbiAgaGFuZGxlRGVsZXRlID0gKGZpbGU6IFRBYnN0cmFjdEZpbGUpID0+IHtcbiAgICAvLyBjbG9zZSBhbnkgbGVhdmVzIHdpdGggdGhlIGRlbGV0ZWQgZmlsZSBvcGVuXG4gICAgLy8gZGV0YWNoaW5nIGEgbGVhZiB3aGlsZSBpdGVyYXRpbmcgbWVzc2VzIHdpdGggdGhlIGl0ZXJhdGlvblxuICAgIGNvbnN0IGxlYXZlc1RvRGV0YWNoOiBXb3Jrc3BhY2VMZWFmW10gPSBbXTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UuaXRlcmF0ZVJvb3RMZWF2ZXMoKGxlYWY6IFdvcmtzcGFjZUxlYWYpID0+IHtcbiAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiBGaWxlVmlldyAmJiBsZWFmLnZpZXcuZmlsZSA9PSBmaWxlKSB7XG4gICAgICAgIGxlYXZlc1RvRGV0YWNoLnB1c2gobGVhZik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGVhdmVzVG9EZXRhY2guZm9yRWFjaChsZWFmID0+IGxlYWYuZGV0YWNoKCkpO1xuICB9O1xuXG4gIGdldFJvb3RTcGxpdHMgPSAoKTpXb3Jrc3BhY2VQYXJlbnRFeHRbXSA9PiB7XG4gICAgY29uc3Qgcm9vdFNwbGl0czpXb3Jrc3BhY2VQYXJlbnRFeHRbXSA9IFtdO1xuXG4gICAgLy8gcHVzaCB0aGUgbWFpbiB3aW5kb3cncyByb290IHNwbGl0IHRvIHRoZSBsaXN0XG4gICAgcm9vdFNwbGl0cy5wdXNoKHRoaXMuYXBwLndvcmtzcGFjZS5yb290U3BsaXQgYXMgV29ya3NwYWNlUGFyZW50IGFzIFdvcmtzcGFjZVBhcmVudEV4dClcblxuICAgIGNvbnN0IGZsb2F0aW5nU3BsaXQgPSAodGhpcy5hcHAud29ya3NwYWNlIGFzIFdvcmtzcGFjZUV4dCkuZmxvYXRpbmdTcGxpdCBhcyBXb3Jrc3BhY2VQYXJlbnRFeHQ7XG4gICAgZmxvYXRpbmdTcGxpdC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogV29ya3NwYWNlUGFyZW50RXh0KSA9PiB7XG4gICAgICAvLyBpZiB0aGlzIGlzIGEgd2luZG93LCBwdXNoIGl0IHRvIHRoZSBsaXN0IFxuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgV29ya3NwYWNlV2luZG93KSB7XG4gICAgICAgIHJvb3RTcGxpdHMucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcm9vdFNwbGl0cztcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGx1Z2luIiwiUGxhdGZvcm0iLCJXb3Jrc3BhY2VMZWFmIiwiRmlsZVZpZXciLCJXb3Jrc3BhY2VXaW5kb3ciXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxD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
