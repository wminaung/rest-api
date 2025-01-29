import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  constructor(message: string = "Conflict occurred") {
    super(message, 409);
  }
}
