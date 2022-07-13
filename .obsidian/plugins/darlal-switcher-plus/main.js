'use strict';

var obsidian = require('obsidian');

var EditorNavigationType;
(function (EditorNavigationType) {
    EditorNavigationType[EditorNavigationType["ReuseExistingLeaf"] = 1] = "ReuseExistingLeaf";
    EditorNavigationType[EditorNavigationType["NewLeaf"] = 2] = "NewLeaf";
    EditorNavigationType[EditorNavigationType["PopoutLeaf"] = 3] = "PopoutLeaf";
})(EditorNavigationType || (EditorNavigationType = {}));
var PathDisplayFormat;
(function (PathDisplayFormat) {
    PathDisplayFormat[PathDisplayFormat["None"] = 0] = "None";
    PathDisplayFormat[PathDisplayFormat["Full"] = 1] = "Full";
    PathDisplayFormat[PathDisplayFormat["FolderOnly"] = 2] = "FolderOnly";
    PathDisplayFormat[PathDisplayFormat["FolderWithFilename"] = 3] = "FolderWithFilename";
    PathDisplayFormat[PathDisplayFormat["FolderPathFilenameOptional"] = 4] = "FolderPathFilenameOptional";
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
        options[PathDisplayFormat.None.toString()] = 'Hide path';
        options[PathDisplayFormat.Full.toString()] = 'Full path';
        options[PathDisplayFormat.FolderOnly.toString()] = 'Only parent folder';
        options[PathDisplayFormat.FolderWithFilename.toString()] = 'Parent folder & filename';
        options[PathDisplayFormat.FolderPathFilenameOptional.toString()] =
            'Parent folder path (filename optional)';
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
            ({ leaf } = this.findMatchingLeaf(info.file, info.leaf));
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
    findMatchingLeaf(file, leaf, shouldIncludeRefViews = false) {
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
     * Determines whether or not a new leaf should be created taking user
     * settings into account
     * @param  {boolean} isNewPaneRequested Set to true if the user holding cmd/ctrl
     * @param  {} isAlreadyOpen=false Set to true if there is a pane showing the file already
     * @param  {Mode} mode? Only Symbol mode has special handling.
     * @returns boolean
     */
    shouldCreateNewLeaf(isNewPaneRequested, isAlreadyOpen = false, mode) {
        const { onOpenPreferNewPane, alwaysNewPaneForSymbols, useActivePaneForSymbolsOnMobile, } = this.settings;
        const isNewPanePreferred = !isAlreadyOpen && onOpenPreferNewPane;
        let shouldCreateNew = isNewPaneRequested || isNewPanePreferred;
        if (mode === Mode.SymbolList && !onOpenPreferNewPane) {
            const { isMobile } = obsidian.Platform;
            shouldCreateNew = alwaysNewPaneForSymbols || isNewPaneRequested;
            if (isMobile) {
                shouldCreateNew = isNewPaneRequested || !useActivePaneForSymbolsOnMobile;
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
     * Loads a file into a WorkspaceLeaf based on {@link EditorNavigationType}
     * @param  {TFile} file
     * @param  {EditorNavigationType} navType
     * @param  {OpenViewState} openState?
     * @param  {} errorContext=''
     * @returns void
     */
    openFileInLeaf(file, navType, openState, errorContext) {
        const { workspace } = this.app;
        errorContext = errorContext ?? '';
        const message = `Switcher++: error opening file. ${errorContext}`;
        const getLeaf = () => {
            let leaf = null;
            if (navType === EditorNavigationType.PopoutLeaf) {
                leaf = workspace.openPopoutLeaf();
            }
            else {
                const shouldCreateNew = navType === EditorNavigationType.NewLeaf;
                leaf = workspace.getLeaf(shouldCreateNew);
            }
            return leaf;
        };
        try {
            getLeaf()
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
     * Determines whether to activate (make active and focused) an existing WorkspaceLeaf
     * (searches through all leaves), or create a new WorkspaceLeaf, or reuse an unpinned
     * WorkspaceLeaf, or create a new window in order to display file. This takes user
     * settings and event status into account.
     * @param  {MouseEvent|KeyboardEvent} evt navigation trigger event
     * @param  {TFile} file The file to display
     * @param  {string} errorContext Custom text to save in error messages
     * @param  {OpenViewState} openState? State to pass to the new, or activated view. If
     * falsy, default values will be used
     * @param  {WorkspaceLeaf} leaf? WorkspaceLeaf, or reference WorkspaceLeaf
     * (backlink, outline, etc..) to activate if it's already known
     * @param  {Mode} mode? Only Symbol mode has custom handling
     * @param  {} shouldIncludeRefViews=false whether reference WorkspaceLeaves are valid
     * targets for activation
     * @returns void
     */
    navigateToLeafOrOpenFile(evt, file, errorContext, openState, leaf, mode, shouldIncludeRefViews = false) {
        const { leaf: targetLeaf } = this.findMatchingLeaf(file, leaf, shouldIncludeRefViews);
        const isAlreadyOpen = !!targetLeaf;
        const isModDown = obsidian.Keymap.isModEvent(evt);
        const key = evt.key;
        const isPopoutRequested = isModDown && key === 'o';
        let navType = EditorNavigationType.ReuseExistingLeaf;
        if (isPopoutRequested) {
            navType = EditorNavigationType.PopoutLeaf;
        }
        else if (this.shouldCreateNewLeaf(isModDown, isAlreadyOpen, mode)) {
            navType = EditorNavigationType.NewLeaf;
        }
        this.activateLeafOrOpenFile(navType, file, errorContext, targetLeaf, openState);
    }
    /**
     * Activates leaf (if provided), or load file into another leaf based on navType
     * @param  {EditorNavigationType} navType
     * @param  {TFile} file
     * @param  {string} errorContext
     * @param  {WorkspaceLeaf} leaf? optional if supplied and navType is
     * {@link EditorNavigationType.ReuseExistingLeaf} then leaf will be activated
     * @param  {OpenViewState} openState?
     * @returns void
     */
    activateLeafOrOpenFile(navType, file, errorContext, leaf, openState) {
        // default to having the pane active and focused
        openState = openState ?? { active: true, eState: { active: true, focus: true } };
        if (leaf && navType === EditorNavigationType.ReuseExistingLeaf) {
            const eState = openState?.eState;
            this.activateLeaf(leaf, true, eState);
        }
        else {
            this.openFileInLeaf(file, navType, openState, errorContext);
        }
    }
    /**
     * Renders the UI elements to display path information for file using the
     * stored configuration settings
     * @param  {HTMLElement} parentEl containing element, this should be the element with
     * the "suggestion-content" style
     * @param  {TFile} file
     * @param  {boolean} excludeOptionalFilename? set to true to hide the filename in cases
     * where it's optional
     * @returns void
     */
    renderPath(parentEl, file, excludeOptionalFilename) {
        if (parentEl && file) {
            const { pathDisplayFormat, hidePathIfRoot } = this.settings;
            const isRoot = file.parent?.name.length === 0;
            const hidePath = pathDisplayFormat === PathDisplayFormat.None || (isRoot && hidePathIfRoot);
            if (!hidePath) {
                const wrapperEl = parentEl.createDiv({ cls: ['suggestion-note', 'qsp-note'] });
                const path = this.getPathDisplayText(file, pathDisplayFormat, excludeOptionalFilename);
                const iconEl = wrapperEl.createSpan({ cls: ['qsp-path-indicator'] });
                obsidian.setIcon(iconEl, 'folder', 13);
                wrapperEl.createSpan({
                    cls: 'qsp-path',
                    text: path,
                });
            }
        }
    }
    /**
     * Formats the path of file based on displayFormat
     * @param  {TFile} file
     * @param  {PathDisplayFormat} displayFormat
     * @param  {boolean} excludeOptionalFilename? Only applicable to
     * {PathDisplayFormat.FolderPathFilenameOptional}. When true will exclude the filename from the returned string
     * @returns string
     */
    getPathDisplayText(file, displayFormat, excludeOptionalFilename) {
        let text = '';
        if (file) {
            const { parent } = file;
            const dirname = parent.name;
            const isRoot = parent.isRoot();
            // root path is expected to always be "/"
            const rootPath = this.app.vault.getRoot().path;
            switch (displayFormat) {
                case PathDisplayFormat.FolderWithFilename:
                    text = isRoot ? `${file.name}` : obsidian.normalizePath(`${dirname}/${file.name}`);
                    break;
                case PathDisplayFormat.FolderOnly:
                    text = isRoot ? rootPath : dirname;
                    break;
                case PathDisplayFormat.Full:
                    text = file.path;
                    break;
                case PathDisplayFormat.FolderPathFilenameOptional:
                    if (excludeOptionalFilename) {
                        text = parent.path;
                        if (!isRoot) {
                            text += rootPath; // add explicit trailing /
                        }
                    }
                    else {
                        text = this.getPathDisplayText(file, PathDisplayFormat.Full);
                    }
                    break;
            }
        }
        return text;
    }
    /**
     * Creates the UI elements to display the primary suggestion text using
     * the correct styles.
     * @param  {HTMLElement} parentEl containing element, this should be the element with
     * the "suggestion-item" style
     * @param  {string} content
     * @param  {SearchResult} result
     * @param  {number} offset?
     * @returns HTMLDivElement
     */
    renderContent(parentEl, content, result, offset) {
        const contentEl = parentEl.createDiv({
            cls: ['suggestion-content', 'qsp-content'],
        });
        const titleEl = contentEl.createDiv({
            cls: ['suggestion-title', 'qsp-title'],
        });
        obsidian.renderResults(titleEl, content, result, offset);
        return contentEl;
    }
    /** add the base suggestion styles to the suggestion container element
     * @param  {HTMLElement} parentEl container element
     * @param  {string[]} additionalStyles? optional styles to add
     */
    addClassesToSuggestionContainer(parentEl, additionalStyles) {
        const styles = ['mod-complex'];
        if (additionalStyles) {
            styles.push(...additionalStyles);
        }
        parentEl?.addClasses(styles);
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
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-workspace']);
            this.renderContent(parentEl, sugg.item.id, sugg.match);
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
            this.navigateToLeafOrOpenFile(evt, sugg.file, 'Unable to navigate to heading for file.', { active: true, eState });
        }
    }
    renderSuggestion(sugg, parentEl) {
        if (sugg) {
            const { item } = sugg;
            this.addClassesToSuggestionContainer(parentEl, [
                'qsp-suggestion-headings',
                `qsp-headings-l${item.level}`,
            ]);
            const contentEl = this.renderContent(parentEl, item.heading, sugg.match);
            this.renderPath(contentEl, sugg.file);
            // render the flair icon
            const auxEl = parentEl.createDiv({ cls: ['suggestion-aux', 'qsp-aux'] });
            auxEl.createSpan({
                cls: ['suggestion-flair', 'qsp-headings-indicator'],
                text: HeadingIndicators[item.level],
            });
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
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-editor']);
            const text = sugg.item.getDisplayText();
            const contentEl = this.renderContent(parentEl, text, sugg.match);
            this.renderPath(contentEl, sugg.file, true);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            this.navigateToLeafOrOpenFile(evt, sugg.file, 'Unable to reopen existing editor in new Leaf.', null, sugg.item, null, true);
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
            const parentElClasses = ['qsp-suggestion-symbol'];
            if (this.settings.symbolsInLineOrder &&
                !this.inputInfo?.searchQuery?.hasSearchTerm) {
                parentElClasses.push(`qsp-symbol-l${item.indentLevel}`);
            }
            this.addClassesToSuggestionContainer(parentEl, parentElClasses);
            const text = SymbolHandler.getSuggestionTextForSymbol(item);
            this.renderContent(parentEl, text, sugg.match);
            SymbolHandler.addSymbolIndicator(item, parentEl);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const symbolCmd = this.inputInfo.parsedCommand();
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
            this.navigateToLeafOrOpenFile(evt, file, `Unable to navigate to symbol for file ${file.path}`, { active: true, eState }, leaf, Mode.SymbolList);
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
        // render the flair icon
        const auxEl = parentEl.createDiv({ cls: ['suggestion-aux', 'qsp-aux'] });
        auxEl.createSpan({
            cls: ['suggestion-flair', 'qsp-symbol-indicator'],
            text: indicator,
        });
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
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-starred']);
            const contentEl = this.renderContent(parentEl, sugg.item.title, sugg.match);
            this.renderPath(contentEl, sugg.file, true);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { item } = sugg;
            if (isFileStarredItem(item)) {
                const { file } = sugg;
                this.navigateToLeafOrOpenFile(evt, file, `Unable to open Starred file ${file.path}`);
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
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-command']);
            this.renderContent(parentEl, sugg.item.name, sugg.match);
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
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-related']);
            this.renderContent(parentEl, this.getTitleText(sugg.file), sugg.match);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(evt, file, `Unable to open related file ${file.path}`);
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
                const isExcluded = isSourceFile || (excludeOpenRelatedFiles && !!this.findMatchingLeaf(node).leaf);
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
            this.navigateToLeafOrOpenFile(evt, file, `Unable to open file from SystemSuggestion ${file.path}`);
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

class SwitcherPlusKeymap {
    constructor(scope, chooser, modal) {
        this.scope = scope;
        this.chooser = chooser;
        this.modal = modal;
        this.standardKeysInfo = [];
        this.customKeysInfo = [];
        this.savedStandardKeysInfo = [];
        this.standardInstructionsElSelector = '.prompt-instructions';
        this.standardInstructionsElDataValue = 'standard';
        this.initKeysInfo();
        this.registerNavigationBindings(scope);
        this.addDataAttrToInstructionsEl(modal.containerEl, this.standardInstructionsElSelector, this.standardInstructionsElDataValue);
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        this._isOpen = value;
    }
    initKeysInfo() {
        const customFileBasedModes = [
            Mode.EditorList,
            Mode.HeadingsList,
            Mode.RelatedItemsList,
            Mode.StarredList,
            Mode.SymbolList,
        ];
        let modKey = 'Ctrl';
        let modKeyText = 'ctrl';
        if (obsidian.Platform.isMacOS) {
            modKey = 'Meta';
            modKeyText = 'cmd';
        }
        // standard mode keys that are registered by default, and
        // should be unregistered in custom modes, then re-registered in standard mode
        const standardKeysInfo = [
            { modifiers: 'Shift', key: 'Enter' },
            { modifiers: `${modKey},Shift`, key: 'Enter' },
        ];
        // custom mode keys that should be registered, then unregistered in standard mode
        // Note: modifiers should be a comma separated string of Modifiers
        const customKeysInfo = [
            {
                modes: customFileBasedModes,
                modifiers: 'Mod',
                key: 'o',
                func: this.useSelectedItem.bind(this),
                command: `${modKeyText} o`,
                purpose: 'open in new window',
            },
            {
                isInstructionOnly: true,
                modes: customFileBasedModes,
                modifiers: null,
                key: null,
                func: null,
                command: `${modKeyText} enter`,
                purpose: 'open in new pane',
            },
            {
                isInstructionOnly: true,
                modes: [Mode.CommandList],
                modifiers: null,
                key: null,
                func: null,
                command: `↵`,
                purpose: 'execute command',
            },
            {
                isInstructionOnly: true,
                modes: [Mode.WorkspaceList],
                modifiers: null,
                key: null,
                func: null,
                command: `↵`,
                purpose: 'open workspace',
            },
        ];
        this.standardKeysInfo.push(...standardKeysInfo);
        this.customKeysInfo.push(...customKeysInfo);
    }
    registerNavigationBindings(scope) {
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
    updateKeymapForMode(mode) {
        const isStandardMode = mode === Mode.Standard;
        const { modal, scope, savedStandardKeysInfo, standardKeysInfo, customKeysInfo } = this;
        if (isStandardMode) {
            this.registerKeys(scope, savedStandardKeysInfo);
            savedStandardKeysInfo.length = 0;
            this.unregisterKeys(scope, customKeysInfo);
            this.toggleStandardInstructions(modal.containerEl, true);
        }
        else {
            const customKeymaps = customKeysInfo.filter((v) => v.modes?.includes(mode) && !v.isInstructionOnly);
            const standardKeymaps = this.unregisterKeys(scope, standardKeysInfo);
            if (standardKeymaps.length) {
                savedStandardKeysInfo.concat(standardKeymaps);
            }
            this.unregisterKeys(scope, customKeysInfo);
            this.registerKeys(scope, customKeymaps);
            this.showCustomInstructions(modal, customKeysInfo, mode);
        }
    }
    registerKeys(scope, keymaps) {
        keymaps.forEach((keymap) => {
            const modifiers = keymap.modifiers.split(',');
            scope.register(modifiers, keymap.key, keymap.func);
        });
    }
    unregisterKeys(scope, keyInfo) {
        const predicate = (keymap) => {
            return keyInfo.some((kInfo) => {
                const isMatch = kInfo.modifiers === keymap.modifiers && kInfo.key === keymap.key;
                if (isMatch) {
                    scope.unregister(keymap);
                }
                return isMatch;
            });
        };
        return scope.keys.filter(predicate);
    }
    addDataAttrToInstructionsEl(containerEl, selector, value) {
        const el = containerEl.querySelector(selector);
        el?.setAttribute('data-mode', value);
        return el;
    }
    clearCustomInstructions(containerEl) {
        const { standardInstructionsElSelector, standardInstructionsElDataValue } = this;
        const selector = `${standardInstructionsElSelector}:not([data-mode="${standardInstructionsElDataValue}"])`;
        const elements = containerEl.querySelectorAll(selector);
        elements.forEach((el) => el.remove());
    }
    toggleStandardInstructions(containerEl, shouldShow) {
        const { standardInstructionsElSelector } = this;
        let displayValue = 'none';
        if (shouldShow) {
            displayValue = '';
            this.clearCustomInstructions(containerEl);
        }
        const el = containerEl.querySelector(standardInstructionsElSelector);
        if (el) {
            el.style.display = displayValue;
        }
    }
    showCustomInstructions(modal, keymapInfo, mode) {
        const { containerEl } = modal;
        const keymaps = keymapInfo.filter((keymap) => keymap.modes?.includes(mode));
        this.toggleStandardInstructions(containerEl, false);
        this.clearCustomInstructions(containerEl);
        modal.setInstructions(keymaps);
    }
    useSelectedItem(evt, _ctx) {
        this.chooser.useSelectedItem(evt);
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
            const exKeymap = new SwitcherPlusKeymap(this.scope, this.chooser, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL3NoYXJlZFR5cGVzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL3V0aWxzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL2Zyb250TWF0dGVyUGFyc2VyLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3N3aXRjaGVyUGx1c1NldHRpbmdzLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9zdGFycmVkU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL2NvbW1hbmRMaXN0U2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3JlbGF0ZWRJdGVtc1NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9nZW5lcmFsU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3dvcmtzcGFjZVNldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9lZGl0b3JTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3MvaGVhZGluZ3NTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3Mvc3dpdGNoZXJQbHVzU2V0dGluZ1RhYi50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9oYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3dvcmtzcGFjZUhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvaGVhZGluZ3NIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL2VkaXRvckhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvc3ltYm9sSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9zdGFycmVkSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9jb21tYW5kSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9yZWxhdGVkSXRlbXNIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3N0YW5kYXJkRXhIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9pbnB1dEluZm8udHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL21vZGVIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9zd2l0Y2hlclBsdXNLZXltYXAudHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL3N3aXRjaGVyUGx1cy50cyIsIi4uLy4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJTZXR0aW5nIiwiTW9kYWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGxhdGZvcm0iLCJLZXltYXAiLCJzZXRJY29uIiwibm9ybWFsaXplUGF0aCIsInJlbmRlclJlc3VsdHMiLCJmdXp6eVNlYXJjaCIsInNvcnRTZWFyY2hSZXN1bHRzIiwicHJlcGFyZVF1ZXJ5IiwiZGVib3VuY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsSUFBWSxvQkFJWCxDQUFBO0FBSkQsQ0FBQSxVQUFZLG9CQUFvQixFQUFBO0FBQzlCLElBQUEsb0JBQUEsQ0FBQSxvQkFBQSxDQUFBLG1CQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxtQkFBcUIsQ0FBQTtBQUNyQixJQUFBLG9CQUFBLENBQUEsb0JBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxTQUFPLENBQUE7QUFDUCxJQUFBLG9CQUFBLENBQUEsb0JBQUEsQ0FBQSxZQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxZQUFVLENBQUE7QUFDWixDQUFDLEVBSlcsb0JBQW9CLEtBQXBCLG9CQUFvQixHQUkvQixFQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUQsSUFBWSxpQkFNWCxDQUFBO0FBTkQsQ0FBQSxVQUFZLGlCQUFpQixFQUFBO0FBQzNCLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxD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
