import { PrismaClient } from "@prisma/client";
import { ICategoryRepo } from "../interfaces/ICategoryRepo";
import { CategoryDTO } from "../../dtos/CategoryDTO";
import {
  CreateCategorySchema,
  UpdateCategorySchema,
} from "../../schemas/categorySchema";

export class CategoryRepo implements ICategoryRepo {
  constructor(private prisma: PrismaClient) {}

  async createCategory(data: CreateCategorySchema): Promise<CategoryDTO> {
    return this.prisma.category.create({
      data,
    });
  }
  async getAllCategories(): Promise<CategoryDTO[]> {
    return this.prisma.category.findMany();
  }
  async getCategoryById(id: string): Promise<CategoryDTO | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }
  async updateCategory(
    id: string,
    data: UpdateCategorySchema
  ): Promise<CategoryDTO> {
    const userFromDb = await this.getCategoryById(id);
    if (!userFromDb) {
      throw new Error("Category not found");
    }
    return this.prisma.category.update({ where: { id }, data });
  }
  async deleteCategory(id: string): Promise<CategoryDTO> {
    const userFromDb = await this.getCategoryById(id);
    if (!userFromDb) {
      throw new Error("Category not found");
    }
    return this.prisma.category.delete({ where: { id } });
  }

  //***** CategoryRepo *****/
}
