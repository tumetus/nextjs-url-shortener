import { redis } from "../../lib/redis";

export default async function handler(req, res) {
  let links = (await redis.hgetall("links")) || [];

  console.log(links);

  res.status(200).json({ links });
}
