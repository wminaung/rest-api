import { Response } from "express";
import { ErrorFormatter } from "../helpers/ErrorFormatter";
import { ErrorHandler } from "../utils/ErrorHandler";

export class Controller {
  private errorHandler: ErrorHandler;
  constructor() {
    const errorFormatter = new ErrorFormatter();
    this.errorHandler = new ErrorHandler(errorFormatter);
  }

  public handleError(err: unknown, res: Response): void {
    this.errorHandler.handleError(err, res);
  }
}
