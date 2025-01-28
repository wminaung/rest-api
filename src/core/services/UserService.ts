import { ZodError } from "zod";
import { UserDTO } from "../dtos/UserDTO";
import {
  CreateUserSchema,
  createUserSchema,
} from "../schemas/CreateUserSchema";
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

  // end
}
