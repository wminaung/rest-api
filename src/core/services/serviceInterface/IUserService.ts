import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../schemas/userSchema";
import { JwtAuthPayload } from "../../../types/jwtAuthPayload";

export interface IUserService {
  create(
    createUserData: CreateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  get(userId: string): Promise<UserDTO | null>;
  update(
    userId: string,
    updateUserData: UpdateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO>;
  delete(userId: string, user?: JwtAuthPayload): Promise<UserDTO>;
}
