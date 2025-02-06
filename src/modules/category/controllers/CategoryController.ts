// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../shared/schemas/categorySchema";
import { Controller } from "../../../shared/abstracts/Controller";
import { CategoryService } from "../services/CategoryService";
export class CategoryController extends Controller {
  constructor(private categoryService: CategoryService) {
    super();
  }

  async create(
    req: Request<{}, {}, CreateCategorySchema>,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const category = await this.categoryService.create(data);
      res.status(201).json(category);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAll();
      res.status(200).json(categories);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  async get(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.categoryService.get(id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  async update(
    req: Request<{ id: string }, {}, UpdateCategorySchema>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const category = await this.categoryService.update(id, data);
      res.status(200).json(category);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.categoryService.delete(id);
      res.status(200).json(category);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  //* end CategoryController
}
