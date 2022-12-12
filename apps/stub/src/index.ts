import consola from "consola";
import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config();
consola.wrapConsole();

const server = http.createServer(app);
const port = process.env.PORT || 8081;

server.listen(port, () => {
  consola.info(`Server started on port: ${port}`);
});
