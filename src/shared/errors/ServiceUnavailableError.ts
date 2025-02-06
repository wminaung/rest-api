import { ErrorCode } from "../enums/ErrorCode";
import { BaseError } from "./BaseError";

export class ServiceUnavailableError extends BaseError {
  constructor(message: string = "Service unavailable") {
    super(message, 503, ErrorCode.SERVICE_UNAVAILABLE);
  }
}
