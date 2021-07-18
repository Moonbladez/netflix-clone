//MONDULES
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//COMPONENTS
import { HomeScreen } from "./Screens/HomeScreen";
import { LoginScreen } from "./Screens/Login";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { login, logout, selectUser } from "./features/user/userSlice";

import { auth } from "./firebase";

//styling
import "./App.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile" exact>
              <ProfileScreen />
            </Route>
            <Route path="/">
              <HomeScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
