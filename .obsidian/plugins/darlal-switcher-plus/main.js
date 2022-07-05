'use strict';

var obsidian = require('obsidian');

var PathDisplayFormat;
(function (PathDisplayFormat) {
    PathDisplayFormat[PathDisplayFormat["None"] = 0] = "None";
    PathDisplayFormat[PathDisplayFormat["Full"] = 1] = "Full";
    PathDisplayFormat[PathDisplayFormat["FolderOnly"] = 2] = "FolderOnly";
    PathDisplayFormat[PathDisplayFormat["FolderWithFilename"] = 3] = "FolderWithFilename";
})(PathDisplayFormat || (PathDisplayFormat = {}));
var Mode;
(function (Mode) {
    Mode[Mode["Standard"] = 1] = "Standard";
    Mode[Mode["EditorList"] = 2] = "EditorList";
    Mode[Mode["SymbolList"] = 4] = "SymbolList";
    Mode[Mode["WorkspaceList"] = 8] = "WorkspaceList";
    Mode[Mode["HeadingsList"] = 16] = "HeadingsList";
    Mode[Mode["StarredList"] = 32] = "StarredList";
    Mode[Mode["CommandList"] = 64] = "CommandList";
    Mode[Mode["RelatedItemsList"] = 128] = "RelatedItemsList";
})(Mode || (Mode = {}));
var SymbolType;
(function (SymbolType) {
    SymbolType[SymbolType["Link"] = 1] = "Link";
    SymbolType[SymbolType["Embed"] = 2] = "Embed";
    SymbolType[SymbolType["Tag"] = 4] = "Tag";
    SymbolType[SymbolType["Heading"] = 8] = "Heading";
})(SymbolType || (SymbolType = {}));
var LinkType;
(function (LinkType) {
    LinkType[LinkType["None"] = 0] = "None";
    LinkType[LinkType["Normal"] = 1] = "Normal";
    LinkType[LinkType["Heading"] = 2] = "Heading";
    LinkType[LinkType["Block"] = 4] = "Block";
})(LinkType || (LinkType = {}));
const SymbolIndicators = {};
SymbolIndicators[SymbolType.Link] = '🔗';
SymbolIndicators[SymbolType.Embed] = '!';
SymbolIndicators[SymbolType.Tag] = '#';
SymbolIndicators[SymbolType.Heading] = 'H';
const HeadingIndicators = {};
HeadingIndicators[1] = 'H₁';
HeadingIndicators[2] = 'H₂';
HeadingIndicators[3] = 'H₃';
HeadingIndicators[4] = 'H₄';
HeadingIndicators[5] = 'H₅';
HeadingIndicators[6] = 'H₆';
var SuggestionType;
(function (SuggestionType) {
    SuggestionType["EditorList"] = "editorList";
    SuggestionType["SymbolList"] = "symbolList";
    SuggestionType["WorkspaceList"] = "workspaceList";
    SuggestionType["HeadingsList"] = "headingsList";
    SuggestionType["StarredList"] = "starredList";
    SuggestionType["CommandList"] = "commandList";
    SuggestionType["RelatedItemsList"] = "relatedItemsList";
    SuggestionType["File"] = "file";
    SuggestionType["Alias"] = "alias";
    SuggestionType["Unresolved"] = "unresolved";
})(SuggestionType || (SuggestionType = {}));

function isOfType(obj, discriminator, val) {
    let ret = false;
    if (obj && obj[discriminator] !== undefined) {
        ret = true;
        if (val !== undefined && val !== obj[discriminator]) {
            ret = false;
        }
    }
    return ret;
}
function isSymbolSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.SymbolList);
}
function isEditorSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.EditorList);
}
function isWorkspaceSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.WorkspaceList);
}
function isHeadingSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.HeadingsList);
}
function isCommandSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.CommandList);
}
function isFileSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.File);
}
function isAliasSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.Alias);
}
function isUnresolvedSuggestion(obj) {
    return isOfType(obj, 'type', SuggestionType.Unresolved);
}
function isSystemSuggestion(obj) {
    return isFileSuggestion(obj) || isUnresolvedSuggestion(obj) || isAliasSuggestion(obj);
}
function isExSuggestion(sugg) {
    return sugg && !isSystemSuggestion(sugg);
}
function isHeadingCache(obj) {
    return isOfType(obj, 'level');
}
function isTagCache(obj) {
    return isOfType(obj, 'tag');
}
function isTFile(obj) {
    return isOfType(obj, 'extension');
}
function isFileStarredItem(obj) {
    return isOfType(obj, 'type', 'file');
}
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getInternalPluginById(app, id) {
    return app?.internalPlugins?.getPluginById(id);
}
function getSystemSwitcherInstance(app) {
    const plugin = getInternalPluginById(app, 'switcher');
    return plugin?.instance;
}
function stripMDExtensionFromPath(file) {
    let retVal = null;
    if (file) {
        const { path } = file;
        retVal = path;
        if (file.extension === 'md') {
            const index = path.lastIndexOf('.');
            if (index !== -1 && index !== path.length - 1 && index !== 0) {
                retVal = path.slice(0, index);
            }
        }
    }
    return retVal;
}
function filenameFromPath(path) {
    let retVal = null;
    if (path) {
        const index = path.lastIndexOf('/');
        retVal = index === -1 ? path : path.slice(index + 1);
    }
    return retVal;
}
function matcherFnForRegExList(regExStrings) {
    regExStrings = regExStrings ?? [];
    const regExList = [];
    for (const str of regExStrings) {
        try {
            const rx = new RegExp(str);
            regExList.push(rx);
        }
        catch (err) {
            console.log(`Switcher++: error creating RegExp from string: ${str}`, err);
        }
    }
    const isMatchFn = (input) => {
        for (const rx of regExList) {
            if (rx.test(input)) {
                return true;
            }
        }
        return false;
    };
    return isMatchFn;
}
function getLinkType(linkCache) {
    let type = LinkType.None;
    if (linkCache) {
        // remove the display text before trying to parse the link target
        const linkStr = linkCache.link.split('|')[0];
        if (linkStr.includes('#^')) {
            type = LinkType.Block;
        }
        else if (linkStr.includes('#')) {
            type = LinkType.Heading;
        }
        else {
            type = LinkType.Normal;
        }
    }
    return type;
}

class FrontMatterParser {
    static getAliases(frontMatter) {
        let aliases = [];
        if (frontMatter) {
            aliases = FrontMatterParser.getValueForKey(frontMatter, /^alias(es)?$/i);
        }
        return aliases;
    }
    static getValueForKey(frontMatter, keyPattern) {
        const retVal = [];
        const fmKeys = Object.keys(frontMatter);
        const key = fmKeys.find((val) => keyPattern.test(val));
        if (key) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            let value = frontMatter[key];
            if (typeof value === 'string') {
                value = value.split(',');
            }
            if (Array.isArray(value)) {
                value.forEach((val) => {
                    if (typeof val === 'string') {
                        retVal.push(val.trim());
                    }
                });
            }
        }
        return retVal;
    }
}

class SwitcherPlusSettings {
    constructor(plugin) {
        this.plugin = plugin;
        this.data = SwitcherPlusSettings.defaults;
    }
    static get defaults() {
        const enabledSymbolTypes = {};
        enabledSymbolTypes[SymbolType.Link] = true;
        enabledSymbolTypes[SymbolType.Embed] = true;
        enabledSymbolTypes[SymbolType.Tag] = true;
        enabledSymbolTypes[SymbolType.Heading] = true;
        return {
            onOpenPreferNewPane: true,
            alwaysNewPaneForSymbols: false,
            useActivePaneForSymbolsOnMobile: false,
            symbolsInLineOrder: true,
            editorListCommand: 'edt ',
            symbolListCommand: '@',
            workspaceListCommand: '+',
            headingsListCommand: '#',
            starredListCommand: "'",
            commandListCommand: '>',
            relatedItemsListCommand: '~',
            strictHeadingsOnly: false,
            searchAllHeadings: true,
            excludeViewTypes: ['empty'],
            referenceViews: ['backlink', 'localgraph', 'outgoing-link', 'outline'],
            limit: 50,
            includeSidePanelViewTypes: ['backlink', 'image', 'markdown', 'pdf'],
            enabledSymbolTypes,
            selectNearestHeading: true,
            excludeFolders: [],
            excludeLinkSubTypes: 0,
            excludeRelatedFolders: [''],
            excludeOpenRelatedFiles: false,
            excludeObsidianIgnoredFiles: false,
            shouldSearchFilenames: false,
            pathDisplayFormat: PathDisplayFormat.FolderWithFilename,
            hidePathIfRoot: true,
        };
    }
    get builtInSystemOptions() {
        return getSystemSwitcherInstance(this.plugin.app)?.options;
    }
    get showAllFileTypes() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showAllFileTypes;
    }
    get showAttachments() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showAttachments;
    }
    get showExistingOnly() {
        // forward to core switcher settings
        return this.builtInSystemOptions?.showExistingOnly;
    }
    get onOpenPreferNewPane() {
        return this.data.onOpenPreferNewPane;
    }
    set onOpenPreferNewPane(value) {
        this.data.onOpenPreferNewPane = value;
    }
    get alwaysNewPaneForSymbols() {
        return this.data.alwaysNewPaneForSymbols;
    }
    set alwaysNewPaneForSymbols(value) {
        this.data.alwaysNewPaneForSymbols = value;
    }
    get useActivePaneForSymbolsOnMobile() {
        return this.data.useActivePaneForSymbolsOnMobile;
    }
    set useActivePaneForSymbolsOnMobile(value) {
        this.data.useActivePaneForSymbolsOnMobile = value;
    }
    get symbolsInLineOrder() {
        return this.data.symbolsInLineOrder;
    }
    set symbolsInLineOrder(value) {
        this.data.symbolsInLineOrder = value;
    }
    get editorListPlaceholderText() {
        return SwitcherPlusSettings.defaults.editorListCommand;
    }
    get editorListCommand() {
        return this.data.editorListCommand;
    }
    set editorListCommand(value) {
        this.data.editorListCommand = value;
    }
    get symbolListPlaceholderText() {
        return SwitcherPlusSettings.defaults.symbolListCommand;
    }
    get symbolListCommand() {
        return this.data.symbolListCommand;
    }
    set symbolListCommand(value) {
        this.data.symbolListCommand = value;
    }
    get workspaceListCommand() {
        return this.data.workspaceListCommand;
    }
    set workspaceListCommand(value) {
        this.data.workspaceListCommand = value;
    }
    get workspaceListPlaceholderText() {
        return SwitcherPlusSettings.defaults.workspaceListCommand;
    }
    get headingsListCommand() {
        return this.data.headingsListCommand;
    }
    set headingsListCommand(value) {
        this.data.headingsListCommand = value;
    }
    get headingsListPlaceholderText() {
        return SwitcherPlusSettings.defaults.headingsListCommand;
    }
    get starredListCommand() {
        return this.data.starredListCommand;
    }
    set starredListCommand(value) {
        this.data.starredListCommand = value;
    }
    get starredListPlaceholderText() {
        return SwitcherPlusSettings.defaults.starredListCommand;
    }
    get commandListCommand() {
        return this.data.commandListCommand;
    }
    set commandListCommand(value) {
        this.data.commandListCommand = value;
    }
    get commandListPlaceholderText() {
        return SwitcherPlusSettings.defaults.commandListCommand;
    }
    get relatedItemsListCommand() {
        return this.data.relatedItemsListCommand;
    }
    set relatedItemsListCommand(value) {
        this.data.relatedItemsListCommand = value;
    }
    get relatedItemsListPlaceholderText() {
        return SwitcherPlusSettings.defaults.relatedItemsListCommand;
    }
    get strictHeadingsOnly() {
        return this.data.strictHeadingsOnly;
    }
    set strictHeadingsOnly(value) {
        this.data.strictHeadingsOnly = value;
    }
    get searchAllHeadings() {
        return this.data.searchAllHeadings;
    }
    set searchAllHeadings(value) {
        this.data.searchAllHeadings = value;
    }
    get excludeViewTypes() {
        return this.data.excludeViewTypes;
    }
    get referenceViews() {
        return this.data.referenceViews;
    }
    get limit() {
        return this.data.limit;
    }
    set limit(value) {
        this.data.limit = value;
    }
    get includeSidePanelViewTypes() {
        return this.data.includeSidePanelViewTypes;
    }
    set includeSidePanelViewTypes(value) {
        // remove any duplicates before storing
        this.data.includeSidePanelViewTypes = [...new Set(value)];
    }
    get includeSidePanelViewTypesPlaceholder() {
        return SwitcherPlusSettings.defaults.includeSidePanelViewTypes.join('\n');
    }
    get selectNearestHeading() {
        return this.data.selectNearestHeading;
    }
    set selectNearestHeading(value) {
        this.data.selectNearestHeading = value;
    }
    get excludeFolders() {
        return this.data.excludeFolders;
    }
    set excludeFolders(value) {
        // remove any duplicates before storing
        this.data.excludeFolders = [...new Set(value)];
    }
    get excludeLinkSubTypes() {
        return this.data.excludeLinkSubTypes;
    }
    set excludeLinkSubTypes(value) {
        this.data.excludeLinkSubTypes = value;
    }
    get excludeRelatedFolders() {
        return this.data.excludeRelatedFolders;
    }
    set excludeRelatedFolders(value) {
        this.data.excludeRelatedFolders = [...new Set(value)];
    }
    get excludeOpenRelatedFiles() {
        return this.data.excludeOpenRelatedFiles;
    }
    set excludeOpenRelatedFiles(value) {
        this.data.excludeOpenRelatedFiles = value;
    }
    get excludeObsidianIgnoredFiles() {
        return this.data.excludeObsidianIgnoredFiles;
    }
    set excludeObsidianIgnoredFiles(value) {
        this.data.excludeObsidianIgnoredFiles = value;
    }
    get shouldSearchFilenames() {
        return this.data.shouldSearchFilenames;
    }
    set shouldSearchFilenames(value) {
        this.data.shouldSearchFilenames = value;
    }
    get pathDisplayFormat() {
        return this.data.pathDisplayFormat;
    }
    set pathDisplayFormat(value) {
        this.data.pathDisplayFormat = value;
    }
    get hidePathIfRoot() {
        return this.data.hidePathIfRoot;
    }
    set hidePathIfRoot(value) {
        this.data.hidePathIfRoot = value;
    }
    async loadSettings() {
        const copy = (source, target, keys) => {
            for (const key of keys) {
                if (key in source) {
                    target[key] = source[key];
                }
            }
        };
        try {
            const savedData = (await this.plugin?.loadData());
            if (savedData) {
                const keys = Object.keys(SwitcherPlusSettings.defaults);
                copy(savedData, this.data, keys);
            }
        }
        catch (err) {
            console.log('Switcher++: error loading settings, using defaults. ', err);
        }
    }
    async saveSettings() {
        const { plugin, data } = this;
        await plugin?.saveData(data);
    }
    save() {
        this.saveSettings().catch((e) => {
            console.log('Switcher++: error saving changes to settings', e);
        });
    }
    isSymbolTypeEnabled(symbol) {
        return this.data.enabledSymbolTypes[symbol];
    }
    setSymbolTypeEnabled(symbol, isEnabled) {
        this.data.enabledSymbolTypes[symbol] = isEnabled;
    }
}

