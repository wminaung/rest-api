import { PrismaClient } from "@prisma/client";
import { createCategoryController } from "./categoryControllerFactory";
import { createFollowController } from "./followControllerFactory";
import { createUserController } from "./userControllerFactory";
import { createPostController } from "./postControllerFactory";
import { createAuthController } from "./authControllerFactory";

const prisma = new PrismaClient();

export const userController = createUserController(prisma);
export const categoryController = createCategoryController(prisma);
export const followController = createFollowController(prisma);
export const postController = createPostController(prisma);
export const authController = createAuthController(prisma);
