import { PrismaClient } from "@prisma/client";
import { CategoryService } from "../services/CategoryService";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryRepo } from "../repositories/CategoryRepo";

export const createCategoryController = (prisma: PrismaClient) => {
  const categoryRepo = new CategoryRepo(prisma);
  const categoryService = new CategoryService(categoryRepo);
  return new CategoryController(categoryService);
};
