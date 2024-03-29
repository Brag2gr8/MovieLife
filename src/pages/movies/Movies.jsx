import { Link, useLoaderData } from "react-router-dom";
import {
  getTrendingMovies,
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies
} from "../../utils/movieUtils";
import MovieCard from "../../components/MovieCard";

// Loader function to fetch movie data
export async function loader() {
  const { returnedMovies: popularMovies } = await getPopularMovies();
  const { returnedMovies: trendingMovies } = await getTrendingMovies();
  const { returnedMovies: nowPlayingMovies } = await getNowPlayingMovies();
  const { returnedMovies: topRatedMovies } = await getTopRatedMovies();
  const { returnedMovies: upcomingMovies } = await getUpcomingMovies();

  return {
    popularMovies,
    trendingMovies,
    topRatedMovies,
    nowPlayingMovies,
    upcomingMovies
  };
}

const  Movies = () => {
  // Accessing the loader data using useLoaderData hook
  const {
    popularMovies,
    trendingMovies,
    topRatedMovies,
    nowPlayingMovies,
    upcomingMovies
  } = useLoaderData();

  // Function to render 10 movies in movie tray
  function renderMovie(movieType, movieHeader) {
    const movieTray = movieType.slice(0, 10).map((movie) => {
      return (
        <MovieCard
          key={movie.id}
          id={movie.id}
          name={movie.name}
          rating={movie.rating}
          image={movie.image}
          year={movie.year}
        />
      );
    });

    return (
      <>
        <div className="movie-type">
          <h2>{movieHeader}</h2>
        </div>
        <section className="movie-tray">{movieTray}</section>
      </>
    );
  }

  return (
    <div className="movies">
      <div className="movies-list-container">
        {/* Links to different movie categories */}
        <Link to="/movies/trending">
          <span>Trending</span>
        </Link>
        <Link to="/movies/popular">
          <span>Popular</span>
        </Link>
        <Link to="/movies/now-playing">
          <span>Now playing</span>
        </Link>
        <Link to="/movies/top-rated">
          <span>Top rated</span>
            </Link>
        <Link to="/movies/upcoming">
          <span>Upcoming</span>
        </Link>
      </div>

      {/* Render movie trays for each category */}
      {renderMovie(trendingMovies, "TRENDING")}
      <hr />
      {renderMovie(popularMovies, "POPULAR")}
      <hr />
      {renderMovie(topRatedMovies, "TOP RATED")}
      <hr />
      {renderMovie(nowPlayingMovies, "NOW PLAYING")}
      <hr />
      {renderMovie(upcomingMovies, "UPCOMING")}
    </div>
  );
}

export default Movies