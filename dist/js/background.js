/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/app/core/Dictionaries.tsx
var DictionaryStorage = /** @class */ (function () {
    function DictionaryStorage(options) {
        this.list = options.list;
        this.listConfig = this.initConfig(options.listConfig);
    }
    DictionaryStorage.prototype.initConfig = function (listConfig) {
        // init with default sort
        if (!listConfig || listConfig.length === 0) {
            return this.list.map(function (_a) {
                var id = _a.id;
                return ({ id: id, off: false });
            });
        }
        return listConfig;
    };
    Object.defineProperty(DictionaryStorage.prototype, "dictionariesConfig", {
        get: function () {
            return this.listConfig;
        },
        enumerable: false,
        configurable: true
    });
    DictionaryStorage.prototype.updateConfig = function (newListConfig) {
        this.listConfig = newListConfig;
    };
    DictionaryStorage.prototype.getList = function () {
        return this.list;
    };
    DictionaryStorage.prototype.getActiveList = function () {
        var _this = this;
        return this.listConfig.map(function (_a) {
            var configId = _a.id, off = _a.off;
            var dictionary = _this.list.find(function (_a) {
                var id = _a.id;
                return (id === configId && off === false);
            });
            return dictionary;
        }).filter(function (e) { return !!e; });
    };
    return DictionaryStorage;
}());
/* harmony default export */ const Dictionaries = (DictionaryStorage);

;// CONCATENATED MODULE: ./src/app/core/Messenger.ts
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Messenger = /** @class */ (function () {
    function Messenger(options) {
        var listen = (options || {}).listen;
        this.extensionId = chrome.runtime.id;
        this.listeners = listen ? __spreadArrays(listen) : [];
        this.subscribeToRuntime();
    }
    // eslint-disable-next-line max-len
    Messenger.prototype.onRuntimeMessage = function (message, sender, sendResponse) {
        if (sender.id !== this.extensionId)
            return;
        if (typeof message !== 'object')
            return;
        var tab = sender.tab;
        var messageType = message.type, data = message.data;
        var messageListeners = this.listeners.filter(function (_a) {
            var type = _a.type;
            return type === messageType;
        });
        messageListeners.forEach(function (_a) {
            var controller = _a.controller;
            controller({
                tabId: tab ? tab.id : null,
                data: data,
                sender: sender,
                sendResponse: sendResponse,
            });
        });
    };
    Messenger.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    Messenger.prototype.addListeners = function (listeners) {
        var _this = this;
        listeners.forEach(function (listener) { return _this.addListener(listener); });
    };
    Messenger.prototype.subscribeToRuntime = function () {
        var _this = this;
        chrome.runtime.onMessage.addListener(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this.onRuntimeMessage.apply(_this, args);
        });
    };
    Messenger.prototype.request = function (type, data, callback) {
        chrome.runtime.sendMessage(this.extensionId, { type: type, data: data }, callback);
    };
    // eslint-disable-next-line class-methods-use-this
    Messenger.prototype.sentToTabs = function (message) {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (_a) {
                var id = _a.id;
                chrome.tabs.sendMessage(id, message);
            });
        });
    };
    return Messenger;
}());
/* harmony default export */ const core_Messenger = (Messenger);

;// CONCATENATED MODULE: ./src/app/utils/i18n.ts
function i18n(message) {
    return chrome.i18n.getMessage(message).replace(/<br\/>/g, '\n');
}

;// CONCATENATED MODULE: ./src/app/core/MimicMenu.ts

