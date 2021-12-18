"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var words_1 = __importDefault(require("./words"));
var dictionaries_1 = __importDefault(require("./dictionaries"));
var router = express_1.default.Router();
router.use("/words", words_1.default);
router.use("/dictionaries", dictionaries_1.default);
router.use(function (req, res, next) {
    var error = new Error("Not Found");
    next(error);
});
module.exports = router;
