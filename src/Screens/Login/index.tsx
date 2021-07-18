import { useState } from "react";

import { SignUpScreen } from "./../SignUpScreen";

import styles from "./styles.module.scss";

export const LoginScreen = () => {
  const [signIn, setSignIn] = useState<boolean>(false);

  const handleSignIn = (event: any) => {
    event?.preventDefault();
    setSignIn(true);
  };

  return (
    <div className={styles.loginScreen}>
      <div className={styles.background}>
        <img className={styles.logo} src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="" />
        <button className={styles.signInButton} onClick={() => setSignIn(true)}>
          Sign In
        </button>
        <div className={styles.gradient} />
      </div>

      <div className={styles.body}>
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited films, TV programmes and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className={styles.input}>
              <form onSubmit={handleSignIn}>
                <input type="email" placeholder="email address" />
                <button className={styles.button}>get started</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
