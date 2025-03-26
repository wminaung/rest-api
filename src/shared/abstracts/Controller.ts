import { Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

export abstract class Controller {
  protected handleError<T = unknown>(error: T, res: Response): void {
    ErrorHandler.handleError(error, res);
  }

  protected sendOk<T = unknown>(res: Response, data: T): void {
    res.status(200).json(data);
  }

  protected sendCreated<T = unknown>(res: Response, data: T): void {
    res.status(201).json(data);
  }
}
