import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialMovie= {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {
    const [ movie, setMovie ] = useState(initialMovie);
    const history = useHistory();
    console.log("props",props);

    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => {
            return `${movie.id}` === props.match.params.id;
        });

        if(movieToUpdate) {
            setMovie(movieToUpdate);
        };
    }, [props.movies, props.match.params.id]);

    const handleChange = e => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies([...props.movies, res.data]);
                history.push(`/`);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <div>
            <form>
                <input name="title" onChange={handleChange} value={movie.title} placeholder="title"/>
                <input name="director" onChange={handleChange} value={movie.director} placeholder="director"/>
                <input name="metascore" onChange={handleChange} value={movie.metascore} placeholder="metascore"/>
                <input name="stars" onChange={handleChange} value={movie.stars} placeholder="stars"/>
                <button onClick={handleSubmit}>Update</button>
            </form>
        </div>
    );
}

export default UpdateMovie;