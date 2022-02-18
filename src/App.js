import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { selectUser, userActions } from "./features/user/userSlice";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        dispatch(
          userActions.login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(userActions.logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        {!user && <LoginScreen />}
        {user && (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
