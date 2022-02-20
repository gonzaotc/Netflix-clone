import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase";
import Plans from "./Plans";

import "./ProfileScreen.scss";
const ProfileScreen = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch(error => {
        alert(error.code, error.message);
        console.log(error);
      });
  };

  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <NavBar />
      <div className="profile__container">
        <h1>Edit Profile</h1>
        <div className="profile__columnsContainer">
          <img
            className="profile__avatarImage"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="netflix avatar icon"
          />
          <div className="profile__info">
            <p className="profile__info__email">{user.email}</p>
            <Plans />
            <button className="logoutButton" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
