import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function WatchList() {
  const [watchlist, setWatchlist] = useState(null);
  const { name: watchlistName } = useParams();
  const topRef = useRef();

  useEffect(() => {
    const existingWatchlist = localStorage.getItem("allWatchlist");
    const parsedWatchlist = JSON.parse(existingWatchlist);

    const foundWatchlist = parsedWatchlist.find(
      (data) => data.name === watchlistName
    );

    if (foundWatchlist) {
      setWatchlist(foundWatchlist);
    } else {
      setWatchlist(null); // Set watchlist to null if it doesn't exist
    }

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [watchlistName]);

  if (watchlist === null) {
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
    let totalRating = 0;

    arr.forEach((el) => {
      totalRating += el.rating;
    });

    return Math.floor(totalRating / arr.length);
  }

  const watchlistEl =
    watchlist.movies.length > 0 ? (
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
      <div className="no-movie-watchlist">
        <p>🚫 No Movie has been added to this watchlist</p>
        <Link to="/">
          <button className="return-home">Return to Homepage</button>
        </Link>
      </div>
    );

  return (
    <div ref={topRef} className="watchlist-page">
      <>
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
      </>
    </div>
  );
}
