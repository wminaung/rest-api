import { Request, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { postController } from "../../../shared/factories";

const postRouters = Router();

postRouters.post("/", (req, res) => {
  postController.create(req, res);
});
const prisma = new PrismaClient();
postRouters.get("/user", async (req: Request, res) => {
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

postRouters.get("/", (req, res) => {
  postController.getAll(req, res);
});

postRouters.get("/:id", (req, res) => {
  postController.get(req, res);
});

postRouters.put("/:id", (req, res) => {
  postController.update(req, res);
});

postRouters.delete("/:id", (req, res) => {
  postController.delete(req, res);
});

export default postRouters;
