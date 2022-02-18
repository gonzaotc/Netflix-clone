import React, { useState } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = ({ setSignIn, email, setEmail, password, setPassword }) => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        console.log(`Cuenta creada con éxito!`, "\n", userAuth);
        setEmail("");
        setPassword("");
      })
      .catch(error => {
        alert(error.code, error.message);
        setIsLoading(false);
        console.log(error);
      });
  };
  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        console.log("Usuario logeado con éxito!", "\n", userAuth);
        navigate("/", { replace: true });
      })
      .catch(error => {
        alert(error.code, error.message);
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="loginScreen__hero__login">
      <h1>Inicia sesión</h1>
      <form action="" onSubmit={e => e.preventDefault()}>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          value={password}
        />
        {!loading && <button onClick={() => handleLogin()}>Iniciar sesión</button>}
        {loading && (
          <button className="loadingButton">
            <FontAwesomeIcon className="loadingIcon" icon={faSpinner} pulse />
          </button>
        )}
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
        <a onClick={() => handleRegister()}>Suscríbete ya.</a>
      </span>
    </div>
  );
};

export default Login;
