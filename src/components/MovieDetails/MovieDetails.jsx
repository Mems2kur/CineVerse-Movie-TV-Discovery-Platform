import { useParams} from "react-router-dom";
import { useState,useEffect } from "react";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="glassy min-h-screen flex items-center justify-center bg-[hsl(220,13%,6%)] py-14 px-4 backdrop-blur-lg shadow-lg text-white">
  <div className="container flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl">
    
    {/* Poster Image */}
    <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="rounded-lg w-[250px] sm:w-[300px] md:w-[250px] lg:w-[300px] shadow-lg"
    />

    {/* Movie Info */}
    <div className="text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
      <p className="mb-6 text-gray-300 leading-relaxed">{movie.overview}</p>
      
      <p className="mb-2">
        <strong className="text-blue-400">Release date:</strong> {movie.release_date}
      </p>
      <p>
        <strong className="text-blue-400">Rating:</strong> {movie.vote_average}
      </p>
    </div>
  </div>
</div>
  );
}
