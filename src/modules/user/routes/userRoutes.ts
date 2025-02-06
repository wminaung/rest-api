import { Request, Response, Router } from "express";
import {
  followController,
  postController,
  userController,
} from "../../../shared/factories";
import { adminRoleCheck } from "../../../middlewares/jwt-utils";

const userRouters = Router();

userRouters.post("/", adminRoleCheck, (req, res) => {
  userController.create(req, res);
});

userRouters.get("/", (req, res) => {
  userController.getAll(req, res);
});

userRouters.get("/me", (req: Request, res: Response) => {
  if (!req.user) res.status(404).json({ message: "User not found in /me" });
  else res.status(200).json(req.user);
});

userRouters.get("/:id", (req, res) => {
  userController.get(req, res);
});

userRouters.put("/:id", (req, res) => {
  userController.update(req, res);
});

userRouters.delete(
  "/:id",
  adminRoleCheck,
  (req: Request<{ id: string }>, res: Response) => {
    userController.deleteUser(req, res);
  }
);

userRouters.get("/:id/posts", (req, res) => {
  postController.GetPostsByUserId(req, res);
});

userRouters.get("/:id/followers", (req, res) => {
  followController.getFollowers(req, res);
});

userRouters.get("/:id/following", (req, res) => {
  followController.getFollowing(req, res);
});

export default userRouters;
