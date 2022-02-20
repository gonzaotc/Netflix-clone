import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from "../../api/axios";
import { moviesCollection } from "../../firebase";
import { getDocs, onSnapshot, orderBy, query, limit, doc } from "firebase/firestore";
import OpenMovieForm from "./OpenMovieForm";

const Row = ({
  title,
  fetchUrl = "",
  isLargeRow = false,
  isCustomRow = false,
  setIsFormOpen,
  setIsLoading,
  rowNumber,
  loading,
}) => {
  let base_url = `${isCustomRow ? "" : "https://image.tmdb.org/t/p/original/"}`;

  const allLoaded =
    !loading.bannerLoading &&
    !loading.row1Loading &&
    !loading.row2Loading &&
    !loading.row3Loading &&
    !loading.row4Loading;
  const [movies, setMovies] = useState([]);

  // const MIN = 3000;
  // const MAX = 6000;
  // const RANDOM_TIME = Math.floor(Math.random() * (MAX - MIN)) + MIN;
  useEffect(() => {
    if (!isCustomRow) {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        if (rowNumber === 1) {
          setTimeout(() => {
            setIsLoading(state => ({ ...state, row1Loading: false }));
            console.log("row1 cargada!", new Date().getMilliseconds());
          }, 1);
        }
        if (rowNumber === 2) {
          setTimeout(() => {
            setIsLoading(state => ({ ...state, row2Loading: false }));
            console.log("row2 cargada!", new Date().getMilliseconds());
          }, 1);
        }
        if (rowNumber === 3) {
          setTimeout(() => {
            setIsLoading(state => ({ ...state, row3Loading: false }));
            console.log("row3 cargada!", new Date().getMilliseconds());
          }, 1);
        }
      }
      fetchData();
    } else {
      onSnapshot(query(moviesCollection, orderBy("createdAt", "desc"), limit(20)), snapshot => {
        let movies = [];
        snapshot.docs.forEach(doc => {
          movies.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setMovies(movies);
        if (rowNumber === 4) {
          setTimeout(() => {
            setIsLoading(state => ({ ...state, row4Loading: false }));
            console.log("row4 cargada!", new Date().getMilliseconds());
          }, 1);
        }
      });
    }
  }, [fetchUrl, isCustomRow]);

  return (
    <>
      {allLoaded && (
        <div className={`row ${isLargeRow && "largeRow"} ${isCustomRow && "customRow"}`}>
          <h3 className="row__title">{title}</h3>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={isLargeRow ? 7 : 5}
            spaceBetween={isLargeRow ? 7 : 7}
            speed={1250}
            loop={isCustomRow ? false : true}
            // autoplay={{ delay: RANDOM_TIME, disableOnInteraction: false }}
          >
            {isCustomRow && (
              <SwiperSlide key="userMovieForm">
                <OpenMovieForm setIsFormOpen={setIsFormOpen} />
              </SwiperSlide>
            )}
            {movies.map(
              movie =>
                ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                  <SwiperSlide key={movie.id}>
                    <img
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={`${movie.name}`}
                    />
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Row;
