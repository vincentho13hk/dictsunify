import e from "express";
import fs from "fs";
import path from "path";
import Puppeteer from "puppeteer-extra";
import screenshotConfig from "../config/screenshot_config.json";
import dictionaryConfig from "../config/dictionary_config.json";
import AdblockPlugin from "puppeteer-extra-plugin-adblocker";
const screenshotsPath = screenshotConfig.path;
Puppeteer.use(AdblockPlugin());

const puppeteerLaunchArgs = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--single-process",
];

export const findScreenshots = (
  dictionary: string,
  word: string
): string | null => {
  const screenshotPath = path.join(
    process.cwd(),
    screenshotConfig.path,
    `${dictionary}_${word}.png`
  );
  if (fs.existsSync(screenshotPath)) {
    return screenshotPath;
  } else {
    return null;
  }
};

export const createScreenshots = async (
  dictionary: string,
  word: string
): Promise<{ create: boolean; error?: string }> => {
  try {
    const { url, searchElement, element } =
      dictionaryConfig.dictionaries.filter(
        (dict) => dict.name === dictionary
      )[0];
    if (searchElement && element) {
      return tryToCaptureScreenshot(
        dictionary,
        word,
        url,
        searchElement,
        element
      );
    } else {
      return {
        create: false,
        error: "dictionary not found",
      };
    }
  } catch (err) {
    return {
      create: false,
      error: `error on capturing ${dictionary}`,
    };
  }
};

const tryToCaptureScreenshot = async (
  dictionary: string,
  word: string,
  url: string,
  searchElement: string,
  element: string,
  delay?: number
): Promise<{ create: boolean; error?: string }> => {
  try {
    const browser = await Puppeteer.launch({
      args: puppeteerLaunchArgs,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    // Enter the word and search
    await page.focus(searchElement);
    await page.keyboard.type(word);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    if (delay) {
      await page.waitForTimeout(delay * 1000);
    }
    const content = await page.$(element);
    if (content) {
      const box = await content.boundingBox();
      if (box) {
        const x = box["x"]; // coordinate x
        const y = box["y"]; // coordinate y
        const w = box["width"]; // area width
        const h = box["height"]; // area height

        const screenshotPath = `${screenshotsPath}/${dictionary}_${word}.png`;
        await content.screenshot({
          path: screenshotPath,
          clip: { x: x, y: y, width: w, height: h },
        }); // take screenshot of the required area in puppeteer
        return {
          create: true,
        };
      } else {
        return {
          create: false,
          error: "box not found",
        };
      }
    } else {
      return {
        create: false,
        error: "content not found",
      };
    }
  } catch (err) {
    return {
      create: false,
      error: String(err) || "Error on capturing screen",
    };
  }
};
