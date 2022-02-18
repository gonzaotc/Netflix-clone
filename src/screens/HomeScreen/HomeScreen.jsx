import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import NavBar from "../../components/NavBar/NavBar";
import Content from "../../components/Content/Content";
import "./HomeScreen.scss";
import Spinner from "../../components/Spinner/Spinner";

import axios from "../../api/axios";
import requests from "../../api/requests";

const truncate = string => {
  return string.length > 200 ? string.slice(0, 200) + "..." : string;
};

const HomeScreen = () => {
  const [loading, setIsLoading] = useState(true);

  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const movies = request.data.results;
        for (let movie of movies) {
          movie.overview = truncate(movie.overview);
        }
        setBannerMovies(movies);
        setIsLoading(false);
        return request;
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homeScreen">
      <>
        {loading && <Spinner />}
        {!loading && (
          <>
            <NavBar />
            <Banner bannerMovies={bannerMovies} />
            <Content />
          </>
        )}
      </>
    </div>
  );
};

export default HomeScreen;
