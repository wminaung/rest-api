import { CategoryDTO } from "../../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../schemas/categorySchema";
import { JwtAuthPayload } from "../../../types/jwtAuthPayload";

export interface ICategoryService {
  create(
    createCategoryData: CreateCategorySchema,
    user?: JwtAuthPayload
  ): Promise<CategoryDTO>;
  getAll(): Promise<CategoryDTO[]>;
  get(categoryId: string): Promise<CategoryDTO | null>;
  update(
    categoryId: string,
    updateCategoryData: UpdateCategorySchema,
    user?: JwtAuthPayload
  ): Promise<CategoryDTO>;
  delete(categoryId: string, user?: JwtAuthPayload): Promise<CategoryDTO>;
}
