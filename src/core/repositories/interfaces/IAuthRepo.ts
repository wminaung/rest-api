import { AuthDTO } from "../../dtos/AuthDTO";
import { UserDTO } from "../../dtos/UserDTO";
import { CreateUserSchema } from "../../../schemas/userSchema";

export interface IAuthRepo {
  findByEmail(email: string): Promise<AuthDTO | null>;
  createUser(data: CreateUserSchema): Promise<UserDTO>;
}
