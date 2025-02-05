import { PrismaClient } from "@prisma/client";
import { createCategoryController } from "./factories/categoryControllerFactory";
import { createFollowController } from "./factories/followControllerFactory";
import { createUserController } from "./factories/userControllerFactory";
import { createPostController } from "./factories/postControllerFactory";
import { createAuthController } from "./factories/authControllerFactory";

const prisma = new PrismaClient();

export const userController = createUserController(prisma);
export const categoryController = createCategoryController(prisma);
export const followController = createFollowController(prisma);
export const postController = createPostController(prisma);
export const authController = createAuthController(prisma);
