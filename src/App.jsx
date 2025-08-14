import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Movie from './components/Movie';
import Trend from './components/Trend/Trend';
import Popular from './components/popular/Popular';
import Search from './components/searchContent/Search';
import MovieShows from './components/MovieShows/MovieShows';
import TVshows from "./components/TVshows/TVshows"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
        setMovie(response.data.results);
      } catch (err) {
        console.error("Failed to fetch now playing movies:", err);
      }
    };
    fetchMovie();
  }, []);

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={
        <div className='glassy bg-[hsl(220,13%,6%)] py-14 backdrop-blur-lg shadow-lg text-white'>
          <Navbar setMovie={setMovie} />
          <Hero movie={movies} setMovie={setMovie} />
          <Movie movie={movies} setMovie={setMovie} />
          <Trend />
          <Popular />
        </div>
      } />
      
      {/* Movie Details Page */}
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path='/search' element={<Search/>} />
      <Route path='/MovieShows' element={<MovieShows/>} />
      <Route path='/TVshows' element ={<TVshows/>} />
    </Routes>
  );
}

export default App;
