/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getMovieDetails, getTrailer, getCast, getRelatedMovies } from "../../utils/movieUtils";
import CastCard from "../../components/CastCard";
import MovieCard from "../../components/MovieCard";

export async function loader({ request, params }) {
  const { id } = params;

  const movie = await getMovieDetails(id);
  const cast = await getCast(id);
  const trailer = await getTrailer(id);
  const relatedMovies = await getRelatedMovies(id);

  return { movie, cast, trailer, relatedMovies };
}

const  MovieDetails = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [watchlistItems, setWatchlistItems] = useState([]);
  const { movie, cast, trailer, relatedMovies } = useLoaderData();
  const topRef = useRef();
  const navigate = useNavigate()

  useEffect(() => {
    // Grab all watchlist from local storage
    const watchlist = JSON.parse(localStorage.getItem("allWatchlist")) || [];
    setWatchlistItems(watchlist);

    const history = JSON.parse(localStorage.getItem("history")) || [];
    const isMovieInHistory = history.some((item) => item.id === movie.id);

    console.log(movie)

    if (!isMovieInHistory) {
      history.unshift(movie);
      localStorage.setItem("history", JSON.stringify(history));
    }
    
    // Scroll to top of the page on every movie change
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [movie]);

 // Show dropdow to seected watchlist to be used
 async function openWatchlistSelect() { 
    if (watchlistItems.length === 0) {
      alert("Create a watchlist first to add the movie.");
      navigate("/create-watchList")
    } else {
      setDropdownVisible(true);
    }
  }

  // Add the movie to the selected watchlist
  function addToWatchlist() { 
    // Checks if there is a value for selectedWatchlist.
    if (!selectedWatchlist) {
      alert("Please select a watchlist from the options");
      return;
    }
  
    // Searches watchlistItems array for a watchlist that matches selectedWatchlist name.
    const watchlist = watchlistItems.find((w) => w.name === selectedWatchlist);
    if (!watchlist) {
      alert("Invalid watchlist");
      return;
    }
  
    // Checks if the current movie exists in the watchlist.
    const movieExists = watchlist.movies.some((movieItem) => movieItem.id === movie.id);
    if (movieExists) {
      alert("Movie already exists in this watchlist.");
      setDropdownVisible(false);
      return;
    }
  
    // Loops over each item in the watchlistItems array and update the selected watchlist
    const updatedWatchlist = watchlistItems.map((w) => {
      if (w.name === selectedWatchlist) {
        return {
          ...w,
          movies: [
            ...w.movies,
            {
              id: movie.id,
              image: movie.image,
              name: movie.name,
              year: movie.year,
              rating: movie.rating,
            },
          ],
        };
      }
      return w;
    });
  
    // Sets the local storage with the new updated watchlist.
    localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist));
    setDropdownVisible(false);
    alert(`Added movie to ${selectedWatchlist}`);
    window.location.reload()
  }
  

  // Create element for casts
  const castEl = cast.map((el) => (
    <CastCard
      key={el.id}
      name={el.name}
      character={el.character}
      image={el.image}
    />
  ));

   // Create element for trailers
  const trailerEl = trailer.map((el, i) => (
    <div key={i}>
      <pre>{el.name}</pre>
      <iframe
        width="560"
        height="315"
        src={el.video}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ));

   // Create element for related movies
  const relatedMoviesEl = relatedMovies.map((movie) => (
    <MovieCard
      key={movie.id}
      id={movie.id}
      name={movie.name}
      rating={movie.rating}
      image={movie.image}
      year={movie.year}
    />
  ));

  return (
    <div className="movie-details-page" ref={topRef}>
      <div className="movie-main-details">
        <img src={movie.image} />
        <div className="movie-text-details">
          {isDropdownVisible && (
              <div className="watchlist-dropdown">
              <span
                  className="movie-card-cancel-modal"
                  onClick={() => setDropdownVisible(false)}
              >
                  X
              </span>
              <div className="movie-card-modal">
                  <div className="movie-card-modal-content">
                  <h3>Select a watchlist</h3>
                  <select
                      value={selectedWatchlist}
                      onChange={(e) => setSelectedWatchlist(e.target.value)}
                  >
                      <option value="">Select a watchlist</option>
                      {watchlistItems.map((watchlist, i) => (
                      <option key={i} value={watchlist.name}>
                          {watchlist.name}
                      </option>
                      ))}
                  </select>
                  <button onClick={addToWatchlist}>Add to Watchlist</button>
                  </div>
              </div>
              </div>
          )}
          <div className="movie-title-year">
            <h1>{movie.title}</h1>
            <span>({movie.year})</span>
          </div>
          <div className="movie-genre-duration">
            <p>{movie.genres}</p>
            <p>.</p>
            <p>{movie.duration}</p>
          </div>
          <div className="movie-overview">
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="movie-rating-watchlist">
            <div className="movie-rating">
              <h3>Score</h3>
              <span>{movie.rating}</span>
            </div>
            <button onClick={openWatchlistSelect}>Add to Watchlist</button>
          </div>
        </div>
      </div>
      <h2>All Trailers</h2>
      <div className="movie-trailer">{trailerEl}</div>
      <h2>All Casts</h2>
      <div className="movie-cast">{castEl}</div>
      <pre>scroll to see more casts {">>>"}</pre>
      <h2>Related Movies</h2>
      <div className="movie-tray">{relatedMoviesEl}</div>
    </div>
  );
}

export default MovieDetails