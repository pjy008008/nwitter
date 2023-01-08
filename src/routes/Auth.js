import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
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

  //Sign in with Social Account
  const onSocialClick = (event) => {
    const name = event.target.name;
    if (name === "google") {
      //Sign in with Google
      const googleProvider = new GoogleAuthProvider();
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } else if (name === "github") {
      //Sign in with Github
      const githubProvider = new GithubAuthProvider();
      signInWithPopup(auth, githubProvider)
        .then((result) => {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  };
  return (
    <div>
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
      <br />
      <button name="google" onClick={onSocialClick}>
        Continue with Google
      </button>
      <button name="github" onClick={onSocialClick}>
        Continue with Github
      </button>
      <h1>{email}</h1>
      <h1>{password}</h1>
      <h1>{error}</h1>
    </div>
  );
};

export default Auth;
