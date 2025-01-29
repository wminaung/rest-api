export class NotFoundError extends Error {
  status: number;

  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }
}
