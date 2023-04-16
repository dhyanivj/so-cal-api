import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/login.module.css";

const Index = () => {
  const [metadata, setMetadata] = useState(null);
  const router = useRouter();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  // login redirect to the rates page
  if (isAuthenticated) {
    router.push("/home");
  }

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

  return (
    <div className={styles.login__wrapper}>
      <div className={styles.bg__lines}>
        <div className="flex items-center justify-between mx-5">
          <img src="./images/logo-white.png" alt="logo" width={300} />
          <div className="flex gap-5 items-center">
            <span className="text-white">Home</span>
            <span className="text-white">lorem</span>

            {isAuthenticated && (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="btn btn-primary bg-white text-black "
              >
                Log Out
              </button>
            )}

            <button className="btn bg-yellow-500 rounded">Contact us</button>
          </div>
        </div>
        {/* header ends here  */}
        <div className="flex mx-10 items-center mt-10">
          <div className="mr-10">
            <p className={styles.playfairfont}>
              Sweet dreams start with a comfortable bed and soft bedding.
            </p>
            <p className="text-white my-7">
              Soft, high-quality bedsheets are essential for a good night's
              sleep. Invest in bedding that balances softness, durability, and
              value. Upgrade your sleep experience today with Sleeping Owls.
            </p>
            <button
              className="btn bg-yellow-500 rounded font-bold px-10"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>

            {/* user info */}
            {isAuthenticated && (
              <div className="bg-red-500 p-3 rounded-lg m-5">
                <p className="font-bold">Test User Data : </p>
                <p>{user.email}</p>
                <p>{user.updated_at}</p>
                <p>{user.last_login}</p>
                <p>{user.name} </p>
                {/* <p>{console.log(user)}</p> */}

                <div className="bg-gray-500 p-5 m-5 rounded">
                  <div>
                    {gst ? <p>GST: {gst}</p> : <p>Loading metadata...</p>}
                  </div>
                </div>
              </div>
            )}
            {/* END user info  */}
          </div>
          <div>
            <img src="./images/sleeping-illus.svg" alt="sleep" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
