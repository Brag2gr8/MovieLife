import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { getTrendingMovies } from "../../utils/movieUtils"
import movieData from "../../../data"
import MovieCard from "../../components/MovieCard"

const Trending = () => {
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState(5)
  const [movies, setMovies] = useState(movieData)
  const location = useLocation()
  const urlParam = new URLSearchParams(location.search).get("title")
  const topRef = useRef(null)

  useEffect(() => {
    //Grab movies from utils
    async function loadMovies() {
      const {returnedMovies, totalPages} = await getTrendingMovies(page)
      setMovies(returnedMovies)
      setAllPages(totalPages)
    }

    //Scroll to top at each page change
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
    loadMovies()

  }, [page, urlParam, location.search])

  // Create movie  jsx elements
  const moviesEl = movies.map(movie => {
    return (
      <MovieCard
        key={movie.id}
        id={movie.id}
        name={movie.name}
        rating={movie.rating}
        image={movie.image}
        year={movie.year}
      />
    )
  })
  
  return (
    <div className="search-page" ref={topRef}>
        <h1>Trending Movies</h1>
        <div className="movie-tray">
            {moviesEl}
        </div>
        {(movies.length > 0 && allPages > 1) && (
            <div className="scroll-movie-page">
            {page > 1 && 
                <i 
                    className="fa-solid fa-angle-left"
                    onClick={() => setPage(prev => prev - 1)}
                >
                </i>
            }
                <h2>Page {page}</h2>
                <h2>of</h2>
                <h2>{allPages}</h2>
                {page < allPages && 
                    <i 
                        className="fa-solid fa-angle-right"
                        onClick={() => setPage(prev => prev + 1)}
                    >
                    </i>
                }
            </div>
        )}
    </div>
  )
}

export default Trending