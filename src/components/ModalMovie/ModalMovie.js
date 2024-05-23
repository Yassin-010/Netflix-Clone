import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ModalMovie.css'
import Form from 'react-bootstrap/Form';

function ModalMovie(
    { movie,
        isShown,
        handleClose,
        isFav,
        refreshPage 
    }) {

    const [isPosting, setIsPosting] = useState(false);

    async function addMovie(e) {
        console.log(e);
        e.preventDefault();
        setIsPosting(true);
        const getUrl = "http://localhost:3005/getMovies";
        const myMovies = await axios.get(getUrl);
        // console.log("my movies : ",;);
        let hasMovie = false;
        let ids = myMovies.data.movies.map(record => record.id);
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] == movie.id) {
                hasMovie = true;
                break;
            }
        }
        // !myMovies.map(record => record.id).includes(movie.id)
        if (!hasMovie) {
            const obj = {
                id: movie.id || '',
                title: movie.title || 'super',
                release_date: movie.release_date || '2020-05-04',
                poster_path: movie.poster_path,
                overview: movie.overview,
                comment: e.target.comment.value || 'no comment'
            }
            const postUrl = "http://localhost:3005/addMovie";
            const result = await axios.post(postUrl, obj);
            console.log("result of adding movie : ", result);
        }


        handleClose();
        setIsPosting(false);
    }

    async function updateComment(e) {
        e.preventDefault();
        setIsPosting(true);
        const obj = {
            // id: movie.id,
            title: movie.title || 'new one',
            release_date: movie.release_date || '2024-02-04',
            poster_path: movie.poster_path,
            overview: movie.overview,
            comment: e.target.comment.value || 'updated comment'
        }
        console.log(movie);
        const updateUrl = `http://localhost:3005/UPDATE/${movie.id}`;
        const response = await axios.put(updateUrl, obj);
        refreshPage(response.data)
        handleClose();
        setIsPosting(false);
    }
    return (<>
        <Modal show={isShown} onHide={handleClose} key={movie.id}>
            <Modal.Header closeButton>
                <Modal.Title>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="Movie Poster" />
                <br />
                <Form onSubmit={isFav ? updateComment : addMovie}>
                    <Form.Group className="mb-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control name="comment" type="text" placeholder="Enter comment" />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        {
                            !isPosting && <Button variant={isFav ? "warning" : "primary"} type="submit">
                                {isFav ? "Update" : "Add To Favorite"}
                            </Button>
                        }
                        {
                            isPosting && <Spinner animation="border" />
                        }

                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    </>)
}

export default ModalMovie;