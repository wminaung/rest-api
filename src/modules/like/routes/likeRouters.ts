import { Request, Router } from "express";
import { likeController } from "..";

const likeRouters = Router();

likeRouters.post("/", (req, res) => {
  likeController.create(req, res);
});

likeRouters.get("/", (req, res) => {
  likeController.getAll(req, res);
});

likeRouters.get("/:id", (req, res) => {
  likeController.get(req, res);
});

likeRouters.delete("/:id", (req, res) => {
  likeController.delete(req, res);
});

export default likeRouters;
