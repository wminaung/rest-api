import { z } from "zod";

export const createMediaSchema = z.object({
  url: z.string(),
  type: z.enum(["IMAGE", "VIDEO"]),
  userId: z.string().optional().nullable(),
  postId: z.string().optional().nullable(),
});

export const updateMediaSchema = z.object({
  url: z.string().optional(),
  type: z.enum(["IMAGE", "VIDEO"]).optional(),
  postId: z.string().optional().nullable(),
});

// Type inference from zod schema
export type CreateMediaSchema = z.infer<typeof createMediaSchema>;
export type UpdateMediaSchema = z.infer<typeof updateMediaSchema>;
