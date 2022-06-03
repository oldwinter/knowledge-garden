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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class DecryptModal extends obsidian.Modal {
    constructor(app, title, text = '', showButton) {
        super(app);
        this.decryptInPlace = false;
        this.text = text;
        this.titleEl.innerText = title;
        this.showButton = showButton;
    }
    onOpen() {
        let { contentEl } = this;
        const textEl = contentEl.createDiv().createEl('textarea', { text: this.text });
        textEl.style.width = '100%';
        textEl.style.height = '100%';
        textEl.rows = 10;
        textEl.readOnly = true;
        //textEl.focus(); // Doesn't seem to work here...
        setTimeout(() => { textEl.focus(); }, 100); //... but this does
        const btnContainerEl = contentEl.createDiv('');
        if (this.showButton) {
            const copyBtnEl = btnContainerEl.createEl('button', { text: 'Copy' });
            copyBtnEl.addEventListener('click', () => {
                navigator.clipboard.writeText(textEl.value);
            });
        }
        const decryptInPlaceBtnEl = btnContainerEl.createEl('button', { text: 'Decrypt in-place' });
        decryptInPlaceBtnEl.addEventListener('click', () => {
            this.decryptInPlace = true;
            this.close();
        });
        const cancelBtnEl = btnContainerEl.createEl('button', { text: 'Close' });
        cancelBtnEl.addEventListener('click', () => {
            this.close();
        });
    }
}

class PasswordModal extends obsidian.Modal {
    constructor(app, isEncrypting, confirmPassword, defaultPassword = null, hint) {
        super(app);
        this.password = null;
        this.hint = null;
        this.defaultPassword = null;
        this.defaultPassword = defaultPassword;
        this.confirmPassword = confirmPassword;
        this.isEncrypting = isEncrypting;
        this.hint = hint;
    }
    onOpen() {
        var _a, _b, _c;
        let { contentEl } = this;
        contentEl.empty();
        contentEl.addClass('meld-e-password');
        if (obsidian.Platform.isMobile) {
            contentEl.addClass('meld-e-platform-mobile');
        }
        else if (obsidian.Platform.isDesktop) {
            contentEl.addClass('meld-e-platform-desktop');
        }
        /* Main password input row */
        const inputPwContainerEl = contentEl.createDiv({ cls: 'meld-e-row' });
        inputPwContainerEl.createSpan({ cls: 'meld-e-icon', text: '🔑' });
        const pwInputEl = inputPwContainerEl.createEl('input', { type: 'password', value: (_a = this.defaultPassword) !== null && _a !== void 0 ? _a : '' });
        pwInputEl.placeholder = 'Enter your password';
        pwInputEl.focus();
        if (obsidian.Platform.isMobile) {
            // Add 'Next' button for mobile
            const inputInputNextBtnEl = inputPwContainerEl.createEl('button', {
                text: '→',
                cls: 'meld-e-button-next'
            });
            inputInputNextBtnEl.addEventListener('click', (ev) => {
                inputPasswordHandler();
            });
        }
        /* End Main password input row */
        /* Confirm password input row */
        const confirmPwShown = this.confirmPassword;
        const confirmPwContainerEl = contentEl.createDiv({ cls: 'meld-e-row' });
        confirmPwContainerEl.createSpan({ cls: 'meld-e-icon', text: '🔑' });
        const pwConfirmInputEl = confirmPwContainerEl.createEl('input', {
            type: 'password',
            value: (_b = this.defaultPassword) !== null && _b !== void 0 ? _b : ''
        });
        pwConfirmInputEl.placeholder = 'Confirm your password';
        const messageEl = contentEl.createDiv({ cls: 'meld-e-message' });
        messageEl.hide();
        if (obsidian.Platform.isMobile) {
            // Add 'Next' button for mobile
            const confirmInputNextBtnEl = confirmPwContainerEl.createEl('button', {
                text: '→',
                cls: 'meld-e-button-next'
            });
            confirmInputNextBtnEl.addEventListener('click', (ev) => {
                confirmPasswordHandler();
            });
        }
        if (!confirmPwShown) {
            confirmPwContainerEl.hide();
        }
        /* End Confirm password input row */
        /* Hint input row */
        const hintInputShown = this.isEncrypting;
        const inputHintContainerEl = contentEl.createDiv({ cls: 'meld-e-row' });
        inputHintContainerEl.createSpan({ cls: 'meld-e-icon', text: '💡' });
        const hintInputEl = inputHintContainerEl.createEl('input', { type: 'text', value: this.hint });
        hintInputEl.placeholder = 'Enter an optional password hint';
        if (obsidian.Platform.isMobile) {
            // Add 'Next' button for mobile
            const hintInputNextBtnEl = inputHintContainerEl.createEl('button', {
                text: '→',
                cls: 'meld-e-button-next'
            });
            hintInputNextBtnEl.addEventListener('click', (ev) => {
                hintPasswordHandler();
            });
        }
        if (!hintInputShown) {
            inputHintContainerEl.hide();
        }
        /* End Hint input row */
        /* Hint text row */
        const spanHintContainerEl = contentEl.createDiv({ cls: 'meld-e-row' });
        spanHintContainerEl.createSpan({ cls: 'meld-e-icon', text: '💡' });
        spanHintContainerEl.createSpan({ cls: 'meld-e-hint', text: `Hint: '${this.hint}'` });
        if (hintInputShown || ((_c = this.hint) !== null && _c !== void 0 ? _c : '').length == 0) {
            spanHintContainerEl.hide();
        }
        /* END Hint text row */
        const confirmPwButtonEl = contentEl.createEl('button', {
            text: 'Confirm',
            cls: 'meld-e-button-confirm'
        });
        confirmPwButtonEl.addEventListener('click', (ev) => {
            if (validate()) {
                this.close();
            }
            else {
                pwInputEl.focus();
            }
        });
        const validate = () => {
            if (confirmPwShown) {
                if (pwInputEl.value != pwConfirmInputEl.value) {
                    // passwords don't match
                    messageEl.setText('Passwords don\'t match');
                    messageEl.show();
                    return false;
                }
            }
            this.password = pwInputEl.value;
            this.hint = hintInputEl.value;
            return true;
        };
        const inputPasswordHandler = () => {
            if (confirmPwShown) {
                pwConfirmInputEl.focus();
                return;
            }
            if (hintInputShown) {
                hintInputEl.focus();
                return;
            }
            if (validate()) {
                this.close();
            }
        };
        const confirmPasswordHandler = () => {
            if (validate()) {
                if (hintInputShown) {
                    hintInputEl.focus();
                }
                else {
                    this.close();
                }
            }
        };
        const hintPasswordHandler = () => {
            if (validate()) {
                this.close();
            }
            else {
                pwInputEl.focus();
            }
        };
        hintInputEl.addEventListener('keypress', (ev) => {
            if ((ev.code === 'Enter' || ev.code === 'NumpadEnter')
                && pwInputEl.value.length > 0) {
                ev.preventDefault();
                hintPasswordHandler();
            }
        });
        pwConfirmInputEl.addEventListener('keypress', (ev) => {
            if ((ev.code === 'Enter' || ev.code === 'NumpadEnter')
                && pwConfirmInputEl.value.length > 0) {
                ev.preventDefault();
                confirmPasswordHandler();
            }
        });
        pwInputEl.addEventListener('keypress', (ev) => {
            if ((ev.code === 'Enter' || ev.code === 'NumpadEnter')
                && pwInputEl.value.length > 0) {
                ev.preventDefault();
                inputPasswordHandler();
            }
        });
    }
}

const vectorSize = 16;
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();
const iterations = 1000;
const salt = utf8Encoder.encode('XHWnDAT6ehMVY2zD');
class CryptoHelperV2 {
    deriveKey(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = utf8Encoder.encode(password);
            const key = yield crypto.subtle.importKey('raw', buffer, { name: 'PBKDF2' }, false, ['deriveKey']);
            const privateKey = crypto.subtle.deriveKey({
                name: 'PBKDF2',
                hash: { name: 'SHA-256' },
                iterations,
                salt
            }, key, {
                name: 'AES-GCM',
                length: 256
            }, false, ['encrypt', 'decrypt']);
            return privateKey;
        });
    }
    encryptToBase64(text, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = yield this.deriveKey(password);
            const textBytesToEncrypt = utf8Encoder.encode(text);
            const vector = crypto.getRandomValues(new Uint8Array(vectorSize));
            // encrypt into bytes
            const encryptedBytes = new Uint8Array(yield crypto.subtle.encrypt({ name: 'AES-GCM', iv: vector }, key, textBytesToEncrypt));
            const finalBytes = new Uint8Array(vector.byteLength + encryptedBytes.byteLength);
            finalBytes.set(vector, 0);
            finalBytes.set(encryptedBytes, vector.byteLength);
            //convert array to base64
            const base64Text = btoa(String.fromCharCode(...finalBytes));
            return base64Text;
        });
    }
    stringToArray(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i));
        }
        return new Uint8Array(result);
    }
    decryptFromBase64(base64Encoded, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let bytesToDecode = this.stringToArray(atob(base64Encoded));
                // extract iv
                const vector = bytesToDecode.slice(0, vectorSize);
                // extract encrypted text
                const encryptedTextBytes = bytesToDecode.slice(vectorSize);
                const key = yield this.deriveKey(password);
                // decrypt into bytes
                let decryptedBytes = yield crypto.subtle.decrypt({ name: 'AES-GCM', iv: vector }, key, encryptedTextBytes);
                // convert bytes to text
                let decryptedText = utf8Decoder.decode(decryptedBytes);
                return decryptedText;
            }
            catch (e) {
                //console.error(e);
                return null;
            }
        });
    }
}
const algorithmObsolete = {
    name: 'AES-GCM',
    iv: new Uint8Array([196, 190, 240, 190, 188, 78, 41, 132, 15, 220, 84, 211]),
    tagLength: 128
};
class CryptoHelperObsolete {
    buildKey(password) {
        return __awaiter(this, void 0, void 0, function* () {
            let utf8Encode = new TextEncoder();
            let passwordBytes = utf8Encode.encode(password);
            let passwordDigest = yield crypto.subtle.digest({ name: 'SHA-256' }, passwordBytes);
            let key = yield crypto.subtle.importKey('raw', passwordDigest, algorithmObsolete, false, ['encrypt', 'decrypt']);
            return key;
        });
    }
    encryptToBase64(text, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let key = yield this.buildKey(password);
            let utf8Encode = new TextEncoder();
            let bytesToEncrypt = utf8Encode.encode(text);
            // encrypt into bytes
            let encryptedBytes = new Uint8Array(yield crypto.subtle.encrypt(algorithmObsolete, key, bytesToEncrypt));
            //convert array to base64
            let base64Text = btoa(String.fromCharCode(...encryptedBytes));
            return base64Text;
        });
    }
    stringToArray(str) {
        var result = [];
        for (var i = 0; i < str.length; i++) {
            result.push(str.charCodeAt(i));
        }
        return new Uint8Array(result);
    }
    decryptFromBase64(base64Encoded, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // convert base 64 to array
                let bytesToDecrypt = this.stringToArray(atob(base64Encoded));
                let key = yield this.buildKey(password);
                // decrypt into bytes
                let decryptedBytes = yield crypto.subtle.decrypt(algorithmObsolete, key, bytesToDecrypt);
                // convert bytes to text
                let utf8Decode = new TextDecoder();
                let decryptedText = utf8Decode.decode(decryptedBytes);
                return decryptedText;
            }
            catch (e) {
                return null;
            }
        });
    }
}

class MeldEncryptSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Meld Encrypt' });
        new obsidian.Setting(containerEl)
            .setName('Expand selection to whole line?')
            .setDesc('Partial selections will get expanded to the whole line.')
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.expandToWholeLines)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.expandToWholeLines = value;
                yield this.plugin.saveSettings();
                //this.updateSettingsUi();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Confirm password?')
            .setDesc('Confirm password when encrypting.')
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.confirmPassword)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.confirmPassword = value;
                yield this.plugin.saveSettings();
                this.updateSettingsUi();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Copy button?')
            .setDesc('Show a button to copy decrypted text.')
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.showButton)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showButton = value;
                yield this.plugin.saveSettings();
                this.updateSettingsUi();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Remember password?')
            .setDesc('Remember the last used password for this session.')
            .addToggle(toggle => {
            toggle
                .setValue(this.plugin.settings.rememberPassword)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.rememberPassword = value;
                yield this.plugin.saveSettings();
                this.updateSettingsUi();
            }));
        });
        this.pwTimeoutSetting = new obsidian.Setting(containerEl)
            .setName(this.buildPasswordTimeoutSettingName())
            .setDesc('The number of minutes to remember the last used password.')
            .addSlider(slider => {
            slider
                .setLimits(0, 120, 5)
                .setValue(this.plugin.settings.rememberPasswordTimeout)
                .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.rememberPasswordTimeout = value;
                yield this.plugin.saveSettings();
                this.updateSettingsUi();
            }));
        });
        this.updateSettingsUi();
    }
    updateSettingsUi() {
        this.pwTimeoutSetting.setName(this.buildPasswordTimeoutSettingName());
        if (this.plugin.settings.rememberPassword) {
            this.pwTimeoutSetting.settingEl.show();
        }
        else {
            this.pwTimeoutSetting.settingEl.hide();
        }
    }
    buildPasswordTimeoutSettingName() {
        const value = this.plugin.settings.rememberPasswordTimeout;
        let timeoutString = `${value} minutes`;
        if (value == 0) {
            timeoutString = 'Never forget';
        }
        return `Remember Password Timeout (${timeoutString})`;
    }
}

