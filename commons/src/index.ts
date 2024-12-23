import z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3),
});

const postSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

type loginSchemaType = z.infer<typeof loginSchema>;
type signupSchemaType = z.infer<typeof signupSchema>;
type postSchemaType = z.infer<typeof postSchema>;
type updatePostSchemaType = z.infer<typeof updatePostSchema>;

export {
  loginSchema,
  signupSchema,
  postSchema,
  updatePostSchema,
  type loginSchemaType,
  type signupSchemaType,
  type postSchemaType,
  type updatePostSchemaType,
};
