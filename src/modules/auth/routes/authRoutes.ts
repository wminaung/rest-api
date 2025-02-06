import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { AuthRepo } from "../repositories/AuthRepo";
import { AuthService } from "../services/AuthService";
import { PasswordHasher } from "../../../shared/helpers/PasswordHasher";
import { AuthController } from "../controllers/AuthController";
import { authController } from "../../../shared/factories";

const authRouters = Router();

authRouters.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

authRouters.post("/login", async (req: Request, res: Response) => {
  authController.login(req, res);
});

authRouters.post("/token", (req, res) => {
  authController.refreshToken(req, res);
});

authRouters.post("/logout", (req, res) => {
  authController.logout(req, res);
});

export default authRouters;
