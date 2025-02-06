import { z } from "zod";
import { ServiceHelper } from "../helpers/ServiceHelper";
import { ValidationHelper } from "../helpers/ValidationHelper";
import { JwtAuthPayload } from "../types/jwtAuthPayload";
import { UnauthorizedError } from "../errors";

export abstract class Service {
  /**
   * Returns the validated id if it is valid, otherwise throws ValidationError.
   * Uses checkIdSchema to validate the id.
   * @param id - The id to be validated.
   * @returns The validated id if validation is successful.
   * @throws {ValidationError} If the validation fails.
   */
  protected getValidId(id: string): string {
    return ServiceHelper.getValidId(id);
  }

  /**
   * Validates the provided data against the specified zod schema.
   * Delegates validation to ValidationHelper.
   * @param dataToValidate - The data object to be validated.
   * @param schema - The zod schema to validate the data against.
   * @returns The validated data if validation is successful.
   * @throws {ValidationError} If the validation fails.
   */

  protected validate<T>(dataToValidate: T, schema: z.ZodType<T>): T {
    return ValidationHelper.validate(dataToValidate, schema);
  }

  /**
   * Throws UnauthorizedError if user payload is not available.
   * If user payload is available, returns the user payload.
   * @param user - The user payload to be checked.
   * @returns The user payload if it is available.
   * @throws {UnauthorizedError} If the user payload is not available.
   */
  protected hasAuthUserOrThrow(user?: JwtAuthPayload) {
    if (!user || !user.id || !user.email) {
      throw new UnauthorizedError("need user jwt payload");
    }
    return user;
  }

  //***  end class ***/
}
