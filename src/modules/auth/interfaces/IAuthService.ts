import { UserDTO } from "../../../dtos/UserDTO";
import { CreateUserSchema } from "../../../shared/schemas/userSchema";
import {
  LoginReturnType,
  LogoutReturnType,
  LogoutTokens,
  RefreshAccessTokenReturnType,
} from "../../../shared/types/auth";

export interface IAuthService {
  register(createUserData: CreateUserSchema): Promise<UserDTO>;

  login(email: string, password: string): Promise<LoginReturnType>;

  logout(logoutTokens: LogoutTokens): Promise<LogoutReturnType>;

  refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshAccessTokenReturnType>;
}