var MimicMenu = /** @class */ (function () {
    function MimicMenu() {
        this.addId = 'add';
        this.addSeparatorId = 'addSeparator';
        this.currentDictionaries = [];
    }
    MimicMenu.prototype.createAddItem = function () {
        var _this = this;
        chrome.contextMenus.create({
            id: this.addId,
            title: i18n('context_menu_add_phrase'),
            contexts: ['selection'],
            onclick: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.onPressAdd.apply(_this, args);
            },
        });
        chrome.contextMenus.create({
            id: this.addSeparatorId,
            type: 'separator',
            contexts: ['selection'],
        });
    };
    MimicMenu.prototype.createDictionaryItems = function (dictionaries) {
        var _this = this;
        dictionaries.forEach(function (dictionary) {
            chrome.contextMenus.create({
                id: dictionary.id,
                title: dictionary.name,
                contexts: ['selection'],
                onclick: function (info, tab) { return _this.onPressDictionary(info, tab, dictionary); },
            });
            _this.currentDictionaries.push(dictionary.id);
        });
    };
    MimicMenu.prototype.removeDictionaryItems = function () {
        this.currentDictionaries.forEach(function (id) {
            chrome.contextMenus.remove(id);
        });
        this.currentDictionaries = [];
    };
    MimicMenu.prototype.init = function (_a) {
        var dictionaries = _a.dictionaries, onPressAdd = _a.onPressAdd, onPressDictionary = _a.onPressDictionary;
        this.onPressAdd = onPressAdd;
        this.onPressDictionary = onPressDictionary;
        this.createAddItem();
        this.createDictionaryItems(dictionaries);
    };
    MimicMenu.prototype.update = function (_a) {
        var dictionaries = _a.dictionaries;
        this.removeDictionaryItems();
        this.createDictionaryItems(dictionaries);
    };
    return MimicMenu;
}());
/* harmony default export */ const core_MimicMenu = (MimicMenu);

;// CONCATENATED MODULE: ./src/app/utils/getDictionaryUrl.ts
/* harmony default export */ const getDictionaryUrl = (function (_a, phrase) {
    var url = _a.url, _b = _a.space, space = _b === void 0 ? '%20' : _b;
    if (!phrase || typeof phrase !== 'string' || phrase === '') {
        return (new URL(url)).origin;
    }
    var formattedPhrase = phrase.replace(/\s/g, space);
    return url.replace('{{phrase}}', formattedPhrase);
});

;// CONCATENATED MODULE: ./src/settings.ts
var commonSettings = {
    disabled: false,
    ui: {
        panel: 'left',
        tail: {
            horizontal: 'left',
            vertical: 'center',
        },
        theme: 'light',
    },
};
var defaultTabConfig = {
    pinned: true,
    phrase: '',
};
var contacts = {
    email: 'mimic.dictionary@gmail.com',
    patreon: {
        url: 'https://www.patreon.com/mimicdictionary',
        text: 'patreon.com/mimicdictionary',
    },
};

