import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import LocalLogin from "components/LocalLogin";
import styles from "./Auth.module.css";

const Auth = () => {
  const auth = getAuth();
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
      <h1>Twitter</h1>
      <LocalLogin />
      <br />
      <div className={styles.socialLogin}>
      <button className={styles.loginForm} name="google" onClick={onSocialClick}>
        Continue with Google
      </button>
      <br />
      <button className={styles.loginForm} name="github" onClick={onSocialClick}>
        Continue with Github
      </button>
      </div>
    </div>
  );
};

export default Auth;
