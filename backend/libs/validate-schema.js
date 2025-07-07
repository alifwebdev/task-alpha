import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be 6 characters"),
});

const verfyEmailSchema = z.object({
  token: z.string().min(1, "Tocken is required"),
});

export { registerSchema, loginSchema, verfyEmailSchema };
