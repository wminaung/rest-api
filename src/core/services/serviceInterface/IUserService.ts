import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../schemas/userSchema";
import { JwtAuthPayload } from "../../../types/jwtAuthPayload";

export interface IUserService {
  create(createUserData: CreateUserSchema): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  get(userId: string): Promise<UserDTO | null>;
  update(userId: string, updateUserData: UpdateUserSchema): Promise<UserDTO>;
  delete(userId: string): Promise<UserDTO>;
}
