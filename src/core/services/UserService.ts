import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";
import { ValidationError } from "../../errors";
import { Service } from "./Service";

export class UserService extends Service {
  constructor(private userRepo: IUserRepo) {
    super();
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    const safeData = this.validate(data, createUserSchema);
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
    const safeData = this.validate(data, updateUserSchema);
    return await this.userRepo.updateUser(validId, safeData);
  }

  async deleteUser(id: string): Promise<UserDTO> {
    const validId = this.getValidId(id);
    return await this.userRepo.deleteUser(validId);
  }

  //**** UserService ****/
}
