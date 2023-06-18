import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Watchlist = () =>  {
  const [watchlist, setWatchlist] = useState(null);
  const { name: watchlistName } = useParams();
  const topRef = useRef();

  useEffect(() => {
    // Retrieve the watchlist from local storage
    const existingWatchlist = localStorage.getItem("allWatchlist");
    const parsedWatchlist = JSON.parse(existingWatchlist);

    // Find the watchlist that matches the specified name in the URL params
    const foundWatchlist = parsedWatchlist.find(
      (data) => data.name === watchlistName
    );

    if (foundWatchlist) {
      // Set the watchlist state if it exists
      setWatchlist(foundWatchlist);
    } else {
      setWatchlist(null); // Set watchlist to null if it doesn't exist
    }

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [watchlistName]);

  if (watchlist === null) {
    // Render a message and a button to return to the homepage if the watchlist doesn't exist
    return (
      <div className="invalid-watchlist">
        <p>This Watchlist does not Exist 😢</p>
        <Link to="/">
          <button className="return-home">Return to Homepage</button>
        </Link>
      </div>
    );
  }

  function getAverageRating(arr) {
    // Calculate the average rating of the movies in the watchlist
    let totalRating = 0;

    arr.forEach((el) => {
      totalRating += el.rating;
    });

    return Math.floor(totalRating / arr.length);
  }

  const watchlistEl =
    watchlist.movies.length > 0 ? (
      // Render MovieCard components for each movie in the watchlist
      watchlist.movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          name={movie.name}
          rating={movie.rating}
          image={movie.image}
          year={movie.year}
          isWatchlist={true}
        />
      ))
    ) : (
      // Render a message and a button to return to the homepage if the watchlist is empty
      <div className="no-movie-watchlist">
        <p>🚫 No Movie has been added to this watchlist</p>
        <Link to="/">
          <button className="return-home">Return to Homepage</button>
        </Link>
      </div>
    );

  return (
    <div ref={topRef} className="watchlist-page">
        <div className="watchlist-title">
          <h1>{watchlist.name}</h1>
          <Link to={`/edit-watchlist?name=${watchlistName}`}>
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
        </div>
        <div className="watchlist-main-details">
          <h3>About this watchlist</h3>
          <p>{watchlist.description}</p>
        </div>
        <div className="watchlist-sub-details">
          <div>
            <h4>MOVIES ON LIST</h4>
            <span>{watchlist.movies.length}</span>
          </div>
          <div>
            <h4>TOTAL RUNTIME</h4>
            <span>???</span>
          </div>
          <div>
            <h4>AVERAGE RATING</h4>
            <span>{getAverageRating(watchlist.movies) || "N/A"}</span>
          </div>
        </div>
        <div className="search-page watchlist-movies">
          <h2>Movies in this Watchlist</h2>
          <div className="movie-tray">{watchlistEl}</div>
        </div>
    </div>
  );
}

export default Watchlist