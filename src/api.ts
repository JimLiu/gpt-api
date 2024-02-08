import express from "express";
import cors from "cors";
import { extract_from_html } from "./utils/extracter";

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

// Healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

const api = express.Router();

api.get("/hello", (req, res) => {
  res.status(200).send({ message: "hello world" });
});

api.get("/html", async (req, res) => {
  const proxyUrl = req.query.url; // get a query param value (?proxyUrl=...)

  if (!(typeof proxyUrl === "string")) {
    return new Response("Bad request: Missing `url` query param", {
      status: 400,
    });
  }

  // make subrequests with the global `fetch()` function
  let res1 = await fetch(proxyUrl);

  const html = await res1.text();

  let article = await extract_from_html(html, proxyUrl);

  res.status(200).send({
    title: article.title,
    markdown: article.markdown,
    excerpt: article.excerpt,
  });

  return undefined;
});

// Version the api
app.use("/api", api);
