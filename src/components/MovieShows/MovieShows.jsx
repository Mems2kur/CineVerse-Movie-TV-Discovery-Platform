import React, { useEffect, useState } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;
const BASE_URL = "https://api.themoviedb.org/3";
export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        setMovies(res.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Popular Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white/10 p-4 rounded-lg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg"
            />
            <h3 className="mt-2 font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
