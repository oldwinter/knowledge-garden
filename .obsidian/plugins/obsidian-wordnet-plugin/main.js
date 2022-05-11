var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __reflectGet = Reflect.get;
var __reflectSet = Reflect.set;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => WordNetPlugin
});
var import_obsidian6 = __toModule(require("obsidian"));

// src/EditSuggest.ts
var import_obsidian = __toModule(require("obsidian"));
var TheEditorSuggestor = class extends import_obsidian.EditorSuggest {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.updatePattern();
  }
  updatePattern() {
    this.pattern = new RegExp(`.*${this.plugin.settings.slashCommandShortcut}(.*)$`);
  }
  onTrigger(cursor, editor, _file) {
    if (this.plugin.settings.slashCommandEnabled === false)
      return;
    const range = editor.getRange({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: cursor.ch });
    const testResults = this.pattern.exec(range);
    if (!testResults)
      return null;
    else {
      const suggestText = testResults[1];
      this.lastEditorSuggestTriggerInfo = {
        start: { line: cursor.line, ch: cursor.ch - suggestText.length - this.plugin.settings.slashCommandShortcut.length },
        end: { line: cursor.line, ch: cursor.ch },
        query: testResults[1]
      };
      return this.lastEditorSuggestTriggerInfo;
    }
  }
  getSuggestions(context) {
    return this.plugin.dictionarySuggestor.query(context.query);
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.Term });
    el.createEl("br");
    el.appendText(item.Definition);
  }
  selectSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    this.close();
    if (evt.ctrlKey) {
      new import_obsidian.Notice(item.Term + " \n" + item.Definition, 6e4);
      currentView.editor.replaceRange("", this.lastEditorSuggestTriggerInfo.start, this.lastEditorSuggestTriggerInfo.end);
    } else
      currentView.editor.replaceRange(this.plugin.renderDefinitionFromTemplate(item.Term, item.Definition), this.lastEditorSuggestTriggerInfo.start, this.lastEditorSuggestTriggerInfo.end);
  }
};

