// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { handleError } from "../utils/errorHandler";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/userSchema";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(
    req: Request<{}, {}, CreateUserSchema>,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const user = await this.userService.createUser(data);
      res.status(201).json(user);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async getUserById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async updateUser(
    req: Request<{ id: string }, {}, UpdateUserSchema>,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await this.userService.updateUser(id, data);
      res.status(200).json(user);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async deleteUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.deleteUser(id);
      res.status(200).json(user);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  //* end
}
