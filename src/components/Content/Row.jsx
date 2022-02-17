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
}) => {
  let base_url = `${isCustomRow ? "" : "https://image.tmdb.org/t/p/original/"}`;

  const [movies, setMovies] = useState([]);

  // const MIN = 3000;
  // const MAX = 6000;
  // const RANDOM_TIME = Math.floor(Math.random() * (MAX - MIN)) + MIN;
  useEffect(() => {
    if (!isCustomRow) {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    } else {
      onSnapshot(query(moviesCollection, orderBy("createdAt", "desc"), limit(20) ), snapshot => {
        let movies = [];
        snapshot.docs.forEach(doc => {
          movies.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setMovies(movies);
      });
    }
  }, [fetchUrl, isCustomRow]);

  return (
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
  );
};

export default Row;
