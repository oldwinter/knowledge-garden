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
var MatchType;
(function (MatchType) {
    MatchType[MatchType["None"] = 0] = "None";
    MatchType[MatchType["Primary"] = 1] = "Primary";
    MatchType[MatchType["Basename"] = 2] = "Basename";
    MatchType[MatchType["ParentPath"] = 3] = "ParentPath";
})(MatchType || (MatchType = {}));

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
     * where when {PathDisplayFormat} is set to FolderPathFilenameOptional
     * @param  {SearchResult} match?
     * @param  {boolean} overridePathFormat? set to true force display the path and set
     * {PathDisplayFormat} to FolderPathFilenameOptional
     * @returns void
     */
    renderPath(parentEl, file, excludeOptionalFilename, match, overridePathFormat) {
        if (parentEl && file) {
            const isRoot = file.parent.isRoot();
            let format = this.settings.pathDisplayFormat;
            let hidePath = format === PathDisplayFormat.None || (isRoot && this.settings.hidePathIfRoot);
            if (overridePathFormat) {
                format = PathDisplayFormat.FolderPathFilenameOptional;
                hidePath = false;
            }
            if (!hidePath) {
                const wrapperEl = parentEl.createDiv({ cls: ['suggestion-note', 'qsp-note'] });
                const path = this.getPathDisplayText(file, format, excludeOptionalFilename);
                const iconEl = wrapperEl.createSpan({ cls: ['qsp-path-indicator'] });
                obsidian.setIcon(iconEl, 'folder', 13);
                const pathEl = wrapperEl.createSpan({ cls: 'qsp-path' });
                obsidian.renderResults(pathEl, path, match);
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
     * @param  {SearchResult} match
     * @param  {number} offset?
     * @returns HTMLDivElement
     */
    renderContent(parentEl, content, match, offset) {
        const contentEl = parentEl.createDiv({
            cls: ['suggestion-content', 'qsp-content'],
        });
        const titleEl = contentEl.createDiv({
            cls: ['suggestion-title', 'qsp-title'],
        });
        obsidian.renderResults(titleEl, content, match, offset);
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
    /**
     * Searches through primaryString, if not match is found,
     * searches through secondaryString
     * @param  {PreparedQuery} prepQuery
     * @param  {string} primaryString
     * @param  {string} secondaryString?
     * @returns { isPrimary: boolean; match?: SearchResult }
     */
    fuzzySearchStrings(prepQuery, primaryString, secondaryString) {
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
    /**
     * Searches through primaryText, if no match is found and file is not null, it will
     * fallback to searching 1) file.basename, 2) file parent path
     * @param  {PreparedQuery} prepQuery
     * @param  {TFile} file
     * @param  {string} primaryString?
     * @returns SearchResultWithFallback
     */
    fuzzySearchWithFallback(prepQuery, primaryString, file) {
        let matchType = MatchType.None;
        let matchText;
        let match = null;
        const search = (matchTypes, p1, p2) => {
            const res = this.fuzzySearchStrings(prepQuery, p1, p2);
            if (res.match) {
                matchType = matchTypes[1];
                matchText = p2;
                match = res.match;
                if (res.isPrimary) {
                    matchType = matchTypes[0];
                    matchText = p1;
                }
            }
            return !!res.match;
        };
        const isMatch = search([MatchType.Primary, MatchType.None], primaryString);
        if (!isMatch && file) {
            const { basename, parent: { path }, } = file;
            search([MatchType.Basename, MatchType.ParentPath], basename, path);
        }
        return { matchType, matchText, match };
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
                const { match } = this.fuzzySearchWithFallback(prepQuery, alias);
                if (match) {
                    suggestions.push(this.createAliasSuggestion(alias, file, match));
                }
            }
        }
    }
    addFileSuggestions(suggestions, prepQuery, file) {
        const { match, matchType, matchText } = this.fuzzySearchWithFallback(prepQuery, null, file);
        if (match) {
            suggestions.push(this.createFileSuggestion(file, match, matchType, matchText));
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
        const { match } = this.fuzzySearchWithFallback(prepQuery, heading.heading);
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
            const { match } = this.fuzzySearchWithFallback(prepQuery, unresolved);
            if (match) {
                suggestions.push(this.createUnresolvedSuggestion(unresolved, match));
            }
        }
    }
    createAliasSuggestion(alias, file, match) {
        const sugg = {
            alias,
            file,
            ...this.createSearchMatch(match, MatchType.Primary, alias),
            type: SuggestionType.Alias,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    createUnresolvedSuggestion(linktext, match) {
        return {
            linktext,
            ...this.createSearchMatch(match, MatchType.Primary, linktext),
            type: SuggestionType.Unresolved,
        };
    }
    createFileSuggestion(file, match, matchType = MatchType.None, matchText = null) {
        const sugg = {
            file,
            match,
            matchType,
            matchText,
            type: SuggestionType.File,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    createHeadingSuggestion(item, file, match) {
        const sugg = {
            item,
            file,
            ...this.createSearchMatch(match, MatchType.Primary, item.heading),
            type: SuggestionType.HeadingsList,
        };
        return this.downrankScoreIfIgnored(sugg);
    }
    createSearchMatch(match, type, text) {
        let matchType = MatchType.None;
        let matchText = null;
        if (match) {
            matchType = type;
            matchText = text;
        }
        return {
            match,
            matchType,
            matchText,
        };
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
                const file = item.view?.file;
                let shouldPush = true;
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, item.getDisplayText(), file);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push({ type: SuggestionType.EditorList, file, item, ...result });
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
            const { file, matchType, match } = sugg;
            const content = sugg.item.getDisplayText();
            let contentMatch = match;
            let pathMatch = null;
            if (matchType === MatchType.ParentPath) {
                contentMatch = null;
                pathMatch = match;
            }
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-editor']);
            const contentEl = this.renderContent(parentEl, content, contentMatch);
            this.renderPath(contentEl, file, true, pathMatch, !!pathMatch);
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
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, item.title, file);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push({ type: SuggestionType.StarredList, file, item, ...result });
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
            const { file, matchType, match } = sugg;
            let contentMatch = match;
            let pathMatch = null;
            if (matchType === MatchType.ParentPath) {
                contentMatch = null;
                pathMatch = match;
            }
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-starred']);
            const contentEl = this.renderContent(parentEl, sugg.item.title, contentMatch);
            this.renderPath(contentEl, file, true, pathMatch, !!pathMatch);
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
                let result = { matchType: MatchType.None, match: null };
                if (hasSearchTerm) {
                    result = this.fuzzySearchWithFallback(prepQuery, null, item);
                    shouldPush = result.matchType !== MatchType.None;
                }
                if (shouldPush) {
                    suggestions.push({
                        type: SuggestionType.RelatedItemsList,
                        relationType: 'diskLocation',
                        file: item,
                        ...result,
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
            const { file, matchType, match } = sugg;
            const content = this.getTitleText(file);
            let contentMatch = match;
            let pathMatch = null;
            if (matchType === MatchType.ParentPath) {
                contentMatch = null;
                pathMatch = match;
            }
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-related']);
            const contentEl = this.renderContent(parentEl, content, contentMatch);
            this.renderPath(contentEl, file, true, pathMatch, !!pathMatch);
        }
    }
    onChooseSuggestion(sugg, evt) {
        if (sugg) {
            const { file } = sugg;
            this.navigateToLeafOrOpenFile(evt, file, `Unable to open related file ${file.path}`);
        }
    }
    getTitleText(sourceFile) {
        return sourceFile?.basename;
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
    renderSuggestion(sugg, parentEl) {
        if (isFileSuggestion(sugg)) {
            const { file, matchType, match } = sugg;
            let contentMatch = match;
            let pathMatch = null;
            if (matchType === MatchType.ParentPath) {
                contentMatch = null;
                pathMatch = match;
            }
            this.addClassesToSuggestionContainer(parentEl, ['qsp-suggestion-file']);
            const contentEl = this.renderContent(parentEl, file.basename, contentMatch);
            this.renderPath(contentEl, file, true, pathMatch, !!pathMatch);
        }
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
        // in Headings mode, StandardExHandler should handle rendering for File
        // suggestions
        const useExHandler = this.inputInfo.mode === Mode.HeadingsList && isFileSuggestion(sugg);
        if (useExHandler || isExSuggestion(sugg)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL3NoYXJlZFR5cGVzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL3V0aWxzLnRzIiwiLi4vLi4vc3JjL3V0aWxzL2Zyb250TWF0dGVyUGFyc2VyLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3N3aXRjaGVyUGx1c1NldHRpbmdzLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9zdGFycmVkU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL2NvbW1hbmRMaXN0U2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3JlbGF0ZWRJdGVtc1NldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9nZW5lcmFsU2V0dGluZ3NUYWJTZWN0aW9uLnRzIiwiLi4vLi4vc3JjL3NldHRpbmdzL3dvcmtzcGFjZVNldHRpbmdzVGFiU2VjdGlvbi50cyIsIi4uLy4uL3NyYy9zZXR0aW5ncy9lZGl0b3JTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3MvaGVhZGluZ3NTZXR0aW5nc1RhYlNlY3Rpb24udHMiLCIuLi8uLi9zcmMvc2V0dGluZ3Mvc3dpdGNoZXJQbHVzU2V0dGluZ1RhYi50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9oYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3dvcmtzcGFjZUhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvaGVhZGluZ3NIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL2VkaXRvckhhbmRsZXIudHMiLCIuLi8uLi9zcmMvSGFuZGxlcnMvc3ltYm9sSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9zdGFycmVkSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9jb21tYW5kSGFuZGxlci50cyIsIi4uLy4uL3NyYy9IYW5kbGVycy9yZWxhdGVkSXRlbXNIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL0hhbmRsZXJzL3N0YW5kYXJkRXhIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9pbnB1dEluZm8udHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL21vZGVIYW5kbGVyLnRzIiwiLi4vLi4vc3JjL3N3aXRjaGVyUGx1cy9zd2l0Y2hlclBsdXNLZXltYXAudHMiLCIuLi8uLi9zcmMvc3dpdGNoZXJQbHVzL3N3aXRjaGVyUGx1cy50cyIsIi4uLy4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJTZXR0aW5nIiwiTW9kYWwiLCJQbHVnaW5TZXR0aW5nVGFiIiwiUGxhdGZvcm0iLCJLZXltYXAiLCJzZXRJY29uIiwicmVuZGVyUmVzdWx0cyIsIm5vcm1hbGl6ZVBhdGgiLCJmdXp6eVNlYXJjaCIsInNvcnRTZWFyY2hSZXN1bHRzIiwicHJlcGFyZVF1ZXJ5IiwiZGVib3VuY2UiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFxQkEsSUFBWSxvQkFJWCxDQUFBO0FBSkQsQ0FBQSxVQUFZLG9CQUFvQixFQUFBO0FBQzlCLElBQUEsb0JBQUEsQ0FBQSxvQkFBQSxDQUFBLG1CQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxtQkFBcUIsQ0FBQTtBQUNyQixJQUFBLG9CQUFBLENBQUEsb0JBQUEsQ0FBQSxTQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxTQUFPLENBQUE7QUFDUCxJQUFBLG9CQUFBLENBQUEsb0JBQUEsQ0FBQSxZQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsR0FBQSxZQUFVLENBQUE7QUFDWixDQUFDLEVBSlcsb0JBQW9CLEtBQXBCLG9CQUFvQixHQUkvQixFQUFBLENBQUEsQ0FBQSxDQUFBO0FBRUQsSUFBWSxpQkFNWCxDQUFBO0FBTkQsQ0FBQSxVQUFZLGlCQUFpQixFQUFBO0FBQzNCLElBQUEsaUJBQUEsQ0FBQSxpQkFBQSxD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
