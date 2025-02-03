import { CategoryDTO } from "../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../schemas/categorySchema";

export interface ICategoryRepo {
  createCategory(data: CreateCategorySchema): Promise<CategoryDTO>;
  getAllCategories(): Promise<CategoryDTO[]>;
  getCategoryById(id: string): Promise<CategoryDTO | null>;
  updateCategory(id: string, data: UpdateCategorySchema): Promise<CategoryDTO>;
  deleteCategory(id: string): Promise<CategoryDTO>;
}
