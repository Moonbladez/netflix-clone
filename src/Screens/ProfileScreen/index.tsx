import { useSelector } from "react-redux";

import { Navbar } from "./../../Components/Navbar";
import { PlansScreen } from "./../PlansScreen";
import { selectUser } from "../../features/user/userSlice";
import { auth } from "./../../firebase";
import styles from "./ProfileScreen.module.scss";

export const ProfileScreen = (): JSX.Element => {
  const user = useSelector(selectUser);
  return (
    <div className={styles.profileScreen}>
      <Navbar />
      <main className={styles.body}>
        <h1>Edit Profile</h1>
        <div className={styles.info}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="profile avatar"
            loading="lazy"
          />
          <div className={styles.details}>
            {user && <input type="text" value={user.email} disabled />}
            <div className={styles.plans}>
              <h2>Plans</h2>
              <PlansScreen />
              <button className={styles.signOutButton} onClick={() => auth.signOut()}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
