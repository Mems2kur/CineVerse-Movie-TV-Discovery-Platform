import React, { useState } from "react";
import { Film, Search, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const NavLi = [
  { id: 1, title: "Movies", link: "/MovieShows" },
  { id: 2, title: "Tv Shows", link: "/TVshows" },
];

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setIsMenuOpen(false); // close menu after search
    }
  };

  return (
    <nav className="w-full px-4 py-3 fixed top-4 left-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between gap-4 p-3 border border-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Film size={36} className="text-white rotate-180" />
            <h1 className="text-lg md:text-2xl font-semibold text-white">
              CineVerse
            </h1>
          </div>

          {/* Search Bar (desktop) */}
          <form
            className="hidden lg:flex items-center w-1/2"
            onSubmit={handleSearch}
          >
            <div className="relative w-full text-black">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, actors, genres..."
                className="w-full rounded-full bg-white/6 border border-white/10 py-2 px-4 pl-10 outline-none text-white placeholder-white/50"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
              />
            </div>
          </form>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Search button (desktop) */}
            <button
              onClick={handleSearch}
              className="p-2 hidden lg:flex rounded-full bg-white/6 border border-white/10 text-white"
            >
              <Search size={18} />
            </button>

            {/* Navigation Links (desktop) */}
            <ul className="hidden lg:flex gap-3">
              {NavLi.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="px-3 py-2 rounded-lg text-white/90 hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 p-4 bg-[hsl(220,13%,6%)] rounded-lg shadow-lg border border-white/10">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative w-full text-black">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-full bg-white/6 border border-white/10 py-2 px-4 pl-10 outline-none text-white placeholder-white/50"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                />
              </div>
            </form>

            {/* Mobile Nav Links */}
            <ul className="flex flex-col gap-2">
              {NavLi.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="block px-3 py-2 rounded-lg text-white/90 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
