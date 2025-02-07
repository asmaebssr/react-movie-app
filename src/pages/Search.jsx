import { useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom";
import image from "../images/NotFound.jpg";

const Search = () => {
  const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState('');
  const [type, setType] = useState('movie');
  

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        type === 'movie' ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(value)}` 
        : `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(value)}`


      );
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="flex w-full sm:w-auto max-w-xs mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={value}
          onChange={handleInput}
          className="w-full sm:w-64 px-4 py-2 border rounded-l-md focus:outline-none bg-gray-300"
        />
        <select onChange={(e) => setType(e.target.value)} value={type} className="p-1 bg-gray-50 border border-gray-300 text-gray-600 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="movie">Movies</option>
          <option value="tv">Series</option>
        </select>
        <button
          onClick={handleSearch}
          className="p-1 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <SearchIcon />
        </button>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pb-20">
      {movies && movies.map((movie) => (
        <Link to={`/infos/${movie.id}`} key={movie.id}>
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:opacity-80 hover:cursor-pointer"
        >
          
            <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
              {movie.vote_average.toFixed(1)}
            </div> 
          
    
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={type === 'movie' ? movie.title : movie.name}
               className="w-full h-auto rounded-t-lg transition-all duration-300 ease-in-out hover:opacity-80"
               onError={(e)=>e.target.src=image}
              />
              
          <h3 className="text-center p-4 font-bold text-lg text-gray-800">{type === 'movie' ? movie.title : movie.name}</h3>
          <h4 className="pb-2 text-center font-semibold text-gray-600">{type === 'movie' ? 'movie' : 'series'}  <span className="text-gray-400 italic">({type === 'movie' ? movie.release_date : movie.first_air_date})</span></h4>

        </div>
        </Link>
      ))}
    </div>
      
    </div>
  );
};

export default Search;
