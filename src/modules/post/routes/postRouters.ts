import { Request, Router } from "express";
import { postController } from "..";

const postRouters = Router();

postRouters.post("/", (req, res) => {
  postController.create(req, res);
});

postRouters.get("/", (req, res) => {
  postController.getAll(req, res);
});

postRouters.get("/:id", (req, res) => {
  postController.get(req, res);
});

postRouters.put("/:id", (req, res) => {
  console.log("get post by id");
  postController.update(req, res);
});

postRouters.delete("/:id", (req, res) => {
  postController.delete(req, res);
});

export default postRouters;
