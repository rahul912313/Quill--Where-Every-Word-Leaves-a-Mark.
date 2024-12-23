import { Hono } from "hono";
import { createPrisma } from "../../lib/prisma";
import { sign } from "hono/jwt";
import authMiddleware from "../../middlewares/authMiddleware";
import { loginSchema, signupSchema } from "@onerahul/quill-common-app";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.json({
    message: "Hello there from User router",
  });
});

// Login Route
userRouter.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const { success } = loginSchema.safeParse(body);
    if (!success) {
      return c.json({
        message: "Invalid input format",
      });
    }
    const prisma = createPrisma(c.env);

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({
        message: "User not found with this email",
      });
    }

    if (user.password !== body.password) {
      c.status(401);
      return c.json({
        message: "Invalid Password",
      });
    }

    const payload = {
      id: user.id,
      // exp: Math.floor(Date.now() / 1000) + 60 * 1000,
    };
    const secret = c.env.JWT_SECRET;
    const token = await sign(payload, secret);

    return c.json({
      message: "Logged in Successfully",
      user: {
        id: user.id,
        email: user.email,
      },
      token: token,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

// Signup Route
userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = createPrisma(c.env);
    const { success } = signupSchema.safeParse(body);
    if (!success) {
      return c.json({
        message: "Invalid input format",
      });
    }

    if (!body.email || !body.password || !body.name) {
      return c.json({
        message: "Email, password, and name are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json({
        message: "User already exists",
      });
    }

    // const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    // Signing up the JWT
    const payload = {
      id: user.id,
      // exp: Math.floor(Date.now() / 1000) + 60 * 1000,
    };

    const secret = c.env.JWT_SECRET;

    const token = await sign(payload, secret);

    return c.json({
      message: "Signup Successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

userRouter.get("/me", authMiddleware, async (c) => {
  try {
    const prisma = createPrisma(c.env);
    const user = await prisma.user.findUnique({
      where: {
        id: c.get("userId"),
      },
    });
    if (!user) {
      return c.json({
        message: "User not found",
      });
    }
    return c.json({
      message: "User fetched successfully",
      user,
    });
  } catch (e) {
    return c.json({
      message: "Internal Server Error",
    });
  }
});

export default userRouter;
