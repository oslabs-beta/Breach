const { BrowserWindow, app } = require("electron");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const { JSDOM } = require("jsdom");

const webScrape = {
  scrape: async (url) => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);
    const window = new BrowserWindow();

    const page = await pie.getPage(browser, window);

    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");

    await page.goto(url, { waitUntil: "networkidle2" });

    //const content = await page.content();

    await page.evaluate((_) => {
      function xcc_contains(selector, text) {
        var elements = document.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function (element) {
          return RegExp(text, "i").test(element.textContent.trim());
        });
      }
      var _xcc;
      _xcc = xcc_contains(
        "[id*=cookie] a, [class*=cookie] a, [id*=cookie] button, [class*=cookie] button",
        "^(Alle akzeptieren|Akzeptieren|Verstanden|Zustimmen|Okay|OK)$"
      );
      if (_xcc != null && _xcc.length != 0) {
        _xcc[0].click();
      }
    });

    var content = await page._client.send("Network.getAllCookies");

    console.log(content);

    const safety = content.cookies.map((c) => {
      return [c.httpOnly, c.secure];
    });

    if (safety.some((e) => e.includes(false))) {
      console.log("some cookies might be insecure");
    } else {
      console.log("all cookies secure");
    }

    await window.destroy();
  },
};

module.exports = webScrape;
