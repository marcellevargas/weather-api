const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.google.com/search?q=tempo+rio+de+janeiro");

  const weather = await page.evaluate(() => {
    return {
      tempoAtual: document.getElementById("wob_tm").innerText,
      chanceChuva: document.getElementById("wob_pp").innerText,
      umidade: document.getElementById("wob_hm").innerText,
      vento: document.getElementById("wob_ws").innerText,
    };
  });

  console.log(weather);
  await browser.close();
})();
