import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal server error") {
    super(message, 500, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
