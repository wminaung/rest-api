import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema, UpdateUserSchema } from "../../schemas/userSchema";

export interface IUserRepo {
  getAllUsers(): Promise<UserDTO[]>;
  getUserById(id: string): Promise<UserDTO | null>;
  createUser(data: CreateUserSchema): Promise<UserDTO>;
  updateUser(id: string, data: UpdateUserSchema): Promise<UserDTO>;
  deleteUser(id: string): Promise<UserDTO>;
}
