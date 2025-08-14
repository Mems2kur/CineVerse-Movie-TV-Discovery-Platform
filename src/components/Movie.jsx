import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { useState,useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
const MovieCarousel = ({movie, setMovie}) => {
  
   const navigate = useNavigate();
  
  return (
    <div className=" container text-white ">
      <h2 className="text-white! text-3xl font-bold mb-4 py-10  text-center ">Now Showing</h2>
      
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={6}
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
        
        {movie.map((movie, index) => (
          <SwiperSlide key={index}>
            
            <motion.div
            key={index.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5 + index * 0.2,
              duration: 0.6,
              ease: "easeInOut",
            }}
            onClick={()=> navigate(`/movie/${movie.id}`)}
            className="flex md:w-full w-[300px] mx-auto flex-col items-center gap-4 bg-white/10 border border-transparent rounded-xl overflow-hidden shadow-lg backdrop-blur-sm 
                cursor-pointer transition-all duration-300 hover:border-yellow-500/20 hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]">
              
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="md:w-[350px] rounded-2xl hover:scale-105 transition duration-300 group group-hover:brightness-10"
              />
              <div className="p-2 text-center">
                <h3 className="text-center text-sm font-semibold">
                  {movie.title}
                </h3>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
