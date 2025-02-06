import { IAuthRepo } from "../interfaces/IAuthRepo";
import { Service } from "../../../shared/abstracts/Service";
import {
  createUserSchema,
  CreateUserSchema,
} from "../../../shared/schemas/userSchema";
import { PasswordHasher } from "../../../shared/helpers/PasswordHasher";
import { JwtManager } from "../../../shared/helpers/JwtManager";
import {
  LoginReturnType,
  LogoutReturnType,
  LogoutTokens,
  RefreshAccessTokenReturnType,
} from "../../../shared/types/auth";
import { IAuthService } from "../interfaces/IAuthService";
import { UnauthorizedError, ForbiddenError } from "../../../shared/errors";
import { redis } from "../../../shared/lib/redis";

export class AuthService extends Service implements IAuthService {
  constructor(
    private authRepository: IAuthRepo,
    private passwordHasher: PasswordHasher
  ) {
    super();
  }

  // Register new user
  async register(createUserData: CreateUserSchema) {
    const validData = this.validate(createUserData, createUserSchema);
    const existingUser = await this.authRepository.findByEmail(validData.email);
    if (existingUser && existingUser.id)
      throw new UnauthorizedError("User already exists");

    const hashedPassword = await this.passwordHasher.hashPassword(
      validData.password
    );
    return this.authRepository.createUser({
      ...validData,
      password: hashedPassword,
    });
  }

  // Login and generate access and refresh tokens
  async login(email: string, password: string): Promise<LoginReturnType> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new UnauthorizedError("Invalid credentials");

    const isValidPassword = await this.passwordHasher.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword)
      throw new UnauthorizedError("Invalid credentials - wrong password");

    const { email: db_email, id, name, role } = user;
    const payload = {
      id,
      name,
      role,
      email: db_email,
    };
    // Generate Access Token and Refresh Token
    const accessToken = JwtManager.generateAccessToken(payload);

    const refreshToken = JwtManager.generateRefreshToken(payload);
    await redis.set(`refreshToken:${id}`, refreshToken, {
      ex: 60 * 60 * 24 * 7,
    });

    return { accessToken, refreshToken };
  }

  async logout({
    accessToken,
    refreshToken,
  }: LogoutTokens): Promise<LogoutReturnType> {
    // Decode and verify the refresh token
    const decoded = JwtManager.verifyRefreshToken(refreshToken);
    if (!decoded) throw new UnauthorizedError("Invalid refresh token");

    // Blacklist both refresh token and access token
    await redis.sadd(`blacklist:${decoded.id}`, refreshToken);
    const decodedAccessToken = JwtManager.verifyAccessToken(accessToken);
    if (decodedAccessToken && decodedAccessToken.exp) {
      const timeToExpire =
        decodedAccessToken.exp - Math.floor(Date.now() / 1000);
      if (timeToExpire > 0) {
        await redis.set(`blacklistedAccessToken:${accessToken}`, "true", {
          ex: timeToExpire,
        });
      }
    }

    // Remove the refresh token from Redis to invalidate it
    await redis.del(`refreshToken:${decoded.id}`);

    return { message: "Logged out successfully" };
  }

  // Refresh Access Token using Refresh Token
  async refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshAccessTokenReturnType> {
    // Decode and verify the refresh token
    const decoded = JwtManager.verifyRefreshToken(refreshToken);
    if (!decoded) throw new ForbiddenError("Invalid refresh token");

    const { id, email, name, role } = decoded;

    // Check if the refresh token is blacklisted
    const isBlacklisted = await redis.sismember(
      `blacklist:${id}`,
      refreshToken
    );
    if (isBlacklisted) {
      throw new ForbiddenError(
        "Refresh token has been invalidated or blacklisted"
      );
    }

    // Retrieve the stored refresh token from Redis
    const storedToken = await redis.get(`refreshToken:${id}`);
    if (!storedToken || storedToken !== refreshToken) {
      throw new ForbiddenError("Refresh token is invalid or expired");
    }

    // Generate new access token
    const newAccessToken = JwtManager.generateAccessToken({
      id,
      email,
      name,
      role,
    });

    return { accessToken: newAccessToken };
  }

  // End of class
}
