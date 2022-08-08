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
        titleEl.setText('Move ' + this.filesToDelete.length + ' files to system trash?');
        contentEl
            .createEl("button", { text: "Cancel" })
            .addEventListener("click", function () { return _this.close(); });
        contentEl
            .setAttr("margin", "auto");
        contentEl
            .createEl("button", {
            cls: "mod-cta",
            text: "Confirm"
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
        containerEl.createEl("h4", { text: "Settings for finding orphaned files" });
        new obsidian.Setting(containerEl)
            .setName("Open output file")
            .addToggle(function (cb) {
            return cb.setValue(_this.plugin.settings.openOutputFile)
                .onChange(function (value) {
                _this.plugin.settings.openOutputFile = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Output file name')
            .setDesc('Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.')
            .addText(function (cb) { return cb.onChange(function (value) {
            if (value.length == 0) {
                _this.plugin.settings.outputFileName = _this.defaultSettings.outputFileName;
            }
            else {
                _this.plugin.settings.outputFileName = value;
            }
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.outputFileName); });
        new obsidian.Setting(containerEl)
            .setName('Disable working links')
            .setDesc('Indent lines to disable the link and to clean up the graph view')
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.disableWorkingLinks = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.disableWorkingLinks); });
        new obsidian.Setting(containerEl)
            .setName("Exclude files in the given directories")
            .setDesc("Enable to exclude files in the given directories. Disable to only include files in the given directories")
            .addToggle(function (cb) {
            return cb.setValue(_this.plugin.settings.ignoreDirectories)
                .onChange(function (value) {
                _this.plugin.settings.ignoreDirectories = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Directories")
            .setDesc("Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.directoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.directoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.filesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.filesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude links")
            .setDesc("Exclude files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to exclude files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.linksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.linksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude files with the given filetypes")
            .setDesc("Enable to exclude files with the given filetypes. Disable to only include files with the given filetypes")
            .addToggle(function (cb) {
            return cb.setValue(_this.plugin.settings.ignoreFileTypes)
                .onChange(function (value) {
                _this.plugin.settings.ignoreFileTypes = value;
                _this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("File types")
            .setDesc("Effect depends on toggle above")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("docx,txt")
            .setValue(_this.plugin.settings.fileTypesToIgnore.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.fileTypesToIgnore = extensions;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude tags")
            .setDesc("Exclude files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("todo,unfinished")
            .setValue(_this.plugin.settings.tagsToIgnore.join(","))
            .onChange(function (value) {
            var tags = value.trim().split(",");
            _this.plugin.settings.tagsToIgnore = tags;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Filetypes to delete per command. See README.")
            .setDesc("Add each filetype separated by comma. Set to `*` to delete all files.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("jpg,png")
            .setValue(_this.plugin.settings.fileTypesToDelete.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.fileTypesToDelete = extensions;
            _this.plugin.saveSettings();
        }); });
        /// Settings for find brokenLinks
        containerEl.createEl("h4", { text: "Settings for finding broken links" });
        new obsidian.Setting(containerEl)
            .setName('Output file name')
            .setDesc('Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.')
            .addText(function (cb) { return cb.onChange(function (value) {
            if (value.length == 0) {
                _this.plugin.settings.unresolvedLinksOutputFileName = _this.defaultSettings.unresolvedLinksOutputFileName;
            }
            else {
                _this.plugin.settings.unresolvedLinksOutputFileName = value;
            }
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.unresolvedLinksOutputFileName); });
        new obsidian.Setting(containerEl)
            .setName("Exclude directories")
            .setDesc("Exclude links in files in the specified directory. Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.unresolvedLinksDirectoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.unresolvedLinksDirectoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Exclude links in the specified file. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksFilesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksFilesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude links")
            .setDesc("Exclude files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to exclude files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksLinksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksLinksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude filetypes")
            .setDesc("Exclude links with the specified filetype. Add each filetype separated by comma")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("docx,txt")
            .setValue(_this.plugin.settings.unresolvedLinksFileTypesToIgnore.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksFileTypesToIgnore = extensions;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude tags")
            .setDesc("Exclude links in files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("todo,unfinished")
            .setValue(_this.plugin.settings.unresolvedLinksTagsToIgnore.join(","))
            .onChange(function (value) {
            var tags = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksTagsToIgnore = tags;
            _this.plugin.saveSettings();
        }); });
        containerEl.createEl("h4", { text: "Settings for finding files without tags" });
        new obsidian.Setting(containerEl)
            .setName('Output file name')
            .setDesc('Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.')
            .addText(function (cb) { return cb.onChange(function (value) {
            if (value.length == 0) {
                _this.plugin.settings.withoutTagsOutputFileName = _this.defaultSettings.withoutTagsOutputFileName;
            }
            else {
                _this.plugin.settings.withoutTagsOutputFileName = value;
            }
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.withoutTagsOutputFileName); });
        new obsidian.Setting(containerEl)
            .setName("Exclude files")
            .setDesc("Exclude the specific files. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.withoutTagsFilesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.withoutTagsFilesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Exclude directories")
            .setDesc("Exclude files in the specified directories. Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.withoutTagsDirectoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.withoutTagsDirectoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
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
        return (tags === null || tags === void 0 ? void 0 : tags.find(function (tag) { return _this.tagsToIgnore.contains(tag.substring(1)); })) !== undefined;
    };
    Utils.prototype.hasLinksToIgnore = function () {
        var _this = this;
        var _a, _b;
        if ((((_a = this.fileCache) === null || _a === void 0 ? void 0 : _a.embeds) != null || ((_b = this.fileCache) === null || _b === void 0 ? void 0 : _b.links) != null) && this.linksToIgnore[0] == "*") {
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
        return !this.hasTagsToIgnore() && !this.hasLinksToIgnore() && !this.checkDirectory() && !this.isFileToIgnore();
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
                            if (leaf.getDisplayText() != "" && outputFileName.startsWith(leaf.getDisplayText())) {
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
                        return [4 /*yield*/, app.workspace.getLeavesOfType("empty")[0].openFile(file)];
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
    unresolvedLinksOutputFileName: "broken links output",
    unresolvedLinksDirectoriesToIgnore: [],
    unresolvedLinksFilesToIgnore: [],
    unresolvedLinksFileTypesToIgnore: [],
    unresolvedLinksLinksToIgnore: [],
    unresolvedLinksTagsToIgnore: [],
    withoutTagsDirectoriesToIgnore: [],
    withoutTagsFilesToIgnore: [],
    withoutTagsOutputFileName: "files without tags",
    openOutputFile: true,
};
var FindOrphanedFilesPlugin = /** @class */ (function (_super) {
    __extends(FindOrphanedFilesPlugin, _super);
    function FindOrphanedFilesPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindOrphanedFilesPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading ' + this.manifest.name + " plugin");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addCommand({
                            id: 'find-unlinked-files',
                            name: 'Find orphaned files',
                            callback: function () { return _this.findOrphanedFiles(); },
                        });
                        this.addCommand({
                            id: 'find-unresolved-link',
                            name: 'Find broken links',
                            callback: function () { return _this.findBrokenLinks(); },
                        });
                        this.addCommand({
                            id: "delete-unlinked-files",
                            name: "Delete orphaned files with certain extension. See README",
                            callback: function () { return _this.deleteOrphanedFiles(); }
                        });
                        this.addCommand({
                            id: "find-files-without-tags",
                            name: "Find files without tags",
                            callback: function () { return _this.findFilesWithoutTags(); }
                        });
                        this.addSettingTab(new SettingsTab(this.app, this, DEFAULT_SETTINGS));
                        this.app.workspace.on("file-menu", function (menu, file, source, leaf) {
                            if (file instanceof obsidian.TFolder) {
                                menu.addItem(function (cb) {
                                    cb.setIcon("search");
                                    cb.setTitle("Find orphaned files");
                                    // Add trailing slash to catch files named like the directory. See https://github.com/Vinzent03/find-unlinked-files/issues/24
                                    cb.onClick(function (e) { _this.findOrphanedFiles(file.path + "/"); });
                                });
                            }
                        });
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
        var notLinkedFiles = files.filter(function (file) { return _this.isValid(file, links, dir); });
        notLinkedFiles.remove(outFile);
        var text = "";
        var prefix;
        if (this.settings.disableWorkingLinks)
            prefix = "	";
        else
            prefix = "";
        notLinkedFiles.forEach(function (file) {
            text += prefix + "- [[" + _this.app.metadataCache.fileToLinktext(file, "/", false) + "]]\n";
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
                        console.log(this.settings.fileTypesToDelete);
                        links.forEach(function (link) {
                            var file = _this.app.metadataCache.getFirstLinkpathDest(link.link, "/");
                            if (!file)
                                return;
                            if (_this.settings.fileTypesToDelete[0] == "*" || _this.settings.fileTypesToDelete.contains(file.extension)) {
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
    FindOrphanedFilesPlugin.prototype.findBrokenLinks = function () {
        var outFileName = this.settings.unresolvedLinksOutputFileName + ".md";
        var links = [];
        var brokenLinks = this.app.metadataCache.unresolvedLinks;
        for (var filePath in brokenLinks) {
            if (filePath == this.settings.unresolvedLinksOutputFileName + ".md")
                continue;
            var fileType = filePath.substring(filePath.lastIndexOf(".") + 1);
            var utils = new Utils(this.app, filePath, this.settings.unresolvedLinksTagsToIgnore, this.settings.unresolvedLinksLinksToIgnore, this.settings.unresolvedLinksDirectoriesToIgnore, this.settings.unresolvedLinksFilesToIgnore);
            if (!utils.isValid())
                continue;
            var _loop_1 = function (link) {
                var linkFileType = link.substring(link.lastIndexOf(".") + 1);
                console.log(linkFileType);
                if (this_1.settings.unresolvedLinksFileTypesToIgnore.contains(linkFileType))
                    return "continue";
                var formattedFilePath = filePath;
                if (fileType == "md") {
                    formattedFilePath = filePath.substring(0, filePath.lastIndexOf(".md"));
                }
                var brokenLink = { files: [formattedFilePath], link: link };
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
            for (var link in brokenLinks[filePath]) {
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
                return ((_a = obsidian.getAllTags(_this.app.metadataCache.getFileCache(file)).length) !== null && _a !== void 0 ? _a : 0) <= 0;
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
        var text = withoutFiles.map(function (file) { return prefix + "- [[" + file.path + "]]"; }).join("\n");
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
        console.log('unloading ' + this.manifest.name + " plugin");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9kZWxldGVGaWxlc01vZGFsLnRzIiwic3JjL3NldHRpbmdzVGFiLnRzIiwic3JjL3V0aWxzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsImltcG9ydCB7IEFwcCwgTW9kYWwsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlRmlsZXNNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0ZmlsZXNUb0RlbGV0ZTogVEZpbGVbXTtcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGZpbGVzVG9EZWxldGU6IFRGaWxlW10pIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuZmlsZXNUb0RlbGV0ZSA9IGZpbGVzVG9EZWxldGU7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHsgY29udGVudEVsLCB0aXRsZUVsIH0gPSB0aGlzO1xuXHRcdHRpdGxlRWwuc2V0VGV4dCgnTW92ZSAnICsgdGhpcy5maWxlc1RvRGVsZXRlLmxlbmd0aCArICcgZmlsZXMgdG8gc3lzdGVtIHRyYXNoPycpO1xuXHRcdGNvbnRlbnRFbFxuXHRcdFx0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJDYW5jZWxcIiB9KVxuXHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXHRcdGNvbnRlbnRFbFxuXHRcdFx0LnNldEF0dHIoXCJtYXJnaW5cIiwgXCJhdXRvXCIpO1xuXG5cdFx0Y29udGVudEVsXG5cdFx0XHQuY3JlYXRlRWwoXCJidXR0b25cIixcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNsczogXCJtb2QtY3RhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCJDb25maXJtXCJcblx0XHRcdFx0fSlcblx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlc1RvRGVsZXRlKSB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQudHJhc2goZmlsZSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0bGV0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBBcHAsIG5vcm1hbGl6ZVBhdGgsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgRmluZE9ycGhhbmVkRmlsZXNQbHVnaW4sIHsgU2V0dGluZ3MgfSBmcm9tICcuL21haW4nO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IEZpbmRPcnBoYW5lZEZpbGVzUGx1Z2luO1xuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEZpbmRPcnBoYW5lZEZpbGVzUGx1Z2luLCBwcml2YXRlIGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhaWxpbmcgc2xhc2ggdG8gY2F0Y2ggZmlsZXMgbmFtZWQgbGlrZSB0aGUgZGlyZWN0b3J5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ZpbnplbnQwMy9maW5kLXVubGlua2VkLWZpbGVzL2lzc3Vlcy8yNFxuICAgIGZvcm1hdFBhdGgocGF0aDogc3RyaW5nLCBhZGREaXJlY3RvcnlTbGFzaDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIHBhdGggPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgICAgICBpZiAoYWRkRGlyZWN0b3J5U2xhc2gpXG4gICAgICAgICAgICByZXR1cm4gcGF0aCArIFwiL1wiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHRoaXMucGx1Z2luLm1hbmlmZXN0Lm5hbWUgfSk7XG5cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNFwiLCB7IHRleHQ6IFwiU2V0dGluZ3MgZm9yIGZpbmRpbmcgb3JwaGFuZWQgZmlsZXNcIiB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiT3BlbiBvdXRwdXQgZmlsZVwiKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PlxuICAgICAgICAgICAgICAgIGNiLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5PdXRwdXRGaWxlKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3Blbk91dHB1dEZpbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnT3V0cHV0IGZpbGUgbmFtZScpXG4gICAgICAgICAgICAuc2V0RGVzYygnU2V0IG5hbWUgb2Ygb3V0cHV0IGZpbGUgKHdpdGhvdXQgZmlsZSBleHRlbnNpb24pLiBNYWtlIHN1cmUgbm8gZmlsZSBleGlzdHMgd2l0aCB0aGlzIG5hbWUgYmVjYXVzZSBpdCB3aWxsIGJlIG92ZXJ3cml0dGVuISBJZiB0aGUgbmFtZSBpcyBlbXB0eSwgdGhlIGRlZmF1bHQgbmFtZSBpcyBzZXQuJylcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5vdXRwdXRGaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRGlzYWJsZSB3b3JraW5nIGxpbmtzJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdJbmRlbnQgbGluZXMgdG8gZGlzYWJsZSB0aGUgbGluayBhbmQgdG8gY2xlYW4gdXAgdGhlIGdyYXBoIHZpZXcnKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlV29ya2luZ0xpbmtzKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkV4Y2x1ZGUgZmlsZXMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkVuYWJsZSB0byBleGNsdWRlIGZpbGVzIGluIHRoZSBnaXZlbiBkaXJlY3Rvcmllcy4gRGlzYWJsZSB0byBvbmx5IGluY2x1ZGUgZmlsZXMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+XG4gICAgICAgICAgICAgICAgY2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRGlyZWN0b3JpZXMpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVEaXJlY3RvcmllcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRGlyZWN0b3JpZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkV4Y2x1ZGUgZmlsZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZXNUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBsaW5rc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJFeGNsdWRlIGZpbGVzLCB3aGljaCBjb250YWluIHRoZSBnaXZlbiBmaWxlIGFzIGxpbmsuIEFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISkuIFNldCBpdCB0byBgKmAgdG8gZXhjbHVkZSBmaWxlcyB3aXRoIGxpbmtzLlwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGlua3NUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpbmtzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBmaWxldHlwZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiRW5hYmxlIHRvIGV4Y2x1ZGUgZmlsZXMgd2l0aCB0aGUgZ2l2ZW4gZmlsZXR5cGVzLiBEaXNhYmxlIHRvIG9ubHkgaW5jbHVkZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBmaWxldHlwZXNcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT5cbiAgICAgICAgICAgICAgICBjYi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVGaWxlVHlwZXMpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVGaWxlVHlwZXMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxlIHR5cGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkVmZmVjdCBkZXBlbmRzIG9uIHRvZ2dsZSBhYm92ZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZG9jeCx0eHRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvSWdub3JlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRXhjbHVkZSB0YWdzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIHRhZy4gQWRkIGVhY2ggdGFnIHNlcGFyYXRlZCBieSBjb21tYSAod2l0aG91dCBgI2ApXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJ0b2RvLHVuZmluaXNoZWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGFnc1RvSWdub3JlLmpvaW4oXCIsXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ3MgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50YWdzVG9JZ25vcmUgPSB0YWdzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxldHlwZXMgdG8gZGVsZXRlIHBlciBjb21tYW5kLiBTZWUgUkVBRE1FLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJBZGQgZWFjaCBmaWxldHlwZSBzZXBhcmF0ZWQgYnkgY29tbWEuIFNldCB0byBgKmAgdG8gZGVsZXRlIGFsbCBmaWxlcy5cIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImpwZyxwbmdcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgLy8vIFNldHRpbmdzIGZvciBmaW5kIGJyb2tlbkxpbmtzXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIlNldHRpbmdzIGZvciBmaW5kaW5nIGJyb2tlbiBsaW5rc1wiIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ091dHB1dCBmaWxlIG5hbWUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1NldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LicpXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgbGlua3MgaW4gZmlsZXMgaW4gdGhlIHNwZWNpZmllZCBkaXJlY3RvcnkuIEFkZCBlYWNoIGRpcmVjdG9yeSBwYXRoIGluIGEgbmV3IGxpbmVcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkRpcmVjdG9yeS9TdWJkaXJlY3RvcnlcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgbGlua3MgaW4gdGhlIHNwZWNpZmllZCBmaWxlLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGxpbmtzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIGZpbGUgYXMgbGluay4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKS4gU2V0IGl0IHRvIGAqYCB0byBleGNsdWRlIGZpbGVzIHdpdGggbGlua3MuXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGV0eXBlc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJFeGNsdWRlIGxpbmtzIHdpdGggdGhlIHNwZWNpZmllZCBmaWxldHlwZS4gQWRkIGVhY2ggZmlsZXR5cGUgc2VwYXJhdGVkIGJ5IGNvbW1hXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJkb2N4LHR4dFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZS5qb2luKFwiLFwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmUgPSBleHRlbnNpb25zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIHRhZ3NcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiRXhjbHVkZSBsaW5rcyBpbiBmaWxlcywgd2hpY2ggY29udGFpbiB0aGUgZ2l2ZW4gdGFnLiBBZGQgZWFjaCB0YWcgc2VwYXJhdGVkIGJ5IGNvbW1hICh3aXRob3V0IGAjYClcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcInRvZG8sdW5maW5pc2hlZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NUYWdzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZSA9IHRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogXCJTZXR0aW5ncyBmb3IgZmluZGluZyBmaWxlcyB3aXRob3V0IHRhZ3NcIiB9KTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdPdXRwdXQgZmlsZSBuYW1lJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdTZXQgbmFtZSBvZiBvdXRwdXQgZmlsZSAod2l0aG91dCBmaWxlIGV4dGVuc2lvbikuIE1ha2Ugc3VyZSBubyBmaWxlIGV4aXN0cyB3aXRoIHRoaXMgbmFtZSBiZWNhdXNlIGl0IHdpbGwgYmUgb3ZlcndyaXR0ZW4hIElmIHRoZSBuYW1lIGlzIGVtcHR5LCB0aGUgZGVmYXVsdCBuYW1lIGlzIHNldC4nKVxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc091dHB1dEZpbGVOYW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mud2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc091dHB1dEZpbGVOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfSkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mud2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGZpbGVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgdGhlIHNwZWNpZmljIGZpbGVzLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJFeGNsdWRlIGRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkV4Y2x1ZGUgZmlsZXMgaW4gdGhlIHNwZWNpZmllZCBkaXJlY3Rvcmllcy4gQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzRGlyZWN0b3JpZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQXBwLCBDYWNoZWRNZXRhZGF0YSwgZ2V0QWxsVGFncywgaXRlcmF0ZUNhY2hlUmVmcywgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcbiAgICBwcml2YXRlIGZpbGVDYWNoZTogQ2FjaGVkTWV0YWRhdGE7XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgZm9yIHRoZSBnaXZlbiBzZXR0aW5ncy4gSXMgdXNlZCBmb3IgYEZpbmQgb3JwaGFuZWQgZmlsZXNgIGFuZCBgRmluZCBicm9rZW4gbGlua3NgXG4gICAgICogQHBhcmFtIGFwcCBcbiAgICAgKiBAcGFyYW0gZmlsZVBhdGggXG4gICAgICogQHBhcmFtIHRhZ3NUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gbGlua3NUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gZGlyZWN0b3JpZXNUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gZmlsZXNUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gaWdub3JlRGlyZWN0b3JpZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICAgICAgcHJpdmF0ZSBmaWxlUGF0aDogc3RyaW5nLFxuICAgICAgICBwcml2YXRlIHRhZ3NUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgbGlua3NUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgZGlyZWN0b3JpZXNUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgZmlsZXNUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgaWdub3JlRGlyZWN0b3JpZXM6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBwcml2YXRlIGRpcj86IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5maWxlQ2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNUYWdzVG9JZ25vcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBnZXRBbGxUYWdzKHRoaXMuZmlsZUNhY2hlKTtcbiAgICAgICAgcmV0dXJuIHRhZ3M/LmZpbmQoKHRhZykgPT4gdGhpcy50YWdzVG9JZ25vcmUuY29udGFpbnModGFnLnN1YnN0cmluZygxKSkpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHByaXZhdGUgaGFzTGlua3NUb0lnbm9yZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCh0aGlzLmZpbGVDYWNoZT8uZW1iZWRzICE9IG51bGwgfHwgdGhpcy5maWxlQ2FjaGU/LmxpbmtzICE9IG51bGwpICYmIHRoaXMubGlua3NUb0lnbm9yZVswXSA9PSBcIipcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlcmF0ZUNhY2hlUmVmcyh0aGlzLmZpbGVDYWNoZSwgY2IgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoY2IubGluaywgdGhpcy5maWxlUGF0aCk/LnBhdGg7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW5rc1RvSWdub3JlLmNvbnRhaW5zKGxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGlyZWN0b3J5KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlUGF0aC5zdGFydHNXaXRoKHRoaXMuZGlyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFpbnMgPSB0aGlzLmRpcmVjdG9yaWVzVG9JZ25vcmUuZmluZCgodmFsdWUpID0+IHZhbHVlLmxlbmd0aCAhPSAwICYmIHRoaXMuZmlsZVBhdGguc3RhcnRzV2l0aCh2YWx1ZSkpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZURpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnRhaW5zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ZpbGVUb0lnbm9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXNUb0lnbm9yZS5jb250YWlucyh0aGlzLmZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmhhc1RhZ3NUb0lnbm9yZSgpICYmICF0aGlzLmhhc0xpbmtzVG9JZ25vcmUoKSAmJiAhdGhpcy5jaGVja0RpcmVjdG9yeSgpICYmICF0aGlzLmlzRmlsZVRvSWdub3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIHRoZSB0ZXh0IHRvIHRoZSBmaWxlIGFuZCBvcGVucyB0aGUgZmlsZSBpbiBhIG5ldyBwYW5lIGlmIGl0IGlzIG5vdCBvcGVuZWQgeWV0XG4gICAgICogQHBhcmFtIGFwcCBcbiAgICAgKiBAcGFyYW0gb3V0cHV0RmlsZU5hbWUgbmFtZSBvZiB0aGUgb3V0cHV0IGZpbGVcbiAgICAgKiBAcGFyYW0gdGV4dCBkYXRhIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIGZpbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgd3JpdGVBbmRPcGVuRmlsZShhcHA6IEFwcCwgb3V0cHV0RmlsZU5hbWU6IHN0cmluZywgdGV4dDogc3RyaW5nLCBvcGVuRmlsZTogYm9vbGVhbikge1xuICAgICAgICBhd2FpdCBhcHAudmF1bHQuYWRhcHRlci53cml0ZShvdXRwdXRGaWxlTmFtZSwgdGV4dCk7XG4gICAgICAgIGlmICghb3BlbkZpbGUpIHJldHVybjtcblxuICAgICAgICBsZXQgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICBhcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi5nZXREaXNwbGF5VGV4dCgpICE9IFwiXCIgJiYgb3V0cHV0RmlsZU5hbWUuc3RhcnRzV2l0aChsZWFmLmdldERpc3BsYXlUZXh0KCkpKSB7XG4gICAgICAgICAgICAgICAgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZpbGVJc0FscmVhZHlPcGVuZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1BhbmUgPSBhcHAud29ya3NwYWNlLmdldExlYXZlc09mVHlwZShcImVtcHR5XCIpLmxlbmd0aCA9PSAwO1xuICAgICAgICAgICAgaWYgKG5ld1BhbmUpIHtcbiAgICAgICAgICAgICAgICBhcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChvdXRwdXRGaWxlTmFtZSwgXCIvXCIsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChvdXRwdXRGaWxlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKFwiZW1wdHlcIilbMF0ub3BlbkZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLndvcmtzcGFjZS5vcGVuTGlua1RleHQob3V0cHV0RmlsZU5hbWUsIFwiL1wiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnZXRBbGxUYWdzLCBnZXRMaW5rcGF0aCwgaXRlcmF0ZUNhY2hlUmVmcywgTm90aWNlLCBQbHVnaW4sIFRGaWxlLCBURm9sZGVyIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBEZWxldGVGaWxlc01vZGFsIH0gZnJvbSAnLi9kZWxldGVGaWxlc01vZGFsJztcclxuaW1wb3J0IHsgU2V0dGluZ3NUYWIgfSBmcm9tICcuL3NldHRpbmdzVGFiJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG5cdG91dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcblx0ZGlzYWJsZVdvcmtpbmdMaW5rczogYm9vbGVhbjtcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogc3RyaW5nW107XHJcblx0bGlua3NUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dGFnc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogc3RyaW5nW107XHJcblx0aWdub3JlRmlsZVR5cGVzOiBib29sZWFuO1xyXG5cdGlnbm9yZURpcmVjdG9yaWVzOiBib29sZWFuO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0ZpbGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0ZpbGVUeXBlc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR1bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR1bnJlc29sdmVkTGlua3NUYWdzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcblx0d2l0aG91dFRhZ3NEaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR3aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHdpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWU6IHN0cmluZztcclxuXHRvcGVuT3V0cHV0RmlsZTogYm9vbGVhbjtcclxufVxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuXHRvdXRwdXRGaWxlTmFtZTogXCJvcnBoYW5lZCBmaWxlcyBvdXRwdXRcIixcclxuXHRkaXNhYmxlV29ya2luZ0xpbmtzOiBmYWxzZSxcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcblx0bGlua3NUb0lnbm9yZTogW10sXHJcblx0dGFnc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogW10sXHJcblx0aWdub3JlRmlsZVR5cGVzOiB0cnVlLFxyXG5cdGlnbm9yZURpcmVjdG9yaWVzOiB0cnVlLFxyXG5cdHVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lOiBcImJyb2tlbiBsaW5rcyBvdXRwdXRcIixcclxuXHR1bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHR1bnJlc29sdmVkTGlua3NGaWxlc1RvSWdub3JlOiBbXSxcclxuXHR1bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzVGFnc1RvSWdub3JlOiBbXSxcclxuXHR3aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmU6IFtdLFxyXG5cdHdpdGhvdXRUYWdzRmlsZXNUb0lnbm9yZTogW10sXHJcblx0d2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZTogXCJmaWxlcyB3aXRob3V0IHRhZ3NcIixcclxuXHRvcGVuT3V0cHV0RmlsZTogdHJ1ZSxcclxufTtcclxuXHJcbmludGVyZmFjZSBCcm9rZW5MaW5rIHtcclxuXHRsaW5rOiBzdHJpbmc7XHJcblx0ZmlsZXM6IHN0cmluZ1tdO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbmRPcnBoYW5lZEZpbGVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRzZXR0aW5nczogU2V0dGluZ3M7XHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ2xvYWRpbmcgJyArIHRoaXMubWFuaWZlc3QubmFtZSArIFwiIHBsdWdpblwiKTtcclxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2ZpbmQtdW5saW5rZWQtZmlsZXMnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCBvcnBoYW5lZCBmaWxlcycsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmZpbmRPcnBoYW5lZEZpbGVzKCksXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnZmluZC11bnJlc29sdmVkLWxpbmsnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCBicm9rZW4gbGlua3MnLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5maW5kQnJva2VuTGlua3MoKSxcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6IFwiZGVsZXRlLXVubGlua2VkLWZpbGVzXCIsXHJcblx0XHRcdG5hbWU6IFwiRGVsZXRlIG9ycGhhbmVkIGZpbGVzIHdpdGggY2VydGFpbiBleHRlbnNpb24uIFNlZSBSRUFETUVcIixcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZGVsZXRlT3JwaGFuZWRGaWxlcygpXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiBcImZpbmQtZmlsZXMtd2l0aG91dC10YWdzXCIsXHJcblx0XHRcdG5hbWU6IFwiRmluZCBmaWxlcyB3aXRob3V0IHRhZ3NcIixcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZmluZEZpbGVzV2l0aG91dFRhZ3MoKVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzLCBERUZBVUxUX1NFVFRJTkdTKSk7XHJcblxyXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uKFwiZmlsZS1tZW51XCIsIChtZW51LCBmaWxlLCBzb3VyY2UsIGxlYWYpID0+IHtcclxuXHRcdFx0aWYgKGZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSB7XHJcblx0XHRcdFx0bWVudS5hZGRJdGVtKGNiID0+IHtcclxuXHRcdFx0XHRcdGNiLnNldEljb24oXCJzZWFyY2hcIik7XHJcblx0XHRcdFx0XHRjYi5zZXRUaXRsZShcIkZpbmQgb3JwaGFuZWQgZmlsZXNcIik7XHJcblx0XHRcdFx0XHQvLyBBZGQgdHJhaWxpbmcgc2xhc2ggdG8gY2F0Y2ggZmlsZXMgbmFtZWQgbGlrZSB0aGUgZGlyZWN0b3J5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ZpbnplbnQwMy9maW5kLXVubGlua2VkLWZpbGVzL2lzc3Vlcy8yNFxyXG5cdFx0XHRcdFx0Y2Iub25DbGljaygoZSkgPT4geyB0aGlzLmZpbmRPcnBoYW5lZEZpbGVzKGZpbGUucGF0aCArIFwiL1wiKTsgfSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZmluZE9ycGhhbmVkRmlsZXMoZGlyPzogc3RyaW5nKSB7XHJcblx0XHRjb25zdCBvdXRGaWxlTmFtZSA9IHRoaXMuc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiO1xyXG5cdFx0bGV0IG91dEZpbGU6IFRGaWxlO1xyXG5cdFx0Y29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpO1xyXG5cdFx0Y29uc3QgbWFya2Rvd25GaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHRcdGxldCBsaW5rczogc3RyaW5nW10gPSBbXTtcclxuXHJcblx0XHRtYXJrZG93bkZpbGVzLmZvckVhY2goKG1hcmtGaWxlOiBURmlsZSkgPT4ge1xyXG5cdFx0XHRpZiAobWFya0ZpbGUucGF0aCA9PSBvdXRGaWxlTmFtZSkge1xyXG5cdFx0XHRcdG91dEZpbGUgPSBtYXJrRmlsZTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0aXRlcmF0ZUNhY2hlUmVmcyh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShtYXJrRmlsZSksIGNiID0+IHtcclxuXHRcdFx0XHRsZXQgdHh0ID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChnZXRMaW5rcGF0aChjYi5saW5rKSwgbWFya0ZpbGUucGF0aCk7XHJcblx0XHRcdFx0aWYgKHR4dCAhPSBudWxsKVxyXG5cdFx0XHRcdFx0bGlua3MucHVzaCh0eHQucGF0aCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBub3RMaW5rZWRGaWxlcyA9IGZpbGVzLmZpbHRlcigoZmlsZSkgPT4gdGhpcy5pc1ZhbGlkKGZpbGUsIGxpbmtzLCBkaXIpKTtcclxuXHRcdG5vdExpbmtlZEZpbGVzLnJlbW92ZShvdXRGaWxlKTtcclxuXHJcblxyXG5cdFx0bGV0IHRleHQgPSBcIlwiO1xyXG5cdFx0bGV0IHByZWZpeDogc3RyaW5nO1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcylcclxuXHRcdFx0cHJlZml4ID0gXCJcdFwiO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRwcmVmaXggPSBcIlwiO1xyXG5cdFx0bm90TGlua2VkRmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG5cdFx0XHR0ZXh0ICs9IHByZWZpeCArIFwiLSBbW1wiICsgdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChmaWxlLCBcIi9cIiwgZmFsc2UpICsgXCJdXVxcblwiO1xyXG5cdFx0fSk7XHJcblx0XHRVdGlscy53cml0ZUFuZE9wZW5GaWxlKHRoaXMuYXBwLCBvdXRGaWxlTmFtZSwgdGV4dCwgdGhpcy5zZXR0aW5ncy5vcGVuT3V0cHV0RmlsZSk7XHJcblxyXG5cdH1cclxuXHRhc3luYyBkZWxldGVPcnBoYW5lZEZpbGVzKCkge1xyXG5cdFx0aWYgKCFhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLmV4aXN0cyh0aGlzLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lICsgXCIubWRcIikpIHtcclxuXHRcdFx0bmV3IE5vdGljZShcIkNhbid0IGZpbmQgZmlsZSAtIFBsZWFzZSBydW4gdGhlIGBGaW5kIG9ycGhhbmVkIGZpbGVzJyBjb21tYW5kIGJlZm9yZVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgbGlua3MgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKHRoaXMuc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiKT8ubGlua3MgPz8gW107XHJcblx0XHRjb25zdCBmaWxlc1RvRGVsZXRlOiBURmlsZVtdID0gW107XHJcblx0XHRjb25zb2xlLmxvZyh0aGlzLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlKTtcclxuXHRcdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuXHRcdFx0Y29uc3QgZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QobGluay5saW5rLCBcIi9cIik7XHJcblx0XHRcdGlmICghZmlsZSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWxlVHlwZXNUb0RlbGV0ZVswXSA9PSBcIipcIiB8fCB0aGlzLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlLmNvbnRhaW5zKGZpbGUuZXh0ZW5zaW9uKSkge1xyXG5cdFx0XHRcdGZpbGVzVG9EZWxldGUucHVzaChmaWxlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoZmlsZXNUb0RlbGV0ZS5sZW5ndGggPiAwKVxyXG5cdFx0XHRuZXcgRGVsZXRlRmlsZXNNb2RhbCh0aGlzLmFwcCwgZmlsZXNUb0RlbGV0ZSkub3BlbigpO1xyXG5cdH1cclxuXHRmaW5kQnJva2VuTGlua3MoKSB7XHJcblx0XHRjb25zdCBvdXRGaWxlTmFtZSA9IHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiO1xyXG5cdFx0Y29uc3QgbGlua3M6IEJyb2tlbkxpbmtbXSA9IFtdO1xyXG5cdFx0Y29uc3QgYnJva2VuTGlua3MgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLnVucmVzb2x2ZWRMaW5rcztcclxuXHJcblx0XHRmb3IgKGxldCBmaWxlUGF0aCBpbiBicm9rZW5MaW5rcykge1xyXG5cdFx0XHRpZiAoZmlsZVBhdGggPT0gdGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSArIFwiLm1kXCIpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0Y29uc3QgZmlsZVR5cGUgPSBmaWxlUGF0aC5zdWJzdHJpbmcoZmlsZVBhdGgubGFzdEluZGV4T2YoXCIuXCIpICsgMSk7XHJcblxyXG5cdFx0XHRjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuXHRcdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0XHRmaWxlUGF0aCxcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZSxcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmUsXHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlLFxyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoIXV0aWxzLmlzVmFsaWQoKSkgY29udGludWU7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGxpbmsgaW4gYnJva2VuTGlua3NbZmlsZVBhdGhdKSB7XHJcblx0XHRcdFx0Y29uc3QgbGlua0ZpbGVUeXBlID0gbGluay5zdWJzdHJpbmcobGluay5sYXN0SW5kZXhPZihcIi5cIikgKyAxKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhsaW5rRmlsZVR5cGUpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZS5jb250YWlucyhsaW5rRmlsZVR5cGUpKSBjb250aW51ZTtcclxuXHJcblx0XHRcdFx0bGV0IGZvcm1hdHRlZEZpbGVQYXRoID0gZmlsZVBhdGg7XHJcblx0XHRcdFx0aWYgKGZpbGVUeXBlID09IFwibWRcIikge1xyXG5cdFx0XHRcdFx0Zm9ybWF0dGVkRmlsZVBhdGggPSBmaWxlUGF0aC5zdWJzdHJpbmcoMCwgZmlsZVBhdGgubGFzdEluZGV4T2YoXCIubWRcIikpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zdCBicm9rZW5MaW5rOiBCcm9rZW5MaW5rID0geyBmaWxlczogW2Zvcm1hdHRlZEZpbGVQYXRoXSwgbGluazogbGluayB9O1xyXG5cdFx0XHRcdGlmIChsaW5rcy5jb250YWlucyhicm9rZW5MaW5rKSlcclxuXHRcdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHRcdGNvbnN0IGR1cGxpY2F0aW9uID0gbGlua3MuZmluZCgoZSkgPT4gZS5saW5rID09IGxpbmspO1xyXG5cdFx0XHRcdGlmIChkdXBsaWNhdGlvbikge1xyXG5cdFx0XHRcdFx0ZHVwbGljYXRpb24uZmlsZXMucHVzaChmb3JtYXR0ZWRGaWxlUGF0aCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxpbmtzLnB1c2goYnJva2VuTGluayk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRVdGlscy53cml0ZUFuZE9wZW5GaWxlKFxyXG5cdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0b3V0RmlsZU5hbWUsXHJcblx0XHRcdFtcclxuXHRcdFx0XHRcIkRvbid0IGZvcmdldCB0aGF0IGNyZWF0aW5nIHRoZSBmaWxlIGZyb20gaGVyZSBtYXkgY3JlYXRlIHRoZSBmaWxlIGluIHRoZSB3cm9uZyBkaXJlY3RvcnkhXCIsXHJcblx0XHRcdFx0Li4ubGlua3MubWFwKChlKSA9PiBgLSBbWyR7ZS5saW5rfV1dIGluIFtbJHtlLmZpbGVzLmpvaW4oXCJdXSwgW1tcIil9XV1gKVxyXG5cdFx0XHRdLmpvaW4oXCJcXG5cIiksXHJcblx0XHRcdHRoaXMuc2V0dGluZ3Mub3Blbk91dHB1dEZpbGUpO1xyXG5cclxuXHR9XHJcblxyXG5cdGZpbmRGaWxlc1dpdGhvdXRUYWdzKCkge1xyXG5cdFx0Y29uc3Qgb3V0RmlsZU5hbWUgPSB0aGlzLnNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiO1xyXG5cdFx0bGV0IG91dEZpbGU6IFRGaWxlO1xyXG5cdFx0Y29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCk7XHJcblx0XHRsZXQgd2l0aG91dEZpbGVzID0gZmlsZXMuZmlsdGVyKChmaWxlKSA9PiB7XHJcblx0XHRcdGlmIChuZXcgVXRpbHModGhpcy5hcHAsIGZpbGUucGF0aCwgW10sIFtdLCB0aGlzLnNldHRpbmdzLndpdGhvdXRUYWdzRGlyZWN0b3JpZXNUb0lnbm9yZSwgdGhpcy5zZXR0aW5ncy53aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmUsIHRydWUpLmlzVmFsaWQoKSkge1xyXG5cdFx0XHRcdHJldHVybiAoZ2V0QWxsVGFncyh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKSkubGVuZ3RoID8/IDApIDw9IDA7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHR3aXRob3V0RmlsZXMucmVtb3ZlKG91dEZpbGUpO1xyXG5cclxuXHJcblx0XHRsZXQgcHJlZml4OiBzdHJpbmc7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5kaXNhYmxlV29ya2luZ0xpbmtzKVxyXG5cdFx0XHRwcmVmaXggPSBcIlx0XCI7XHJcblx0XHRlbHNlXHJcblx0XHRcdHByZWZpeCA9IFwiXCI7XHJcblx0XHRjb25zdCB0ZXh0ID0gd2l0aG91dEZpbGVzLm1hcCgoZmlsZSkgPT4gYCR7cHJlZml4fS0gW1ske2ZpbGUucGF0aH1dXWApLmpvaW4oXCJcXG5cIik7XHJcblx0XHRVdGlscy53cml0ZUFuZE9wZW5GaWxlKHRoaXMuYXBwLCBvdXRGaWxlTmFtZSwgdGV4dCwgdGhpcy5zZXR0aW5ncy5vcGVuT3V0cHV0RmlsZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdpdmVuIGZpbGUgaW4gYW4gb3JwaGFuZWQgZmlsZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSBmaWxlIGZpbGUgdG8gY2hlY2tcclxuXHQgKiBAcGFyYW0gbGlua3MgYWxsIGxpbmtzIGluIHRoZSB2YXVsdFxyXG5cdCAqL1xyXG5cdGlzVmFsaWQoZmlsZTogVEZpbGUsIGxpbmtzOiBzdHJpbmdbXSwgZGlyOiBzdHJpbmcpOiBib29sZWFuIHtcclxuXHRcdGlmIChsaW5rcy5jb250YWlucyhmaWxlLnBhdGgpKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0Ly9maWxldHlwZXMgdG8gaWdub3JlIGJ5IGRlZmF1bHRcclxuXHRcdGlmIChmaWxlLmV4dGVuc2lvbiA9PSBcImNzc1wiKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9JZ25vcmVbMF0gIT09IFwiXCIpIHtcclxuXHRcdFx0Y29uc3QgY29udGFpbnNGaWxlVHlwZSA9IHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9JZ25vcmUuY29udGFpbnMoZmlsZS5leHRlbnNpb24pO1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVGaWxlVHlwZXMpIHtcclxuXHRcdFx0XHRpZiAoY29udGFpbnNGaWxlVHlwZSkgcmV0dXJuO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGlmICghY29udGFpbnNGaWxlVHlwZSkgcmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3QgdXRpbHMgPSBuZXcgVXRpbHMoXHJcblx0XHRcdHRoaXMuYXBwLFxyXG5cdFx0XHRmaWxlLnBhdGgsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MudGFnc1RvSWdub3JlLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmxpbmtzVG9JZ25vcmUsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuZGlyZWN0b3JpZXNUb0lnbm9yZSxcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5maWxlc1RvSWdub3JlLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmlnbm9yZURpcmVjdG9yaWVzLFxyXG5cdFx0XHRkaXJcclxuXHRcdCk7XHJcblx0XHRpZiAoIXV0aWxzLmlzVmFsaWQoKSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCd1bmxvYWRpbmcgJyArIHRoaXMubWFuaWZlc3QubmFtZSArIFwiIHBsdWdpblwiKTtcclxuXHR9XHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcclxuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcblx0fVxyXG59XHJcbiJdLCJuYW1lcyI6WyJNb2RhbCIsIm5vcm1hbGl6ZVBhdGgiLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsImdldEFsbFRhZ3MiLCJpdGVyYXRlQ2FjaGVSZWZzIiwiVEZpbGUiLCJURm9sZGVyIiwiZ2V0TGlua3BhdGgiLCJOb3RpY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENB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
