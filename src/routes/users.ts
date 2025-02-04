import { Router } from "express";
import { followController, userController } from "../core";
import { adminRoleCheck } from "../middlewares/jwt-utils";

const router = Router();

router.post("/", adminRoleCheck, (req, res) => {
  userController.create(req, res);
});

router.get("/", (req, res) => {
  userController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  userController.get(req, res);
});

router.get("/:id/followers", (req, res) => {
  followController.getFollowers(req, res);
});

router.get("/:id/following", (req, res) => {
  followController.getFollowing(req, res);
});

router.put("/:id", (req, res) => {
  userController.update(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

export default router;
