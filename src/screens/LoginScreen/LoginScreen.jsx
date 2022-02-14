import React from "react";

import "./LoginScreen.scss";

const LoginScreen = () => {
  return (
    <div className="loginScreen">
      <div className="loginScreen__hero">
        <div className="loginScreen__hero__navbar">
          <img
            className="navbar__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix logo"
          />
          <span>
            <button>Español</button>
            <button>Iniciar sesión</button>
          </span>
        </div>
        <div className="loginScreen__hero__content">
          <h1>
            Películas y series ilimitadas <br /> y mucho más
          </h1>
          <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>
          <h3>
            ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía
            de Netflix.
          </h3>
          <form action="">
            <input type="text" placeholder="Email"/>
            <button>Comenzar</button>
          </form>
        </div>
      </div>
      <div className="loginScreen__hero__filter"></div>
      <div className="loginScreen__features">
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
        <p>text</p>
      </div>
    </div>
  );
};

export default LoginScreen;
