import { UserDTO } from "../../../dtos/UserDTO";
import { CreateUserSchema } from "../../../schemas/userSchema";
import {
  LoginReturnType,
  LogoutReturnType,
  RefreshAccessTokenReturnType,
} from "../../../types/auth";

export interface IAuthService {
  register(createUserData: CreateUserSchema): Promise<UserDTO>;

  login(email: string, password: string): Promise<LoginReturnType>;

  logout(refreshToken: string): Promise<LogoutReturnType>;

  refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshAccessTokenReturnType>;
}
