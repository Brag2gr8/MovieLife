import { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"

export default function WatchList() {
    const [watchlist, setWatchlist] = useState({
        name: "No watchlist",
        description: "if you are seeing this, you please select a valid watchlist",
        movies: [{
            id: 569094,
            image:"https://via.placeholder.com/300x450.png?text=No+Profile+Available",
            name:'placeholder movie',
            rating: 0,
            year:'0000'
        }]
    })

    const { name: watchlistName } = useParams()
    const topRef = useRef()

    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const parsedWatchlist = JSON.parse(existingWatchList)
      
        if (parsedWatchlist) {
          parsedWatchlist.forEach(data => {
            if (data.name === watchlistName) {
              setWatchlist(data)
            }
          })
        }
      
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, [watchlistName])

    function getAverageScore(arr) {
        let totalRating = 0
        arr.map(el => {
            totalRating += el.rating
        })

        return Math.floor(totalRating / arr.length)
    }

    const watchlistEl = watchlist.movies.map(movie => {
        return (
            <MovieCard
                key={movie.id}
                id={movie.id}
                name={movie.name}
                rating={movie.rating}
                image={movie.image}
                year={movie.year}
                isWatchlist={true}
            />
        )
    })

    return (
        <div ref={topRef} className="watchlist-page">
          {watchlist.movies.length === 0 && (
            <div className="movie-tray">
              <div className="no-movie-watchlist"> 
                <h1>No Movie Found</h1>
                <Link to="/">
                  <button className="return-home">
                    Return to Homepage
                  </button>
                </Link>
              </div>
            </div>
          )}
          {watchlist.movies.length > 0 && (
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
                  <span>{getAverageScore(watchlist.movies)}</span>
                </div>
              </div>
              <div className="search-page watchlist-movies">
                <h2>Movies in watchlist</h2>
                <div className="movie-tray">
                  {watchlistEl}
                </div>
              </div>
            </>
          )}
        </div>
      )
}