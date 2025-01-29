import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message: string = "Invalid input") {
    super(message, 400);
  }
}
