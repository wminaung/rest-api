import { Request, Response, Router } from "express";
import { followController, userController } from "../core";

const router = Router();

router.post("/", (req, res) => {
  userController.createUser(req, res);
});

router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
});

router.get("/:id", (req, res) => {
  userController.getUserById(req, res);
});

router.get("/:id/followers", (req, res) => {
  followController.getFollowers(req, res);
});

router.get("/:id/following", (req, res) => {
  followController.getFollowing(req, res);
});

router.put("/:id", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

export default router;
