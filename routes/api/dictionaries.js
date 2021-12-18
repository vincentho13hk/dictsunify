"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var dictionary_config_json_1 = __importDefault(require("../../config/dictionary_config.json"));
var router = express_1.default.Router();
router.get("/list", function (req, res) {
    var supportedDictionaries = dictionary_config_json_1.default.dictionaries.map(function (dict) { return dict.name; });
    res.json({
        supportedDictionaries: supportedDictionaries,
    });
});
module.exports = router;
