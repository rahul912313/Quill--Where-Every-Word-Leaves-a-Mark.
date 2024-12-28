import { Hono } from "hono";
import rootRouter from "../src/route/index";
import { createPrisma } from "../src/lib/prisma";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// CORS Middleware
app.use("*", async (c, next) => {
  c.res.headers.append("Access-Control-Allow-Origin", "*"); // Allow all origins
  c.res.headers.append(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  c.res.headers.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  await next();
});

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
