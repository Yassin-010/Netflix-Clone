import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from '../Movie/Movie.js';
import Spinner from 'react-bootstrap/Spinner';
import './MovieList.css';

function MovieList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    const url = "http://localhost:3005/trending";
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => setData(error.toString()));
  };

  useEffect(() => getData(), []);

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <div className="movie-list">
          {data.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}

export default MovieList;