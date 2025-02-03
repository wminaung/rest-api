import { UserDTO } from "../../../dtos/UserDTO";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../../schemas/userSchema";

export interface IUserRepo {
  getAll(): Promise<UserDTO[]>;
  get(id: string): Promise<UserDTO | null>;
  create(data: CreateUserSchema): Promise<UserDTO>;
  update(id: string, data: UpdateUserSchema): Promise<UserDTO>;
  delete(id: string): Promise<UserDTO>;
}
