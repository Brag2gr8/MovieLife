/* eslint-disable react-refresh/only-export-components */
// import { useState, useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { getMovieDetails, getTrailer, getCast, getRelatedMovies } from "../../../utils";
// import movieData from "../../../data"
import CastCard from "../../components/CastCard";
import MovieCard from "../../components/MovieCard";
import { useEffect, useRef } from "react";

export async function loader({ params }) {
    const {id} = params;

    const movie = await getMovieDetails(id)
    const cast = await getCast(id)
    const trailer = await getTrailer(id)
    const relatedMovies = await getRelatedMovies(id)

    return {movie, cast, trailer, relatedMovies}
}

export default function MovieDetail() {
    const {movie, cast, trailer, relatedMovies} = useLoaderData()
    const topRef = useRef()

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        const isMovieInHistory = history.some((item) => item.id === movie.id);
      
        if (!isMovieInHistory) {
          history.unshift(movie);
          localStorage.setItem("history", JSON.stringify(history));
        }

        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
      
        console.log(history);
      }, [movie]);

    const castEl = cast.map(el => {
        return <CastCard 
            key={el.id}
            name={el.name}
            character={el.character}
            image={el.image}
        />
    })

    const trailerEl = trailer.map((el,i) => {
        return <div key={i}>
            <pre>{el.name}</pre>
            <iframe
                width="560"
                height="315"
                src={el.video}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    })

    const relatedMoviesEl = relatedMovies.map(movie => {
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
        <div className="movie-details-page" ref={topRef}>
            <div className="movie-main-details">
                <img src={movie.image} />
                <div className="movie-text-details">
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
                        <button>Add to Watchlist</button>
                    </div>
                </div>
            </div>
            <h2>All Trailers</h2>
            <div className="movie-trailer">
                {trailerEl}
            </div>
            <h2>Cast</h2>
            <div className="movie-cast">
                {castEl}
            </div>
            <h2>Related Movies</h2>
            <div className="movie-tray">
                {relatedMoviesEl}
            </div>
        </div>
    )
}