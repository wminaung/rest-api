import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string(),
});

export const updateTagSchema = z.object({
  name: z.string().optional(),
});

// Type inference from zod schema
export type CreateTagSchema = z.infer<typeof createTagSchema>;
export type UpdateTagSchema = z.infer<typeof updateTagSchema>;
