import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Request, Response } from "express";
import { crawl } from "../utils/crawler";
import type { PuppeteerLifeCycleEvent } from "puppeteer";

export const maxDuration = 60;

const validWaitUntilSet = new Set([
  "load",
  "domcontentloaded",
  "networkidle0",
  "networkidle2",
]);

export async function url2md(
  req: VercelRequest | Request,
  res: VercelResponse | Response
) {
  const { url, waitUntil } = req.query;

  let urlStr = Array.isArray(url) ? url[0] : url;
  let waitUntilStr = "networkidle0";
  if (typeof waitUntil === "string" && validWaitUntilSet.has(waitUntil)) {
    waitUntilStr = waitUntil;
  }

  if (!(typeof urlStr === "string")) {
    return res.status(400).end(`No url provided`);
  }

  try {
    let article = await crawl(urlStr, {
      waitUntil: waitUntilStr as PuppeteerLifeCycleEvent,
    });

    return res.status(200).send({
      title: article.title,
      content: article.markdown,
      excerpt: article.excerpt,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Failed to crawl" });
  }
}
