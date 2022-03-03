import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from "../../api/axios";
import { moviesCollection } from "../../firebase";
import { onSnapshot, orderBy, query, limit } from "firebase/firestore";
import OpenMovieForm from "./OpenMovieForm";
import MoviePreview from "./MoviePreview";
import SkeletonRow from "../Skeletons/SkeletonRow";
import SkeletonBigRow from "../Skeletons/SkeletonBigRow";
const Row = ({
  title,
  fetchUrl = "",
  isLargeRow = false,
  isCustomRow = false,
  setIsFormOpen,
  isBannerLoading,
  rowNumber,
}) => {
  let base_url = `${isCustomRow ? "" : "https://image.tmdb.org/t/p/original/"}`;
  const loadTime = 5000 + rowNumber * 750;
  // const loadTime = 99999

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!isCustomRow) {
      async function fetchData() {
        const request = await axios.get(fetchUrl);
        setTimeout(() => {
          setMovies(request.data.results);
        }, loadTime);
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
        setTimeout(() => {
          setMovies(movies);
        }, loadTime);
      });
    }
  }, [fetchUrl, isCustomRow]);

  return (
    <>
      {!isBannerLoading && !movies && !isLargeRow && <SkeletonRow />}
      {!isBannerLoading && !movies && isLargeRow &&  <SkeletonBigRow />}
      {!isBannerLoading && movies && (
        <div className={`row ${isLargeRow && "largeRow"} ${isCustomRow && "customRow"}`}>
          <h3 className="row__title">{title}</h3>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={isLargeRow ? 7 : 5}
            spaceBetween={isLargeRow ? 7 : 7}
            zoom
            speed={1250}
            loop={isCustomRow ? false : true}
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
                    <MoviePreview
                      movie={movie}
                      src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                      alt={`${movie.name || movie.title || movie.original_title}`}
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
