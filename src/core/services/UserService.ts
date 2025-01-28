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
    const { success, data: safeData, error } = createUserSchema.safeParse(data);
    if (error || !success) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Invalid data to update user");
    }
    return this.userRepo.createUser(safeData);
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
    const { success, data: safeData, error } = updateUserSchema.safeParse(data);

    if (error || !success) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Invalid data to update user");
    }

    return await this.userRepo.updateUser(id, safeData);
  }

  async deleteUser(id: string): Promise<UserDTO> {
    const userFromDb = await this.getUserById(id);
    if (!userFromDb) {
      throw new Error("User not found to delete");
    }

    return await this.userRepo.deleteUser(id);
  }
}
