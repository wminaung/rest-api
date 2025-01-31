import { Response } from "express";
import { BaseError, UnexpectedError } from "./../../errors";
import { ErrorFormatter } from "../helpers/ErrorFormatter";

export class ErrorHandler {
  private formatter: ErrorFormatter;

  constructor(formatter: ErrorFormatter) {
    this.formatter = formatter;
  }

  public handleError(err: unknown, res: Response): void {
    if (err instanceof BaseError) {
      res.status(err.status).json(this.formatter.formatErrorResponse(err));
    } else {
      const error = new UnexpectedError();
      res.status(error.status).json(this.formatter.formatErrorResponse(error));
    }
  }
}
