import express from "express";
import cors from "cors";
import { crawl } from "./utils/crawler";
import { isAuthed } from "./utils/auth";

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

api.get("/url2md", async (req, res) => {
  const proxyUrl = req.query.url; // get a query param value (?url=...)

  if (!(typeof proxyUrl === "string")) {
    return res.status(400).send({ message: "Invalid query param" });
  }

  // get auth token from header
  const authorization = req.headers.authorization;
  if (!isAuthed(authorization)) {
    return res.status(401).end("Unauthorized request");
  }

  try {
    let article = await crawl(proxyUrl);

    res.status(200).send({
      title: article.title,
      content: article.markdown,
      excerpt: article.excerpt,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to crawl" });
  }

  return undefined;
});

// Version the api
app.use("/api", api);
