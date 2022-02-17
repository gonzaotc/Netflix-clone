import React, { useState } from "react";
import Row from "./Row";

import "./Content.scss";
import requests from "../../api/requests";
import CustomMovieForm from "./CustomMovieForm";

const Content = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {isFormOpen && (
        <CustomMovieForm
          setIsFormOpen={setIsFormOpen}
        />
      )}
      <div className="content">
        <Row title="Tendencias" fetchUrl={requests.fetchTrending} />
        <Row
          title="Originales de Netflix"
          fetchUrl={requests.fetchNetflixOriginals}
          isLargeRow={true}
        />
        <Row title="Mejor valorados" fetchUrl={requests.fetchTopRated} />
        <Row
          title="Creadas por los usuarios"
          isCustomRow={true}
          setIsFormOpen={setIsFormOpen}
        />
        <Row title="Películas de acción" fetchUrl={requests.fetchActionMovies} />
        <Row title="Para reír sin parar" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Películas de horror" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Para disfrutar en San Valentín" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Películas de suspenso" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </>
  );
};

export default Content;
