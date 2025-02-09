import { Request, Response } from "express";
import { Controller } from "../../../shared/abstracts/Controller";
import { UpdatePostSchema } from "../../../shared/schemas/postSchema";
import { IPostService } from "../interfaces/IPostService";

export class PostController extends Controller {
  private static instance: PostController;
  static getInstance(postService: IPostService): PostController {
    if (!PostController.instance) {
      PostController.instance = new PostController(postService);
    }
    return PostController.instance;
  }

  constructor(private postService: IPostService) {
    super();
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const post = await this.postService.create({ ...data }, req.user);
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
      const post = await this.postService.update(id, data, req.user);
      this.sendOk(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const post = await this.postService.delete(id, req.user);
      this.sendOk(res, post);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  // note: by-methods
  async GetPostsByUserId(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const posts = await this.postService.getPostsByUserId(id);
      this.sendOk(res, posts);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCategory(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params.id;
      const category = await this.postService.getCategoryByPostId(id);
      this.sendOk(res, category);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  //** end ** */
}
