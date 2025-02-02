import { Router } from "express";
import { followController } from "../core";

const router = Router();

router.post("/", (req, res) => {
  followController.followUser(req, res);
});

router.delete("/", (req, res) => {
  followController.unfollowUser(req, res);
});

export default router;