const _PREFIX = '%%🔐';
const _PREFIX_OBSOLETE = _PREFIX + ' ';
const _PREFIX_A = _PREFIX + 'α ';
const _SUFFIX = ' 🔐%%';
const _HINT = '💡';
const DEFAULT_SETTINGS = {
    expandToWholeLines: true,
    confirmPassword: true,
    showButton: false,
    rememberPassword: true,
    rememberPasswordTimeout: 30
};
class MeldEncrypt extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSettings();
            this.addSettingTab(new MeldEncryptSettingsTab(this.app, this));
            this.addCommand({
                id: 'meld-encrypt',
                name: 'Encrypt/Decrypt',
                editorCheckCallback: (checking, editor, view) => this.processEncryptDecryptCommand(checking, editor, view, false)
            });
            this.addCommand({
                id: 'meld-encrypt-in-place',
                name: 'Encrypt/Decrypt In-place',
                editorCheckCallback: (checking, editor, view) => this.processEncryptDecryptCommand(checking, editor, view, true)
            });
            this.addCommand({
                id: 'meld-encrypt-note',
                name: 'Encrypt/Decrypt Whole Note',
                editorCheckCallback: (checking, editor, view) => this.processEncryptDecryptWholeNoteCommand(checking, editor, view)
            });
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    isSettingsModalOpen() {
        return document.querySelector('.mod-settings') !== null;
    }
    processEncryptDecryptWholeNoteCommand(checking, editor, view) {
        if (checking && this.isSettingsModalOpen()) {
            // Settings is open, ensures this command can show up in other
            // plugins which list commands e.g. customizable-sidebar
            return true;
        }
        const startPos = editor.offsetToPos(0);
        const endPos = { line: editor.lastLine(), ch: editor.getLine(editor.lastLine()).length };
        const selectionText = editor.getRange(startPos, endPos).trim();
        return this.processSelection(checking, editor, selectionText, startPos, endPos, true);
    }
    processEncryptDecryptCommand(checking, editor, view, decryptInPlace) {
        if (checking && this.isSettingsModalOpen()) {
            // Settings is open, ensures this command can show up in other
            // plugins which list commands e.g. customizable-sidebar
            return true;
        }
        let startPos = editor.getCursor('from');
        let endPos = editor.getCursor('to');
        if (this.settings.expandToWholeLines) {
            const startLine = startPos.line;
            startPos = { line: startLine, ch: 0 }; // want the start of the first line
            const endLine = endPos.line;
            const endLineText = editor.getLine(endLine);
            endPos = { line: endLine, ch: endLineText.length }; // want the end of last line
        }
        else {
            if (!editor.somethingSelected()) {
                // nothing selected, assume user wants to decrypt, expand to start and end markers
                startPos = this.getClosestPrevTextCursorPos(editor, _PREFIX, startPos);
                endPos = this.getClosestNextTextCursorPos(editor, _SUFFIX, endPos);
            }
        }
        const selectionText = editor.getRange(startPos, endPos);
        return this.processSelection(checking, editor, selectionText, startPos, endPos, decryptInPlace);
    }
    getClosestPrevTextCursorPos(editor, text, defaultValue) {
        const initOffset = editor.posToOffset(editor.getCursor("from"));
        for (let offset = initOffset; offset >= 0; offset--) {
            const offsetPos = editor.offsetToPos(offset);
            const textEndOffset = offset + text.length;
            const prefixEndPos = editor.offsetToPos(textEndOffset);
            const testText = editor.getRange(offsetPos, prefixEndPos);
            if (testText == text) {
                return offsetPos;
            }
        }
        return defaultValue;
    }
    getClosestNextTextCursorPos(editor, text, defaultValue) {
        const initOffset = editor.posToOffset(editor.getCursor("from"));
        const lastLineNum = editor.lastLine();
        let maxOffset = editor.posToOffset({ line: lastLineNum, ch: editor.getLine(lastLineNum).length });
        for (let offset = initOffset; offset <= maxOffset - text.length; offset++) {
            const offsetPos = editor.offsetToPos(offset);
            const textEndOffset = offset + text.length;
            const prefixEndPos = editor.offsetToPos(textEndOffset);
            const testText = editor.getRange(offsetPos, prefixEndPos);
            if (testText == text) {
                return prefixEndPos;
            }
        }
        return defaultValue;
    }
    analyseSelection(selectionText) {
        const result = new SelectionAnalysis();
        result.isEmpty = selectionText.length === 0;
        result.hasObsoleteEncryptedPrefix = selectionText.startsWith(_PREFIX_OBSOLETE);
        result.hasEncryptedPrefix = result.hasObsoleteEncryptedPrefix || selectionText.startsWith(_PREFIX_A);
        result.hasDecryptSuffix = selectionText.endsWith(_SUFFIX);
        result.containsEncryptedMarkers =
            selectionText.contains(_PREFIX_OBSOLETE)
                || selectionText.contains(_PREFIX_A)
                || selectionText.contains(_SUFFIX);
        result.canDecrypt = result.hasEncryptedPrefix && result.hasDecryptSuffix;
        result.canEncrypt = !result.hasEncryptedPrefix && !result.containsEncryptedMarkers;
        if (result.canDecrypt) {
            result.decryptable = this.parseDecryptableContent(selectionText);
            if (result.decryptable == null) {
                result.canDecrypt = false;
            }
        }
        return result;
    }
    processSelection(checking, editor, selectionText, finalSelectionStart, finalSelectionEnd, decryptInPlace) {
        var _a;
        const selectionAnalysis = this.analyseSelection(selectionText);
        if (selectionAnalysis.isEmpty) {
            if (!checking) {
                new obsidian.Notice('Nothing to Encrypt.');
            }
            return false;
        }
        if (!selectionAnalysis.canDecrypt && !selectionAnalysis.canEncrypt) {
            if (!checking) {
                new obsidian.Notice('Unable to Encrypt or Decrypt that.');
            }
            return false;
        }
        if (checking) {
            return true;
        }
        // Fetch password from user
        // determine default password
        const isRememberPasswordExpired = !this.settings.rememberPassword
            || (this.passwordLastUsedExpiry != null
                && Date.now() > this.passwordLastUsedExpiry);
        const confirmPassword = selectionAnalysis.canEncrypt && this.settings.confirmPassword;
        if (isRememberPasswordExpired || confirmPassword) {
            // forget password
            this.passwordLastUsed = '';
        }
        const pwModal = new PasswordModal(this.app, selectionAnalysis.canEncrypt, confirmPassword, this.passwordLastUsed, (_a = selectionAnalysis.decryptable) === null || _a === void 0 ? void 0 : _a.hint);
        pwModal.onClose = () => {
            var _a;
            const pw = (_a = pwModal.password) !== null && _a !== void 0 ? _a : '';
            if (pw.length == 0) {
                return;
            }
            const hint = pwModal.hint;
            // remember password?
            if (this.settings.rememberPassword) {
                this.passwordLastUsed = pw;
                this.passwordLastUsedExpiry =
                    this.settings.rememberPasswordTimeout == 0
                        ? null
                        : Date.now() + this.settings.rememberPasswordTimeout * 1000 * 60 // new expiry
                ;
            }
            if (selectionAnalysis.canEncrypt) {
                const encryptable = new Encryptable();
                encryptable.text = selectionText;
                encryptable.hint = hint;
                this.encryptSelection(editor, encryptable, pw, finalSelectionStart, finalSelectionEnd);
            }
            else {
                if (selectionAnalysis.decryptable.version == 1) {
                    this.decryptSelection_a(editor, selectionAnalysis.decryptable, pw, finalSelectionStart, finalSelectionEnd, decryptInPlace);
                }
                else {
                    this.decryptSelectionObsolete(editor, selectionAnalysis.decryptable, pw, finalSelectionStart, finalSelectionEnd, decryptInPlace);
                }
            }
        };
        pwModal.open();
        return true;
    }
    encryptSelection(editor, encryptable, password, finalSelectionStart, finalSelectionEnd) {
        return __awaiter(this, void 0, void 0, function* () {
            //encrypt
            const crypto = new CryptoHelperV2();
            const encodedText = this.encodeEncryption(yield crypto.encryptToBase64(encryptable.text, password), encryptable.hint);
            editor.setSelection(finalSelectionStart, finalSelectionEnd);
            editor.replaceSelection(encodedText);
        });
    }
    decryptSelection_a(editor, decryptable, password, selectionStart, selectionEnd, decryptInPlace) {
        return __awaiter(this, void 0, void 0, function* () {
            // decrypt
            const crypto = new CryptoHelperV2();
            const decryptedText = yield crypto.decryptFromBase64(decryptable.base64CipherText, password);
            if (decryptedText === null) {
                new obsidian.Notice('❌ Decryption failed!');
            }
            else {
                if (decryptInPlace) {
                    editor.setSelection(selectionStart, selectionEnd);
                    editor.replaceSelection(decryptedText);
                }
                else {
                    const decryptModal = new DecryptModal(this.app, '🔓', decryptedText, this.settings.showButton);
                    decryptModal.onClose = () => {
                        editor.focus();
                        if (decryptModal.decryptInPlace) {
                            editor.setSelection(selectionStart, selectionEnd);
                            editor.replaceSelection(decryptedText);
                        }
                    };
                    decryptModal.open();
                }
            }
        });
    }
    decryptSelectionObsolete(editor, decryptable, password, selectionStart, selectionEnd, decryptInPlace) {
        return __awaiter(this, void 0, void 0, function* () {
            // decrypt
            const base64CipherText = this.removeMarkers(decryptable.base64CipherText);
            const crypto = new CryptoHelperObsolete();
            const decryptedText = yield crypto.decryptFromBase64(base64CipherText, password);
            if (decryptedText === null) {
                new obsidian.Notice('❌ Decryption failed!');
            }
            else {
                if (decryptInPlace) {
                    editor.setSelection(selectionStart, selectionEnd);
                    editor.replaceSelection(decryptedText);
                }
                else {
                    const decryptModal = new DecryptModal(this.app, '🔓', decryptedText, this.settings.showButton);
                    decryptModal.onClose = () => {
                        editor.focus();
                        if (decryptModal.decryptInPlace) {
                            editor.setSelection(selectionStart, selectionEnd);
                            editor.replaceSelection(decryptedText);
                        }
                    };
                    decryptModal.open();
                }
            }
        });
    }
    parseDecryptableContent(text) {
        const result = new Decryptable();
        let content = text;
        if (content.startsWith(_PREFIX_A) && content.endsWith(_SUFFIX)) {
            result.version = 1;
            content = content.replace(_PREFIX_A, '').replace(_SUFFIX, '');
        }
        else if (content.startsWith(_PREFIX_OBSOLETE) && content.endsWith(_SUFFIX)) {
            result.version = 0;
            content = content.replace(_PREFIX_OBSOLETE, '').replace(_SUFFIX, '');
        }
        else {
            return null; // invalid format
        }
        // check if there is a hint
        //console.table(content);
        if (content.substr(0, _HINT.length) == _HINT) {
            const endHintMarker = content.indexOf(_HINT, _HINT.length);
            if (endHintMarker < 0) {
                return null; // invalid format
            }
            result.hint = content.substring(_HINT.length, endHintMarker);
            result.base64CipherText = content.substring(endHintMarker + _HINT.length);
        }
        else {
            result.base64CipherText = content;
        }
        //console.table(result);
        return result;
    }
    removeMarkers(text) {
        if (text.startsWith(_PREFIX_A) && text.endsWith(_SUFFIX)) {
            return text.replace(_PREFIX_A, '').replace(_SUFFIX, '');
        }
        if (text.startsWith(_PREFIX_OBSOLETE) && text.endsWith(_SUFFIX)) {
            return text.replace(_PREFIX_OBSOLETE, '').replace(_SUFFIX, '');
        }
        return text;
    }
    encodeEncryption(encryptedText, hint) {
        if (!encryptedText.contains(_PREFIX_OBSOLETE) && !encryptedText.contains(_PREFIX_A) && !encryptedText.contains(_SUFFIX)) {
            if (hint) {
                return _PREFIX_A.concat(_HINT, hint, _HINT, encryptedText, _SUFFIX);
            }
            return _PREFIX_A.concat(encryptedText, _SUFFIX);
        }
        return encryptedText;
    }
}
class SelectionAnalysis {
}
class Encryptable {
}
class Decryptable {
}

