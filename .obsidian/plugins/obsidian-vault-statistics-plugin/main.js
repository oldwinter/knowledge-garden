'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
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

var StatisticsPlugin = /** @class */ (function (_super) {
    __extends(StatisticsPlugin, _super);
    function StatisticsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusBarItem = null;
        return _this;
    }
    StatisticsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('Loading vault-statistics Plugin');
                this.vaultMetrics = new VaultMetrics();
                this.fileMetricsCollector = new FileMetricsCollector(this).
                    setVault(this.app.vault).
                    setMetadataCache(this.app.metadataCache).
                    setVaultMetrics(this.vaultMetrics).
                    start();
                this.statusBarItem = new StatisticsStatusBarItem(this, this.addStatusBarItem()).
                    setVaultMetrics(this.vaultMetrics);
                return [2 /*return*/];
            });
        });
    };
    return StatisticsPlugin;
}(obsidian.Plugin));
var Formatter = /** @class */ (function () {
    function Formatter() {
    }
    return Formatter;
}());
/**
 * {@link DecimalUnitFormatter} provides an implementation of {@link Formatter}
 * that outputs a integers in a standard decimal format with grouped thousands.
 */
var DecimalUnitFormatter = /** @class */ (function (_super) {
    __extends(DecimalUnitFormatter, _super);
    /**
     * @param unit the unit of the value being formatted.
     * @constructor
     */
    function DecimalUnitFormatter(unit) {
        var _this = _super.call(this) || this;
        _this.unit = unit;
        _this.numberFormat = Intl.NumberFormat('en-US', { style: 'decimal' });
        return _this;
    }
    DecimalUnitFormatter.prototype.format = function (value) {
        return "".concat(this.numberFormat.format(value), " ").concat(this.unit);
    };
    return DecimalUnitFormatter;
}(Formatter));
/**
 * {@link ScalingUnitFormatter}
 */
var ScalingUnitFormatter = /** @class */ (function (_super) {
    __extends(ScalingUnitFormatter, _super);
    /**
     * @param numberFormat An instance of {@link Intl.NumberFormat} to use to
     * format the scaled value.
     */
    function ScalingUnitFormatter(numberFormat) {
        var _this = _super.call(this) || this;
        _this.numberFormat = numberFormat;
        return _this;
    }
    ScalingUnitFormatter.prototype.format = function (value) {
        var _a = this.scale(value), scaledValue = _a[0], scaledUnit = _a[1];
        return "".concat(this.numberFormat.format(scaledValue), " ").concat(scaledUnit);
    };
    return ScalingUnitFormatter;
}(Formatter));
/**
 * {@link BytesFormatter} formats values that represent a size in bytes as a
 * value in bytes, kilobytes, megabytes, gigabytes, etc.
 */
var BytesFormatter = /** @class */ (function (_super) {
    __extends(BytesFormatter, _super);
    function BytesFormatter() {
        return _super.call(this, Intl.NumberFormat('en-US', { style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 })) || this;
    }
    BytesFormatter.prototype.scale = function (value) {
        var units = ["bytes", "KB", "MB", "GB", "TB", "PB"];
        while (value > 1024 && units.length > 0) {
            value = value / 1024;
            units.shift();
        }
        return [value, units[0]];
    };
    return BytesFormatter;
}(ScalingUnitFormatter));
/**
 * {@link StatisticView} is responsible for maintaining the DOM representation
 * of a given statistic.
 */
var StatisticView = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param containerEl The parent element for the view.
     */
    function StatisticView(containerEl) {
        this.containerEl = containerEl.createSpan({ cls: ["obsidian-vault-statistics--item"] });
        this.setActive(false);
    }
    /**
     * Sets the name of the statistic.
     */
    StatisticView.prototype.setStatisticName = function (name) {
        this.containerEl.addClass("obsidian-vault-statistics--item-".concat(name));
        return this;
    };
    /**
     * Sets the formatter to use to produce the content of the view.
     */
    StatisticView.prototype.setFormatter = function (formatter) {
        this.formatter = formatter;
        return this;
    };
    /**
     * Updates the view with the desired active status.
     *
     * Active views have the CSS class `obsidian-vault-statistics--item-active`
     * applied, inactive views have the CSS class
     * `obsidian-vault-statistics--item-inactive` applied. These classes are
     * mutually exclusive.
     */
    StatisticView.prototype.setActive = function (isActive) {
        this.containerEl.removeClass("obsidian-vault-statistics--item--active");
        this.containerEl.removeClass("obsidian-vault-statistics--item--inactive");
        if (isActive) {
            this.containerEl.addClass("obsidian-vault-statistics--item--active");
        }
        else {
            this.containerEl.addClass("obsidian-vault-statistics--item--inactive");
        }
        return this;
    };
    /**
     * Refreshes the content of the view with content from the passed {@link
     * Statistics}.
     */
    StatisticView.prototype.refresh = function (s) {
        this.containerEl.setText(this.formatter(s));
    };
    /**
     * Returns the text content of the view.
     */
    StatisticView.prototype.getText = function () {
        return this.containerEl.getText();
    };
    return StatisticView;
}());
var VaultMetrics = /** @class */ (function (_super) {
    __extends(VaultMetrics, _super);
    function VaultMetrics() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.files = 0;
        _this.notes = 0;
        _this.attachments = 0;
        _this.size = 0;
        _this.links = 0;
        _this.words = 0;
        return _this;
    }
    VaultMetrics.prototype.reset = function () {
        this.files = 0;
        this.notes = 0;
        this.attachments = 0;
        this.size = 0;
        this.links = 0;
        this.words = 0;
    };
    VaultMetrics.prototype.dec = function (metrics) {
        this.files -= (metrics === null || metrics === void 0 ? void 0 : metrics.files) || 0;
        this.notes -= (metrics === null || metrics === void 0 ? void 0 : metrics.notes) || 0;
        this.attachments -= (metrics === null || metrics === void 0 ? void 0 : metrics.attachments) || 0;
        this.size -= (metrics === null || metrics === void 0 ? void 0 : metrics.size) || 0;
        this.links -= (metrics === null || metrics === void 0 ? void 0 : metrics.links) || 0;
        this.words -= (metrics === null || metrics === void 0 ? void 0 : metrics.words) || 0;
        this.trigger("updated");
    };
    VaultMetrics.prototype.inc = function (metrics) {
        this.files += (metrics === null || metrics === void 0 ? void 0 : metrics.files) || 0;
        this.notes += (metrics === null || metrics === void 0 ? void 0 : metrics.notes) || 0;
        this.attachments += (metrics === null || metrics === void 0 ? void 0 : metrics.attachments) || 0;
        this.size += (metrics === null || metrics === void 0 ? void 0 : metrics.size) || 0;
        this.links += (metrics === null || metrics === void 0 ? void 0 : metrics.links) || 0;
        this.words += (metrics === null || metrics === void 0 ? void 0 : metrics.words) || 0;
        this.trigger("updated");
    };
    VaultMetrics.prototype.on = function (name, callback, ctx) {
        return _super.prototype.on.call(this, "updated", callback, ctx);
    };
    return VaultMetrics;
}(obsidian.Events));
var FileType;
(function (FileType) {
    FileType[FileType["Unknown"] = 0] = "Unknown";
    FileType[FileType["Note"] = 1] = "Note";
    FileType[FileType["Attachment"] = 2] = "Attachment";
})(FileType || (FileType = {}));
/**
 * The {@link UnitTokenizer} is a constant tokenizer that always returns an
 * empty list.
 */
var UnitTokenizer = /** @class */ (function () {
    function UnitTokenizer() {
    }
    UnitTokenizer.prototype.tokenize = function (_) {
        return [];
    };
    return UnitTokenizer;
}());
/**
 * {@link MarkdownTokenizer} understands how to tokenize markdown text into word
 * tokens.
 */
