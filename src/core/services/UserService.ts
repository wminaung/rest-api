import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";
import { Service } from "./Service";
import { PasswordHasher } from "../helpers/PasswordHasher";

export class UserService extends Service {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: PasswordHasher
  ) {
    super();
  }

  private hashPassword(password: string): Promise<string> {
    return this.passwordHasher.hashPassword(password);
  }

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    const safeData = this.validate(data, createUserSchema);
    const hashedPassword = await this.hashPassword(safeData.password);
    return this.userRepo.createUser({ ...safeData, password: hashedPassword });
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
