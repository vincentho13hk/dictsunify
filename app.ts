import express from "express";
import createError from "http-errors";
import { createServer } from "http";
import axios from "axios";
import cors from "cors";
import { JSDOM } from "jsdom";
import path from "path";
import logger from "morgan";
import api from "./routes/api";
import Puppeteer from "puppeteer";
import screenshotConfig from "./config/screenshot_config.json";

const { json, urlencoded } = express;

const app = express();
const PORT = process.env.PORT || 3000;
const screenshotsPath = screenshotConfig.path;
// CORS
const allowedOrigins = ["http://localhost:3001"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/screenshots", express.static(path.join(__dirname, screenshotsPath)));

// api routers
app.use("/api", api);

// GET /api/ping
app.get("/api/ping", async (req, res) => {
  res.json({
    success: true,
  });
  return;
});

// GET /api/posts
app.get("/api/test", async (req, res) => {
  let word = "word";
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.macmillandictionary.com/", {
    waitUntil: "networkidle2",
  });
  // await page.type("input[name=p]", word);
  await page.focus("input[name=q]");
  await page.keyboard.type(word);
  await page.keyboard.press("Enter");

  await page.waitForNavigation();
  const content = await page.$("ol.senses");
  if (content) {
    const box = await content.boundingBox(); // this method returns an array of geometric parameters of the element in pixels.
    if (box) {
      const x = box["x"]; // coordinate x
      const y = box["y"]; // coordinate y
      const w = box["width"]; // area width
      const h = box["height"]; // area height
      const screenshotPath = `${screenshotsPath}/macmillan_${word}.png`;
      await page.screenshot({
        path: screenshotPath,
        clip: { x: x, y: y, width: w, height: h },
      }); // take screenshot of the required area in puppeteer

      await browser.close(); // close browser
      res.sendFile(path.resolve(__dirname, screenshotPath));
    } else {
      res.status(400).send({
        error: "box not found",
      });
    }
  } else {
    res.status(400).send({
      error: "content not found",
    });
  }
});

app.use("/", express.static("client/build"));
app.get("/*", (req, res) => {
  res.sendFile(
    require("path").resolve(__dirname, "client", "build", "index.html")
  );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

const server = createServer(app);
server.listen({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});

export = app;
