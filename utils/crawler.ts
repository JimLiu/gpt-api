import type { Browser } from "puppeteer";
import { extract_from_html } from "./extracter";
import { createBrowser } from "./puppeteer";

const defaultUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36";

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
    const page = await browser.newPage();
    await page.setUserAgent(defaultUserAgent);

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
