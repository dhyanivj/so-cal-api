import { useState, useEffect } from "react";

const blr = () => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const domain = "sleepingowls.us.auth0.com";
    const userId = "auth0|64312adbd49e0116b496ab49";

    const getToken = async () => {
      const response = await fetch(`https://${domain}/oauth/token`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: "XhW0cVDhZNTFZSk2FroEe0bm0RZix4zB",
          client_secret:
            "9SmEFVCBPiIzGdtMWnWGXpEH-u4Q5QWuFAyoKHBks90Rdy2U0b9kHXg0OXNmrGTK",
          audience: `https://${domain}/api/v2/`,
        }),
      });
      const data = await response.json();
      return data.access_token;
    };

    const getUserMetadata = async (domain, userId) => {
      const token = await getToken();
      const response = await fetch(`https://${domain}/api/v2/users/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data.user_metadata;
    };

    getUserMetadata(domain, userId)
      .then((metadata) => setMetadata(metadata))
      .catch((error) => console.error(error));
  }, []);

  const gst = metadata ? metadata.gst : null;

  return <div>{gst ? <p>GST: {gst}</p> : <p>Loading metadata...</p>}</div>;
};

export default blr;