;// CONCATENATED MODULE: ./dictionaries.json
const dictionaries_namespaceObject = JSON.parse("[{\"id\":\"qPWzha\",\"name\":\"Cambridge\",\"url\":\"https://dictionary.cambridge.org/dictionary/english/{{phrase}}\",\"space\":\"-\"},{\"id\":\"lJrlAs\",\"name\":\"Collins\",\"url\":\"https://www.collinsdictionary.com/dictionary/english/{{phrase}}\",\"space\":\"-\"},{\"id\":\"XhVTIJ\",\"name\":\"Vocabulary\",\"url\":\"https://www.vocabulary.com/dictionary/{{phrase}}\"},{\"id\":\"eNeNVw\",\"name\":\"MacMillan\",\"url\":\"https://www.macmillandictionary.com/dictionary/british/{{phrase}}\",\"space\":\"-\"},{\"id\":\"7grJ1s\",\"name\":\"Merriam Webster\",\"url\":\"https://www.merriam-webster.com/dictionary/{{phrase}}\"},{\"id\":\"KiugJU\",\"name\":\"Longman\",\"url\":\"https://www.ldoceonline.com/dictionary/{{phrase}}\",\"space\":\"-\"},{\"id\":\"MK88n2\",\"name\":\"Oxford\",\"url\":\"https://www.oxfordlearnersdictionaries.com/definition/english/{{phrase}}\",\"space\":\"-\"},{\"id\":\"xiQog2\",\"name\":\"Dictionary\",\"url\":\"https://www.dictionary.com/browse/{{phrase}}\",\"space\":\"-\"},{\"id\":\"kE10DV\",\"name\":\"The free dictionary\",\"url\":\"https://www.thefreedictionary.com/{{phrase}}\",\"space\":\"+\"},{\"id\":\"oT77E5\",\"name\":\"Ozdic\",\"url\":\"http://www.ozdic.com/collocation-dictionary/{{phrase}}\"},{\"id\":\"sXB11w\",\"name\":\"YouGlish\",\"url\":\"https://youglish.com/pronounce/{{phrase}}/english\"},{\"id\":\"3yR60l\",\"name\":\"Urban\",\"url\":\"https://www.urbandictionary.com/define.php?term={{phrase}}\"},{\"id\":\"QG0kO0\",\"name\":\"FrazeIt\",\"url\":\"https://fraze.it/n_search.jsp?q={{phrase}}\",\"space\":\"+\"},{\"id\":\"S06Tib\",\"name\":\"WordHippo\",\"url\":\"https://www.wordhippo.com/what-is/the-meaning-of-the-word/{{phrase}}.html\",\"space\":\"_\"},{\"id\":\"82LPbu\",\"name\":\"Just The Word\",\"url\":\"http://www.just-the-word.com/main.pl?word={{phrase}}\",\"space\":\"+\"},{\"id\":\"OQ91Xr\",\"name\":\"WordReference\",\"url\":\"https://www.wordreference.com/definition/{{phrase}}\"}]");
;// CONCATENATED MODULE: ./src/app/core/MimicTab.ts
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};
var tabsStorage = {};
var injectedList = {};
var MimicTab = /** @class */ (function () {
    function MimicTab() {
    }
    MimicTab.getCurrentTab = function () {
        return new Promise(function (resolve) {
            chrome.tabs.getCurrent(function (tab) {
                resolve(tab);
            });
        });
    };
    MimicTab.getNextTabIndex = function (tab) {
        return __awaiter(this, void 0, void 0, function () {
            var currentTab, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = tab;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCurrentTab()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        currentTab = _a;
                        if (currentTab)
                            return [2 /*return*/, currentTab.index + 1];
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    MimicTab.injectContent = function () {
        chrome.tabs.executeScript({
            file: 'js/content.js',
        });
    };
    MimicTab.isInjected = function (id) {
        return !!injectedList[id];
    };
    MimicTab.addInjected = function (id) {
        injectedList[id] = true;
    };
    MimicTab.removeInjected = function (id) {
        delete injectedList[id];
    };
    MimicTab.createNextTab = function (url, tabSettings, tab) {
        MimicTab.getNextTabIndex(tab).then(function (index) {
            chrome.tabs.create({ active: true, url: url, index: index }, function (createdTab) {
                MimicTab.updateTabSetting(createdTab.id, tabSettings);
                MimicTab.injectPopup(createdTab.id);
                MimicTab.addInjected(createdTab.id);
            });
        });
    };
    MimicTab.getTabSettings = function (tabId) {
        return tabsStorage[tabId];
    };
    MimicTab.updateTabSetting = function (tabId, newSettings) {
        var currentSettings = MimicTab.getTabSettings(tabId) || {};
        var updatedSettings = __assign(__assign({}, currentSettings), newSettings);
        tabsStorage[tabId] = updatedSettings;
        return updatedSettings;
    };
    MimicTab.removeTabSettings = function (tabId) {
        delete tabsStorage[tabId];
    };
    MimicTab.injectPopup = function (id) {
        chrome.browserAction.setPopup({
            tabId: id,
            popup: 'popup.html',
        });
    };
    return MimicTab;
}());
/* harmony default export */ const core_MimicTab = (MimicTab);

;// CONCATENATED MODULE: ./src/app/core/SettingsStorage.ts
var SettingsStorage_assign = (undefined && undefined.__assign) || function () {
    SettingsStorage_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return SettingsStorage_assign.apply(this, arguments);
};
var SettingsStorage_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var SettingsStorage_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};
var SettingsStorage_spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var STORAGE_NAME = 'MIMIC_DICTIONARY_SETTINGS';
var PROPERTIES = ['ui', 'disabled', 'dictionariesConfig'];
var SettingsStorage = /** @class */ (function () {
    function SettingsStorage(initialSettings) {
        this.version = 1;
        this.initial = initialSettings;
    }
    SettingsStorage.prototype.get = function () {
        return this.current || this.initial;
    };
    SettingsStorage.prototype.update = function (settings) {
        return SettingsStorage_awaiter(this, void 0, void 0, function () {
            var newSettings;
            var _this = this;
            return SettingsStorage_generator(this, function (_a) {
                newSettings = {};
                PROPERTIES.forEach(function (key) {
                    var _a;
                    if (!(typeof settings[key] === 'undefined')) {
                        Object.assign(newSettings, (_a = {}, _a[key] = settings[key], _a));
                    }
                });
                this.current = SettingsStorage_assign(SettingsStorage_assign({}, this.get()), newSettings);
                return [2 /*return*/, new Promise(function (resolve) {
                        var _a;
                        chrome.storage.sync.set((_a = {}, _a[STORAGE_NAME] = { version: _this.version, data: _this.get() }, _a), function () {
                            resolve(_this.current);
                        });
                    })];
            });
        });
    };
    // removes unsupported and adds the appeared of dictionaries config
    SettingsStorage.prototype.updateDictionariesConfig = function () {
        var initialList = SettingsStorage_spreadArrays(this.initial.dictionariesConfig);
        var currentList = [];
        this.current.dictionariesConfig.forEach(function (item) {
            var currentId = item.id;
            var index = initialList.findIndex(function (_a) {
                var id = _a.id;
                return id === currentId;
            });
            if (index !== -1) {
                currentList.push(item); // add if in initial list
                initialList.splice(index, 1); // remove from initial list
            }
        });
        // concat current config list and rest initial dictionaries
        this.current.dictionariesConfig = SettingsStorage_spreadArrays(currentList, initialList);
    };
    SettingsStorage.prototype.fetch = function () {
        return SettingsStorage_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return SettingsStorage_generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.sync.get([STORAGE_NAME], function (result) {
                            _this.current = result && result[STORAGE_NAME] ? result[STORAGE_NAME].data : _this.initial;
                            _this.updateDictionariesConfig();
                            resolve(_this.current);
                        });
                    })];
            });
        });
    };
    SettingsStorage.prototype.reset = function () {
        return SettingsStorage_awaiter(this, void 0, void 0, function () {
            var _this = this;
            return SettingsStorage_generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        chrome.storage.sync.remove(STORAGE_NAME, function () {
                            _this.current = _this.initial;
                            resolve(_this.current);
                        });
                    })];
            });
        });
    };
    return SettingsStorage;
}());
/* harmony default export */ const core_SettingsStorage = (SettingsStorage);

