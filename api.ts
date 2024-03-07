import express from "express";
import cors from "cors";
import { isAuthed } from "./utils/auth";
import { html2md, url2md } from "./routers";

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

api.get("/url2md", url2md);

api.post("/html2md", html2md);

// Version the api
app.use(
  "/api",
  (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!isAuthed(authorization)) {
      res.status(401).end("Unauthorized request");
      return;
    }
    next();
  },
  api
);
