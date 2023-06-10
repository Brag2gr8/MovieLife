import { useEffect, useState } from "react"
import { useLocation, useNavigate, Link, useOutletContext } from "react-router-dom"

export default function EditWatchlist() {
    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const watchlistName = searchParams.get("name")
    const [allWatchlist, setAllWatchlist] = useState([])
    const {setRefresh} = useOutletContext()
    
    const [watchlist, setWatchlist] = useState({
        name: "",
        description: "",
        movies: [],
    })

    useEffect(() => {
        const existingWatchlist = localStorage.getItem("allWatchlist")
        const parsedWatchlist = JSON.parse(existingWatchlist)
        setAllWatchlist(parsedWatchlist)
        
        const foundWatchlist = parsedWatchlist.find(
            (data) => data.name === watchlistName
        )

        if (foundWatchlist) {
            setWatchlist(foundWatchlist)
        } else {
            setAllWatchlist(null)
        }
    }, [watchlistName])

    function handleChange(e) {
        const { name, value } = e.target

        setWatchlist((prevWatchlist) => ({
            ...prevWatchlist,
            [name]: value,
        }))
    }

    function handleRemoveMovie(movieId) {
        setWatchlist((prevWatchlist) => ({
            ...prevWatchlist,
            movies: prevWatchlist.movies.filter((movie) => movie.id !== movieId),
        }))
    }

    function handleSubmit(e) {
    e.preventDefault()
    const existingWatchlist = localStorage.getItem("allWatchlist")
    const parsedWatchlist = JSON.parse(existingWatchlist)

    const updatedWatchlist = parsedWatchlist.map((data) => {
        if (data.name === watchlistName) {
            return {
            ...data,
            name: watchlist.name,
            description: watchlist.description,
            movies: watchlist.movies,
            }
        }
        return data
    })

        localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist))
        navigate(`/watchlist/${watchlist.name}`)
    }

    if (!allWatchlist) {
        return (
          <div className="invalid-watchlist">
            <p>This Watchlist does not Exist 😢</p>
            <Link to="/">
              <button className="return-home">Return to Homepage</button>
            </Link>
          </div>
        );
      }

    const movieList = watchlist.movies.map((movie) => (
        <div key={movie.id} className="edit-watchlist-movie">
            <img src={movie.image} />
            <p>{movie.name} <span>({movie.year})</span></p>
            <button onClick={() => handleRemoveMovie(movie.id)}>Remove</button>
        </div>
    ))

    function handleDeleteWatchlist() {
        const confirmed = window.confirm(
        "Are you sure you want to delete this watchlist?"
    )

        if (confirmed) {
            const updatedWatchlist = allWatchlist.filter(
                (watchlist) => watchlist.name !== watchlistName
            )
            localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist))
            setRefresh(prev => !prev)
            navigate("/")
        }
    }

    return (
    <div className="search-page edit-watchlist-page">
        <div className="history-header">
            <h2>Edit your Watchlist</h2>
            <p
                onClick={handleDeleteWatchlist}
            >
                Delete watchList
            </p>
        </div>
        <form onSubmit={handleSubmit} className="create-watchlist-form">
            <label>
            Name
            <input
                className="create-watchlist-input"
                type="text"
                name="name"
                value={watchlist.name}
                onChange={handleChange}
                required
            />
            </label>
            <label>
            Description
            <textarea
                className="create-watchlist-textarea"
                name="description"
                value={watchlist.description}
                onChange={handleChange}
                required
            />
            </label>
            {movieList.length > 0 && <h3>Movies</h3>}
            <div className="edit-watchlist-movie-list">{movieList}</div>
            <button 
                type="submit" 
                className="create-watchlist-button save-edit-watchlist"
            >
                Save Changes
            </button>
        </form>
    </div>
    )
}
