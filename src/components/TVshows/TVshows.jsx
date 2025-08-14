import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;
const BASE_URL = "https://api.themoviedb.org/3";

export default function TVshows() {
  const [query, setQuery] = useState("");
  const [tvShows, setTvShows] = useState([]);

  const searchTVShows = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // don't search empty

    try {
      const response = await axios.get(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      setTvShows(response.data.results);
    } catch (err) {
      console.error("Failed to search TV shows:", err);
    }
  };

  return (
    <div className="bg-[hsl(220,13%,6%)] min-h-screen text-white p-5">
      <h2 className="text-2xl font-bold mb-4">Search TV Shows</h2>

      
      <form onSubmit={searchTVShows} className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-lg  bg-dark/20 text-black border border-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* TV Show Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tvShows.length > 0 ? (
          tvShows.map((show) => (
            <div key={show.id} className="bg-dark/20 rounded-lg overflow-hidden">
              {show.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-auto"
                />
              ) : (
                <div className="bg-gray-700 h-64 flex items-center justify-center">
                  No Image
                </div>
              )}
              <div className="p-2">
                <h3 className="text-sm font-semibold">{show.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-gray-400">No results found.</p>
        )}
      </div>
    </div>
  );
}
