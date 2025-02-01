import { PrismaClient } from "@prisma/client";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { UserRepo } from "./repositories/implementations/UserRepo";

export const createUserController = (prisma: PrismaClient) => {
  const userRepo = new UserRepo(prisma);
  const userService = new UserService(userRepo);
  return new UserController(userService);
};
