import './MovieList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Movie from '../Movie/Movie.js';
import Spinner from 'react-bootstrap/Spinner';

function MovieList({ isFav = false }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `http://localhost:3005/${isFav? 'getMovies' : 'trending'}`;
    axios.get(url)
     .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
     .catch(error => {
        setData(null);
        setIsLoading(false);
        console.error(error);
      });
  }, [isFav]);

  function refreshPage(data) {
    setData(data);
  }

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (!data) {
    return <div>Error loading data</div>;
  }

  if (isFav &&!data.movies) {
    return <div>No favorite movies</div>;
  }

  if (!isFav &&!data.length) {
    return <div>No movies found</div>;
  }

  return (
    <>
      {isFav
       ? data.movies.map(movie => (
            <Movie key={movie.id} movie={movie} isFav={isFav} refreshPage={refreshPage} />
          ))
        : data.map(movie => (
            <Movie key={movie.id} movie={movie} isFav={isFav} refreshPage={refreshPage} />
          ))}
    </>
  );
}

export default MovieList;