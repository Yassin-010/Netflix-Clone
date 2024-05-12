import React, { useEffect, useState } from "react";
import ModalMovie from '../ModalMovie/ModalMovie.js';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Movie.css';

function Movie({ movie, isFav, refreshPage }) {
  const [isShown, setIsShown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleClose = () => setIsShown(false);
  const handleShowModal = () => {
    setIsShown(true);
    console.log("isShown from handle show modal : ", isShown);
  };

  const deleteFavMovie = async () => {
    const deleteUrl = `http://localhost:3005/DELETE/${movie.id}`;
    setIsDeleting(true);
    try {
      await axios.delete(deleteUrl);
      refreshPage(movie.id); 
      console.log("Movie deleted successfully");
    } catch (error) {
      console.error("Error deleting movie:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    isShown;
  }, []);

  return (
    <>
      <div className="card-border-wrap" key={movie.id}>
        <div className="card">
          <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
          <p>{movie.title || "No Title"}</p>
          {isFav && <p className='comment'>{movie.comment}</p>}

          {!isFav && (
            <button onClick={handleShowModal}>
              <p><span>Add To Favorite</span></p>
            </button>
          )}
          {isFav && (
            <div className='fav-buttons'>
              <Button onClick={handleShowModal} variant="warning">Update</Button>
              <Button onClick={isDeleting ? null : deleteFavMovie} variant="danger">Delete</Button>
            </div>
          )}

        </div>
      </div>
      <ModalMovie movie={movie} handleClose={handleClose} isShown={isShown} isFav={isFav} refreshPage={refreshPage} />
    </>
  );
}

export default Movie;