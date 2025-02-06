import { Router } from "express";
import { followController, userController } from "../../../shared/factories";
import { adminRoleCheck } from "../../../middlewares/jwt-utils";

const userRouters = Router();

userRouters.post("/", adminRoleCheck, (req, res) => {
  userController.create(req, res);
});

userRouters.get("/", (req, res) => {
  userController.getAll(req, res);
});

userRouters.get("/:id", (req, res) => {
  userController.get(req, res);
});

userRouters.get("/:id/followers", (req, res) => {
  followController.getFollowers(req, res);
});

userRouters.get("/:id/following", (req, res) => {
  followController.getFollowing(req, res);
});

userRouters.put("/:id", (req, res) => {
  userController.update(req, res);
});

userRouters.delete(
  "/:id",
  (req, res, next) => {
    adminRoleCheck(req, res, next);
  },
  (req, res) => {
    userController.deleteUser(req, res);
  }
);

export default userRouters;
