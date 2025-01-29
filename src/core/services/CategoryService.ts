import { CategoryDTO } from "../dtos/CategoryDTO";
import { ICategoryRepo } from "../repositories/interfaces/ICategoryRepo";
import {
  createCategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../schemas/categorySchema";
import { getValidId } from "../utils/getValidId";

export class CategoryService {
  constructor(private categoryRepo: ICategoryRepo) {}

  async createCategory(data: CreateCategorySchema): Promise<CategoryDTO> {
    const safeData = this.validateCreateCategoryData(data);
    return this.categoryRepo.createCategory(safeData);
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    return this.categoryRepo.getAllCategories();
  }

  async getCategoryById(id: string): Promise<CategoryDTO | null> {
    const validId = getValidId(id);
    return this.categoryRepo.getCategoryById(validId);
  }

  async updateCategory(
    id: string,
    data: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    const validId = getValidId(id);
    const safeData = this.validateUpdateCategoryData(data);
    return this.categoryRepo.updateCategory(validId, safeData);
  }

  async deleteCategory(id: string): Promise<CategoryDTO> {
    const validId = getValidId(id);
    return this.categoryRepo.deleteCategory(validId);
  }

  /**
   * Takes any data and returns the parsed data if it is valid, otherwise
   * throws a ZodError
   * @param data the data to parse
   * @returns the parsed data if it is valid
   * @throws ZodError if the data is invalid
   */
  private validateCreateCategoryData(data: CreateCategorySchema) {
    const {
      success,
      data: safeData,
      error,
    } = createCategorySchema.safeParse(data);
    if (error || !success) {
      throw error;
    }
    return safeData;
  }

  /**
   * Takes any data and returns the parsed data if it is valid, otherwise
   * throws a ZodError
   * @param data the data to parse
   * @returns the parsed data if it is valid
   * @throws ZodError if the data is invalid
   */
  private validateUpdateCategoryData(data: UpdateCategorySchema) {
    const {
      success,
      data: safeData,
      error,
    } = createCategorySchema.safeParse(data);
    if (error || !success) {
      throw error;
    }
    return safeData;
  }

  //******** CategoryService ******** */
}
