/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/background.ts":
/*!*******************************!*\
  !*** ./src/app/background.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dictionaries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictionaries */ "./src/app/dictionaries.ts");
/* harmony import */ var _core_Messenger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Messenger */ "./src/app/core/Messenger.ts");
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


var commonSettings = {
    disabled: false,
    dictionaries: _dictionaries__WEBPACK_IMPORTED_MODULE_0__.default,
    ui: {
        panel: 'left',
        tail: {
            horizontal: 'left',
            vertical: 'center',
        },
    },
};
var defaultTabConfig = {
    pinned: false,
    phrase: '',
};
var dictionariesConfigs = _dictionaries__WEBPACK_IMPORTED_MODULE_0__.default.map(function (_a) {
    var id = _a.id;
    return ({ id: id, off: false });
});
console.log(dictionariesConfigs);
var tabs = {};
var getTabSettings = function (_a) {
    var tabId = _a.tabId, sendResponse = _a.sendResponse;
    if (!tabId)
        return;
    var savedSettings = tabs[tabId] || {};
    sendResponse(__assign(__assign(__assign({}, defaultTabConfig), savedSettings), commonSettings));
};
var updateTabSettings = function (_a) {
    var tabId = _a.tabId, data = _a.data;
    if (!tabId)
        return;
    var savedSettings = tabs[tabId] || {};
    tabs[tabId] = __assign(__assign({}, savedSettings), data);
};
var getCommonSettings = function (ctx) {
    ctx.sendResponse(commonSettings);
};
var updateCommonSettings = function (ctx) {
    console.log(ctx.data);
    Object.assign(commonSettings, ctx.data);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    messenger.sentToTabs({ type: 'sync_tab_common_settings', data: commonSettings });
    // sync_tab_common_settings
};
var options = {
    listen: [
        { type: 'get_tab_settings', controller: getTabSettings },
        { type: 'update_tab_settings', controller: updateTabSettings },
        { type: 'update_common_settings', controller: updateCommonSettings },
        { type: 'get_common_settings', controller: getCommonSettings },
    ],
};
var messenger = new _core_Messenger__WEBPACK_IMPORTED_MODULE_1__.default(options);


/***/ }),

/***/ "./src/app/core/Messenger.ts":
/*!***********************************!*\
  !*** ./src/app/core/Messenger.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Messenger = /** @class */ (function () {
    function Messenger(options) {
        var listen = options.listen;
        this.extensionId = chrome.runtime.id;
        this.listeners = listen ? __spreadArrays(listen) : [];
        this.subscribeToRuntime();
    }
    // eslint-disable-next-line max-len
    Messenger.prototype.onRuntimeMessage = function (message, sender, sendResponse) {
        console.log('on message: ', { message: message, sender: sender });
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
                sendResponse: sendResponse,
            });
        });
    };
    Messenger.prototype.addListener = function (listener) {
        this.listeners.push(listener);
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Messenger);
console.log(chrome.runtime.onMessage.addListener);


/***/ }),

