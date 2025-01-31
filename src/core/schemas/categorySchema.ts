import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
});

// Type inference from zod schema
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
