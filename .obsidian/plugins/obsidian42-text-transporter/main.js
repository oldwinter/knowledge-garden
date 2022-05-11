var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/obsidian-daily-notes-interface/dist/main.js
var require_main = __commonJS({
  "node_modules/obsidian-daily-notes-interface/dist/main.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var obsidian = require("obsidian");
    var DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
    var DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
    var DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";
    function shouldUsePeriodicNotesSettings(periodicity) {
      const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
    }
    function getDailyNoteSettings() {
      try {
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings("daily")) {
          const { format: format4, folder: folder2, template: template2 } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
          return {
            format: format4 || DEFAULT_DAILY_NOTE_FORMAT,
            folder: folder2?.trim() || "",
            template: template2?.trim() || ""
          };
        }
        const { folder, format: format3, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
          format: format3 || DEFAULT_DAILY_NOTE_FORMAT,
          folder: folder?.trim() || "",
          template: template?.trim() || ""
        };
      } catch (err) {
        console.info("No custom daily note settings found!", err);
      }
    }
    function getWeeklyNoteSettings() {
      try {
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings("weekly")) {
          return {
            format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: periodicNotesSettings.folder?.trim() || "",
            template: periodicNotesSettings.template?.trim() || ""
          };
        }
        const settings = calendarSettings || {};
        return {
          format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
          folder: settings.weeklyNoteFolder?.trim() || "",
          template: settings.weeklyNoteTemplate?.trim() || ""
        };
      } catch (err) {
        console.info("No custom weekly note settings found!", err);
      }
    }
    function getMonthlyNoteSettings() {
      const pluginManager = window.app.plugins;
      try {
        const settings = shouldUsePeriodicNotesSettings("monthly") && pluginManager.getPlugin("periodic-notes")?.settings?.monthly || {};
        return {
          format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
          folder: settings.folder?.trim() || "",
          template: settings.template?.trim() || ""
        };
      } catch (err) {
        console.info("No custom monthly note settings found!", err);
      }
    }
    function join(...partSegments) {
      let parts = [];
      for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
      }
      const newParts = [];
      for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        if (!part || part === ".")
          continue;
        else
          newParts.push(part);
      }
      if (parts[0] === "")
        newParts.unshift("");
      return newParts.join("/");
    }
    function basename(fullPath) {
      let base = fullPath.substring(fullPath.lastIndexOf("/") + 1);
      if (base.lastIndexOf(".") != -1)
        base = base.substring(0, base.lastIndexOf("."));
      return base;
    }
    async function ensureFolderExists(path) {
      const dirs = path.replace(/\\/g, "/").split("/");
      dirs.pop();
      if (dirs.length) {
        const dir = join(...dirs);
        if (!window.app.vault.getAbstractFileByPath(dir)) {
          await window.app.vault.createFolder(dir);
        }
      }
    }
    async function getNotePath(directory, filename) {
      if (!filename.endsWith(".md")) {
        filename += ".md";
      }
      const path = obsidian.normalizePath(join(directory, filename));
      await ensureFolderExists(path);
      return path;
    }
    async function getTemplateInfo(template) {
      const { metadataCache, vault } = window.app;
      const templatePath = obsidian.normalizePath(template);
      if (templatePath === "/") {
        return Promise.resolve(["", null]);
      }
      try {
        const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
        const contents = await vault.cachedRead(templateFile);
        const IFoldInfo = window.app.foldManager.load(templateFile);
        return [contents, IFoldInfo];
      } catch (err) {
        console.error(`Failed to read the daily note template '${templatePath}'`, err);
        new obsidian.Notice("Failed to read the daily note template");
        return ["", null];
      }
    }
    function getDateUID(date, granularity = "day") {
      const ts = date.clone().startOf(granularity).format();
      return `${granularity}-${ts}`;
    }
    function removeEscapedCharacters(format3) {
      return format3.replace(/\[[^\]]*\]/g, "");
    }
    function isFormatAmbiguous(format3, granularity) {
      if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters(format3);
        return /w{1,2}/i.test(cleanFormat) && (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat));
      }
      return false;
    }
    function getDateFromFile(file, granularity) {
      return getDateFromFilename(file.basename, granularity);
    }
    function getDateFromPath(path, granularity) {
      return getDateFromFilename(basename(path), granularity);
    }
    function getDateFromFilename(filename, granularity) {
      const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings
      };
      const format3 = getSettings[granularity]().format.split("/").pop();
      const noteDate = window.moment(filename, format3, true);
      if (!noteDate.isValid()) {
        return null;
      }
      if (isFormatAmbiguous(format3, granularity)) {
        if (granularity === "week") {
          const cleanFormat = removeEscapedCharacters(format3);
          if (/w{1,2}/i.test(cleanFormat)) {
            return window.moment(filename, format3.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
          }
        }
      }
      return noteDate;
    }
    var DailyNotesFolderMissingError = class extends Error {
    };
    async function createDailyNote2(date) {
      const app2 = window.app;
      const { vault } = app2;
      const moment2 = window.moment;
      const { template, format: format3, folder } = getDailyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format3);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, moment2().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = moment2();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format3);
        }).replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format3)).replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format3)));
        app2.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getDailyNote2(date, dailyNotes) {
      return dailyNotes[getDateUID(date, "day")] ?? null;
    }
    function getAllDailyNotes2() {
      const { vault } = window.app;
      const { folder } = getDailyNoteSettings();
      const dailyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
      }
      const dailyNotes = {};
      obsidian.Vault.recurseChildren(dailyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "day");
          if (date) {
            const dateString = getDateUID(date, "day");
            dailyNotes[dateString] = note;
          }
        }
      });
      return dailyNotes;
    }
    var WeeklyNotesFolderMissingError = class extends Error {
    };
    function getDaysOfWeek() {
      const { moment: moment2 } = window;
      let weekStart = moment2.localeData()._week.dow;
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];
      while (weekStart) {
        daysOfWeek.push(daysOfWeek.shift());
        weekStart--;
      }
      return daysOfWeek;
    }
    function getDayOfWeekNumericalValue(dayOfWeekName) {
      return getDaysOfWeek().indexOf(dayOfWeekName.toLowerCase());
    }
    async function createWeeklyNote(date) {
      const { vault } = window.app;
      const { template, format: format3, folder } = getWeeklyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format3);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = window.moment();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format3);
        }).replace(/{{\s*title\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
          const day = getDayOfWeekNumericalValue(dayOfWeek);
          return date.weekday(day).format(momentFormat.trim());
        }));
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getWeeklyNote(date, weeklyNotes) {
      return weeklyNotes[getDateUID(date, "week")] ?? null;
    }
    function getAllWeeklyNotes() {
      const weeklyNotes = {};
      if (!appHasWeeklyNotesPluginLoaded()) {
        return weeklyNotes;
      }
      const { vault } = window.app;
      const { folder } = getWeeklyNoteSettings();
      const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
      }
      obsidian.Vault.recurseChildren(weeklyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "week");
          if (date) {
            const dateString = getDateUID(date, "week");
            weeklyNotes[dateString] = note;
          }
        }
      });
      return weeklyNotes;
    }
    var MonthlyNotesFolderMissingError = class extends Error {
    };
    async function createMonthlyNote(date) {
      const { vault } = window.app;
      const { template, format: format3, folder } = getMonthlyNoteSettings();
      const [templateContents, IFoldInfo] = await getTemplateInfo(template);
      const filename = date.format(format3);
      const normalizedPath = await getNotePath(folder, filename);
      try {
        const createdFile = await vault.create(normalizedPath, templateContents.replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
          const now = window.moment();
          const currentDate = date.clone().set({
            hour: now.get("hour"),
            minute: now.get("minute"),
            second: now.get("second")
          });
          if (calc) {
            currentDate.add(parseInt(timeDelta, 10), unit);
          }
          if (momentFormat) {
            return currentDate.format(momentFormat.substring(1).trim());
          }
          return currentDate.format(format3);
        }).replace(/{{\s*date\s*}}/gi, filename).replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm")).replace(/{{\s*title\s*}}/gi, filename));
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
      } catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian.Notice("Unable to create new file.");
      }
    }
    function getMonthlyNote(date, monthlyNotes) {
      return monthlyNotes[getDateUID(date, "month")] ?? null;
    }
    function getAllMonthlyNotes() {
      const monthlyNotes = {};
      if (!appHasMonthlyNotesPluginLoaded()) {
        return monthlyNotes;
      }
      const { vault } = window.app;
      const { folder } = getMonthlyNoteSettings();
      const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian.normalizePath(folder));
      if (!monthlyNotesFolder) {
        throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
      }
      obsidian.Vault.recurseChildren(monthlyNotesFolder, (note) => {
        if (note instanceof obsidian.TFile) {
          const date = getDateFromFile(note, "month");
          if (date) {
            const dateString = getDateUID(date, "month");
            monthlyNotes[dateString] = note;
          }
        }
      });
      return monthlyNotes;
    }
    function appHasDailyNotesPluginLoaded() {
      const { app: app2 } = window;
      const dailyNotesPlugin = app2.internalPlugins.plugins["daily-notes"];
      if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
      }
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.daily?.enabled;
    }
    function appHasWeeklyNotesPluginLoaded() {
      const { app: app2 } = window;
      if (app2.plugins.getPlugin("calendar")) {
        return true;
      }
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.weekly?.enabled;
    }
    function appHasMonthlyNotesPluginLoaded() {
      const { app: app2 } = window;
      const periodicNotes = app2.plugins.getPlugin("periodic-notes");
      return periodicNotes && periodicNotes.settings?.monthly?.enabled;
    }
    function getPeriodicNoteSettings(granularity) {
      const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings
      }[granularity];
      return getSettings();
    }
    function createPeriodicNote(granularity, date) {
      const createFn = {
        day: createDailyNote2,
        month: createMonthlyNote,
        week: createWeeklyNote
      };
      return createFn[granularity](date);
    }
    exports.DEFAULT_DAILY_NOTE_FORMAT = DEFAULT_DAILY_NOTE_FORMAT;
    exports.DEFAULT_MONTHLY_NOTE_FORMAT = DEFAULT_MONTHLY_NOTE_FORMAT;
    exports.DEFAULT_WEEKLY_NOTE_FORMAT = DEFAULT_WEEKLY_NOTE_FORMAT;
    exports.appHasDailyNotesPluginLoaded = appHasDailyNotesPluginLoaded;
    exports.appHasMonthlyNotesPluginLoaded = appHasMonthlyNotesPluginLoaded;
    exports.appHasWeeklyNotesPluginLoaded = appHasWeeklyNotesPluginLoaded;
    exports.createDailyNote = createDailyNote2;
    exports.createMonthlyNote = createMonthlyNote;
    exports.createPeriodicNote = createPeriodicNote;
    exports.createWeeklyNote = createWeeklyNote;
    exports.getAllDailyNotes = getAllDailyNotes2;
    exports.getAllMonthlyNotes = getAllMonthlyNotes;
    exports.getAllWeeklyNotes = getAllWeeklyNotes;
    exports.getDailyNote = getDailyNote2;
    exports.getDailyNoteSettings = getDailyNoteSettings;
    exports.getDateFromFile = getDateFromFile;
    exports.getDateFromPath = getDateFromPath;
    exports.getDateUID = getDateUID;
    exports.getMonthlyNote = getMonthlyNote;
    exports.getMonthlyNoteSettings = getMonthlyNoteSettings;
    exports.getPeriodicNoteSettings = getPeriodicNoteSettings;
    exports.getTemplateInfo = getTemplateInfo;
    exports.getWeeklyNote = getWeeklyNote;
    exports.getWeeklyNoteSettings = getWeeklyNoteSettings;
  }
});

// src/main.ts
__export(exports, {
  default: () => ThePlugin
});
var import_obsidian14 = __toModule(require("obsidian"));

