import { Router } from "express";
import { categoryController } from "../../../shared/factories";

const categoryRouters = Router();

categoryRouters.post("/", (req, res) => {
  categoryController.create(req, res);
});

categoryRouters.get("/", (req, res) => {
  categoryController.getAll(req, res);
});

categoryRouters.get("/:id", (req, res) => {
  categoryController.get(req, res);
});

categoryRouters.put("/:id", (req, res) => {
  categoryController.update(req, res);
});

categoryRouters.delete("/:id", (req, res) => {
  categoryController.delete(req, res);
});

export default categoryRouters;
