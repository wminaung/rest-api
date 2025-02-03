// src/controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { CreateUserSchema, UpdateUserSchema } from "../../schemas/userSchema";
import { Controller } from "./Controller";

export class UserController extends Controller {
  constructor(private userService: UserService) {
    super();
  }

  /**
   * Creates a new user from the data in the request body
   * @param req Request containing the user data
   * @param res Response to send the created user
   * @throws {ZodError} If the request body is invalid
   * @throws {Error} If there is an error creating the user
   */
  async createUser(
    req: Request<{}, {}, CreateUserSchema>,
    res: Response
  ): Promise<void> {
    try {
      const data = req.body;
      const user = await this.userService.createUser(data);
      res.status(201).json(user);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  /**
   * Gets all users from the database
   * @param req Request object, ignored
   * @param res Response object, used to send the list of users
   * @throws {NotFoundError} If no users are found
   * @throws {Error} If there is an error getting the users
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  /**
   * Gets a user by id
   * @param req Request containing the id of the user to get
   * @param res Response to send the user
   * @throws {NotFoundError} If the user is not found
   * @throws {Error} If there is an error getting the user
   */
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
      this.handleError(err, res);
    }
  }

  /**
   * Updates a user by id
   * @param req Request containing the id of the user to update and the new data
   * @param res Response to send the updated user
   * @throws {NotFoundError} If the user is not found
   * @throws {Error} If there is an error updating the user
   */
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
      this.handleError(err, res);
    }
  }

  /**
   * Deletes a user by id
   * @param req Request containing the id of the user to delete
   * @param res Response to send the deleted user
   * @throws {NotFoundError} If the user is not found
   * @throws {Error} If there is an error deleting the user
   */
  async deleteUser(req: Request<{ id: string }>, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.deleteUser(id);
      res.status(200).json(user);
    } catch (err: unknown) {
      this.handleError(err, res);
    }
  }

  //* end UserController
}
