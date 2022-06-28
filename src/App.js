import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import ActorsList from "./components/ActorsList";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [movies, setMovies] = useState([]);
  const [movieNames, setMovieNames] = useState([]);
  const [tvNames, setTvNames] = useState([]);
  const [maleNames, setMaleNames] = useState([]);
  const [femaleNames, setFemaleNames] = useState([]);
  const [moviesReleseDate, setmMoviesReleseDate] = useState([]);
  const moviesReleseDateYearsCounted = useState([]);

  const [genderPieChartData, setGenderPieChartData] = useState({
    labels: ["Female", "Male"],
    datasets: [
      {
        label: "Female and Male",
        data: [8, 8],
        backgroundColor: ["#DB4437", "#4285F4"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [mediaTypePieChartData, setMediaTypePieChartData] = useState({
    labels: ["tv", "movie"],
    datasets: [
      {
        label: "Tv and movies",
        data: [8, 8],
        backgroundColor: ["#DB4437", "#4285F4"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const [moviesByYearBarChartData, setMoviesByYearBarChartData] = useState({
    labels: ["year"],
    datasets: [
      {
        label: "Actors by year",
        data: [8, 8],
        backgroundColor: ["#DB4437", "#4285F4"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=e5c218447661fbd87a87bdbafa951cc1&language=en-US&page=1"
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    function movieAndTvSeries() {
      for (var i = 0; i < movies.length; i++) {
        movies[i]["known_for"].filter(function (item) {
          if (item.media_type === "tv") {
            setTvNames((tvNames) => [...tvNames, item.name]);
            return true;
          } else {
            setMovieNames((movieNames) => [...movieNames, item.original_title]);
            setmMoviesReleseDate((moviesReleseDate) => [
              ...moviesReleseDate,
              parseInt(item.release_date.slice(0, 4)),
            ]);
            return true;
          }
        });
      }
    }
    movieAndTvSeries();
    function femaleAndMale() {
      movies.filter(function (item) {
        if (item.gender === 1) {
          setFemaleNames((femaleNames) => [...femaleNames, item.name]);

          return true;
        } else {
          setMaleNames((maleNames) => [...maleNames, item.name]);

          return true;
        }
      });
    }
    femaleAndMale();
  }, [movies]);

  useEffect(() => {
    moviesReleseDate.sort();
    moviesReleseDate.forEach((el) => {
      const index = moviesReleseDateYearsCounted.findIndex((obj) => {
        return obj["year"] === el;
      });
      if (index === -1) {
        moviesReleseDateYearsCounted.push({
          year: el,
          count: 1,
        });
      } else {
        moviesReleseDateYearsCounted[index]["count"]++;
      }
      return true;
    });

    setMediaTypePieChartData({
      labels: ["Tv", "Movie"],
      datasets: [
        {
          backgroundColor: ["#FBBC05", "#34A853"],
          borderColor: "black",
          borderWidth: 2,
          data: [tvNames.length, movieNames.length],
        },
      ],
    });

    setMoviesByYearBarChartData({
      labels: moviesReleseDateYearsCounted.map((data) => data.year),
      datasets: [
        {
          label: "Movies by year",
          backgroundColor: ["#FBBC05", "#0544fb"],
          borderColor: "black",
          borderWidth: 1,
          data: moviesReleseDateYearsCounted.map((data) => data.count),
        },
      ],
    });
  }, [tvNames, movieNames, moviesReleseDate]);
  useEffect(() => {
    setGenderPieChartData({
      labels: ["Female", "Male"],
      datasets: [
        {
          backgroundColor: ["#DB4437", "#4285F4"],
          borderColor: "black",
          borderWidth: 2,
          data: [femaleNames.length, maleNames.length],
        },
      ],
    });
  }, [femaleNames, maleNames]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={movies.map((movie) => {
              return (
                <ActorsList
                  id={movie.id}
                  name={movie.name}
                  profile_path={movie.profile_path}
                  gender={movie.gender}
                  known_for={movie.known_for}
                />
              );
            })}
          />
          <Route
            path="/barmovieyear"
            element={
              <div style={{ width: "600px", margin: "auto" }}>
                <BarChart chartData={moviesByYearBarChartData} />
              </div>
            }
          />
          <Route
            path="/piegender"
            element={
              <div style={{ width: "600px", margin: "auto" }}>
                <PieChart chartData={genderPieChartData} />
              </div>
            }
          />
          <Route
            path="/piemovietv"
            element={
              <div style={{ width: "600px", margin: "auto" }}>
                <PieChart chartData={mediaTypePieChartData} />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
