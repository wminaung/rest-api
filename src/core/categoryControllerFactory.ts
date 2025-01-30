import { PrismaClient } from "@prisma/client";
import { CategoryService } from "./services/CategoryService";
import { CategoryController } from "./controllers/CategoryController";
import { CategoryRepo } from "./repositories/implementations/CategoryRepo";

/**
 * Creates an instance of CategoryController.
 * The controller is the entry point from the routes to the services.
 * It uses the CategoryService to create, get, update and delete categories.
 * The service uses the CategoryRepo to interact with the database.
 * @returns {CategoryController} - An instance of the CategoryController.
 */
export const createCategoryController = () => {
  const prisma = new PrismaClient();

  const categoryRepo = new CategoryRepo(prisma);
  const categoryService = new CategoryService(categoryRepo);
  return new CategoryController(categoryService);
};
