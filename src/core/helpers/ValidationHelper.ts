import { z } from "zod";
import { ValidationError } from "../../errors";

export class ValidationHelper {
  /**
   * Validates the provided data against the specified zod schema.
   * @param dataToValidate - The data object to be validated.
   * @param schema - The zod schema to validate the data against.
   * @returns The validated data if validation is successful.
   * @throws {ValidationError} If the validation fails.
   */
  static validate<T>(dataToValidate: T, schema: z.ZodType<T>): T {
    const { success, data, error } = schema.safeParse(dataToValidate);

    if (error || !success) {
      throw new ValidationError(error);
    }

    return data;
  }
}
