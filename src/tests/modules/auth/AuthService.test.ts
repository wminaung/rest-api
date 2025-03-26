import { AuthRepo } from "../../../modules/auth/repositories/AuthRepo";
import { AuthService } from "../../../modules/auth/services/AuthService";
import { CreateUserSchema } from "../../../shared/schemas/userSchema";
import { passwordHasher } from "../../../shared/security/PasswordHasher"; // Actual instance
import prisma from "../../mocks/prisma";
import { JwtManager } from "../../../shared/security/JwtManager";
import { redis, RedisClient } from "../../../shared/lib/RedisClient";
import { IRedisClient } from "../../../shared/interfaces/redisClient.interface";
import { Redis } from "@upstash/redis";

class RedisClientMock implements IRedisClient {
  constructor(private redis: Redis) {}
  setRefreshToken = jest.fn();

  getRefreshToken = jest.fn();
  deleteRefreshToken(userId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  blacklistRefreshToken(userId: string, token: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  isTokenBlacklisted = jest.fn();
  blacklistAccessToken(
    accessToken: string,
    timeToExpire: number
  ): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
}

const redis_client_static_getInstance = (redis: Redis) => {
  return new RedisClientMock(redis);
};

describe("AuthService", () => {
  let authService: AuthService;
  let authRepo: AuthRepo;
  let redisClientMod: RedisClientMock;
  // let redisClient: RedisClient;

  beforeAll(() => {
    authRepo = new AuthRepo(prisma);
    // redisClient = RedisClient.getInstance(redis);
    redisClientMod = redis_client_static_getInstance(redis);
    authService = AuthService.getInstance(
      authRepo,
      passwordHasher,
      redisClientMod
    );
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user", async () => {
    const userData: CreateUserSchema = {
      email: "testing@domain.com",
      password: "A34567890@securePassword",
      role: "USER",
      name: "test user",
    };
    const hashPassword = await passwordHasher.hashPassword(userData.password);

    prisma.user.create.mockResolvedValue({
      id: "mocked-user-id",
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: hashPassword,
    } as unknown as any);

    const createdUser = await authService.register(userData);

    expect(createdUser).toHaveProperty("id");
    expect(createdUser.email).toBe(userData.email);
    expect("A34567890@securePassword").toBe(userData.password);
  });

  it("should log in a user", async () => {
    const loginData = {
      email: "test@domain.com",
      password: "A34567890@securePassword",
    };
    const hashedPassword = await passwordHasher.hashPassword(
      loginData.password
    );
    authRepo.findByEmail = jest.fn().mockResolvedValue({
      id: "mocked-user-id",
      email: loginData.email,
      password: hashedPassword, // The stored hashed password
      role: "USER",
      name: "test user",
    });

    redisClientMod.setRefreshToken = jest
      .fn()
      .mockResolvedValue("mocked-token");
    const result = await authService.login(loginData.email, loginData.password);
    expect(authRepo.findByEmail).toHaveBeenCalledWith(loginData.email);
    expect(
      await passwordHasher.comparePassword(loginData.password, hashedPassword)
    ).toBe(true);
    expect(result).toHaveProperty("accessToken");
    expect(result).toHaveProperty("refreshToken");
  });

  it("should get refresh access token", async () => {
    const accessToken = JwtManager.generateAccessToken({
      id: `abc-def-ghi`,
      email: `test@domain.com`,
      name: `test user`,
      role: `USER`,
    });

    const refreshToken = JwtManager.generateRefreshToken({
      id: `abc-def-ghi`,
      email: `test@domain.com`,
      name: `test user`,
      role: `USER`,
    });
    const storedToken = refreshToken; // mod
    redisClientMod.isTokenBlacklisted = jest.fn().mockResolvedValue(0); // assume token is not blacklisted
    redisClientMod.getRefreshToken = jest.fn().mockResolvedValue(storedToken);
    const result = await authService.refreshAccessToken(refreshToken);

    expect(result).toHaveProperty("accessToken");
  });
});
