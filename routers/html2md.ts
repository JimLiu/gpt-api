import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { Request, Response } from "express";
import { extract_from_html } from "../utils/extracter";

export async function html2md(
  req: VercelRequest | Request,
  res: VercelResponse | Response
) {
  const { html, url } = req.body;

  if (!html) {
    return res.status(400).end(`No html provided`);
  }

  const article = await extract_from_html(html, url);

  return res.status(200).send({
    title: article.title,
    content: article.markdown,
    excerpt: article.excerpt,
  });
}
