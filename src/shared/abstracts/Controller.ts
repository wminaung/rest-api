import { Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

export abstract class Controller {
  protected handleError(error: unknown, res: Response): void {
    ErrorHandler.handleError(error, res);
  }

  protected sendOk(res: Response, data: any): void {
    res.status(200).json(data);
  }

  protected sendCreated(res: Response, data: any): void {
    res.status(201).json(data);
  }
}
