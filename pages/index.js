import React, { useState, useEffect } from "react";
import axios from "axios";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

export default function Home() {
  let [longUrl, setLongUrl] = useState("");
  let [links, setLinks] = useState({});

  const onCreate = async (e) => {
    e.preventDefault();

    console.log(`Make this short: ${longUrl}`);

    const result = await axios.post("/api/shorten", { longUrl });

    console.log(result);

    await refreshLinks();
  };

  const getLinks = async () => {
    const response = await axios.get("/api/links");
    return response?.data?.links;
  };

  const refreshLinks = async () => {
    let linkObjects = await getLinks();
    setLinks(linkObjects);
  };

  useEffect(() => {
    (async () => {
      await refreshLinks();
    })();
  }, []);

  return (
    <div>
      <h1>Url shortener</h1>
      <div>
        <h2>Create short url</h2>
        <input
          type="text"
          placeholder="Enter long url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={onCreate}>Create</button>
      </div>
      <div>
        {Object.keys(links).map((short) => {
          // links is form of { shortUrl: longUrl }, so the short url is key
          const long = links[short];
          return <div key={short}>{`${short}: ${long}`}</div>;
        })}
      </div>
    </div>
  );
}
