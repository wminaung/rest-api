import { type ZodError } from "zod";
import { BaseError } from "./BaseError";
import { ErrorCode } from "../enums/ErrorCode";

export const formatZodErrorMessages = (err: ZodError) => {
  return err.errors.map((e) => e.message).join(", ");
};

export class ValidationError extends BaseError {
  constructor(err: ZodError) {
    super(formatZodErrorMessages(err), 400, ErrorCode.VALIDATION_ERROR);
  }
}
