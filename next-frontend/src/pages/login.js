import React from "react";

import Image from "next/image";

const login = () => {
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
        <a href="/" className="btn btn-primary rounded-full px-10 ">
          Login
        </a>
      </div>
    </div>
  );
};

export default login;
