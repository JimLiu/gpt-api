import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAuthed } from "../utils/auth";
import { html2md } from "../routers";

export default async function (req: VercelRequest, res: VercelResponse) {
  // get auth token from header
  // TODO: move it to a middleware, but couldn't find a way to do it in Vercel
  // https://vercel.com/docs/functions
  const authorization = req.headers.authorization;
  if (!isAuthed(authorization)) {
    res.status(401).end("Unauthorized request");
    return;
  }

  html2md(req, res);
}
