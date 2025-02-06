import { Router } from "express";
import { followController } from "../../../shared/factories";

const followRouters = Router();

followRouters.post("/", (req, res) => {
  followController.followUser(req, res);
});

followRouters.delete("/", (req, res) => {
  followController.unfollowUser(req, res);
});

export default followRouters;
