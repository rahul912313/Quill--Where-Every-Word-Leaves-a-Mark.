import { Context, Next } from "hono";
import { verify } from "hono/jwt";

const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({
      message: "Unauthorized Access",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const secret = c.env.JWT_SECRET;

    const decoded = await verify(token, secret);
    if (!decoded) {
      c.status(401);
      return c.json({
        message: "Unauthorized Access",
      });
    }

    c.set("userId", decoded.id);
    await next();
  } catch (e) {
    c.status(401);
    return c.json({
      message: "Internal Server error in auth middleware",
    });
  }
};

export default authMiddleware;
