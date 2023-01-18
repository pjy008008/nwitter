import React from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

const LocalLogin = () => {
  const auth = getAuth();
  const [newAccount, setNewAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const onChange = (event) => {
    const { name, value } = event.target;
    // const {target: {name,value}}=event;
    if (name === "email") {
      setEmail((prev) => value);
    } else if (name === "password") {
      setPassword((prev) => value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const onChange = (event) => {
      const { name, value } = event.target;
      // const {target: {name,value}}=event;
      if (name === "email") {
        setEmail((prev) => value);
      } else if (name === "password") {
        setPassword((prev) => value);
      }
    };
    if (newAccount) {
      //Create new account
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          //console error
          setError(error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      //Sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          setError(error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          onChange={onChange}
          placeholder="email"
          required
          value={email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign in"}
        />
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
};
export default LocalLogin;
