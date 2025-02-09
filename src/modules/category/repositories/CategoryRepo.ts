import { PrismaClient } from "@prisma/client";
import { CategoryDTO } from "../../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../../shared/schemas/categorySchema";
import { Repository } from "../../../shared/abstracts/Repository";
import { InternalServerError, NotFoundError } from "../../../shared/errors";
import { ICategoryRepo } from "../interfaces/ICategoryRepo";

export class CategoryRepo extends Repository implements ICategoryRepo {
  private static instance: CategoryRepo;
  static getInstance(prisma: PrismaClient): CategoryRepo {
    if (!CategoryRepo.instance) {
      CategoryRepo.instance = new CategoryRepo(prisma);
    }
    return CategoryRepo.instance;
  }

  constructor(private prisma: PrismaClient) {
    super();
  }

  async create(data: CreateCategorySchema): Promise<CategoryDTO> {
    try {
      return this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new InternalServerError("Error creating category");
    }
  }

  async getAll(): Promise<CategoryDTO[]> {
    try {
      return this.prisma.category.findMany();
    } catch (error) {
      throw new InternalServerError("Error fetching categories");
    }
  }

  async get(id: string): Promise<CategoryDTO | null> {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Error fetching category by ID");
    }
  }

  async update(id: string, data: UpdateCategorySchema): Promise<CategoryDTO> {
    try {
      const categoryFromDb = await this.get(id);
      if (!categoryFromDb) {
        throw new NotFoundError("Category not found");
      }
      return this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Error updating category");
    }
  }

  async delete(id: string): Promise<CategoryDTO> {
    try {
      const categoryFromDb = await this.get(id);
      if (!categoryFromDb) {
        throw new NotFoundError("Category not found");
      }
      return this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Error deleting category");
    }
  }

  //***** CategoryRepo *****/
}
