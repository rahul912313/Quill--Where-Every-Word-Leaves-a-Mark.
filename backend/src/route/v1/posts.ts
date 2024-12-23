import { Hono } from "hono";
import { createPrisma } from "../../lib/prisma";
import authMiddleware from "../../middlewares/authMiddleware";

const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Fetch a single post by id in params
postRouter.get("/:id", authMiddleware, async (c) => {
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
postRouter.post("/post", authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const prisma = createPrisma(c.env);

    const post = await prisma.post.create({
      data: {
        title: body.title,
        description: body.description,
        authorId: c.get("userId"),
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
postRouter.put("/:id", authMiddleware, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = createPrisma(c.env);

    const body = await c.req.json();

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
    if (post.authorId !== c.get("userId")) {
      return c.json({
        message: "You are not authorized to update this post",
      });
    }

    const updatedPost = await prisma.post.update({
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
      updatedPost,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

export default postRouter;
