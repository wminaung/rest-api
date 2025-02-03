import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthRepo } from "../repositories/interfaces/IAuthRepo";
import { Service } from "./Service";
import { createUserSchema, CreateUserSchema } from "../../schemas/userSchema";
import { ForbiddenError, UnauthorizedError } from "../../errors";
import { PasswordHasher } from "../../helpers/PasswordHasher";
import configs from "../../configs";
import { JwtManager } from "../../helpers/JwtManager";

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
  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user)
      throw new UnauthorizedError("Invalid credentials - user not found");

    const isValidPassword = await this.passwordHasher.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword)
      throw new UnauthorizedError("Invalid credentials - wrong password");

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Generate Access Token and Refresh Token
    const accessToken = JwtManager.generateAccessToken(userWithoutPassword);
    const refreshToken = JwtManager.generateRefreshToken(userWithoutPassword);

    return { accessToken, refreshToken };
  }

  // Logout function (just an example, refresh tokens should be stored or invalidated)
  async logout(token: string) {
    const decoded = JwtManager.verifyAccessToken(token);
    if (!decoded) throw new ForbiddenError("Invalid token");

    const expiresIn = (decoded.exp ?? 3600) - Math.floor(Date.now() / 1000);
    if (expiresIn > 0) {
      // Optionally handle token blacklist/invalidation here
      // For example, storing the token in a blacklist database
    }
  }

  // Refresh Access Token using Refresh Token
  async refreshAccessToken(refreshToken: string) {
    const decoded = JwtManager.verifyRefreshToken(refreshToken);
    if (!decoded) throw new ForbiddenError("Invalid refresh token");

    // Here you can fetch user from the database if needed
    const { username, id, email, name, role, profilePicture } = decoded;

    // Generate new access token
    const newAccessToken = JwtManager.generateAccessToken({
      username,
      id,
      email,
      name,
      role,
      profilePicture,
    });

    return { accessToken: newAccessToken };
  }

  // End of class
}
