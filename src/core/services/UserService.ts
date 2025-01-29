import { ZodError } from "zod";
import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";
import { checkIdSchema } from "../schemas/checkIdSchema";

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
    const validId = this.getValidId(id);
    return await this.userRepo.getUserById(validId);
  }

  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const validId = this.getValidId(id);

    const { success, data: safeData, error } = updateUserSchema.safeParse(data);

    if (error || !success) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Invalid data to update user");
    }

    return await this.userRepo.updateUser(validId, safeData);
  }

  async deleteUser(id: string): Promise<UserDTO> {
    const validId = this.getValidId(id);
    return await this.userRepo.deleteUser(validId);
  }

  private getValidId(id: string): string {
    const { success, data, error } = checkIdSchema.safeParse({ id });

    if (error || !success) {
      if (error instanceof ZodError) {
        throw error;
      }
      throw new Error("Invalid id to update user");
    }
    return data.id;
  }
}