/***/ "./src/app/dictionaries.ts":
/*!*********************************!*\
  !*** ./src/app/dictionaries.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
    {
        id: 'qPWzha',
        name: 'Cambridge',
        url: 'https://dictionary.cambridge.org/dictionary/english/{{phrase}}',
    },
    {
        id: 'lJrlAs',
        name: 'Collins',
        url: 'https://www.collinsdictionary.com/dictionary/english/{{phrase}}',
    },
    {
        id: 'XhVTIJ',
        name: 'Vocabulary',
        url: 'https://www.vocabulary.com/dictionary/{{phrase}}',
    },
    {
        id: 'eNeNVw',
        name: 'MacMillan',
        url: 'https://www.macmillandictionary.com/dictionary/british/{{phrase}}',
    },
    {
        id: '7grJ1s',
        name: 'Merriam Webster',
        url: 'https://www.merriam-webster.com/dictionary/{{phrase}}',
    },
    {
        id: 'KiugJU',
        name: 'Longman',
        url: 'https://www.ldoceonline.com/dictionary/{{phrase}}',
    },
    {
        id: 'MK88n2',
        name: 'Oxford',
        url: 'https://www.oxfordlearnersdictionaries.com/spellcheck/english/?q={{phrase}}',
    },
    {
        id: 'xiQog2',
        name: 'Dictionary',
        url: 'https://www.dictionary.com/browse/{{phrase}}',
    },
]);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app/background.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9taW1pYy8uL3NyYy9hcHAvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9taW1pYy8uL3NyYy9hcHAvY29yZS9NZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vbWltaWMvLi9zcmMvYXBwL2RpY3Rpb25hcmllcy50cyIsIndlYnBhY2s6Ly9taW1pYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9taW1pYy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWltaWMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9taW1pYy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21pbWljL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEM7QUFDa0M7QUFPNUUsSUFBTSxjQUFjLEdBQXVCO0lBQ3pDLFFBQVEsRUFBRSxLQUFLO0lBQ2YsWUFBWTtJQUNaLEVBQUUsRUFBRTtRQUNGLEtBQUssRUFBRSxNQUFNO1FBQ2IsSUFBSSxFQUFFO1lBQ0osVUFBVSxFQUFFLE1BQU07WUFDbEIsUUFBUSxFQUFFLFFBQVE7U0FDbkI7S0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLGdCQUFnQixHQUEyQjtJQUMvQyxNQUFNLEVBQUUsS0FBSztJQUNiLE1BQU0sRUFBRSxFQUFFO0NBQ1gsQ0FBQztBQUVGLElBQU0sbUJBQW1CLEdBQXlCLHNEQUM1QyxDQUFDLFVBQUMsRUFBTTtRQUFKLEVBQUU7SUFBTyxRQUFDLEVBQUUsRUFBRSxNQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUFwQixDQUFvQixDQUFDLENBQUM7QUFFekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRWpDLElBQU0sSUFBSSxHQUVOLEVBQUUsQ0FBQztB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LEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJiYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRpY3Rpb25hcmllcyBmcm9tICcuL2RpY3Rpb25hcmllcyc7XG5pbXBvcnQgTWVzc2VuZ2VyLCB7IENvbnRleHRUeXBlLCBNZXNzZW5nZXJPcHRpb25zIH0gZnJvbSAnLi9jb3JlL01lc3Nlbmdlcic7XG5pbXBvcnQgQ29udGVudFRhYlNldHRpbmdzVHlwZSA9IG1pbWljLkNvbnRlbnRUYWJTZXR0aW5nc1R5cGU7XG5pbXBvcnQgQ29udGVudEluaXRpYWxEYXRhVHlwZSA9IG1pbWljLkNvbnRlbnRJbml0aWFsRGF0YVR5cGU7XG5pbXBvcnQgQ29tbW9uU2V0dGluZ3NUeXBlID0gbWltaWMuQ29tbW9uU2V0dGluZ3NUeXBlO1xuaW1wb3J0IFVwZGF0ZUNvbW1vblNldHRpbmdzID0gbWltaWMuVXBkYXRlQ29tbW9uU2V0dGluZ3M7XG5pbXBvcnQgRGljdGlvbmFyaWVzQ29uZmlnID0gbWltaWMuRGljdGlvbmFyaWVzQ29uZmlnO1xuXG5jb25zdCBjb21tb25TZXR0aW5nczogQ29tbW9uU2V0dGluZ3NUeXBlID0ge1xuICBkaXNhYmxlZDogZmFsc2UsXG4gIGRpY3Rpb25hcmllcyxcbiAgdWk6IHtcbiAgICBwYW5lbDogJ2xlZnQnLFxuICAgIHRhaWw6IHtcbiAgICAgIGhvcml6b250YWw6ICdsZWZ0JyxcbiAgICAgIHZlcnRpY2FsOiAnY2VudGVyJyxcbiAgICB9LFxuICB9LFxufTtcblxuY29uc3QgZGVmYXVsdFRhYkNvbmZpZzogQ29udGVudFRhYlNldHRpbmdzVHlwZSA9IHtcbiAgcGlubmVkOiBmYWxzZSxcbiAgcGhyYXNlOiAnJyxcbn07XG5cbmNvbnN0IGRpY3Rpb25hcmllc0NvbmZpZ3M6IERpY3Rpb25hcmllc0NvbmZpZ1tdID0gZGljdGlvbmFyaWVzXG4gIC5tYXAoKHsgaWQgfSkgPT4gKHsgaWQsIG9mZjogZmFsc2UgfSkpO1xuXG5jb25zb2xlLmxvZyhkaWN0aW9uYXJpZXNDb25maWdzKTtcblxuY29uc3QgdGFiczoge1xuICBba2V5OiBudW1iZXJdOiBDb250ZW50VGFiU2V0dGluZ3NUeXBlLFxufSA9IHt9O1xuXG5jb25zdCBnZXRUYWJTZXR0aW5ncyA9ICh7IHRhYklkLCBzZW5kUmVzcG9uc2UgfTogQ29udGV4dFR5cGU8YW55LCBDb250ZW50SW5pdGlhbERhdGFUeXBlPikgPT4ge1xuICBpZiAoIXRhYklkKSByZXR1cm47XG5cbiAgY29uc3Qgc2F2ZWRTZXR0aW5ncyA9IHRhYnNbdGFiSWRdIHx8IHt9O1xuXG4gIHNlbmRSZXNwb25zZSh7XG4gICAgLi4uZGVmYXVsdFRhYkNvbmZpZyxcbiAgICAuLi5zYXZlZFNldHRpbmdzLFxuICAgIC4uLmNvbW1vblNldHRpbmdzLFxuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVRhYlNldHRpbmdzID0gKHsgdGFiSWQsIGRhdGEgfTogQ29udGV4dFR5cGU8Q29udGVudFRhYlNldHRpbmdzVHlwZT4pID0+IHtcbiAgaWYgKCF0YWJJZCkgcmV0dXJuO1xuXG4gIGNvbnN0IHNhdmVkU2V0dGluZ3MgPSB0YWJzW3RhYklkXSB8fCB7fTtcblxuICB0YWJzW3RhYklkXSA9IHsgLi4uc2F2ZWRTZXR0aW5ncywgLi4uZGF0YSB9O1xufTtcblxuY29uc3QgZ2V0Q29tbW9uU2V0dGluZ3MgPSAoY3R4OiBDb250ZXh0VHlwZTxhbnksIENvbW1vblNldHRpbmdzVHlwZT4pID0+IHtcbiAgY3R4LnNlbmRSZXNwb25zZShjb21tb25TZXR0aW5ncyk7XG59O1xuXG5jb25zdCB1cGRhdGVDb21tb25TZXR0aW5ncyA9IChjdHg6IENvbnRleHRUeXBlPFVwZGF0ZUNvbW1vblNldHRpbmdzPikgPT4ge1xuICBjb25zb2xlLmxvZyhjdHguZGF0YSk7XG4gIE9iamVjdC5hc3NpZ24oY29tbW9uU2V0dGluZ3MsIGN0eC5kYXRhKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIG1lc3Nlbmdlci5zZW50VG9UYWJzKHsgdHlwZTogJ3N5bmNfdGFiX2NvbW1vbl9zZXR0aW5ncycsIGRhdGE6IGNvbW1vblNldHRpbmdzIH0pO1xuICAvLyBzeW5jX3RhYl9jb21tb25fc2V0dGluZ3Ncbn07XG5cbmNvbnN0IG9wdGlvbnM6IE1lc3Nlbmdlck9wdGlvbnMgPSB7XG4gIGxpc3RlbjogW1xuICAgIHsgdHlwZTogJ2dldF90YWJfc2V0dGluZ3MnLCBjb250cm9sbGVyOiBnZXRUYWJTZXR0aW5ncyB9LFxuICAgIHsgdHlwZTogJ3VwZGF0ZV90YWJfc2V0dGluZ3MnLCBjb250cm9sbGVyOiB1cGRhdGVUYWJTZXR0aW5ncyB9LFxuICAgIHsgdHlwZTogJ3VwZGF0ZV9jb21tb25fc2V0dGluZ3MnLCBjb250cm9sbGVyOiB1cGRhdGVDb21tb25TZXR0aW5ncyB9LFxuICAgIHsgdHlwZTogJ2dldF9jb21tb25fc2V0dGluZ3MnLCBjb250cm9sbGVyOiBnZXRDb21tb25TZXR0aW5ncyB9LFxuICBdLFxufTtcblxuY29uc3QgbWVzc2VuZ2VyID0gbmV3IE1lc3NlbmdlcihvcHRpb25zKTtcbiIsImltcG9ydCBNZXNzYWdlU2VuZGVyID0gY2hyb21lLnJ1bnRpbWUuTWVzc2FnZVNlbmRlcjtcblxuZXhwb3J0IGludGVyZmFjZSBDb250ZXh0VHlwZTxBPWFueSwgQj1hbnk+IHtcbiAgdGFiSWQ6IG51bWJlcixcbiAgZGF0YTogQSxcbiAgc2VuZFJlc3BvbnNlOiAocmVzcG9uc2U6IEIpID0+IHZvaWQsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2VuZ2VyTGlzdGVuZXIge1xuICB0eXBlOiBzdHJpbmcsXG4gIGNvbnRyb2xsZXI6IChjdHg6IENvbnRleHRUeXBlKSA9PiAodm9pZCB8IFByb21pc2U8dm9pZD4pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3Nlbmdlck9wdGlvbnMge1xuICBsaXN0ZW4/OiBNZXNzZW5nZXJMaXN0ZW5lcltdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzZW5nZXIge1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8TWVzc2VuZ2VyTGlzdGVuZXI+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZXh0ZW5zaW9uSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNZXNzZW5nZXJPcHRpb25zKSB7XG4gICAgY29uc3QgeyBsaXN0ZW4gfSA9IG9wdGlvbnM7XG4gICAgdGhpcy5leHRlbnNpb25JZCA9IGNocm9tZS5ydW50aW1lLmlkO1xuXG4gICAgdGhpcy5saXN0ZW5lcnMgPSBsaXN0ZW4gPyBbLi4ubGlzdGVuXSA6IFtdO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVUb1J1bnRpbWUoKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gIHByaXZhdGUgb25SdW50aW1lTWVzc2FnZShtZXNzYWdlOiBhbnkgfCB7IHR5cGU6IHN0cmluZywgZGF0YTogYW55IH0sIHNlbmRlcjogTWVzc2FnZVNlbmRlciwgc2VuZFJlc3BvbnNlOiAocmVzcG9uc2U/OiBhbnkpID0+IHZvaWQpIHtcbiAgICBjb25zb2xlLmxvZygnb24gbWVzc2FnZTogJywgeyBtZXNzYWdlLCBzZW5kZXIgfSk7XG4gICAgaWYgKHNlbmRlci5pZCAhPT0gdGhpcy5leHRlbnNpb25JZCkgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHJldHVybjtcblxuICAgIGNvbnN0IHsgdGFiIH0gPSBzZW5kZXI7XG4gICAgY29uc3QgeyB0eXBlOiBtZXNzYWdlVHlwZSwgZGF0YSB9ID0gbWVzc2FnZTtcblxuICAgIGNvbnN0IG1lc3NhZ2VMaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIoKHsgdHlwZSB9KSA9PiB0eXBlID09PSBtZXNzYWdlVHlwZSk7XG5cbiAgICBtZXNzYWdlTGlzdGVuZXJzLmZvckVhY2goKHsgY29udHJvbGxlciB9KSA9PiB7XG4gICAgICBjb250cm9sbGVyKHtcbiAgICAgICAgdGFiSWQ6IHRhYiA/IHRhYi5pZCA6IG51bGwsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHNlbmRSZXNwb25zZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFkZExpc3RlbmVyKGxpc3RlbmVyOiBNZXNzZW5nZXJMaXN0ZW5lcik6IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb1J1bnRpbWUoKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKCguLi5hcmdzKSA9PiB0aGlzLm9uUnVudGltZU1lc3NhZ2UoLi4uYXJncykpO1xuICB9XG5cbiAgcHVibGljIHJlcXVlc3Q8Qj1hbnksIEE9YW55Pih0eXBlOiBzdHJpbmcsIGRhdGE6IEEsIGNhbGxiYWNrPzogKHJlc3BvbnNlOiBCKSA9PiBhbnkpIHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh0aGlzLmV4dGVuc2lvbklkLCB7IHR5cGUsIGRhdGEgfSwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgcHVibGljIHNlbnRUb1RhYnM8QT1hbnk+KG1lc3NhZ2U6IEEpIHtcbiAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgKHRhYnMpID0+IHtcbiAgICAgIHRhYnMuZm9yRWFjaCgoeyBpZCB9KSA9PiB7XG4gICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCBtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnNvbGUubG9nKGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcik7XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBpZDogJ3FQV3poYScsXG4gICAgbmFtZTogJ0NhbWJyaWRnZScsXG4gICAgdXJsOiAnaHR0cHM6Ly9kaWN0aW9uYXJ5LmNhbWJyaWRnZS5vcmcvZGljdGlvbmFyeS9lbmdsaXNoL3t7cGhyYXNlfX0nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdsSnJsQXMnLFxuICAgIG5hbWU6ICdDb2xsaW5zJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5jb2xsaW5zZGljdGlvbmFyeS5jb20vZGljdGlvbmFyeS9lbmdsaXNoL3t7cGhyYXNlfX0nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdYaFZUSUonLFxuICAgIG5hbWU6ICdWb2NhYnVsYXJ5JyxcbiAgICB1cmw6ICdodHRwczovL3d3dy52b2NhYnVsYXJ5LmNvbS9kaWN0aW9uYXJ5L3t7cGhyYXNlfX0nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdlTmVOVncnLFxuICAgIG5hbWU6ICdNYWNNaWxsYW4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3Lm1hY21pbGxhbmRpY3Rpb25hcnkuY29tL2RpY3Rpb25hcnkvYnJpdGlzaC97e3BocmFzZX19JyxcbiAgfSxcbiAge1xuICAgIGlkOiAnN2dySjFzJyxcbiAgICBuYW1lOiAnTWVycmlhbSBXZWJzdGVyJyxcbiAgICB1cmw6ICdodHRwczovL3d3dy5tZXJyaWFtLXdlYnN0ZXIuY29tL2RpY3Rpb25hcnkve3twaHJhc2V9fScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ0tpdWdKVScsXG4gICAgbmFtZTogJ0xvbmdtYW4nLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3Lmxkb2Nlb25saW5lLmNvbS9kaWN0aW9uYXJ5L3t7cGhyYXNlfX0nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdNSzg4bjInLFxuICAgIG5hbWU6ICdPeGZvcmQnLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3Lm94Zm9yZGxlYXJuZXJzZGljdGlvbmFyaWVzLmNvbS9zcGVsbGNoZWNrL2VuZ2xpc2gvP3E9e3twaHJhc2V9fScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3hpUW9nMicsXG4gICAgbmFtZTogJ0RpY3Rpb25hcnknLFxuICAgIHVybDogJ2h0dHBzOi8vd3d3LmRpY3Rpb25hcnkuY29tL2Jyb3dzZS97e3BocmFzZX19JyxcbiAgfSxcbl07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC9iYWNrZ3JvdW5kLnRzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==