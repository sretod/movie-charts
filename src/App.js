import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=e5c218447661fbd87a87bdbafa951cc1&language=en-US&query=Blade&page=1&include_adult=false"
      )
      .then((res) => {
        setMovies(res.data.results);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Movies from themoviedb API</h1>

      {movies.map((movie) => {
        return (
          <div style={{ borderBottom: "5px solid red" }}>
            <p key={movie.id} style={{ fontWeight: "bold" }}>
              {movie.original_title}
            </p>
            <p key={movie.id} style={{ fontWeight: "bold" }}>
              {movie.overview}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
