import React, { useState } from "react";
import Login from "./Login";

import "./LoginScreen.scss";
import Welcome from "./Welcome";

const LoginScreen = () => {

  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginScreen">
      <div className="loginScreen__hero">
        <div className="loginScreen__hero__navbar">
          <img
            className="navbar__logo"
            src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
            alt="Netflix logo"
          />
          {!signIn && (
            <span>
              <button>Español</button>
              <button onClick={() => setSignIn(!signIn)}>Iniciar sesión</button>
            </span>
          )}
        </div>

        {!signIn && <Welcome setSignIn={setSignIn} email={email} setEmail={setEmail} />}
        {signIn && (
          <Login
            setSignIn={setSignIn}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
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
