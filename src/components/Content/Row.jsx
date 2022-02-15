import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from "../../api/axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);

  const MIN = 3000;
  const MAX = 6000;
  const RANDOM_TIME = Math.floor(Math.random() * (MAX - MIN)) + MIN;
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className={`row ${isLargeRow && "largeRow"}`}>
      <h3 className="row__title">{title}</h3>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={isLargeRow ? 7 : 5}
        spaceBetween={isLargeRow ? 7 : 7}
        speed={1250}
        loop={true}
        // autoplay={{ delay: RANDOM_TIME, disableOnInteraction: false }}
      >
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
              <SwiperSlide key={movie.id}>
                <img
                  key={movie.id}
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
