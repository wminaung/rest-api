import prisma from "../../db/prisma";
import { CategoryController } from "./controllers/CategoryController";
import { CategoryRepo } from "./repositories/CategoryRepo";
import { CategoryService } from "./services/CategoryService";

export const categoryRepo = CategoryRepo.getInstance(prisma);
export const categoryService = CategoryService.getInstance(categoryRepo);
export const categoryController =
  CategoryController.getInstance(categoryService);
