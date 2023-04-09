import React from "react";
import styles from "../styles/login.module.css";

const login = () => {
  return (
    <div className={styles.login__wrapper}>
      <div className={styles.bg__lines}>
        <div className="flex items-center justify-between mx-5">
          <img src="./images/logo-white.png" alt="logo" width={300} />
          <div className="flex gap-5 items-center">
            <span className="text-white">Home</span>
            <span className="text-white">lorem</span>
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              corporis ratione quae? Nesciunt amet commodi excepturi sunt harum
              ipsum libero ull?
            </p>
            <button className="btn bg-yellow-500 rounded font-bold">
              Login
            </button>
          </div>
          <div>
            <img src="./images/sleeping-illus.svg" alt="sleep" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
