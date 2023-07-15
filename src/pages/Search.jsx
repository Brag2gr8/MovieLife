import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import { getRequestedMovies } from "../utils/movieUtils"
import movieData from "../../data"
import MovieCard from "../components/MovieCard"

const Search = () => {
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState("")
  const [movies, setMovies] = useState(movieData)
  const location = useLocation()
  const urlParam = new URLSearchParams(location.search).get("title")
  const topRef = useRef(null)

  console.log(movies)
  useEffect(() => {
    // Function to load movies based on the search query and page number
    async function loadMovies() {
      const {returnedMovies, totalPages} = await getRequestedMovies(urlParam, page)
      setMovies(returnedMovies)
      setAllPages(totalPages)
    }
    
    loadMovies()

    // Scroll to the top of the page when the component updates
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page, urlParam, location.search])

  const moviesEl = movies.map((movie) => {
    return (
      // Render MovieCard components for each movie
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
      <h1>Search Results for &quot;{urlParam}&quot;</h1>
      <div className="movie-tray">
        {moviesEl}
      </div>
      {movies.length === 0 && (
        // Render a message and a button to return to the homepage if no movies are found
        <div className="movie-tray">
          <div className="no-movie"> 
            <h1>No Movie Found</h1>
            <Link to="/">
              <button className="return-home">
                Return to Homepage
              </button>
            </Link>
          </div>
        </div>
      )}
      {(movies.length > 0 && allPages > 1) && (
        // Render pagination if there are multiple pages of search results
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

export default Search