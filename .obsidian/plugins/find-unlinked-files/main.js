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
        containerEl.createEl("h4", { text: "Settings for find unlinked files" });
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
            .setName("Ignore or include files in the given directories")
            .setDesc("Enable to ignore files in the given directories. Disable to only include files in the given directories")
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
            .setName("Files to ignore.")
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
            .setName("Links to ignore.")
            .setDesc("Ignore files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to ignore files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.linksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.linksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Ignore or include files with the given filetypes")
            .setDesc("Enable to ignore files with the given filetypes. Disable to only include files with the given filetypes")
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
            .setName("Tags to ignore.")
            .setDesc("Ignore files, which contain the given tag. Add each tag separated by comma (without `#`)")
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
        /// Settings for find unresolvedLinks
        containerEl.createEl("h4", { text: "Settings for find unresolved links" });
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
            .setName("Directories to ignore.")
            .setDesc("Ignore links in files in the specified directory. Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.unresolvedLinksDirectoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.unresolvedLinksDirectoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Files to ignore.")
            .setDesc("Ignore links in the specified file. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksFilesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksFilesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Links to ignore.")
            .setDesc("Ignore files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to ignore files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksLinksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksLinksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Filetypes to ignore.")
            .setDesc("Ignore links with the specified filetype. Add each filetype separated by comma")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("docx,txt")
            .setValue(_this.plugin.settings.unresolvedLinksFileTypesToIgnore.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksFileTypesToIgnore = extensions;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Tags to ignore.")
            .setDesc("Ignore links in files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("todo,unfinished")
            .setValue(_this.plugin.settings.unresolvedLinksTagsToIgnore.join(","))
            .onChange(function (value) {
            var tags = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksTagsToIgnore = tags;
            _this.plugin.saveSettings();
        }); });
        containerEl.createEl("h4", { text: "Settings for find files without tags" });
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
            .setName("Files to ignore.")
            .setDesc("Ignore the specific files. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.withoutTagsFilesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.withoutTagsFilesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Directories to ignore.")
            .setDesc("Ignore files in the specified directories. Add each directory path in a new line")
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
     * Checks for the given settings. Is used for `Find unlinked files` and `Find unresolved links`
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
    Utils.writeAndOpenFile = function (app, outputFileName, text) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.vault.adapter.write(outputFileName, text)];
                    case 1:
                        _a.sent();
                        fileIsAlreadyOpened = false;
                        app.workspace.iterateAllLeaves(function (leaf) {
                            if (leaf.getDisplayText() != "" && outputFileName.startsWith(leaf.getDisplayText())) {
                                fileIsAlreadyOpened = true;
                            }
                        });
                        if (!fileIsAlreadyOpened)
                            app.workspace.openLinkText(outputFileName, "/", true);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());

