import { PrismaClient } from "@prisma/client";
import { createCategoryController } from "./categoryControllerFactory";
import { createFollowController } from "./followControllerFactory";
import { createUserController } from "./userControllerFactory";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

export const userController = createUserController(prisma);
export const categoryController = createCategoryController(prisma);
export const followController = createFollowController(prisma);
