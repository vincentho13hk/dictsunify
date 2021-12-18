import express from "express";
import dictionaryConfig from "../../config/dictionary_config.json";
let router = express.Router();
router.get("/list", (req, res) => {
  const supportedDictionaries = dictionaryConfig.dictionaries.map(
    (dict) => dict.name
  );
  res.json({
    supportedDictionaries,
  });
});

export = router;
