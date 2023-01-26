import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <img
              className={styles.nav1}
              alt="twitter-logo"
              src={`${process.env.PUBLIC_URL}/img/logo.png`}
            />
          </Link>
        </li>
        <li>
          <Link to={"/profile"}>
            <img
              className={styles.nav2}
              alt="profile-logo"
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
