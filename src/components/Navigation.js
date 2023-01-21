import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link className={styles.nav} to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link className={styles.nav} to={"/profile"}>{userObj.displayName}'s profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
