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
  if (longUrl) {
    // short url found
    const validUrl = getValidUrl(longUrl);
    // redirect to long url
    return NextResponse.redirect(validUrl);
  } else {
    // redirect to the domain root
    return NextResponse.redirect(req.nextUrl.origin);
  }
}

const getValidUrl = (link) => {
  if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    // Link has http or https -> return as is
    return link;
  } else {
    // Link doesn't have http or https -> add it
    return `https://${link}`;
  }
};
