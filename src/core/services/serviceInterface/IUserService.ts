import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../schemas/userSchema";
import { JwtAuthPayload } from "../../../types/jwtAuthPayload";

export interface IUserService {
  create(data: CreateUserSchema, user?: JwtAuthPayload): Promise<UserDTO>;
  getAll(): Promise<UserDTO[]>;
  get(id: string): Promise<UserDTO | null>;
  update(
    id: string,
    data: UpdateUserSchema,
    user?: JwtAuthPayload
  ): Promise<UserDTO>;
  delete(id: string, user?: JwtAuthPayload): Promise<UserDTO>;
}