// src/utils/FileSystem.ts
var import_obsidian = __toModule(require("obsidian"));
var FileSystemReturnType;
(function(FileSystemReturnType2) {
  FileSystemReturnType2[FileSystemReturnType2["foldersOnly"] = 1] = "foldersOnly";
  FileSystemReturnType2[FileSystemReturnType2["filesOnly"] = 2] = "filesOnly";
  FileSystemReturnType2[FileSystemReturnType2["filesAndFolders"] = 3] = "filesAndFolders";
})(FileSystemReturnType || (FileSystemReturnType = {}));
function testFolderExclusion(folder, exclusionFolders) {
  for (const eFolder of exclusionFolders)
    if (folder.startsWith(eFolder + "/"))
      return true;
  return false;
}
async function getFiles(app2, returnType, responseArray, exclusionFolders) {
  if (returnType === 2 || returnType === 3) {
    for (const file of app2.vault.getMarkdownFiles())
      if (!testFolderExclusion(file.path, exclusionFolders))
        responseArray.push({ display: file.path, info: file.path });
  }
  if (returnType === 1 || returnType === 3) {
    import_obsidian.Vault.recurseChildren(app2.vault.getRoot(), (abstractFile) => {
      if (abstractFile instanceof import_obsidian.TFolder) {
        const path = abstractFile.path === "/" ? abstractFile.path : abstractFile.path + "/";
        responseArray.push({ display: path, info: path });
      }
    });
  }
}
async function addLastOpenFiles(app2, responseArray) {
  const lastOpenFiles = app2.workspace.getLastOpenFiles();
  if (lastOpenFiles.length === 0)
    return;
  for (let iLF = 0; iLF < lastOpenFiles.length; iLF++)
    if (await app2.vault.adapter.exists(lastOpenFiles[iLF]) === false)
      lastOpenFiles.splice(iLF, 1);
  for (let iLF = 0; iLF < lastOpenFiles.length; iLF++) {
    const recentFile = lastOpenFiles[iLF];
    for (let iFile = 0; iFile < responseArray.length; iFile++) {
      if (recentFile === responseArray[iFile].info) {
        responseArray.splice(iFile, 1);
        break;
      }
    }
  }
  for (let i = lastOpenFiles.length - 1; i >= 0; i--)
    responseArray.unshift({ display: "Recent file: " + lastOpenFiles[i], info: lastOpenFiles[i] });
}
var FileSystem = class {
  constructor(plugin) {
    this.exclusionFolders = [];
    this.plugin = plugin;
  }
  setExclusionFolders(exclusion) {
    this.exclusionFolders = exclusion;
  }
  async getAllFolders() {
    const results = [];
    await getFiles(this.plugin.app, 1, results, this.exclusionFolders);
    return results;
  }
  async getAllFiles() {
    const results = [];
    await getFiles(this.plugin.app, 2, results, this.exclusionFolders);
    await addLastOpenFiles(this.plugin.app, results);
    return results;
  }
  async getAllFoldersAndFiles() {
    const results = [];
    await getFiles(this.plugin.app, 3, results, this.exclusionFolders);
    await addLastOpenFiles(this.plugin.app, results);
    return results;
  }
};

// src/ui/GenericFuzzySuggester.ts
var import_obsidian2 = __toModule(require("obsidian"));
var GenericFuzzySuggester = class extends import_obsidian2.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.scope.register(["Shift"], "Enter", (evt) => this.enterTrigger(evt));
    this.scope.register(["Ctrl"], "Enter", (evt) => this.enterTrigger(evt));
  }
  setSuggesterData(suggesterData) {
    this.data = suggesterData;
  }
  async display(callBack) {
    this.callbackFunction = callBack;
    this.open();
  }
  getItems() {
    return this.data;
  }
  getItemText(item) {
    return item.display;
  }
  onChooseItem() {
    return;
  }
  renderSuggestion(item, el) {
    el.createEl("div", { text: item.item.display });
  }
  enterTrigger(evt) {
    const selectedText = document.querySelector(".suggestion-item.is-selected div").textContent;
    const item = this.data.find((i) => i.display === selectedText);
    if (item) {
      this.invokeCallback(item, evt);
      this.close();
    }
  }
  onChooseSuggestion(item, evt) {
    this.invokeCallback(item.item, evt);
  }
  invokeCallback(item, evt) {
    this.callbackFunction(item, evt);
  }
};

// src/features/transporterFunctions.ts
var import_obsidian6 = __toModule(require("obsidian"));

// src/utils/FileCacheAnalyzer.ts
var FileCacheAnalyzer = class {
  constructor(plugin, fileFullPath) {
    this.details = [];
    this.plugin = plugin;
    this.cache = plugin.app.metadataCache.getCache(fileFullPath);
    this.fileFullPath = fileFullPath;
    if (this.cache.sections) {
      for (const section of this.cache.sections) {
        switch (section.type) {
          case "heading":
            this.breakdownCacheItems(this.cache.headings, section, false);
            break;
          case "list":
            this.breakdownCacheItems(this.cache.listItems, section, true);
            break;
          default:
            this.details.push({
              index: 0,
              type: section.type,
              lineStart: section.position.start.line,
              lineEnd: section.position.end.line,
              position: section.position,
              blockId: section.id
            });
            break;
        }
      }
      for (const i in this.details)
        this.details[i].index = Number(i);
    }
  }
  getBlockAtLine(line, defaultForward) {
    let lastBlockToMatch = this.details[0];
    for (let i = 0; i < this.details.length; i++) {
      const currentItem = this.details[i];
      if (defaultForward === false && line >= currentItem.lineEnd)
        lastBlockToMatch = currentItem;
      else if (defaultForward) {
        const nextItem = this.details[i + 1];
        if (line > currentItem.lineEnd && nextItem && line < nextItem.lineStart)
          lastBlockToMatch = nextItem;
        else if (line >= currentItem.lineStart)
          lastBlockToMatch = currentItem;
      }
    }
    return lastBlockToMatch;
  }
  getBlockAfterLine(line) {
    const blockIndexAtLine = this.getBlockAtLine(line, true).index;
    if (this.details.length === 1)
      return this.details[0];
    else if (this.details.length - 1 > blockIndexAtLine)
      return this.details[blockIndexAtLine + 1];
    else
      return null;
  }
  getBlockBeforeLine(line) {
    const blockNumberAtLine = this.getBlockAtLine(line, false).index;
    if (this.details.length === 0)
      return null;
    else if (blockNumberAtLine > 0 && this.details.length >= blockNumberAtLine)
      return this.details[blockNumberAtLine - 1];
    else
      return this.details[0];
  }
  getPositionOfHeaderAndItsChildren(headerName) {
    let startLine = null;
    let endLine = null;
    let headingLevel = null;
    for (const h of this.details) {
      if (startLine === null && h.type === "heading" && h.headingText === headerName) {
        startLine = h.position.start;
        headingLevel = h.headingLevel;
        endLine = h.position.end;
      } else if (startLine != null && h.type === "heading" && h.headingLevel <= headingLevel) {
        break;
      } else
        endLine = h.position.end;
    }
    return startLine === null ? null : { start: startLine, end: endLine };
  }
  async createDocumentWithInfo() {
    let output = `# ${this.fileFullPath}

`;
    for (const item of this.details) {
      output += item.type + " " + item.lineStart + "->" + item.lineEnd + " " + (item.blockId ? item.blockId : "") + "\n";
    }
    const fileName = "/fileBreadkown.md";
    await this.plugin.app.vault.adapter.write(fileName, output);
    const newFile = await this.plugin.app.vault.getAbstractFileByPath(fileName);
    const leaf = this.plugin.app.workspace.splitActiveLeaf("vertical");
    leaf.openFile(newFile);
  }
  breakdownCacheItems(cacheItems, section, checkForBlockRefs) {
    let itemsFoundTrackToBreakOut = false;
    for (const itemInCache of cacheItems) {
      const positionInSameRange = this.positionOfItemWithinSameRange(itemInCache.position, section.position);
      if (positionInSameRange === false && itemsFoundTrackToBreakOut === true) {
        break;
      } else if (positionInSameRange) {
        itemsFoundTrackToBreakOut = true;
        const itemToAppend = {
          index: 0,
          type: section.type,
          lineStart: itemInCache.position.start.line,
          lineEnd: itemInCache.position.end.line,
          position: itemInCache.position
        };
        const heading = itemInCache;
        if (heading.heading) {
          itemToAppend.headingText = heading.heading;
          itemToAppend.headingLevel = heading.level;
        }
        if (checkForBlockRefs && this.cache.blocks) {
          for (const b of Object.values(this.cache.blocks)) {
            if (this.positionOfItemWithinSameRange(b.position, itemInCache.position)) {
              itemToAppend.blockId = b.id;
              break;
            }
          }
        }
        this.details.push(itemToAppend);
      }
    }
  }
  positionOfItemWithinSameRange(firstPosition, secondPosition) {
    return firstPosition.start.line >= secondPosition.start.line && firstPosition.end.line <= secondPosition.end.line;
  }
};

// src/utils/fileNavigatior.ts
var import_obsidian5 = __toModule(require("obsidian"));

// src/utils/dailyNotesPages.ts
var import_obsidian_daily_notes_interface = __toModule(require_main());
var import_obsidian3 = __toModule(require("obsidian"));
async function getDnpForToday() {
  let dnp = (0, import_obsidian_daily_notes_interface.getDailyNote)((0, import_obsidian3.moment)(), (0, import_obsidian_daily_notes_interface.getAllDailyNotes)());
  if (dnp === null)
    dnp = await (0, import_obsidian_daily_notes_interface.createDailyNote)((0, import_obsidian3.moment)());
  return dnp.path;
}

// src/utils/tags.ts
function getAllTagsJustTagNames() {
  return Object.keys(app.metadataCache.getTags()).sort((a, b) => a.localeCompare(b));
}
function locationsWhereTagIsUsed(findTag) {
  const oApp = app;
  const results = [];
  for (const file of oApp.vault.getMarkdownFiles()) {
    const cache = oApp.metadataCache.getFileCache(file);
    if (cache.tags) {
      for (const tag of cache.tags)
        if (findTag === tag.tag)
          results.push({ tag, filePath: file.path, position: tag.position });
    }
  }
  return results.sort((a, b) => a.filePath.localeCompare(b.filePath));
}
function filesWhereTagIsUsed(findTag) {
  const filesList = [];
  for (const l of locationsWhereTagIsUsed(findTag))
    if (!filesList.includes(l.filePath))
      filesList.push(l.filePath);
  return filesList;
}
async function blocksWhereTagIsUsed(plugin, findTag) {
  const blockInfo = [];
  for (const l of locationsWhereTagIsUsed(findTag)) {
    const f = new FileCacheAnalyzer(plugin, l.filePath);
    const block = f.getBlockAtLine(l.position.start.line, true);
    if (block.type !== "yaml") {
      const taggedFileArray = await convertFileIntoArray(plugin, l.filePath);
      let blockText = "";
      for (const line of taggedFileArray.slice(block.lineStart, block.lineEnd + 1))
        blockText += line.display + "\n";
      blockInfo.push({ file: l.filePath, position: block.position, blockText: blockText.trim() });
    }
  }
  return blockInfo;
}

// src/utils/views.ts
var import_obsidian4 = __toModule(require("obsidian"));
var ViewType;
(function(ViewType2) {
  ViewType2[ViewType2["source"] = 0] = "source";
  ViewType2[ViewType2["preview"] = 1] = "preview";
  ViewType2[ViewType2["none"] = 2] = "none";
})(ViewType || (ViewType = {}));
function getActiveView(plugin) {
  return plugin.app.workspace.getActiveViewOfType(import_obsidian4.MarkdownView);
}
function getActiveViewType(plugin) {
  const currentView = getActiveView(plugin);
  if (!currentView)
    return 2;
  else if (currentView.getMode() == "source")
    return 0;
  else if (currentView.getMode() == "preview")
    return 1;
}

