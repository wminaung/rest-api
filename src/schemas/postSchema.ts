import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  userId: z.string(),
  categoryId: z.string().optional().nullable(),
});

export const updatePostSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  content: z.string().min(10).optional(),
  categoryId: z.string().optional().nullable(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
