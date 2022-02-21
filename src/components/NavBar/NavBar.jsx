import React, { useEffect, useLayoutEffect, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/user/userSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ userIcon = true }) => {
  const [showNavbarBackground, showShowNavbarBackground] = useState(false);
  const [showSubscriptionMessage, setShowSubscriptionMessage] = useState(false);
  const user = useSelector(selectUser);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      showShowNavbarBackground(true);
    } else {
      showShowNavbarBackground(false);
    }
  };

  useEffect(() => {
    // cuando se carga el componente NavBar, agregamos el listener
    // que escucha al scroll del usuario.
    window.addEventListener("scroll", transitionNavBar);
    // Limpiamos el event listener.
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  const handleShowSubscriptionMessage = () => {
    if (showSubscriptionMessage === false) {
      setShowSubscriptionMessage(true);
      window.setTimeout(() => {
        setShowSubscriptionMessage(false);
      }, 3000);
    }
  };

  return (
    <nav className={`navbar ${showNavbarBackground && "navbar__black"}`}>
      <div className="navbar__contents">
        {/* Si el usuario no tiene ningun plan premium, solo le refrescaria la pagina. */}
        {user?.role !== "default" ? (
          <Link to="/">
            <img
              className="navbar__logo"
              src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
              alt="Netflix logo"
            />
          </Link>
        ) : (
          <img
            className="navbar__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix logo"
            onClick={() => handleShowSubscriptionMessage()}
          />
        )}

        {showSubscriptionMessage && (
          <div className="subscriptionMessage">
            <div>
              <FontAwesomeIcon icon={faCircleInfo} className="icon" />
              Debees poseer una subscripción activa para poder acceder.
            </div>
          </div>
        )}

        {userIcon && (
          <Link to="/profile">
            <img
              className="navbar__avatar"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="netflix avatar icon"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
