import { Redis } from "@upstash/redis";
import configs from "../shared/configs";

export const redis = new Redis({
  url: configs.upstashRedisRestUrl,
  token: configs.upstashRedisRestToken,
});

// await redis.set("foo", "bar");
// const data = await redis.get("foo");
