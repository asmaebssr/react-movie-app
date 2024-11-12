import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import profile from '../images/profileNotFound.webp';
import image from "../images/NotFound.jpg";


const MoreInfos = ({type = 'movie'}) => {
  const apiKey = 'd8aebd127a60112b2baff280d40e218e';
  const [movie, setMovies] = useState([]);
  const [key, setKey] = useState(null);
  const {id} = useParams();
  const [actors, setActors] = useState([]);

  useEffect ( () => {
    const FetchInfos = async () => {
      try {
        const response = await fetch(
          type === 'movie' ? `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          : `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        const data = await response.json();
        // console.log(data);
        setMovies(data);
      }catch(error)
      {
        console.error(error)
      };
       
    };

    const fetchTrailer = async() => {
      try{
        const response = await fetch (
          type === 'movie' ? `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
          : `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    
        if (trailer)
        {
          setKey(trailer.key)
        };

      }catch(error)
      {
        console.error(error)
      };
    };

    const fetchCreditsImages = async() => {
      try{
        const response = await fetch (
          type === 'movie' ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
          : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`
        );
        const data = await response.json();

        setActors(data.cast);

      }catch(error)
      {
        console.error(error);
      };
    };

    FetchInfos();
    fetchCreditsImages()
    fetchTrailer();
  }, [id, type]);

  

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">{type === 'movie' ? movie.title : movie.name}</h1>
      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-6">
        <img
          className="w-full sm:w-1/3 rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={type === 'movie' ? movie.title : movie.name}
          onError={(e)=>e.target.src = image}
        />
        <div className="mt-4 sm:mt-0 sm:w-2/3">
          <h4 className="font-bold text-blue-950 text-xl">Oreview:</h4>
          <p className="mt-2 text-sm sm:text-base">{movie.overview}</p>
          {/* <h4 className="font-bold text-blue-950 text-xl">Release Date:</h4>
          <p className="mt-2 text-sm sm:text-base">{type === 'movie' ? movie.release_date : movie.first_air_date}</p> */}
          <h2 className="font-bold text-blue-950 text-xl text-center pt-5">Actors</h2>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"> 
            {
              actors && actors.map((actor) => (
                <>
                <div key={actor.id} className="flex flex-col items-center">
                  <img 
                  className="w-20 h-20 rounded-full object-cover"
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name} 
                  onError={(e) => e.target.src = profile}
                 />
                 <p className="font-bold">{actor.name}</p>
                 <p className="text-gray-500">{actor.character}</p>
                </div>
                </>
              ))
            }
          </div>
        </div>
        
      </div>

      {key && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Trailer</h2>
          <div className="mt-4 pb-10">
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${key}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
export default MoreInfos