// src/utils/fileNavigatior.ts
var TAG_FILE_SEARCH = "#### #tag file search ####";
var TAG_BLOCK_SEARCH = "---- #tag block search ----";
var getUniqueLinkPath = (filePath) => {
  return app.metadataCache.fileToLinktext(app.vault.getAbstractFileByPath(filePath), "");
};
async function createFileChooser(plugin, excludeFileFromList) {
  const fileList = await plugin.fs.getAllFiles();
  if (excludeFileFromList)
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].info.localeCompare(excludeFileFromList, void 0, { sensitivity: "base" }) === 0) {
        fileList.splice(i, 1);
        break;
      }
    }
  fileList.unshift({ display: TAG_BLOCK_SEARCH, info: TAG_BLOCK_SEARCH });
  fileList.unshift({ display: TAG_FILE_SEARCH, info: TAG_FILE_SEARCH });
  if (plugin.settings.bookmarks.trim().length > 0) {
    const bookmarks = plugin.settings.bookmarks.trim().split("\n");
    for (let i = bookmarks.length - 1; i >= 0; i--) {
      let filePath = bookmarks[i];
      if (filePath.search(";") > 0)
        filePath = filePath.substr(0, filePath.search(";"));
      filePath = filePath.replace("*", "");
      if (filePath === "DNPTODAY" || await plugin.app.vault.adapter.exists(filePath))
        fileList.unshift({ display: "Bookmark: " + bookmarks[i], info: bookmarks[i] });
    }
  }
  const chooser = new GenericFuzzySuggester(plugin);
  chooser.setSuggesterData(fileList);
  chooser.setPlaceholder("Select a file");
  return chooser;
}
async function convertFileIntoArray(plugin, filePath) {
  const fileContentsArray = [];
  for (const [key, value] of Object.entries((await plugin.app.vault.adapter.read(filePath)).split("\n")))
    fileContentsArray.push({ display: value, info: key });
  return fileContentsArray;
}
async function openFileInObsidian(plugin, filePath, gotoStartLineNumber = 0, lineCount = 0) {
  const newLeaf = plugin.app.workspace.splitActiveLeaf("vertical");
  const file = plugin.app.metadataCache.getFirstLinkpathDest((0, import_obsidian5.getLinkpath)(filePath), "/");
  await newLeaf.openFile(file, { active: true });
  setTimeout(async () => {
    const editor = getActiveView(plugin).editor;
    editor.setSelection({ line: gotoStartLineNumber, ch: 0 }, { line: gotoStartLineNumber + lineCount, ch: editor.getLine(gotoStartLineNumber + lineCount).length });
    editor.scrollIntoView({
      from: { line: gotoStartLineNumber + lineCount, ch: 0 },
      to: { line: gotoStartLineNumber + lineCount, ch: 0 }
    });
  }, 500);
}
async function parseBookmarkForItsElements(plugin, bookmarkCommandString, pullTypeRequest = false) {
  let error = 0;
  let isContextMenuCommand = false;
  if (bookmarkCommandString.substr(0, 1) === "*") {
    isContextMenuCommand = true;
    bookmarkCommandString = bookmarkCommandString.substring(1);
  }
  let filePath = bookmarkCommandString.substring(0, bookmarkCommandString.search(";"));
  const command = bookmarkCommandString.substring(filePath.length + 1).toLocaleUpperCase().trim();
  try {
    if (filePath === "DNPTODAY")
      filePath = await getDnpForToday();
    let lineNumber = -1;
    let fileBkmrkContentsArray = null;
    if (await plugin.app.vault.adapter.exists(filePath)) {
      fileBkmrkContentsArray = await convertFileIntoArray(plugin, filePath);
      if (command === "BOTTOM" || command !== "TOP") {
        if (command === "BOTTOM")
          lineNumber = fileBkmrkContentsArray.length - 1;
        else {
          for (let i = 0; i < fileBkmrkContentsArray.length; i++) {
            if (fileBkmrkContentsArray[i].display.toLocaleUpperCase().trim() === command) {
              lineNumber = pullTypeRequest === true ? i + 1 : i;
              break;
            }
          }
          if (lineNumber === -1)
            error = 1;
        }
      }
    } else
      error = 2;
    return {
      fileName: filePath,
      fileLineNumber: lineNumber,
      fileBookmarkContentsArray: fileBkmrkContentsArray,
      errorNumber: error,
      contextMenuCommand: isContextMenuCommand
    };
  } catch (e) {
    new import_obsidian5.Notice("Something is wrong with the bookmark. File system reports: " + e.toString());
    error = 2;
  }
}
async function createTagFileListChooser(plugin, returnEndPoint, showTop, callback) {
  const tagList = getAllTagsJustTagNames();
  if (tagList.length <= 0) {
    new import_obsidian5.Notice("No tags in this vault");
    return;
  }
  const tagListArray = [];
  for (const tag of tagList)
    tagListArray.push({ display: tag, info: tag });
  const tagChooser = new GenericFuzzySuggester(plugin);
  tagChooser.setSuggesterData(tagListArray);
  tagChooser.setPlaceholder("Select a tag");
  await tagChooser.display(async (tagChosen) => {
    const tagFileListArray = [];
    const filesForChosenTag = filesWhereTagIsUsed(tagChosen.info);
    for (const tag of filesForChosenTag)
      tagFileListArray.push({ display: tag, info: tag });
    const tagFileChooser = new GenericFuzzySuggester(plugin);
    tagFileChooser.setSuggesterData(tagFileListArray);
    tagFileChooser.setPlaceholder("Select a file");
    await tagFileChooser.display(async (fieleChosen, evtFile) => {
      const fileContentsArray = await convertFileIntoArray(plugin, fieleChosen.info);
      if (showTop)
        fileContentsArray.unshift({ display: "-- Top of file --", info: -1 });
      await displayFileLineSuggesterFromFileList(plugin, returnEndPoint, showTop, fieleChosen.info, fileContentsArray, 0, evtFile, callback);
    });
  });
}
async function createTagBlockListChooser(plugin, returnEndPoint, showTop, callback) {
  const tagList = getAllTagsJustTagNames();
  if (tagList.length <= 0) {
    new import_obsidian5.Notice("No tags in this vault");
    return;
  }
  const tagListArray = [];
  for (const tag of tagList)
    tagListArray.push({ display: tag, info: tag });
  const tagChooser = new GenericFuzzySuggester(plugin);
  tagChooser.setSuggesterData(tagListArray);
  tagChooser.setPlaceholder("Select a tag");
  await tagChooser.display(async (tagChosen) => {
    const tagFileListArray = [];
    const tagBlocks = blocksWhereTagIsUsed(plugin, tagChosen.info);
    for (const tag of await tagBlocks)
      tagFileListArray.push({ display: tag.file + "\n" + tag.blockText, info: tag });
    const tagBlockChooser = new GenericFuzzySuggester(plugin);
    tagBlockChooser.setSuggesterData(tagFileListArray);
    tagBlockChooser.setPlaceholder("Select a block");
    await tagBlockChooser.display(async (tagBlock, evt) => {
      callback(tagBlock.info.file, await convertFileIntoArray(plugin, tagBlock.info.file), tagBlock.info.position.start.line, tagBlock.info.position.end.line, evt);
    });
  });
}
async function displayFileLineSuggester(plugin, returnEndPoint, showTop, pullTypeRequest, callback) {
  const chooser = getActiveViewType(plugin) === ViewType.none ? await createFileChooser(plugin) : await createFileChooser(plugin, getActiveView(plugin).file.path);
  await chooser.display(async (fileSelected, evtFileSelected) => {
    const shiftKeyUsed = evtFileSelected.shiftKey;
    let fileContentsStartingLine = 0;
    let targetFileName = fileSelected.info;
    if (targetFileName === TAG_FILE_SEARCH) {
      await createTagFileListChooser(plugin, returnEndPoint, showTop, callback);
      return;
    } else if (targetFileName === TAG_BLOCK_SEARCH) {
      await createTagBlockListChooser(plugin, returnEndPoint, showTop, callback);
      return;
    } else if (targetFileName.search(";") > 0) {
      const bkmkInfo = await parseBookmarkForItsElements(plugin, targetFileName, pullTypeRequest);
      if (shiftKeyUsed === false) {
        callback(bkmkInfo.fileName, bkmkInfo.fileBookmarkContentsArray, bkmkInfo.fileLineNumber, bkmkInfo.fileLineNumber, evtFileSelected);
        return;
      } else {
        fileContentsStartingLine = bkmkInfo.fileLineNumber;
        targetFileName = bkmkInfo.fileName;
        showTop = false;
      }
    }
    const fileContentsArray = await convertFileIntoArray(plugin, targetFileName);
    if (showTop)
      fileContentsArray.unshift({ display: "-- Top of file --", info: -1 });
    await displayFileLineSuggesterFromFileList(plugin, returnEndPoint, showTop, targetFileName, fileContentsArray, fileContentsStartingLine, evtFileSelected, callback);
  });
}
async function displayFileLineSuggesterFromFileList(plugin, returnEndPoint, showTop, targetFileName, fileContentsArray, fileContentsStartingLine, evtFileSelected, callback) {
  const firstLinechooser = new GenericFuzzySuggester(plugin);
  firstLinechooser.setPlaceholder("Select the line from file");
  if (fileContentsStartingLine > 0)
    firstLinechooser.setSuggesterData(fileContentsArray.slice(fileContentsStartingLine));
  else
    firstLinechooser.setSuggesterData(fileContentsArray);
  await firstLinechooser.display(async (iFileLocation, evtFirstLine) => {
    let startFilePosition = Number(iFileLocation.info);
    const endFilePosition = startFilePosition;
    if (showTop)
      fileContentsArray.splice(0, 1);
    if (returnEndPoint) {
      if (startFilePosition === fileContentsArray.length - 1) {
        callback(targetFileName, fileContentsArray, startFilePosition, startFilePosition, evtFileSelected, evtFirstLine);
      } else {
        startFilePosition = startFilePosition === -1 ? 0 : startFilePosition;
        const endPointArray = fileContentsArray.slice(startFilePosition);
        const lastLineChooser = new GenericFuzzySuggester(plugin);
        lastLineChooser.setSuggesterData(endPointArray);
        lastLineChooser.setPlaceholder("Select the last line for the selection");
        await lastLineChooser.display(async (iFileLocationEndPoint, evetLastLine) => {
          callback(targetFileName, fileContentsArray, startFilePosition, Number(iFileLocationEndPoint.info), evtFileSelected, evtFirstLine, evetLastLine);
        });
      }
    } else {
      callback(targetFileName, fileContentsArray, startFilePosition, endFilePosition, evtFileSelected, evtFirstLine);
    }
  });
}

// node_modules/nanoid/index.prod.js
if (false) {
  if (typeof navigator !== "undefined" && navigator.product === "ReactNative" && typeof crypto === "undefined") {
    throw new Error("React Native does not have a built-in secure random generator. If you don\u2019t need unpredictable IDs use `nanoid/non-secure`. For secure IDs, import `react-native-get-random-values` before Nano ID.");
  }
  if (typeof msCrypto !== "undefined" && typeof crypto === "undefined") {
    throw new Error("Import file with `if (!window.crypto) window.crypto = window.msCrypto` before importing Nano ID to fix IE 11 support");
  }
  if (typeof crypto === "undefined") {
    throw new Error("Your browser does not have secure random generator. If you don\u2019t need unpredictable IDs, you can use nanoid/non-secure.");
  }
}
var random = (bytes) => crypto.getRandomValues(new Uint8Array(bytes));
var customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  let step = -~(1.6 * mask * size / alphabet.length);
  return () => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let j = step;
      while (j--) {
        id += alphabet[bytes[j] & mask] || "";
        if (id.length === size)
          return id;
      }
    }
  };
};
var customAlphabet = (alphabet, size) => customRandom(alphabet, size, random);

// src/utils/blockId.ts
var generateBlockId = customAlphabet("abcdefghijklmnopqrstuvwz0123456789", 6);

