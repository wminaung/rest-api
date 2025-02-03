import { Request, Router } from "express";
import { postController } from "../core";
import { PrismaClient } from "@prisma/client";

const router = Router();

router.post("/", (req, res) => {
  postController.create(req, res);
});
const prisma = new PrismaClient();
router.get("/user", async (req: Request, res) => {
  console.log({ u: req.user });
  if (req.user && req.user.id) {
    const posts = await prisma.post.findMany({
      where: { userId: req.user.id },
    });
    console.log(posts);
    res.json(posts);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/", (req, res) => {
  postController.getAll(req, res);
});

router.get("/:id", (req, res) => {
  postController.get(req, res);
});

router.put("/:id", (req, res) => {
  postController.update(req, res);
});

router.delete("/:id", (req, res) => {
  postController.delete(req, res);
});

export default router;
