import { serve } from "@hono/node-server";
import { app } from "../lambdalith";

serve({
  fetch: app.fetch,
  port: 8080,
});
