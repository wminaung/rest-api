import { PrismaClient } from "@prisma/client";
import { CategoryController } from "../../modules/category/controllers/CategoryController";
import { CategoryRepo } from "../../modules/category/repositories/CategoryRepo";
import { CategoryService } from "../../modules/category/services/CategoryService";

export const createCategoryController = (prisma: PrismaClient) => {
  const categoryRepo = new CategoryRepo(prisma);
  const categoryService = new CategoryService(categoryRepo);
  return new CategoryController(categoryService);
};
