import { ZodError } from "zod";
import { CategoryDTO } from "../dtos/CategoryDTO";
import { ICategoryRepo } from "../repositories/interfaces/ICategoryRepo";
import {
  createCategorySchema,
  CreateCategorySchema,
} from "../schemas/categorySchema";

export class CategoryService {
  constructor(private categoryRepo: ICategoryRepo) {}

  async createCategory(data: CreateCategorySchema): Promise<CategoryDTO> {
    try {
      createCategorySchema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw error;
    }
    return this.categoryRepo.createCategory(data);
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    return this.categoryRepo.getAllCategories();
  }
}