// src/features/transporterFunctions.ts
function cleanupHeaderNameForBlockReference(header) {
  return header.replace(/\[|\]|#|\|/g, "").replace(/:/g, " ");
}
async function addBlockRefsToSelection(plugin, copyToClipbard, copyAsAlias = false, aliasText = "*") {
  const activeView = getActiveView(plugin);
  const activeEditor = activeView.editor;
  const f = new FileCacheAnalyzer(plugin, activeView.file.path);
  const curSels = activeEditor.listSelections();
  const blockRefs = [];
  for (const sel of curSels) {
    const startLine = sel.anchor.line > sel.head.line ? sel.head.line : sel.anchor.line;
    const endLine = sel.anchor.line > sel.head.line ? sel.anchor.line : sel.head.line;
    for (let selectedLineInEditor = startLine; selectedLineInEditor <= endLine; selectedLineInEditor++) {
      for (let sectionCounter = 0; sectionCounter < f.details.length; sectionCounter++) {
        const section = f.details[sectionCounter];
        if (selectedLineInEditor >= section.position.start.line && selectedLineInEditor <= section.position.end.line) {
          if ((section.type === "paragraph" || section.type === "list" || section.type === "blockquote") && !section.blockId) {
            const newId = generateBlockId();
            activeEditor.replaceRange(` ^${newId}`, { line: Number(section.position.end.line), ch: section.position.end.col }, { line: Number(section.position.end.line), ch: section.position.end.col });
            blockRefs.push("#^" + newId);
            selectedLineInEditor = section.position.end.line;
            break;
          } else if (section.type === "paragraph" || section.type === "list" || section.type === "blockquote") {
            blockRefs.push("#^" + section.blockId);
            selectedLineInEditor = section.position.end.line;
            break;
          } else if (section.type === "heading") {
            blockRefs.push("#" + cleanupHeaderNameForBlockReference(section.headingText));
            selectedLineInEditor = section.position.end.line;
            break;
          }
        }
      }
    }
  }
  if (copyToClipbard && blockRefs.length > 0) {
    let block = "";
    const blockPrefix = copyAsAlias === false ? "!" : "";
    aliasText = copyAsAlias === true ? "|" + aliasText : "";
    const uniqueLinkPath = getUniqueLinkPath(activeView.file.path);
    blockRefs.forEach((b) => block += `${blockPrefix}[[${uniqueLinkPath}${b}${aliasText}]]
`);
    navigator.clipboard.writeText(block).then((text) => text);
  }
  return blockRefs;
}
async function copyOrPushLineOrSelectionToNewLocation(plugin, copySelection, newText, targetFileName, targetFileLineNumber, targetFileContentsArray) {
  if (targetFileLineNumber === -1) {
    const f = new FileCacheAnalyzer(plugin, targetFileName);
    if (f.details.length > 0 && f.details[0].type === "yaml")
      targetFileLineNumber = f.details[0].lineEnd;
  }
  targetFileContentsArray.splice(Number(targetFileLineNumber) + 1, 0, { display: newText, info: "" });
  let newContents = "";
  for (const line of targetFileContentsArray)
    newContents += line.display + "\n";
  newContents = newContents.substring(0, newContents.length - 1);
  await plugin.app.vault.adapter.write(targetFileName, newContents);
  if (copySelection === false) {
    const activeEditor = getActiveView(plugin).editor;
    const currentLine = activeEditor.getCursor().line;
    const textSelection = activeEditor.getSelection();
    if (textSelection === "" || activeEditor.getLine(currentLine).length === textSelection.length)
      activeEditor.replaceRange("", { line: currentLine, ch: 0 }, { line: currentLine + 1, ch: 0 });
    else
      activeEditor.replaceSelection("");
  }
}
async function copyOrPushLineOrSelectionToNewLocationWithFileLineSuggester(plugin, copySelection, defaultSelectionText = "") {
  const activeEditor = defaultSelectionText === "" ? getActiveView(plugin).editor : null;
  let selectedText = defaultSelectionText === "" ? activeEditor.getSelection() : defaultSelectionText;
  if (selectedText === "")
    selectedText = activeEditor.getLine(activeEditor.getCursor().line);
  await displayFileLineSuggester(plugin, false, true, false, async (targetFileName, fileContentsArray, lineNumber, endLineNumber, evtFileSelected, evtFirstLine) => {
    await copyOrPushLineOrSelectionToNewLocation(plugin, copySelection, selectedText, targetFileName, lineNumber, fileContentsArray);
    if (evtFileSelected && (evtFileSelected.ctrlKey || evtFileSelected.metaKey) || evtFirstLine && (evtFirstLine.ctrlKey || evtFirstLine.metaKey)) {
      const linesSelected = selectedText.split("\n").length;
      const lineCount = linesSelected > 1 ? linesSelected - 1 : 0;
      openFileInObsidian(plugin, targetFileName, lineNumber + 1, lineCount);
    }
  });
}
async function copyOrPushLineOrSelectionToNewLocationUsingCurrentCursorLocationAndBoomark(plugin, copySelection, bookmarkText, evt) {
  const bookmarkInfo = await parseBookmarkForItsElements(plugin, bookmarkText, false);
  if (bookmarkInfo.errorNumber === 1)
    new import_obsidian6.Notice("Location in the bookmark does not exist.");
  else if (bookmarkInfo.errorNumber === 2)
    new import_obsidian6.Notice("File as defined in the bookmark does not exist.");
  else {
    const activeEditor = getActiveView(plugin).editor;
    const currentLine = activeEditor.getCursor().line;
    let textSelection = activeEditor.getSelection();
    if (textSelection === "")
      textSelection = activeEditor.getLine(currentLine);
    copyOrPushLineOrSelectionToNewLocation(plugin, copySelection, textSelection, bookmarkInfo.fileName, bookmarkInfo.fileLineNumber, bookmarkInfo.fileBookmarkContentsArray);
    if (evt && (evt.ctrlKey || evt.metaKey)) {
      const linesSelected = textSelection.split("\n").length;
      const lineCount = linesSelected > 1 ? linesSelected - 1 : 0;
      openFileInObsidian(plugin, bookmarkInfo.fileName, bookmarkInfo.fileLineNumber + 1, lineCount);
    }
  }
}
async function copyCurrentFileNameAsLinkToNewLocation(plugin, copyToCliboard) {
  const fileLink = "[[" + getUniqueLinkPath(getActiveView(plugin).file.path) + "]]";
  if (copyToCliboard) {
    navigator.clipboard.writeText(fileLink).then((text) => text);
    new import_obsidian6.Notice(`${fileLink}

 Copied to the clipboard.`);
  } else
    copyOrPushLineOrSelectionToNewLocationWithFileLineSuggester(plugin, true, fileLink);
}
async function pushBlockReferenceToAnotherFile(plugin) {
  await displayFileLineSuggester(plugin, false, true, false, async (targetFileName, fileContentsArray, startLine, endLineNumber, evtFileSelected, evtFirstLine) => {
    if (startLine === -1) {
      const f = new FileCacheAnalyzer(plugin, targetFileName);
      if (f.details.length > 0 && f.details[0].type === "yaml")
        startLine = f.details[0].lineEnd;
    }
    const results = await addBlockRefsToSelection(plugin, false);
    let blockRefs = "";
    const fileName = getActiveView(plugin).file.path;
    if (results.length > 0) {
      for (const ref of results)
        blockRefs += `![[${fileName}${ref}]]
`;
      blockRefs = blockRefs.substring(0, blockRefs.length - 1);
      fileContentsArray.splice(Number(startLine) + 1, 0, { display: blockRefs, info: "" });
      let newContents = "";
      for (const line of fileContentsArray)
        newContents += line.display + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      plugin.app.vault.adapter.write(targetFileName, newContents);
      if (evtFileSelected && (evtFileSelected.ctrlKey || evtFileSelected.metaKey) || evtFirstLine && (evtFirstLine.ctrlKey || evtFirstLine.metaKey)) {
        openFileInObsidian(plugin, targetFileName, startLine + 1);
      }
    }
  });
}
async function copyOrPulLineOrSelectionFromAnotherLocation(plugin, copySelection) {
  await displayFileLineSuggester(plugin, true, false, true, async (targetFileName, fileContentsArray, startLine, endLine, evtFileSelected, evtFirstLine, evetLastLine) => {
    const ctrlKey = evtFileSelected && evtFileSelected.ctrlKey || evtFirstLine && evtFirstLine.ctrlKey || evetLastLine && evetLastLine.ctrlKey;
    startLine = startLine === -1 ? startLine = 0 : startLine;
    endLine = endLine === -1 ? endLine = 0 : endLine;
    let stringToInsertIntoSelection = "";
    for (const element of fileContentsArray.slice(startLine, endLine + 1))
      stringToInsertIntoSelection += element.display + "\n";
    stringToInsertIntoSelection = stringToInsertIntoSelection.substring(0, stringToInsertIntoSelection.length - 1);
    getActiveView(plugin).editor.replaceSelection(stringToInsertIntoSelection);
    if (copySelection === false) {
      fileContentsArray.splice(startLine, endLine + 1 - startLine);
      let newContents = "";
      for (const line of fileContentsArray)
        newContents += line.display + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      await plugin.app.vault.adapter.write(targetFileName, newContents);
      if (ctrlKey)
        await openFileInObsidian(plugin, targetFileName, startLine);
    } else if (ctrlKey)
      await openFileInObsidian(plugin, targetFileName, startLine, endLine - startLine);
  });
}
async function pullBlockReferenceFromAnotherFile(plugin) {
  await displayFileLineSuggester(plugin, true, false, true, async (targetFileName, fileContentsArray, startLine, endLine, evtFileSelected, evtFirstLine, evetLastLine) => {
    startLine = startLine === -1 ? startLine = 0 : startLine;
    endLine = endLine === -1 ? endLine = 0 : endLine;
    const f = new FileCacheAnalyzer(plugin, targetFileName);
    const fileContents = (await plugin.app.vault.adapter.read(targetFileName)).split("\n");
    let fileChanged = false;
    const blockRefs = [];
    for (let lineNumber = startLine; lineNumber <= endLine; lineNumber++) {
      for (let sectionCounter = 0; sectionCounter < f.details.length; sectionCounter++) {
        const section = f.details[sectionCounter];
        if (lineNumber >= section.position.start.line && lineNumber <= section.position.end.line) {
          if ((section.type === "paragraph" || section.type === "list") && !section.blockId) {
            const newId = generateBlockId();
            fileContents.splice(section.position.end.line, 1, fileContents[section.position.end.line] + " ^" + newId);
            blockRefs.push("#^" + newId);
            fileChanged = true;
            lineNumber = section.position.end.line;
            break;
          } else if (section.type === "paragraph" || section.type === "list") {
            blockRefs.push("#^" + section.blockId);
            lineNumber = section.position.end.line;
            break;
          } else if (section.type === "heading") {
            const heading = cleanupHeaderNameForBlockReference(section.headingText);
            blockRefs.push("#" + heading);
            lineNumber = section.position.end.line;
            break;
          }
        }
      }
    }
    if (fileChanged === true) {
      let newContents = "";
      for (const line of fileContents)
        newContents += line + "\n";
      newContents = newContents.substring(0, newContents.length - 1);
      await plugin.app.vault.adapter.write(targetFileName, newContents);
    }
    if (blockRefs.length > 0) {
      let blockRefTextToInsert = "";
      for (const ref of blockRefs)
        blockRefTextToInsert += `![[${targetFileName}${ref}]]
`;
      blockRefTextToInsert = blockRefTextToInsert.substring(0, blockRefTextToInsert.length - 1);
      getActiveView(plugin).editor.replaceSelection(blockRefTextToInsert);
    }
    if (evtFileSelected.ctrlKey || evtFirstLine.ctrlKey || evetLastLine.ctrlKey) {
      openFileInObsidian(plugin, targetFileName, startLine, endLine - startLine);
    }
  });
}
function testIfCursorIsOnALink(plugin) {
  const activeView = getActiveView(plugin);
  const activeEditor = activeView.editor;
  const currentLine = activeEditor.getCursor().line;
  const cache = this.app.metadataCache.getFileCache(activeView.file);
  if (cache.links || cache.embeds || cache.headings) {
    const ch = activeEditor.getCursor().ch;
    let linkInfo = null;
    if (cache.links)
      linkInfo = cache.links.find((l) => l.position.start.line === currentLine && (ch >= l.position.start.col && ch <= l.position.end.col));
    if (!linkInfo && cache.embeds)
      linkInfo = cache.embeds.find((l) => l.position.start.line === currentLine && (ch >= l.position.start.col && ch <= l.position.end.col));
    return linkInfo ? linkInfo : null;
  } else
    return null;
}
async function copyBlockReferenceToCurrentCusorLocation(plugin, linkInfo, leaveAliasToFile) {
  const file = plugin.app.metadataCache.getFirstLinkpathDest((0, import_obsidian6.getLinkpath)(linkInfo.link), "/");
  let fileContents = await plugin.app.vault.read(file);
  const cache = new FileCacheAnalyzer(plugin, file.path);
  if (cache.details && linkInfo.link.includes("^")) {
    const blockRefId = linkInfo.link.substr(linkInfo.link.indexOf("^") + 1);
    const pos = cache.details.find((b) => b.blockId === blockRefId).position;
    fileContents = fileContents.split("\n").slice(pos.start.line, pos.end.line + 1).join("\n");
    fileContents = fileContents.replace("^" + blockRefId, "");
  } else if (cache.details && linkInfo.link.contains("#")) {
    const headerId = linkInfo.link.substr(linkInfo.link.indexOf("#") + 1);
    const pos = cache.getPositionOfHeaderAndItsChildren(headerId);
    fileContents = fileContents.split("\n").slice(pos.start.line, pos.end.line + 1).join("\n");
  }
  if (leaveAliasToFile)
    fileContents += " [[" + linkInfo.link + "|*]]";
  getActiveView(plugin).editor.replaceRange(fileContents, { line: linkInfo.position.start.line, ch: linkInfo.position.start.col }, { line: linkInfo.position.end.line, ch: linkInfo.position.end.col });
}

// src/features/selectionFunctions.ts
function selectCurrentLine(plugin) {
  const activeView = getActiveView(plugin);
  const activeEditor = activeView.editor;
  const currentLine = activeEditor.getCursor().line;
  const selections = activeEditor.listSelections();
  if (selections.length === 1) {
    const sel = selections[0];
    const lineLength = activeEditor.getLine(currentLine).length;
    if (sel.anchor.line === sel.head.line && (sel.anchor.ch === lineLength || sel.head.ch === lineLength) && activeEditor.getSelection().length > 0) {
      const f = new FileCacheAnalyzer(plugin, activeView.file.path);
      const block = f.getBlockAtLine(currentLine, true);
      activeEditor.setSelection({ line: block.lineStart, ch: 0 }, { line: block.lineEnd, ch: block.position.end.col });
    } else if (sel.anchor.line === sel.head.line)
      activeEditor.setSelection({ line: currentLine, ch: 0 }, { line: currentLine, ch: activeEditor.getLine(currentLine).length });
  }
}
function selectAdjacentBlock(plugin, nextBlock) {
  const activeView = getActiveView(plugin);
  const activeEditor = activeView.editor;
  const currentLine = activeEditor.getCursor().line;
  const currentLineEmpty = activeEditor.getLine(currentLine).trim().length === 0 ? true : false;
  const f = new FileCacheAnalyzer(plugin, activeView.file.path);
  let nextBlockSelection;
  if (nextBlock)
    if (currentLineEmpty)
      nextBlockSelection = f.getBlockAtLine(currentLine, true);
    else
      nextBlockSelection = f.getBlockAfterLine(currentLine);
  else if (currentLineEmpty)
    nextBlockSelection = f.getBlockAtLine(currentLine, false);
  else
    nextBlockSelection = f.getBlockBeforeLine(currentLine);
  if (nextBlockSelection !== null) {
    const start2 = { line: nextBlockSelection.position.start.line, ch: nextBlockSelection.position.start.col };
    const end2 = { line: nextBlockSelection.position.end.line, ch: nextBlockSelection.position.end.col };
    activeEditor.setSelection(start2, end2);
    activeEditor.scrollIntoView({ from: start2, to: end2 });
  }
}
function selectCurrentSection(plugin, directionUP = true) {
  const activeView = getActiveView(plugin);
  const activeEditor = activeView.editor;
  const currentLine = activeEditor.getCursor().line;
  const cache = this.app.metadataCache.getFileCache(activeView.file);
  const f = new FileCacheAnalyzer(plugin, activeView.file.path);
  const currentRange = activeEditor.listSelections();
  if (currentRange[0].anchor.line === currentRange[0].head.line && currentRange[0].head.ch !== activeEditor.getSelection().length || currentRange[0].head.ch === 0 && currentRange[0].anchor.ch === 0 && activeEditor.getRange({ line: currentLine, ch: activeEditor.getLine(currentLine).length }, { line: currentLine, ch: 0 }).length !== 0) {
    activeEditor.setSelection({ line: currentLine, ch: 0 }, { line: currentLine, ch: activeEditor.getLine(currentLine).length });
  } else {
    const lastLineOfBlock = f.details.find((section) => {
      if (currentLine >= Number(section.position.start.line) && currentLine <= Number(section.position.end.line)) {
        return section.position.start;
      }
    });
    if (lastLineOfBlock === void 0) {
      let nearestBlock = null;
      for (const value of Object.entries(f.details)) {
        if (value.position) {
          if (directionUP === false && currentLine < Number(value.position.end.line) && nearestBlock === null) {
            nearestBlock = value;
          } else if (directionUP === true && currentLine > Number(value.position.start.line)) {
            nearestBlock = value;
          }
        }
      }
      if (nearestBlock === null && currentLine === 0 && f.details.length > 0)
        nearestBlock = cache.sections[0];
      if (nearestBlock !== null) {
        activeEditor.setSelection({ line: nearestBlock.position.start.line, ch: 0 }, { line: nearestBlock.position.end.line, ch: nearestBlock.position.end.col });
        return;
      }
    }
    const curSels = activeEditor.listSelections();
    if (lastLineOfBlock && lastLineOfBlock.type === "paragraph" && curSels.length === 1 && (curSels[0].anchor.line !== lastLineOfBlock.position.start.line && curSels[0].head.line !== lastLineOfBlock.position.end.line)) {
      activeEditor.setSelection({ line: lastLineOfBlock.position.start.line, ch: 0 }, { line: lastLineOfBlock.position.end.line, ch: lastLineOfBlock.position.end.col });
    } else {
      let firstSelectedLine = 0;
      let lastSelectedLine = 0;
      let currentBlock = null;
      let proceedingBlock = null;
      let nextBlock = null;
      if (currentRange[0].anchor.line < currentRange[0].head.line) {
        firstSelectedLine = currentRange[0].anchor.line;
        lastSelectedLine = currentRange[0].head.line;
      } else {
        firstSelectedLine = currentRange[0].head.line;
        lastSelectedLine = currentRange[0].anchor.line;
      }
      for (let i = 0; i < f.details.length; i++) {
        if (currentLine >= f.details[i].position.end.line) {
          currentBlock = f.details[i];
          try {
            nextBlock = f.details[i + 1];
          } catch (e) {
            console.log(e);
          }
        }
        if (firstSelectedLine > f.details[i].position.end.line)
          proceedingBlock = f.details[i];
      }
      if (proceedingBlock && directionUP) {
        activeEditor.setSelection({ line: proceedingBlock.position.start.line, ch: 0 }, { line: currentBlock.position.end.line, ch: activeEditor.getLine(currentBlock.position.end.line).length });
        activeEditor.scrollIntoView({ from: proceedingBlock.position.start, to: proceedingBlock.position.start });
      } else if (directionUP) {
        activeEditor.setSelection({ line: 0, ch: 0 }, { line: lastSelectedLine, ch: activeEditor.getLine(lastSelectedLine).length });
        activeEditor.scrollIntoView({ from: { line: 0, ch: 0 }, to: { line: firstSelectedLine, ch: 0 } });
      } else if (nextBlock && directionUP === false) {
        activeEditor.setSelection({ line: firstSelectedLine, ch: 0 }, { line: nextBlock.position.end.line, ch: activeEditor.getLine(nextBlock.position.end.line).length });
        activeEditor.scrollIntoView({ from: nextBlock.position.start, to: nextBlock.position.start });
      }
    }
  }
}

// src/ui/PluginCommands.ts
var import_obsidian11 = __toModule(require("obsidian"));

// src/ui/QuickCapture.ts
var import_obsidian9 = __toModule(require("obsidian"));

// src/ui/SilentFileAndTagSuggesterSuggest.ts
var import_obsidian7 = __toModule(require("obsidian"));

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
var round = Math.round;
function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = rect.width / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = rect.height / offsetHeight || 1;
    }
  }
  return {
    width: round(rect.width / scaleX),
    height: round(rect.height / scaleY),
    top: round(rect.top / scaleY),
    right: round(rect.right / scaleX),
    bottom: round(rect.bottom / scaleY),
    left: round(rect.left / scaleX),
    x: round(rect.left / scaleX),
    y: round(rect.top / scaleY)
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round2 = Math.round;

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round2(round2(x * dpr) / dpr) || 0,
    y: round2(round2(y * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = popperOffsets2[mainAxis] + overflow[mainSide];
    var max2 = popperOffsets2[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES).filter(function(value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
          break;
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (modifier.effect != null && typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// src/ui/SilentFileAndTagSuggesterSuggest.ts
var wrapAround = (value, size) => {
  return (value % size + size) % size;
};
var Suggest = class {
  constructor(owner, containerEl, scope) {
    this.owner = owner;
    this.containerEl = containerEl;
    containerEl.on("click", ".suggestion-item", this.onSuggestionClick.bind(this));
    containerEl.on("mousemove", ".suggestion-item", this.onSuggestionMouseover.bind(this));
    scope.register([], "ArrowUp", (event) => {
      if (!event.isComposing) {
        this.setSelectedItem(this.selectedItem - 1, true);
        return false;
      }
    });
    scope.register([], "ArrowDown", (event) => {
      if (!event.isComposing) {
        this.setSelectedItem(this.selectedItem + 1, true);
        return false;
      }
    });
    scope.register([], "Enter", (event) => {
      if (!event.isComposing) {
        this.useSelectedItem(event);
        return false;
      }
    });
  }
  onSuggestionClick(event, el) {
    event.preventDefault();
    const item = this.suggestions.indexOf(el);
    this.setSelectedItem(item, false);
    this.useSelectedItem(event);
  }
  onSuggestionMouseover(_event, el) {
    const item = this.suggestions.indexOf(el);
    this.setSelectedItem(item, false);
  }
  setSuggestions(values) {
    this.containerEl.empty();
    const suggestionEls = [];
    values.forEach((value) => {
      const suggestionEl = this.containerEl.createDiv("suggestion-item");
      this.owner.renderSuggestion(value, suggestionEl);
      suggestionEls.push(suggestionEl);
    });
    this.values = values;
    this.suggestions = suggestionEls;
    this.setSelectedItem(0, false);
  }
  useSelectedItem(event) {
    const currentValue = this.values[this.selectedItem];
    if (currentValue) {
      this.owner.selectSuggestion(currentValue, event);
    }
  }
  setSelectedItem(selectedIndex, scrollIntoView) {
    const normalizedIndex = wrapAround(selectedIndex, this.suggestions.length);
    const prevSelectedSuggestion = this.suggestions[this.selectedItem];
    const selectedSuggestion = this.suggestions[normalizedIndex];
    prevSelectedSuggestion?.removeClass("is-selected");
    selectedSuggestion?.addClass("is-selected");
    this.selectedItem = normalizedIndex;
    if (scrollIntoView) {
      selectedSuggestion.scrollIntoView(false);
    }
  }
};
var TextInputSuggest = class {
  constructor(app2, inputEl) {
    this.app = app2;
    this.inputEl = inputEl;
    this.scope = new import_obsidian7.Scope();
    this.suggestEl = createDiv("suggestion-container");
    const suggestion = this.suggestEl.createDiv("suggestion");
    this.suggest = new Suggest(this, suggestion, this.scope);
    this.scope.register([], "Escape", this.close.bind(this));
    this.inputEl.addEventListener("input", this.onInputChanged.bind(this));
    this.inputEl.addEventListener("focus", this.onInputChanged.bind(this));
    this.inputEl.addEventListener("blur", this.close.bind(this));
    this.suggestEl.on("mousedown", ".suggestion-container", (event) => {
      event.preventDefault();
    });
  }
  onInputChanged() {
    const inputStr = this.inputEl.value;
    const suggestions = this.getSuggestions(inputStr);
    if (!suggestions) {
      this.close();
      return;
    }
    if (suggestions.length > 0) {
      this.suggest.setSuggestions(suggestions);
      this.open(this.app.dom.appContainerEl, this.inputEl);
    } else {
      this.close();
    }
  }
  open(container, inputEl) {
    this.app.keymap.pushScope(this.scope);
    container.appendChild(this.suggestEl);
    this.popper = createPopper(inputEl, this.suggestEl, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state, instance }) => {
            const targetWidth = `${state.rects.reference.width}px`;
            if (state.styles.popper.width === targetWidth) {
              return;
            }
            state.styles.popper.width = targetWidth;
            instance.update();
          },
          phase: "beforeWrite",
          requires: ["computeStyles"]
        }
      ]
    });
  }
  close() {
    this.app.keymap.popScope(this.scope);
    this.suggest.setSuggestions([]);
    if (this.popper)
      this.popper.destroy();
    this.suggestEl.detach();
  }
};

// src/ui/SilentFileAndTagSuggester.ts
var import_obsidian8 = __toModule(require("obsidian"));

// node_modules/fuse.js/dist/fuse.esm.js
function isArray(value) {
  return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
var INFINITY = 1 / 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  let result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
  return typeof value === "object";
}
function isObjectLike(value) {
  return isObject(value) && value !== null;
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isBlank(value) {
  return !value.trim().length;
}
function getTag(value) {
  return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
var PATTERN_LENGTH_TOO_LARGE = (max2) => `Pattern length exceeds max of ${max2}.`;
var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
var hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};
    let totalWeight = 0;
    keys.forEach((key) => {
      let obj = createKey(key);
      totalWeight += obj.weight;
      this._keys.push(obj);
      this._keyMap[obj.id] = obj;
      totalWeight += obj.weight;
    });
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
};
function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, "name")) {
      throw new Error(MISSING_KEY_PROPERTY("name"));
    }
    const name = key.name;
    src = name;
    if (hasOwn.call(key, "weight")) {
      weight = key.weight;
      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
      }
    }
    path = createKeyPath(name);
    id = createKeyId(name);
  }
  return { path, id, weight, src };
}
function createKeyPath(key) {
  return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
  return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
  let list = [];
  let arr = false;
  const deepGet = (obj2, path2, index) => {
    if (!isDefined(obj2)) {
      return;
    }
    if (!path2[index]) {
      list.push(obj2);
    } else {
      let key = path2[index];
      const value = obj2[key];
      if (!isDefined(value)) {
        return;
      }
      if (index === path2.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path2, index + 1);
        }
      } else if (path2.length) {
        deepGet(value, path2, index + 1);
      }
    }
  };
  deepGet(obj, isString(path) ? path.split(".") : path, 0);
  return arr ? list : list[0];
}
var MatchOptions = {
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1
};
var BasicOptions = {
  isCaseSensitive: false,
  includeScore: false,
  keys: [],
  shouldSort: true,
  sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
var FuzzyOptions = {
  location: 0,
  threshold: 0.6,
  distance: 100
};
var AdvancedOptions = {
  useExtendedSearch: false,
  getFn: get,
  ignoreLocation: false,
  ignoreFieldNorm: false
};
var Config = {
  ...BasicOptions,
  ...MatchOptions,
  ...FuzzyOptions,
  ...AdvancedOptions
};
var SPACE = /[^ ]+/g;
function norm(mantissa = 3) {
  const cache = new Map();
  const m = Math.pow(10, mantissa);
  return {
    get(value) {
      const numTokens = value.match(SPACE).length;
      if (cache.has(numTokens)) {
        return cache.get(numTokens);
      }
      const norm2 = 1 / Math.sqrt(numTokens);
      const n = parseFloat(Math.round(norm2 * m) / m);
      cache.set(numTokens, n);
      return n;
    },
    clear() {
      cache.clear();
    }
  };
}
var FuseIndex = class {
  constructor({ getFn = Config.getFn } = {}) {
    this.norm = norm(3);
    this.getFn = getFn;
    this.isCreated = false;
    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return;
    }
    this.isCreated = true;
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }
    this.norm.clear();
  }
  add(doc) {
    const idx = this.size();
    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  removeAt(idx) {
    this.records.splice(idx, 1);
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]];
  }
  size() {
    return this.records.length;
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return;
    }
    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };
    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = { i: docIndex, $: {} };
    this.keys.forEach((key, keyIndex) => {
      let value = this.getFn(doc, key.path);
      if (!isDefined(value)) {
        return;
      }
      if (isArray(value)) {
        let subRecords = [];
        const stack = [{ nestedArrIndex: -1, value }];
        while (stack.length) {
          const { nestedArrIndex, value: value2 } = stack.pop();
          if (!isDefined(value2)) {
            continue;
          }
          if (isString(value2) && !isBlank(value2)) {
            let subRecord = {
              v: value2,
              i: nestedArrIndex,
              n: this.norm.get(value2)
            };
            subRecords.push(subRecord);
          } else if (isArray(value2)) {
            value2.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          }
        }
        record.$[keyIndex] = subRecords;
      } else if (!isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };
        record.$[keyIndex] = subRecord;
      }
    });
    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
};
function createIndex(keys, docs, { getFn = Config.getFn } = {}) {
  const myIndex = new FuseIndex({ getFn });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex;
}
function parseIndex(data, { getFn = Config.getFn } = {}) {
  const { keys, records } = data;
  const myIndex = new FuseIndex({ getFn });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex;
}
function computeScore(pattern, {
  errors = 0,
  currentLocation = 0,
  expectedLocation = 0,
  distance = Config.distance,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  const accuracy = errors / pattern.length;
  if (ignoreLocation) {
    return accuracy;
  }
  const proximity = Math.abs(expectedLocation - currentLocation);
  if (!distance) {
    return proximity ? 1 : accuracy;
  }
  return accuracy + proximity / distance;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
  let indices = [];
  let start2 = -1;
  let end2 = -1;
  let i = 0;
  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start2 === -1) {
      start2 = i;
    } else if (!match && start2 !== -1) {
      end2 = i - 1;
      if (end2 - start2 + 1 >= minMatchCharLength) {
        indices.push([start2, end2]);
      }
      start2 = -1;
    }
  }
  if (matchmask[i - 1] && i - start2 >= minMatchCharLength) {
    indices.push([start2, i - 1]);
  }
  return indices;
}
var MAX_BITS = 32;
function search(text, pattern, patternAlphabet, {
  location = Config.location,
  distance = Config.distance,
  threshold = Config.threshold,
  findAllMatches = Config.findAllMatches,
  minMatchCharLength = Config.minMatchCharLength,
  includeMatches = Config.includeMatches,
  ignoreLocation = Config.ignoreLocation
} = {}) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
  }
  const patternLen = pattern.length;
  const textLen = text.length;
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  let currentThreshold = threshold;
  let bestLocation = expectedLocation;
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  const matchMask = computeMatches ? Array(textLen) : [];
  let index;
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });
    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;
    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }
  bestLocation = -1;
  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;
  const mask = 1 << patternLen - 1;
  for (let i = 0; i < patternLen; i += 1) {
    let binMin = 0;
    let binMid = binMax;
    while (binMin < binMid) {
      const score2 = computeScore(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });
      if (score2 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;
    let start2 = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
    let bitArr = Array(finish + 2);
    bitArr[finish + 1] = (1 << i) - 1;
    for (let j = finish; j >= start2; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];
      if (computeMatches) {
        matchMask[currentLocation] = +!!charMatch;
      }
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
      if (i) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }
      if (bitArr[j] & mask) {
        finalScore = computeScore(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (finalScore <= currentThreshold) {
          currentThreshold = finalScore;
          bestLocation = currentLocation;
          if (bestLocation <= expectedLocation) {
            break;
          }
          start2 = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }
    const score = computeScore(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });
    if (score > currentThreshold) {
      break;
    }
    lastBitArr = bitArr;
  }
  const result = {
    isMatch: bestLocation >= 0,
    score: Math.max(1e-3, finalScore)
  };
  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }
  return result;
}
function createPatternAlphabet(pattern) {
  let mask = {};
  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | 1 << len - i - 1;
  }
  return mask;
}
var BitapSearch = class {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.chunks = [];
    if (!this.pattern.length) {
      return;
    }
    const addChunk = (pattern2, startIndex) => {
      this.chunks.push({
        pattern: pattern2,
        alphabet: createPatternAlphabet(pattern2),
        startIndex
      });
    };
    const len = this.pattern.length;
    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end2 = len - remainder;
      while (i < end2) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }
      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }
  searchIn(text) {
    const { isCaseSensitive, includeMatches } = this.options;
    if (!isCaseSensitive) {
      text = text.toLowerCase();
    }
    if (this.pattern === text) {
      let result2 = {
        isMatch: true,
        score: 0
      };
      if (includeMatches) {
        result2.indices = [[0, text.length - 1]];
      }
      return result2;
    }
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;
    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;
    this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
      const { isMatch, score, indices } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });
      if (isMatch) {
        hasMatches = true;
      }
      totalScore += score;
      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });
    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };
    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }
    return result;
  }
};
var BaseMatch = class {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex);
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex);
  }
  search() {
  }
};
function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null;
}
var ExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(text) {
    const isMatch = text === this.pattern;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InverseExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var PrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
};
var InversePrefixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var SuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    };
  }
};
var InverseSuffixExactMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    };
  }
};
var FuzzyMatch2 = class extends BaseMatch {
  constructor(pattern, {
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance,
    includeMatches = Config.includeMatches,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    isCaseSensitive = Config.isCaseSensitive,
    ignoreLocation = Config.ignoreLocation
  } = {}) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreLocation
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(text) {
    return this._bitapSearch.searchIn(text);
  }
};
var IncludeMatch = class extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(text) {
    let location = 0;
    let index;
    const indices = [];
    const patternLen = this.pattern.length;
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }
    const isMatch = !!indices.length;
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    };
  }
};
var searchers = [
  ExactMatch,
  IncludeMatch,
  PrefixExactMatch,
  InversePrefixExactMatch,
  InverseSuffixExactMatch,
  SuffixExactMatch,
  InverseExactMatch,
  FuzzyMatch2
];
var searchersLen = searchers.length;
var SPACE_RE = / +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/;
var OR_TOKEN = "|";
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item.trim().split(SPACE_RE).filter((item2) => item2 && !!item2.trim());
    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }
      if (found) {
        continue;
      }
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break;
        }
      }
    }
    return results;
  });
}
var MultiMatchSet = new Set([FuzzyMatch2.type, IncludeMatch.type]);
var ExtendedSearch = class {
  constructor(pattern, {
    isCaseSensitive = Config.isCaseSensitive,
    includeMatches = Config.includeMatches,
    minMatchCharLength = Config.minMatchCharLength,
    ignoreLocation = Config.ignoreLocation,
    findAllMatches = Config.findAllMatches,
    location = Config.location,
    threshold = Config.threshold,
    distance = Config.distance
  } = {}) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };
    this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    this.query = parseQuery(this.pattern, this.options);
  }
  static condition(_, options) {
    return options.useExtendedSearch;
  }
  searchIn(text) {
    const query = this.query;
    if (!query) {
      return {
        isMatch: false,
        score: 1
      };
    }
    const { includeMatches, isCaseSensitive } = this.options;
    text = isCaseSensitive ? text : text.toLowerCase();
    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers2 = query[i];
      allIndices.length = 0;
      numMatches = 0;
      for (let j = 0, pLen = searchers2.length; j < pLen; j += 1) {
        const searcher = searchers2[j];
        const { isMatch, indices, score } = searcher.search(text);
        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break;
        }
      }
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };
        if (includeMatches) {
          result.indices = allIndices;
        }
        return result;
      }
    }
    return {
      isMatch: false,
      score: 1
    };
  }
};
var registeredSearchers = [];
function register(...args) {
  registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options);
    }
  }
  return new BitapSearch(pattern, options);
}
var LogicalOperator = {
  AND: "$and",
  OR: "$or"
};
var KeyType = {
  PATH: "$path",
  PATTERN: "$val"
};
var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
var isPath = (query) => !!query[KeyType.PATH];
var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
var convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});
function parse(query, options, { auto: auto2 = true } = {}) {
  const next = (query2) => {
    let keys = Object.keys(query2);
    const isQueryPath = isPath(query2);
    if (!isQueryPath && keys.length > 1 && !isExpression(query2)) {
      return next(convertToExplicit(query2));
    }
    if (isLeaf(query2)) {
      const key = isQueryPath ? query2[KeyType.PATH] : keys[0];
      const pattern = isQueryPath ? query2[KeyType.PATTERN] : query2[key];
      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
      }
      const obj = {
        keyId: createKeyId(key),
        pattern
      };
      if (auto2) {
        obj.searcher = createSearcher(pattern, options);
      }
      return obj;
    }
    let node = {
      children: [],
      operator: keys[0]
    };
    keys.forEach((key) => {
      const value = query2[key];
      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });
    return node;
  };
  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }
  return next(query);
}
function computeScore$1(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
  results.forEach((result) => {
    let totalScore = 1;
    result.matches.forEach(({ key, norm: norm2, score }) => {
      const weight = key ? key.weight : null;
      totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm2));
    });
    result.score = totalScore;
  });
}
function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];
  if (!isDefined(matches)) {
    return;
  }
  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return;
    }
    const { indices, value } = match;
    let obj = {
      indices,
      value
    };
    if (match.key) {
      obj.key = match.key.src;
    }
    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }
    data.matches.push(obj);
  });
}
function transformScore(result, data) {
  data.score = result.score;
}
function format2(results, docs, {
  includeMatches = Config.includeMatches,
  includeScore = Config.includeScore
} = {}) {
  const transformers = [];
  if (includeMatches)
    transformers.push(transformMatches);
  if (includeScore)
    transformers.push(transformScore);
  return results.map((result) => {
    const { idx } = result;
    const data = {
      item: docs[idx],
      refIndex: idx
    };
    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }
    return data;
  });
}
var Fuse = class {
  constructor(docs, options = {}, index) {
    this.options = { ...Config, ...options };
    if (this.options.useExtendedSearch && false) {
      throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
    }
    this._keyStore = new KeyStore(this.options.keys);
    this.setCollection(docs, index);
  }
  setCollection(docs, index) {
    this._docs = docs;
    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE);
    }
    this._myIndex = index || createIndex(this.options.keys, this._docs, {
      getFn: this.options.getFn
    });
  }
  add(doc) {
    if (!isDefined(doc)) {
      return;
    }
    this._docs.push(doc);
    this._myIndex.add(doc);
  }
  remove(predicate = () => false) {
    const results = [];
    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;
        results.push(doc);
      }
    }
    return results;
  }
  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }
  getIndex() {
    return this._myIndex;
  }
  search(query, { limit = -1 } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;
    let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
    computeScore$1(results, { ignoreFieldNorm });
    if (shouldSort) {
      results.sort(sortFn);
    }
    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }
    return format2(results, this._docs, {
      includeMatches,
      includeScore
    });
  }
  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const { records } = this._myIndex;
    const results = [];
    records.forEach(({ v: text, i: idx, n: norm2 }) => {
      if (!isDefined(text)) {
        return;
      }
      const { isMatch, score, indices } = searcher.searchIn(text);
      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{ score, value: text, norm: norm2, indices }]
        });
      }
    });
    return results;
  }
  _searchLogical(query) {
    const expression = parse(query, this.options);
    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const { keyId, searcher } = node;
        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });
        if (matches && matches.length) {
          return [
            {
              idx,
              item,
              matches
            }
          ];
        }
        return [];
      }
      switch (node.operator) {
        case LogicalOperator.AND: {
          const res = [];
          for (let i = 0, len = node.children.length; i < len; i += 1) {
            const child = node.children[i];
            const result = evaluate(child, item, idx);
            if (result.length) {
              res.push(...result);
            } else {
              return [];
            }
          }
          return res;
        }
        case LogicalOperator.OR: {
          const res = [];
          for (let i = 0, len = node.children.length; i < len; i += 1) {
            const child = node.children[i];
            const result = evaluate(child, item, idx);
            if (result.length) {
              res.push(...result);
              break;
            }
          }
          return res;
        }
      }
    };
    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];
    records.forEach(({ $: item, i: idx }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);
        if (expResults.length) {
          if (!resultMap[idx]) {
            resultMap[idx] = { idx, item, matches: [] };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({ matches }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });
    return results;
  }
  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const { keys, records } = this._myIndex;
    const results = [];
    records.forEach(({ $: item, i: idx }) => {
      if (!isDefined(item)) {
        return;
      }
      let matches = [];
      keys.forEach((key, keyIndex) => {
        matches.push(...this._findMatches({
          key,
          value: item[keyIndex],
          searcher
        }));
      });
      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });
    return results;
  }
  _findMatches({ key, value, searcher }) {
    if (!isDefined(value)) {
      return [];
    }
    let matches = [];
    if (isArray(value)) {
      value.forEach(({ v: text, i: idx, n: norm2 }) => {
        if (!isDefined(text)) {
          return;
        }
        const { isMatch, score, indices } = searcher.searchIn(text);
        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm: norm2,
            indices
          });
        }
      });
    } else {
      const { v: text, n: norm2 } = value;
      const { isMatch, score, indices } = searcher.searchIn(text);
      if (isMatch) {
        matches.push({ score, key, value: text, norm: norm2, indices });
      }
    }
    return matches;
  }
};
Fuse.version = "6.4.6";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
{
  Fuse.parseQuery = parse;
}
{
  register(ExtendedSearch);
}
var fuse_esm_default = Fuse;

