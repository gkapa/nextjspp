const { https } = require("firebase-functions");
const { default: next } = require("next");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const isDev = process.env.NODE_ENV !== "production";
const nextServer = next({ dev: isDev, conf: { distDir: ".next" } });
const functionUrl = isDev
  ? process.env.LOCAL_FUNCTION_URL
  : process.env.FUNCTIONS_URL;
console.log({
  NODE_ENV: process.env.NODE_ENV,
  functionUrl: functionUrl,
});

const nextjsHandle = nextServer.getRequestHandler();

exports.customServer = https.onRequest(async (req, res) => {
  await nextServer.prepare();
  return nextjsHandle(req, res);
});

if (isDev) {
  nextServer
    .prepare()
    .then(() => {
      const port = parseInt(process.env.PORT, 10) || 3000;
      const app = express();

      // app.use(
      //   "/api",
      //   createProxyMiddleware({
      //     target: functionUrl,
      //     changeOrigin: true,
      //   }),
      // );

      app.all("*", (req, res) => {
        return nextjsHandle(req, res);
      });

      app.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("Error:::::", err);
    });
}
