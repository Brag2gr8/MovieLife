import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function WatchList() {
  const [watchlist, setWatchlist] = useState({
    name: "Invalid Watchlist",
    description: "If you are seeing this, please select a valid watchlist",
    movies: [],
  });
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
    }

    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [watchlistName]);

  function getAverageScore(arr) {
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
            <h4>ITEMS ON LIST</h4>
            <span>{watchlist.movies.length}</span>
          </div>
          <div>
            <h4>TOTAL RUNTIME</h4>
            <span>???</span>
          </div>
          <div>
            <h4>AVERAGE RATING</h4>
            <span>{getAverageScore(watchlist.movies) || 0}</span>
          </div>
        </div>
        <div className="search-page watchlist-movies">
          <h2>Movies in watchlist</h2>
          <div className="movie-tray">{watchlistEl}</div>
        </div>
      </>
    </div>
  );
}
