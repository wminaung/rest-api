export default {
  port: process.env.PORT || 3000,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET!,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET!,
  baseUrl: process.env.JWT_REFRESH_TOKEN_SECRET!,
  upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL!,
  upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
};
