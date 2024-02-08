import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { extract_from_html } from "./extracter";

puppeteer.use(StealthPlugin());

export async function crawl(url: string, headless: boolean = true) {
  let article = {
    title: "",
    content: "",
    markdown: "",
    excerpt: "",
  };
  try {
    const browser = await puppeteer.launch({
      headless,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle0" });

    const html = await page.content();

    article = await extract_from_html(html, url);

    await browser.close();
  } catch (err) {
    console.error(err);
  }

  return article;
}
