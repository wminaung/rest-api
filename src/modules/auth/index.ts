import { AuthRepo } from "./repositories/AuthRepo";
import { AuthService } from "./services/AuthService";
import { AuthController } from "./controllers/AuthController";
import prisma from "../../db/prisma";
import { passwordHasher } from "../../shared/security/PasswordHasher";
import { redis, RedisClient } from "../../shared/lib/RedisClient";

export const authRepo = AuthRepo.getInstance(prisma);
export const redisClient = RedisClient.getInstance(redis);
export const authService = AuthService.getInstance(
  authRepo,
  passwordHasher,
  redisClient
);
export const authController = AuthController.getInstance(authService);
