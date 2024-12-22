import { Hono } from "hono";

import userRouter from "./v1/users";
import postRouter from "./v1/posts";

const rootRouter = new Hono();

rootRouter.route("/users", userRouter);
rootRouter.route("/posts", postRouter);

export default rootRouter;
