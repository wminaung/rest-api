import { PrismaClient } from "@prisma/client";
import { AuthRepo } from "./repositories/implementations/AuthRepo";
import { AuthService } from "./services/AuthService";
import { PasswordHasher } from "../helpers/PasswordHasher";
import { AuthController } from "./controllers/AuthController";

export const createAuthController = (prisma: PrismaClient) => {
  const categoryRepo = new AuthRepo(prisma);
  const authRepo = new AuthRepo(prisma);
  const passwordHasher = new PasswordHasher(10);
  const categoryService = new AuthService(authRepo, passwordHasher);
  return new AuthController(categoryService);
};
