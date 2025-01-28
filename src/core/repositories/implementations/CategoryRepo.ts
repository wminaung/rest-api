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
  getCategoryById(id: string): Promise<CategoryDTO | null> {
    throw new Error("Method not implemented.");
  }
  updateCategory(id: string, data: UpdateCategorySchema): Promise<CategoryDTO> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: string): Promise<CategoryDTO> {
    throw new Error("Method not implemented.");
  }
}