;// CONCATENATED MODULE: ./src/app/core/SettingsManager.ts
var SettingsManager_assign = (undefined && undefined.__assign) || function () {
    SettingsManager_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return SettingsManager_assign.apply(this, arguments);
};
var SettingsManager = /** @class */ (function () {
    function SettingsManager(_a) {
        var settingsStorage = _a.settingsStorage, dictionaryStorage = _a.dictionaryStorage;
        this.settingsStorage = settingsStorage;
        this.dictionaryStorage = dictionaryStorage;
    }
    SettingsManager.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.settingsStorage.update(data).then(function (updetedSettings) {
                _this.dictionaryStorage.updateConfig(updetedSettings.dictionariesConfig);
                resolve(updetedSettings);
            });
        });
    };
    SettingsManager.prototype.reset = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.settingsStorage.reset().then(function (settings) {
                _this.dictionaryStorage.updateConfig(settings.dictionariesConfig);
                resolve(settings);
            });
        });
    };
    SettingsManager.prototype.getContentSettings = function () {
        var settings = SettingsManager_assign(SettingsManager_assign({}, this.settingsStorage.get()), { dictionaries: this.dictionaryStorage.getActiveList() });
        delete settings.dictionariesConfig;
        return settings;
    };
    SettingsManager.prototype.getFullSettings = function () {
        return SettingsManager_assign(SettingsManager_assign({}, this.settingsStorage.get()), { dictionaries: this.dictionaryStorage.getList() });
    };
    return SettingsManager;
}());
/* harmony default export */ const core_SettingsManager = (SettingsManager);

;// CONCATENATED MODULE: ./src/app/background.ts
var background_assign = (undefined && undefined.__assign) || function () {
    background_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return background_assign.apply(this, arguments);
};
var background_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var background_generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
};









// eslint-disable-next-line @typescript-eslint/no-use-before-define
var initialSettings = background_assign(background_assign({}, commonSettings), { dictionariesConfig: dictionaries_namespaceObject.map(function (_a) {
        var id = _a.id;
        return ({ id: id, off: false });
    }) });
