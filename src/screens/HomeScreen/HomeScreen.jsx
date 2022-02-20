import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";
import Content from "../../components/Content/Content";
import "./HomeScreen.scss";
import Spinner from "../../components/Spinner/Spinner";

const HomeScreen = () => {
  const [loading, setIsLoading] = useState({
    bannerLoading: true,
    row1Loading: true,
    row2Loading: true,
    row3Loading: true,
    row4Loading: true,
  });
  const allLoaded =
    !loading.bannerLoading &&
    !loading.row1Loading &&
    !loading.row2Loading &&
    !loading.row3Loading &&
    !loading.row4Loading;

  return (
    <div className="homeScreen">
      <>
        {!allLoaded && <Spinner />}
        <NavBar />
        <Banner loading={loading} setIsLoading={setIsLoading} />
        <Content loading={loading} setIsLoading={setIsLoading} />
      </>
    </div>
  );
};

export default HomeScreen;
