import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import styles from "./styles.module.scss";

export const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const history = useHistory();

  const stylingClassName: string = !show ? `${styles.nav}` : `${styles.nav} ${styles.navBlack}`;

  const transitionNavBar = (): void => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`${stylingClassName}`}>
      <div className={styles.content}>
        <img
          src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
          alt="logo"
          className={styles.logo}
          onClick={() => history.push("/")}
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="profile"
          className={styles.avatar}
          onClick={() => history.push("/profile")}
        />
      </div>
    </div>
  );
};
