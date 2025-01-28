import { z } from "zod";

export const createCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

// Type inference from zod schema
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
