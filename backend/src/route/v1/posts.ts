import { Hono } from "hono";
import { createPrisma } from "../../lib/prisma";

const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

postRouter.get("/", (c) => {
  return c.json({
    message: "Hello there from Post router",
  });
});

// Fetch a single post by id in params
postRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = createPrisma(c.env);

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!post) {
      return c.json({
        message: "Post not found",
      });
    }

    return c.json({
      message: "Post fetched successfully",
      post,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Fetch all posts
postRouter.get("/", async (c) => {
  try {
    const prisma = createPrisma(c.env);
    const posts = await prisma.post.findMany();
    if (!posts) {
      return c.json({
        message: "No posts found",
      });
    }
    return c.json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Add a new post
postRouter.post("/post", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = createPrisma(c.env);

    const userId = "dwfwge";

    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: userId,
      },
    });

    return c.json({
      message: "Post added successfully",
      post: {
        title: post.title,
        description: post.description,
      },
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Update a post
postRouter.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = createPrisma(c.env);

    const body = await c.req.json();

    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return c.json({
      message: "Post updated successfully",
      post,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

export default postRouter;
