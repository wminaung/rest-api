import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}
