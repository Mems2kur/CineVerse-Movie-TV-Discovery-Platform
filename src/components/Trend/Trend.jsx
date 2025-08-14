import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;

const MovieCarousel = () => {
  const [day, setDay] = useState("day");
  const [movies, setMovies] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/${day}?api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrending();
  }, [day]); // Refetch whenever "day" or "week" is clicked

  return (
    <div className="glassy py-14 container text-white">
      <div className='flex flex-col gap-4 p-2 items-center py-10 mb-4 text-center md:text-start'>
        <h2 className="text-white text-3xl font-bold">Trending</h2>
        <div className='flex items-center p-2 rounded-2xl shadow-lg'>
          <button
            onClick={() => setDay("day")}
            className={`px-4 py-2 hover:scale-105 transition duration-300 ${day === "day" ? "bg-yellow-500 text-black font-semibold" : "bg-white/10 text-white"}`}>
            Today
          </button>
          <button
            onClick={() => setDay("week")}
            className={`px-2 py-2 hover:scale-105 transition duration-300 ${day === "week" ? "bg-yellow-500 text-black font-semibold" : "bg-white/10 text-white"}`}>
            This week
          </button>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="flex md:w-full w-[300px] mx-auto flex-col items-center gap-4 bg-white/10 border border-transparent rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-yellow-500/20 hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="md:w-[350px] rounded-2xl hover:scale-105 transition duration-300"
              />
              <div className="p-2 text-center">
                <h3 className="text-center text-sm font-semibold">
                  {movie.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
