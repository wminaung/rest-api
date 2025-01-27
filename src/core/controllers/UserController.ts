// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { handleError } from "../utils/errorHandler";
import { CreateUserData } from "../schemas/CreateUserDataSchema";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: unknown) {
      handleError(err, res);
    }
  }

  async createUser(
    req: Request<{}, {}, CreateUserData>,
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
}
