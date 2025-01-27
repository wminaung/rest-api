import { UserDTO } from "../dtos/UserDTO";
import { CreateUserData } from "../schemas/CreateUserDataSchema";

export interface IUserRepo {
  getAllUsers(): Promise<UserDTO[]>;
  getUserById(id: string): Promise<UserDTO | null>;
  createUser(data: CreateUserData): Promise<UserDTO>;
  updateUser(
    id: string,
    data: Partial<{ name: string; profilePicture: string; bio: string }>
  ): Promise<UserDTO>;
  deleteUser(id: string): Promise<UserDTO>;
}
