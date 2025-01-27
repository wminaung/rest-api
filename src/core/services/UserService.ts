import { ZodError } from "zod";
import { UserDTO } from "../dtos/UserDTO";
import { IUserRepo } from "../repositories/IUserRepo";
import {
  CreateUserData,
  createUserDataSchema,
} from "../schemas/CreateUserDataSchema";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async createUser(data: CreateUserData): Promise<UserDTO> {
    try {
      createUserDataSchema.parse(data);
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

  // end
}
