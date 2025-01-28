import { ZodError } from "zod";
import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    try {
      createUserSchema.parse(data);
    } catch (err) {
      if (err instanceof ZodError) {
        throw err;
      }
      throw err;
    }
    // If validation passes, call the repository to create the user
    return this.userRepo.createUser(data);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userRepo.getAllUsers();
  }
  async getUserById(id: string): Promise<UserDTO | null> {
    return await this.userRepo.getUserById(id);
  }

  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new Error("User not found to update");
    }
    try {
      updateUserSchema.parse(data);
    } catch (error) {
      throw error;
    }
    return await this.userRepo.updateUser(id, data);
  }

  async deleteUser(id: string): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new Error("User not found to delete");
    }

    return await this.userRepo.deleteUser(id);
  }
}
