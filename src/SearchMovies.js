import React, { useState } from "react";
import MovieCards from "./MovieCards";

export default function SearchMovies() {
  //states input query, movies

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async e => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=78ca0c725bed727c3a56ae35e3e38837&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={searchMovies} className="form">
        <label htmlFor="query" className="label">
          Movie Name:{" "}
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Search Movie"
          onChange={e => setQuery(e.target.value)}
          value={query}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter(movie => movie.poster_path)
          .map(movie => (
            <MovieCards movie={movie} />
          ))}
      </div>
    </>
  );
}
