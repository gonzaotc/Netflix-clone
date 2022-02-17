import { addDoc, serverTimestamp } from "firebase/firestore";
import { moviesCollection } from "../../firebase";
import React, { useState } from "react";

import "./CustomMovieForm.scss";

const CustomMovieForm = ({ setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [overview, setOverview] = useState("");
  const [year, setYear] = useState("");
  const [backdrop_path, setBackdrop_path] = useState("");

  const handleAddMovie = e => {
    e.preventDefault();
    if (name && author && overview && year && backdrop_path) {
      addDoc(moviesCollection, {
        name,
        author,
        overview,
        year,
        backdrop_path,
        createdAt: serverTimestamp()
      })
        .then(() => {
          setIsFormOpen(false);
        })
        .catch(error => alert(error));
    } else alert("Error al agregar la película, algún campo está vacio.");
  };
  return (
    <div className="newMovieForm__overlay" onClick={() => setIsFormOpen(false)}>
      <div className="loginScreen__hero__login" onClick={e => e.stopPropagation()}>
        <h1>Agrega tu película!</h1>
        <form action="" onSubmit={handleAddMovie}>
          <span className="inputGroup">
            <input
              className="inputGroup__name"
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="título"
              value={name}
            />
            <input
              className="inputGroup__year"
              onChange={e => setYear(e.target.value)}
              type="number"
              placeholder="año"
              value={year}
            />
          </span>
          <input
            onChange={e => setAuthor(e.target.value)}
            type="text"
            placeholder="autor"
            value={author}
          />
          <input
            onChange={e => setOverview(e.target.value)}
            type="text"
            placeholder="resumen"
            value={overview}
          />
          <input
            onChange={e => setBackdrop_path(e.target.value)}
            type="text"
            placeholder="url de la imagen"
            value={backdrop_path}
          />
          <button>Agregar película</button>
        </form>
        <span className="subscribeNow">
          <p>Desclaimer: tu película sera mostrada a todo el público de ésta aplicación. (-18) </p>
        </span>
      </div>
    </div>
  );
};

export default CustomMovieForm;