var settingsStorage = new core_SettingsStorage(initialSettings);
settingsStorage.fetch().then(function () {
    var dictStore = new Dictionaries({
        list: dictionaries_namespaceObject,
        listConfig: settingsStorage.get().dictionariesConfig,
    });
    var messenger = new core_Messenger();
    var mimicMenu = new core_MimicMenu();
    var settingsManager = new core_SettingsManager({ dictionaryStorage: dictStore, settingsStorage: settingsStorage });
    var inject = function (id) {
        core_MimicTab.injectContent();
        core_MimicTab.injectPopup(id);
        core_MimicTab.addInjected(id);
    };
    chrome.browserAction.onClicked.addListener(function (tab) {
        var id = tab.id;
        if (id && !core_MimicTab.isInjected(id)) {
            inject(id);
        }
    });
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (core_MimicTab.isInjected(tabId) && tab.active && changeInfo.status === 'loading') {
            inject(tabId);
        }
        if (/^https?:/.test(String(tab.url))) {
            chrome.browserAction.enable(tabId);
        }
        else {
            chrome.browserAction.disable(tabId);
        }
    });
    chrome.tabs.onRemoved.addListener(function (tabId) {
        if (typeof tabId === 'number') {
            core_MimicTab.removeInjected(tabId);
            core_MimicTab.removeTabSettings(tabId);
        }
    });
    var getTabSettings = function (_a) {
        var tabId = _a.tabId, sendResponse = _a.sendResponse;
        if (!tabId)
            return;
        var savedSettings = core_MimicTab.getTabSettings(tabId) || {};
        sendResponse(background_assign(background_assign(background_assign({}, defaultTabConfig), savedSettings), settingsManager.getContentSettings()));
    };
    var updateTabSettings = function (_a) {
        var tabId = _a.tabId, data = _a.data;
        if (!tabId)
            return;
        core_MimicTab.updateTabSetting(tabId, data);
    };
    var getCommonSettings = function (ctx) {
        ctx.sendResponse(settingsManager.getFullSettings());
    };
    var updateCommonSettings = function (ctx) {
        settingsManager.update(ctx.data).then(function () {
            var newActiveDictionaries = dictStore.getActiveList();
            mimicMenu.update({ dictionaries: newActiveDictionaries });
            messenger.sentToTabs({
                type: 'sync_tab_common_settings',
                data: settingsManager.getContentSettings(),
            });
        });
    };
    var resetCommonSettings = function (_a) {
        var sendResponse = _a.sendResponse;
        settingsManager.reset().then(function () {
            var newActiveDictionaries = dictStore.getActiveList();
            sendResponse({ ok: true });
            mimicMenu.update({ dictionaries: newActiveDictionaries });
            messenger.sentToTabs({
                type: 'sync_tab_common_settings',
                data: settingsManager.getContentSettings(),
            });
        });
        sendResponse();
    };
    var openInNewTab = function (_a) {
        var tabId = _a.tabId, data = _a.data, sender = _a.sender;
        return background_awaiter(void 0, void 0, void 0, function () {
            var currentSettings, url;
            return background_generator(this, function (_b) {
                currentSettings = core_MimicTab.getTabSettings(tabId) || defaultTabConfig;
                url = data.url;
                core_MimicTab.createNextTab(url, currentSettings, sender.tab);
                return [2 /*return*/];
            });
        });
    };
    var onMenuPressDictionary = function (info, tab, dictionary) {
        var savedSettings = core_MimicTab.getTabSettings(tab.id) || defaultTabConfig;
        var phrase = info.selectionText;
        var url = getDictionaryUrl(dictionary, phrase);
        core_MimicTab.createNextTab(url, background_assign(background_assign({}, savedSettings), { phrase: phrase }), tab);
    };
    var onMenuPressAdd = function (_a, _b) {
        var phrase = _a.selectionText;
        var id = _b.id, active = _b.active;
        var timer = 0;
        if (!core_MimicTab.isInjected(id) && active) {
            inject(id);
            timer = 500;
        }
        setTimeout(function () {
            chrome.tabs.sendMessage(id, {
                type: 'sync_tab_common_settings',
                data: { phrase: phrase },
            });
        }, timer);
    };
    messenger.addListeners([
        { type: 'get_tab_settings', controller: getTabSettings },
        { type: 'update_tab_settings', controller: updateTabSettings },
        { type: 'update_common_settings', controller: updateCommonSettings },
        { type: 'reset_common_settings', controller: resetCommonSettings },
        { type: 'get_common_settings', controller: getCommonSettings },
        { type: 'open_in_new_tab', controller: openInNewTab },
    ]);
    mimicMenu.init({
        dictionaries: dictStore.getActiveList(),
        onPressAdd: onMenuPressAdd,
        onPressDictionary: onMenuPressDictionary,
    });
});

/******/ })()
;