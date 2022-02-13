import React from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";
import Content from "../../components/Content/Content";
import "./HomeScreen.scss";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      {/* Nav */}
      <NavBar />
      {/* Banner */}
      <Banner />
      {/* Rows */}
      <Content />

      {/* Footer */}
    </div>
  );
};

export default HomeScreen;
