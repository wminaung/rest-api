import { Router } from "express";
import { categoryController } from "../core";

const router = Router();

router.post("/", (req, res) => {
  categoryController.createCategory(req, res);
});

router.get("/", (req, res) => {
  categoryController.getAllCategories(req, res);
});

router.get("/:id", (req, res) => {
  categoryController.getCategoryById(req, res);
});

router.put("/:id", (req, res) => {
  categoryController.updateCategory(req, res);
});

router.delete("/:id", (req, res) => {
  categoryController.deleteCategory(req, res);
});

export default router;
