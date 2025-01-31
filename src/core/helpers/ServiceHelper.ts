import { ValidationError } from "../../errors";
import { checkIdSchema } from "../schemas/checkIdSchema";

export class ServiceHelper {
  /**
   * Validates the provided id against the predefined schema. If the id is valid,
   * it returns the parsed id. Otherwise, it throws a ValidationError.
   *
   * @param id - The id to validate by the schema.
   * @returns The validated id format should string.
   * @throws ValidationError - If the id is invalid means it does not match the schema.
   */

  getValidId(id: string): string {
    const { success, data, error } = checkIdSchema.safeParse({ id });

    if (error || !success) {
      throw new ValidationError(error);
    }
    return data.id;
  }
}
