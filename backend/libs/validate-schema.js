import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters"),
});

export { registerSchema, loginSchema };
