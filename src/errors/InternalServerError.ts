import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal server error") {
    super(message, 500);
  }
}
