import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { Controller } from "./Controller";
import { UpdatePostSchema } from "../../schemas/postSchema";

export class PostController extends Controller {
  constructor(private postService: PostService) {
    super();
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const post = await this.postService.create(data);
      this.sendCreated(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const posts = await this.postService.getAll();
      this.sendOk(res, posts);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async get(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const post = await this.postService.get(id);
      this.sendOk(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async update(
    req: Request<{ id: string }, {}, UpdatePostSchema>,
    res: Response
  ) {
    try {
      const id = req.params.id;
      const data = req.body;
      const post = await this.postService.update(id, data);
      this.sendOk(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const post = await this.postService.delete(id);
      this.sendOk(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCategory(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const category = await this.postService.getCategory(id);
      this.sendOk(res, category);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  //** end ** */
}
