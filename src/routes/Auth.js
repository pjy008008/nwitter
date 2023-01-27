import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import LocalLogin from "components/LocalLogin";
import styles from "./Auth.module.css";
import { useState } from "react";

const Auth = () => {
  const auth = getAuth();
  const [error, setError] = useState("");
  // const [errorMessage, seterrorMessage] = useState("");
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
          setError(error.message);
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
          setError(error.message);
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  };
  return (
    <div>
      <img
        className={styles.logo}
        src={`${process.env.PUBLIC_URL}/img/logo.png`}
      />
      <LocalLogin />
      {error && <p className={styles.error}>{error}</p>}
      <br />
      <div className={styles.socialLogin}>
        <button
          className={styles.loginForm}
          name="google"
          onClick={onSocialClick}
        >
          Continue with Google
          <img
            className={styles.socialLogo}
            src={`${process.env.PUBLIC_URL}/img/google.png`}
          />
        </button>
        <button
          className={styles.loginForm}
          name="github"
          onClick={onSocialClick}
        >
          Continue with Github
          <img
            className={styles.socialLogo}
            src={`${process.env.PUBLIC_URL}/img/github.png`}
          />
        </button>
      </div>
    </div>
  );
};

export default Auth;
