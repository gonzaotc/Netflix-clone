import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";
import Content from "../../components/Content/Content";
import "./HomeScreen.scss";
import Spinner from "../../components/Spinner/Spinner";

const HomeScreen = () => {
  const [isBannerLoading, setIsBannerLoading] = useState(true);

  return (
    <div className="homeScreen">
      <>
        {isBannerLoading && <Spinner />}
        <NavBar />
        <Banner isBannerLoading={isBannerLoading} setIsBannerLoading={setIsBannerLoading} />
        <Content isBannerLoading={isBannerLoading} />
      </>
    </div>
  );
};

export default HomeScreen;
