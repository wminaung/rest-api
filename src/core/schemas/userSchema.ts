import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  profilePicture: z.string().url().optional().nullable(),
  bio: z
    .string()
    .max(250, "Bio must be at most 250 characters")
    .optional()
    .nullable(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  profilePicture: z.string().url().optional().nullable(),
  bio: z.string().max(250).optional().nullable(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
