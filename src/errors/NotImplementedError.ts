import { BaseError } from "./BaseError";

export class NotImplementedError extends BaseError {
  constructor(message: string = "Not implemented") {
    super(message, 501);
  }
}
