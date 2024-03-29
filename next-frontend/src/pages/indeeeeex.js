import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/login.module.css";

const Index = () => {
  const router = useRouter();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  // const { username } = user;

  // if (isAuthenticated) {
  //   router.push("/home");
  // }

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
