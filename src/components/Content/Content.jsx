import React, { useState } from "react";
import Row from "./Row";

import "./Content.scss";
import requests from "../../api/requests";
import CustomMovieForm from "./CustomMovieForm";

const Content = ({ isBannerLoading }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {isFormOpen && <CustomMovieForm setIsFormOpen={setIsFormOpen} />}
      <div className="content">
        <Row
          title="Tendencias"
          fetchUrl={requests.fetchTrending}
          isBannerLoading={isBannerLoading}
          rowNumber={1}
        />
        <Row
          title="Originales de Netflix"
          fetchUrl={requests.fetchNetflixOriginals}
          isBannerLoading={isBannerLoading}
          isLargeRow={true}
          rowNumber={2}
        />
        <Row
          title="Mejor valorados"
          fetchUrl={requests.fetchTopRated}
          isBannerLoading={isBannerLoading}
          rowNumber={3}
        />
        <Row
          title="Creadas por los usuarios"
          isCustomRow={true}
          setIsFormOpen={setIsFormOpen}
          isBannerLoading={isBannerLoading}
          rowNumber={1}
        />
        <Row
          title="Películas de acción"
          fetchUrl={requests.fetchActionMovies}
          isBannerLoading={isBannerLoading}
          rowNumber={4}
        />
        <Row
          title="Para reír sin parar"
          fetchUrl={requests.fetchComedyMovies}
          isBannerLoading={isBannerLoading}
          rowNumber={5}
        />
        <Row
          title="Películas de horror"
          fetchUrl={requests.fetchHorrorMovies}
          isBannerLoading={isBannerLoading}
          rowNumber={6}
        />
        <Row
          title="Para disfrutar en San Valentín"
          fetchUrl={requests.fetchRomanceMovies}
          isBannerLoading={isBannerLoading}
          rowNumber={7}
        />
        <Row
          title="Películas de suspenso"
          fetchUrl={requests.fetchDocumentaries}
          isBannerLoading={isBannerLoading}
          rowNumber={8}
        />
      </div>
    </>
  );
};

export default Content;
