import { Request, Response } from "express";

export interface IController {
  create(req: Request, res: Response): Promise<void>;
  getAll(req: Request, res: Response): Promise<void>;
  get(req: Request, res: Response): Promise<void>;
  update(req: Request, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
