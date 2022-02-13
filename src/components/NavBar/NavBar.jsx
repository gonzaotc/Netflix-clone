import React, { useEffect, useState } from "react";

import "./NavBar.scss";
const NavBar = () => {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    // cuando se carga el componente NavBar, agregamos el listener
    // que escucha al scroll del usuario.
    window.addEventListener("scroll", transitionNavBar);
    // Limpiamos el event listener.
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <nav className={`navbar ${show && "navbar__black"}`}>
      <div className="navbar__contents">
        <img
          className="navbar__logo"
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Netflix logo"
        />
        <img
          className="navbar__avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="netflix avatar icon"
        />
      </div>
    </nav>
  );
};

export default NavBar;
