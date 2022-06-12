import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  h1: {
    textTransform: "uppercase",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  textInput: {
    width: "100%",
    padding: "8px 5px",
    fontSize: "1.2em",
  },
  saveButton: {
    padding: "10px 5px",
    width: "100%",
    margin: "5px 0 0 0",
    fontSize: "1.2em",
  },
  table: {
    width: "100%",
    margin: "30px 0 0 0",
  },
  tableHeader: {
    fontWeight: "bold",
  },
  tableShortUrlCell: {
    padding: "5px 20px 5px 0",
    width: "50%",
    cursor: "pointer",
  },
};

export default function Home() {
  let [longUrl, setLongUrl] = useState("");
  let [links, setLinks] = useState({});

  const onCreate = async (e) => {
    e.preventDefault();

    console.log(`Make this short: ${longUrl}`);

    const result = await axios.post("/api/shorten", { longUrl });

    console.log(result);

    setLongUrl("");
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

  const onShortUrlClick = (shortUrl) => {
    const url = `http://localhost:3000/go/${shortUrl}`;
    navigator.clipboard.writeText(url).then(
      () => {
        /* Resolved - text copied to clipboard */
        console.log("Copied link to the clipboard");
      },
      () => {
        /* Rejected - clipboard failed */
        alert("Could not copy the link to clipboard.");
      }
    );
  };

  useEffect(() => {
    (async () => {
      await refreshLinks();
    })();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Url shortener</h1>
      <div>
        <h2>Create a short url</h2>
        <input
          type="text"
          placeholder="Enter long url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={styles.textInput}
        />
        <button onClick={onCreate} style={styles.saveButton}>
          Make it short
        </button>
      </div>
      <div>
        <table style={styles.table}>
          <thead>
            <tr>
              <td style={styles.tableHeader}>Short url</td>
              <td style={styles.tableHeader}>Original url</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(links).map((short) => {
              // links is form of { shortUrl: longUrl }, so the short url is key
              const long = links[short];
              return (
                <tr key={short}>
                  <td
                    style={styles.tableShortUrlCell}
                    onClick={() => onShortUrlClick(short)}
                  >{`http://localhost:3000/go/${short}`}</td>
                  <td>{long}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
