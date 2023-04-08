import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout, user, isAuthenticated } = useAuth0();

  return (
    <div class="navbar">
      <div class="navbar-start">
        <a class="navbar-item">SleepingOwls</a>
      </div>
      <div class="navbar-end">
        {/* <a class="navbar-item">Home</a>
        <a class="navbar-item">About</a> */}

        {isAuthenticated && (
          <div className="flex items-center">
            <p>{user.email}</p>
            <a class="navbar-item">
              <button
                className="btn btn-primary"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            </a>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
