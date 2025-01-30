import { PrismaClient } from "@prisma/client";
import { ICategoryRepo } from "../interfaces/ICategoryRepo";
import { CategoryDTO } from "../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../schemas/categorySchema";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "../../../errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class CategoryRepo implements ICategoryRepo {
  constructor(private prisma: PrismaClient) {}

  async createCategory(data: CreateCategorySchema): Promise<CategoryDTO> {
    try {
      return this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new InternalServerError("Error creating category");
    }
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    try {
      return this.prisma.category.findMany();
    } catch (error) {
      throw new InternalServerError("Error fetching categories");
    }
  }

  async getCategoryById(id: string): Promise<CategoryDTO | null> {
    try {
      const category = await this.prisma.category.findUnique({ where: { id } });
      if (!category) {
        throw new NotFoundError("Category not found");
      }
      return category;
    } catch (error) {
      throw new InternalServerError("Error fetching category by ID");
    }
  }

  async updateCategory(
    id: string,
    data: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    try {
      const categoryFromDb = await this.getCategoryById(id);
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

  async deleteCategory(id: string): Promise<CategoryDTO> {
    try {
      const categoryFromDb = await this.getCategoryById(id);
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
