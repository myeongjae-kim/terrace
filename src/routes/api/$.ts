import { createFileRoute } from "@tanstack/react-router";
import { serverApp } from "#/api/serverApp";

const handler = ({ request }: { request: Request }) => serverApp.fetch(request);

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      DELETE: handler,
      GET: handler,
      HEAD: handler,
      OPTIONS: handler,
      PATCH: handler,
      POST: handler,
      PUT: handler,
    },
  },
});
