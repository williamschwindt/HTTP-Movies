import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/movies")
    .then(res => {setMovieList(res.data); console.log(res);})
    .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route
        path="/movies/:id"
        render={props => (
          <Movie
            {...props}
            movies={movieList}
            updateMovies={setMovieList}
            addToSavedList={addToSavedList}
          />
        )}
      />

      <Route 
        exact path ="/update-movie/:id" 
        render= {props => (
          <UpdateMovie {...props} movies={movieList} updateMovies={setMovieList}/>
        )}
      />
    </>
  );
};

export default App;
