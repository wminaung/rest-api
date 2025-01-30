import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden access") {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}