// src/suggester.ts
var import_obsidian2 = __toModule(require("obsidian"));
var DictionarySuggester = class extends import_obsidian2.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.setPlaceholder("type word to lookup in WordNet");
    setTimeout(() => __async(this, null, function* () {
      const pathWordNetJson = this.plugin.manifest.dir + "/dict-WordNet.json";
      const adapter = this.app.vault.adapter;
      if (yield adapter.exists(pathWordNetJson)) {
        const fileWordNet = yield adapter.read(pathWordNetJson);
        this.wordNet = yield JSON.parse(fileWordNet);
      } else {
        if (navigator.onLine === false) {
          new import_obsidian2.Notice("You do not have an internet connection, and the WordNet dictionary cannot be downloaded. Please restore your interent connection and resteart Obsidian", 3e4);
          this.plugin.unload();
        } else {
          const downloadMessage = new import_obsidian2.Notice("WordNet dictionary is being downloaded, this may take a few minutes. This message will disappear when the process is complete.", 0);
          try {
            const response = yield (0, import_obsidian2.request)({ url: "https://github.com/TfTHacker/Obsidian-WordNet/releases/download/WordNetJson/dict-WordNet.json" });
            downloadMessage.hide();
            if (response === "Not Found" || response === `{"error":"Not Found"}`) {
              new import_obsidian2.Notice(`The WordNet dictionary file is not currently available for download. Please try again later or contact the developer on Twitter: @TfThacker for support.`, 3e4);
              this.plugin.unload();
            } else {
              this.wordNet = yield JSON.parse(response);
              yield adapter.write(pathWordNetJson, JSON.stringify(this.wordNet));
            }
          } catch (e) {
            console.log(`Error in WordNet dictinary: ${e}`);
            new import_obsidian2.Notice(`An error has occured with the download, please try again later: ${e}`);
            this.plugin.unload();
          }
        }
      }
      if (yield adapter.exists(this.plugin.manifest.dir + "/dict-MyDict.json")) {
        const fileCustomDict = yield adapter.read(this.plugin.manifest.dir + "/dict-MyDict.json");
        this.customDict = yield JSON.parse(fileCustomDict);
      } else
        this.customDict = null;
    }), 10);
  }
  query(term) {
    const results = [];
    const searchTerm = term.toLocaleLowerCase();
    let countOfFoundMatches = 0;
    if (this.customDict != null) {
      for (let i = 0; i < this.customDict.length && countOfFoundMatches < 30; i++) {
        const item = this.customDict[i];
        if (item["SearchTerm"].startsWith(searchTerm)) {
          results.push(this.customDict[i]);
          countOfFoundMatches++;
        }
      }
    }
    countOfFoundMatches = 0;
    for (let i = 0; i < this.wordNet.length && countOfFoundMatches < 20; i++) {
      const item = this.wordNet[i];
      if (item["SearchTerm"].startsWith(searchTerm)) {
        results.push(this.wordNet[i]);
        countOfFoundMatches++;
      }
    }
    return results;
  }
  getItems() {
    let searchTerm = "";
    if (this.inputEl.value.trim().length == 0) {
      const currentView = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
      if (currentView != null && currentView.getMode() != void 0 && currentView.editor.somethingSelected()) {
        searchTerm = currentView.editor.getSelection();
        this.inputEl.value = searchTerm;
        this.inputEl.setSelectionRange(0, searchTerm.length);
      }
    } else
      searchTerm = this.inputEl.value.trim();
    return searchTerm === "" ? [] : this.query(searchTerm);
  }
  getItemText(item) {
    return item.SearchTerm;
  }
  onChooseItem(item, evt) {
  }
  renderSuggestion(item, el) {
    el.createEl("b", { text: item.item.Term });
    el.createEl("br");
    el.appendText(item.item.Definition);
  }
  onChooseSuggestion(item, evt) {
    const currentView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (currentView != null && currentView.getMode() === "source")
      currentView.editor.replaceSelection(this.plugin.renderDefinitionFromTemplate(item.item.Term, item.item.Definition));
    else
      new import_obsidian2.Notice(item.item.Term + " \n" + item.item.Definition, 1e4);
  }
};

// src/settings.ts
var import_obsidian3 = __toModule(require("obsidian"));
var import_obsidian4 = __toModule(require("obsidian"));
var DEFAULT_SETTINGS = {
  enableRibbon: true,
  slashCommandEnabled: true,
  slashCommandShortcut: ";;",
  insertTemplate: "**{term}**\n{definition}\n"
};
var WordNetSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Obsidian42 - WordNet Dictionary Setting" });
    containerEl.createEl("b", { text: "Ribbon Support" });
    new import_obsidian3.Setting(containerEl).setName("Enable Ribbon Support").setDesc("Toggle on and off the WordNet dictionary button in the ribbon.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.enableRibbon);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.enableRibbon = value;
        if (this.plugin.settings.enableRibbon === false)
          this.plugin.ribbonIcon.remove();
        else
          this.plugin.configureRibbonCommand();
        yield this.plugin.saveSettings();
      }));
    });
    containerEl.createEl("b", { text: "Slash Command" });
    new import_obsidian3.Setting(containerEl).setName("Enable the Slash Command").setDesc("Toggle on and off the slash command.").addToggle((cb) => {
      cb.setValue(this.plugin.settings.slashCommandEnabled);
      cb.onChange((value) => __async(this, null, function* () {
        this.plugin.settings.slashCommandEnabled = value;
        yield this.plugin.saveSettings();
      }));
    });
    let cbShortcut;
    new import_obsidian3.Setting(containerEl).setName("Slash Command Characters").setDesc("The characters that will invoke the slash command. The command character cannot be a space.").addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.slashCommandShortcut = DEFAULT_SETTINGS.slashCommandShortcut;
        yield this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
        cbShortcut.setValue(this.plugin.settings.slashCommandShortcut);
      }));
    }).addText((cb) => {
      cbShortcut = cb;
      cb.setValue(this.plugin.settings.slashCommandShortcut);
      cb.onChange((value) => __async(this, null, function* () {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.slashCommandShortcut : value;
        this.plugin.settings.slashCommandShortcut = newValue;
        yield this.plugin.saveSettings();
        this.plugin.editSuggester.updatePattern();
      }));
    });
    containerEl.createEl("b", { text: "Template" });
    let cbTemplate;
    new import_obsidian3.Setting(containerEl).setName("Template for inserting a definition").setDesc("The template used for inserting a WordNet definition. Use {term} for the term looked up and {definition} for the defintion of that term.").addExtraButton((b) => {
      b.setIcon("reset").setTooltip("Reset to default").onClick(() => __async(this, null, function* () {
        this.plugin.settings.insertTemplate = DEFAULT_SETTINGS.insertTemplate;
        yield this.plugin.saveSettings();
        cbTemplate.setValue(this.plugin.settings.insertTemplate);
      }));
    }).addTextArea((cb) => {
      cbTemplate = cb;
      cb.setValue(this.plugin.settings.insertTemplate);
      cb.onChange((value) => __async(this, null, function* () {
        const newValue = value.trim().length === 0 ? DEFAULT_SETTINGS.insertTemplate : value;
        this.plugin.settings.insertTemplate = newValue;
        yield this.plugin.saveSettings();
      }));
      cb.inputEl.rows = 2;
      cb.inputEl.cols = 40;
    });
  }
};

