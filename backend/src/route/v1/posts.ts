import { Hono } from "hono";

const postRouter = new Hono();

postRouter.get("/", (c) => {
  return c.json({
    message: "Hello there from Post router",
  });
});

postRouter.get("/:id", (c) => {
  return c.json({
    message: `Fetching post with id`,
  });
});

postRouter.get("/", (c) => {
  return c.json({
    message: "Returning all post",
  });
});

postRouter.post("/", (c) => {
  return c.json({
    message: "Add a post",
  });
});

postRouter.put("/:id", (c) => {
  return c.json({
    message: "Update a post",
  });
});

export default postRouter;
