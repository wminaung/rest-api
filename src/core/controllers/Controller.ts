import { Response } from "express";
import { ErrorFormatter } from "../helpers/ErrorFormatter";
import { ErrorHandler } from "../utils/ErrorHandler";

export abstract class Controller {
  private errorHandler: ErrorHandler;
  constructor() {
    const errorFormatter = new ErrorFormatter();
    this.errorHandler = new ErrorHandler(errorFormatter);
  }

  protected handleError(err: unknown, res: Response): void {
    this.errorHandler.handleError(err, res);
  }

  protected sendOk(res: Response, data: any): void {
    res.status(200).json(data);
  }

  protected sendCreated(res: Response, data: any): void {
    res.status(201).json(data);
  }
}
