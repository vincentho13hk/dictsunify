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
  if (dictionary === "macmillan") {
    const browser = await Puppeteer.launch({
      args: puppeteerLaunchArgs,
    });
    const page = await browser.newPage();
    await page.goto("https://www.macmillandictionary.com/", {
      waitUntil: "networkidle2",
    });
    // Enter the word and search
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
  } else if (dictionary === "wordreference_enzh") {
    const browser = await Puppeteer.launch({
      args: puppeteerLaunchArgs,
    });
    const page = await browser.newPage();
    await page.goto("https://www.wordreference.com/enzh/", {
      waitUntil: "networkidle2",
    });
    // Enter the word and search
    await page.focus("input#si");
    await page.keyboard.type(word);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const content = await page.$("div#articleWRD > table.WRD");
    if (content) {
      const box = await content.boundingBox(); // this method returns an array of geometric parameters of the element in pixels.
      if (box) {
        const x = box["x"]; // coordinate x
        const y = box["y"]; // coordinate y
        const w = box["width"]; // area width
        const h = box["height"]; // area height
        const screenshotPath = `${screenshotsPath}/${dictionary}_${word}.png`;
        await page.screenshot({
          path: screenshotPath,
          clip: { x: x, y: y, width: w, height: h },
        }); // take screenshot of the required area in puppeteer

        await browser.close(); // close browser
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
  } else if (dictionary === "etymonline") {
    const browser = await Puppeteer.launch({
      args: puppeteerLaunchArgs,
    });
    const page = await browser.newPage();
    await page.goto("https://www.etymonline.com/", {
      waitUntil: "networkidle2",
    });
    // Enter the word and search
    await page.focus("input[name=q]");
    await page.keyboard.type(word);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const searchList = await page.$("div[class^='searchList']");
    if (searchList) {
      const content = await searchList?.$x("following-sibling::*");
      const screenshotPath = `${screenshotsPath}/${dictionary}_${word}.png`;
      await content[0].screenshot({
        path: screenshotPath,
      }); // take screenshot of the required area in puppeteer
      return {
        create: true,
      };
    } else {
      return {
        create: false,
        error: "content not found",
      };
    }
  } else if (dictionary === "wordreference_englishusage") {
    const browser = await Puppeteer.launch({
      args: puppeteerLaunchArgs,
    });
    const page = await browser.newPage();
    await page.goto("https://www.wordreference.com/EnglishUsage/", {
      waitUntil: "networkidle2",
    });
    // Enter the word and search
    await page.focus("input#si");
    await page.keyboard.type(word);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const content = await page.$("div.entry");
    if (content) {
      const screenshotPath = `${screenshotsPath}/${dictionary}_${word}.png`;
      await content.screenshot({
        path: screenshotPath,
      }); // take screenshot of the required area in puppeteer
      return {
        create: true,
      };
    } else {
      return {
        create: false,
        error: "content not found",
      };
    }
  } else if (dictionary === "wordreference_engdefinition") {
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
  } else if (dictionary === "vocabulary_com_definition") {
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
  } else if (dictionary === "vocabulary_com_usage") {
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
        element,
        2
      );
    } else {
      return {
        create: false,
        error: "dictionary not found",
      };
    }
  } else {
    return {
      create: false,
      error: "dictionary not found",
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
};
