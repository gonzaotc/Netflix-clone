import React, { useState } from "react";

import "./LoginScreen.scss";

const LoginScreen = ({ setIsLogged}) => {
  const [signIn, setSignIn] = useState(true);
  return (
    <div className="loginScreen">
      <div className="loginScreen__hero">
        <div className="loginScreen__hero__navbar">
          <img
            className="navbar__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix logo"
          />
          {!signIn && <span>
            <button>Español</button>
            <button onClick={() => setSignIn(!signIn)}>Iniciar sesión</button>
          </span>}
        </div>
        {!signIn && (
          <div className="loginScreen__hero__register">
            <h1>
              Películas y series ilimitadas <br /> y mucho más
            </h1>
            <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>
            <h3>
              ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu
              membresía de Netflix.
            </h3>
            <form action="">
              <input type="text" placeholder="Email" />
              <button>Comenzar</button>
            </form>
          </div>
        )}
        {signIn && (
          <div className="loginScreen__hero__login">
            <h1>Inicia sesión</h1>
            <form action="">
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Contraseña" />
              <button onClick={() => { setIsLogged(true)}}>Iniciar sesión</button>
              <span className="login__extras">
                <span className="login__extras__content">
                  <input id="remember" value="remember" type="checkbox" />
                  <label htmlFor="remember">Recuérdame</label>
                </span>
                <p>¿Necesitas ayuda?</p>
              </span>
            </form>
            <span className="subscribeNow">
              <p>¿Primera vez en Netflix?</p>
              <a onClick={ () => setSignIn(!signIn)}>Suscríbete ya.</a>
            </span>
          </div>
        )}
      </div>
      <div className="loginScreen__hero__filter"></div>
      <div className="loginScreen__features">
        <div className="extras"></div>
      </div>
    </div>
  );
};

export default LoginScreen;
