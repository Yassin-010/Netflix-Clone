import {useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './ModalMovie.css';

function ModalMovie({ movie, isShown, handleClose }) {
  const [isPosting, setIsPosting] = useState(false);

  async function addMovie(e) {
    e.preventDefault();
    setIsPosting(true);
    const getUrl = "http://localhost:3005/getMovies";
    const myMovies = await axios.get(getUrl);
    let hasMovie = false;
    let ids = myMovies?.data?.movies?.map((record) => record.id);
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] == movie.id) {
        hasMovie = true;
        break;
      }
    }
    if (!hasMovie) {
      const obj = {
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        overview: movie.overview,
        comment: e.target.comment.value,
      };
      const postUrl = "http://localhost:3005/addMovie";
      const result = await axios.post(postUrl, obj);
      console.log("result of adding movie: ", result);
     
    }
    
    handleClose();
    setIsPosting(false);
  }


  return (
    <>
      <Modal show={isShown} onHide={handleClose} key={movie.id}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
            alt="Movie Poster"
          />
          <br />
          <Form onSubmit={addMovie}>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                name="comment"
                type="text"
                placeholder="Enter comment"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              {!isPosting && (
                <Button
                variant="primary" type="submit">
                  Add To Favorite
                </Button>
              )}
              {isPosting && <Spinner animation="border" />}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalMovie;