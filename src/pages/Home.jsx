/* eslint-disable react-refresh/only-export-components */
// import {useState, useEffect} from "react"
import { Link, useLoaderData } from "react-router-dom"
// import { useOutletContext } from "react-router-dom"
import ribbon from "../assets/ribbon.svg"
import whiteCheck from "../assets/white-check.png"
// import movieData from "../../data"
import MovieCard from "../components/MovieCard"
import SearchForm from "../components/SearchForm"
import {
    getTrendingMovies,
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getUpcomingMovies
} from "../../utils"

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
}

export default function Home() {

    const {
        popularMovies, 
        trendingMovies, 
        topRatedMovies, 
        nowPlayingMovies, 
        upcomingMovies
    } = useLoaderData()
    
    function renderMovie(movieType, movieHeader, moviePath) {
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
            <section className="home-section">
                <h2>Welcome to <span>MovieLife</span></h2>
                <h4>Browse movies, add them to watchlists and share them with friends.</h4>
                <h4>Just click the <img src={ribbon}/>  to add a movie to watchlists, the poster to see more details or <img src={whiteCheck}/> to mark the movie as watched.</h4>
            </section>
            <SearchForm />
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