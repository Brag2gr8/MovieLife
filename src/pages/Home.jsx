import { Link, useLoaderData } from "react-router-dom"
import ribbon from "../assets/ribbon.svg"
import MovieCard from "../components/MovieCard"
import SearchForm from "../components/SearchForm"
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies
} from "../utils/movieUtils"

export async function loader() {
    // Fetch data for different movie categories using utility functions
    const {returnedMovies: popularMovies} = await getPopularMovies()
    const {returnedMovies: trendingMovies} = await getTrendingMovies()
    const {returnedMovies: nowPlayingMovies} = await getNowPlayingMovies()
    const {returnedMovies: topRatedMovies} = await getTopRatedMovies()
    const {returnedMovies: upcomingMovies} = await getUpcomingMovies()

    return {
        popularMovies, 
        trendingMovies, 
        topRatedMovies, 
        nowPlayingMovies, 
        upcomingMovies
    }
}

const Home = () => {
    // Retrieve the movie data from the loader hook
    const {
        popularMovies, 
        trendingMovies, 
        topRatedMovies, 
        nowPlayingMovies, 
        upcomingMovies
    } = useLoaderData()
    
    function renderMovie(movieType, movieHeader, moviePath) {
        // Render MovieCard components for each movie in the specified category
        const movieTray = movieType.slice(0, 6).map(movie => {
            return <MovieCard
                key={movie.id}
                id={movie.id}
                name={movie.name}
                rating={movie.rating}
                image={movie.image}
                year={movie.year}
            />
        })
        
        return (
            <>
                <div className="movie-type" >
                    <h2>{movieHeader}</h2>
                    <Link to={`movies/${moviePath}`}>
                        <span>See more</span>
                    </Link>
                </div>
                <section className="movie-tray">
                    {movieTray}
                </section>
            </>
        )
    }
    
    return (
        <div className="home">
            <div className="home-top-section">
                <section className="home-details">
                    <h2>Welcome to <span>MovieLife</span></h2>
                    <h4>Browse movies, add them to watchlists and share them with friends.</h4>
                    <h4>Just click the <img src={ribbon}/>  to add a movie to watchlists or the poster to see more details.</h4>
                </section>
                <SearchForm/>
            </div>
            {renderMovie(trendingMovies, "TRENDING", "trending")}
            <hr/>
            {renderMovie(popularMovies, "POPULAR", "popular")}
            <hr/>
            {renderMovie(topRatedMovies, "TOP RATED", "top-rated")}
            <hr/>
            {renderMovie(nowPlayingMovies, "NOW PLAYING", "now-playing")}
            <hr/>
            {renderMovie(upcomingMovies, "UPCOMING", "upcoming")}
        </div>
    )
}

export default Home