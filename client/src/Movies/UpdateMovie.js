import React from 'react';
import axios from 'axios';

export const UpdateMovie = () => {

    const handleChange = e => {

    }

    const handleSubmit = e => {

    }

    return(
        <div>
            <form>
                <input name="title" onChange={handleChange}/>
                <input name="director" onChange={handleChange}/>
                <input name="metascore" onChange={handleChange}/>
                <input name="stars" onChange={handleChange}/>
                <button onClick={handleSubmit}>Update</button>
            </form>
        </div>
    );
}