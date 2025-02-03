import { Response } from "express";
import { BaseError, UnexpectedError } from "./../errors";
import { ErrorFormatter } from "../helpers/ErrorFormatter";

export class ErrorHandler {
  constructor() {}

  static handleError(err: unknown, res: Response): void {
    if (err instanceof BaseError) {
      res.status(err.status).json(ErrorFormatter.formatErrorResponse(err));
    } else {
      const error = new UnexpectedError();
      res.status(error.status).json(ErrorFormatter.formatErrorResponse(error));
    }
  }
}
