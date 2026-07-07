import { OpenAPIHono } from "@hono/zod-openapi";
import { globalErrorHandler } from "./config/globalErrorHandler";
import { apiControllers } from "./controllers";

export const serverApp = new OpenAPIHono().basePath("/api");

serverApp.onError(globalErrorHandler);

serverApp.doc("/swagger", (c) => ({
  info: {
    title: "TanStack Start Opinionated API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
  servers: [
    {
      description: "Current environment",
      url: new URL(c.req.url).origin,
    },
  ],
}));

serverApp.get("/docs", (c) =>
  c.html(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Docs</title>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="/api/swagger"
      data-configuration='{"defaultOpenAllTags":true}'
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>`),
);

for (const controller of apiControllers) {
  serverApp.route("/", controller);
}
