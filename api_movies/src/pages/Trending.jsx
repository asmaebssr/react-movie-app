import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../images/NotFound.jpg";

const Trending = () => {

// const apiKey = 'd8aebd127a60112b2baff280d40e218e';
const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;

const [movies, setMovies] = useState([]);
const [page, setPage] = useState(1);

useEffect( () => {
  const FetchTrending = async() => {
    try{
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      );
      const data = await response.json();
      console.log(data);
      setMovies(prevMovies => [...prevMovies, ...data.results]);
    }catch(error)
    {
      console.error('Error fetching data!', error)
    };
  };
  FetchTrending();
}, [page,apiKey]); 

  const handlePages = () =>
  {
    setPage(prevPage => prevPage+1);
  }
  return (
    <div className="trend">
    <h1 className="font-bold text-gray-800 text-center text-4xl">Trendig</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
      {movies.map((movie) => (
        <Link to={`/infos/${movie.id}`} key={movie.id}>
        <div
          className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:opacity-80 hover:cursor-pointer"
        >
            <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
              {movie.vote_average.toFixed(1)}
            </div> 
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
               className="w-full h-auto rounded-t-lg transition-all duration-300 ease-in-out hover:opacity-80"
               onError={(e)=>e.target.src=image}
              />
          <h3 className="text-center p-4 font-bold text-lg text-gray-800">{movie.title? movie.title: 'Title not found'}</h3>
          <h4 className="text-center pb-2 font-semibold text-gray-600">Movie<span className="text-gray-400 italic">  ({movie.release_date? movie.release_date: 'Release date not found'})</span></h4>
        </div>
        </Link>
      ))}

      
    </div>
    <div className="flex justify-center pb-20">
  <button
    onClick={handlePages}
    className="px-6 py-3 bg-gray-400 text-black rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
  >
    More
  </button>
</div>


    </div>
  )
}

export default Trending;