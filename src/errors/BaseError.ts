export class BaseError extends Error {
  status: number;

  constructor(
    message: string = "An unexpected error occurred",
    status: number = 500
  ) {
    super(message);
    this.name = this.constructor.name; // Dynamic name based on class name
    this.status = status;
    Error.captureStackTrace(this, this.constructor); // Captures stack trace
  }
}
