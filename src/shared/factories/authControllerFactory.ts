import { PrismaClient } from "@prisma/client";
import { AuthService } from "../../modules/auth/services/AuthService";
import { PasswordHasher } from "../helpers/PasswordHasher";
import { AuthRepo } from "../../modules/auth/repositories/AuthRepo";
import { AuthController } from "../../modules/auth/controllers/AuthController";

export const createAuthController = (prisma: PrismaClient) => {
  const authRepo = new AuthRepo(prisma);
  const passwordHasher = new PasswordHasher(10);
  const categoryService = new AuthService(authRepo, passwordHasher);
  return new AuthController(categoryService);
};
