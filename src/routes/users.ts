import { Router } from "express";
import { userController } from "../core";

const router = Router();

router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
});
router.post("/", async (req, res) => {
  console.log(req.body);
  await userController.createUser(req, res);
});

export default router;
