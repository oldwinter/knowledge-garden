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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var DeleteFilesModal = /** @class */ (function (_super) {
    __extends(DeleteFilesModal, _super);
    function DeleteFilesModal(app, filesToDelete) {
        var _this = _super.call(this, app) || this;
        _this.filesToDelete = filesToDelete;
        return _this;
    }
    DeleteFilesModal.prototype.onOpen = function () {
        var _this = this;
        var _a = this, contentEl = _a.contentEl, titleEl = _a.titleEl;
        titleEl.setText("Move " + this.filesToDelete.length + " files to system trash?");
        contentEl
            .createEl("button", { text: "Cancel" })
            .addEventListener("click", function () { return _this.close(); });
        contentEl.setAttr("margin", "auto");
        contentEl
            .createEl("button", {
            cls: "mod-cta",
            text: "Confirm",
        })
            .addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.filesToDelete;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        file = _a[_i];
                        return [4 /*yield*/, this.app.vault.trash(file, true)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.close();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DeleteFilesModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return DeleteFilesModal;
}(obsidian.Modal));

var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin, defaultSettings) {
        var _this = _super.call(this, app, plugin) || this;
        _this.defaultSettings = defaultSettings;
        _this.plugin = plugin;
        return _this;
    }
    // Add trailing slash to catch files named like the directory. See https://github.com/Vinzent03/find-unlinked-files/issues/24
    SettingsTab.prototype.formatPath = function (path, addDirectorySlash) {
        if (path.length == 0)
            return path;
        path = obsidian.normalizePath(path);
        if (addDirectorySlash)
            return path + "/";
        else
            return path;
    };
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });
        containerEl.createEl("h4", {
            text: "Settings for finding orphaned files",
        });
        new obsidian.Setting(containerEl).setName("Open output file").addToggle(function (cb) {
            return cb
                .setValue(_this.plugin.settings.openOutputFile)
                .onChange(function (value) {
                _this.plugin.settings.openOutputFile = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Output file name")
            .setDesc("Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.")
            .addText(function (cb) {
            return cb
                .onChange(function (value) {
                if (value.length == 0) {
                    _this.plugin.settings.outputFileName =
                        _this.defaultSettings.outputFileName;
                }
                else {
                    _this.plugin.settings.outputFileName = value;
                }
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.outputFileName);
        });
        new obsidian.Setting(containerEl)
            .setName("Disable working links")
            .setDesc("Indent lines to disable the link and to clean up the graph view")
            .addToggle(function (cb) {
            return cb
                .onChange(function (value) {
                _this.plugin.settings.disableWorkingLinks = value;
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.disableWorkingLinks);
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files in the given directories")
            .setDesc("Enable to exclude files in the given directories. Disable to only include files in the given directories")
            .addToggle(function (cb) {
            return cb
                .setValue(_this.plugin.settings.ignoreDirectories)
                .onChange(function (value) {
                _this.plugin.settings.ignoreDirectories = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Directories")
            .setDesc("Add each directory path in a new line")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/Subdirectory")
                .setValue(_this.plugin.settings.directoriesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, true); });
                _this.plugin.settings.directoriesToIgnore = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.filesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.filesToIgnore = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude links")
            .setDesc("Exclude files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to exclude files with links.")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.linksToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.linksToIgnore = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files with the given filetypes")
            .setDesc("Enable to exclude files with the given filetypes. Disable to only include files with the given filetypes")
            .addToggle(function (cb) {
            return cb
                .setValue(_this.plugin.settings.ignoreFileTypes)
                .onChange(function (value) {
                _this.plugin.settings.ignoreFileTypes = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("File types")
            .setDesc("Effect depends on toggle above")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("docx,txt")
                .setValue(_this.plugin.settings.fileTypesToIgnore.join(","))
                .onChange(function (value) {
                var extensions = value.trim().split(",");
                _this.plugin.settings.fileTypesToIgnore = extensions;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude tags")
            .setDesc("Exclude files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("todo,unfinished")
                .setValue(_this.plugin.settings.tagsToIgnore.join(","))
                .onChange(function (value) {
                var tags = value.trim().split(",");
                _this.plugin.settings.tagsToIgnore = tags;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Filetypes to delete per command. See README.")
            .setDesc("Add each filetype separated by comma. Set to `*` to delete all files.")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("jpg,png")
                .setValue(_this.plugin.settings.fileTypesToDelete.join(","))
                .onChange(function (value) {
                var extensions = value.trim().split(",");
                _this.plugin.settings.fileTypesToDelete = extensions;
                _this.plugin.saveSettings();
            });
        });
        /// Settings for find brokenLinks
        containerEl.createEl("h4", {
            text: "Settings for finding broken links",
        });
        new obsidian.Setting(containerEl)
            .setName("Output file name")
            .setDesc("Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.")
            .addText(function (cb) {
            return cb
                .onChange(function (value) {
                if (value.length == 0) {
                    _this.plugin.settings.unresolvedLinksOutputFileName =
                        _this.defaultSettings.unresolvedLinksOutputFileName;
                }
                else {
                    _this.plugin.settings.unresolvedLinksOutputFileName =
                        value;
                }
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.unresolvedLinksOutputFileName);
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files in the given directories")
            .setDesc("Enable to exclude files in the given directories. Disable to only include files in the given directories")
            .addToggle(function (cb) {
            return cb
                .setValue(_this.plugin.settings.unresolvedLinksIgnoreDirectories)
                .onChange(function (value) {
                _this.plugin.settings.unresolvedLinksIgnoreDirectories =
                    value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Directories")
            .setDesc("Add each directory path in a new line")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/Subdirectory")
                .setValue(_this.plugin.settings.unresolvedLinksDirectoriesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, true); });
                _this.plugin.settings.unresolvedLinksDirectoriesToIgnore =
                    paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Exclude links in the specified file. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.unresolvedLinksFilesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.unresolvedLinksFilesToIgnore =
                    paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude links")
            .setDesc("Exclude files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to exclude files with links.")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.unresolvedLinksLinksToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.unresolvedLinksLinksToIgnore =
                    paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude filetypes")
            .setDesc("Exclude links with the specified filetype. Add each filetype separated by comma")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("docx,txt")
                .setValue(_this.plugin.settings.unresolvedLinksFileTypesToIgnore.join(","))
                .onChange(function (value) {
                var extensions = value.trim().split(",");
                _this.plugin.settings.unresolvedLinksFileTypesToIgnore =
                    extensions;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude tags")
            .setDesc("Exclude links in files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("todo,unfinished")
                .setValue(_this.plugin.settings.unresolvedLinksTagsToIgnore.join(","))
                .onChange(function (value) {
                var tags = value.trim().split(",");
                _this.plugin.settings.unresolvedLinksTagsToIgnore = tags;
                _this.plugin.saveSettings();
            });
        });
        containerEl.createEl("h4", {
            text: "Settings for finding files without tags",
        });
        new obsidian.Setting(containerEl)
            .setName("Output file name")
            .setDesc("Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.")
            .addText(function (cb) {
            return cb
                .onChange(function (value) {
                if (value.length == 0) {
                    _this.plugin.settings.withoutTagsOutputFileName =
                        _this.defaultSettings.withoutTagsOutputFileName;
                }
                else {
                    _this.plugin.settings.withoutTagsOutputFileName =
                        value;
                }
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.withoutTagsOutputFileName);
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Exclude the specific files. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.withoutTagsFilesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.withoutTagsFilesToIgnore = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude directories")
            .setDesc("Exclude files in the specified directories. Add each directory path in a new line")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/Subdirectory")
                .setValue(_this.plugin.settings.withoutTagsDirectoriesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, true); });
                _this.plugin.settings.withoutTagsDirectoriesToIgnore =
                    paths;
                _this.plugin.saveSettings();
            });
        });
        /// Settings for empty files
        containerEl.createEl("h4", {
            text: "Settings for finding empty files",
        });
        new obsidian.Setting(containerEl)
            .setName("Output file name")
            .setDesc("Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.")
            .addText(function (cb) {
            return cb
                .onChange(function (value) {
                if (value.length == 0) {
                    _this.plugin.settings.emptyFilesOutputFileName =
                        _this.defaultSettings.emptyFilesOutputFileName;
                }
                else {
                    _this.plugin.settings.emptyFilesOutputFileName =
                        value;
                }
                _this.plugin.saveSettings();
            })
                .setValue(_this.plugin.settings.emptyFilesOutputFileName);
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files in the given directories")
            .setDesc("Enable to exclude files in the given directories. Disable to only include files in the given directories")
            .addToggle(function (cb) {
            return cb
                .setValue(_this.plugin.settings.emptyFilesIgnoreDirectories)
                .onChange(function (value) {
                _this.plugin.settings.emptyFilesIgnoreDirectories =
                    value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Directories")
            .setDesc("Add each directory path in a new line")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/Subdirectory")
                .setValue(_this.plugin.settings.emptyFilesDirectories.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, true); });
                _this.plugin.settings.emptyFilesDirectories = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) {
            return cb
                .setPlaceholder("Directory/file.md")
                .setValue(_this.plugin.settings.emptyFilesFilesToIgnore.join("\n"))
                .onChange(function (value) {
                var paths = value
                    .trim()
                    .split("\n")
                    .map(function (value) { return _this.formatPath(value, false); });
                _this.plugin.settings.emptyFilesFilesToIgnore = paths;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Donate")
            .setDesc("If you like this Plugin, consider donating to support continued development.")
            .addButton(function (bt) {
            bt.buttonEl.outerHTML =
                "<a href='https://ko-fi.com/F1F195IQ5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>";
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

var Utils = /** @class */ (function () {
    /**
     * Checks for the given settings. Is used for `Find orphaned files` and `Find broken links`
     * @param app
     * @param filePath
     * @param tagsToIgnore
     * @param linksToIgnore
     * @param directoriesToIgnore
     * @param filesToIgnore
     * @param ignoreDirectories
     */
    function Utils(app, filePath, tagsToIgnore, linksToIgnore, directoriesToIgnore, filesToIgnore, ignoreDirectories, dir) {
        if (ignoreDirectories === void 0) { ignoreDirectories = true; }
        this.app = app;
        this.filePath = filePath;
        this.tagsToIgnore = tagsToIgnore;
        this.linksToIgnore = linksToIgnore;
        this.directoriesToIgnore = directoriesToIgnore;
        this.filesToIgnore = filesToIgnore;
        this.ignoreDirectories = ignoreDirectories;
        this.dir = dir;
        this.fileCache = app.metadataCache.getCache(filePath);
    }
    Utils.prototype.hasTagsToIgnore = function () {
        var _this = this;
        var tags = obsidian.getAllTags(this.fileCache);
        return ((tags === null || tags === void 0 ? void 0 : tags.find(function (tag) {
            return _this.tagsToIgnore.contains(tag.substring(1));
        })) !== undefined);
    };
    Utils.prototype.hasLinksToIgnore = function () {
        var _this = this;
        var _a, _b;
        if ((((_a = this.fileCache) === null || _a === void 0 ? void 0 : _a.embeds) != null || ((_b = this.fileCache) === null || _b === void 0 ? void 0 : _b.links) != null) &&
            this.linksToIgnore[0] == "*") {
            return true;
        }
        return obsidian.iterateCacheRefs(this.fileCache, function (cb) {
            var _a;
            var link = (_a = _this.app.metadataCache.getFirstLinkpathDest(cb.link, _this.filePath)) === null || _a === void 0 ? void 0 : _a.path;
            return _this.linksToIgnore.contains(link);
        });
    };
    Utils.prototype.checkDirectory = function () {
        var _this = this;
        if (this.dir) {
            if (!this.filePath.startsWith(this.dir)) {
                return true;
            }
        }
        var contains = this.directoriesToIgnore.find(function (value) { return value.length != 0 && _this.filePath.startsWith(value); }) !== undefined;
        if (this.ignoreDirectories) {
            return contains;
        }
        else {
            return !contains;
        }
    };
    Utils.prototype.isFileToIgnore = function () {
        return this.filesToIgnore.contains(this.filePath);
    };
    Utils.prototype.isValid = function () {
        return (!this.hasTagsToIgnore() &&
            !this.hasLinksToIgnore() &&
            !this.checkDirectory() &&
            !this.isFileToIgnore());
    };
    /**
     * Writes the text to the file and opens the file in a new pane if it is not opened yet
     * @param app
     * @param outputFileName name of the output file
     * @param text data to be written to the file
     */
    Utils.writeAndOpenFile = function (app, outputFileName, text, openFile) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened, newPane, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.vault.adapter.write(outputFileName, text)];
                    case 1:
                        _a.sent();
                        if (!openFile)
                            return [2 /*return*/];
                        fileIsAlreadyOpened = false;
                        app.workspace.iterateAllLeaves(function (leaf) {
                            if (leaf.getDisplayText() != "" &&
                                outputFileName.startsWith(leaf.getDisplayText())) {
                                fileIsAlreadyOpened = true;
                            }
                        });
                        if (!!fileIsAlreadyOpened) return [3 /*break*/, 5];
                        newPane = app.workspace.getLeavesOfType("empty").length == 0;
                        if (!newPane) return [3 /*break*/, 2];
                        app.workspace.openLinkText(outputFileName, "/", true);
                        return [3 /*break*/, 5];
                    case 2:
                        file = app.vault.getAbstractFileByPath(outputFileName);
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 4];
                        return [4 /*yield*/, app.workspace
                                .getLeavesOfType("empty")[0]
                                .openFile(file)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        app.workspace.openLinkText(outputFileName, "/", true);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());

var DEFAULT_SETTINGS = {
    outputFileName: "orphaned files output",
    disableWorkingLinks: false,
    directoriesToIgnore: [],
    filesToIgnore: [],
    fileTypesToIgnore: [],
    linksToIgnore: [],
    tagsToIgnore: [],
    fileTypesToDelete: [],
    ignoreFileTypes: true,
    ignoreDirectories: true,
    unresolvedLinksIgnoreDirectories: true,
    unresolvedLinksOutputFileName: "broken links output",
    unresolvedLinksDirectoriesToIgnore: [],
    unresolvedLinksFilesToIgnore: [],
    unresolvedLinksFileTypesToIgnore: [],
    unresolvedLinksLinksToIgnore: [],
    unresolvedLinksTagsToIgnore: [],
    withoutTagsDirectoriesToIgnore: [],
    withoutTagsFilesToIgnore: [],
    withoutTagsOutputFileName: "files without tags",
    emptyFilesOutputFileName: "empty files",
    emptyFilesDirectories: [],
    emptyFilesFilesToIgnore: [],
    emptyFilesIgnoreDirectories: true,
    openOutputFile: true,
};
var FindOrphanedFilesPlugin = /** @class */ (function (_super) {
    __extends(FindOrphanedFilesPlugin, _super);
    function FindOrphanedFilesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.findExtensionRegex = /(\.[^.]+)$/;
        return _this;
    }
    FindOrphanedFilesPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("loading " + this.manifest.name + " plugin");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addCommand({
                            id: "find-unlinked-files",
                            name: "Find orphaned files",
                            callback: function () { return _this.findOrphanedFiles(); },
                        });
                        this.addCommand({
                            id: "find-unresolved-link",
                            name: "Find broken links",
                            callback: function () { return _this.findBrokenLinks(); },
                        });
                        this.addCommand({
                            id: "delete-unlinked-files",
                            name: "Delete orphaned files with certain extension. See README",
                            callback: function () { return _this.deleteOrphanedFiles(); },
                        });
                        this.addCommand({
                            id: "create-files-of-broken-links",
                            name: "Create files of broken links",
                            callback: function () { return _this.createFilesOfBrokenLinks(); },
                        });
                        this.addCommand({
                            id: "find-files-without-tags",
                            name: "Find files without tags",
                            callback: function () { return _this.findFilesWithoutTags(); },
                        });
                        this.addCommand({
                            id: "find-empty-files",
                            name: "Find empty files",
                            callback: function () { return _this.findEmptyFiles(); },
                        });
                        this.addCommand({
                            id: "delete-empty-files",
                            name: "Delete empty files",
                            callback: function () { return _this.deleteEmptyFiles(); },
                        });
                        this.addSettingTab(new SettingsTab(this.app, this, DEFAULT_SETTINGS));
                        this.app.workspace.on("file-menu", function (menu, file, source, leaf) {
                            if (file instanceof obsidian.TFolder) {
                                menu.addItem(function (cb) {
                                    cb.setIcon("search");
                                    cb.setTitle("Find orphaned files");
                                    // Add trailing slash to catch files named like the directory. See https://github.com/Vinzent03/find-unlinked-files/issues/24
                                    cb.onClick(function (e) {
                                        _this.findOrphanedFiles(file.path + "/");
                                    });
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.createFilesOfBrokenLinks = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, filesToCreate, _i, links_1, link, file, foundType, _c, filesToCreate_1, file;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(this.settings.unresolvedLinksOutputFileName + ".md")];
                    case 1:
                        if (!(_d.sent())) {
                            new obsidian.Notice("Can't find file - Please run the `Find broken files' command before");
                            return [2 /*return*/];
                        }
                        links = (_a = this.app.metadataCache.getCache(this.settings.unresolvedLinksOutputFileName + ".md")) === null || _a === void 0 ? void 0 : _a.links;
                        if (!links) {
                            new obsidian.Notice("No broken links found");
                            return [2 /*return*/];
                        }
                        filesToCreate = [];
                        for (_i = 0, links_1 = links; _i < links_1.length; _i++) {
                            link = links_1[_i];
                            file = this.app.metadataCache.getFirstLinkpathDest(link.link, "/");
                            if (file)
                                continue;
                            foundType = (_b = this.findExtensionRegex.exec(link.link)) === null || _b === void 0 ? void 0 : _b[0];
                            if ((foundType !== null && foundType !== void 0 ? foundType : ".md") == ".md") {
                                if (foundType) {
                                    filesToCreate.push(link.link);
                                }
                                else {
                                    filesToCreate.push(link.link + ".md");
                                }
                            }
                        }
                        if (!filesToCreate) return [3 /*break*/, 5];
                        _c = 0, filesToCreate_1 = filesToCreate;
                        _d.label = 2;
                    case 2:
                        if (!(_c < filesToCreate_1.length)) return [3 /*break*/, 5];
                        file = filesToCreate_1[_c];
                        return [4 /*yield*/, this.app.vault.create(file, "")];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.findEmptyFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, emptyFiles, _i, files_1, file, content, trimmedContent, cache, frontmatter, lines, prefix, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = this.app.vault.getFiles();
                        emptyFiles = [];
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        file = files_1[_i];
                        if (!new Utils(this.app, file.path, [], [], this.settings.emptyFilesDirectories, this.settings.emptyFilesFilesToIgnore, this.settings.emptyFilesIgnoreDirectories).isValid()) {
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 2:
                        content = _a.sent();
                        trimmedContent = content.trim();
                        if (!trimmedContent) {
                            emptyFiles.push(file);
                        }
                        cache = app.metadataCache.getFileCache(file);
                        frontmatter = cache === null || cache === void 0 ? void 0 : cache.frontmatter;
                        if (frontmatter) {
                            lines = content.trimRight().split("\n").length;
                            if (frontmatter.position.end.line == lines - 1) {
                                emptyFiles.push(file);
                            }
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this.settings.disableWorkingLinks)
                            prefix = "	";
                        else
                            prefix = "";
                        text = emptyFiles
                            .map(function (file) { return prefix + "- [[" + file.path + "]]"; })
                            .join("\n");
                        Utils.writeAndOpenFile(this.app, this.settings.emptyFilesOutputFileName + ".md", text, this.settings.openOutputFile);
                        return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.findOrphanedFiles = function (dir) {
        var _this = this;
        var outFileName = this.settings.outputFileName + ".md";
        var outFile;
        var files = this.app.vault.getFiles();
        var markdownFiles = this.app.vault.getMarkdownFiles();
        var links = [];
        markdownFiles.forEach(function (markFile) {
            if (markFile.path == outFileName) {
                outFile = markFile;
                return;
            }
            obsidian.iterateCacheRefs(_this.app.metadataCache.getFileCache(markFile), function (cb) {
                var txt = _this.app.metadataCache.getFirstLinkpathDest(obsidian.getLinkpath(cb.link), markFile.path);
                if (txt != null)
                    links.push(txt.path);
            });
        });
        var notLinkedFiles = files.filter(function (file) {
            return _this.isValid(file, links, dir);
        });
        notLinkedFiles.remove(outFile);
        var text = "";
        var prefix;
        if (this.settings.disableWorkingLinks)
            prefix = "	";
        else
            prefix = "";
        notLinkedFiles.forEach(function (file) {
            text +=
                prefix +
                    "- [[" +
                    _this.app.metadataCache.fileToLinktext(file, "/", false) +
                    "]]\n";
        });
        Utils.writeAndOpenFile(this.app, outFileName, text, this.settings.openOutputFile);
    };
    FindOrphanedFilesPlugin.prototype.deleteOrphanedFiles = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, filesToDelete;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(this.settings.outputFileName + ".md")];
                    case 1:
                        if (!(_c.sent())) {
                            new obsidian.Notice("Can't find file - Please run the `Find orphaned files' command before");
                            return [2 /*return*/];
                        }
                        links = (_b = (_a = this.app.metadataCache.getCache(this.settings.outputFileName + ".md")) === null || _a === void 0 ? void 0 : _a.links) !== null && _b !== void 0 ? _b : [];
                        filesToDelete = [];
                        links.forEach(function (link) {
                            var file = _this.app.metadataCache.getFirstLinkpathDest(link.link, "/");
                            if (!file)
                                return;
                            if (_this.settings.fileTypesToDelete[0] == "*" ||
                                _this.settings.fileTypesToDelete.contains(file.extension)) {
                                filesToDelete.push(file);
                            }
                        });
                        if (filesToDelete.length > 0)
                            new DeleteFilesModal(this.app, filesToDelete).open();
                        return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.deleteEmptyFiles = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, filesToDelete, _i, links_2, link, file;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(this.settings.emptyFilesOutputFileName + ".md")];
                    case 1:
                        if (!(_c.sent())) {
                            new obsidian.Notice("Can't find file - Please run the `Find orphaned files' command before");
                            return [2 /*return*/];
                        }
                        links = (_b = (_a = this.app.metadataCache.getCache(this.settings.emptyFilesOutputFileName + ".md")) === null || _a === void 0 ? void 0 : _a.links) !== null && _b !== void 0 ? _b : [];
                        filesToDelete = [];
                        for (_i = 0, links_2 = links; _i < links_2.length; _i++) {
                            link = links_2[_i];
                            file = this.app.metadataCache.getFirstLinkpathDest(link.link, "/");
                            if (!file)
                                return [2 /*return*/];
                            filesToDelete.push(file);
                        }
                        if (filesToDelete.length > 0)
                            new DeleteFilesModal(this.app, filesToDelete).open();
                        return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.findBrokenLinks = function () {
        var outFileName = this.settings.unresolvedLinksOutputFileName + ".md";
        var links = [];
        var brokenLinks = this.app.metadataCache.unresolvedLinks;
        for (var sourceFilepath in brokenLinks) {
            if (sourceFilepath ==
                this.settings.unresolvedLinksOutputFileName + ".md")
                continue;
            var fileType = sourceFilepath.substring(sourceFilepath.lastIndexOf(".") + 1);
            var utils = new Utils(this.app, sourceFilepath, this.settings.unresolvedLinksTagsToIgnore, this.settings.unresolvedLinksLinksToIgnore, this.settings.unresolvedLinksDirectoriesToIgnore, this.settings.unresolvedLinksFilesToIgnore, this.settings.unresolvedLinksIgnoreDirectories);
            if (!utils.isValid())
                continue;
            var _loop_1 = function (link) {
                var linkFileType = link.substring(link.lastIndexOf(".") + 1);
                if (this_1.settings.unresolvedLinksFileTypesToIgnore.contains(linkFileType))
                    return "continue";
                var formattedFilePath = sourceFilepath;
                if (fileType == "md") {
                    formattedFilePath = sourceFilepath.substring(0, sourceFilepath.lastIndexOf(".md"));
                }
                var brokenLink = {
                    files: [formattedFilePath],
                    link: link,
                };
                if (links.contains(brokenLink))
                    return "continue";
                var duplication = links.find(function (e) { return e.link == link; });
                if (duplication) {
                    duplication.files.push(formattedFilePath);
                }
                else {
                    links.push(brokenLink);
                }
            };
            var this_1 = this;
            for (var link in brokenLinks[sourceFilepath]) {
                _loop_1(link);
            }
        }
        Utils.writeAndOpenFile(this.app, outFileName, __spreadArrays([
            "Don't forget that creating the file from here may create the file in the wrong directory!"
        ], links.map(function (e) { return "- [[" + e.link + "]] in [[" + e.files.join("]], [[") + "]]"; })).join("\n"), this.settings.openOutputFile);
    };
    FindOrphanedFilesPlugin.prototype.findFilesWithoutTags = function () {
        var _this = this;
        var outFileName = this.settings.withoutTagsOutputFileName + ".md";
        var outFile;
        var files = this.app.vault.getMarkdownFiles();
        var withoutFiles = files.filter(function (file) {
            var _a;
            if (new Utils(_this.app, file.path, [], [], _this.settings.withoutTagsDirectoriesToIgnore, _this.settings.withoutTagsFilesToIgnore, true).isValid()) {
                return (((_a = obsidian.getAllTags(_this.app.metadataCache.getFileCache(file))
                    .length) !== null && _a !== void 0 ? _a : 0) <= 0);
            }
            else {
                return false;
            }
        });
        withoutFiles.remove(outFile);
        var prefix;
        if (this.settings.disableWorkingLinks)
            prefix = "	";
        else
            prefix = "";
        var text = withoutFiles
            .map(function (file) { return prefix + "- [[" + file.path + "]]"; })
            .join("\n");
        Utils.writeAndOpenFile(this.app, outFileName, text, this.settings.openOutputFile);
    };
    /**
     * Checks if the given file in an orphaned file
     *
     * @param file file to check
     * @param links all links in the vault
     */
    FindOrphanedFilesPlugin.prototype.isValid = function (file, links, dir) {
        if (links.contains(file.path))
            return false;
        //filetypes to ignore by default
        if (file.extension == "css")
            return false;
        if (this.settings.fileTypesToIgnore[0] !== "") {
            var containsFileType = this.settings.fileTypesToIgnore.contains(file.extension);
            if (this.settings.ignoreFileTypes) {
                if (containsFileType)
                    return;
            }
            else {
                if (!containsFileType)
                    return;
            }
        }
        var utils = new Utils(this.app, file.path, this.settings.tagsToIgnore, this.settings.linksToIgnore, this.settings.directoriesToIgnore, this.settings.filesToIgnore, this.settings.ignoreDirectories, dir);
        if (!utils.isValid())
            return false;
        return true;
    };
    FindOrphanedFilesPlugin.prototype.onunload = function () {
        console.log("unloading " + this.manifest.name + " plugin");
    };
    FindOrphanedFilesPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    FindOrphanedFilesPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FindOrphanedFilesPlugin;
}(obsidian.Plugin));

module.exports = FindOrphanedFilesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9kZWxldGVGaWxlc01vZGFsLnRzIiwic3JjL3NldHRpbmdzVGFiLnRzIiwic3JjL3V0aWxzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2VzRGVjb3JhdGUoY3RvciwgZGVzY3JpcHRvckluLCBkZWNvcmF0b3JzLCBjb250ZXh0SW4sIGluaXRpYWxpemVycywgZXh0cmFJbml0aWFsaXplcnMpIHtcclxuICAgIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxyXG4gICAgdmFyIGtpbmQgPSBjb250ZXh0SW4ua2luZCwga2V5ID0ga2luZCA9PT0gXCJnZXR0ZXJcIiA/IFwiZ2V0XCIgOiBraW5kID09PSBcInNldHRlclwiID8gXCJzZXRcIiA6IFwidmFsdWVcIjtcclxuICAgIHZhciB0YXJnZXQgPSAhZGVzY3JpcHRvckluICYmIGN0b3IgPyBjb250ZXh0SW5bXCJzdGF0aWNcIl0gPyBjdG9yIDogY3Rvci5wcm90b3R5cGUgOiBudWxsO1xyXG4gICAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XHJcbiAgICB2YXIgXywgZG9uZSA9IGZhbHNlO1xyXG4gICAgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluKSBjb250ZXh0W3BdID0gcCA9PT0gXCJhY2Nlc3NcIiA/IHt9IDogY29udGV4dEluW3BdO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29udGV4dEluLmFjY2VzcykgY29udGV4dC5hY2Nlc3NbcF0gPSBjb250ZXh0SW4uYWNjZXNzW3BdO1xyXG4gICAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICgwLCBkZWNvcmF0b3JzW2ldKShraW5kID09PSBcImFjY2Vzc29yXCIgPyB7IGdldDogZGVzY3JpcHRvci5nZXQsIHNldDogZGVzY3JpcHRvci5zZXQgfSA6IGRlc2NyaXB0b3Jba2V5XSwgY29udGV4dCk7XHJcbiAgICAgICAgaWYgKGtpbmQgPT09IFwiYWNjZXNzb3JcIikge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHR5cGVvZiByZXN1bHQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5nZXQpKSBkZXNjcmlwdG9yLmdldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XHJcbiAgICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5pbml0KSkgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xyXG4gICAgICAgICAgICBpZiAoa2luZCA9PT0gXCJmaWVsZFwiKSBpbml0aWFsaXplcnMucHVzaChfKTtcclxuICAgICAgICAgICAgZWxzZSBkZXNjcmlwdG9yW2tleV0gPSBfO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0YXJnZXQpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbnRleHRJbi5uYW1lLCBkZXNjcmlwdG9yKTtcclxuICAgIGRvbmUgPSB0cnVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcclxuICAgIHZhciB1c2VWYWx1ZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbml0aWFsaXplcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXNlVmFsdWUgPyB2YWx1ZSA6IHZvaWQgMDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Byb3BLZXkoeCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiKSBuYW1lID0gbmFtZS5kZXNjcmlwdGlvbiA/IFwiW1wiLmNvbmNhdChuYW1lLmRlc2NyaXB0aW9uLCBcIl1cIikgOiBcIlwiO1xyXG4gICAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmLCBcIm5hbWVcIiwgeyBjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiBwcmVmaXggPyBcIlwiLmNvbmNhdChwcmVmaXgsIFwiIFwiLCBuYW1lKSA6IG5hbWUgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcclxuICAgIGlmIChyZWNlaXZlciA9PT0gbnVsbCB8fCAodHlwZW9mIHJlY2VpdmVyICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiByZWNlaXZlciAhPT0gXCJmdW5jdGlvblwiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgJ2luJyBvcGVyYXRvciBvbiBub24tb2JqZWN0XCIpO1xyXG4gICAgcmV0dXJuIHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgPT09IHN0YXRlIDogc3RhdGUuaGFzKHJlY2VpdmVyKTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIE1vZGFsLCBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlRmlsZXNNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgICBmaWxlc1RvRGVsZXRlOiBURmlsZVtdO1xuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBmaWxlc1RvRGVsZXRlOiBURmlsZVtdKSB7XG4gICAgICAgIHN1cGVyKGFwcCk7XG4gICAgICAgIHRoaXMuZmlsZXNUb0RlbGV0ZSA9IGZpbGVzVG9EZWxldGU7XG4gICAgfVxuXG4gICAgb25PcGVuKCkge1xuICAgICAgICBsZXQgeyBjb250ZW50RWwsIHRpdGxlRWwgfSA9IHRoaXM7XG4gICAgICAgIHRpdGxlRWwuc2V0VGV4dChcbiAgICAgICAgICAgIFwiTW92ZSBcIiArIHRoaXMuZmlsZXNUb0RlbGV0ZS5sZW5ndGggKyBcIiBmaWxlcyB0byBzeXN0ZW0gdHJhc2g/XCJcbiAgICAgICAgKTtcbiAgICAgICAgY29udGVudEVsXG4gICAgICAgICAgICAuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIkNhbmNlbFwiIH0pXG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgICAgIGNvbnRlbnRFbC5zZXRBdHRyKFwibWFyZ2luXCIsIFwiYXV0b1wiKTtcblxuICAgICAgICBjb250ZW50RWxcbiAgICAgICAgICAgIC5jcmVhdGVFbChcImJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgY2xzOiBcIm1vZC1jdGFcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkNvbmZpcm1cIixcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlc1RvRGVsZXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0LnRyYXNoKGZpbGUsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBsZXQgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRlbnRFbC5lbXB0eSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEFwcCwgbm9ybWFsaXplUGF0aCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IEZpbmRPcnBoYW5lZEZpbGVzUGx1Z2luLCB7IFNldHRpbmdzIH0gZnJvbSBcIi4vbWFpblwiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IEZpbmRPcnBoYW5lZEZpbGVzUGx1Z2luO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBhcHA6IEFwcCxcbiAgICAgICAgcGx1Z2luOiBGaW5kT3JwaGFuZWRGaWxlc1BsdWdpbixcbiAgICAgICAgcHJpdmF0ZSBkZWZhdWx0U2V0dGluZ3M6IFNldHRpbmdzXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgLy8gQWRkIHRyYWlsaW5nIHNsYXNoIHRvIGNhdGNoIGZpbGVzIG5hbWVkIGxpa2UgdGhlIGRpcmVjdG9yeS4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9WaW56ZW50MDMvZmluZC11bmxpbmtlZC1maWxlcy9pc3N1ZXMvMjRcbiAgICBmb3JtYXRQYXRoKHBhdGg6IHN0cmluZywgYWRkRGlyZWN0b3J5U2xhc2g6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT0gMCkgcmV0dXJuIHBhdGg7XG4gICAgICAgIHBhdGggPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgICAgICBpZiAoYWRkRGlyZWN0b3J5U2xhc2gpIHJldHVybiBwYXRoICsgXCIvXCI7XG4gICAgICAgIGVsc2UgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdC5uYW1lIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDRcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJTZXR0aW5ncyBmb3IgZmluZGluZyBvcnBoYW5lZCBmaWxlc1wiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZShcIk9wZW4gb3V0cHV0IGZpbGVcIikuYWRkVG9nZ2xlKChjYikgPT5cbiAgICAgICAgICAgIGNiXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5PdXRwdXRGaWxlKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3Blbk91dHB1dEZpbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiT3V0cHV0IGZpbGUgbmFtZVwiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJTZXQgbmFtZSBvZiBvdXRwdXQgZmlsZSAod2l0aG91dCBmaWxlIGV4dGVuc2lvbikuIE1ha2Ugc3VyZSBubyBmaWxlIGV4aXN0cyB3aXRoIHRoaXMgbmFtZSBiZWNhdXNlIGl0IHdpbGwgYmUgb3ZlcndyaXR0ZW4hIElmIHRoZSBuYW1lIGlzIGVtcHR5LCB0aGUgZGVmYXVsdCBuYW1lIGlzIHNldC5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHQoKGNiKSA9PlxuICAgICAgICAgICAgICAgIGNiXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3Mub3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRGlzYWJsZSB3b3JraW5nIGxpbmtzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIkluZGVudCBsaW5lcyB0byBkaXNhYmxlIHRoZSBsaW5rIGFuZCB0byBjbGVhbiB1cCB0aGUgZ3JhcGggdmlld1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlV29ya2luZ0xpbmtzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVXb3JraW5nTGlua3MpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzIGluIHRoZSBnaXZlbiBkaXJlY3Rvcmllc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJFbmFibGUgdG8gZXhjbHVkZSBmaWxlcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3JpZXMuIERpc2FibGUgdG8gb25seSBpbmNsdWRlIGZpbGVzIGluIHRoZSBnaXZlbiBkaXJlY3Rvcmllc1wiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRGlyZWN0b3JpZXMpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZURpcmVjdG9yaWVzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGRpcmVjdG9yeSBwYXRoIGluIGEgbmV3IGxpbmVcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLmpvaW4oXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISlcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkV4Y2x1ZGUgbGlua3NcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiRXhjbHVkZSBmaWxlcywgd2hpY2ggY29udGFpbiB0aGUgZ2l2ZW4gZmlsZSBhcyBsaW5rLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpLiBTZXQgaXQgdG8gYCpgIHRvIGV4Y2x1ZGUgZmlsZXMgd2l0aCBsaW5rcy5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGlua3NUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGlua3NUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBmaWxldHlwZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiRW5hYmxlIHRvIGV4Y2x1ZGUgZmlsZXMgd2l0aCB0aGUgZ2l2ZW4gZmlsZXR5cGVzLiBEaXNhYmxlIHRvIG9ubHkgaW5jbHVkZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBmaWxldHlwZXNcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZUZpbGVUeXBlcylcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRmlsZVR5cGVzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxlIHR5cGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkVmZmVjdCBkZXBlbmRzIG9uIHRvZ2dsZSBhYm92ZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJkb2N4LHR4dFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvSWdub3JlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkV4Y2x1ZGUgdGFnc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJFeGNsdWRlIGZpbGVzLCB3aGljaCBjb250YWluIHRoZSBnaXZlbiB0YWcuIEFkZCBlYWNoIHRhZyBzZXBhcmF0ZWQgYnkgY29tbWEgKHdpdGhvdXQgYCNgKVwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoKGNiKSA9PlxuICAgICAgICAgICAgICAgIGNiXG4gICAgICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcInRvZG8sdW5maW5pc2hlZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGFnc1RvSWdub3JlLmpvaW4oXCIsXCIpKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50YWdzVG9JZ25vcmUgPSB0YWdzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRmlsZXR5cGVzIHRvIGRlbGV0ZSBwZXIgY29tbWFuZC4gU2VlIFJFQURNRS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiQWRkIGVhY2ggZmlsZXR5cGUgc2VwYXJhdGVkIGJ5IGNvbW1hLiBTZXQgdG8gYCpgIHRvIGRlbGV0ZSBhbGwgZmlsZXMuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwianBnLHBuZ1wiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLy8gU2V0dGluZ3MgZm9yIGZpbmQgYnJva2VuTGlua3NcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlNldHRpbmdzIGZvciBmaW5kaW5nIGJyb2tlbiBsaW5rc1wiLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiT3V0cHV0IGZpbGUgbmFtZVwiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJTZXQgbmFtZSBvZiBvdXRwdXQgZmlsZSAod2l0aG91dCBmaWxlIGV4dGVuc2lvbikuIE1ha2Ugc3VyZSBubyBmaWxlIGV4aXN0cyB3aXRoIHRoaXMgbmFtZSBiZWNhdXNlIGl0IHdpbGwgYmUgb3ZlcndyaXR0ZW4hIElmIHRoZSBuYW1lIGlzIGVtcHR5LCB0aGUgZGVmYXVsdCBuYW1lIGlzIHNldC5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHQoKGNiKSA9PlxuICAgICAgICAgICAgICAgIGNiXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBmaWxlcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3JpZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiRW5hYmxlIHRvIGV4Y2x1ZGUgZmlsZXMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yaWVzLiBEaXNhYmxlIHRvIG9ubHkgaW5jbHVkZSBmaWxlcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3JpZXNcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzSWdub3JlRGlyZWN0b3JpZXNcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NJZ25vcmVEaXJlY3RvcmllcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGRpcmVjdG9yeSBwYXRoIGluIGEgbmV3IGxpbmVcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIkV4Y2x1ZGUgbGlua3MgaW4gdGhlIHNwZWNpZmllZCBmaWxlLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZS5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGxpbmtzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIkV4Y2x1ZGUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIGZpbGUgYXMgbGluay4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKS4gU2V0IGl0IHRvIGAqYCB0byBleGNsdWRlIGZpbGVzIHdpdGggbGlua3MuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZS5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGV0eXBlc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJFeGNsdWRlIGxpbmtzIHdpdGggdGhlIHNwZWNpZmllZCBmaWxldHlwZS4gQWRkIGVhY2ggZmlsZXR5cGUgc2VwYXJhdGVkIGJ5IGNvbW1hXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZG9jeCx0eHRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmUuam9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIixcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0ZpbGVUeXBlc1RvSWdub3JlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSB0YWdzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIkV4Y2x1ZGUgbGlua3MgaW4gZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIHRhZy4gQWRkIGVhY2ggdGFnIHNlcGFyYXRlZCBieSBjb21tYSAod2l0aG91dCBgI2ApXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwidG9kbyx1bmZpbmlzaGVkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZS5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiLFwiXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ3MgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzVGFnc1RvSWdub3JlID0gdGFncztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImg0XCIsIHtcbiAgICAgICAgICAgIHRleHQ6IFwiU2V0dGluZ3MgZm9yIGZpbmRpbmcgZmlsZXMgd2l0aG91dCB0YWdzXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJPdXRwdXQgZmlsZSBuYW1lXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIlNldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVGV4dCgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mud2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mud2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkV4Y2x1ZGUgZmlsZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiRXhjbHVkZSB0aGUgc3BlY2lmaWMgZmlsZXMuIEFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISlcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBkaXJlY3Rvcmllc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXG4gICAgICAgICAgICAgICAgXCJFeGNsdWRlIGZpbGVzIGluIHRoZSBzcGVjaWZpZWQgZGlyZWN0b3JpZXMuIEFkZCBlYWNoIGRpcmVjdG9yeSBwYXRoIGluIGEgbmV3IGxpbmVcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvU3ViZGlyZWN0b3J5XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzRGlyZWN0b3JpZXNUb0lnbm9yZS5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKCh2YWx1ZSkgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vLyBTZXR0aW5ncyBmb3IgZW1wdHkgZmlsZXNcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNFwiLCB7XG4gICAgICAgICAgICB0ZXh0OiBcIlNldHRpbmdzIGZvciBmaW5kaW5nIGVtcHR5IGZpbGVzXCIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJPdXRwdXQgZmlsZSBuYW1lXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcbiAgICAgICAgICAgICAgICBcIlNldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkVGV4dCgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlGaWxlc091dHB1dEZpbGVOYW1lID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2V0dGluZ3MuZW1wdHlGaWxlc091dHB1dEZpbGVOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbXB0eUZpbGVzT3V0cHV0RmlsZU5hbWUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlGaWxlc091dHB1dEZpbGVOYW1lKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBmaWxlcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3JpZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiRW5hYmxlIHRvIGV4Y2x1ZGUgZmlsZXMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yaWVzLiBEaXNhYmxlIHRvIG9ubHkgaW5jbHVkZSBmaWxlcyBpbiB0aGUgZ2l2ZW4gZGlyZWN0b3JpZXNcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVtcHR5RmlsZXNJZ25vcmVEaXJlY3RvcmllcylcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlGaWxlc0lnbm9yZURpcmVjdG9yaWVzID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRGlyZWN0b3JpZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKChjYikgPT5cbiAgICAgICAgICAgICAgICBjYlxuICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvU3ViZGlyZWN0b3J5XCIpXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWYWx1ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVtcHR5RmlsZXNEaXJlY3Rvcmllcy5qb2luKFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgodmFsdWUpID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlGaWxlc0RpcmVjdG9yaWVzID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISlcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYSgoY2IpID0+XG4gICAgICAgICAgICAgICAgY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZW1wdHlGaWxlc0ZpbGVzVG9JZ25vcmUuam9pbihcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lbXB0eUZpbGVzRmlsZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJEb25hdGVcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFxuICAgICAgICAgICAgICAgIFwiSWYgeW91IGxpa2UgdGhpcyBQbHVnaW4sIGNvbnNpZGVyIGRvbmF0aW5nIHRvIHN1cHBvcnQgY29udGludWVkIGRldmVsb3BtZW50LlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuYWRkQnV0dG9uKChidCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0LmJ1dHRvbkVsLm91dGVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9rby1maS5jb20vRjFGMTk1SVE1JyB0YXJnZXQ9J19ibGFuayc+PGltZyBoZWlnaHQ9JzM2JyBzdHlsZT0nYm9yZGVyOjBweDtoZWlnaHQ6MzZweDsnIHNyYz0naHR0cHM6Ly9jZG4ua28tZmkuY29tL2Nkbi9rb2ZpMy5wbmc/dj0zJyBib3JkZXI9JzAnIGFsdD0nQnV5IE1lIGEgQ29mZmVlIGF0IGtvLWZpLmNvbScgLz48L2E+XCI7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIEFwcCxcbiAgICBDYWNoZWRNZXRhZGF0YSxcbiAgICBnZXRBbGxUYWdzLFxuICAgIGl0ZXJhdGVDYWNoZVJlZnMsXG4gICAgVEZpbGUsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIHByaXZhdGUgZmlsZUNhY2hlOiBDYWNoZWRNZXRhZGF0YTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgdGhlIGdpdmVuIHNldHRpbmdzLiBJcyB1c2VkIGZvciBgRmluZCBvcnBoYW5lZCBmaWxlc2AgYW5kIGBGaW5kIGJyb2tlbiBsaW5rc2BcbiAgICAgKiBAcGFyYW0gYXBwXG4gICAgICogQHBhcmFtIGZpbGVQYXRoXG4gICAgICogQHBhcmFtIHRhZ3NUb0lnbm9yZVxuICAgICAqIEBwYXJhbSBsaW5rc1RvSWdub3JlXG4gICAgICogQHBhcmFtIGRpcmVjdG9yaWVzVG9JZ25vcmVcbiAgICAgKiBAcGFyYW0gZmlsZXNUb0lnbm9yZVxuICAgICAqIEBwYXJhbSBpZ25vcmVEaXJlY3Rvcmllc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwcDogQXBwLFxuICAgICAgICBwcml2YXRlIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgICAgIHByaXZhdGUgdGFnc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBsaW5rc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBmaWxlc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBpZ25vcmVEaXJlY3RvcmllczogYm9vbGVhbiA9IHRydWUsXG4gICAgICAgIHByaXZhdGUgZGlyPzogc3RyaW5nXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZmlsZUNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUoZmlsZVBhdGgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzVGFnc1RvSWdub3JlKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCB0YWdzID0gZ2V0QWxsVGFncyh0aGlzLmZpbGVDYWNoZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0YWdzPy5maW5kKCh0YWcpID0+XG4gICAgICAgICAgICAgICAgdGhpcy50YWdzVG9JZ25vcmUuY29udGFpbnModGFnLnN1YnN0cmluZygxKSlcbiAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgIH1cbiAgICBwcml2YXRlIGhhc0xpbmtzVG9JZ25vcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICh0aGlzLmZpbGVDYWNoZT8uZW1iZWRzICE9IG51bGwgfHwgdGhpcy5maWxlQ2FjaGU/LmxpbmtzICE9IG51bGwpICYmXG4gICAgICAgICAgICB0aGlzLmxpbmtzVG9JZ25vcmVbMF0gPT0gXCIqXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVyYXRlQ2FjaGVSZWZzKHRoaXMuZmlsZUNhY2hlLCAoY2IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KFxuICAgICAgICAgICAgICAgIGNiLmxpbmssXG4gICAgICAgICAgICAgICAgdGhpcy5maWxlUGF0aFxuICAgICAgICAgICAgKT8ucGF0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbmtzVG9JZ25vcmUuY29udGFpbnMobGluayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2hlY2tEaXJlY3RvcnkoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRpcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbGVQYXRoLnN0YXJ0c1dpdGgodGhpcy5kaXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb250YWlucyA9XG4gICAgICAgICAgICB0aGlzLmRpcmVjdG9yaWVzVG9JZ25vcmUuZmluZChcbiAgICAgICAgICAgICAgICAodmFsdWUpID0+IHZhbHVlLmxlbmd0aCAhPSAwICYmIHRoaXMuZmlsZVBhdGguc3RhcnRzV2l0aCh2YWx1ZSlcbiAgICAgICAgICAgICkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBjb250YWlucztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAhY29udGFpbnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmlsZVRvSWdub3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlc1RvSWdub3JlLmNvbnRhaW5zKHRoaXMuZmlsZVBhdGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1ZhbGlkKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRoaXMuaGFzVGFnc1RvSWdub3JlKCkgJiZcbiAgICAgICAgICAgICF0aGlzLmhhc0xpbmtzVG9JZ25vcmUoKSAmJlxuICAgICAgICAgICAgIXRoaXMuY2hlY2tEaXJlY3RvcnkoKSAmJlxuICAgICAgICAgICAgIXRoaXMuaXNGaWxlVG9JZ25vcmUoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyaXRlcyB0aGUgdGV4dCB0byB0aGUgZmlsZSBhbmQgb3BlbnMgdGhlIGZpbGUgaW4gYSBuZXcgcGFuZSBpZiBpdCBpcyBub3Qgb3BlbmVkIHlldFxuICAgICAqIEBwYXJhbSBhcHBcbiAgICAgKiBAcGFyYW0gb3V0cHV0RmlsZU5hbWUgbmFtZSBvZiB0aGUgb3V0cHV0IGZpbGVcbiAgICAgKiBAcGFyYW0gdGV4dCBkYXRhIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIGZpbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgd3JpdGVBbmRPcGVuRmlsZShcbiAgICAgICAgYXBwOiBBcHAsXG4gICAgICAgIG91dHB1dEZpbGVOYW1lOiBzdHJpbmcsXG4gICAgICAgIHRleHQ6IHN0cmluZyxcbiAgICAgICAgb3BlbkZpbGU6IGJvb2xlYW5cbiAgICApIHtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUob3V0cHV0RmlsZU5hbWUsIHRleHQpO1xuICAgICAgICBpZiAoIW9wZW5GaWxlKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGZpbGVJc0FscmVhZHlPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKChsZWFmKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbGVhZi5nZXREaXNwbGF5VGV4dCgpICE9IFwiXCIgJiZcbiAgICAgICAgICAgICAgICBvdXRwdXRGaWxlTmFtZS5zdGFydHNXaXRoKGxlYWYuZ2V0RGlzcGxheVRleHQoKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGZpbGVJc0FscmVhZHlPcGVuZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFmaWxlSXNBbHJlYWR5T3BlbmVkKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQYW5lID0gYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXCJlbXB0eVwiKS5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgIGlmIChuZXdQYW5lKSB7XG4gICAgICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQob3V0cHV0RmlsZU5hbWUsIFwiL1wiLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob3V0cHV0RmlsZU5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBhcHAud29ya3NwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0TGVhdmVzT2ZUeXBlKFwiZW1wdHlcIilbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5vcGVuRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChvdXRwdXRGaWxlTmFtZSwgXCIvXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7XHJcbiAgICBnZXRBbGxUYWdzLFxyXG4gICAgZ2V0TGlua3BhdGgsXHJcbiAgICBpdGVyYXRlQ2FjaGVSZWZzLFxyXG4gICAgTm90aWNlLFxyXG4gICAgUGx1Z2luLFxyXG4gICAgVEZpbGUsXHJcbiAgICBURm9sZGVyLFxyXG59IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBEZWxldGVGaWxlc01vZGFsIH0gZnJvbSBcIi4vZGVsZXRlRmlsZXNNb2RhbFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc1RhYiB9IGZyb20gXCIuL3NldHRpbmdzVGFiXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG4gICAgb3V0cHV0RmlsZU5hbWU6IHN0cmluZztcclxuICAgIGRpc2FibGVXb3JraW5nTGlua3M6IGJvb2xlYW47XHJcbiAgICBkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuICAgIGZpbGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG4gICAgZmlsZVR5cGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG4gICAgbGlua3NUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICB0YWdzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG4gICAgZmlsZVR5cGVzVG9EZWxldGU6IHN0cmluZ1tdO1xyXG4gICAgaWdub3JlRmlsZVR5cGVzOiBib29sZWFuO1xyXG4gICAgaWdub3JlRGlyZWN0b3JpZXM6IGJvb2xlYW47XHJcbiAgICB1bnJlc29sdmVkTGlua3NJZ25vcmVEaXJlY3RvcmllczogYm9vbGVhbjtcclxuICAgIHVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG4gICAgdW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICB1bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICB1bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuICAgIHVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICB1bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgd2l0aG91dFRhZ3NEaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuICAgIHdpdGhvdXRUYWdzRmlsZXNUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICB3aXRob3V0VGFnc091dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgICBlbXB0eUZpbGVzT3V0cHV0RmlsZU5hbWU6IHN0cmluZztcclxuICAgIGVtcHR5RmlsZXNEaXJlY3Rvcmllczogc3RyaW5nW107XHJcbiAgICBlbXB0eUZpbGVzRmlsZXNUb0lnbm9yZTogc3RyaW5nW107XHJcbiAgICBlbXB0eUZpbGVzSWdub3JlRGlyZWN0b3JpZXM6IGJvb2xlYW47XHJcbiAgICBvcGVuT3V0cHV0RmlsZTogYm9vbGVhbjtcclxufVxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuICAgIG91dHB1dEZpbGVOYW1lOiBcIm9ycGhhbmVkIGZpbGVzIG91dHB1dFwiLFxyXG4gICAgZGlzYWJsZVdvcmtpbmdMaW5rczogZmFsc2UsXHJcbiAgICBkaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuICAgIGZpbGVzVG9JZ25vcmU6IFtdLFxyXG4gICAgZmlsZVR5cGVzVG9JZ25vcmU6IFtdLFxyXG4gICAgbGlua3NUb0lnbm9yZTogW10sXHJcbiAgICB0YWdzVG9JZ25vcmU6IFtdLFxyXG4gICAgZmlsZVR5cGVzVG9EZWxldGU6IFtdLFxyXG4gICAgaWdub3JlRmlsZVR5cGVzOiB0cnVlLFxyXG4gICAgaWdub3JlRGlyZWN0b3JpZXM6IHRydWUsXHJcbiAgICB1bnJlc29sdmVkTGlua3NJZ25vcmVEaXJlY3RvcmllczogdHJ1ZSxcclxuICAgIHVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lOiBcImJyb2tlbiBsaW5rcyBvdXRwdXRcIixcclxuICAgIHVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmU6IFtdLFxyXG4gICAgdW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZTogW10sXHJcbiAgICB1bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcbiAgICB1bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlOiBbXSxcclxuICAgIHVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZTogW10sXHJcbiAgICB3aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmU6IFtdLFxyXG4gICAgd2l0aG91dFRhZ3NGaWxlc1RvSWdub3JlOiBbXSxcclxuICAgIHdpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWU6IFwiZmlsZXMgd2l0aG91dCB0YWdzXCIsXHJcbiAgICBlbXB0eUZpbGVzT3V0cHV0RmlsZU5hbWU6IFwiZW1wdHkgZmlsZXNcIixcclxuICAgIGVtcHR5RmlsZXNEaXJlY3RvcmllczogW10sXHJcbiAgICBlbXB0eUZpbGVzRmlsZXNUb0lnbm9yZTogW10sXHJcbiAgICBlbXB0eUZpbGVzSWdub3JlRGlyZWN0b3JpZXM6IHRydWUsXHJcbiAgICBvcGVuT3V0cHV0RmlsZTogdHJ1ZSxcclxufTtcclxuXHJcbmludGVyZmFjZSBCcm9rZW5MaW5rIHtcclxuICAgIGxpbms6IHN0cmluZztcclxuICAgIGZpbGVzOiBzdHJpbmdbXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZE9ycGhhbmVkRmlsZXNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG4gICAgc2V0dGluZ3M6IFNldHRpbmdzO1xyXG4gICAgZmluZEV4dGVuc2lvblJlZ2V4ID0gLyhcXC5bXi5dKykkLztcclxuICAgIGFzeW5jIG9ubG9hZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRpbmcgXCIgKyB0aGlzLm1hbmlmZXN0Lm5hbWUgKyBcIiBwbHVnaW5cIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICBpZDogXCJmaW5kLXVubGlua2VkLWZpbGVzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiRmluZCBvcnBoYW5lZCBmaWxlc1wiLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5maW5kT3JwaGFuZWRGaWxlcygpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgIGlkOiBcImZpbmQtdW5yZXNvbHZlZC1saW5rXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiRmluZCBicm9rZW4gbGlua3NcIixcclxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuZmluZEJyb2tlbkxpbmtzKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgICAgICAgaWQ6IFwiZGVsZXRlLXVubGlua2VkLWZpbGVzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiRGVsZXRlIG9ycGhhbmVkIGZpbGVzIHdpdGggY2VydGFpbiBleHRlbnNpb24uIFNlZSBSRUFETUVcIixcclxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuZGVsZXRlT3JwaGFuZWRGaWxlcygpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgIGlkOiBcImNyZWF0ZS1maWxlcy1vZi1icm9rZW4tbGlua3NcIixcclxuICAgICAgICAgICAgbmFtZTogXCJDcmVhdGUgZmlsZXMgb2YgYnJva2VuIGxpbmtzXCIsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB0aGlzLmNyZWF0ZUZpbGVzT2ZCcm9rZW5MaW5rcygpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgIGlkOiBcImZpbmQtZmlsZXMtd2l0aG91dC10YWdzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiRmluZCBmaWxlcyB3aXRob3V0IHRhZ3NcIixcclxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuZmluZEZpbGVzV2l0aG91dFRhZ3MoKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICAgICAgICBpZDogXCJmaW5kLWVtcHR5LWZpbGVzXCIsXHJcbiAgICAgICAgICAgIG5hbWU6IFwiRmluZCBlbXB0eSBmaWxlc1wiLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5maW5kRW1wdHlGaWxlcygpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgICAgICAgIGlkOiBcImRlbGV0ZS1lbXB0eS1maWxlc1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkRlbGV0ZSBlbXB0eSBmaWxlc1wiLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5kZWxldGVFbXB0eUZpbGVzKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcywgREVGQVVMVF9TRVRUSU5HUykpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJmaWxlLW1lbnVcIiwgKG1lbnUsIGZpbGUsIHNvdXJjZSwgbGVhZikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcclxuICAgICAgICAgICAgICAgIG1lbnUuYWRkSXRlbSgoY2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYi5zZXRJY29uKFwic2VhcmNoXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNiLnNldFRpdGxlKFwiRmluZCBvcnBoYW5lZCBmaWxlc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdHJhaWxpbmcgc2xhc2ggdG8gY2F0Y2ggZmlsZXMgbmFtZWQgbGlrZSB0aGUgZGlyZWN0b3J5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ZpbnplbnQwMy9maW5kLXVubGlua2VkLWZpbGVzL2lzc3Vlcy8yNFxyXG4gICAgICAgICAgICAgICAgICAgIGNiLm9uQ2xpY2soKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kT3JwaGFuZWRGaWxlcyhmaWxlLnBhdGggKyBcIi9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGNyZWF0ZUZpbGVzT2ZCcm9rZW5MaW5rcygpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICEoYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5leGlzdHMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lICsgXCIubWRcIlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBuZXcgTm90aWNlKFxyXG4gICAgICAgICAgICAgICAgXCJDYW4ndCBmaW5kIGZpbGUgLSBQbGVhc2UgcnVuIHRoZSBgRmluZCBicm9rZW4gZmlsZXMnIGNvbW1hbmQgYmVmb3JlXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUoXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiXHJcbiAgICAgICAgKT8ubGlua3M7XHJcbiAgICAgICAgaWYgKCFsaW5rcykge1xyXG4gICAgICAgICAgICBuZXcgTm90aWNlKFwiTm8gYnJva2VuIGxpbmtzIGZvdW5kXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZpbGVzVG9DcmVhdGU6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgbGluayBvZiBsaW5rcykge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChcclxuICAgICAgICAgICAgICAgIGxpbmsubGluayxcclxuICAgICAgICAgICAgICAgIFwiL1wiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChmaWxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgY29uc3QgZm91bmRUeXBlID0gdGhpcy5maW5kRXh0ZW5zaW9uUmVnZXguZXhlYyhsaW5rLmxpbmspPy5bMF07XHJcbiAgICAgICAgICAgIGlmICgoZm91bmRUeXBlID8/IFwiLm1kXCIpID09IFwiLm1kXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb3VuZFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWxlc1RvQ3JlYXRlLnB1c2gobGluay5saW5rKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZXNUb0NyZWF0ZS5wdXNoKGxpbmsubGluayArIFwiLm1kXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmlsZXNUb0NyZWF0ZSkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXNUb0NyZWF0ZSkge1xyXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5hcHAudmF1bHQuY3JlYXRlKGZpbGUsIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZpbmRFbXB0eUZpbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuICAgICAgICBjb25zdCBlbXB0eUZpbGVzOiBURmlsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgICFuZXcgVXRpbHMoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5wYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZW1wdHlGaWxlc0RpcmVjdG9yaWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZW1wdHlGaWxlc0ZpbGVzVG9JZ25vcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5lbXB0eUZpbGVzSWdub3JlRGlyZWN0b3JpZXNcclxuICAgICAgICAgICAgICAgICkuaXNWYWxpZCgpXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRyaW1tZWRDb250ZW50ID0gY29udGVudC50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghdHJpbW1lZENvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgIGVtcHR5RmlsZXMucHVzaChmaWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcclxuICAgICAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBjYWNoZT8uZnJvbnRtYXR0ZXI7XHJcbiAgICAgICAgICAgIGlmIChmcm9udG1hdHRlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZXMgPSBjb250ZW50LnRyaW1SaWdodCgpLnNwbGl0KFwiXFxuXCIpLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9udG1hdHRlci5wb3NpdGlvbi5lbmQubGluZSA9PSBsaW5lcyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbXB0eUZpbGVzLnB1c2goZmlsZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByZWZpeDogc3RyaW5nO1xyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmRpc2FibGVXb3JraW5nTGlua3MpIHByZWZpeCA9IFwiXHRcIjtcclxuICAgICAgICBlbHNlIHByZWZpeCA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGVtcHR5RmlsZXNcclxuICAgICAgICAgICAgLm1hcCgoZmlsZSkgPT4gYCR7cHJlZml4fS0gW1ske2ZpbGUucGF0aH1dXWApXHJcbiAgICAgICAgICAgIC5qb2luKFwiXFxuXCIpO1xyXG4gICAgICAgIFV0aWxzLndyaXRlQW5kT3BlbkZpbGUoXHJcbiAgICAgICAgICAgIHRoaXMuYXBwLFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmVtcHR5RmlsZXNPdXRwdXRGaWxlTmFtZSArIFwiLm1kXCIsXHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3Blbk91dHB1dEZpbGVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRPcnBoYW5lZEZpbGVzKGRpcj86IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IG91dEZpbGVOYW1lID0gdGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCI7XHJcbiAgICAgICAgbGV0IG91dEZpbGU6IFRGaWxlO1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuICAgICAgICBjb25zdCBtYXJrZG93bkZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG4gICAgICAgIGNvbnN0IGxpbmtzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgICAgICBtYXJrZG93bkZpbGVzLmZvckVhY2goKG1hcmtGaWxlOiBURmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobWFya0ZpbGUucGF0aCA9PSBvdXRGaWxlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgb3V0RmlsZSA9IG1hcmtGaWxlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGl0ZXJhdGVDYWNoZVJlZnMoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShtYXJrRmlsZSksXHJcbiAgICAgICAgICAgICAgICAoY2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eHQgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRMaW5rcGF0aChjYi5saW5rKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya0ZpbGUucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR4dCAhPSBudWxsKSBsaW5rcy5wdXNoKHR4dC5wYXRoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBub3RMaW5rZWRGaWxlcyA9IGZpbGVzLmZpbHRlcigoZmlsZSkgPT5cclxuICAgICAgICAgICAgdGhpcy5pc1ZhbGlkKGZpbGUsIGxpbmtzLCBkaXIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBub3RMaW5rZWRGaWxlcy5yZW1vdmUob3V0RmlsZSk7XHJcblxyXG4gICAgICAgIGxldCB0ZXh0ID0gXCJcIjtcclxuICAgICAgICBsZXQgcHJlZml4OiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcykgcHJlZml4ID0gXCJcdFwiO1xyXG4gICAgICAgIGVsc2UgcHJlZml4ID0gXCJcIjtcclxuICAgICAgICBub3RMaW5rZWRGaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHQgKz1cclxuICAgICAgICAgICAgICAgIHByZWZpeCArXHJcbiAgICAgICAgICAgICAgICBcIi0gW1tcIiArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGZpbGUsIFwiL1wiLCBmYWxzZSkgK1xyXG4gICAgICAgICAgICAgICAgXCJdXVxcblwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFV0aWxzLndyaXRlQW5kT3BlbkZpbGUoXHJcbiAgICAgICAgICAgIHRoaXMuYXBwLFxyXG4gICAgICAgICAgICBvdXRGaWxlTmFtZSxcclxuICAgICAgICAgICAgdGV4dCxcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vcGVuT3V0cHV0RmlsZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBkZWxldGVPcnBoYW5lZEZpbGVzKCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIShhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiXHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXHJcbiAgICAgICAgICAgICAgICBcIkNhbid0IGZpbmQgZmlsZSAtIFBsZWFzZSBydW4gdGhlIGBGaW5kIG9ycGhhbmVkIGZpbGVzJyBjb21tYW5kIGJlZm9yZVwiXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGlua3MgPVxyXG4gICAgICAgICAgICB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCJcclxuICAgICAgICAgICAgKT8ubGlua3MgPz8gW107XHJcbiAgICAgICAgY29uc3QgZmlsZXNUb0RlbGV0ZTogVEZpbGVbXSA9IFtdO1xyXG4gICAgICAgIGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoXHJcbiAgICAgICAgICAgICAgICBsaW5rLmxpbmssXHJcbiAgICAgICAgICAgICAgICBcIi9cIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGVbMF0gPT0gXCIqXCIgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUuY29udGFpbnMoZmlsZS5leHRlbnNpb24pXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZmlsZXNUb0RlbGV0ZS5wdXNoKGZpbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGZpbGVzVG9EZWxldGUubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgbmV3IERlbGV0ZUZpbGVzTW9kYWwodGhpcy5hcHAsIGZpbGVzVG9EZWxldGUpLm9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBkZWxldGVFbXB0eUZpbGVzKCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIShhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyhcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZW1wdHlGaWxlc091dHB1dEZpbGVOYW1lICsgXCIubWRcIlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICBuZXcgTm90aWNlKFxyXG4gICAgICAgICAgICAgICAgXCJDYW4ndCBmaW5kIGZpbGUgLSBQbGVhc2UgcnVuIHRoZSBgRmluZCBvcnBoYW5lZCBmaWxlcycgY29tbWFuZCBiZWZvcmVcIlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGxpbmtzID1cclxuICAgICAgICAgICAgdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuZW1wdHlGaWxlc091dHB1dEZpbGVOYW1lICsgXCIubWRcIlxyXG4gICAgICAgICAgICApPy5saW5rcyA/PyBbXTtcclxuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlOiBURmlsZVtdID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBsaW5rIG9mIGxpbmtzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KFxyXG4gICAgICAgICAgICAgICAgbGluay5saW5rLFxyXG4gICAgICAgICAgICAgICAgXCIvXCJcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKCFmaWxlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmaWxlc1RvRGVsZXRlLnB1c2goZmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaWxlc1RvRGVsZXRlLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIG5ldyBEZWxldGVGaWxlc01vZGFsKHRoaXMuYXBwLCBmaWxlc1RvRGVsZXRlKS5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEJyb2tlbkxpbmtzKCkge1xyXG4gICAgICAgIGNvbnN0IG91dEZpbGVOYW1lID0gdGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSArIFwiLm1kXCI7XHJcbiAgICAgICAgY29uc3QgbGlua3M6IEJyb2tlbkxpbmtbXSA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGJyb2tlbkxpbmtzID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS51bnJlc29sdmVkTGlua3M7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3Qgc291cmNlRmlsZXBhdGggaW4gYnJva2VuTGlua3MpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc291cmNlRmlsZXBhdGggPT1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmlsZVR5cGUgPSBzb3VyY2VGaWxlcGF0aC5zdWJzdHJpbmcoXHJcbiAgICAgICAgICAgICAgICBzb3VyY2VGaWxlcGF0aC5sYXN0SW5kZXhPZihcIi5cIikgKyAxXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwLFxyXG4gICAgICAgICAgICAgICAgc291cmNlRmlsZXBhdGgsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZSxcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzSWdub3JlRGlyZWN0b3JpZXNcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1ZhbGlkKCkpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBsaW5rIGluIGJyb2tlbkxpbmtzW3NvdXJjZUZpbGVwYXRoXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlua0ZpbGVUeXBlID0gbGluay5zdWJzdHJpbmcobGluay5sYXN0SW5kZXhPZihcIi5cIikgKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZS5jb250YWlucyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua0ZpbGVUeXBlXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBmb3JtYXR0ZWRGaWxlUGF0aCA9IHNvdXJjZUZpbGVwYXRoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVUeXBlID09IFwibWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZEZpbGVQYXRoID0gc291cmNlRmlsZXBhdGguc3Vic3RyaW5nKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VGaWxlcGF0aC5sYXN0SW5kZXhPZihcIi5tZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBicm9rZW5MaW5rOiBCcm9rZW5MaW5rID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbZm9ybWF0dGVkRmlsZVBhdGhdLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbms6IGxpbmssXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmtzLmNvbnRhaW5zKGJyb2tlbkxpbmspKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR1cGxpY2F0aW9uID0gbGlua3MuZmluZCgoZSkgPT4gZS5saW5rID09IGxpbmspO1xyXG4gICAgICAgICAgICAgICAgaWYgKGR1cGxpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRpb24uZmlsZXMucHVzaChmb3JtYXR0ZWRGaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpbmtzLnB1c2goYnJva2VuTGluayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgVXRpbHMud3JpdGVBbmRPcGVuRmlsZShcclxuICAgICAgICAgICAgdGhpcy5hcHAsXHJcbiAgICAgICAgICAgIG91dEZpbGVOYW1lLFxyXG4gICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICBcIkRvbid0IGZvcmdldCB0aGF0IGNyZWF0aW5nIHRoZSBmaWxlIGZyb20gaGVyZSBtYXkgY3JlYXRlIHRoZSBmaWxlIGluIHRoZSB3cm9uZyBkaXJlY3RvcnkhXCIsXHJcbiAgICAgICAgICAgICAgICAuLi5saW5rcy5tYXAoXHJcbiAgICAgICAgICAgICAgICAgICAgKGUpID0+IGAtIFtbJHtlLmxpbmt9XV0gaW4gW1ske2UuZmlsZXMuam9pbihcIl1dLCBbW1wiKX1dXWBcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIF0uam9pbihcIlxcblwiKSxcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5vcGVuT3V0cHV0RmlsZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEZpbGVzV2l0aG91dFRhZ3MoKSB7XHJcbiAgICAgICAgY29uc3Qgb3V0RmlsZU5hbWUgPSB0aGlzLnNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiO1xyXG4gICAgICAgIGxldCBvdXRGaWxlOiBURmlsZTtcclxuICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuICAgICAgICBsZXQgd2l0aG91dEZpbGVzID0gZmlsZXMuZmlsdGVyKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIG5ldyBVdGlscyhcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcCxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlLnBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgW10sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy53aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgKS5pc1ZhbGlkKClcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIChnZXRBbGxUYWdzKHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID8/IDApIDw9IDBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB3aXRob3V0RmlsZXMucmVtb3ZlKG91dEZpbGUpO1xyXG5cclxuICAgICAgICBsZXQgcHJlZml4OiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcykgcHJlZml4ID0gXCJcdFwiO1xyXG4gICAgICAgIGVsc2UgcHJlZml4ID0gXCJcIjtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gd2l0aG91dEZpbGVzXHJcbiAgICAgICAgICAgIC5tYXAoKGZpbGUpID0+IGAke3ByZWZpeH0tIFtbJHtmaWxlLnBhdGh9XV1gKVxyXG4gICAgICAgICAgICAuam9pbihcIlxcblwiKTtcclxuICAgICAgICBVdGlscy53cml0ZUFuZE9wZW5GaWxlKFxyXG4gICAgICAgICAgICB0aGlzLmFwcCxcclxuICAgICAgICAgICAgb3V0RmlsZU5hbWUsXHJcbiAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3Blbk91dHB1dEZpbGVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBmaWxlIGluIGFuIG9ycGhhbmVkIGZpbGVcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZmlsZSBmaWxlIHRvIGNoZWNrXHJcbiAgICAgKiBAcGFyYW0gbGlua3MgYWxsIGxpbmtzIGluIHRoZSB2YXVsdFxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkKGZpbGU6IFRGaWxlLCBsaW5rczogc3RyaW5nW10sIGRpcjogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGxpbmtzLmNvbnRhaW5zKGZpbGUucGF0aCkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9maWxldHlwZXMgdG8gaWdub3JlIGJ5IGRlZmF1bHRcclxuICAgICAgICBpZiAoZmlsZS5leHRlbnNpb24gPT0gXCJjc3NcIikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5maWxlVHlwZXNUb0lnbm9yZVswXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBjb250YWluc0ZpbGVUeXBlID0gdGhpcy5zZXR0aW5ncy5maWxlVHlwZXNUb0lnbm9yZS5jb250YWlucyhcclxuICAgICAgICAgICAgICAgIGZpbGUuZXh0ZW5zaW9uXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUZpbGVUeXBlcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5zRmlsZVR5cGUpIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghY29udGFpbnNGaWxlVHlwZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuICAgICAgICAgICAgdGhpcy5hcHAsXHJcbiAgICAgICAgICAgIGZpbGUucGF0aCxcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy50YWdzVG9JZ25vcmUsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MubGlua3NUb0lnbm9yZSxcclxuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLFxyXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUsXHJcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaWdub3JlRGlyZWN0b3JpZXMsXHJcbiAgICAgICAgICAgIGRpclxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCF1dGlscy5pc1ZhbGlkKCkpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgb251bmxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1bmxvYWRpbmcgXCIgKyB0aGlzLm1hbmlmZXN0Lm5hbWUgKyBcIiBwbHVnaW5cIik7XHJcbiAgICB9XHJcbiAgICBhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTW9kYWwiLCJub3JtYWxpemVQYXRoIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJnZXRBbGxUYWdzIiwiaXRlcmF0ZUNhY2hlUmVmcyIsIlRGaWxlIiwiVEZvbGRlciIsIk5vdGljZSIsImdldExpbmtwYXRoIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUFvRkQ7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7QUFDdEQsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFD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
