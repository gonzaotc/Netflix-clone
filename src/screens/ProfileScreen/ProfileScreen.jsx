import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase";

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
            <h3 className="profile__info__plansTitle">Planes (Plan actual: premium)</h3>
            <p className="profile__info__renewal">Renewal date: 04/03/2021</p>
            <span className="profile__info__plan">
              <span>
                <span>Netflix Standard</span> <span>1080p</span>
              </span>
              <button>Suscribir</button>
            </span>
            <span className="profile__info__plan">
              <span>
                <span>Netflix Basic</span> <span>480p</span>
              </span>
              <button>Suscribir</button>
            </span>
            <span className="profile__info__plan">
              <span>
                <span>Netflix Premium</span> <span>4K+HDR</span>
              </span>
              <button className="buttonActual">Suscripcion actual</button>
            </span>
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
