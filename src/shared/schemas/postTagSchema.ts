import { z } from "zod";

export const createPostTagSchema = z.object({
  postId: z.string(),
  tagId: z.string(),
});

export type CreatePostTagSchema = z.infer<typeof createPostTagSchema>;
