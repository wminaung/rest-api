import { z } from "zod";

export const createFollowSchema = z
  .object({
    followerId: z.string(),
    followingId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.followerId === data.followingId) {
      ctx.addIssue({
        code: "custom",
        message: "A user cannot follow themselves.",
      });
    }
  });

export const deleteFollowSchema = z
  .object({
    followerId: z.string(),
    followingId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.followerId === data.followingId) {
      ctx.addIssue({
        code: "custom",
        message: "A user cannot unfollow themselves.",
      });
    }
  });

export type CreateFollowSchema = z.infer<typeof createFollowSchema>;
export type DeleteFollowSchema = z.infer<typeof deleteFollowSchema>;
