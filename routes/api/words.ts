import express from "express";
import { createScreenshots, findScreenshots } from "../../helpers/dictionary";
import dictionaryConfig from "../../config/dictionary_config.json";

let router = express.Router();

router.get("/:word/:dictionary", async (req, res, next) => {
  if (!req.params) {
    const error = new Error("No Params Passed");
    next(error);
  } else if (!req.params.dictionary) {
    const error = new Error("No Dictionary Passed");
    next(error);
  } else if (!req.params.word) {
    const error = new Error("No Word Passed");
    next(error);
  } else if (req.params.word === "" || req.params.dictionary === "") {
    const error = new Error("Empty Word/Dictionary Passed");
    next(error);
  } else if (
    dictionaryConfig.dictionaries.filter(
      (dictionary) => dictionary.name === req.params.dictionary
    ).length === 0
  ) {
    const error = new Error("Dictionary Not Found");
    next(error);
  } else {
    const dictionary = req.params.dictionary;
    const word = req.params.word;
    if (findScreenshots(dictionary, word)) {
      return res.json({
        exist: true,
      });
    } else {
      const { create, error } = await createScreenshots(dictionary, word);
      if (create) {
        return res.json({
          exist: false,
          create,
        });
      } else {
        return res.json({
          exist: false,
          create: false,
          error,
        });
      }
    }
  }
});

export = router;