// src/ui/SilentFileAndTagSuggester.ts
var TagOrFile;
(function(TagOrFile2) {
  TagOrFile2[TagOrFile2["Tag"] = 0] = "Tag";
  TagOrFile2[TagOrFile2["File"] = 1] = "File";
})(TagOrFile || (TagOrFile = {}));
var FILE_LINK_REGEX = new RegExp(/\[\[([^\]]*)$/);
var TAG_REGEX = new RegExp(/#([^ ]*)$/);
var SilentFileAndTagSuggester = class extends TextInputSuggest {
  constructor(app2, inputEl) {
    super(app2, inputEl);
    this.app = app2;
    this.inputEl = inputEl;
    this.lastInput = "";
    this.files = app2.vault.getMarkdownFiles();
    this.unresolvedLinkNames = this.getUnresolvedLinkNames(app2);
    this.tags = Object.keys(app2.metadataCache.getTags());
  }
  getSuggestions(inputStr) {
    const cursorPosition = this.inputEl.selectionStart;
    const inputBeforeCursor = inputStr.substr(0, cursorPosition);
    const fileLinkMatch = FILE_LINK_REGEX.exec(inputBeforeCursor);
    const tagMatch = TAG_REGEX.exec(inputBeforeCursor);
    let suggestions = [];
    if (tagMatch) {
      const tagInput = tagMatch[1];
      this.lastInput = tagInput;
      this.lastInputType = 0;
      suggestions = this.tags.filter((tag) => tag.toLowerCase().contains(tagInput.toLowerCase()));
    }
    if (fileLinkMatch) {
      const fileNameInput = fileLinkMatch[1];
      this.lastInput = fileNameInput;
      this.lastInputType = 1;
      suggestions = this.files.filter((file) => file.path.toLowerCase().contains(fileNameInput.toLowerCase())).map((file) => file.path);
      suggestions.push(...this.unresolvedLinkNames.filter((name) => name.toLowerCase().contains(fileNameInput.toLowerCase())));
    }
    const fuse = new fuse_esm_default(suggestions, { findAllMatches: true, threshold: 0.8 });
    return fuse.search(this.lastInput).map((value) => value.item);
  }
  renderSuggestion(item, el) {
    if (item)
      el.setText(item);
  }
  selectSuggestion(item) {
    const cursorPosition = this.inputEl.selectionStart;
    const lastInputLength = this.lastInput.length;
    const currentInputValue = this.inputEl.value;
    let insertedEndPosition = 0;
    if (this.lastInputType === 1) {
      const linkFile = this.app.vault.getAbstractFileByPath(item);
      if (linkFile instanceof import_obsidian8.TFile) {
        insertedEndPosition = this.makeLinkObsidianMethod(linkFile, currentInputValue, cursorPosition, lastInputLength);
      } else {
        insertedEndPosition = this.makeLinkManually(currentInputValue, item.replace(/.md$/, ""), cursorPosition, lastInputLength);
      }
    }
    if (this.lastInputType === 0) {
      this.inputEl.value = this.getNewInputValueForTag(currentInputValue, item, cursorPosition, lastInputLength);
      insertedEndPosition = cursorPosition - lastInputLength + item.length - 1;
    }
    this.inputEl.trigger("input");
    this.close();
    this.inputEl.setSelectionRange(insertedEndPosition, insertedEndPosition);
  }
  makeLinkObsidianMethod(linkFile, currentInputValue, cursorPosition, lastInputLength) {
    const link = this.app.fileManager.generateMarkdownLink(linkFile, "");
    this.inputEl.value = this.getNewInputValueForFileLink(currentInputValue, link, cursorPosition, lastInputLength);
    return cursorPosition - lastInputLength + link.length + 2;
  }
  makeLinkManually(currentInputValue, item, cursorPosition, lastInputLength) {
    this.inputEl.value = this.getNewInputValueForFileName(currentInputValue, item, cursorPosition, lastInputLength);
    return cursorPosition - lastInputLength + item.length + 2;
  }
  getNewInputValueForFileLink(currentInputElValue, selectedItem, cursorPosition, lastInputLength) {
    return `${currentInputElValue.substr(0, cursorPosition - lastInputLength - 2)}${selectedItem}${currentInputElValue.substr(cursorPosition)}`;
  }
  getNewInputValueForFileName(currentInputElValue, selectedItem, cursorPosition, lastInputLength) {
    return `${currentInputElValue.substr(0, cursorPosition - lastInputLength)}${selectedItem}]]${currentInputElValue.substr(cursorPosition)}`;
  }
  getNewInputValueForTag(currentInputElValue, selectedItem, cursorPosition, lastInputLength) {
    return `${currentInputElValue.substr(0, cursorPosition - lastInputLength - 1)}${selectedItem}${currentInputElValue.substr(cursorPosition)}`;
  }
  getUnresolvedLinkNames(app2) {
    const unresolvedLinks = app2.metadataCache.unresolvedLinks;
    const unresolvedLinkNames = new Set();
    for (const sourceFileName in unresolvedLinks) {
      for (const unresolvedLink in unresolvedLinks[sourceFileName]) {
        unresolvedLinkNames.add(unresolvedLink);
      }
    }
    return Array.from(unresolvedLinkNames);
  }
};

// src/ui/QuickCapture.ts
var QuickCaptureModal = class extends import_obsidian9.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
  }
  async submitForm(qcText) {
    if (qcText.trim().length === 0)
      return;
    copyOrPushLineOrSelectionToNewLocationWithFileLineSuggester(this.plugin, true, qcText);
    this.close();
  }
  onOpen() {
    let qcInput = "";
    this.titleEl.createEl("div", "Quick Capture").setText("Quick Capture");
    this.contentEl.createEl("form", {}, (formEl) => {
      new import_obsidian9.Setting(formEl).addTextArea((textEl) => {
        textEl.onChange((value) => qcInput = value);
        textEl.inputEl.rows = 6;
        if (import_obsidian9.Platform.isIosApp)
          textEl.inputEl.style.width = "100%";
        else if (import_obsidian9.Platform.isDesktopApp) {
          textEl.inputEl.rows = 10;
          textEl.inputEl.cols = 100;
        }
        textEl.inputEl.addEventListener("keydown", async (e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            await this.submitForm(qcInput);
          }
        });
        window.setTimeout(() => textEl.inputEl.focus(), 10);
        this.suggester = new SilentFileAndTagSuggester(this.plugin.app, textEl.inputEl);
      });
      formEl.createDiv("modal-button-container", (buttonContainerEl) => {
        buttonContainerEl.createEl("button", { attr: { type: "submit" }, cls: "mod-cta", text: "Capture" }).addEventListener("click", async (e) => {
          e.preventDefault();
          await this.submitForm(qcInput);
        });
      });
    });
  }
};

