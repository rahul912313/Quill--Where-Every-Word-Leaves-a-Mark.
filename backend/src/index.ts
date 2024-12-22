import { Hono } from "hono";

const app = new Hono();
import rootRouter from "../src/route/index";

app.route("api/v1", rootRouter);
app.get("/", (c) => {
  return c.text("Hello from Root router!");
});

app.notFound((c) => {
  return c.json(
    {
      message: "Route not found",
    },
    404
  );
});

export default app;
