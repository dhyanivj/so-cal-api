import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

const Index = () => {
  const router = useRouter();

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  if (isAuthenticated) {
    router.push("/home");
  }
  return (
    <div>
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={150}
        height={100}
        className="p-5 mx-auto"
      />

      <div className="bg-blue-500 h-screen rounded-t-3xl flex pt-10 justify-center">
        <button
          className="btn btn-primary rounded-full px-10"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
        {isAuthenticated && (
          <div>
            <p>{user.email}</p>
          </div>
        )}
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Index;
