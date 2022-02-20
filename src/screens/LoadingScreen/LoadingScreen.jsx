import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Spinner from "../../components/Spinner/Spinner";

import './LoadingScreen.scss'

const LoadingScreen = () => {
  return (
    <div className="loadingScreen">
      <NavBar userIcon={false} />
      <Spinner />
    </div>
  );
};

export default LoadingScreen;
