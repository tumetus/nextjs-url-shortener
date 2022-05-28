import { redis } from "../../lib/redis";

export default async function handler(req, res) {
  // todo : validate that url is valid url

  let links = await redis.hgetall("links");

  res.status(200).json({ links });
}
