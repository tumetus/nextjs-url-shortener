import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "YOUR_URL",
  token: "YOUR_TOKEN",
});
