import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>
            <img
              className={styles.nav1}
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
            />
          </Link>
        </li>
        <li>
          <Link to={"/profile"}>
            <img
              className={styles.nav2}
              src={`${process.env.PUBLIC_URL}/img/user.png`}
            />
            <p className={styles.userName}>{userObj.displayName}의 프로필</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
