import { type ZodError } from "zod";
import { BaseError } from "./BaseError";
import { ErrorCode } from "../enums/ErrorCode";

export const formatZodErrorMessages = (err: ZodError) => {
  return err.errors.map((e) => e.message).join(", ");
};

export class ValidationError extends BaseError {
  /**
   * Creates a new ValidationError instance from a ZodError.
   * @param err ZodError to format
   */
  constructor(err: ZodError) {
    super(formatZodErrorMessages(err), 400, ErrorCode.VALIDATION_ERROR);
  }
}
