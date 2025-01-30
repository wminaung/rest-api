// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { handleError } from "../utils/errorHandler";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../schemas/categorySchema";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async createCategory(
    req: Request<{}, {}, CreateCategorySchema>,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const category = await this.categoryService.createCategory(data);
      res.status(201).json(category);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async getCategoryById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json(category);
      }
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async updateCategory(
    req: Request<{ id: string }, {}, UpdateCategorySchema>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const category = await this.categoryService.updateCategory(id, data);
      res.status(200).json(category);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async deleteCategory(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const category = await this.categoryService.deleteCategory(id);
      res.status(200).json(category);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  //* end
}
