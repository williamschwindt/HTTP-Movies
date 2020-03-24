import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  const updateMovie = () => {
    history.push(`/update-movie/${movie.id}`)
  }

  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      props.updateMovies(
        props.movies.filter(mov => {
          return mov.id !== movie.id;
        })
      )
      history.push(`/`);
    })
    .catch(err => {
        console.log(err);
    })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div onClick={updateMovie}>
        update
      </div>

      <div onClick={deleteMovie}>
        delete
      </div>
    </div>
  );
}

export default Movie;
