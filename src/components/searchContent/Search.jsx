import React, { useState, useEffect } from "react";
import { useSearchParams,useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;
const BASE_URL = "https://api.themoviedb.org/3";

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const searchMovie = async () => {
      if (!query) return;
      try {
        const res = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };
    searchMovie();
  }, [query]); // runs again if query changes

  return (
    <div className="bg-gray-900 min-h-screen p-6">
  <h2 className="text-white text-3xl font-bold mb-8 text-center">
    Search Results
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {movies.length > 0 ? (
      movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800/20 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[300px] object-cover"
          />
          <div className="p-4 text-white">
            <h1 className="text-lg font-bold mb-2 line-clamp-1">{movie.title}</h1>
            <p className="text-sm mb-1">
              <strong>Release:</strong> {movie.release_date || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Rating:</strong> {movie.vote_average || "N/A"}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white text-center">No results found.</p>
    )}
  </div>
</div>

  );
}

export default Search;
