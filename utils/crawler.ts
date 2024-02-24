import type { Browser } from "puppeteer";
import { KnownDevices } from "puppeteer";
import { extract_from_html } from "./extracter";
import { createBrowser } from "./puppeteer";

export async function crawl(url: string) {
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

    await page.goto(url, { waitUntil: "networkidle0" });

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
