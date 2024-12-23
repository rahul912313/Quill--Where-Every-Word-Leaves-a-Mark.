import { Hono } from "hono";
import rootRouter from "../src/route/index";
import { createPrisma } from "../src/lib/prisma";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.route("api/v1", rootRouter);
app.get("/", (c) => {
  const prisma = createPrisma(c.env);
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