class SettingsTabSection {
    constructor(app, mainSettingsTab, config) {
        this.app = app;
        this.mainSettingsTab = mainSettingsTab;
        this.config = config;
    }
    /**
     * Creates a new Setting with the given name and description.
     * @param  {HTMLElement} containerEl
     * @param  {string} name
     * @param  {string} desc
     * @returns Setting
     */
    createSetting(containerEl, name, desc) {
        const setting = new obsidian.Setting(containerEl);
        setting.setName(name);
        setting.setDesc(desc);
        return setting;
    }
    /**
     * Create section title elements and divider.
     * @param  {HTMLElement} containerEl
     * @param  {string} title
     * @param  {string} desc?
     * @returns Setting
     */
    addSectionTitle(containerEl, title, desc = '') {
        const setting = this.createSetting(containerEl, title, desc);
        setting.setHeading();
        return setting;
    }
    /**
     * Creates a HTMLInput element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {string} initialValue
     * @param  {StringTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {string} placeholderText?
     * @returns Setting
     */
    addTextSetting(containerEl, name, desc, initialValue, configStorageKey, placeholderText) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addText((comp) => {
            comp.setPlaceholder(placeholderText);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                const value = rawValue.length ? rawValue : initialValue;
                this.saveChangesToConfig(configStorageKey, value);
            });
        });
        return setting;
    }
    /**
     * Create a Checkbox element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {boolean} initialValue
     * @param  {BooleanTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @returns Setting
     */
    addToggleSetting(containerEl, name, desc, initialValue, configStorageKey) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addToggle((comp) => {
            comp.setValue(initialValue);
            comp.onChange((value) => this.saveChangesToConfig(configStorageKey, value));
        });
        return setting;
    }
    /**
     * Create a TextArea element setting.
     * @param  {HTMLElement} containerEl The element to attach the setting to.
     * @param  {string} name
     * @param  {string} desc
     * @param  {string} initialValue
     * @param  {ListTypedConfigKey|StringTypedConfigKey} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {string} placeholderText?
     * @returns Setting
     */
    addTextAreaSetting(containerEl, name, desc, initialValue, configStorageKey, placeholderText) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addTextArea((comp) => {
            comp.setPlaceholder(placeholderText);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                const value = rawValue.length ? rawValue : initialValue;
                const isArray = Array.isArray(this.config[configStorageKey]);
                this.saveChangesToConfig(configStorageKey, isArray ? value.split('\n') : value);
            });
        });
        return setting;
    }
    addDropdownSetting(containerEl, name, desc, initialValue, options, configStorageKey, onChange) {
        const setting = this.createSetting(containerEl, name, desc);
        setting.addDropdown((comp) => {
            comp.addOptions(options);
            comp.setValue(initialValue);
            comp.onChange((rawValue) => {
                if (onChange) {
                    onChange(rawValue, this.config);
                }
                else {
                    this.saveChangesToConfig(configStorageKey, rawValue);
                }
            });
        });
        return setting;
    }
    /**
     * Updates the internal SwitcherPlusSettings configStorageKey with value, and writes it to disk.
     * @param  {K} configStorageKey The SwitcherPlusSettings key where the value for this setting should be stored.
     * @param  {SwitcherPlusSettings[K]} value
     * @returns void
     */
    saveChangesToConfig(configStorageKey, value) {
        if (configStorageKey) {
            const { config } = this;
            config[configStorageKey] = value;
            config.save();
        }
    }
}

class StarredSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Starred List Mode Settings');
        this.addTextSetting(containerEl, 'Starred list mode trigger', 'Character that will trigger starred list mode in the switcher', config.starredListCommand, 'starredListCommand', config.starredListPlaceholderText);
    }
}

class CommandListSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Command List Mode Settings');
        this.addTextSetting(containerEl, 'Command list mode trigger', 'Character that will trigger command list mode in the switcher', config.commandListCommand, 'commandListCommand', config.commandListPlaceholderText);
    }
}

class RelatedItemsSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Related Items List Mode Settings');
        this.addTextSetting(containerEl, 'Related Items list mode trigger', 'Character that will trigger related items list mode in the switcher', config.relatedItemsListCommand, 'relatedItemsListCommand', config.relatedItemsListPlaceholderText);
        this.addToggleSetting(containerEl, 'Exclude open files', 'Enable, related files which are already open will not be displayed in the list. Disabled, All related files will be displayed in the list.', config.excludeOpenRelatedFiles, 'excludeOpenRelatedFiles');
    }
}

class GeneralSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        this.addSectionTitle(containerEl, 'General Settings');
        this.addToggleSetting(containerEl, 'Default to open in new pane', 'When enabled, navigating to un-opened files will open a new editor pane whenever possible (as if cmd/ctrl were held). When the file is already open, the existing pane will be activated. This overrides all other pane settings.', this.config.onOpenPreferNewPane, 'onOpenPreferNewPane');
        this.setPathDisplayFormat(containerEl, this.config);
    }
    setPathDisplayFormat(containerEl, config) {
        const options = {};
        options[PathDisplayFormat.Full.toString()] = 'Full path';
        options[PathDisplayFormat.FolderWithFilename.toString()] = 'Parent folder & filename';
        options[PathDisplayFormat.FolderOnly.toString()] = 'Only parent folder';
        options[PathDisplayFormat.None.toString()] = 'Hide path';
        this.addDropdownSetting(containerEl, 'Preferred file path display format', 'The preferred way to display file paths in suggestions', config.pathDisplayFormat.toString(), options, null, (rawValue, config) => {
            config.pathDisplayFormat = Number(rawValue);
            config.save();
        });
    }
}

class WorkspaceSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Workspace List Mode Settings');
        this.addTextSetting(containerEl, 'Workspace list mode trigger', 'Character that will trigger workspace list mode in the switcher', config.workspaceListCommand, 'workspaceListCommand', config.workspaceListPlaceholderText);
    }
}

class EditorSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Editor List Mode Settings');
        this.addTextSetting(containerEl, 'Editor list mode trigger', 'Character that will trigger editor list mode in the switcher', config.editorListCommand, 'editorListCommand', config.editorListPlaceholderText);
        this.setIncludeSidePanelViews(containerEl, config);
    }
    setIncludeSidePanelViews(containerEl, config) {
        const viewsListing = Object.keys(this.app.viewRegistry.viewByType).sort().join(' ');
        const desc = `When in Editor list mode, show the following view types from the side panels. Add one view type per line. Available view types: ${viewsListing}`;
        this.addTextAreaSetting(containerEl, 'Include side panel views', desc, config.includeSidePanelViewTypes.join('\n'), 'includeSidePanelViewTypes', config.includeSidePanelViewTypesPlaceholder);
    }
}

