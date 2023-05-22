const express = require("express");
const app = express();
const puppeteer = require("puppeteer");
const router = require("express").Router();

let city = "";

async function weather_data(city) {
  if (city) {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: ["--incognito", "--no-sandbox", "--single-process", "--no-zygote"],
    });
    const page = await browser.newPage();

    await page.goto(
      "https://www.google.com/search?q=tempo+rio+de+janeiro+graus+celsius"
    );

    const weather = await page.evaluate(() => {
      return {
        tempoAtual: document.getElementById("wob_tm").innerText,
        chanceChuva: document.getElementById("wob_pp").innerText,
        umidade: document.getElementById("wob_hm").innerText,
        vento: document.getElementById("wob_ws").innerText,
      };
    });

    await browser.close();
    return weather;
  }
  else {
    return "Please send a City"
  }
}

router.get("/", async (res) => {
  try {
    const post = await weather_data(city);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  city = req.body.city;
  try {
    const post = await weather_data(city);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
