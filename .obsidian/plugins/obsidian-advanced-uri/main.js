'use strict';

var obsidian = require('obsidian');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var obsidian__default = /*#__PURE__*/_interopDefaultLegacy(obsidian);

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(typeof self !== 'undefined' ? self : commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/icons.json":
/*!*************************!*\
  !*** ./dist/icons.json ***!
  \*************************/
/*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, aperture, archive, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, award, bar-chart-2, bar-chart, battery-charging, battery, bell-off, bell, bluetooth, bold, book-open, book, bookmark, box, briefcase, calendar, camera-off, camera, cast, check-circle, check-square, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, chrome, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-off, cloud-rain, cloud-snow, cloud, code, codepen, codesandbox, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, divide-circle, divide-square, divide, dollar-sign, download-cloud, download, dribbble, droplet, edit-2, edit-3, edit, external-link, eye-off, eye, facebook, fast-forward, feather, figma, file-minus, file-plus, file-text, file, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, grid, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, info, instagram, italic, key, layers, layout, life-buoy, link-2, link, linkedin, list, loader, lock, log-in, log-out, mail, map-pin, map, maximize-2, maximize, meh, menu, message-circle, message-square, mic-off, mic, minimize-2, minimize, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation-2, navigation, octagon, package, paperclip, pause-circle, pause, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, pie-chart, play-circle, play, plus-circle, plus-square, plus, pocket, power, printer, radio, refresh-ccw, refresh-cw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, server, settings, share-2, share, shield-off, shield, shopping-bag, shopping-cart, shuffle, sidebar, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, square, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash-2, trash, trello, trending-down, trending-up, triangle, truck, tv, twitch, twitter, type, umbrella, underline, unlock, upload-cloud, upload, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume-1, volume-2, volume-x, volume, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
/***/ (function(module) {

module.exports = {"activity":"<polyline points=\"22 12 18 12 15 21 9 3 6 12 2 12\"></polyline>","airplay":"<path d=\"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1\"></path><polygon points=\"12 15 17 21 7 21 12 15\"></polygon>","alert-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>","alert-octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"></line>","alert-triangle":"<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>","align-center":"<line x1=\"18\" y1=\"10\" x2=\"6\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"18\" y1=\"18\" x2=\"6\" y2=\"18\"></line>","align-justify":"<line x1=\"21\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"3\" y2=\"18\"></line>","align-left":"<line x1=\"17\" y1=\"10\" x2=\"3\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"17\" y1=\"18\" x2=\"3\" y2=\"18\"></line>","align-right":"<line x1=\"21\" y1=\"10\" x2=\"7\" y2=\"10\"></line><line x1=\"21\" y1=\"6\" x2=\"3\" y2=\"6\"></line><line x1=\"21\" y1=\"14\" x2=\"3\" y2=\"14\"></line><line x1=\"21\" y1=\"18\" x2=\"7\" y2=\"18\"></line>","anchor":"<circle cx=\"12\" cy=\"5\" r=\"3\"></circle><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"8\"></line><path d=\"M5 12H2a10 10 0 0 0 20 0h-3\"></path>","aperture":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"14.31\" y1=\"8\" x2=\"20.05\" y2=\"17.94\"></line><line x1=\"9.69\" y1=\"8\" x2=\"21.17\" y2=\"8\"></line><line x1=\"7.38\" y1=\"12\" x2=\"13.12\" y2=\"2.06\"></line><line x1=\"9.69\" y1=\"16\" x2=\"3.95\" y2=\"6.06\"></line><line x1=\"14.31\" y1=\"16\" x2=\"2.83\" y2=\"16\"></line><line x1=\"16.62\" y1=\"12\" x2=\"10.88\" y2=\"21.94\"></line>","archive":"<polyline points=\"21 8 21 21 3 21 3 8\"></polyline><rect x=\"1\" y=\"3\" width=\"22\" height=\"5\"></rect><line x1=\"10\" y1=\"12\" x2=\"14\" y2=\"12\"></line>","arrow-down-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"8 12 12 16 16 12\"></polyline><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line>","arrow-down-left":"<line x1=\"17\" y1=\"7\" x2=\"7\" y2=\"17\"></line><polyline points=\"17 17 7 17 7 7\"></polyline>","arrow-down-right":"<line x1=\"7\" y1=\"7\" x2=\"17\" y2=\"17\"></line><polyline points=\"17 7 17 17 7 17\"></polyline>","arrow-down":"<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><polyline points=\"19 12 12 19 5 12\"></polyline>","arrow-left-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 8 8 12 12 16\"></polyline><line x1=\"16\" y1=\"12\" x2=\"8\" y2=\"12\"></line>","arrow-left":"<line x1=\"19\" y1=\"12\" x2=\"5\" y2=\"12\"></line><polyline points=\"12 19 5 12 12 5\"></polyline>","arrow-right-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 16 16 12 12 8\"></polyline><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","arrow-right":"<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><polyline points=\"12 5 19 12 12 19\"></polyline>","arrow-up-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"16 12 12 8 8 12\"></polyline><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"8\"></line>","arrow-up-left":"<line x1=\"17\" y1=\"17\" x2=\"7\" y2=\"7\"></line><polyline points=\"7 17 7 7 17 7\"></polyline>","arrow-up-right":"<line x1=\"7\" y1=\"17\" x2=\"17\" y2=\"7\"></line><polyline points=\"7 7 17 7 17 17\"></polyline>","arrow-up":"<line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"5\"></line><polyline points=\"5 12 12 5 19 12\"></polyline>","at-sign":"<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94\"></path>","award":"<circle cx=\"12\" cy=\"8\" r=\"7\"></circle><polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"></polyline>","bar-chart-2":"<line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"10\"></line><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"14\"></line>","bar-chart":"<line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"10\"></line><line x1=\"18\" y1=\"20\" x2=\"18\" y2=\"4\"></line><line x1=\"6\" y1=\"20\" x2=\"6\" y2=\"16\"></line>","battery-charging":"<path d=\"M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19\"></path><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line><polyline points=\"11 6 7 12 13 12 9 18\"></polyline>","battery":"<rect x=\"1\" y=\"6\" width=\"18\" height=\"12\" rx=\"2\" ry=\"2\"></rect><line x1=\"23\" y1=\"13\" x2=\"23\" y2=\"11\"></line>","bell-off":"<path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path><path d=\"M18.63 13A17.89 17.89 0 0 1 18 8\"></path><path d=\"M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14\"></path><path d=\"M18 8a6 6 0 0 0-9.33-5\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","bell":"<path d=\"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9\"></path><path d=\"M13.73 21a2 2 0 0 1-3.46 0\"></path>","bluetooth":"<polyline points=\"6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5\"></polyline>","bold":"<path d=\"M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path><path d=\"M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z\"></path>","book-open":"<path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"></path><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"></path>","book":"<path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path>","bookmark":"<path d=\"M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z\"></path>","box":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","briefcase":"<rect x=\"2\" y=\"7\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"></path>","calendar":"<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"></line><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"></line><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"></line>","camera-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56\"></path>","camera":"<path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path><circle cx=\"12\" cy=\"13\" r=\"4\"></circle>","cast":"<path d=\"M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6\"></path><line x1=\"2\" y1=\"20\" x2=\"2.01\" y2=\"20\"></line>","check-circle":"<path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path><polyline points=\"22 4 12 14.01 9 11.01\"></polyline>","check-square":"<polyline points=\"9 11 12 14 22 4\"></polyline><path d=\"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11\"></path>","check":"<polyline points=\"20 6 9 17 4 12\"></polyline>","chevron-down":"<polyline points=\"6 9 12 15 18 9\"></polyline>","chevron-left":"<polyline points=\"15 18 9 12 15 6\"></polyline>","chevron-right":"<polyline points=\"9 18 15 12 9 6\"></polyline>","chevron-up":"<polyline points=\"18 15 12 9 6 15\"></polyline>","chevrons-down":"<polyline points=\"7 13 12 18 17 13\"></polyline><polyline points=\"7 6 12 11 17 6\"></polyline>","chevrons-left":"<polyline points=\"11 17 6 12 11 7\"></polyline><polyline points=\"18 17 13 12 18 7\"></polyline>","chevrons-right":"<polyline points=\"13 17 18 12 13 7\"></polyline><polyline points=\"6 17 11 12 6 7\"></polyline>","chevrons-up":"<polyline points=\"17 11 12 6 7 11\"></polyline><polyline points=\"17 18 12 13 7 18\"></polyline>","chrome":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"21.17\" y1=\"8\" x2=\"12\" y2=\"8\"></line><line x1=\"3.95\" y1=\"6.06\" x2=\"8.54\" y2=\"14\"></line><line x1=\"10.88\" y1=\"21.94\" x2=\"15.46\" y2=\"14\"></line>","circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>","clipboard":"<path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\"></path><rect x=\"8\" y=\"2\" width=\"8\" height=\"4\" rx=\"1\" ry=\"1\"></rect>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polyline points=\"12 6 12 12 16 14\"></polyline>","cloud-drizzle":"<line x1=\"8\" y1=\"19\" x2=\"8\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"15\"></line><line x1=\"16\" y1=\"19\" x2=\"16\" y2=\"21\"></line><line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"15\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"17\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>","cloud-lightning":"<path d=\"M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9\"></path><polyline points=\"13 11 9 17 15 17 11 23\"></polyline>","cloud-off":"<path d=\"M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","cloud-rain":"<line x1=\"16\" y1=\"13\" x2=\"16\" y2=\"21\"></line><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"21\"></line><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"23\"></line><path d=\"M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25\"></path>","cloud-snow":"<path d=\"M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25\"></path><line x1=\"8\" y1=\"16\" x2=\"8.01\" y2=\"16\"></line><line x1=\"8\" y1=\"20\" x2=\"8.01\" y2=\"20\"></line><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line><line x1=\"12\" y1=\"22\" x2=\"12.01\" y2=\"22\"></line><line x1=\"16\" y1=\"16\" x2=\"16.01\" y2=\"16\"></line><line x1=\"16\" y1=\"20\" x2=\"16.01\" y2=\"20\"></line>","cloud":"<path d=\"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z\"></path>","code":"<polyline points=\"16 18 22 12 16 6\"></polyline><polyline points=\"8 6 2 12 8 18\"></polyline>","codepen":"<polygon points=\"12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2\"></polygon><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"15.5\"></line><polyline points=\"22 8.5 12 15.5 2 8.5\"></polyline><polyline points=\"2 15.5 12 8.5 22 15.5\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"8.5\"></line>","codesandbox":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"7.5 4.21 12 6.81 16.5 4.21\"></polyline><polyline points=\"7.5 19.79 7.5 14.6 3 12\"></polyline><polyline points=\"21 12 16.5 14.6 16.5 19.79\"></polyline><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","coffee":"<path d=\"M18 8h1a4 4 0 0 1 0 8h-1\"></path><path d=\"M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z\"></path><line x1=\"6\" y1=\"1\" x2=\"6\" y2=\"4\"></line><line x1=\"10\" y1=\"1\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"1\" x2=\"14\" y2=\"4\"></line>","columns":"<path d=\"M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18\"></path>","command":"<path d=\"M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z\"></path>","compass":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76\"></polygon>","copy":"<rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>","corner-down-left":"<polyline points=\"9 10 4 15 9 20\"></polyline><path d=\"M20 4v7a4 4 0 0 1-4 4H4\"></path>","corner-down-right":"<polyline points=\"15 10 20 15 15 20\"></polyline><path d=\"M4 4v7a4 4 0 0 0 4 4h12\"></path>","corner-left-down":"<polyline points=\"14 15 9 20 4 15\"></polyline><path d=\"M20 4h-7a4 4 0 0 0-4 4v12\"></path>","corner-left-up":"<polyline points=\"14 9 9 4 4 9\"></polyline><path d=\"M20 20h-7a4 4 0 0 1-4-4V4\"></path>","corner-right-down":"<polyline points=\"10 15 15 20 20 15\"></polyline><path d=\"M4 4h7a4 4 0 0 1 4 4v12\"></path>","corner-right-up":"<polyline points=\"10 9 15 4 20 9\"></polyline><path d=\"M4 20h7a4 4 0 0 0 4-4V4\"></path>","corner-up-left":"<polyline points=\"9 14 4 9 9 4\"></polyline><path d=\"M20 20v-7a4 4 0 0 0-4-4H4\"></path>","corner-up-right":"<polyline points=\"15 14 20 9 15 4\"></polyline><path d=\"M4 20v-7a4 4 0 0 1 4-4h12\"></path>","cpu":"<rect x=\"4\" y=\"4\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\"></rect><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect><line x1=\"9\" y1=\"1\" x2=\"9\" y2=\"4\"></line><line x1=\"15\" y1=\"1\" x2=\"15\" y2=\"4\"></line><line x1=\"9\" y1=\"20\" x2=\"9\" y2=\"23\"></line><line x1=\"15\" y1=\"20\" x2=\"15\" y2=\"23\"></line><line x1=\"20\" y1=\"9\" x2=\"23\" y2=\"9\"></line><line x1=\"20\" y1=\"14\" x2=\"23\" y2=\"14\"></line><line x1=\"1\" y1=\"9\" x2=\"4\" y2=\"9\"></line><line x1=\"1\" y1=\"14\" x2=\"4\" y2=\"14\"></line>","credit-card":"<rect x=\"1\" y=\"4\" width=\"22\" height=\"16\" rx=\"2\" ry=\"2\"></rect><line x1=\"1\" y1=\"10\" x2=\"23\" y2=\"10\"></line>","crop":"<path d=\"M6.13 1L6 16a2 2 0 0 0 2 2h15\"></path><path d=\"M1 6.13L16 6a2 2 0 0 1 2 2v15\"></path>","crosshair":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"22\" y1=\"12\" x2=\"18\" y2=\"12\"></line><line x1=\"6\" y1=\"12\" x2=\"2\" y2=\"12\"></line><line x1=\"12\" y1=\"6\" x2=\"12\" y2=\"2\"></line><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"18\"></line>","database":"<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"></ellipse><path d=\"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3\"></path><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"></path>","delete":"<path d=\"M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z\"></path><line x1=\"18\" y1=\"9\" x2=\"12\" y2=\"15\"></line><line x1=\"12\" y1=\"9\" x2=\"18\" y2=\"15\"></line>","disc":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>","divide-circle":"<line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line><circle cx=\"12\" cy=\"12\" r=\"10\"></circle>","divide-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"16\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"8\"></line>","divide":"<circle cx=\"12\" cy=\"6\" r=\"2\"></circle><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line><circle cx=\"12\" cy=\"18\" r=\"2\"></circle>","dollar-sign":"<line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"23\"></line><path d=\"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"></path>","download-cloud":"<polyline points=\"8 17 12 21 16 17\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29\"></path>","download":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"></line>","dribbble":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32\"></path>","droplet":"<path d=\"M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z\"></path>","edit-2":"<path d=\"M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z\"></path>","edit-3":"<path d=\"M12 20h9\"></path><path d=\"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z\"></path>","edit":"<path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"></path><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"></path>","external-link":"<path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>","eye-off":"<path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","eye":"<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle>","facebook":"<path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path>","fast-forward":"<polygon points=\"13 19 22 12 13 5 13 19\"></polygon><polygon points=\"2 19 11 12 2 5 2 19\"></polygon>","feather":"<path d=\"M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z\"></path><line x1=\"16\" y1=\"8\" x2=\"2\" y2=\"22\"></line><line x1=\"17.5\" y1=\"15\" x2=\"9\" y2=\"15\"></line>","figma":"<path d=\"M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z\"></path><path d=\"M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z\"></path><path d=\"M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z\"></path><path d=\"M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z\"></path>","file-minus":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>","file-plus":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"12\"></line><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"></line>","file-text":"<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line><polyline points=\"10 9 9 9 8 9\"></polyline>","file":"<path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z\"></path><polyline points=\"13 2 13 9 20 9\"></polyline>","film":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2.18\" ry=\"2.18\"></rect><line x1=\"7\" y1=\"2\" x2=\"7\" y2=\"22\"></line><line x1=\"17\" y1=\"2\" x2=\"17\" y2=\"22\"></line><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"2\" y1=\"7\" x2=\"7\" y2=\"7\"></line><line x1=\"2\" y1=\"17\" x2=\"7\" y2=\"17\"></line><line x1=\"17\" y1=\"17\" x2=\"22\" y2=\"17\"></line><line x1=\"17\" y1=\"7\" x2=\"22\" y2=\"7\"></line>","filter":"<polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"></polygon>","flag":"<path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"></path><line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"></line>","folder-minus":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>","folder-plus":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path><line x1=\"12\" y1=\"11\" x2=\"12\" y2=\"17\"></line><line x1=\"9\" y1=\"14\" x2=\"15\" y2=\"14\"></line>","folder":"<path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path>","framer":"<path d=\"M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7\"></path>","frown":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M16 16s-1.5-2-4-2-4 2-4 2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","gift":"<polyline points=\"20 12 20 22 4 22 4 12\"></polyline><rect x=\"2\" y=\"7\" width=\"20\" height=\"5\"></rect><line x1=\"12\" y1=\"22\" x2=\"12\" y2=\"7\"></line><path d=\"M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z\"></path><path d=\"M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z\"></path>","git-branch":"<line x1=\"6\" y1=\"3\" x2=\"6\" y2=\"15\"></line><circle cx=\"18\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><path d=\"M18 9a9 9 0 0 1-9 9\"></path>","git-commit":"<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"1.05\" y1=\"12\" x2=\"7\" y2=\"12\"></line><line x1=\"17.01\" y1=\"12\" x2=\"22.96\" y2=\"12\"></line>","git-merge":"<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M6 21V9a9 9 0 0 0 9 9\"></path>","git-pull-request":"<circle cx=\"18\" cy=\"18\" r=\"3\"></circle><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M13 6h3a2 2 0 0 1 2 2v7\"></path><line x1=\"6\" y1=\"9\" x2=\"6\" y2=\"21\"></line>","github":"<path d=\"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22\"></path>","gitlab":"<path d=\"M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z\"></path>","globe":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path>","grid":"<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"></rect><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\"></rect><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"></rect>","hard-drive":"<line x1=\"22\" y1=\"12\" x2=\"2\" y2=\"12\"></line><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path><line x1=\"6\" y1=\"16\" x2=\"6.01\" y2=\"16\"></line><line x1=\"10\" y1=\"16\" x2=\"10.01\" y2=\"16\"></line>","hash":"<line x1=\"4\" y1=\"9\" x2=\"20\" y2=\"9\"></line><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\"></line><line x1=\"10\" y1=\"3\" x2=\"8\" y2=\"21\"></line><line x1=\"16\" y1=\"3\" x2=\"14\" y2=\"21\"></line>","headphones":"<path d=\"M3 18v-6a9 9 0 0 1 18 0v6\"></path><path d=\"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z\"></path>","heart":"<path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path>","help-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3\"></path><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line>","hexagon":"<path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path>","home":"<path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline>","image":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"></circle><polyline points=\"21 15 16 10 5 21\"></polyline>","inbox":"<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"></polyline><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"></path>","info":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"></line>","instagram":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\" ry=\"5\"></rect><path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\"></path><line x1=\"17.5\" y1=\"6.5\" x2=\"17.51\" y2=\"6.5\"></line>","italic":"<line x1=\"19\" y1=\"4\" x2=\"10\" y2=\"4\"></line><line x1=\"14\" y1=\"20\" x2=\"5\" y2=\"20\"></line><line x1=\"15\" y1=\"4\" x2=\"9\" y2=\"20\"></line>","key":"<path d=\"M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4\"></path>","layers":"<polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline>","layout":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"></line><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"></line>","life-buoy":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"9.17\" y2=\"9.17\"></line><line x1=\"14.83\" y1=\"14.83\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"19.07\" y2=\"4.93\"></line><line x1=\"14.83\" y1=\"9.17\" x2=\"18.36\" y2=\"5.64\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"9.17\" y2=\"14.83\"></line>","link-2":"<path d=\"M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3\"></path><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","link":"<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"></path><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"></path>","linkedin":"<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect x=\"2\" y=\"9\" width=\"4\" height=\"12\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>","list":"<line x1=\"8\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"8\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"8\" y1=\"18\" x2=\"21\" y2=\"18\"></line><line x1=\"3\" y1=\"6\" x2=\"3.01\" y2=\"6\"></line><line x1=\"3\" y1=\"12\" x2=\"3.01\" y2=\"12\"></line><line x1=\"3\" y1=\"18\" x2=\"3.01\" y2=\"18\"></line>","loader":"<line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line><line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line><line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line><line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line><line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line><line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line><line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>","lock":"<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"></path>","log-in":"<path d=\"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"></path><polyline points=\"10 17 15 12 10 7\"></polyline><line x1=\"15\" y1=\"12\" x2=\"3\" y2=\"12\"></line>","log-out":"<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"></path><polyline points=\"16 17 21 12 16 7\"></polyline><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"></line>","mail":"<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"></path><polyline points=\"22,6 12,13 2,6\"></polyline>","map-pin":"<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>","map":"<polygon points=\"1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6\"></polygon><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"18\"></line><line x1=\"16\" y1=\"6\" x2=\"16\" y2=\"22\"></line>","maximize-2":"<polyline points=\"15 3 21 3 21 9\"></polyline><polyline points=\"9 21 3 21 3 15\"></polyline><line x1=\"21\" y1=\"3\" x2=\"14\" y2=\"10\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>","maximize":"<path d=\"M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3\"></path>","meh":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"15\" x2=\"16\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","menu":"<line x1=\"3\" y1=\"12\" x2=\"21\" y2=\"12\"></line><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><line x1=\"3\" y1=\"18\" x2=\"21\" y2=\"18\"></line>","message-circle":"<path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"></path>","message-square":"<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"></path>","mic-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6\"></path><path d=\"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>","mic":"<path d=\"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z\"></path><path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path><line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line><line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>","minimize-2":"<polyline points=\"4 14 10 14 10 20\"></polyline><polyline points=\"20 10 14 10 14 4\"></polyline><line x1=\"14\" y1=\"10\" x2=\"21\" y2=\"3\"></line><line x1=\"3\" y1=\"21\" x2=\"10\" y2=\"14\"></line>","minimize":"<path d=\"M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3\"></path>","minus-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","minus-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","minus":"<line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>","monitor":"<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"2\" ry=\"2\"></rect><line x1=\"8\" y1=\"21\" x2=\"16\" y2=\"21\"></line><line x1=\"12\" y1=\"17\" x2=\"12\" y2=\"21\"></line>","moon":"<path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path>","more-horizontal":"<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"19\" cy=\"12\" r=\"1\"></circle><circle cx=\"5\" cy=\"12\" r=\"1\"></circle>","more-vertical":"<circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"12\" cy=\"5\" r=\"1\"></circle><circle cx=\"12\" cy=\"19\" r=\"1\"></circle>","mouse-pointer":"<path d=\"M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\"></path><path d=\"M13 13l6 6\"></path>","move":"<polyline points=\"5 9 2 12 5 15\"></polyline><polyline points=\"9 5 12 2 15 5\"></polyline><polyline points=\"15 19 12 22 9 19\"></polyline><polyline points=\"19 9 22 12 19 15\"></polyline><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"22\"></line>","music":"<path d=\"M9 18V5l12-2v13\"></path><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><circle cx=\"18\" cy=\"16\" r=\"3\"></circle>","navigation-2":"<polygon points=\"12 2 19 21 12 17 5 21 12 2\"></polygon>","navigation":"<polygon points=\"3 11 22 2 13 21 11 13 3 11\"></polygon>","octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon>","package":"<line x1=\"16.5\" y1=\"9.4\" x2=\"7.5\" y2=\"4.21\"></line><path d=\"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z\"></path><polyline points=\"3.27 6.96 12 12.01 20.73 6.96\"></polyline><line x1=\"12\" y1=\"22.08\" x2=\"12\" y2=\"12\"></line>","paperclip":"<path d=\"M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48\"></path>","pause-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"10\" y1=\"15\" x2=\"10\" y2=\"9\"></line><line x1=\"14\" y1=\"15\" x2=\"14\" y2=\"9\"></line>","pause":"<rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect>","pen-tool":"<path d=\"M12 19l7-7 3 3-7 7-3-3z\"></path><path d=\"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z\"></path><path d=\"M2 2l7.586 7.586\"></path><circle cx=\"11\" cy=\"11\" r=\"2\"></circle>","percent":"<line x1=\"19\" y1=\"5\" x2=\"5\" y2=\"19\"></line><circle cx=\"6.5\" cy=\"6.5\" r=\"2.5\"></circle><circle cx=\"17.5\" cy=\"17.5\" r=\"2.5\"></circle>","phone-call":"<path d=\"M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-forwarded":"<polyline points=\"19 1 23 5 19 9\"></polyline><line x1=\"15\" y1=\"5\" x2=\"23\" y2=\"5\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-incoming":"<polyline points=\"16 2 16 8 22 8\"></polyline><line x1=\"23\" y1=\"1\" x2=\"16\" y2=\"8\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-missed":"<line x1=\"23\" y1=\"1\" x2=\"17\" y2=\"7\"></line><line x1=\"17\" y1=\"1\" x2=\"23\" y2=\"7\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone-off":"<path d=\"M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91\"></path><line x1=\"23\" y1=\"1\" x2=\"1\" y2=\"23\"></line>","phone-outgoing":"<polyline points=\"23 7 23 1 17 1\"></polyline><line x1=\"16\" y1=\"8\" x2=\"23\" y2=\"1\"></line><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","phone":"<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\"></path>","pie-chart":"<path d=\"M21.21 15.89A10 10 0 1 1 8 2.83\"></path><path d=\"M22 12A10 10 0 0 0 12 2v10z\"></path>","play-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><polygon points=\"10 8 16 12 10 16 10 8\"></polygon>","play":"<polygon points=\"5 3 19 12 5 21 5 3\"></polygon>","plus-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","plus-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"16\"></line><line x1=\"8\" y1=\"12\" x2=\"16\" y2=\"12\"></line>","plus":"<line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>","pocket":"<path d=\"M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z\"></path><polyline points=\"8 10 12 14 16 10\"></polyline>","power":"<path d=\"M18.36 6.64a9 9 0 1 1-12.73 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"12\"></line>","printer":"<polyline points=\"6 9 6 2 18 2 18 9\"></polyline><path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"></path><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"></rect>","radio":"<circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14\"></path>","refresh-ccw":"<polyline points=\"1 4 1 10 7 10\"></polyline><polyline points=\"23 20 23 14 17 14\"></polyline><path d=\"M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15\"></path>","refresh-cw":"<polyline points=\"23 4 23 10 17 10\"></polyline><polyline points=\"1 20 1 14 7 14\"></polyline><path d=\"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15\"></path>","repeat":"<polyline points=\"17 1 21 5 17 9\"></polyline><path d=\"M3 11V9a4 4 0 0 1 4-4h14\"></path><polyline points=\"7 23 3 19 7 15\"></polyline><path d=\"M21 13v2a4 4 0 0 1-4 4H3\"></path>","rewind":"<polygon points=\"11 19 2 12 11 5 11 19\"></polygon><polygon points=\"22 19 13 12 22 5 22 19\"></polygon>","rotate-ccw":"<polyline points=\"1 4 1 10 7 10\"></polyline><path d=\"M3.51 15a9 9 0 1 0 2.13-9.36L1 10\"></path>","rotate-cw":"<polyline points=\"23 4 23 10 17 10\"></polyline><path d=\"M20.49 15a9 9 0 1 1-2.12-9.36L23 10\"></path>","rss":"<path d=\"M4 11a9 9 0 0 1 9 9\"></path><path d=\"M4 4a16 16 0 0 1 16 16\"></path><circle cx=\"5\" cy=\"19\" r=\"1\"></circle>","save":"<path d=\"M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z\"></path><polyline points=\"17 21 17 13 7 13 7 21\"></polyline><polyline points=\"7 3 7 8 15 8\"></polyline>","scissors":"<circle cx=\"6\" cy=\"6\" r=\"3\"></circle><circle cx=\"6\" cy=\"18\" r=\"3\"></circle><line x1=\"20\" y1=\"4\" x2=\"8.12\" y2=\"15.88\"></line><line x1=\"14.47\" y1=\"14.48\" x2=\"20\" y2=\"20\"></line><line x1=\"8.12\" y1=\"8.12\" x2=\"12\" y2=\"12\"></line>","search":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line>","send":"<line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"13\"></line><polygon points=\"22 2 15 22 11 13 2 9 22 2\"></polygon>","server":"<rect x=\"2\" y=\"2\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><rect x=\"2\" y=\"14\" width=\"20\" height=\"8\" rx=\"2\" ry=\"2\"></rect><line x1=\"6\" y1=\"6\" x2=\"6.01\" y2=\"6\"></line><line x1=\"6\" y1=\"18\" x2=\"6.01\" y2=\"18\"></line>","settings":"<circle cx=\"12\" cy=\"12\" r=\"3\"></circle><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"></path>","share-2":"<circle cx=\"18\" cy=\"5\" r=\"3\"></circle><circle cx=\"6\" cy=\"12\" r=\"3\"></circle><circle cx=\"18\" cy=\"19\" r=\"3\"></circle><line x1=\"8.59\" y1=\"13.51\" x2=\"15.42\" y2=\"17.49\"></line><line x1=\"15.41\" y1=\"6.51\" x2=\"8.59\" y2=\"10.49\"></line>","share":"<path d=\"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8\"></path><polyline points=\"16 6 12 2 8 6\"></polyline><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"15\"></line>","shield-off":"<path d=\"M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18\"></path><path d=\"M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","shield":"<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path>","shopping-bag":"<path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"></path><line x1=\"3\" y1=\"6\" x2=\"21\" y2=\"6\"></line><path d=\"M16 10a4 4 0 0 1-8 0\"></path>","shopping-cart":"<circle cx=\"9\" cy=\"21\" r=\"1\"></circle><circle cx=\"20\" cy=\"21\" r=\"1\"></circle><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"></path>","shuffle":"<polyline points=\"16 3 21 3 21 8\"></polyline><line x1=\"4\" y1=\"20\" x2=\"21\" y2=\"3\"></line><polyline points=\"21 16 21 21 16 21\"></polyline><line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\"></line><line x1=\"4\" y1=\"4\" x2=\"9\" y2=\"9\"></line>","sidebar":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"></line>","skip-back":"<polygon points=\"19 20 9 12 19 4 19 20\"></polygon><line x1=\"5\" y1=\"19\" x2=\"5\" y2=\"5\"></line>","skip-forward":"<polygon points=\"5 4 15 12 5 20 5 4\"></polygon><line x1=\"19\" y1=\"5\" x2=\"19\" y2=\"19\"></line>","slack":"<path d=\"M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z\"></path><path d=\"M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"></path><path d=\"M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z\"></path><path d=\"M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z\"></path><path d=\"M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z\"></path><path d=\"M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z\"></path><path d=\"M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z\"></path><path d=\"M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z\"></path>","slash":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"4.93\" y1=\"4.93\" x2=\"19.07\" y2=\"19.07\"></line>","sliders":"<line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line>","smartphone":"<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>","smile":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M8 14s1.5 2 4 2 4-2 4-2\"></path><line x1=\"9\" y1=\"9\" x2=\"9.01\" y2=\"9\"></line><line x1=\"15\" y1=\"9\" x2=\"15.01\" y2=\"9\"></line>","speaker":"<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><circle cx=\"12\" cy=\"14\" r=\"4\"></circle><line x1=\"12\" y1=\"6\" x2=\"12.01\" y2=\"6\"></line>","square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect>","star":"<polygon points=\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\"></polygon>","stop-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><rect x=\"9\" y=\"9\" width=\"6\" height=\"6\"></rect>","sun":"<circle cx=\"12\" cy=\"12\" r=\"5\"></circle><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"23\"></line><line x1=\"4.22\" y1=\"4.22\" x2=\"5.64\" y2=\"5.64\"></line><line x1=\"18.36\" y1=\"18.36\" x2=\"19.78\" y2=\"19.78\"></line><line x1=\"1\" y1=\"12\" x2=\"3\" y2=\"12\"></line><line x1=\"21\" y1=\"12\" x2=\"23\" y2=\"12\"></line><line x1=\"4.22\" y1=\"19.78\" x2=\"5.64\" y2=\"18.36\"></line><line x1=\"18.36\" y1=\"5.64\" x2=\"19.78\" y2=\"4.22\"></line>","sunrise":"<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"9\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"8 6 12 2 16 6\"></polyline>","sunset":"<path d=\"M17 18a5 5 0 0 0-10 0\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"2\"></line><line x1=\"4.22\" y1=\"10.22\" x2=\"5.64\" y2=\"11.64\"></line><line x1=\"1\" y1=\"18\" x2=\"3\" y2=\"18\"></line><line x1=\"21\" y1=\"18\" x2=\"23\" y2=\"18\"></line><line x1=\"18.36\" y1=\"11.64\" x2=\"19.78\" y2=\"10.22\"></line><line x1=\"23\" y1=\"22\" x2=\"1\" y2=\"22\"></line><polyline points=\"16 5 12 9 8 5\"></polyline>","tablet":"<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"2\" ry=\"2\"></rect><line x1=\"12\" y1=\"18\" x2=\"12.01\" y2=\"18\"></line>","tag":"<path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"></line>","target":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><circle cx=\"12\" cy=\"12\" r=\"6\"></circle><circle cx=\"12\" cy=\"12\" r=\"2\"></circle>","terminal":"<polyline points=\"4 17 10 11 4 5\"></polyline><line x1=\"12\" y1=\"19\" x2=\"20\" y2=\"19\"></line>","thermometer":"<path d=\"M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z\"></path>","thumbs-down":"<path d=\"M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17\"></path>","thumbs-up":"<path d=\"M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3\"></path>","toggle-left":"<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"8\" cy=\"12\" r=\"3\"></circle>","toggle-right":"<rect x=\"1\" y=\"5\" width=\"22\" height=\"14\" rx=\"7\" ry=\"7\"></rect><circle cx=\"16\" cy=\"12\" r=\"3\"></circle>","tool":"<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"></path>","trash-2":"<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"></line><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"></line>","trash":"<polyline points=\"3 6 5 6 21 6\"></polyline><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path>","trello":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><rect x=\"7\" y=\"7\" width=\"3\" height=\"9\"></rect><rect x=\"14\" y=\"7\" width=\"3\" height=\"5\"></rect>","trending-down":"<polyline points=\"23 18 13.5 8.5 8.5 13.5 1 6\"></polyline><polyline points=\"17 18 23 18 23 12\"></polyline>","trending-up":"<polyline points=\"23 6 13.5 15.5 8.5 10.5 1 18\"></polyline><polyline points=\"17 6 23 6 23 12\"></polyline>","triangle":"<path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path>","truck":"<rect x=\"1\" y=\"3\" width=\"15\" height=\"13\"></rect><polygon points=\"16 8 20 8 23 11 23 16 16 16 16 8\"></polygon><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"></circle><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"></circle>","tv":"<rect x=\"2\" y=\"7\" width=\"20\" height=\"15\" rx=\"2\" ry=\"2\"></rect><polyline points=\"17 2 12 7 7 2\"></polyline>","twitch":"<path d=\"M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7\"></path>","twitter":"<path d=\"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z\"></path>","type":"<polyline points=\"4 7 4 4 20 4 20 7\"></polyline><line x1=\"9\" y1=\"20\" x2=\"15\" y2=\"20\"></line><line x1=\"12\" y1=\"4\" x2=\"12\" y2=\"20\"></line>","umbrella":"<path d=\"M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7\"></path>","underline":"<path d=\"M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3\"></path><line x1=\"4\" y1=\"21\" x2=\"20\" y2=\"21\"></line>","unlock":"<rect x=\"3\" y=\"11\" width=\"18\" height=\"11\" rx=\"2\" ry=\"2\"></rect><path d=\"M7 11V7a5 5 0 0 1 9.9-1\"></path>","upload-cloud":"<polyline points=\"16 16 12 12 8 16\"></polyline><line x1=\"12\" y1=\"12\" x2=\"12\" y2=\"21\"></line><path d=\"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3\"></path><polyline points=\"16 16 12 12 8 16\"></polyline>","upload":"<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"17 8 12 3 7 8\"></polyline><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"></line>","user-check":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><polyline points=\"17 11 19 13 23 9\"></polyline>","user-minus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>","user-plus":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"20\" y1=\"8\" x2=\"20\" y2=\"14\"></line><line x1=\"23\" y1=\"11\" x2=\"17\" y2=\"11\"></line>","user-x":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"8.5\" cy=\"7\" r=\"4\"></circle><line x1=\"18\" y1=\"8\" x2=\"23\" y2=\"13\"></line><line x1=\"23\" y1=\"8\" x2=\"18\" y2=\"13\"></line>","user":"<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle>","users":"<path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"></path><circle cx=\"9\" cy=\"7\" r=\"4\"></circle><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"></path><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"></path>","video-off":"<path d=\"M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10\"></path><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","video":"<polygon points=\"23 7 16 12 23 17 23 7\"></polygon><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"></rect>","voicemail":"<circle cx=\"5.5\" cy=\"11.5\" r=\"4.5\"></circle><circle cx=\"18.5\" cy=\"11.5\" r=\"4.5\"></circle><line x1=\"5.5\" y1=\"16\" x2=\"18.5\" y2=\"16\"></line>","volume-1":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"></path>","volume-2":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07\"></path>","volume-x":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon><line x1=\"23\" y1=\"9\" x2=\"17\" y2=\"15\"></line><line x1=\"17\" y1=\"9\" x2=\"23\" y2=\"15\"></line>","volume":"<polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"></polygon>","watch":"<circle cx=\"12\" cy=\"12\" r=\"7\"></circle><polyline points=\"12 9 12 12 13.5 13.5\"></polyline><path d=\"M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83\"></path>","wifi-off":"<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line><path d=\"M16.72 11.06A10.94 10.94 0 0 1 19 12.55\"></path><path d=\"M5 12.55a10.94 10.94 0 0 1 5.17-2.39\"></path><path d=\"M10.71 5.05A16 16 0 0 1 22.58 9\"></path><path d=\"M1.42 9a15.91 15.91 0 0 1 4.7-2.88\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>","wifi":"<path d=\"M5 12.55a11 11 0 0 1 14.08 0\"></path><path d=\"M1.42 9a16 16 0 0 1 21.16 0\"></path><path d=\"M8.53 16.11a6 6 0 0 1 6.95 0\"></path><line x1=\"12\" y1=\"20\" x2=\"12.01\" y2=\"20\"></line>","wind":"<path d=\"M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2\"></path>","x-circle":"<circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>","x-octagon":"<polygon points=\"7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2\"></polygon><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line>","x-square":"<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"></rect><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"></line><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"></line>","x":"<line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line><line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>","youtube":"<path d=\"M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z\"></path><polygon points=\"9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02\"></polygon>","zap-off":"<polyline points=\"12.41 6.75 13 2 10.57 4.92\"></polyline><polyline points=\"18.57 12.91 21 10 15.66 10\"></polyline><polyline points=\"8 8 3 14 12 14 11 22 16 16\"></polyline><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>","zap":"<polygon points=\"13 2 3 14 12 14 11 22 21 10 12 10 13 2\"></polygon>","zoom-in":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"11\" y1=\"8\" x2=\"11\" y2=\"14\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>","zoom-out":"<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line><line x1=\"8\" y1=\"11\" x2=\"14\" y2=\"11\"></line>"};

/***/ }),

/***/ "./node_modules/classnames/dedupe.js":
/*!*******************************************!*\
  !*** ./node_modules/classnames/dedupe.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var classNames = (function () {
		// don't inherit from Object so we can skip hasOwnProperty check later
		// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
		function StorageObject() {}
		StorageObject.prototype = Object.create(null);

		function _parseArray (resultSet, array) {
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				_parse(resultSet, array[i]);
			}
		}

		var hasOwn = {}.hasOwnProperty;

		function _parseNumber (resultSet, num) {
			resultSet[num] = true;
		}

		function _parseObject (resultSet, object) {
			for (var k in object) {
				if (hasOwn.call(object, k)) {
					// set value to false instead of deleting it to avoid changing object structure
					// https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
					resultSet[k] = !!object[k];
				}
			}
		}

		var SPACE = /\s+/;
		function _parseString (resultSet, str) {
			var array = str.split(SPACE);
			var length = array.length;

			for (var i = 0; i < length; ++i) {
				resultSet[array[i]] = true;
			}
		}

		function _parse (resultSet, arg) {
			if (!arg) return;
			var argType = typeof arg;

			// 'foo bar'
			if (argType === 'string') {
				_parseString(resultSet, arg);

			// ['foo', 'bar', ...]
			} else if (Array.isArray(arg)) {
				_parseArray(resultSet, arg);

			// { 'foo': true, ... }
			} else if (argType === 'object') {
				_parseObject(resultSet, arg);

			// '130'
			} else if (argType === 'number') {
				_parseNumber(resultSet, arg);
			}
		}

		function _classNames () {
			// don't leak arguments
			// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
			var len = arguments.length;
			var args = Array(len);
			for (var i = 0; i < len; i++) {
				args[i] = arguments[i];
			}

			var classSet = new StorageObject();
			_parseArray(classSet, args);

			var list = [];

			for (var k in classSet) {
				if (classSet[k]) {
					list.push(k);
				}
			}

			return list.join(' ');
		}

		return _classNames;
	})();

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
}());


/***/ }),

/***/ "./node_modules/core-js/es/array/from.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/es/array/from.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");
__webpack_require__(/*! ../../modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Array.from;


/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    result = new C();
    for (;!(step = iterator.next()).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/function-to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")));

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/hide.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/hide.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var document = global.document;

module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split;

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");
var arrayIncludes = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var arrayIndexOf = arrayIncludes(false);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var validateSetPrototypeOfArguments = __webpack_require__(/*! ../internals/validate-set-prototype-of-arguments */ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js");

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var Reflect = global.Reflect;

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");


/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "./node_modules/core-js/internals/function-to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "./node_modules/core-js/internals/hide.js");

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.1.3',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js/internals/string-at.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/string-at.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// CONVERT_TO_STRING: true  -> String#at
// CONVERT_TO_STRING: false -> String#codePointAt
module.exports = function (that, pos, CONVERT_TO_STRING) {
  var S = String(requireObjectCoercible(that));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size
    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
      ? CONVERT_TO_STRING ? S.charAt(position) : first
      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

// 7.1.1 ToPrimitive(input [, PreferredType])
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

module.exports = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};


/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.from.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var from = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var codePointAt = __webpack_require__(/*! ../internals/string-at */ "./node_modules/core-js/internals/string-at.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = codePointAt(string, index, true);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/default-attrs.json":
/*!********************************!*\
  !*** ./src/default-attrs.json ***!
  \********************************/
/*! exports provided: xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin, default */
/***/ (function(module) {

module.exports = {"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};

/***/ }),

/***/ "./src/icon.js":
/*!*********************!*\
  !*** ./src/icon.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dedupe = __webpack_require__(/*! classnames/dedupe */ "./node_modules/classnames/dedupe.js");

var _dedupe2 = _interopRequireDefault(_dedupe);

var _defaultAttrs = __webpack_require__(/*! ./default-attrs.json */ "./src/default-attrs.json");

var _defaultAttrs2 = _interopRequireDefault(_defaultAttrs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Icon = function () {
  function Icon(name, contents) {
    var tags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Icon);

    this.name = name;
    this.contents = contents;
    this.tags = tags;
    this.attrs = _extends({}, _defaultAttrs2.default, { class: 'feather feather-' + name });
  }

  /**
   * Create an SVG string.
   * @param {Object} attrs
   * @returns {string}
   */


  _createClass(Icon, [{
    key: 'toSvg',
    value: function toSvg() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var combinedAttrs = _extends({}, this.attrs, attrs, { class: (0, _dedupe2.default)(this.attrs.class, attrs.class) });

      return '<svg ' + attrsToString(combinedAttrs) + '>' + this.contents + '</svg>';
    }

    /**
     * Return string representation of an `Icon`.
     *
     * Added for backward compatibility. If old code expects `feather.icons.<name>`
     * to be a string, `toString()` will get implicitly called.
     *
     * @returns {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.contents;
    }
  }]);

  return Icon;
}();

/**
 * Convert attributes object to string of HTML attributes.
 * @param {Object} attrs
 * @returns {string}
 */


function attrsToString(attrs) {
  return Object.keys(attrs).map(function (key) {
    return key + '="' + attrs[key] + '"';
  }).join(' ');
}

exports.default = Icon;

/***/ }),

/***/ "./src/icons.js":
/*!**********************!*\
  !*** ./src/icons.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = __webpack_require__(/*! ./icon */ "./src/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _icons = __webpack_require__(/*! ../dist/icons.json */ "./dist/icons.json");

var _icons2 = _interopRequireDefault(_icons);

var _tags = __webpack_require__(/*! ./tags.json */ "./src/tags.json");

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.keys(_icons2.default).map(function (key) {
  return new _icon2.default(key, _icons2.default[key], _tags2.default[key]);
}).reduce(function (object, icon) {
  object[icon.name] = icon;
  return object;
}, {});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

var _icons2 = _interopRequireDefault(_icons);

var _toSvg = __webpack_require__(/*! ./to-svg */ "./src/to-svg.js");

var _toSvg2 = _interopRequireDefault(_toSvg);

var _replace = __webpack_require__(/*! ./replace */ "./src/replace.js");

var _replace2 = _interopRequireDefault(_replace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = { icons: _icons2.default, toSvg: _toSvg2.default, replace: _replace2.default };

/***/ }),

/***/ "./src/replace.js":
/*!************************!*\
  !*** ./src/replace.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env browser */


var _dedupe = __webpack_require__(/*! classnames/dedupe */ "./node_modules/classnames/dedupe.js");

var _dedupe2 = _interopRequireDefault(_dedupe);

var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Replace all HTML elements that have a `data-feather` attribute with SVG markup
 * corresponding to the element's `data-feather` attribute value.
 * @param {Object} attrs
 */
function replace() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof document === 'undefined') {
    throw new Error('`feather.replace()` only works in a browser environment.');
  }

  var elementsToReplace = document.querySelectorAll('[data-feather]');

  Array.from(elementsToReplace).forEach(function (element) {
    return replaceElement(element, attrs);
  });
}

/**
 * Replace a single HTML element with SVG markup
 * corresponding to the element's `data-feather` attribute value.
 * @param {HTMLElement} element
 * @param {Object} attrs
 */
function replaceElement(element) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var elementAttrs = getAttrs(element);
  var name = elementAttrs['data-feather'];
  delete elementAttrs['data-feather'];

  var svgString = _icons2.default[name].toSvg(_extends({}, attrs, elementAttrs, { class: (0, _dedupe2.default)(attrs.class, elementAttrs.class) }));
  var svgDocument = new DOMParser().parseFromString(svgString, 'image/svg+xml');
  var svgElement = svgDocument.querySelector('svg');

  element.parentNode.replaceChild(svgElement, element);
}

/**
 * Get the attributes of an HTML element.
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getAttrs(element) {
  return Array.from(element.attributes).reduce(function (attrs, attr) {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
}

exports.default = replace;

/***/ }),

/***/ "./src/tags.json":
/*!***********************!*\
  !*** ./src/tags.json ***!
  \***********************/
/*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, archive, at-sign, award, aperture, bar-chart, bar-chart-2, battery, battery-charging, bell, bell-off, bluetooth, book-open, book, bookmark, box, briefcase, calendar, camera, cast, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-rain, cloud-snow, cloud, codepen, codesandbox, code, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, dollar-sign, droplet, edit, edit-2, edit-3, eye, eye-off, external-link, facebook, fast-forward, figma, file-minus, file-plus, file-text, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, instagram, key, layers, layout, life-bouy, link, link-2, linkedin, list, lock, log-in, log-out, mail, map-pin, map, maximize, maximize-2, meh, menu, message-circle, message-square, mic-off, mic, minimize, minimize-2, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation, navigation-2, octagon, package, paperclip, pause, pause-circle, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, play, pie-chart, play-circle, plus, plus-circle, plus-square, pocket, power, printer, radio, refresh-cw, refresh-ccw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, settings, share-2, shield, shield-off, shopping-bag, shopping-cart, shuffle, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash, trash-2, triangle, truck, tv, twitch, twitter, type, umbrella, unlock, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume, volume-1, volume-2, volume-x, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
/***/ (function(module) {

module.exports = {"activity":["pulse","health","action","motion"],"airplay":["stream","cast","mirroring"],"alert-circle":["warning","alert","danger"],"alert-octagon":["warning","alert","danger"],"alert-triangle":["warning","alert","danger"],"align-center":["text alignment","center"],"align-justify":["text alignment","justified"],"align-left":["text alignment","left"],"align-right":["text alignment","right"],"anchor":[],"archive":["index","box"],"at-sign":["mention","at","email","message"],"award":["achievement","badge"],"aperture":["camera","photo"],"bar-chart":["statistics","diagram","graph"],"bar-chart-2":["statistics","diagram","graph"],"battery":["power","electricity"],"battery-charging":["power","electricity"],"bell":["alarm","notification","sound"],"bell-off":["alarm","notification","silent"],"bluetooth":["wireless"],"book-open":["read","library"],"book":["read","dictionary","booklet","magazine","library"],"bookmark":["read","clip","marker","tag"],"box":["cube"],"briefcase":["work","bag","baggage","folder"],"calendar":["date"],"camera":["photo"],"cast":["chromecast","airplay"],"circle":["off","zero","record"],"clipboard":["copy"],"clock":["time","watch","alarm"],"cloud-drizzle":["weather","shower"],"cloud-lightning":["weather","bolt"],"cloud-rain":["weather"],"cloud-snow":["weather","blizzard"],"cloud":["weather"],"codepen":["logo"],"codesandbox":["logo"],"code":["source","programming"],"coffee":["drink","cup","mug","tea","cafe","hot","beverage"],"columns":["layout"],"command":["keyboard","cmd","terminal","prompt"],"compass":["navigation","safari","travel","direction"],"copy":["clone","duplicate"],"corner-down-left":["arrow","return"],"corner-down-right":["arrow"],"corner-left-down":["arrow"],"corner-left-up":["arrow"],"corner-right-down":["arrow"],"corner-right-up":["arrow"],"corner-up-left":["arrow"],"corner-up-right":["arrow"],"cpu":["processor","technology"],"credit-card":["purchase","payment","cc"],"crop":["photo","image"],"crosshair":["aim","target"],"database":["storage","memory"],"delete":["remove"],"disc":["album","cd","dvd","music"],"dollar-sign":["currency","money","payment"],"droplet":["water"],"edit":["pencil","change"],"edit-2":["pencil","change"],"edit-3":["pencil","change"],"eye":["view","watch"],"eye-off":["view","watch","hide","hidden"],"external-link":["outbound"],"facebook":["logo","social"],"fast-forward":["music"],"figma":["logo","design","tool"],"file-minus":["delete","remove","erase"],"file-plus":["add","create","new"],"file-text":["data","txt","pdf"],"film":["movie","video"],"filter":["funnel","hopper"],"flag":["report"],"folder-minus":["directory"],"folder-plus":["directory"],"folder":["directory"],"framer":["logo","design","tool"],"frown":["emoji","face","bad","sad","emotion"],"gift":["present","box","birthday","party"],"git-branch":["code","version control"],"git-commit":["code","version control"],"git-merge":["code","version control"],"git-pull-request":["code","version control"],"github":["logo","version control"],"gitlab":["logo","version control"],"globe":["world","browser","language","translate"],"hard-drive":["computer","server","memory","data"],"hash":["hashtag","number","pound"],"headphones":["music","audio","sound"],"heart":["like","love","emotion"],"help-circle":["question mark"],"hexagon":["shape","node.js","logo"],"home":["house","living"],"image":["picture"],"inbox":["email"],"instagram":["logo","camera"],"key":["password","login","authentication","secure"],"layers":["stack"],"layout":["window","webpage"],"life-bouy":["help","life ring","support"],"link":["chain","url"],"link-2":["chain","url"],"linkedin":["logo","social media"],"list":["options"],"lock":["security","password","secure"],"log-in":["sign in","arrow","enter"],"log-out":["sign out","arrow","exit"],"mail":["email","message"],"map-pin":["location","navigation","travel","marker"],"map":["location","navigation","travel"],"maximize":["fullscreen"],"maximize-2":["fullscreen","arrows","expand"],"meh":["emoji","face","neutral","emotion"],"menu":["bars","navigation","hamburger"],"message-circle":["comment","chat"],"message-square":["comment","chat"],"mic-off":["record","sound","mute"],"mic":["record","sound","listen"],"minimize":["exit fullscreen","close"],"minimize-2":["exit fullscreen","arrows","close"],"minus":["subtract"],"monitor":["tv","screen","display"],"moon":["dark","night"],"more-horizontal":["ellipsis"],"more-vertical":["ellipsis"],"mouse-pointer":["arrow","cursor"],"move":["arrows"],"music":["note"],"navigation":["location","travel"],"navigation-2":["location","travel"],"octagon":["stop"],"package":["box","container"],"paperclip":["attachment"],"pause":["music","stop"],"pause-circle":["music","audio","stop"],"pen-tool":["vector","drawing"],"percent":["discount"],"phone-call":["ring"],"phone-forwarded":["call"],"phone-incoming":["call"],"phone-missed":["call"],"phone-off":["call","mute"],"phone-outgoing":["call"],"phone":["call"],"play":["music","start"],"pie-chart":["statistics","diagram"],"play-circle":["music","start"],"plus":["add","new"],"plus-circle":["add","new"],"plus-square":["add","new"],"pocket":["logo","save"],"power":["on","off"],"printer":["fax","office","device"],"radio":["signal"],"refresh-cw":["synchronise","arrows"],"refresh-ccw":["arrows"],"repeat":["loop","arrows"],"rewind":["music"],"rotate-ccw":["arrow"],"rotate-cw":["arrow"],"rss":["feed","subscribe"],"save":["floppy disk"],"scissors":["cut"],"search":["find","magnifier","magnifying glass"],"send":["message","mail","email","paper airplane","paper aeroplane"],"settings":["cog","edit","gear","preferences"],"share-2":["network","connections"],"shield":["security","secure"],"shield-off":["security","insecure"],"shopping-bag":["ecommerce","cart","purchase","store"],"shopping-cart":["ecommerce","cart","purchase","store"],"shuffle":["music"],"skip-back":["music"],"skip-forward":["music"],"slack":["logo"],"slash":["ban","no"],"sliders":["settings","controls"],"smartphone":["cellphone","device"],"smile":["emoji","face","happy","good","emotion"],"speaker":["audio","music"],"star":["bookmark","favorite","like"],"stop-circle":["media","music"],"sun":["brightness","weather","light"],"sunrise":["weather","time","morning","day"],"sunset":["weather","time","evening","night"],"tablet":["device"],"tag":["label"],"target":["logo","bullseye"],"terminal":["code","command line","prompt"],"thermometer":["temperature","celsius","fahrenheit","weather"],"thumbs-down":["dislike","bad","emotion"],"thumbs-up":["like","good","emotion"],"toggle-left":["on","off","switch"],"toggle-right":["on","off","switch"],"tool":["settings","spanner"],"trash":["garbage","delete","remove","bin"],"trash-2":["garbage","delete","remove","bin"],"triangle":["delta"],"truck":["delivery","van","shipping","transport","lorry"],"tv":["television","stream"],"twitch":["logo"],"twitter":["logo","social"],"type":["text"],"umbrella":["rain","weather"],"unlock":["security"],"user-check":["followed","subscribed"],"user-minus":["delete","remove","unfollow","unsubscribe"],"user-plus":["new","add","create","follow","subscribe"],"user-x":["delete","remove","unfollow","unsubscribe","unavailable"],"user":["person","account"],"users":["group"],"video-off":["camera","movie","film"],"video":["camera","movie","film"],"voicemail":["phone"],"volume":["music","sound","mute"],"volume-1":["music","sound"],"volume-2":["music","sound"],"volume-x":["music","sound","mute"],"watch":["clock","time"],"wifi-off":["disabled"],"wifi":["connection","signal","wireless"],"wind":["weather","air"],"x-circle":["cancel","close","delete","remove","times","clear"],"x-octagon":["delete","stop","alert","warning","times","clear"],"x-square":["cancel","close","delete","remove","times","clear"],"x":["cancel","close","delete","remove","times","clear"],"youtube":["logo","video","play"],"zap-off":["flash","camera","lightning"],"zap":["flash","camera","lightning"],"zoom-in":["magnifying glass"],"zoom-out":["magnifying glass"]};

/***/ }),

/***/ "./src/to-svg.js":
/*!***********************!*\
  !*** ./src/to-svg.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icons = __webpack_require__(/*! ./icons */ "./src/icons.js");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create an SVG string.
 * @deprecated
 * @param {string} name
 * @param {Object} attrs
 * @returns {string}
 */
function toSvg(name) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  console.warn('feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead.');

  if (!name) {
    throw new Error('The required `key` (icon name) parameter is missing.');
  }

  if (!_icons2.default[name]) {
    throw new Error('No icon matching \'' + name + '\'. See the complete list of icons at https://feathericons.com');
  }

  return _icons2.default[name].toSvg(attrs);
}

exports.default = toSvg;

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi core-js/es/array/from ./src/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! core-js/es/array/from */"./node_modules/core-js/es/array/from.js");
module.exports = __webpack_require__(/*! /home/travis/build/feathericons/feather/src/index.js */"./src/index.js");


/***/ })

/******/ });
});

});

/**
 * This module contains various utility functions commonly used in Obsidian plugins.
 * @module obsidian-community-lib
 */
/**
 * Strip '.md' off the end of a note name to get its basename.
 *
 * Works with the edgecase where a note has '.md' in its basename: `Obsidian.md.md`, for example.
 * @param  {string} noteName with or without '.md' on the end.
 * @returns {string} noteName without '.md'
 */
const stripMD = (noteName) => {
    if (noteName.match(/\.MD$|\.md$/m)) {
        return noteName.split(/\.MD$|\.md$/m).slice(0, -1).join(".md");
    }
    else
        return noteName;
};

var main = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



const DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
const DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
const DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";
const DEFAULT_QUARTERLY_NOTE_FORMAT = "YYYY-[Q]Q";
const DEFAULT_YEARLY_NOTE_FORMAT = "YYYY";

function shouldUsePeriodicNotesSettings(periodicity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.[periodicity]?.enabled;
}
/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getDailyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { internalPlugins, plugins } = window.app;
        if (shouldUsePeriodicNotesSettings("daily")) {
            const { format, folder, template } = plugins.getPlugin("periodic-notes")?.settings?.daily || {};
            return {
                format: format || DEFAULT_DAILY_NOTE_FORMAT,
                folder: folder?.trim() || "",
                template: template?.trim() || "",
            };
        }
        const { folder, format, template } = internalPlugins.getPluginById("daily-notes")?.instance?.options || {};
        return {
            format: format || DEFAULT_DAILY_NOTE_FORMAT,
            folder: folder?.trim() || "",
            template: template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom daily note settings found!", err);
    }
}
/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getWeeklyNoteSettings() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pluginManager = window.app.plugins;
        const calendarSettings = pluginManager.getPlugin("calendar")?.options;
        const periodicNotesSettings = pluginManager.getPlugin("periodic-notes")?.settings?.weekly;
        if (shouldUsePeriodicNotesSettings("weekly")) {
            return {
                format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
                folder: periodicNotesSettings.folder?.trim() || "",
                template: periodicNotesSettings.template?.trim() || "",
            };
        }
        const settings = calendarSettings || {};
        return {
            format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: settings.weeklyNoteFolder?.trim() || "",
            template: settings.weeklyNoteTemplate?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom weekly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getMonthlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("monthly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.monthly) ||
            {};
        return {
            format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom monthly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getQuarterlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("quarterly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.quarterly) ||
            {};
        return {
            format: settings.format || DEFAULT_QUARTERLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom quarterly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getYearlyNoteSettings() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pluginManager = window.app.plugins;
    try {
        const settings = (shouldUsePeriodicNotesSettings("yearly") &&
            pluginManager.getPlugin("periodic-notes")?.settings?.yearly) ||
            {};
        return {
            format: settings.format || DEFAULT_YEARLY_NOTE_FORMAT,
            folder: settings.folder?.trim() || "",
            template: settings.template?.trim() || "",
        };
    }
    catch (err) {
        console.info("No custom yearly note settings found!", err);
    }
}

// Credit: @creationix/path.js
function join(...partSegments) {
    // Split the inputs into a list of path commands.
    let parts = [];
    for (let i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    const newParts = [];
    for (let i = 0, l = parts.length; i < l; i++) {
        const part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".")
            continue;
        // Push new path segments.
        else
            newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "")
        newParts.unshift("");
    // Turn back into a single string path.
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
    dirs.pop(); // remove basename
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
    const path = obsidian__default["default"].normalizePath(join(directory, filename));
    await ensureFolderExists(path);
    return path;
}
async function getTemplateInfo(template) {
    const { metadataCache, vault } = window.app;
    const templatePath = obsidian__default["default"].normalizePath(template);
    if (templatePath === "/") {
        return Promise.resolve(["", null]);
    }
    try {
        const templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
        const contents = await vault.cachedRead(templateFile);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IFoldInfo = window.app.foldManager.load(templateFile);
        return [contents, IFoldInfo];
    }
    catch (err) {
        console.error(`Failed to read the daily note template '${templatePath}'`, err);
        new obsidian__default["default"].Notice("Failed to read the daily note template");
        return ["", null];
    }
}

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID(date, granularity = "day") {
    const ts = date.clone().startOf(granularity).format();
    return `${granularity}-${ts}`;
}
function removeEscapedCharacters(format) {
    return format.replace(/\[[^\]]*\]/g, ""); // remove everything within brackets
}
/**
 * XXX: When parsing dates that contain both week numbers and months,
 * Moment choses to ignore the week numbers. For the week dateUID, we
 * want the opposite behavior. Strip the MMM from the format to patch.
 */
function isFormatAmbiguous(format, granularity) {
    if (granularity === "week") {
        const cleanFormat = removeEscapedCharacters(format);
        return (/w{1,2}/i.test(cleanFormat) &&
            (/M{1,4}/.test(cleanFormat) || /D{1,4}/.test(cleanFormat)));
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
        month: getMonthlyNoteSettings,
        quarter: getQuarterlyNoteSettings,
        year: getYearlyNoteSettings,
    };
    const format = getSettings[granularity]().format.split("/").pop();
    const noteDate = window.moment(filename, format, true);
    if (!noteDate.isValid()) {
        return null;
    }
    if (isFormatAmbiguous(format, granularity)) {
        if (granularity === "week") {
            const cleanFormat = removeEscapedCharacters(format);
            if (/w{1,2}/i.test(cleanFormat)) {
                return window.moment(filename, 
                // If format contains week, remove day & month formatting
                format.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""), false);
            }
        }
    }
    return noteDate;
}

class DailyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createDailyNote(date) {
    const app = window.app;
    const { vault } = app;
    const moment = window.moment;
    const { template, format, folder } = getDailyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*yesterday\s*}}/gi, date.clone().subtract(1, "day").format(format))
            .replace(/{{\s*tomorrow\s*}}/gi, date.clone().add(1, "d").format(format)));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getDailyNote(date, dailyNotes) {
    return dailyNotes[getDateUID(date, "day")] ?? null;
}
function getAllDailyNotes() {
    /**
     * Find all daily notes in the daily note folder
     */
    const { vault } = window.app;
    const { folder } = getDailyNoteSettings();
    const dailyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
    }
    const dailyNotes = {};
    obsidian__default["default"].Vault.recurseChildren(dailyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "day");
            if (date) {
                const dateString = getDateUID(date, "day");
                dailyNotes[dateString] = note;
            }
        }
    });
    return dailyNotes;
}

class WeeklyNotesFolderMissingError extends Error {
}
function getDaysOfWeek() {
    const { moment } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let weekStart = moment.localeData()._week.dow;
    const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
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
    const { template, format, folder } = getWeeklyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*title\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, (_, dayOfWeek, momentFormat) => {
            const day = getDayOfWeekNumericalValue(dayOfWeek);
            return date.weekday(day).format(momentFormat.trim());
        }));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
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
    const weeklyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(weeklyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "week");
            if (date) {
                const dateString = getDateUID(date, "week");
                weeklyNotes[dateString] = note;
            }
        }
    });
    return weeklyNotes;
}

class MonthlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createMonthlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getMonthlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
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
    const monthlyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!monthlyNotesFolder) {
        throw new MonthlyNotesFolderMissingError("Failed to find monthly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(monthlyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "month");
            if (date) {
                const dateString = getDateUID(date, "month");
                monthlyNotes[dateString] = note;
            }
        }
    });
    return monthlyNotes;
}

class QuarterlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createQuarterlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getQuarterlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getQuarterlyNote(date, quarterly) {
    return quarterly[getDateUID(date, "quarter")] ?? null;
}
function getAllQuarterlyNotes() {
    const quarterly = {};
    if (!appHasQuarterlyNotesPluginLoaded()) {
        return quarterly;
    }
    const { vault } = window.app;
    const { folder } = getQuarterlyNoteSettings();
    const quarterlyFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!quarterlyFolder) {
        throw new QuarterlyNotesFolderMissingError("Failed to find quarterly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(quarterlyFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "quarter");
            if (date) {
                const dateString = getDateUID(date, "quarter");
                quarterly[dateString] = note;
            }
        }
    });
    return quarterly;
}

class YearlyNotesFolderMissingError extends Error {
}
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
async function createYearlyNote(date) {
    const { vault } = window.app;
    const { template, format, folder } = getYearlyNoteSettings();
    const [templateContents, IFoldInfo] = await getTemplateInfo(template);
    const filename = date.format(format);
    const normalizedPath = await getNotePath(folder, filename);
    try {
        const createdFile = await vault.create(normalizedPath, templateContents
            .replace(/{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi, (_, _timeOrDate, calc, timeDelta, unit, momentFormat) => {
            const now = window.moment();
            const currentDate = date.clone().set({
                hour: now.get("hour"),
                minute: now.get("minute"),
                second: now.get("second"),
            });
            if (calc) {
                currentDate.add(parseInt(timeDelta, 10), unit);
            }
            if (momentFormat) {
                return currentDate.format(momentFormat.substring(1).trim());
            }
            return currentDate.format(format);
        })
            .replace(/{{\s*date\s*}}/gi, filename)
            .replace(/{{\s*time\s*}}/gi, window.moment().format("HH:mm"))
            .replace(/{{\s*title\s*}}/gi, filename));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.app.foldManager.save(createdFile, IFoldInfo);
        return createdFile;
    }
    catch (err) {
        console.error(`Failed to create file: '${normalizedPath}'`, err);
        new obsidian__default["default"].Notice("Unable to create new file.");
    }
}
function getYearlyNote(date, yearlyNotes) {
    return yearlyNotes[getDateUID(date, "year")] ?? null;
}
function getAllYearlyNotes() {
    const yearlyNotes = {};
    if (!appHasYearlyNotesPluginLoaded()) {
        return yearlyNotes;
    }
    const { vault } = window.app;
    const { folder } = getYearlyNoteSettings();
    const yearlyNotesFolder = vault.getAbstractFileByPath(obsidian__default["default"].normalizePath(folder));
    if (!yearlyNotesFolder) {
        throw new YearlyNotesFolderMissingError("Failed to find yearly notes folder");
    }
    obsidian__default["default"].Vault.recurseChildren(yearlyNotesFolder, (note) => {
        if (note instanceof obsidian__default["default"].TFile) {
            const date = getDateFromFile(note, "year");
            if (date) {
                const dateString = getDateUID(date, "year");
                yearlyNotes[dateString] = note;
            }
        }
    });
    return yearlyNotes;
}

function appHasDailyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyNotesPlugin = app.internalPlugins.plugins["daily-notes"];
    if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.daily?.enabled;
}
/**
 * XXX: "Weekly Notes" live in either the Calendar plugin or the periodic-notes plugin.
 * Check both until the weekly notes feature is removed from the Calendar plugin.
 */
function appHasWeeklyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (app.plugins.getPlugin("calendar")) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.weekly?.enabled;
}
function appHasMonthlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.monthly?.enabled;
}
function appHasQuarterlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.quarterly?.enabled;
}
function appHasYearlyNotesPluginLoaded() {
    const { app } = window;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && periodicNotes.settings?.yearly?.enabled;
}
function getPeriodicNoteSettings(granularity) {
    const getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings,
        quarter: getQuarterlyNoteSettings,
        year: getYearlyNoteSettings,
    }[granularity];
    return getSettings();
}
function createPeriodicNote(granularity, date) {
    const createFn = {
        day: createDailyNote,
        month: createMonthlyNote,
        week: createWeeklyNote,
    };
    return createFn[granularity](date);
}

exports.DEFAULT_DAILY_NOTE_FORMAT = DEFAULT_DAILY_NOTE_FORMAT;
exports.DEFAULT_MONTHLY_NOTE_FORMAT = DEFAULT_MONTHLY_NOTE_FORMAT;
exports.DEFAULT_QUARTERLY_NOTE_FORMAT = DEFAULT_QUARTERLY_NOTE_FORMAT;
exports.DEFAULT_WEEKLY_NOTE_FORMAT = DEFAULT_WEEKLY_NOTE_FORMAT;
exports.DEFAULT_YEARLY_NOTE_FORMAT = DEFAULT_YEARLY_NOTE_FORMAT;
exports.appHasDailyNotesPluginLoaded = appHasDailyNotesPluginLoaded;
exports.appHasMonthlyNotesPluginLoaded = appHasMonthlyNotesPluginLoaded;
exports.appHasQuarterlyNotesPluginLoaded = appHasQuarterlyNotesPluginLoaded;
exports.appHasWeeklyNotesPluginLoaded = appHasWeeklyNotesPluginLoaded;
exports.appHasYearlyNotesPluginLoaded = appHasYearlyNotesPluginLoaded;
exports.createDailyNote = createDailyNote;
exports.createMonthlyNote = createMonthlyNote;
exports.createPeriodicNote = createPeriodicNote;
exports.createQuarterlyNote = createQuarterlyNote;
exports.createWeeklyNote = createWeeklyNote;
exports.createYearlyNote = createYearlyNote;
exports.getAllDailyNotes = getAllDailyNotes;
exports.getAllMonthlyNotes = getAllMonthlyNotes;
exports.getAllQuarterlyNotes = getAllQuarterlyNotes;
exports.getAllWeeklyNotes = getAllWeeklyNotes;
exports.getAllYearlyNotes = getAllYearlyNotes;
exports.getDailyNote = getDailyNote;
exports.getDailyNoteSettings = getDailyNoteSettings;
exports.getDateFromFile = getDateFromFile;
exports.getDateFromPath = getDateFromPath;
exports.getDateUID = getDateUID;
exports.getMonthlyNote = getMonthlyNote;
exports.getMonthlyNoteSettings = getMonthlyNoteSettings;
exports.getPeriodicNoteSettings = getPeriodicNoteSettings;
exports.getQuarterlyNote = getQuarterlyNote;
exports.getQuarterlyNoteSettings = getQuarterlyNoteSettings;
exports.getTemplateInfo = getTemplateInfo;
exports.getWeeklyNote = getWeeklyNote;
exports.getWeeklyNoteSettings = getWeeklyNoteSettings;
exports.getYearlyNote = getYearlyNote;
exports.getYearlyNoteSettings = getYearlyNoteSettings;
});

var BlockUtils = /** @class */ (function () {
    function BlockUtils() {
    }
    BlockUtils.getBlock = function (editor, file) {
        var _a, _b;
        var cursor = editor.getCursor("to");
        var fileCache = app.metadataCache.getFileCache(file);
        var currentBlock = (_a = fileCache === null || fileCache === void 0 ? void 0 : fileCache.sections) === null || _a === void 0 ? void 0 : _a.find(function (section) {
            return section.position.start.line <= cursor.line &&
                section.position.end.line >= cursor.line;
        });
        if (currentBlock.type == "list") {
            currentBlock = (_b = fileCache.listItems) === null || _b === void 0 ? void 0 : _b.find(function (list) {
                if (list.position.start.line <= cursor.line &&
                    list.position.end.line >= cursor.line) {
                    return list;
                }
            });
        }
        return currentBlock;
    };
    BlockUtils.getIdOfBlock = function (editor, block) {
        var blockId = block.id;
        if (blockId) {
            return blockId;
        }
        // Add a block id
        var sectionEnd = block.position.end;
        var pos = {
            ch: sectionEnd.col,
            line: sectionEnd.line,
        };
        var newId = Math.random().toString(36).substring(2, 8);
        var spacer = BlockUtils.shouldInsertAfter(block) ? "\n\n" : " ";
        editor.replaceRange(spacer + "^" + newId, pos);
        return newId;
    };
    BlockUtils.shouldInsertAfter = function (block) {
        if (block.type) {
            return [
                "blockquote",
                "code",
                "table",
                "heading",
                "comment",
                "footnoteDefinition",
            ].includes(block.type);
        }
    };
    BlockUtils.getBlockId = function () {
        var view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (view) {
            var editor = view.editor;
            var file = view.file;
            var block = this.getBlock(editor, file);
            if (block)
                return this.getIdOfBlock(editor, block);
        }
    };
    return BlockUtils;
}());

var DEFAULT_SETTINGS = {
    openFileOnWrite: true,
    openDailyInNewPane: false,
    openFileOnWriteInNewPane: false,
    openFileWithoutWriteInNewPane: false,
    idField: "id",
    useUID: false,
    addFilepathWhenUsingUID: false,
};

//! All of these methods are taken from https://www.npmjs.com/package/obsidian-daily-notes-interface.
function join() {
    var partSegments = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        partSegments[_i] = arguments[_i];
    }
    // Split the inputs into a list of path commands.
    var parts = [];
    for (var i = 0, l = partSegments.length; i < l; i++) {
        parts = parts.concat(partSegments[i].split("/"));
    }
    // Interpret the path commands to get the new resolved path.
    var newParts = [];
    for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        // Remove leading and trailing slashes
        // Also remove "." segments
        if (!part || part === ".")
            continue;
        // Push new path segments.
        else
            newParts.push(part);
    }
    // Preserve the initial slash if there was one.
    if (parts[0] === "")
        newParts.unshift("");
    // Turn back into a single string path.
    return newParts.join("/");
}
function getNotePath(directory, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!filename.endsWith(".md")) {
                        filename += ".md";
                    }
                    path = obsidian.normalizePath(join(directory, filename));
                    return [4 /*yield*/, ensureFolderExists(path)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, path];
            }
        });
    });
}
function ensureFolderExists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirs = path.replace(/\\/g, "/").split("/");
                    dirs.pop(); // remove basename
                    if (!dirs.length) return [3 /*break*/, 2];
                    dir = join.apply(void 0, dirs);
                    if (!!window.app.vault.getAbstractFileByPath(dir)) return [3 /*break*/, 2];
                    return [4 /*yield*/, window.app.vault.createFolder(dir)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function getDailyNotePath(date) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, format, folder, filename, normalizedPath;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = main.getDailyNoteSettings(), format = _a.format, folder = _a.folder;
                    filename = date.format(format);
                    return [4 /*yield*/, getNotePath(folder, filename)];
                case 1:
                    normalizedPath = _b.sent();
                    return [2 /*return*/, normalizedPath];
            }
        });
    });
}

var EnterDataModal = /** @class */ (function (_super) {
    __extends(EnterDataModal, _super);
    function EnterDataModal(plugin, file) {
        var _this = _super.call(this, plugin.app) || this;
        _this.file = file;
        //null if for normal write mode, its not associated with a special mode like "append" or "prepend"
        _this.modes = [null, "overwrite", "append", "prepend"];
        _this.plugin = plugin;
        _this.setPlaceholder("Type your data to be written to the file or leave it empty to just open it");
        return _this;
    }
    EnterDataModal.prototype.getSuggestions = function (query) {
        var _this = this;
        if (query == "")
            query = null;
        var suggestions = [];
        var _loop_1 = function (mode) {
            if (!(mode === "overwrite" && !query)) {
                var display = void 0;
                if (query) {
                    if (mode) {
                        display = "Write \"" + query + "\" in " + mode + " mode";
                    }
                    else {
                        display = "Write \"" + query + "\"";
                    }
                }
                else {
                    if (mode) {
                        display = "Open in " + mode + " mode";
                    }
                    else {
                        display = "Open";
                    }
                }
                suggestions.push({
                    data: query,
                    display: display,
                    mode: mode,
                    func: function () {
                        if (_this.file) {
                            _this.plugin.tools.copyURI({
                                filepath: _this.file,
                                data: query,
                                mode: mode
                            });
                        }
                        else {
                            _this.plugin.tools.copyURI({
                                daily: "true",
                                data: query,
                                mode: mode
                            });
                        }
                    }
                });
            }
        };
        for (var _i = 0, _a = this.modes; _i < _a.length; _i++) {
            var mode = _a[_i];
            _loop_1(mode);
        }
        return suggestions;
    };
    EnterDataModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value.display;
    };
    EnterDataModal.prototype.onChooseSuggestion = function (item, _) {
        item.func();
    };
    return EnterDataModal;
}(obsidian.SuggestModal));

var FileModal = /** @class */ (function (_super) {
    __extends(FileModal, _super);
    function FileModal(plugin, placeHolder, allowNoFile) {
        if (allowNoFile === void 0) { allowNoFile = true; }
        var _this = _super.call(this, plugin.app) || this;
        _this.placeHolder = placeHolder;
        _this.allowNoFile = allowNoFile;
        _this.plugin = plugin;
        _this.setPlaceholder(_this.placeHolder);
        return _this;
    }
    FileModal.prototype.getItems = function () {
        var specialItems = [];
        if (this.allowNoFile) {
            specialItems.push({ display: "<Don't specify a file>", source: undefined });
        }
        var file = this.app.workspace.getActiveFile();
        if (file) {
            specialItems.push({ display: "<Current file>", source: file.path });
        }
        return __spreadArray(__spreadArray([], specialItems), this.app.vault.getFiles().map(function (e) { return { display: e.path, source: e.path }; }));
    };
    FileModal.prototype.getItemText = function (item) {
        return item.display;
    };
    FileModal.prototype.onChooseItem = function (item, evt) {
    };
    return FileModal;
}(obsidian.FuzzySuggestModal));

function getViewStateFromMode(parameters) {
    return parameters.viewmode ? { state: { mode: parameters.viewmode } } : undefined;
}
function copyText(text) {
    return navigator.clipboard.writeText(text);
}
function getAlternativeFilePath(file) {
    var _a;
    var dir = (_a = file.parent) === null || _a === void 0 ? void 0 : _a.path;
    var formattedDir = dir === "/" ? "" : dir;
    var name = file.name;
    for (var index = 1; index < 100; index++) {
        var base = stripMD(name);
        var alternative = formattedDir + (formattedDir == "" ? "" : "/") + base + (" " + index + ".md");
        var exists = app.vault.getAbstractFileByPath(alternative) !== null;
        if (!exists) {
            return alternative;
        }
    }
}
function getFileUri(file) {
    var url = new URL(app.vault.getResourcePath(file));
    url.host = "localhosthostlocal";
    url.protocol = "file";
    url.search = "";
    url.pathname = decodeURIComponent(url.pathname);
    var res = url.toString().replace("/localhosthostlocal/", "/");
    return res;
}
function getEndAndBeginningOfHeading(file, heading) {
    var _a, _b;
    var cache = app.metadataCache.getFileCache(file);
    var sections = cache.sections;
    var foundHeading = (_a = cache.headings) === null || _a === void 0 ? void 0 : _a.find(function (e) { return e.heading === heading; });
    if (foundHeading) {
        var foundSectionIndex = sections.findIndex(function (section) { return section.type === "heading" && section.position.start.line === foundHeading.position.start.line; });
        var restSections = sections.slice(foundSectionIndex + 1);
        var nextHeadingIndex = restSections === null || restSections === void 0 ? void 0 : restSections.findIndex(function (e) { return e.type === "heading"; });
        var lastSection = (_b = restSections[(nextHeadingIndex !== -1 ? nextHeadingIndex : restSections.length) - 1]) !== null && _b !== void 0 ? _b : sections[foundSectionIndex];
        var lastLine = lastSection.position.end.line + 1;
        return { "lastLine": lastLine, "firstLine": sections[foundSectionIndex].position.end.line + 1 };
    }
    else {
        new obsidian.Notice("Can't find heading");
    }
}

var Handlers = /** @class */ (function () {
    function Handlers(plugin) {
        this.plugin = plugin;
    }
    Object.defineProperty(Handlers.prototype, "tools", {
        get: function () {
            return this.plugin.tools;
        },
        enumerable: false,
        configurable: true
    });
    Handlers.prototype.handlePluginManagement = function (parameters) {
        if (parameters["enable-plugin"]) {
            var pluginId = parameters["enable-plugin"];
            app.plugins.enablePluginAndSave(pluginId);
            new obsidian.Notice("Enabled " + pluginId);
        }
        else if (parameters["disable-plugin"]) {
            var pluginId = parameters["disable-plugin"];
            app.plugins.disablePluginAndSave(pluginId);
            new obsidian.Notice("Disabled " + pluginId);
        }
    };
    Handlers.prototype.handleFrontmatterKey = function (parameters) {
        var _a;
        var key = parameters.frontmatterkey;
        var frontmatter = app.metadataCache.getCache((_a = parameters.filepath) !== null && _a !== void 0 ? _a : app.workspace.getActiveFile().path).frontmatter;
        var res;
        if (key.startsWith("[") && key.endsWith("]")) {
            var list = key.substring(1, key.length - 1).split(",");
            var cache = frontmatter;
            var _loop_1 = function (item) {
                if (cache instanceof Array) {
                    var index = parseInt(item);
                    if (Number.isNaN(index)) {
                        cache = cache.find(function (e) { return e == item; });
                    }
                    cache = cache[parseInt(item)];
                }
                else {
                    cache = cache[item];
                }
            };
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var item = list_1[_i];
                _loop_1(item);
            }
            res = cache;
        }
        else {
            res = frontmatter[key];
        }
        copyText(res);
    };
    Handlers.prototype.handleWorkspace = function (parameters) {
        var _a, _b;
        var workspaces = (_b = (_a = app.internalPlugins) === null || _a === void 0 ? void 0 : _a.plugins) === null || _b === void 0 ? void 0 : _b.workspaces;
        if (!workspaces) {
            new obsidian.Notice("Cannot find Workspaces plugin. Please file an issue.");
            this.plugin.failure(parameters);
        }
        else if (workspaces.enabled) {
            if (parameters.saveworkspace == "true") {
                var active = workspaces.instance.activeWorkspace;
                workspaces.instance.saveWorkspace(active);
                new obsidian.Notice("Saved current workspace to " + active);
            }
            if (parameters.workspace != undefined) {
                workspaces.instance.loadWorkspace(parameters.workspace);
            }
            this.plugin.success(parameters);
        }
        else {
            new obsidian.Notice("Workspaces plugin is not enabled");
            this.plugin.failure(parameters);
        }
    };
    Handlers.prototype.handleCommand = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var file, view, editor, data, lines, rawCommands, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parameters.filepath) return [3 /*break*/, 6];
                        if (!parameters.mode) return [3 /*break*/, 2];
                        if (parameters.mode == "new") {
                            file = app.metadataCache.getFirstLinkpathDest(parameters.filepath, "/");
                            if (file instanceof obsidian.TFile) {
                                parameters.filepath = getAlternativeFilePath(file);
                            }
                        }
                        return [4 /*yield*/, this.plugin.open({ file: parameters.filepath, mode: "source", parameters: parameters })];
                    case 1:
                        _a.sent();
                        view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (view) {
                            editor = view.editor;
                            data = editor.getValue();
                            if (parameters.mode === "append") {
                                editor.setValue(data + "\n");
                                lines = editor.lineCount();
                                editor.setCursor({ ch: 0, line: lines });
                            }
                            else if (parameters.mode === "prepend") {
                                editor.setValue("\n" + data);
                                editor.setCursor({ ch: 0, line: 0 });
                            }
                            else if (parameters.mode === "overwrite") {
                                editor.setValue("");
                            }
                        }
                        return [3 /*break*/, 6];
                    case 2:
                        if (!parameters.line) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.plugin.open({ file: parameters.filepath, mode: "source", parameters: parameters })];
                    case 3:
                        _a.sent();
                        this.plugin.setCursorInLine(parameters.line);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.plugin.open({ file: parameters.filepath, setting: this.plugin.settings.openFileWithoutWriteInNewPane, parameters: parameters })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (parameters.commandid) {
                            app.commands.executeCommandById(parameters.commandid);
                        }
                        else if (parameters.commandname) {
                            rawCommands = app.commands.commands;
                            for (command in rawCommands) {
                                if (rawCommands[command].name === parameters.commandname) {
                                    if (rawCommands[command].callback) {
                                        rawCommands[command].callback();
                                    }
                                    else {
                                        rawCommands[command].checkCallback(false);
                                    }
                                    break;
                                }
                            }
                        }
                        this.plugin.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleDoesFileExist = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.vault.adapter.exists(parameters.filepath)];
                    case 1:
                        exists = _a.sent();
                        copyText((exists ? 1 : 0).toString());
                        this.plugin.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleSearchAndReplace = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var file, abstractFile, data, _a, pattern, flags, regex;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (parameters.filepath) {
                            abstractFile = app.vault.getAbstractFileByPath(parameters.filepath);
                            if (abstractFile instanceof obsidian.TFile) {
                                file = abstractFile;
                            }
                        }
                        else {
                            file = app.workspace.getActiveFile();
                        }
                        if (!file) return [3 /*break*/, 3];
                        return [4 /*yield*/, app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        if (parameters.searchregex) {
                            try {
                                _a = parameters.searchregex.match(/(\/?)(.+)\1([a-z]*)/i), pattern = _a[2], flags = _a[3];
                                regex = new RegExp(pattern, flags);
                                data = data.replace(regex, parameters.replace);
                                this.plugin.success(parameters);
                            }
                            catch (error) {
                                new obsidian.Notice("Can't parse " + parameters.searchregex + " as RegEx");
                                this.plugin.failure(parameters);
                            }
                        }
                        else {
                            data = data.replaceAll(parameters.search, parameters.replace);
                            this.plugin.success(parameters);
                        }
                        return [4 /*yield*/, this.plugin.writeAndOpenFile(file.path, data, parameters)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        new obsidian.Notice("Cannot find file");
                        this.plugin.failure(parameters);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleSearch = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var view, search;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!parameters.filepath) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.plugin.open({ file: parameters.filepath, parameters: parameters })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        view = app.workspace.getActiveViewOfType(obsidian.FileView);
                        view.currentMode.showSearch();
                        search = view.currentMode.search;
                        search.searchInputEl.value = parameters.search;
                        search.searchInputEl.dispatchEvent(new Event("input"));
                        return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleWrite = function (parameters, createdDailyNote) {
        var _a;
        if (createdDailyNote === void 0) { createdDailyNote = false; }
        return __awaiter(this, void 0, void 0, function () {
            var file, outFile, path;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (parameters.filepath) {
                            file = app.vault.getAbstractFileByPath(parameters.filepath);
                        }
                        else {
                            file = app.workspace.getActiveFile();
                        }
                        if (!(parameters.filepath || file)) return [3 /*break*/, 21];
                        outFile = void 0;
                        path = (_a = parameters.filepath) !== null && _a !== void 0 ? _a : file.path;
                        if (!(parameters.mode === "overwrite")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.plugin.writeAndOpenFile(path, parameters.data, parameters)];
                    case 1:
                        outFile = _b.sent();
                        this.plugin.success(parameters);
                        return [3 /*break*/, 20];
                    case 2:
                        if (!(parameters.mode === "prepend")) return [3 /*break*/, 7];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.plugin.prepend(file, parameters)];
                    case 3:
                        outFile = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.plugin.prepend(path, parameters)];
                    case 5:
                        outFile = _b.sent();
                        _b.label = 6;
                    case 6:
                        this.plugin.success(parameters);
                        return [3 /*break*/, 20];
                    case 7:
                        if (!(parameters.mode === "append")) return [3 /*break*/, 12];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.plugin.append(file, parameters)];
                    case 8:
                        outFile = _b.sent();
                        return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, this.plugin.append(path, parameters)];
                    case 10:
                        outFile = _b.sent();
                        _b.label = 11;
                    case 11:
                        this.plugin.success(parameters);
                        return [3 /*break*/, 20];
                    case 12:
                        if (!(parameters.mode === "new")) return [3 /*break*/, 17];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.plugin.writeAndOpenFile(getAlternativeFilePath(file), parameters.data, parameters)];
                    case 13:
                        outFile = _b.sent();
                        this.plugin.hookSuccess(parameters, outFile);
                        return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, this.plugin.writeAndOpenFile(path, parameters.data, parameters)];
                    case 15:
                        outFile = _b.sent();
                        this.plugin.hookSuccess(parameters, outFile);
                        _b.label = 16;
                    case 16: return [3 /*break*/, 20];
                    case 17:
                        if (!(!createdDailyNote && file instanceof obsidian.TFile)) return [3 /*break*/, 18];
                        new obsidian.Notice("File already exists");
                        this.plugin.openExistingFileAndSetCursor(file.path, parameters);
                        this.plugin.failure(parameters);
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, this.plugin.writeAndOpenFile(path, parameters.data, parameters)];
                    case 19:
                        outFile = _b.sent();
                        this.plugin.success(parameters);
                        _b.label = 20;
                    case 20:
                        if (parameters.uid) {
                            this.tools.writeUIDToFile(outFile, parameters.uid);
                        }
                        return [3 /*break*/, 22];
                    case 21:
                        new obsidian.Notice("Cannot find file");
                        this.plugin.failure(parameters);
                        _b.label = 22;
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleOpen = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened, leaf, viewState, view, cache, heading, view, cache, block, view;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileIsAlreadyOpened = false;
                        app.workspace.iterateAllLeaves(function (leaf) {
                            var _a;
                            if (((_a = leaf.view.file) === null || _a === void 0 ? void 0 : _a.path) === parameters.filepath) {
                                if (fileIsAlreadyOpened && leaf.width == 0)
                                    return;
                                fileIsAlreadyOpened = true;
                                app.workspace.setActiveLeaf(leaf, { focus: true });
                            }
                        });
                        if (!fileIsAlreadyOpened) return [3 /*break*/, 2];
                        leaf = app.workspace.activeLeaf;
                        if (!(parameters.viewmode != undefined)) return [3 /*break*/, 2];
                        viewState = leaf.getViewState();
                        viewState.state.mode = parameters.viewmode;
                        if (viewState.state.source != undefined)
                            viewState.state.source = parameters.viewmode == "source";
                        return [4 /*yield*/, leaf.setViewState(viewState)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(parameters.heading != undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.plugin.open({
                                file: parameters.filepath + "#" + parameters.heading,
                                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                                parameters: parameters,
                                supportPopover: false,
                            })];
                    case 3:
                        _a.sent();
                        view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view)
                            return [2 /*return*/];
                        cache = app.metadataCache.getFileCache(view.file);
                        heading = cache.headings.find(function (e) { return e.heading === parameters.heading; });
                        view.editor.focus();
                        view.editor.setCursor({ line: heading.position.start.line + 1, ch: 0 });
                        return [3 /*break*/, 9];
                    case 4:
                        if (!(parameters.block != undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.plugin.open({
                                file: parameters.filepath + "#^" + parameters.block,
                                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                                parameters: parameters,
                                supportPopover: false,
                            })];
                    case 5:
                        _a.sent();
                        view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view)
                            return [2 /*return*/];
                        cache = app.metadataCache.getFileCache(view.file);
                        block = cache.blocks[parameters.block];
                        view.editor.focus();
                        view.editor.setCursor({ line: block.position.start.line, ch: 0 });
                        return [3 /*break*/, 9];
                    case 6:
                        if (!!fileIsAlreadyOpened) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.plugin.open({
                                file: parameters.filepath,
                                setting: this.plugin.settings.openFileWithoutWriteInNewPane,
                                parameters: parameters,
                                mode: parameters.line != undefined ? "source" : undefined
                            })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (parameters.line != undefined) {
                            this.plugin.setCursorInLine(parameters.line);
                        }
                        _a.label = 9;
                    case 9:
                        if (!(parameters.mode != undefined)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.plugin.setCursor(parameters.mode)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        if (parameters.uid) {
                            view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                            this.tools.writeUIDToFile(view.file, parameters.uid);
                        }
                        this.plugin.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    Handlers.prototype.handleCopyFileURI = function (withoutData, file) {
        var _this = this;
        var view = app.workspace.getActiveViewOfType(obsidian.FileView);
        if (!view && !file)
            return;
        if (view instanceof obsidian.MarkdownView) {
            var pos = view.editor.getCursor();
            var cache = app.metadataCache.getFileCache(view.file);
            if (cache.headings) {
                for (var _i = 0, _a = cache.headings; _i < _a.length; _i++) {
                    var heading = _a[_i];
                    if (heading.position.start.line <= pos.line && heading.position.end.line >= pos.line) {
                        this.tools.copyURI({
                            filepath: view.file.path,
                            heading: heading.heading
                        });
                        return;
                    }
                }
            }
            if (cache.blocks) {
                for (var _b = 0, _c = Object.keys(cache.blocks); _b < _c.length; _b++) {
                    var blockID = _c[_b];
                    var block = cache.blocks[blockID];
                    if (block.position.start.line <= pos.line && block.position.end.line >= pos.line) {
                        this.tools.copyURI({
                            filepath: view.file.path,
                            block: blockID
                        });
                        return;
                    }
                }
            }
        }
        if (withoutData) {
            var file2 = file !== null && file !== void 0 ? file : app.workspace.getActiveFile();
            if (!file2) {
                new obsidian.Notice("No file opened");
                return;
            }
            this.tools.copyURI({
                filepath: file2.path,
            });
        }
        else {
            var fileModal = new FileModal(this.plugin, "Choose a file", false);
            fileModal.open();
            fileModal.onChooseItem = function (item, _) {
                new EnterDataModal(_this.plugin, item.source).open();
            };
        }
    };
    Handlers.prototype.handleOpenSettings = function (parameters) {
        if (app.setting.containerEl.parentElement === null) {
            app.setting.open();
        }
        if (parameters.settingid == "plugin-browser") {
            app.setting.openTabById("community-plugins");
            app.setting.activeTab.containerEl.find(".mod-cta").click();
        }
        else if (parameters.settingid == "theme-browser") {
            app.setting.openTabById("appearance");
            app.setting.activeTab.containerEl.find(".mod-cta").click();
        }
        else {
            app.setting.openTabById(parameters.settingid);
        }
        this.plugin.success(parameters);
    };
    Handlers.prototype.handleUpdatePlugins = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters.settingid = "community-plugins";
                        this.handleOpenSettings(parameters);
                        app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
                        new obsidian.Notice("Waiting 10 seconds");
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10 * 1000); })];
                    case 1:
                        _a.sent();
                        if (Object.keys(app.plugins.updates).length !== 0) {
                            app.setting.activeTab.containerEl.findAll(".mod-cta").last().click();
                        }
                        this.plugin.success(parameters);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Handlers;
}());

var CommandModal = /** @class */ (function (_super) {
    __extends(CommandModal, _super);
    function CommandModal(plugin, file) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.file = file;
        return _this;
    }
    CommandModal.prototype.getItems = function () {
        var rawCommands = this.app.commands.commands;
        var commands = Object.keys(rawCommands).map(function (e) {
            return { id: rawCommands[e].id, name: rawCommands[e].name };
        });
        return commands;
    };
    CommandModal.prototype.getItemText = function (item) {
        return item.name;
    };
    CommandModal.prototype.onChooseItem = function (item, _) {
        this.plugin.tools.copyURI({
            filepath: this.file,
            commandid: item.id
        });
    };
    return CommandModal;
}(obsidian.FuzzySuggestModal));

var ReplaceModal = /** @class */ (function (_super) {
    __extends(ReplaceModal, _super);
    function ReplaceModal(plugin, search, filepath) {
        var _this = _super.call(this, plugin.app) || this;
        _this.search = search;
        _this.filepath = filepath;
        _this.emptyText = "Empty text (replace with nothing)";
        _this.plugin = plugin;
        _this.setPlaceholder("Replacement text");
        return _this;
    }
    ReplaceModal.prototype.getSuggestions = function (query) {
        if (query === "") {
            query = this.emptyText;
        }
        return [query];
    };
    ReplaceModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value;
    };
    ReplaceModal.prototype.onChooseSuggestion = function (item, _) {
        if (this.search.isRegEx) {
            this.plugin.tools.copyURI({
                filepath: this.filepath,
                searchregex: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        }
        else {
            this.plugin.tools.copyURI({
                filepath: this.filepath,
                search: this.search.source,
                replace: item == this.emptyText ? "" : item
            });
        }
    };
    return ReplaceModal;
}(obsidian.SuggestModal));

var SearchModal = /** @class */ (function (_super) {
    __extends(SearchModal, _super);
    function SearchModal(plugin) {
        var _this = _super.call(this, plugin.app) || this;
        _this.plugin = plugin;
        _this.setPlaceholder("Searched text. RegEx is supported");
        return _this;
    }
    SearchModal.prototype.getSuggestions = function (query) {
        if (query === "") {
            query = "...";
        }
        var regex;
        try {
            regex = new RegExp(query);
        }
        catch (error) { }
        return [
            {
                source: query,
                isRegEx: false,
                display: query
            },
            {
                source: query,
                display: regex ? "As RegEx: " + query : "Can't parse RegEx",
                isRegEx: true
            }
        ];
    };
    SearchModal.prototype.renderSuggestion = function (value, el) {
        el.innerText = value.display;
    };
    SearchModal.prototype.onChooseSuggestion = function (item, _) {
    };
    return SearchModal;
}(obsidian.SuggestModal));

var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });
        new obsidian.Setting(containerEl)
            .setName("Open file on write")
            .addToggle(function (cb) { return cb
            .setValue(_this.plugin.settings.openFileOnWrite)
            .onChange(function (value) {
            _this.plugin.settings.openFileOnWrite = value;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Open file on write in a new pane")
            .setDisabled(this.plugin.settings.openFileOnWrite)
            .addToggle(function (cb) { return cb
            .setValue(_this.plugin.settings.openFileOnWriteInNewPane)
            .onChange(function (value) {
            _this.plugin.settings.openFileOnWriteInNewPane = value;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Open daily note in a new pane")
            .addToggle(function (cb) { return cb
            .setValue(_this.plugin.settings.openDailyInNewPane)
            .onChange(function (value) {
            _this.plugin.settings.openDailyInNewPane = value;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Open file without write in new pane")
            .addToggle(function (cb) { return cb
            .setValue(_this.plugin.settings.openFileWithoutWriteInNewPane)
            .onChange(function (value) {
            _this.plugin.settings.openFileWithoutWriteInNewPane = value;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Use UID instead of file paths")
            .addToggle(function (cb) { return cb
            .setValue(_this.plugin.settings.useUID)
            .onChange(function (value) {
            _this.plugin.settings.useUID = value;
            _this.plugin.saveSettings();
            _this.display();
        }); });
        if (this.plugin.settings.useUID) {
            new obsidian.Setting(containerEl)
                .setName("Add filepath parameter")
                .setDesc("When using UID instead of file paths, you can still add the filepath parameter to know what this URI is about. It's NOT actually used.")
                .addToggle(function (cb) { return cb
                .setValue(_this.plugin.settings.addFilepathWhenUsingUID)
                .onChange(function (value) {
                _this.plugin.settings.addFilepathWhenUsingUID = value;
                _this.plugin.saveSettings();
            }); });
        }
        new obsidian.Setting(containerEl)
            .setName("UID field in frontmatter")
            .addText(function (cb) { return cb
            .setValue(_this.plugin.settings.idField)
            .onChange(function (value) {
            _this.plugin.settings.idField = value;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Donate')
            .setDesc('If you like this Plugin, consider donating to support continued development.')
            .addButton(function (bt) {
            bt.buttonEl.outerHTML = "<a href='https://ko-fi.com/F1F195IQ5' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>";
        });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

/**
 * These methods depend on the plugins settings in contrast to the utils.ts file, which's functions are independent of the plugins settings.
 */
var Tools = /** @class */ (function () {
    function Tools(plugin) {
        this.plugin = plugin;
    }
    Object.defineProperty(Tools.prototype, "settings", {
        get: function () {
            return this.plugin.settings;
        },
        enumerable: false,
        configurable: true
    });
    Tools.prototype.writeUIDToFile = function (file, uid) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var frontmatter, fileContent, isYamlEmpty, splitContent, newFileContent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        frontmatter = (_a = app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter;
                        return [4 /*yield*/, app.vault.read(file)];
                    case 1:
                        fileContent = _b.sent();
                        isYamlEmpty = ((!frontmatter || frontmatter.length === 0) && !fileContent.match(/^-{3}\s*\n*\r*-{3}/));
                        splitContent = fileContent.split("\n");
                        if (isYamlEmpty) {
                            splitContent.unshift("---");
                            splitContent.unshift(this.plugin.settings.idField + ": " + uid);
                            splitContent.unshift("---");
                        }
                        else {
                            splitContent.splice(1, 0, this.plugin.settings.idField + ": " + uid);
                        }
                        newFileContent = splitContent.join("\n");
                        return [4 /*yield*/, app.vault.modify(file, newFileContent)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, uid];
                }
            });
        });
    };
    Tools.prototype.getUIDFromFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var cache, i, uid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i <= 20)) return [3 /*break*/, 4];
                        cache = app.metadataCache.getFileCache(file);
                        if (cache !== undefined)
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        uid = obsidian.parseFrontMatterEntry(cache.frontmatter, this.plugin.settings.idField);
                        if (uid != undefined)
                            return [2 /*return*/, uid];
                        return [4 /*yield*/, this.writeUIDToFile(file, v4())];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Tools.prototype.generateURI = function (parameters, doubleEncode) {
        return __awaiter(this, void 0, void 0, function () {
            var prefix, suffix, file, _a, parameter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        prefix = "obsidian://advanced-uri?vault=" + encodeURIComponent(app.vault.getName());
                        suffix = "";
                        file = app.vault.getAbstractFileByPath(parameters.filepath);
                        if (!(this.settings.useUID && file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        if (!this.settings.addFilepathWhenUsingUID)
                            parameters.filepath = undefined;
                        _a = parameters;
                        return [4 /*yield*/, this.getUIDFromFile(file)];
                    case 1:
                        _a.uid = _b.sent();
                        _b.label = 2;
                    case 2:
                        for (parameter in parameters) {
                            if (parameters[parameter] != undefined) {
                                suffix = suffix + ("&" + parameter + "=" + encodeURIComponent(parameters[parameter]));
                            }
                        }
                        if (doubleEncode) {
                            return [2 /*return*/, prefix + encodeURI(suffix)];
                        }
                        else {
                            return [2 /*return*/, prefix + suffix];
                        }
                }
            });
        });
    };
    Tools.prototype.copyURI = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var uri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generateURI(parameters, true)];
                    case 1:
                        uri = _a.sent();
                        return [4 /*yield*/, copyText(uri)];
                    case 2:
                        _a.sent();
                        new obsidian.Notice("Advanced URI copied to your clipboard");
                        return [2 /*return*/];
                }
            });
        });
    };
    return Tools;
}());

var AdvancedURI = /** @class */ (function (_super) {
    __extends(AdvancedURI, _super);
    function AdvancedURI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlers = new Handlers(_this);
        _this.tools = new Tools(_this);
        return _this;
    }
    AdvancedURI.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new SettingsTab(this.app, this));
                        this.addCommand({
                            id: "copy-uri-current-file",
                            name: "copy URI for file with options",
                            callback: function () { return _this.handlers.handleCopyFileURI(false); }
                        });
                        this.addCommand({
                            id: "copy-uri-current-file-simple",
                            name: "copy URI for current file",
                            callback: function () { return _this.handlers.handleCopyFileURI(true); }
                        });
                        this.addCommand({
                            id: "copy-uri-daily",
                            name: "copy URI for daily note",
                            callback: function () { return new EnterDataModal(_this).open(); }
                        });
                        this.addCommand({
                            id: "copy-uri-search-and-replace",
                            name: "copy URI for search and replace",
                            callback: function () {
                                var fileModal = new FileModal(_this, "Used file for search and replace");
                                fileModal.open();
                                fileModal.onChooseItem = function (filePath) {
                                    var searchModal = new SearchModal(_this);
                                    searchModal.open();
                                    searchModal.onChooseSuggestion = function (item) {
                                        new ReplaceModal(_this, item, filePath === null || filePath === void 0 ? void 0 : filePath.source).open();
                                    };
                                };
                            },
                        });
                        this.addCommand({
                            id: "copy-uri-command",
                            name: "copy URI for command",
                            callback: function () {
                                var fileModal = new FileModal(_this, "Select a file to be opened before executing the command");
                                fileModal.open();
                                fileModal.onChooseItem = function (item) {
                                    new CommandModal(_this, item === null || item === void 0 ? void 0 : item.source).open();
                                };
                            }
                        });
                        this.addCommand({
                            id: "copy-uri-block",
                            name: "copy URI for current block",
                            checkCallback: function (checking) {
                                var view = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                                if (checking)
                                    return view != undefined;
                                var id = BlockUtils.getBlockId();
                                if (id) {
                                    _this.tools.copyURI({
                                        filepath: view.file.path,
                                        block: id
                                    });
                                }
                            }
                        });
                        this.registerObsidianProtocolHandler("advanced-uri", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var parameters, createdDailyNote, parameter, res, file, parentFolder, parentFolderPath, index, extension, moment_1, allDailyNotes, dailyNote, _a, _b;
                            var _this = this;
                            var _c, _d, _e;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        parameters = e;
                                        createdDailyNote = false;
                                        for (parameter in parameters) {
                                            parameters[parameter] = decodeURIComponent(parameters[parameter]);
                                        }
                                        this.lastParameters = __assign({}, parameters);
                                        if (parameters.uid) {
                                            res = (_c = this.getFileFromUID(parameters.uid)) === null || _c === void 0 ? void 0 : _c.path;
                                            if (res != undefined) {
                                                parameters.filepath = res;
                                                parameters.uid = undefined;
                                            }
                                        }
                                        else if (parameters.filename) {
                                            file = this.app.metadataCache.getFirstLinkpathDest(parameters.filename, "");
                                            if (!file) {
                                                file = this.app.vault.getMarkdownFiles().find(function (file) { var _a; return (_a = obsidian.parseFrontMatterAliases(_this.app.metadataCache.getFileCache(file).frontmatter)) === null || _a === void 0 ? void 0 : _a.includes(parameters.filename); });
                                            }
                                            parentFolder = this.app.fileManager.getNewFileParent((_d = this.app.workspace.activeLeaf.view.file) === null || _d === void 0 ? void 0 : _d.path);
                                            parentFolderPath = parentFolder.isRoot() ? "" : parentFolder.path + "/";
                                            parameters.filepath = (_e = file === null || file === void 0 ? void 0 : file.path) !== null && _e !== void 0 ? _e : (parentFolderPath + obsidian.normalizePath(parameters.filename));
                                        }
                                        if (!parameters.filepath) return [3 /*break*/, 1];
                                        parameters.filepath = obsidian.normalizePath(parameters.filepath);
                                        index = parameters.filepath.lastIndexOf(".");
                                        extension = parameters.filepath.substring(index < 0 ? parameters.filepath.length : index);
                                        if (extension === "") {
                                            parameters.filepath = parameters.filepath + ".md";
                                        }
                                        return [3 /*break*/, 7];
                                    case 1:
                                        if (!(parameters.daily === "true")) return [3 /*break*/, 7];
                                        if (!main.appHasDailyNotesPluginLoaded()) {
                                            new obsidian.Notice("Daily notes plugin is not loaded");
                                            return [2 /*return*/];
                                        }
                                        moment_1 = window.moment(Date.now());
                                        allDailyNotes = main.getAllDailyNotes();
                                        dailyNote = main.getDailyNote(moment_1, allDailyNotes);
                                        if (!!dailyNote) return [3 /*break*/, 6];
                                        if (!(parameters.exists === "true")) return [3 /*break*/, 3];
                                        _a = parameters;
                                        return [4 /*yield*/, getDailyNotePath(moment_1)];
                                    case 2:
                                        _a.filepath = _f.sent();
                                        return [3 /*break*/, 6];
                                    case 3: return [4 /*yield*/, main.createDailyNote(moment_1)];
                                    case 4:
                                        dailyNote = _f.sent();
                                        // delay to let Obsidian index and generate CachedMetadata
                                        return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 500); })];
                                    case 5:
                                        // delay to let Obsidian index and generate CachedMetadata
                                        _f.sent();
                                        createdDailyNote = true;
                                        _f.label = 6;
                                    case 6:
                                        if (dailyNote !== undefined) {
                                            parameters.filepath = dailyNote.path;
                                        }
                                        _f.label = 7;
                                    case 7:
                                        if (!(parameters.clipboard === "true")) return [3 /*break*/, 9];
                                        _b = parameters;
                                        return [4 /*yield*/, navigator.clipboard.readText()];
                                    case 8:
                                        _b.data = _f.sent();
                                        _f.label = 9;
                                    case 9:
                                        if (parameters["enable-plugin"] || parameters["disable-plugin"]) {
                                            this.handlers.handlePluginManagement(parameters);
                                        }
                                        else if (parameters.frontmatterkey) {
                                            this.handlers.handleFrontmatterKey(parameters);
                                        }
                                        else if (parameters.workspace || parameters.saveworkspace == "true") {
                                            this.handlers.handleWorkspace(parameters);
                                        }
                                        else if (parameters.commandname || parameters.commandid) {
                                            this.handlers.handleCommand(parameters);
                                        }
                                        else if (parameters.filepath && parameters.exists === "true") {
                                            this.handlers.handleDoesFileExist(parameters);
                                        }
                                        else if (parameters.data) {
                                            this.handlers.handleWrite(parameters, createdDailyNote);
                                        }
                                        else if (parameters.filepath && parameters.heading) {
                                            this.handlers.handleOpen(parameters);
                                        }
                                        else if (parameters.filepath && parameters.block) {
                                            this.handlers.handleOpen(parameters);
                                        }
                                        else if ((parameters.search || parameters.searchregex) && parameters.replace != undefined) {
                                            this.handlers.handleSearchAndReplace(parameters);
                                        }
                                        else if (parameters.search) {
                                            this.handlers.handleSearch(parameters);
                                        }
                                        else if (parameters.filepath) {
                                            this.handlers.handleOpen(parameters);
                                        }
                                        else if (parameters.settingid) {
                                            this.handlers.handleOpenSettings(parameters);
                                        }
                                        else if (parameters.updateplugins) {
                                            this.handlers.handleUpdatePlugins(parameters);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.registerObsidianProtocolHandler("hook-get-advanced-uri", function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var parameters, parameter, activeLeaf, file;
                            return __generator(this, function (_a) {
                                parameters = e;
                                for (parameter in parameters) {
                                    parameters[parameter] = decodeURIComponent(parameters[parameter]);
                                }
                                activeLeaf = this.app.workspace.activeLeaf;
                                file = activeLeaf.view.file;
                                if (activeLeaf && file) {
                                    this.hookSuccess(parameters, file);
                                }
                                else {
                                    this.failure(parameters, { errorMessage: "No file opened" });
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        this.registerEvent(this.app.workspace.on('file-menu', function (menu, file, source) {
                            console.log(source);
                            if (!(source === "more-options" || source === "tab-header" || source == "file-explorer-context-menu")) {
                                return;
                            }
                            if (!(file instanceof obsidian.TFile)) {
                                return;
                            }
                            menu.addItem(function (item) {
                                item
                                    .setTitle("Copy Advanced URI")
                                    .setIcon('link')
                                    .setSection("info")
                                    .onClick(function (_) { return _this.handlers.handleCopyFileURI(true, file); });
                            });
                        }));
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.hookSuccess = function (parameters, file) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parameters["x-success"])
                            return [2 /*return*/];
                        _a = {
                            title: stripMD(file.name)
                        };
                        return [4 /*yield*/, this.tools.generateURI({ filepath: file.path }, false)];
                    case 1:
                        options = (_a.advanceduri = _b.sent(),
                            _a.urlkey = "advanceduri",
                            _a.fileuri = getFileUri(file),
                            _a);
                        this.success(parameters, options);
                        return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.success = function (parameters, options) {
        if (parameters["x-success"]) {
            var url = new URL(parameters["x-success"]);
            for (var param in options) {
                url.searchParams.set(param, options[param]);
            }
            window.open(url.toString());
        }
    };
    AdvancedURI.prototype.failure = function (parameters, options) {
        if (parameters["x-error"]) {
            var url = new URL(parameters["x-error"]);
            for (var param in options) {
                url.searchParams.set(param, options[param]);
            }
            window.open(url.toString());
        }
    };
    AdvancedURI.prototype.getFileFromUID = function (uid) {
        var _this = this;
        var files = this.app.vault.getFiles();
        var idKey = this.settings.idField;
        return files.find(function (file) { var _a; return obsidian.parseFrontMatterEntry((_a = _this.app.metadataCache.getFileCache(file)) === null || _a === void 0 ? void 0 : _a.frontmatter, idKey) == uid; });
    };
    AdvancedURI.prototype.append = function (file, parameters) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, dataToWrite, line, data, lines, fileData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parameters.heading) return [3 /*break*/, 3];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        path = file.path;
                        line = (_a = getEndAndBeginningOfHeading(file, parameters.heading)) === null || _a === void 0 ? void 0 : _a.lastLine;
                        if (line === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        lines = data.split("\n");
                        lines.splice.apply(lines, __spreadArray([line, 0], parameters.data.split("\n")));
                        dataToWrite = lines.join("\n");
                        _b.label = 2;
                    case 2: return [3 /*break*/, 7];
                    case 3:
                        fileData = void 0;
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 4:
                        fileData = _b.sent();
                        path = file.path;
                        return [3 /*break*/, 6];
                    case 5:
                        path = file;
                        fileData = "";
                        _b.label = 6;
                    case 6:
                        dataToWrite = fileData + "\n" + parameters.data;
                        _b.label = 7;
                    case 7: return [2 /*return*/, this.writeAndOpenFile(path, dataToWrite, parameters)];
                }
            });
        });
    };
    AdvancedURI.prototype.prepend = function (file, parameters) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, dataToWrite, line, data, lines, fileData, cache, line, first, last;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!parameters.heading) return [3 /*break*/, 3];
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        path = file.path;
                        line = (_a = getEndAndBeginningOfHeading(file, parameters.heading)) === null || _a === void 0 ? void 0 : _a.firstLine;
                        if (line === undefined)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 1:
                        data = _b.sent();
                        lines = data.split("\n");
                        lines.splice.apply(lines, __spreadArray([line, 0], parameters.data.split("\n")));
                        dataToWrite = lines.join("\n");
                        _b.label = 2;
                    case 2: return [3 /*break*/, 6];
                    case 3:
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.app.vault.read(file)];
                    case 4:
                        fileData = _b.sent();
                        cache = this.app.metadataCache.getFileCache(file);
                        if (cache.frontmatter) {
                            line = cache.frontmatter.position.end.line;
                            first = fileData.split("\n").slice(0, line + 1).join("\n");
                            last = fileData.split("\n").slice(line + 1).join("\n");
                            dataToWrite = first + "\n" + parameters.data + "\n" + last;
                        }
                        else {
                            dataToWrite = parameters.data + "\n" + fileData;
                        }
                        path = file.path;
                        return [3 /*break*/, 6];
                    case 5:
                        path = file;
                        dataToWrite = parameters.data;
                        _b.label = 6;
                    case 6: return [2 /*return*/, this.writeAndOpenFile(path, dataToWrite, parameters)];
                }
            });
        });
    };
    AdvancedURI.prototype.writeAndOpenFile = function (outputFileName, text, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parts, dir, base64regex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = this.app.vault.getAbstractFileByPath(outputFileName);
                        if (!(file instanceof obsidian.TFile)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.app.vault.modify(file, text)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        parts = outputFileName.split("/");
                        dir = parts.slice(0, parts.length - 1).join("/");
                        if (!(parts.length > 1 && !(this.app.vault.getAbstractFileByPath(dir) instanceof obsidian.TFolder))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.app.vault.createFolder(dir)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
                        if (!base64regex.test(text)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.app.vault.createBinary(outputFileName, obsidian.base64ToArrayBuffer(text))];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.app.vault.create(outputFileName, text)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        this.openExistingFileAndSetCursor(outputFileName, parameters);
                        return [2 /*return*/, this.app.vault.getAbstractFileByPath(outputFileName)];
                }
            });
        });
    };
    AdvancedURI.prototype.openExistingFileAndSetCursor = function (file, parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (parameters.openmode == "silent")
                            return [2 /*return*/];
                        if (!this.settings.openFileOnWrite) return [3 /*break*/, 3];
                        fileIsAlreadyOpened_1 = false;
                        this.app.workspace.iterateAllLeaves(function (leaf) {
                            var _a;
                            if (((_a = leaf.view.file) === null || _a === void 0 ? void 0 : _a.path) === file) {
                                fileIsAlreadyOpened_1 = true;
                                _this.app.workspace.setActiveLeaf(leaf, { focus: true });
                            }
                        });
                        if (!!fileIsAlreadyOpened_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.open({ file: file, setting: this.settings.openFileOnWriteInNewPane, parameters: parameters })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (parameters.line != undefined) {
                            this.setCursorInLine(parameters.line);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.open = function (_a) {
        var _this = this;
        var file = _a.file, setting = _a.setting, parameters = _a.parameters, supportPopover = _a.supportPopover, mode = _a.mode;
        if (parameters.openmode == "popover" && (supportPopover !== null && supportPopover !== void 0 ? supportPopover : true)) {
            var hoverEditor = this.app.plugins.plugins["obsidian-hover-editor"];
            if (!hoverEditor) {
                new obsidian.Notice("Cannot find Hover Editor plugin. Please file an issue.");
                this.failure(parameters);
            }
            var leaf_1 = hoverEditor.spawnPopover(undefined, function () {
                _this.app.workspace.setActiveLeaf(leaf_1, { focus: true });
            });
            var tfile = file instanceof obsidian.TFile ? file : this.app.vault.getAbstractFileByPath(file);
            leaf_1.openFile(tfile);
        }
        else {
            var openMode = setting;
            if (parameters.newpane !== undefined) {
                openMode = parameters.newpane == "true";
            }
            if (parameters.openmode !== undefined) {
                if (parameters.openmode == "true" || parameters.openmode == "false") {
                    openMode = parameters.openmode == "true";
                }
                else if (parameters.openmode == "popover") {
                    openMode = false;
                }
                else {
                    openMode = parameters.openmode;
                }
            }
            if (openMode == "silent") {
                return;
            }
            return this.app.workspace.openLinkText(file instanceof obsidian.TFile ? file.path : file, "", openMode, mode != undefined ? { state: { mode: mode } } : getViewStateFromMode(parameters));
        }
    };
    AdvancedURI.prototype.setCursor = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var view, editor, viewState, lastLine, lastLineLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                        if (!view) return [3 /*break*/, 4];
                        editor = view.editor;
                        viewState = view.leaf.getViewState();
                        viewState.state.mode = "source";
                        if (!(mode === "append")) return [3 /*break*/, 2];
                        lastLine = editor.lastLine();
                        lastLineLength = editor.getLine(lastLine).length;
                        return [4 /*yield*/, view.leaf.setViewState(viewState, { focus: true })];
                    case 1:
                        _a.sent();
                        editor.setCursor({ ch: lastLineLength, line: lastLine });
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(mode === "prepend")) return [3 /*break*/, 4];
                        return [4 /*yield*/, view.leaf.setViewState(viewState, { focus: true })];
                    case 3:
                        _a.sent();
                        editor.setCursor({ ch: 0, line: 0 });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AdvancedURI.prototype.setCursorInLine = function (rawLine) {
        var view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!view)
            return;
        var viewState = view.leaf.getViewState();
        if (viewState.state.mode !== "source") {
            viewState.state.mode = "source";
            view.leaf.setViewState(viewState);
        }
        var line = Math.min(rawLine - 1, view.editor.lineCount() - 1);
        view.editor.focus();
        view.editor.setCursor({ line: line, ch: view.editor.getLine(line).length });
    };
    AdvancedURI.prototype.loadSettings = function () {
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
    AdvancedURI.prototype.saveSettings = function () {
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
    return AdvancedURI;
}(obsidian.Plugin));

module.exports = AdvancedURI;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9mZWF0aGVyLWljb25zL2Rpc3QvZmVhdGhlci5qcyIsIm5vZGVfbW9kdWxlcy9vYnNpZGlhbi1jb21tdW5pdHktbGliL2Rpc3QvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvb2JzaWRpYW4tZGFpbHktbm90ZXMtaW50ZXJmYWNlL2Rpc3QvbWFpbi5qcyIsInNyYy9ibG9ja191dGlscy50cyIsInNyYy9jb25zdGFudHMudHMiLCJzcmMvZGFpbHlfbm90ZV91dGlscy50cyIsInNyYy9tb2RhbHMvZW50ZXJfZGF0YV9tb2RhbC50cyIsInNyYy9tb2RhbHMvZmlsZV9tb2RhbC50cyIsInNyYy91dGlscy50cyIsInNyYy9oYW5kbGVycy50cyIsInNyYy9tb2RhbHMvY29tbWFuZF9tb2RhbC50cyIsInNyYy9tb2RhbHMvcmVwbGFjZV9tb2RhbC50cyIsInNyYy9tb2RhbHMvc2VhcmNoX21vZGFsLnRzIiwic3JjL3NldHRpbmdzLnRzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsInNyYy90b29scy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBmdW5jdGlvbiBhY2NlcHQoZikgeyBpZiAoZiAhPT0gdm9pZCAwICYmIHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbiBleHBlY3RlZFwiKTsgcmV0dXJuIGY7IH1cclxuICAgIHZhciBraW5kID0gY29udGV4dEluLmtpbmQsIGtleSA9IGtpbmQgPT09IFwiZ2V0dGVyXCIgPyBcImdldFwiIDoga2luZCA9PT0gXCJzZXR0ZXJcIiA/IFwic2V0XCIgOiBcInZhbHVlXCI7XHJcbiAgICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcclxuICAgIHZhciBkZXNjcmlwdG9yID0gZGVzY3JpcHRvckluIHx8ICh0YXJnZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgY29udGV4dEluLm5hbWUpIDoge30pO1xyXG4gICAgdmFyIF8sIGRvbmUgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgdmFyIGNvbnRleHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbikgY29udGV4dFtwXSA9IHAgPT09IFwiYWNjZXNzXCIgPyB7fSA6IGNvbnRleHRJbltwXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcclxuICAgICAgICBjb250ZXh0LmFkZEluaXRpYWxpemVyID0gZnVuY3Rpb24gKGYpIHsgaWYgKGRvbmUpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgYWRkIGluaXRpYWxpemVycyBhZnRlciBkZWNvcmF0aW9uIGhhcyBjb21wbGV0ZWRcIik7IGV4dHJhSW5pdGlhbGl6ZXJzLnB1c2goYWNjZXB0KGYgfHwgbnVsbCkpOyB9O1xyXG4gICAgICAgIHZhciByZXN1bHQgPSAoMCwgZGVjb3JhdG9yc1tpXSkoa2luZCA9PT0gXCJhY2Nlc3NvclwiID8geyBnZXQ6IGRlc2NyaXB0b3IuZ2V0LCBzZXQ6IGRlc2NyaXB0b3Iuc2V0IH0gOiBkZXNjcmlwdG9yW2tleV0sIGNvbnRleHQpO1xyXG4gICAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdm9pZCAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCB0eXBlb2YgcmVzdWx0ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0IGV4cGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuc2V0KSkgZGVzY3JpcHRvci5zZXQgPSBfO1xyXG4gICAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuaW5pdCkpIGluaXRpYWxpemVycy5wdXNoKF8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChfID0gYWNjZXB0KHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgaWYgKGtpbmQgPT09IFwiZmllbGRcIikgaW5pdGlhbGl6ZXJzLnB1c2goXyk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XHJcbiAgICBkb25lID0gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3J1bkluaXRpYWxpemVycyh0aGlzQXJnLCBpbml0aWFsaXplcnMsIHZhbHVlKSB7XHJcbiAgICB2YXIgdXNlVmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFsdWUgPSB1c2VWYWx1ZSA/IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcsIHZhbHVlKSA6IGluaXRpYWxpemVyc1tpXS5jYWxsKHRoaXNBcmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcclxuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gXCJzeW1ib2xcIiA/IHggOiBcIlwiLmNvbmNhdCh4KTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NldEZ1bmN0aW9uTmFtZShmLCBuYW1lLCBwcmVmaXgpIHtcclxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikgbmFtZSA9IG5hbWUuZGVzY3JpcHRpb24gPyBcIltcIi5jb25jYXQobmFtZS5kZXNjcmlwdGlvbiwgXCJdXCIpIDogXCJcIjtcclxuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xyXG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcclxuICAgICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcclxuICAgIGlmIChwYWNrIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIGZvciAodmFyIGkgPSAwLCBsID0gZnJvbS5sZW5ndGgsIGFyOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xyXG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xyXG4gICAgICAgICAgICBhcltpXSA9IGZyb21baV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRvLmNvbmNhdChhciB8fCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkSW4oc3RhdGUsIHJlY2VpdmVyKSB7XHJcbiAgICBpZiAocmVjZWl2ZXIgPT09IG51bGwgfHwgKHR5cGVvZiByZWNlaXZlciAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcmVjZWl2ZXIgIT09IFwiZnVuY3Rpb25cIikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlICdpbicgb3BlcmF0b3Igb24gbm9uLW9iamVjdFwiKTtcclxuICAgIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XHJcbn1cclxuIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZmVhdGhlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJmZWF0aGVyXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovIFx0XHRyZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoe1xuXG4vKioqLyBcIi4vZGlzdC9pY29ucy5qc29uXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vZGlzdC9pY29ucy5qc29uICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIGV4cG9ydHMgcHJvdmlkZWQ6IGFjdGl2aXR5LCBhaXJwbGF5LCBhbGVydC1jaXJjbGUsIGFsZXJ0LW9jdGFnb24sIGFsZXJ0LXRyaWFuZ2xlLCBhbGlnbi1jZW50ZXIsIGFsaWduLWp1c3RpZnksIGFsaWduLWxlZnQsIGFsaWduLXJpZ2h0LCBhbmNob3IsIGFwZXJ0dXJlLCBhcmNoaXZlLCBhcnJvdy1kb3duLWNpcmNsZSwgYXJyb3ctZG93bi1sZWZ0LCBhcnJvdy1kb3duLXJpZ2h0LCBhcnJvdy1kb3duLCBhcnJvdy1sZWZ0LWNpcmNsZSwgYXJyb3ctbGVmdCwgYXJyb3ctcmlnaHQtY2lyY2xlLCBhcnJvdy1yaWdodCwgYXJyb3ctdXAtY2lyY2xlLCBhcnJvdy11cC1sZWZ0LCBhcnJvdy11cC1yaWdodCwgYXJyb3ctdXAsIGF0LXNpZ24sIGF3YXJkLCBiYXItY2hhcnQtMiwgYmFyLWNoYXJ0LCBiYXR0ZXJ5LWNoYXJnaW5nLCBiYXR0ZXJ5LCBiZWxsLW9mZiwgYmVsbCwgYmx1ZXRvb3RoLCBib2xkLCBib29rLW9wZW4sIGJvb2ssIGJvb2ttYXJrLCBib3gsIGJyaWVmY2FzZSwgY2FsZW5kYXIsIGNhbWVyYS1vZmYsIGNhbWVyYSwgY2FzdCwgY2hlY2stY2lyY2xlLCBjaGVjay1zcXVhcmUsIGNoZWNrLCBjaGV2cm9uLWRvd24sIGNoZXZyb24tbGVmdCwgY2hldnJvbi1yaWdodCwgY2hldnJvbi11cCwgY2hldnJvbnMtZG93biwgY2hldnJvbnMtbGVmdCwgY2hldnJvbnMtcmlnaHQsIGNoZXZyb25zLXVwLCBjaHJvbWUsIGNpcmNsZSwgY2xpcGJvYXJkLCBjbG9jaywgY2xvdWQtZHJpenpsZSwgY2xvdWQtbGlnaHRuaW5nLCBjbG91ZC1vZmYsIGNsb3VkLXJhaW4sIGNsb3VkLXNub3csIGNsb3VkLCBjb2RlLCBjb2RlcGVuLCBjb2Rlc2FuZGJveCwgY29mZmVlLCBjb2x1bW5zLCBjb21tYW5kLCBjb21wYXNzLCBjb3B5LCBjb3JuZXItZG93bi1sZWZ0LCBjb3JuZXItZG93bi1yaWdodCwgY29ybmVyLWxlZnQtZG93biwgY29ybmVyLWxlZnQtdXAsIGNvcm5lci1yaWdodC1kb3duLCBjb3JuZXItcmlnaHQtdXAsIGNvcm5lci11cC1sZWZ0LCBjb3JuZXItdXAtcmlnaHQsIGNwdSwgY3JlZGl0LWNhcmQsIGNyb3AsIGNyb3NzaGFpciwgZGF0YWJhc2UsIGRlbGV0ZSwgZGlzYywgZGl2aWRlLWNpcmNsZSwgZGl2aWRlLXNxdWFyZSwgZGl2aWRlLCBkb2xsYXItc2lnbiwgZG93bmxvYWQtY2xvdWQsIGRvd25sb2FkLCBkcmliYmJsZSwgZHJvcGxldCwgZWRpdC0yLCBlZGl0LTMsIGVkaXQsIGV4dGVybmFsLWxpbmssIGV5ZS1vZmYsIGV5ZSwgZmFjZWJvb2ssIGZhc3QtZm9yd2FyZCwgZmVhdGhlciwgZmlnbWEsIGZpbGUtbWludXMsIGZpbGUtcGx1cywgZmlsZS10ZXh0LCBmaWxlLCBmaWxtLCBmaWx0ZXIsIGZsYWcsIGZvbGRlci1taW51cywgZm9sZGVyLXBsdXMsIGZvbGRlciwgZnJhbWVyLCBmcm93biwgZ2lmdCwgZ2l0LWJyYW5jaCwgZ2l0LWNvbW1pdCwgZ2l0LW1lcmdlLCBnaXQtcHVsbC1yZXF1ZXN0LCBnaXRodWIsIGdpdGxhYiwgZ2xvYmUsIGdyaWQsIGhhcmQtZHJpdmUsIGhhc2gsIGhlYWRwaG9uZXMsIGhlYXJ0LCBoZWxwLWNpcmNsZSwgaGV4YWdvbiwgaG9tZSwgaW1hZ2UsIGluYm94LCBpbmZvLCBpbnN0YWdyYW0sIGl0YWxpYywga2V5LCBsYXllcnMsIGxheW91dCwgbGlmZS1idW95LCBsaW5rLTIsIGxpbmssIGxpbmtlZGluLCBsaXN0LCBsb2FkZXIsIGxvY2ssIGxvZy1pbiwgbG9nLW91dCwgbWFpbCwgbWFwLXBpbiwgbWFwLCBtYXhpbWl6ZS0yLCBtYXhpbWl6ZSwgbWVoLCBtZW51LCBtZXNzYWdlLWNpcmNsZSwgbWVzc2FnZS1zcXVhcmUsIG1pYy1vZmYsIG1pYywgbWluaW1pemUtMiwgbWluaW1pemUsIG1pbnVzLWNpcmNsZSwgbWludXMtc3F1YXJlLCBtaW51cywgbW9uaXRvciwgbW9vbiwgbW9yZS1ob3Jpem9udGFsLCBtb3JlLXZlcnRpY2FsLCBtb3VzZS1wb2ludGVyLCBtb3ZlLCBtdXNpYywgbmF2aWdhdGlvbi0yLCBuYXZpZ2F0aW9uLCBvY3RhZ29uLCBwYWNrYWdlLCBwYXBlcmNsaXAsIHBhdXNlLWNpcmNsZSwgcGF1c2UsIHBlbi10b29sLCBwZXJjZW50LCBwaG9uZS1jYWxsLCBwaG9uZS1mb3J3YXJkZWQsIHBob25lLWluY29taW5nLCBwaG9uZS1taXNzZWQsIHBob25lLW9mZiwgcGhvbmUtb3V0Z29pbmcsIHBob25lLCBwaWUtY2hhcnQsIHBsYXktY2lyY2xlLCBwbGF5LCBwbHVzLWNpcmNsZSwgcGx1cy1zcXVhcmUsIHBsdXMsIHBvY2tldCwgcG93ZXIsIHByaW50ZXIsIHJhZGlvLCByZWZyZXNoLWNjdywgcmVmcmVzaC1jdywgcmVwZWF0LCByZXdpbmQsIHJvdGF0ZS1jY3csIHJvdGF0ZS1jdywgcnNzLCBzYXZlLCBzY2lzc29ycywgc2VhcmNoLCBzZW5kLCBzZXJ2ZXIsIHNldHRpbmdzLCBzaGFyZS0yLCBzaGFyZSwgc2hpZWxkLW9mZiwgc2hpZWxkLCBzaG9wcGluZy1iYWcsIHNob3BwaW5nLWNhcnQsIHNodWZmbGUsIHNpZGViYXIsIHNraXAtYmFjaywgc2tpcC1mb3J3YXJkLCBzbGFjaywgc2xhc2gsIHNsaWRlcnMsIHNtYXJ0cGhvbmUsIHNtaWxlLCBzcGVha2VyLCBzcXVhcmUsIHN0YXIsIHN0b3AtY2lyY2xlLCBzdW4sIHN1bnJpc2UsIHN1bnNldCwgdGFibGV0LCB0YWcsIHRhcmdldCwgdGVybWluYWwsIHRoZXJtb21ldGVyLCB0aHVtYnMtZG93biwgdGh1bWJzLXVwLCB0b2dnbGUtbGVmdCwgdG9nZ2xlLXJpZ2h0LCB0b29sLCB0cmFzaC0yLCB0cmFzaCwgdHJlbGxvLCB0cmVuZGluZy1kb3duLCB0cmVuZGluZy11cCwgdHJpYW5nbGUsIHRydWNrLCB0diwgdHdpdGNoLCB0d2l0dGVyLCB0eXBlLCB1bWJyZWxsYSwgdW5kZXJsaW5lLCB1bmxvY2ssIHVwbG9hZC1jbG91ZCwgdXBsb2FkLCB1c2VyLWNoZWNrLCB1c2VyLW1pbnVzLCB1c2VyLXBsdXMsIHVzZXIteCwgdXNlciwgdXNlcnMsIHZpZGVvLW9mZiwgdmlkZW8sIHZvaWNlbWFpbCwgdm9sdW1lLTEsIHZvbHVtZS0yLCB2b2x1bWUteCwgdm9sdW1lLCB3YXRjaCwgd2lmaS1vZmYsIHdpZmksIHdpbmQsIHgtY2lyY2xlLCB4LW9jdGFnb24sIHgtc3F1YXJlLCB4LCB5b3V0dWJlLCB6YXAtb2ZmLCB6YXAsIHpvb20taW4sIHpvb20tb3V0LCBkZWZhdWx0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbm1vZHVsZS5leHBvcnRzID0ge1wiYWN0aXZpdHlcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjIyIDEyIDE4IDEyIDE1IDIxIDkgMyA2IDEyIDIgMTJcXFwiPjwvcG9seWxpbmU+XCIsXCJhaXJwbGF5XCI6XCI8cGF0aCBkPVxcXCJNNSAxN0g0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2MTBhMiAyIDAgMCAxLTIgMmgtMVxcXCI+PC9wYXRoPjxwb2x5Z29uIHBvaW50cz1cXFwiMTIgMTUgMTcgMjEgNyAyMSAxMiAxNVxcXCI+PC9wb2x5Z29uPlwiLFwiYWxlcnQtY2lyY2xlXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjEyLjAxXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT5cIixcImFsZXJ0LW9jdGFnb25cIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiNy44NiAyIDE2LjE0IDIgMjIgNy44NiAyMiAxNi4xNCAxNi4xNCAyMiA3Ljg2IDIyIDIgMTYuMTQgMiA3Ljg2IDcuODYgMlxcXCI+PC9wb2x5Z29uPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTZcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjE2XFxcIj48L2xpbmU+XCIsXCJhbGVydC10cmlhbmdsZVwiOlwiPHBhdGggZD1cXFwiTTEwLjI5IDMuODZMMS44MiAxOGEyIDIgMCAwIDAgMS43MSAzaDE2Ljk0YTIgMiAwIDAgMCAxLjcxLTNMMTMuNzEgMy44NmEyIDIgMCAwIDAtMy40MiAwelxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjlcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjEzXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTdcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjE3XFxcIj48L2xpbmU+XCIsXCJhbGlnbi1jZW50ZXJcIjpcIjxsaW5lIHgxPVxcXCIxOFxcXCIgeTE9XFxcIjEwXFxcIiB4Mj1cXFwiNlxcXCIgeTI9XFxcIjEwXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIxXFxcIiB5MT1cXFwiNlxcXCIgeDI9XFxcIjNcXFwiIHkyPVxcXCI2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIxXFxcIiB5MT1cXFwiMTRcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMThcXFwiIHkxPVxcXCIxOFxcXCIgeDI9XFxcIjZcXFwiIHkyPVxcXCIxOFxcXCI+PC9saW5lPlwiLFwiYWxpZ24tanVzdGlmeVwiOlwiPGxpbmUgeDE9XFxcIjIxXFxcIiB5MT1cXFwiMTBcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiMTBcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCI2XFxcIiB4Mj1cXFwiM1xcXCIgeTI9XFxcIjZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIxNFxcXCIgeDI9XFxcIjNcXFwiIHkyPVxcXCIxNFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjE4XFxcIiB4Mj1cXFwiM1xcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+XCIsXCJhbGlnbi1sZWZ0XCI6XCI8bGluZSB4MT1cXFwiMTdcXFwiIHkxPVxcXCIxMFxcXCIgeDI9XFxcIjNcXFwiIHkyPVxcXCIxMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjE0XFxcIiB4Mj1cXFwiM1xcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE3XFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT5cIixcImFsaWduLXJpZ2h0XCI6XCI8bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIxMFxcXCIgeDI9XFxcIjdcXFwiIHkyPVxcXCIxMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjE0XFxcIiB4Mj1cXFwiM1xcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIxXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT5cIixcImFuY2hvclwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCI1XFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIyMlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiOFxcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk01IDEySDJhMTAgMTAgMCAwIDAgMjAgMGgtM1xcXCI+PC9wYXRoPlwiLFwiYXBlcnR1cmVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMTQuMzFcXFwiIHkxPVxcXCI4XFxcIiB4Mj1cXFwiMjAuMDVcXFwiIHkyPVxcXCIxNy45NFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI5LjY5XFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjIxLjE3XFxcIiB5Mj1cXFwiOFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI3LjM4XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxMy4xMlxcXCIgeTI9XFxcIjIuMDZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOS42OVxcXCIgeTE9XFxcIjE2XFxcIiB4Mj1cXFwiMy45NVxcXCIgeTI9XFxcIjYuMDZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTQuMzFcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjIuODNcXFwiIHkyPVxcXCIxNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNi42MlxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTAuODhcXFwiIHkyPVxcXCIyMS45NFxcXCI+PC9saW5lPlwiLFwiYXJjaGl2ZVwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMjEgOCAyMSAyMSAzIDIxIDMgOFxcXCI+PC9wb2x5bGluZT48cmVjdCB4PVxcXCIxXFxcIiB5PVxcXCIzXFxcIiB3aWR0aD1cXFwiMjJcXFwiIGhlaWdodD1cXFwiNVxcXCI+PC9yZWN0PjxsaW5lIHgxPVxcXCIxMFxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTRcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwiYXJyb3ctZG93bi1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPVxcXCI4IDEyIDEyIDE2IDE2IDEyXFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE2XFxcIj48L2xpbmU+XCIsXCJhcnJvdy1kb3duLWxlZnRcIjpcIjxsaW5lIHgxPVxcXCIxN1xcXCIgeTE9XFxcIjdcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiMTdcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxNyAxNyA3IDE3IDcgN1xcXCI+PC9wb2x5bGluZT5cIixcImFycm93LWRvd24tcmlnaHRcIjpcIjxsaW5lIHgxPVxcXCI3XFxcIiB5MT1cXFwiN1xcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiMTdcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxNyA3IDE3IDE3IDcgMTdcXFwiPjwvcG9seWxpbmU+XCIsXCJhcnJvdy1kb3duXCI6XCI8bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCI1XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxOVxcXCI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjE5IDEyIDEyIDE5IDUgMTJcXFwiPjwvcG9seWxpbmU+XCIsXCJhcnJvdy1sZWZ0LWNpcmNsZVwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9XFxcIjEyIDggOCAxMiAxMiAxNlxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMTZcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjhcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwiYXJyb3ctbGVmdFwiOlwiPGxpbmUgeDE9XFxcIjE5XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCI1XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxMiAxOSA1IDEyIDEyIDVcXFwiPjwvcG9seWxpbmU+XCIsXCJhcnJvdy1yaWdodC1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxMiAxNiAxNiAxMiAxMiA4XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+XCIsXCJhcnJvdy1yaWdodFwiOlwiPGxpbmUgeDE9XFxcIjVcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjE5XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxMiA1IDE5IDEyIDEyIDE5XFxcIj48L3BvbHlsaW5lPlwiLFwiYXJyb3ctdXAtY2lyY2xlXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTYgMTIgMTIgOCA4IDEyXFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjE2XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCI4XFxcIj48L2xpbmU+XCIsXCJhcnJvdy11cC1sZWZ0XCI6XCI8bGluZSB4MT1cXFwiMTdcXFwiIHkxPVxcXCIxN1xcXCIgeDI9XFxcIjdcXFwiIHkyPVxcXCI3XFxcIj48L2xpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiNyAxNyA3IDcgMTcgN1xcXCI+PC9wb2x5bGluZT5cIixcImFycm93LXVwLXJpZ2h0XCI6XCI8bGluZSB4MT1cXFwiN1xcXCIgeTE9XFxcIjE3XFxcIiB4Mj1cXFwiMTdcXFwiIHkyPVxcXCI3XFxcIj48L2xpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiNyA3IDE3IDcgMTcgMTdcXFwiPjwvcG9seWxpbmU+XCIsXCJhcnJvdy11cFwiOlwiPGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTlcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjVcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI1IDEyIDEyIDUgMTkgMTJcXFwiPjwvcG9seWxpbmU+XCIsXCJhdC1zaWduXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCI0XFxcIj48L2NpcmNsZT48cGF0aCBkPVxcXCJNMTYgOHY1YTMgMyAwIDAgMCA2IDB2LTFhMTAgMTAgMCAxIDAtMy45MiA3Ljk0XFxcIj48L3BhdGg+XCIsXCJhd2FyZFwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCI4XFxcIiByPVxcXCI3XFxcIj48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPVxcXCI4LjIxIDEzLjg5IDcgMjMgMTIgMjAgMTcgMjMgMTUuNzkgMTMuODhcXFwiPjwvcG9seWxpbmU+XCIsXCJiYXItY2hhcnQtMlwiOlwiPGxpbmUgeDE9XFxcIjE4XFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCIxOFxcXCIgeTI9XFxcIjEwXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNlxcXCIgeTE9XFxcIjIwXFxcIiB4Mj1cXFwiNlxcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+XCIsXCJiYXItY2hhcnRcIjpcIjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjIwXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxOFxcXCIgeTE9XFxcIjIwXFxcIiB4Mj1cXFwiMThcXFwiIHkyPVxcXCI0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjZcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjZcXFwiIHkyPVxcXCIxNlxcXCI+PC9saW5lPlwiLFwiYmF0dGVyeS1jaGFyZ2luZ1wiOlwiPHBhdGggZD1cXFwiTTUgMThIM2EyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmgzLjE5TTE1IDZoMmEyIDIgMCAwIDEgMiAydjhhMiAyIDAgMCAxLTIgMmgtMy4xOVxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIyM1xcXCIgeTE9XFxcIjEzXFxcIiB4Mj1cXFwiMjNcXFwiIHkyPVxcXCIxMVxcXCI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjExIDYgNyAxMiAxMyAxMiA5IDE4XFxcIj48L3BvbHlsaW5lPlwiLFwiYmF0dGVyeVwiOlwiPHJlY3QgeD1cXFwiMVxcXCIgeT1cXFwiNlxcXCIgd2lkdGg9XFxcIjE4XFxcIiBoZWlnaHQ9XFxcIjEyXFxcIiByeD1cXFwiMlxcXCIgcnk9XFxcIjJcXFwiPjwvcmVjdD48bGluZSB4MT1cXFwiMjNcXFwiIHkxPVxcXCIxM1xcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMTFcXFwiPjwvbGluZT5cIixcImJlbGwtb2ZmXCI6XCI8cGF0aCBkPVxcXCJNMTMuNzMgMjFhMiAyIDAgMCAxLTMuNDYgMFxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xOC42MyAxM0ExNy44OSAxNy44OSAwIDAgMSAxOCA4XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTYuMjYgNi4yNkE1Ljg2IDUuODYgMCAwIDAgNiA4YzAgNy0zIDktMyA5aDE0XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE4IDhhNiA2IDAgMCAwLTkuMzMtNVxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT5cIixcImJlbGxcIjpcIjxwYXRoIGQ9XFxcIk0xOCA4QTYgNiAwIDAgMCA2IDhjMCA3LTMgOS0zIDloMThzLTMtMi0zLTlcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMTMuNzMgMjFhMiAyIDAgMCAxLTMuNDYgMFxcXCI+PC9wYXRoPlwiLFwiYmx1ZXRvb3RoXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCI2LjUgNi41IDE3LjUgMTcuNSAxMiAyMyAxMiAxIDE3LjUgNi41IDYuNSAxNy41XFxcIj48L3BvbHlsaW5lPlwiLFwiYm9sZFwiOlwiPHBhdGggZD1cXFwiTTYgNGg4YTQgNCAwIDAgMSA0IDQgNCA0IDAgMCAxLTQgNEg2elxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk02IDEyaDlhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEtNCA0SDZ6XFxcIj48L3BhdGg+XCIsXCJib29rLW9wZW5cIjpcIjxwYXRoIGQ9XFxcIk0yIDNoNmE0IDQgMCAwIDEgNCA0djE0YTMgMyAwIDAgMC0zLTNIMnpcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMjIgM2gtNmE0IDQgMCAwIDAtNCA0djE0YTMgMyAwIDAgMSAzLTNoN3pcXFwiPjwvcGF0aD5cIixcImJvb2tcIjpcIjxwYXRoIGQ9XFxcIk00IDE5LjVBMi41IDIuNSAwIDAgMSA2LjUgMTdIMjBcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNNi41IDJIMjB2MjBINi41QTIuNSAyLjUgMCAwIDEgNCAxOS41di0xNUEyLjUgMi41IDAgMCAxIDYuNSAyelxcXCI+PC9wYXRoPlwiLFwiYm9va21hcmtcIjpcIjxwYXRoIGQ9XFxcIk0xOSAyMWwtNy01LTcgNVY1YTIgMiAwIDAgMSAyLTJoMTBhMiAyIDAgMCAxIDIgMnpcXFwiPjwvcGF0aD5cIixcImJveFwiOlwiPHBhdGggZD1cXFwiTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M2w3IDRhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2elxcXCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XFxcIjMuMjcgNi45NiAxMiAxMi4wMSAyMC43MyA2Ljk2XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjIyLjA4XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwiYnJpZWZjYXNlXCI6XCI8cmVjdCB4PVxcXCIyXFxcIiB5PVxcXCI3XFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMTRcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxwYXRoIGQ9XFxcIk0xNiAyMVY1YTIgMiAwIDAgMC0yLTJoLTRhMiAyIDAgMCAwLTIgMnYxNlxcXCI+PC9wYXRoPlwiLFwiY2FsZW5kYXJcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjRcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjE2XFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjE2XFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjhcXFwiIHkyPVxcXCI2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjNcXFwiIHkxPVxcXCIxMFxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiMTBcXFwiPjwvbGluZT5cIixcImNhbWVyYS1vZmZcIjpcIjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMjEgMjFIM2EyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmgzbTMtM2g2bDIgM2g0YTIgMiAwIDAgMSAyIDJ2OS4zNG0tNy43Mi0yLjA2YTQgNCAwIDEgMS01LjU2LTUuNTZcXFwiPjwvcGF0aD5cIixcImNhbWVyYVwiOlwiPHBhdGggZD1cXFwiTTIzIDE5YTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmg0bDItM2g2bDIgM2g0YTIgMiAwIDAgMSAyIDJ6XFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxM1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+XCIsXCJjYXN0XCI6XCI8cGF0aCBkPVxcXCJNMiAxNi4xQTUgNSAwIDAgMSA1LjkgMjBNMiAxMi4wNUE5IDkgMCAwIDEgOS45NSAyME0yIDhWNmEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2MTJhMiAyIDAgMCAxLTIgMmgtNlxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIyXFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCIyLjAxXFxcIiB5Mj1cXFwiMjBcXFwiPjwvbGluZT5cIixcImNoZWNrLWNpcmNsZVwiOlwiPHBhdGggZD1cXFwiTTIyIDExLjA4VjEyYTEwIDEwIDAgMSAxLTUuOTMtOS4xNFxcXCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XFxcIjIyIDQgMTIgMTQuMDEgOSAxMS4wMVxcXCI+PC9wb2x5bGluZT5cIixcImNoZWNrLXNxdWFyZVwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiOSAxMSAxMiAxNCAyMiA0XFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk0yMSAxMnY3YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmgxMVxcXCI+PC9wYXRoPlwiLFwiY2hlY2tcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjIwIDYgOSAxNyA0IDEyXFxcIj48L3BvbHlsaW5lPlwiLFwiY2hldnJvbi1kb3duXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCI2IDkgMTIgMTUgMTggOVxcXCI+PC9wb2x5bGluZT5cIixcImNoZXZyb24tbGVmdFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTUgMTggOSAxMiAxNSA2XFxcIj48L3BvbHlsaW5lPlwiLFwiY2hldnJvbi1yaWdodFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiOSAxOCAxNSAxMiA5IDZcXFwiPjwvcG9seWxpbmU+XCIsXCJjaGV2cm9uLXVwXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxOCAxNSAxMiA5IDYgMTVcXFwiPjwvcG9seWxpbmU+XCIsXCJjaGV2cm9ucy1kb3duXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCI3IDEzIDEyIDE4IDE3IDEzXFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjcgNiAxMiAxMSAxNyA2XFxcIj48L3BvbHlsaW5lPlwiLFwiY2hldnJvbnMtbGVmdFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTEgMTcgNiAxMiAxMSA3XFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjE4IDE3IDEzIDEyIDE4IDdcXFwiPjwvcG9seWxpbmU+XCIsXCJjaGV2cm9ucy1yaWdodFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTMgMTcgMTggMTIgMTMgN1xcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI2IDE3IDExIDEyIDYgN1xcXCI+PC9wb2x5bGluZT5cIixcImNoZXZyb25zLXVwXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxNyAxMSAxMiA2IDcgMTFcXFwiPjwvcG9seWxpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTcgMTggMTIgMTMgNyAxOFxcXCI+PC9wb2x5bGluZT5cIixcImNocm9tZVwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjRcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCIyMS4xN1xcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjhcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMy45NVxcXCIgeTE9XFxcIjYuMDZcXFwiIHgyPVxcXCI4LjU0XFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTAuODhcXFwiIHkxPVxcXCIyMS45NFxcXCIgeDI9XFxcIjE1LjQ2XFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT5cIixcImNpcmNsZVwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPlwiLFwiY2xpcGJvYXJkXCI6XCI8cGF0aCBkPVxcXCJNMTYgNGgyYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDJcXFwiPjwvcGF0aD48cmVjdCB4PVxcXCI4XFxcIiB5PVxcXCIyXFxcIiB3aWR0aD1cXFwiOFxcXCIgaGVpZ2h0PVxcXCI0XFxcIiByeD1cXFwiMVxcXCIgcnk9XFxcIjFcXFwiPjwvcmVjdD5cIixcImNsb2NrXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTIgNiAxMiAxMiAxNiAxNFxcXCI+PC9wb2x5bGluZT5cIixcImNsb3VkLWRyaXp6bGVcIjpcIjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMTlcXFwiIHgyPVxcXCI4XFxcIiB5Mj1cXFwiMjFcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjEzXFxcIiB4Mj1cXFwiOFxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE2XFxcIiB5MT1cXFwiMTlcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE2XFxcIiB5MT1cXFwiMTNcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjFcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTVcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE3XFxcIj48L2xpbmU+PHBhdGggZD1cXFwiTTIwIDE2LjU4QTUgNSAwIDAgMCAxOCA3aC0xLjI2QTggOCAwIDEgMCA0IDE1LjI1XFxcIj48L3BhdGg+XCIsXCJjbG91ZC1saWdodG5pbmdcIjpcIjxwYXRoIGQ9XFxcIk0xOSAxNi45QTUgNSAwIDAgMCAxOCA3aC0xLjI2YTggOCAwIDEgMC0xMS42MiA5XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTMgMTEgOSAxNyAxNSAxNyAxMSAyM1xcXCI+PC9wb2x5bGluZT5cIixcImNsb3VkLW9mZlwiOlwiPHBhdGggZD1cXFwiTTIyLjYxIDE2Ljk1QTUgNSAwIDAgMCAxOCAxMGgtMS4yNmE4IDggMCAwIDAtNy4wNS02TTUgNWE4IDggMCAwIDAgNCAxNWg5YTUgNSAwIDAgMCAxLjctLjNcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+XCIsXCJjbG91ZC1yYWluXCI6XCI8bGluZSB4MT1cXFwiMTZcXFwiIHkxPVxcXCIxM1xcXCIgeDI9XFxcIjE2XFxcIiB5Mj1cXFwiMjFcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjEzXFxcIiB4Mj1cXFwiOFxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTVcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+PHBhdGggZD1cXFwiTTIwIDE2LjU4QTUgNSAwIDAgMCAxOCA3aC0xLjI2QTggOCAwIDEgMCA0IDE1LjI1XFxcIj48L3BhdGg+XCIsXCJjbG91ZC1zbm93XCI6XCI8cGF0aCBkPVxcXCJNMjAgMTcuNThBNSA1IDAgMCAwIDE4IDhoLTEuMjZBOCA4IDAgMSAwIDQgMTYuMjVcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjE2XFxcIiB4Mj1cXFwiOC4wMVxcXCIgeTI9XFxcIjE2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjhcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjguMDFcXFwiIHkyPVxcXCIyMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjE4XFxcIiB4Mj1cXFwiMTIuMDFcXFwiIHkyPVxcXCIxOFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjIyXFxcIiB4Mj1cXFwiMTIuMDFcXFwiIHkyPVxcXCIyMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjE2XFxcIiB4Mj1cXFwiMTYuMDFcXFwiIHkyPVxcXCIxNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjIwXFxcIiB4Mj1cXFwiMTYuMDFcXFwiIHkyPVxcXCIyMFxcXCI+PC9saW5lPlwiLFwiY2xvdWRcIjpcIjxwYXRoIGQ9XFxcIk0xOCAxMGgtMS4yNkE4IDggMCAxIDAgOSAyMGg5YTUgNSAwIDAgMCAwLTEwelxcXCI+PC9wYXRoPlwiLFwiY29kZVwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTYgMTggMjIgMTIgMTYgNlxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI4IDYgMiAxMiA4IDE4XFxcIj48L3BvbHlsaW5lPlwiLFwiY29kZXBlblwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIxMiAyIDIyIDguNSAyMiAxNS41IDEyIDIyIDIgMTUuNSAyIDguNSAxMiAyXFxcIj48L3BvbHlnb24+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE1LjVcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIyMiA4LjUgMTIgMTUuNSAyIDguNVxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIyIDE1LjUgMTIgOC41IDIyIDE1LjVcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiOC41XFxcIj48L2xpbmU+XCIsXCJjb2Rlc2FuZGJveFwiOlwiPHBhdGggZD1cXFwiTTIxIDE2VjhhMiAyIDAgMCAwLTEtMS43M2wtNy00YTIgMiAwIDAgMC0yIDBsLTcgNEEyIDIgMCAwIDAgMyA4djhhMiAyIDAgMCAwIDEgMS43M2w3IDRhMiAyIDAgMCAwIDIgMGw3LTRBMiAyIDAgMCAwIDIxIDE2elxcXCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XFxcIjcuNSA0LjIxIDEyIDYuODEgMTYuNSA0LjIxXFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjcuNSAxOS43OSA3LjUgMTQuNiAzIDEyXFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjIxIDEyIDE2LjUgMTQuNiAxNi41IDE5Ljc5XFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjMuMjcgNi45NiAxMiAxMi4wMSAyMC43MyA2Ljk2XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjIyLjA4XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwiY29mZmVlXCI6XCI8cGF0aCBkPVxcXCJNMTggOGgxYTQgNCAwIDAgMSAwIDhoLTFcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMiA4aDE2djlhNCA0IDAgMCAxLTQgNEg2YTQgNCAwIDAgMS00LTRWOHpcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiNlxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCI2XFxcIiB5Mj1cXFwiNFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMFxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxMFxcXCIgeTI9XFxcIjRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTRcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTRcXFwiIHkyPVxcXCI0XFxcIj48L2xpbmU+XCIsXCJjb2x1bW5zXCI6XCI8cGF0aCBkPVxcXCJNMTIgM2g3YTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMmgtN20wLTE4SDVhMiAyIDAgMCAwLTIgMnYxNGEyIDIgMCAwIDAgMiAyaDdtMC0xOHYxOFxcXCI+PC9wYXRoPlwiLFwiY29tbWFuZFwiOlwiPHBhdGggZD1cXFwiTTE4IDNhMyAzIDAgMCAwLTMgM3YxMmEzIDMgMCAwIDAgMyAzIDMgMyAwIDAgMCAzLTMgMyAzIDAgMCAwLTMtM0g2YTMgMyAwIDAgMC0zIDMgMyAzIDAgMCAwIDMgMyAzIDMgMCAwIDAgMy0zVjZhMyAzIDAgMCAwLTMtMyAzIDMgMCAwIDAtMyAzIDMgMyAwIDAgMCAzIDNoMTJhMyAzIDAgMCAwIDMtMyAzIDMgMCAwIDAtMy0zelxcXCI+PC9wYXRoPlwiLFwiY29tcGFzc1wiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPjxwb2x5Z29uIHBvaW50cz1cXFwiMTYuMjQgNy43NiAxNC4xMiAxNC4xMiA3Ljc2IDE2LjI0IDkuODggOS44OCAxNi4yNCA3Ljc2XFxcIj48L3BvbHlnb24+XCIsXCJjb3B5XCI6XCI8cmVjdCB4PVxcXCI5XFxcIiB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiMTNcXFwiIGhlaWdodD1cXFwiMTNcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxwYXRoIGQ9XFxcIk01IDE1SDRhMiAyIDAgMCAxLTItMlY0YTIgMiAwIDAgMSAyLTJoOWEyIDIgMCAwIDEgMiAydjFcXFwiPjwvcGF0aD5cIixcImNvcm5lci1kb3duLWxlZnRcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjkgMTAgNCAxNSA5IDIwXFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk0yMCA0djdhNCA0IDAgMCAxLTQgNEg0XFxcIj48L3BhdGg+XCIsXCJjb3JuZXItZG93bi1yaWdodFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTUgMTAgMjAgMTUgMTUgMjBcXFwiPjwvcG9seWxpbmU+PHBhdGggZD1cXFwiTTQgNHY3YTQgNCAwIDAgMCA0IDRoMTJcXFwiPjwvcGF0aD5cIixcImNvcm5lci1sZWZ0LWRvd25cIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjE0IDE1IDkgMjAgNCAxNVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMjAgNGgtN2E0IDQgMCAwIDAtNCA0djEyXFxcIj48L3BhdGg+XCIsXCJjb3JuZXItbGVmdC11cFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTQgOSA5IDQgNCA5XFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk0yMCAyMGgtN2E0IDQgMCAwIDEtNC00VjRcXFwiPjwvcGF0aD5cIixcImNvcm5lci1yaWdodC1kb3duXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxMCAxNSAxNSAyMCAyMCAxNVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNNCA0aDdhNCA0IDAgMCAxIDQgNHYxMlxcXCI+PC9wYXRoPlwiLFwiY29ybmVyLXJpZ2h0LXVwXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxMCA5IDE1IDQgMjAgOVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNNCAyMGg3YTQgNCAwIDAgMCA0LTRWNFxcXCI+PC9wYXRoPlwiLFwiY29ybmVyLXVwLWxlZnRcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjkgMTQgNCA5IDkgNFxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMjAgMjB2LTdhNCA0IDAgMCAwLTQtNEg0XFxcIj48L3BhdGg+XCIsXCJjb3JuZXItdXAtcmlnaHRcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjE1IDE0IDIwIDkgMTUgNFxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNNCAyMHYtN2E0IDQgMCAwIDEgNC00aDEyXFxcIj48L3BhdGg+XCIsXCJjcHVcIjpcIjxyZWN0IHg9XFxcIjRcXFwiIHk9XFxcIjRcXFwiIHdpZHRoPVxcXCIxNlxcXCIgaGVpZ2h0PVxcXCIxNlxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PHJlY3QgeD1cXFwiOVxcXCIgeT1cXFwiOVxcXCIgd2lkdGg9XFxcIjZcXFwiIGhlaWdodD1cXFwiNlxcXCI+PC9yZWN0PjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjlcXFwiIHkyPVxcXCI0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE1XFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjE1XFxcIiB5Mj1cXFwiNFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCI5XFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTVcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjE1XFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjBcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMjNcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIwXFxcIiB5MT1cXFwiMTRcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjFcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiNFxcXCIgeTI9XFxcIjlcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjE0XFxcIiB4Mj1cXFwiNFxcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+XCIsXCJjcmVkaXQtY2FyZFwiOlwiPHJlY3QgeD1cXFwiMVxcXCIgeT1cXFwiNFxcXCIgd2lkdGg9XFxcIjIyXFxcIiBoZWlnaHQ9XFxcIjE2XFxcIiByeD1cXFwiMlxcXCIgcnk9XFxcIjJcXFwiPjwvcmVjdD48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjEwXFxcIiB4Mj1cXFwiMjNcXFwiIHkyPVxcXCIxMFxcXCI+PC9saW5lPlwiLFwiY3JvcFwiOlwiPHBhdGggZD1cXFwiTTYuMTMgMUw2IDE2YTIgMiAwIDAgMCAyIDJoMTVcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMSA2LjEzTDE2IDZhMiAyIDAgMCAxIDIgMnYxNVxcXCI+PC9wYXRoPlwiLFwiY3Jvc3NoYWlyXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjIyXFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxOFxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjZcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIyMlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT5cIixcImRhdGFiYXNlXCI6XCI8ZWxsaXBzZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCI1XFxcIiByeD1cXFwiOVxcXCIgcnk9XFxcIjNcXFwiPjwvZWxsaXBzZT48cGF0aCBkPVxcXCJNMjEgMTJjMCAxLjY2LTQgMy05IDNzLTktMS4zNC05LTNcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMyA1djE0YzAgMS42NiA0IDMgOSAzczktMS4zNCA5LTNWNVxcXCI+PC9wYXRoPlwiLFwiZGVsZXRlXCI6XCI8cGF0aCBkPVxcXCJNMjEgNEg4bC03IDggNyA4aDEzYTIgMiAwIDAgMCAyLTJWNmEyIDIgMCAwIDAtMi0yelxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxOFxcXCIgeTE9XFxcIjlcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjE4XFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcImRpc2NcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT5cIixcImRpdmlkZS1jaXJjbGVcIjpcIjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTZcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiOFxcXCI+PC9saW5lPjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT5cIixcImRpdmlkZS1zcXVhcmVcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjhcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjE2XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCI4XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCI4XFxcIj48L2xpbmU+XCIsXCJkaXZpZGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiNlxcXCIgcj1cXFwiMlxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjVcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjE5XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjE4XFxcIiByPVxcXCIyXFxcIj48L2NpcmNsZT5cIixcImRvbGxhci1zaWduXCI6XCI8bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIyM1xcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk0xNyA1SDkuNWEzLjUgMy41IDAgMCAwIDAgN2g1YTMuNSAzLjUgMCAwIDEgMCA3SDZcXFwiPjwvcGF0aD5cIixcImRvd25sb2FkLWNsb3VkXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCI4IDE3IDEyIDIxIDE2IDE3XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk0yMC44OCAxOC4wOUE1IDUgMCAwIDAgMTggOWgtMS4yNkE4IDggMCAxIDAgMyAxNi4yOVxcXCI+PC9wYXRoPlwiLFwiZG93bmxvYWRcIjpcIjxwYXRoIGQ9XFxcIk0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiNyAxMCAxMiAxNSAxNyAxMFxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxNVxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiM1xcXCI+PC9saW5lPlwiLFwiZHJpYmJibGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48cGF0aCBkPVxcXCJNOC41NiAyLjc1YzQuMzcgNi4wMyA2LjAyIDkuNDIgOC4wMyAxNy43Mm0yLjU0LTE1LjM4Yy0zLjcyIDQuMzUtOC45NCA1LjY2LTE2Ljg4IDUuODVtMTkuNSAxLjljLTMuNS0uOTMtNi42My0uODItOC45NCAwLTIuNTguOTItNS4wMSAyLjg2LTcuNDQgNi4zMlxcXCI+PC9wYXRoPlwiLFwiZHJvcGxldFwiOlwiPHBhdGggZD1cXFwiTTEyIDIuNjlsNS42NiA1LjY2YTggOCAwIDEgMS0xMS4zMSAwelxcXCI+PC9wYXRoPlwiLFwiZWRpdC0yXCI6XCI8cGF0aCBkPVxcXCJNMTcgM2EyLjgyOCAyLjgyOCAwIDEgMSA0IDRMNy41IDIwLjUgMiAyMmwxLjUtNS41TDE3IDN6XFxcIj48L3BhdGg+XCIsXCJlZGl0LTNcIjpcIjxwYXRoIGQ9XFxcIk0xMiAyMGg5XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE2LjUgMy41YTIuMTIxIDIuMTIxIDAgMCAxIDMgM0w3IDE5bC00IDEgMS00TDE2LjUgMy41elxcXCI+PC9wYXRoPlwiLFwiZWRpdFwiOlwiPHBhdGggZD1cXFwiTTExIDRINGEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoMTRhMiAyIDAgMCAwIDItMnYtN1xcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xOC41IDIuNWEyLjEyMSAyLjEyMSAwIDAgMSAzIDNMMTIgMTVsLTQgMSAxLTQgOS41LTkuNXpcXFwiPjwvcGF0aD5cIixcImV4dGVybmFsLWxpbmtcIjpcIjxwYXRoIGQ9XFxcIk0xOCAxM3Y2YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0yVjhhMiAyIDAgMCAxIDItMmg2XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTUgMyAyMSAzIDIxIDlcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEwXFxcIiB5MT1cXFwiMTRcXFwiIHgyPVxcXCIyMVxcXCIgeTI9XFxcIjNcXFwiPjwvbGluZT5cIixcImV5ZS1vZmZcIjpcIjxwYXRoIGQ9XFxcIk0xNy45NCAxNy45NEExMC4wNyAxMC4wNyAwIDAgMSAxMiAyMGMtNyAwLTExLTgtMTEtOGExOC40NSAxOC40NSAwIDAgMSA1LjA2LTUuOTRNOS45IDQuMjRBOS4xMiA5LjEyIDAgMCAxIDEyIDRjNyAwIDExIDggMTEgOGExOC41IDE4LjUgMCAwIDEtMi4xNiAzLjE5bS02LjcyLTEuMDdhMyAzIDAgMSAxLTQuMjQtNC4yNFxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT5cIixcImV5ZVwiOlwiPHBhdGggZD1cXFwiTTEgMTJzNC04IDExLTggMTEgOCAxMSA4LTQgOC0xMSA4LTExLTgtMTEtOHpcXFwiPjwvcGF0aD48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT5cIixcImZhY2Vib29rXCI6XCI8cGF0aCBkPVxcXCJNMTggMmgtM2E1IDUgMCAwIDAtNSA1djNIN3Y0aDN2OGg0di04aDNsMS00aC00VjdhMSAxIDAgMCAxIDEtMWgzelxcXCI+PC9wYXRoPlwiLFwiZmFzdC1mb3J3YXJkXCI6XCI8cG9seWdvbiBwb2ludHM9XFxcIjEzIDE5IDIyIDEyIDEzIDUgMTMgMTlcXFwiPjwvcG9seWdvbj48cG9seWdvbiBwb2ludHM9XFxcIjIgMTkgMTEgMTIgMiA1IDIgMTlcXFwiPjwvcG9seWdvbj5cIixcImZlYXRoZXJcIjpcIjxwYXRoIGQ9XFxcIk0yMC4yNCAxMi4yNGE2IDYgMCAwIDAtOC40OS04LjQ5TDUgMTAuNVYxOWg4LjV6XFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjE2XFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjJcXFwiIHkyPVxcXCIyMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNy41XFxcIiB5MT1cXFwiMTVcXFwiIHgyPVxcXCI5XFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcImZpZ21hXCI6XCI8cGF0aCBkPVxcXCJNNSA1LjVBMy41IDMuNSAwIDAgMSA4LjUgMkgxMnY3SDguNUEzLjUgMy41IDAgMCAxIDUgNS41elxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xMiAyaDMuNWEzLjUgMy41IDAgMSAxIDAgN0gxMlYyelxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xMiAxMi41YTMuNSAzLjUgMCAxIDEgNyAwIDMuNSAzLjUgMCAxIDEtNyAwelxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk01IDE5LjVBMy41IDMuNSAwIDAgMSA4LjUgMTZIMTJ2My41YTMuNSAzLjUgMCAxIDEtNyAwelxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk01IDEyLjVBMy41IDMuNSAwIDAgMSA4LjUgOUgxMnY3SDguNUEzLjUgMy41IDAgMCAxIDUgMTIuNXpcXFwiPjwvcGF0aD5cIixcImZpbGUtbWludXNcIjpcIjxwYXRoIGQ9XFxcIk0xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOHpcXFwiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPVxcXCIxNCAyIDE0IDggMjAgOFxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiOVxcXCIgeTE9XFxcIjE1XFxcIiB4Mj1cXFwiMTVcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPlwiLFwiZmlsZS1wbHVzXCI6XCI8cGF0aCBkPVxcXCJNMTQgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjh6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTQgMiAxNCA4IDIwIDhcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCIxNVxcXCIgeDI9XFxcIjE1XFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcImZpbGUtdGV4dFwiOlwiPHBhdGggZD1cXFwiTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4elxcXCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XFxcIjE0IDIgMTQgOCAyMCA4XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjEzXFxcIiB4Mj1cXFwiOFxcXCIgeTI9XFxcIjEzXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE2XFxcIiB5MT1cXFwiMTdcXFwiIHgyPVxcXCI4XFxcIiB5Mj1cXFwiMTdcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxMCA5IDkgOSA4IDlcXFwiPjwvcG9seWxpbmU+XCIsXCJmaWxlXCI6XCI8cGF0aCBkPVxcXCJNMTMgMkg2YTIgMiAwIDAgMC0yIDJ2MTZhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0yVjl6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTMgMiAxMyA5IDIwIDlcXFwiPjwvcG9seWxpbmU+XCIsXCJmaWxtXCI6XCI8cmVjdCB4PVxcXCIyXFxcIiB5PVxcXCIyXFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHJ4PVxcXCIyLjE4XFxcIiByeT1cXFwiMi4xOFxcXCI+PC9yZWN0PjxsaW5lIHgxPVxcXCI3XFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjdcXFwiIHkyPVxcXCIyMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxN1xcXCIgeTE9XFxcIjJcXFwiIHgyPVxcXCIxN1xcXCIgeTI9XFxcIjIyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjJcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIyXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMlxcXCIgeTE9XFxcIjdcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyXFxcIiB5MT1cXFwiMTdcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiMTdcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTdcXFwiIHkxPVxcXCIxN1xcXCIgeDI9XFxcIjIyXFxcIiB5Mj1cXFwiMTdcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTdcXFwiIHkxPVxcXCI3XFxcIiB4Mj1cXFwiMjJcXFwiIHkyPVxcXCI3XFxcIj48L2xpbmU+XCIsXCJmaWx0ZXJcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMjIgMyAyIDMgMTAgMTIuNDYgMTAgMTkgMTQgMjEgMTQgMTIuNDYgMjIgM1xcXCI+PC9wb2x5Z29uPlwiLFwiZmxhZ1wiOlwiPHBhdGggZD1cXFwiTTQgMTVzMS0xIDQtMSA1IDIgOCAyIDQtMSA0LTFWM3MtMSAxLTQgMS01LTItOC0yLTQgMS00IDF6XFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjRcXFwiIHkxPVxcXCIyMlxcXCIgeDI9XFxcIjRcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPlwiLFwiZm9sZGVyLW1pbnVzXCI6XCI8cGF0aCBkPVxcXCJNMjIgMTlhMiAyIDAgMCAxLTIgMkg0YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDVsMiAzaDlhMiAyIDAgMCAxIDIgMnpcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiOVxcXCIgeTE9XFxcIjE0XFxcIiB4Mj1cXFwiMTVcXFwiIHkyPVxcXCIxNFxcXCI+PC9saW5lPlwiLFwiZm9sZGVyLXBsdXNcIjpcIjxwYXRoIGQ9XFxcIk0yMiAxOWEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNWwyIDNoOWEyIDIgMCAwIDEgMiAyelxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjExXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiMTRcXFwiIHgyPVxcXCIxNVxcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+XCIsXCJmb2xkZXJcIjpcIjxwYXRoIGQ9XFxcIk0yMiAxOWEyIDIgMCAwIDEtMiAySDRhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoNWwyIDNoOWEyIDIgMCAwIDEgMiAyelxcXCI+PC9wYXRoPlwiLFwiZnJhbWVyXCI6XCI8cGF0aCBkPVxcXCJNNSAxNlY5aDE0VjJINWwxNCAxNGgtN20tNyAwbDcgN3YtN20tNyAwaDdcXFwiPjwvcGF0aD5cIixcImZyb3duXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PHBhdGggZD1cXFwiTTE2IDE2cy0xLjUtMi00LTItNCAyLTQgMlxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjkuMDFcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE1XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjE1LjAxXFxcIiB5Mj1cXFwiOVxcXCI+PC9saW5lPlwiLFwiZ2lmdFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMjAgMTIgMjAgMjIgNCAyMiA0IDEyXFxcIj48L3BvbHlsaW5lPjxyZWN0IHg9XFxcIjJcXFwiIHk9XFxcIjdcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCI1XFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjdcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMTIgN0g3LjVhMi41IDIuNSAwIDAgMSAwLTVDMTEgMiAxMiA3IDEyIDd6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTEyIDdoNC41YTIuNSAyLjUgMCAwIDAgMC01QzEzIDIgMTIgNyAxMiA3elxcXCI+PC9wYXRoPlwiLFwiZ2l0LWJyYW5jaFwiOlwiPGxpbmUgeDE9XFxcIjZcXFwiIHkxPVxcXCIzXFxcIiB4Mj1cXFwiNlxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGNpcmNsZSBjeD1cXFwiMThcXFwiIGN5PVxcXCI2XFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCI2XFxcIiBjeT1cXFwiMThcXFwiIHI9XFxcIjNcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk0xOCA5YTkgOSAwIDAgMS05IDlcXFwiPjwvcGF0aD5cIixcImdpdC1jb21taXRcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjRcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCIxLjA1XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTcuMDFcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIyLjk2XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT5cIixcImdpdC1tZXJnZVwiOlwiPGNpcmNsZSBjeD1cXFwiMThcXFwiIGN5PVxcXCIxOFxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiNlxcXCIgY3k9XFxcIjZcXFwiIHI9XFxcIjNcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk02IDIxVjlhOSA5IDAgMCAwIDkgOVxcXCI+PC9wYXRoPlwiLFwiZ2l0LXB1bGwtcmVxdWVzdFwiOlwiPGNpcmNsZSBjeD1cXFwiMThcXFwiIGN5PVxcXCIxOFxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiNlxcXCIgY3k9XFxcIjZcXFwiIHI9XFxcIjNcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk0xMyA2aDNhMiAyIDAgMCAxIDIgMnY3XFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjZcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiNlxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+XCIsXCJnaXRodWJcIjpcIjxwYXRoIGQ9XFxcIk05IDE5Yy01IDEuNS01LTIuNS03LTNtMTQgNnYtMy44N2EzLjM3IDMuMzcgMCAwIDAtLjk0LTIuNjFjMy4xNC0uMzUgNi40NC0xLjU0IDYuNDQtN0E1LjQ0IDUuNDQgMCAwIDAgMjAgNC43NyA1LjA3IDUuMDcgMCAwIDAgMTkuOTEgMVMxOC43My42NSAxNiAyLjQ4YTEzLjM4IDEzLjM4IDAgMCAwLTcgMEM2LjI3LjY1IDUuMDkgMSA1LjA5IDFBNS4wNyA1LjA3IDAgMCAwIDUgNC43N2E1LjQ0IDUuNDQgMCAwIDAtMS41IDMuNzhjMCA1LjQyIDMuMyA2LjYxIDYuNDQgN0EzLjM3IDMuMzcgMCAwIDAgOSAxOC4xM1YyMlxcXCI+PC9wYXRoPlwiLFwiZ2l0bGFiXCI6XCI8cGF0aCBkPVxcXCJNMjIuNjUgMTQuMzlMMTIgMjIuMTMgMS4zNSAxNC4zOWEuODQuODQgMCAwIDEtLjMtLjk0bDEuMjItMy43OCAyLjQ0LTcuNTFBLjQyLjQyIDAgMCAxIDQuODIgMmEuNDMuNDMgMCAwIDEgLjU4IDAgLjQyLjQyIDAgMCAxIC4xMS4xOGwyLjQ0IDcuNDloOC4xbDIuNDQtNy41MUEuNDIuNDIgMCAwIDEgMTguNiAyYS40My40MyAwIDAgMSAuNTggMCAuNDIuNDIgMCAwIDEgLjExLjE4bDIuNDQgNy41MUwyMyAxMy40NWEuODQuODQgMCAwIDEtLjM1Ljk0elxcXCI+PC9wYXRoPlwiLFwiZ2xvYmVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMlxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMjJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEwelxcXCI+PC9wYXRoPlwiLFwiZ3JpZFwiOlwiPHJlY3QgeD1cXFwiM1xcXCIgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjdcXFwiIGhlaWdodD1cXFwiN1xcXCI+PC9yZWN0PjxyZWN0IHg9XFxcIjE0XFxcIiB5PVxcXCIzXFxcIiB3aWR0aD1cXFwiN1xcXCIgaGVpZ2h0PVxcXCI3XFxcIj48L3JlY3Q+PHJlY3QgeD1cXFwiMTRcXFwiIHk9XFxcIjE0XFxcIiB3aWR0aD1cXFwiN1xcXCIgaGVpZ2h0PVxcXCI3XFxcIj48L3JlY3Q+PHJlY3QgeD1cXFwiM1xcXCIgeT1cXFwiMTRcXFwiIHdpZHRoPVxcXCI3XFxcIiBoZWlnaHQ9XFxcIjdcXFwiPjwvcmVjdD5cIixcImhhcmQtZHJpdmVcIjpcIjxsaW5lIHgxPVxcXCIyMlxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PHBhdGggZD1cXFwiTTUuNDUgNS4xMUwyIDEydjZhMiAyIDAgMCAwIDIgMmgxNmEyIDIgMCAwIDAgMi0ydi02bC0zLjQ1LTYuODlBMiAyIDAgMCAwIDE2Ljc2IDRINy4yNGEyIDIgMCAwIDAtMS43OSAxLjExelxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCI2XFxcIiB5MT1cXFwiMTZcXFwiIHgyPVxcXCI2LjAxXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTBcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjEwLjAxXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT5cIixcImhhc2hcIjpcIjxsaW5lIHgxPVxcXCI0XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjIwXFxcIiB5Mj1cXFwiOVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI0XFxcIiB5MT1cXFwiMTVcXFwiIHgyPVxcXCIyMFxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEwXFxcIiB5MT1cXFwiM1xcXCIgeDI9XFxcIjhcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjNcXFwiIHgyPVxcXCIxNFxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+XCIsXCJoZWFkcGhvbmVzXCI6XCI8cGF0aCBkPVxcXCJNMyAxOHYtNmE5IDkgMCAwIDEgMTggMHY2XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTIxIDE5YTIgMiAwIDAgMS0yIDJoLTFhMiAyIDAgMCAxLTItMnYtM2EyIDIgMCAwIDEgMi0yaDN6TTMgMTlhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMCAyLTJ2LTNhMiAyIDAgMCAwLTItMkgzelxcXCI+PC9wYXRoPlwiLFwiaGVhcnRcIjpcIjxwYXRoIGQ9XFxcIk0yMC44NCA0LjYxYTUuNSA1LjUgMCAwIDAtNy43OCAwTDEyIDUuNjdsLTEuMDYtMS4wNmE1LjUgNS41IDAgMCAwLTcuNzggNy43OGwxLjA2IDEuMDZMMTIgMjEuMjNsNy43OC03Ljc4IDEuMDYtMS4wNmE1LjUgNS41IDAgMCAwIDAtNy43OHpcXFwiPjwvcGF0aD5cIixcImhlbHAtY2lyY2xlXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PHBhdGggZD1cXFwiTTkuMDkgOWEzIDMgMCAwIDEgNS44MyAxYzAgMi0zIDMtMyAzXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTdcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjE3XFxcIj48L2xpbmU+XCIsXCJoZXhhZ29uXCI6XCI8cGF0aCBkPVxcXCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XFxcIj48L3BhdGg+XCIsXCJob21lXCI6XCI8cGF0aCBkPVxcXCJNMyA5bDktNyA5IDd2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiOSAyMiA5IDEyIDE1IDEyIDE1IDIyXFxcIj48L3BvbHlsaW5lPlwiLFwiaW1hZ2VcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGNpcmNsZSBjeD1cXFwiOC41XFxcIiBjeT1cXFwiOC41XFxcIiByPVxcXCIxLjVcXFwiPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9XFxcIjIxIDE1IDE2IDEwIDUgMjFcXFwiPjwvcG9seWxpbmU+XCIsXCJpbmJveFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMjIgMTIgMTYgMTIgMTQgMTUgMTAgMTUgOCAxMiAyIDEyXFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk01LjQ1IDUuMTFMMiAxMnY2YTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtNmwtMy40NS02Ljg5QTIgMiAwIDAgMCAxNi43NiA0SDcuMjRhMiAyIDAgMCAwLTEuNzkgMS4xMXpcXFwiPjwvcGF0aD5cIixcImluZm9cIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCI4XFxcIiB4Mj1cXFwiMTIuMDFcXFwiIHkyPVxcXCI4XFxcIj48L2xpbmU+XCIsXCJpbnN0YWdyYW1cIjpcIjxyZWN0IHg9XFxcIjJcXFwiIHk9XFxcIjJcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgcng9XFxcIjVcXFwiIHJ5PVxcXCI1XFxcIj48L3JlY3Q+PHBhdGggZD1cXFwiTTE2IDExLjM3QTQgNCAwIDEgMSAxMi42MyA4IDQgNCAwIDAgMSAxNiAxMS4zN3pcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMTcuNVxcXCIgeTE9XFxcIjYuNVxcXCIgeDI9XFxcIjE3LjUxXFxcIiB5Mj1cXFwiNi41XFxcIj48L2xpbmU+XCIsXCJpdGFsaWNcIjpcIjxsaW5lIHgxPVxcXCIxOVxcXCIgeTE9XFxcIjRcXFwiIHgyPVxcXCIxMFxcXCIgeTI9XFxcIjRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTRcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjVcXFwiIHkyPVxcXCIyMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNVxcXCIgeTE9XFxcIjRcXFwiIHgyPVxcXCI5XFxcIiB5Mj1cXFwiMjBcXFwiPjwvbGluZT5cIixcImtleVwiOlwiPHBhdGggZD1cXFwiTTIxIDJsLTIgMm0tNy42MSA3LjYxYTUuNSA1LjUgMCAxIDEtNy43NzggNy43NzggNS41IDUuNSAwIDAgMSA3Ljc3Ny03Ljc3N3ptMCAwTDE1LjUgNy41bTAgMGwzIDNMMjIgN2wtMy0zbS0zLjUgMy41TDE5IDRcXFwiPjwvcGF0aD5cIixcImxheWVyc1wiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIxMiAyIDIgNyAxMiAxMiAyMiA3IDEyIDJcXFwiPjwvcG9seWdvbj48cG9seWxpbmUgcG9pbnRzPVxcXCIyIDE3IDEyIDIyIDIyIDE3XFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjIgMTIgMTIgMTcgMjIgMTJcXFwiPjwvcG9seWxpbmU+XCIsXCJsYXlvdXRcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjNcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMjFcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjlcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+XCIsXCJsaWZlLWJ1b3lcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCI0XFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiNC45M1xcXCIgeTE9XFxcIjQuOTNcXFwiIHgyPVxcXCI5LjE3XFxcIiB5Mj1cXFwiOS4xN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNC44M1xcXCIgeTE9XFxcIjE0LjgzXFxcIiB4Mj1cXFwiMTkuMDdcXFwiIHkyPVxcXCIxOS4wN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNC44M1xcXCIgeTE9XFxcIjkuMTdcXFwiIHgyPVxcXCIxOS4wN1xcXCIgeTI9XFxcIjQuOTNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTQuODNcXFwiIHkxPVxcXCI5LjE3XFxcIiB4Mj1cXFwiMTguMzZcXFwiIHkyPVxcXCI1LjY0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjQuOTNcXFwiIHkxPVxcXCIxOS4wN1xcXCIgeDI9XFxcIjkuMTdcXFwiIHkyPVxcXCIxNC44M1xcXCI+PC9saW5lPlwiLFwibGluay0yXCI6XCI8cGF0aCBkPVxcXCJNMTUgN2gzYTUgNSAwIDAgMSA1IDUgNSA1IDAgMCAxLTUgNWgtM20tNiAwSDZhNSA1IDAgMCAxLTUtNSA1IDUgMCAwIDEgNS01aDNcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwibGlua1wiOlwiPHBhdGggZD1cXFwiTTEwIDEzYTUgNSAwIDAgMCA3LjU0LjU0bDMtM2E1IDUgMCAwIDAtNy4wNy03LjA3bC0xLjcyIDEuNzFcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMTQgMTFhNSA1IDAgMCAwLTcuNTQtLjU0bC0zIDNhNSA1IDAgMCAwIDcuMDcgNy4wN2wxLjcxLTEuNzFcXFwiPjwvcGF0aD5cIixcImxpbmtlZGluXCI6XCI8cGF0aCBkPVxcXCJNMTYgOGE2IDYgMCAwIDEgNiA2djdoLTR2LTdhMiAyIDAgMCAwLTItMiAyIDIgMCAwIDAtMiAydjdoLTR2LTdhNiA2IDAgMCAxIDYtNnpcXFwiPjwvcGF0aD48cmVjdCB4PVxcXCIyXFxcIiB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiNFxcXCIgaGVpZ2h0PVxcXCIxMlxcXCI+PC9yZWN0PjxjaXJjbGUgY3g9XFxcIjRcXFwiIGN5PVxcXCI0XFxcIiByPVxcXCIyXFxcIj48L2NpcmNsZT5cIixcImxpc3RcIjpcIjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiNlxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIyMVxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjhcXFwiIHkxPVxcXCIxOFxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiM1xcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIzLjAxXFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIzXFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIzLjAxXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiM1xcXCIgeTE9XFxcIjE4XFxcIiB4Mj1cXFwiMy4wMVxcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+XCIsXCJsb2FkZXJcIjpcIjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxOFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMjJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNC45M1xcXCIgeTE9XFxcIjQuOTNcXFwiIHgyPVxcXCI3Ljc2XFxcIiB5Mj1cXFwiNy43NlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNi4yNFxcXCIgeTE9XFxcIjE2LjI0XFxcIiB4Mj1cXFwiMTkuMDdcXFwiIHkyPVxcXCIxOS4wN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyXFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCI2XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMThcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIyXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNC45M1xcXCIgeTE9XFxcIjE5LjA3XFxcIiB4Mj1cXFwiNy43NlxcXCIgeTI9XFxcIjE2LjI0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE2LjI0XFxcIiB5MT1cXFwiNy43NlxcXCIgeDI9XFxcIjE5LjA3XFxcIiB5Mj1cXFwiNC45M1xcXCI+PC9saW5lPlwiLFwibG9ja1wiOlwiPHJlY3QgeD1cXFwiM1xcXCIgeT1cXFwiMTFcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxMVxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PHBhdGggZD1cXFwiTTcgMTFWN2E1IDUgMCAwIDEgMTAgMHY0XFxcIj48L3BhdGg+XCIsXCJsb2ctaW5cIjpcIjxwYXRoIGQ9XFxcIk0xNSAzaDRhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAyaC00XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTAgMTcgMTUgMTIgMTAgN1xcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMTVcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjNcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwibG9nLW91dFwiOlwiPHBhdGggZD1cXFwiTTkgMjFINWEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg0XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTYgMTcgMjEgMTIgMTYgN1xcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjlcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwibWFpbFwiOlwiPHBhdGggZD1cXFwiTTQgNGgxNmMxLjEgMCAyIC45IDIgMnYxMmMwIDEuMS0uOSAyLTIgMkg0Yy0xLjEgMC0yLS45LTItMlY2YzAtMS4xLjktMiAyLTJ6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMjIsNiAxMiwxMyAyLDZcXFwiPjwvcG9seWxpbmU+XCIsXCJtYXAtcGluXCI6XCI8cGF0aCBkPVxcXCJNMjEgMTBjMCA3LTkgMTMtOSAxM3MtOS02LTktMTNhOSA5IDAgMCAxIDE4IDB6XFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMFxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+XCIsXCJtYXBcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMSA2IDEgMjIgOCAxOCAxNiAyMiAyMyAxOCAyMyAyIDE2IDYgOCAyIDEgNlxcXCI+PC9wb2x5Z29uPjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjhcXFwiIHkyPVxcXCIxOFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjIyXFxcIj48L2xpbmU+XCIsXCJtYXhpbWl6ZS0yXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxNSAzIDIxIDMgMjEgOVxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI5IDIxIDMgMjEgMyAxNVxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIzXFxcIiB4Mj1cXFwiMTRcXFwiIHkyPVxcXCIxMFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIzXFxcIiB5MT1cXFwiMjFcXFwiIHgyPVxcXCIxMFxcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+XCIsXCJtYXhpbWl6ZVwiOlwiPHBhdGggZD1cXFwiTTggM0g1YTIgMiAwIDAgMC0yIDJ2M20xOCAwVjVhMiAyIDAgMCAwLTItMmgtM20wIDE4aDNhMiAyIDAgMCAwIDItMnYtM00zIDE2djNhMiAyIDAgMCAwIDIgMmgzXFxcIj48L3BhdGg+XCIsXCJtZWhcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjE1XFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjkuMDFcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE1XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjE1LjAxXFxcIiB5Mj1cXFwiOVxcXCI+PC9saW5lPlwiLFwibWVudVwiOlwiPGxpbmUgeDE9XFxcIjNcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiM1xcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIyMVxcXCIgeTI9XFxcIjZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiM1xcXCIgeTE9XFxcIjE4XFxcIiB4Mj1cXFwiMjFcXFwiIHkyPVxcXCIxOFxcXCI+PC9saW5lPlwiLFwibWVzc2FnZS1jaXJjbGVcIjpcIjxwYXRoIGQ9XFxcIk0yMSAxMS41YTguMzggOC4zOCAwIDAgMS0uOSAzLjggOC41IDguNSAwIDAgMS03LjYgNC43IDguMzggOC4zOCAwIDAgMS0zLjgtLjlMMyAyMWwxLjktNS43YTguMzggOC4zOCAwIDAgMS0uOS0zLjggOC41IDguNSAwIDAgMSA0LjctNy42IDguMzggOC4zOCAwIDAgMSAzLjgtLjloLjVhOC40OCA4LjQ4IDAgMCAxIDggOHYuNXpcXFwiPjwvcGF0aD5cIixcIm1lc3NhZ2Utc3F1YXJlXCI6XCI8cGF0aCBkPVxcXCJNMjEgMTVhMiAyIDAgMCAxLTIgMkg3bC00IDRWNWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDJ6XFxcIj48L3BhdGg+XCIsXCJtaWMtb2ZmXCI6XCI8bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+PHBhdGggZD1cXFwiTTkgOXYzYTMgMyAwIDAgMCA1LjEyIDIuMTJNMTUgOS4zNFY0YTMgMyAwIDAgMC01Ljk0LS42XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE3IDE2Ljk1QTcgNyAwIDAgMSA1IDEydi0ybTE0IDB2MmE3IDcgMCAwIDEtLjExIDEuMjNcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxOVxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjIzXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIyM1xcXCI+PC9saW5lPlwiLFwibWljXCI6XCI8cGF0aCBkPVxcXCJNMTIgMWEzIDMgMCAwIDAtMyAzdjhhMyAzIDAgMCAwIDYgMFY0YTMgMyAwIDAgMC0zLTN6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE5IDEwdjJhNyA3IDAgMCAxLTE0IDB2LTJcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxOVxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjIzXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIyM1xcXCI+PC9saW5lPlwiLFwibWluaW1pemUtMlwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiNCAxNCAxMCAxNCAxMCAyMFxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIyMCAxMCAxNCAxMCAxNCA0XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxNFxcXCIgeTE9XFxcIjEwXFxcIiB4Mj1cXFwiMjFcXFwiIHkyPVxcXCIzXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjNcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjEwXFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT5cIixcIm1pbmltaXplXCI6XCI8cGF0aCBkPVxcXCJNOCAzdjNhMiAyIDAgMCAxLTIgMkgzbTE4IDBoLTNhMiAyIDAgMCAxLTItMlYzbTAgMTh2LTNhMiAyIDAgMCAxIDItMmgzTTMgMTZoM2EyIDIgMCAwIDEgMiAydjNcXFwiPjwvcGF0aD5cIixcIm1pbnVzLWNpcmNsZVwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCI4XFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+XCIsXCJtaW51cy1zcXVhcmVcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjhcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjE2XFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT5cIixcIm1pbnVzXCI6XCI8bGluZSB4MT1cXFwiNVxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTlcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwibW9uaXRvclwiOlwiPHJlY3QgeD1cXFwiMlxcXCIgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjE0XFxcIiByeD1cXFwiMlxcXCIgcnk9XFxcIjJcXFwiPjwvcmVjdD48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjIxXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjE3XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPlwiLFwibW9vblwiOlwiPHBhdGggZD1cXFwiTTIxIDEyLjc5QTkgOSAwIDEgMSAxMS4yMSAzIDcgNyAwIDAgMCAyMSAxMi43OXpcXFwiPjwvcGF0aD5cIixcIm1vcmUtaG9yaXpvbnRhbFwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMVxcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiMTlcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMVxcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiNVxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxXFxcIj48L2NpcmNsZT5cIixcIm1vcmUtdmVydGljYWxcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjFcXFwiPjwvY2lyY2xlPjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiNVxcXCIgcj1cXFwiMVxcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxOVxcXCIgcj1cXFwiMVxcXCI+PC9jaXJjbGU+XCIsXCJtb3VzZS1wb2ludGVyXCI6XCI8cGF0aCBkPVxcXCJNMyAzbDcuMDcgMTYuOTcgMi41MS03LjM5IDcuMzktMi41MUwzIDN6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTEzIDEzbDYgNlxcXCI+PC9wYXRoPlwiLFwibW92ZVwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiNSA5IDIgMTIgNSAxNVxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI5IDUgMTIgMiAxNSA1XFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjE1IDE5IDEyIDIyIDkgMTlcXFwiPjwvcG9seWxpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTkgOSAyMiAxMiAxOSAxNVxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMlxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMjJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjIyXFxcIj48L2xpbmU+XCIsXCJtdXNpY1wiOlwiPHBhdGggZD1cXFwiTTkgMThWNWwxMi0ydjEzXFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiNlxcXCIgY3k9XFxcIjE4XFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxOFxcXCIgY3k9XFxcIjE2XFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT5cIixcIm5hdmlnYXRpb24tMlwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIxMiAyIDE5IDIxIDEyIDE3IDUgMjEgMTIgMlxcXCI+PC9wb2x5Z29uPlwiLFwibmF2aWdhdGlvblwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIzIDExIDIyIDIgMTMgMjEgMTEgMTMgMyAxMVxcXCI+PC9wb2x5Z29uPlwiLFwib2N0YWdvblwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCI3Ljg2IDIgMTYuMTQgMiAyMiA3Ljg2IDIyIDE2LjE0IDE2LjE0IDIyIDcuODYgMjIgMiAxNi4xNCAyIDcuODYgNy44NiAyXFxcIj48L3BvbHlnb24+XCIsXCJwYWNrYWdlXCI6XCI8bGluZSB4MT1cXFwiMTYuNVxcXCIgeTE9XFxcIjkuNFxcXCIgeDI9XFxcIjcuNVxcXCIgeTI9XFxcIjQuMjFcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMjEgMTZWOGEyIDIgMCAwIDAtMS0xLjczbC03LTRhMiAyIDAgMCAwLTIgMGwtNyA0QTIgMiAwIDAgMCAzIDh2OGEyIDIgMCAwIDAgMSAxLjczbDcgNGEyIDIgMCAwIDAgMiAwbDctNEEyIDIgMCAwIDAgMjEgMTZ6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMy4yNyA2Ljk2IDEyIDEyLjAxIDIwLjczIDYuOTZcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjIuMDhcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjEyXFxcIj48L2xpbmU+XCIsXCJwYXBlcmNsaXBcIjpcIjxwYXRoIGQ9XFxcIk0yMS40NCAxMS4wNWwtOS4xOSA5LjE5YTYgNiAwIDAgMS04LjQ5LTguNDlsOS4xOS05LjE5YTQgNCAwIDAgMSA1LjY2IDUuNjZsLTkuMiA5LjE5YTIgMiAwIDAgMS0yLjgzLTIuODNsOC40OS04LjQ4XFxcIj48L3BhdGg+XCIsXCJwYXVzZS1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMTBcXFwiIHkxPVxcXCIxNVxcXCIgeDI9XFxcIjEwXFxcIiB5Mj1cXFwiOVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNFxcXCIgeTE9XFxcIjE1XFxcIiB4Mj1cXFwiMTRcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+XCIsXCJwYXVzZVwiOlwiPHJlY3QgeD1cXFwiNlxcXCIgeT1cXFwiNFxcXCIgd2lkdGg9XFxcIjRcXFwiIGhlaWdodD1cXFwiMTZcXFwiPjwvcmVjdD48cmVjdCB4PVxcXCIxNFxcXCIgeT1cXFwiNFxcXCIgd2lkdGg9XFxcIjRcXFwiIGhlaWdodD1cXFwiMTZcXFwiPjwvcmVjdD5cIixcInBlbi10b29sXCI6XCI8cGF0aCBkPVxcXCJNMTIgMTlsNy03IDMgMy03IDctMy0zelxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0xOCAxM2wtMS41LTcuNUwyIDJsMy41IDE0LjVMMTMgMThsNS01elxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0yIDJsNy41ODYgNy41ODZcXFwiPjwvcGF0aD48Y2lyY2xlIGN4PVxcXCIxMVxcXCIgY3k9XFxcIjExXFxcIiByPVxcXCIyXFxcIj48L2NpcmNsZT5cIixcInBlcmNlbnRcIjpcIjxsaW5lIHgxPVxcXCIxOVxcXCIgeTE9XFxcIjVcXFwiIHgyPVxcXCI1XFxcIiB5Mj1cXFwiMTlcXFwiPjwvbGluZT48Y2lyY2xlIGN4PVxcXCI2LjVcXFwiIGN5PVxcXCI2LjVcXFwiIHI9XFxcIjIuNVxcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiMTcuNVxcXCIgY3k9XFxcIjE3LjVcXFwiIHI9XFxcIjIuNVxcXCI+PC9jaXJjbGU+XCIsXCJwaG9uZS1jYWxsXCI6XCI8cGF0aCBkPVxcXCJNMTUuMDUgNUE1IDUgMCAwIDEgMTkgOC45NU0xNS4wNSAxQTkgOSAwIDAgMSAyMyA4Ljk0bS0xIDcuOTh2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcXFwiPjwvcGF0aD5cIixcInBob25lLWZvcndhcmRlZFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTkgMSAyMyA1IDE5IDlcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjE1XFxcIiB5MT1cXFwiNVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiNVxcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk0yMiAxNi45MnYzYTIgMiAwIDAgMS0yLjE4IDIgMTkuNzkgMTkuNzkgMCAwIDEtOC42My0zLjA3IDE5LjUgMTkuNSAwIDAgMS02LTYgMTkuNzkgMTkuNzkgMCAwIDEtMy4wNy04LjY3QTIgMiAwIDAgMSA0LjExIDJoM2EyIDIgMCAwIDEgMiAxLjcyIDEyLjg0IDEyLjg0IDAgMCAwIC43IDIuODEgMiAyIDAgMCAxLS40NSAyLjExTDguMDkgOS45MWExNiAxNiAwIDAgMCA2IDZsMS4yNy0xLjI3YTIgMiAwIDAgMSAyLjExLS40NSAxMi44NCAxMi44NCAwIDAgMCAyLjgxLjdBMiAyIDAgMCAxIDIyIDE2LjkyelxcXCI+PC9wYXRoPlwiLFwicGhvbmUtaW5jb21pbmdcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjE2IDIgMTYgOCAyMiA4XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIyM1xcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxNlxcXCIgeTI9XFxcIjhcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcXFwiPjwvcGF0aD5cIixcInBob25lLW1pc3NlZFwiOlwiPGxpbmUgeDE9XFxcIjIzXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiN1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxN1xcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjdcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcXFwiPjwvcGF0aD5cIixcInBob25lLW9mZlwiOlwiPHBhdGggZD1cXFwiTTEwLjY4IDEzLjMxYTE2IDE2IDAgMCAwIDMuNDEgMi42bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43IDIgMiAwIDAgMSAxLjcyIDJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS40MiAxOS40MiAwIDAgMS0zLjMzLTIuNjdtLTIuNjctMy4zNGExOS43OSAxOS43OSAwIDAgMS0zLjA3LTguNjNBMiAyIDAgMCAxIDQuMTEgMmgzYTIgMiAwIDAgMSAyIDEuNzIgMTIuODQgMTIuODQgMCAwIDAgLjcgMi44MSAyIDIgMCAwIDEtLjQ1IDIuMTFMOC4wOSA5LjkxXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjIzXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjFcXFwiIHkyPVxcXCIyM1xcXCI+PC9saW5lPlwiLFwicGhvbmUtb3V0Z29pbmdcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjIzIDcgMjMgMSAxNyAxXFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxNlxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjFcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcXFwiPjwvcGF0aD5cIixcInBob25lXCI6XCI8cGF0aCBkPVxcXCJNMjIgMTYuOTJ2M2EyIDIgMCAwIDEtMi4xOCAyIDE5Ljc5IDE5Ljc5IDAgMCAxLTguNjMtMy4wNyAxOS41IDE5LjUgMCAwIDEtNi02IDE5Ljc5IDE5Ljc5IDAgMCAxLTMuMDctOC42N0EyIDIgMCAwIDEgNC4xMSAyaDNhMiAyIDAgMCAxIDIgMS43MiAxMi44NCAxMi44NCAwIDAgMCAuNyAyLjgxIDIgMiAwIDAgMS0uNDUgMi4xMUw4LjA5IDkuOTFhMTYgMTYgMCAwIDAgNiA2bDEuMjctMS4yN2EyIDIgMCAwIDEgMi4xMS0uNDUgMTIuODQgMTIuODQgMCAwIDAgMi44MS43QTIgMiAwIDAgMSAyMiAxNi45MnpcXFwiPjwvcGF0aD5cIixcInBpZS1jaGFydFwiOlwiPHBhdGggZD1cXFwiTTIxLjIxIDE1Ljg5QTEwIDEwIDAgMSAxIDggMi44M1xcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk0yMiAxMkExMCAxMCAwIDAgMCAxMiAydjEwelxcXCI+PC9wYXRoPlwiLFwicGxheS1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48cG9seWdvbiBwb2ludHM9XFxcIjEwIDggMTYgMTIgMTAgMTYgMTAgOFxcXCI+PC9wb2x5Z29uPlwiLFwicGxheVwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCI1IDMgMTkgMTIgNSAyMSA1IDNcXFwiPjwvcG9seWdvbj5cIixcInBsdXMtY2lyY2xlXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwicGx1cy1zcXVhcmVcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTZcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwicGx1c1wiOlwiPGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiNVxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTlcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNVxcXCIgeTE9XFxcIjEyXFxcIiB4Mj1cXFwiMTlcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwicG9ja2V0XCI6XCI8cGF0aCBkPVxcXCJNNCAzaDE2YTIgMiAwIDAgMSAyIDJ2NmExMCAxMCAwIDAgMS0xMCAxMEExMCAxMCAwIDAgMSAyIDExVjVhMiAyIDAgMCAxIDItMnpcXFwiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPVxcXCI4IDEwIDEyIDE0IDE2IDEwXFxcIj48L3BvbHlsaW5lPlwiLFwicG93ZXJcIjpcIjxwYXRoIGQ9XFxcIk0xOC4zNiA2LjY0YTkgOSAwIDEgMS0xMi43MyAwXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT5cIixcInByaW50ZXJcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjYgOSA2IDIgMTggMiAxOCA5XFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk02IDE4SDRhMiAyIDAgMCAxLTItMnYtNWEyIDIgMCAwIDEgMi0yaDE2YTIgMiAwIDAgMSAyIDJ2NWEyIDIgMCAwIDEtMiAyaC0yXFxcIj48L3BhdGg+PHJlY3QgeD1cXFwiNlxcXCIgeT1cXFwiMTRcXFwiIHdpZHRoPVxcXCIxMlxcXCIgaGVpZ2h0PVxcXCI4XFxcIj48L3JlY3Q+XCIsXCJyYWRpb1wiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMlxcXCI+PC9jaXJjbGU+PHBhdGggZD1cXFwiTTE2LjI0IDcuNzZhNiA2IDAgMCAxIDAgOC40OW0tOC40OC0uMDFhNiA2IDAgMCAxIDAtOC40OW0xMS4zMS0yLjgyYTEwIDEwIDAgMCAxIDAgMTQuMTRtLTE0LjE0IDBhMTAgMTAgMCAwIDEgMC0xNC4xNFxcXCI+PC9wYXRoPlwiLFwicmVmcmVzaC1jY3dcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjEgNCAxIDEwIDcgMTBcXFwiPjwvcG9seWxpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMjMgMjAgMjMgMTQgMTcgMTRcXFwiPjwvcG9seWxpbmU+PHBhdGggZD1cXFwiTTIwLjQ5IDlBOSA5IDAgMCAwIDUuNjQgNS42NEwxIDEwbTIyIDRsLTQuNjQgNC4zNkE5IDkgMCAwIDEgMy41MSAxNVxcXCI+PC9wYXRoPlwiLFwicmVmcmVzaC1jd1wiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMjMgNCAyMyAxMCAxNyAxMFxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxIDIwIDEgMTQgNyAxNFxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMy41MSA5YTkgOSAwIDAgMSAxNC44NS0zLjM2TDIzIDEwTTEgMTRsNC42NCA0LjM2QTkgOSAwIDAgMCAyMC40OSAxNVxcXCI+PC9wYXRoPlwiLFwicmVwZWF0XCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxNyAxIDIxIDUgMTcgOVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMyAxMVY5YTQgNCAwIDAgMSA0LTRoMTRcXFwiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPVxcXCI3IDIzIDMgMTkgNyAxNVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMjEgMTN2MmE0IDQgMCAwIDEtNCA0SDNcXFwiPjwvcGF0aD5cIixcInJld2luZFwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIxMSAxOSAyIDEyIDExIDUgMTEgMTlcXFwiPjwvcG9seWdvbj48cG9seWdvbiBwb2ludHM9XFxcIjIyIDE5IDEzIDEyIDIyIDUgMjIgMTlcXFwiPjwvcG9seWdvbj5cIixcInJvdGF0ZS1jY3dcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjEgNCAxIDEwIDcgMTBcXFwiPjwvcG9seWxpbmU+PHBhdGggZD1cXFwiTTMuNTEgMTVhOSA5IDAgMSAwIDIuMTMtOS4zNkwxIDEwXFxcIj48L3BhdGg+XCIsXCJyb3RhdGUtY3dcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjIzIDQgMjMgMTAgMTcgMTBcXFwiPjwvcG9seWxpbmU+PHBhdGggZD1cXFwiTTIwLjQ5IDE1YTkgOSAwIDEgMS0yLjEyLTkuMzZMMjMgMTBcXFwiPjwvcGF0aD5cIixcInJzc1wiOlwiPHBhdGggZD1cXFwiTTQgMTFhOSA5IDAgMCAxIDkgOVxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk00IDRhMTYgMTYgMCAwIDEgMTYgMTZcXFwiPjwvcGF0aD48Y2lyY2xlIGN4PVxcXCI1XFxcIiBjeT1cXFwiMTlcXFwiIHI9XFxcIjFcXFwiPjwvY2lyY2xlPlwiLFwic2F2ZVwiOlwiPHBhdGggZD1cXFwiTTE5IDIxSDVhMiAyIDAgMCAxLTItMlY1YTIgMiAwIDAgMSAyLTJoMTFsNSA1djExYTIgMiAwIDAgMS0yIDJ6XFxcIj48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTcgMjEgMTcgMTMgNyAxMyA3IDIxXFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjcgMyA3IDggMTUgOFxcXCI+PC9wb2x5bGluZT5cIixcInNjaXNzb3JzXCI6XCI8Y2lyY2xlIGN4PVxcXCI2XFxcIiBjeT1cXFwiNlxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiNlxcXCIgY3k9XFxcIjE4XFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMjBcXFwiIHkxPVxcXCI0XFxcIiB4Mj1cXFwiOC4xMlxcXCIgeTI9XFxcIjE1Ljg4XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE0LjQ3XFxcIiB5MT1cXFwiMTQuNDhcXFwiIHgyPVxcXCIyMFxcXCIgeTI9XFxcIjIwXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjguMTJcXFwiIHkxPVxcXCI4LjEyXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPlwiLFwic2VhcmNoXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMVxcXCIgY3k9XFxcIjExXFxcIiByPVxcXCI4XFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjE2LjY1XFxcIiB5Mj1cXFwiMTYuNjVcXFwiPjwvbGluZT5cIixcInNlbmRcIjpcIjxsaW5lIHgxPVxcXCIyMlxcXCIgeTE9XFxcIjJcXFwiIHgyPVxcXCIxMVxcXCIgeTI9XFxcIjEzXFxcIj48L2xpbmU+PHBvbHlnb24gcG9pbnRzPVxcXCIyMiAyIDE1IDIyIDExIDEzIDIgOSAyMiAyXFxcIj48L3BvbHlnb24+XCIsXCJzZXJ2ZXJcIjpcIjxyZWN0IHg9XFxcIjJcXFwiIHk9XFxcIjJcXFwiIHdpZHRoPVxcXCIyMFxcXCIgaGVpZ2h0PVxcXCI4XFxcIiByeD1cXFwiMlxcXCIgcnk9XFxcIjJcXFwiPjwvcmVjdD48cmVjdCB4PVxcXCIyXFxcIiB5PVxcXCIxNFxcXCIgd2lkdGg9XFxcIjIwXFxcIiBoZWlnaHQ9XFxcIjhcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxsaW5lIHgxPVxcXCI2XFxcIiB5MT1cXFwiNlxcXCIgeDI9XFxcIjYuMDFcXFwiIHkyPVxcXCI2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjZcXFwiIHkxPVxcXCIxOFxcXCIgeDI9XFxcIjYuMDFcXFwiIHkyPVxcXCIxOFxcXCI+PC9saW5lPlwiLFwic2V0dGluZ3NcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjNcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk0xOS40IDE1YTEuNjUgMS42NSAwIDAgMCAuMzMgMS44MmwuMDYuMDZhMiAyIDAgMCAxIDAgMi44MyAyIDIgMCAwIDEtMi44MyAwbC0uMDYtLjA2YTEuNjUgMS42NSAwIDAgMC0xLjgyLS4zMyAxLjY1IDEuNjUgMCAwIDAtMSAxLjUxVjIxYTIgMiAwIDAgMS0yIDIgMiAyIDAgMCAxLTItMnYtLjA5QTEuNjUgMS42NSAwIDAgMCA5IDE5LjRhMS42NSAxLjY1IDAgMCAwLTEuODIuMzNsLS4wNi4wNmEyIDIgMCAwIDEtMi44MyAwIDIgMiAwIDAgMSAwLTIuODNsLjA2LS4wNmExLjY1IDEuNjUgMCAwIDAgLjMzLTEuODIgMS42NSAxLjY1IDAgMCAwLTEuNTEtMUgzYTIgMiAwIDAgMS0yLTIgMiAyIDAgMCAxIDItMmguMDlBMS42NSAxLjY1IDAgMCAwIDQuNiA5YTEuNjUgMS42NSAwIDAgMC0uMzMtMS44MmwtLjA2LS4wNmEyIDIgMCAwIDEgMC0yLjgzIDIgMiAwIDAgMSAyLjgzIDBsLjA2LjA2YTEuNjUgMS42NSAwIDAgMCAxLjgyLjMzSDlhMS42NSAxLjY1IDAgMCAwIDEtMS41MVYzYTIgMiAwIDAgMSAyLTIgMiAyIDAgMCAxIDIgMnYuMDlhMS42NSAxLjY1IDAgMCAwIDEgMS41MSAxLjY1IDEuNjUgMCAwIDAgMS44Mi0uMzNsLjA2LS4wNmEyIDIgMCAwIDEgMi44MyAwIDIgMiAwIDAgMSAwIDIuODNsLS4wNi4wNmExLjY1IDEuNjUgMCAwIDAtLjMzIDEuODJWOWExLjY1IDEuNjUgMCAwIDAgMS41MSAxSDIxYTIgMiAwIDAgMSAyIDIgMiAyIDAgMCAxLTIgMmgtLjA5YTEuNjUgMS42NSAwIDAgMC0xLjUxIDF6XFxcIj48L3BhdGg+XCIsXCJzaGFyZS0yXCI6XCI8Y2lyY2xlIGN4PVxcXCIxOFxcXCIgY3k9XFxcIjVcXFwiIHI9XFxcIjNcXFwiPjwvY2lyY2xlPjxjaXJjbGUgY3g9XFxcIjZcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+PGNpcmNsZSBjeD1cXFwiMThcXFwiIGN5PVxcXCIxOVxcXCIgcj1cXFwiM1xcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjguNTlcXFwiIHkxPVxcXCIxMy41MVxcXCIgeDI9XFxcIjE1LjQyXFxcIiB5Mj1cXFwiMTcuNDlcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTUuNDFcXFwiIHkxPVxcXCI2LjUxXFxcIiB4Mj1cXFwiOC41OVxcXCIgeTI9XFxcIjEwLjQ5XFxcIj48L2xpbmU+XCIsXCJzaGFyZVwiOlwiPHBhdGggZD1cXFwiTTQgMTJ2OGEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJ2LThcXFwiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPVxcXCIxNiA2IDEyIDIgOCA2XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+XCIsXCJzaGllbGQtb2ZmXCI6XCI8cGF0aCBkPVxcXCJNMTkuNjkgMTRhNi45IDYuOSAwIDAgMCAuMzEtMlY1bC04LTMtMy4xNiAxLjE4XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTQuNzMgNC43M0w0IDV2N2MwIDYgOCAxMCA4IDEwYTIwLjI5IDIwLjI5IDAgMCAwIDUuNjItNC4zOFxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT5cIixcInNoaWVsZFwiOlwiPHBhdGggZD1cXFwiTTEyIDIyczgtNCA4LTEwVjVsLTgtMy04IDN2N2MwIDYgOCAxMCA4IDEwelxcXCI+PC9wYXRoPlwiLFwic2hvcHBpbmctYmFnXCI6XCI8cGF0aCBkPVxcXCJNNiAyTDMgNnYxNGEyIDIgMCAwIDAgMiAyaDE0YTIgMiAwIDAgMCAyLTJWNmwtMy00elxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCIzXFxcIiB5MT1cXFwiNlxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiNlxcXCI+PC9saW5lPjxwYXRoIGQ9XFxcIk0xNiAxMGE0IDQgMCAwIDEtOCAwXFxcIj48L3BhdGg+XCIsXCJzaG9wcGluZy1jYXJ0XCI6XCI8Y2lyY2xlIGN4PVxcXCI5XFxcIiBjeT1cXFwiMjFcXFwiIHI9XFxcIjFcXFwiPjwvY2lyY2xlPjxjaXJjbGUgY3g9XFxcIjIwXFxcIiBjeT1cXFwiMjFcXFwiIHI9XFxcIjFcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk0xIDFoNGwyLjY4IDEzLjM5YTIgMiAwIDAgMCAyIDEuNjFoOS43MmEyIDIgMCAwIDAgMi0xLjYxTDIzIDZINlxcXCI+PC9wYXRoPlwiLFwic2h1ZmZsZVwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMTYgMyAyMSAzIDIxIDhcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjRcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjIxXFxcIiB5Mj1cXFwiM1xcXCI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjIxIDE2IDIxIDIxIDE2IDIxXFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCIxNVxcXCIgeTE9XFxcIjE1XFxcIiB4Mj1cXFwiMjFcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI0XFxcIiB5MT1cXFwiNFxcXCIgeDI9XFxcIjlcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+XCIsXCJzaWRlYmFyXCI6XCI8cmVjdCB4PVxcXCIzXFxcIiB5PVxcXCIzXFxcIiB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMThcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiM1xcXCIgeDI9XFxcIjlcXFwiIHkyPVxcXCIyMVxcXCI+PC9saW5lPlwiLFwic2tpcC1iYWNrXCI6XCI8cG9seWdvbiBwb2ludHM9XFxcIjE5IDIwIDkgMTIgMTkgNCAxOSAyMFxcXCI+PC9wb2x5Z29uPjxsaW5lIHgxPVxcXCI1XFxcIiB5MT1cXFwiMTlcXFwiIHgyPVxcXCI1XFxcIiB5Mj1cXFwiNVxcXCI+PC9saW5lPlwiLFwic2tpcC1mb3J3YXJkXCI6XCI8cG9seWdvbiBwb2ludHM9XFxcIjUgNCAxNSAxMiA1IDIwIDUgNFxcXCI+PC9wb2x5Z29uPjxsaW5lIHgxPVxcXCIxOVxcXCIgeTE9XFxcIjVcXFwiIHgyPVxcXCIxOVxcXCIgeTI9XFxcIjE5XFxcIj48L2xpbmU+XCIsXCJzbGFja1wiOlwiPHBhdGggZD1cXFwiTTE0LjUgMTBjLS44MyAwLTEuNS0uNjctMS41LTEuNXYtNWMwLS44My42Ny0xLjUgMS41LTEuNXMxLjUuNjcgMS41IDEuNXY1YzAgLjgzLS42NyAxLjUtMS41IDEuNXpcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMjAuNSAxMEgxOVY4LjVjMC0uODMuNjctMS41IDEuNS0xLjVzMS41LjY3IDEuNSAxLjUtLjY3IDEuNS0xLjUgMS41elxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk05LjUgMTRjLjgzIDAgMS41LjY3IDEuNSAxLjV2NWMwIC44My0uNjcgMS41LTEuNSAxLjVTOCAyMS4zMyA4IDIwLjV2LTVjMC0uODMuNjctMS41IDEuNS0xLjV6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTMuNSAxNEg1djEuNWMwIC44My0uNjcgMS41LTEuNSAxLjVTMiAxNi4zMyAyIDE1LjUgMi42NyAxNCAzLjUgMTR6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE0IDE0LjVjMC0uODMuNjctMS41IDEuNS0xLjVoNWMuODMgMCAxLjUuNjcgMS41IDEuNXMtLjY3IDEuNS0xLjUgMS41aC01Yy0uODMgMC0xLjUtLjY3LTEuNS0xLjV6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTE1LjUgMTlIMTR2MS41YzAgLjgzLjY3IDEuNSAxLjUgMS41czEuNS0uNjcgMS41LTEuNS0uNjctMS41LTEuNS0xLjV6XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTEwIDkuNUMxMCA4LjY3IDkuMzMgOCA4LjUgOGgtNUMyLjY3IDggMiA4LjY3IDIgOS41UzIuNjcgMTEgMy41IDExaDVjLjgzIDAgMS41LS42NyAxLjUtMS41elxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk04LjUgNUgxMFYzLjVDMTAgMi42NyA5LjMzIDIgOC41IDJTNyAyLjY3IDcgMy41IDcuNjcgNSA4LjUgNXpcXFwiPjwvcGF0aD5cIixcInNsYXNoXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIxMFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjQuOTNcXFwiIHkxPVxcXCI0LjkzXFxcIiB4Mj1cXFwiMTkuMDdcXFwiIHkyPVxcXCIxOS4wN1xcXCI+PC9saW5lPlwiLFwic2xpZGVyc1wiOlwiPGxpbmUgeDE9XFxcIjRcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjRcXFwiIHkyPVxcXCIxNFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI0XFxcIiB5MT1cXFwiMTBcXFwiIHgyPVxcXCI0XFxcIiB5Mj1cXFwiM1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjIxXFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIxMlxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjBcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjIwXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjBcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIwXFxcIiB5Mj1cXFwiM1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMTRcXFwiIHgyPVxcXCI3XFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOVxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxNVxcXCIgeTI9XFxcIjhcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTdcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMTZcXFwiPjwvbGluZT5cIixcInNtYXJ0cGhvbmVcIjpcIjxyZWN0IHg9XFxcIjVcXFwiIHk9XFxcIjJcXFwiIHdpZHRoPVxcXCIxNFxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+XCIsXCJzbWlsZVwiOlwiPGNpcmNsZSBjeD1cXFwiMTJcXFwiIGN5PVxcXCIxMlxcXCIgcj1cXFwiMTBcXFwiPjwvY2lyY2xlPjxwYXRoIGQ9XFxcIk04IDE0czEuNSAyIDQgMiA0LTIgNC0yXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiOS4wMVxcXCIgeTI9XFxcIjlcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTVcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMTUuMDFcXFwiIHkyPVxcXCI5XFxcIj48L2xpbmU+XCIsXCJzcGVha2VyXCI6XCI8cmVjdCB4PVxcXCI0XFxcIiB5PVxcXCIyXFxcIiB3aWR0aD1cXFwiMTZcXFwiIGhlaWdodD1cXFwiMjBcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTRcXFwiIHI9XFxcIjRcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjZcXFwiPjwvbGluZT5cIixcInNxdWFyZVwiOlwiPHJlY3QgeD1cXFwiM1xcXCIgeT1cXFwiM1xcXCIgd2lkdGg9XFxcIjE4XFxcIiBoZWlnaHQ9XFxcIjE4XFxcIiByeD1cXFwiMlxcXCIgcnk9XFxcIjJcXFwiPjwvcmVjdD5cIixcInN0YXJcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMTIgMiAxNS4wOSA4LjI2IDIyIDkuMjcgMTcgMTQuMTQgMTguMTggMjEuMDIgMTIgMTcuNzcgNS44MiAyMS4wMiA3IDE0LjE0IDIgOS4yNyA4LjkxIDguMjYgMTIgMlxcXCI+PC9wb2x5Z29uPlwiLFwic3RvcC1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48cmVjdCB4PVxcXCI5XFxcIiB5PVxcXCI5XFxcIiB3aWR0aD1cXFwiNlxcXCIgaGVpZ2h0PVxcXCI2XFxcIj48L3JlY3Q+XCIsXCJzdW5cIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjVcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCIxMlxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNC4yMlxcXCIgeTE9XFxcIjQuMjJcXFwiIHgyPVxcXCI1LjY0XFxcIiB5Mj1cXFwiNS42NFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxOC4zNlxcXCIgeTE9XFxcIjE4LjM2XFxcIiB4Mj1cXFwiMTkuNzhcXFwiIHkyPVxcXCIxOS43OFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIxMlxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMTJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNC4yMlxcXCIgeTE9XFxcIjE5Ljc4XFxcIiB4Mj1cXFwiNS42NFxcXCIgeTI9XFxcIjE4LjM2XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE4LjM2XFxcIiB5MT1cXFwiNS42NFxcXCIgeDI9XFxcIjE5Ljc4XFxcIiB5Mj1cXFwiNC4yMlxcXCI+PC9saW5lPlwiLFwic3VucmlzZVwiOlwiPHBhdGggZD1cXFwiTTE3IDE4YTUgNSAwIDAgMC0xMCAwXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMlxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiOVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCI0LjIyXFxcIiB5MT1cXFwiMTAuMjJcXFwiIHgyPVxcXCI1LjY0XFxcIiB5Mj1cXFwiMTEuNjRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjE4XFxcIiB4Mj1cXFwiM1xcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIxXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE4LjM2XFxcIiB5MT1cXFwiMTEuNjRcXFwiIHgyPVxcXCIxOS43OFxcXCIgeTI9XFxcIjEwLjIyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjIzXFxcIiB5MT1cXFwiMjJcXFwiIHgyPVxcXCIxXFxcIiB5Mj1cXFwiMjJcXFwiPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI4IDYgMTIgMiAxNiA2XFxcIj48L3BvbHlsaW5lPlwiLFwic3Vuc2V0XCI6XCI8cGF0aCBkPVxcXCJNMTcgMThhNSA1IDAgMCAwLTEwIDBcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMTJcXFwiIHkyPVxcXCIyXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjQuMjJcXFwiIHkxPVxcXCIxMC4yMlxcXCIgeDI9XFxcIjUuNjRcXFwiIHkyPVxcXCIxMS42NFxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIzXFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIxOFxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMTguMzZcXFwiIHkxPVxcXCIxMS42NFxcXCIgeDI9XFxcIjE5Ljc4XFxcIiB5Mj1cXFwiMTAuMjJcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjNcXFwiIHkxPVxcXCIyMlxcXCIgeDI9XFxcIjFcXFwiIHkyPVxcXCIyMlxcXCI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjE2IDUgMTIgOSA4IDVcXFwiPjwvcG9seWxpbmU+XCIsXCJ0YWJsZXRcIjpcIjxyZWN0IHg9XFxcIjRcXFwiIHk9XFxcIjJcXFwiIHdpZHRoPVxcXCIxNlxcXCIgaGVpZ2h0PVxcXCIyMFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMThcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+XCIsXCJ0YWdcIjpcIjxwYXRoIGQ9XFxcIk0yMC41OSAxMy40MWwtNy4xNyA3LjE3YTIgMiAwIDAgMS0yLjgzIDBMMiAxMlYyaDEwbDguNTkgOC41OWEyIDIgMCAwIDEgMCAyLjgyelxcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCI3XFxcIiB5MT1cXFwiN1xcXCIgeDI9XFxcIjcuMDFcXFwiIHkyPVxcXCI3XFxcIj48L2xpbmU+XCIsXCJ0YXJnZXRcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCI2XFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIyXFxcIj48L2NpcmNsZT5cIixcInRlcm1pbmFsXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCI0IDE3IDEwIDExIDQgNVxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIxOVxcXCIgeDI9XFxcIjIwXFxcIiB5Mj1cXFwiMTlcXFwiPjwvbGluZT5cIixcInRoZXJtb21ldGVyXCI6XCI8cGF0aCBkPVxcXCJNMTQgMTQuNzZWMy41YTIuNSAyLjUgMCAwIDAtNSAwdjExLjI2YTQuNSA0LjUgMCAxIDAgNSAwelxcXCI+PC9wYXRoPlwiLFwidGh1bWJzLWRvd25cIjpcIjxwYXRoIGQ9XFxcIk0xMCAxNXY0YTMgMyAwIDAgMCAzIDNsNC05VjJINS43MmEyIDIgMCAwIDAtMiAxLjdsLTEuMzggOWEyIDIgMCAwIDAgMiAyLjN6bTctMTNoMi42N0EyLjMxIDIuMzEgMCAwIDEgMjIgNHY3YTIuMzEgMi4zMSAwIDAgMS0yLjMzIDJIMTdcXFwiPjwvcGF0aD5cIixcInRodW1icy11cFwiOlwiPHBhdGggZD1cXFwiTTE0IDlWNWEzIDMgMCAwIDAtMy0zbC00IDl2MTFoMTEuMjhhMiAyIDAgMCAwIDItMS43bDEuMzgtOWEyIDIgMCAwIDAtMi0yLjN6TTcgMjJINGEyIDIgMCAwIDEtMi0ydi03YTIgMiAwIDAgMSAyLTJoM1xcXCI+PC9wYXRoPlwiLFwidG9nZ2xlLWxlZnRcIjpcIjxyZWN0IHg9XFxcIjFcXFwiIHk9XFxcIjVcXFwiIHdpZHRoPVxcXCIyMlxcXCIgaGVpZ2h0PVxcXCIxNFxcXCIgcng9XFxcIjdcXFwiIHJ5PVxcXCI3XFxcIj48L3JlY3Q+PGNpcmNsZSBjeD1cXFwiOFxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT5cIixcInRvZ2dsZS1yaWdodFwiOlwiPHJlY3QgeD1cXFwiMVxcXCIgeT1cXFwiNVxcXCIgd2lkdGg9XFxcIjIyXFxcIiBoZWlnaHQ9XFxcIjE0XFxcIiByeD1cXFwiN1xcXCIgcnk9XFxcIjdcXFwiPjwvcmVjdD48Y2lyY2xlIGN4PVxcXCIxNlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCIzXFxcIj48L2NpcmNsZT5cIixcInRvb2xcIjpcIjxwYXRoIGQ9XFxcIk0xNC43IDYuM2ExIDEgMCAwIDAgMCAxLjRsMS42IDEuNmExIDEgMCAwIDAgMS40IDBsMy43Ny0zLjc3YTYgNiAwIDAgMS03Ljk0IDcuOTRsLTYuOTEgNi45MWEyLjEyIDIuMTIgMCAwIDEtMy0zbDYuOTEtNi45MWE2IDYgMCAwIDEgNy45NC03Ljk0bC0zLjc2IDMuNzZ6XFxcIj48L3BhdGg+XCIsXCJ0cmFzaC0yXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIzIDYgNSA2IDIxIDZcXFwiPjwvcG9seWxpbmU+PHBhdGggZD1cXFwiTTE5IDZ2MTRhMiAyIDAgMCAxLTIgMkg3YTIgMiAwIDAgMS0yLTJWNm0zIDBWNGEyIDIgMCAwIDEgMi0yaDRhMiAyIDAgMCAxIDIgMnYyXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjEwXFxcIiB5MT1cXFwiMTFcXFwiIHgyPVxcXCIxMFxcXCIgeTI9XFxcIjE3XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE0XFxcIiB5MT1cXFwiMTFcXFwiIHgyPVxcXCIxNFxcXCIgeTI9XFxcIjE3XFxcIj48L2xpbmU+XCIsXCJ0cmFzaFwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMyA2IDUgNiAyMSA2XFxcIj48L3BvbHlsaW5lPjxwYXRoIGQ9XFxcIk0xOSA2djE0YTIgMiAwIDAgMS0yIDJIN2EyIDIgMCAwIDEtMi0yVjZtMyAwVjRhMiAyIDAgMCAxIDItMmg0YTIgMiAwIDAgMSAyIDJ2MlxcXCI+PC9wYXRoPlwiLFwidHJlbGxvXCI6XCI8cmVjdCB4PVxcXCIzXFxcIiB5PVxcXCIzXFxcIiB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMThcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxyZWN0IHg9XFxcIjdcXFwiIHk9XFxcIjdcXFwiIHdpZHRoPVxcXCIzXFxcIiBoZWlnaHQ9XFxcIjlcXFwiPjwvcmVjdD48cmVjdCB4PVxcXCIxNFxcXCIgeT1cXFwiN1xcXCIgd2lkdGg9XFxcIjNcXFwiIGhlaWdodD1cXFwiNVxcXCI+PC9yZWN0PlwiLFwidHJlbmRpbmctZG93blwiOlwiPHBvbHlsaW5lIHBvaW50cz1cXFwiMjMgMTggMTMuNSA4LjUgOC41IDEzLjUgMSA2XFxcIj48L3BvbHlsaW5lPjxwb2x5bGluZSBwb2ludHM9XFxcIjE3IDE4IDIzIDE4IDIzIDEyXFxcIj48L3BvbHlsaW5lPlwiLFwidHJlbmRpbmctdXBcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjIzIDYgMTMuNSAxNS41IDguNSAxMC41IDEgMThcXFwiPjwvcG9seWxpbmU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTcgNiAyMyA2IDIzIDEyXFxcIj48L3BvbHlsaW5lPlwiLFwidHJpYW5nbGVcIjpcIjxwYXRoIGQ9XFxcIk0xMC4yOSAzLjg2TDEuODIgMThhMiAyIDAgMCAwIDEuNzEgM2gxNi45NGEyIDIgMCAwIDAgMS43MS0zTDEzLjcxIDMuODZhMiAyIDAgMCAwLTMuNDIgMHpcXFwiPjwvcGF0aD5cIixcInRydWNrXCI6XCI8cmVjdCB4PVxcXCIxXFxcIiB5PVxcXCIzXFxcIiB3aWR0aD1cXFwiMTVcXFwiIGhlaWdodD1cXFwiMTNcXFwiPjwvcmVjdD48cG9seWdvbiBwb2ludHM9XFxcIjE2IDggMjAgOCAyMyAxMSAyMyAxNiAxNiAxNiAxNiA4XFxcIj48L3BvbHlnb24+PGNpcmNsZSBjeD1cXFwiNS41XFxcIiBjeT1cXFwiMTguNVxcXCIgcj1cXFwiMi41XFxcIj48L2NpcmNsZT48Y2lyY2xlIGN4PVxcXCIxOC41XFxcIiBjeT1cXFwiMTguNVxcXCIgcj1cXFwiMi41XFxcIj48L2NpcmNsZT5cIixcInR2XCI6XCI8cmVjdCB4PVxcXCIyXFxcIiB5PVxcXCI3XFxcIiB3aWR0aD1cXFwiMjBcXFwiIGhlaWdodD1cXFwiMTVcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0Pjxwb2x5bGluZSBwb2ludHM9XFxcIjE3IDIgMTIgNyA3IDJcXFwiPjwvcG9seWxpbmU+XCIsXCJ0d2l0Y2hcIjpcIjxwYXRoIGQ9XFxcIk0yMSAySDN2MTZoNXY0bDQtNGg1bDQtNFYyem0tMTAgOVY3bTUgNFY3XFxcIj48L3BhdGg+XCIsXCJ0d2l0dGVyXCI6XCI8cGF0aCBkPVxcXCJNMjMgM2ExMC45IDEwLjkgMCAwIDEtMy4xNCAxLjUzIDQuNDggNC40OCAwIDAgMC03Ljg2IDN2MUExMC42NiAxMC42NiAwIDAgMSAzIDRzLTQgOSA1IDEzYTExLjY0IDExLjY0IDAgMCAxLTcgMmM5IDUgMjAgMCAyMC0xMS41YTQuNSA0LjUgMCAwIDAtLjA4LS44M0E3LjcyIDcuNzIgMCAwIDAgMjMgM3pcXFwiPjwvcGF0aD5cIixcInR5cGVcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjQgNyA0IDQgMjAgNCAyMCA3XFxcIj48L3BvbHlsaW5lPjxsaW5lIHgxPVxcXCI5XFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCIxNVxcXCIgeTI9XFxcIjIwXFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiNFxcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMjBcXFwiPjwvbGluZT5cIixcInVtYnJlbGxhXCI6XCI8cGF0aCBkPVxcXCJNMjMgMTJhMTEuMDUgMTEuMDUgMCAwIDAtMjIgMHptLTUgN2EzIDMgMCAwIDEtNiAwdi03XFxcIj48L3BhdGg+XCIsXCJ1bmRlcmxpbmVcIjpcIjxwYXRoIGQ9XFxcIk02IDN2N2E2IDYgMCAwIDAgNiA2IDYgNiAwIDAgMCA2LTZWM1xcXCI+PC9wYXRoPjxsaW5lIHgxPVxcXCI0XFxcIiB5MT1cXFwiMjFcXFwiIHgyPVxcXCIyMFxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+XCIsXCJ1bmxvY2tcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjExXFxcIiB3aWR0aD1cXFwiMThcXFwiIGhlaWdodD1cXFwiMTFcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PjxwYXRoIGQ9XFxcIk03IDExVjdhNSA1IDAgMCAxIDkuOS0xXFxcIj48L3BhdGg+XCIsXCJ1cGxvYWQtY2xvdWRcIjpcIjxwb2x5bGluZSBwb2ludHM9XFxcIjE2IDE2IDEyIDEyIDggMTZcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMTJcXFwiIHgyPVxcXCIxMlxcXCIgeTI9XFxcIjIxXFxcIj48L2xpbmU+PHBhdGggZD1cXFwiTTIwLjM5IDE4LjM5QTUgNSAwIDAgMCAxOCA5aC0xLjI2QTggOCAwIDEgMCAzIDE2LjNcXFwiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPVxcXCIxNiAxNiAxMiAxMiA4IDE2XFxcIj48L3BvbHlsaW5lPlwiLFwidXBsb2FkXCI6XCI8cGF0aCBkPVxcXCJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNFxcXCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9XFxcIjE3IDggMTIgMyA3IDhcXFwiPjwvcG9seWxpbmU+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiM1xcXCIgeDI9XFxcIjEyXFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcInVzZXItY2hlY2tcIjpcIjxwYXRoIGQ9XFxcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiOC41XFxcIiBjeT1cXFwiN1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+PHBvbHlsaW5lIHBvaW50cz1cXFwiMTcgMTEgMTkgMTMgMjMgOVxcXCI+PC9wb2x5bGluZT5cIixcInVzZXItbWludXNcIjpcIjxwYXRoIGQ9XFxcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiOC41XFxcIiBjeT1cXFwiN1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjIzXFxcIiB5MT1cXFwiMTFcXFwiIHgyPVxcXCIxN1xcXCIgeTI9XFxcIjExXFxcIj48L2xpbmU+XCIsXCJ1c2VyLXBsdXNcIjpcIjxwYXRoIGQ9XFxcIk0xNiAyMXYtMmE0IDQgMCAwIDAtNC00SDVhNCA0IDAgMCAwLTQgNHYyXFxcIj48L3BhdGg+PGNpcmNsZSBjeD1cXFwiOC41XFxcIiBjeT1cXFwiN1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+PGxpbmUgeDE9XFxcIjIwXFxcIiB5MT1cXFwiOFxcXCIgeDI9XFxcIjIwXFxcIiB5Mj1cXFwiMTRcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiMjNcXFwiIHkxPVxcXCIxMVxcXCIgeDI9XFxcIjE3XFxcIiB5Mj1cXFwiMTFcXFwiPjwvbGluZT5cIixcInVzZXIteFwiOlwiPHBhdGggZD1cXFwiTTE2IDIxdi0yYTQgNCAwIDAgMC00LTRINWE0IDQgMCAwIDAtNCA0djJcXFwiPjwvcGF0aD48Y2lyY2xlIGN4PVxcXCI4LjVcXFwiIGN5PVxcXCI3XFxcIiByPVxcXCI0XFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMThcXFwiIHkxPVxcXCI4XFxcIiB4Mj1cXFwiMjNcXFwiIHkyPVxcXCIxM1xcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIyM1xcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxOFxcXCIgeTI9XFxcIjEzXFxcIj48L2xpbmU+XCIsXCJ1c2VyXCI6XCI8cGF0aCBkPVxcXCJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MlxcXCI+PC9wYXRoPjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiN1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+XCIsXCJ1c2Vyc1wiOlwiPHBhdGggZD1cXFwiTTE3IDIxdi0yYTQgNCAwIDAgMC00LTRINWE0IDQgMCAwIDAtNCA0djJcXFwiPjwvcGF0aD48Y2lyY2xlIGN4PVxcXCI5XFxcIiBjeT1cXFwiN1xcXCIgcj1cXFwiNFxcXCI+PC9jaXJjbGU+PHBhdGggZD1cXFwiTTIzIDIxdi0yYTQgNCAwIDAgMC0zLTMuODdcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMTYgMy4xM2E0IDQgMCAwIDEgMCA3Ljc1XFxcIj48L3BhdGg+XCIsXCJ2aWRlby1vZmZcIjpcIjxwYXRoIGQ9XFxcIk0xNiAxNnYxYTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjdhMiAyIDAgMCAxIDItMmgybTUuNjYgMEgxNGEyIDIgMCAwIDEgMiAydjMuMzRsMSAxTDIzIDd2MTBcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+XCIsXCJ2aWRlb1wiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIyMyA3IDE2IDEyIDIzIDE3IDIzIDdcXFwiPjwvcG9seWdvbj48cmVjdCB4PVxcXCIxXFxcIiB5PVxcXCI1XFxcIiB3aWR0aD1cXFwiMTVcXFwiIGhlaWdodD1cXFwiMTRcXFwiIHJ4PVxcXCIyXFxcIiByeT1cXFwiMlxcXCI+PC9yZWN0PlwiLFwidm9pY2VtYWlsXCI6XCI8Y2lyY2xlIGN4PVxcXCI1LjVcXFwiIGN5PVxcXCIxMS41XFxcIiByPVxcXCI0LjVcXFwiPjwvY2lyY2xlPjxjaXJjbGUgY3g9XFxcIjE4LjVcXFwiIGN5PVxcXCIxMS41XFxcIiByPVxcXCI0LjVcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCI1LjVcXFwiIHkxPVxcXCIxNlxcXCIgeDI9XFxcIjE4LjVcXFwiIHkyPVxcXCIxNlxcXCI+PC9saW5lPlwiLFwidm9sdW1lLTFcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1XFxcIj48L3BvbHlnb24+PHBhdGggZD1cXFwiTTE1LjU0IDguNDZhNSA1IDAgMCAxIDAgNy4wN1xcXCI+PC9wYXRoPlwiLFwidm9sdW1lLTJcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMTEgNSA2IDkgMiA5IDIgMTUgNiAxNSAxMSAxOSAxMSA1XFxcIj48L3BvbHlnb24+PHBhdGggZD1cXFwiTTE5LjA3IDQuOTNhMTAgMTAgMCAwIDEgMCAxNC4xNE0xNS41NCA4LjQ2YTUgNSAwIDAgMSAwIDcuMDdcXFwiPjwvcGF0aD5cIixcInZvbHVtZS14XCI6XCI8cG9seWdvbiBwb2ludHM9XFxcIjExIDUgNiA5IDIgOSAyIDE1IDYgMTUgMTEgMTkgMTEgNVxcXCI+PC9wb2x5Z29uPjxsaW5lIHgxPVxcXCIyM1xcXCIgeTE9XFxcIjlcXFwiIHgyPVxcXCIxN1xcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjE3XFxcIiB5MT1cXFwiOVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcInZvbHVtZVwiOlwiPHBvbHlnb24gcG9pbnRzPVxcXCIxMSA1IDYgOSAyIDkgMiAxNSA2IDE1IDExIDE5IDExIDVcXFwiPjwvcG9seWdvbj5cIixcIndhdGNoXCI6XCI8Y2lyY2xlIGN4PVxcXCIxMlxcXCIgY3k9XFxcIjEyXFxcIiByPVxcXCI3XFxcIj48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxMiA5IDEyIDEyIDEzLjUgMTMuNVxcXCI+PC9wb2x5bGluZT48cGF0aCBkPVxcXCJNMTYuNTEgMTcuMzVsLS4zNSAzLjgzYTIgMiAwIDAgMS0yIDEuODJIOS44M2EyIDIgMCAwIDEtMi0xLjgybC0uMzUtMy44M20uMDEtMTAuN2wuMzUtMy44M0EyIDIgMCAwIDEgOS44MyAxaDQuMzVhMiAyIDAgMCAxIDIgMS44MmwuMzUgMy44M1xcXCI+PC9wYXRoPlwiLFwid2lmaS1vZmZcIjpcIjxsaW5lIHgxPVxcXCIxXFxcIiB5MT1cXFwiMVxcXCIgeDI9XFxcIjIzXFxcIiB5Mj1cXFwiMjNcXFwiPjwvbGluZT48cGF0aCBkPVxcXCJNMTYuNzIgMTEuMDZBMTAuOTQgMTAuOTQgMCAwIDEgMTkgMTIuNTVcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNNSAxMi41NWExMC45NCAxMC45NCAwIDAgMSA1LjE3LTIuMzlcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMTAuNzEgNS4wNUExNiAxNiAwIDAgMSAyMi41OCA5XFxcIj48L3BhdGg+PHBhdGggZD1cXFwiTTEuNDIgOWExNS45MSAxNS45MSAwIDAgMSA0LjctMi44OFxcXCI+PC9wYXRoPjxwYXRoIGQ9XFxcIk04LjUzIDE2LjExYTYgNiAwIDAgMSA2Ljk1IDBcXFwiPjwvcGF0aD48bGluZSB4MT1cXFwiMTJcXFwiIHkxPVxcXCIyMFxcXCIgeDI9XFxcIjEyLjAxXFxcIiB5Mj1cXFwiMjBcXFwiPjwvbGluZT5cIixcIndpZmlcIjpcIjxwYXRoIGQ9XFxcIk01IDEyLjU1YTExIDExIDAgMCAxIDE0LjA4IDBcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNMS40MiA5YTE2IDE2IDAgMCAxIDIxLjE2IDBcXFwiPjwvcGF0aD48cGF0aCBkPVxcXCJNOC41MyAxNi4xMWE2IDYgMCAwIDEgNi45NSAwXFxcIj48L3BhdGg+PGxpbmUgeDE9XFxcIjEyXFxcIiB5MT1cXFwiMjBcXFwiIHgyPVxcXCIxMi4wMVxcXCIgeTI9XFxcIjIwXFxcIj48L2xpbmU+XCIsXCJ3aW5kXCI6XCI8cGF0aCBkPVxcXCJNOS41OSA0LjU5QTIgMiAwIDEgMSAxMSA4SDJtMTAuNTkgMTEuNDFBMiAyIDAgMSAwIDE0IDE2SDJtMTUuNzMtOC4yN0EyLjUgMi41IDAgMSAxIDE5LjUgMTJIMlxcXCI+PC9wYXRoPlwiLFwieC1jaXJjbGVcIjpcIjxjaXJjbGUgY3g9XFxcIjEyXFxcIiBjeT1cXFwiMTJcXFwiIHI9XFxcIjEwXFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMTVcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiOVxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMTVcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPlwiLFwieC1vY3RhZ29uXCI6XCI8cG9seWdvbiBwb2ludHM9XFxcIjcuODYgMiAxNi4xNCAyIDIyIDcuODYgMjIgMTYuMTQgMTYuMTQgMjIgNy44NiAyMiAyIDE2LjE0IDIgNy44NiA3Ljg2IDJcXFwiPjwvcG9seWdvbj48bGluZSB4MT1cXFwiMTVcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiOVxcXCIgeTI9XFxcIjE1XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMTVcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPlwiLFwieC1zcXVhcmVcIjpcIjxyZWN0IHg9XFxcIjNcXFwiIHk9XFxcIjNcXFwiIHdpZHRoPVxcXCIxOFxcXCIgaGVpZ2h0PVxcXCIxOFxcXCIgcng9XFxcIjJcXFwiIHJ5PVxcXCIyXFxcIj48L3JlY3Q+PGxpbmUgeDE9XFxcIjlcXFwiIHkxPVxcXCI5XFxcIiB4Mj1cXFwiMTVcXFwiIHkyPVxcXCIxNVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxNVxcXCIgeTE9XFxcIjlcXFwiIHgyPVxcXCI5XFxcIiB5Mj1cXFwiMTVcXFwiPjwvbGluZT5cIixcInhcIjpcIjxsaW5lIHgxPVxcXCIxOFxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCI2XFxcIiB5Mj1cXFwiMThcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiNlxcXCIgeTE9XFxcIjZcXFwiIHgyPVxcXCIxOFxcXCIgeTI9XFxcIjE4XFxcIj48L2xpbmU+XCIsXCJ5b3V0dWJlXCI6XCI8cGF0aCBkPVxcXCJNMjIuNTQgNi40MmEyLjc4IDIuNzggMCAwIDAtMS45NC0yQzE4Ljg4IDQgMTIgNCAxMiA0cy02Ljg4IDAtOC42LjQ2YTIuNzggMi43OCAwIDAgMC0xLjk0IDJBMjkgMjkgMCAwIDAgMSAxMS43NWEyOSAyOSAwIDAgMCAuNDYgNS4zM0EyLjc4IDIuNzggMCAwIDAgMy40IDE5YzEuNzIuNDYgOC42LjQ2IDguNi40NnM2Ljg4IDAgOC42LS40NmEyLjc4IDIuNzggMCAwIDAgMS45NC0yIDI5IDI5IDAgMCAwIC40Ni01LjI1IDI5IDI5IDAgMCAwLS40Ni01LjMzelxcXCI+PC9wYXRoPjxwb2x5Z29uIHBvaW50cz1cXFwiOS43NSAxNS4wMiAxNS41IDExLjc1IDkuNzUgOC40OCA5Ljc1IDE1LjAyXFxcIj48L3BvbHlnb24+XCIsXCJ6YXAtb2ZmXCI6XCI8cG9seWxpbmUgcG9pbnRzPVxcXCIxMi40MSA2Ljc1IDEzIDIgMTAuNTcgNC45MlxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCIxOC41NyAxMi45MSAyMSAxMCAxNS42NiAxMFxcXCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPVxcXCI4IDggMyAxNCAxMiAxNCAxMSAyMiAxNiAxNlxcXCI+PC9wb2x5bGluZT48bGluZSB4MT1cXFwiMVxcXCIgeTE9XFxcIjFcXFwiIHgyPVxcXCIyM1xcXCIgeTI9XFxcIjIzXFxcIj48L2xpbmU+XCIsXCJ6YXBcIjpcIjxwb2x5Z29uIHBvaW50cz1cXFwiMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDJcXFwiPjwvcG9seWdvbj5cIixcInpvb20taW5cIjpcIjxjaXJjbGUgY3g9XFxcIjExXFxcIiBjeT1cXFwiMTFcXFwiIHI9XFxcIjhcXFwiPjwvY2lyY2xlPjxsaW5lIHgxPVxcXCIyMVxcXCIgeTE9XFxcIjIxXFxcIiB4Mj1cXFwiMTYuNjVcXFwiIHkyPVxcXCIxNi42NVxcXCI+PC9saW5lPjxsaW5lIHgxPVxcXCIxMVxcXCIgeTE9XFxcIjhcXFwiIHgyPVxcXCIxMVxcXCIgeTI9XFxcIjE0XFxcIj48L2xpbmU+PGxpbmUgeDE9XFxcIjhcXFwiIHkxPVxcXCIxMVxcXCIgeDI9XFxcIjE0XFxcIiB5Mj1cXFwiMTFcXFwiPjwvbGluZT5cIixcInpvb20tb3V0XCI6XCI8Y2lyY2xlIGN4PVxcXCIxMVxcXCIgY3k9XFxcIjExXFxcIiByPVxcXCI4XFxcIj48L2NpcmNsZT48bGluZSB4MT1cXFwiMjFcXFwiIHkxPVxcXCIyMVxcXCIgeDI9XFxcIjE2LjY1XFxcIiB5Mj1cXFwiMTYuNjVcXFwiPjwvbGluZT48bGluZSB4MT1cXFwiOFxcXCIgeTE9XFxcIjExXFxcIiB4Mj1cXFwiMTRcXFwiIHkyPVxcXCIxMVxcXCI+PC9saW5lPlwifTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9kZWR1cGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9kZWR1cGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fOy8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBjbGFzc05hbWVzID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvLyBkb24ndCBpbmhlcml0IGZyb20gT2JqZWN0IHNvIHdlIGNhbiBza2lwIGhhc093blByb3BlcnR5IGNoZWNrIGxhdGVyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTUxODMyOC9jcmVhdGluZy1qcy1vYmplY3Qtd2l0aC1vYmplY3QtY3JlYXRlbnVsbCNhbnN3ZXItMjEwNzkyMzJcblx0XHRmdW5jdGlvbiBTdG9yYWdlT2JqZWN0KCkge31cblx0XHRTdG9yYWdlT2JqZWN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cblx0XHRmdW5jdGlvbiBfcGFyc2VBcnJheSAocmVzdWx0U2V0LCBhcnJheSkge1xuXHRcdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdFx0XHRfcGFyc2UocmVzdWx0U2V0LCBhcnJheVtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdFx0ZnVuY3Rpb24gX3BhcnNlTnVtYmVyIChyZXN1bHRTZXQsIG51bSkge1xuXHRcdFx0cmVzdWx0U2V0W251bV0gPSB0cnVlO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIF9wYXJzZU9iamVjdCAocmVzdWx0U2V0LCBvYmplY3QpIHtcblx0XHRcdGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG5cdFx0XHRcdGlmIChoYXNPd24uY2FsbChvYmplY3QsIGspKSB7XG5cdFx0XHRcdFx0Ly8gc2V0IHZhbHVlIHRvIGZhbHNlIGluc3RlYWQgb2YgZGVsZXRpbmcgaXQgdG8gYXZvaWQgY2hhbmdpbmcgb2JqZWN0IHN0cnVjdHVyZVxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vd3d3LnNtYXNoaW5nbWFnYXppbmUuY29tLzIwMTIvMTEvd3JpdGluZy1mYXN0LW1lbW9yeS1lZmZpY2llbnQtamF2YXNjcmlwdC8jZGUtcmVmZXJlbmNpbmctbWlzY29uY2VwdGlvbnNcblx0XHRcdFx0XHRyZXN1bHRTZXRba10gPSAhIW9iamVjdFtrXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBTUEFDRSA9IC9cXHMrLztcblx0XHRmdW5jdGlvbiBfcGFyc2VTdHJpbmcgKHJlc3VsdFNldCwgc3RyKSB7XG5cdFx0XHR2YXIgYXJyYXkgPSBzdHIuc3BsaXQoU1BBQ0UpO1xuXHRcdFx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdFx0XHRyZXN1bHRTZXRbYXJyYXlbaV1dID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBfcGFyc2UgKHJlc3VsdFNldCwgYXJnKSB7XG5cdFx0XHRpZiAoIWFyZykgcmV0dXJuO1xuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHQvLyAnZm9vIGJhcidcblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRfcGFyc2VTdHJpbmcocmVzdWx0U2V0LCBhcmcpO1xuXG5cdFx0XHQvLyBbJ2ZvbycsICdiYXInLCAuLi5dXG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRfcGFyc2VBcnJheShyZXN1bHRTZXQsIGFyZyk7XG5cblx0XHRcdC8vIHsgJ2Zvbyc6IHRydWUsIC4uLiB9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdF9wYXJzZU9iamVjdChyZXN1bHRTZXQsIGFyZyk7XG5cblx0XHRcdC8vICcxMzAnXG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdF9wYXJzZU51bWJlcihyZXN1bHRTZXQsIGFyZyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gX2NsYXNzTmFtZXMgKCkge1xuXHRcdFx0Ly8gZG9uJ3QgbGVhayBhcmd1bWVudHNcblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wZXRrYWFudG9ub3YvYmx1ZWJpcmQvd2lraS9PcHRpbWl6YXRpb24ta2lsbGVycyMzMi1sZWFraW5nLWFyZ3VtZW50c1xuXHRcdFx0dmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5KGxlbik7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjbGFzc1NldCA9IG5ldyBTdG9yYWdlT2JqZWN0KCk7XG5cdFx0XHRfcGFyc2VBcnJheShjbGFzc1NldCwgYXJncyk7XG5cblx0XHRcdHZhciBsaXN0ID0gW107XG5cblx0XHRcdGZvciAodmFyIGsgaW4gY2xhc3NTZXQpIHtcblx0XHRcdFx0aWYgKGNsYXNzU2V0W2tdKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGspXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGxpc3Quam9pbignICcpO1xuXHRcdH1cblxuXHRcdHJldHVybiBfY2xhc3NOYW1lcztcblx0fSkoKTtcblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHJ1ZSkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHQhKF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbXSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSkuYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyksXG5cdFx0XHRcdF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fICE9PSB1bmRlZmluZWQgJiYgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pKTtcblx0fSBlbHNlIHt9XG59KCkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZXMvYXJyYXkvZnJvbS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9lcy9hcnJheS9mcm9tLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanNcIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZyb20gKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZnJvbS5qc1wiKTtcbnZhciBwYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vLi4vaW50ZXJuYWxzL3BhdGggKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguQXJyYXkuZnJvbTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1mdW5jdGlvbi5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IFR5cGVFcnJvcihTdHJpbmcoaXQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZyb20uanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBiaW5kID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2JpbmQtY29udGV4dCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2JpbmQtY29udGV4dC5qc1wiKTtcbnZhciB0b09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy90by1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanNcIik7XG52YXIgY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9jYWxsLXdpdGgtc2FmZS1pdGVyYXRpb24tY2xvc2luZyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nLmpzXCIpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanNcIik7XG52YXIgdG9MZW5ndGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzXCIpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qc1wiKTtcbnZhciBnZXRJdGVyYXRvck1ldGhvZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1wiKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKSB7XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nXG4gICAgICAgID8gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpXG4gICAgICAgIDogc3RlcC52YWx1ZVxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7XG4gICAgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgIH1cbiAgfVxuICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0luZGV4ZWRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qc1wiKTtcbnZhciB0b0xlbmd0aCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy90by1sZW5ndGggKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanNcIik7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanNcIik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG4vLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYmluZC1jb250ZXh0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9iaW5kLWNvbnRleHQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBhRnVuY3Rpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbiAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtZnVuY3Rpb24uanNcIik7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2FsbC13aXRoLXNhZmUtaXRlcmF0aW9uLWNsb3NpbmcuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2FuLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qc1wiKTtcblxuLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgRU5UUklFUykge1xuICB0cnkge1xuICAgIHJldHVybiBFTlRSSUVTID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgdmFyIHJldHVybk1ldGhvZCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZiAocmV0dXJuTWV0aG9kICE9PSB1bmRlZmluZWQpIGFuT2JqZWN0KHJldHVybk1ldGhvZC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB3ZWxsS25vd25TeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qc1wiKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgY2FsbGVkID0gMDtcbiAgdmFyIGl0ZXJhdG9yV2l0aFJldHVybiA9IHtcbiAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBkb25lOiAhIWNhbGxlZCsrIH07XG4gICAgfSxcbiAgICAncmV0dXJuJzogZnVuY3Rpb24gKCkge1xuICAgICAgU0FGRV9DTE9TSU5HID0gdHJ1ZTtcbiAgICB9XG4gIH07XG4gIGl0ZXJhdG9yV2l0aFJldHVybltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20oaXRlcmF0b3JXaXRoUmV0dXJuLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjLCBTS0lQX0NMT1NJTkcpIHtcbiAgaWYgKCFTS0lQX0NMT1NJTkcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgSVRFUkFUSU9OX1NVUFBPUlQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4geyBkb25lOiBJVEVSQVRJT05fU1VQUE9SVCA9IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIGV4ZWMob2JqZWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gSVRFUkFUSU9OX1NVUFBPUlQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbGFzc29mUmF3ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanNcIik7XG52YXIgd2VsbEtub3duU3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanNcIik7XG5cbnZhciBUT19TVFJJTkdfVEFHID0gd2VsbEtub3duU3ltYm9sKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBDT1JSRUNUX0FSR1VNRU5UUyA9IGNsYXNzb2ZSYXcoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbn07XG5cbi8vIGdldHRpbmcgdGFnIGZyb20gRVM2KyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2Bcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGFzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCIpO1xudmFyIG93bktleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb3duLWtleXMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qc1wiKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcIik7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzKHRhcmdldCwga2V5KSkgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICB9XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29ycmVjdC1wcm90b3R5cGUtZ2V0dGVyLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZmFpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZmFpbHMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtaXRlcmF0b3ItY29uc3RydWN0b3IuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzXCIpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZS5qc1wiKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qc1wiKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnLmpzXCIpO1xudmFyIEl0ZXJhdG9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pdGVyYXRvcnMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanNcIik7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qc1wiKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qc1wiKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3IuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciAkID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2V4cG9ydCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qc1wiKTtcbnZhciBjcmVhdGVJdGVyYXRvckNvbnN0cnVjdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3RvciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1pdGVyYXRvci1jb25zdHJ1Y3Rvci5qc1wiKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZiAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzXCIpO1xudmFyIHNldFByb3RvdHlwZU9mID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL29iamVjdC1zZXQtcHJvdG90eXBlLW9mICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanNcIik7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qc1wiKTtcbnZhciBoaWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hpZGUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRlLmpzXCIpO1xudmFyIHJlZGVmaW5lID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3JlZGVmaW5lICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVkZWZpbmUuanNcIik7XG52YXIgd2VsbEtub3duU3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanNcIik7XG52YXIgSVNfUFVSRSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1wdXJlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qc1wiKTtcbnZhciBJdGVyYXRvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaXRlcmF0b3JzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzXCIpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qc1wiKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGhpZGUoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICBpZiAoSVNfUFVSRSkgSXRlcmF0b3JzW1RPX1NUUklOR19UQUddID0gcmV0dXJuVGhpcztcbiAgICB9XG4gIH1cblxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZBVUxUID09IFZBTFVFUyAmJiBuYXRpdmVJdGVyYXRvciAmJiBuYXRpdmVJdGVyYXRvci5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSB0cnVlO1xuICAgIGRlZmF1bHRJdGVyYXRvciA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5hdGl2ZUl0ZXJhdG9yLmNhbGwodGhpcyk7IH07XG4gIH1cblxuICAvLyBkZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghSVNfUFVSRSB8fCBGT1JDRUQpICYmIEl0ZXJhYmxlUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gZGVmYXVsdEl0ZXJhdG9yKSB7XG4gICAgaGlkZShJdGVyYWJsZVByb3RvdHlwZSwgSVRFUkFUT1IsIGRlZmF1bHRJdGVyYXRvcik7XG4gIH1cbiAgSXRlcmF0b3JzW05BTUVdID0gZGVmYXVsdEl0ZXJhdG9yO1xuXG4gIC8vIGV4cG9ydCBhZGRpdGlvbmFsIG1ldGhvZHNcbiAgaWYgKERFRkFVTFQpIHtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiBnZXRJdGVyYXRpb25NZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6IElTX1NFVCA/IGRlZmF1bHRJdGVyYXRvciA6IGdldEl0ZXJhdGlvbk1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6IGdldEl0ZXJhdGlvbk1ldGhvZChFTlRSSUVTKVxuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChLRVkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgfHwgSU5DT1JSRUNUX1ZBTFVFU19OQU1FIHx8ICEoS0VZIGluIEl0ZXJhYmxlUHJvdG90eXBlKSkge1xuICAgICAgICByZWRlZmluZShJdGVyYWJsZVByb3RvdHlwZSwgS0VZLCBtZXRob2RzW0tFWV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSAkKHsgdGFyZ2V0OiBOQU1FLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB9LCBtZXRob2RzKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZmFpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZmFpbHMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qc1wiKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzXCIpO1xudmFyIGlzT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2lzLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qc1wiKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgZXhpc3QgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBleGlzdCA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzXCIpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1wiKS5mO1xudmFyIGhpZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGlkZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGUuanNcIik7XG52YXIgcmVkZWZpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvcmVkZWZpbmUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS5qc1wiKTtcbnZhciBzZXRHbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanNcIik7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanNcIik7XG52YXIgaXNGb3JjZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaXMtZm9yY2VkICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzXCIpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBzZXRHbG9iYWwoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGhpZGUoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICByZWRlZmluZSh0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdG8tc3RyaW5nLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi10by1zdHJpbmcuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2hhcmVkICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNoYXJlZCgnbmF0aXZlLWZ1bmN0aW9uLXRvLXN0cmluZycsIEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbGFzc29mID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NsYXNzb2YgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzXCIpO1xudmFyIEl0ZXJhdG9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pdGVyYXRvcnMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanNcIik7XG52YXIgd2VsbEtub3duU3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanNcIik7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkge3ZhciBPID0gJ29iamVjdCc7XG52YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSBPICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gTyAmJiB3aW5kb3cpIHx8XG4gIGNoZWNrKHR5cGVvZiBzZWxmID09IE8gJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSBPICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbCh0aGlzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLy4uLy4uL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMgKi8gXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzXCIpKSlcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIERFU0NSSVBUT1JTID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanNcIik7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanNcIik7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9nbG9iYWwgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanNcIik7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIERFU0NSSVBUT1JTID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanNcIik7XG52YXIgZmFpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZmFpbHMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qc1wiKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanNcIik7XG5cbi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGZhaWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2ZhaWxzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanNcIik7XG52YXIgY2xhc3NvZiA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9jbGFzc29mLXJhdyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzXCIpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICByZXR1cm4gIU9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQuY2FsbChpdCwgJycpIDogT2JqZWN0KGl0KTtcbn0gOiBPYmplY3Q7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIE5BVElWRV9XRUFLX01BUCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanNcIik7XG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2dsb2JhbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qc1wiKTtcbnZhciBpc09iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanNcIik7XG52YXIgaGlkZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9oaWRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZS5qc1wiKTtcbnZhciBvYmplY3RIYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGFzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCIpO1xudmFyIHNoYXJlZEtleSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9zaGFyZWQta2V5ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qc1wiKTtcbnZhciBoaWRkZW5LZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanNcIik7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQKSB7XG4gIHZhciBzdG9yZSA9IG5ldyBXZWFrTWFwKCk7XG4gIHZhciB3bWdldCA9IHN0b3JlLmdldDtcbiAgdmFyIHdtaGFzID0gc3RvcmUuaGFzO1xuICB2YXIgd21zZXQgPSBzdG9yZS5zZXQ7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICB3bXNldC5jYWxsKHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0LmNhbGwoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzLmNhbGwoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaGlkZShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHdlbGxLbm93blN5bWJvbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzXCIpO1xudmFyIEl0ZXJhdG9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pdGVyYXRvcnMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanNcIik7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZmFpbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZmFpbHMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qc1wiKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy1jb3JlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZ2V0UHJvdG90eXBlT2YgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LXByb3RvdHlwZS1vZi5qc1wiKTtcbnZhciBoaWRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hpZGUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRlLmpzXCIpO1xudmFyIGhhcyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9oYXMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanNcIik7XG52YXIgd2VsbEtub3duU3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanNcIik7XG52YXIgSVNfUFVSRSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1wdXJlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qc1wiKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxuaWYgKEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICghSVNfUFVSRSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEl0ZXJhdG9yUHJvdG90eXBlOiBJdGVyYXRvclByb3RvdHlwZSxcbiAgQlVHR1lfU0FGQVJJX0lURVJBVE9SUzogQlVHR1lfU0FGQVJJX0lURVJBVE9SU1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2l0ZXJhdG9ycy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBmYWlscyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9mYWlscyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXdlYWstbWFwLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzXCIpO1xudmFyIG5hdGl2ZUZ1bmN0aW9uVG9TdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdG8tc3RyaW5nICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdG8tc3RyaW5nLmpzXCIpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIC9uYXRpdmUgY29kZS8udGVzdChuYXRpdmVGdW5jdGlvblRvU3RyaW5nLmNhbGwoV2Vha01hcCkpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtY3JlYXRlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2FuLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qc1wiKTtcbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qc1wiKTtcbnZhciBlbnVtQnVnS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qc1wiKTtcbnZhciBoaWRkZW5LZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanNcIik7XG52YXIgaHRtbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9odG1sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qc1wiKTtcbnZhciBkb2N1bWVudENyZWF0ZUVsZW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qc1wiKTtcbnZhciBzaGFyZWRLZXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2hhcmVkLWtleSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanNcIik7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBzY3JpcHQgPSAnc2NyaXB0JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIganMgPSAnamF2YScgKyBzY3JpcHQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhqcyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyBzY3JpcHQgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvJyArIHNjcmlwdCArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRlZmluZVByb3BlcnRpZXMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cbmhpZGRlbktleXNbSUVfUFJPVE9dID0gdHJ1ZTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIERFU0NSSVBUT1JTID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanNcIik7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanNcIik7XG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvYW4tb2JqZWN0ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzXCIpO1xudmFyIG9iamVjdEtleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IG9iamVjdEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobGVuZ3RoID4gaSkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2krK10sIFByb3BlcnRpZXNba2V5XSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBERVNDUklQVE9SUyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9kZXNjcmlwdG9ycyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzXCIpO1xudmFyIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanNcIik7XG52YXIgYW5PYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvYW4tb2JqZWN0ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzXCIpO1xudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qc1wiKTtcblxudmFyIG5hdGl2ZURlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgREVTQ1JJUFRPUlMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qc1wiKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzXCIpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzXCIpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzXCIpO1xudmFyIHRvUHJpbWl0aXZlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qc1wiKTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGFzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCIpO1xudmFyIElFOF9ET01fREVGSU5FID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanNcIik7XG5cbnZhciBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhcyhPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyIGludGVybmFsT2JqZWN0S2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzXCIpO1xudmFyIGVudW1CdWdLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzXCIpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGFzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCIpO1xudmFyIHRvT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qc1wiKTtcbnZhciBzaGFyZWRLZXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2hhcmVkLWtleSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanNcIik7XG52YXIgQ09SUkVDVF9QUk9UT1RZUEVfR0VUVEVSID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qc1wiKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hhcyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qc1wiKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qc1wiKTtcbnZhciBhcnJheUluY2x1ZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanNcIik7XG52YXIgaGlkZGVuS2V5cyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9oaWRkZW4ta2V5cyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzXCIpO1xuXG52YXIgYXJyYXlJbmRleE9mID0gYXJyYXlJbmNsdWRlcyhmYWxzZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXMoaGlkZGVuS2V5cywga2V5KSAmJiBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcIik7XG52YXIgZW51bUJ1Z0tleXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanNcIik7XG5cbi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXNldC1wcm90b3R5cGUtb2YuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHZhbGlkYXRlU2V0UHJvdG90eXBlT2ZBcmd1bWVudHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvdmFsaWRhdGUtc2V0LXByb3RvdHlwZS1vZi1hcmd1bWVudHMgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1zZXQtcHJvdG90eXBlLW9mLWFyZ3VtZW50cy5qc1wiKTtcblxuLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gZnVuY3Rpb24gKCkge1xuICB2YXIgY29ycmVjdFNldHRlciA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgY29ycmVjdFNldHRlciA9IHRlc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pIHtcbiAgICB2YWxpZGF0ZVNldFByb3RvdHlwZU9mQXJndW1lbnRzKE8sIHByb3RvKTtcbiAgICBpZiAoY29ycmVjdFNldHRlcikgc2V0dGVyLmNhbGwoTywgcHJvdG8pO1xuICAgIGVsc2UgTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICByZXR1cm4gTztcbiAgfTtcbn0oKSA6IHVuZGVmaW5lZCk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9nbG9iYWwgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanNcIik7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzXCIpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qc1wiKTtcbnZhciBhbk9iamVjdCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9hbi1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanNcIik7XG5cbnZhciBSZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3Q7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gUmVmbGVjdCAmJiBSZWZsZWN0Lm93bktleXMgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBrZXlzLmNvbmNhdChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3BhdGguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9wYXRoLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzXCIpO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBnbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzXCIpO1xudmFyIHNoYXJlZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9zaGFyZWQgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanNcIik7XG52YXIgaGlkZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9oaWRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZS5qc1wiKTtcbnZhciBoYXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaGFzICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLmpzXCIpO1xudmFyIHNldEdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9zZXQtZ2xvYmFsICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LWdsb2JhbC5qc1wiKTtcbnZhciBuYXRpdmVGdW5jdGlvblRvU3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXRvLXN0cmluZy5qc1wiKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanNcIik7XG5cbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgVEVNUExBVEUgPSBTdHJpbmcobmF0aXZlRnVuY3Rpb25Ub1N0cmluZykuc3BsaXQoJ3RvU3RyaW5nJyk7XG5cbnNoYXJlZCgnaW5zcGVjdFNvdXJjZScsIGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKGl0KTtcbn0pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGhpZGUodmFsdWUsICduYW1lJywga2V5KTtcbiAgICBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSkuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8ga2V5IDogJycpO1xuICB9XG4gIGlmIChPID09PSBnbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIHNldEdsb2JhbChrZXksIHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAoIXVuc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gIH0gZWxzZSBpZiAoIW5vVGFyZ2V0R2V0ICYmIE9ba2V5XSkge1xuICAgIHNpbXBsZSA9IHRydWU7XG4gIH1cbiAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gIGVsc2UgaGlkZShPLCBrZXksIHZhbHVlKTtcbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxufSkoRnVuY3Rpb24ucHJvdG90eXBlLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgbmF0aXZlRnVuY3Rpb25Ub1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtZ2xvYmFsLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9nbG9iYWwgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanNcIik7XG52YXIgaGlkZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9oaWRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGhpZGUoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzXCIpLmY7XG52YXIgaGFzID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2hhcyAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy5qc1wiKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qc1wiKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBUQUcsIFNUQVRJQykge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IFNUQVRJQyA/IGl0IDogaXQucHJvdG90eXBlLCBUT19TVFJJTkdfVEFHKSkge1xuICAgIGRlZmluZVByb3BlcnR5KGl0LCBUT19TVFJJTkdfVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IFRBRyB9KTtcbiAgfVxufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2hhcmVkICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzXCIpO1xudmFyIHVpZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy91aWQgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanNcIik7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2dsb2JhbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qc1wiKTtcbnZhciBzZXRHbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanNcIik7XG52YXIgSVNfUFVSRSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9pcy1wdXJlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qc1wiKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgc2V0R2xvYmFsKFNIQVJFRCwge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMS4zJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE5IERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJ1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3RyaW5nLWF0LmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zdHJpbmctYXQuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciB0b0ludGVnZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvdG8taW50ZWdlciAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXIuanNcIik7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanNcIik7XG5cbi8vIENPTlZFUlRfVE9fU1RSSU5HOiB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIENPTlZFUlRfVE9fU1RSSU5HOiBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRoYXQsIHBvcywgQ09OVkVSVF9UT19TVFJJTkcpIHtcbiAgdmFyIFMgPSBTdHJpbmcocmVxdWlyZU9iamVjdENvZXJjaWJsZSh0aGF0KSk7XG4gIHZhciBwb3NpdGlvbiA9IHRvSW50ZWdlcihwb3MpO1xuICB2YXIgc2l6ZSA9IFMubGVuZ3RoO1xuICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBzaXplKSByZXR1cm4gQ09OVkVSVF9UT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgZmlyc3QgPSBTLmNoYXJDb2RlQXQocG9zaXRpb24pO1xuICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgfHwgKHNlY29uZCA9IFMuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpKSA8IDB4REMwMCB8fCBzZWNvbmQgPiAweERGRkZcbiAgICAgID8gQ09OVkVSVF9UT19TVFJJTkcgPyBTLmNoYXJBdChwb3NpdGlvbikgOiBmaXJzdFxuICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgdG9JbnRlZ2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3RvLWludGVnZXIgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzXCIpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4obGVuZ3RoLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG4vLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qc1wiKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYFRvSW50ZWdlcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b2ludGVnZXJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc05hTihhcmd1bWVudCA9ICthcmd1bWVudCkgPyAwIDogKGFyZ3VtZW50ID4gMCA/IGZsb29yIDogY2VpbCkoYXJndW1lbnQpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIHRvSW50ZWdlciA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy90by1pbnRlZ2VyICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qc1wiKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyKGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanNcIik7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaXMtb2JqZWN0ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzXCIpO1xuXG4vLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1zZXQtcHJvdG90eXBlLW9mLWFyZ3VtZW50cy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1zZXQtcHJvdG90eXBlLW9mLWFyZ3VtZW50cy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXNPYmplY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvaXMtb2JqZWN0ICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzXCIpO1xudmFyIGFuT2JqZWN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2FuLW9iamVjdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywgcHJvdG8pIHtcbiAgYW5PYmplY3QoTyk7XG4gIGlmICghaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3Qgc2V0IFwiICsgU3RyaW5nKHByb3RvKSArICcgYXMgYSBwcm90b3R5cGUnKTtcbiAgfVxufTtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgZ2xvYmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2dsb2JhbCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qc1wiKTtcbnZhciBzaGFyZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvc2hhcmVkICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzXCIpO1xudmFyIHVpZCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy91aWQgKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanNcIik7XG52YXIgTkFUSVZFX1NZTUJPTCA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9uYXRpdmUtc3ltYm9sICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbC5qc1wiKTtcblxudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3RvcmUgPSBzaGFyZWQoJ3drcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPSBOQVRJVkVfU1lNQk9MICYmIFN5bWJvbFtuYW1lXVxuICAgIHx8IChOQVRJVkVfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mcm9tLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mcm9tLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciAkID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2V4cG9ydCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qc1wiKTtcbnZhciBmcm9tID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2FycmF5LWZyb20gKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1mcm9tLmpzXCIpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24gKi8gXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanNcIik7XG5cbnZhciBJTkNPUlJFQ1RfSVRFUkFUSU9OID0gIWNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbihmdW5jdGlvbiAoaXRlcmFibGUpIHtcbiAgQXJyYXkuZnJvbShpdGVyYWJsZSk7XG59KTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgZnJvbTogZnJvbVxufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvci5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5zdHJpbmcuaXRlcmF0b3IuanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGNvZGVQb2ludEF0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL3N0cmluZy1hdCAqLyBcIi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1hdC5qc1wiKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanNcIik7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yICovIFwiLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yLmpzXCIpO1xuXG52YXIgU1RSSU5HX0lURVJBVE9SID0gJ1N0cmluZyBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihTVFJJTkdfSVRFUkFUT1IpO1xuXG4vLyBgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zdHJpbmcucHJvdG90eXBlLUBAaXRlcmF0b3JcbmRlZmluZUl0ZXJhdG9yKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICBzZXRJbnRlcm5hbFN0YXRlKHRoaXMsIHtcbiAgICB0eXBlOiBTVFJJTkdfSVRFUkFUT1IsXG4gICAgc3RyaW5nOiBTdHJpbmcoaXRlcmF0ZWQpLFxuICAgIGluZGV4OiAwXG4gIH0pO1xuLy8gYCVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0lc3RyaW5naXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uIG5leHQoKSB7XG4gIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gIHZhciBzdHJpbmcgPSBzdGF0ZS5zdHJpbmc7XG4gIHZhciBpbmRleCA9IHN0YXRlLmluZGV4O1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBzdHJpbmcubGVuZ3RoKSByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIHBvaW50ID0gY29kZVBvaW50QXQoc3RyaW5nLCBpbmRleCwgdHJ1ZSk7XG4gIHN0YXRlLmluZGV4ICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9kZWZhdWx0LWF0dHJzLmpzb25cIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vc3JjL2RlZmF1bHQtYXR0cnMuanNvbiAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgZXhwb3J0cyBwcm92aWRlZDogeG1sbnMsIHdpZHRoLCBoZWlnaHQsIHZpZXdCb3gsIGZpbGwsIHN0cm9rZSwgc3Ryb2tlLXdpZHRoLCBzdHJva2UtbGluZWNhcCwgc3Ryb2tlLWxpbmVqb2luLCBkZWZhdWx0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbm1vZHVsZS5leHBvcnRzID0ge1wieG1sbnNcIjpcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXCJ3aWR0aFwiOjI0LFwiaGVpZ2h0XCI6MjQsXCJ2aWV3Qm94XCI6XCIwIDAgMjQgMjRcIixcImZpbGxcIjpcIm5vbmVcIixcInN0cm9rZVwiOlwiY3VycmVudENvbG9yXCIsXCJzdHJva2Utd2lkdGhcIjoyLFwic3Ryb2tlLWxpbmVjYXBcIjpcInJvdW5kXCIsXCJzdHJva2UtbGluZWpvaW5cIjpcInJvdW5kXCJ9O1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9pY29uLmpzXCI6XG4vKiEqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaWNvbi5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqL1xuLyohIG5vIHN0YXRpYyBleHBvcnRzIGZvdW5kICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZGVkdXBlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgY2xhc3NuYW1lcy9kZWR1cGUgKi8gXCIuL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2RlZHVwZS5qc1wiKTtcblxudmFyIF9kZWR1cGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVkdXBlKTtcblxudmFyIF9kZWZhdWx0QXR0cnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2RlZmF1bHQtYXR0cnMuanNvbiAqLyBcIi4vc3JjL2RlZmF1bHQtYXR0cnMuanNvblwiKTtcblxudmFyIF9kZWZhdWx0QXR0cnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdEF0dHJzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEljb24gPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEljb24obmFtZSwgY29udGVudHMpIHtcbiAgICB2YXIgdGFncyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSWNvbik7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuY29udGVudHMgPSBjb250ZW50cztcbiAgICB0aGlzLnRhZ3MgPSB0YWdzO1xuICAgIHRoaXMuYXR0cnMgPSBfZXh0ZW5kcyh7fSwgX2RlZmF1bHRBdHRyczIuZGVmYXVsdCwgeyBjbGFzczogJ2ZlYXRoZXIgZmVhdGhlci0nICsgbmFtZSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gU1ZHIHN0cmluZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEljb24sIFt7XG4gICAga2V5OiAndG9TdmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b1N2ZygpIHtcbiAgICAgIHZhciBhdHRycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICAgIHZhciBjb21iaW5lZEF0dHJzID0gX2V4dGVuZHMoe30sIHRoaXMuYXR0cnMsIGF0dHJzLCB7IGNsYXNzOiAoMCwgX2RlZHVwZTIuZGVmYXVsdCkodGhpcy5hdHRycy5jbGFzcywgYXR0cnMuY2xhc3MpIH0pO1xuXG4gICAgICByZXR1cm4gJzxzdmcgJyArIGF0dHJzVG9TdHJpbmcoY29tYmluZWRBdHRycykgKyAnPicgKyB0aGlzLmNvbnRlbnRzICsgJzwvc3ZnPic7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhbiBgSWNvbmAuXG4gICAgICpcbiAgICAgKiBBZGRlZCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eS4gSWYgb2xkIGNvZGUgZXhwZWN0cyBgZmVhdGhlci5pY29ucy48bmFtZT5gXG4gICAgICogdG8gYmUgYSBzdHJpbmcsIGB0b1N0cmluZygpYCB3aWxsIGdldCBpbXBsaWNpdGx5IGNhbGxlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZW50cztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSWNvbjtcbn0oKTtcblxuLyoqXG4gKiBDb252ZXJ0IGF0dHJpYnV0ZXMgb2JqZWN0IHRvIHN0cmluZyBvZiBIVE1MIGF0dHJpYnV0ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblxuXG5mdW5jdGlvbiBhdHRyc1RvU3RyaW5nKGF0dHJzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhhdHRycykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4ga2V5ICsgJz1cIicgKyBhdHRyc1trZXldICsgJ1wiJztcbiAgfSkuam9pbignICcpO1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBJY29uO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gXCIuL3NyYy9pY29ucy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9pY29ucy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2ljb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2ljb24gKi8gXCIuL3NyYy9pY29uLmpzXCIpO1xuXG52YXIgX2ljb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaWNvbik7XG5cbnZhciBfaWNvbnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuLi9kaXN0L2ljb25zLmpzb24gKi8gXCIuL2Rpc3QvaWNvbnMuanNvblwiKTtcblxudmFyIF9pY29uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pY29ucyk7XG5cbnZhciBfdGFncyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vdGFncy5qc29uICovIFwiLi9zcmMvdGFncy5qc29uXCIpO1xuXG52YXIgX3RhZ3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGFncyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE9iamVjdC5rZXlzKF9pY29uczIuZGVmYXVsdCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIG5ldyBfaWNvbjIuZGVmYXVsdChrZXksIF9pY29uczIuZGVmYXVsdFtrZXldLCBfdGFnczIuZGVmYXVsdFtrZXldKTtcbn0pLnJlZHVjZShmdW5jdGlvbiAob2JqZWN0LCBpY29uKSB7XG4gIG9iamVjdFtpY29uLm5hbWVdID0gaWNvbjtcbiAgcmV0dXJuIG9iamVjdDtcbn0sIHt9KTtcblxuLyoqKi8gfSksXG5cbi8qKiovIFwiLi9zcmMvaW5kZXguanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIF9pY29ucyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vaWNvbnMgKi8gXCIuL3NyYy9pY29ucy5qc1wiKTtcblxudmFyIF9pY29uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pY29ucyk7XG5cbnZhciBfdG9TdmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL3RvLXN2ZyAqLyBcIi4vc3JjL3RvLXN2Zy5qc1wiKTtcblxudmFyIF90b1N2ZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b1N2Zyk7XG5cbnZhciBfcmVwbGFjZSA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vcmVwbGFjZSAqLyBcIi4vc3JjL3JlcGxhY2UuanNcIik7XG5cbnZhciBfcmVwbGFjZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZXBsYWNlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGljb25zOiBfaWNvbnMyLmRlZmF1bHQsIHRvU3ZnOiBfdG9TdmcyLmRlZmF1bHQsIHJlcGxhY2U6IF9yZXBsYWNlMi5kZWZhdWx0IH07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL3JlcGxhY2UuanNcIjpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKiEqXFxcbiAgISoqKiAuL3NyYy9yZXBsYWNlLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTsgLyogZXNsaW50LWVudiBicm93c2VyICovXG5cblxudmFyIF9kZWR1cGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISBjbGFzc25hbWVzL2RlZHVwZSAqLyBcIi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvZGVkdXBlLmpzXCIpO1xuXG52YXIgX2RlZHVwZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWR1cGUpO1xuXG52YXIgX2ljb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pY29ucyAqLyBcIi4vc3JjL2ljb25zLmpzXCIpO1xuXG52YXIgX2ljb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ljb25zKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBSZXBsYWNlIGFsbCBIVE1MIGVsZW1lbnRzIHRoYXQgaGF2ZSBhIGBkYXRhLWZlYXRoZXJgIGF0dHJpYnV0ZSB3aXRoIFNWRyBtYXJrdXBcbiAqIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGVsZW1lbnQncyBgZGF0YS1mZWF0aGVyYCBhdHRyaWJ1dGUgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cnNcbiAqL1xuZnVuY3Rpb24gcmVwbGFjZSgpIHtcbiAgdmFyIGF0dHJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignYGZlYXRoZXIucmVwbGFjZSgpYCBvbmx5IHdvcmtzIGluIGEgYnJvd3NlciBlbnZpcm9ubWVudC4nKTtcbiAgfVxuXG4gIHZhciBlbGVtZW50c1RvUmVwbGFjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZlYXRoZXJdJyk7XG5cbiAgQXJyYXkuZnJvbShlbGVtZW50c1RvUmVwbGFjZSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHJldHVybiByZXBsYWNlRWxlbWVudChlbGVtZW50LCBhdHRycyk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFJlcGxhY2UgYSBzaW5nbGUgSFRNTCBlbGVtZW50IHdpdGggU1ZHIG1hcmt1cFxuICogY29ycmVzcG9uZGluZyB0byB0aGUgZWxlbWVudCdzIGBkYXRhLWZlYXRoZXJgIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyc1xuICovXG5mdW5jdGlvbiByZXBsYWNlRWxlbWVudChlbGVtZW50KSB7XG4gIHZhciBhdHRycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgdmFyIGVsZW1lbnRBdHRycyA9IGdldEF0dHJzKGVsZW1lbnQpO1xuICB2YXIgbmFtZSA9IGVsZW1lbnRBdHRyc1snZGF0YS1mZWF0aGVyJ107XG4gIGRlbGV0ZSBlbGVtZW50QXR0cnNbJ2RhdGEtZmVhdGhlciddO1xuXG4gIHZhciBzdmdTdHJpbmcgPSBfaWNvbnMyLmRlZmF1bHRbbmFtZV0udG9TdmcoX2V4dGVuZHMoe30sIGF0dHJzLCBlbGVtZW50QXR0cnMsIHsgY2xhc3M6ICgwLCBfZGVkdXBlMi5kZWZhdWx0KShhdHRycy5jbGFzcywgZWxlbWVudEF0dHJzLmNsYXNzKSB9KSk7XG4gIHZhciBzdmdEb2N1bWVudCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc3ZnU3RyaW5nLCAnaW1hZ2Uvc3ZnK3htbCcpO1xuICB2YXIgc3ZnRWxlbWVudCA9IHN2Z0RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuXG4gIGVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoc3ZnRWxlbWVudCwgZWxlbWVudCk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBhdHRyaWJ1dGVzIG9mIGFuIEhUTUwgZWxlbWVudC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGdldEF0dHJzKGVsZW1lbnQpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oZWxlbWVudC5hdHRyaWJ1dGVzKS5yZWR1Y2UoZnVuY3Rpb24gKGF0dHJzLCBhdHRyKSB7XG4gICAgYXR0cnNbYXR0ci5uYW1lXSA9IGF0dHIudmFsdWU7XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9LCB7fSk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHJlcGxhY2U7XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL3RhZ3MuanNvblwiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvdGFncy5qc29uICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBleHBvcnRzIHByb3ZpZGVkOiBhY3Rpdml0eSwgYWlycGxheSwgYWxlcnQtY2lyY2xlLCBhbGVydC1vY3RhZ29uLCBhbGVydC10cmlhbmdsZSwgYWxpZ24tY2VudGVyLCBhbGlnbi1qdXN0aWZ5LCBhbGlnbi1sZWZ0LCBhbGlnbi1yaWdodCwgYW5jaG9yLCBhcmNoaXZlLCBhdC1zaWduLCBhd2FyZCwgYXBlcnR1cmUsIGJhci1jaGFydCwgYmFyLWNoYXJ0LTIsIGJhdHRlcnksIGJhdHRlcnktY2hhcmdpbmcsIGJlbGwsIGJlbGwtb2ZmLCBibHVldG9vdGgsIGJvb2stb3BlbiwgYm9vaywgYm9va21hcmssIGJveCwgYnJpZWZjYXNlLCBjYWxlbmRhciwgY2FtZXJhLCBjYXN0LCBjaXJjbGUsIGNsaXBib2FyZCwgY2xvY2ssIGNsb3VkLWRyaXp6bGUsIGNsb3VkLWxpZ2h0bmluZywgY2xvdWQtcmFpbiwgY2xvdWQtc25vdywgY2xvdWQsIGNvZGVwZW4sIGNvZGVzYW5kYm94LCBjb2RlLCBjb2ZmZWUsIGNvbHVtbnMsIGNvbW1hbmQsIGNvbXBhc3MsIGNvcHksIGNvcm5lci1kb3duLWxlZnQsIGNvcm5lci1kb3duLXJpZ2h0LCBjb3JuZXItbGVmdC1kb3duLCBjb3JuZXItbGVmdC11cCwgY29ybmVyLXJpZ2h0LWRvd24sIGNvcm5lci1yaWdodC11cCwgY29ybmVyLXVwLWxlZnQsIGNvcm5lci11cC1yaWdodCwgY3B1LCBjcmVkaXQtY2FyZCwgY3JvcCwgY3Jvc3NoYWlyLCBkYXRhYmFzZSwgZGVsZXRlLCBkaXNjLCBkb2xsYXItc2lnbiwgZHJvcGxldCwgZWRpdCwgZWRpdC0yLCBlZGl0LTMsIGV5ZSwgZXllLW9mZiwgZXh0ZXJuYWwtbGluaywgZmFjZWJvb2ssIGZhc3QtZm9yd2FyZCwgZmlnbWEsIGZpbGUtbWludXMsIGZpbGUtcGx1cywgZmlsZS10ZXh0LCBmaWxtLCBmaWx0ZXIsIGZsYWcsIGZvbGRlci1taW51cywgZm9sZGVyLXBsdXMsIGZvbGRlciwgZnJhbWVyLCBmcm93biwgZ2lmdCwgZ2l0LWJyYW5jaCwgZ2l0LWNvbW1pdCwgZ2l0LW1lcmdlLCBnaXQtcHVsbC1yZXF1ZXN0LCBnaXRodWIsIGdpdGxhYiwgZ2xvYmUsIGhhcmQtZHJpdmUsIGhhc2gsIGhlYWRwaG9uZXMsIGhlYXJ0LCBoZWxwLWNpcmNsZSwgaGV4YWdvbiwgaG9tZSwgaW1hZ2UsIGluYm94LCBpbnN0YWdyYW0sIGtleSwgbGF5ZXJzLCBsYXlvdXQsIGxpZmUtYm91eSwgbGluaywgbGluay0yLCBsaW5rZWRpbiwgbGlzdCwgbG9jaywgbG9nLWluLCBsb2ctb3V0LCBtYWlsLCBtYXAtcGluLCBtYXAsIG1heGltaXplLCBtYXhpbWl6ZS0yLCBtZWgsIG1lbnUsIG1lc3NhZ2UtY2lyY2xlLCBtZXNzYWdlLXNxdWFyZSwgbWljLW9mZiwgbWljLCBtaW5pbWl6ZSwgbWluaW1pemUtMiwgbWludXMsIG1vbml0b3IsIG1vb24sIG1vcmUtaG9yaXpvbnRhbCwgbW9yZS12ZXJ0aWNhbCwgbW91c2UtcG9pbnRlciwgbW92ZSwgbXVzaWMsIG5hdmlnYXRpb24sIG5hdmlnYXRpb24tMiwgb2N0YWdvbiwgcGFja2FnZSwgcGFwZXJjbGlwLCBwYXVzZSwgcGF1c2UtY2lyY2xlLCBwZW4tdG9vbCwgcGVyY2VudCwgcGhvbmUtY2FsbCwgcGhvbmUtZm9yd2FyZGVkLCBwaG9uZS1pbmNvbWluZywgcGhvbmUtbWlzc2VkLCBwaG9uZS1vZmYsIHBob25lLW91dGdvaW5nLCBwaG9uZSwgcGxheSwgcGllLWNoYXJ0LCBwbGF5LWNpcmNsZSwgcGx1cywgcGx1cy1jaXJjbGUsIHBsdXMtc3F1YXJlLCBwb2NrZXQsIHBvd2VyLCBwcmludGVyLCByYWRpbywgcmVmcmVzaC1jdywgcmVmcmVzaC1jY3csIHJlcGVhdCwgcmV3aW5kLCByb3RhdGUtY2N3LCByb3RhdGUtY3csIHJzcywgc2F2ZSwgc2Npc3NvcnMsIHNlYXJjaCwgc2VuZCwgc2V0dGluZ3MsIHNoYXJlLTIsIHNoaWVsZCwgc2hpZWxkLW9mZiwgc2hvcHBpbmctYmFnLCBzaG9wcGluZy1jYXJ0LCBzaHVmZmxlLCBza2lwLWJhY2ssIHNraXAtZm9yd2FyZCwgc2xhY2ssIHNsYXNoLCBzbGlkZXJzLCBzbWFydHBob25lLCBzbWlsZSwgc3BlYWtlciwgc3Rhciwgc3RvcC1jaXJjbGUsIHN1biwgc3VucmlzZSwgc3Vuc2V0LCB0YWJsZXQsIHRhZywgdGFyZ2V0LCB0ZXJtaW5hbCwgdGhlcm1vbWV0ZXIsIHRodW1icy1kb3duLCB0aHVtYnMtdXAsIHRvZ2dsZS1sZWZ0LCB0b2dnbGUtcmlnaHQsIHRvb2wsIHRyYXNoLCB0cmFzaC0yLCB0cmlhbmdsZSwgdHJ1Y2ssIHR2LCB0d2l0Y2gsIHR3aXR0ZXIsIHR5cGUsIHVtYnJlbGxhLCB1bmxvY2ssIHVzZXItY2hlY2ssIHVzZXItbWludXMsIHVzZXItcGx1cywgdXNlci14LCB1c2VyLCB1c2VycywgdmlkZW8tb2ZmLCB2aWRlbywgdm9pY2VtYWlsLCB2b2x1bWUsIHZvbHVtZS0xLCB2b2x1bWUtMiwgdm9sdW1lLXgsIHdhdGNoLCB3aWZpLW9mZiwgd2lmaSwgd2luZCwgeC1jaXJjbGUsIHgtb2N0YWdvbiwgeC1zcXVhcmUsIHgsIHlvdXR1YmUsIHphcC1vZmYsIHphcCwgem9vbS1pbiwgem9vbS1vdXQsIGRlZmF1bHQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxubW9kdWxlLmV4cG9ydHMgPSB7XCJhY3Rpdml0eVwiOltcInB1bHNlXCIsXCJoZWFsdGhcIixcImFjdGlvblwiLFwibW90aW9uXCJdLFwiYWlycGxheVwiOltcInN0cmVhbVwiLFwiY2FzdFwiLFwibWlycm9yaW5nXCJdLFwiYWxlcnQtY2lyY2xlXCI6W1wid2FybmluZ1wiLFwiYWxlcnRcIixcImRhbmdlclwiXSxcImFsZXJ0LW9jdGFnb25cIjpbXCJ3YXJuaW5nXCIsXCJhbGVydFwiLFwiZGFuZ2VyXCJdLFwiYWxlcnQtdHJpYW5nbGVcIjpbXCJ3YXJuaW5nXCIsXCJhbGVydFwiLFwiZGFuZ2VyXCJdLFwiYWxpZ24tY2VudGVyXCI6W1widGV4dCBhbGlnbm1lbnRcIixcImNlbnRlclwiXSxcImFsaWduLWp1c3RpZnlcIjpbXCJ0ZXh0IGFsaWdubWVudFwiLFwianVzdGlmaWVkXCJdLFwiYWxpZ24tbGVmdFwiOltcInRleHQgYWxpZ25tZW50XCIsXCJsZWZ0XCJdLFwiYWxpZ24tcmlnaHRcIjpbXCJ0ZXh0IGFsaWdubWVudFwiLFwicmlnaHRcIl0sXCJhbmNob3JcIjpbXSxcImFyY2hpdmVcIjpbXCJpbmRleFwiLFwiYm94XCJdLFwiYXQtc2lnblwiOltcIm1lbnRpb25cIixcImF0XCIsXCJlbWFpbFwiLFwibWVzc2FnZVwiXSxcImF3YXJkXCI6W1wiYWNoaWV2ZW1lbnRcIixcImJhZGdlXCJdLFwiYXBlcnR1cmVcIjpbXCJjYW1lcmFcIixcInBob3RvXCJdLFwiYmFyLWNoYXJ0XCI6W1wic3RhdGlzdGljc1wiLFwiZGlhZ3JhbVwiLFwiZ3JhcGhcIl0sXCJiYXItY2hhcnQtMlwiOltcInN0YXRpc3RpY3NcIixcImRpYWdyYW1cIixcImdyYXBoXCJdLFwiYmF0dGVyeVwiOltcInBvd2VyXCIsXCJlbGVjdHJpY2l0eVwiXSxcImJhdHRlcnktY2hhcmdpbmdcIjpbXCJwb3dlclwiLFwiZWxlY3RyaWNpdHlcIl0sXCJiZWxsXCI6W1wiYWxhcm1cIixcIm5vdGlmaWNhdGlvblwiLFwic291bmRcIl0sXCJiZWxsLW9mZlwiOltcImFsYXJtXCIsXCJub3RpZmljYXRpb25cIixcInNpbGVudFwiXSxcImJsdWV0b290aFwiOltcIndpcmVsZXNzXCJdLFwiYm9vay1vcGVuXCI6W1wicmVhZFwiLFwibGlicmFyeVwiXSxcImJvb2tcIjpbXCJyZWFkXCIsXCJkaWN0aW9uYXJ5XCIsXCJib29rbGV0XCIsXCJtYWdhemluZVwiLFwibGlicmFyeVwiXSxcImJvb2ttYXJrXCI6W1wicmVhZFwiLFwiY2xpcFwiLFwibWFya2VyXCIsXCJ0YWdcIl0sXCJib3hcIjpbXCJjdWJlXCJdLFwiYnJpZWZjYXNlXCI6W1wid29ya1wiLFwiYmFnXCIsXCJiYWdnYWdlXCIsXCJmb2xkZXJcIl0sXCJjYWxlbmRhclwiOltcImRhdGVcIl0sXCJjYW1lcmFcIjpbXCJwaG90b1wiXSxcImNhc3RcIjpbXCJjaHJvbWVjYXN0XCIsXCJhaXJwbGF5XCJdLFwiY2lyY2xlXCI6W1wib2ZmXCIsXCJ6ZXJvXCIsXCJyZWNvcmRcIl0sXCJjbGlwYm9hcmRcIjpbXCJjb3B5XCJdLFwiY2xvY2tcIjpbXCJ0aW1lXCIsXCJ3YXRjaFwiLFwiYWxhcm1cIl0sXCJjbG91ZC1kcml6emxlXCI6W1wid2VhdGhlclwiLFwic2hvd2VyXCJdLFwiY2xvdWQtbGlnaHRuaW5nXCI6W1wid2VhdGhlclwiLFwiYm9sdFwiXSxcImNsb3VkLXJhaW5cIjpbXCJ3ZWF0aGVyXCJdLFwiY2xvdWQtc25vd1wiOltcIndlYXRoZXJcIixcImJsaXp6YXJkXCJdLFwiY2xvdWRcIjpbXCJ3ZWF0aGVyXCJdLFwiY29kZXBlblwiOltcImxvZ29cIl0sXCJjb2Rlc2FuZGJveFwiOltcImxvZ29cIl0sXCJjb2RlXCI6W1wic291cmNlXCIsXCJwcm9ncmFtbWluZ1wiXSxcImNvZmZlZVwiOltcImRyaW5rXCIsXCJjdXBcIixcIm11Z1wiLFwidGVhXCIsXCJjYWZlXCIsXCJob3RcIixcImJldmVyYWdlXCJdLFwiY29sdW1uc1wiOltcImxheW91dFwiXSxcImNvbW1hbmRcIjpbXCJrZXlib2FyZFwiLFwiY21kXCIsXCJ0ZXJtaW5hbFwiLFwicHJvbXB0XCJdLFwiY29tcGFzc1wiOltcIm5hdmlnYXRpb25cIixcInNhZmFyaVwiLFwidHJhdmVsXCIsXCJkaXJlY3Rpb25cIl0sXCJjb3B5XCI6W1wiY2xvbmVcIixcImR1cGxpY2F0ZVwiXSxcImNvcm5lci1kb3duLWxlZnRcIjpbXCJhcnJvd1wiLFwicmV0dXJuXCJdLFwiY29ybmVyLWRvd24tcmlnaHRcIjpbXCJhcnJvd1wiXSxcImNvcm5lci1sZWZ0LWRvd25cIjpbXCJhcnJvd1wiXSxcImNvcm5lci1sZWZ0LXVwXCI6W1wiYXJyb3dcIl0sXCJjb3JuZXItcmlnaHQtZG93blwiOltcImFycm93XCJdLFwiY29ybmVyLXJpZ2h0LXVwXCI6W1wiYXJyb3dcIl0sXCJjb3JuZXItdXAtbGVmdFwiOltcImFycm93XCJdLFwiY29ybmVyLXVwLXJpZ2h0XCI6W1wiYXJyb3dcIl0sXCJjcHVcIjpbXCJwcm9jZXNzb3JcIixcInRlY2hub2xvZ3lcIl0sXCJjcmVkaXQtY2FyZFwiOltcInB1cmNoYXNlXCIsXCJwYXltZW50XCIsXCJjY1wiXSxcImNyb3BcIjpbXCJwaG90b1wiLFwiaW1hZ2VcIl0sXCJjcm9zc2hhaXJcIjpbXCJhaW1cIixcInRhcmdldFwiXSxcImRhdGFiYXNlXCI6W1wic3RvcmFnZVwiLFwibWVtb3J5XCJdLFwiZGVsZXRlXCI6W1wicmVtb3ZlXCJdLFwiZGlzY1wiOltcImFsYnVtXCIsXCJjZFwiLFwiZHZkXCIsXCJtdXNpY1wiXSxcImRvbGxhci1zaWduXCI6W1wiY3VycmVuY3lcIixcIm1vbmV5XCIsXCJwYXltZW50XCJdLFwiZHJvcGxldFwiOltcIndhdGVyXCJdLFwiZWRpdFwiOltcInBlbmNpbFwiLFwiY2hhbmdlXCJdLFwiZWRpdC0yXCI6W1wicGVuY2lsXCIsXCJjaGFuZ2VcIl0sXCJlZGl0LTNcIjpbXCJwZW5jaWxcIixcImNoYW5nZVwiXSxcImV5ZVwiOltcInZpZXdcIixcIndhdGNoXCJdLFwiZXllLW9mZlwiOltcInZpZXdcIixcIndhdGNoXCIsXCJoaWRlXCIsXCJoaWRkZW5cIl0sXCJleHRlcm5hbC1saW5rXCI6W1wib3V0Ym91bmRcIl0sXCJmYWNlYm9va1wiOltcImxvZ29cIixcInNvY2lhbFwiXSxcImZhc3QtZm9yd2FyZFwiOltcIm11c2ljXCJdLFwiZmlnbWFcIjpbXCJsb2dvXCIsXCJkZXNpZ25cIixcInRvb2xcIl0sXCJmaWxlLW1pbnVzXCI6W1wiZGVsZXRlXCIsXCJyZW1vdmVcIixcImVyYXNlXCJdLFwiZmlsZS1wbHVzXCI6W1wiYWRkXCIsXCJjcmVhdGVcIixcIm5ld1wiXSxcImZpbGUtdGV4dFwiOltcImRhdGFcIixcInR4dFwiLFwicGRmXCJdLFwiZmlsbVwiOltcIm1vdmllXCIsXCJ2aWRlb1wiXSxcImZpbHRlclwiOltcImZ1bm5lbFwiLFwiaG9wcGVyXCJdLFwiZmxhZ1wiOltcInJlcG9ydFwiXSxcImZvbGRlci1taW51c1wiOltcImRpcmVjdG9yeVwiXSxcImZvbGRlci1wbHVzXCI6W1wiZGlyZWN0b3J5XCJdLFwiZm9sZGVyXCI6W1wiZGlyZWN0b3J5XCJdLFwiZnJhbWVyXCI6W1wibG9nb1wiLFwiZGVzaWduXCIsXCJ0b29sXCJdLFwiZnJvd25cIjpbXCJlbW9qaVwiLFwiZmFjZVwiLFwiYmFkXCIsXCJzYWRcIixcImVtb3Rpb25cIl0sXCJnaWZ0XCI6W1wicHJlc2VudFwiLFwiYm94XCIsXCJiaXJ0aGRheVwiLFwicGFydHlcIl0sXCJnaXQtYnJhbmNoXCI6W1wiY29kZVwiLFwidmVyc2lvbiBjb250cm9sXCJdLFwiZ2l0LWNvbW1pdFwiOltcImNvZGVcIixcInZlcnNpb24gY29udHJvbFwiXSxcImdpdC1tZXJnZVwiOltcImNvZGVcIixcInZlcnNpb24gY29udHJvbFwiXSxcImdpdC1wdWxsLXJlcXVlc3RcIjpbXCJjb2RlXCIsXCJ2ZXJzaW9uIGNvbnRyb2xcIl0sXCJnaXRodWJcIjpbXCJsb2dvXCIsXCJ2ZXJzaW9uIGNvbnRyb2xcIl0sXCJnaXRsYWJcIjpbXCJsb2dvXCIsXCJ2ZXJzaW9uIGNvbnRyb2xcIl0sXCJnbG9iZVwiOltcIndvcmxkXCIsXCJicm93c2VyXCIsXCJsYW5ndWFnZVwiLFwidHJhbnNsYXRlXCJdLFwiaGFyZC1kcml2ZVwiOltcImNvbXB1dGVyXCIsXCJzZXJ2ZXJcIixcIm1lbW9yeVwiLFwiZGF0YVwiXSxcImhhc2hcIjpbXCJoYXNodGFnXCIsXCJudW1iZXJcIixcInBvdW5kXCJdLFwiaGVhZHBob25lc1wiOltcIm11c2ljXCIsXCJhdWRpb1wiLFwic291bmRcIl0sXCJoZWFydFwiOltcImxpa2VcIixcImxvdmVcIixcImVtb3Rpb25cIl0sXCJoZWxwLWNpcmNsZVwiOltcInF1ZXN0aW9uIG1hcmtcIl0sXCJoZXhhZ29uXCI6W1wic2hhcGVcIixcIm5vZGUuanNcIixcImxvZ29cIl0sXCJob21lXCI6W1wiaG91c2VcIixcImxpdmluZ1wiXSxcImltYWdlXCI6W1wicGljdHVyZVwiXSxcImluYm94XCI6W1wiZW1haWxcIl0sXCJpbnN0YWdyYW1cIjpbXCJsb2dvXCIsXCJjYW1lcmFcIl0sXCJrZXlcIjpbXCJwYXNzd29yZFwiLFwibG9naW5cIixcImF1dGhlbnRpY2F0aW9uXCIsXCJzZWN1cmVcIl0sXCJsYXllcnNcIjpbXCJzdGFja1wiXSxcImxheW91dFwiOltcIndpbmRvd1wiLFwid2VicGFnZVwiXSxcImxpZmUtYm91eVwiOltcImhlbHBcIixcImxpZmUgcmluZ1wiLFwic3VwcG9ydFwiXSxcImxpbmtcIjpbXCJjaGFpblwiLFwidXJsXCJdLFwibGluay0yXCI6W1wiY2hhaW5cIixcInVybFwiXSxcImxpbmtlZGluXCI6W1wibG9nb1wiLFwic29jaWFsIG1lZGlhXCJdLFwibGlzdFwiOltcIm9wdGlvbnNcIl0sXCJsb2NrXCI6W1wic2VjdXJpdHlcIixcInBhc3N3b3JkXCIsXCJzZWN1cmVcIl0sXCJsb2ctaW5cIjpbXCJzaWduIGluXCIsXCJhcnJvd1wiLFwiZW50ZXJcIl0sXCJsb2ctb3V0XCI6W1wic2lnbiBvdXRcIixcImFycm93XCIsXCJleGl0XCJdLFwibWFpbFwiOltcImVtYWlsXCIsXCJtZXNzYWdlXCJdLFwibWFwLXBpblwiOltcImxvY2F0aW9uXCIsXCJuYXZpZ2F0aW9uXCIsXCJ0cmF2ZWxcIixcIm1hcmtlclwiXSxcIm1hcFwiOltcImxvY2F0aW9uXCIsXCJuYXZpZ2F0aW9uXCIsXCJ0cmF2ZWxcIl0sXCJtYXhpbWl6ZVwiOltcImZ1bGxzY3JlZW5cIl0sXCJtYXhpbWl6ZS0yXCI6W1wiZnVsbHNjcmVlblwiLFwiYXJyb3dzXCIsXCJleHBhbmRcIl0sXCJtZWhcIjpbXCJlbW9qaVwiLFwiZmFjZVwiLFwibmV1dHJhbFwiLFwiZW1vdGlvblwiXSxcIm1lbnVcIjpbXCJiYXJzXCIsXCJuYXZpZ2F0aW9uXCIsXCJoYW1idXJnZXJcIl0sXCJtZXNzYWdlLWNpcmNsZVwiOltcImNvbW1lbnRcIixcImNoYXRcIl0sXCJtZXNzYWdlLXNxdWFyZVwiOltcImNvbW1lbnRcIixcImNoYXRcIl0sXCJtaWMtb2ZmXCI6W1wicmVjb3JkXCIsXCJzb3VuZFwiLFwibXV0ZVwiXSxcIm1pY1wiOltcInJlY29yZFwiLFwic291bmRcIixcImxpc3RlblwiXSxcIm1pbmltaXplXCI6W1wiZXhpdCBmdWxsc2NyZWVuXCIsXCJjbG9zZVwiXSxcIm1pbmltaXplLTJcIjpbXCJleGl0IGZ1bGxzY3JlZW5cIixcImFycm93c1wiLFwiY2xvc2VcIl0sXCJtaW51c1wiOltcInN1YnRyYWN0XCJdLFwibW9uaXRvclwiOltcInR2XCIsXCJzY3JlZW5cIixcImRpc3BsYXlcIl0sXCJtb29uXCI6W1wiZGFya1wiLFwibmlnaHRcIl0sXCJtb3JlLWhvcml6b250YWxcIjpbXCJlbGxpcHNpc1wiXSxcIm1vcmUtdmVydGljYWxcIjpbXCJlbGxpcHNpc1wiXSxcIm1vdXNlLXBvaW50ZXJcIjpbXCJhcnJvd1wiLFwiY3Vyc29yXCJdLFwibW92ZVwiOltcImFycm93c1wiXSxcIm11c2ljXCI6W1wibm90ZVwiXSxcIm5hdmlnYXRpb25cIjpbXCJsb2NhdGlvblwiLFwidHJhdmVsXCJdLFwibmF2aWdhdGlvbi0yXCI6W1wibG9jYXRpb25cIixcInRyYXZlbFwiXSxcIm9jdGFnb25cIjpbXCJzdG9wXCJdLFwicGFja2FnZVwiOltcImJveFwiLFwiY29udGFpbmVyXCJdLFwicGFwZXJjbGlwXCI6W1wiYXR0YWNobWVudFwiXSxcInBhdXNlXCI6W1wibXVzaWNcIixcInN0b3BcIl0sXCJwYXVzZS1jaXJjbGVcIjpbXCJtdXNpY1wiLFwiYXVkaW9cIixcInN0b3BcIl0sXCJwZW4tdG9vbFwiOltcInZlY3RvclwiLFwiZHJhd2luZ1wiXSxcInBlcmNlbnRcIjpbXCJkaXNjb3VudFwiXSxcInBob25lLWNhbGxcIjpbXCJyaW5nXCJdLFwicGhvbmUtZm9yd2FyZGVkXCI6W1wiY2FsbFwiXSxcInBob25lLWluY29taW5nXCI6W1wiY2FsbFwiXSxcInBob25lLW1pc3NlZFwiOltcImNhbGxcIl0sXCJwaG9uZS1vZmZcIjpbXCJjYWxsXCIsXCJtdXRlXCJdLFwicGhvbmUtb3V0Z29pbmdcIjpbXCJjYWxsXCJdLFwicGhvbmVcIjpbXCJjYWxsXCJdLFwicGxheVwiOltcIm11c2ljXCIsXCJzdGFydFwiXSxcInBpZS1jaGFydFwiOltcInN0YXRpc3RpY3NcIixcImRpYWdyYW1cIl0sXCJwbGF5LWNpcmNsZVwiOltcIm11c2ljXCIsXCJzdGFydFwiXSxcInBsdXNcIjpbXCJhZGRcIixcIm5ld1wiXSxcInBsdXMtY2lyY2xlXCI6W1wiYWRkXCIsXCJuZXdcIl0sXCJwbHVzLXNxdWFyZVwiOltcImFkZFwiLFwibmV3XCJdLFwicG9ja2V0XCI6W1wibG9nb1wiLFwic2F2ZVwiXSxcInBvd2VyXCI6W1wib25cIixcIm9mZlwiXSxcInByaW50ZXJcIjpbXCJmYXhcIixcIm9mZmljZVwiLFwiZGV2aWNlXCJdLFwicmFkaW9cIjpbXCJzaWduYWxcIl0sXCJyZWZyZXNoLWN3XCI6W1wic3luY2hyb25pc2VcIixcImFycm93c1wiXSxcInJlZnJlc2gtY2N3XCI6W1wiYXJyb3dzXCJdLFwicmVwZWF0XCI6W1wibG9vcFwiLFwiYXJyb3dzXCJdLFwicmV3aW5kXCI6W1wibXVzaWNcIl0sXCJyb3RhdGUtY2N3XCI6W1wiYXJyb3dcIl0sXCJyb3RhdGUtY3dcIjpbXCJhcnJvd1wiXSxcInJzc1wiOltcImZlZWRcIixcInN1YnNjcmliZVwiXSxcInNhdmVcIjpbXCJmbG9wcHkgZGlza1wiXSxcInNjaXNzb3JzXCI6W1wiY3V0XCJdLFwic2VhcmNoXCI6W1wiZmluZFwiLFwibWFnbmlmaWVyXCIsXCJtYWduaWZ5aW5nIGdsYXNzXCJdLFwic2VuZFwiOltcIm1lc3NhZ2VcIixcIm1haWxcIixcImVtYWlsXCIsXCJwYXBlciBhaXJwbGFuZVwiLFwicGFwZXIgYWVyb3BsYW5lXCJdLFwic2V0dGluZ3NcIjpbXCJjb2dcIixcImVkaXRcIixcImdlYXJcIixcInByZWZlcmVuY2VzXCJdLFwic2hhcmUtMlwiOltcIm5ldHdvcmtcIixcImNvbm5lY3Rpb25zXCJdLFwic2hpZWxkXCI6W1wic2VjdXJpdHlcIixcInNlY3VyZVwiXSxcInNoaWVsZC1vZmZcIjpbXCJzZWN1cml0eVwiLFwiaW5zZWN1cmVcIl0sXCJzaG9wcGluZy1iYWdcIjpbXCJlY29tbWVyY2VcIixcImNhcnRcIixcInB1cmNoYXNlXCIsXCJzdG9yZVwiXSxcInNob3BwaW5nLWNhcnRcIjpbXCJlY29tbWVyY2VcIixcImNhcnRcIixcInB1cmNoYXNlXCIsXCJzdG9yZVwiXSxcInNodWZmbGVcIjpbXCJtdXNpY1wiXSxcInNraXAtYmFja1wiOltcIm11c2ljXCJdLFwic2tpcC1mb3J3YXJkXCI6W1wibXVzaWNcIl0sXCJzbGFja1wiOltcImxvZ29cIl0sXCJzbGFzaFwiOltcImJhblwiLFwibm9cIl0sXCJzbGlkZXJzXCI6W1wic2V0dGluZ3NcIixcImNvbnRyb2xzXCJdLFwic21hcnRwaG9uZVwiOltcImNlbGxwaG9uZVwiLFwiZGV2aWNlXCJdLFwic21pbGVcIjpbXCJlbW9qaVwiLFwiZmFjZVwiLFwiaGFwcHlcIixcImdvb2RcIixcImVtb3Rpb25cIl0sXCJzcGVha2VyXCI6W1wiYXVkaW9cIixcIm11c2ljXCJdLFwic3RhclwiOltcImJvb2ttYXJrXCIsXCJmYXZvcml0ZVwiLFwibGlrZVwiXSxcInN0b3AtY2lyY2xlXCI6W1wibWVkaWFcIixcIm11c2ljXCJdLFwic3VuXCI6W1wiYnJpZ2h0bmVzc1wiLFwid2VhdGhlclwiLFwibGlnaHRcIl0sXCJzdW5yaXNlXCI6W1wid2VhdGhlclwiLFwidGltZVwiLFwibW9ybmluZ1wiLFwiZGF5XCJdLFwic3Vuc2V0XCI6W1wid2VhdGhlclwiLFwidGltZVwiLFwiZXZlbmluZ1wiLFwibmlnaHRcIl0sXCJ0YWJsZXRcIjpbXCJkZXZpY2VcIl0sXCJ0YWdcIjpbXCJsYWJlbFwiXSxcInRhcmdldFwiOltcImxvZ29cIixcImJ1bGxzZXllXCJdLFwidGVybWluYWxcIjpbXCJjb2RlXCIsXCJjb21tYW5kIGxpbmVcIixcInByb21wdFwiXSxcInRoZXJtb21ldGVyXCI6W1widGVtcGVyYXR1cmVcIixcImNlbHNpdXNcIixcImZhaHJlbmhlaXRcIixcIndlYXRoZXJcIl0sXCJ0aHVtYnMtZG93blwiOltcImRpc2xpa2VcIixcImJhZFwiLFwiZW1vdGlvblwiXSxcInRodW1icy11cFwiOltcImxpa2VcIixcImdvb2RcIixcImVtb3Rpb25cIl0sXCJ0b2dnbGUtbGVmdFwiOltcIm9uXCIsXCJvZmZcIixcInN3aXRjaFwiXSxcInRvZ2dsZS1yaWdodFwiOltcIm9uXCIsXCJvZmZcIixcInN3aXRjaFwiXSxcInRvb2xcIjpbXCJzZXR0aW5nc1wiLFwic3Bhbm5lclwiXSxcInRyYXNoXCI6W1wiZ2FyYmFnZVwiLFwiZGVsZXRlXCIsXCJyZW1vdmVcIixcImJpblwiXSxcInRyYXNoLTJcIjpbXCJnYXJiYWdlXCIsXCJkZWxldGVcIixcInJlbW92ZVwiLFwiYmluXCJdLFwidHJpYW5nbGVcIjpbXCJkZWx0YVwiXSxcInRydWNrXCI6W1wiZGVsaXZlcnlcIixcInZhblwiLFwic2hpcHBpbmdcIixcInRyYW5zcG9ydFwiLFwibG9ycnlcIl0sXCJ0dlwiOltcInRlbGV2aXNpb25cIixcInN0cmVhbVwiXSxcInR3aXRjaFwiOltcImxvZ29cIl0sXCJ0d2l0dGVyXCI6W1wibG9nb1wiLFwic29jaWFsXCJdLFwidHlwZVwiOltcInRleHRcIl0sXCJ1bWJyZWxsYVwiOltcInJhaW5cIixcIndlYXRoZXJcIl0sXCJ1bmxvY2tcIjpbXCJzZWN1cml0eVwiXSxcInVzZXItY2hlY2tcIjpbXCJmb2xsb3dlZFwiLFwic3Vic2NyaWJlZFwiXSxcInVzZXItbWludXNcIjpbXCJkZWxldGVcIixcInJlbW92ZVwiLFwidW5mb2xsb3dcIixcInVuc3Vic2NyaWJlXCJdLFwidXNlci1wbHVzXCI6W1wibmV3XCIsXCJhZGRcIixcImNyZWF0ZVwiLFwiZm9sbG93XCIsXCJzdWJzY3JpYmVcIl0sXCJ1c2VyLXhcIjpbXCJkZWxldGVcIixcInJlbW92ZVwiLFwidW5mb2xsb3dcIixcInVuc3Vic2NyaWJlXCIsXCJ1bmF2YWlsYWJsZVwiXSxcInVzZXJcIjpbXCJwZXJzb25cIixcImFjY291bnRcIl0sXCJ1c2Vyc1wiOltcImdyb3VwXCJdLFwidmlkZW8tb2ZmXCI6W1wiY2FtZXJhXCIsXCJtb3ZpZVwiLFwiZmlsbVwiXSxcInZpZGVvXCI6W1wiY2FtZXJhXCIsXCJtb3ZpZVwiLFwiZmlsbVwiXSxcInZvaWNlbWFpbFwiOltcInBob25lXCJdLFwidm9sdW1lXCI6W1wibXVzaWNcIixcInNvdW5kXCIsXCJtdXRlXCJdLFwidm9sdW1lLTFcIjpbXCJtdXNpY1wiLFwic291bmRcIl0sXCJ2b2x1bWUtMlwiOltcIm11c2ljXCIsXCJzb3VuZFwiXSxcInZvbHVtZS14XCI6W1wibXVzaWNcIixcInNvdW5kXCIsXCJtdXRlXCJdLFwid2F0Y2hcIjpbXCJjbG9ja1wiLFwidGltZVwiXSxcIndpZmktb2ZmXCI6W1wiZGlzYWJsZWRcIl0sXCJ3aWZpXCI6W1wiY29ubmVjdGlvblwiLFwic2lnbmFsXCIsXCJ3aXJlbGVzc1wiXSxcIndpbmRcIjpbXCJ3ZWF0aGVyXCIsXCJhaXJcIl0sXCJ4LWNpcmNsZVwiOltcImNhbmNlbFwiLFwiY2xvc2VcIixcImRlbGV0ZVwiLFwicmVtb3ZlXCIsXCJ0aW1lc1wiLFwiY2xlYXJcIl0sXCJ4LW9jdGFnb25cIjpbXCJkZWxldGVcIixcInN0b3BcIixcImFsZXJ0XCIsXCJ3YXJuaW5nXCIsXCJ0aW1lc1wiLFwiY2xlYXJcIl0sXCJ4LXNxdWFyZVwiOltcImNhbmNlbFwiLFwiY2xvc2VcIixcImRlbGV0ZVwiLFwicmVtb3ZlXCIsXCJ0aW1lc1wiLFwiY2xlYXJcIl0sXCJ4XCI6W1wiY2FuY2VsXCIsXCJjbG9zZVwiLFwiZGVsZXRlXCIsXCJyZW1vdmVcIixcInRpbWVzXCIsXCJjbGVhclwiXSxcInlvdXR1YmVcIjpbXCJsb2dvXCIsXCJ2aWRlb1wiLFwicGxheVwiXSxcInphcC1vZmZcIjpbXCJmbGFzaFwiLFwiY2FtZXJhXCIsXCJsaWdodG5pbmdcIl0sXCJ6YXBcIjpbXCJmbGFzaFwiLFwiY2FtZXJhXCIsXCJsaWdodG5pbmdcIl0sXCJ6b29tLWluXCI6W1wibWFnbmlmeWluZyBnbGFzc1wiXSxcInpvb20tb3V0XCI6W1wibWFnbmlmeWluZyBnbGFzc1wiXX07XG5cbi8qKiovIH0pLFxuXG4vKioqLyBcIi4vc3JjL3RvLXN2Zy5qc1wiOlxuLyohKioqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9zcmMvdG8tc3ZnLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qISBubyBzdGF0aWMgZXhwb3J0cyBmb3VuZCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2ljb25zID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9pY29ucyAqLyBcIi4vc3JjL2ljb25zLmpzXCIpO1xuXG52YXIgX2ljb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ljb25zKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDcmVhdGUgYW4gU1ZHIHN0cmluZy5cbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJzXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0b1N2ZyhuYW1lKSB7XG4gIHZhciBhdHRycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgY29uc29sZS53YXJuKCdmZWF0aGVyLnRvU3ZnKCkgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBmZWF0aGVyLmljb25zW25hbWVdLnRvU3ZnKCkgaW5zdGVhZC4nKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSByZXF1aXJlZCBga2V5YCAoaWNvbiBuYW1lKSBwYXJhbWV0ZXIgaXMgbWlzc2luZy4nKTtcbiAgfVxuXG4gIGlmICghX2ljb25zMi5kZWZhdWx0W25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBpY29uIG1hdGNoaW5nIFxcJycgKyBuYW1lICsgJ1xcJy4gU2VlIHRoZSBjb21wbGV0ZSBsaXN0IG9mIGljb25zIGF0IGh0dHBzOi8vZmVhdGhlcmljb25zLmNvbScpO1xuICB9XG5cbiAgcmV0dXJuIF9pY29uczIuZGVmYXVsdFtuYW1lXS50b1N2ZyhhdHRycyk7XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHRvU3ZnO1xuXG4vKioqLyB9KSxcblxuLyoqKi8gMDpcbi8qISoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIG11bHRpIGNvcmUtanMvZXMvYXJyYXkvZnJvbSAuL3NyYy9pbmRleC5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKiEgbm8gc3RhdGljIGV4cG9ydHMgZm91bmQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgY29yZS1qcy9lcy9hcnJheS9mcm9tICovXCIuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2VzL2FycmF5L2Zyb20uanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC9ob21lL3RyYXZpcy9idWlsZC9mZWF0aGVyaWNvbnMvZmVhdGhlci9zcmMvaW5kZXguanMgKi9cIi4vc3JjL2luZGV4LmpzXCIpO1xuXG5cbi8qKiovIH0pXG5cbi8qKioqKiovIH0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZWF0aGVyLmpzLm1hcCIsIi8qKlxyXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zIGNvbW1vbmx5IHVzZWQgaW4gT2JzaWRpYW4gcGx1Z2lucy5cclxuICogQG1vZHVsZSBvYnNpZGlhbi1jb21tdW5pdHktbGliXHJcbiAqL1xyXG5pbXBvcnQgKiBhcyBmZWF0aGVyIGZyb20gXCJmZWF0aGVyLWljb25zXCI7XHJcbmltcG9ydCB7IGFkZEljb24sIE1hcmtkb3duUmVuZGVyZXIsIE1hcmtkb3duVmlldywgTW9kYWwsIG5vcm1hbGl6ZVBhdGgsIE5vdGljZSwgcmVxdWVzdCwgVEZpbGUsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbi8qKlxyXG4gKiBZb3UgY2FuIGF3YWl0IHRoaXMgRnVuY3Rpb24gdG8gZGVsYXkgZXhlY3V0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBkZWxheSBUaGUgZGVsYXkgaW4gbXNcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWl0KGRlbGF5KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgZGVsYXkpKTtcclxufVxyXG4vKipcclxuICogQWRkcyBhbGwgb2ZmaWNpYWwgRmVhdGhlciBJY29ucyB0byBPYnNpZGlhbi5cclxuICogaHR0cHM6Ly9mZWF0aGVyaWNvbnMuY29tL1xyXG4gKlxyXG4gKiBAcGFyYW0gYXR0ciBTVkcgQXR0cmlidXRlcyBmb3IgdGhlIEljb24uIFRoZSBkZWZhdWx0IHNob3VsZCB3b3JrIGZvciBtb3N0IHVzZWNhc2VzLlxyXG4gKlxyXG4gKiBAZGVwcmVjYXRlZCBBcyBvZiBPYnNpZGlhbiAwLjEzLjI3IHRoaXMgaXMgbm8gbG9uZ2VyIG5lZWRlZCwgYmVjYXVzZSBPYnNpZGlhbiBzaGlwcyB3aXRoIGBsdWNpZGVgLCBhIG1haW50YWluZWQgZm9yayBvZiBmZWF0aGVyLiAoaHR0cHM6Ly9sdWNpZGUuZGV2LylcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRBbGxGZWF0aGVySWNvbnMoYXR0ciA9IHsgdmlld0JveDogXCIwIDAgMjQgMjRcIiwgd2lkdGg6IFwiMTAwXCIsIGhlaWdodDogXCIxMDBcIiB9KSB7XHJcbiAgICBPYmplY3QudmFsdWVzKGZlYXRoZXIuaWNvbnMpLmZvckVhY2goKGkpID0+IHtcclxuICAgICAgICBjb25zdCBzdmcgPSBpLnRvU3ZnKGF0dHIpO1xyXG4gICAgICAgIGFkZEljb24oYGZlYXRoZXItJHtpLm5hbWV9YCwgc3ZnKTtcclxuICAgIH0pO1xyXG59XHJcbi8qKlxyXG4gKiBBZGRzIGEgc3BlY2lmaWMgRmVhdGhlciBJY29uIHRvIE9ic2lkaWFuLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBvZmZpY2lhbCBOYW1lIG9mIHRoZSBJY29uIChodHRwczovL2ZlYXRoZXJpY29ucy5jb20vKVxyXG4gKiBAcGFyYW0gYXR0ciBTVkcgQXR0cmlidXRlcyBmb3IgdGhlIEljb24uIFRoZSBkZWZhdWx0IHNob3VsZCB3b3JrIGZvciBtb3N0IHVzZWNhc2VzLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBJY29uIG5hbWVcclxuICpcclxuICogQGRlcHJlY2F0ZWQgQXMgb2YgT2JzaWRpYW4gMC4xMy4yNyB0aGlzIGlzIG5vIGxvbmdlciBuZWVkZWQsIGJlY2F1c2UgT2JzaWRpYW4gc2hpcHMgd2l0aCBgbHVjaWRlYCwgYSBtYWludGFpbmVkIGZvcmsgb2YgZmVhdGhlci4gKGh0dHBzOi8vbHVjaWRlLmRldi8pXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkRmVhdGhlckljb24obmFtZSwgYXR0ciA9IHsgdmlld0JveDogXCIwIDAgMjQgMjRcIiwgd2lkdGg6IFwiMTAwXCIsIGhlaWdodDogXCIxMDBcIiB9KSB7XHJcbiAgICBpZiAoZmVhdGhlci5pY29uc1tuYW1lXSkge1xyXG4gICAgICAgIGNvbnN0IGljb25OYW1lID0gYGZlYXRoZXItJHtuYW1lfWA7XHJcbiAgICAgICAgYWRkSWNvbihpY29uTmFtZSwgZmVhdGhlci5pY29uc1tuYW1lXS50b1N2ZyhhdHRyKSk7XHJcbiAgICAgICAgcmV0dXJuIGljb25OYW1lO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoYFRoaXMgSWNvbiAoJHtuYW1lfSkgZG9lc24ndCBleGlzdCBpbiB0aGUgRmVhdGhlciBMaWJyYXJ5LmApO1xyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4gKiBDb252ZXJ0IGEgYmFzZTY0IFN0cmluZyB0byBhbiBBcnJheUJ1ZmZlci5cclxuICogWW91IGNhbiB0aGVuIHVzZSB0aGUgQXJyYXlCdWZmZXIgdG8gc2F2ZSB0aGUgYXNzZXQgdG8gZGlzay5cclxuICpcclxuICogQHBhcmFtIGJhc2U2NCBiYXNlNjQgc3RyaW5nIHRvIGJlIGNvbnZlcnRlZC5cclxuICogQHJldHVybnMgQXJyYXlCdWZmZXJcclxuICogQGRlcHJlY2F0ZWQgT2JzaWRpYW4gb2ZmZXJzIGl0J3Mgb3duIG1ldGhvZCBhcyBvZiAwLjE0LjVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBiYXNlNjRUb0FycmF5QnVmZmVyKGJhc2U2NCkge1xyXG4gICAgY29uc3QgYmluYXJ5X3N0cmluZyA9IHdpbmRvdy5hdG9iKGJhc2U2NCk7XHJcbiAgICBjb25zdCBsZW4gPSBiaW5hcnlfc3RyaW5nLmxlbmd0aDtcclxuICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgYnl0ZXNbaV0gPSBiaW5hcnlfc3RyaW5nLmNoYXJDb2RlQXQoaSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYnl0ZXMuYnVmZmVyO1xyXG59XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgaGVscGVyIG1ldGhvZCBmb3IgYW4gdW5kb2N1bWVudGVkIEFQSSBvZiBPYnNpZGlhbi5cclxuICpcclxuICogQHBhcmFtIGZpbGVOYW1lIFRoZSBGaWxlbmFtZSBmb3IgeW91ciBBdHRhY2htZW50XHJcbiAqIEBwYXJhbSBmb3JtYXQgVGhlIEZpbGVmb3JtYXQgb2YgeW91ciBBdHRhY2htZW50XHJcbiAqIEBwYXJhbSBzb3VyY2VGaWxlIFRoZSBTb3VyY2VmaWxlIGZyb20gd2hlcmUgdGhlIEF0dGFjaG1lbnQgZ2V0cyBhZGRlZCwgdGhpcyBpcyBuZWVkZWQgYmVjYXVzZSB0aGUgQXR0YWNobWVudCBGb2xkZXIgbWlnaHQgYmUgZGlmZmVyZW50IGJhc2VkIG9uIHdoZXJlIGl0IGdldHMgaW5zZXJ0ZWQuXHJcbiAqIEByZXR1cm5zIFRoZSBBdHRhY2htZW50IFBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmFpbGFibGVQYXRoRm9yQXR0YWNobWVudHMoZmlsZU5hbWUsIGZvcm1hdCwgc291cmNlRmlsZSkge1xyXG4gICAgLy9AdHMtZXhwZWN0LWVycm9yXHJcbiAgICByZXR1cm4gYXBwLnZhdWx0LmdldEF2YWlsYWJsZVBhdGhGb3JBdHRhY2htZW50cyhmaWxlTmFtZSwgZm9ybWF0LCBzb3VyY2VGaWxlKTtcclxufVxyXG4vKipcclxuICogQ29weSBgY29udGVudGAgdG8gdGhlIHVzZXJzIGNsaXBib2FyZC5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgVGhlIGNvbnRlbnQgdG8gYmUgY29waWVkIHRvIGNsaXBib2FyZC5cclxuICogQHBhcmFtIHsoKSA9PiBhbnl9IHN1Y2Nlc3MgVGhlIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHRleHQgaXMgc3VjY2Vzc2Z1bGx5IGNvcGllZC4gRGVmYXVsdCB0aHJvd3MgYSBuZXcgYE5vdGljZWBcclxuICogQHBhcmFtIHsocmVhc29uPykgPT4gYW55fSBmYWlsdXJlIFRoZSBjYWxsYmFjayB0byBydW4gd2hlbiB0ZXh0IHdhcyBub3QgYWJsZSB0byBiZSBjb3BpZWQuIERlZmF1bHQgdGhyb3dzIGEgbmV3IGBOb3RpY2VgLCBhbmQgY29uc29sZSBsb2dzIHRoZSBlcnJvci5gXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weShjb250ZW50LCBzdWNjZXNzID0gKCkgPT4gbmV3IE5vdGljZShcIkNvcGllZCB0byBjbGlwYm9hcmRcIiksIGZhaWx1cmUgPSAocmVhc29uKSA9PiB7XHJcbiAgICBuZXcgTm90aWNlKFwiQ291bGQgbm90IGNvcHkgdG8gY2xpcGJvYXJkXCIpO1xyXG4gICAgY29uc29sZS5sb2coeyByZWFzb24gfSk7XHJcbn0pIHtcclxuICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvbnRlbnQpLnRoZW4oc3VjY2VzcywgZmFpbHVyZSk7XHJcbn1cclxuLyoqXHJcbiAqIEdpdmVuIGFuIGVkaXRvciwgY2hlY2sgaWYgc29tZXRoaW5nIGlzIHNlbGVjdGVkIGFuZCByZXR1cm4gdGhhdCBzZWxlY3Rpb24sIG90aGVyd2lzZSByZXR1cm4gdGhlIGVudGlyZSBjb250ZW50IG9mIHRoZSBlZGl0b3JcclxuICogQHBhcmFtICB7RWRpdG9yfSBlZGl0b3JcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3Rpb25Gcm9tRWRpdG9yKGVkaXRvcikge1xyXG4gICAgaWYgKGVkaXRvci5zb21ldGhpbmdTZWxlY3RlZCgpKVxyXG4gICAgICAgIHJldHVybiBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGVkaXRvci5nZXRWYWx1ZSgpO1xyXG59XHJcbi8qKlxyXG4gKiBDaGVjayBpZiBzb21ldGhpbmcgaXMgc2VsZWN0ZWQgaW4gdGhlIGN1cnJlbnQgZmlsZSBhbmQgcmV0dXJuIHRoYXQgc2VsZWN0aW9uLCBvdGhlcndpc2UgcmV0dXJuIHRoZSBlbnRpcmUgY29udGVudCBvZiB0aGUgY3VycmVudCBmaWxlLlxyXG4gKiBAcGFyYW0gIHtib29sZWFufSBbY2FjaGVkPXRydWVdIFVzZSBgY2FjaGVkUmVhZGAgb3IgYHJlYWRgLiBgY2FjaGVkUmVhZGAgYnkgZGVmYXVsdC5cclxuICogQHJldHVybnMge3N0cmluZyB8IG51bGx9IGBudWxsYCBpZiBub3QgZm9jdXNzZWQgb24gYSBtYXJrZG93biBmaWxlXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VsZWN0aW9uRnJvbUN1cnJGaWxlKGNhY2hlZCA9IHRydWUpIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHRleHQgPSAoX2EgPSB3aW5kb3cgPT09IG51bGwgfHwgd2luZG93ID09PSB2b2lkIDAgPyB2b2lkIDAgOiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50b1N0cmluZygpO1xyXG4gICAgaWYgKHRleHQpXHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGdldEFjdGl2ZUZpbGVDb250ZW50KGNhY2hlZCk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrIGlmIGBub3RlTmFtZWAgaXMgdGhlIG5hbWUgb2YgYSBub3RlIHRoYXQgZXhpc3RzIGluIHRoZSB2YXVsdC5cclxuICogQHBhcmFtICB7c3RyaW5nfSBub3RlTmFtZSBCYXNlbmFtZSBvZiB0aGUgbm90ZSB0byBzZWFyY2ggZm9yLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IFtzb3VyY2VQYXRoPVwiXCJdIE9wdGlvbmFsIGZpbGUgcGF0aCB0byBzdGFydCBzZWFyY2hpbmcgZnJvbS4gRGVmYXVsdCBpcyB0aGUgY3VycmVudCBmaWxlLlxyXG4gKiBAcmV0dXJucyBib29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgaXNJblZhdWx0ID0gKG5vdGVOYW1lLCBzb3VyY2VQYXRoID0gXCJcIikgPT4gISFhcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChub3RlTmFtZSwgc291cmNlUGF0aCk7XHJcbi8qKlxyXG4gKiBXaGVuIGhvdmVyaW5nIGEgbGluayBnb2luZyB0byBgdG9gLCBzaG93IHRoZSBPYnNpZGlhbiBob3Zlci1wcmV2aWV3IG9mIHRoYXQgbm90ZS5cclxuICpcclxuICogWW91IHByb2JhYmx5IGhhdmUgdG8gaG9sZCBkb3duIGBDdHJsYCB3aGVuIGhvdmVyaW5nIHRoZSBsaW5rIGZvciB0aGUgcHJldmlldyB0byBhcHBlYXIhXHJcbiAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGV2ZW50XHJcbiAqIEBwYXJhbSAge1lvdXJWaWV3fSB2aWV3IFRoZSB2aWV3IHdpdGggdGhlIGxpbmsgYmVpbmcgaG92ZXJlZFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRvIFRoZSBiYXNlbmFtZSBvZiB0aGUgbm90ZSB0byBwcmV2aWV3LlxyXG4gKiBAdGVtcGxhdGUgWW91clZpZXcgVGhlIFZpZXdUeXBlIG9mIHlvdXIgdmlld1xyXG4gKiBAcmV0dXJucyB2b2lkXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaG92ZXJQcmV2aWV3KGV2ZW50LCB2aWV3LCB0bykge1xyXG4gICAgY29uc3QgdGFyZ2V0RWwgPSBldmVudC50YXJnZXQ7XHJcbiAgICBhcHAud29ya3NwYWNlLnRyaWdnZXIoXCJob3Zlci1saW5rXCIsIHtcclxuICAgICAgICBldmVudCxcclxuICAgICAgICBzb3VyY2U6IHZpZXcuZ2V0Vmlld1R5cGUoKSxcclxuICAgICAgICBob3ZlclBhcmVudDogdmlldyxcclxuICAgICAgICB0YXJnZXRFbCxcclxuICAgICAgICBsaW5rdGV4dDogdG8sXHJcbiAgICB9KTtcclxufVxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IG1hcmtkb3duIG5vdGUgbmFtZWQgYG5ld05hbWVgIGluIHRoZSB1c2VyJ3MgcHJlZmZlcmVkIG5ldy1ub3RlLWZvbGRlci5cclxuICogQHBhcmFtICB7c3RyaW5nfSBuZXdOYW1lIE5hbWUgb2YgbmV3IG5vdGUgKHdpdGggb3Igd2l0aG91dCAnLm1kJylcclxuICogQHBhcmFtICB7c3RyaW5nfSBbY3VyckZpbGVQYXRoPVwiXCJdIEZpbGUgcGF0aCBvZiB0aGUgY3VycmVudCBub3RlLiBVc2UgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSBmaWxlLlxyXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxURmlsZT59IG5ldyBURmlsZVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld01ETm90ZShuZXdOYW1lLCBjdXJyRmlsZVBhdGggPSBcIlwiKSB7XHJcbiAgICBjb25zdCBuZXdGaWxlRm9sZGVyID0gYXBwLmZpbGVNYW5hZ2VyLmdldE5ld0ZpbGVQYXJlbnQoY3VyckZpbGVQYXRoKS5wYXRoO1xyXG4gICAgY29uc3QgbmV3RmlsZVBhdGggPSBub3JtYWxpemVQYXRoKGAke25ld0ZpbGVGb2xkZXJ9JHtuZXdGaWxlRm9sZGVyID09PSBcIi9cIiA/IFwiXCIgOiBcIi9cIn0ke2FkZE1EKG5ld05hbWUpfWApO1xyXG4gICAgcmV0dXJuIGF3YWl0IGFwcC52YXVsdC5jcmVhdGUobmV3RmlsZVBhdGgsIFwiXCIpO1xyXG59XHJcbi8qKlxyXG4gKiBBZGQgJy5tZCcgdG8gYG5vdGVOYW1lYCBpZiBpdCBpc24ndCBhbHJlYWR5IHRoZXJlLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5vdGVOYW1lIHdpdGggb3Igd2l0aG91dCAnLm1kJyBvbiB0aGUgZW5kLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBub3RlTmFtZSB3aXRoICcubWQnIG9uIHRoZSBlbmQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgYWRkTUQgPSAobm90ZU5hbWUpID0+IHtcclxuICAgIHJldHVybiBub3RlTmFtZS5tYXRjaCgvXFwuTUQkfFxcLm1kJC9tKSA/IG5vdGVOYW1lIDogbm90ZU5hbWUgKyBcIi5tZFwiO1xyXG59O1xyXG4vKipcclxuICogU3RyaXAgJy5tZCcgb2ZmIHRoZSBlbmQgb2YgYSBub3RlIG5hbWUgdG8gZ2V0IGl0cyBiYXNlbmFtZS5cclxuICpcclxuICogV29ya3Mgd2l0aCB0aGUgZWRnZWNhc2Ugd2hlcmUgYSBub3RlIGhhcyAnLm1kJyBpbiBpdHMgYmFzZW5hbWU6IGBPYnNpZGlhbi5tZC5tZGAsIGZvciBleGFtcGxlLlxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IG5vdGVOYW1lIHdpdGggb3Igd2l0aG91dCAnLm1kJyBvbiB0aGUgZW5kLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBub3RlTmFtZSB3aXRob3V0ICcubWQnXHJcbiAqL1xyXG5leHBvcnQgY29uc3Qgc3RyaXBNRCA9IChub3RlTmFtZSkgPT4ge1xyXG4gICAgaWYgKG5vdGVOYW1lLm1hdGNoKC9cXC5NRCR8XFwubWQkL20pKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vdGVOYW1lLnNwbGl0KC9cXC5NRCR8XFwubWQkL20pLnNsaWNlKDAsIC0xKS5qb2luKFwiLm1kXCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAgICAgIHJldHVybiBub3RlTmFtZTtcclxufTtcclxuLyoqXHJcbiAqIFdoZW4gY2xpY2tpbmcgYSBsaW5rLCBjaGVjayBpZiB0aGF0IG5vdGUgaXMgYWxyZWFkeSBvcGVuIGluIGFub3RoZXIgbGVhZiwgYW5kIHN3aXRjaCB0byB0aGF0IGxlYWYsIGlmIHNvLiBPdGhlcndpc2UsIG9wZW4gdGhlIG5vdGUgaW4gYSBuZXcgcGFuZS5cclxuICogQHBhcmFtICB7c3RyaW5nfSBkZXN0IE5hbWUgb2Ygbm90ZSB0byBvcGVuLiBJZiB5b3Ugd2FudCB0byBvcGVuIGEgbm9uLW1kIG5vdGUsIGJlIHN1cmUgdG8gYWRkIHRoZSBmaWxlIGV4dGVuc2lvbi5cclxuICogQHBhcmFtICB7TW91c2VFdmVudH0gZXZlbnRcclxuICogQHBhcmFtICB7e2NyZWF0ZU5ld0ZpbGU6Ym9vbGVhbn19IFtvcHRpb25zPXtjcmVhdGVOZXdGaWxlOnRydWV9XSBXaGV0aGVyIG9yIG5vdCB0byBjcmVhdGUgYGRlc3RgIGZpbGUgaWYgaXQgZG9lc24ndCBleGlzdC4gSWYgYGZhbHNlYCwgc2ltcGx5IHJldHVybiBmcm9tIHRoZSBmdW5jdGlvbi5cclxuICogQHJldHVybnMgUHJvbWlzZVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wZW5PclN3aXRjaChkZXN0LCBldmVudCwgb3B0aW9ucyA9IHsgY3JlYXRlTmV3RmlsZTogdHJ1ZSB9KSB7XHJcbiAgICBjb25zdCB7IHdvcmtzcGFjZSB9ID0gYXBwO1xyXG4gICAgbGV0IGRlc3RGaWxlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QoZGVzdCwgXCJcIik7XHJcbiAgICAvLyBJZiBkZXN0IGRvZXNuJ3QgZXhpc3QsIG1ha2UgaXRcclxuICAgIGlmICghZGVzdEZpbGUgJiYgb3B0aW9ucy5jcmVhdGVOZXdGaWxlKSB7XHJcbiAgICAgICAgZGVzdEZpbGUgPSBhd2FpdCBjcmVhdGVOZXdNRE5vdGUoZGVzdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICghZGVzdEZpbGUgJiYgIW9wdGlvbnMuY3JlYXRlTmV3RmlsZSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICAvLyBDaGVjayBpZiBpdCdzIGFscmVhZHkgb3BlblxyXG4gICAgY29uc3QgbGVhdmVzV2l0aERlc3RBbHJlYWR5T3BlbiA9IFtdO1xyXG4gICAgLy8gRm9yIGFsbCBvcGVuIGxlYXZlcywgaWYgdGhlIGxlYXZlJ3MgYmFzZW5hbWUgaXMgZXF1YWwgdG8gdGhlIGxpbmsgZGVzdGluYXRpb24sIHJhdGhlciBhY3RpdmF0ZSB0aGF0IGxlYWYgaW5zdGVhZCBvZiBvcGVuaW5nIGl0IGluIHR3byBwYW5lc1xyXG4gICAgd29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMoKGxlYWYpID0+IHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgaWYgKGxlYWYudmlldyBpbnN0YW5jZW9mIE1hcmtkb3duVmlldykge1xyXG4gICAgICAgICAgICBjb25zdCBmaWxlID0gKF9hID0gbGVhZi52aWV3KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZmlsZTtcclxuICAgICAgICAgICAgaWYgKGZpbGUgJiYgZmlsZS5iYXNlbmFtZSArIFwiLlwiICsgZmlsZS5leHRlbnNpb24gPT09IGRlc3QpIHtcclxuICAgICAgICAgICAgICAgIGxlYXZlc1dpdGhEZXN0QWxyZWFkeU9wZW4ucHVzaChsZWFmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gUmF0aGVyIHN3aXRjaCB0byBpdCBpZiBpdCBpcyBvcGVuXHJcbiAgICBpZiAobGVhdmVzV2l0aERlc3RBbHJlYWR5T3Blbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgd29ya3NwYWNlLnNldEFjdGl2ZUxlYWYobGVhdmVzV2l0aERlc3RBbHJlYWR5T3BlblswXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgY29uc3QgbW9kZSA9IGFwcC52YXVsdC5nZXRDb25maWcoXCJkZWZhdWx0Vmlld01vZGVcIik7XHJcbiAgICAgICAgY29uc3QgbGVhZiA9IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuZ2V0TW9kaWZpZXJTdGF0ZShcIk1ldGFcIilcclxuICAgICAgICAgICAgPyB3b3Jrc3BhY2Uuc3BsaXRBY3RpdmVMZWFmKClcclxuICAgICAgICAgICAgOiB3b3Jrc3BhY2UuZ2V0VW5waW5uZWRMZWFmKCk7XHJcbiAgICAgICAgLy9AdHMtZXhwZWN0LWVycm9yXHJcbiAgICAgICAgYXdhaXQgbGVhZi5vcGVuRmlsZShkZXN0RmlsZSwgeyBhY3RpdmU6IHRydWUsIG1vZGUgfSk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEdpdmVuIGEgbGlzdCBvZiByZXNvbHZlZCBsaW5rcyBmcm9tIGFwcC5tZXRhZGF0YUNhY2hlLCBjaGVjayBpZiBgZnJvbWAgaGFzIGEgbGluayB0byBgdG9gXHJcbiAqIEBwYXJhbSAge1Jlc29sdmVkTGlua3N9IHJlc29sdmVkTGlua3NcclxuICogQHBhcmFtICB7c3RyaW5nfSBmcm9tIE5vdGUgbmFtZSB3aXRoIGxpbmsgbGVhdmluZyAoV2l0aCBvciB3aXRob3V0ICcubWQnKVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRvIE5vdGUgbmFtZSB3aXRoIGxpbmsgYXJyaXZpbmcgKFdpdGggb3Igd2l0aG91dCAnLm1kJylcclxuICogQHBhcmFtIHtib29sZWFufSBbZGlyZWN0ZWQ9dHJ1ZV0gT25seSBjaGVjayBpZiBgZnJvbWAgaGFzIGEgbGluayB0byBgdG9gLiBJZiBub3QgZGlyZWN0ZWQsIGNoZWNrIGluIGJvdGggZGlyZWN0aW9uc1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlua2VkKHJlc29sdmVkTGlua3MsIGZyb20sIHRvLCBkaXJlY3RlZCA9IHRydWUpIHtcclxuICAgIHZhciBfYSwgX2I7XHJcbiAgICBmcm9tID0gYWRkTUQoZnJvbSk7XHJcbiAgICB0byA9IGFkZE1EKHRvKTtcclxuICAgIGNvbnN0IGZyb21UbyA9IChfYSA9IHJlc29sdmVkTGlua3NbZnJvbV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5oYXNPd25Qcm9wZXJ0eSh0byk7XHJcbiAgICBpZiAoIWZyb21UbyAmJiAhZGlyZWN0ZWQpIHtcclxuICAgICAgICBjb25zdCB0b0Zyb20gPSAoX2IgPSByZXNvbHZlZExpbmtzW3RvXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhhc093blByb3BlcnR5KGZyb20pO1xyXG4gICAgICAgIHJldHVybiB0b0Zyb207XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGZyb21UbztcclxufVxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIGxpbmsgYGZyb21gIOKGkiBgdG9gIGlzIHJlc29sdmVkIG9yIG5vdC5cclxuICogQHBhcmFtICB7c3RyaW5nfSB0b1xyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGZyb21cclxuICogQHJldHVybnMgYm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzb2x2ZWQodG8sIGZyb20pIHtcclxuICAgIHZhciBfYTtcclxuICAgIGNvbnN0IHsgcmVzb2x2ZWRMaW5rcyB9ID0gYXBwLm1ldGFkYXRhQ2FjaGU7XHJcbiAgICByZXR1cm4gKChfYSA9IHJlc29sdmVkTGlua3MgPT09IG51bGwgfHwgcmVzb2x2ZWRMaW5rcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVzb2x2ZWRMaW5rc1thZGRNRChmcm9tKV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVthZGRNRCh0byldKSA+IDA7XHJcbn1cclxuLyoqXHJcbiAqIE9wZW4geW91ciB2aWV3IG9uIHRoZSBjaG9zZW4gYHNpZGVgIGlmIGl0IGlzbid0IGFscmVhZHkgb3BlblxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHZpZXdUeXBlXHJcbiAqIEBwYXJhbSAge0NvbnN0cnVjdG9yPFlvdXJWaWV3Pn0gdmlld0NsYXNzIFRoZSBjbGFzcyBjb25zdHJ1Y3RvciBvZiB5b3VyIHZpZXdcclxuICogQHBhcmFtICB7XCJsZWZ0XCJ8XCJyaWdodFwifSBbc2lkZT1cInJpZ2h0XCJdXHJcbiAqIEByZXR1cm5zIHtQcm9taXNlPFlvdXJWaWV3Pn0gVGhlIG9wZW5lZCB2aWV3XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlblZpZXcodmlld1R5cGUsIHZpZXdDbGFzcywgc2lkZSA9IFwicmlnaHRcIikge1xyXG4gICAgbGV0IGxlYWYgPSBudWxsO1xyXG4gICAgZm9yIChsZWFmIG9mIGFwcC53b3Jrc3BhY2UuZ2V0TGVhdmVzT2ZUeXBlKHZpZXdUeXBlKSkge1xyXG4gICAgICAgIGlmIChsZWFmLnZpZXcgaW5zdGFuY2VvZiB2aWV3Q2xhc3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxlYWYudmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoeyB0eXBlOiBcImVtcHR5XCIgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBsZWFmID1cclxuICAgICAgICAobGVhZiAhPT0gbnVsbCAmJiBsZWFmICE9PSB2b2lkIDAgPyBsZWFmIDogc2lkZSA9PT0gXCJyaWdodFwiKVxyXG4gICAgICAgICAgICA/IGFwcC53b3Jrc3BhY2UuZ2V0UmlnaHRMZWFmKGZhbHNlKVxyXG4gICAgICAgICAgICA6IGFwcC53b3Jrc3BhY2UuZ2V0TGVmdExlYWYoZmFsc2UpO1xyXG4gICAgYXdhaXQgbGVhZi5zZXRWaWV3U3RhdGUoe1xyXG4gICAgICAgIHR5cGU6IHZpZXdUeXBlLFxyXG4gICAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGxlYWYudmlldztcclxufVxyXG4vKipcclxuICogQ2hlY2sgd2hpY2ggc2lkZSBvZiB0aGUgd29ya3NwYWNlIHlvdXIgYHZpZXdUeXBlYCBpcyBvbiwgYW5kIHNhdmUgaXQgaW50byBgcGx1Z2luLnNldHRpbmdzW3NldHRpbmdOYW1lXWAuXHJcbiAqXHJcbiAqICoqVGlwKio6IFJ1biB0aGlzIGZ1bmN0aW9uIG9uIGBwbHVnaW4udW5sb2FkYCB0byBzYXZlIHRoZSBsYXN0IHNpZGUgeW91ciB2aWV3IHdhcyBvbiB3aGVuIGNsb3NpbmcsIHRoZW4ge0BsaW5rIG9wZW5WaWV3fSBvbiB0aGUgc2FtZSBzaWRlIGl0IHdhcyBsYXN0LlxyXG4gKiBAcGFyYW0gIHtZb3VyUGx1Z2lufSBwbHVnaW5cclxuICogQHBhcmFtICB7c3RyaW5nfSB2aWV3VHlwZVxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHNldHRpbmdOYW1lXHJcbiAqIEByZXR1cm5zIHtcImxlZnRcIiB8IFwicmlnaHRcIn0gYHNpZGVgXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVZpZXdTaWRlKHBsdWdpbiwgdmlld1R5cGUsIHNldHRpbmdOYW1lKSB7XHJcbiAgICBjb25zdCBsZWFmID0gYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUodmlld1R5cGUpWzBdO1xyXG4gICAgaWYgKCFsZWFmKSB7XHJcbiAgICAgICAgY29uc29sZS5pbmZvKGBPYnNpZGlhbi1Db21tdW5pdHktTGliOiBObyBpbnN0YW5jZSBvZiAnJHt2aWV3VHlwZX0nIG9wZW4sIGNhbm5vdCBzYXZlIHNpZGVgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvL0B0cy1pZ25vcmVcclxuICAgIGNvbnN0IHNpZGUgPSBsZWFmLmdldFJvb3QoKS5zaWRlO1xyXG4gICAgLy9AdHMtaWdub3JlXHJcbiAgICBwbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdID0gc2lkZTtcclxuICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgYXdhaXQgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xyXG4gICAgcmV0dXJuIHNpZGU7XHJcbn1cclxuLyoqXHJcbiAqIEEgTW9kYWwgdXNlZCBpbiB7QGxpbmsgYWRkUmVuZGVyZWRNYXJrZG93bkJ1dHRvbn0gdG8gZGlzcGxheSByZW5kZXJlZCBtYXJrZG93biBmcm9tIGEgcmF3IHN0cmluZywgb3IgZmV0Y2hlZCBmcm9tIGEgcHJvdmlkZWQgdXJsLlxyXG4gKlxyXG4gKiAhW10oaHR0cHM6Ly9pLmltZ3VyLmNvbS9OTXdNNTBFLnBuZylcclxuICogQHBhcmFtICB7WW91clBsdWdpbn0gcGx1Z2luXHJcbiAqIEBwYXJhbSAge3N0cmluZ30gc291cmNlIFJhdyBtYXJrZG93biBjb250ZW50IG9yIHVybCB0byBmaW5kIHJhdyBtYXJrZG93bi5cclxuICogQHBhcmFtICB7Ym9vbGVhbn0gZmV0Y2ggVHJ1ZSDihpIgZmV0Y2ggbWFya2Rvd24gZnJvbSBgc291cmNlYCBhcyB1cmwuIEZhbHNlIOKGkiBgc291cmNlYCBpcyBhbHJlYWR5IGEgbWFya2Rvd24gc3RyaW5nLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlbmRlcmVkTWFya2Rvd25Nb2RhbCBleHRlbmRzIE1vZGFsIHtcclxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbiwgc291cmNlLCBmZXRjaCkge1xyXG4gICAgICAgIHN1cGVyKGFwcCk7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy5mZXRjaCA9IGZldGNoO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgb25PcGVuKCkge1xyXG4gICAgICAgIGxldCB7IGNvbnRlbnRFbCwgc291cmNlLCBwbHVnaW4sIGZldGNoIH0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gc291cmNlO1xyXG4gICAgICAgIGlmIChmZXRjaCkge1xyXG4gICAgICAgICAgICBjb250ZW50RWwuY3JlYXRlRGl2KHsgdGV4dDogYFdhaXRpbmcgZm9yIGNvbnRlbnQgZnJvbTogJyR7c291cmNlfSdgIH0pO1xyXG4gICAgICAgICAgICBjb250ZW50ID0gYXdhaXQgcmVxdWVzdCh7IHVybDogc291cmNlIH0pO1xyXG4gICAgICAgICAgICBjb250ZW50RWwuZW1wdHkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbG9nRGl2ID0gY29udGVudEVsLmNyZWF0ZURpdih7IGNsczogXCJPQ0wtUmVuZGVyZWRNYXJrZG93bk1vZGFsXCIgfSk7XHJcbiAgICAgICAgTWFya2Rvd25SZW5kZXJlci5yZW5kZXJNYXJrZG93bihjb250ZW50LCBsb2dEaXYsIFwiXCIsIHBsdWdpbik7XHJcbiAgICB9XHJcbiAgICBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY29udGVudEVsLmVtcHR5KCk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIEFkZCBhIGJ1dHRvbiB0byBhbiBIVE1MRUxlbWVudCwgd2hpY2gsIHdoZW4gY2xpY2tlZCwgcG9wcyB1cCBhIHtAbGluayBSZW5kZXJlZE1hcmtkb3duTW9kYWx9IHNob3dpbmcgcmVuZGVyZWQgbWFya2Rvd24uXHJcbiAqXHJcbiAqIFVzZSBgZmV0Y2hgIHRvIGluZGljYXRlIHdoZXRoZXIgdGhlIG1hcmtkb3duIHN0cmluZyBuZWVkcyB0byBiZSBmZXRjaGVkLCBvciBpZiBpdCBoYXMgYmVlbiBwcm92aWRlZCBhcyBhIHN0cmluZyBhbHJlYWR5LlxyXG4gKlxyXG4gKiAhW10oaHR0cHM6Ly9pLmltZ3VyLmNvbS9IaTRneXl2LnBuZylcclxuICogQHBhcmFtICB7WW91clBsdWdpbn0gcGx1Z2luXHJcbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250YWluZXJFbCBIVE1MRWxlbWVudCB0byBhZGQgdGhlIGJ1dHRvbiB0b1xyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHNvdXJjZSBSYXcgbWFya2Rvd24gY29udGVudCBvciB1cmwgdG8gZmluZCByYXcgbWFya2Rvd24uXHJcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGZldGNoIFRydWUg4oaSIGZldGNoIG1hcmtkb3duIGZyb20gYHNvdXJjZWAgYXMgdXJsLiBGYWxzZSDihpIgYHNvdXJjZWAgaXMgYWxyZWFkeSBhIG1hcmtkb3duIHN0cmluZy5cclxuICogQHBhcmFtICB7c3RyaW5nfSBkaXNwbGF5VGV4dCBUZXh0IHRvIGRpc3BsYXkgaW4gdGhlIGJ1dHRvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhZGRSZW5kZXJlZE1hcmtkb3duQnV0dG9uKHBsdWdpbiwgY29udGFpbmVyRWwsIHNvdXJjZSwgZmV0Y2gsIGRpc3BsYXlUZXh0KSB7XHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IGRpc3BsYXlUZXh0IH0sIChidXQpID0+IGJ1dC5vbkNsaWNrRXZlbnQoKCkgPT4ge1xyXG4gICAgICAgIG5ldyBSZW5kZXJlZE1hcmtkb3duTW9kYWwocGx1Z2luLCBzb3VyY2UsIGZldGNoKS5vcGVuKCk7XHJcbiAgICB9KSk7XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrIGlmIGBhcHAubWV0YWRhdGFDYWNoZS5SZXNvbHZlZExpbmtzYCBoYXZlIGZ1bGx5IGluaXRhbGlzZWQuXHJcbiAqXHJcbiAqIFVzZWQgd2l0aCB7QGxpbmsgd2FpdEZvclJlc29sdmVkTGlua3N9LlxyXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG5vRmlsZXMgTnVtYmVyIG9mIGZpbGVzIGluIHlvdXIgdmF1bHQuXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVkTGlua3NDb21wbGV0ZShub0ZpbGVzKSB7XHJcbiAgICBjb25zdCB7IHJlc29sdmVkTGlua3MgfSA9IGFwcC5tZXRhZGF0YUNhY2hlO1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlc29sdmVkTGlua3MpLmxlbmd0aCA9PT0gbm9GaWxlcztcclxufVxyXG4vKipcclxuICogV2FpdCBmb3IgYGFwcC5tZXRhZGF0YUNhY2hlLlJlc29sdmVkTGlua3NgIHRvIGhhdmUgZnVsbHkgaW5pdGlhbGlzZWQuXHJcbiAqIEBwYXJhbSAge251bWJlcn0gW2RlbGF5PTEwMDBdIE51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZXR3ZWVuIGVhY2ggY2hlY2suXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4PTUwXSBNYXhpbXVtIG51bWJlciBvZiBpdGVyYXRpb25zIHRvIGNoZWNrIGJlZm9yZSB0aHJvd2luZyBhbiBlcnJvciBhbmQgYnJlYWtpbmcgb3V0IG9mIHRoZSBsb29wLlxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhaXRGb3JSZXNvbHZlZExpbmtzKGRlbGF5ID0gMTAwMCwgbWF4ID0gNTApIHtcclxuICAgIGNvbnN0IG5vRmlsZXMgPSBhcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpLmxlbmd0aDtcclxuICAgIGxldCBpID0gMDtcclxuICAgIHdoaWxlICghcmVzb2x2ZWRMaW5rc0NvbXBsZXRlKG5vRmlsZXMpICYmIGkgPCBtYXgpIHtcclxuICAgICAgICBhd2FpdCB3YWl0KGRlbGF5KTtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICBpZiAoaSA9PT0gbWF4KSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJPYnNpZGlhbi1Db21tdW5pdHktTGliOiBSZXNvbHZlZExpbmtzIGRpZCBub3QgZmluaXNoIGluaXRpYWxpc2luZy4gYG1heGAgaXRlcmF0aW9ucyB3YXMgcmVhY2hlZCBmaXJzdC5cIik7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBjb250ZW50IG9mIGEgbm90ZSBoYXMgWUFNTC4gSWYgc28sIHJldHVybiBhbiBhcnJheSBvZiB0aGUgWUFNTCBhbmQgdGhlIHJlc3Qgb2YgdGhlIG5vdGUuIElmIG5vdCwgcmV0dXJuIGBbJycsIGNvbnRlbnRdYFxyXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGNvbnRlbnRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzcGxpdEF0WWFtbChjb250ZW50KSB7XHJcbiAgICBpZiAoIS9eLS0tXFxuLy50ZXN0KGNvbnRlbnQpKVxyXG4gICAgICAgIHJldHVybiBbXCJcIiwgY29udGVudF07XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCBzcGxpdHMgPSBjb250ZW50LnNwbGl0KFwiLS0tXCIpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHNwbGl0cy5zbGljZSgwLCAyKS5qb2luKFwiLS0tXCIpICsgXCItLS1cIixcclxuICAgICAgICAgICAgc3BsaXRzLnNsaWNlKDIpLmpvaW4oXCItLS1cIiksXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtib29sZWFufSBjYWNoZWQgUmV0dXJuIGNhY2hlZCBmaWxlIGNvbnRlbnQgKipvcioqIHJldHVybiB3aGF0J3Mgb24gZGlzay5cclxuICogQHJldHVybnNcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY3RpdmVGaWxlQ29udGVudChjYWNoZWQgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBjdXJyRmlsZSA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xyXG4gICAgaWYgKCEoY3VyckZpbGUgaW5zdGFuY2VvZiBURmlsZSkpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoY2FjaGVkKVxyXG4gICAgICAgIHJldHVybiBhd2FpdCBhcHAudmF1bHQuY2FjaGVkUmVhZChjdXJyRmlsZSk7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGFwcC52YXVsdC5yZWFkKGN1cnJGaWxlKTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbnZhciBvYnNpZGlhbiA9IHJlcXVpcmUoJ29ic2lkaWFuJyk7XG5cbmNvbnN0IERFRkFVTFRfREFJTFlfTk9URV9GT1JNQVQgPSBcIllZWVktTU0tRERcIjtcbmNvbnN0IERFRkFVTFRfV0VFS0xZX05PVEVfRk9STUFUID0gXCJnZ2dnLVtXXXd3XCI7XG5jb25zdCBERUZBVUxUX01PTlRITFlfTk9URV9GT1JNQVQgPSBcIllZWVktTU1cIjtcbmNvbnN0IERFRkFVTFRfUVVBUlRFUkxZX05PVEVfRk9STUFUID0gXCJZWVlZLVtRXVFcIjtcbmNvbnN0IERFRkFVTFRfWUVBUkxZX05PVEVfRk9STUFUID0gXCJZWVlZXCI7XG5cbmZ1bmN0aW9uIHNob3VsZFVzZVBlcmlvZGljTm90ZXNTZXR0aW5ncyhwZXJpb2RpY2l0eSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IHdpbmRvdy5hcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKTtcbiAgICByZXR1cm4gcGVyaW9kaWNOb3RlcyAmJiBwZXJpb2RpY05vdGVzLnNldHRpbmdzPy5bcGVyaW9kaWNpdHldPy5lbmFibGVkO1xufVxuLyoqXG4gKiBSZWFkIHRoZSB1c2VyIHNldHRpbmdzIGZvciB0aGUgYGRhaWx5LW5vdGVzYCBwbHVnaW5cbiAqIHRvIGtlZXAgYmVoYXZpb3Igb2YgY3JlYXRpbmcgYSBuZXcgbm90ZSBpbi1zeW5jLlxuICovXG5mdW5jdGlvbiBnZXREYWlseU5vdGVTZXR0aW5ncygpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBjb25zdCB7IGludGVybmFsUGx1Z2lucywgcGx1Z2lucyB9ID0gd2luZG93LmFwcDtcbiAgICAgICAgaWYgKHNob3VsZFVzZVBlcmlvZGljTm90ZXNTZXR0aW5ncyhcImRhaWx5XCIpKSB7XG4gICAgICAgICAgICBjb25zdCB7IGZvcm1hdCwgZm9sZGVyLCB0ZW1wbGF0ZSB9ID0gcGx1Z2lucy5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKT8uc2V0dGluZ3M/LmRhaWx5IHx8IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBERUZBVUxUX0RBSUxZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgICAgIGZvbGRlcjogZm9sZGVyPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGU/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGZvbGRlciwgZm9ybWF0LCB0ZW1wbGF0ZSB9ID0gaW50ZXJuYWxQbHVnaW5zLmdldFBsdWdpbkJ5SWQoXCJkYWlseS1ub3Rlc1wiKT8uaW5zdGFuY2U/Lm9wdGlvbnMgfHwge307XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdCB8fCBERUZBVUxUX0RBSUxZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgZm9sZGVyOiBmb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJObyBjdXN0b20gZGFpbHkgbm90ZSBzZXR0aW5ncyBmb3VuZCFcIiwgZXJyKTtcbiAgICB9XG59XG4vKipcbiAqIFJlYWQgdGhlIHVzZXIgc2V0dGluZ3MgZm9yIHRoZSBgd2Vla2x5LW5vdGVzYCBwbHVnaW5cbiAqIHRvIGtlZXAgYmVoYXZpb3Igb2YgY3JlYXRpbmcgYSBuZXcgbm90ZSBpbi1zeW5jLlxuICovXG5mdW5jdGlvbiBnZXRXZWVrbHlOb3RlU2V0dGluZ3MoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgY29uc3QgcGx1Z2luTWFuYWdlciA9IHdpbmRvdy5hcHAucGx1Z2lucztcbiAgICAgICAgY29uc3QgY2FsZW5kYXJTZXR0aW5ncyA9IHBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwiY2FsZW5kYXJcIik/Lm9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHBlcmlvZGljTm90ZXNTZXR0aW5ncyA9IHBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik/LnNldHRpbmdzPy53ZWVrbHk7XG4gICAgICAgIGlmIChzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MoXCJ3ZWVrbHlcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBwZXJpb2RpY05vdGVzU2V0dGluZ3MuZm9ybWF0IHx8IERFRkFVTFRfV0VFS0xZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgICAgIGZvbGRlcjogcGVyaW9kaWNOb3Rlc1NldHRpbmdzLmZvbGRlcj8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHBlcmlvZGljTm90ZXNTZXR0aW5ncy50ZW1wbGF0ZT8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gY2FsZW5kYXJTZXR0aW5ncyB8fCB7fTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvcm1hdDogc2V0dGluZ3Mud2Vla2x5Tm90ZUZvcm1hdCB8fCBERUZBVUxUX1dFRUtMWV9OT1RFX0ZPUk1BVCxcbiAgICAgICAgICAgIGZvbGRlcjogc2V0dGluZ3Mud2Vla2x5Tm90ZUZvbGRlcj8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogc2V0dGluZ3Mud2Vla2x5Tm90ZVRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJObyBjdXN0b20gd2Vla2x5IG5vdGUgc2V0dGluZ3MgZm91bmQhXCIsIGVycik7XG4gICAgfVxufVxuLyoqXG4gKiBSZWFkIHRoZSB1c2VyIHNldHRpbmdzIGZvciB0aGUgYHBlcmlvZGljLW5vdGVzYCBwbHVnaW5cbiAqIHRvIGtlZXAgYmVoYXZpb3Igb2YgY3JlYXRpbmcgYSBuZXcgbm90ZSBpbi1zeW5jLlxuICovXG5mdW5jdGlvbiBnZXRNb250aGx5Tm90ZVNldHRpbmdzKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGx1Z2luTWFuYWdlciA9IHdpbmRvdy5hcHAucGx1Z2lucztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IChzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MoXCJtb250aGx5XCIpICYmXG4gICAgICAgICAgICBwbHVnaW5NYW5hZ2VyLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpPy5zZXR0aW5ncz8ubW9udGhseSkgfHxcbiAgICAgICAgICAgIHt9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9ybWF0OiBzZXR0aW5ncy5mb3JtYXQgfHwgREVGQVVMVF9NT05USExZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgZm9sZGVyOiBzZXR0aW5ncy5mb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHNldHRpbmdzLnRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJObyBjdXN0b20gbW9udGhseSBub3RlIHNldHRpbmdzIGZvdW5kIVwiLCBlcnIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVhZCB0aGUgdXNlciBzZXR0aW5ncyBmb3IgdGhlIGBwZXJpb2RpYy1ub3Rlc2AgcGx1Z2luXG4gKiB0byBrZWVwIGJlaGF2aW9yIG9mIGNyZWF0aW5nIGEgbmV3IG5vdGUgaW4tc3luYy5cbiAqL1xuZnVuY3Rpb24gZ2V0UXVhcnRlcmx5Tm90ZVNldHRpbmdzKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGx1Z2luTWFuYWdlciA9IHdpbmRvdy5hcHAucGx1Z2lucztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBzZXR0aW5ncyA9IChzaG91bGRVc2VQZXJpb2RpY05vdGVzU2V0dGluZ3MoXCJxdWFydGVybHlcIikgJiZcbiAgICAgICAgICAgIHBsdWdpbk1hbmFnZXIuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik/LnNldHRpbmdzPy5xdWFydGVybHkpIHx8XG4gICAgICAgICAgICB7fTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZvcm1hdDogc2V0dGluZ3MuZm9ybWF0IHx8IERFRkFVTFRfUVVBUlRFUkxZX05PVEVfRk9STUFULFxuICAgICAgICAgICAgZm9sZGVyOiBzZXR0aW5ncy5mb2xkZXI/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICAgICAgdGVtcGxhdGU6IHNldHRpbmdzLnRlbXBsYXRlPy50cmltKCkgfHwgXCJcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmluZm8oXCJObyBjdXN0b20gcXVhcnRlcmx5IG5vdGUgc2V0dGluZ3MgZm91bmQhXCIsIGVycik7XG4gICAgfVxufVxuLyoqXG4gKiBSZWFkIHRoZSB1c2VyIHNldHRpbmdzIGZvciB0aGUgYHBlcmlvZGljLW5vdGVzYCBwbHVnaW5cbiAqIHRvIGtlZXAgYmVoYXZpb3Igb2YgY3JlYXRpbmcgYSBuZXcgbm90ZSBpbi1zeW5jLlxuICovXG5mdW5jdGlvbiBnZXRZZWFybHlOb3RlU2V0dGluZ3MoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBwbHVnaW5NYW5hZ2VyID0gd2luZG93LmFwcC5wbHVnaW5zO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gKHNob3VsZFVzZVBlcmlvZGljTm90ZXNTZXR0aW5ncyhcInllYXJseVwiKSAmJlxuICAgICAgICAgICAgcGx1Z2luTWFuYWdlci5nZXRQbHVnaW4oXCJwZXJpb2RpYy1ub3Rlc1wiKT8uc2V0dGluZ3M/LnllYXJseSkgfHxcbiAgICAgICAgICAgIHt9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZm9ybWF0OiBzZXR0aW5ncy5mb3JtYXQgfHwgREVGQVVMVF9ZRUFSTFlfTk9URV9GT1JNQVQsXG4gICAgICAgICAgICBmb2xkZXI6IHNldHRpbmdzLmZvbGRlcj8udHJpbSgpIHx8IFwiXCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogc2V0dGluZ3MudGVtcGxhdGU/LnRyaW0oKSB8fCBcIlwiLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIk5vIGN1c3RvbSB5ZWFybHkgbm90ZSBzZXR0aW5ncyBmb3VuZCFcIiwgZXJyKTtcbiAgICB9XG59XG5cbi8vIENyZWRpdDogQGNyZWF0aW9uaXgvcGF0aC5qc1xuZnVuY3Rpb24gam9pbiguLi5wYXJ0U2VnbWVudHMpIHtcbiAgICAvLyBTcGxpdCB0aGUgaW5wdXRzIGludG8gYSBsaXN0IG9mIHBhdGggY29tbWFuZHMuXG4gICAgbGV0IHBhcnRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYXJ0U2VnbWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHBhcnRzID0gcGFydHMuY29uY2F0KHBhcnRTZWdtZW50c1tpXS5zcGxpdChcIi9cIikpO1xuICAgIH1cbiAgICAvLyBJbnRlcnByZXQgdGhlIHBhdGggY29tbWFuZHMgdG8gZ2V0IHRoZSBuZXcgcmVzb2x2ZWQgcGF0aC5cbiAgICBjb25zdCBuZXdQYXJ0cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcGFydHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0c1tpXTtcbiAgICAgICAgLy8gUmVtb3ZlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHNsYXNoZXNcbiAgICAgICAgLy8gQWxzbyByZW1vdmUgXCIuXCIgc2VnbWVudHNcbiAgICAgICAgaWYgKCFwYXJ0IHx8IHBhcnQgPT09IFwiLlwiKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIC8vIFB1c2ggbmV3IHBhdGggc2VnbWVudHMuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld1BhcnRzLnB1c2gocGFydCk7XG4gICAgfVxuICAgIC8vIFByZXNlcnZlIHRoZSBpbml0aWFsIHNsYXNoIGlmIHRoZXJlIHdhcyBvbmUuXG4gICAgaWYgKHBhcnRzWzBdID09PSBcIlwiKVxuICAgICAgICBuZXdQYXJ0cy51bnNoaWZ0KFwiXCIpO1xuICAgIC8vIFR1cm4gYmFjayBpbnRvIGEgc2luZ2xlIHN0cmluZyBwYXRoLlxuICAgIHJldHVybiBuZXdQYXJ0cy5qb2luKFwiL1wiKTtcbn1cbmZ1bmN0aW9uIGJhc2VuYW1lKGZ1bGxQYXRoKSB7XG4gICAgbGV0IGJhc2UgPSBmdWxsUGF0aC5zdWJzdHJpbmcoZnVsbFBhdGgubGFzdEluZGV4T2YoXCIvXCIpICsgMSk7XG4gICAgaWYgKGJhc2UubGFzdEluZGV4T2YoXCIuXCIpICE9IC0xKVxuICAgICAgICBiYXNlID0gYmFzZS5zdWJzdHJpbmcoMCwgYmFzZS5sYXN0SW5kZXhPZihcIi5cIikpO1xuICAgIHJldHVybiBiYXNlO1xufVxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyRXhpc3RzKHBhdGgpIHtcbiAgICBjb25zdCBkaXJzID0gcGF0aC5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKS5zcGxpdChcIi9cIik7XG4gICAgZGlycy5wb3AoKTsgLy8gcmVtb3ZlIGJhc2VuYW1lXG4gICAgaWYgKGRpcnMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGRpciA9IGpvaW4oLi4uZGlycyk7XG4gICAgICAgIGlmICghd2luZG93LmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZGlyKSkge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LmFwcC52YXVsdC5jcmVhdGVGb2xkZXIoZGlyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIGdldE5vdGVQYXRoKGRpcmVjdG9yeSwgZmlsZW5hbWUpIHtcbiAgICBpZiAoIWZpbGVuYW1lLmVuZHNXaXRoKFwiLm1kXCIpKSB7XG4gICAgICAgIGZpbGVuYW1lICs9IFwiLm1kXCI7XG4gICAgfVxuICAgIGNvbnN0IHBhdGggPSBvYnNpZGlhbi5ub3JtYWxpemVQYXRoKGpvaW4oZGlyZWN0b3J5LCBmaWxlbmFtZSkpO1xuICAgIGF3YWl0IGVuc3VyZUZvbGRlckV4aXN0cyhwYXRoKTtcbiAgICByZXR1cm4gcGF0aDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IHsgbWV0YWRhdGFDYWNoZSwgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgdGVtcGxhdGVQYXRoID0gb2JzaWRpYW4ubm9ybWFsaXplUGF0aCh0ZW1wbGF0ZSk7XG4gICAgaWYgKHRlbXBsYXRlUGF0aCA9PT0gXCIvXCIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbXCJcIiwgbnVsbF0pO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZUZpbGUgPSBtZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KHRlbXBsYXRlUGF0aCwgXCJcIik7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gYXdhaXQgdmF1bHQuY2FjaGVkUmVhZCh0ZW1wbGF0ZUZpbGUpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBjb25zdCBJRm9sZEluZm8gPSB3aW5kb3cuYXBwLmZvbGRNYW5hZ2VyLmxvYWQodGVtcGxhdGVGaWxlKTtcbiAgICAgICAgcmV0dXJuIFtjb250ZW50cywgSUZvbGRJbmZvXTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gcmVhZCB0aGUgZGFpbHkgbm90ZSB0ZW1wbGF0ZSAnJHt0ZW1wbGF0ZVBhdGh9J2AsIGVycik7XG4gICAgICAgIG5ldyBvYnNpZGlhbi5Ob3RpY2UoXCJGYWlsZWQgdG8gcmVhZCB0aGUgZGFpbHkgbm90ZSB0ZW1wbGF0ZVwiKTtcbiAgICAgICAgcmV0dXJuIFtcIlwiLCBudWxsXTtcbiAgICB9XG59XG5cbi8qKlxuICogZGF0ZVVJRCBpcyBhIHdheSBvZiB3ZWVrbHkgaWRlbnRpZnlpbmcgZGFpbHkvd2Vla2x5L21vbnRobHkgbm90ZXMuXG4gKiBUaGV5IGFyZSBwcmVmaXhlZCB3aXRoIHRoZSBncmFudWxhcml0eSB0byBhdm9pZCBhbWJpZ3VpdHkuXG4gKi9cbmZ1bmN0aW9uIGdldERhdGVVSUQoZGF0ZSwgZ3JhbnVsYXJpdHkgPSBcImRheVwiKSB7XG4gICAgY29uc3QgdHMgPSBkYXRlLmNsb25lKCkuc3RhcnRPZihncmFudWxhcml0eSkuZm9ybWF0KCk7XG4gICAgcmV0dXJuIGAke2dyYW51bGFyaXR5fS0ke3RzfWA7XG59XG5mdW5jdGlvbiByZW1vdmVFc2NhcGVkQ2hhcmFjdGVycyhmb3JtYXQpIHtcbiAgICByZXR1cm4gZm9ybWF0LnJlcGxhY2UoL1xcW1teXFxdXSpcXF0vZywgXCJcIik7IC8vIHJlbW92ZSBldmVyeXRoaW5nIHdpdGhpbiBicmFja2V0c1xufVxuLyoqXG4gKiBYWFg6IFdoZW4gcGFyc2luZyBkYXRlcyB0aGF0IGNvbnRhaW4gYm90aCB3ZWVrIG51bWJlcnMgYW5kIG1vbnRocyxcbiAqIE1vbWVudCBjaG9zZXMgdG8gaWdub3JlIHRoZSB3ZWVrIG51bWJlcnMuIEZvciB0aGUgd2VlayBkYXRlVUlELCB3ZVxuICogd2FudCB0aGUgb3Bwb3NpdGUgYmVoYXZpb3IuIFN0cmlwIHRoZSBNTU0gZnJvbSB0aGUgZm9ybWF0IHRvIHBhdGNoLlxuICovXG5mdW5jdGlvbiBpc0Zvcm1hdEFtYmlndW91cyhmb3JtYXQsIGdyYW51bGFyaXR5KSB7XG4gICAgaWYgKGdyYW51bGFyaXR5ID09PSBcIndlZWtcIikge1xuICAgICAgICBjb25zdCBjbGVhbkZvcm1hdCA9IHJlbW92ZUVzY2FwZWRDaGFyYWN0ZXJzKGZvcm1hdCk7XG4gICAgICAgIHJldHVybiAoL3d7MSwyfS9pLnRlc3QoY2xlYW5Gb3JtYXQpICYmXG4gICAgICAgICAgICAoL017MSw0fS8udGVzdChjbGVhbkZvcm1hdCkgfHwgL0R7MSw0fS8udGVzdChjbGVhbkZvcm1hdCkpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gZ2V0RGF0ZUZyb21GaWxlKGZpbGUsIGdyYW51bGFyaXR5KSB7XG4gICAgcmV0dXJuIGdldERhdGVGcm9tRmlsZW5hbWUoZmlsZS5iYXNlbmFtZSwgZ3JhbnVsYXJpdHkpO1xufVxuZnVuY3Rpb24gZ2V0RGF0ZUZyb21QYXRoKHBhdGgsIGdyYW51bGFyaXR5KSB7XG4gICAgcmV0dXJuIGdldERhdGVGcm9tRmlsZW5hbWUoYmFzZW5hbWUocGF0aCksIGdyYW51bGFyaXR5KTtcbn1cbmZ1bmN0aW9uIGdldERhdGVGcm9tRmlsZW5hbWUoZmlsZW5hbWUsIGdyYW51bGFyaXR5KSB7XG4gICAgY29uc3QgZ2V0U2V0dGluZ3MgPSB7XG4gICAgICAgIGRheTogZ2V0RGFpbHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIHdlZWs6IGdldFdlZWtseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgbW9udGg6IGdldE1vbnRobHlOb3RlU2V0dGluZ3MsXG4gICAgICAgIHF1YXJ0ZXI6IGdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgeWVhcjogZ2V0WWVhcmx5Tm90ZVNldHRpbmdzLFxuICAgIH07XG4gICAgY29uc3QgZm9ybWF0ID0gZ2V0U2V0dGluZ3NbZ3JhbnVsYXJpdHldKCkuZm9ybWF0LnNwbGl0KFwiL1wiKS5wb3AoKTtcbiAgICBjb25zdCBub3RlRGF0ZSA9IHdpbmRvdy5tb21lbnQoZmlsZW5hbWUsIGZvcm1hdCwgdHJ1ZSk7XG4gICAgaWYgKCFub3RlRGF0ZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc0Zvcm1hdEFtYmlndW91cyhmb3JtYXQsIGdyYW51bGFyaXR5KSkge1xuICAgICAgICBpZiAoZ3JhbnVsYXJpdHkgPT09IFwid2Vla1wiKSB7XG4gICAgICAgICAgICBjb25zdCBjbGVhbkZvcm1hdCA9IHJlbW92ZUVzY2FwZWRDaGFyYWN0ZXJzKGZvcm1hdCk7XG4gICAgICAgICAgICBpZiAoL3d7MSwyfS9pLnRlc3QoY2xlYW5Gb3JtYXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb21lbnQoZmlsZW5hbWUsIFxuICAgICAgICAgICAgICAgIC8vIElmIGZvcm1hdCBjb250YWlucyB3ZWVrLCByZW1vdmUgZGF5ICYgbW9udGggZm9ybWF0dGluZ1xuICAgICAgICAgICAgICAgIGZvcm1hdC5yZXBsYWNlKC9NezEsNH0vZywgXCJcIikucmVwbGFjZSgvRHsxLDR9L2csIFwiXCIpLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vdGVEYXRlO1xufVxuXG5jbGFzcyBEYWlseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIG1pbWljcyB0aGUgYmVoYXZpb3Igb2YgdGhlIGRhaWx5LW5vdGVzIHBsdWdpblxuICogc28gaXQgd2lsbCByZXBsYWNlIHt7ZGF0ZX19LCB7e3RpdGxlfX0sIGFuZCB7e3RpbWV9fSB3aXRoIHRoZVxuICogZm9ybWF0dGVkIHRpbWVzdGFtcC5cbiAqXG4gKiBOb3RlOiBpdCBoYXMgYW4gYWRkZWQgYm9udXMgdGhhdCBpdCdzIG5vdCAndG9kYXknIHNwZWNpZmljLlxuICovXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVEYWlseU5vdGUoZGF0ZSkge1xuICAgIGNvbnN0IGFwcCA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyB2YXVsdCB9ID0gYXBwO1xuICAgIGNvbnN0IG1vbWVudCA9IHdpbmRvdy5tb21lbnQ7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZm9ybWF0LCBmb2xkZXIgfSA9IGdldERhaWx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgW3RlbXBsYXRlQ29udGVudHMsIElGb2xkSW5mb10gPSBhd2FpdCBnZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gZGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGF3YWl0IGdldE5vdGVQYXRoKGZvbGRlciwgZmlsZW5hbWUpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlID0gYXdhaXQgdmF1bHQuY3JlYXRlKG5vcm1hbGl6ZWRQYXRoLCB0ZW1wbGF0ZUNvbnRlbnRzXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqZGF0ZVxccyp9fS9naSwgZmlsZW5hbWUpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGltZVxccyp9fS9naSwgbW9tZW50KCkuZm9ybWF0KFwiSEg6bW1cIikpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGl0bGVcXHMqfX0vZ2ksIGZpbGVuYW1lKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKihkYXRlfHRpbWUpXFxzKigoWystXVxcZCspKFt5cW13ZGhzXSkpP1xccyooOi4rPyk/fX0vZ2ksIChfLCBfdGltZU9yRGF0ZSwgY2FsYywgdGltZURlbHRhLCB1bml0LCBtb21lbnRGb3JtYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IG1vbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBkYXRlLmNsb25lKCkuc2V0KHtcbiAgICAgICAgICAgICAgICBob3VyOiBub3cuZ2V0KFwiaG91clwiKSxcbiAgICAgICAgICAgICAgICBtaW51dGU6IG5vdy5nZXQoXCJtaW51dGVcIiksXG4gICAgICAgICAgICAgICAgc2Vjb25kOiBub3cuZ2V0KFwic2Vjb25kXCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsYykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlLmFkZChwYXJzZUludCh0aW1lRGVsdGEsIDEwKSwgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9tZW50Rm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChtb21lbnRGb3JtYXQuc3Vic3RyaW5nKDEpLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqeWVzdGVyZGF5XFxzKn19L2dpLCBkYXRlLmNsb25lKCkuc3VidHJhY3QoMSwgXCJkYXlcIikuZm9ybWF0KGZvcm1hdCkpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdG9tb3Jyb3dcXHMqfX0vZ2ksIGRhdGUuY2xvbmUoKS5hZGQoMSwgXCJkXCIpLmZvcm1hdChmb3JtYXQpKSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGFwcC5mb2xkTWFuYWdlci5zYXZlKGNyZWF0ZWRGaWxlLCBJRm9sZEluZm8pO1xuICAgICAgICByZXR1cm4gY3JlYXRlZEZpbGU7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBmaWxlOiAnJHtub3JtYWxpemVkUGF0aH0nYCwgZXJyKTtcbiAgICAgICAgbmV3IG9ic2lkaWFuLk5vdGljZShcIlVuYWJsZSB0byBjcmVhdGUgbmV3IGZpbGUuXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldERhaWx5Tm90ZShkYXRlLCBkYWlseU5vdGVzKSB7XG4gICAgcmV0dXJuIGRhaWx5Tm90ZXNbZ2V0RGF0ZVVJRChkYXRlLCBcImRheVwiKV0gPz8gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEFsbERhaWx5Tm90ZXMoKSB7XG4gICAgLyoqXG4gICAgICogRmluZCBhbGwgZGFpbHkgbm90ZXMgaW4gdGhlIGRhaWx5IG5vdGUgZm9sZGVyXG4gICAgICovXG4gICAgY29uc3QgeyB2YXVsdCB9ID0gd2luZG93LmFwcDtcbiAgICBjb25zdCB7IGZvbGRlciB9ID0gZ2V0RGFpbHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBkYWlseU5vdGVzRm9sZGVyID0gdmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG9ic2lkaWFuLm5vcm1hbGl6ZVBhdGgoZm9sZGVyKSk7XG4gICAgaWYgKCFkYWlseU5vdGVzRm9sZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBEYWlseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yKFwiRmFpbGVkIHRvIGZpbmQgZGFpbHkgbm90ZXMgZm9sZGVyXCIpO1xuICAgIH1cbiAgICBjb25zdCBkYWlseU5vdGVzID0ge307XG4gICAgb2JzaWRpYW4uVmF1bHQucmVjdXJzZUNoaWxkcmVuKGRhaWx5Tm90ZXNGb2xkZXIsIChub3RlKSA9PiB7XG4gICAgICAgIGlmIChub3RlIGluc3RhbmNlb2Ygb2JzaWRpYW4uVEZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlRnJvbUZpbGUobm90ZSwgXCJkYXlcIik7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBnZXREYXRlVUlEKGRhdGUsIFwiZGF5XCIpO1xuICAgICAgICAgICAgICAgIGRhaWx5Tm90ZXNbZGF0ZVN0cmluZ10gPSBub3RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhaWx5Tm90ZXM7XG59XG5cbmNsYXNzIFdlZWtseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xufVxuZnVuY3Rpb24gZ2V0RGF5c09mV2VlaygpIHtcbiAgICBjb25zdCB7IG1vbWVudCB9ID0gd2luZG93O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgbGV0IHdlZWtTdGFydCA9IG1vbWVudC5sb2NhbGVEYXRhKCkuX3dlZWsuZG93O1xuICAgIGNvbnN0IGRheXNPZldlZWsgPSBbXG4gICAgICAgIFwic3VuZGF5XCIsXG4gICAgICAgIFwibW9uZGF5XCIsXG4gICAgICAgIFwidHVlc2RheVwiLFxuICAgICAgICBcIndlZG5lc2RheVwiLFxuICAgICAgICBcInRodXJzZGF5XCIsXG4gICAgICAgIFwiZnJpZGF5XCIsXG4gICAgICAgIFwic2F0dXJkYXlcIixcbiAgICBdO1xuICAgIHdoaWxlICh3ZWVrU3RhcnQpIHtcbiAgICAgICAgZGF5c09mV2Vlay5wdXNoKGRheXNPZldlZWsuc2hpZnQoKSk7XG4gICAgICAgIHdlZWtTdGFydC0tO1xuICAgIH1cbiAgICByZXR1cm4gZGF5c09mV2Vlaztcbn1cbmZ1bmN0aW9uIGdldERheU9mV2Vla051bWVyaWNhbFZhbHVlKGRheU9mV2Vla05hbWUpIHtcbiAgICByZXR1cm4gZ2V0RGF5c09mV2VlaygpLmluZGV4T2YoZGF5T2ZXZWVrTmFtZS50b0xvd2VyQ2FzZSgpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVdlZWtseU5vdGUoZGF0ZSkge1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZm9ybWF0LCBmb2xkZXIgfSA9IGdldFdlZWtseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IFt0ZW1wbGF0ZUNvbnRlbnRzLCBJRm9sZEluZm9dID0gYXdhaXQgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGRhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBhd2FpdCBnZXROb3RlUGF0aChmb2xkZXIsIGZpbGVuYW1lKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjcmVhdGVkRmlsZSA9IGF3YWl0IHZhdWx0LmNyZWF0ZShub3JtYWxpemVkUGF0aCwgdGVtcGxhdGVDb250ZW50c1xuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKihkYXRlfHRpbWUpXFxzKigoWystXVxcZCspKFt5cW13ZGhzXSkpP1xccyooOi4rPyk/fX0vZ2ksIChfLCBfdGltZU9yRGF0ZSwgY2FsYywgdGltZURlbHRhLCB1bml0LCBtb21lbnRGb3JtYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IHdpbmRvdy5tb21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gZGF0ZS5jbG9uZSgpLnNldCh7XG4gICAgICAgICAgICAgICAgaG91cjogbm93LmdldChcImhvdXJcIiksXG4gICAgICAgICAgICAgICAgbWludXRlOiBub3cuZ2V0KFwibWludXRlXCIpLFxuICAgICAgICAgICAgICAgIHNlY29uZDogbm93LmdldChcInNlY29uZFwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNhbGMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQocGFyc2VJbnQodGltZURlbHRhLCAxMCksIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbWVudEZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQobW9tZW50Rm9ybWF0LnN1YnN0cmluZygxKS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpdGxlXFxzKn19L2dpLCBmaWxlbmFtZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aW1lXFxzKn19L2dpLCB3aW5kb3cubW9tZW50KCkuZm9ybWF0KFwiSEg6bW1cIikpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KVxccyo6KC4qPyl9fS9naSwgKF8sIGRheU9mV2VlaywgbW9tZW50Rm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXkgPSBnZXREYXlPZldlZWtOdW1lcmljYWxWYWx1ZShkYXlPZldlZWspO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUud2Vla2RheShkYXkpLmZvcm1hdChtb21lbnRGb3JtYXQudHJpbSgpKTtcbiAgICAgICAgfSkpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB3aW5kb3cuYXBwLmZvbGRNYW5hZ2VyLnNhdmUoY3JlYXRlZEZpbGUsIElGb2xkSW5mbyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVkRmlsZTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIGZpbGU6ICcke25vcm1hbGl6ZWRQYXRofSdgLCBlcnIpO1xuICAgICAgICBuZXcgb2JzaWRpYW4uTm90aWNlKFwiVW5hYmxlIHRvIGNyZWF0ZSBuZXcgZmlsZS5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0V2Vla2x5Tm90ZShkYXRlLCB3ZWVrbHlOb3Rlcykge1xuICAgIHJldHVybiB3ZWVrbHlOb3Rlc1tnZXREYXRlVUlEKGRhdGUsIFwid2Vla1wiKV0gPz8gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEFsbFdlZWtseU5vdGVzKCkge1xuICAgIGNvbnN0IHdlZWtseU5vdGVzID0ge307XG4gICAgaWYgKCFhcHBIYXNXZWVrbHlOb3Rlc1BsdWdpbkxvYWRlZCgpKSB7XG4gICAgICAgIHJldHVybiB3ZWVrbHlOb3RlcztcbiAgICB9XG4gICAgY29uc3QgeyB2YXVsdCB9ID0gd2luZG93LmFwcDtcbiAgICBjb25zdCB7IGZvbGRlciB9ID0gZ2V0V2Vla2x5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3Qgd2Vla2x5Tm90ZXNGb2xkZXIgPSB2YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob2JzaWRpYW4ubm9ybWFsaXplUGF0aChmb2xkZXIpKTtcbiAgICBpZiAoIXdlZWtseU5vdGVzRm9sZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBXZWVrbHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvcihcIkZhaWxlZCB0byBmaW5kIHdlZWtseSBub3RlcyBmb2xkZXJcIik7XG4gICAgfVxuICAgIG9ic2lkaWFuLlZhdWx0LnJlY3Vyc2VDaGlsZHJlbih3ZWVrbHlOb3Rlc0ZvbGRlciwgKG5vdGUpID0+IHtcbiAgICAgICAgaWYgKG5vdGUgaW5zdGFuY2VvZiBvYnNpZGlhbi5URmlsZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGdldERhdGVGcm9tRmlsZShub3RlLCBcIndlZWtcIik7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBnZXREYXRlVUlEKGRhdGUsIFwid2Vla1wiKTtcbiAgICAgICAgICAgICAgICB3ZWVrbHlOb3Rlc1tkYXRlU3RyaW5nXSA9IG5vdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gd2Vla2x5Tm90ZXM7XG59XG5cbmNsYXNzIE1vbnRobHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBtaW1pY3MgdGhlIGJlaGF2aW9yIG9mIHRoZSBkYWlseS1ub3RlcyBwbHVnaW5cbiAqIHNvIGl0IHdpbGwgcmVwbGFjZSB7e2RhdGV9fSwge3t0aXRsZX19LCBhbmQge3t0aW1lfX0gd2l0aCB0aGVcbiAqIGZvcm1hdHRlZCB0aW1lc3RhbXAuXG4gKlxuICogTm90ZTogaXQgaGFzIGFuIGFkZGVkIGJvbnVzIHRoYXQgaXQncyBub3QgJ3RvZGF5JyBzcGVjaWZpYy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTW9udGhseU5vdGUoZGF0ZSkge1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZm9ybWF0LCBmb2xkZXIgfSA9IGdldE1vbnRobHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBbdGVtcGxhdGVDb250ZW50cywgSUZvbGRJbmZvXSA9IGF3YWl0IGdldFRlbXBsYXRlSW5mbyh0ZW1wbGF0ZSk7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBkYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gYXdhaXQgZ2V0Tm90ZVBhdGgoZm9sZGVyLCBmaWxlbmFtZSk7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY3JlYXRlZEZpbGUgPSBhd2FpdCB2YXVsdC5jcmVhdGUobm9ybWFsaXplZFBhdGgsIHRlbXBsYXRlQ29udGVudHNcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyooZGF0ZXx0aW1lKVxccyooKFsrLV1cXGQrKShbeXFtd2Roc10pKT9cXHMqKDouKz8pP319L2dpLCAoXywgX3RpbWVPckRhdGUsIGNhbGMsIHRpbWVEZWx0YSwgdW5pdCwgbW9tZW50Rm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub3cgPSB3aW5kb3cubW9tZW50KCk7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IGRhdGUuY2xvbmUoKS5zZXQoe1xuICAgICAgICAgICAgICAgIGhvdXI6IG5vdy5nZXQoXCJob3VyXCIpLFxuICAgICAgICAgICAgICAgIG1pbnV0ZTogbm93LmdldChcIm1pbnV0ZVwiKSxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6IG5vdy5nZXQoXCJzZWNvbmRcIiksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChjYWxjKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudERhdGUuYWRkKHBhcnNlSW50KHRpbWVEZWx0YSwgMTApLCB1bml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb21lbnRGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KG1vbWVudEZvcm1hdC5zdWJzdHJpbmcoMSkudHJpbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccypkYXRlXFxzKn19L2dpLCBmaWxlbmFtZSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aW1lXFxzKn19L2dpLCB3aW5kb3cubW9tZW50KCkuZm9ybWF0KFwiSEg6bW1cIikpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGl0bGVcXHMqfX0vZ2ksIGZpbGVuYW1lKSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHdpbmRvdy5hcHAuZm9sZE1hbmFnZXIuc2F2ZShjcmVhdGVkRmlsZSwgSUZvbGRJbmZvKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZWRGaWxlO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBjcmVhdGUgZmlsZTogJyR7bm9ybWFsaXplZFBhdGh9J2AsIGVycik7XG4gICAgICAgIG5ldyBvYnNpZGlhbi5Ob3RpY2UoXCJVbmFibGUgdG8gY3JlYXRlIG5ldyBmaWxlLlwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRNb250aGx5Tm90ZShkYXRlLCBtb250aGx5Tm90ZXMpIHtcbiAgICByZXR1cm4gbW9udGhseU5vdGVzW2dldERhdGVVSUQoZGF0ZSwgXCJtb250aFwiKV0gPz8gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEFsbE1vbnRobHlOb3RlcygpIHtcbiAgICBjb25zdCBtb250aGx5Tm90ZXMgPSB7fTtcbiAgICBpZiAoIWFwcEhhc01vbnRobHlOb3Rlc1BsdWdpbkxvYWRlZCgpKSB7XG4gICAgICAgIHJldHVybiBtb250aGx5Tm90ZXM7XG4gICAgfVxuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyBmb2xkZXIgfSA9IGdldE1vbnRobHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBtb250aGx5Tm90ZXNGb2xkZXIgPSB2YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob2JzaWRpYW4ubm9ybWFsaXplUGF0aChmb2xkZXIpKTtcbiAgICBpZiAoIW1vbnRobHlOb3Rlc0ZvbGRlcikge1xuICAgICAgICB0aHJvdyBuZXcgTW9udGhseU5vdGVzRm9sZGVyTWlzc2luZ0Vycm9yKFwiRmFpbGVkIHRvIGZpbmQgbW9udGhseSBub3RlcyBmb2xkZXJcIik7XG4gICAgfVxuICAgIG9ic2lkaWFuLlZhdWx0LnJlY3Vyc2VDaGlsZHJlbihtb250aGx5Tm90ZXNGb2xkZXIsIChub3RlKSA9PiB7XG4gICAgICAgIGlmIChub3RlIGluc3RhbmNlb2Ygb2JzaWRpYW4uVEZpbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBnZXREYXRlRnJvbUZpbGUobm90ZSwgXCJtb250aFwiKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGdldERhdGVVSUQoZGF0ZSwgXCJtb250aFwiKTtcbiAgICAgICAgICAgICAgICBtb250aGx5Tm90ZXNbZGF0ZVN0cmluZ10gPSBub3RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vbnRobHlOb3Rlcztcbn1cblxuY2xhc3MgUXVhcnRlcmx5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG59XG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gbWltaWNzIHRoZSBiZWhhdmlvciBvZiB0aGUgZGFpbHktbm90ZXMgcGx1Z2luXG4gKiBzbyBpdCB3aWxsIHJlcGxhY2Uge3tkYXRlfX0sIHt7dGl0bGV9fSwgYW5kIHt7dGltZX19IHdpdGggdGhlXG4gKiBmb3JtYXR0ZWQgdGltZXN0YW1wLlxuICpcbiAqIE5vdGU6IGl0IGhhcyBhbiBhZGRlZCBib251cyB0aGF0IGl0J3Mgbm90ICd0b2RheScgc3BlY2lmaWMuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVF1YXJ0ZXJseU5vdGUoZGF0ZSkge1xuICAgIGNvbnN0IHsgdmF1bHQgfSA9IHdpbmRvdy5hcHA7XG4gICAgY29uc3QgeyB0ZW1wbGF0ZSwgZm9ybWF0LCBmb2xkZXIgfSA9IGdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncygpO1xuICAgIGNvbnN0IFt0ZW1wbGF0ZUNvbnRlbnRzLCBJRm9sZEluZm9dID0gYXdhaXQgZ2V0VGVtcGxhdGVJbmZvKHRlbXBsYXRlKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGRhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSBhd2FpdCBnZXROb3RlUGF0aChmb2xkZXIsIGZpbGVuYW1lKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjcmVhdGVkRmlsZSA9IGF3YWl0IHZhdWx0LmNyZWF0ZShub3JtYWxpemVkUGF0aCwgdGVtcGxhdGVDb250ZW50c1xuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKihkYXRlfHRpbWUpXFxzKigoWystXVxcZCspKFt5cW13ZGhzXSkpP1xccyooOi4rPyk/fX0vZ2ksIChfLCBfdGltZU9yRGF0ZSwgY2FsYywgdGltZURlbHRhLCB1bml0LCBtb21lbnRGb3JtYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IHdpbmRvdy5tb21lbnQoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gZGF0ZS5jbG9uZSgpLnNldCh7XG4gICAgICAgICAgICAgICAgaG91cjogbm93LmdldChcImhvdXJcIiksXG4gICAgICAgICAgICAgICAgbWludXRlOiBub3cuZ2V0KFwibWludXRlXCIpLFxuICAgICAgICAgICAgICAgIHNlY29uZDogbm93LmdldChcInNlY29uZFwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGNhbGMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQocGFyc2VJbnQodGltZURlbHRhLCAxMCksIHVuaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vbWVudEZvcm1hdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50RGF0ZS5mb3JtYXQobW9tZW50Rm9ybWF0LnN1YnN0cmluZygxKS50cmltKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKmRhdGVcXHMqfX0vZ2ksIGZpbGVuYW1lKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpbWVcXHMqfX0vZ2ksIHdpbmRvdy5tb21lbnQoKS5mb3JtYXQoXCJISDptbVwiKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKC97e1xccyp0aXRsZVxccyp9fS9naSwgZmlsZW5hbWUpKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgd2luZG93LmFwcC5mb2xkTWFuYWdlci5zYXZlKGNyZWF0ZWRGaWxlLCBJRm9sZEluZm8pO1xuICAgICAgICByZXR1cm4gY3JlYXRlZEZpbGU7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGNyZWF0ZSBmaWxlOiAnJHtub3JtYWxpemVkUGF0aH0nYCwgZXJyKTtcbiAgICAgICAgbmV3IG9ic2lkaWFuLk5vdGljZShcIlVuYWJsZSB0byBjcmVhdGUgbmV3IGZpbGUuXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldFF1YXJ0ZXJseU5vdGUoZGF0ZSwgcXVhcnRlcmx5KSB7XG4gICAgcmV0dXJuIHF1YXJ0ZXJseVtnZXREYXRlVUlEKGRhdGUsIFwicXVhcnRlclwiKV0gPz8gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEFsbFF1YXJ0ZXJseU5vdGVzKCkge1xuICAgIGNvbnN0IHF1YXJ0ZXJseSA9IHt9O1xuICAgIGlmICghYXBwSGFzUXVhcnRlcmx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICByZXR1cm4gcXVhcnRlcmx5O1xuICAgIH1cbiAgICBjb25zdCB7IHZhdWx0IH0gPSB3aW5kb3cuYXBwO1xuICAgIGNvbnN0IHsgZm9sZGVyIH0gPSBnZXRRdWFydGVybHlOb3RlU2V0dGluZ3MoKTtcbiAgICBjb25zdCBxdWFydGVybHlGb2xkZXIgPSB2YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob2JzaWRpYW4ubm9ybWFsaXplUGF0aChmb2xkZXIpKTtcbiAgICBpZiAoIXF1YXJ0ZXJseUZvbGRlcikge1xuICAgICAgICB0aHJvdyBuZXcgUXVhcnRlcmx5Tm90ZXNGb2xkZXJNaXNzaW5nRXJyb3IoXCJGYWlsZWQgdG8gZmluZCBxdWFydGVybHkgbm90ZXMgZm9sZGVyXCIpO1xuICAgIH1cbiAgICBvYnNpZGlhbi5WYXVsdC5yZWN1cnNlQ2hpbGRyZW4ocXVhcnRlcmx5Rm9sZGVyLCAobm90ZSkgPT4ge1xuICAgICAgICBpZiAobm90ZSBpbnN0YW5jZW9mIG9ic2lkaWFuLlRGaWxlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRlID0gZ2V0RGF0ZUZyb21GaWxlKG5vdGUsIFwicXVhcnRlclwiKTtcbiAgICAgICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IGdldERhdGVVSUQoZGF0ZSwgXCJxdWFydGVyXCIpO1xuICAgICAgICAgICAgICAgIHF1YXJ0ZXJseVtkYXRlU3RyaW5nXSA9IG5vdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcXVhcnRlcmx5O1xufVxuXG5jbGFzcyBZZWFybHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvciBleHRlbmRzIEVycm9yIHtcbn1cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBtaW1pY3MgdGhlIGJlaGF2aW9yIG9mIHRoZSBkYWlseS1ub3RlcyBwbHVnaW5cbiAqIHNvIGl0IHdpbGwgcmVwbGFjZSB7e2RhdGV9fSwge3t0aXRsZX19LCBhbmQge3t0aW1lfX0gd2l0aCB0aGVcbiAqIGZvcm1hdHRlZCB0aW1lc3RhbXAuXG4gKlxuICogTm90ZTogaXQgaGFzIGFuIGFkZGVkIGJvbnVzIHRoYXQgaXQncyBub3QgJ3RvZGF5JyBzcGVjaWZpYy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlWWVhcmx5Tm90ZShkYXRlKSB7XG4gICAgY29uc3QgeyB2YXVsdCB9ID0gd2luZG93LmFwcDtcbiAgICBjb25zdCB7IHRlbXBsYXRlLCBmb3JtYXQsIGZvbGRlciB9ID0gZ2V0WWVhcmx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgW3RlbXBsYXRlQ29udGVudHMsIElGb2xkSW5mb10gPSBhd2FpdCBnZXRUZW1wbGF0ZUluZm8odGVtcGxhdGUpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gZGF0ZS5mb3JtYXQoZm9ybWF0KTtcbiAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IGF3YWl0IGdldE5vdGVQYXRoKGZvbGRlciwgZmlsZW5hbWUpO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlID0gYXdhaXQgdmF1bHQuY3JlYXRlKG5vcm1hbGl6ZWRQYXRoLCB0ZW1wbGF0ZUNvbnRlbnRzXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqKGRhdGV8dGltZSlcXHMqKChbKy1dXFxkKykoW3lxbXdkaHNdKSk/XFxzKig6Lis/KT99fS9naSwgKF8sIF90aW1lT3JEYXRlLCBjYWxjLCB0aW1lRGVsdGEsIHVuaXQsIG1vbWVudEZvcm1hdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gd2luZG93Lm1vbWVudCgpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBkYXRlLmNsb25lKCkuc2V0KHtcbiAgICAgICAgICAgICAgICBob3VyOiBub3cuZ2V0KFwiaG91clwiKSxcbiAgICAgICAgICAgICAgICBtaW51dGU6IG5vdy5nZXQoXCJtaW51dGVcIiksXG4gICAgICAgICAgICAgICAgc2Vjb25kOiBub3cuZ2V0KFwic2Vjb25kXCIpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoY2FsYykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlLmFkZChwYXJzZUludCh0aW1lRGVsdGEsIDEwKSwgdW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9tZW50Rm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnREYXRlLmZvcm1hdChtb21lbnRGb3JtYXQuc3Vic3RyaW5nKDEpLnRyaW0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudERhdGUuZm9ybWF0KGZvcm1hdCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqZGF0ZVxccyp9fS9naSwgZmlsZW5hbWUpXG4gICAgICAgICAgICAucmVwbGFjZSgve3tcXHMqdGltZVxccyp9fS9naSwgd2luZG93Lm1vbWVudCgpLmZvcm1hdChcIkhIOm1tXCIpKVxuICAgICAgICAgICAgLnJlcGxhY2UoL3t7XFxzKnRpdGxlXFxzKn19L2dpLCBmaWxlbmFtZSkpO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB3aW5kb3cuYXBwLmZvbGRNYW5hZ2VyLnNhdmUoY3JlYXRlZEZpbGUsIElGb2xkSW5mbyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVkRmlsZTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gY3JlYXRlIGZpbGU6ICcke25vcm1hbGl6ZWRQYXRofSdgLCBlcnIpO1xuICAgICAgICBuZXcgb2JzaWRpYW4uTm90aWNlKFwiVW5hYmxlIHRvIGNyZWF0ZSBuZXcgZmlsZS5cIik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0WWVhcmx5Tm90ZShkYXRlLCB5ZWFybHlOb3Rlcykge1xuICAgIHJldHVybiB5ZWFybHlOb3Rlc1tnZXREYXRlVUlEKGRhdGUsIFwieWVhclwiKV0gPz8gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldEFsbFllYXJseU5vdGVzKCkge1xuICAgIGNvbnN0IHllYXJseU5vdGVzID0ge307XG4gICAgaWYgKCFhcHBIYXNZZWFybHlOb3Rlc1BsdWdpbkxvYWRlZCgpKSB7XG4gICAgICAgIHJldHVybiB5ZWFybHlOb3RlcztcbiAgICB9XG4gICAgY29uc3QgeyB2YXVsdCB9ID0gd2luZG93LmFwcDtcbiAgICBjb25zdCB7IGZvbGRlciB9ID0gZ2V0WWVhcmx5Tm90ZVNldHRpbmdzKCk7XG4gICAgY29uc3QgeWVhcmx5Tm90ZXNGb2xkZXIgPSB2YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob2JzaWRpYW4ubm9ybWFsaXplUGF0aChmb2xkZXIpKTtcbiAgICBpZiAoIXllYXJseU5vdGVzRm9sZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBZZWFybHlOb3Rlc0ZvbGRlck1pc3NpbmdFcnJvcihcIkZhaWxlZCB0byBmaW5kIHllYXJseSBub3RlcyBmb2xkZXJcIik7XG4gICAgfVxuICAgIG9ic2lkaWFuLlZhdWx0LnJlY3Vyc2VDaGlsZHJlbih5ZWFybHlOb3Rlc0ZvbGRlciwgKG5vdGUpID0+IHtcbiAgICAgICAgaWYgKG5vdGUgaW5zdGFuY2VvZiBvYnNpZGlhbi5URmlsZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGdldERhdGVGcm9tRmlsZShub3RlLCBcInllYXJcIik7XG4gICAgICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBnZXREYXRlVUlEKGRhdGUsIFwieWVhclwiKTtcbiAgICAgICAgICAgICAgICB5ZWFybHlOb3Rlc1tkYXRlU3RyaW5nXSA9IG5vdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4geWVhcmx5Tm90ZXM7XG59XG5cbmZ1bmN0aW9uIGFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSB7XG4gICAgY29uc3QgeyBhcHAgfSA9IHdpbmRvdztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGNvbnN0IGRhaWx5Tm90ZXNQbHVnaW4gPSBhcHAuaW50ZXJuYWxQbHVnaW5zLnBsdWdpbnNbXCJkYWlseS1ub3Rlc1wiXTtcbiAgICBpZiAoZGFpbHlOb3Rlc1BsdWdpbiAmJiBkYWlseU5vdGVzUGx1Z2luLmVuYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IGFwcC5wbHVnaW5zLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpO1xuICAgIHJldHVybiBwZXJpb2RpY05vdGVzICYmIHBlcmlvZGljTm90ZXMuc2V0dGluZ3M/LmRhaWx5Py5lbmFibGVkO1xufVxuLyoqXG4gKiBYWFg6IFwiV2Vla2x5IE5vdGVzXCIgbGl2ZSBpbiBlaXRoZXIgdGhlIENhbGVuZGFyIHBsdWdpbiBvciB0aGUgcGVyaW9kaWMtbm90ZXMgcGx1Z2luLlxuICogQ2hlY2sgYm90aCB1bnRpbCB0aGUgd2Vla2x5IG5vdGVzIGZlYXR1cmUgaXMgcmVtb3ZlZCBmcm9tIHRoZSBDYWxlbmRhciBwbHVnaW4uXG4gKi9cbmZ1bmN0aW9uIGFwcEhhc1dlZWtseU5vdGVzUGx1Z2luTG9hZGVkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB3aW5kb3c7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBpZiAoYXBwLnBsdWdpbnMuZ2V0UGx1Z2luKFwiY2FsZW5kYXJcIikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IGFwcC5wbHVnaW5zLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpO1xuICAgIHJldHVybiBwZXJpb2RpY05vdGVzICYmIHBlcmlvZGljTm90ZXMuc2V0dGluZ3M/LndlZWtseT8uZW5hYmxlZDtcbn1cbmZ1bmN0aW9uIGFwcEhhc01vbnRobHlOb3Rlc1BsdWdpbkxvYWRlZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gd2luZG93O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IGFwcC5wbHVnaW5zLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpO1xuICAgIHJldHVybiBwZXJpb2RpY05vdGVzICYmIHBlcmlvZGljTm90ZXMuc2V0dGluZ3M/Lm1vbnRobHk/LmVuYWJsZWQ7XG59XG5mdW5jdGlvbiBhcHBIYXNRdWFydGVybHlOb3Rlc1BsdWdpbkxvYWRlZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gd2luZG93O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgY29uc3QgcGVyaW9kaWNOb3RlcyA9IGFwcC5wbHVnaW5zLmdldFBsdWdpbihcInBlcmlvZGljLW5vdGVzXCIpO1xuICAgIHJldHVybiBwZXJpb2RpY05vdGVzICYmIHBlcmlvZGljTm90ZXMuc2V0dGluZ3M/LnF1YXJ0ZXJseT8uZW5hYmxlZDtcbn1cbmZ1bmN0aW9uIGFwcEhhc1llYXJseU5vdGVzUGx1Z2luTG9hZGVkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB3aW5kb3c7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBjb25zdCBwZXJpb2RpY05vdGVzID0gYXBwLnBsdWdpbnMuZ2V0UGx1Z2luKFwicGVyaW9kaWMtbm90ZXNcIik7XG4gICAgcmV0dXJuIHBlcmlvZGljTm90ZXMgJiYgcGVyaW9kaWNOb3Rlcy5zZXR0aW5ncz8ueWVhcmx5Py5lbmFibGVkO1xufVxuZnVuY3Rpb24gZ2V0UGVyaW9kaWNOb3RlU2V0dGluZ3MoZ3JhbnVsYXJpdHkpIHtcbiAgICBjb25zdCBnZXRTZXR0aW5ncyA9IHtcbiAgICAgICAgZGF5OiBnZXREYWlseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgd2VlazogZ2V0V2Vla2x5Tm90ZVNldHRpbmdzLFxuICAgICAgICBtb250aDogZ2V0TW9udGhseU5vdGVTZXR0aW5ncyxcbiAgICAgICAgcXVhcnRlcjogZ2V0UXVhcnRlcmx5Tm90ZVNldHRpbmdzLFxuICAgICAgICB5ZWFyOiBnZXRZZWFybHlOb3RlU2V0dGluZ3MsXG4gICAgfVtncmFudWxhcml0eV07XG4gICAgcmV0dXJuIGdldFNldHRpbmdzKCk7XG59XG5mdW5jdGlvbiBjcmVhdGVQZXJpb2RpY05vdGUoZ3JhbnVsYXJpdHksIGRhdGUpIHtcbiAgICBjb25zdCBjcmVhdGVGbiA9IHtcbiAgICAgICAgZGF5OiBjcmVhdGVEYWlseU5vdGUsXG4gICAgICAgIG1vbnRoOiBjcmVhdGVNb250aGx5Tm90ZSxcbiAgICAgICAgd2VlazogY3JlYXRlV2Vla2x5Tm90ZSxcbiAgICB9O1xuICAgIHJldHVybiBjcmVhdGVGbltncmFudWxhcml0eV0oZGF0ZSk7XG59XG5cbmV4cG9ydHMuREVGQVVMVF9EQUlMWV9OT1RFX0ZPUk1BVCA9IERFRkFVTFRfREFJTFlfTk9URV9GT1JNQVQ7XG5leHBvcnRzLkRFRkFVTFRfTU9OVEhMWV9OT1RFX0ZPUk1BVCA9IERFRkFVTFRfTU9OVEhMWV9OT1RFX0ZPUk1BVDtcbmV4cG9ydHMuREVGQVVMVF9RVUFSVEVSTFlfTk9URV9GT1JNQVQgPSBERUZBVUxUX1FVQVJURVJMWV9OT1RFX0ZPUk1BVDtcbmV4cG9ydHMuREVGQVVMVF9XRUVLTFlfTk9URV9GT1JNQVQgPSBERUZBVUxUX1dFRUtMWV9OT1RFX0ZPUk1BVDtcbmV4cG9ydHMuREVGQVVMVF9ZRUFSTFlfTk9URV9GT1JNQVQgPSBERUZBVUxUX1lFQVJMWV9OT1RFX0ZPUk1BVDtcbmV4cG9ydHMuYXBwSGFzRGFpbHlOb3Rlc1BsdWdpbkxvYWRlZCA9IGFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQ7XG5leHBvcnRzLmFwcEhhc01vbnRobHlOb3Rlc1BsdWdpbkxvYWRlZCA9IGFwcEhhc01vbnRobHlOb3Rlc1BsdWdpbkxvYWRlZDtcbmV4cG9ydHMuYXBwSGFzUXVhcnRlcmx5Tm90ZXNQbHVnaW5Mb2FkZWQgPSBhcHBIYXNRdWFydGVybHlOb3Rlc1BsdWdpbkxvYWRlZDtcbmV4cG9ydHMuYXBwSGFzV2Vla2x5Tm90ZXNQbHVnaW5Mb2FkZWQgPSBhcHBIYXNXZWVrbHlOb3Rlc1BsdWdpbkxvYWRlZDtcbmV4cG9ydHMuYXBwSGFzWWVhcmx5Tm90ZXNQbHVnaW5Mb2FkZWQgPSBhcHBIYXNZZWFybHlOb3Rlc1BsdWdpbkxvYWRlZDtcbmV4cG9ydHMuY3JlYXRlRGFpbHlOb3RlID0gY3JlYXRlRGFpbHlOb3RlO1xuZXhwb3J0cy5jcmVhdGVNb250aGx5Tm90ZSA9IGNyZWF0ZU1vbnRobHlOb3RlO1xuZXhwb3J0cy5jcmVhdGVQZXJpb2RpY05vdGUgPSBjcmVhdGVQZXJpb2RpY05vdGU7XG5leHBvcnRzLmNyZWF0ZVF1YXJ0ZXJseU5vdGUgPSBjcmVhdGVRdWFydGVybHlOb3RlO1xuZXhwb3J0cy5jcmVhdGVXZWVrbHlOb3RlID0gY3JlYXRlV2Vla2x5Tm90ZTtcbmV4cG9ydHMuY3JlYXRlWWVhcmx5Tm90ZSA9IGNyZWF0ZVllYXJseU5vdGU7XG5leHBvcnRzLmdldEFsbERhaWx5Tm90ZXMgPSBnZXRBbGxEYWlseU5vdGVzO1xuZXhwb3J0cy5nZXRBbGxNb250aGx5Tm90ZXMgPSBnZXRBbGxNb250aGx5Tm90ZXM7XG5leHBvcnRzLmdldEFsbFF1YXJ0ZXJseU5vdGVzID0gZ2V0QWxsUXVhcnRlcmx5Tm90ZXM7XG5leHBvcnRzLmdldEFsbFdlZWtseU5vdGVzID0gZ2V0QWxsV2Vla2x5Tm90ZXM7XG5leHBvcnRzLmdldEFsbFllYXJseU5vdGVzID0gZ2V0QWxsWWVhcmx5Tm90ZXM7XG5leHBvcnRzLmdldERhaWx5Tm90ZSA9IGdldERhaWx5Tm90ZTtcbmV4cG9ydHMuZ2V0RGFpbHlOb3RlU2V0dGluZ3MgPSBnZXREYWlseU5vdGVTZXR0aW5ncztcbmV4cG9ydHMuZ2V0RGF0ZUZyb21GaWxlID0gZ2V0RGF0ZUZyb21GaWxlO1xuZXhwb3J0cy5nZXREYXRlRnJvbVBhdGggPSBnZXREYXRlRnJvbVBhdGg7XG5leHBvcnRzLmdldERhdGVVSUQgPSBnZXREYXRlVUlEO1xuZXhwb3J0cy5nZXRNb250aGx5Tm90ZSA9IGdldE1vbnRobHlOb3RlO1xuZXhwb3J0cy5nZXRNb250aGx5Tm90ZVNldHRpbmdzID0gZ2V0TW9udGhseU5vdGVTZXR0aW5ncztcbmV4cG9ydHMuZ2V0UGVyaW9kaWNOb3RlU2V0dGluZ3MgPSBnZXRQZXJpb2RpY05vdGVTZXR0aW5ncztcbmV4cG9ydHMuZ2V0UXVhcnRlcmx5Tm90ZSA9IGdldFF1YXJ0ZXJseU5vdGU7XG5leHBvcnRzLmdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncyA9IGdldFF1YXJ0ZXJseU5vdGVTZXR0aW5ncztcbmV4cG9ydHMuZ2V0VGVtcGxhdGVJbmZvID0gZ2V0VGVtcGxhdGVJbmZvO1xuZXhwb3J0cy5nZXRXZWVrbHlOb3RlID0gZ2V0V2Vla2x5Tm90ZTtcbmV4cG9ydHMuZ2V0V2Vla2x5Tm90ZVNldHRpbmdzID0gZ2V0V2Vla2x5Tm90ZVNldHRpbmdzO1xuZXhwb3J0cy5nZXRZZWFybHlOb3RlID0gZ2V0WWVhcmx5Tm90ZTtcbmV4cG9ydHMuZ2V0WWVhcmx5Tm90ZVNldHRpbmdzID0gZ2V0WWVhcmx5Tm90ZVNldHRpbmdzO1xuIiwiaW1wb3J0IHsgRWRpdG9yLCBMaXN0SXRlbUNhY2hlLCBNYXJrZG93blZpZXcsIFNlY3Rpb25DYWNoZSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJsb2NrVXRpbHMge1xuICAgIHByaXZhdGUgc3RhdGljIGdldEJsb2NrKGVkaXRvcjogRWRpdG9yLCBmaWxlOiBURmlsZSk6IChTZWN0aW9uQ2FjaGUgfCBMaXN0SXRlbUNhY2hlKSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoXCJ0b1wiKTtcbiAgICAgICAgY29uc3QgZmlsZUNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXG4gICAgICAgIGxldCBjdXJyZW50QmxvY2s6IFNlY3Rpb25DYWNoZSB8IExpc3RJdGVtQ2FjaGUgPVxuICAgICAgICAgICAgZmlsZUNhY2hlPy5zZWN0aW9ucz8uZmluZCgoc2VjdGlvbikgPT5cbiAgICAgICAgICAgICAgICBzZWN0aW9uLnBvc2l0aW9uLnN0YXJ0LmxpbmUgPD0gY3Vyc29yLmxpbmUgJiZcbiAgICAgICAgICAgICAgICBzZWN0aW9uLnBvc2l0aW9uLmVuZC5saW5lID49IGN1cnNvci5saW5lXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIGlmIChjdXJyZW50QmxvY2sudHlwZSA9PSBcImxpc3RcIikge1xuICAgICAgICAgICAgY3VycmVudEJsb2NrID0gZmlsZUNhY2hlLmxpc3RJdGVtcz8uZmluZCgobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0LnBvc2l0aW9uLnN0YXJ0LmxpbmUgPD0gY3Vyc29yLmxpbmUgJiZcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wb3NpdGlvbi5lbmQubGluZSA+PSBjdXJzb3IubGluZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudEJsb2NrO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGdldElkT2ZCbG9jayhcbiAgICAgICAgZWRpdG9yOiBFZGl0b3IsXG4gICAgICAgIGJsb2NrOiBTZWN0aW9uQ2FjaGUgfCBMaXN0SXRlbUNhY2hlLFxuICAgICk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGJsb2NrSWQgPSBibG9jay5pZDtcblxuICAgICAgICBpZiAoYmxvY2tJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJsb2NrSWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgYSBibG9jayBpZFxuICAgICAgICBjb25zdCBzZWN0aW9uRW5kID0gYmxvY2sucG9zaXRpb24uZW5kO1xuICAgICAgICBjb25zdCBwb3MgPSB7XG4gICAgICAgICAgICBjaDogc2VjdGlvbkVuZC5jb2wsXG4gICAgICAgICAgICBsaW5lOiBzZWN0aW9uRW5kLmxpbmUsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgbmV3SWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOCk7XG4gICAgICAgIGNvbnN0IHNwYWNlciA9IEJsb2NrVXRpbHMuc2hvdWxkSW5zZXJ0QWZ0ZXIoYmxvY2spID8gXCJcXG5cXG5cIiA6IFwiIFwiO1xuXG4gICAgICAgIGVkaXRvci5yZXBsYWNlUmFuZ2UoYCR7c3BhY2VyfV4ke25ld0lkfWAsIHBvcyk7XG4gICAgICAgIHJldHVybiBuZXdJZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBzaG91bGRJbnNlcnRBZnRlcihibG9jazogU2VjdGlvbkNhY2hlIHwgTGlzdEl0ZW1DYWNoZSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoKGJsb2NrIGFzIGFueSkudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBcImJsb2NrcXVvdGVcIixcbiAgICAgICAgICAgICAgICBcImNvZGVcIixcbiAgICAgICAgICAgICAgICBcInRhYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJoZWFkaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgXCJmb290bm90ZURlZmluaXRpb25cIixcbiAgICAgICAgICAgIF0uaW5jbHVkZXMoKGJsb2NrIGFzIGFueSkudHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEJsb2NrSWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgdmlldyA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gdmlldy5maWxlO1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSB0aGlzLmdldEJsb2NrKGVkaXRvciwgZmlsZSk7XG4gICAgICAgICAgICBpZiAoYmxvY2spXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SWRPZkJsb2NrKGVkaXRvciwgYmxvY2spO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQWR2YW5jZWRVUklTZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1NFVFRJTkdTOiBBZHZhbmNlZFVSSVNldHRpbmdzID0ge1xuICAgIG9wZW5GaWxlT25Xcml0ZTogdHJ1ZSxcbiAgICBvcGVuRGFpbHlJbk5ld1BhbmU6IGZhbHNlLFxuICAgIG9wZW5GaWxlT25Xcml0ZUluTmV3UGFuZTogZmFsc2UsXG4gICAgb3BlbkZpbGVXaXRob3V0V3JpdGVJbk5ld1BhbmU6IGZhbHNlLFxuICAgIGlkRmllbGQ6IFwiaWRcIixcbiAgICB1c2VVSUQ6IGZhbHNlLFxuICAgIGFkZEZpbGVwYXRoV2hlblVzaW5nVUlEOiBmYWxzZSxcbn07XG4iLCJpbXBvcnQgeyBub3JtYWxpemVQYXRoIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBnZXREYWlseU5vdGVTZXR0aW5ncyB9IGZyb20gXCJvYnNpZGlhbi1kYWlseS1ub3Rlcy1pbnRlcmZhY2VcIjtcblxuXG4vLyEgQWxsIG9mIHRoZXNlIG1ldGhvZHMgYXJlIHRha2VuIGZyb20gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvb2JzaWRpYW4tZGFpbHktbm90ZXMtaW50ZXJmYWNlLlxuZnVuY3Rpb24gam9pbiguLi5wYXJ0U2VnbWVudHM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgICAvLyBTcGxpdCB0aGUgaW5wdXRzIGludG8gYSBsaXN0IG9mIHBhdGggY29tbWFuZHMuXG4gICAgbGV0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcGFydFNlZ21lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBwYXJ0cyA9IHBhcnRzLmNvbmNhdChwYXJ0U2VnbWVudHNbaV0uc3BsaXQoXCIvXCIpKTtcbiAgICB9XG4gICAgLy8gSW50ZXJwcmV0IHRoZSBwYXRoIGNvbW1hbmRzIHRvIGdldCB0aGUgbmV3IHJlc29sdmVkIHBhdGguXG4gICAgY29uc3QgbmV3UGFydHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJ0ID0gcGFydHNbaV07XG4gICAgICAgIC8vIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzXG4gICAgICAgIC8vIEFsc28gcmVtb3ZlIFwiLlwiIHNlZ21lbnRzXG4gICAgICAgIGlmICghcGFydCB8fCBwYXJ0ID09PSBcIi5cIikgY29udGludWU7XG4gICAgICAgIC8vIFB1c2ggbmV3IHBhdGggc2VnbWVudHMuXG4gICAgICAgIGVsc2UgbmV3UGFydHMucHVzaChwYXJ0KTtcbiAgICB9XG4gICAgLy8gUHJlc2VydmUgdGhlIGluaXRpYWwgc2xhc2ggaWYgdGhlcmUgd2FzIG9uZS5cbiAgICBpZiAocGFydHNbMF0gPT09IFwiXCIpIG5ld1BhcnRzLnVuc2hpZnQoXCJcIik7XG4gICAgLy8gVHVybiBiYWNrIGludG8gYSBzaW5nbGUgc3RyaW5nIHBhdGguXG4gICAgcmV0dXJuIG5ld1BhcnRzLmpvaW4oXCIvXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXROb3RlUGF0aChcbiAgICBkaXJlY3Rvcnk6IHN0cmluZyxcbiAgICBmaWxlbmFtZTogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICghZmlsZW5hbWUuZW5kc1dpdGgoXCIubWRcIikpIHtcbiAgICAgICAgZmlsZW5hbWUgKz0gXCIubWRcIjtcbiAgICB9XG4gICAgY29uc3QgcGF0aCA9IG5vcm1hbGl6ZVBhdGgoam9pbihkaXJlY3RvcnksIGZpbGVuYW1lKSk7XG5cbiAgICBhd2FpdCBlbnN1cmVGb2xkZXJFeGlzdHMocGF0aCk7XG5cbiAgICByZXR1cm4gcGF0aDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZW5zdXJlRm9sZGVyRXhpc3RzKHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRpcnMgPSBwYXRoLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpLnNwbGl0KFwiL1wiKTtcbiAgICBkaXJzLnBvcCgpOyAvLyByZW1vdmUgYmFzZW5hbWVcblxuICAgIGlmIChkaXJzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBkaXIgPSBqb2luKC4uLmRpcnMpO1xuICAgICAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGRpcikpIHtcbiAgICAgICAgICAgIGF3YWl0ICh3aW5kb3cgYXMgYW55KS5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGRpcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYWlseU5vdGVQYXRoKGRhdGU6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG5cbiAgICBjb25zdCB7IGZvcm1hdCwgZm9sZGVyIH0gPSBnZXREYWlseU5vdGVTZXR0aW5ncygpO1xuXG4gICAgY29uc3QgZmlsZW5hbWUgPSBkYXRlLmZvcm1hdChmb3JtYXQpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQYXRoID0gYXdhaXQgZ2V0Tm90ZVBhdGgoZm9sZGVyLCBmaWxlbmFtZSk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRQYXRoO1xufSIsImltcG9ydCB7IFN1Z2dlc3RNb2RhbCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IEFkdmFuY2VkVVJJIGZyb20gXCIuLi9tYWluXCI7XG5pbXBvcnQgeyBFbnRlckRhdGEsIFBhcmFtZXRlcnMgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEVudGVyRGF0YU1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPEVudGVyRGF0YT4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG4gICAgLy9udWxsIGlmIGZvciBub3JtYWwgd3JpdGUgbW9kZSwgaXRzIG5vdCBhc3NvY2lhdGVkIHdpdGggYSBzcGVjaWFsIG1vZGUgbGlrZSBcImFwcGVuZFwiIG9yIFwicHJlcGVuZFwiXG4gICAgbW9kZXMgPSBbbnVsbCwgXCJvdmVyd3JpdGVcIiwgXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdO1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBBZHZhbmNlZFVSSSwgcHJpdmF0ZSBmaWxlPzogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKHBsdWdpbi5hcHApO1xuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICAgICAgdGhpcy5zZXRQbGFjZWhvbGRlcihcIlR5cGUgeW91ciBkYXRhIHRvIGJlIHdyaXR0ZW4gdG8gdGhlIGZpbGUgb3IgbGVhdmUgaXQgZW1wdHkgdG8ganVzdCBvcGVuIGl0XCIpO1xuICAgIH1cblxuXG4gICAgZ2V0U3VnZ2VzdGlvbnMocXVlcnk6IHN0cmluZyk6IEVudGVyRGF0YVtdIHtcbiAgICAgICAgaWYgKHF1ZXJ5ID09IFwiXCIpIHF1ZXJ5ID0gbnVsbDtcblxuICAgICAgICBsZXQgc3VnZ2VzdGlvbnM6IEVudGVyRGF0YVtdID0gW107XG4gICAgICAgIGZvciAoY29uc3QgbW9kZSBvZiB0aGlzLm1vZGVzKSB7XG4gICAgICAgICAgICBpZiAoIShtb2RlID09PSBcIm92ZXJ3cml0ZVwiICYmICFxdWVyeSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGlzcGxheTogc3RyaW5nO1xuICAgICAgICAgICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA9IGBXcml0ZSBcIiR7cXVlcnl9XCIgaW4gJHttb2RlfSBtb2RlYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBgV3JpdGUgXCIke3F1ZXJ5fVwiYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID0gYE9wZW4gaW4gJHttb2RlfSBtb2RlYDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBgT3BlbmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3VnZ2VzdGlvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBkaXNwbGF5LFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBtb2RlLFxuICAgICAgICAgICAgICAgICAgICBmdW5jOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4udG9vbHMuY29weVVSSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVwYXRoOiB0aGlzLmZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBtb2RlIGFzIFBhcmFtZXRlcnNbXCJtb2RlXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnRvb2xzLmNvcHlVUkkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYWlseTogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiBtb2RlIGFzIFBhcmFtZXRlcnNbXCJtb2RlXCJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdWdnZXN0aW9ucztcbiAgICB9XG5cbiAgICByZW5kZXJTdWdnZXN0aW9uKHZhbHVlOiBFbnRlckRhdGEsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBlbC5pbm5lclRleHQgPSB2YWx1ZS5kaXNwbGF5O1xuICAgIH07XG5cbiAgICBvbkNob29zZVN1Z2dlc3Rpb24oaXRlbTogRW50ZXJEYXRhLCBfOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpdGVtLmZ1bmMoKTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgRnV6enlTdWdnZXN0TW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBBZHZhbmNlZFVSSSBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHsgRmlsZU1vZGFsRGF0YSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRmlsZU1vZGFsIGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8RmlsZU1vZGFsRGF0YT4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBBZHZhbmNlZFVSSSwgcHJpdmF0ZSBwbGFjZUhvbGRlcjogc3RyaW5nLCBwcml2YXRlIGFsbG93Tm9GaWxlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgICAgICBzdXBlcihwbHVnaW4uYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIodGhpcy5wbGFjZUhvbGRlcik7XG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKTogRmlsZU1vZGFsRGF0YVtdIHtcbiAgICAgICAgbGV0IHNwZWNpYWxJdGVtczogRmlsZU1vZGFsRGF0YVtdID0gW107XG4gICAgICAgIGlmICh0aGlzLmFsbG93Tm9GaWxlKSB7XG4gICAgICAgICAgICBzcGVjaWFsSXRlbXMucHVzaCh7IGRpc3BsYXk6IFwiPERvbid0IHNwZWNpZnkgYSBmaWxlPlwiLCBzb3VyY2U6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWxlID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZUZpbGUoKTtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHNwZWNpYWxJdGVtcy5wdXNoKHsgZGlzcGxheTogXCI8Q3VycmVudCBmaWxlPlwiLCBzb3VyY2U6IGZpbGUucGF0aCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gWy4uLnNwZWNpYWxJdGVtcywgLi4udGhpcy5hcHAudmF1bHQuZ2V0RmlsZXMoKS5tYXAoZSA9PiB7IHJldHVybiB7IGRpc3BsYXk6IGUucGF0aCwgc291cmNlOiBlLnBhdGggfTsgfSldO1xuICAgIH1cblxuICAgIGdldEl0ZW1UZXh0KGl0ZW06IEZpbGVNb2RhbERhdGEpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gaXRlbS5kaXNwbGF5O1xuICAgIH1cblxuICAgIG9uQ2hvb3NlSXRlbShpdGVtOiBGaWxlTW9kYWxEYXRhLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOb3RpY2UsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBzdHJpcE1EIH0gZnJvbSBcIm9ic2lkaWFuLWNvbW11bml0eS1saWJcIjtcbmltcG9ydCB7IFBhcmFtZXRlcnMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld1N0YXRlRnJvbU1vZGUocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgIHJldHVybiBwYXJhbWV0ZXJzLnZpZXdtb2RlID8geyBzdGF0ZTogeyBtb2RlOiBwYXJhbWV0ZXJzLnZpZXdtb2RlIH0gfSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUZXh0KHRleHQ6IHN0cmluZykge1xuICAgIHJldHVybiBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWx0ZXJuYXRpdmVGaWxlUGF0aChmaWxlOiBURmlsZSk6IHN0cmluZyB7XG4gICAgY29uc3QgZGlyID0gZmlsZS5wYXJlbnQ/LnBhdGg7XG4gICAgY29uc3QgZm9ybWF0dGVkRGlyID0gZGlyID09PSBcIi9cIiA/IFwiXCIgOiBkaXI7XG4gICAgY29uc3QgbmFtZSA9IGZpbGUubmFtZTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgMTAwOyBpbmRleCsrKSB7XG5cbiAgICAgICAgY29uc3QgYmFzZSA9IHN0cmlwTUQobmFtZSk7XG4gICAgICAgIGNvbnN0IGFsdGVybmF0aXZlID0gZm9ybWF0dGVkRGlyICsgKGZvcm1hdHRlZERpciA9PSBcIlwiID8gXCJcIiA6IFwiL1wiKSArIGJhc2UgKyBgICR7aW5kZXh9Lm1kYDtcblxuICAgICAgICBjb25zdCBleGlzdHMgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGFsdGVybmF0aXZlKSAhPT0gbnVsbDtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBhbHRlcm5hdGl2ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsZVVyaShmaWxlOiBURmlsZSk6IHN0cmluZyB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChhcHAudmF1bHQuZ2V0UmVzb3VyY2VQYXRoKGZpbGUpKTtcbiAgICB1cmwuaG9zdCA9IFwibG9jYWxob3N0aG9zdGxvY2FsXCI7XG4gICAgdXJsLnByb3RvY29sID0gXCJmaWxlXCI7XG4gICAgdXJsLnNlYXJjaCA9IFwiXCI7XG5cbiAgICB1cmwucGF0aG5hbWUgPSBkZWNvZGVVUklDb21wb25lbnQodXJsLnBhdGhuYW1lKTtcbiAgICBjb25zdCByZXMgPSB1cmwudG9TdHJpbmcoKS5yZXBsYWNlKFwiL2xvY2FsaG9zdGhvc3Rsb2NhbC9cIiwgXCIvXCIpO1xuICAgIHJldHVybiByZXM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVuZEFuZEJlZ2lubmluZ09mSGVhZGluZyhmaWxlOiBURmlsZSwgaGVhZGluZzogc3RyaW5nKTogeyBcImxhc3RMaW5lXCI6IG51bWJlciwgXCJmaXJzdExpbmVcIjogbnVtYmVyOyB9IHtcbiAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcbiAgICBjb25zdCBzZWN0aW9ucyA9IGNhY2hlLnNlY3Rpb25zO1xuICAgIGNvbnN0IGZvdW5kSGVhZGluZyA9IGNhY2hlLmhlYWRpbmdzPy5maW5kKGUgPT4gZS5oZWFkaW5nID09PSBoZWFkaW5nKTtcblxuXG4gICAgaWYgKGZvdW5kSGVhZGluZykge1xuICAgICAgICBjb25zdCBmb3VuZFNlY3Rpb25JbmRleCA9IHNlY3Rpb25zLmZpbmRJbmRleChzZWN0aW9uID0+IHNlY3Rpb24udHlwZSA9PT0gXCJoZWFkaW5nXCIgJiYgc2VjdGlvbi5wb3NpdGlvbi5zdGFydC5saW5lID09PSBmb3VuZEhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSk7XG4gICAgICAgIGNvbnN0IHJlc3RTZWN0aW9ucyA9IHNlY3Rpb25zLnNsaWNlKGZvdW5kU2VjdGlvbkluZGV4ICsgMSk7XG5cbiAgICAgICAgY29uc3QgbmV4dEhlYWRpbmdJbmRleCA9IHJlc3RTZWN0aW9ucz8uZmluZEluZGV4KGUgPT4gZS50eXBlID09PSBcImhlYWRpbmdcIik7XG5cbiAgICAgICAgY29uc3QgbGFzdFNlY3Rpb24gPSByZXN0U2VjdGlvbnNbKG5leHRIZWFkaW5nSW5kZXggIT09IC0xID8gbmV4dEhlYWRpbmdJbmRleCA6IHJlc3RTZWN0aW9ucy5sZW5ndGgpIC0gMV0gPz8gc2VjdGlvbnNbZm91bmRTZWN0aW9uSW5kZXhdO1xuICAgICAgICBjb25zdCBsYXN0TGluZSA9IGxhc3RTZWN0aW9uLnBvc2l0aW9uLmVuZC5saW5lICsgMTtcblxuICAgICAgICByZXR1cm4geyBcImxhc3RMaW5lXCI6IGxhc3RMaW5lLCBcImZpcnN0TGluZVwiOiBzZWN0aW9uc1tmb3VuZFNlY3Rpb25JbmRleF0ucG9zaXRpb24uZW5kLmxpbmUgKyAxIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IE5vdGljZShcIkNhbid0IGZpbmQgaGVhZGluZ1wiKTtcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IEZpbGVWaWV3LCBNYXJrZG93blZpZXcsIE5vdGljZSwgVEFic3RyYWN0RmlsZSwgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBBZHZhbmNlZFVSSSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBFbnRlckRhdGFNb2RhbCB9IGZyb20gXCIuL21vZGFscy9lbnRlcl9kYXRhX21vZGFsXCI7XG5pbXBvcnQgeyBGaWxlTW9kYWwgfSBmcm9tIFwiLi9tb2RhbHMvZmlsZV9tb2RhbFwiO1xuaW1wb3J0IFRvb2xzIGZyb20gXCIuL3Rvb2xzXCI7XG5pbXBvcnQgeyBQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNvcHlUZXh0LCBnZXRBbHRlcm5hdGl2ZUZpbGVQYXRoIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmRsZXJzIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogQWR2YW5jZWRVUkkpIHtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBnZXQgdG9vbHMoKTogVG9vbHMge1xuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4udG9vbHM7XG4gICAgfVxuXG4gICAgaGFuZGxlUGx1Z2luTWFuYWdlbWVudChwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzW1wiZW5hYmxlLXBsdWdpblwiXSkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luSWQgPSBwYXJhbWV0ZXJzW1wiZW5hYmxlLXBsdWdpblwiXTtcbiAgICAgICAgICAgIGFwcC5wbHVnaW5zLmVuYWJsZVBsdWdpbkFuZFNhdmUocGx1Z2luSWQpO1xuICAgICAgICAgICAgbmV3IE5vdGljZShgRW5hYmxlZCAke3BsdWdpbklkfWApO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnNbXCJkaXNhYmxlLXBsdWdpblwiXSkge1xuICAgICAgICAgICAgY29uc3QgcGx1Z2luSWQgPSBwYXJhbWV0ZXJzW1wiZGlzYWJsZS1wbHVnaW5cIl07XG4gICAgICAgICAgICBhcHAucGx1Z2lucy5kaXNhYmxlUGx1Z2luQW5kU2F2ZShwbHVnaW5JZCk7XG4gICAgICAgICAgICBuZXcgTm90aWNlKGBEaXNhYmxlZCAke3BsdWdpbklkfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUZyb250bWF0dGVyS2V5KHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gcGFyYW1ldGVycy5mcm9udG1hdHRlcmtleTtcbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRDYWNoZShwYXJhbWV0ZXJzLmZpbGVwYXRoID8/IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpLnBhdGgpLmZyb250bWF0dGVyO1xuXG4gICAgICAgIGxldCByZXM6IHN0cmluZztcbiAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwiW1wiKSAmJiBrZXkuZW5kc1dpdGgoXCJdXCIpKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0ga2V5LnN1YnN0cmluZygxLCBrZXkubGVuZ3RoIC0gMSkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgbGV0IGNhY2hlOiBhbnkgPSBmcm9udG1hdHRlcjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhY2hlID0gY2FjaGUuZmluZCgoZSkgPT4gZSA9PSBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IGNhY2hlW3BhcnNlSW50KGl0ZW0pXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWNoZSA9IGNhY2hlW2l0ZW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcyA9IGNhY2hlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gZnJvbnRtYXR0ZXJba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvcHlUZXh0KHJlcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlV29ya3NwYWNlKHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgY29uc3Qgd29ya3NwYWNlcyA9IGFwcC5pbnRlcm5hbFBsdWdpbnM/LnBsdWdpbnM/LndvcmtzcGFjZXM7XG4gICAgICAgIGlmICghd29ya3NwYWNlcykge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIkNhbm5vdCBmaW5kIFdvcmtzcGFjZXMgcGx1Z2luLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIik7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHdvcmtzcGFjZXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMuc2F2ZXdvcmtzcGFjZSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZSA9IHdvcmtzcGFjZXMuaW5zdGFuY2UuYWN0aXZlV29ya3NwYWNlO1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZXMuaW5zdGFuY2Uuc2F2ZVdvcmtzcGFjZShhY3RpdmUpO1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoYFNhdmVkIGN1cnJlbnQgd29ya3NwYWNlIHRvICR7YWN0aXZlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMud29ya3NwYWNlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHdvcmtzcGFjZXMuaW5zdGFuY2UubG9hZFdvcmtzcGFjZShwYXJhbWV0ZXJzLndvcmtzcGFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3IE5vdGljZShcIldvcmtzcGFjZXMgcGx1Z2luIGlzIG5vdCBlbmFibGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZmFpbHVyZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZUNvbW1hbmQocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVycy5maWxlcGF0aCkge1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubW9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLm1vZGUgPT0gXCJuZXdcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QocGFyYW1ldGVycy5maWxlcGF0aCwgXCIvXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmZpbGVwYXRoID0gZ2V0QWx0ZXJuYXRpdmVGaWxlUGF0aChmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5vcGVuKHsgZmlsZTogcGFyYW1ldGVycy5maWxlcGF0aCwgbW9kZTogXCJzb3VyY2VcIiwgcGFyYW1ldGVyczogcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJhcHBlbmRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldFZhbHVlKGRhdGEgKyBcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZWRpdG9yLmxpbmVDb3VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvcih7IGNoOiAwLCBsaW5lOiBsaW5lcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLm1vZGUgPT09IFwicHJlcGVuZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0VmFsdWUoXCJcXG5cIiArIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvcih7IGNoOiAwLCBsaW5lOiAwIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJvdmVyd3JpdGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldFZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmxpbmUpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5vcGVuKHsgZmlsZTogcGFyYW1ldGVycy5maWxlcGF0aCwgbW9kZTogXCJzb3VyY2VcIiwgcGFyYW1ldGVyczogcGFyYW1ldGVycyB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldEN1cnNvckluTGluZShwYXJhbWV0ZXJzLmxpbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5vcGVuKHsgZmlsZTogcGFyYW1ldGVycy5maWxlcGF0aCwgc2V0dGluZzogdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVXaXRob3V0V3JpdGVJbk5ld1BhbmUsIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuY29tbWFuZGlkKSB7XG4gICAgICAgICAgICBhcHAuY29tbWFuZHMuZXhlY3V0ZUNvbW1hbmRCeUlkKHBhcmFtZXRlcnMuY29tbWFuZGlkKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmNvbW1hbmRuYW1lKSB7XG4gICAgICAgICAgICBjb25zdCByYXdDb21tYW5kcyA9IGFwcC5jb21tYW5kcy5jb21tYW5kcztcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tbWFuZCBpbiByYXdDb21tYW5kcykge1xuICAgICAgICAgICAgICAgIGlmIChyYXdDb21tYW5kc1tjb21tYW5kXS5uYW1lID09PSBwYXJhbWV0ZXJzLmNvbW1hbmRuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXdDb21tYW5kc1tjb21tYW5kXS5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3Q29tbWFuZHNbY29tbWFuZF0uY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd0NvbW1hbmRzW2NvbW1hbmRdLmNoZWNrQ2FsbGJhY2soZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBsdWdpbi5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgIH1cbiAgICBhc3luYyBoYW5kbGVEb2VzRmlsZUV4aXN0KHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpIHtcbiAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKHBhcmFtZXRlcnMuZmlsZXBhdGgpO1xuXG4gICAgICAgIGNvcHlUZXh0KChleGlzdHMgPyAxIDogMCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMucGx1Z2luLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG5cbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlU2VhcmNoQW5kUmVwbGFjZShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGxldCBmaWxlOiBURmlsZTtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGgpIHtcblxuICAgICAgICAgICAgY29uc3QgYWJzdHJhY3RGaWxlID0gYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChwYXJhbWV0ZXJzLmZpbGVwYXRoKTtcbiAgICAgICAgICAgIGlmIChhYnN0cmFjdEZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIGZpbGUgPSBhYnN0cmFjdEZpbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWxlID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLnNlYXJjaHJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgWywgLCBwYXR0ZXJuLCBmbGFnc10gPSBwYXJhbWV0ZXJzLnNlYXJjaHJlZ2V4Lm1hdGNoKC8oXFwvPykoLispXFwxKFthLXpdKikvaSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBmbGFncyk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UocmVnZXgsIHBhcmFtZXRlcnMucmVwbGFjZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShgQ2FuJ3QgcGFyc2UgJHtwYXJhbWV0ZXJzLnNlYXJjaHJlZ2V4fSBhcyBSZWdFeGApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZUFsbChwYXJhbWV0ZXJzLnNlYXJjaCwgcGFyYW1ldGVycy5yZXBsYWNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi53cml0ZUFuZE9wZW5GaWxlKGZpbGUucGF0aCwgZGF0YSwgcGFyYW1ldGVycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXcgTm90aWNlKFwiQ2Fubm90IGZpbmQgZmlsZVwiKTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLmZhaWx1cmUocGFyYW1ldGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBoYW5kbGVTZWFyY2gocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVycy5maWxlcGF0aCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ub3Blbih7IGZpbGU6IHBhcmFtZXRlcnMuZmlsZXBhdGgsIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmlldyA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShGaWxlVmlldyk7XG4gICAgICAgIHZpZXcuY3VycmVudE1vZGUuc2hvd1NlYXJjaCgpO1xuICAgICAgICBjb25zdCBzZWFyY2ggPSB2aWV3LmN1cnJlbnRNb2RlLnNlYXJjaDtcbiAgICAgICAgc2VhcmNoLnNlYXJjaElucHV0RWwudmFsdWUgPSBwYXJhbWV0ZXJzLnNlYXJjaDtcbiAgICAgICAgc2VhcmNoLnNlYXJjaElucHV0RWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlV3JpdGUocGFyYW1ldGVyczogUGFyYW1ldGVycywgY3JlYXRlZERhaWx5Tm90ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBmaWxlOiBUQWJzdHJhY3RGaWxlIHwgbnVsbDtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGgpIHtcbiAgICAgICAgICAgIGZpbGUgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKHBhcmFtZXRlcnMuZmlsZXBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlsZSA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlRmlsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuZmlsZXBhdGggfHwgZmlsZSkge1xuICAgICAgICAgICAgbGV0IG91dEZpbGU6IFRGaWxlO1xuICAgICAgICAgICAgbGV0IHBhdGggPSBwYXJhbWV0ZXJzLmZpbGVwYXRoID8/IGZpbGUucGF0aDtcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLm1vZGUgPT09IFwib3ZlcndyaXRlXCIpIHtcbiAgICAgICAgICAgICAgICBvdXRGaWxlID0gYXdhaXQgdGhpcy5wbHVnaW4ud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBwYXJhbWV0ZXJzLmRhdGEsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMubW9kZSA9PT0gXCJwcmVwZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dEZpbGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5wcmVwZW5kKGZpbGUsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG91dEZpbGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5wcmVwZW5kKHBhdGgsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zdWNjZXNzKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLm1vZGUgPT09IFwiYXBwZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZSBpbnN0YW5jZW9mIFRGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dEZpbGUgPSBhd2FpdCB0aGlzLnBsdWdpbi5hcHBlbmQoZmlsZSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0RmlsZSA9IGF3YWl0IHRoaXMucGx1Z2luLmFwcGVuZChwYXRoLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5tb2RlID09PSBcIm5ld1wiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRGaWxlID0gYXdhaXQgdGhpcy5wbHVnaW4ud3JpdGVBbmRPcGVuRmlsZShnZXRBbHRlcm5hdGl2ZUZpbGVQYXRoKGZpbGUpLCBwYXJhbWV0ZXJzLmRhdGEsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5ob29rU3VjY2VzcyhwYXJhbWV0ZXJzLCBvdXRGaWxlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXRGaWxlID0gYXdhaXQgdGhpcy5wbHVnaW4ud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBwYXJhbWV0ZXJzLmRhdGEsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5ob29rU3VjY2VzcyhwYXJhbWV0ZXJzLCBvdXRGaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFjcmVhdGVkRGFpbHlOb3RlICYmIGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJGaWxlIGFscmVhZHkgZXhpc3RzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLm9wZW5FeGlzdGluZ0ZpbGVBbmRTZXRDdXJzb3IoZmlsZS5wYXRoLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5mYWlsdXJlKHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvdXRGaWxlID0gYXdhaXQgdGhpcy5wbHVnaW4ud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBwYXJhbWV0ZXJzLmRhdGEsIHBhcmFtZXRlcnMpO1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy51aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xzLndyaXRlVUlEVG9GaWxlKG91dEZpbGUsIHBhcmFtZXRlcnMudWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJDYW5ub3QgZmluZCBmaWxlXCIpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZmFpbHVyZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGhhbmRsZU9wZW4ocGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBsZXQgZmlsZUlzQWxyZWFkeU9wZW5lZCA9IGZhbHNlO1xuICAgICAgICBhcHAud29ya3NwYWNlLml0ZXJhdGVBbGxMZWF2ZXMobGVhZiA9PiB7XG4gICAgICAgICAgICBpZiAobGVhZi52aWV3LmZpbGU/LnBhdGggPT09IHBhcmFtZXRlcnMuZmlsZXBhdGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZUlzQWxyZWFkeU9wZW5lZCAmJiBsZWFmLndpZHRoID09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBmaWxlSXNBbHJlYWR5T3BlbmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihsZWFmLCB7IGZvY3VzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZpbGVJc0FscmVhZHlPcGVuZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlYWYgPSBhcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy52aWV3bW9kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmlld1N0YXRlID0gbGVhZi5nZXRWaWV3U3RhdGUoKTtcbiAgICAgICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUubW9kZSA9IHBhcmFtZXRlcnMudmlld21vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdTdGF0ZS5zdGF0ZS5zb3VyY2UgIT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUuc291cmNlID0gcGFyYW1ldGVycy52aWV3bW9kZSA9PSBcInNvdXJjZVwiO1xuICAgICAgICAgICAgICAgIGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHZpZXdTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1ldGVycy5oZWFkaW5nICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ub3Blbih7XG4gICAgICAgICAgICAgICAgZmlsZTogcGFyYW1ldGVycy5maWxlcGF0aCArIFwiI1wiICsgcGFyYW1ldGVycy5oZWFkaW5nLFxuICAgICAgICAgICAgICAgIHNldHRpbmc6IHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgc3VwcG9ydFBvcG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgICAgICBpZiAoIXZpZXcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHZpZXcuZmlsZSk7XG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gY2FjaGUuaGVhZGluZ3MuZmluZCgoZSkgPT4gZS5oZWFkaW5nID09PSBwYXJhbWV0ZXJzLmhlYWRpbmcpO1xuICAgICAgICAgICAgdmlldy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgICAgIHZpZXcuZWRpdG9yLnNldEN1cnNvcih7IGxpbmU6IGhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSArIDEsIGNoOiAwIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhcmFtZXRlcnMuYmxvY2sgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5vcGVuKHtcbiAgICAgICAgICAgICAgICBmaWxlOiBwYXJhbWV0ZXJzLmZpbGVwYXRoICsgXCIjXlwiICsgcGFyYW1ldGVycy5ibG9jayxcbiAgICAgICAgICAgICAgICBzZXR0aW5nOiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRmlsZVdpdGhvdXRXcml0ZUluTmV3UGFuZSxcbiAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgIHN1cHBvcnRQb3BvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IGFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICAgICAgaWYgKCF2aWV3KSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZSh2aWV3LmZpbGUpO1xuICAgICAgICAgICAgY29uc3QgYmxvY2sgPSBjYWNoZS5ibG9ja3NbcGFyYW1ldGVycy5ibG9ja107XG4gICAgICAgICAgICB2aWV3LmVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgdmlldy5lZGl0b3Iuc2V0Q3Vyc29yKHsgbGluZTogYmxvY2sucG9zaXRpb24uc3RhcnQubGluZSwgY2g6IDAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWZpbGVJc0FscmVhZHlPcGVuZWQpXG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4ub3Blbih7XG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IHBhcmFtZXRlcnMuZmlsZXBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmc6IHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lLFxuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICBtb2RlOiBwYXJhbWV0ZXJzLmxpbmUgIT0gdW5kZWZpbmVkID8gXCJzb3VyY2VcIiA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubGluZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXRDdXJzb3JJbkxpbmUocGFyYW1ldGVycy5saW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1ldGVycy5tb2RlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2V0Q3Vyc29yKHBhcmFtZXRlcnMubW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMudWlkKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cbiAgICAgICAgICAgIHRoaXMudG9vbHMud3JpdGVVSURUb0ZpbGUodmlldy5maWxlLCBwYXJhbWV0ZXJzLnVpZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW4uc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICB9XG5cblxuXG4gICAgaGFuZGxlQ29weUZpbGVVUkkod2l0aG91dERhdGE6IGJvb2xlYW4sIGZpbGU/OiBURmlsZSkge1xuICAgICAgICBjb25zdCB2aWV3ID0gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKEZpbGVWaWV3KTtcbiAgICAgICAgaWYgKCF2aWV3ICYmICFmaWxlKSByZXR1cm47XG4gICAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgTWFya2Rvd25WaWV3KSB7XG4gICAgICAgICAgICBjb25zdCBwb3MgPSB2aWV3LmVkaXRvci5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKHZpZXcuZmlsZSk7XG4gICAgICAgICAgICBpZiAoY2FjaGUuaGVhZGluZ3MpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGhlYWRpbmcgb2YgY2FjaGUuaGVhZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWRpbmcucG9zaXRpb24uc3RhcnQubGluZSA8PSBwb3MubGluZSAmJiBoZWFkaW5nLnBvc2l0aW9uLmVuZC5saW5lID49IHBvcy5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xzLmNvcHlVUkkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVwYXRoOiB2aWV3LmZpbGUucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkaW5nOiBoZWFkaW5nLmhlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhY2hlLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYmxvY2tJRCBvZiBPYmplY3Qua2V5cyhjYWNoZS5ibG9ja3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrID0gY2FjaGUuYmxvY2tzW2Jsb2NrSURdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmxvY2sucG9zaXRpb24uc3RhcnQubGluZSA8PSBwb3MubGluZSAmJiBibG9jay5wb3NpdGlvbi5lbmQubGluZSA+PSBwb3MubGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b29scy5jb3B5VVJJKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlcGF0aDogdmlldy5maWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6IGJsb2NrSURcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpdGhvdXREYXRhKSB7XG4gICAgICAgICAgICBjb25zdCBmaWxlMiA9IGZpbGUgPz8gYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCk7XG4gICAgICAgICAgICBpZiAoIWZpbGUyKSB7XG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIk5vIGZpbGUgb3BlbmVkXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudG9vbHMuY29weVVSSSh7XG4gICAgICAgICAgICAgICAgZmlsZXBhdGg6IGZpbGUyLnBhdGgsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVNb2RhbCA9IG5ldyBGaWxlTW9kYWwodGhpcy5wbHVnaW4sIFwiQ2hvb3NlIGEgZmlsZVwiLCBmYWxzZSk7XG4gICAgICAgICAgICBmaWxlTW9kYWwub3BlbigpO1xuICAgICAgICAgICAgZmlsZU1vZGFsLm9uQ2hvb3NlSXRlbSA9IChpdGVtLCBfKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBuZXcgRW50ZXJEYXRhTW9kYWwodGhpcy5wbHVnaW4sIGl0ZW0uc291cmNlKS5vcGVuKCk7XG5cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGhhbmRsZU9wZW5TZXR0aW5ncyhwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGlmIChhcHAuc2V0dGluZy5jb250YWluZXJFbC5wYXJlbnRFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICBhcHAuc2V0dGluZy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuc2V0dGluZ2lkID09IFwicGx1Z2luLWJyb3dzZXJcIikge1xuICAgICAgICAgICAgYXBwLnNldHRpbmcub3BlblRhYkJ5SWQoXCJjb21tdW5pdHktcGx1Z2luc1wiKTtcbiAgICAgICAgICAgIGFwcC5zZXR0aW5nLmFjdGl2ZVRhYi5jb250YWluZXJFbC5maW5kKFwiLm1vZC1jdGFcIikuY2xpY2soKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLnNldHRpbmdpZCA9PSBcInRoZW1lLWJyb3dzZXJcIikge1xuICAgICAgICAgICAgYXBwLnNldHRpbmcub3BlblRhYkJ5SWQoXCJhcHBlYXJhbmNlXCIpO1xuICAgICAgICAgICAgYXBwLnNldHRpbmcuYWN0aXZlVGFiLmNvbnRhaW5lckVsLmZpbmQoXCIubW9kLWN0YVwiKS5jbGljaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwLnNldHRpbmcub3BlblRhYkJ5SWQocGFyYW1ldGVycy5zZXR0aW5naWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGx1Z2luLnN1Y2Nlc3MocGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgYXN5bmMgaGFuZGxlVXBkYXRlUGx1Z2lucyhwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIHBhcmFtZXRlcnMuc2V0dGluZ2lkID0gXCJjb21tdW5pdHktcGx1Z2luc1wiO1xuICAgICAgICB0aGlzLmhhbmRsZU9wZW5TZXR0aW5ncyhwYXJhbWV0ZXJzKTtcbiAgICAgICAgYXBwLnNldHRpbmcuYWN0aXZlVGFiLmNvbnRhaW5lckVsLmZpbmRBbGwoXCIubW9kLWN0YVwiKS5sYXN0KCkuY2xpY2soKTtcbiAgICAgICAgbmV3IE5vdGljZShcIldhaXRpbmcgMTAgc2Vjb25kc1wiKTtcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwICogMTAwMCkpO1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cygoYXBwIGFzIGFueSkucGx1Z2lucy51cGRhdGVzKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGFwcC5zZXR0aW5nLmFjdGl2ZVRhYi5jb250YWluZXJFbC5maW5kQWxsKFwiLm1vZC1jdGFcIikubGFzdCgpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbHVnaW4uc3VjY2VzcyhwYXJhbWV0ZXJzKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29tbWFuZCwgRnV6enlTdWdnZXN0TW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBBZHZhbmNlZFVSSSBmcm9tIFwiLi4vbWFpblwiO1xuXG5leHBvcnQgY2xhc3MgQ29tbWFuZE1vZGFsIGV4dGVuZHMgRnV6enlTdWdnZXN0TW9kYWw8Q29tbWFuZD4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG4gICAgZmlsZTogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogQWR2YW5jZWRVUkksIGZpbGU/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLmZpbGUgPSBmaWxlO1xuICAgIH1cblxuICAgIGdldEl0ZW1zKCk6IENvbW1hbmRbXSB7XG4gICAgICAgIGNvbnN0IHJhd0NvbW1hbmRzID0gdGhpcy5hcHAuY29tbWFuZHMuY29tbWFuZHM7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRzOiBDb21tYW5kW10gPSBPYmplY3Qua2V5cyhyYXdDb21tYW5kcykubWFwKGUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IHJhd0NvbW1hbmRzW2VdLmlkLCBuYW1lOiByYXdDb21tYW5kc1tlXS5uYW1lIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29tbWFuZHM7XG4gICAgfVxuXG4gICAgZ2V0SXRlbVRleHQoaXRlbTogQ29tbWFuZCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBpdGVtLm5hbWU7XG4gICAgfVxuXG4gICAgb25DaG9vc2VJdGVtKGl0ZW06IENvbW1hbmQsIF86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucGx1Z2luLnRvb2xzLmNvcHlVUkkoe1xuICAgICAgICAgICAgZmlsZXBhdGg6IHRoaXMuZmlsZSxcbiAgICAgICAgICAgIGNvbW1hbmRpZDogaXRlbS5pZFxuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IHsgU3VnZ2VzdE1vZGFsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgQWR2YW5jZWRVUkkgZnJvbSBcIi4uL21haW5cIjtcbmltcG9ydCB7IFNlYXJjaE1vZGFsRGF0YSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgUmVwbGFjZU1vZGFsIGV4dGVuZHMgU3VnZ2VzdE1vZGFsPHN0cmluZz4ge1xuICAgIHBsdWdpbjogQWR2YW5jZWRVUkk7XG4gICAgZW1wdHlUZXh0ID0gXCJFbXB0eSB0ZXh0IChyZXBsYWNlIHdpdGggbm90aGluZylcIjtcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IEFkdmFuY2VkVVJJLCBwcml2YXRlIHNlYXJjaDogU2VhcmNoTW9kYWxEYXRhLCBwcml2YXRlIGZpbGVwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIocGx1Z2luLmFwcCk7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB0aGlzLnNldFBsYWNlaG9sZGVyKFwiUmVwbGFjZW1lbnQgdGV4dFwiKTtcbiAgICB9XG5cblxuICAgIGdldFN1Z2dlc3Rpb25zKHF1ZXJ5OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChxdWVyeSA9PT0gXCJcIikge1xuICAgICAgICAgICAgcXVlcnkgPSB0aGlzLmVtcHR5VGV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3F1ZXJ5XTtcbiAgICB9XG5cbiAgICByZW5kZXJTdWdnZXN0aW9uKHZhbHVlOiBzdHJpbmcsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBlbC5pbm5lclRleHQgPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgb25DaG9vc2VTdWdnZXN0aW9uKGl0ZW06IHN0cmluZywgXzogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoLmlzUmVnRXgpIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnRvb2xzLmNvcHlVUkkoe1xuICAgICAgICAgICAgICAgIGZpbGVwYXRoOiB0aGlzLmZpbGVwYXRoLFxuICAgICAgICAgICAgICAgIHNlYXJjaHJlZ2V4OiB0aGlzLnNlYXJjaC5zb3VyY2UsXG4gICAgICAgICAgICAgICAgcmVwbGFjZTogaXRlbSA9PSB0aGlzLmVtcHR5VGV4dCA/IFwiXCIgOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnRvb2xzLmNvcHlVUkkoe1xuICAgICAgICAgICAgICAgIGZpbGVwYXRoOiB0aGlzLmZpbGVwYXRoLFxuICAgICAgICAgICAgICAgIHNlYXJjaDogdGhpcy5zZWFyY2guc291cmNlLFxuICAgICAgICAgICAgICAgIHJlcGxhY2U6IGl0ZW0gPT0gdGhpcy5lbXB0eVRleHQgPyBcIlwiIDogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG59XG4iLCJpbXBvcnQgeyBTdWdnZXN0TW9kYWwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBBZHZhbmNlZFVSSSBmcm9tIFwiLi4vbWFpblwiO1xuaW1wb3J0IHsgU2VhcmNoTW9kYWxEYXRhIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWFyY2hNb2RhbCBleHRlbmRzIFN1Z2dlc3RNb2RhbDxTZWFyY2hNb2RhbERhdGE+IHtcbiAgICBwbHVnaW46IEFkdmFuY2VkVVJJO1xuXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBBZHZhbmNlZFVSSSkge1xuICAgICAgICBzdXBlcihwbHVnaW4uYXBwKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgICAgIHRoaXMuc2V0UGxhY2Vob2xkZXIoXCJTZWFyY2hlZCB0ZXh0LiBSZWdFeCBpcyBzdXBwb3J0ZWRcIik7XG4gICAgfVxuXG5cbiAgICBnZXRTdWdnZXN0aW9ucyhxdWVyeTogc3RyaW5nKTogU2VhcmNoTW9kYWxEYXRhW10ge1xuICAgICAgICBpZiAocXVlcnkgPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gXCIuLi5cIjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVnZXg6IFJlZ0V4cDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlZ2V4ID0gbmV3IFJlZ0V4cChxdWVyeSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgIGlzUmVnRXg6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IHF1ZXJ5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNvdXJjZTogcXVlcnksXG4gICAgICAgICAgICAgICAgZGlzcGxheTogcmVnZXggPyBgQXMgUmVnRXg6ICR7cXVlcnl9YCA6IGBDYW4ndCBwYXJzZSBSZWdFeGAsXG4gICAgICAgICAgICAgICAgaXNSZWdFeDogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlclN1Z2dlc3Rpb24odmFsdWU6IFNlYXJjaE1vZGFsRGF0YSwgZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGVsLmlubmVyVGV4dCA9IHZhbHVlLmRpc3BsYXk7XG4gICAgfTtcblxuICAgIG9uQ2hvb3NlU3VnZ2VzdGlvbihpdGVtOiBTZWFyY2hNb2RhbERhdGEsIF86IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgQXBwLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgQWR2YW5jZWRVUkkgZnJvbSBcIi4vbWFpblwiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgICBwbHVnaW46IEFkdmFuY2VkVVJJO1xuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEFkdmFuY2VkVVJJKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdC5uYW1lIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJPcGVuIGZpbGUgb24gd3JpdGVcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlT25Xcml0ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIk9wZW4gZmlsZSBvbiB3cml0ZSBpbiBhIG5ldyBwYW5lXCIpXG4gICAgICAgICAgICAuc2V0RGlzYWJsZWQodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlKVxuICAgICAgICAgICAgLmFkZFRvZ2dsZShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vcGVuRmlsZU9uV3JpdGVJbk5ld1BhbmUpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlSW5OZXdQYW5lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiT3BlbiBkYWlseSBub3RlIGluIGEgbmV3IHBhbmVcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3BlbkRhaWx5SW5OZXdQYW5lKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5EYWlseUluTmV3UGFuZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIk9wZW4gZmlsZSB3aXRob3V0IHdyaXRlIGluIG5ldyBwYW5lXCIpXG4gICAgICAgICAgICAuYWRkVG9nZ2xlKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm9wZW5GaWxlV2l0aG91dFdyaXRlSW5OZXdQYW5lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiVXNlIFVJRCBpbnN0ZWFkIG9mIGZpbGUgcGF0aHNcIilcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlVUlEKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZVVJRCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZVVJRCkge1xuICAgICAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAgICAgLnNldE5hbWUoXCJBZGQgZmlsZXBhdGggcGFyYW1ldGVyXCIpXG4gICAgICAgICAgICAgICAgLnNldERlc2MoXCJXaGVuIHVzaW5nIFVJRCBpbnN0ZWFkIG9mIGZpbGUgcGF0aHMsIHlvdSBjYW4gc3RpbGwgYWRkIHRoZSBmaWxlcGF0aCBwYXJhbWV0ZXIgdG8ga25vdyB3aGF0IHRoaXMgVVJJIGlzIGFib3V0LiBJdCdzIE5PVCBhY3R1YWxseSB1c2VkLlwiKVxuICAgICAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFkZEZpbGVwYXRoV2hlblVzaW5nVUlEKVxuICAgICAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYWRkRmlsZXBhdGhXaGVuVXNpbmdVSUQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIlVJRCBmaWVsZCBpbiBmcm9udG1hdHRlclwiKVxuICAgICAgICAgICAgLmFkZFRleHQoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWRGaWVsZClcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZEZpZWxkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKCdEb25hdGUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ0lmIHlvdSBsaWtlIHRoaXMgUGx1Z2luLCBjb25zaWRlciBkb25hdGluZyB0byBzdXBwb3J0IGNvbnRpbnVlZCBkZXZlbG9wbWVudC4nKVxuICAgICAgICAgICAgLmFkZEJ1dHRvbigoYnQpID0+IHtcbiAgICAgICAgICAgICAgICBidC5idXR0b25FbC5vdXRlckhUTUwgPSBcIjxhIGhyZWY9J2h0dHBzOi8va28tZmkuY29tL0YxRjE5NUlRNScgdGFyZ2V0PSdfYmxhbmsnPjxpbWcgaGVpZ2h0PSczNicgc3R5bGU9J2JvcmRlcjowcHg7aGVpZ2h0OjM2cHg7JyBzcmM9J2h0dHBzOi8vY2RuLmtvLWZpLmNvbS9jZG4va29maTMucG5nP3Y9MycgYm9yZGVyPScwJyBhbHQ9J0J1eSBNZSBhIENvZmZlZSBhdCBrby1maS5jb20nIC8+PC9hPlwiO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG52YXIgZ2V0UmFuZG9tVmFsdWVzO1xudmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uIEFsc28sXG4gICAgLy8gZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIChtc0NyeXB0bykgb24gSUUxMS5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pIHx8IHR5cGVvZiBtc0NyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgeyBDYWNoZWRNZXRhZGF0YSwgTm90aWNlLCBwYXJzZUZyb250TWF0dGVyRW50cnksIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcbmltcG9ydCBBZHZhbmNlZFVSSSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBBZHZhbmNlZFVSSVNldHRpbmdzLCBQYXJhbWV0ZXJzIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGNvcHlUZXh0IH0gZnJvbSBcIi4vdXRpbHNcIjtcbi8qKlxuICogVGhlc2UgbWV0aG9kcyBkZXBlbmQgb24gdGhlIHBsdWdpbnMgc2V0dGluZ3MgaW4gY29udHJhc3QgdG8gdGhlIHV0aWxzLnRzIGZpbGUsIHdoaWNoJ3MgZnVuY3Rpb25zIGFyZSBpbmRlcGVuZGVudCBvZiB0aGUgcGx1Z2lucyBzZXR0aW5ncy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHMge1xuXG4gICAgcHVibGljIGdldCBzZXR0aW5ncygpOiBBZHZhbmNlZFVSSVNldHRpbmdzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luLnNldHRpbmdzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBBZHZhbmNlZFVSSSkge1xuICAgIH1cblxuICAgIGFzeW5jIHdyaXRlVUlEVG9GaWxlKGZpbGU6IFRGaWxlLCB1aWQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG5cbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSk/LmZyb250bWF0dGVyO1xuICAgICAgICBjb25zdCBmaWxlQ29udGVudDogc3RyaW5nID0gYXdhaXQgYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgIGNvbnN0IGlzWWFtbEVtcHR5OiBib29sZWFuID0gKCghZnJvbnRtYXR0ZXIgfHwgZnJvbnRtYXR0ZXIubGVuZ3RoID09PSAwKSAmJiAhZmlsZUNvbnRlbnQubWF0Y2goL14tezN9XFxzKlxcbipcXHIqLXszfS8pKTtcbiAgICAgICAgbGV0IHNwbGl0Q29udGVudCA9IGZpbGVDb250ZW50LnNwbGl0KFwiXFxuXCIpO1xuICAgICAgICBpZiAoaXNZYW1sRW1wdHkpIHtcbiAgICAgICAgICAgIHNwbGl0Q29udGVudC51bnNoaWZ0KFwiLS0tXCIpO1xuICAgICAgICAgICAgc3BsaXRDb250ZW50LnVuc2hpZnQoYCR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuaWRGaWVsZH06ICR7dWlkfWApO1xuICAgICAgICAgICAgc3BsaXRDb250ZW50LnVuc2hpZnQoXCItLS1cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzcGxpdENvbnRlbnQuc3BsaWNlKDEsIDAsIGAke3RoaXMucGx1Z2luLnNldHRpbmdzLmlkRmllbGR9OiAke3VpZH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0ZpbGVDb250ZW50ID0gc3BsaXRDb250ZW50LmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGF3YWl0IGFwcC52YXVsdC5tb2RpZnkoZmlsZSwgbmV3RmlsZUNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gdWlkO1xuICAgIH1cblxuXG4gICAgYXN5bmMgZ2V0VUlERnJvbUZpbGUoZmlsZTogVEZpbGUpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBsZXQgY2FjaGU6IENhY2hlZE1ldGFkYXRhO1xuXG4gICAgICAgIC8vYXdhaXQgcGFyc2luZyBvZiBmcm9udG1hdHRlclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAyMDsgaSsrKSB7XG4gICAgICAgICAgICBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcblxuICAgICAgICAgICAgaWYgKGNhY2hlICE9PSB1bmRlZmluZWQpIGJyZWFrO1xuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDE1MCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVpZCA9IHBhcnNlRnJvbnRNYXR0ZXJFbnRyeShjYWNoZS5mcm9udG1hdHRlciwgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWRGaWVsZCk7XG4gICAgICAgIGlmICh1aWQgIT0gdW5kZWZpbmVkKSByZXR1cm4gdWlkO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy53cml0ZVVJRFRvRmlsZShmaWxlLCB1dWlkdjQoKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVVUkkocGFyYW1ldGVyczogUGFyYW1ldGVycywgZG91YmxlRW5jb2RlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGBvYnNpZGlhbjovL2FkdmFuY2VkLXVyaT92YXVsdD0ke2VuY29kZVVSSUNvbXBvbmVudChhcHAudmF1bHQuZ2V0TmFtZSgpKX1gO1xuICAgICAgICBsZXQgc3VmZml4ID0gXCJcIjtcbiAgICAgICAgY29uc3QgZmlsZSA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgocGFyYW1ldGVycy5maWxlcGF0aCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudXNlVUlEICYmIGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmFkZEZpbGVwYXRoV2hlblVzaW5nVUlEKVxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuZmlsZXBhdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBwYXJhbWV0ZXJzLnVpZCA9IGF3YWl0IHRoaXMuZ2V0VUlERnJvbUZpbGUoZmlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXJhbWV0ZXIgaW4gcGFyYW1ldGVycykge1xuXG4gICAgICAgICAgICBpZiAoKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHN1ZmZpeCA9IHN1ZmZpeCArIGAmJHtwYXJhbWV0ZXJ9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KChwYXJhbWV0ZXJzIGFzIGFueSlbcGFyYW1ldGVyXSl9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZG91YmxlRW5jb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgZW5jb2RlVVJJKHN1ZmZpeCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ICsgc3VmZml4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgY29weVVSSShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGNvbnN0IHVyaSA9IGF3YWl0IHRoaXMuZ2VuZXJhdGVVUkkocGFyYW1ldGVycywgdHJ1ZSk7XG4gICAgICAgIGF3YWl0IGNvcHlUZXh0KHVyaSk7XG5cbiAgICAgICAgbmV3IE5vdGljZShcIkFkdmFuY2VkIFVSSSBjb3BpZWQgdG8geW91ciBjbGlwYm9hcmRcIik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgYmFzZTY0VG9BcnJheUJ1ZmZlciwgTWFya2Rvd25WaWV3LCBub3JtYWxpemVQYXRoLCBOb3RpY2UsIHBhcnNlRnJvbnRNYXR0ZXJBbGlhc2VzLCBwYXJzZUZyb250TWF0dGVyRW50cnksIFBsdWdpbiwgVEZpbGUsIFRGb2xkZXIgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IHN0cmlwTUQgfSBmcm9tIFwib2JzaWRpYW4tY29tbXVuaXR5LWxpYlwiO1xuaW1wb3J0IHsgYXBwSGFzRGFpbHlOb3Rlc1BsdWdpbkxvYWRlZCwgY3JlYXRlRGFpbHlOb3RlLCBnZXRBbGxEYWlseU5vdGVzLCBnZXREYWlseU5vdGUgfSBmcm9tIFwib2JzaWRpYW4tZGFpbHktbm90ZXMtaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBCbG9ja1V0aWxzIH0gZnJvbSBcIi4vYmxvY2tfdXRpbHNcIjtcbmltcG9ydCB7IERFRkFVTFRfU0VUVElOR1MgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGdldERhaWx5Tm90ZVBhdGggfSBmcm9tIFwiLi9kYWlseV9ub3RlX3V0aWxzXCI7XG5pbXBvcnQgSGFuZGxlcnMgZnJvbSBcIi4vaGFuZGxlcnNcIjtcbmltcG9ydCB7IENvbW1hbmRNb2RhbCB9IGZyb20gXCIuL21vZGFscy9jb21tYW5kX21vZGFsXCI7XG5pbXBvcnQgeyBFbnRlckRhdGFNb2RhbCB9IGZyb20gXCIuL21vZGFscy9lbnRlcl9kYXRhX21vZGFsXCI7XG5pbXBvcnQgeyBGaWxlTW9kYWwgfSBmcm9tIFwiLi9tb2RhbHMvZmlsZV9tb2RhbFwiO1xuaW1wb3J0IHsgUmVwbGFjZU1vZGFsIH0gZnJvbSBcIi4vbW9kYWxzL3JlcGxhY2VfbW9kYWxcIjtcbmltcG9ydCB7IFNlYXJjaE1vZGFsIH0gZnJvbSBcIi4vbW9kYWxzL3NlYXJjaF9tb2RhbFwiO1xuaW1wb3J0IHsgU2V0dGluZ3NUYWIgfSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xuaW1wb3J0IFRvb2xzIGZyb20gXCIuL3Rvb2xzXCI7XG5pbXBvcnQgeyBBZHZhbmNlZFVSSVNldHRpbmdzLCBGaWxlTW9kYWxEYXRhLCBIb29rUGFyYW1ldGVycywgT3Blbk1vZGUsIFBhcmFtZXRlcnMsIFNlYXJjaE1vZGFsRGF0YSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBnZXRFbmRBbmRCZWdpbm5pbmdPZkhlYWRpbmcsIGdldEZpbGVVcmksIGdldFZpZXdTdGF0ZUZyb21Nb2RlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZHZhbmNlZFVSSSBleHRlbmRzIFBsdWdpbiB7XG4gICAgc2V0dGluZ3M6IEFkdmFuY2VkVVJJU2V0dGluZ3M7XG4gICAgbGFzdFBhcmFtZXRlcnM/OiBPYmplY3Q7XG4gICAgaGFuZGxlcnMgPSBuZXcgSGFuZGxlcnModGhpcyk7XG4gICAgdG9vbHMgPSBuZXcgVG9vbHModGhpcyk7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuXG4gICAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgICAgICBpZDogXCJjb3B5LXVyaS1jdXJyZW50LWZpbGVcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGZpbGUgd2l0aCBvcHRpb25zXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdGhpcy5oYW5kbGVycy5oYW5kbGVDb3B5RmlsZVVSSShmYWxzZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcImNvcHktdXJpLWN1cnJlbnQtZmlsZS1zaW1wbGVcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGN1cnJlbnQgZmlsZVwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMuaGFuZGxlcnMuaGFuZGxlQ29weUZpbGVVUkkodHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcImNvcHktdXJpLWRhaWx5XCIsXG4gICAgICAgICAgICBuYW1lOiBcImNvcHkgVVJJIGZvciBkYWlseSBub3RlXCIsXG4gICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gbmV3IEVudGVyRGF0YU1vZGFsKHRoaXMpLm9wZW4oKVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwiY29weS11cmktc2VhcmNoLWFuZC1yZXBsYWNlXCIsXG4gICAgICAgICAgICBuYW1lOiBcImNvcHkgVVJJIGZvciBzZWFyY2ggYW5kIHJlcGxhY2VcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1vZGFsID0gbmV3IEZpbGVNb2RhbCh0aGlzLCBcIlVzZWQgZmlsZSBmb3Igc2VhcmNoIGFuZCByZXBsYWNlXCIpO1xuICAgICAgICAgICAgICAgIGZpbGVNb2RhbC5vcGVuKCk7XG4gICAgICAgICAgICAgICAgZmlsZU1vZGFsLm9uQ2hvb3NlSXRlbSA9IChmaWxlUGF0aDogRmlsZU1vZGFsRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hNb2RhbCA9IG5ldyBTZWFyY2hNb2RhbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoTW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hNb2RhbC5vbkNob29zZVN1Z2dlc3Rpb24gPSAoaXRlbTogU2VhcmNoTW9kYWxEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUmVwbGFjZU1vZGFsKHRoaXMsIGl0ZW0sIGZpbGVQYXRoPy5zb3VyY2UpLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgICAgICAgIGlkOiBcImNvcHktdXJpLWNvbW1hbmRcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGNvbW1hbmRcIixcbiAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU1vZGFsID0gbmV3IEZpbGVNb2RhbCh0aGlzLCBcIlNlbGVjdCBhIGZpbGUgdG8gYmUgb3BlbmVkIGJlZm9yZSBleGVjdXRpbmcgdGhlIGNvbW1hbmRcIik7XG4gICAgICAgICAgICAgICAgZmlsZU1vZGFsLm9wZW4oKTtcbiAgICAgICAgICAgICAgICBmaWxlTW9kYWwub25DaG9vc2VJdGVtID0gKGl0ZW06IEZpbGVNb2RhbERhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbmV3IENvbW1hbmRNb2RhbCh0aGlzLCBpdGVtPy5zb3VyY2UpLm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwiY29weS11cmktYmxvY2tcIixcbiAgICAgICAgICAgIG5hbWU6IFwiY29weSBVUkkgZm9yIGN1cnJlbnQgYmxvY2tcIixcbiAgICAgICAgICAgIGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2luZykgcmV0dXJuIHZpZXcgIT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gQmxvY2tVdGlscy5nZXRCbG9ja0lkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9vbHMuY29weVVSSSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlcGF0aDogdmlldy5maWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jazogaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyT2JzaWRpYW5Qcm90b2NvbEhhbmRsZXIoXCJhZHZhbmNlZC11cmlcIiwgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSBlIGFzIHVua25vd24gYXMgUGFyYW1ldGVycztcblxuICAgICAgICAgICAgLyoqIEFsbG93cyB3cml0aW5nIHRvIG5ldyBjcmVhdGVkIGRhaWx5IG5vdGUgd2l0aG91dCBhbnkgYFBhcmFtZXRlcnMubW9kZWAgKi9cbiAgICAgICAgICAgIGxldCBjcmVhdGVkRGFpbHlOb3RlID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtZXRlciBpbiBwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdID0gZGVjb2RlVVJJQ29tcG9uZW50KChwYXJhbWV0ZXJzIGFzIGFueSlbcGFyYW1ldGVyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxhc3RQYXJhbWV0ZXJzID0geyAuLi5wYXJhbWV0ZXJzIH07XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy51aWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0aGlzLmdldEZpbGVGcm9tVUlEKHBhcmFtZXRlcnMudWlkKT8ucGF0aDtcbiAgICAgICAgICAgICAgICBpZiAocmVzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmZpbGVwYXRoID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLnVpZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5maWxlbmFtZSkge1xuICAgICAgICAgICAgICAgIGxldCBmaWxlID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChwYXJhbWV0ZXJzLmZpbGVuYW1lLCBcIlwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZSA9IHRoaXMuYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKS5maW5kKGZpbGUgPT4gcGFyc2VGcm9udE1hdHRlckFsaWFzZXModGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZmlsZSkuZnJvbnRtYXR0ZXIpPy5pbmNsdWRlcyhwYXJhbWV0ZXJzLmZpbGVuYW1lKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEZvbGRlciA9IHRoaXMuYXBwLmZpbGVNYW5hZ2VyLmdldE5ld0ZpbGVQYXJlbnQodGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5maWxlPy5wYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRGb2xkZXJQYXRoID0gcGFyZW50Rm9sZGVyLmlzUm9vdCgpID8gXCJcIiA6IHBhcmVudEZvbGRlci5wYXRoICsgXCIvXCI7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IGZpbGU/LnBhdGggPz8gKHBhcmVudEZvbGRlclBhdGggKyBub3JtYWxpemVQYXRoKHBhcmFtZXRlcnMuZmlsZW5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IG5vcm1hbGl6ZVBhdGgocGFyYW1ldGVycy5maWxlcGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJhbWV0ZXJzLmZpbGVwYXRoLmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBwYXJhbWV0ZXJzLmZpbGVwYXRoLnN1YnN0cmluZyhpbmRleCA8IDAgPyBwYXJhbWV0ZXJzLmZpbGVwYXRoLmxlbmd0aCA6IGluZGV4KTtcblxuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb24gPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1ldGVycy5maWxlcGF0aCA9IHBhcmFtZXRlcnMuZmlsZXBhdGggKyBcIi5tZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5kYWlseSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiRGFpbHkgbm90ZXMgcGx1Z2luIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbW9tZW50ID0gd2luZG93Lm1vbWVudChEYXRlLm5vdygpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBhbGxEYWlseU5vdGVzID0gZ2V0QWxsRGFpbHlOb3RlcygpO1xuICAgICAgICAgICAgICAgIGxldCBkYWlseU5vdGUgPSBnZXREYWlseU5vdGUobW9tZW50LCBhbGxEYWlseU5vdGVzKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRhaWx5Tm90ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLy8gUHJldmVudCBkYWlseSBub3RlIGZyb20gYmVpbmcgY3JlYXRlZCBvbiBleGlzdGluZyBjaGVja1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1ldGVycy5leGlzdHMgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLmZpbGVwYXRoID0gYXdhaXQgZ2V0RGFpbHlOb3RlUGF0aChtb21lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGFpbHlOb3RlID0gYXdhaXQgY3JlYXRlRGFpbHlOb3RlKG1vbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlbGF5IHRvIGxldCBPYnNpZGlhbiBpbmRleCBhbmQgZ2VuZXJhdGUgQ2FjaGVkTWV0YWRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCA1MDApKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlZERhaWx5Tm90ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhaWx5Tm90ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMuZmlsZXBhdGggPSBkYWlseU5vdGUucGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5jbGlwYm9hcmQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1ldGVycy5kYXRhID0gYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVyc1tcImVuYWJsZS1wbHVnaW5cIl0gfHwgcGFyYW1ldGVyc1tcImRpc2FibGUtcGx1Z2luXCJdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5oYW5kbGVQbHVnaW5NYW5hZ2VtZW50KHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuZnJvbnRtYXR0ZXJrZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZUZyb250bWF0dGVyS2V5KHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMud29ya3NwYWNlIHx8IHBhcmFtZXRlcnMuc2F2ZXdvcmtzcGFjZSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnMuaGFuZGxlV29ya3NwYWNlKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuY29tbWFuZG5hbWUgfHwgcGFyYW1ldGVycy5jb21tYW5kaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZUNvbW1hbmQocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5maWxlcGF0aCAmJiBwYXJhbWV0ZXJzLmV4aXN0cyA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZURvZXNGaWxlRXhpc3QocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5oYW5kbGVXcml0ZShwYXJhbWV0ZXJzLCBjcmVhdGVkRGFpbHlOb3RlKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoICYmIHBhcmFtZXRlcnMuaGVhZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlcnMuaGFuZGxlT3BlbihwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoICYmIHBhcmFtZXRlcnMuYmxvY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZU9wZW4ocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHBhcmFtZXRlcnMuc2VhcmNoIHx8IHBhcmFtZXRlcnMuc2VhcmNocmVnZXgpICYmIHBhcmFtZXRlcnMucmVwbGFjZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZVNlYXJjaEFuZFJlcGxhY2UocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy5zZWFyY2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmhhbmRsZVNlYXJjaChwYXJhbWV0ZXJzKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbWV0ZXJzLmZpbGVwYXRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5oYW5kbGVPcGVuKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMuc2V0dGluZ2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5oYW5kbGVPcGVuU2V0dGluZ3MocGFyYW1ldGVycyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW1ldGVycy51cGRhdGVwbHVnaW5zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVycy5oYW5kbGVVcGRhdGVQbHVnaW5zKHBhcmFtZXRlcnMpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyT2JzaWRpYW5Qcm90b2NvbEhhbmRsZXIoXG4gICAgICAgICAgICBcImhvb2stZ2V0LWFkdmFuY2VkLXVyaVwiLFxuICAgICAgICAgICAgYXN5bmMgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbWV0ZXJzID0gZSBhcyB1bmtub3duIGFzIEhvb2tQYXJhbWV0ZXJzO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcGFyYW1ldGVyIGluIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgKHBhcmFtZXRlcnMgYXMgYW55KVtwYXJhbWV0ZXJdID0gZGVjb2RlVVJJQ29tcG9uZW50KChwYXJhbWV0ZXJzIGFzIGFueSlbcGFyYW1ldGVyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gYWN0aXZlTGVhZi52aWV3LmZpbGU7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUxlYWYgJiYgZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvb2tTdWNjZXNzKHBhcmFtZXRlcnMsIGZpbGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsdXJlKHBhcmFtZXRlcnMsIHsgZXJyb3JNZXNzYWdlOiBcIk5vIGZpbGUgb3BlbmVkXCIgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW1lbnUnLCAobWVudSwgZmlsZSwgc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc291cmNlKTtcblxuICAgICAgICAgICAgICAgIGlmICghKHNvdXJjZSA9PT0gXCJtb3JlLW9wdGlvbnNcIiB8fCBzb3VyY2UgPT09IFwidGFiLWhlYWRlclwiIHx8IHNvdXJjZSA9PSBcImZpbGUtZXhwbG9yZXItY29udGV4dC1tZW51XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtZW51LmFkZEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldFRpdGxlKGBDb3B5IEFkdmFuY2VkIFVSSWApXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0SWNvbignbGluaycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0U2VjdGlvbihcImluZm9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbkNsaWNrKChfKSA9PiB0aGlzLmhhbmRsZXJzLmhhbmRsZUNvcHlGaWxlVVJJKHRydWUsIGZpbGUpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBhc3luYyBob29rU3VjY2VzcyhwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzLCBmaWxlOiBURmlsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAoIXBhcmFtZXRlcnNbXCJ4LXN1Y2Nlc3NcIl0pIHJldHVybjtcblxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IHN0cmlwTUQoZmlsZS5uYW1lKSxcbiAgICAgICAgICAgIGFkdmFuY2VkdXJpOiBhd2FpdCB0aGlzLnRvb2xzLmdlbmVyYXRlVVJJKHsgZmlsZXBhdGg6IGZpbGUucGF0aCB9LCBmYWxzZSksXG4gICAgICAgICAgICB1cmxrZXk6IFwiYWR2YW5jZWR1cmlcIixcbiAgICAgICAgICAgIGZpbGV1cmk6IGdldEZpbGVVcmkoZmlsZSksXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3VjY2VzcyhwYXJhbWV0ZXJzLCBvcHRpb25zKTtcbiAgICB9XG5cblxuICAgIHN1Y2Nlc3MocGFyYW1ldGVyczogUGFyYW1ldGVycywgb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4pOiB2b2lkIHtcbiAgICAgICAgaWYgKHBhcmFtZXRlcnNbXCJ4LXN1Y2Nlc3NcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGFyYW1ldGVyc1tcIngtc3VjY2Vzc1wiXSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcmFtIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLnNldChwYXJhbSwgb3B0aW9uc1twYXJhbV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmFpbHVyZShwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzLCBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55Pik6IHZvaWQge1xuICAgICAgICBpZiAocGFyYW1ldGVyc1tcIngtZXJyb3JcIl0pIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocGFyYW1ldGVyc1tcIngtZXJyb3JcIl0pO1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJhbSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQocGFyYW0sIG9wdGlvbnNbcGFyYW1dKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZpbGVGcm9tVUlEKHVpZDogc3RyaW5nKTogVEZpbGUgfCB1bmRlZmluZWQge1xuICAgICAgICBjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCk7XG4gICAgICAgIGNvbnN0IGlkS2V5ID0gdGhpcy5zZXR0aW5ncy5pZEZpZWxkO1xuICAgICAgICByZXR1cm4gZmlsZXMuZmluZChmaWxlID0+IHBhcnNlRnJvbnRNYXR0ZXJFbnRyeSh0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKT8uZnJvbnRtYXR0ZXIsIGlkS2V5KSA9PSB1aWQpO1xuICAgIH1cblxuXG4gICAgYXN5bmMgYXBwZW5kKGZpbGU6IFRGaWxlIHwgc3RyaW5nLCBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzKTogUHJvbWlzZTxURmlsZT4ge1xuICAgICAgICBsZXQgcGF0aDogc3RyaW5nO1xuICAgICAgICBsZXQgZGF0YVRvV3JpdGU6IHN0cmluZztcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuaGVhZGluZykge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIHBhdGggPSBmaWxlLnBhdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGdldEVuZEFuZEJlZ2lubmluZ09mSGVhZGluZyhmaWxlLCBwYXJhbWV0ZXJzLmhlYWRpbmcpPy5sYXN0TGluZTtcbiAgICAgICAgICAgICAgICBpZiAobGluZSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoXCJcXG5cIik7XG5cbiAgICAgICAgICAgICAgICBsaW5lcy5zcGxpY2UobGluZSwgMCwgLi4ucGFyYW1ldGVycy5kYXRhLnNwbGl0KFwiXFxuXCIpKTtcbiAgICAgICAgICAgICAgICBkYXRhVG9Xcml0ZSA9IGxpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgZmlsZURhdGE6IHN0cmluZztcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBmaWxlRGF0YSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LnJlYWQoZmlsZSk7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGZpbGUucGF0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IGZpbGU7XG4gICAgICAgICAgICAgICAgZmlsZURhdGEgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVRvV3JpdGUgPSBmaWxlRGF0YSArIFwiXFxuXCIgKyBwYXJhbWV0ZXJzLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBkYXRhVG9Xcml0ZSwgcGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgYXN5bmMgcHJlcGVuZChmaWxlOiBURmlsZSB8IHN0cmluZywgcGFyYW1ldGVyczogUGFyYW1ldGVycyk6IFByb21pc2U8VEZpbGU+IHtcbiAgICAgICAgbGV0IHBhdGg6IHN0cmluZztcbiAgICAgICAgbGV0IGRhdGFUb1dyaXRlOiBzdHJpbmc7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLmhlYWRpbmcpIHtcbiAgICAgICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgICAgICBwYXRoID0gZmlsZS5wYXRoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBnZXRFbmRBbmRCZWdpbm5pbmdPZkhlYWRpbmcoZmlsZSwgcGFyYW1ldGVycy5oZWFkaW5nKT8uZmlyc3RMaW5lO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcblxuICAgICAgICAgICAgICAgIGxpbmVzLnNwbGljZShsaW5lLCAwLCAuLi5wYXJhbWV0ZXJzLmRhdGEuc3BsaXQoXCJcXG5cIikpO1xuICAgICAgICAgICAgICAgIGRhdGFUb1dyaXRlID0gbGluZXMuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVEYXRhID0gYXdhaXQgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYWNoZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKGZpbGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhY2hlLmZyb250bWF0dGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBjYWNoZS5mcm9udG1hdHRlci5wb3NpdGlvbi5lbmQubGluZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3QgPSBmaWxlRGF0YS5zcGxpdChcIlxcblwiKS5zbGljZSgwLCBsaW5lICsgMSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGZpbGVEYXRhLnNwbGl0KFwiXFxuXCIpLnNsaWNlKGxpbmUgKyAxKS5qb2luKFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhVG9Xcml0ZSA9IGZpcnN0ICsgXCJcXG5cIiArIHBhcmFtZXRlcnMuZGF0YSArIFwiXFxuXCIgKyBsYXN0O1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVRvV3JpdGUgPSBwYXJhbWV0ZXJzLmRhdGEgKyBcIlxcblwiICsgZmlsZURhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdGggPSBmaWxlLnBhdGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhdGggPSBmaWxlO1xuICAgICAgICAgICAgICAgIGRhdGFUb1dyaXRlID0gcGFyYW1ldGVycy5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVBbmRPcGVuRmlsZShwYXRoLCBkYXRhVG9Xcml0ZSwgcGFyYW1ldGVycyk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGVBbmRPcGVuRmlsZShvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHBhcmFtZXRlcnM6IFBhcmFtZXRlcnMpOiBQcm9taXNlPFRGaWxlPiB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgob3V0cHV0RmlsZU5hbWUpO1xuXG4gICAgICAgIGlmIChmaWxlIGluc3RhbmNlb2YgVEZpbGUpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCB0ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gb3V0cHV0RmlsZU5hbWUuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgY29uc3QgZGlyID0gcGFydHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoIC0gMSkuam9pbihcIi9cIik7XG4gICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMSAmJiAhKHRoaXMuYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChkaXIpIGluc3RhbmNlb2YgVEZvbGRlcikpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGVGb2xkZXIoZGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJhc2U2NHJlZ2V4ID0gL14oWzAtOWEtekEtWisvXXs0fSkqKChbMC05YS16QS1aKy9dezJ9PT0pfChbMC05YS16QS1aKy9dezN9PSkpPyQvO1xuICAgICAgICAgICAgaWYgKGJhc2U2NHJlZ2V4LnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGVCaW5hcnkob3V0cHV0RmlsZU5hbWUsIGJhc2U2NFRvQXJyYXlCdWZmZXIodGV4dCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmFwcC52YXVsdC5jcmVhdGUob3V0cHV0RmlsZU5hbWUsIHRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3BlbkV4aXN0aW5nRmlsZUFuZFNldEN1cnNvcihvdXRwdXRGaWxlTmFtZSwgcGFyYW1ldGVycyk7XG5cblxuICAgICAgICByZXR1cm4gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG91dHB1dEZpbGVOYW1lKSBhcyBURmlsZTtcbiAgICB9XG5cbiAgICBhc3luYyBvcGVuRXhpc3RpbmdGaWxlQW5kU2V0Q3Vyc29yKGZpbGU6IHN0cmluZywgcGFyYW1ldGVyczogUGFyYW1ldGVycykge1xuICAgICAgICBpZiAocGFyYW1ldGVycy5vcGVubW9kZSA9PSBcInNpbGVudFwiKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZW5GaWxlT25Xcml0ZSkge1xuICAgICAgICAgICAgbGV0IGZpbGVJc0FscmVhZHlPcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQWxsTGVhdmVzKGxlYWYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsZWFmLnZpZXcuZmlsZT8ucGF0aCA9PT0gZmlsZSkge1xuICAgICAgICAgICAgICAgICAgICBmaWxlSXNBbHJlYWR5T3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHAud29ya3NwYWNlLnNldEFjdGl2ZUxlYWYobGVhZiwgeyBmb2N1czogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFmaWxlSXNBbHJlYWR5T3BlbmVkKVxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMub3Blbih7IGZpbGU6IGZpbGUsIHNldHRpbmc6IHRoaXMuc2V0dGluZ3Mub3BlbkZpbGVPbldyaXRlSW5OZXdQYW5lLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMubGluZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnNvckluTGluZShwYXJhbWV0ZXJzLmxpbmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb3Blbih7IGZpbGUsIHNldHRpbmcsIHBhcmFtZXRlcnMsIHN1cHBvcnRQb3BvdmVyLCBtb2RlIH06IHsgZmlsZTogc3RyaW5nIHwgVEZpbGUsIHNldHRpbmc/OiBib29sZWFuLCBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzLCBzdXBwb3J0UG9wb3Zlcj86IGJvb2xlYW4sIG1vZGU/OiBcInNvdXJjZVwiOyB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLm9wZW5tb2RlID09IFwicG9wb3ZlclwiICYmIChzdXBwb3J0UG9wb3ZlciA/PyB0cnVlKSkge1xuXG4gICAgICAgICAgICBjb25zdCBob3ZlckVkaXRvciA9IHRoaXMuYXBwLnBsdWdpbnMucGx1Z2luc1tcIm9ic2lkaWFuLWhvdmVyLWVkaXRvclwiXTtcbiAgICAgICAgICAgIGlmICghaG92ZXJFZGl0b3IpIHtcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiQ2Fubm90IGZpbmQgSG92ZXIgRWRpdG9yIHBsdWdpbi4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmFpbHVyZShwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbGVhZiA9IGhvdmVyRWRpdG9yLnNwYXduUG9wb3Zlcih1bmRlZmluZWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihsZWFmLCB7IGZvY3VzOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCB0ZmlsZSA9IGZpbGUgaW5zdGFuY2VvZiBURmlsZSA/IGZpbGUgOiB0aGlzLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZmlsZSkgYXMgVEZpbGU7XG4gICAgICAgICAgICBsZWFmLm9wZW5GaWxlKHRmaWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBvcGVuTW9kZTogT3Blbk1vZGUgfCBib29sZWFuID0gc2V0dGluZztcbiAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLm5ld3BhbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG9wZW5Nb2RlID0gcGFyYW1ldGVycy5uZXdwYW5lID09IFwidHJ1ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtZXRlcnMub3Blbm1vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbWV0ZXJzLm9wZW5tb2RlID09IFwidHJ1ZVwiIHx8IHBhcmFtZXRlcnMub3Blbm1vZGUgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wZW5Nb2RlID0gcGFyYW1ldGVycy5vcGVubW9kZSA9PSBcInRydWVcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtZXRlcnMub3Blbm1vZGUgPT0gXCJwb3BvdmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3Blbk1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvcGVuTW9kZSA9IHBhcmFtZXRlcnMub3Blbm1vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wZW5Nb2RlID09IFwic2lsZW50XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChmaWxlIGluc3RhbmNlb2YgVEZpbGUgPyBmaWxlLnBhdGggOiBmaWxlLCBcIlwiLCBvcGVuTW9kZSwgbW9kZSAhPSB1bmRlZmluZWQgPyB7IHN0YXRlOiB7IG1vZGU6IG1vZGUgfSB9IDogZ2V0Vmlld1N0YXRlRnJvbU1vZGUocGFyYW1ldGVycykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0Q3Vyc29yKG1vZGU6IFBhcmFtZXRlcnNbXCJtb2RlXCJdKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gdmlldy5lZGl0b3I7XG5cbiAgICAgICAgICAgIGxldCB2aWV3U3RhdGUgPSB2aWV3LmxlYWYuZ2V0Vmlld1N0YXRlKCk7XG4gICAgICAgICAgICB2aWV3U3RhdGUuc3RhdGUubW9kZSA9IFwic291cmNlXCI7XG5cbiAgICAgICAgICAgIGlmIChtb2RlID09PSBcImFwcGVuZFwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdExpbmUgPSBlZGl0b3IubGFzdExpbmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0TGluZUxlbmd0aCA9IGVkaXRvci5nZXRMaW5lKGxhc3RMaW5lKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgYXdhaXQgdmlldy5sZWFmLnNldFZpZXdTdGF0ZSh2aWV3U3RhdGUsIHsgZm9jdXM6IHRydWUgfSk7XG5cbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Q3Vyc29yKHsgY2g6IGxhc3RMaW5lTGVuZ3RoLCBsaW5lOiBsYXN0TGluZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gXCJwcmVwZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCB2aWV3LmxlYWYuc2V0Vmlld1N0YXRlKHZpZXdTdGF0ZSwgeyBmb2N1czogdHJ1ZSB9KTtcblxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3IoeyBjaDogMCwgbGluZTogMCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEN1cnNvckluTGluZShyYXdMaW5lOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG4gICAgICAgIGlmICghdmlldykgcmV0dXJuO1xuICAgICAgICBjb25zdCB2aWV3U3RhdGUgPSB2aWV3LmxlYWYuZ2V0Vmlld1N0YXRlKCk7XG4gICAgICAgIGlmICh2aWV3U3RhdGUuc3RhdGUubW9kZSAhPT0gXCJzb3VyY2VcIikge1xuICAgICAgICAgICAgdmlld1N0YXRlLnN0YXRlLm1vZGUgPSBcInNvdXJjZVwiO1xuICAgICAgICAgICAgdmlldy5sZWFmLnNldFZpZXdTdGF0ZSh2aWV3U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGluZSA9IE1hdGgubWluKHJhd0xpbmUgLSAxLCB2aWV3LmVkaXRvci5saW5lQ291bnQoKSAtIDEpO1xuICAgICAgICB2aWV3LmVkaXRvci5mb2N1cygpO1xuICAgICAgICB2aWV3LmVkaXRvci5zZXRDdXJzb3IoeyBsaW5lOiBsaW5lLCBjaDogdmlldy5lZGl0b3IuZ2V0TGluZShsaW5lKS5sZW5ndGggfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZFNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbihERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuICAgIH1cblxuICAgIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsidGhpcyIsIm9ic2lkaWFuIiwiTWFya2Rvd25WaWV3Iiwibm9ybWFsaXplUGF0aCIsImdldERhaWx5Tm90ZVNldHRpbmdzIiwiU3VnZ2VzdE1vZGFsIiwiRnV6enlTdWdnZXN0TW9kYWwiLCJOb3RpY2UiLCJURmlsZSIsIkZpbGVWaWV3IiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJwYXJzZUZyb250TWF0dGVyRW50cnkiLCJ1dWlkdjQiLCJwYXJzZUZyb250TWF0dGVyQWxpYXNlcyIsImFwcEhhc0RhaWx5Tm90ZXNQbHVnaW5Mb2FkZWQiLCJnZXRBbGxEYWlseU5vdGVzIiwiZ2V0RGFpbHlOb3RlIiwiY3JlYXRlRGFpbHlOb3RlIiwiVEZvbGRlciIsImJhc2U2NFRvQXJyYXlCdWZmZXIiLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMs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U0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUk7QUFDdEQsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxF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LENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxD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QUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzlCLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFDRDtBQUNBLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUN4QixFQUFFLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyRjtBQUNBO0FBQ0EsRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENB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
