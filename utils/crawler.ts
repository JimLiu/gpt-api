import type { Browser, PuppeteerLifeCycleEvent } from "puppeteer";
import { KnownDevices } from "puppeteer";
import { extract_from_html } from "./extracter";
import { createBrowser } from "./puppeteer";

// TODO: Set cookie for each domain
/**
const setCookie = async (page: Page, cookie: string, url: string) => {
  // parse cookie string
  const cookies = cookie.split(";").map((pair) => {
    const [name, value] = pair.split("=");
    return { name: name.trim(), value: value.trim() };
  });

  // set cookies
  await page.setCookie(...cookies.map((c) => ({ ...c, url })));
};
*/

export async function crawl(
  url: string,
  options: {
    timeout?: number;
    waitUntil?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
  } = {
    waitUntil: "networkidle0",
    timeout: 60000,
  }
) {
  let article = {
    title: "",
    content: "",
    markdown: "",
    excerpt: "",
  };
  let browser: Browser | null = null;
  try {
    browser = await createBrowser();
    const iPhone = KnownDevices["iPhone 13"];
    const page = await browser.newPage();
    await page.setUserAgent(iPhone.userAgent);
    await page.emulate(iPhone);

    await page.goto(url, {
      waitUntil: options.waitUntil,
      timeout: options.timeout,
    });

    const html = await page.content();
    article = await extract_from_html(html, url);

    await browser.close();
    browser = null;
  } catch (err) {
    console.error(err);
    try {
      await browser?.close();
    } catch (e) {
      console.error(e);
    }
    throw new Error("Failed to crawl");
  }

  return article;
}
