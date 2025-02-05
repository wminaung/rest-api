import { z } from "zod";

export const createLikeSchema = z.object({
  userId: z.string(),
  postId: z.string().optional().nullable(),
  commentId: z.string().optional().nullable(),
});

// Type inference from zod schema
export type CreateLikeSchema = z.infer<typeof createLikeSchema>;
