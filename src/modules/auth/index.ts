import { AuthRepo } from "./repositories/AuthRepo";
import { AuthService } from "./services/AuthService";
import { AuthController } from "./controllers/AuthController";
import prisma from "../../db/prisma";
import { passwordHasher } from "../../shared/security/PasswordHasher";

export const authRepo = AuthRepo.getInstance(prisma);
export const authService = AuthService.getInstance(authRepo, passwordHasher);
export const authController = AuthController.getInstance(authService);
