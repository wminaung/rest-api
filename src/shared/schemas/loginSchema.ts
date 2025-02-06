import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?=.{8,})/,
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
