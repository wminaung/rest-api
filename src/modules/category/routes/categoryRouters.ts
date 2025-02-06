import { Request, Router } from "express";
import { categoryController } from "../../../shared/factories";
import { adminRoleCheck } from "../../../middlewares/jwt-utils";

const categoryRouters = Router();

// NOTE! only admin can create, update and delete category

categoryRouters.post("/", adminRoleCheck, (req, res) => {
  categoryController.create(req, res);
});

categoryRouters.get("/", (req, res) => {
  categoryController.getAll(req, res);
});

categoryRouters.get("/:id", (req: Request<{ id: string }>, res) => {
  categoryController.get(req, res);
});

categoryRouters.put(
  "/:id",
  adminRoleCheck,
  (req: Request<{ id: string }>, res) => {
    categoryController.update(req, res);
  }
);

categoryRouters.delete(
  "/:id",
  adminRoleCheck,
  (req: Request<{ id: string }>, res) => {
    categoryController.delete(req, res);
  }
);

export default categoryRouters;
