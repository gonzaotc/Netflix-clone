import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import db, { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { selectIsLogged, selectUser, userActions } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [loadingUser, setLoadingUser] = useState(true);

  const user = useSelector(selectUser);
  const isLogged = useSelector(selectIsLogged);

  const dispatch = useDispatch();
  useEffect(() => {
    // Triggers if auth state change ->login, register, logout
    const unsubscribe = onAuthStateChanged(auth, async userAuth => {
      setLoadingUser(true);
      //if userAuth is not undefined, is logged.
      if (userAuth) {
        // User is auth -> try to get his role.
        await getDocs(collection(db, `customers/${userAuth.uid}/subscriptions`)).then(
          querySnapshot => {
            if (querySnapshot.docs.length === 0) {
              // Has 0 subscriptions -> default.
              dispatch(
                userActions.login({
                  uid: userAuth.uid,
                  email: userAuth.email,
                  role: "default",
                })
              );
              setTimeout(() => {
                setLoadingUser(false);
              }, 1);
            } else {
              querySnapshot.forEach(async subscription => {
                dispatch(
                  userActions.login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                    role: subscription.data().role,
                  })
                );
                setTimeout(() => {
                  setLoadingUser(false);
                }, 1);
              });
            }
          }
        );
      } else {
        dispatch(userActions.logout());
        setTimeout(() => {
          setLoadingUser(false);
        }, 1);
        //Share the user state with the state store.
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // console.log(user.role);
  return (
    <div className="App">
      <BrowserRouter>
        {loadingUser && <LoadingScreen />}
        <Routes>
          {!loadingUser && isLogged && (
            <>
              <Route
                path="/"
                element={user?.role == "default" ? <Navigate to={"/profile"} /> : <HomeScreen /> }
              />
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
