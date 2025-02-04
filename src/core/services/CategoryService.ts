import { CategoryDTO } from "../../dtos/CategoryDTO";
import { ICategoryRepo } from "../repositories/interfaces/ICategoryRepo";
import {
  createCategorySchema,
  CreateCategorySchema,
  updateCategorySchema,
  UpdateCategorySchema,
} from "../../schemas/categorySchema";
import { Service } from "./Service";
import { ICategoryService } from "./serviceInterface/ICategoryService";

export class CategoryService extends Service implements ICategoryService {
  constructor(private categoryRepo: ICategoryRepo) {
    super();
  }

  async create(createCategoryData: CreateCategorySchema): Promise<CategoryDTO> {
    const safeData = this.validate(createCategoryData, createCategorySchema);
    return this.categoryRepo.create(safeData);
  }

  async getAll(): Promise<CategoryDTO[]> {
    return this.categoryRepo.getAll();
  }

  async get(categoryId: string): Promise<CategoryDTO | null> {
    const validId = this.getValidId(categoryId);
    return this.categoryRepo.get(validId);
  }

  async update(
    categoryId: string,
    updateCategoryData: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    const validId = this.getValidId(categoryId);
    const safeData = this.validate(updateCategoryData, updateCategorySchema);
    return this.categoryRepo.update(validId, safeData);
  }

  async delete(categoryId: string): Promise<CategoryDTO> {
    const validId = this.getValidId(categoryId);
    return this.categoryRepo.delete(validId);
  }

  //******** CategoryService ******** */
}
