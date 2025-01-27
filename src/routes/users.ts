import { Router } from "express";
import { userController } from "../core";

const router = Router();

router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
});
router.post("/", async (req, res) => {
  await userController.createUser(req, res);
});

export default router;
