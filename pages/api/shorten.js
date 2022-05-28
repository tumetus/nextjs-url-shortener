import { redis } from "../../lib/redis";

export default async function handler(req, res) {
  const { longUrl } = req.body;
  console.log(longUrl);

  // todo : validate that url is valid url (must be absolute url and include https://)

  // todo : check if shortUrl exists

  const shortUrl = makeShortUrl(4);

  // Save urls to hash "links" with the shortUrl being key and longUrl being value
  let result = await redis.hset("links", { [shortUrl]: longUrl });

  res.status(200).json({
    todo: "shorten the given url. ehkä tarvitaan joku toinen datatype kun lista koska kun pitää hakea short urlille arvo, niin listasta vaikea hakea?",
  });
}

const makeShortUrl = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
