import React, { useEffect, useState } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Login.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = ({ setSignIn, email, setEmail }) => {
  const [isRegister, setIsRegister] = useState(false);

  const [firebaseErrorMessage, setFirebaseErrorMessage] = useState(null);

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [validateObj, setValidateObj] = useState({ name: true, email: true, password: true });

  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer = setTimeout(() => {
      setFirebaseErrorMessage(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [firebaseErrorMessage]);

  const handleRegister = () => {
    setValidateObj({
      name: name.trim().length > 0,
      email: email.length > 0,
      password: password.trim().length >= 6,
    });
    if (!validateObj.name || !validateObj.email || !validateObj.password) {
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        console.log(`Cuenta creada con éxito!`, "\n", userAuth);
        setPassword("");
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        if (error.message.toString().includes("email-already-in-use")) {
          setFirebaseErrorMessage("Ya hay un usuario registrado con ese correo.");
        } else if (error.message.toString().includes("auth/weak-password")) {
          setFirebaseErrorMessage("La contraseña debe tener al menos 6 caracteres.");
        } else if (error) {
          setFirebaseErrorMessage("Error de tipo desconocido. Consulte con el equipo técnico.");
        }
        setPassword("");
        setIsLoading(false);
      });
  };
  const handleLogin = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        console.log("Usuario logeado con éxito!", "\n", userAuth);
        navigate("/", { replace: true });
        setPassword("");
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.code, error.message);
        if (error.message.toString().includes("invalid-email")) {
          setFirebaseErrorMessage("No se encontró ningún usuario registrado con ese correo.");
        } else if (
          error.message.toString().includes("wrong-password") ||
          password.trim().length === 0
        ) {
          setFirebaseErrorMessage("La contraseña no es correcta.");
        } else if (error) {
          setFirebaseErrorMessage("Error de tipo desconocido. Consulte con el equipo técnico.");
        }
        setPassword("");
        setIsLoading(false);
      });
  };

  return (
    <div className="loginScreen__hero__login">
      <h1>{!isRegister ? "Inicia sesión" : "Registrate"}</h1>
      <form action="" onSubmit={e => e.preventDefault()}>
        {isRegister && (
          <input
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Nombre y apellido"
            value={name}
          />
        )}
        {isRegister && !validateObj.name && (
          <p className="errorMessage">{"El nombre no debe ser vacio."}</p>
        )}
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        />
        {!validateObj.email && <p className="errorMessage">{"El email debe ser válido."}</p>}
        <input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          value={password}
        />
        {!validateObj.password && (
          <p className="errorMessage">{"La contraseña debe tener al menos 6 caracteres"}</p>
        )}
        {!loading && !isRegister && <button onClick={() => handleLogin()}>Iniciar sesión</button>}
        {!loading && isRegister && <button onClick={() => handleRegister()}>Registrarse</button>}
        {loading && (
          <button className="loadingButton">
            <FontAwesomeIcon className="loadingIcon" icon={faSpinner} pulse />
          </button>
        )}
        {firebaseErrorMessage && <p className="errorMessage">{firebaseErrorMessage}</p>}
        <span className="login__extras">
          <span className="login__extras__content">
            <input id="remember" value="remember" type="checkbox" />
            <label htmlFor="remember">Recuérdame</label>
          </span>
          <p>¿Necesitas ayuda?</p>
        </span>
      </form>
      <span className="subscribeNow">
        <p>{!isRegister ? "¿Primera vez en Netflix?" : "¿Ya tienes una cuenta?"}</p>
        <a onClick={() => setIsRegister(!isRegister)}>
          {!isRegister ? "Suscribete ya." : "Iniciar sesión"}
        </a>
      </span>
    </div>
  );
};

export default Login;
