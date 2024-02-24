import type { VercelRequest, VercelResponse } from "@vercel/node";
import { crawl } from "../utils/crawler";
import { isAuthed } from "../utils/auth";
import type { PuppeteerLifeCycleEvent } from "puppeteer";

export const maxDuration = 60;

const validWaitUntilSet = new Set([
  "load",
  "domcontentloaded",
  "networkidle0",
  "networkidle2",
]);

export default async function (req: VercelRequest, res: VercelResponse) {
  const { url, waitUntil } = req.query;

  let urlStr = Array.isArray(url) ? url[0] : url;
  let waitUntilStr = "networkidle0";
  if (typeof waitUntil === "string" && validWaitUntilSet.has(waitUntil)) {
    waitUntilStr = waitUntil;
  }

  if (!urlStr) {
    return res.status(400).end(`No url provided`);
  }

  // get auth token from header
  const authorization = req.headers.authorization;
  if (!isAuthed(authorization)) {
    return res.status(401).end("Unauthorized request");
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
