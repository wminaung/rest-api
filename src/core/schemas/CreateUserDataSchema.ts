import { z } from "zod";

export const createUserDataSchema = z.object({
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

export type CreateUserData = z.infer<typeof createUserDataSchema>;
