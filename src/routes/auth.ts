import { Request, Response, Router } from "express";
import { CreateUserSchema } from "../schemas/userSchema";
import { userController } from "../core";
import { loginSchema, LoginSchema } from "../schemas/loginSchema";
import jwt from "jsonwebtoken";
import { UserService } from "../core/services/UserService";
import { UserRepo } from "../core/repositories/implementations/UserRepo";
import { PrismaClient } from "@prisma/client";
import { PasswordHasher } from "../helpers/PasswordHasher";

const router = Router();

router.post(
  "/register",
  (req: Request<{}, {}, CreateUserSchema>, res: Response) => {
    userController.createUser(req, res);
  }
);
const prisma = new PrismaClient();

router.get("/ok", (req, res) => {
  let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImEwMjI3NTkyLWIxYWUtNGJjYi1iZDFkLWVmYTI5MmEzN2M0OSIsImVtYWlsIjoiakBkNTIzMi5jb20iLCJuYW1lIjoiSm9obiBEb2UxMCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM4NTI2MzQ0LCJleHAiOjE3Mzg1Mjk5NDR9.WbwSyTImhN6EgVNUllpSb38SSH3Nyzd0i1WdnArKT7M`;

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      console.log(decoded);
      res.status(200).json({ message: "ok" });
    }
  });
});

router.post(
  "/login",
  async (req: Request<{}, {}, LoginSchema>, res: Response) => {
    const { success, data, error } = loginSchema.safeParse(req.body);

    if (!success || error) {
      res.status(400).json({ error: error.message + `helo` });
      return;
    }
    const userFromDb = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!userFromDb) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let token = jwt.sign(userFromDb, process.env.JWT_SECRET!, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    console.log(token);

    res.status(200).json({ token });
  }
);

router.post("/logout", (req, res) => {});

export default router;