class HeadingsSettingsTabSection extends SettingsTabSection {
    display(containerEl) {
        const { config } = this;
        this.addSectionTitle(containerEl, 'Headings List Mode Settings');
        this.addTextSetting(containerEl, 'Headings list mode trigger', 'Character that will trigger headings list mode in the switcher', config.headingsListCommand, 'headingsListCommand', config.headingsListPlaceholderText);
        this.addToggleSetting(containerEl, 'Show headings only', 'Enabled, strictly search through only the headings contained in the file. Note: this setting overrides the "Show existing only", and "Search filenames" settings. Disabled, fallback to searching against the filename when there is not a match in the first H1 contained in the file. This will also allow searching through filenames, Aliases, and Unresolved links to be enabled.', config.strictHeadingsOnly, 'strictHeadingsOnly');
        this.addToggleSetting(containerEl, 'Search all headings', 'Enabled, search through all headings contained in each file. Disabled, only search through the first H1 in each file.', config.searchAllHeadings, 'searchAllHeadings');
        this.addToggleSetting(containerEl, 'Search filenames', "Enabled, search and show suggestions for filenames. Disabled, Don't search through filenames (except for fallback searches)", config.shouldSearchFilenames, 'shouldSearchFilenames');
        this.setExcludeFolders(containerEl, config);
        this.addToggleSetting(containerEl, 'Hide Obsidian "Excluded files"', 'Enabled, do not display suggestions for files that are in Obsidian\'s "Options > Files & Links > Excluded files" list. Disabled, suggestions for those files will be displayed but downranked.', config.excludeObsidianIgnoredFiles, 'excludeObsidianIgnoredFiles');
    }
    setExcludeFolders(containerEl, config) {
        const settingName = 'Exclude folders';
        this.createSetting(containerEl, settingName, 'When in Headings list mode, folder path that match any regex listed here will not be searched for suggestions. Path should start from the Vault Root. Add one path per line.').addTextArea((textArea) => {
            textArea.setValue(config.excludeFolders.join('\n'));
            textArea.inputEl.addEventListener('blur', () => {
                const excludes = textArea
                    .getValue()
                    .split('\n')
                    .filter((v) => v.length > 0);
                if (this.validateExcludeFolderList(settingName, excludes)) {
                    config.excludeFolders = excludes;
                    config.save();
                }
            });
        });
    }
    validateExcludeFolderList(settingName, excludes) {
        let isValid = true;
        let failedMsg = '';
        for (const str of excludes) {
            try {
                new RegExp(str);
            }
            catch (err) {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                failedMsg += `<span class="qsp-warning">${str}</span><br/>${err}<br/><br/>`;
                isValid = false;
            }
        }
        if (!isValid) {
            const popup = new obsidian.Modal(this.app);
            popup.titleEl.setText(settingName);
            popup.contentEl.innerHTML = `Changes not saved. The following regex contain errors:<br/><br/>${failedMsg}`;
            popup.open();
        }
        return isValid;
    }
}

class SwitcherPlusSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin, config) {
        super(app, plugin);
        this.config = config;
    }
    display() {
        const { app, containerEl, config } = this;
        const generalSection = new GeneralSettingsTabSection(app, this, config);
        const tabSections = [
            HeadingsSettingsTabSection,
            EditorSettingsTabSection,
            RelatedItemsSettingsTabSection,
            StarredSettingsTabSection,
            CommandListSettingsTabSection,
            WorkspaceSettingsTabSection,
        ];
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Quick Switcher++ Settings' });
        generalSection.display(containerEl);
        this.setSymbolModeSettingsGroup(containerEl, config);
        tabSections.forEach((tabSectionClass) => {
            const tabSection = new tabSectionClass(app, this, config);
            tabSection.display(containerEl);
        });
    }
    setSymbolModeSettingsGroup(containerEl, config) {
        new obsidian.Setting(containerEl).setHeading().setName('Symbol List Mode Settings');
        SwitcherPlusSettingTab.setSymbolListCommand(containerEl, config);
        SwitcherPlusSettingTab.setSymbolsInLineOrder(containerEl, config);
        SwitcherPlusSettingTab.setAlwaysNewPaneForSymbols(containerEl, config);
        SwitcherPlusSettingTab.setUseActivePaneForSymbolsOnMobile(containerEl, config);
        SwitcherPlusSettingTab.setSelectNearestHeading(containerEl, config);
        this.setEnabledSymbolTypes(containerEl, config);
    }
    static setAlwaysNewPaneForSymbols(containerEl, config) {
        new obsidian.Setting(containerEl)
            .setName('Open Symbols in new pane')
            .setDesc('Enabled, always open a new pane when navigating to Symbols. Disabled, navigate in an already open pane (if one exists)')
            .addToggle((toggle) => toggle.setValue(config.alwaysNewPaneForSymbols).onChange((value) => {
            config.alwaysNewPaneForSymbols = value;
            config.save();
        }));
    }
    static setUseActivePaneForSymbolsOnMobile(containerEl, config) {
        new obsidian.Setting(containerEl)
            .setName('Open Symbols in active pane on mobile devices')
            .setDesc('Enabled, navigate to the target file and symbol in the active editor pane. Disabled, open a new pane when navigating to Symbols, even on mobile devices.')
            .addToggle((toggle) => toggle.setValue(config.useActivePaneForSymbolsOnMobile).onChange((value) => {
            config.useActivePaneForSymbolsOnMobile = value;
            config.save();
        }));
    }
    static setSelectNearestHeading(containerEl, config) {
        new obsidian.Setting(containerEl)
            .setName('Auto-select nearest heading')
            .setDesc('Enabled, in an unfiltered symbol list, select the closest preceding Heading to the current cursor position. Disabled, the first symbol in the list is selected.')
            .addToggle((toggle) => toggle.setValue(config.selectNearestHeading).onChange((value) => {
            config.selectNearestHeading = value;
            config.save();
        }));
    }
    static setSymbolsInLineOrder(containerEl, config) {
        new obsidian.Setting(containerEl)
            .setName('List symbols as indented outline')
            .setDesc('Enabled, symbols will be displayed in the (line) order they appear in the source text, indented under any preceding heading. Disabled, symbols will be grouped by type: Headings, Tags, Links, Embeds.')
            .addToggle((toggle) => toggle.setValue(config.symbolsInLineOrder).onChange((value) => {
            config.symbolsInLineOrder = value;
            config.save();
        }));
    }
    setEnabledSymbolTypes(containerEl, config) {
        new obsidian.Setting(containerEl).setName('Show Headings').addToggle((toggle) => toggle
            .setValue(config.isSymbolTypeEnabled(SymbolType.Heading))
            .onChange((value) => {
            config.setSymbolTypeEnabled(SymbolType.Heading, value);
            config.save();
        }));
        new obsidian.Setting(containerEl).setName('Show Tags').addToggle((toggle) => toggle.setValue(config.isSymbolTypeEnabled(SymbolType.Tag)).onChange((value) => {
            config.setSymbolTypeEnabled(SymbolType.Tag, value);
            config.save();
        }));
        new obsidian.Setting(containerEl).setName('Show Embeds').addToggle((toggle) => toggle.setValue(config.isSymbolTypeEnabled(SymbolType.Embed)).onChange((value) => {
            config.setSymbolTypeEnabled(SymbolType.Embed, value);
            config.save();
        }));
        this.setEnableLinks(containerEl, config);
    }
    setEnableLinks(containerEl, config) {
        const isLinksEnabled = config.isSymbolTypeEnabled(SymbolType.Link);
        new obsidian.Setting(containerEl).setName('Show Links').addToggle((toggle) => {
            toggle.setValue(isLinksEnabled).onChange(async (value) => {
                config.setSymbolTypeEnabled(SymbolType.Link, value);
                // have to await the save here because the call to display() will trigger a read
                // of the updated data
                await config.saveSettings();
                // reload the settings panel. This will cause the sublink types toggle
                // controls to be shown/hidden based on isLinksEnabled status
                this.display();
            });
        });
        if (isLinksEnabled) {
            SwitcherPlusSettingTab.addSubLinkTypeToggle(containerEl, config, LinkType.Heading, 'Links to headings');
            SwitcherPlusSettingTab.addSubLinkTypeToggle(containerEl, config, LinkType.Block, 'Links to blocks');
        }
    }
    static addSubLinkTypeToggle(containerEl, config, linkType, name) {
        new obsidian.Setting(containerEl)
            .setClass('qsp-setting-item-indent')
            .setName(name)
            .addToggle((toggle) => {
            const isExcluded = (config.excludeLinkSubTypes & linkType) === linkType;
            toggle.setValue(!isExcluded).onChange((isEnabled) => {
                let exclusions = config.excludeLinkSubTypes;
                if (isEnabled) {
                    // remove from exclusion list
                    exclusions &= ~linkType;
                }
                else {
                    // add to exclusion list
                    exclusions |= linkType;
                }
                config.excludeLinkSubTypes = exclusions;
                config.save();
            });
        });
    }
    static setSymbolListCommand(containerEl, config) {
        new obsidian.Setting(containerEl)
            .setName('Symbol list mode trigger')
            .setDesc('Character that will trigger symbol list mode in the switcher')
            .addText((text) => text
            .setPlaceholder(config.symbolListPlaceholderText)
            .setValue(config.symbolListCommand)
            .onChange((value) => {
            const val = value.length ? value : config.symbolListPlaceholderText;
            config.symbolListCommand = val;
            config.save();
        }));
    }
}

