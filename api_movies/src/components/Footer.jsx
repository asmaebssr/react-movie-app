import { FaFire, FaFilm, FaTv, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SimpleBottomNavigation() {


  return (
    <div className="footer p-2 fixed bottom-0 w-full left-0 flex justify-around bg-black ">
      <Link to={'/'}>
      <div className="flex flex-col items-center text-sm md:text-base cursor-pointer text-white hover:text-blue-900">
        <FaFire/>
        <span>Trending</span>
      </div>
      </Link>
      <Link to={'/movies'}>
      <div className="flex flex-col items-center text-sm md:text-base cursor-pointer text-white hover:text-blue-900">
        <FaFilm />
        <span>Movies</span>
      </div>
      </Link>
      <Link to={'TvSeries'}>
      <div className="flex flex-col items-center text-sm md:text-base cursor-pointer text-white hover:text-blue-900">
        <FaTv />
        <span>Tv Series</span>
      </div>
      </Link>
      <Link to={'/Search'}>
      <div className="flex flex-col items-center text-sm md:text-base cursor-pointer text-white hover:text-blue-900">
        <FaSearch />
        <span>Search</span>
      </div>
      </Link>
    </div>
  );
};