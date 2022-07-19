const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const port = 3000;

async function weather_data() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto("https://www.google.com/search?q=tempo+rio+de+janeiro+graus+celsius");

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

app.get("/", (req, res) => {
    // weather_data().then((data) => {
    //   res.json({ data: data });
    // });
    res.json({ data: 'data' });
});

app.listen(port || 3000, () => {
  console.log(`Running in http://localhost:${port}`);
});
