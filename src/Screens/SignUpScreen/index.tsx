import { MouseEvent, useRef } from "react";
import { Link } from "react-router-dom";

//STYLING
import styles from "./styles.module.scss";
import { auth } from "../../firebase";

export const SignUpScreen = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const register = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (emailRef.current && passwordRef.current) {
      auth
        .createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const signIn = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      auth
        .signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then((authUser) => {
          console.log(authUser);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className={styles.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" ref={emailRef} required />
        <input type="password" placeholder="Password" ref={passwordRef} required />
        <button type="submit" onClick={signIn} className={styles.signInButton}>
          Sign In
        </button>
        <p className={styles.footerText}>
          <span>New to Netflix? </span>
          <button onClick={register}>Signup Now</button>
        </p>
      </form>
    </div>
  );
};
