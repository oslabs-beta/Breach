const { BrowserWindow, app } = require("electron");
const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");
const { JSDOM } = require("jsdom");

// const main = async () => {
//   await pie.initialize(app);
//   const browser = await pie.connect(app, puppeteer);

//   const window = new BrowserWindow();
//   const url = "https://example.com/";
//   await window.loadURL(url);

//   const page = await pie.getPage(browser, window);
//   console.log(page.url());
//   window.destroy();
// };

const webScrape = {
  scrape: async (url) => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);
    const window = new BrowserWindow();
    const page = await pie.getPage(browser, window);
    await page.goto(url, { waitUntil: "networkidle2" });

    const content = await page.content();

    const cookies = await page.cookies();

    cookiesResult = cookies.map((c) => c.secure);

    console.log(cookiesResult);

    console.log(cookiesResult.some((e) => e === false));

    if (cookiesResult.some((e) => e === false)) {
      console.log("some cookies are insecure");
    } else {
      console.log("all cookies secure");
    }
    // await page.type(
    //   input.type === "text",
    //   `<img src="" onerror='alert("hello")'>`
    // );
    // await page.keyboard.press("Enter");

    // page.on("dialog", async (dialog) => {
    //   console.log(dialog.message());
    //   //await dialog.dismiss();
    // });

    // await page.keyboard.press("Enter");

    await window.destroy();

    // page.on('requestfailed', console.error.bind(console, 'REQUEST_FAILED:')

    // await page.$$eval("input", (el) => (el[value] = "test@example.com"));

    // const html = await page.content();

    // console.log(html);

    // const dom = new JSDOM(html);

    // console.log(dom.window.document.querySelectorAll("input").value);

    // await page.type("input", "Value");

    // const list = await page.evaluateHandle(() => {
    //   return Array.from(document.getElementsByTagName("input")).map((a) => {
    //     return a.value;
    //   });
    // });

    // console.log("55 ", list);
  },
};

module.exports = webScrape;
