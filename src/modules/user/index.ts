import prisma from "../../db/prisma";
import { passwordHasher } from "../../shared/security/PasswordHasher";
import { UserController } from "./controllers/UserController";
import { UserRepo } from "./repositories/UserRepo";
import { UserService } from "./services/UserService";

export const userRepo = UserRepo.getInstance(prisma);
export const userService = UserService.getInstance(userRepo, passwordHasher);
export const userController = UserController.getInstance(userService);
