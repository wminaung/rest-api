export interface IRedisClient {
  setRefreshToken(userId: string, token: string): Promise<string | null>;
  getRefreshToken(userId: string): Promise<unknown>;

  deleteRefreshToken(userId: string): Promise<number>;
  blacklistRefreshToken(userId: string, token: string): Promise<number>;

  isTokenBlacklisted(userId: string, token: string): Promise<0 | 1>;

  blacklistAccessToken(
    accessToken: string,
    timeToExpire: number
  ): Promise<string | null>;
}
