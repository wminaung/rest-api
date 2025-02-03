import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  constructor(message: string = "Conflict") {
    super(message, 409, ErrorCode.CONFLICT);
  }
}
