import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    name: "Quest GP API",
    status: "running",
  });
});

export default {
  port: 3001,
  fetch: app.fetch,
};