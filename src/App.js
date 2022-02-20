import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
 const [movies, setMovies] = useState([]);
  useEffect(() => {
      axios.get('http://www.omdbapi.com/?t=blade+runner&apikey=39cf1e4f')
      .then(res=>{
        setMovies(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error))
  }, [])
  
  return (
    <div className="App">
        <h1>MOVIES FROM API</h1>
        
        <img src={movies.Poster} alt="Blade poster" width="250" height="300"></img>
         <p style={{fontWeight: "bold"}}>{movies.Title+" "}{movies.Year}</p>
         <p style={{width: "100px"}}>{movies.Plot}</p>
    </div>
  );
}

export default App;
