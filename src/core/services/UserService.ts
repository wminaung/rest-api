import { UserDTO } from "../../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";
import { Service } from "./Service";
import { PasswordHasher } from "../../helpers/PasswordHasher";
import { JwtAuthPayload } from "../../types/jwtAuthPayload";
import { UnauthorizedError } from "../../errors";
import { IUserService } from "./serviceInterface/IUserService";

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

  async create(
    data: CreateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO> {
    // authorization check for admin role
    if (user?.role !== "ADMIN") {
      throw new UnauthorizedError("Only admin can create User");
    }
    const safeData = this.validate(data, createUserSchema);
    const hashedPassword = await this.hashPassword(safeData.password);
    return this.userRepo.create({ ...safeData, password: hashedPassword });
  }

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepo.getAll();
  }
  async get(id: string): Promise<UserDTO | null> {
    const validId = this.getValidId(id);
    return await this.userRepo.get(validId);
  }

  async update(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const validId = this.getValidId(id);
    const safeData = this.validate(data, updateUserSchema);
    return await this.userRepo.update(validId, safeData);
  }

  async delete(id: string): Promise<UserDTO> {
    const validId = this.getValidId(id);
    return await this.userRepo.delete(validId);
  }

  //**** UserService ****/
}
