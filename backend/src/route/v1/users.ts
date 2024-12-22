import { Hono } from "hono";

const userRouter = new Hono();

userRouter.get("/", (c) => {
  return c.json({
    message: "Hello there from User router",
  });
});

userRouter.post("/login", (c) => {
  return c.json({
    message: "Logging in",
  });
});

userRouter.post("/signup", (c) => {
  return c.json({
    message: "Signing Up",
  });
});

export default userRouter;
