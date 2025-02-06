import { PrismaClient } from "@prisma/client";
import { UserService } from "../../modules/user/services/UserService";
import { PasswordHasher } from "../helpers/PasswordHasher";
import { UserRepo } from "../../modules/user/repositories/UserRepo";
import { UserController } from "../../modules/user/controllers/UserController";

export const createUserController = (prisma: PrismaClient) => {
  const userRepo = new UserRepo(prisma);
  const passwordHasher = new PasswordHasher(10);
  const userService = new UserService(userRepo, passwordHasher);
  return new UserController(userService);
};
