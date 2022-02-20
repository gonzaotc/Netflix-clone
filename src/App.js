import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { selectIsLogged, selectUser, userActions } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";

function App() {
  const [loadingUser, setLoadingUser] = useState(true);

  // const user = useSelector(selectUser);
  const isLogged = useSelector(selectIsLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    // Triggers if auth state change ->login, register, logout
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        //if userAuth is not undefined, is logged.
        dispatch(
          userActions.login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
          //Share the user state with the state store.
        );
      } else {
        dispatch(userActions.logout());
        //Share the user state with the state store.
      }
      setTimeout(() => {
        setLoadingUser(false);
      }, 1);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {loadingUser && <LoadingScreen />}
        <Routes>
          {!loadingUser && isLogged && (
            <>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </>
          )}
          {!loadingUser && !isLogged && <Route path="/login" element={<LoginScreen />} />}

          {!loadingUser && <Route path="*" element={<Navigate to={isLogged ? "/" : "/login"} />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
