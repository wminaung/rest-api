import { CategoryDTO } from "../../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  createCategorySchema,
  UpdateCategorySchema,
  updateCategorySchema,
} from "../../../shared/schemas/categorySchema";
import { Service } from "../../../shared/abstracts/Service";
import { ICategoryRepo } from "../interfaces/ICategoryRepo";
import { ICategoryService } from "../interfaces/ICategoryService";

export class CategoryService extends Service implements ICategoryService {
  private static instance: CategoryService;

  static getInstance(categoryRepo: ICategoryRepo): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService(categoryRepo);
    }
    return CategoryService.instance;
  }

  constructor(private categoryRepo: ICategoryRepo) {
    super();
  }

  async create(createCategoryData: CreateCategorySchema): Promise<CategoryDTO> {
    const safeData = this.validateOrThrow(
      createCategoryData,
      createCategorySchema
    );
    return this.categoryRepo.create(safeData);
  }

  async getAll(): Promise<CategoryDTO[]> {
    return this.categoryRepo.getAll();
  }

  async get(categoryId: string): Promise<CategoryDTO | null> {
    return this.categoryRepo.get(this.getValidIdOrThrow(categoryId));
  }

  async update(
    categoryId: string,
    updateCategoryData: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    const validId = this.getValidIdOrThrow(categoryId);
    const safeData = this.validateOrThrow(
      updateCategoryData,
      updateCategorySchema
    );

    return this.categoryRepo.update(validId, safeData);
  }

  async delete(categoryId: string): Promise<CategoryDTO> {
    const validId = this.getValidIdOrThrow(categoryId);
    return this.categoryRepo.delete(validId);
  }

  //******** CategoryService ******** */
}
