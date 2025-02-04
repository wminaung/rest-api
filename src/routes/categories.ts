import { Router } from "express";
import { categoryController } from "../core";

const router = Router();

router.post("/", (req, res) => {
  categoryController.create(req, res);
});

router.get("/", (req, res) => {
  categoryController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  categoryController.get(req, res);
});

router.put("/:id", (req, res) => {
  categoryController.update(req, res);
});

router.delete("/:id", (req, res) => {
  categoryController.delete(req, res);
});

export default router;
