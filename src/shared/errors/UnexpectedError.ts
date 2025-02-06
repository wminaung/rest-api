import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class UnexpectedError extends BaseError {
  constructor(message = "An unexpected error occurred") {
    super(message, 500, ErrorCode.UNEXPECTED_ERROR);
  }
}
