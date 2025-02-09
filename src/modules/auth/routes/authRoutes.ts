import { Request, Response, Router } from "express";
import { authController } from "..";

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
