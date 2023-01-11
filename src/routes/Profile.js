import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};
export default Profile;
