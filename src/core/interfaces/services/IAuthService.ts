import { UserDTO } from "../../../dtos/UserDTO";
import { CreateUserSchema } from "../../../schemas/userSchema";
import {
  LoginReturnType,
  LogoutReturnType,
  LogoutTokens,
  RefreshAccessTokenReturnType,
} from "../../../types/auth";

export interface IAuthService {
  register(createUserData: CreateUserSchema): Promise<UserDTO>;

  login(email: string, password: string): Promise<LoginReturnType>;

  logout(logoutTokens: LogoutTokens): Promise<LogoutReturnType>;

  refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshAccessTokenReturnType>;
}