// src/utils/bookmarks.ts
var import_obsidian10 = __toModule(require("obsidian"));
async function addBookmarkFromCurrentView(plugin) {
  const currentView = plugin.app.workspace.getActiveViewOfType(import_obsidian10.MarkdownView);
  if (!currentView || currentView.getMode() !== "source") {
    new import_obsidian10.Notice("A file must be in source edit mode to add a bookmark");
    return;
  }
  const currentLineText = currentView.editor.getLine(currentView.editor.getCursor().line);
  const locationChooser = new GenericFuzzySuggester(this);
  const data = new Array();
  data.push({ display: "TOP: Bookmark the top of the file ", info: "TOP" });
  data.push({ display: "TOP: Bookmark the top of the file and mark as a context menu location", info: "TOP*" });
  data.push({ display: "BOTTOM: Bookmark the bottom of the file ", info: "BOTTOM" });
  data.push({ display: "BOTTOM: Bookmark the bottom of the file and mark as a context menu location", info: "BOTTOM*" });
  if (currentLineText.length > 0) {
    data.push({ display: `Location: of selected text "${currentLineText}"`, info: currentLineText });
    data.push({ display: `Location: of selected text and mark as a context menu location "${currentLineText}"`, info: currentLineText + "*" });
  }
  locationChooser.setSuggesterData(data);
  locationChooser.display((location) => {
    let command = location.info;
    let prefix = "";
    if (location.info.indexOf("*") > 0) {
      command = command.replace("*", "");
      prefix = "*";
    }
    if (location) {
      const newBookmark = prefix + currentView.file.path + ";" + command;
      if (plugin.settings.bookmarks.split("\n").find((b) => b === newBookmark))
        new import_obsidian10.Notice(`The bookmark: ${newBookmark} already exists.`);
      else {
        plugin.settings.bookmarks = plugin.settings.bookmarks.trim() + "\n" + newBookmark;
        plugin.saveData(plugin.settings);
        new import_obsidian10.Notice(`The bookmark: ${newBookmark} saved.`);
      }
    }
  });
}
async function removeBookmark(plugin) {
  const bookmarks = plugin.settings.bookmarks.split("\n");
  if (bookmarks.length === 0)
    new import_obsidian10.Notice("There are no bookmarks defined.");
  else {
    const bookmarkChooser = new GenericFuzzySuggester(this);
    const data = new Array();
    for (const b of bookmarks)
      data.push({ display: b, info: b });
    bookmarkChooser.setSuggesterData(data);
    bookmarkChooser.display((bookmarkLine) => {
      const newBookmarks = bookmarks.filter((b) => b !== bookmarkLine.info);
      plugin.settings.bookmarks = newBookmarks.join("\n");
      plugin.saveData(plugin.settings);
    });
  }
}
async function openBookmark(plugin) {
  const bookmarks = plugin.settings.bookmarks.split("\n");
  if (bookmarks.length === 0)
    new import_obsidian10.Notice("There are no bookmarks defined.");
  else {
    const fileList = new Array();
    for (let i = bookmarks.length - 1; i >= 0; i--)
      fileList.unshift({ display: bookmarks[i], info: bookmarks[i] });
    const chooser = new GenericFuzzySuggester(plugin);
    chooser.setSuggesterData(fileList);
    chooser.setPlaceholder("Select a file");
    await chooser.display(async (fileSelected) => {
      const bookmarkInfo = await parseBookmarkForItsElements(plugin, fileSelected.info, false);
      openFileInObsidian(plugin, bookmarkInfo.fileName, bookmarkInfo.fileLineNumber, 0);
    });
  }
}

