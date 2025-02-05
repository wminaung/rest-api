import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { UserRepo } from "../repositories/UserRepo";
import { PasswordHasher } from "../../helpers/PasswordHasher";

export const createUserController = (prisma: PrismaClient) => {
  const userRepo = new UserRepo(prisma);
  const passwordHasher = new PasswordHasher(10);
  const userService = new UserService(userRepo, passwordHasher);
  return new UserController(userService);
};
