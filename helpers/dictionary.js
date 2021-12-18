"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScreenshots = exports.findScreenshots = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
var screenshot_config_json_1 = __importDefault(require("../config/screenshot_config.json"));
var dictionary_config_json_1 = __importDefault(require("../config/dictionary_config.json"));
var puppeteer_extra_plugin_adblocker_1 = __importDefault(require("puppeteer-extra-plugin-adblocker"));
var screenshotsPath = screenshot_config_json_1.default.path;
puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_adblocker_1.default)());
var findScreenshots = function (dictionary, word) {
    var screenshotPath = path_1.default.join(process.cwd(), screenshot_config_json_1.default.path, "".concat(dictionary, "_").concat(word, ".png"));
    if (fs_1.default.existsSync(screenshotPath)) {
        return screenshotPath;
    }
    else {
        return null;
    }
};
exports.findScreenshots = findScreenshots;
var createScreenshots = function (dictionary, word) { return __awaiter(void 0, void 0, void 0, function () {
    var browser_1, page, content, box, x, y, w, h, screenshotPath, browser_2, page, content, box, x, y, w, h, screenshotPath, browser_3, page, searchList, content, screenshotPath, browser_4, page, content, screenshotPath, _a, url, searchElement, element, _b, url, searchElement, element, _c, url, searchElement, element;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!(dictionary === "macmillan")) return [3 /*break*/, 16];
                return [4 /*yield*/, puppeteer_extra_1.default.launch()];
            case 1:
                browser_1 = _d.sent();
                return [4 /*yield*/, browser_1.newPage()];
            case 2:
                page = _d.sent();
                return [4 /*yield*/, page.goto("https://www.macmillandictionary.com/", {
                        waitUntil: "networkidle2",
                    })];
            case 3:
                _d.sent();
                // Enter the word and search
                return [4 /*yield*/, page.focus("input[name=q]")];
            case 4:
                // Enter the word and search
                _d.sent();
                return [4 /*yield*/, page.keyboard.type(word)];
            case 5:
                _d.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 6:
                _d.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 7:
                _d.sent();
                return [4 /*yield*/, page.$("ol.senses")];
            case 8:
                content = _d.sent();
                if (!content) return [3 /*break*/, 14];
                return [4 /*yield*/, content.boundingBox()];
            case 9:
                box = _d.sent();
                if (!box) return [3 /*break*/, 12];
                x = box["x"];
                y = box["y"];
                w = box["width"];
                h = box["height"];
                screenshotPath = "".concat(screenshotsPath, "/macmillan_").concat(word, ".png");
                return [4 /*yield*/, page.screenshot({
                        path: screenshotPath,
                        clip: { x: x, y: y, width: w, height: h },
                    })];
            case 10:
                _d.sent(); // take screenshot of the required area in puppeteer
                return [4 /*yield*/, browser_1.close()];
            case 11:
                _d.sent(); // close browser
                return [2 /*return*/, {
                        create: true,
                    }];
            case 12: return [2 /*return*/, {
                    create: false,
                    error: "box not found",
                }];
            case 13: return [3 /*break*/, 15];
            case 14: return [2 /*return*/, {
                    create: false,
                    error: "content not found",
                }];
            case 15: return [3 /*break*/, 58];
            case 16:
                if (!(dictionary === "wordreference_enzh")) return [3 /*break*/, 32];
                return [4 /*yield*/, puppeteer_extra_1.default.launch()];
            case 17:
                browser_2 = _d.sent();
                return [4 /*yield*/, browser_2.newPage()];
            case 18:
                page = _d.sent();
                return [4 /*yield*/, page.goto("https://www.wordreference.com/enzh/", {
                        waitUntil: "networkidle2",
                    })];
            case 19:
                _d.sent();
                // Enter the word and search
                return [4 /*yield*/, page.focus("input#si")];
            case 20:
                // Enter the word and search
                _d.sent();
                return [4 /*yield*/, page.keyboard.type(word)];
            case 21:
                _d.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 22:
                _d.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 23:
                _d.sent();
                return [4 /*yield*/, page.$("div#articleWRD > table.WRD")];
            case 24:
                content = _d.sent();
                if (!content) return [3 /*break*/, 30];
                return [4 /*yield*/, content.boundingBox()];
            case 25:
                box = _d.sent();
                if (!box) return [3 /*break*/, 28];
                x = box["x"];
                y = box["y"];
                w = box["width"];
                h = box["height"];
                screenshotPath = "".concat(screenshotsPath, "/").concat(dictionary, "_").concat(word, ".png");
                return [4 /*yield*/, page.screenshot({
                        path: screenshotPath,
                        clip: { x: x, y: y, width: w, height: h },
                    })];
            case 26:
                _d.sent(); // take screenshot of the required area in puppeteer
                return [4 /*yield*/, browser_2.close()];
            case 27:
                _d.sent(); // close browser
                return [2 /*return*/, {
                        create: true,
                    }];
            case 28: return [2 /*return*/, {
                    create: false,
                    error: "box not found",
                }];
            case 29: return [3 /*break*/, 31];
            case 30: return [2 /*return*/, {
                    create: false,
                    error: "content not found",
                }];
            case 31: return [3 /*break*/, 58];
            case 32:
                if (!(dictionary === "etymonline")) return [3 /*break*/, 45];
                return [4 /*yield*/, puppeteer_extra_1.default.launch()];
            case 33:
                browser_3 = _d.sent();
                return [4 /*yield*/, browser_3.newPage()];
            case 34:
                page = _d.sent();
                return [4 /*yield*/, page.goto("https://www.etymonline.com/", {
                        waitUntil: "networkidle2",
                    })];
            case 35:
                _d.sent();
                // Enter the word and search
                return [4 /*yield*/, page.focus("input[name=q]")];
            case 36:
                // Enter the word and search
                _d.sent();
                return [4 /*yield*/, page.keyboard.type(word)];
            case 37:
                _d.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 38:
                _d.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 39:
                _d.sent();
                return [4 /*yield*/, page.$("div[class^='searchList']")];
            case 40:
                searchList = _d.sent();
                if (!searchList) return [3 /*break*/, 43];
                return [4 /*yield*/, (searchList === null || searchList === void 0 ? void 0 : searchList.$x("following-sibling::*"))];
            case 41:
                content = _d.sent();
                screenshotPath = "".concat(screenshotsPath, "/").concat(dictionary, "_").concat(word, ".png");
                return [4 /*yield*/, content[0].screenshot({
                        path: screenshotPath,
                    })];
            case 42:
                _d.sent(); // take screenshot of the required area in puppeteer
                return [2 /*return*/, {
                        create: true,
                    }];
            case 43: return [2 /*return*/, {
                    create: false,
                    error: "content not found",
                }];
            case 44: return [3 /*break*/, 58];
            case 45:
                if (!(dictionary === "wordreference_englishusage")) return [3 /*break*/, 57];
                return [4 /*yield*/, puppeteer_extra_1.default.launch()];
            case 46:
                browser_4 = _d.sent();
                return [4 /*yield*/, browser_4.newPage()];
            case 47:
                page = _d.sent();
                return [4 /*yield*/, page.goto("https://www.wordreference.com/EnglishUsage/", {
                        waitUntil: "networkidle2",
                    })];
            case 48:
                _d.sent();
                // Enter the word and search
                return [4 /*yield*/, page.focus("input#si")];
            case 49:
                // Enter the word and search
                _d.sent();
                return [4 /*yield*/, page.keyboard.type(word)];
            case 50:
                _d.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 51:
                _d.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 52:
                _d.sent();
                return [4 /*yield*/, page.$("div.entry")];
            case 53:
                content = _d.sent();
                if (!content) return [3 /*break*/, 55];
                screenshotPath = "".concat(screenshotsPath, "/").concat(dictionary, "_").concat(word, ".png");
                return [4 /*yield*/, content.screenshot({
                        path: screenshotPath,
                    })];
            case 54:
                _d.sent(); // take screenshot of the required area in puppeteer
                return [2 /*return*/, {
                        create: true,
                    }];
            case 55: return [2 /*return*/, {
                    create: false,
                    error: "content not found",
                }];
            case 56: return [3 /*break*/, 58];
            case 57:
                if (dictionary === "wordreference_engdefinition") {
                    _a = dictionary_config_json_1.default.dictionaries.filter(function (dict) { return dict.name === dictionary; })[0], url = _a.url, searchElement = _a.searchElement, element = _a.element;
                    if (searchElement && element) {
                        return [2 /*return*/, tryToCaptureScreenshot(dictionary, word, url, searchElement, element)];
                    }
                    else {
                        return [2 /*return*/, {
                                create: false,
                                error: "dictionary not found",
                            }];
                    }
                }
                else if (dictionary === "vocabulary_com_definition") {
                    _b = dictionary_config_json_1.default.dictionaries.filter(function (dict) { return dict.name === dictionary; })[0], url = _b.url, searchElement = _b.searchElement, element = _b.element;
                    if (searchElement && element) {
                        return [2 /*return*/, tryToCaptureScreenshot(dictionary, word, url, searchElement, element)];
                    }
                    else {
                        return [2 /*return*/, {
                                create: false,
                                error: "dictionary not found",
                            }];
                    }
                }
                else if (dictionary === "vocabulary_com_usage") {
                    _c = dictionary_config_json_1.default.dictionaries.filter(function (dict) { return dict.name === dictionary; })[0], url = _c.url, searchElement = _c.searchElement, element = _c.element;
                    if (searchElement && element) {
                        return [2 /*return*/, tryToCaptureScreenshot(dictionary, word, url, searchElement, element, 2)];
                    }
                    else {
                        return [2 /*return*/, {
                                create: false,
                                error: "dictionary not found",
                            }];
                    }
                }
                else {
                    return [2 /*return*/, {
                            create: false,
                            error: "dictionary not found",
                        }];
                }
                _d.label = 58;
            case 58: return [2 /*return*/];
        }
    });
}); };
exports.createScreenshots = createScreenshots;
var tryToCaptureScreenshot = function (dictionary, word, url, searchElement, element, delay) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, content, box, x, y, w, h, screenshotPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer_extra_1.default.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto(url, {
                        waitUntil: "networkidle2",
                    })];
            case 3:
                _a.sent();
                // Enter the word and search
                return [4 /*yield*/, page.focus(searchElement)];
            case 4:
                // Enter the word and search
                _a.sent();
                return [4 /*yield*/, page.keyboard.type(word)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.keyboard.press("Enter")];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 7:
                _a.sent();
                if (!delay) return [3 /*break*/, 9];
                return [4 /*yield*/, page.waitForTimeout(delay * 1000)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [4 /*yield*/, page.$(element)];
            case 10:
                content = _a.sent();
                if (!content) return [3 /*break*/, 15];
                return [4 /*yield*/, content.boundingBox()];
            case 11:
                box = _a.sent();
                if (!box) return [3 /*break*/, 13];
                x = box["x"];
                y = box["y"];
                w = box["width"];
                h = box["height"];
                screenshotPath = "".concat(screenshotsPath, "/").concat(dictionary, "_").concat(word, ".png");
                return [4 /*yield*/, content.screenshot({
                        path: screenshotPath,
                        clip: { x: x, y: y, width: w, height: h },
                    })];
            case 12:
                _a.sent(); // take screenshot of the required area in puppeteer
                return [2 /*return*/, {
                        create: true,
                    }];
            case 13: return [2 /*return*/, {
                    create: false,
                    error: "box not found",
                }];
            case 14: return [3 /*break*/, 16];
            case 15: return [2 /*return*/, {
                    create: false,
                    error: "content not found",
                }];
            case 16: return [2 /*return*/];
        }
    });
}); };
