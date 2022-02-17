import React from "react";

import "./Register.scss";

const Welcome = ({ setSignIn, email, setEmail }) => {
  const handleStart = e => {
    e.preventDefault();
    setSignIn(true);
  };

  return (
    <div className="loginScreen__hero__register">
      <h1>
        Películas y series ilimitadas <br /> y mucho más
      </h1>
      <h2>Disfruta donde quieras. Cancela cuando quieras.</h2>
      <h3>
        ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de
        Netflix.
      </h3>
      <form action="" onSubmit={handleStart}>
        <input
          onChange={e => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          value={email}
        />
        <button>Comenzar</button>
      </form>
    </div>
  );
};

export default Welcome;
