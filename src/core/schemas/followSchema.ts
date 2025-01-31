import { z } from "zod";

export const createFollowSchema = z
  .object({
    followerId: z.string().uuid(),
    followingId: z.string().uuid(),
  })
  .superRefine((data, ctx) => {
    if (data.followerId === data.followingId) {
      ctx.addIssue({
        code: "custom",
        message: "A user cannot follow themselves.",
      });
    }
  });

export type CreateFollowSchema = z.infer<typeof createFollowSchema>;
