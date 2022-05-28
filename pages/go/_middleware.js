import { NextResponse } from "next/server";
import { redis } from "../../lib/redis";

export default async function middleware(req) {
  const response = NextResponse.next();

  // get the short url
  const pathname = req.nextUrl.pathname;
  let parts = pathname.split("/");
  let shortUrl = parts[parts.length - 1];

  console.log(shortUrl);

  // load long url from redis for short url
  const longUrl = await redis.hget("links", shortUrl);

  console.log(longUrl);

  // redirect to long url (if found)
  return NextResponse.redirect(longUrl);

  //   return response;
}
