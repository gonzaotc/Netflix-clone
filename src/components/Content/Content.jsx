import React, { useState } from "react";
import Row from "./Row";

import "./Content.scss";
import requests from "../../api/requests";
import CustomMovieForm from "./CustomMovieForm";

const Content = ({ loading, setIsLoading }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {isFormOpen && <CustomMovieForm setIsFormOpen={setIsFormOpen} />}
      <div className="content">
        <Row
          title="Tendencias"
          fetchUrl={requests.fetchTrending}
          setIsLoading={setIsLoading}
          rowNumber={1}
          loading={loading}
        />
        <Row
          title="Originales de Netflix"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow={true}
          rowNumber={2}
          setIsLoading={setIsLoading}
          loading={loading}
        />
        <Row
          title="Mejor valorados"
          fetchUrl={requests.fetchTopRated}
          rowNumber={3}
          setIsLoading={setIsLoading}
          loading={loading}
        />
        <Row
          title="Creadas por los usuarios"
          isCustomRow={true}
          setIsFormOpen={setIsFormOpen}
          rowNumber={4}
          setIsLoading={setIsLoading}
          loading={loading}
        />
        <Row
          title="Películas de acción"
          fetchUrl={requests.fetchActionMovies}
          rowNumber={5}
          loading={loading}
        />
        <Row
          title="Para reír sin parar"
          fetchUrl={requests.fetchComedyMovies}
          rowNumber={6}
          loading={loading}
        />
        <Row
          title="Películas de horror"
          fetchUrl={requests.fetchHorrorMovies}
          rowNumber={7}
          loading={loading}
        />
        <Row
          title="Para disfrutar en San Valentín"
          fetchUrl={requests.fetchRomanceMovies}
          rowNumber={8}
          loading={loading}
        />
        <Row
          title="Películas de suspenso"
          fetchUrl={requests.fetchDocumentaries}
          rowNumber={9}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Content;