var MarkdownTokenizer = /** @class */ (function () {
    function MarkdownTokenizer() {
    }
    MarkdownTokenizer.prototype.tokenize = function (content) {
        if (content.trim() === "") {
            return [];
        }
        else {
            var WORD_BOUNDARY = /[ \n\r\t\"\|,\(\)\[\]]+/;
            var NON_WORDS_1 = /^\W+$/;
            var NUMBER_1 = /^\d+(\.\d+)?$/;
            var CODE_BLOCK_HEADER_1 = /^```\w+$/;
            var STRIP_HIGHLIGHTS_1 = /^(==)?(.*?)(==)?$/;
            var STRIP_FORMATTING_1 = /^(_+|\*+)?(.*?)(_+|\*+)?$/;
            var STRIP_PUNCTUATION_1 = /^("|`)?(.*?)(`|\.|:|"|,)?$/;
            var STRIP_WIKI_LINKS_1 = /^(\[\[)?(.*?)(\]\])?$/;
            // TODO: Split on / in token to treat tokens such as "try/catch" as 2 words.
            // TODO: Strip formatting symbols from the start/end of tokens (e.g. *, **, __, etc)
            var words = content.
                split(WORD_BOUNDARY).
                filter(function (word) { return !NON_WORDS_1.exec(word); }).
                filter(function (word) { return !NUMBER_1.exec(word); }).
                filter(function (word) { return !CODE_BLOCK_HEADER_1.exec(word); }).
                map(function (word) { return STRIP_HIGHLIGHTS_1.exec(word)[2]; }).
                map(function (word) { return STRIP_FORMATTING_1.exec(word)[2]; }).
                map(function (word) { return STRIP_PUNCTUATION_1.exec(word)[2]; }).
                map(function (word) { return STRIP_WIKI_LINKS_1.exec(word)[2]; }).
                filter(function (word) { return word.length > 0; });
            // console.log(words);
            return words;
        }
    };
    return MarkdownTokenizer;
}());
var unitTokenizer = new UnitTokenizer();
var markdownTokenizer = new MarkdownTokenizer;
var tokenizers = new Map([
    ["paragraph", markdownTokenizer],
    ["heading", markdownTokenizer],
    ["list", markdownTokenizer],
    ["table", unitTokenizer],
    ["yaml", unitTokenizer],
    ["code", unitTokenizer],
    ["blockquote", markdownTokenizer],
    ["math", unitTokenizer],
    ["thematicBreak", unitTokenizer],
    ["html", unitTokenizer],
    ["text", unitTokenizer],
    ["element", unitTokenizer],
    ["footnoteDefinition", unitTokenizer],
    ["definition", unitTokenizer],
]);
var FileMetricsCollector = /** @class */ (function () {
    function FileMetricsCollector(owner) {
        this.data = new Map();
        this.backlog = new Array();
        this.vaultMetrics = new VaultMetrics();
        this.tokenizer = new MarkdownTokenizer();
        this.owner = owner;
    }
    FileMetricsCollector.prototype.setVault = function (vault) {
        this.vault = vault;
        return this;
    };
    FileMetricsCollector.prototype.setMetadataCache = function (metadataCache) {
        this.metadataCache = metadataCache;
        return this;
    };
    FileMetricsCollector.prototype.setVaultMetrics = function (vaultMetrics) {
        this.vaultMetrics = vaultMetrics;
        return this;
    };
    FileMetricsCollector.prototype.start = function () {
        var _this = this;
        var _a;
        this.owner.registerEvent(this.vault.on("create", function (file) { _this.onfilecreated(file); }));
        this.owner.registerEvent(this.vault.on("modify", function (file) { _this.onfilemodified(file); }));
        this.owner.registerEvent(this.vault.on("delete", function (file) { _this.onfiledeleted(file); }));
        this.owner.registerEvent(this.vault.on("rename", function (file, oldPath) { _this.onfilerenamed(file, oldPath); }));
        this.owner.registerEvent(this.metadataCache.on("resolve", function (file) { _this.onfilemodified(file); }));
        this.owner.registerEvent(this.metadataCache.on("changed", function (file) { _this.onfilemodified(file); }));
        this.data.clear();
        this.backlog = new Array();
        (_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.reset();
        this.vault.getFiles().forEach(function (file) {
            if (!(file instanceof obsidian.TFolder)) {
                _this.push(file);
            }
        });
        this.owner.registerInterval(+setInterval(function () { _this.processBacklog(); }, 2000));
        return this;
    };
    FileMetricsCollector.prototype.push = function (fileOrPath) {
        if (fileOrPath instanceof obsidian.TFolder) {
            return;
        }
        var path = (fileOrPath instanceof obsidian.TFile) ? fileOrPath.path : fileOrPath;
        if (!this.backlog.contains(path)) {
            this.backlog.push(path);
        }
    };
    FileMetricsCollector.prototype.processBacklog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, file, metrics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.backlog.length > 0)) return [3 /*break*/, 2];
                        path = this.backlog.shift();
                        file = this.vault.getAbstractFileByPath(path);
                        return [4 /*yield*/, this.collect(file)];
                    case 1:
                        metrics = _a.sent();
                        this.update(path, metrics);
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FileMetricsCollector.prototype.onfilecreated = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilecreated(${file?.path})`);
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    FileMetricsCollector.prototype.onfilemodified = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilemodified(${file?.path})`)
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    FileMetricsCollector.prototype.onfiledeleted = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfiledeleted(${file?.path})`)
                this.push(file);
                return [2 /*return*/];
            });
        });
    };
    FileMetricsCollector.prototype.onfilerenamed = function (file, oldPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // console.log(`onfilerenamed(${file?.path})`)
                this.push(file);
                this.push(oldPath);
                return [2 /*return*/];
            });
        });
    };
    FileMetricsCollector.prototype.getWordCount = function (content) {
        return this.tokenizer.tokenize(content).length;
    };
    FileMetricsCollector.prototype.getFileType = function (file) {
        var _a;
        if (((_a = file.extension) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "md") {
            return FileType.Note;
        }
        else {
            return FileType.Attachment;
        }
    };
    FileMetricsCollector.prototype.collect = function (file) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var metadata, metrics, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        metadata = this.metadataCache.getFileCache(file);
                        if (metadata == null) {
                            return [2 /*return*/, Promise.resolve(null)];
                        }
                        metrics = new VaultMetrics();
                        _d = this.getFileType(file);
                        switch (_d) {
                            case FileType.Note: return [3 /*break*/, 1];
                            case FileType.Attachment: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        metrics.files = 1;
                        metrics.notes = 1;
                        metrics.attachments = 0;
                        metrics.size = (_a = file.stat) === null || _a === void 0 ? void 0 : _a.size;
                        metrics.links = ((_b = metadata === null || metadata === void 0 ? void 0 : metadata.links) === null || _b === void 0 ? void 0 : _b.length) || 0;
                        metrics.words = 0;
                        _e = metrics;
                        return [4 /*yield*/, this.vault.cachedRead(file).then(function (content) {
                                var _a;
                                return (_a = metadata.sections) === null || _a === void 0 ? void 0 : _a.map(function (section) {
                                    var _a, _b, _c, _d;
                                    var sectionType = section.type;
                                    var startOffset = (_b = (_a = section.position) === null || _a === void 0 ? void 0 : _a.start) === null || _b === void 0 ? void 0 : _b.offset;
                                    var endOffset = (_d = (_c = section.position) === null || _c === void 0 ? void 0 : _c.end) === null || _d === void 0 ? void 0 : _d.offset;
                                    var tokenizer = tokenizers.get(sectionType);
                                    var tokens = tokenizer.tokenize(content.substring(startOffset, endOffset));
                                    return tokens.length;
                                }).reduce(function (a, b) { return a + b; }, 0);
                            }).catch(function (e) {
                                console.log("".concat(file.path, " ").concat(e));
                                return 0;
                            })];
                    case 2:
                        _e.words = _f.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        metrics.files = 1;
                        metrics.notes = 0;
                        metrics.attachments = 1;
                        metrics.size = (_c = file.stat) === null || _c === void 0 ? void 0 : _c.size;
                        metrics.links = 0;
                        metrics.words = 0;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, metrics];
                }
            });
        });
    };
    FileMetricsCollector.prototype.update = function (fileOrPath, metrics) {
        var _a, _b;
        var key = (fileOrPath instanceof obsidian.TFile) ? fileOrPath.path : fileOrPath;
        // Remove the existing values for the passed file if present, update the
        // raw values, then add the values for the passed file to the totals.
        (_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.dec(this.data.get(key));
        if (metrics == null) {
            this.data.delete(key);
        }
        else {
            this.data.set(key, metrics);
        }
        (_b = this.vaultMetrics) === null || _b === void 0 ? void 0 : _b.inc(metrics);
    };
    return FileMetricsCollector;
}());
var StatisticsStatusBarItem = /** @class */ (function () {
    function StatisticsStatusBarItem(owner, statusBarItem) {
        var _this = this;
        // index of the currently displayed stat.
        this.displayedStatisticIndex = 0;
        this.statisticViews = [];
        this.refreshSoon = obsidian.debounce(function () { _this.refresh(); }, 2000, false);
        this.owner = owner;
        this.statusBarItem = statusBarItem;
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("notes").
            setFormatter(function (s) { return new DecimalUnitFormatter("notes").format(s.notes); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("attachments").
            setFormatter(function (s) { return new DecimalUnitFormatter("attachments").format(s.attachments); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("files").
            setFormatter(function (s) { return new DecimalUnitFormatter("files").format(s.files); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("links").
            setFormatter(function (s) { return new DecimalUnitFormatter("links").format(s.links); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("words").
            setFormatter(function (s) { return new DecimalUnitFormatter("words").format(s.words); }));
        this.statisticViews.push(new StatisticView(this.statusBarItem).
            setStatisticName("size").
            setFormatter(function (s) { return new BytesFormatter().format(s.size); }));
        this.statusBarItem.onClickEvent(function () { _this.onclick(); });
    }
    StatisticsStatusBarItem.prototype.setVaultMetrics = function (vaultMetrics) {
        var _a;
        this.vaultMetrics = vaultMetrics;
        this.owner.registerEvent((_a = this.vaultMetrics) === null || _a === void 0 ? void 0 : _a.on("updated", this.refreshSoon));
        this.refreshSoon();
        return this;
    };
    StatisticsStatusBarItem.prototype.refresh = function () {
        var _this = this;
        this.statisticViews.forEach(function (view, i) {
            view.setActive(_this.displayedStatisticIndex == i).refresh(_this.vaultMetrics);
        });
        this.statusBarItem.title = this.statisticViews.map(function (view) { return view.getText(); }).join("\n");
    };
    StatisticsStatusBarItem.prototype.onclick = function () {
        this.displayedStatisticIndex = (this.displayedStatisticIndex + 1) % this.statisticViews.length;
        this.refresh();
    };
    return StatisticsStatusBarItem;
}());

module.exports = StatisticsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBFdmVudHMsIEV2ZW50UmVmLCBDb21wb25lbnQsIFZhdWx0LCBURmlsZSwgUGx1Z2luLCBkZWJvdW5jZSwgTWV0YWRhdGFDYWNoZSwgQ2FjaGVkTWV0YWRhdGEsIFRGb2xkZXIgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpc3RpY3NQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXG5cdHByaXZhdGUgc3RhdHVzQmFySXRlbTogU3RhdGlzdGljc1N0YXR1c0Jhckl0ZW0gPSBudWxsO1xuXG5cdHB1YmxpYyBmaWxlTWV0cmljc0NvbGxlY3RvcjogRmlsZU1ldHJpY3NDb2xsZWN0b3I7XG5cdHB1YmxpYyB2YXVsdE1ldHJpY3M6IFZhdWx0TWV0cmljcztcblxuXHRhc3luYyBvbmxvYWQoKSB7XG5cdFx0Y29uc29sZS5sb2coJ0xvYWRpbmcgdmF1bHQtc3RhdGlzdGljcyBQbHVnaW4nKTtcblxuXHRcdHRoaXMudmF1bHRNZXRyaWNzID0gbmV3IFZhdWx0TWV0cmljcygpO1xuXG5cdFx0dGhpcy5maWxlTWV0cmljc0NvbGxlY3RvciA9IG5ldyBGaWxlTWV0cmljc0NvbGxlY3Rvcih0aGlzKS5cblx0XHRcdHNldFZhdWx0KHRoaXMuYXBwLnZhdWx0KS5cblx0XHRcdHNldE1ldGFkYXRhQ2FjaGUodGhpcy5hcHAubWV0YWRhdGFDYWNoZSkuXG5cdFx0XHRzZXRWYXVsdE1ldHJpY3ModGhpcy52YXVsdE1ldHJpY3MpLlxuXHRcdFx0c3RhcnQoKTtcblxuXHRcdHRoaXMuc3RhdHVzQmFySXRlbSA9IG5ldyBTdGF0aXN0aWNzU3RhdHVzQmFySXRlbSh0aGlzLCB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKSkuXG5cdFx0XHRzZXRWYXVsdE1ldHJpY3ModGhpcy52YXVsdE1ldHJpY3MpO1xuXHR9XG59XG5cbmFic3RyYWN0IGNsYXNzIEZvcm1hdHRlciB7XG5cdHB1YmxpYyBhYnN0cmFjdCBmb3JtYXQodmFsdWU6IG51bWJlcik6IHN0cmluZztcbn1cblxuLyoqXG4gKiB7QGxpbmsgRGVjaW1hbFVuaXRGb3JtYXR0ZXJ9IHByb3ZpZGVzIGFuIGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBGb3JtYXR0ZXJ9XG4gKiB0aGF0IG91dHB1dHMgYSBpbnRlZ2VycyBpbiBhIHN0YW5kYXJkIGRlY2ltYWwgZm9ybWF0IHdpdGggZ3JvdXBlZCB0aG91c2FuZHMuXG4gKi9cbmNsYXNzIERlY2ltYWxVbml0Rm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcblx0cHJpdmF0ZSB1bml0OiBzdHJpbmc7XG5cdHByaXZhdGUgbnVtYmVyRm9ybWF0OiBJbnRsLk51bWJlckZvcm1hdDtcblxuXHQvKipcblx0ICogQHBhcmFtIHVuaXQgdGhlIHVuaXQgb2YgdGhlIHZhbHVlIGJlaW5nIGZvcm1hdHRlZC5cblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih1bml0OiBzdHJpbmcpIHtcblx0XHRzdXBlcigpXG5cdFx0dGhpcy51bml0ID0gdW5pdDtcblx0XHR0aGlzLm51bWJlckZvcm1hdCA9IEludGwuTnVtYmVyRm9ybWF0KCdlbi1VUycsIHsgc3R5bGU6ICdkZWNpbWFsJyB9KTtcblx0fVxuXG5cdHB1YmxpYyBmb3JtYXQodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGAke3RoaXMubnVtYmVyRm9ybWF0LmZvcm1hdCh2YWx1ZSl9ICR7dGhpcy51bml0fWBcblx0fVxufVxuXG4vKipcbiAqIHtAbGluayBTY2FsaW5nVW5pdEZvcm1hdHRlcn1cbiAqL1xuYWJzdHJhY3QgY2xhc3MgU2NhbGluZ1VuaXRGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuXG5cdHByaXZhdGUgbnVtYmVyRm9ybWF0OiBJbnRsLk51bWJlckZvcm1hdDtcblxuXHQvKipcblx0ICogQHBhcmFtIG51bWJlckZvcm1hdCBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgSW50bC5OdW1iZXJGb3JtYXR9IHRvIHVzZSB0b1xuXHQgKiBmb3JtYXQgdGhlIHNjYWxlZCB2YWx1ZS5cblx0ICovXG5cdGNvbnN0cnVjdG9yKG51bWJlckZvcm1hdDogSW50bC5OdW1iZXJGb3JtYXQpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMubnVtYmVyRm9ybWF0ID0gbnVtYmVyRm9ybWF0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNjYWxlcyB0aGUgcGFzc2VkIHJhdyB2YWx1ZSAoaW4gYSBiYXNlIHVuaXQpIHRvIGFuIGFwcHJvcHJpYXRlIHZhbHVlIGZvclxuXHQgKiBwcmVzZW50YXRpb24gYW5kIHJldHVybnMgdGhlIHNjYWxlZCB2YWx1ZSBhcyB3ZWxsIGFzIHRoZSBuYW1lIG9mIHRoZSB1bml0XG5cdCAqIHRoYXQgdGhlIHJldHVybmVkIHZhbHVlIGlzIGluLlxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIGJlIHNjYWxlZC5cblx0ICpcblx0ICogQHJldHVybnMge251bWJlcixzdHJpbmd9IGFuIGFycmF5LWxpa2UgY29udGFpbmluZyB0aGUgbnVtZXJpY2FsIHZhbHVlIGFuZFxuXHQgKiB0aGUgbmFtZSBvZiB0aGUgdW5pdCB0aGF0IHRoZSB2YWx1ZSByZXByZXNlbnRzLlxuXHQgKi9cblx0cHJvdGVjdGVkIGFic3RyYWN0IHNjYWxlKHZhbHVlOiBudW1iZXIpOiBbbnVtYmVyLCBzdHJpbmddO1xuXG5cdHB1YmxpYyBmb3JtYXQodmFsdWU6IG51bWJlcik6IHN0cmluZyB7XG5cdFx0bGV0IFtzY2FsZWRWYWx1ZSwgc2NhbGVkVW5pdF0gPSB0aGlzLnNjYWxlKHZhbHVlKTtcblx0XHRyZXR1cm4gYCR7dGhpcy5udW1iZXJGb3JtYXQuZm9ybWF0KHNjYWxlZFZhbHVlKX0gJHtzY2FsZWRVbml0fWBcblx0fVxuXG59XG5cbi8qKlxuICoge0BsaW5rIEJ5dGVzRm9ybWF0dGVyfSBmb3JtYXRzIHZhbHVlcyB0aGF0IHJlcHJlc2VudCBhIHNpemUgaW4gYnl0ZXMgYXMgYVxuICogdmFsdWUgaW4gYnl0ZXMsIGtpbG9ieXRlcywgbWVnYWJ5dGVzLCBnaWdhYnl0ZXMsIGV0Yy5cbiAqL1xuY2xhc3MgQnl0ZXNGb3JtYXR0ZXIgZXh0ZW5kcyBTY2FsaW5nVW5pdEZvcm1hdHRlciB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoSW50bC5OdW1iZXJGb3JtYXQoJ2VuLVVTJywgeyBzdHlsZTogJ2RlY2ltYWwnLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMiB9KSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgc2NhbGUodmFsdWU6IG51bWJlcilcdDogW251bWJlciwgc3RyaW5nXSB7XG5cdFx0bGV0IHVuaXRzID0gW1wiYnl0ZXNcIiwgXCJLQlwiLCBcIk1CXCIsIFwiR0JcIiwgXCJUQlwiLCBcIlBCXCJdXG5cdFx0d2hpbGUgKHZhbHVlID4gMTAyNCAmJiB1bml0cy5sZW5ndGggPiAwKSB7XG5cdFx0XHR2YWx1ZSA9IHZhbHVlIC8gMTAyNFxuXHRcdFx0dW5pdHMuc2hpZnQoKTtcblx0XHR9XG5cdFx0cmV0dXJuIFt2YWx1ZSwgdW5pdHNbMF1dO1xuXHR9XG59XG5cbi8qKlxuICoge0BsaW5rIFN0YXRpc3RpY1ZpZXd9IGlzIHJlc3BvbnNpYmxlIGZvciBtYWludGFpbmluZyB0aGUgRE9NIHJlcHJlc2VudGF0aW9uXG4gKiBvZiBhIGdpdmVuIHN0YXRpc3RpYy5cbiAqL1xuY2xhc3MgU3RhdGlzdGljVmlldyB7XG5cblx0LyoqIFJvb3Qgbm9kZSBmb3IgdGhlIHtAbGluayBTdGF0aXN0aWNWaWV3fS4gKi9cblx0cHJpdmF0ZSBjb250YWluZXJFbDogSFRNTEVsZW1lbnQ7XG5cblx0LyoqIEZvcm1hdHRlciB0aGF0IGV4dHJhY3RzIGFuZCBmb3JtYXRzIGEgdmFsdWUgZnJvbSBhIHtAbGluayBTdGF0aXN0aWNzfSBpbnN0YW5jZS4gKi9cblx0cHJpdmF0ZSBmb3JtYXR0ZXI6IChzOiBWYXVsdE1ldHJpY3MpID0+IHN0cmluZztcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3IuXG5cdCAqXG5cdCAqIEBwYXJhbSBjb250YWluZXJFbCBUaGUgcGFyZW50IGVsZW1lbnQgZm9yIHRoZSB2aWV3LlxuXHQgKi9cblx0Y29uc3RydWN0b3IoY29udGFpbmVyRWw6IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy5jb250YWluZXJFbCA9IGNvbnRhaW5lckVsLmNyZWF0ZVNwYW4oe2NsczogW1wib2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbVwiXX0pO1xuXHRcdHRoaXMuc2V0QWN0aXZlKGZhbHNlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSBuYW1lIG9mIHRoZSBzdGF0aXN0aWMuXG5cdCAqL1xuXHRzZXRTdGF0aXN0aWNOYW1lKG5hbWU6IHN0cmluZyk6IFN0YXRpc3RpY1ZpZXcge1xuXHRcdHRoaXMuY29udGFpbmVyRWwuYWRkQ2xhc3MoYG9ic2lkaWFuLXZhdWx0LXN0YXRpc3RpY3MtLWl0ZW0tJHtuYW1lfWApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIGZvcm1hdHRlciB0byB1c2UgdG8gcHJvZHVjZSB0aGUgY29udGVudCBvZiB0aGUgdmlldy5cblx0ICovXG5cdHNldEZvcm1hdHRlcihmb3JtYXR0ZXI6IChzOiBWYXVsdE1ldHJpY3MpID0+IHN0cmluZyk6IFN0YXRpc3RpY1ZpZXcge1xuXHRcdHRoaXMuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHZpZXcgd2l0aCB0aGUgZGVzaXJlZCBhY3RpdmUgc3RhdHVzLlxuXHQgKlxuXHQgKiBBY3RpdmUgdmlld3MgaGF2ZSB0aGUgQ1NTIGNsYXNzIGBvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLWFjdGl2ZWBcblx0ICogYXBwbGllZCwgaW5hY3RpdmUgdmlld3MgaGF2ZSB0aGUgQ1NTIGNsYXNzXG5cdCAqIGBvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLWluYWN0aXZlYCBhcHBsaWVkLiBUaGVzZSBjbGFzc2VzIGFyZVxuXHQgKiBtdXR1YWxseSBleGNsdXNpdmUuXG5cdCAqL1xuXHRzZXRBY3RpdmUoaXNBY3RpdmU6IGJvb2xlYW4pOiBTdGF0aXN0aWNWaWV3IHtcblx0XHR0aGlzLmNvbnRhaW5lckVsLnJlbW92ZUNsYXNzKFwib2JzaWRpYW4tdmF1bHQtc3RhdGlzdGljcy0taXRlbS0tYWN0aXZlXCIpO1xuXHRcdHRoaXMuY29udGFpbmVyRWwucmVtb3ZlQ2xhc3MoXCJvYnNpZGlhbi12YXVsdC1zdGF0aXN0aWNzLS1pdGVtLS1pbmFjdGl2ZVwiKTtcblxuXHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0dGhpcy5jb250YWluZXJFbC5hZGRDbGFzcyhcIm9ic2lkaWFuLXZhdWx0LXN0YXRpc3RpY3MtLWl0ZW0tLWFjdGl2ZVwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb250YWluZXJFbC5hZGRDbGFzcyhcIm9ic2lkaWFuLXZhdWx0LXN0YXRpc3RpY3MtLWl0ZW0tLWluYWN0aXZlXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlZnJlc2hlcyB0aGUgY29udGVudCBvZiB0aGUgdmlldyB3aXRoIGNvbnRlbnQgZnJvbSB0aGUgcGFzc2VkIHtAbGlua1xuXHQgKiBTdGF0aXN0aWNzfS5cblx0ICovXG5cdHJlZnJlc2goczogVmF1bHRNZXRyaWNzKSB7XG5cdFx0dGhpcy5jb250YWluZXJFbC5zZXRUZXh0KHRoaXMuZm9ybWF0dGVyKHMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB0ZXh0IGNvbnRlbnQgb2YgdGhlIHZpZXcuXG5cdCAqL1xuXHRnZXRUZXh0KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbmVyRWwuZ2V0VGV4dCgpO1xuXHR9XG59XG5cbmludGVyZmFjZSBWYXVsdE1ldHJpY3Mge1xuXHRmaWxlczogbnVtYmVyO1xuXHRub3RlczogbnVtYmVyO1xuXHRhdHRhY2htZW50czogbnVtYmVyO1xuXHRzaXplOiBudW1iZXI7XG5cdGxpbmtzOiBudW1iZXI7XG5cdHdvcmRzOiBudW1iZXI7XG59XG5cbmNsYXNzIFZhdWx0TWV0cmljcyBleHRlbmRzIEV2ZW50cyBpbXBsZW1lbnRzIFZhdWx0TWV0cmljcyB7XG5cblx0ZmlsZXM6IG51bWJlciA9IDA7XG5cdG5vdGVzOiBudW1iZXIgPSAwO1xuXHRhdHRhY2htZW50czogbnVtYmVyID0gMDtcblx0c2l6ZTogbnVtYmVyID0gMDtcblx0bGlua3M6IG51bWJlciA9IDA7XG5cdHdvcmRzOiBudW1iZXIgPSAwO1xuXG5cdHB1YmxpYyByZXNldCgpIHtcblx0XHR0aGlzLmZpbGVzID0gMDtcblx0XHR0aGlzLm5vdGVzID0gMDtcblx0XHR0aGlzLmF0dGFjaG1lbnRzID0gMDtcblx0XHR0aGlzLnNpemUgPSAwO1xuXHRcdHRoaXMubGlua3MgPSAwO1xuXHRcdHRoaXMud29yZHMgPSAwO1xuXHR9XG5cblx0cHVibGljIGRlYyhtZXRyaWNzOiBWYXVsdE1ldHJpY3MpIHtcblx0XHR0aGlzLmZpbGVzIC09IG1ldHJpY3M/LmZpbGVzIHx8IDA7XG5cdFx0dGhpcy5ub3RlcyAtPSBtZXRyaWNzPy5ub3RlcyB8fCAwO1xuXHRcdHRoaXMuYXR0YWNobWVudHMgLT0gbWV0cmljcz8uYXR0YWNobWVudHMgfHwgMDtcblx0XHR0aGlzLnNpemUgLT0gbWV0cmljcz8uc2l6ZSB8fCAwO1xuXHRcdHRoaXMubGlua3MgLT0gbWV0cmljcz8ubGlua3MgfHwgMDtcblx0XHR0aGlzLndvcmRzIC09IG1ldHJpY3M/LndvcmRzIHx8IDA7XG5cdFx0dGhpcy50cmlnZ2VyKFwidXBkYXRlZFwiKTtcblx0fVxuXG5cdHB1YmxpYyBpbmMobWV0cmljczogVmF1bHRNZXRyaWNzKSB7XG5cdFx0dGhpcy5maWxlcyArPSBtZXRyaWNzPy5maWxlcyB8fCAwO1xuXHRcdHRoaXMubm90ZXMgKz0gbWV0cmljcz8ubm90ZXMgfHwgMDtcblx0XHR0aGlzLmF0dGFjaG1lbnRzICs9IG1ldHJpY3M/LmF0dGFjaG1lbnRzIHx8IDA7XG5cdFx0dGhpcy5zaXplICs9IG1ldHJpY3M/LnNpemUgfHwgMDtcblx0XHR0aGlzLmxpbmtzICs9IG1ldHJpY3M/LmxpbmtzIHx8IDA7XG5cdFx0dGhpcy53b3JkcyArPSBtZXRyaWNzPy53b3JkcyB8fCAwO1xuXHRcdHRoaXMudHJpZ2dlcihcInVwZGF0ZWRcIik7XG5cdH1cblxuXHRwdWJsaWMgb24obmFtZTogXCJ1cGRhdGVkXCIsIGNhbGxiYWNrOiAodmF1bHRNZXRyaWNzOiBWYXVsdE1ldHJpY3MpID0+IGFueSwgY3R4PzogYW55KTogRXZlbnRSZWYge1xuXHRcdHJldHVybiBzdXBlci5vbihcInVwZGF0ZWRcIiwgY2FsbGJhY2ssIGN0eCk7XG5cdH1cblxufVxuXG5lbnVtIEZpbGVUeXBlIHtcblx0VW5rbm93biA9IDAsXG5cdE5vdGUsXG5cdEF0dGFjaG1lbnQsXG59XG5cbmludGVyZmFjZSBUb2tlbml6ZXIge1xuXHR0b2tlbml6ZShjb250ZW50OiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+O1xufVxuXG4vKipcbiAqIFRoZSB7QGxpbmsgVW5pdFRva2VuaXplcn0gaXMgYSBjb25zdGFudCB0b2tlbml6ZXIgdGhhdCBhbHdheXMgcmV0dXJucyBhblxuICogZW1wdHkgbGlzdC5cbiAqL1xuY2xhc3MgVW5pdFRva2VuaXplciBpbXBsZW1lbnRzIFRva2VuaXplciB7XG5cdHB1YmxpYyB0b2tlbml6ZShfOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcblx0XHRyZXR1cm4gW107XG5cdH1cbn1cblxuLyoqXG4gKiB7QGxpbmsgTWFya2Rvd25Ub2tlbml6ZXJ9IHVuZGVyc3RhbmRzIGhvdyB0byB0b2tlbml6ZSBtYXJrZG93biB0ZXh0IGludG8gd29yZFxuICogdG9rZW5zLlxuICovXG5jbGFzcyBNYXJrZG93blRva2VuaXplciBpbXBsZW1lbnRzIFRva2VuaXplciB7XG5cblx0cHVibGljIHRva2VuaXplKGNvbnRlbnQ6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xuXHRcdGlmIChjb250ZW50LnRyaW0oKSA9PT0gXCJcIikge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBXT1JEX0JPVU5EQVJZID0gL1sgXFxuXFxyXFx0XFxcIlxcfCxcXChcXClcXFtcXF1dKy87XG5cdFx0XHRjb25zdCBOT05fV09SRFMgPSAvXlxcVyskLztcblx0XHRcdGNvbnN0IE5VTUJFUiA9IC9eXFxkKyhcXC5cXGQrKT8kLztcblx0XHRcdGNvbnN0IENPREVfQkxPQ0tfSEVBREVSID0gL15gYGBcXHcrJC87XG5cdFx0XHRjb25zdCBTVFJJUF9ISUdITElHSFRTID0gL14oPT0pPyguKj8pKD09KT8kLztcblx0XHRcdGNvbnN0IFNUUklQX0ZPUk1BVFRJTkcgPSAvXihfK3xcXCorKT8oLio/KShfK3xcXCorKT8kLztcblx0XHRcdGNvbnN0IFNUUklQX1BVTkNUVUFUSU9OID0gL14oXCJ8YCk/KC4qPykoYHxcXC58OnxcInwsKT8kLztcblx0XHRcdGNvbnN0IFNUUklQX1dJS0lfTElOS1MgPSAvXihcXFtcXFspPyguKj8pKFxcXVxcXSk/JC87XG5cblx0XHRcdC8vIFRPRE86IFNwbGl0IG9uIC8gaW4gdG9rZW4gdG8gdHJlYXQgdG9rZW5zIHN1Y2ggYXMgXCJ0cnkvY2F0Y2hcIiBhcyAyIHdvcmRzLlxuXHRcdCAgICAvLyBUT0RPOiBTdHJpcCBmb3JtYXR0aW5nIHN5bWJvbHMgZnJvbSB0aGUgc3RhcnQvZW5kIG9mIHRva2VucyAoZS5nLiAqLCAqKiwgX18sIGV0YylcblxuXHRcdFx0bGV0IHdvcmRzID0gY29udGVudC5cblx0XHRcdFx0c3BsaXQoV09SRF9CT1VOREFSWSkuXG5cdFx0XHRcdGZpbHRlcih3b3JkID0+ICFOT05fV09SRFMuZXhlYyh3b3JkKSkuXG5cdFx0XHRcdGZpbHRlcih3b3JkID0+ICFOVU1CRVIuZXhlYyh3b3JkKSkuXG5cdFx0XHRcdGZpbHRlcih3b3JkID0+ICFDT0RFX0JMT0NLX0hFQURFUi5leGVjKHdvcmQpKS5cblx0XHRcdFx0bWFwKHdvcmQgPT4gU1RSSVBfSElHSExJR0hUUy5leGVjKHdvcmQpWzJdKS5cblx0XHRcdFx0bWFwKHdvcmQgPT4gU1RSSVBfRk9STUFUVElORy5leGVjKHdvcmQpWzJdKS5cblx0XHRcdFx0bWFwKHdvcmQgPT4gU1RSSVBfUFVOQ1RVQVRJT04uZXhlYyh3b3JkKVsyXSkuXG5cdFx0XHRcdG1hcCh3b3JkID0+IFNUUklQX1dJS0lfTElOS1MuZXhlYyh3b3JkKVsyXSkuXG5cdFx0XHRcdGZpbHRlcih3b3JkID0+IHdvcmQubGVuZ3RoID4gMCk7XG5cblx0XHRcdC8vIGNvbnNvbGUubG9nKHdvcmRzKTtcblx0XHRcdHJldHVybiB3b3Jkcztcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgdW5pdFRva2VuaXplciA9IG5ldyBVbml0VG9rZW5pemVyKCk7XG5jb25zdCBtYXJrZG93blRva2VuaXplciA9IG5ldyBNYXJrZG93blRva2VuaXplcjtcbmNvbnN0IHRva2VuaXplcnMgPSBuZXcgTWFwKFtcblx0W1wicGFyYWdyYXBoXCIsIG1hcmtkb3duVG9rZW5pemVyXSxcblx0W1wiaGVhZGluZ1wiLCBtYXJrZG93blRva2VuaXplcl0sXG5cdFtcImxpc3RcIiwgbWFya2Rvd25Ub2tlbml6ZXJdLFxuXHRbXCJ0YWJsZVwiLCB1bml0VG9rZW5pemVyXSxcblx0W1wieWFtbFwiLCB1bml0VG9rZW5pemVyXSxcblx0W1wiY29kZVwiLCB1bml0VG9rZW5pemVyXSxcblx0W1wiYmxvY2txdW90ZVwiLCBtYXJrZG93blRva2VuaXplcl0sXG5cdFtcIm1hdGhcIiwgdW5pdFRva2VuaXplcl0sXG5cdFtcInRoZW1hdGljQnJlYWtcIiwgdW5pdFRva2VuaXplcl0sXG5cdFtcImh0bWxcIiwgdW5pdFRva2VuaXplcl0sXG5cdFtcInRleHRcIiwgdW5pdFRva2VuaXplcl0sXG5cdFtcImVsZW1lbnRcIiwgdW5pdFRva2VuaXplcl0sXG5cdFtcImZvb3Rub3RlRGVmaW5pdGlvblwiLCB1bml0VG9rZW5pemVyXSxcblx0W1wiZGVmaW5pdGlvblwiLCB1bml0VG9rZW5pemVyXSxcbl0pO1xuXG5jbGFzcyBGaWxlTWV0cmljc0NvbGxlY3RvciB7XG5cblx0cHJpdmF0ZSBvd25lcjogQ29tcG9uZW50O1xuXHRwcml2YXRlIHZhdWx0OiBWYXVsdDtcbiAgICBwcml2YXRlIG1ldGFkYXRhQ2FjaGU6IE1ldGFkYXRhQ2FjaGU7XG5cdHByaXZhdGUgZGF0YTogTWFwPHN0cmluZywgVmF1bHRNZXRyaWNzPiA9IG5ldyBNYXAoKTtcblx0cHJpdmF0ZSBiYWNrbG9nOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5KCk7XG5cdHByaXZhdGUgdmF1bHRNZXRyaWNzOiBWYXVsdE1ldHJpY3MgPSBuZXcgVmF1bHRNZXRyaWNzKCk7XG5cdHByaXZhdGUgdG9rZW5pemVyOiBUb2tlbml6ZXIgPSBuZXcgTWFya2Rvd25Ub2tlbml6ZXIoKTtcblxuXHRjb25zdHJ1Y3Rvcihvd25lcjogUGx1Z2luKSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXHR9XG5cblx0cHVibGljIHNldFZhdWx0KHZhdWx0OiBWYXVsdCkge1xuXHRcdHRoaXMudmF1bHQgPSB2YXVsdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHB1YmxpYyBzZXRNZXRhZGF0YUNhY2hlKG1ldGFkYXRhQ2FjaGU6IE1ldGFkYXRhQ2FjaGUpIHtcblx0XHR0aGlzLm1ldGFkYXRhQ2FjaGUgPSBtZXRhZGF0YUNhY2hlO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHNldFZhdWx0TWV0cmljcyh2YXVsdE1ldHJpY3M6IFZhdWx0TWV0cmljcykge1xuXHRcdHRoaXMudmF1bHRNZXRyaWNzID0gdmF1bHRNZXRyaWNzO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cHVibGljIHN0YXJ0KCkge1xuXHRcdHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLnZhdWx0Lm9uKFwiY3JlYXRlXCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZWNyZWF0ZWQoZmlsZSkgfSkpO1xuXHRcdHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLnZhdWx0Lm9uKFwibW9kaWZ5XCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZW1vZGlmaWVkKGZpbGUpIH0pKTtcblx0XHR0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy52YXVsdC5vbihcImRlbGV0ZVwiLCAoZmlsZTogVEZpbGUpID0+IHsgdGhpcy5vbmZpbGVkZWxldGVkKGZpbGUpIH0pKTtcblx0XHR0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy52YXVsdC5vbihcInJlbmFtZVwiLCAoZmlsZTogVEZpbGUsIG9sZFBhdGg6IHN0cmluZykgPT4geyB0aGlzLm9uZmlsZXJlbmFtZWQoZmlsZSwgb2xkUGF0aCkgfSkpO1xuXHRcdHRoaXMub3duZXIucmVnaXN0ZXJFdmVudCh0aGlzLm1ldGFkYXRhQ2FjaGUub24oXCJyZXNvbHZlXCIsIChmaWxlOiBURmlsZSkgPT4geyB0aGlzLm9uZmlsZW1vZGlmaWVkKGZpbGUpIH0pKTtcblx0XHR0aGlzLm93bmVyLnJlZ2lzdGVyRXZlbnQodGhpcy5tZXRhZGF0YUNhY2hlLm9uKFwiY2hhbmdlZFwiLCAoZmlsZTogVEZpbGUpID0+IHsgdGhpcy5vbmZpbGVtb2RpZmllZChmaWxlKSB9KSk7XG5cblx0XHR0aGlzLmRhdGEuY2xlYXIoKTtcblx0XHR0aGlzLmJhY2tsb2cgPSBuZXcgQXJyYXkoKTtcblx0XHR0aGlzLnZhdWx0TWV0cmljcz8ucmVzZXQoKTtcblx0XHR0aGlzLnZhdWx0LmdldEZpbGVzKCkuZm9yRWFjaCgoZmlsZTogVEZpbGUpID0+IHtcblx0XHRcdGlmICghKGZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSkge1xuXHRcdFx0XHR0aGlzLnB1c2goZmlsZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vd25lci5yZWdpc3RlckludGVydmFsKCtzZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMucHJvY2Vzc0JhY2tsb2coKSB9LCAyMDAwKSk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByaXZhdGUgcHVzaChmaWxlT3JQYXRoOiBURmlsZXxzdHJpbmcpIHtcblx0XHRpZiAoZmlsZU9yUGF0aCBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRsZXQgcGF0aCA9IChmaWxlT3JQYXRoIGluc3RhbmNlb2YgVEZpbGUpID8gZmlsZU9yUGF0aC5wYXRoIDogZmlsZU9yUGF0aDtcblx0XHRpZiAoIXRoaXMuYmFja2xvZy5jb250YWlucyhwYXRoKSkge1xuXHRcdFx0dGhpcy5iYWNrbG9nLnB1c2gocGF0aCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBwcm9jZXNzQmFja2xvZygpIHtcblx0XHR3aGlsZSAodGhpcy5iYWNrbG9nLmxlbmd0aCA+IDApIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5iYWNrbG9nLnNoaWZ0KCk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhgcHJvY2Vzc2luZyAke3BhdGh9YCk7XG5cdFx0XHRsZXQgZmlsZSA9IHRoaXMudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhdGgpIGFzIFRGaWxlO1xuXHRcdFx0Ly8gY29uc29sZS5sb2coYHBhdGggPSAke3BhdGh9OyBmaWxlID0gJHtmaWxlfWApO1xuXHRcdFx0bGV0IG1ldHJpY3MgPSBhd2FpdCB0aGlzLmNvbGxlY3QoZmlsZSk7XG5cdFx0XHR0aGlzLnVwZGF0ZShwYXRoLCBtZXRyaWNzKTtcblx0XHR9XG5cdFx0Ly8gY29uc29sZS5sb2coXCJkb25lXCIpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBvbmZpbGVjcmVhdGVkKGZpbGU6IFRGaWxlKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coYG9uZmlsZWNyZWF0ZWQoJHtmaWxlPy5wYXRofSlgKTtcblx0XHR0aGlzLnB1c2goZmlsZSk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG9uZmlsZW1vZGlmaWVkKGZpbGU6IFRGaWxlKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coYG9uZmlsZW1vZGlmaWVkKCR7ZmlsZT8ucGF0aH0pYClcblx0XHR0aGlzLnB1c2goZmlsZSk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIG9uZmlsZWRlbGV0ZWQoZmlsZTogVEZpbGUpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhgb25maWxlZGVsZXRlZCgke2ZpbGU/LnBhdGh9KWApXG5cdFx0dGhpcy5wdXNoKGZpbGUpO1xuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBvbmZpbGVyZW5hbWVkKGZpbGU6IFRGaWxlLCBvbGRQYXRoOiBzdHJpbmcpIHtcblx0XHQvLyBjb25zb2xlLmxvZyhgb25maWxlcmVuYW1lZCgke2ZpbGU/LnBhdGh9KWApXG5cdFx0dGhpcy5wdXNoKGZpbGUpO1xuXHRcdHRoaXMucHVzaChvbGRQYXRoKTtcblx0fVxuXG5cdHByaXZhdGUgZ2V0V29yZENvdW50KGNvbnRlbnQ6IHN0cmluZyk6IG51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMudG9rZW5pemVyLnRva2VuaXplKGNvbnRlbnQpLmxlbmd0aDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0RmlsZVR5cGUoZmlsZTogVEZpbGUpIDogRmlsZVR5cGUge1xuXHRcdGlmIChmaWxlLmV4dGVuc2lvbj8udG9Mb3dlckNhc2UoKSA9PT0gXCJtZFwiKSB7XG5cdFx0XHRyZXR1cm4gRmlsZVR5cGUuTm90ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIEZpbGVUeXBlLkF0dGFjaG1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGFzeW5jIGNvbGxlY3QoZmlsZTogVEZpbGUpOiBQcm9taXNlPFZhdWx0TWV0cmljcz4ge1xuXHRcdGxldCBtZXRhZGF0YTogQ2FjaGVkTWV0YWRhdGEgPSB0aGlzLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXG5cdFx0aWYgKG1ldGFkYXRhID09IG51bGwpIHtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG5cdFx0fVxuXG5cdFx0bGV0IG1ldHJpY3MgPSBuZXcgVmF1bHRNZXRyaWNzKCk7XG5cblx0XHRzd2l0Y2ggKHRoaXMuZ2V0RmlsZVR5cGUoZmlsZSkpIHtcblx0XHRcdGNhc2UgRmlsZVR5cGUuTm90ZTpcblx0XHRcdFx0bWV0cmljcy5maWxlcyA9IDE7XG5cdFx0XHRcdG1ldHJpY3Mubm90ZXMgPSAxO1xuXHRcdFx0XHRtZXRyaWNzLmF0dGFjaG1lbnRzID0gMDtcblx0XHRcdFx0bWV0cmljcy5zaXplID0gZmlsZS5zdGF0Py5zaXplO1xuXHRcdFx0XHRtZXRyaWNzLmxpbmtzID0gbWV0YWRhdGE/LmxpbmtzPy5sZW5ndGggfHwgMDtcblx0XHRcdFx0bWV0cmljcy53b3JkcyA9IDA7XG5cdFx0XHRcdG1ldHJpY3Mud29yZHMgPSBhd2FpdCB0aGlzLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSkudGhlbigoY29udGVudDogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG1ldGFkYXRhLnNlY3Rpb25zPy5tYXAoc2VjdGlvbiA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzZWN0aW9uVHlwZSA9IHNlY3Rpb24udHlwZTtcblx0XHRcdFx0XHRcdGNvbnN0IHN0YXJ0T2Zmc2V0ID0gc2VjdGlvbi5wb3NpdGlvbj8uc3RhcnQ/Lm9mZnNldDtcblx0XHRcdFx0XHRcdGNvbnN0IGVuZE9mZnNldCA9IHNlY3Rpb24ucG9zaXRpb24/LmVuZD8ub2Zmc2V0O1xuXHRcdFx0XHRcdFx0Y29uc3QgdG9rZW5pemVyID0gdG9rZW5pemVycy5nZXQoc2VjdGlvblR5cGUpO1xuXHRcdFx0XHRcdFx0Y29uc3QgdG9rZW5zID0gdG9rZW5pemVyLnRva2VuaXplKGNvbnRlbnQuc3Vic3RyaW5nKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpKTtcblx0XHRcdFx0XHRcdHJldHVybiB0b2tlbnMubGVuZ3RoO1xuXHRcdFx0XHRcdH0pLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApO1xuXHRcdFx0XHR9KS5jYXRjaCgoZSkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGAke2ZpbGUucGF0aH0gJHtlfWApO1xuXHRcdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIEZpbGVUeXBlLkF0dGFjaG1lbnQ6XG5cdFx0XHRcdG1ldHJpY3MuZmlsZXMgPSAxO1xuXHRcdFx0XHRtZXRyaWNzLm5vdGVzID0gMDtcblx0XHRcdFx0bWV0cmljcy5hdHRhY2htZW50cyA9IDE7XG5cdFx0XHRcdG1ldHJpY3Muc2l6ZSA9IGZpbGUuc3RhdD8uc2l6ZTtcblx0XHRcdFx0bWV0cmljcy5saW5rcyA9IDA7XG5cdFx0XHRcdG1ldHJpY3Mud29yZHMgPSAwO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gbWV0cmljcztcblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoZmlsZU9yUGF0aDogVEZpbGV8c3RyaW5nLCBtZXRyaWNzOiBWYXVsdE1ldHJpY3MpIHtcblx0XHRsZXQga2V5ID0gKGZpbGVPclBhdGggaW5zdGFuY2VvZiBURmlsZSkgPyBmaWxlT3JQYXRoLnBhdGggOiBmaWxlT3JQYXRoO1xuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBleGlzdGluZyB2YWx1ZXMgZm9yIHRoZSBwYXNzZWQgZmlsZSBpZiBwcmVzZW50LCB1cGRhdGUgdGhlXG5cdFx0Ly8gcmF3IHZhbHVlcywgdGhlbiBhZGQgdGhlIHZhbHVlcyBmb3IgdGhlIHBhc3NlZCBmaWxlIHRvIHRoZSB0b3RhbHMuXG5cdFx0dGhpcy52YXVsdE1ldHJpY3M/LmRlYyh0aGlzLmRhdGEuZ2V0KGtleSkpO1xuXG5cdFx0aWYgKG1ldHJpY3MgPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5kYXRhLmRlbGV0ZShrZXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmRhdGEuc2V0KGtleSwgbWV0cmljcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy52YXVsdE1ldHJpY3M/LmluYyhtZXRyaWNzKTtcblx0fVxuXG59XG5cbmNsYXNzIFN0YXRpc3RpY3NTdGF0dXNCYXJJdGVtIHtcblxuXHRwcml2YXRlIG93bmVyOiBDb21wb25lbnQ7XG5cblx0Ly8gaGFuZGxlIG9mIHRoZSBzdGF0dXMgYmFyIGl0ZW0gdG8gZHJhdyBpbnRvLlxuXHRwcml2YXRlIHN0YXR1c0Jhckl0ZW06IEhUTUxFbGVtZW50O1xuXG5cdC8vIHJhdyBzdGF0c1xuXHRwcml2YXRlIHZhdWx0TWV0cmljczogVmF1bHRNZXRyaWNzO1xuXG5cdC8vIGluZGV4IG9mIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHN0YXQuXG5cdHByaXZhdGUgZGlzcGxheWVkU3RhdGlzdGljSW5kZXggPSAwO1xuXG5cdHByaXZhdGUgc3RhdGlzdGljVmlld3M6IEFycmF5PFN0YXRpc3RpY1ZpZXc+ID0gW107XG5cblx0Y29uc3RydWN0b3IgKG93bmVyOiBQbHVnaW4sIHN0YXR1c0Jhckl0ZW06IEhUTUxFbGVtZW50KSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXHRcdHRoaXMuc3RhdHVzQmFySXRlbSA9IHN0YXR1c0Jhckl0ZW07XG5cblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJub3Rlc1wiKS5cblx0XHRcdHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7cmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcIm5vdGVzXCIpLmZvcm1hdChzLm5vdGVzKX0pKTtcblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJhdHRhY2htZW50c1wiKS5cblx0XHRcdHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7cmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcImF0dGFjaG1lbnRzXCIpLmZvcm1hdChzLmF0dGFjaG1lbnRzKX0pKTtcblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJmaWxlc1wiKS5cblx0XHRcdHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7cmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcImZpbGVzXCIpLmZvcm1hdChzLmZpbGVzKX0pKTtcblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJsaW5rc1wiKS5cblx0XHRcdHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7cmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcImxpbmtzXCIpLmZvcm1hdChzLmxpbmtzKX0pKTtcblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJ3b3Jkc1wiKS5cblx0XHRcdHNldEZvcm1hdHRlcigoczogVmF1bHRNZXRyaWNzKSA9PiB7cmV0dXJuIG5ldyBEZWNpbWFsVW5pdEZvcm1hdHRlcihcIndvcmRzXCIpLmZvcm1hdChzLndvcmRzKX0pKTtcblx0XHR0aGlzLnN0YXRpc3RpY1ZpZXdzLnB1c2gobmV3IFN0YXRpc3RpY1ZpZXcodGhpcy5zdGF0dXNCYXJJdGVtKS5cblx0XHRcdHNldFN0YXRpc3RpY05hbWUoXCJzaXplXCIpLlxuXHRcdFx0c2V0Rm9ybWF0dGVyKChzOiBWYXVsdE1ldHJpY3MpID0+IHtyZXR1cm4gbmV3IEJ5dGVzRm9ybWF0dGVyKCkuZm9ybWF0KHMuc2l6ZSl9KSk7XG5cblx0XHR0aGlzLnN0YXR1c0Jhckl0ZW0ub25DbGlja0V2ZW50KCgpID0+IHsgdGhpcy5vbmNsaWNrKCkgfSk7XG5cdH1cblxuXHRwdWJsaWMgc2V0VmF1bHRNZXRyaWNzKHZhdWx0TWV0cmljczogVmF1bHRNZXRyaWNzKSB7XG5cdFx0dGhpcy52YXVsdE1ldHJpY3MgPSB2YXVsdE1ldHJpY3M7XG5cdFx0dGhpcy5vd25lci5yZWdpc3RlckV2ZW50KHRoaXMudmF1bHRNZXRyaWNzPy5vbihcInVwZGF0ZWRcIiwgdGhpcy5yZWZyZXNoU29vbikpO1xuXHRcdHRoaXMucmVmcmVzaFNvb24oKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHByaXZhdGUgcmVmcmVzaFNvb24gPSBkZWJvdW5jZSgoKSA9PiB7IHRoaXMucmVmcmVzaCgpOyB9LCAyMDAwLCBmYWxzZSk7XG5cblx0cHJpdmF0ZSByZWZyZXNoKCkge1xuXHRcdHRoaXMuc3RhdGlzdGljVmlld3MuZm9yRWFjaCgodmlldywgaSkgPT4ge1xuXHRcdFx0dmlldy5zZXRBY3RpdmUodGhpcy5kaXNwbGF5ZWRTdGF0aXN0aWNJbmRleCA9PSBpKS5yZWZyZXNoKHRoaXMudmF1bHRNZXRyaWNzKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuc3RhdHVzQmFySXRlbS50aXRsZSA9IHRoaXMuc3RhdGlzdGljVmlld3MubWFwKHZpZXcgPT4gdmlldy5nZXRUZXh0KCkpLmpvaW4oXCJcXG5cIik7XG5cdH1cblxuXHRwcml2YXRlIG9uY2xpY2soKSB7XG5cdFx0dGhpcy5kaXNwbGF5ZWRTdGF0aXN0aWNJbmRleCA9ICh0aGlzLmRpc3BsYXllZFN0YXRpc3RpY0luZGV4ICsgMSkgJSB0aGlzLnN0YXRpc3RpY1ZpZXdzLmxlbmd0aDtcblx0XHR0aGlzLnJlZnJlc2goKTtcblx0fVxufVxuIl0sIm5hbWVzIjpbIlBsdWdpbiIsIkV2ZW50cyIsIlRGb2xkZXIiLCJURmlsZSIsImRlYm91bmNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENB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YSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN6QixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLGFBQWEsQ0FBQztZQUMvQixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN6QixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN6QixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLE9BQU8sQ0FBQztZQUN6QixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQzdELGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUN4QixZQUFZLENBQUMsVUFBQyxDQUFlLElBQU0sT0FBTyxJQUFJLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxjQUFRLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxFQUFFLENBQUMsQ0FBQztLQUMxRDtJQUVNLGlEQUFlLEdBQXRCLFVBQXVCLFlBQTBCOztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0tBQ1o7SUFJTyx5Q0FBTyxHQUFmO1FBQUEsaUJBTUM7UUFMQSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDN0UsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0RjtJQUVPLHlDQUFPLEdBQWY7UUFDQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1FBQy9GLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNmO0lBQ0YsOEJBQUM7QUFBRCxDQUFDOzs7OyJ9
