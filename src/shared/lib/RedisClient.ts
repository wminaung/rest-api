import { Redis } from "@upstash/redis";
import configs from "../configs";
import { IRedisClient } from "../interfaces/redisClient.interface";

export const redis = new Redis({
  url: configs.upstashRedisRestUrl,
  token: configs.upstashRedisRestToken,
});

export class RedisClient implements IRedisClient {
  private static instance: RedisClient;
  static getInstance(redis: Redis) {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(redis);
    }
    return RedisClient.instance;
  }

  constructor(private redis: Redis) {}

  async setRefreshToken(userId: string, token: string): Promise<string | null> {
    return this.redis.set(`refreshToken:${userId}`, token, {
      ex: 60 * 60 * 24 * 7,
    });
  }

  async getRefreshToken(userId: string): Promise<unknown> {
    return this.redis.get(`refreshToken:${userId}`);
  }

  async deleteRefreshToken(userId: string): Promise<number> {
    return this.redis.del(`refreshToken:${userId}`);
  }

  async blacklistRefreshToken(userId: string, token: string): Promise<number> {
    return this.redis.sadd(`blacklist:${userId}`, token);
  }

  async isTokenBlacklisted(userId: string, token: string): Promise<0 | 1> {
    return this.redis.sismember(`blacklist:${userId}`, token);
  }

  async blacklistAccessToken(
    accessToken: string,
    timeToExpire: number
  ): Promise<string | null> {
    return this.redis.set(`blacklistedAccessToken:${accessToken}`, "true", {
      ex: timeToExpire,
    });
  }
}
