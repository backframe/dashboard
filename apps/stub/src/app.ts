import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { hasAdmin } from "./db.js";
import _router from "./routes/index.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount stub routes
app.use("/_/api/", _router);
app.use("/_admin", async (_req, res) => {
  // check if installer set manually
  const {
    headers: { host },
    protocol,
    originalUrl: ogUrl,
  } = _req;
  const isInitialReq = ogUrl === "/_admin" || ogUrl === "/_admin/";

  // TODO: use-cookies, if no cookie, go to login, if cookie but not valid, go login
  // if(isInitialReq && !res.hasCookie("")) {}

  if (isInitialReq && !(await hasAdmin())) {
    return res.redirect(`${protocol}://${host}${ogUrl}?bf_installer#`);
  }

  if (ogUrl.includes("bf_installer") && (await hasAdmin())) {
    return res.redirect(`${protocol}://${host}/_admin/`);
  }

  res.sendFile(path.join(__dirname, "../../ui/dist/index.html"));
});
app.use("/_/static", express.static(path.join(__dirname, "../../ui/dist")));

export default app;
