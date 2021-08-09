import { BaseRedisCache } from "apollo-server-cache-redis";
import Redis from "ioredis";

export const cache = new BaseRedisCache({
  client: new Redis({
    port: 6379,
    host: "127.0.0.1",
  }),
});
