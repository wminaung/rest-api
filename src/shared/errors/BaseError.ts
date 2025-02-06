import { ErrorCode } from "../enums/ErrorCode";

export class BaseError extends Error {
  public status: number;
  public code: ErrorCode;

  constructor(
    message: string = "An unexpected error occurred",
    status: number = 500,
    code: ErrorCode
  ) {
    super(message);
    this.name = this.constructor.name; // Dynamic name based on class name
    this.status = status;
    this.code = code;
    Error.captureStackTrace(this, this.constructor); // Captures stack trace
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
