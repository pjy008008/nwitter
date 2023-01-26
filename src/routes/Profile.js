import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "fbase";
import styles from "./Profile.module.css";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate(`${process.env.PUBLIC_URL}/`);
  };
  const getMyNweets = async () => {
    const q = query(
      collection(db, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  });
  const onChange = (event) => {
    const { value } = event.target;
    setNewDisplayName((prev) => value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (newDisplayName !== userObj.displayName) {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className={styles.profileName}
          value={newDisplayName}
          onChange={onChange}
          type="text"
          placeholder="Displayname"
          required
        />
        <br />
        <input
          className={styles.updateBtn}
          type="submit"
          value="Update Profile"
        />
        <br />
        <hr />
        <br />
      </form>
      <button className={styles.logoutBtn} onClick={onLogOutClick}>
        Log out
      </button>
    </div>
  );
};

export default Profile;
