import { CategoryDTO } from "../../dtos/CategoryDTO";
import { CreateCategorySchema } from "../../schemas/CreateCategorySchema";

export interface IUserRepo {
  getAllCategories(): Promise<CategoryDTO[]>;
  getCategoryById(id: string): Promise<CategoryDTO | null>;
  createCategory(data: CreateCategorySchema): Promise<CategoryDTO>;
  updateCategory(
    id: string,
    data: Partial<{ name: string; profilePicture: string; bio: string }>
  ): Promise<CategoryDTO>;
  deleteCategory(id: string): Promise<CategoryDTO>;
}
