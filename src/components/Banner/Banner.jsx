import React, { useEffect, useState } from "react";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "./Banner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo, faMedal } from "@fortawesome/free-solid-svg-icons";

import axios from "../../api/axios";
import requests from "../../api/requests";

const truncate = string => {
  return string.length > 200 ? string.slice(0, 200) + "..." : string;
};

const Banner = ({ loading, setIsLoading }) => {
  const [bannerMovies, setBannerMovies] = useState([]);

  const allLoaded =
    !loading.bannerLoading &&
    !loading.row1Loading &&
    !loading.row2Loading &&
    !loading.row3Loading &&
    !loading.row4Loading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const movies = await request.data.results;
        for (let movie of movies) {
          movie.overview = truncate(movie.overview);
        }
        setBannerMovies(movies);
        setTimeout(() => {
          setIsLoading(state => ({ ...state, bannerLoading: false }));
          console.log("banner cargado!", new Date().getMilliseconds());
        }, 3000);
        return request;
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {allLoaded && (
        <div className="banner">
          <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            autoplay={{ delay: 10000, disableOnInteraction: false }}
            speed={1000}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
          >
            {bannerMovies.map(movie => (
              <SwiperSlide key={movie.id}>
                <img
                  className="slide__image"
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt={`movie ${movie.id}`}
                />
                <div className="slide__content__container">
                  <div className="slide__content">
                    <div className="slide__info">
                      <span className="slide__info__type">
                        <img
                          src="https://icones.pro/wp-content/uploads/2021/04/icone-netflix-symbole-logo-original.png"
                          alt="netflix N"
                        />
                        <span>SERIE</span>
                      </span>
                      <span className="slide__info__title">{movie.name}</span>
                      <span className="slide__info__rank">
                        <FontAwesomeIcon icon={faMedal} className="icon" />
                        {/* <p>{`N.º ${index + 1} en ${SERIES}s hoy`}</p> */}
                        <p>{`valoración media : ${movie.vote_average
                          .toString()
                          .slice(0, 1)}/10`}</p>
                      </span>
                      <span className="slide__info__description">{movie.overview}</span>
                      <span className="slide__info__buttons">
                        <button>
                          <FontAwesomeIcon icon={faPlay} className="icon" />
                          Reproducir
                        </button>
                        <button>
                          <FontAwesomeIcon icon={faCircleInfo} className="icon" />
                          Más Información
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="banner__fadeout"></div>
        </div>
      )}
    </>
  );
};

export default Banner;
