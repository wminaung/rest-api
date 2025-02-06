import { ValidationError } from "../errors";
import { checkIdSchema } from "../../schemas/checkIdSchema";

export class ServiceHelper {
  static saltRounds: number = 10;

  /**
   * Returns the validated id if it is valid, otherwise throws ValidationError.
   * Uses checkIdSchema to validate the id.
   * @param id - The id to be validated.
   * @returns The validated id if validation is successful.
   * @throws {ValidationError} If the validation fails.
   */
  static getValidId(id: string): string {
    const { success, data, error } = checkIdSchema.safeParse({ id });

    if (error || !success) {
      throw new ValidationError(error);
    }
    return data.id;
  }

  /**
   * Returns the validated password if it is valid, otherwise throws ValidationError.
   * Uses passwordValidationSchema to validate the password.
   * @param password - The password to be validated.
   * @returns The validated password if validation is successful.
   * @throws {ValidationError} If the validation fails.
   */

  //*** end of class */
}
