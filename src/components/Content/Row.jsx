import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../../api/axios";
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const base_url = "https://image.tmdb.org/t/p/original/";

  const [movies, setMovies] = useState([]);

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
      <Swiper slidesPerView={isLargeRow ? 4 : 5} speed={750} loop={true} spaceBetween={15}>
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
              <SwiperSlide>
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