// src/ui/PluginCommands.ts
var PluginCommands = class {
  constructor(plugin) {
    this.commands = [
      {
        caption: "Quick Capture",
        shortcut: "QC",
        group: "QuickCapture",
        editModeOnly: false,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => new QuickCaptureModal(this.plugin).open()
      },
      {
        caption: "Select current line/expand to block",
        shortcut: "SB",
        group: "Selection",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentLine(this.plugin)
      },
      {
        caption: "Select block - previous",
        shortcut: "BP",
        group: "Selection",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => selectAdjacentBlock(this.plugin, false)
      },
      {
        caption: "Select block - next",
        shortcut: "BN",
        group: "Selection",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => selectAdjacentBlock(this.plugin, true)
      },
      {
        caption: "Select current line/expand up into previous block",
        group: "Selection",
        shortcut: "SP",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentSection(this.plugin, true)
      },
      {
        caption: "Select current line/expand down into next block",
        group: "Selection",
        shortcut: "SN",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "highlight-glyph",
        command: async () => selectCurrentSection(this.plugin, false)
      },
      {
        caption: "Replace link with text",
        shortcut: "RLT",
        group: "replace",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "lines-of-text",
        command: async () => {
          const linkInfo = testIfCursorIsOnALink(this.plugin);
          if (linkInfo)
            await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, false);
          else
            new import_obsidian11.Notice("No link selected in editor.");
        }
      },
      {
        caption: "Replace link with text & alias",
        shortcut: "RLA",
        group: "replace",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "lines-of-text",
        command: async () => {
          const linkInfo = testIfCursorIsOnALink(this.plugin);
          if (linkInfo)
            await copyBlockReferenceToCurrentCusorLocation(this.plugin, linkInfo, true);
          else
            new import_obsidian11.Notice("No link selected in editor.");
        }
      },
      {
        caption: "Copy block embeds from this selection",
        shortcut: "CC",
        group: "block",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "blocks",
        command: async () => addBlockRefsToSelection(this.plugin, true)
      },
      {
        caption: "Copy block embeds as an alias",
        shortcut: "CA",
        group: "block",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "blocks",
        command: async () => addBlockRefsToSelection(this.plugin, true, true, this.plugin.settings.blockRefAliasIndicator)
      },
      {
        caption: "Copy line/selection to another file",
        shortcut: "CLT",
        group: "ToFile",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "left-arrow-with-tail",
        command: async () => copyOrPushLineOrSelectionToNewLocationWithFileLineSuggester(this.plugin, true)
      },
      {
        caption: "Push line/selection to another file",
        shortcut: "PLT",
        group: "ToFile",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "left-arrow-with-tail",
        command: async () => copyOrPushLineOrSelectionToNewLocationWithFileLineSuggester(this.plugin, false)
      },
      {
        caption: "Push line/selection to another file as a block embed",
        shortcut: "PLB",
        group: "ToFile",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "left-arrow-with-tail",
        command: async () => pushBlockReferenceToAnotherFile(this.plugin)
      },
      {
        caption: "Send link of current note to a file",
        shortcut: "SLF",
        editModeOnly: true,
        group: "Send",
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "paper-plane",
        command: async () => copyCurrentFileNameAsLinkToNewLocation(this.plugin, false)
      },
      {
        caption: "Send link of current note to the Clipboard",
        shortcut: "SLC",
        editModeOnly: true,
        group: "Send",
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "paper-plane",
        command: async () => copyCurrentFileNameAsLinkToNewLocation(this.plugin, true)
      },
      {
        caption: "Copy line(s) from another file",
        shortcut: "CLF",
        editModeOnly: true,
        group: "FromFile",
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "right-arrow-with-tail",
        command: async () => copyOrPulLineOrSelectionFromAnotherLocation(this.plugin, true)
      },
      {
        caption: "Pull line(s) from another file",
        shortcut: "LLF",
        editModeOnly: true,
        group: "FromFile",
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "right-arrow-with-tail",
        command: async () => copyOrPulLineOrSelectionFromAnotherLocation(this.plugin, false)
      },
      {
        caption: "Pull Line(s) from another file as block embeds",
        shortcut: "LLB",
        group: "FromFile",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "right-arrow-with-tail",
        command: async () => pullBlockReferenceFromAnotherFile(this.plugin)
      },
      {
        caption: "Add a New Bookmark from this file",
        shortcut: "BA",
        group: "Bookmarks",
        editModeOnly: true,
        isContextMenuItem: true,
        cmItemEnabled: true,
        icon: "go-to-file",
        command: async () => addBookmarkFromCurrentView(this.plugin)
      },
      {
        caption: "Open a bookmarked file",
        shortcut: "BO",
        group: "Bookmarks",
        editModeOnly: false,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "go-to-file",
        command: async () => await openBookmark(this.plugin)
      },
      {
        caption: "Remove a Bookmark",
        shortcut: "BR",
        group: "Bookmarks",
        editModeOnly: true,
        isContextMenuItem: false,
        cmItemEnabled: false,
        icon: "go-to-file",
        command: async () => removeBookmark(this.plugin)
      }
    ];
    this.plugin = plugin;
    this.plugin.addCommand({
      id: this.plugin.appID + "-combinedCommands",
      name: "All Commands List",
      icon: "TextTransporter",
      callback: async () => {
        await this.masterControlProgram(this.plugin);
      }
    });
    false;
    for (let i = 0; i < this.commands.length; i++)
      if (this.plugin.settings["cMenuEnabled-" + this.commands[i].shortcut] !== void 0)
        this.commands[i].cmItemEnabled = this.plugin.settings["cMenuEnabled-" + this.commands[i].shortcut];
    this.plugin.registerEvent(this.plugin.app.workspace.on("editor-menu", (menu) => {
      menu.addSeparator();
      for (const value of this.commands) {
        let addCommand = false;
        if (value.cmItemEnabled === true && value.group !== "replace")
          addCommand = true;
        else if (value.cmItemEnabled === true && value.group === "replace" && testIfCursorIsOnALink(this.plugin))
          addCommand = true;
        if (addCommand) {
          menu.addItem((item) => {
            item.setTitle(value.caption).setIcon(value.icon).onClick(async () => {
              await value.command();
            });
          });
        }
      }
      const bookmarks = plugin.settings.bookmarks.split("\n");
      if (bookmarks.length > 0) {
        menu.addSeparator();
        for (const bookmark of bookmarks) {
          if (bookmark.substr(0, 1) === "*") {
            const bookmarkText = (bookmark.length >= 40 ? bookmark.substr(0, 40) + "..." : bookmark).replace("*", "");
            menu.addItem((item) => {
              item.setTitle("Copy to: " + bookmarkText).setIcon("star-list").onClick(async (e) => await copyOrPushLineOrSelectionToNewLocationUsingCurrentCursorLocationAndBoomark(plugin, true, bookmark, e));
            });
            menu.addItem((item) => {
              item.setTitle("Push to: " + bookmarkText).onClick(async (e) => await copyOrPushLineOrSelectionToNewLocationUsingCurrentCursorLocationAndBoomark(plugin, false, bookmark, e));
            });
          }
        }
      }
      menu.addSeparator();
    }));
    for (const value of Object.values(this.commands)) {
      if (value.editModeOnly) {
        this.plugin.addCommand({
          id: this.plugin.appID + "-" + value.shortcut,
          icon: value.icon,
          name: `${value.caption} (${value.shortcut})`,
          editorCallback: value.command
        });
      } else {
        this.plugin.addCommand({
          id: this.plugin.appID + "-" + value.shortcut,
          icon: value.icon,
          name: `${value.caption} (${value.shortcut})`,
          callback: value.command
        });
      }
    }
  }
  async reloadPlugin() {
    new import_obsidian11.Notice("Reloading plugin: " + this.plugin.appName);
    await app.plugins.disablePlugin("obsidian42-text-transporter");
    await app.plugins.enablePlugin("obsidian42-text-transporter");
  }
  async masterControlProgram(plugin) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian11.MarkdownView);
    let editMode = true;
    if (!currentView || currentView.getMode() !== "source")
      editMode = false;
    const gfs = new GenericFuzzySuggester(this.plugin);
    const cpCommands = [];
    for (const cmd of this.commands) {
      const activeView = getActiveViewType(plugin);
      let addCommand = false;
      if (cmd.group === "replace" && activeView === ViewType.source && testIfCursorIsOnALink(this.plugin))
        addCommand = true;
      else if (cmd.group !== "replace" && (cmd.editModeOnly === false || editMode && cmd.editModeOnly))
        addCommand = true;
      else if ((cmd.shortcut === "SLF" || cmd.shortcut === "SLC") && activeView != ViewType.none) {
        addCommand = true;
      }
      if (addCommand)
        cpCommands.push({ display: `${cmd.caption} (${cmd.shortcut})`, info: cmd.command });
    }
    if (editMode) {
      for (const bookmark of plugin.settings.bookmarks.split("\n")) {
        if (bookmark.substr(0, 1) === "*") {
          cpCommands.push({ display: `Copy to: ${bookmark}`, info: async (e) => {
            await copyOrPushLineOrSelectionToNewLocationUsingCurrentCursorLocationAndBoomark(plugin, true, bookmark, e);
          } });
          cpCommands.push({ display: `   Push: ${bookmark}`, info: async (e) => {
            await copyOrPushLineOrSelectionToNewLocationUsingCurrentCursorLocationAndBoomark(plugin, false, bookmark, e);
          } });
        }
      }
    }
    if (this.plugin.settings.enableDebugMode)
      cpCommands.push({ display: "Reload plugin (Debugging)", info: async () => this.reloadPlugin() });
    gfs.setSuggesterData(cpCommands);
    gfs.display(async (i, evt) => i.info(evt));
  }
};

