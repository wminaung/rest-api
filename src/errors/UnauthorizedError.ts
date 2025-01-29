import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized access") {
    super(message, 401);
  }
}
