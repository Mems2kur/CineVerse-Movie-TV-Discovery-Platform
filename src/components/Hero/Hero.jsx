import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[current];

  return (
    <section
      className="bg-gradient-to-r from-black via-gray-600 to-black px-6 py-14 md:py-[130px] relative w-full overflow-hidden grid md:grid-cols-2 gap-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/w500${currentMovie?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Content */}
      <div className="md:order-1 order-2 relative z-10 flex flex-col justify-center h-full px-6 md:px-12 max-w-3xl">
        <AnimatePresence >
          <motion.h1
            key={currentMovie?.id + "-title"}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: easeInOut }}
            className="text-white text-4xl md:text-6xl font-bold"
          >
            {currentMovie?.title || "Loading..."}
          </motion.h1>

          <motion.p
            key={currentMovie?.id + "-desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.6, ease: easeInOut }}
            className="text-white/80 mt-4 text-lg md:text-xl"
          >
            {currentMovie?.overview ||
              "An exciting adventure awaits — experience the thrill, drama, and action in one masterpiece."}
          </motion.p>

          <motion.div
            key={currentMovie?.id + "-buttons"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeInOut }}
            className="mt-6 flex gap-4"
          >
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              ▶ Watch Trailer
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold backdrop-blur-md transition">
              + Add to Watchlist
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Poster Card */}
      <div className="md:order-2 order-1">
        <AnimatePresence >
          <motion.div
            key={currentMovie?.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            className="flex mx-auto md:w-[300px] w-[200px] flex-col items-center bg-white/10 border border-transparent rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/20 hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]"
              onClick={()=> navigate(`/movie/${currentMovie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`}
              alt={currentMovie?.title}
              className="md:w-[330px] relative z-10 hover:scale-105 transition duration-300"
            />
            <p className="relative z-10 text-xl mb-2 py-3 text-white">
              {currentMovie?.title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
