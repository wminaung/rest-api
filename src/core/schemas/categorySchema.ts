import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1),
});

// Type inference from zod schema
export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export type UpdateCategorySchema = Partial<CreateCategorySchema>;
