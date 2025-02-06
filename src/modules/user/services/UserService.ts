import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../../../shared/schemas/userSchema";
import { IUserRepo } from "../interfaces/IUserRepo";
import { Service } from "../../../shared/abstracts/Service";
import { PasswordHasher } from "../../../shared/helpers/PasswordHasher";
import { IUserService } from "../interfaces/IUserService";

export class UserService extends Service implements IUserService {
  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: PasswordHasher
  ) {
    super();
  }

  private hashPassword(password: string): Promise<string> {
    return this.passwordHasher.hashPassword(password);
  }

  async create(createUserData: CreateUserSchema): Promise<UserDTO> {
    // Olny admin can create user
    const safeData = this.validate(createUserData, createUserSchema);
    const hashedPassword = await this.hashPassword(safeData.password);
    return this.userRepo.create({ ...safeData, password: hashedPassword });
  }

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepo.getAll();
  }
  async get(userId: string): Promise<UserDTO | null> {
    // this.authorizeUserOrThrow(user);
    const validId = this.getValidId(userId);
    return await this.userRepo.get(validId);
  }

  async update(
    userId: string,
    updateUserData: UpdateUserSchema
  ): Promise<UserDTO> {
    const validId = this.getValidId(userId);
    const safeData = this.validate(updateUserData, updateUserSchema);
    return await this.userRepo.update(validId, safeData);
  }

  async delete(userId: string): Promise<UserDTO> {
    const validId = this.getValidId(userId);
    return await this.userRepo.delete(validId);
  }

  //**** UserService ****/
}