class Handler {
    constructor(app, settings) {
        this.app = app;
        this.settings = settings;
    }
    get commandString() {
        return null;
    }
    getEditorInfo(leaf) {
        const { excludeViewTypes } = this.settings;
        let file = null;
        let isValidSource = false;
        let cursor = null;
        if (leaf) {
            const { view } = leaf;
            const viewType = view.getViewType();
            file = view.file;
            cursor = this.getCursorPosition(view);
            // determine if the current active editor pane is valid
            const isCurrentEditorValid = !excludeViewTypes.includes(viewType);
            // whether or not the current active editor can be used as the target for
            // symbol search
            isValidSource = isCurrentEditorValid && !!file;
        }
        return { isValidSource, leaf, file, suggestion: null, cursor };
    }
    getSuggestionInfo(suggestion) {
        const info = this.getSourceInfoFromSuggestion(suggestion);
        let leaf = info.leaf;
        if (info.isValidSource) {
            // try to find a matching leaf for suggestion types that don't explicitly
            // provide one. This is primarily needed to be able to focus an
            // existing pane if there is one
            ({ leaf } = this.findOpenEditor(info.file, info.leaf));
        }
        // Get the cursor information to support `selectNearestHeading`
        const cursor = this.getCursorPosition(leaf?.view);
        return { ...info, leaf, cursor };
    }
    getSourceInfoFromSuggestion(suggestion) {
        let file = null;
        let leaf = null;
        // Can't use a symbol, workspace, unresolved (non-existent file) suggestions as
        // the target for another symbol command, because they don't point to a file
        const isFileBasedSuggestion = suggestion &&
            !isSymbolSuggestion(suggestion) &&
            !isUnresolvedSuggestion(suggestion) &&
            !isWorkspaceSuggestion(suggestion) &&
            !isCommandSuggestion(suggestion);
        if (isFileBasedSuggestion) {
            file = suggestion.file;
        }
        if (isEditorSuggestion(suggestion)) {
            leaf = suggestion.item;
        }
        const isValidSource = !!file;
        return { isValidSource, leaf, file, suggestion };
    }
    /**
     * Retrieves the position of the cursor, given that view is in a Mode that supports cursors.
     * @param  {View} view
     * @returns EditorPosition
     */
    getCursorPosition(view) {
        let cursor = null;
        if (view?.getViewType() === 'markdown') {
            const md = view;
            if (md.getMode() !== 'preview') {
                const { editor } = md;
                cursor = editor.getCursor('head');
            }
        }
        return cursor;
    }
    /**
     * Returns the text of the first H1 contained in sourceFile, or sourceFile
     * path if an H1 does not exist
     * @param  {TFile} sourceFile
     * @returns string
     */
    getTitleText(sourceFile) {
        const path = stripMDExtensionFromPath(sourceFile);
        const h1 = this.getFirstH1(sourceFile);
        return h1?.heading ?? path;
    }
    /**
     * Finds and returns the first H1 from sourceFile
     * @param  {TFile} sourceFile
     * @returns HeadingCache
     */
    getFirstH1(sourceFile) {
        let h1 = null;
        const { metadataCache } = this.app;
        const headingList = metadataCache.getFileCache(sourceFile)?.headings?.filter((v) => v.level === 1) ??
            [];
        if (headingList.length) {
            h1 = headingList.reduce((acc, curr) => {
                const { line: currLine } = curr.position.start;
                const accLine = acc.position.start.line;
                return currLine < accLine ? curr : acc;
            });
        }
        return h1;
    }
    /**
     * Finds the first open WorkspaceLeaf that is showing source file.
     * @param  {TFile} file The source file that is being shown to find
     * @param  {WorkspaceLeaf} leaf An already open editor, or, a 'reference' WorkspaceLeaf (example: backlinks, outline, etc.. views) that is used to find the associated editor if one exists.
     * @param  {} shouldIncludeRefViews=false set to true to make reference view types valid return candidates.
     * @returns TargetInfo
     */
    findOpenEditor(file, leaf, shouldIncludeRefViews = false) {
        let matchingLeaf = null;
        const hasSourceLeaf = !!leaf;
        const { settings: { referenceViews, excludeViewTypes, includeSidePanelViewTypes }, app: { workspace }, } = this;
        const isMatch = (candidateLeaf) => {
            let val = false;
            if (candidateLeaf?.view) {
                const isCandidateRefView = referenceViews.includes(candidateLeaf.view.getViewType());
                const isValidCandidate = shouldIncludeRefViews || !isCandidateRefView;
                const isSourceRefView = hasSourceLeaf && referenceViews.includes(leaf.view.getViewType());
                if (isValidCandidate) {
                    if (hasSourceLeaf && (shouldIncludeRefViews || !isSourceRefView)) {
                        val = candidateLeaf === leaf;
                    }
                    else {
                        val = candidateLeaf.view.file === file;
                    }
                }
            }
            return val;
        };
        // Prioritize the active leaf matches first, otherwise find the first matching leaf
        if (isMatch(workspace.activeLeaf)) {
            matchingLeaf = workspace.activeLeaf;
        }
        else {
            const leaves = this.getOpenLeaves(excludeViewTypes, includeSidePanelViewTypes);
            // put leaf at the first index so it gets checked first
            matchingLeaf = [leaf, ...leaves].find(isMatch);
        }
        return {
            leaf: matchingLeaf ?? null,
            file,
            suggestion: null,
            isValidSource: false,
        };
    }
    /**
     * Determines whether or not a new leaf should be created
     * @param  {boolean} isModDown Set to true if the user holding cmd/ctrl
     * @param  {} isAlreadyOpen=false Set to true if there is a pane showing the file already
     * @param  {Mode} mode? Only Symbol mode has special handling.
     * @returns boolean
     */
    shouldCreateNewLeaf(isModDown, isAlreadyOpen = false, mode) {
        const { onOpenPreferNewPane, alwaysNewPaneForSymbols, useActivePaneForSymbolsOnMobile, } = this.settings;
        const isNewPaneRequested = !isAlreadyOpen && onOpenPreferNewPane;
        let shouldCreateNew = isModDown || isNewPaneRequested;
        if (mode === Mode.SymbolList && !onOpenPreferNewPane) {
            const { isMobile } = obsidian.Platform;
            shouldCreateNew = alwaysNewPaneForSymbols || isModDown;
            if (isMobile) {
                shouldCreateNew = isModDown || !useActivePaneForSymbolsOnMobile;
            }
        }
        return shouldCreateNew;
    }
    /**
     * Determines if a leaf belongs to the main editor panel (workspace.rootSplit)
     * as opposed to the side panels
     * @param  {WorkspaceLeaf} leaf
     * @returns boolean
     */
    isMainPanelLeaf(leaf) {
        return leaf?.getRoot() === this.app.workspace.rootSplit;
    }
    /**
     * Reveals and optionally bring into focus a WorkspaceLeaf, including leaves
     * from the side panels.
     * @param  {WorkspaceLeaf} leaf
     * @param  {boolean} pushHistory?
     * @param  {Record<string} eState?
     * @param  {} unknown>
     * @returns void
     */
    activateLeaf(leaf, pushHistory, eState) {
        const { workspace } = this.app;
        const isInSidePanel = !this.isMainPanelLeaf(leaf);
        const state = { focus: true, ...eState };
        if (isInSidePanel) {
            workspace.revealLeaf(leaf);
        }
        workspace.setActiveLeaf(leaf, pushHistory);
        leaf.view.setEphemeralState(state);
    }
    /**
     * Returns a array of all open WorkspaceLeaf taking into account
     * excludeMainPanelViewTypes and includeSidePanelViewTypes.
     * @param  {string[]} excludeMainPanelViewTypes?
     * @param  {string[]} includeSidePanelViewTypes?
     * @returns WorkspaceLeaf[]
     */
    getOpenLeaves(excludeMainPanelViewTypes, includeSidePanelViewTypes) {
        const leaves = [];
        const saveLeaf = (l) => {
            const viewType = l.view?.getViewType();
            if (this.isMainPanelLeaf(l)) {
                if (!excludeMainPanelViewTypes?.includes(viewType)) {
                    leaves.push(l);
                }
            }
            else if (includeSidePanelViewTypes?.includes(viewType)) {
                leaves.push(l);
            }
        };
        this.app.workspace.iterateAllLeaves(saveLeaf);
        return leaves;
    }
    /**
     * Loads a file into a (optionally new) WorkspaceLeaf
     * @param  {TFile} file
     * @param  {boolean} shouldCreateNewLeaf
     * @param  {OpenViewState} openState?
     * @param  {} errorContext=''
     * @returns void
     */
    openFileInLeaf(file, shouldCreateNewLeaf, openState, errorContext) {
        errorContext = errorContext ?? '';
        const message = `Switcher++: error opening file. ${errorContext}`;
        try {
            this.app.workspace
                .getLeaf(shouldCreateNewLeaf)
                .openFile(file, openState)
                .catch((reason) => {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                console.log(`${message} ${reason}`);
            });
        }
        catch (error) {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(`${message} ${error}`);
        }
    }
    /**
     * Determines whether to activate (make active and focused) an existing WorkspaceLeaf,
     * or, create a new WorkspaceLeaf, or, reuse an unpinned WorkspaceLeaf in order to
     * dispay file. This takes user settings and Mod key status into account.
     * @param  {boolean} isModDown Set to true if the user is holding down cmd/ctrl keys
     * @param  {TFile} file The file to display
     * @param  {string} errorContext Custom text to save in error messages
     * @param  {OpenViewState} openState? State to pass to the new, or activated view. If
     * falsy, default values will be used
     * @param  {WorkspaceLeaf} leaf? Editor, or reference WorkspaceLeaf to activate if it's
     * already known
     * @param  {Mode} mode? Only Symbol mode has custom handling
     * @returns void
     */
    navigateToLeafOrOpenFile(isModDown, file, errorContext, openState, leaf, mode, shouldIncludeRefViews = false) {
        const { leaf: targetLeaf } = this.findOpenEditor(file, leaf, shouldIncludeRefViews);
        const isAlreadyOpen = !!targetLeaf;
        const shouldCreateNew = this.shouldCreateNewLeaf(isModDown, isAlreadyOpen, mode);
        // default to having the pane active and focused
        openState = openState ?? { active: true, eState: { active: true, focus: true } };
        if (targetLeaf && !shouldCreateNew) {
            const eState = openState?.eState;
            this.activateLeaf(targetLeaf, true, eState);
        }
        else {
            this.openFileInLeaf(file, shouldCreateNew, openState, errorContext);
        }
    }
    /**
     * Renders the UI elements to display path information for file using the
     * stored configuration settings
     * @param  {HTMLElement} parentEl
     * @param  {TFile} file
     * @returns void
     */
    renderPath(parentEl, file) {
        if (parentEl && file) {
            const { pathDisplayFormat, hidePathIfRoot } = this.settings;
            const isRoot = file.parent?.name.length === 0;
            const hidePath = pathDisplayFormat === PathDisplayFormat.None || (isRoot && hidePathIfRoot);
            if (!hidePath) {
                const path = this.getPathDisplayText(file, pathDisplayFormat);
                const wrapperEl = parentEl.createDiv({
                    cls: ['suggestion-note', 'qsp-note'],
                    text: path,
                });
                const iconEl = wrapperEl.createSpan({
                    cls: ['qsp-path-indicator'],
                    prepend: true,
                });
                obsidian.setIcon(iconEl, 'folder', 13);
            }
        }
    }
    /**
     * Formats the path of file based on displayFormat
     * @param  {TFile} file
     * @param  {PathDisplayFormat} displayFormat
     * @returns string
     */
    getPathDisplayText(file, displayFormat) {
        let text = '';
        if (file) {
            const dirname = file.parent.name;
            // rootdir name is an empty string by default
            const isRoot = dirname.length === 0;
            if (displayFormat === PathDisplayFormat.FolderWithFilename) {
                text = isRoot ? `${file.name}` : obsidian.normalizePath(`${dirname}/${file.name}`);
            }
            else if (displayFormat === PathDisplayFormat.FolderOnly) {
                // parent path here should just be '/'
                text = isRoot ? file.parent.path : dirname;
            }
            else if (displayFormat === PathDisplayFormat.Full) {
                text = file.path;
            }
        }
        return text;
    }
}

