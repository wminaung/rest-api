import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema } from "../../schemas/CreateUserSchema";

export interface IUserRepo {
  getAllUsers(): Promise<UserDTO[]>;
  getUserById(id: string): Promise<UserDTO | null>;
  createUser(data: CreateUserSchema): Promise<UserDTO>;
  updateUser(
    id: string,
    data: Partial<{ name: string; profilePicture: string; bio: string }>
  ): Promise<UserDTO>;
  deleteUser(id: string): Promise<UserDTO>;
}
