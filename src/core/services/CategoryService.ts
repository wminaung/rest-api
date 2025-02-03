import { CategoryDTO } from "../../dtos/CategoryDTO";
import { ICategoryRepo } from "../repositories/interfaces/ICategoryRepo";
import {
  createCategorySchema,
  CreateCategorySchema,
  updateCategorySchema,
  UpdateCategorySchema,
} from "../../schemas/categorySchema";
import { Service } from "./Service";

export class CategoryService extends Service {
  constructor(private categoryRepo: ICategoryRepo) {
    super();
  }

  async createCategory(data: CreateCategorySchema): Promise<CategoryDTO> {
    const safeData = this.validate(data, createCategorySchema);
    return this.categoryRepo.createCategory(safeData);
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    return this.categoryRepo.getAllCategories();
  }

  async getCategoryById(id: string): Promise<CategoryDTO | null> {
    const validId = this.getValidId(id);
    return this.categoryRepo.getCategoryById(validId);
  }

  async updateCategory(
    id: string,
    data: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    const validId = this.getValidId(id);
    const safeData = this.validate(data, updateCategorySchema);
    return this.categoryRepo.updateCategory(validId, safeData);
  }

  async deleteCategory(id: string): Promise<CategoryDTO> {
    const validId = this.getValidId(id);
    return this.categoryRepo.deleteCategory(validId);
  }

  //******** CategoryService ******** */
}
