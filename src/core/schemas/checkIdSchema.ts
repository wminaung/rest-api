import { z } from "zod";

export const checkIdSchema = z.object({
  id: z.string().min(1),
});

// Type inference from zod schema
export type CheckIdSchema = z.infer<typeof checkIdSchema>;
