import { PrismaClient } from "@prisma/client";
import { UserRepo } from "./repositories/UserRepo";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";

export const createUserController = () => {
  const prisma = new PrismaClient();

  const userRepo = new UserRepo(prisma);
  const userService = new UserService(userRepo);
  return new UserController(userService);
};
