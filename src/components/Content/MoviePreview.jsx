import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faThumbsUp, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

import "./MoviePreview.scss";

const MoviePreview = ({ src, alt, movie }) => {
  // console.log(movie.release_date);

  const [movieVotes, setMovieVotes] = useState(movie.vote_count >= 1 ? movie.vote_count : 0);
  const [isFirstVote, setIsFirstVote] = useState(true);
  const [votesBeingAnimated, setVotesBeingAnimated] = useState(false);

  const handleVote = () => {
    if (!isFirstVote || votesBeingAnimated) return;

    setVotesBeingAnimated(true);
    setIsFirstVote(false);
    window.setTimeout(() => {
      setMovieVotes(state => state + 1);
    }, 50);
    window.setTimeout(() => {
      setVotesBeingAnimated(false);
    }, 500);
  };

  if (!movie.release_date && !movie.first_air_date) {
    // console.log(movie);
  }

  let movieName = movie.name || movie.title || movie.original_title;
  if (movieName.length > 40) {
    movieName = movieName.slice(0, 40) + "...";
  }

  let movieYear = movie.release_date || movie.first_air_date;
  movieYear = movieYear?.slice(0, 4);
  return (
    <div className="moviePreview">
      <img className="moviePreview__image" src={src} alt={alt} />
      <div className="moviePreview__info">
        <h3 className="moviePreview__info__title">{movieName}</h3>
        <FontAwesomeIcon icon={faCirclePlay} className="icon" />
        <span className="moviePreview__info__stats">
          <span className="moviePreview__info__stats__votes">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`iconLike ${!isFirstVote && "defaultCursor"}`}
              onClick={handleVote}
            />
            <p
              className={`moviePreview__info__stats__votes__number ${
                votesBeingAnimated && "votesAnimation"
              }`}
            >
              {movieVotes}
            </p>
          </span>
          <span className="moviePreview__info__stats__date">
            <FontAwesomeIcon icon={faCalendarDay} className="iconDate" />
            <p>{movieYear}</p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default MoviePreview;
