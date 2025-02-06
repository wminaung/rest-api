import { Response } from "express";
import { ErrorHandler } from "../utils/ErrorHandler";

export abstract class Controller {
  protected handleError(err: unknown, res: Response): void {
    ErrorHandler.handleError(err, res);
  }

  protected sendOk(res: Response, data: any): void {
    res.status(200).json(data);
  }

  protected sendCreated(res: Response, data: any): void {
    res.status(201).json(data);
  }
}
