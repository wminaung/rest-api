import { ZodError } from "zod";
import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/userSchema";
import { IUserRepo } from "../repositories/interfaces/IUserRepo";
import { getValidId } from "../utils/getValidId";
import { ValidationError } from "../../errors";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async createUser(data: CreateUserSchema): Promise<UserDTO> {
    const safeData = this.validateCreateUserData(data);
    return this.userRepo.createUser(safeData);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return await this.userRepo.getAllUsers();
  }
  async getUserById(id: string): Promise<UserDTO | null> {
    const validId = getValidId(id);
    return await this.userRepo.getUserById(validId);
  }

  async updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO> {
    const validId = getValidId(id);

    const safeData = this.validateUpdateUserData(data);

    return await this.userRepo.updateUser(validId, safeData);
  }

  async deleteUser(id: string): Promise<UserDTO> {
    const validId = getValidId(id);
    return await this.userRepo.deleteUser(validId);
  }

  /**
   * Validates the user creation data against the CreateUserSchema.
   * Returns the parsed data if it is valid, otherwise throws a ValidationError.
   * @param data - The creation data to be validated.
   * @returns The parsed and validated data.
   * @throws ValidationError if the creation data is invalid.
   */

  private validateCreateUserData(data: CreateUserSchema) {
    const { success, data: safeData, error } = createUserSchema.safeParse(data);
    if (error || !success) {
      throw new ValidationError(error);
    }
    return safeData;
  }
  /**
   * Validates the user update data against the UpdateUserSchema.
   * Returns the parsed data if it is valid, otherwise throws a ValidationError.
   * @param data - The update data to be validated.
   * @returns The parsed and validated data.
   * @throws ValidationError if the update data is invalid.
   */

  private validateUpdateUserData(data: UpdateUserSchema) {
    const { success, data: safeData, error } = updateUserSchema.safeParse(data);
    if (error || !success) {
      throw new ValidationError(error);
    }
    return safeData;
  }

  //**** UserService ****/
}
