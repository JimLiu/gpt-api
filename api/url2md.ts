import type { VercelRequest, VercelResponse } from "@vercel/node";
import { crawl } from "../utils/crawler";

export default async function (req: VercelRequest, res: VercelResponse) {
  const { url } = req.query;

  let urlStr = Array.isArray(url) ? url[0] : url;

  if (!urlStr) {
    return res.status(400).end(`No url provided`);
  }

  try {
    let article = await crawl(urlStr);

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
