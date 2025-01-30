import { ValidationError } from "../../errors";
import { checkIdSchema } from "../schemas/checkIdSchema";

/**
 * Takes an id and returns the id if it is valid (i.e., can be parsed by
 * checkIdSchema), otherwise throws a ZodError.
 * @param id the id to validate
 * @returns the validated id
 * @throws ZodError if the id is invalid
 */
export const getValidId = (id: string): string => {
  const { success, data, error } = checkIdSchema.safeParse({ id });

  if (error || !success) {
    throw new ValidationError(error);
  }
  return data.id;
};
