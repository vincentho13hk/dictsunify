import express from "express";
import words from "./words";
import dicionaries from "./dictionaries";
let router = express.Router();

router.use("/words", words);
router.use("/dictionaries", dicionaries);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});

export = router;
