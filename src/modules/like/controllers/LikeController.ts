import { Request, Response } from "express";
import { Controller } from "../../../shared/abstracts/Controller";
import { IController } from "../../../shared/interfaces/IController";
import { ILikeService } from "../interfaces/ILikeService";

export class LikeController extends Controller {
  constructor(private readonly likeService: ILikeService) {
    super();
  }
  async create(req: Request, res: Response): Promise<void> {
    try {
      const like = await this.likeService.create(req.body, req.user);
      this.sendCreated(res, like);
    } catch (error) {
      this.handleError(error, res);
    }
  }
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const likes = await this.likeService.getAll();
      this.sendOk(res, likes);
    } catch (error) {
      this.handleError(error, res);
    }
  }
  async get(req: Request, res: Response): Promise<void> {
    try {
      const likes = await this.likeService.get(req.params.id);
      this.sendOk(res, likes);
    } catch (error) {
      this.handleError(error, res);
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const likes = await this.likeService.delete(req.params.id, req.user);
      this.sendOk(res, likes);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // ** End Of Class ** //
}
