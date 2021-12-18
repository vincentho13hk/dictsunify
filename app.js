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
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var http_1 = require("http");
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var morgan_1 = __importDefault(require("morgan"));
var api_1 = __importDefault(require("./routes/api"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var screenshot_config_json_1 = __importDefault(require("./config/screenshot_config.json"));
var json = express_1.default.json, urlencoded = express_1.default.urlencoded;
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
var screenshotsPath = screenshot_config_json_1.default.path;
// CORS
var allowedOrigins = ["http://localhost:3001"];
var options = {
    origin: allowedOrigins,
};
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/screenshots", express_1.default.static(path_1.default.join(__dirname, screenshotsPath)));
// api routers
app.use("/api", api_1.default);
// GET /api/ping
app.get("/api/ping", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json({
            success: true,
        });
        return [2 /*return*/];
    });
}); });
// GET /api/posts
app.get("/api/test", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var word, browser, page, content, box, x, y, w, h, screenshotPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                word = "word";
                return [4 /*yield*/, puppeteer_1.default.launch()];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://www.macmillandictionary.com/", {
                        waitUntil: "networkidle2",
                    })];
            case 3:
                _a.sent();
                // await page.type("input[name=p]", word);
                return [4 /*yield*/, page.focus("input[name=q]")];
            case 4:
                // await page.type("input[name=p]", word);
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
                return [4 /*yield*/, page.$("ol.senses")];
            case 8:
                content = _a.sent();
                if (!content) return [3 /*break*/, 14];
                return [4 /*yield*/, content.boundingBox()];
            case 9:
                box = _a.sent();
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
                _a.sent(); // take screenshot of the required area in puppeteer
                return [4 /*yield*/, browser.close()];
            case 11:
                _a.sent(); // close browser
                res.sendFile(path_1.default.resolve(__dirname, screenshotPath));
                return [3 /*break*/, 13];
            case 12:
                res.status(400).send({
                    error: "box not found",
                });
                _a.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                res.status(400).send({
                    error: "content not found",
                });
                _a.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); });
app.use(express_1.default.static("client/build"));
app.get("*", function (req, res) {
    res.sendFile(require("path").resolve(__dirname, "client", "build", "index.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});
var server = (0, http_1.createServer)(app);
server.listen({ port: PORT }, function () {
    console.log("Server is running on port ".concat(PORT));
});
module.exports = app;
