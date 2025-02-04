import { CategoryDTO } from "../../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../schemas/categorySchema";

export interface ICategoryRepo {
  create(data: CreateCategorySchema): Promise<CategoryDTO>;
  getAll(): Promise<CategoryDTO[]>;
  get(id: string): Promise<CategoryDTO | null>;
  update(id: string, data: UpdateCategorySchema): Promise<CategoryDTO>;
  delete(id: string): Promise<CategoryDTO>;
}
