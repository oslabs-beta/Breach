const { BrowserWindow, app } = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');
const { JSDOM } = require('jsdom');

const webScrape = {
  cookieTester: async (url) => {
    url = url.replace('alert', '');
    console.log(url);
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);
    const window = new BrowserWindow();

    const page = await pie.getPage(browser, window);

    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');

    // //const content = await page.content();

    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.evaluate((_) => {
      function xcc_contains(selector, text) {
        var elements = document.querySelectorAll(selector);
        return Array.prototype.filter.call(elements, function (element) {
          return RegExp(text, 'i').test(element.textContent.trim());
        });
      }
      var _xcc;
      _xcc = xcc_contains(
        '[id*=cookie] a, [class*=cookie] a, [id*=cookie] button, [class*=cookie] button',
        '^(Alle akzeptieren|Akzeptieren|Verstanden|Zustimmen|Okay|OK)$'
      );
      if (_xcc != null && _xcc.length != 0) {
        _xcc[0].click();
      }
    });

    var content = await page._client.send('Network.getAllCookies');

    console.log(content);

    const safety = content.cookies.map((c) => {
      return c.httpOnly;
    });

    if (safety.every((e) => e === false)) {
      console.log('This website does not have httpSecure cookies!');
    } else if (safety.some((e) => e === false)) {
      console.log('some cookies do not use httpOnly');
    } else if (safety.length === 0) {
      console.log('No cookies recieved');
    } else {
      console.log('cookies secure');
    }

    await browser.close();
  },
  jqueryXSS: async (url) => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);
    const window = new BrowserWindow();

    const page = await pie.getPage(browser, window);

    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');
    await client.send('Network.clearBrowserCache');

    page.on('dialog', async (dialog) => {
      console.log('here ', dialog._message);
      await window.destroy();
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
    });

    await page.keyboard.press('Enter');
    await browser.close();
  },
};

module.exports = webScrape;
