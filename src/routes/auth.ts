import { Request, Response, Router } from "express";
import { authController } from "../core";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  authController.login(req, res);
});

router.post("/token", (req, res) => {
  authController.refreshToken(req, res);
});

router.post("/logout", (req, res) => {
  authController.logout(req, res);
});

export default router;
