import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthRepo } from "../repositories/interfaces/IAuthRepo";
import { Service } from "./Service";
import { createUserSchema, CreateUserSchema } from "../../schemas/userSchema";
import { ForbiddenError, UnauthorizedError } from "../../errors";
import { PasswordHasher } from "../../helpers/PasswordHasher";
import { JwtManager } from "../../helpers/JwtManager";
import { redis } from "../../lib/redis";

type LoginReturnType = { accessToken: string; refreshToken: string };
type RefreshAccessTokenReturnType = { accessToken: string };
type LogoutReturnType = { message: string };
export class AuthService extends Service {
  constructor(
    private authRepository: IAuthRepo,
    private passwordHasher: PasswordHasher
  ) {
    super();
  }

  // Register new user
  async register(data: CreateUserSchema) {
    const validData = this.validate(data, createUserSchema);
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
    if (!user)
      throw new UnauthorizedError("Invalid credentials - user not found");

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

  async logout(refreshToken: string): Promise<LogoutReturnType> {
    // Decode and verify the refresh token
    const decoded = JwtManager.verifyRefreshToken(refreshToken);
    if (!decoded) throw new UnauthorizedError("Invalid refresh token");

    // Add the refresh token to the blacklist
    await redis.sadd(`blacklist:${decoded.id}`, refreshToken);

    // remove the refresh token from Redis to make it invalid
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
