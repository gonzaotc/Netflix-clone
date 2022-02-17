import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const OpenMovieForm = ({ setIsFormOpen }) => {

  return (
    <div className="openMovieForm">
      <h1>
        <FontAwesomeIcon icon={faPlus} onClick={() => { setIsFormOpen(true)}} />
      </h1>
    </div>
  );
};

export default OpenMovieForm;
