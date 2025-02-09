import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../../../shared/schemas/userSchema";
import { IUserRepo } from "../interfaces/IUserRepo";
import { Service } from "../../../shared/abstracts/Service";
import { PasswordHasher } from "../../../shared/security/PasswordHasher";
import { IUserService } from "../interfaces/IUserService";
import { ForbiddenError } from "../../../shared/errors";
import { JwtAuthPayload } from "../../../shared/types/jwtAuthPayload";

export class UserService extends Service implements IUserService {
  private static instance: UserService;

  static getInstance(userRepo: IUserRepo, passwordHasher: PasswordHasher) {
    if (!UserService.instance) {
      UserService.instance = new UserService(userRepo, passwordHasher);
    }
    return UserService.instance;
  }

  constructor(
    private userRepo: IUserRepo,
    private passwordHasher: PasswordHasher
  ) {
    super();
  }

  private hashPassword(password: string): Promise<string> {
    return this.passwordHasher.hashPassword(password);
  }

  private isAdminRoleOrThrow(user: JwtAuthPayload) {
    if (user.role !== "ADMIN") {
      throw new ForbiddenError("You are not allowed to create user");
    }
  }

  // NOTE: Only admin can create user
  async create(
    createUserData: CreateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO> {
    const authUser = this.hasAuthUserOrThrow(user);
    // note: will pass if user is admin or throw ForbiddenError
    // note: however i already check in middleware so no need to check again here but just in case i will keep it here for now
    this.isAdminRoleOrThrow(authUser);
    const safeData = this.validateOrThrow(createUserData, createUserSchema);
    const hashedPassword = await this.hashPassword(safeData.password);
    return this.userRepo.create({ ...safeData, password: hashedPassword });
  }

  async getAll(): Promise<UserDTO[]> {
    return await this.userRepo.getAll();
  }
  async get(userId: string): Promise<UserDTO | null> {
    return this.userRepo.get(this.getValidIdOrThrow(userId));
  }

  async update(
    id: string,
    updateUserData: UpdateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO> {
    const validId = this.getValidIdOrThrow(id);
    const safeData = this.validateOrThrow(updateUserData, updateUserSchema);
    const authUser = this.hasAuthUserOrThrow(user);
    if (authUser.id !== validId) {
      throw new ForbiddenError("You are not allowed to update this user");
    }

    return await this.userRepo.update(validId, safeData);
  }

  // NOTE: Only admin can delete user
  async delete(userId: string, user?: JwtAuthPayload): Promise<UserDTO> {
    const authUser = this.hasAuthUserOrThrow(user);
    this.isAdminRoleOrThrow(authUser);
    const validId = this.getValidIdOrThrow(userId);

    if (authUser.id === validId) {
      throw new ForbiddenError("You are not allowed to delete yourself");
    }

    return await this.userRepo.delete(validId);
  }

  //**** UserService ****/
}
