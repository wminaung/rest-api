import { BaseError } from "./BaseError";

export class ServiceUnavailableError extends BaseError {
  constructor(message: string = "Service unavailable") {
    super(message, 503);
  }
}
