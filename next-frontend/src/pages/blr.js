import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function blr() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    getAccessTokenSilently,
    getUser,
  } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const userData = await getUser({
          audience: "https://sleepingowls.us.auth0.com/userinfo",
          scope: "read:current_user",
        });
        setUserMetadata(userData.user_metadata);
      } catch (error) {
        console.log(error);
      }
    };

    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div>
      {isAuthenticated && (
        <>
          <p>Hello, {user.name}!</p>
          <p>Your email is: {user.email}</p>
          {userMetadata && (
            <p>
              Your custom metadata value is: {userMetadata.custom_metadata_key}
            </p>
          )}
        </>
      )}

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
    </div>
  );
}

export default blr;
