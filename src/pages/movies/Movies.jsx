/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom"
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies
} from "../../../utils"
import MovieCard from "../../components/MovieCard"

export async function loader() {
    
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

    console.log(popularMovies)
}


export default function Movies() {

    const {
        popularMovies, 
        trendingMovies, 
        topRatedMovies, 
        nowPlayingMovies, 
        upcomingMovies
    } = useLoaderData()

    console.log(popularMovies)
    
    function renderMovie(movieType, movieHeader) {
        const movieTray = movieType.slice(0, 10).map(movie => {
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
                </div>
                <section className="movie-tray">
                {movieTray}
                </section>
            </>
        )
    }

    return (
        <div className="movies">
            <div className="movies-list-container">
                <Link to="/movies/trending"><span>Trending</span></Link>
                <Link to="/movies/popular"><span>Popular</span></Link>
                <Link to= "/movies/now-playing"><span>Now playing</span></Link>
                <Link to= "/movies/top-rated"><span>Top rated</span></Link>
                <Link to="/movies/upcoming"><span>Upcoming</span></Link>
            </div>
            {renderMovie(trendingMovies, "TRENDING")}
            <hr/>
            {renderMovie(popularMovies, "POPULAR")}
            <hr/>
            {renderMovie(topRatedMovies, "TOP RATED")}
            <hr/>
            {renderMovie(nowPlayingMovies, "NOW PLAYING")}
            <hr/>
            {renderMovie(upcomingMovies, "UPCOMING")}
        </div>
    )
}