var DEFAULT_SETTINGS = {
    outputFileName: "unlinked files output",
    disableWorkingLinks: false,
    directoriesToIgnore: [],
    filesToIgnore: [],
    fileTypesToIgnore: [],
    linksToIgnore: [],
    tagsToIgnore: [],
    fileTypesToDelete: [],
    ignoreFileTypes: true,
    ignoreDirectories: true,
    unresolvedLinksOutputFileName: "unresolved links output",
    unresolvedLinksDirectoriesToIgnore: [],
    unresolvedLinksFilesToIgnore: [],
    unresolvedLinksFileTypesToIgnore: [],
    unresolvedLinksLinksToIgnore: [],
    unresolvedLinksTagsToIgnore: [],
    withoutTagsDirectoriesToIgnore: [],
    withoutTagsFilesToIgnore: [],
    withoutTagsOutputFileName: "files without tags"
};
var FindUnlinkedFilesPlugin = /** @class */ (function (_super) {
    __extends(FindUnlinkedFilesPlugin, _super);
    function FindUnlinkedFilesPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindUnlinkedFilesPlugin.prototype.onload = function () {
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
                            name: 'Find unlinked files',
                            callback: function () { return _this.findUnlinkedFiles(); },
                        });
                        this.addCommand({
                            id: 'find-unresolved-link',
                            name: 'Find unresolved links',
                            callback: function () { return _this.findUnresolvedLinks(); },
                        });
                        this.addCommand({
                            id: "delete-unlinked-files",
                            name: "Delete unlinked files with certain extension. See README",
                            callback: function () { return _this.deleteUnlinkedFiles(); }
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
                                    cb.setTitle("Find unlinked files");
                                    // Add trailing slash to catch files named like the directory. See https://github.com/Vinzent03/find-unlinked-files/issues/24
                                    cb.onClick(function (e) { _this.findUnlinkedFiles(file.path + "/"); });
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FindUnlinkedFilesPlugin.prototype.findUnlinkedFiles = function (dir) {
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
        Utils.writeAndOpenFile(this.app, outFileName, text);
    };
    FindUnlinkedFilesPlugin.prototype.deleteUnlinkedFiles = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, filesToDelete;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.app.vault.adapter.exists(this.settings.outputFileName + ".md")];
                    case 1:
                        if (!(_c.sent())) {
                            new obsidian.Notice("Can't find file - Please run the `Find unlinked files' command before");
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
    FindUnlinkedFilesPlugin.prototype.findUnresolvedLinks = function () {
        var outFileName = this.settings.unresolvedLinksOutputFileName + ".md";
        var links = [];
        var unresolvedLinks = this.app.metadataCache.unresolvedLinks;
        for (var filePath in unresolvedLinks) {
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
                var unresolvedLink = { files: [formattedFilePath], link: link };
                if (links.contains(unresolvedLink))
                    return "continue";
                var duplication = links.find(function (e) { return e.link == link; });
                if (duplication) {
                    duplication.files.push(formattedFilePath);
                }
                else {
                    links.push(unresolvedLink);
                }
            };
            var this_1 = this;
            for (var link in unresolvedLinks[filePath]) {
                _loop_1(link);
            }
        }
        Utils.writeAndOpenFile(this.app, outFileName, __spreadArrays([
            "Don't forget that creating the file from here may create the file in the wrong directory!"
        ], links.map(function (e) { return "- [[" + e.link + "]] in [[" + e.files.join("]], [[") + "]]"; })).join("\n"));
    };
    FindUnlinkedFilesPlugin.prototype.findFilesWithoutTags = function () {
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
        Utils.writeAndOpenFile(this.app, outFileName, text);
    };
    /**
     * Checks if the given file in an unlinked file
     *
     * @param file file to check
     * @param links all links in the vault
     */
    FindUnlinkedFilesPlugin.prototype.isValid = function (file, links, dir) {
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
    FindUnlinkedFilesPlugin.prototype.onunload = function () {
        console.log('unloading ' + this.manifest.name + " plugin");
    };
    FindUnlinkedFilesPlugin.prototype.loadSettings = function () {
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
    FindUnlinkedFilesPlugin.prototype.saveSettings = function () {
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
    return FindUnlinkedFilesPlugin;
}(obsidian.Plugin));

module.exports = FindUnlinkedFilesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9kZWxldGVGaWxlc01vZGFsLnRzIiwic3JjL3NldHRpbmdzVGFiLnRzIiwic3JjL3V0aWxzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEluKHN0YXRlLCByZWNlaXZlcikge1xyXG4gICAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XHJcbiAgICByZXR1cm4gdHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciA9PT0gc3RhdGUgOiBzdGF0ZS5oYXMocmVjZWl2ZXIpO1xyXG59XHJcbiIsImltcG9ydCB7IEFwcCwgTW9kYWwsIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5leHBvcnQgY2xhc3MgRGVsZXRlRmlsZXNNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0ZmlsZXNUb0RlbGV0ZTogVEZpbGVbXTtcblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIGZpbGVzVG9EZWxldGU6IFRGaWxlW10pIHtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuZmlsZXNUb0RlbGV0ZSA9IGZpbGVzVG9EZWxldGU7XG5cdH1cblxuXHRvbk9wZW4oKSB7XG5cdFx0bGV0IHsgY29udGVudEVsLCB0aXRsZUVsIH0gPSB0aGlzO1xuXHRcdHRpdGxlRWwuc2V0VGV4dCgnTW92ZSAnICsgdGhpcy5maWxlc1RvRGVsZXRlLmxlbmd0aCArICcgZmlsZXMgdG8gc3lzdGVtIHRyYXNoPycpO1xuXHRcdGNvbnRlbnRFbFxuXHRcdFx0LmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHsgdGV4dDogXCJDYW5jZWxcIiB9KVxuXHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmNsb3NlKCkpO1xuXHRcdGNvbnRlbnRFbFxuXHRcdFx0LnNldEF0dHIoXCJtYXJnaW5cIiwgXCJhdXRvXCIpO1xuXG5cdFx0Y29udGVudEVsXG5cdFx0XHQuY3JlYXRlRWwoXCJidXR0b25cIixcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNsczogXCJtb2QtY3RhXCIsXG5cdFx0XHRcdFx0dGV4dDogXCJDb25maXJtXCJcblx0XHRcdFx0fSlcblx0XHRcdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRmb3IgKGNvbnN0IGZpbGUgb2YgdGhpcy5maWxlc1RvRGVsZXRlKSB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5hcHAudmF1bHQudHJhc2goZmlsZSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0bGV0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBBcHAsIG5vcm1hbGl6ZVBhdGgsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5pbXBvcnQgRmluZFVubGlua2VkRmlsZXNQbHVnaW4sIHsgU2V0dGluZ3MgfSBmcm9tICcuL21haW4nO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IEZpbmRVbmxpbmtlZEZpbGVzUGx1Z2luO1xuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEZpbmRVbmxpbmtlZEZpbGVzUGx1Z2luLCBwcml2YXRlIGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdHJhaWxpbmcgc2xhc2ggdG8gY2F0Y2ggZmlsZXMgbmFtZWQgbGlrZSB0aGUgZGlyZWN0b3J5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1ZpbnplbnQwMy9maW5kLXVubGlua2VkLWZpbGVzL2lzc3Vlcy8yNFxuICAgIGZvcm1hdFBhdGgocGF0aDogc3RyaW5nLCBhZGREaXJlY3RvcnlTbGFzaDogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgICAgIHBhdGggPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgICAgICBpZiAoYWRkRGlyZWN0b3J5U2xhc2gpXG4gICAgICAgICAgICByZXR1cm4gcGF0aCArIFwiL1wiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IHRoaXMucGx1Z2luLm1hbmlmZXN0Lm5hbWUgfSk7XG5cbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNFwiLCB7IHRleHQ6IFwiU2V0dGluZ3MgZm9yIGZpbmQgdW5saW5rZWQgZmlsZXNcIiB9KTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnT3V0cHV0IGZpbGUgbmFtZScpXG4gICAgICAgICAgICAuc2V0RGVzYygnU2V0IG5hbWUgb2Ygb3V0cHV0IGZpbGUgKHdpdGhvdXQgZmlsZSBleHRlbnNpb24pLiBNYWtlIHN1cmUgbm8gZmlsZSBleGlzdHMgd2l0aCB0aGlzIG5hbWUgYmVjYXVzZSBpdCB3aWxsIGJlIG92ZXJ3cml0dGVuISBJZiB0aGUgbmFtZSBpcyBlbXB0eSwgdGhlIGRlZmF1bHQgbmFtZSBpcyBzZXQuJylcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy5vdXRwdXRGaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnRGlzYWJsZSB3b3JraW5nIGxpbmtzJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdJbmRlbnQgbGluZXMgdG8gZGlzYWJsZSB0aGUgbGluayBhbmQgdG8gY2xlYW4gdXAgdGhlIGdyYXBoIHZpZXcnKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlV29ya2luZ0xpbmtzKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIklnbm9yZSBvciBpbmNsdWRlIGZpbGVzIGluIHRoZSBnaXZlbiBkaXJlY3Rvcmllc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJFbmFibGUgdG8gaWdub3JlIGZpbGVzIGluIHRoZSBnaXZlbiBkaXJlY3Rvcmllcy4gRGlzYWJsZSB0byBvbmx5IGluY2x1ZGUgZmlsZXMgaW4gdGhlIGdpdmVuIGRpcmVjdG9yaWVzXCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+XG4gICAgICAgICAgICAgICAgY2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRGlyZWN0b3JpZXMpXG4gICAgICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVEaXJlY3RvcmllcyA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRGlyZWN0b3JpZXNcIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkZpbGVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZXNUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiTGlua3MgdG8gaWdub3JlLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJJZ25vcmUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIGZpbGUgYXMgbGluay4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKS4gU2V0IGl0IHRvIGAqYCB0byBpZ25vcmUgZmlsZXMgd2l0aCBsaW5rcy5cIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkRpcmVjdG9yeS9maWxlLm1kXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxpbmtzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5saW5rc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIklnbm9yZSBvciBpbmNsdWRlIGZpbGVzIHdpdGggdGhlIGdpdmVuIGZpbGV0eXBlc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJFbmFibGUgdG8gaWdub3JlIGZpbGVzIHdpdGggdGhlIGdpdmVuIGZpbGV0eXBlcy4gRGlzYWJsZSB0byBvbmx5IGluY2x1ZGUgZmlsZXMgd2l0aCB0aGUgZ2l2ZW4gZmlsZXR5cGVzXCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+XG4gICAgICAgICAgICAgICAgY2Iuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRmlsZVR5cGVzKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlRmlsZVR5cGVzID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRmlsZSB0eXBlc1wiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJFZmZlY3QgZGVwZW5kcyBvbiB0b2dnbGUgYWJvdmVcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImRvY3gsdHh0XCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvSWdub3JlLmpvaW4oXCIsXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5maWxlVHlwZXNUb0lnbm9yZSA9IGV4dGVuc2lvbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlRhZ3MgdG8gaWdub3JlLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJJZ25vcmUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIHRhZy4gQWRkIGVhY2ggdGFnIHNlcGFyYXRlZCBieSBjb21tYSAod2l0aG91dCBgI2ApXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJ0b2RvLHVuZmluaXNoZWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGFnc1RvSWdub3JlLmpvaW4oXCIsXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhZ3MgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50YWdzVG9JZ25vcmUgPSB0YWdzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxldHlwZXMgdG8gZGVsZXRlIHBlciBjb21tYW5kLiBTZWUgUkVBRE1FLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJBZGQgZWFjaCBmaWxldHlwZSBzZXBhcmF0ZWQgYnkgY29tbWEuIFNldCB0byBgKmAgdG8gZGVsZXRlIGFsbCBmaWxlcy5cIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcImpwZyxwbmdcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgLy8vIFNldHRpbmdzIGZvciBmaW5kIHVucmVzb2x2ZWRMaW5rc1xuICAgICAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImg0XCIsIHsgdGV4dDogXCJTZXR0aW5ncyBmb3IgZmluZCB1bnJlc29sdmVkIGxpbmtzXCIgfSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZSgnT3V0cHV0IGZpbGUgbmFtZScpXG4gICAgICAgICAgICAuc2V0RGVzYygnU2V0IG5hbWUgb2Ygb3V0cHV0IGZpbGUgKHdpdGhvdXQgZmlsZSBleHRlbnNpb24pLiBNYWtlIHN1cmUgbm8gZmlsZSBleGlzdHMgd2l0aCB0aGlzIG5hbWUgYmVjYXVzZSBpdCB3aWxsIGJlIG92ZXJ3cml0dGVuISBJZiB0aGUgbmFtZSBpcyBlbXB0eSwgdGhlIGRlZmF1bHQgbmFtZSBpcyBzZXQuJylcbiAgICAgICAgICAgIC5hZGRUZXh0KGNiID0+IGNiLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH0pLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkRpcmVjdG9yaWVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIGxpbmtzIGluIGZpbGVzIGluIHRoZSBzcGVjaWZpZWQgZGlyZWN0b3J5LiBBZGQgZWFjaCBkaXJlY3RvcnkgcGF0aCBpbiBhIG5ldyBsaW5lXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvU3ViZGlyZWN0b3J5XCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRmlsZXMgdG8gaWdub3JlLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJJZ25vcmUgbGlua3MgaW4gdGhlIHNwZWNpZmllZCBmaWxlLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJMaW5rcyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIklnbm9yZSBmaWxlcywgd2hpY2ggY29udGFpbiB0aGUgZ2l2ZW4gZmlsZSBhcyBsaW5rLiBBZGQgZWFjaCBmaWxlIHBhdGggaW4gYSBuZXcgbGluZSAod2l0aCBmaWxlIGV4dGVuc2lvbiEpLiBTZXQgaXQgdG8gYCpgIHRvIGlnbm9yZSBmaWxlcyB3aXRoIGxpbmtzLlwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRmlsZXR5cGVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIGxpbmtzIHdpdGggdGhlIHNwZWNpZmllZCBmaWxldHlwZS4gQWRkIGVhY2ggZmlsZXR5cGUgc2VwYXJhdGVkIGJ5IGNvbW1hXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJkb2N4LHR4dFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZS5qb2luKFwiLFwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBleHRlbnNpb25zID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmUgPSBleHRlbnNpb25zO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJUYWdzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIGxpbmtzIGluIGZpbGVzLCB3aGljaCBjb250YWluIHRoZSBnaXZlbiB0YWcuIEFkZCBlYWNoIHRhZyBzZXBhcmF0ZWQgYnkgY29tbWEgKHdpdGhvdXQgYCNgKVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwidG9kbyx1bmZpbmlzaGVkXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZS5qb2luKFwiLFwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0YWdzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzVGFnc1RvSWdub3JlID0gdGFncztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIlNldHRpbmdzIGZvciBmaW5kIGZpbGVzIHdpdGhvdXQgdGFnc1wiIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ091dHB1dCBmaWxlIG5hbWUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1NldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LicpXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWUgPSB0aGlzLmRlZmF1bHRTZXR0aW5ncy53aXRob3V0VGFnc091dHB1dEZpbGVOYW1lO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc091dHB1dEZpbGVOYW1lKSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkZpbGVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIHRoZSBzcGVjaWZpYyBmaWxlcy4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mud2l0aG91dFRhZ3NGaWxlc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mud2l0aG91dFRhZ3NGaWxlc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiRGlyZWN0b3JpZXMgdG8gaWdub3JlLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJJZ25vcmUgZmlsZXMgaW4gdGhlIHNwZWNpZmllZCBkaXJlY3Rvcmllcy4gQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy53aXRob3V0VGFnc0RpcmVjdG9yaWVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLndpdGhvdXRUYWdzRGlyZWN0b3JpZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQXBwLCBDYWNoZWRNZXRhZGF0YSwgZ2V0QWxsVGFncywgaXRlcmF0ZUNhY2hlUmVmcyB9IGZyb20gXCJvYnNpZGlhblwiO1xuXG5leHBvcnQgY2xhc3MgVXRpbHMge1xuICAgIHByaXZhdGUgZmlsZUNhY2hlOiBDYWNoZWRNZXRhZGF0YTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBmb3IgdGhlIGdpdmVuIHNldHRpbmdzLiBJcyB1c2VkIGZvciBgRmluZCB1bmxpbmtlZCBmaWxlc2AgYW5kIGBGaW5kIHVucmVzb2x2ZWQgbGlua3NgXG4gICAgICogQHBhcmFtIGFwcCBcbiAgICAgKiBAcGFyYW0gZmlsZVBhdGggXG4gICAgICogQHBhcmFtIHRhZ3NUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gbGlua3NUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gZGlyZWN0b3JpZXNUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gZmlsZXNUb0lnbm9yZSBcbiAgICAgKiBAcGFyYW0gaWdub3JlRGlyZWN0b3JpZXNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcHA6IEFwcCxcbiAgICAgICAgcHJpdmF0ZSBmaWxlUGF0aDogc3RyaW5nLFxuICAgICAgICBwcml2YXRlIHRhZ3NUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgbGlua3NUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgZGlyZWN0b3JpZXNUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgZmlsZXNUb0lnbm9yZTogc3RyaW5nW10sXG4gICAgICAgIHByaXZhdGUgaWdub3JlRGlyZWN0b3JpZXM6IGJvb2xlYW4gPSB0cnVlLFxuICAgICAgICBwcml2YXRlIGRpcj86IHN0cmluZyxcbiAgICApIHtcbiAgICAgICAgdGhpcy5maWxlQ2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShmaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNUYWdzVG9JZ25vcmUoKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHRhZ3MgPSBnZXRBbGxUYWdzKHRoaXMuZmlsZUNhY2hlKTtcbiAgICAgICAgcmV0dXJuIHRhZ3M/LmZpbmQoKHRhZykgPT4gdGhpcy50YWdzVG9JZ25vcmUuY29udGFpbnModGFnLnN1YnN0cmluZygxKSkpICE9PSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHByaXZhdGUgaGFzTGlua3NUb0lnbm9yZSgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCh0aGlzLmZpbGVDYWNoZT8uZW1iZWRzICE9IG51bGwgfHwgdGhpcy5maWxlQ2FjaGU/LmxpbmtzICE9IG51bGwpICYmIHRoaXMubGlua3NUb0lnbm9yZVswXSA9PSBcIipcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlcmF0ZUNhY2hlUmVmcyh0aGlzLmZpbGVDYWNoZSwgY2IgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluayA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoY2IubGluaywgdGhpcy5maWxlUGF0aCk/LnBhdGg7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saW5rc1RvSWdub3JlLmNvbnRhaW5zKGxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNoZWNrRGlyZWN0b3J5KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kaXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5maWxlUGF0aC5zdGFydHNXaXRoKHRoaXMuZGlyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFpbnMgPSB0aGlzLmRpcmVjdG9yaWVzVG9JZ25vcmUuZmluZCgodmFsdWUpID0+IHZhbHVlLmxlbmd0aCAhPSAwICYmIHRoaXMuZmlsZVBhdGguc3RhcnRzV2l0aCh2YWx1ZSkpICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0aGlzLmlnbm9yZURpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gIWNvbnRhaW5zO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0ZpbGVUb0lnbm9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXNUb0lnbm9yZS5jb250YWlucyh0aGlzLmZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmhhc1RhZ3NUb0lnbm9yZSgpICYmICF0aGlzLmhhc0xpbmtzVG9JZ25vcmUoKSAmJiAhdGhpcy5jaGVja0RpcmVjdG9yeSgpICYmICF0aGlzLmlzRmlsZVRvSWdub3JlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV3JpdGVzIHRoZSB0ZXh0IHRvIHRoZSBmaWxlIGFuZCBvcGVucyB0aGUgZmlsZSBpbiBhIG5ldyBwYW5lIGlmIGl0IGlzIG5vdCBvcGVuZWQgeWV0XG4gICAgICogQHBhcmFtIGFwcCBcbiAgICAgKiBAcGFyYW0gb3V0cHV0RmlsZU5hbWUgbmFtZSBvZiB0aGUgb3V0cHV0IGZpbGVcbiAgICAgKiBAcGFyYW0gdGV4dCBkYXRhIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIGZpbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYXN5bmMgd3JpdGVBbmRPcGVuRmlsZShhcHA6IEFwcCwgb3V0cHV0RmlsZU5hbWU6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XG4gICAgICAgIGF3YWl0IGFwcC52YXVsdC5hZGFwdGVyLndyaXRlKG91dHB1dEZpbGVOYW1lLCB0ZXh0KTtcblxuICAgICAgICBsZXQgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICBhcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi5nZXREaXNwbGF5VGV4dCgpICE9IFwiXCIgJiYgb3V0cHV0RmlsZU5hbWUuc3RhcnRzV2l0aChsZWFmLmdldERpc3BsYXlUZXh0KCkpKSB7XG4gICAgICAgICAgICAgICAgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWZpbGVJc0FscmVhZHlPcGVuZWQpXG4gICAgICAgICAgICBhcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChvdXRwdXRGaWxlTmFtZSwgXCIvXCIsIHRydWUpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBnZXRBbGxUYWdzLCBnZXRMaW5rcGF0aCwgaXRlcmF0ZUNhY2hlUmVmcywgTm90aWNlLCBQbHVnaW4sIFRGaWxlLCBURm9sZGVyIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBEZWxldGVGaWxlc01vZGFsIH0gZnJvbSAnLi9kZWxldGVGaWxlc01vZGFsJztcclxuaW1wb3J0IHsgU2V0dGluZ3NUYWIgfSBmcm9tICcuL3NldHRpbmdzVGFiJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG5cdG91dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcblx0ZGlzYWJsZVdvcmtpbmdMaW5rczogYm9vbGVhbjtcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogc3RyaW5nW107XHJcblx0bGlua3NUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dGFnc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogc3RyaW5nW107XHJcblx0aWdub3JlRmlsZVR5cGVzOiBib29sZWFuO1xyXG5cdGlnbm9yZURpcmVjdG9yaWVzOiBib29sZWFuO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0RpcmVjdG9yaWVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0ZpbGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0ZpbGVUeXBlc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR1bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR1bnJlc29sdmVkTGlua3NUYWdzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcblx0d2l0aG91dFRhZ3NEaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHR3aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHdpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWU6IHN0cmluZztcclxufVxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuXHRvdXRwdXRGaWxlTmFtZTogXCJ1bmxpbmtlZCBmaWxlcyBvdXRwdXRcIixcclxuXHRkaXNhYmxlV29ya2luZ0xpbmtzOiBmYWxzZSxcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcblx0bGlua3NUb0lnbm9yZTogW10sXHJcblx0dGFnc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogW10sXHJcblx0aWdub3JlRmlsZVR5cGVzOiB0cnVlLFxyXG5cdGlnbm9yZURpcmVjdG9yaWVzOiB0cnVlLFxyXG5cdHVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lOiBcInVucmVzb2x2ZWQgbGlua3Mgb3V0cHV0XCIsXHJcblx0dW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmU6IFtdLFxyXG5cdHVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmU6IFtdLFxyXG5cdHVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZTogW10sXHJcblx0d2l0aG91dFRhZ3NEaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHR3aXRob3V0VGFnc0ZpbGVzVG9JZ25vcmU6IFtdLFxyXG5cdHdpdGhvdXRUYWdzT3V0cHV0RmlsZU5hbWU6IFwiZmlsZXMgd2l0aG91dCB0YWdzXCJcclxufTtcclxuaW50ZXJmYWNlIFVucmVzb2x2ZWRMaW5rIHtcclxuXHRsaW5rOiBzdHJpbmc7XHJcblx0ZmlsZXM6IHN0cmluZ1tdO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbmRVbmxpbmtlZEZpbGVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRzZXR0aW5nczogU2V0dGluZ3M7XHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ2xvYWRpbmcgJyArIHRoaXMubWFuaWZlc3QubmFtZSArIFwiIHBsdWdpblwiKTtcclxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2ZpbmQtdW5saW5rZWQtZmlsZXMnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCB1bmxpbmtlZCBmaWxlcycsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmZpbmRVbmxpbmtlZEZpbGVzKCksXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnZmluZC11bnJlc29sdmVkLWxpbmsnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCB1bnJlc29sdmVkIGxpbmtzJyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZmluZFVucmVzb2x2ZWRMaW5rcygpLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJkZWxldGUtdW5saW5rZWQtZmlsZXNcIixcclxuXHRcdFx0bmFtZTogXCJEZWxldGUgdW5saW5rZWQgZmlsZXMgd2l0aCBjZXJ0YWluIGV4dGVuc2lvbi4gU2VlIFJFQURNRVwiLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5kZWxldGVVbmxpbmtlZEZpbGVzKClcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6IFwiZmluZC1maWxlcy13aXRob3V0LXRhZ3NcIixcclxuXHRcdFx0bmFtZTogXCJGaW5kIGZpbGVzIHdpdGhvdXQgdGFnc1wiLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5maW5kRmlsZXNXaXRob3V0VGFncygpXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMsIERFRkFVTFRfU0VUVElOR1MpKTtcclxuXHJcblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oXCJmaWxlLW1lbnVcIiwgKG1lbnUsIGZpbGUsIHNvdXJjZSwgbGVhZikgPT4ge1xyXG5cdFx0XHRpZiAoZmlsZSBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcclxuXHRcdFx0XHRtZW51LmFkZEl0ZW0oY2IgPT4ge1xyXG5cdFx0XHRcdFx0Y2Iuc2V0SWNvbihcInNlYXJjaFwiKTtcclxuXHRcdFx0XHRcdGNiLnNldFRpdGxlKFwiRmluZCB1bmxpbmtlZCBmaWxlc1wiKTtcclxuXHRcdFx0XHRcdC8vIEFkZCB0cmFpbGluZyBzbGFzaCB0byBjYXRjaCBmaWxlcyBuYW1lZCBsaWtlIHRoZSBkaXJlY3RvcnkuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vVmluemVudDAzL2ZpbmQtdW5saW5rZWQtZmlsZXMvaXNzdWVzLzI0XHJcblx0XHRcdFx0XHRjYi5vbkNsaWNrKChlKSA9PiB7IHRoaXMuZmluZFVubGlua2VkRmlsZXMoZmlsZS5wYXRoICsgXCIvXCIpOyB9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRmaW5kVW5saW5rZWRGaWxlcyhkaXI/OiBzdHJpbmcpIHtcclxuXHRcdGNvbnN0IG91dEZpbGVOYW1lID0gdGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCI7XHJcblx0XHRsZXQgb3V0RmlsZTogVEZpbGU7XHJcblx0XHRjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCk7XHJcblx0XHRjb25zdCBtYXJrZG93bkZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cdFx0bGV0IGxpbmtzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuXHRcdG1hcmtkb3duRmlsZXMuZm9yRWFjaCgobWFya0ZpbGU6IFRGaWxlKSA9PiB7XHJcblx0XHRcdGlmIChtYXJrRmlsZS5wYXRoID09IG91dEZpbGVOYW1lKSB7XHJcblx0XHRcdFx0b3V0RmlsZSA9IG1hcmtGaWxlO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRpdGVyYXRlQ2FjaGVSZWZzKHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKG1hcmtGaWxlKSwgY2IgPT4ge1xyXG5cdFx0XHRcdGxldCB0eHQgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGdldExpbmtwYXRoKGNiLmxpbmspLCBtYXJrRmlsZS5wYXRoKTtcclxuXHRcdFx0XHRpZiAodHh0ICE9IG51bGwpXHJcblx0XHRcdFx0XHRsaW5rcy5wdXNoKHR4dC5wYXRoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IG5vdExpbmtlZEZpbGVzID0gZmlsZXMuZmlsdGVyKChmaWxlKSA9PiB0aGlzLmlzVmFsaWQoZmlsZSwgbGlua3MsIGRpcikpO1xyXG5cdFx0bm90TGlua2VkRmlsZXMucmVtb3ZlKG91dEZpbGUpO1xyXG5cclxuXHJcblx0XHRsZXQgdGV4dCA9IFwiXCI7XHJcblx0XHRsZXQgcHJlZml4OiBzdHJpbmc7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5kaXNhYmxlV29ya2luZ0xpbmtzKVxyXG5cdFx0XHRwcmVmaXggPSBcIlx0XCI7XHJcblx0XHRlbHNlXHJcblx0XHRcdHByZWZpeCA9IFwiXCI7XHJcblx0XHRub3RMaW5rZWRGaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XHJcblx0XHRcdHRleHQgKz0gcHJlZml4ICsgXCItIFtbXCIgKyB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGZpbGUsIFwiL1wiLCBmYWxzZSkgKyBcIl1dXFxuXCI7XHJcblx0XHR9KTtcclxuXHRcdFV0aWxzLndyaXRlQW5kT3BlbkZpbGUodGhpcy5hcHAsIG91dEZpbGVOYW1lLCB0ZXh0KTtcclxuXHJcblx0fVxyXG5cdGFzeW5jIGRlbGV0ZVVubGlua2VkRmlsZXMoKSB7XHJcblx0XHRpZiAoIWF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKHRoaXMuc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiKSkge1xyXG5cdFx0XHRuZXcgTm90aWNlKFwiQ2FuJ3QgZmluZCBmaWxlIC0gUGxlYXNlIHJ1biB0aGUgYEZpbmQgdW5saW5rZWQgZmlsZXMnIGNvbW1hbmQgYmVmb3JlXCIpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBsaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUodGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCIpPy5saW5rcyA/PyBbXTtcclxuXHRcdGNvbnN0IGZpbGVzVG9EZWxldGU6IFRGaWxlW10gPSBbXTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUpO1xyXG5cdFx0bGlua3MuZm9yRWFjaCgobGluaykgPT4ge1xyXG5cdFx0XHRjb25zdCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChsaW5rLmxpbmssIFwiL1wiKTtcclxuXHRcdFx0aWYgKCFmaWxlKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlWzBdID09IFwiKlwiIHx8IHRoaXMuc2V0dGluZ3MuZmlsZVR5cGVzVG9EZWxldGUuY29udGFpbnMoZmlsZS5leHRlbnNpb24pKSB7XHJcblx0XHRcdFx0ZmlsZXNUb0RlbGV0ZS5wdXNoKGZpbGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGlmIChmaWxlc1RvRGVsZXRlLmxlbmd0aCA+IDApXHJcblx0XHRcdG5ldyBEZWxldGVGaWxlc01vZGFsKHRoaXMuYXBwLCBmaWxlc1RvRGVsZXRlKS5vcGVuKCk7XHJcblx0fVxyXG5cdGZpbmRVbnJlc29sdmVkTGlua3MoKSB7XHJcblx0XHRjb25zdCBvdXRGaWxlTmFtZSA9IHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiO1xyXG5cdFx0Y29uc3QgbGlua3M6IFVucmVzb2x2ZWRMaW5rW10gPSBbXTtcclxuXHRcdGNvbnN0IHVucmVzb2x2ZWRMaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUudW5yZXNvbHZlZExpbmtzO1xyXG5cclxuXHRcdGZvciAobGV0IGZpbGVQYXRoIGluIHVucmVzb2x2ZWRMaW5rcykge1xyXG5cdFx0XHRpZiAoZmlsZVBhdGggPT0gdGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSArIFwiLm1kXCIpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0Y29uc3QgZmlsZVR5cGUgPSBmaWxlUGF0aC5zdWJzdHJpbmcoZmlsZVBhdGgubGFzdEluZGV4T2YoXCIuXCIpICsgMSk7XHJcblxyXG5cdFx0XHRjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuXHRcdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0XHRmaWxlUGF0aCxcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZSxcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmUsXHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlLFxyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoIXV0aWxzLmlzVmFsaWQoKSkgY29udGludWU7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IGxpbmsgaW4gdW5yZXNvbHZlZExpbmtzW2ZpbGVQYXRoXSkge1xyXG5cdFx0XHRcdGNvbnN0IGxpbmtGaWxlVHlwZSA9IGxpbmsuc3Vic3RyaW5nKGxpbmsubGFzdEluZGV4T2YoXCIuXCIpICsgMSk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2cobGlua0ZpbGVUeXBlKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmUuY29udGFpbnMobGlua0ZpbGVUeXBlKSkgY29udGludWU7XHJcblxyXG5cdFx0XHRcdGxldCBmb3JtYXR0ZWRGaWxlUGF0aCA9IGZpbGVQYXRoO1xyXG5cdFx0XHRcdGlmIChmaWxlVHlwZSA9PSBcIm1kXCIpIHtcclxuXHRcdFx0XHRcdGZvcm1hdHRlZEZpbGVQYXRoID0gZmlsZVBhdGguc3Vic3RyaW5nKDAsIGZpbGVQYXRoLmxhc3RJbmRleE9mKFwiLm1kXCIpKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y29uc3QgdW5yZXNvbHZlZExpbms6IFVucmVzb2x2ZWRMaW5rID0geyBmaWxlczogW2Zvcm1hdHRlZEZpbGVQYXRoXSwgbGluazogbGluayB9O1xyXG5cdFx0XHRcdGlmIChsaW5rcy5jb250YWlucyh1bnJlc29sdmVkTGluaykpXHJcblx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRjb25zdCBkdXBsaWNhdGlvbiA9IGxpbmtzLmZpbmQoKGUpID0+IGUubGluayA9PSBsaW5rKTtcclxuXHRcdFx0XHRpZiAoZHVwbGljYXRpb24pIHtcclxuXHRcdFx0XHRcdGR1cGxpY2F0aW9uLmZpbGVzLnB1c2goZm9ybWF0dGVkRmlsZVBhdGgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRsaW5rcy5wdXNoKHVucmVzb2x2ZWRMaW5rKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFV0aWxzLndyaXRlQW5kT3BlbkZpbGUoXHJcblx0XHRcdHRoaXMuYXBwLFxyXG5cdFx0XHRvdXRGaWxlTmFtZSxcclxuXHRcdFx0W1xyXG5cdFx0XHRcdFwiRG9uJ3QgZm9yZ2V0IHRoYXQgY3JlYXRpbmcgdGhlIGZpbGUgZnJvbSBoZXJlIG1heSBjcmVhdGUgdGhlIGZpbGUgaW4gdGhlIHdyb25nIGRpcmVjdG9yeSFcIixcclxuXHRcdFx0XHQuLi5saW5rcy5tYXAoKGUpID0+IGAtIFtbJHtlLmxpbmt9XV0gaW4gW1ske2UuZmlsZXMuam9pbihcIl1dLCBbW1wiKX1dXWApXHJcblx0XHRcdF0uam9pbihcIlxcblwiKSk7XHJcblxyXG5cdH1cclxuXHJcblx0ZmluZEZpbGVzV2l0aG91dFRhZ3MoKSB7XHJcblx0XHRjb25zdCBvdXRGaWxlTmFtZSA9IHRoaXMuc2V0dGluZ3Mud2l0aG91dFRhZ3NPdXRwdXRGaWxlTmFtZSArIFwiLm1kXCI7XHJcblx0XHRsZXQgb3V0RmlsZTogVEZpbGU7XHJcblx0XHRjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKTtcclxuXHRcdGxldCB3aXRob3V0RmlsZXMgPSBmaWxlcy5maWx0ZXIoKGZpbGUpID0+IHtcclxuXHRcdFx0aWYgKG5ldyBVdGlscyh0aGlzLmFwcCwgZmlsZS5wYXRoLCBbXSwgW10sIHRoaXMuc2V0dGluZ3Mud2l0aG91dFRhZ3NEaXJlY3Rvcmllc1RvSWdub3JlLCB0aGlzLnNldHRpbmdzLndpdGhvdXRUYWdzRmlsZXNUb0lnbm9yZSwgdHJ1ZSkuaXNWYWxpZCgpKSB7XHJcblx0XHRcdFx0cmV0dXJuIChnZXRBbGxUYWdzKHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpKS5sZW5ndGggPz8gMCkgPD0gMDtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdHdpdGhvdXRGaWxlcy5yZW1vdmUob3V0RmlsZSk7XHJcblxyXG5cclxuXHRcdGxldCBwcmVmaXg6IHN0cmluZztcclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmRpc2FibGVXb3JraW5nTGlua3MpXHJcblx0XHRcdHByZWZpeCA9IFwiXHRcIjtcclxuXHRcdGVsc2VcclxuXHRcdFx0cHJlZml4ID0gXCJcIjtcclxuXHRcdGNvbnN0IHRleHQgPSB3aXRob3V0RmlsZXMubWFwKChmaWxlKSA9PiBgJHtwcmVmaXh9LSBbWyR7ZmlsZS5wYXRofV1dYCkuam9pbihcIlxcblwiKTtcclxuXHRcdFV0aWxzLndyaXRlQW5kT3BlbkZpbGUodGhpcy5hcHAsIG91dEZpbGVOYW1lLCB0ZXh0KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gZmlsZSBpbiBhbiB1bmxpbmtlZCBmaWxlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGZpbGUgZmlsZSB0byBjaGVja1xyXG5cdCAqIEBwYXJhbSBsaW5rcyBhbGwgbGlua3MgaW4gdGhlIHZhdWx0XHJcblx0ICovXHJcblx0aXNWYWxpZChmaWxlOiBURmlsZSwgbGlua3M6IHN0cmluZ1tdLCBkaXI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKGxpbmtzLmNvbnRhaW5zKGZpbGUucGF0aCkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHQvL2ZpbGV0eXBlcyB0byBpZ25vcmUgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKGZpbGUuZXh0ZW5zaW9uID09IFwiY3NzXCIpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5maWxlVHlwZXNUb0lnbm9yZVswXSAhPT0gXCJcIikge1xyXG5cdFx0XHRjb25zdCBjb250YWluc0ZpbGVUeXBlID0gdGhpcy5zZXR0aW5ncy5maWxlVHlwZXNUb0lnbm9yZS5jb250YWlucyhmaWxlLmV4dGVuc2lvbik7XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmlnbm9yZUZpbGVUeXBlcykge1xyXG5cdFx0XHRcdGlmIChjb250YWluc0ZpbGVUeXBlKSByZXR1cm47XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aWYgKCFjb250YWluc0ZpbGVUeXBlKSByZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuXHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdGZpbGUucGF0aCxcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy50YWdzVG9JZ25vcmUsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MubGlua3NUb0lnbm9yZSxcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MuaWdub3JlRGlyZWN0b3JpZXMsXHJcblx0XHRcdGRpclxyXG5cdFx0KTtcclxuXHRcdGlmICghdXRpbHMuaXNWYWxpZCgpKVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ3VubG9hZGluZyAnICsgdGhpcy5tYW5pZmVzdC5uYW1lICsgXCIgcGx1Z2luXCIpO1xyXG5cdH1cclxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbihERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xyXG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vZGFsIiwibm9ybWFsaXplUGF0aCIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIiwiZ2V0QWxsVGFncyIsIml0ZXJhdGVDYWNoZVJlZnMiLCJURm9sZGVyIiwiZ2V0TGlua3BhdGgiLCJOb3RpY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFH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
