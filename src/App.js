import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PieChart from "./components/PieChart";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieNames, setMovieNames] = useState([]);
  const [tvNames, setTvNames] = useState([]);
  const [maleNames, setMaleNames] = useState([]);
  const [femaleNames, setFemaleNames] = useState([]);

  const [genderPieChartData, setGenderPieChartData] = useState({
    labels: ["Female", "Male"],
    datasets: [
      {
        label: 'Female and Male',
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
        label: 'Tv and movies',
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
        console.log(res.data);
        // femaleAndMale();
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
  femaleAndMale(movies);
  movieAndTvSeries(movies);
   
  }, [movies]);

  // useEffect(() => {
  //   console.log("Just log");

  //     console.log(femaleNames.length);
  //     console.log(maleNames.length);
      


      
  //   }, [femaleNames, maleNames]);

  function movieAndTvSeries() {


    let tvCounter = 0;
    let movieCounter = 0
    for (var i = 0; i < movies.length; i++) {
  
      movies[i]["known_for"].filter(function (item) {
        if (item.media_type === "tv") {
  
          setTvNames((tvNames) => [...tvNames, item.name]);

          tvCounter++;
          return true;
        } else {
          setMovieNames((movieNames) => [...movieNames, item.original_title]);
          movieCounter++;
          return false;
        }
      });
    }



    setMediaTypePieChartData({
     
      labels: ["Tv", "Movie"],
      datasets: [
        {
          backgroundColor: ["#FBBC05", "#34A853"],
          borderColor: "black",
          borderWidth: 2,
          data: [tvCounter, movieCounter],
        },
      ],
    });

  }

  function femaleAndMale() {
    let femaleCounter = 0;
    let maleCounter = 0;

    
      movies.filter(function (item) {
      //console.log(item.name);
      // console.log(item.gender);
        if (item.gender === 1) {
          setFemaleNames((femaleNames) => [...femaleNames, item.name]);
          femaleCounter++;
          return true;
        } else {
          setMaleNames((maleNames) => [...maleNames, item.name]);
          maleCounter++;
          return false;
        }
      });

    


      setGenderPieChartData({
     
      labels: ["Female", "Male"],
      datasets: [
        {
          backgroundColor: ["#DB4437", "#4285F4"],
          borderColor: "black",
          borderWidth: 2,
          data: [femaleCounter, maleCounter],
        },
      ],
    });

  
  }

  return (
    <div className="App">
      <h1>Movies from themoviedb API</h1>
      <div style={{ width: "500px" }}>
        <PieChart chartData={genderPieChartData} />
      </div>
      <div style={{ width: "500px" }}>
        <PieChart chartData={mediaTypePieChartData} />
      </div>
      {movieNames.map((movnam, index) => {
        return(
          <p key={index}>{movnam}</p>
        )
      }
      )}
       {maleNames.map((malenam, index) => {
        return(
          <p key={index}>{malenam}</p>
        )
      }
      )}
      <button onClick={movieAndTvSeries}>Click Me!</button>
      <p></p>

      {movies.map((movie) => {
        return (
          <div key={movie.id} style={{ borderBottom: "5px solid red" }}>
            <img
              src={
                "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" +
                movie.profile_path
              }
              alt="actor poster"
            ></img>
            <div style={{ fontWeight: "bold" }}>
              <p>{movie.name}</p>{" "}
              {movie.gender === 2 ? (
                <p className="coin-percent red">Male</p>
              ) : (
                <p className="coin-percent green">Female</p>
              )}
            </div>
            <div style={{ fontWeight: "" }}>
              {movie.known_for.map((known, index) => {
                <p>Test</p>;
                return (
                  <div key={index}>
                    {known.media_type === "tv" ? (
                      <p key={index + 1}>{"Tv series: " + known.name}</p>
                    ) : (
                      <p key={index}>{"Movie: " + known.original_title}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
