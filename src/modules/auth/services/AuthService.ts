import { IAuthRepo } from "../interfaces/IAuthRepo";
import { Service } from "../../../shared/abstracts/Service";
import {
  createUserSchema,
  CreateUserSchema,
} from "../../../shared/schemas/userSchema";
import { PasswordHasher } from "../../../shared/security/PasswordHasher";
import { JwtManager } from "../../../shared/security/JwtManager";
import {
  LoginReturnType,
  LogoutReturnType,
  LogoutTokens,
  RefreshAccessTokenReturnType,
} from "../../../shared/types/auth";
import { IAuthService } from "../interfaces/IAuthService";
import { UnauthorizedError, ForbiddenError } from "../../../shared/errors";
import { RedisClient } from "../../../shared/lib/RedisClient";

export class AuthService extends Service implements IAuthService {
  private static instance: AuthService;

  public static getInstance(
    authRepository: IAuthRepo,
    passwordHasher: PasswordHasher,
    redisClient: RedisClient
  ): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(
        authRepository,
        passwordHasher,
        redisClient
      );
    }
    return AuthService.instance;
  }

  constructor(
    private authRepository: IAuthRepo,
    private passwordHasher: PasswordHasher,
    private redisClient: RedisClient
  ) {
    super();
  }

  // Register new user
  async register(createUserData: CreateUserSchema) {
    const validData = this.validateOrThrow(createUserData, createUserSchema);
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

  // ** Login and generate access and refresh tokens
  async login(email: string, password: string): Promise<LoginReturnType> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isValidPassword = await this.passwordHasher.comparePassword(
      password,
      user.password
    );

    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credentials - wrong password");
    }

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

    this.redisClient.setRefreshToken(id, refreshToken).then((data) => {
      console.log(`set refresh token: (string|null) ${data}`);
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

    const dump = await this.redisClient.blacklistRefreshToken(
      decoded.id,
      refreshToken
    );
    console.log(`blacklist refresh token: (number) ${dump}`);

    const decodedAccessToken = JwtManager.verifyAccessToken(accessToken);
    if (decodedAccessToken && decodedAccessToken.exp) {
      const timeToExpire =
        decodedAccessToken.exp - Math.floor(Date.now() / 1000);
      if (timeToExpire > 0) {
        const dump = await this.redisClient.blacklistAccessToken(
          accessToken,
          timeToExpire
        );
        console.log(`blacklist access token: (string|null) ${dump}`);
      }
    }

    // Remove the refresh token from Redis to invalidate it
    this.redisClient.deleteRefreshToken(decoded.id).then((data) => {
      console.log(`delete refresh token: (number) ${data}`);
    });

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
    const isBlacklisted = await this.redisClient.isTokenBlacklisted(
      id,
      refreshToken
    );
    console.log(`blacklist refresh token: (number) ${isBlacklisted}`);
    if (isBlacklisted) {
      throw new ForbiddenError(
        "Refresh token has been invalidated or blacklisted"
      );
    }

    // Retrieve the stored refresh token from Redis
    const storedToken = await this.redisClient.getRefreshToken(id);

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