// src/icons.ts
var import_obsidian5 = __toModule(require("obsidian"));
function addIcons() {
  (0, import_obsidian5.addIcon)("wordnet", `<path fill="currentColor" stroke="currentColor" d="M 81.867188 20.132812 L 81.867188 5.859375 L 84.144531 5.859375 C 85.761719 5.859375 87.074219 4.546875 87.074219 2.929688 C 87.074219 1.3125 85.761719 0 84.144531 0 L 24.375 0 C 18.0625 0 12.925781 5.125 12.925781 11.429688 L 12.925781 92.230469 C 12.925781 96.515625 16.417969 100 20.707031 100 L 79.78125 100 C 83.800781 100 87.074219 96.730469 87.074219 92.714844 L 87.074219 26.570312 C 87.074219 23.414062 84.835938 20.773438 81.867188 20.132812 Z M 18.785156 11.429688 C 18.785156 8.359375 21.292969 5.859375 24.375 5.859375 L 76.007812 5.859375 L 76.007812 19.988281 L 24.375 19.988281 C 21.292969 19.988281 18.785156 17.488281 18.785156 14.417969 Z M 81.214844 92.714844 C 81.214844 93.5 80.570312 94.140625 79.78125 94.140625 L 20.707031 94.140625 C 19.648438 94.140625 18.785156 93.285156 18.785156 92.230469 L 18.785156 24.390625 C 20.441406 25.316406 22.347656 25.847656 24.375 25.847656 L 80.480469 25.847656 C 80.882812 25.847656 81.214844 26.171875 81.214844 26.570312 Z M 81.214844 92.714844 "/>
		<path fill="currentColor" stroke="currentColor" d="M 33.519531 45.613281 C 33.359375 45.121094 32.476562 44.074219 30.503906 44.074219 C 28.269531 44.074219 27.648438 45.121094 27.488281 45.613281 L 21.992188 63.644531 C 21.832031 64.316406 22.25 64.925781 22.890625 65.296875 C 23.53125 65.671875 24.199219 65.859375 24.886719 65.859375 C 25.734375 65.859375 26.238281 65.574219 26.394531 65.003906 L 27.398438 61.308594 L 33.636719 61.308594 L 34.640625 65.003906 C 34.800781 65.574219 35.300781 65.859375 36.148438 65.859375 C 36.839844 65.859375 37.503906 65.671875 38.144531 65.296875 C 38.785156 64.925781 39.183594 64.222656 39.046875 63.644531 Z M 28.347656 57.761719 L 30.503906 49.839844 L 32.660156 57.761719 Z M 28.347656 57.761719 "/>
		<path fill="currentColor" stroke="currentColor" d="M 54.359375 54.15625 C 56.03125 53.425781 56.871094 51.878906 56.871094 49.511719 C 56.871094 46.007812 54.898438 44.25 50.957031 44.25 L 44.898438 44.25 C 43.40625 44.25 42.890625 45.21875 42.890625 45.671875 L 42.890625 64.46875 C 42.890625 64.84375 43.457031 65.859375 44.898438 65.859375 L 51.460938 65.859375 C 53.273438 65.859375 54.71875 65.351562 55.792969 64.335938 C 56.867188 63.324219 57.402344 61.710938 57.402344 59.503906 L 57.402344 58.882812 C 57.402344 57.503906 57.148438 56.464844 56.632812 55.765625 C 56.121094 55.066406 55.363281 54.527344 54.359375 54.15625 Z M 47.472656 48.273438 L 50.574219 48.273438 C 52.148438 48.273438 52.257812 49.789062 52.257812 50.339844 C 52.257812 50.894531 52.074219 52.378906 50.574219 52.378906 L 47.472656 52.378906 Z M 52.792969 59.121094 C 52.792969 60.933594 52.003906 61.839844 50.425781 61.839844 L 47.472656 61.839844 L 47.472656 55.929688 L 50.425781 55.929688 C 52.003906 55.929688 52.792969 56.835938 52.792969 58.648438 Z M 52.792969 59.121094 "/>
		<path fill="currentColor" stroke="currentColor" d="M 68.902344 48.273438 C 70.597656 48.273438 71.472656 49.160156 71.53125 50.933594 C 71.589844 51.859375 72.359375 52.320312 73.835938 52.320312 C 75.21875 52.320312 76.144531 51.78125 76.144531 50.132812 C 76.144531 48.300781 75.449219 46.863281 74.058594 45.820312 C 72.671875 44.773438 70.890625 44.253906 68.722656 44.253906 C 66.617188 44.253906 64.90625 44.8125 63.59375 45.9375 C 62.285156 47.058594 61.628906 48.824219 61.628906 51.226562 L 61.628906 59.0625 C 61.628906 61.464844 62.285156 63.230469 63.59375 64.351562 C 64.90625 65.476562 66.617188 66.039062 68.722656 66.039062 C 70.890625 66.039062 72.671875 65.484375 74.058594 64.382812 C 75.449219 63.277344 76.144531 61.769531 76.144531 59.859375 C 76.144531 58.714844 75.660156 57.671875 73.808594 57.671875 C 72.371094 57.671875 71.609375 58.136719 71.53125 59.0625 C 71.421875 60.222656 70.800781 62.015625 68.929688 62.015625 C 67.136719 62.015625 66.242188 61.03125 66.242188 59.0625 L 66.242188 51.226562 C 66.242188 49.257812 67.128906 48.273438 68.902344 48.273438 Z M 68.902344 48.273438 "/>`);
}

// src/main.ts
var WordNetPlugin = class extends import_obsidian6.Plugin {
  configureRibbonCommand() {
    this.ribbonIcon = this.addRibbonIcon("wordnet", "WordNet Dictionary", () => __async(this, null, function* () {
      this.dictionarySuggestor.open();
    }));
  }
  onload() {
    return __async(this, null, function* () {
      console.log("loading WordNet plugin");
      yield this.loadSettings();
      addIcons();
      this.addSettingTab(new WordNetSettingTab(this.app, this));
      this.dictionarySuggestor = new DictionarySuggester(this);
      if (this.settings.enableRibbon)
        this.configureRibbonCommand();
      this.addCommand({
        id: "open-wordnet-suggestor",
        name: "Look up a word",
        callback: () => {
          this.dictionarySuggestor.open();
        }
      });
      this.editSuggester = new TheEditorSuggestor(this);
      this.registerEditorSuggest(this.editSuggester);
    });
  }
  onunload() {
    console.log("unloading WordNet plugin");
  }
  renderDefinitionFromTemplate(term, definition) {
    return this.settings.insertTemplate.replace("{term}", term).replace("{definition}", definition);
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
