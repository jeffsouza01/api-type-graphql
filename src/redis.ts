import Redis from "ioredis";

export const redis = new Redis({
  port: 6379,
  host: "192.168.99.100"
});