const WORKSPACE_PLUGIN_ID = 'workspaces';
class WorkspaceHandler extends Handler {
    get commandString() {
        return this.settings?.workspaceListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        if (this.isWorkspacesPluginEnabled()) {
            inputInfo.mode = Mode.WorkspaceList;
            const workspaceCmd = inputInfo.parsedCommand(Mode.WorkspaceList);
            workspaceCmd.index = index;
            workspaceCmd.parsedInput = filterText;
            workspaceCmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const items = this.getItems();
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.id);
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({ type: SuggestionType.WorkspaceList, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            obsidian.renderResults(parentEl, sugg.item.id, sugg.match);
        }
    }
    onChooseSuggestion(sugg, _evt) {
        if (sugg) {
            const { id } = sugg.item;
            const pluginInstance = this.getSystemWorkspacesPluginInstance();
            if (typeof pluginInstance['loadWorkspace'] === 'function') {
                pluginInstance.loadWorkspace(id);
            }
        }
    }
    getItems() {
        const items = [];
        const workspaces = this.getSystemWorkspacesPluginInstance()?.workspaces;
        if (workspaces) {
            Object.keys(workspaces).forEach((id) => items.push({ id, type: 'workspaceInfo' }));
        }
        return items;
    }
    isWorkspacesPluginEnabled() {
        const plugin = this.getSystemWorkspacesPlugin();
        return plugin?.enabled;
    }
    getSystemWorkspacesPlugin() {
        return getInternalPluginById(this.app, WORKSPACE_PLUGIN_ID);
    }
    getSystemWorkspacesPluginInstance() {
        const workspacesPlugin = this.getSystemWorkspacesPlugin();
        return workspacesPlugin?.instance;
    }
}

class HeadingsHandler extends Handler {
    get commandString() {
        return this.settings?.headingsListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.HeadingsList;
        const headingsCmd = inputInfo.parsedCommand(Mode.HeadingsList);
        headingsCmd.index = index;
        headingsCmd.parsedInput = filterText;
        headingsCmd.isValidated = true;
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { start: { line, col }, end: endLoc, } = sugg.item.position;
            // state information to highlight the target heading
            const eState = {
                active: true,
                focus: true,
                startLoc: { line, col },
                endLoc,
                line,
                cursor: {
                    from: { line, ch: col },
                    to: { line, ch: col },
                },
            };
            this.navigateToLeafOrOpenFile(obsidian.Keymap.isModEvent(evt), sugg.file, 'Unable to navigate to heading for file.', { active: true, eState });
        }
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { item } = sugg;
            obsidian.renderResults(parentEl, item.heading, sugg.match);
            parentEl.createSpan({
                cls: ['suggestion-flair', 'qsp-headings-indicator'],
                text: HeadingIndicators[item.level],
                prepend: true,
            });
            this.renderPath(parentEl, sugg.file);
            if (sugg.downranked) {
                parentEl.addClass('mod-downranked');
            }
        }
    }
    getSuggestions(inputInfo) {
        let suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { prepQuery, hasSearchTerm } = inputInfo.searchQuery;
            if (hasSearchTerm) {
                const { limit } = this.settings;
                suggestions = this.getAllFilesSuggestions(prepQuery);
                obsidian.sortSearchResults(suggestions);
                if (suggestions.length > 0 && limit > 0) {
                    suggestions = suggestions.slice(0, limit);
                }
            }
            else {
                suggestions = this.getRecentFilesSuggestions();
            }
        }
        return suggestions;
    }
    getAllFilesSuggestions(prepQuery) {
        const suggestions = [];
        const { app: { vault }, settings: { strictHeadingsOnly, showExistingOnly, excludeFolders }, } = this;
        const isExcludedFolder = matcherFnForRegExList(excludeFolders);
        let nodes = [vault.getRoot()];
        while (nodes.length > 0) {
            const node = nodes.pop();
            if (isTFile(node)) {
                this.addSuggestionsFromFile(suggestions, node, prepQuery);
            }
            else if (!isExcludedFolder(node.path)) {
                nodes = nodes.concat(node.children);
            }
        }
        if (!strictHeadingsOnly && !showExistingOnly) {
            this.addUnresolvedSuggestions(suggestions, prepQuery);
        }
        return suggestions;
    }
    addSuggestionsFromFile(suggestions, file, prepQuery) {
        const { searchAllHeadings, strictHeadingsOnly, shouldSearchFilenames, shouldShowAlias, } = this.settings;
        if (this.shouldIncludeFile(file)) {
            const isH1Matched = this.addHeadingSuggestions(suggestions, prepQuery, file, searchAllHeadings);
            if (!strictHeadingsOnly) {
                if (shouldSearchFilenames || !isH1Matched) {
                    // if strict is disabled and filename search is enabled or there
                    // isn't an H1 match, then do a fallback search against the filename, then path
                    this.addFileSuggestions(suggestions, prepQuery, file);
                }
                if (shouldShowAlias) {
                    this.addAliasSuggestions(suggestions, prepQuery, file);
                }
            }
        }
    }
    downrankScoreIfIgnored(sugg) {
        if (this.app.metadataCache.isUserIgnored(sugg?.file?.path)) {
            sugg.downranked = true;
            if (sugg.match) {
                sugg.match.score -= 10;
            }
        }
        return sugg;
    }
    shouldIncludeFile(file) {
        let retVal = false;
        const { settings: { excludeObsidianIgnoredFiles, builtInSystemOptions: { showAttachments, showAllFileTypes }, }, app: { viewRegistry, metadataCache }, } = this;
        if (isTFile(file)) {
            const { extension } = file;
            if (!metadataCache.isUserIgnored(file.path) || !excludeObsidianIgnoredFiles) {
                retVal = viewRegistry.isExtensionRegistered(extension)
                    ? showAttachments || extension === 'md'
                    : showAllFileTypes;
            }
        }
        return retVal;
    }
    addAliasSuggestions(suggestions, prepQuery, file) {
        const { metadataCache } = this.app;
        const frontMatter = metadataCache.getFileCache(file)?.frontmatter;
        if (frontMatter) {
            const aliases = FrontMatterParser.getAliases(frontMatter);
            let i = aliases.length;
            // create suggestions where there is a match with an alias
            while (i--) {
                const alias = aliases[i];
                const { match } = this.fuzzySearchWithFallback(prepQuery, alias, null);
                if (match) {
                    suggestions.push(this.createAliasSuggestion(alias, file, match));
                }
            }
        }
    }
    addFileSuggestions(suggestions, prepQuery, file) {
        const path = stripMDExtensionFromPath(file);
        const filename = filenameFromPath(path);
        const { isPrimary, match } = this.fuzzySearchWithFallback(prepQuery, filename, path);
        if (isPrimary) {
            this.adjustMatchIndicesForPath(match.matches, path.length - filename.length);
        }
        if (match) {
            suggestions.push(this.createFileSuggestion(file, match));
        }
    }
    addHeadingSuggestions(suggestions, prepQuery, file, allHeadings) {
        const { metadataCache } = this.app;
        const headingList = metadataCache.getFileCache(file)?.headings ?? [];
        let h1 = null;
        let isH1Matched = false;
        let i = headingList.length;
        while (i--) {
            const heading = headingList[i];
            let isMatched = false;
            if (allHeadings) {
                isMatched = this.matchAndPushHeading(suggestions, prepQuery, file, heading);
            }
            if (heading.level === 1) {
                const { line } = heading.position.start;
                if (h1 === null || line < h1.position.start.line) {
                    h1 = heading;
                    isH1Matched = isMatched;
                }
            }
        }
        if (!allHeadings && h1) {
            isH1Matched = this.matchAndPushHeading(suggestions, prepQuery, file, h1);
        }
        return isH1Matched;
    }
    matchAndPushHeading(suggestions, prepQuery, file, heading) {
        const { match } = this.fuzzySearchWithFallback(prepQuery, heading.heading, null);
        if (match) {
            suggestions.push(this.createHeadingSuggestion(heading, file, match));
        }
        return !!match;
    }
    addUnresolvedSuggestions(suggestions, prepQuery) {
        const { unresolvedLinks } = this.app.metadataCache;
        const unresolvedSet = new Set();
        const sources = Object.keys(unresolvedLinks);
        let i = sources.length;
        // create a distinct list of unresolved links
        while (i--) {
            // each source has an object with keys that represent the list of unresolved links
            // for that source file
            const sourcePath = sources[i];
            const links = Object.keys(unresolvedLinks[sourcePath]);
            let j = links.length;
            while (j--) {
                // unresolved links can be duplicates, use a Set to get a distinct list
                unresolvedSet.add(links[j]);
            }
        }
        const unresolvedList = Array.from(unresolvedSet);
        i = unresolvedList.length;
        // create suggestions where there is a match with an unresolved link
        while (i--) {
            const unresolved = unresolvedList[i];
            const { match } = this.fuzzySearchWithFallback(prepQuery, unresolved, null);
            if (match) {
                suggestions.push(this.createUnresolvedSuggestion(unresolved, match));
            }
        }
    }
    createAliasSuggestion(alias, file, match) {
        const sugg = {
            alias,
            file,
            match,
            type: SuggestionType.Alias,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    createUnresolvedSuggestion(linktext, match) {
        return {
            linktext,
            match,
            type: SuggestionType.Unresolved,
        };
    }
    createFileSuggestion(file, match) {
        const sugg = {
            file,
            match,
            type: SuggestionType.File,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    createHeadingSuggestion(item, file, match) {
        const sugg = {
            item,
            file,
            match,
            type: SuggestionType.HeadingsList,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    fuzzySearchWithFallback(prepQuery, primaryString, secondaryString) {
        let isPrimary = false;
        let match = null;
        if (primaryString) {
            match = obsidian.fuzzySearch(prepQuery, primaryString);
            isPrimary = !!match;
        }
        if (!match && secondaryString) {
            match = obsidian.fuzzySearch(prepQuery, secondaryString);
            if (match) {
                match.score -= 1;
            }
        }
        return {
            isPrimary,
            match,
        };
    }
    adjustMatchIndicesForPath(matches, pathLen) {
        matches?.forEach((match) => {
            match[0] += pathLen;
            match[1] += pathLen;
        });
    }
    getRecentFilesSuggestions() {
        const suggestions = [];
        const { workspace, vault, metadataCache } = this.app;
        const recentFilePaths = workspace.getLastOpenFiles();
        recentFilePaths.forEach((path) => {
            const file = vault.getAbstractFileByPath(path);
            if (this.shouldIncludeFile(file)) {
                const f = file;
                let h1 = null;
                const h1s = metadataCache
                    .getFileCache(f)
                    ?.headings?.filter((h) => h.level === 1)
                    .sort((a, b) => a.position.start.line - b.position.start.line);
                if (h1s?.length) {
                    h1 = h1s[0];
                }
                const sugg = h1
                    ? this.createHeadingSuggestion(h1, f, null)
                    : this.createFileSuggestion(f, null);
                suggestions.push(sugg);
            }
        });
        return suggestions;
    }
}

class EditorHandler extends Handler {
    get commandString() {
        return this.settings?.editorListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.EditorList;
        const editorCmd = inputInfo.parsedCommand(Mode.EditorList);
        editorCmd.index = index;
        editorCmd.parsedInput = filterText;
        editorCmd.isValidated = true;
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const { excludeViewTypes, includeSidePanelViewTypes } = this.settings;
            const items = this.getOpenLeaves(excludeViewTypes, includeSidePanelViewTypes);
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.getDisplayText());
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    const file = item.view?.file;
                    suggestions.push({ type: SuggestionType.EditorList, file, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            obsidian.renderResults(parentEl, sugg.item.getDisplayText(), sugg.match);
            this.renderPath(parentEl, sugg.file);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            this.navigateToLeafOrOpenFile(obsidian.Keymap.isModEvent(evt), sugg.file, 'Unable to reopen existing editor in new Leaf.', null, sugg.item, null, true);
        }
    }
}

class SymbolHandler extends Handler {
    get commandString() {
        return this.settings?.symbolListCommand;
    }
    validateCommand(inputInfo, index, filterText, activeSuggestion, activeLeaf) {
        const sourceInfo = this.getSourceInfoForSymbolOperation(activeSuggestion, activeLeaf, index === 0);
        if (sourceInfo) {
            inputInfo.mode = Mode.SymbolList;
            const symbolCmd = inputInfo.parsedCommand(Mode.SymbolList);
            symbolCmd.source = sourceInfo;
            symbolCmd.index = index;
            symbolCmd.parsedInput = filterText;
            symbolCmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            this.inputInfo = inputInfo;
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const symbolCmd = inputInfo.parsedCommand(Mode.SymbolList);
            const items = this.getItems(symbolCmd.source, hasSearchTerm);
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, SymbolHandler.getSuggestionTextForSymbol(item));
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    const { file } = symbolCmd.source;
                    suggestions.push({ type: SuggestionType.SymbolList, file, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { item } = sugg;
            let containerEl = parentEl;
            if (this.settings.symbolsInLineOrder &&
                this.inputInfo &&
                !this.inputInfo.searchQuery.hasSearchTerm) {
                containerEl.addClass(`qsp-symbol-l${item.indentLevel}`);
            }
            const text = SymbolHandler.getSuggestionTextForSymbol(item);
            SymbolHandler.addSymbolIndicator(item, containerEl);
            containerEl = parentEl.createSpan({
                cls: 'qsp-symbol-text',
            });
            obsidian.renderResults(containerEl, text, sugg.match);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const symbolCmd = this.inputInfo.parsedCommand();
            this.navigateToSymbol(sugg, symbolCmd, obsidian.Keymap.isModEvent(evt));
        }
    }
    reset() {
        this.inputInfo = null;
    }
    getSourceInfoForSymbolOperation(activeSuggestion, activeLeaf, isSymbolCmdPrefix) {
        const prevInputInfo = this.inputInfo;
        let prevSourceInfo = null;
        let prevMode = Mode.Standard;
        if (prevInputInfo) {
            prevSourceInfo = prevInputInfo.parsedCommand().source;
            prevMode = prevInputInfo.mode;
        }
        // figure out if the previous operation was a symbol operation
        const hasPrevSymbolSource = prevMode === Mode.SymbolList && !!prevSourceInfo;
        const activeEditorInfo = this.getEditorInfo(activeLeaf);
        const activeSuggInfo = this.getSuggestionInfo(activeSuggestion);
        // Pick the source file for a potential symbol operation, prioritizing
        // any pre-existing symbol operation that was in progress
        let sourceInfo = null;
        if (hasPrevSymbolSource) {
            sourceInfo = prevSourceInfo;
        }
        else if (activeSuggInfo.isValidSource) {
            sourceInfo = activeSuggInfo;
        }
        else if (activeEditorInfo.isValidSource && isSymbolCmdPrefix) {
            sourceInfo = activeEditorInfo;
        }
        return sourceInfo;
    }
    getItems(sourceInfo, hasSearchTerm) {
        let items = [];
        let symbolsInLineOrder = false;
        let selectNearestHeading = false;
        if (!hasSearchTerm) {
            ({ selectNearestHeading, symbolsInLineOrder } = this.settings);
        }
        items = this.getSymbolsFromSource(sourceInfo, symbolsInLineOrder);
        if (selectNearestHeading) {
            SymbolHandler.FindNearestHeadingSymbol(items, sourceInfo);
        }
        return items;
    }
    static FindNearestHeadingSymbol(items, sourceInfo) {
        const cursorLine = sourceInfo?.cursor?.line;
        // find the nearest heading to the current cursor pos, if applicable
        if (cursorLine) {
            let found = null;
            const headings = items.filter((v) => isHeadingCache(v.symbol));
            if (headings.length) {
                found = headings.reduce((acc, curr) => {
                    const { line: currLine } = curr.symbol.position.start;
                    const accLine = acc ? acc.symbol.position.start.line : -1;
                    return currLine > accLine && currLine <= cursorLine ? curr : acc;
                });
            }
            if (found) {
                found.isSelected = true;
            }
        }
    }
    getSymbolsFromSource(sourceInfo, orderByLineNumber) {
        const { app: { metadataCache }, settings, } = this;
        const ret = [];
        if (sourceInfo?.file) {
            const file = sourceInfo.file;
            const symbolData = metadataCache.getFileCache(file);
            if (symbolData) {
                const push = (symbols = [], symbolType) => {
                    if (settings.isSymbolTypeEnabled(symbolType)) {
                        symbols.forEach((symbol) => ret.push({ type: 'symbolInfo', symbol, symbolType }));
                    }
                };
                push(symbolData.headings, SymbolType.Heading);
                push(symbolData.tags, SymbolType.Tag);
                this.addLinksFromSource(symbolData.links, ret);
                push(symbolData.embeds, SymbolType.Embed);
            }
        }
        return orderByLineNumber ? SymbolHandler.orderSymbolsByLineNumber(ret) : ret;
    }
    addLinksFromSource(linkData, symbolList) {
        const { settings } = this;
        linkData = linkData ?? [];
        if (settings.isSymbolTypeEnabled(SymbolType.Link)) {
            for (const link of linkData) {
                const type = getLinkType(link);
                const isExcluded = (settings.excludeLinkSubTypes & type) === type;
                if (!isExcluded) {
                    symbolList.push({
                        type: 'symbolInfo',
                        symbol: link,
                        symbolType: SymbolType.Link,
                    });
                }
            }
        }
    }
    static orderSymbolsByLineNumber(symbols = []) {
        const sorted = symbols.sort((a, b) => {
            const { start: aStart } = a.symbol.position;
            const { start: bStart } = b.symbol.position;
            const lineDiff = aStart.line - bStart.line;
            return lineDiff === 0 ? aStart.col - bStart.col : lineDiff;
        });
        let currIndentLevel = 0;
        sorted.forEach((si) => {
            let indentLevel = 0;
            if (isHeadingCache(si.symbol)) {
                currIndentLevel = si.symbol.level;
                indentLevel = si.symbol.level - 1;
            }
            else {
                indentLevel = currIndentLevel;
            }
            si.indentLevel = indentLevel;
        });
        return sorted;
    }
    static getSuggestionTextForSymbol(symbolInfo) {
        const { symbol } = symbolInfo;
        let text;
        if (isHeadingCache(symbol)) {
            text = symbol.heading;
        }
        else if (isTagCache(symbol)) {
            text = symbol.tag.slice(1);
        }
        else {
            const refCache = symbol;
            ({ link: text } = refCache);
            const { displayText } = refCache;
            if (displayText && displayText !== text) {
                text += `|${displayText}`;
            }
        }
        return text;
    }
    static addSymbolIndicator(symbolInfo, parentEl) {
        const { symbolType, symbol } = symbolInfo;
        let indicator;
        if (isHeadingCache(symbol)) {
            indicator = HeadingIndicators[symbol.level];
        }
        else {
            indicator = SymbolIndicators[symbolType];
        }
        parentEl.createDiv({
            text: indicator,
            cls: 'qsp-symbol-indicator',
        });
    }
    navigateToSymbol(sugg, symbolCmd, isModDown) {
        const { leaf, file } = symbolCmd.source;
        const { start: { line, col }, end: endLoc, } = sugg.item.symbol.position;
        // object containing the state information for the target editor,
        // start with the range to highlight in target editor
        const eState = {
            active: true,
            focus: true,
            startLoc: { line, col },
            endLoc,
            line,
            cursor: {
                from: { line, ch: col },
                to: { line, ch: col },
            },
        };
        this.navigateToLeafOrOpenFile(isModDown, file, `Unable to navigate to symbol for file ${file.path}`, { active: true, eState }, leaf, Mode.SymbolList);
    }
}

const STARRED_PLUGIN_ID = 'starred';
class StarredHandler extends Handler {
    get commandString() {
        return this.settings?.starredListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        if (this.isStarredPluginEnabled()) {
            inputInfo.mode = Mode.StarredList;
            const starredCmd = inputInfo.parsedCommand(Mode.StarredList);
            starredCmd.index = index;
            starredCmd.parsedInput = filterText;
            starredCmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const itemsInfo = this.getItems();
            itemsInfo.forEach(({ file, item }) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.title);
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({ type: SuggestionType.StarredList, file, item, match });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            obsidian.renderResults(parentEl, sugg.item.title, sugg.match);
            this.renderPath(parentEl, sugg.file);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { item } = sugg;
            if (isFileStarredItem(item)) {
                const { file } = sugg;
                this.navigateToLeafOrOpenFile(obsidian.Keymap.isModEvent(evt), file, `Unable to open Starred file ${file.path}`);
            }
        }
    }
    getTFileByPath(path) {
        let file = null;
        const abstractItem = this.app.vault.getAbstractFileByPath(path);
        if (isTFile(abstractItem)) {
            file = abstractItem;
        }
        return file;
    }
    getItems() {
        const itemsInfo = [];
        const starredItems = this.getSystemStarredPluginInstance()?.items;
        if (starredItems) {
            starredItems.forEach((starredItem) => {
                // Only support displaying of starred files for now
                if (isFileStarredItem(starredItem)) {
                    const file = this.getTFileByPath(starredItem.path);
                    // 2022-apr when a starred file is deleted, the underlying data stored in the
                    // Starred plugin data file (starred.json) for that file remain in there, but
                    // at runtime the deleted file info is not displayed. Do the same here.
                    if (file) {
                        // 2022-apr when a starred file is renamed, the 'title' property stored in
                        // the underlying Starred plugin data file (starred.json) is not updated, but
                        // at runtime, the title that is displayed in the UI does reflect the updated
                        // filename. So do the same thing here in order to display the current
                        // filename as the starred file title
                        const title = file.basename;
                        const item = {
                            type: 'file',
                            title,
                            path: starredItem.path,
                        };
                        itemsInfo.push({ file, item });
                    }
                }
            });
        }
        return itemsInfo;
    }
    isStarredPluginEnabled() {
        const plugin = this.getSystemStarredPlugin();
        return plugin?.enabled;
    }
    getSystemStarredPlugin() {
        return getInternalPluginById(this.app, STARRED_PLUGIN_ID);
    }
    getSystemStarredPluginInstance() {
        const starredPlugin = this.getSystemStarredPlugin();
        return starredPlugin?.instance;
    }
}

const COMMAND_PALETTE_PLUGIN_ID = 'command-palette';
class CommandHandler extends Handler {
    get commandString() {
        return this.settings?.commandListCommand;
    }
    validateCommand(inputInfo, index, filterText, _activeSuggestion, _activeLeaf) {
        inputInfo.mode = Mode.CommandList;
        const commandCmd = inputInfo.parsedCommand(Mode.CommandList);
        commandCmd.index = index;
        commandCmd.parsedInput = filterText;
        commandCmd.isValidated = true;
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const itemsInfo = this.getItems();
            itemsInfo.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, item.name);
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({
                        type: SuggestionType.CommandList,
                        item,
                        match,
                    });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            obsidian.renderResults(parentEl, sugg.item.name, sugg.match);
        }
    }
    onChooseSuggestion(sugg) {
        if (sugg) {
            const { item } = sugg;
            this.app.commands.executeCommandById(item.id);
        }
    }
    getItems() {
        // Sort commands by their name
        const items = this.app.commands.listCommands().sort((a, b) => {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        // Pinned commands should be at the top (if any)
        if (this.isCommandPalettePluginEnabled() &&
            this.getCommandPalettePluginInstance()?.options.pinned?.length > 0) {
            const pinnedCommandIds = this.getCommandPalettePluginInstance().options.pinned;
            // We're gonna find the pinned command in `items` and move it to the beginning
            // Therefore we need to perform "for each right"
            for (let i = pinnedCommandIds.length - 1; i >= 0; i--) {
                const commandId = pinnedCommandIds[i];
                const commandIndex = items.findIndex((c) => c.id === commandId);
                if (commandIndex > -1) {
                    const command = items[commandIndex];
                    items.splice(commandIndex, 1);
                    items.unshift(command);
                }
            }
        }
        return items;
    }
    isCommandPalettePluginEnabled() {
        const plugin = this.getCommandPalettePlugin();
        return plugin?.enabled;
    }
    getCommandPalettePlugin() {
        return getInternalPluginById(this.app, COMMAND_PALETTE_PLUGIN_ID);
    }
    getCommandPalettePluginInstance() {
        const commandPalettePlugin = this.getCommandPalettePlugin();
        return commandPalettePlugin?.instance;
    }
}

class RelatedItemsHandler extends Handler {
    get commandString() {
        return this.settings?.relatedItemsListCommand;
    }
    validateCommand(inputInfo, index, filterText, activeSuggestion, activeLeaf) {
        const sourceInfo = this.getSourceInfo(activeSuggestion, activeLeaf, index === 0);
        if (sourceInfo) {
            inputInfo.mode = Mode.RelatedItemsList;
            const cmd = inputInfo.parsedCommand(Mode.RelatedItemsList);
            cmd.source = sourceInfo;
            cmd.index = index;
            cmd.parsedInput = filterText;
            cmd.isValidated = true;
        }
    }
    getSuggestions(inputInfo) {
        const suggestions = [];
        if (inputInfo) {
            this.inputInfo = inputInfo;
            inputInfo.buildSearchQuery();
            const { hasSearchTerm, prepQuery } = inputInfo.searchQuery;
            const cmd = inputInfo.parsedCommand(Mode.RelatedItemsList);
            const items = this.getRelatedFiles(cmd.source.file);
            items.forEach((item) => {
                let shouldPush = true;
                let match = null;
                if (hasSearchTerm) {
                    match = obsidian.fuzzySearch(prepQuery, this.getTitleText(item));
                    shouldPush = !!match;
                }
                if (shouldPush) {
                    suggestions.push({
                        type: SuggestionType.RelatedItemsList,
                        relationType: 'diskLocation',
                        file: item,
                        match,
                    });
                }
            });
            if (hasSearchTerm) {
                obsidian.sortSearchResults(suggestions);
            }
        }
        return suggestions;
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            obsidian.renderResults(parentEl, this.getTitleText(sugg.file), sugg.match);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(obsidian.Keymap.isModEvent(evt), file, `Unable to open related file ${file.path}`);
        }
    }
    getTitleText(sourceFile) {
        return stripMDExtensionFromPath(sourceFile);
    }
    getRelatedFiles(sourceFile) {
        const relatedFiles = [];
        const { excludeRelatedFolders, excludeOpenRelatedFiles } = this.settings;
        const isExcludedFolder = matcherFnForRegExList(excludeRelatedFolders);
        let nodes = [...sourceFile.parent.children];
        while (nodes.length > 0) {
            const node = nodes.pop();
            if (isTFile(node)) {
                const isSourceFile = node === sourceFile;
                const isExcluded = isSourceFile || (excludeOpenRelatedFiles && !!this.findOpenEditor(node).leaf);
                if (!isExcluded) {
                    relatedFiles.push(node);
                }
            }
            else if (!isExcludedFolder(node.path)) {
                nodes = nodes.concat(node.children);
            }
        }
        return relatedFiles;
    }
    reset() {
        this.inputInfo = null;
    }
    getSourceInfo(activeSuggestion, activeLeaf, isPrefixCmd) {
        const prevInputInfo = this.inputInfo;
        let prevSourceInfo = null;
        let prevMode = Mode.Standard;
        if (prevInputInfo) {
            prevSourceInfo = prevInputInfo.parsedCommand().source;
            prevMode = prevInputInfo.mode;
        }
        // figure out if the previous operation was a symbol operation
        const hasPrevSource = prevMode === Mode.RelatedItemsList && !!prevSourceInfo;
        const activeEditorInfo = this.getEditorInfo(activeLeaf);
        const activeSuggInfo = this.getSuggestionInfo(activeSuggestion);
        // Pick the source file for the operation, prioritizing
        // any pre-existing operation that was in progress
        let sourceInfo = null;
        if (hasPrevSource) {
            sourceInfo = prevSourceInfo;
        }
        else if (activeSuggInfo.isValidSource) {
            sourceInfo = activeSuggInfo;
        }
        else if (activeEditorInfo.isValidSource && isPrefixCmd) {
            sourceInfo = activeEditorInfo;
        }
        return sourceInfo;
    }
}

class StandardExHandler extends Handler {
    validateCommand(_inputInfo, _index, _filterText, _activeSuggestion, _activeLeaf) {
        throw new Error('Method not implemented.');
    }
    getSuggestions(_inputInfo) {
        throw new Error('Method not implemented.');
    }
    renderSuggestion(_sugg, _parentEl) {
        throw new Error('Method not implemented.');
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(obsidian.Keymap.isModEvent(evt), file, `Unable to open file from SystemSuggestion ${file.path}`);
        }
    }
}

class InputInfo {
    constructor(inputText = '', mode = Mode.Standard) {
        this.inputText = inputText;
        this.mode = mode;
        const symbolListCmd = {
            ...InputInfo.defaultParsedCommand,
            source: null,
        };
        const relatedItemsListCmd = {
            ...InputInfo.defaultParsedCommand,
            source: null,
        };
        const parsedCmds = {};
        parsedCmds[Mode.SymbolList] = symbolListCmd;
        parsedCmds[Mode.Standard] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.EditorList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.WorkspaceList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.HeadingsList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.StarredList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.CommandList] = InputInfo.defaultParsedCommand;
        parsedCmds[Mode.RelatedItemsList] = relatedItemsListCmd;
        this.parsedCommands = parsedCmds;
    }
    static get defaultParsedCommand() {
        return {
            isValidated: false,
            index: -1,
            parsedInput: null,
        };
    }
    get searchQuery() {
        return this._searchQuery;
    }
    buildSearchQuery() {
        const { mode } = this;
        const input = this.parsedCommands[mode].parsedInput ?? '';
        const prepQuery = obsidian.prepareQuery(input.trim().toLowerCase());
        const hasSearchTerm = prepQuery?.query?.length > 0;
        this._searchQuery = { prepQuery, hasSearchTerm };
    }
    parsedCommand(mode) {
        mode = mode ?? this.mode;
        return this.parsedCommands[mode];
    }
}

class ModeHandler {
    constructor(app, settings, exKeymap) {
        this.app = app;
        this.settings = settings;
        this.exKeymap = exKeymap;
        // StandardExHandler one is special in that it is not a "full" handler,
        // and not attached to a mode, as a result it is not in the handlersByMode list
        const standardExHandler = new StandardExHandler(app, settings);
        const handlersByMode = new Map([
            [Mode.SymbolList, new SymbolHandler(app, settings)],
            [Mode.WorkspaceList, new WorkspaceHandler(app, settings)],
            [Mode.HeadingsList, new HeadingsHandler(app, settings)],
            [Mode.EditorList, new EditorHandler(app, settings)],
            [Mode.StarredList, new StarredHandler(app, settings)],
            [Mode.CommandList, new CommandHandler(app, settings)],
            [Mode.RelatedItemsList, new RelatedItemsHandler(app, settings)],
        ]);
        this.handlersByMode = handlersByMode;
        this.handlersByType = new Map([
            [SuggestionType.CommandList, handlersByMode.get(Mode.CommandList)],
            [SuggestionType.EditorList, handlersByMode.get(Mode.EditorList)],
            [SuggestionType.HeadingsList, handlersByMode.get(Mode.HeadingsList)],
            [SuggestionType.RelatedItemsList, handlersByMode.get(Mode.RelatedItemsList)],
            [SuggestionType.StarredList, handlersByMode.get(Mode.StarredList)],
            [SuggestionType.SymbolList, handlersByMode.get(Mode.SymbolList)],
            [SuggestionType.WorkspaceList, handlersByMode.get(Mode.WorkspaceList)],
            [SuggestionType.File, standardExHandler],
            [SuggestionType.Alias, standardExHandler],
        ]);
        this.debouncedGetSuggestions = obsidian.debounce(this.getSuggestions.bind(this), 400, true);
        this.reset();
    }
    onOpen() {
        this.exKeymap.isOpen = true;
    }
    onClose() {
        this.exKeymap.isOpen = false;
    }
    setSessionOpenMode(mode, chooser) {
        this.reset();
        chooser?.setSuggestions([]);
        if (mode !== Mode.Standard) {
            this.sessionOpenModeString = this.getHandler(mode).commandString;
        }
    }
    insertSessionOpenModeCommandString(inputEl) {
        const { sessionOpenModeString } = this;
        if (sessionOpenModeString !== null && sessionOpenModeString !== '') {
            // update UI with current command string in the case were openInMode was called
            inputEl.value = sessionOpenModeString;
            // reset to null so user input is not overridden the next time onInput is called
            this.sessionOpenModeString = null;
        }
    }
    updateSuggestions(query, chooser) {
        let handled = false;
        const { exKeymap, app: { workspace: { activeLeaf }, }, } = this;
        const activeSugg = ModeHandler.getActiveSuggestion(chooser);
        const inputInfo = this.determineRunMode(query, activeSugg, activeLeaf);
        const { mode } = inputInfo;
        exKeymap.updateKeymapForMode(mode);
        if (mode !== Mode.Standard) {
            if (mode === Mode.HeadingsList && inputInfo.parsedCommand().parsedInput?.length) {
                // if headings mode and user is typing a query, delay getting suggestions
                this.debouncedGetSuggestions(inputInfo, chooser);
            }
            else {
                this.getSuggestions(inputInfo, chooser);
            }
            handled = true;
        }
        return handled;
    }
    renderSuggestion(sugg, parentEl) {
        let handled = false;
        if (isExSuggestion(sugg)) {
            this.getHandler(sugg).renderSuggestion(sugg, parentEl);
            handled = true;
        }
        return handled;
    }
    onChooseSuggestion(sugg, evt) {
        let handled = false;
        // in Headings mode, StandardExHandler should handle the onChoose action for File
        // and Alias suggestion so that the preferOpenInNewPane setting can be handled properly
        const useExHandler = this.inputInfo.mode === Mode.HeadingsList && !isUnresolvedSuggestion(sugg);
        if (useExHandler || isExSuggestion(sugg)) {
            this.getHandler(sugg).onChooseSuggestion(sugg, evt);
            handled = true;
        }
        return handled;
    }
    determineRunMode(query, activeSugg, activeLeaf) {
        const input = query ?? '';
        const info = new InputInfo(input);
        if (input.length === 0) {
            this.reset();
        }
        this.validatePrefixCommands(info, activeSugg, activeLeaf);
        this.validateSourcedCommands(info, activeSugg, activeLeaf);
        return info;
    }
    getSuggestions(inputInfo, chooser) {
        this.inputInfo = inputInfo;
        const { mode } = inputInfo;
        chooser.setSuggestions([]);
        const suggestions = this.getHandler(mode).getSuggestions(inputInfo);
        chooser.setSuggestions(suggestions);
        ModeHandler.setActiveSuggestion(mode, chooser);
    }
    validatePrefixCommands(inputInfo, activeSugg, activeLeaf) {
        const { settings } = this;
        const prefixCmds = [
            settings.editorListCommand,
            settings.workspaceListCommand,
            settings.headingsListCommand,
            settings.starredListCommand,
            settings.commandListCommand,
        ]
            .map((v) => `(${escapeRegExp(v)})`)
            // account for potential overlapping command strings
            .sort((a, b) => b.length - a.length);
        // regex that matches any of the prefix commands, and extract filter text
        const match = new RegExp(`^(${prefixCmds.join('|')})(.*)$`).exec(inputInfo.inputText);
        if (match) {
            const cmdStr = match[1];
            const filterText = match[match.length - 1];
            const handler = this.getHandler(cmdStr);
            if (handler) {
                handler.validateCommand(inputInfo, match.index, filterText, activeSugg, activeLeaf);
            }
        }
    }
    validateSourcedCommands(inputInfo, activeSugg, activeLeaf) {
        const { mode, inputText } = inputInfo;
        // Standard, Headings, Starred, and EditorList mode can have an embedded command
        const supportedModes = [
            Mode.Standard,
            Mode.EditorList,
            Mode.HeadingsList,
            Mode.StarredList,
        ];
        if (supportedModes.includes(mode)) {
            const { settings } = this;
            const embeddedCmds = [settings.symbolListCommand, settings.relatedItemsListCommand]
                .map((v) => `(${escapeRegExp(v)})`)
                .sort((a, b) => b.length - a.length);
            // regex that matches any sourced command, and extract filter text
            const match = new RegExp(`(${embeddedCmds.join('|')})(.*)$`).exec(inputText);
            if (match) {
                const cmdStr = match[1];
                const filterText = match[match.length - 1];
                const handler = this.getHandler(cmdStr);
                if (handler) {
                    handler.validateCommand(inputInfo, match.index, filterText, activeSugg, activeLeaf);
                }
            }
        }
    }
    static setActiveSuggestion(mode, chooser) {
        // only symbol mode currently sets an active selection
        if (mode === Mode.SymbolList) {
            const index = chooser.values
                .filter((v) => isSymbolSuggestion(v))
                .findIndex((v) => v.item.isSelected);
            if (index !== -1) {
                chooser.setSelectedItem(index, true);
            }
        }
    }
    static getActiveSuggestion(chooser) {
        let activeSuggestion = null;
        if (chooser?.values) {
            activeSuggestion = chooser.values[chooser.selectedItem];
        }
        return activeSuggestion;
    }
    reset() {
        this.inputInfo = new InputInfo();
        this.sessionOpenModeString = null;
        this.getHandler(Mode.SymbolList).reset();
        this.getHandler(Mode.RelatedItemsList).reset();
    }
    getHandler(kind) {
        let handler;
        const { handlersByMode, handlersByType } = this;
        if (typeof kind === 'number') {
            handler = handlersByMode.get(kind);
        }
        else if (isOfType(kind, 'type')) {
            handler = handlersByType.get(kind.type);
        }
        else if (typeof kind === 'string') {
            const { settings } = this;
            const handlersByCommand = new Map([
                [settings.editorListCommand, handlersByMode.get(Mode.EditorList)],
                [settings.workspaceListCommand, handlersByMode.get(Mode.WorkspaceList)],
                [settings.headingsListCommand, handlersByMode.get(Mode.HeadingsList)],
                [settings.starredListCommand, handlersByMode.get(Mode.StarredList)],
                [settings.commandListCommand, handlersByMode.get(Mode.CommandList)],
                [settings.symbolListCommand, handlersByMode.get(Mode.SymbolList)],
                [settings.relatedItemsListCommand, handlersByMode.get(Mode.RelatedItemsList)],
            ]);
            handler = handlersByCommand.get(kind);
        }
        return handler;
    }
}

class Keymap {
    constructor(scope, chooser, modalContainerEl) {
        this.scope = scope;
        this.chooser = chooser;
        this.modalContainerEl = modalContainerEl;
        this.registerBindings(scope);
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
    registerBindings(scope) {
        const keys = [
            [['Ctrl'], 'n'],
            [['Ctrl'], 'p'],
            [['Ctrl'], 'j'],
            [['Ctrl'], 'k'],
        ];
        keys.forEach((v) => {
            scope.register(v[0], v[1], this.navigateItems.bind(this));
        });
    }
    navigateItems(_evt, ctx) {
        const { isOpen, chooser } = this;
        if (isOpen) {
            const nextKeys = ['n', 'j'];
            let index = chooser.selectedItem;
            index = nextKeys.includes(ctx.key) ? ++index : --index;
            chooser.setSelectedItem(index, true);
        }
        return false;
    }
    static updateHelperTextForMode(mode, containerEl) {
        const selector = '.prompt-instructions';
        const el = containerEl.querySelector(selector);
        if (el) {
            el.style.display = mode === Mode.Standard ? '' : 'none';
        }
    }
    updateKeymapForMode(mode) {
        const keys = this.scope.keys;
        let { backupKeys = [] } = this;
        Keymap.updateHelperTextForMode(mode, this.modalContainerEl);
        if (mode === Mode.Standard) {
            if (backupKeys.length) {
                backupKeys.forEach((key) => keys.push(key));
            }
            backupKeys = undefined;
        }
        else {
            // unregister unused hotkeys for custom modes
            for (let i = keys.length - 1; i >= 0; --i) {
                const key = keys[i];
                // modifiers are serialized to string at run time, if they exist
                const modifiers = key.modifiers?.toString();
                if (key.key === 'Enter' && modifiers === 'Shift') {
                    keys.splice(i, 1);
                    backupKeys.push(key);
                }
            }
        }
        this.backupKeys = backupKeys;
    }
}

function createSwitcherPlus(app, plugin) {
    const SystemSwitcherModal = getSystemSwitcherInstance(app)
        ?.QuickSwitcherModal;
    if (!SystemSwitcherModal) {
        console.log('Switcher++: unable to extend system switcher. Plugin UI will not be loaded. Use the builtin switcher instead.');
        return null;
    }
    const SwitcherPlusModal = class extends SystemSwitcherModal {
        constructor(app, plugin) {
            super(app, plugin.options.builtInSystemOptions);
            this.plugin = plugin;
            plugin.options.shouldShowAlias = this.shouldShowAlias;
            const exKeymap = new Keymap(this.scope, this.chooser, this.containerEl);
            this.exMode = new ModeHandler(app, plugin.options, exKeymap);
        }
        openInMode(mode) {
            this.exMode.setSessionOpenMode(mode, this.chooser);
            super.open();
        }
        onOpen() {
            this.exMode.onOpen();
            super.onOpen();
        }
        onClose() {
            super.onClose();
            this.exMode.onClose();
        }
        updateSuggestions() {
            const { exMode, inputEl, chooser } = this;
            exMode.insertSessionOpenModeCommandString(inputEl);
            if (!exMode.updateSuggestions(inputEl.value, chooser)) {
                super.updateSuggestions();
            }
        }
        onChooseSuggestion(item, evt) {
            if (!this.exMode.onChooseSuggestion(item, evt)) {
                super.onChooseSuggestion(item, evt);
            }
        }
        renderSuggestion(value, parentEl) {
            if (!this.exMode.renderSuggestion(value, parentEl)) {
                super.renderSuggestion(value, parentEl);
            }
        }
    };
    return new SwitcherPlusModal(app, plugin);
}

class SwitcherPlusPlugin extends obsidian.Plugin {
    async onload() {
        const options = new SwitcherPlusSettings(this);
        await options.loadSettings();
        this.options = options;
        this.addSettingTab(new SwitcherPlusSettingTab(this.app, this, options));
        this.registerCommand('switcher-plus:open', 'Open', Mode.Standard);
        this.registerCommand('switcher-plus:open-editors', 'Open in Editor Mode', Mode.EditorList);
        this.registerCommand('switcher-plus:open-symbols', 'Open in Symbol Mode', Mode.SymbolList);
        this.registerCommand('switcher-plus:open-workspaces', 'Open in Workspaces Mode', Mode.WorkspaceList);
        this.registerCommand('switcher-plus:open-headings', 'Open in Headings Mode', Mode.HeadingsList);
        this.registerCommand('switcher-plus:open-starred', 'Open in Starred Mode', Mode.StarredList);
        this.registerCommand('switcher-plus:open-commands', 'Open in Commands Mode', Mode.CommandList);
        this.registerCommand('switcher-plus:open-related-items', 'Open in Related Items Mode', Mode.RelatedItemsList);
    }
    registerCommand(id, name, mode) {
        this.addCommand({
            id,
            name,
            hotkeys: [],
            checkCallback: (checking) => {
                // modal needs to be created dynamically (same as system switcher)
                // as system options are evaluated in the modal constructor
                const modal = createSwitcherPlus(this.app, this);
                if (modal) {
                    if (!checking) {
                        modal.openInMode(mode);
                    }
                    return true;
                }
                return false;
            },
        });
    }
}

module.exports = SwitcherPlusPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL3NoYXJlZFR5cGVzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL3V0aWxzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL2Zyb250TWF0dGVyUGFyc2VyLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3N3aXRjaGVyUGx1c1NldHRpbmdzLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9zdGFycmVkU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL2NvbW1hbmRMaXN0U2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3JlbGF0ZWRJdGVtc1NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9nZW5lcmFsU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3dvcmtzcGFjZVNldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9lZGl0b3JTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3MvaGVhZGluZ3NTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3Mvc3dpdGNoZXJQbHVzU2V0dGluZ1RhYi50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9oYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3dvcmtzcGFjZUhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvaGVhZGluZ3NIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL2VkaXRvckhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvc3ltYm9sSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9zdGFycmVkSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9jb21tYW5kSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9yZWxhdGVkSXRlbXNIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3N0YW5kYXJkRXhIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9pbnB1dEluZm8udHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL21vZGVIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9rZXltYXAudHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL3N3aXRjaGVyUGx1cy50cyIsIi4uLy4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJTZXR0aW5nIiwiTW9kYWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGxhdGZvcm0iLCJzZXRJY29uIiwibm9ybWFsaXplUGF0aCIsImZ1enp5U2VhcmNoIiwic29ydFNlYXJjaFJlc3VsdHMiLCJyZW5kZXJSZXN1bHRzIiwiS2V5bWFwIiwicHJlcGFyZVF1ZXJ5IiwiZGVib3VuY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsSUFBWSxpQkFLWCxDQUFBO0FBTEQsQ0FBQSxVQUFZLGlCQUFpQixFQUFBO0FBQzNCLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE1BQUksQ0FBQTtBQUNKLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLE1BQUksQ0FBQTtBQUNKLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxDQUFBLFlBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxHQUFBLFlBQVUsQ0FBQTtBQUNWLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxDQUFBLG9CQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxvQkFBa0IsQ0FBQTtBQUNwQixDQUFDLEVBTFcsaUJBQWlCLEtBQWpCLGlCQUFpQixHQUs1QixFQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUQsSUFBWSxJQVNYLENB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