// src/ui/SettingsTab.ts
var import_obsidian12 = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  enableRibbon: true,
  enableDebugMode: false,
  blockRefAliasIndicator: "*",
  bookmarks: ""
};
var SettingsTab = class extends import_obsidian12.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.plugin.appName });
    new import_obsidian12.Setting(containerEl).setName("Enable Ribbon Support").setDesc("Toggle on and off the plugin button in the ribbon.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbon);
      cb.onChange(async (value) => {
        this.plugin.settings.enableRibbon = value;
        if (this.plugin.settings.enableRibbon === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.configureRibbonCommand();
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian12.Setting(containerEl).setName("Alias Placeholder").setDesc("Placeholder text used for an aliased block reference.").addText((text) => text.setValue(this.plugin.settings.blockRefAliasIndicator).onChange(async (value) => {
      if (value.trim() === "")
        this.plugin.settings.blockRefAliasIndicator = "*";
      else
        this.plugin.settings.blockRefAliasIndicator = value;
      await this.plugin.saveSettings();
    }));
    containerEl.createEl("h2", { text: "Bookmarks" });
    new import_obsidian12.Setting(containerEl).setName("Bookmarks").setDesc(`Predefined destinations within files that appear at the top of the file selector. 
						Each line represents one bookmark. The line starts with the path to the file (ex: directory1/subdirectory/filename.md) 
						If just the file path is provided, the file contents will be shown for insertion.
						If after the file name there is a semicolon followed by either: TOP BOTTOM or text to find in the document as an insertion point. Example:

						directory1/subdirectory/filename1.md;TOP  directory1/subdirectory/filename2.md;BOTTOM  directory1/subdirectory/filename3.md;# Inbox
						Optionally DNPTODAY can be used in the place of a file name to default to today's Daily Notes Page.
						`).addTextArea((textEl) => {
      textEl.setPlaceholder(" directory1/subdirectory/filename1.md;\n directory1/subdirectory/filename2.md;TOP\n directory1/subdirectory/filename3.md;BOTTOM\n directory1/subdirectory/filename4.md;# Inbox").setValue(this.plugin.settings.bookmarks || "").onChange((value) => {
        this.plugin.settings.bookmarks = value;
        this.plugin.saveData(this.plugin.settings);
      });
      textEl.inputEl.rows = 6;
      if (import_obsidian12.Platform.isIosApp)
        textEl.inputEl.style.width = "100%";
      else if (import_obsidian12.Platform.isDesktopApp) {
        textEl.inputEl.rows = 15;
        textEl.inputEl.cols = 120;
      }
    });
    const desc = document.createDocumentFragment();
    desc.append(desc.createEl("a", {
      href: "https://github.com/TfTHacker/obsidian42-text-transporter/blob/main/README-Bookmarks.md",
      text: "Additional documentation  for bookmarks."
    }));
    containerEl.createEl("div", { text: "" }).append(desc);
    containerEl.createEl("h2", { text: "Context Menu Commands: Enable/Disable" });
    for (const command of this.plugin.commands.commands) {
      new import_obsidian12.Setting(containerEl).setName(command.caption).addToggle((cb) => {
        cb.setValue(command.cmItemEnabled);
        cb.onChange(async (value) => {
          command.cmItemEnabled = value;
          this.plugin.settings["cMenuEnabled-" + command.shortcut] = value;
          await this.plugin.saveSettings();
        });
      });
    }
    containerEl.createEl("h2", { text: "Debugging support" });
    new import_obsidian12.Setting(containerEl).setName("Debugging support").setDesc("Toggle on and off debugging support for troubleshooting problems. This may require restarting Obsidian. Also a blackhole may open in your neigborhood.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableDebugMode);
      cb.onChange(async (value) => {
        this.plugin.settings.enableDebugMode = value;
        await this.plugin.saveSettings();
      });
    });
  }
};

// src/ui/icons.ts
var import_obsidian13 = __toModule(require("obsidian"));
function addIcons() {
  (0, import_obsidian13.addIcon)("TextTransporter", `<path fill="currentColor" stroke="currentColor"  d="M 28.324219 21.484375 C 28.324219 25.257812 25.261719 28.320312 21.488281 28.320312 C 17.714844 28.320312 14.652344 25.257812 14.652344 21.484375 C 14.652344 17.707031 17.714844 14.648438 21.488281 14.648438 C 25.261719 14.648438 28.324219 17.707031 28.324219 21.484375 Z M 28.324219 21.484375 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 36.679688 36.671875 C 40.738281 32.617188 42.972656 27.222656 42.972656 21.484375 C 42.972656 9.636719 33.335938 0 21.488281 0 C 9.644531 0 0.00390625 9.636719 0.00390625 21.484375 C 0.00390625 27.222656 2.242188 32.617188 6.296875 36.671875 L 21.488281 51.863281 Z M 8.792969 21.484375 C 8.792969 14.484375 14.488281 8.789062 21.488281 8.789062 C 28.488281 8.789062 34.183594 14.484375 34.183594 21.484375 C 34.183594 28.484375 28.488281 34.175781 21.488281 34.175781 C 14.488281 34.175781 8.792969 28.484375 8.792969 21.484375 Z M 8.792969 21.484375 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 84.371094 62.28125 C 75.753906 62.28125 68.746094 69.289062 68.746094 77.902344 C 68.746094 82.078125 70.371094 86 73.320312 88.953125 L 84.371094 100 L 95.417969 88.953125 C 98.367188 86 99.992188 82.078125 99.992188 77.902344 C 99.992188 69.289062 92.984375 62.28125 84.371094 62.28125 Z M 84.371094 62.28125 "/>
         <path fill="currentColor" stroke="currentColor"  d="M 24.417969 81.132812 C 24.417969 73.96875 30.246094 68.140625 37.414062 68.140625 L 48.285156 68.140625 C 54.71875 68.140625 59.957031 62.902344 59.957031 56.464844 C 59.957031 50.027344 54.71875 44.792969 48.285156 44.792969 L 36.917969 44.792969 L 36.917969 50.652344 L 48.285156 50.652344 C 51.488281 50.652344 54.097656 53.257812 54.097656 56.464844 C 54.097656 59.671875 51.488281 62.28125 48.285156 62.28125 L 37.414062 62.28125 C 27.015625 62.28125 18.558594 70.738281 18.558594 81.132812 C 18.558594 91.53125 27.015625 99.988281 37.414062 99.988281 L 70.113281 99.988281 L 70.113281 94.128906 L 37.414062 94.128906 C 30.246094 94.128906 24.417969 88.300781 24.417969 81.132812 Z M 24.417969 81.132812 "/>`);
}

// src/main.ts
var ThePlugin = class extends import_obsidian14.Plugin {
  constructor() {
    super(...arguments);
    this.appName = "Obsidian42 - Text Transporter";
    this.appID = "obsidian42-text-transporter";
  }
  async onload() {
    console.log("loading " + this.appName);
    this.fs = new FileSystem(this);
    await this.loadSettings();
    this.commands = new PluginCommands(this);
    addIcons();
    if (this.settings.enableRibbon)
      this.configureRibbonCommand();
    this.addSettingTab(new SettingsTab(this.app, this));
  }
  onunload() {
    console.log("unloading " + this.appName);
  }
  configureRibbonCommand() {
    this.ribbonIcon = this.addRibbonIcon("TextTransporter", this.appName, async () => this.commands.masterControlProgram(this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