module.exports = MeldEncrypt;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9EZWNyeXB0TW9kYWwudHMiLCIuLi9zcmMvUGFzc3dvcmRNb2RhbC50cyIsIi4uL3NyYy9DcnlwdG9IZWxwZXIudHMiLCIuLi9zcmMvTWVsZEVuY3J5cHRTZXR0aW5nc1RhYi50cyIsIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBNb2RhbCB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY3J5cHRNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuXHR0ZXh0OiBzdHJpbmc7XHJcblx0ZGVjcnlwdEluUGxhY2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRzaG93QnV0dG9uOiBib29sZWFuXHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCB0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgPSAnJywgc2hvd0J1dHRvbjpib29sZWFuKSB7XHJcblx0XHRzdXBlcihhcHApO1xyXG5cdFx0dGhpcy50ZXh0ID0gdGV4dDtcclxuXHRcdHRoaXMudGl0bGVFbC5pbm5lclRleHQgPSB0aXRsZTtcclxuXHRcdHRoaXMuc2hvd0J1dHRvbiA9IHNob3dCdXR0b247XHJcblx0fVxyXG5cclxuXHRvbk9wZW4oKSB7XHJcblx0XHRsZXQgeyBjb250ZW50RWwgfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29uc3QgdGV4dEVsID0gY29udGVudEVsLmNyZWF0ZURpdigpLmNyZWF0ZUVsKCd0ZXh0YXJlYScsIHsgdGV4dDogdGhpcy50ZXh0IH0pO1xyXG5cdFx0dGV4dEVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xyXG5cdFx0dGV4dEVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuXHRcdHRleHRFbC5yb3dzID0gMTA7XHJcblx0XHR0ZXh0RWwucmVhZE9ubHkgPSB0cnVlO1xyXG5cdFx0Ly90ZXh0RWwuZm9jdXMoKTsgLy8gRG9lc24ndCBzZWVtIHRvIHdvcmsgaGVyZS4uLlxyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7IHRleHRFbC5mb2N1cygpIH0sMTAwKTsgLy8uLi4gYnV0IHRoaXMgZG9lc1xyXG5cclxuXHJcblx0XHRjb25zdCBidG5Db250YWluZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoJycpO1xyXG5cclxuXHRcdGlmICh0aGlzLnNob3dCdXR0b24pe1xyXG5cdFx0Y29uc3QgY29weUJ0bkVsID0gYnRuQ29udGFpbmVyRWwuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0NvcHknIH0pO1xyXG5cdFx0Y29weUJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0RWwudmFsdWUpO1xyXG5cdFx0fSk7IH1cclxuXHJcblx0XHRjb25zdCBkZWNyeXB0SW5QbGFjZUJ0bkVsID0gYnRuQ29udGFpbmVyRWwuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0RlY3J5cHQgaW4tcGxhY2UnIH0pO1xyXG5cdFx0ZGVjcnlwdEluUGxhY2VCdG5FbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0dGhpcy5kZWNyeXB0SW5QbGFjZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGNvbnN0IGNhbmNlbEJ0bkVsID0gYnRuQ29udGFpbmVyRWwuY3JlYXRlRWwoJ2J1dHRvbicsIHsgdGV4dDogJ0Nsb3NlJyB9KTtcclxuXHRcdGNhbmNlbEJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fVxyXG5cclxufSIsImltcG9ydCB7IEFwcCwgTW9kYWwsIFBsYXRmb3JtIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFzc3dvcmRNb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuXHRwYXNzd29yZDogc3RyaW5nID0gbnVsbDtcclxuXHRoaW50OiBzdHJpbmcgPSBudWxsO1xyXG5cdGRlZmF1bHRQYXNzd29yZDogc3RyaW5nID0gbnVsbDtcclxuXHRjb25maXJtUGFzc3dvcmQ6IGJvb2xlYW47XHJcblx0aXNFbmNyeXB0aW5nOiBib29sZWFuO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgaXNFbmNyeXB0aW5nOmJvb2xlYW4sIGNvbmZpcm1QYXNzd29yZDogYm9vbGVhbiwgZGVmYXVsdFBhc3N3b3JkOiBzdHJpbmcgPSBudWxsLCBoaW50OnN0cmluZyApIHtcclxuXHRcdHN1cGVyKGFwcCk7XHJcblx0XHR0aGlzLmRlZmF1bHRQYXNzd29yZCA9IGRlZmF1bHRQYXNzd29yZDtcclxuXHRcdHRoaXMuY29uZmlybVBhc3N3b3JkID0gY29uZmlybVBhc3N3b3JkO1xyXG5cdFx0dGhpcy5pc0VuY3J5cHRpbmcgPSBpc0VuY3J5cHRpbmc7XHJcblx0XHR0aGlzLmhpbnQgPSBoaW50O1xyXG5cdH1cclxuXHJcblx0b25PcGVuKCkge1xyXG5cdFx0bGV0IHsgY29udGVudEVsIH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xyXG5cclxuXHRcdGNvbnRlbnRFbC5hZGRDbGFzcyggJ21lbGQtZS1wYXNzd29yZCcgKTtcclxuXHRcdGlmIChQbGF0Zm9ybS5pc01vYmlsZSl7XHJcblx0XHRcdGNvbnRlbnRFbC5hZGRDbGFzcyggJ21lbGQtZS1wbGF0Zm9ybS1tb2JpbGUnICk7XHJcblx0XHR9ZWxzZSBpZiAoUGxhdGZvcm0uaXNEZXNrdG9wKXtcclxuXHRcdFx0Y29udGVudEVsLmFkZENsYXNzKCAnbWVsZC1lLXBsYXRmb3JtLWRlc2t0b3AnICk7XHJcblx0XHR9XHJcblxyXG5cdFx0LyogTWFpbiBwYXNzd29yZCBpbnB1dCByb3cgKi9cclxuXHRcdGNvbnN0IGlucHV0UHdDb250YWluZXJFbCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoIHsgY2xzOidtZWxkLWUtcm93JyB9ICk7XHJcblx0XHRpbnB1dFB3Q29udGFpbmVyRWwuY3JlYXRlU3Bhbih7IGNsczonbWVsZC1lLWljb24nLCB0ZXh0OiAn8J+UkScgfSk7XHJcblx0XHRcclxuXHRcdGNvbnN0IHB3SW5wdXRFbCA9IGlucHV0UHdDb250YWluZXJFbC5jcmVhdGVFbCgnaW5wdXQnLCB7IHR5cGU6ICdwYXNzd29yZCcsIHZhbHVlOiB0aGlzLmRlZmF1bHRQYXNzd29yZCA/PyAnJyB9KTtcclxuXHJcblx0XHRwd0lucHV0RWwucGxhY2Vob2xkZXIgPSAnRW50ZXIgeW91ciBwYXNzd29yZCc7XHJcblx0XHRwd0lucHV0RWwuZm9jdXMoKTtcclxuXHJcblx0XHRpZiAoUGxhdGZvcm0uaXNNb2JpbGUpe1xyXG5cdFx0XHQvLyBBZGQgJ05leHQnIGJ1dHRvbiBmb3IgbW9iaWxlXHJcblx0XHRcdGNvbnN0IGlucHV0SW5wdXROZXh0QnRuRWwgPSBpbnB1dFB3Q29udGFpbmVyRWwuY3JlYXRlRWwoJ2J1dHRvbicsIHtcclxuXHRcdFx0XHR0ZXh0OiAn4oaSJyxcclxuXHRcdFx0XHRjbHM6J21lbGQtZS1idXR0b24tbmV4dCdcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlucHV0SW5wdXROZXh0QnRuRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcclxuXHRcdFx0XHRpbnB1dFBhc3N3b3JkSGFuZGxlcigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBFbmQgTWFpbiBwYXNzd29yZCBpbnB1dCByb3cgKi9cclxuXHJcblx0XHQvKiBDb25maXJtIHBhc3N3b3JkIGlucHV0IHJvdyAqL1xyXG5cdFx0Y29uc3QgY29uZmlybVB3U2hvd24gPSB0aGlzLmNvbmZpcm1QYXNzd29yZDtcclxuXHRcdGNvbnN0IGNvbmZpcm1Qd0NvbnRhaW5lckVsID0gY29udGVudEVsLmNyZWF0ZURpdiggeyBjbHM6J21lbGQtZS1yb3cnIH0gKTtcclxuXHRcdGNvbmZpcm1Qd0NvbnRhaW5lckVsLmNyZWF0ZVNwYW4oIHsgY2xzOidtZWxkLWUtaWNvbicsIHRleHQ6ICfwn5SRJyB9ICk7XHJcblx0XHRcclxuXHRcdGNvbnN0IHB3Q29uZmlybUlucHV0RWwgPSBjb25maXJtUHdDb250YWluZXJFbC5jcmVhdGVFbCggJ2lucHV0Jywge1xyXG5cdFx0XHR0eXBlOiAncGFzc3dvcmQnLFxyXG5cdFx0XHR2YWx1ZTogdGhpcy5kZWZhdWx0UGFzc3dvcmQgPz8gJydcclxuXHRcdH0pO1xyXG5cdFx0cHdDb25maXJtSW5wdXRFbC5wbGFjZWhvbGRlciA9ICdDb25maXJtIHlvdXIgcGFzc3dvcmQnO1xyXG5cclxuXHRcdGNvbnN0IG1lc3NhZ2VFbCA9IGNvbnRlbnRFbC5jcmVhdGVEaXYoeyBjbHM6J21lbGQtZS1tZXNzYWdlJyB9KTtcclxuXHRcdG1lc3NhZ2VFbC5oaWRlKCk7XHJcblx0XHRcclxuXHRcdFxyXG5cdFx0aWYgKFBsYXRmb3JtLmlzTW9iaWxlKXtcclxuXHRcdFx0Ly8gQWRkICdOZXh0JyBidXR0b24gZm9yIG1vYmlsZVxyXG5cdFx0XHRjb25zdCBjb25maXJtSW5wdXROZXh0QnRuRWwgPSBjb25maXJtUHdDb250YWluZXJFbC5jcmVhdGVFbCgnYnV0dG9uJywge1xyXG5cdFx0XHRcdHRleHQ6ICfihpInLFxyXG5cdFx0XHRcdGNsczonbWVsZC1lLWJ1dHRvbi1uZXh0J1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y29uZmlybUlucHV0TmV4dEJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0Y29uZmlybVBhc3N3b3JkSGFuZGxlcigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYgKCFjb25maXJtUHdTaG93bikge1xyXG5cdFx0XHRjb25maXJtUHdDb250YWluZXJFbC5oaWRlKCk7XHJcblx0XHR9XHJcblx0XHQvKiBFbmQgQ29uZmlybSBwYXNzd29yZCBpbnB1dCByb3cgKi9cclxuXHJcblx0XHQvKiBIaW50IGlucHV0IHJvdyAqL1xyXG5cdFx0Y29uc3QgaGludElucHV0U2hvd24gPSB0aGlzLmlzRW5jcnlwdGluZztcclxuXHRcdGNvbnN0IGlucHV0SGludENvbnRhaW5lckVsID0gY29udGVudEVsLmNyZWF0ZURpdiggeyBjbHM6J21lbGQtZS1yb3cnIH0gKTtcclxuXHRcdGlucHV0SGludENvbnRhaW5lckVsLmNyZWF0ZVNwYW4oeyBjbHM6J21lbGQtZS1pY29uJywgdGV4dDogJ/CfkqEnIH0pO1xyXG5cdFx0Y29uc3QgaGludElucHV0RWwgPSBpbnB1dEhpbnRDb250YWluZXJFbC5jcmVhdGVFbCgnaW5wdXQnLCB7IHR5cGU6ICd0ZXh0JywgdmFsdWU6IHRoaXMuaGludCB9KTtcclxuXHRcdGhpbnRJbnB1dEVsLnBsYWNlaG9sZGVyID0gJ0VudGVyIGFuIG9wdGlvbmFsIHBhc3N3b3JkIGhpbnQnO1xyXG5cdFx0aWYgKFBsYXRmb3JtLmlzTW9iaWxlKXtcclxuXHRcdFx0Ly8gQWRkICdOZXh0JyBidXR0b24gZm9yIG1vYmlsZVxyXG5cdFx0XHRjb25zdCBoaW50SW5wdXROZXh0QnRuRWwgPSBpbnB1dEhpbnRDb250YWluZXJFbC5jcmVhdGVFbCgnYnV0dG9uJywge1xyXG5cdFx0XHRcdHRleHQ6ICfihpInLFxyXG5cdFx0XHRcdGNsczonbWVsZC1lLWJ1dHRvbi1uZXh0J1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aGludElucHV0TmV4dEJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2KSA9PiB7XHJcblx0XHRcdFx0aGludFBhc3N3b3JkSGFuZGxlcigpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGlmICghaGludElucHV0U2hvd24pe1xyXG5cdFx0XHRpbnB1dEhpbnRDb250YWluZXJFbC5oaWRlKCk7XHJcblx0XHR9XHJcblx0XHQvKiBFbmQgSGludCBpbnB1dCByb3cgKi9cclxuXHJcblx0XHQvKiBIaW50IHRleHQgcm93ICovXHJcblx0XHRjb25zdCBzcGFuSGludENvbnRhaW5lckVsID0gY29udGVudEVsLmNyZWF0ZURpdiggeyBjbHM6J21lbGQtZS1yb3cnIH0gKTtcclxuXHRcdHNwYW5IaW50Q29udGFpbmVyRWwuY3JlYXRlU3Bhbih7IGNsczonbWVsZC1lLWljb24nLCB0ZXh0OiAn8J+SoScgfSk7XHJcblx0XHRzcGFuSGludENvbnRhaW5lckVsLmNyZWF0ZVNwYW4oIHtjbHM6ICdtZWxkLWUtaGludCcsIHRleHQ6YEhpbnQ6ICcke3RoaXMuaGludH0nYH0pO1xyXG5cclxuXHRcdGlmIChoaW50SW5wdXRTaG93biB8fCAodGhpcy5oaW50ID8/ICcnKS5sZW5ndGg9PTApe1xyXG5cdFx0XHRzcGFuSGludENvbnRhaW5lckVsLmhpZGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvKiBFTkQgSGludCB0ZXh0IHJvdyAqL1xyXG5cclxuXHRcdGNvbnN0IGNvbmZpcm1Qd0J1dHRvbkVsID0gY29udGVudEVsLmNyZWF0ZUVsKCAnYnV0dG9uJywge1xyXG5cdFx0XHR0ZXh0OidDb25maXJtJyxcclxuXHRcdFx0Y2xzOidtZWxkLWUtYnV0dG9uLWNvbmZpcm0nXHJcblx0XHR9KTtcclxuXHRcdGNvbmZpcm1Qd0J1dHRvbkVsLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIChldikgPT57XHJcblx0XHRcdGlmICh2YWxpZGF0ZSgpKXtcclxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHB3SW5wdXRFbC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cclxuXHRcdGNvbnN0IHZhbGlkYXRlID0gKCkgOiBib29sZWFuID0+IHtcclxuXHRcdFx0aWYgKGNvbmZpcm1Qd1Nob3duKXtcclxuXHRcdFx0XHRpZiAocHdJbnB1dEVsLnZhbHVlICE9IHB3Q29uZmlybUlucHV0RWwudmFsdWUpe1xyXG5cdFx0XHRcdFx0Ly8gcGFzc3dvcmRzIGRvbid0IG1hdGNoXHJcblx0XHRcdFx0XHRtZXNzYWdlRWwuc2V0VGV4dCgnUGFzc3dvcmRzIGRvblxcJ3QgbWF0Y2gnKTtcclxuXHRcdFx0XHRcdG1lc3NhZ2VFbC5zaG93KCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnBhc3N3b3JkID0gcHdJbnB1dEVsLnZhbHVlO1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy5oaW50ID0gaGludElucHV0RWwudmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBpbnB1dFBhc3N3b3JkSGFuZGxlciA9ICgpID0+e1xyXG5cdFx0XHRpZiAoY29uZmlybVB3U2hvd24pe1xyXG5cdFx0XHRcdHB3Q29uZmlybUlucHV0RWwuZm9jdXMoKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChoaW50SW5wdXRTaG93bil7XHJcblx0XHRcdFx0aGludElucHV0RWwuZm9jdXMoKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdmFsaWRhdGUoKSApe1xyXG5cdFx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGNvbmZpcm1QYXNzd29yZEhhbmRsZXIgPSAoKSA9PiB7XHJcblx0XHRcdGlmICggdmFsaWRhdGUoKSApe1xyXG5cdFx0XHRcdGlmIChoaW50SW5wdXRTaG93bil7XHJcblx0XHRcdFx0XHRoaW50SW5wdXRFbC5mb2N1cygpO1xyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGhpbnRQYXNzd29yZEhhbmRsZXIgPSAoKSA9PiB7XHJcblx0XHRcdGlmICh2YWxpZGF0ZSgpKXtcclxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHB3SW5wdXRFbC5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGhpbnRJbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGV2KSA9PiB7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHQoIGV2LmNvZGUgPT09ICdFbnRlcicgfHwgZXYuY29kZSA9PT0gJ051bXBhZEVudGVyJyApXHJcblx0XHRcdFx0JiYgcHdJbnB1dEVsLnZhbHVlLmxlbmd0aCA+IDBcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRoaW50UGFzc3dvcmRIYW5kbGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHB3Q29uZmlybUlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXYpID0+IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdCggZXYuY29kZSA9PT0gJ0VudGVyJyB8fCBldi5jb2RlID09PSAnTnVtcGFkRW50ZXInIClcclxuXHRcdFx0XHQmJiBwd0NvbmZpcm1JbnB1dEVsLnZhbHVlLmxlbmd0aCA+IDBcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRjb25maXJtUGFzc3dvcmRIYW5kbGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHJcblx0XHRwd0lucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZXYpID0+IHtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdCggZXYuY29kZSA9PT0gJ0VudGVyJyB8fCBldi5jb2RlID09PSAnTnVtcGFkRW50ZXInIClcclxuXHRcdFx0XHQmJiBwd0lucHV0RWwudmFsdWUubGVuZ3RoID4gMFxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdGlucHV0UGFzc3dvcmRIYW5kbGVyKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHR9XHJcblxyXG59IiwiY29uc3QgdmVjdG9yU2l6ZVx0PSAxNjtcclxuY29uc3QgdXRmOEVuY29kZXJcdD0gbmV3IFRleHRFbmNvZGVyKCk7XHJcbmNvbnN0IHV0ZjhEZWNvZGVyXHQ9IG5ldyBUZXh0RGVjb2RlcigpO1xyXG5jb25zdCBpdGVyYXRpb25zXHQ9IDEwMDA7XHJcbmNvbnN0IHNhbHRcdFx0XHQ9IHV0ZjhFbmNvZGVyLmVuY29kZSgnWEhXbkRBVDZlaE1WWTJ6RCcpO1xyXG5cclxuZXhwb3J0IGNsYXNzIENyeXB0b0hlbHBlclYyIHtcclxuXHJcblx0cHJpdmF0ZSBhc3luYyBkZXJpdmVLZXkocGFzc3dvcmQ6c3RyaW5nKSA6UHJvbWlzZTxDcnlwdG9LZXk+IHtcclxuXHRcdGNvbnN0IGJ1ZmZlciAgICAgPSB1dGY4RW5jb2Rlci5lbmNvZGUocGFzc3dvcmQpO1xyXG5cdFx0Y29uc3Qga2V5ICAgICAgICA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCBidWZmZXIsIHtuYW1lOiAnUEJLREYyJ30sIGZhbHNlLCBbJ2Rlcml2ZUtleSddKTtcclxuXHRcdGNvbnN0IHByaXZhdGVLZXkgPSBjcnlwdG8uc3VidGxlLmRlcml2ZUtleShcclxuXHRcdFx0e1xyXG5cdFx0XHRcdG5hbWU6ICdQQktERjInLFxyXG5cdFx0XHRcdGhhc2g6IHtuYW1lOiAnU0hBLTI1Nid9LFxyXG5cdFx0XHRcdGl0ZXJhdGlvbnMsXHJcblx0XHRcdFx0c2FsdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRrZXksXHJcblx0XHRcdHtcclxuXHRcdFx0XHRuYW1lOiAnQUVTLUdDTScsXHJcblx0XHRcdFx0bGVuZ3RoOiAyNTZcclxuXHRcdFx0fSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdFsnZW5jcnlwdCcsICdkZWNyeXB0J11cclxuXHRcdCk7XHJcblx0XHRcclxuXHRcdHJldHVybiBwcml2YXRlS2V5O1xyXG5cdH1cclxuXHJcblx0cHVibGljIGFzeW5jIGVuY3J5cHRUb0Jhc2U2NCh0ZXh0OiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cclxuXHRcdGNvbnN0IGtleSA9IGF3YWl0IHRoaXMuZGVyaXZlS2V5KHBhc3N3b3JkKTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgdGV4dEJ5dGVzVG9FbmNyeXB0ID0gdXRmOEVuY29kZXIuZW5jb2RlKHRleHQpO1xyXG5cdFx0Y29uc3QgdmVjdG9yID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSh2ZWN0b3JTaXplKSk7XHJcblx0XHRcclxuXHRcdC8vIGVuY3J5cHQgaW50byBieXRlc1xyXG5cdFx0Y29uc3QgZW5jcnlwdGVkQnl0ZXMgPSBuZXcgVWludDhBcnJheShcclxuXHRcdFx0YXdhaXQgY3J5cHRvLnN1YnRsZS5lbmNyeXB0KFxyXG5cdFx0XHRcdHtuYW1lOiAnQUVTLUdDTScsIGl2OiB2ZWN0b3J9LFxyXG5cdFx0XHRcdGtleSxcclxuXHRcdFx0XHR0ZXh0Qnl0ZXNUb0VuY3J5cHRcclxuXHRcdFx0KVxyXG5cdFx0KTtcclxuXHRcdFxyXG5cdFx0Y29uc3QgZmluYWxCeXRlcyA9IG5ldyBVaW50OEFycmF5KCB2ZWN0b3IuYnl0ZUxlbmd0aCArIGVuY3J5cHRlZEJ5dGVzLmJ5dGVMZW5ndGggKTtcclxuXHRcdGZpbmFsQnl0ZXMuc2V0KCB2ZWN0b3IsIDAgKTtcclxuXHRcdGZpbmFsQnl0ZXMuc2V0KCBlbmNyeXB0ZWRCeXRlcywgdmVjdG9yLmJ5dGVMZW5ndGggKTtcclxuXHJcblx0XHQvL2NvbnZlcnQgYXJyYXkgdG8gYmFzZTY0XHJcblx0XHRjb25zdCBiYXNlNjRUZXh0ID0gYnRvYSggU3RyaW5nLmZyb21DaGFyQ29kZSguLi5maW5hbEJ5dGVzKSApO1xyXG5cclxuXHRcdHJldHVybiBiYXNlNjRUZXh0O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cjogc3RyaW5nKTogVWludDhBcnJheSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRyZXN1bHQucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBkZWNyeXB0RnJvbUJhc2U2NChiYXNlNjRFbmNvZGVkOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0dHJ5IHtcclxuXHJcblx0XHRcdGxldCBieXRlc1RvRGVjb2RlID0gdGhpcy5zdHJpbmdUb0FycmF5KGF0b2IoYmFzZTY0RW5jb2RlZCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gZXh0cmFjdCBpdlxyXG5cdFx0XHRjb25zdCB2ZWN0b3IgPSBieXRlc1RvRGVjb2RlLnNsaWNlKDAsdmVjdG9yU2l6ZSk7XHJcblxyXG5cdFx0XHQvLyBleHRyYWN0IGVuY3J5cHRlZCB0ZXh0XHJcblx0XHRcdGNvbnN0IGVuY3J5cHRlZFRleHRCeXRlcyA9IGJ5dGVzVG9EZWNvZGUuc2xpY2UodmVjdG9yU2l6ZSk7XHJcblxyXG5cdFx0XHRjb25zdCBrZXkgPSBhd2FpdCB0aGlzLmRlcml2ZUtleShwYXNzd29yZCk7XHJcblxyXG5cdFx0XHQvLyBkZWNyeXB0IGludG8gYnl0ZXNcclxuXHRcdFx0bGV0IGRlY3J5cHRlZEJ5dGVzID0gYXdhaXQgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KFxyXG5cdFx0XHRcdHtuYW1lOiAnQUVTLUdDTScsIGl2OiB2ZWN0b3J9LFxyXG5cdFx0XHRcdGtleSxcclxuXHRcdFx0XHRlbmNyeXB0ZWRUZXh0Qnl0ZXNcclxuXHRcdFx0KTtcclxuXHJcblx0XHRcdC8vIGNvbnZlcnQgYnl0ZXMgdG8gdGV4dFxyXG5cdFx0XHRsZXQgZGVjcnlwdGVkVGV4dCA9IHV0ZjhEZWNvZGVyLmRlY29kZShkZWNyeXB0ZWRCeXRlcyk7XHJcblx0XHRcdHJldHVybiBkZWNyeXB0ZWRUZXh0O1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHQvL2NvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNvbnN0IGFsZ29yaXRobU9ic29sZXRlID0ge1xyXG5cdG5hbWU6ICdBRVMtR0NNJyxcclxuXHRpdjogbmV3IFVpbnQ4QXJyYXkoWzE5NiwgMTkwLCAyNDAsIDE5MCwgMTg4LCA3OCwgNDEsIDEzMiwgMTUsIDIyMCwgODQsIDIxMV0pLFxyXG5cdHRhZ0xlbmd0aDogMTI4XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDcnlwdG9IZWxwZXJPYnNvbGV0ZSB7XHJcblxyXG5cdHByaXZhdGUgYXN5bmMgYnVpbGRLZXkocGFzc3dvcmQ6IHN0cmluZykge1xyXG5cdFx0bGV0IHV0ZjhFbmNvZGUgPSBuZXcgVGV4dEVuY29kZXIoKTtcclxuXHRcdGxldCBwYXNzd29yZEJ5dGVzID0gdXRmOEVuY29kZS5lbmNvZGUocGFzc3dvcmQpO1xyXG5cclxuXHRcdGxldCBwYXNzd29yZERpZ2VzdCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KHsgbmFtZTogJ1NIQS0yNTYnIH0sIHBhc3N3b3JkQnl0ZXMpO1xyXG5cclxuXHRcdGxldCBrZXkgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcclxuXHRcdFx0J3JhdycsXHJcblx0XHRcdHBhc3N3b3JkRGlnZXN0LFxyXG5cdFx0XHRhbGdvcml0aG1PYnNvbGV0ZSxcclxuXHRcdFx0ZmFsc2UsXHJcblx0XHRcdFsnZW5jcnlwdCcsICdkZWNyeXB0J11cclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIGtleTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBlbmNyeXB0VG9CYXNlNjQodGV4dDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuXHRcdGxldCBrZXkgPSBhd2FpdCB0aGlzLmJ1aWxkS2V5KHBhc3N3b3JkKTtcclxuXHJcblx0XHRsZXQgdXRmOEVuY29kZSA9IG5ldyBUZXh0RW5jb2RlcigpO1xyXG5cdFx0bGV0IGJ5dGVzVG9FbmNyeXB0ID0gdXRmOEVuY29kZS5lbmNvZGUodGV4dCk7XHJcblxyXG5cdFx0Ly8gZW5jcnlwdCBpbnRvIGJ5dGVzXHJcblx0XHRsZXQgZW5jcnlwdGVkQnl0ZXMgPSBuZXcgVWludDhBcnJheShhd2FpdCBjcnlwdG8uc3VidGxlLmVuY3J5cHQoXHJcblx0XHRcdGFsZ29yaXRobU9ic29sZXRlLCBrZXksIGJ5dGVzVG9FbmNyeXB0XHJcblx0XHQpKTtcclxuXHJcblx0XHQvL2NvbnZlcnQgYXJyYXkgdG8gYmFzZTY0XHJcblx0XHRsZXQgYmFzZTY0VGV4dCA9IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5lbmNyeXB0ZWRCeXRlcykpO1xyXG5cclxuXHRcdHJldHVybiBiYXNlNjRUZXh0O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdHJpbmdUb0FycmF5KHN0cjogc3RyaW5nKTogVWludDhBcnJheSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRyZXN1bHQucHVzaChzdHIuY2hhckNvZGVBdChpKSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBkZWNyeXB0RnJvbUJhc2U2NChiYXNlNjRFbmNvZGVkOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Ly8gY29udmVydCBiYXNlIDY0IHRvIGFycmF5XHJcblx0XHRcdGxldCBieXRlc1RvRGVjcnlwdCA9IHRoaXMuc3RyaW5nVG9BcnJheShhdG9iKGJhc2U2NEVuY29kZWQpKTtcclxuXHJcblx0XHRcdGxldCBrZXkgPSBhd2FpdCB0aGlzLmJ1aWxkS2V5KHBhc3N3b3JkKTtcclxuXHJcblx0XHRcdC8vIGRlY3J5cHQgaW50byBieXRlc1xyXG5cdFx0XHRsZXQgZGVjcnlwdGVkQnl0ZXMgPSBhd2FpdCBjcnlwdG8uc3VidGxlLmRlY3J5cHQoYWxnb3JpdGhtT2Jzb2xldGUsIGtleSwgYnl0ZXNUb0RlY3J5cHQpO1xyXG5cclxuXHRcdFx0Ly8gY29udmVydCBieXRlcyB0byB0ZXh0XHJcblx0XHRcdGxldCB1dGY4RGVjb2RlID0gbmV3IFRleHREZWNvZGVyKCk7XHJcblx0XHRcdGxldCBkZWNyeXB0ZWRUZXh0ID0gdXRmOERlY29kZS5kZWNvZGUoZGVjcnlwdGVkQnl0ZXMpO1xyXG5cdFx0XHRyZXR1cm4gZGVjcnlwdGVkVGV4dDtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE1lbGRFbmNyeXB0IGZyb20gXCIuL21haW5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbGRFbmNyeXB0U2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRwbHVnaW46IE1lbGRFbmNyeXB0O1xyXG5cclxuXHRwd1RpbWVvdXRTZXR0aW5nOlNldHRpbmc7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE1lbGRFbmNyeXB0KSB7XHJcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XHJcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcclxuXHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cdFx0XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ1NldHRpbmdzIGZvciBNZWxkIEVuY3J5cHQnfSk7XHJcblxyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnRXhwYW5kIHNlbGVjdGlvbiB0byB3aG9sZSBsaW5lPycpXHJcblx0XHRcdC5zZXREZXNjKCdQYXJ0aWFsIHNlbGVjdGlvbnMgd2lsbCBnZXQgZXhwYW5kZWQgdG8gdGhlIHdob2xlIGxpbmUuJylcclxuXHRcdFx0LmFkZFRvZ2dsZSggdG9nZ2xlID0+e1xyXG5cdFx0XHRcdHRvZ2dsZVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGFuZFRvV2hvbGVMaW5lcylcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSggYXN5bmMgdmFsdWUgPT57XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmV4cGFuZFRvV2hvbGVMaW5lcyA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0Ly90aGlzLnVwZGF0ZVNldHRpbmdzVWkoKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHQ7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdDb25maXJtIHBhc3N3b3JkPycpXHJcblx0XHRcdC5zZXREZXNjKCdDb25maXJtIHBhc3N3b3JkIHdoZW4gZW5jcnlwdGluZy4nKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCB0b2dnbGUgPT57XHJcblx0XHRcdFx0dG9nZ2xlXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY29uZmlybVBhc3N3b3JkKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCBhc3luYyB2YWx1ZSA9PntcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY29uZmlybVBhc3N3b3JkID0gdmFsdWU7XHJcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG5cdFx0XHRcdFx0XHR0aGlzLnVwZGF0ZVNldHRpbmdzVWkoKTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHQ7XHJcblxyXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdC5zZXROYW1lKCdDb3B5IGJ1dHRvbj8nKVxyXG5cdFx0XHQuc2V0RGVzYygnU2hvdyBhIGJ1dHRvbiB0byBjb3B5IGRlY3J5cHRlZCB0ZXh0LicpXHJcblx0XHRcdC5hZGRUb2dnbGUoIHRvZ2dsZSA9PntcclxuXHRcdFx0XHR0b2dnbGVcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93QnV0dG9uKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCBhc3luYyB2YWx1ZSA9PntcclxuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd0J1dHRvbiA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVTZXR0aW5nc1VpKCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0O1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnUmVtZW1iZXIgcGFzc3dvcmQ/JylcclxuXHRcdFx0LnNldERlc2MoJ1JlbWVtYmVyIHRoZSBsYXN0IHVzZWQgcGFzc3dvcmQgZm9yIHRoaXMgc2Vzc2lvbi4nKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCB0b2dnbGUgPT57XHJcblx0XHRcdFx0dG9nZ2xlXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucmVtZW1iZXJQYXNzd29yZClcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSggYXN5bmMgdmFsdWUgPT57XHJcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnJlbWVtYmVyUGFzc3dvcmQgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XHJcblx0XHRcdFx0XHRcdHRoaXMudXBkYXRlU2V0dGluZ3NVaSgpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdDtcclxuXHJcblx0XHR0aGlzLnB3VGltZW91dFNldHRpbmcgPSBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoIHRoaXMuYnVpbGRQYXNzd29yZFRpbWVvdXRTZXR0aW5nTmFtZSgpIClcclxuXHRcdFx0LnNldERlc2MoJ1RoZSBudW1iZXIgb2YgbWludXRlcyB0byByZW1lbWJlciB0aGUgbGFzdCB1c2VkIHBhc3N3b3JkLicpXHJcblx0XHRcdC5hZGRTbGlkZXIoIHNsaWRlciA9PiB7XHJcblx0XHRcdFx0c2xpZGVyXHJcblx0XHRcdFx0XHQuc2V0TGltaXRzKDAsIDEyMCwgNSlcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZW1lbWJlclBhc3N3b3JkVGltZW91dClcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSggYXN5bmMgdmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZW1lbWJlclBhc3N3b3JkVGltZW91dCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcclxuXHRcdFx0XHRcdFx0dGhpcy51cGRhdGVTZXR0aW5nc1VpKCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fSlcclxuXHRcdDtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVNldHRpbmdzVWkoKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZVNldHRpbmdzVWkoKTp2b2lke1xyXG5cdFx0dGhpcy5wd1RpbWVvdXRTZXR0aW5nLnNldE5hbWUodGhpcy5idWlsZFBhc3N3b3JkVGltZW91dFNldHRpbmdOYW1lKCkpO1xyXG5cclxuXHJcblx0XHRpZiAoIHRoaXMucGx1Z2luLnNldHRpbmdzLnJlbWVtYmVyUGFzc3dvcmQgKXtcclxuXHRcdFx0dGhpcy5wd1RpbWVvdXRTZXR0aW5nLnNldHRpbmdFbC5zaG93KCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5wd1RpbWVvdXRTZXR0aW5nLnNldHRpbmdFbC5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRidWlsZFBhc3N3b3JkVGltZW91dFNldHRpbmdOYW1lKCk6c3RyaW5ne1xyXG5cdFx0Y29uc3QgdmFsdWUgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZW1lbWJlclBhc3N3b3JkVGltZW91dDtcclxuXHRcdGxldCB0aW1lb3V0U3RyaW5nID0gYCR7dmFsdWV9IG1pbnV0ZXNgO1xyXG5cdFx0aWYodmFsdWUgPT0gMCl7XHJcblx0XHRcdHRpbWVvdXRTdHJpbmcgPSAnTmV2ZXIgZm9yZ2V0JztcclxuXHRcdH1cclxuXHRcdHJldHVybiBgUmVtZW1iZXIgUGFzc3dvcmQgVGltZW91dCAoJHt0aW1lb3V0U3RyaW5nfSlgO1xyXG5cdH1cclxufSIsImltcG9ydCB7IE5vdGljZSwgUGx1Z2luLCBNYXJrZG93blZpZXcsIEVkaXRvciwgRWRpdG9yUG9zaXRpb24gfSBmcm9tICdvYnNpZGlhbic7XHJcbmltcG9ydCBEZWNyeXB0TW9kYWwgZnJvbSAnLi9EZWNyeXB0TW9kYWwnO1xyXG5pbXBvcnQgUGFzc3dvcmRNb2RhbCBmcm9tICcuL1Bhc3N3b3JkTW9kYWwnO1xyXG5pbXBvcnQgeyBDcnlwdG9IZWxwZXJWMiwgQ3J5cHRvSGVscGVyT2Jzb2xldGV9IGZyb20gJy4vQ3J5cHRvSGVscGVyJztcclxuaW1wb3J0IE1lbGRFbmNyeXB0U2V0dGluZ3NUYWIgZnJvbSAnLi9NZWxkRW5jcnlwdFNldHRpbmdzVGFiJztcclxuXHJcbmNvbnN0IF9QUkVGSVg6IHN0cmluZyA9ICclJfCflJAnO1xyXG5jb25zdCBfUFJFRklYX09CU09MRVRFOiBzdHJpbmcgPSBfUFJFRklYICsgJyAnO1xyXG5jb25zdCBfUFJFRklYX0E6IHN0cmluZyA9IF9QUkVGSVggKyAnzrEgJztcclxuY29uc3QgX1NVRkZJWDogc3RyaW5nID0gJyDwn5SQJSUnO1xyXG5cclxuY29uc3QgX0hJTlQ6IHN0cmluZyA9ICfwn5KhJztcclxuXHJcbmludGVyZmFjZSBNZWxkRW5jcnlwdFBsdWdpblNldHRpbmdzIHtcclxuXHRleHBhbmRUb1dob2xlTGluZXM6IGJvb2xlYW4sXHJcblx0Y29uZmlybVBhc3N3b3JkOiBib29sZWFuO1xyXG5cdHNob3dCdXR0b246IGJvb2xlYW47XHJcblx0cmVtZW1iZXJQYXNzd29yZDogYm9vbGVhbjtcclxuXHRyZW1lbWJlclBhc3N3b3JkVGltZW91dDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNZWxkRW5jcnlwdFBsdWdpblNldHRpbmdzID0ge1xyXG5cdGV4cGFuZFRvV2hvbGVMaW5lczogdHJ1ZSxcclxuXHRjb25maXJtUGFzc3dvcmQ6IHRydWUsXHJcblx0c2hvd0J1dHRvbjogZmFsc2UsXHJcblx0cmVtZW1iZXJQYXNzd29yZDogdHJ1ZSxcclxuXHRyZW1lbWJlclBhc3N3b3JkVGltZW91dDogMzBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVsZEVuY3J5cHQgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cclxuXHRzZXR0aW5nczogTWVsZEVuY3J5cHRQbHVnaW5TZXR0aW5ncztcclxuXHRwYXNzd29yZExhc3RVc2VkRXhwaXJ5OiBudW1iZXJcclxuXHRwYXNzd29yZExhc3RVc2VkOiBzdHJpbmc7XHJcblxyXG5cdGFzeW5jIG9ubG9hZCgpIHtcclxuXHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgTWVsZEVuY3J5cHRTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnbWVsZC1lbmNyeXB0JyxcclxuXHRcdFx0bmFtZTogJ0VuY3J5cHQvRGVjcnlwdCcsXHJcblx0XHRcdGVkaXRvckNoZWNrQ2FsbGJhY2s6IChjaGVja2luZywgZWRpdG9yLCB2aWV3KSA9PiB0aGlzLnByb2Nlc3NFbmNyeXB0RGVjcnlwdENvbW1hbmQoY2hlY2tpbmcsIGVkaXRvciwgdmlldywgZmFsc2UpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ21lbGQtZW5jcnlwdC1pbi1wbGFjZScsXHJcblx0XHRcdG5hbWU6ICdFbmNyeXB0L0RlY3J5cHQgSW4tcGxhY2UnLFxyXG5cdFx0XHRlZGl0b3JDaGVja0NhbGxiYWNrOiAoY2hlY2tpbmcsIGVkaXRvciwgdmlldykgPT4gdGhpcy5wcm9jZXNzRW5jcnlwdERlY3J5cHRDb21tYW5kKGNoZWNraW5nLCBlZGl0b3IsIHZpZXcsIHRydWUpXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ21lbGQtZW5jcnlwdC1ub3RlJyxcclxuXHRcdFx0bmFtZTogJ0VuY3J5cHQvRGVjcnlwdCBXaG9sZSBOb3RlJyxcclxuXHRcdFx0ZWRpdG9yQ2hlY2tDYWxsYmFjazogKGNoZWNraW5nLCBlZGl0b3IsIHZpZXcpID0+IHRoaXMucHJvY2Vzc0VuY3J5cHREZWNyeXB0V2hvbGVOb3RlQ29tbWFuZChjaGVja2luZywgZWRpdG9yLCB2aWV3KVxyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxuXHJcblx0aXNTZXR0aW5nc01vZGFsT3BlbigpIDogYm9vbGVhbntcclxuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kLXNldHRpbmdzJykgIT09IG51bGw7XHJcblx0fSBcclxuXHJcblx0cHJvY2Vzc0VuY3J5cHREZWNyeXB0V2hvbGVOb3RlQ29tbWFuZChjaGVja2luZzogYm9vbGVhbiwgZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldyk6IGJvb2xlYW4ge1xyXG5cclxuXHRcdGlmICggY2hlY2tpbmcgJiYgdGhpcy5pc1NldHRpbmdzTW9kYWxPcGVuKCkgKXtcclxuXHRcdFx0Ly8gU2V0dGluZ3MgaXMgb3BlbiwgZW5zdXJlcyB0aGlzIGNvbW1hbmQgY2FuIHNob3cgdXAgaW4gb3RoZXJcclxuXHRcdFx0Ly8gcGx1Z2lucyB3aGljaCBsaXN0IGNvbW1hbmRzIGUuZy4gY3VzdG9taXphYmxlLXNpZGViYXJcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc3Qgc3RhcnRQb3MgPSBlZGl0b3Iub2Zmc2V0VG9Qb3MoMCk7XHJcblx0XHRjb25zdCBlbmRQb3MgPSB7IGxpbmU6IGVkaXRvci5sYXN0TGluZSgpLCBjaDogZWRpdG9yLmdldExpbmUoZWRpdG9yLmxhc3RMaW5lKCkpLmxlbmd0aCB9O1xyXG5cclxuXHRcdGNvbnN0IHNlbGVjdGlvblRleHQgPSBlZGl0b3IuZ2V0UmFuZ2Uoc3RhcnRQb3MsIGVuZFBvcykudHJpbSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oXHJcblx0XHRcdGNoZWNraW5nLFxyXG5cdFx0XHRlZGl0b3IsXHJcblx0XHRcdHNlbGVjdGlvblRleHQsXHJcblx0XHRcdHN0YXJ0UG9zLFxyXG5cdFx0XHRlbmRQb3MsXHJcblx0XHRcdHRydWVcclxuXHRcdCk7XHJcblx0fVxyXG5cclxuXHRwcm9jZXNzRW5jcnlwdERlY3J5cHRDb21tYW5kKGNoZWNraW5nOiBib29sZWFuLCBlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3LCBkZWNyeXB0SW5QbGFjZTogYm9vbGVhbik6IGJvb2xlYW4ge1xyXG5cdFx0aWYgKCBjaGVja2luZyAmJiB0aGlzLmlzU2V0dGluZ3NNb2RhbE9wZW4oKSApe1xyXG5cdFx0XHQvLyBTZXR0aW5ncyBpcyBvcGVuLCBlbnN1cmVzIHRoaXMgY29tbWFuZCBjYW4gc2hvdyB1cCBpbiBvdGhlclxyXG5cdFx0XHQvLyBwbHVnaW5zIHdoaWNoIGxpc3QgY29tbWFuZHMgZS5nLiBjdXN0b21pemFibGUtc2lkZWJhclxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgc3RhcnRQb3MgPSBlZGl0b3IuZ2V0Q3Vyc29yKCdmcm9tJyk7XHJcblx0XHRsZXQgZW5kUG9zID0gZWRpdG9yLmdldEN1cnNvcigndG8nKTtcclxuXHJcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5leHBhbmRUb1dob2xlTGluZXMpe1xyXG5cdFx0XHRjb25zdCBzdGFydExpbmUgPSBzdGFydFBvcy5saW5lO1xyXG5cdFx0XHRzdGFydFBvcyA9IHsgbGluZTogc3RhcnRMaW5lLCBjaDogMCB9OyAvLyB3YW50IHRoZSBzdGFydCBvZiB0aGUgZmlyc3QgbGluZVxyXG5cclxuXHRcdFx0Y29uc3QgZW5kTGluZSA9IGVuZFBvcy5saW5lO1xyXG5cdFx0XHRjb25zdCBlbmRMaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGVuZExpbmUpO1xyXG5cdFx0XHRlbmRQb3MgPSB7IGxpbmU6IGVuZExpbmUsIGNoOiBlbmRMaW5lVGV4dC5sZW5ndGggfTsgLy8gd2FudCB0aGUgZW5kIG9mIGxhc3QgbGluZVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlmICggIWVkaXRvci5zb21ldGhpbmdTZWxlY3RlZCgpICl7XHJcblx0XHRcdFx0Ly8gbm90aGluZyBzZWxlY3RlZCwgYXNzdW1lIHVzZXIgd2FudHMgdG8gZGVjcnlwdCwgZXhwYW5kIHRvIHN0YXJ0IGFuZCBlbmQgbWFya2Vyc1xyXG5cdFx0XHRcdHN0YXJ0UG9zID0gdGhpcy5nZXRDbG9zZXN0UHJldlRleHRDdXJzb3JQb3MoZWRpdG9yLCBfUFJFRklYLCBzdGFydFBvcyApO1xyXG5cdFx0XHRcdGVuZFBvcyA9IHRoaXMuZ2V0Q2xvc2VzdE5leHRUZXh0Q3Vyc29yUG9zKGVkaXRvciwgX1NVRkZJWCwgZW5kUG9zICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBzZWxlY3Rpb25UZXh0ID0gZWRpdG9yLmdldFJhbmdlKHN0YXJ0UG9zLCBlbmRQb3MpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnByb2Nlc3NTZWxlY3Rpb24oXHJcblx0XHRcdGNoZWNraW5nLFxyXG5cdFx0XHRlZGl0b3IsXHJcblx0XHRcdHNlbGVjdGlvblRleHQsXHJcblx0XHRcdHN0YXJ0UG9zLFxyXG5cdFx0XHRlbmRQb3MsXHJcblx0XHRcdGRlY3J5cHRJblBsYWNlXHJcblx0XHQpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRDbG9zZXN0UHJldlRleHRDdXJzb3JQb3MoZWRpdG9yOiBFZGl0b3IsIHRleHQ6IHN0cmluZywgZGVmYXVsdFZhbHVlOkVkaXRvclBvc2l0aW9uICk6IEVkaXRvclBvc2l0aW9ue1xyXG5cdFx0Y29uc3QgaW5pdE9mZnNldCA9IGVkaXRvci5wb3NUb09mZnNldCggZWRpdG9yLmdldEN1cnNvcihcImZyb21cIikgKTtcclxuXHJcblx0XHRmb3IgKGxldCBvZmZzZXQgPSBpbml0T2Zmc2V0OyBvZmZzZXQgPj0gMDsgb2Zmc2V0LS0pIHtcclxuXHRcdFx0Y29uc3Qgb2Zmc2V0UG9zID0gZWRpdG9yLm9mZnNldFRvUG9zKG9mZnNldCk7XHJcblx0XHRcdGNvbnN0IHRleHRFbmRPZmZzZXQgPSBvZmZzZXQgKyB0ZXh0Lmxlbmd0aDtcclxuXHRcdFx0Y29uc3QgcHJlZml4RW5kUG9zID0gZWRpdG9yLm9mZnNldFRvUG9zKHRleHRFbmRPZmZzZXQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Y29uc3QgdGVzdFRleHQgPSBlZGl0b3IuZ2V0UmFuZ2UoIG9mZnNldFBvcywgcHJlZml4RW5kUG9zICk7XHJcblx0XHRcdGlmICh0ZXN0VGV4dCA9PSB0ZXh0KXtcclxuXHRcdFx0XHRyZXR1cm4gb2Zmc2V0UG9zO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q2xvc2VzdE5leHRUZXh0Q3Vyc29yUG9zKGVkaXRvcjogRWRpdG9yLCB0ZXh0OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTpFZGl0b3JQb3NpdGlvbiApOiBFZGl0b3JQb3NpdGlvbntcclxuXHRcdGNvbnN0IGluaXRPZmZzZXQgPSBlZGl0b3IucG9zVG9PZmZzZXQoIGVkaXRvci5nZXRDdXJzb3IoXCJmcm9tXCIpICk7XHJcblx0XHRjb25zdCBsYXN0TGluZU51bSA9IGVkaXRvci5sYXN0TGluZSgpO1xyXG5cclxuXHRcdGxldCBtYXhPZmZzZXQgPSBlZGl0b3IucG9zVG9PZmZzZXQoIHtsaW5lOmxhc3RMaW5lTnVtLCBjaDplZGl0b3IuZ2V0TGluZShsYXN0TGluZU51bSkubGVuZ3RofSApO1xyXG5cclxuXHRcdGZvciAobGV0IG9mZnNldCA9IGluaXRPZmZzZXQ7IG9mZnNldCA8PSBtYXhPZmZzZXQgLSB0ZXh0Lmxlbmd0aDsgb2Zmc2V0KyspIHtcclxuXHRcdFx0Y29uc3Qgb2Zmc2V0UG9zID0gZWRpdG9yLm9mZnNldFRvUG9zKG9mZnNldCk7XHJcblx0XHRcdGNvbnN0IHRleHRFbmRPZmZzZXQgPSBvZmZzZXQgKyB0ZXh0Lmxlbmd0aDtcclxuXHRcdFx0Y29uc3QgcHJlZml4RW5kUG9zID0gZWRpdG9yLm9mZnNldFRvUG9zKHRleHRFbmRPZmZzZXQpO1xyXG5cdFx0XHRcclxuXHRcdFx0Y29uc3QgdGVzdFRleHQgPSBlZGl0b3IuZ2V0UmFuZ2UoIG9mZnNldFBvcywgcHJlZml4RW5kUG9zICk7XHJcblx0XHRcdFxyXG5cdFx0XHRpZiAodGVzdFRleHQgPT0gdGV4dCl7XHJcblx0XHRcdFx0cmV0dXJuIHByZWZpeEVuZFBvcztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhbmFseXNlU2VsZWN0aW9uKCBzZWxlY3Rpb25UZXh0OiBzdHJpbmcgKTpTZWxlY3Rpb25BbmFseXNpc3tcclxuXHRcdFxyXG5cdFx0Y29uc3QgcmVzdWx0ID0gbmV3IFNlbGVjdGlvbkFuYWx5c2lzKCk7XHJcblxyXG5cdFx0cmVzdWx0LmlzRW1wdHkgPSBzZWxlY3Rpb25UZXh0Lmxlbmd0aCA9PT0gMDtcclxuXHJcblx0XHRyZXN1bHQuaGFzT2Jzb2xldGVFbmNyeXB0ZWRQcmVmaXggPSBzZWxlY3Rpb25UZXh0LnN0YXJ0c1dpdGgoX1BSRUZJWF9PQlNPTEVURSk7XHJcblx0XHRyZXN1bHQuaGFzRW5jcnlwdGVkUHJlZml4ID0gcmVzdWx0Lmhhc09ic29sZXRlRW5jcnlwdGVkUHJlZml4IHx8IHNlbGVjdGlvblRleHQuc3RhcnRzV2l0aChfUFJFRklYX0EpO1xyXG5cclxuXHRcdHJlc3VsdC5oYXNEZWNyeXB0U3VmZml4ID0gc2VsZWN0aW9uVGV4dC5lbmRzV2l0aChfU1VGRklYKTtcclxuXHJcblx0XHRyZXN1bHQuY29udGFpbnNFbmNyeXB0ZWRNYXJrZXJzID1cclxuXHRcdFx0c2VsZWN0aW9uVGV4dC5jb250YWlucyhfUFJFRklYX09CU09MRVRFKVxyXG5cdFx0XHR8fCBzZWxlY3Rpb25UZXh0LmNvbnRhaW5zKF9QUkVGSVhfQSlcclxuXHRcdFx0fHwgc2VsZWN0aW9uVGV4dC5jb250YWlucyhfU1VGRklYKVxyXG5cdFx0O1xyXG5cclxuXHRcdHJlc3VsdC5jYW5EZWNyeXB0ID0gcmVzdWx0Lmhhc0VuY3J5cHRlZFByZWZpeCAmJiByZXN1bHQuaGFzRGVjcnlwdFN1ZmZpeDtcclxuXHRcdHJlc3VsdC5jYW5FbmNyeXB0ID0gIXJlc3VsdC5oYXNFbmNyeXB0ZWRQcmVmaXggJiYgIXJlc3VsdC5jb250YWluc0VuY3J5cHRlZE1hcmtlcnM7XHJcblx0XHRcclxuXHRcdGlmIChyZXN1bHQuY2FuRGVjcnlwdCl7XHJcblx0XHRcdHJlc3VsdC5kZWNyeXB0YWJsZSA9IHRoaXMucGFyc2VEZWNyeXB0YWJsZUNvbnRlbnQoc2VsZWN0aW9uVGV4dCk7XHJcblx0XHRcdGlmIChyZXN1bHQuZGVjcnlwdGFibGUgPT0gbnVsbCl7XHJcblx0XHRcdFx0cmVzdWx0LmNhbkRlY3J5cHQgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHByb2Nlc3NTZWxlY3Rpb24oXHJcblx0XHRjaGVja2luZzogYm9vbGVhbixcclxuXHRcdGVkaXRvcjogRWRpdG9yLFxyXG5cdFx0c2VsZWN0aW9uVGV4dDogc3RyaW5nLFxyXG5cdFx0ZmluYWxTZWxlY3Rpb25TdGFydDogQ29kZU1pcnJvci5Qb3NpdGlvbixcclxuXHRcdGZpbmFsU2VsZWN0aW9uRW5kOiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0ZGVjcnlwdEluUGxhY2U6IGJvb2xlYW5cclxuXHQpe1xyXG5cclxuXHRcdGNvbnN0IHNlbGVjdGlvbkFuYWx5c2lzID0gdGhpcy5hbmFseXNlU2VsZWN0aW9uKHNlbGVjdGlvblRleHQpO1xyXG5cclxuXHRcdGlmIChzZWxlY3Rpb25BbmFseXNpcy5pc0VtcHR5KSB7XHJcblx0XHRcdGlmICghY2hlY2tpbmcpe1xyXG5cdFx0XHRcdG5ldyBOb3RpY2UoJ05vdGhpbmcgdG8gRW5jcnlwdC4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFzZWxlY3Rpb25BbmFseXNpcy5jYW5EZWNyeXB0ICYmICFzZWxlY3Rpb25BbmFseXNpcy5jYW5FbmNyeXB0KSB7XHJcblx0XHRcdGlmICghY2hlY2tpbmcpe1xyXG5cdFx0XHRcdG5ldyBOb3RpY2UoJ1VuYWJsZSB0byBFbmNyeXB0IG9yIERlY3J5cHQgdGhhdC4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNoZWNraW5nKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEZldGNoIHBhc3N3b3JkIGZyb20gdXNlclxyXG5cclxuXHRcdC8vIGRldGVybWluZSBkZWZhdWx0IHBhc3N3b3JkXHJcblx0XHRjb25zdCBpc1JlbWVtYmVyUGFzc3dvcmRFeHBpcmVkID1cclxuXHRcdFx0IXRoaXMuc2V0dGluZ3MucmVtZW1iZXJQYXNzd29yZFxyXG5cdFx0XHR8fCAoXHJcblx0XHRcdFx0dGhpcy5wYXNzd29yZExhc3RVc2VkRXhwaXJ5ICE9IG51bGxcclxuXHRcdFx0XHQmJiBEYXRlLm5vdygpID4gdGhpcy5wYXNzd29yZExhc3RVc2VkRXhwaXJ5XHJcblx0XHRcdClcclxuXHRcdDtcclxuXHJcblx0XHRjb25zdCBjb25maXJtUGFzc3dvcmQgPSBzZWxlY3Rpb25BbmFseXNpcy5jYW5FbmNyeXB0ICYmIHRoaXMuc2V0dGluZ3MuY29uZmlybVBhc3N3b3JkO1xyXG5cclxuXHRcdGlmICggaXNSZW1lbWJlclBhc3N3b3JkRXhwaXJlZCB8fCBjb25maXJtUGFzc3dvcmQgKSB7XHJcblx0XHRcdC8vIGZvcmdldCBwYXNzd29yZFxyXG5cdFx0XHR0aGlzLnBhc3N3b3JkTGFzdFVzZWQgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBwd01vZGFsID0gbmV3IFBhc3N3b3JkTW9kYWwoXHJcblx0XHRcdHRoaXMuYXBwLFxyXG5cdFx0XHRzZWxlY3Rpb25BbmFseXNpcy5jYW5FbmNyeXB0LFxyXG5cdFx0XHRjb25maXJtUGFzc3dvcmQsXHJcblx0XHRcdHRoaXMucGFzc3dvcmRMYXN0VXNlZCxcclxuXHRcdFx0c2VsZWN0aW9uQW5hbHlzaXMuZGVjcnlwdGFibGU/LmhpbnRcclxuXHRcdCk7XHJcblx0XHRwd01vZGFsLm9uQ2xvc2UgPSAoKSA9PiB7XHJcblx0XHRcdGNvbnN0IHB3ID0gcHdNb2RhbC5wYXNzd29yZCA/PyAnJ1xyXG5cdFx0XHRpZiAocHcubGVuZ3RoID09IDApIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc3QgaGludCA9IHB3TW9kYWwuaGludDtcclxuXHJcblx0XHRcdC8vIHJlbWVtYmVyIHBhc3N3b3JkP1xyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5yZW1lbWJlclBhc3N3b3JkKSB7XHJcblx0XHRcdFx0dGhpcy5wYXNzd29yZExhc3RVc2VkID0gcHc7XHJcblx0XHRcdFx0dGhpcy5wYXNzd29yZExhc3RVc2VkRXhwaXJ5ID1cclxuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MucmVtZW1iZXJQYXNzd29yZFRpbWVvdXQgPT0gMFxyXG5cdFx0XHRcdFx0XHQ/IG51bGxcclxuXHRcdFx0XHRcdFx0OiBEYXRlLm5vdygpICsgdGhpcy5zZXR0aW5ncy5yZW1lbWJlclBhc3N3b3JkVGltZW91dCAqIDEwMDAgKiA2MC8vIG5ldyBleHBpcnlcclxuXHRcdFx0XHRcdDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHNlbGVjdGlvbkFuYWx5c2lzLmNhbkVuY3J5cHQpIHtcclxuXHRcdFx0XHRjb25zdCBlbmNyeXB0YWJsZSA9IG5ldyBFbmNyeXB0YWJsZSgpO1xyXG5cdFx0XHRcdGVuY3J5cHRhYmxlLnRleHQgPSBzZWxlY3Rpb25UZXh0O1xyXG5cdFx0XHRcdGVuY3J5cHRhYmxlLmhpbnQgPSBoaW50O1xyXG5cclxuXHRcdFx0XHR0aGlzLmVuY3J5cHRTZWxlY3Rpb24oXHJcblx0XHRcdFx0XHRlZGl0b3IsXHJcblx0XHRcdFx0XHRlbmNyeXB0YWJsZSxcclxuXHRcdFx0XHRcdHB3LFxyXG5cdFx0XHRcdFx0ZmluYWxTZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0XHRcdGZpbmFsU2VsZWN0aW9uRW5kXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0aWYgKHNlbGVjdGlvbkFuYWx5c2lzLmRlY3J5cHRhYmxlLnZlcnNpb24gPT0gMSl7XHJcblx0XHRcdFx0XHR0aGlzLmRlY3J5cHRTZWxlY3Rpb25fYShcclxuXHRcdFx0XHRcdFx0ZWRpdG9yLFxyXG5cdFx0XHRcdFx0XHRzZWxlY3Rpb25BbmFseXNpcy5kZWNyeXB0YWJsZSxcclxuXHRcdFx0XHRcdFx0cHcsXHJcblx0XHRcdFx0XHRcdGZpbmFsU2VsZWN0aW9uU3RhcnQsXHJcblx0XHRcdFx0XHRcdGZpbmFsU2VsZWN0aW9uRW5kLFxyXG5cdFx0XHRcdFx0XHRkZWNyeXB0SW5QbGFjZVxyXG5cdFx0XHRcdFx0KTtcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHRoaXMuZGVjcnlwdFNlbGVjdGlvbk9ic29sZXRlKFxyXG5cdFx0XHRcdFx0XHRlZGl0b3IsXHJcblx0XHRcdFx0XHRcdHNlbGVjdGlvbkFuYWx5c2lzLmRlY3J5cHRhYmxlLFxyXG5cdFx0XHRcdFx0XHRwdyxcclxuXHRcdFx0XHRcdFx0ZmluYWxTZWxlY3Rpb25TdGFydCxcclxuXHRcdFx0XHRcdFx0ZmluYWxTZWxlY3Rpb25FbmQsXHJcblx0XHRcdFx0XHRcdGRlY3J5cHRJblBsYWNlXHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHdNb2RhbC5vcGVuKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFzeW5jIGVuY3J5cHRTZWxlY3Rpb24oXHJcblx0XHRlZGl0b3I6IEVkaXRvcixcclxuXHRcdGVuY3J5cHRhYmxlOiBFbmNyeXB0YWJsZSxcclxuXHRcdHBhc3N3b3JkOiBzdHJpbmcsXHJcblx0XHRmaW5hbFNlbGVjdGlvblN0YXJ0OiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0ZmluYWxTZWxlY3Rpb25FbmQ6IENvZGVNaXJyb3IuUG9zaXRpb24sXHJcblx0KSB7XHJcblx0XHQvL2VuY3J5cHRcclxuXHRcdGNvbnN0IGNyeXB0byA9IG5ldyBDcnlwdG9IZWxwZXJWMigpO1xyXG5cdFx0Y29uc3QgZW5jb2RlZFRleHQgPSB0aGlzLmVuY29kZUVuY3J5cHRpb24oXHJcblx0XHRcdGF3YWl0IGNyeXB0by5lbmNyeXB0VG9CYXNlNjQoZW5jcnlwdGFibGUudGV4dCwgcGFzc3dvcmQpLFxyXG5cdFx0XHRlbmNyeXB0YWJsZS5oaW50XHJcblx0XHQpO1xyXG5cdFx0ZWRpdG9yLnNldFNlbGVjdGlvbihmaW5hbFNlbGVjdGlvblN0YXJ0LCBmaW5hbFNlbGVjdGlvbkVuZCk7XHJcblx0XHRlZGl0b3IucmVwbGFjZVNlbGVjdGlvbihlbmNvZGVkVGV4dCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFzeW5jIGRlY3J5cHRTZWxlY3Rpb25fYShcclxuXHRcdGVkaXRvcjogRWRpdG9yLFxyXG5cdFx0ZGVjcnlwdGFibGU6IERlY3J5cHRhYmxlLFxyXG5cdFx0cGFzc3dvcmQ6IHN0cmluZyxcclxuXHRcdHNlbGVjdGlvblN0YXJ0OiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0c2VsZWN0aW9uRW5kOiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0ZGVjcnlwdEluUGxhY2U6IGJvb2xlYW5cclxuXHQpIHtcclxuXHRcdC8vIGRlY3J5cHRcclxuXHJcblx0XHRjb25zdCBjcnlwdG8gPSBuZXcgQ3J5cHRvSGVscGVyVjIoKTtcclxuXHRcdGNvbnN0IGRlY3J5cHRlZFRleHQgPSBhd2FpdCBjcnlwdG8uZGVjcnlwdEZyb21CYXNlNjQoZGVjcnlwdGFibGUuYmFzZTY0Q2lwaGVyVGV4dCwgcGFzc3dvcmQpO1xyXG5cdFx0aWYgKGRlY3J5cHRlZFRleHQgPT09IG51bGwpIHtcclxuXHRcdFx0bmV3IE5vdGljZSgn4p2MIERlY3J5cHRpb24gZmFpbGVkIScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmIChkZWNyeXB0SW5QbGFjZSkge1xyXG5cdFx0XHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XHJcblx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oZGVjcnlwdGVkVGV4dCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc3QgZGVjcnlwdE1vZGFsID0gbmV3IERlY3J5cHRNb2RhbCh0aGlzLmFwcCwgJ/CflJMnLCBkZWNyeXB0ZWRUZXh0LCB0aGlzLnNldHRpbmdzLnNob3dCdXR0b24pO1xyXG5cdFx0XHRcdGRlY3J5cHRNb2RhbC5vbkNsb3NlID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblx0XHRcdFx0XHRpZiAoZGVjcnlwdE1vZGFsLmRlY3J5cHRJblBsYWNlKSB7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKGRlY3J5cHRlZFRleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkZWNyeXB0TW9kYWwub3BlbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFzeW5jIGRlY3J5cHRTZWxlY3Rpb25PYnNvbGV0ZShcclxuXHRcdGVkaXRvcjogRWRpdG9yLFxyXG5cdFx0ZGVjcnlwdGFibGU6IERlY3J5cHRhYmxlLFxyXG5cdFx0cGFzc3dvcmQ6IHN0cmluZyxcclxuXHRcdHNlbGVjdGlvblN0YXJ0OiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0c2VsZWN0aW9uRW5kOiBDb2RlTWlycm9yLlBvc2l0aW9uLFxyXG5cdFx0ZGVjcnlwdEluUGxhY2U6IGJvb2xlYW5cclxuXHQpIHtcclxuXHRcdC8vIGRlY3J5cHRcclxuXHRcdGNvbnN0IGJhc2U2NENpcGhlclRleHQgPSB0aGlzLnJlbW92ZU1hcmtlcnMoZGVjcnlwdGFibGUuYmFzZTY0Q2lwaGVyVGV4dCk7XHJcblx0XHRjb25zdCBjcnlwdG8gPSBuZXcgQ3J5cHRvSGVscGVyT2Jzb2xldGUoKTtcclxuXHRcdGNvbnN0IGRlY3J5cHRlZFRleHQgPSBhd2FpdCBjcnlwdG8uZGVjcnlwdEZyb21CYXNlNjQoYmFzZTY0Q2lwaGVyVGV4dCwgcGFzc3dvcmQpO1xyXG5cdFx0aWYgKGRlY3J5cHRlZFRleHQgPT09IG51bGwpIHtcclxuXHRcdFx0bmV3IE5vdGljZSgn4p2MIERlY3J5cHRpb24gZmFpbGVkIScpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmIChkZWNyeXB0SW5QbGFjZSkge1xyXG5cdFx0XHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XHJcblx0XHRcdFx0ZWRpdG9yLnJlcGxhY2VTZWxlY3Rpb24oZGVjcnlwdGVkVGV4dCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc3QgZGVjcnlwdE1vZGFsID0gbmV3IERlY3J5cHRNb2RhbCh0aGlzLmFwcCwgJ/CflJMnLCBkZWNyeXB0ZWRUZXh0LCB0aGlzLnNldHRpbmdzLnNob3dCdXR0b24pO1xyXG5cdFx0XHRcdGRlY3J5cHRNb2RhbC5vbkNsb3NlID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0ZWRpdG9yLmZvY3VzKCk7XHJcblx0XHRcdFx0XHRpZiAoZGVjcnlwdE1vZGFsLmRlY3J5cHRJblBsYWNlKSB7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XHJcblx0XHRcdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKGRlY3J5cHRlZFRleHQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkZWNyeXB0TW9kYWwub3BlbigpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHBhcnNlRGVjcnlwdGFibGVDb250ZW50KHRleHQ6IHN0cmluZykgOiBEZWNyeXB0YWJsZXtcclxuXHRcdGNvbnN0IHJlc3VsdCA9IG5ldyBEZWNyeXB0YWJsZSgpO1xyXG5cclxuXHRcdGxldCBjb250ZW50ID0gdGV4dDtcclxuXHRcdGlmIChjb250ZW50LnN0YXJ0c1dpdGgoX1BSRUZJWF9BKSAmJiBjb250ZW50LmVuZHNXaXRoKF9TVUZGSVgpKSB7XHJcblx0XHRcdHJlc3VsdC52ZXJzaW9uPTE7XHJcblx0XHRcdGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoX1BSRUZJWF9BLCAnJykucmVwbGFjZShfU1VGRklYLCAnJyk7XHJcblx0XHR9ZWxzZSBpZiAoY29udGVudC5zdGFydHNXaXRoKF9QUkVGSVhfT0JTT0xFVEUpICYmIGNvbnRlbnQuZW5kc1dpdGgoX1NVRkZJWCkpIHtcclxuXHRcdFx0cmVzdWx0LnZlcnNpb249MDtcclxuXHRcdFx0Y29udGVudCA9IGNvbnRlbnQucmVwbGFjZShfUFJFRklYX09CU09MRVRFLCAnJykucmVwbGFjZShfU1VGRklYLCAnJyk7XHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdHJldHVybiBudWxsOyAvLyBpbnZhbGlkIGZvcm1hdFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgaGludFxyXG5cdFx0Ly9jb25zb2xlLnRhYmxlKGNvbnRlbnQpO1xyXG5cdFx0aWYgKGNvbnRlbnQuc3Vic3RyKDAsX0hJTlQubGVuZ3RoKSA9PSBfSElOVCl7XHJcblx0XHRcdGNvbnN0IGVuZEhpbnRNYXJrZXIgPSBjb250ZW50LmluZGV4T2YoX0hJTlQsX0hJTlQubGVuZ3RoKTtcclxuXHRcdFx0aWYgKGVuZEhpbnRNYXJrZXI8MCl7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7IC8vIGludmFsaWQgZm9ybWF0XHJcblx0XHRcdH1cclxuXHRcdFx0cmVzdWx0LmhpbnQgPSBjb250ZW50LnN1YnN0cmluZyhfSElOVC5sZW5ndGgsZW5kSGludE1hcmtlcilcclxuXHRcdFx0cmVzdWx0LmJhc2U2NENpcGhlclRleHQgPSBjb250ZW50LnN1YnN0cmluZyhlbmRIaW50TWFya2VyK19ISU5ULmxlbmd0aCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmVzdWx0LmJhc2U2NENpcGhlclRleHQgPSBjb250ZW50O1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvL2NvbnNvbGUudGFibGUocmVzdWx0KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlTWFya2Vycyh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRleHQuc3RhcnRzV2l0aChfUFJFRklYX0EpICYmIHRleHQuZW5kc1dpdGgoX1NVRkZJWCkpIHtcclxuXHRcdFx0cmV0dXJuIHRleHQucmVwbGFjZShfUFJFRklYX0EsICcnKS5yZXBsYWNlKF9TVUZGSVgsICcnKTtcclxuXHRcdH1cclxuXHRcdGlmICh0ZXh0LnN0YXJ0c1dpdGgoX1BSRUZJWF9PQlNPTEVURSkgJiYgdGV4dC5lbmRzV2l0aChfU1VGRklYKSkge1xyXG5cdFx0XHRyZXR1cm4gdGV4dC5yZXBsYWNlKF9QUkVGSVhfT0JTT0xFVEUsICcnKS5yZXBsYWNlKF9TVUZGSVgsICcnKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0ZXh0O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBlbmNvZGVFbmNyeXB0aW9uKCBlbmNyeXB0ZWRUZXh0OiBzdHJpbmcsIGhpbnQ6IHN0cmluZyApOiBzdHJpbmcge1xyXG5cdFx0aWYgKCFlbmNyeXB0ZWRUZXh0LmNvbnRhaW5zKF9QUkVGSVhfT0JTT0xFVEUpICYmICFlbmNyeXB0ZWRUZXh0LmNvbnRhaW5zKF9QUkVGSVhfQSkgJiYgIWVuY3J5cHRlZFRleHQuY29udGFpbnMoX1NVRkZJWCkpIHtcclxuXHRcdFx0aWYgKGhpbnQpe1xyXG5cdFx0XHRcdHJldHVybiBfUFJFRklYX0EuY29uY2F0KF9ISU5ULCBoaW50LCBfSElOVCwgZW5jcnlwdGVkVGV4dCwgX1NVRkZJWCk7XHRcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gX1BSRUZJWF9BLmNvbmNhdChlbmNyeXB0ZWRUZXh0LCBfU1VGRklYKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBlbmNyeXB0ZWRUZXh0O1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFNlbGVjdGlvbkFuYWx5c2lze1xyXG5cdGlzRW1wdHk6IGJvb2xlYW47XHJcblx0aGFzT2Jzb2xldGVFbmNyeXB0ZWRQcmVmaXg6IGJvb2xlYW47XHJcblx0aGFzRW5jcnlwdGVkUHJlZml4OiBib29sZWFuO1xyXG5cdGhhc0RlY3J5cHRTdWZmaXg6IGJvb2xlYW47XHJcblx0Y2FuRGVjcnlwdDogYm9vbGVhbjtcclxuXHRjYW5FbmNyeXB0OiBib29sZWFuO1xyXG5cdGNvbnRhaW5zRW5jcnlwdGVkTWFya2VyczogYm9vbGVhbjtcclxuXHRkZWNyeXB0YWJsZSA6IERlY3J5cHRhYmxlO1xyXG59XHJcblxyXG5jbGFzcyBFbmNyeXB0YWJsZXtcclxuXHR0ZXh0OnN0cmluZztcclxuXHRoaW50OnN0cmluZztcclxufVxyXG5cclxuY2xhc3MgRGVjcnlwdGFibGV7XHJcblx0dmVyc2lvbjogbnVtYmVyO1xyXG5cdGJhc2U2NENpcGhlclRleHQ6c3RyaW5nO1xyXG5cdGhpbnQ6c3RyaW5nO1xyXG59Il0sIm5hbWVzIjpbIk1vZGFsIiwiUGxhdGZvcm0iLCJQbHVnaW5TZXR0aW5nVGFiIiwiU2V0dGluZyIsIlBsdWdpbiIsIk5vdGljZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUF1REE7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFL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
