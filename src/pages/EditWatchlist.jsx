import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useOutletContext } from "react-router-dom";

const EditWatchlist = () => {
    // Get the navigate function from react-router-dom to programmatically navigate to different routes
    const navigate = useNavigate();
    
    // Get the location object from react-router-dom to access the query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const watchlistName = searchParams.get("name");

    // State variables to store the watchlist data
    const [allWatchlist, setAllWatchlist] = useState([]);
    const { setRefresh } = useOutletContext();
    const [watchlist, setWatchlist] = useState({
        name: "",
        description: "",
        movies: [],
    });

    useEffect(() => {
        // Retrieve watchlist data from local storage
        const existingWatchlist = localStorage.getItem("allWatchlist");
        const parsedWatchlist = JSON.parse(existingWatchlist);
        setAllWatchlist(parsedWatchlist);

        // Find the watchlist that matches the specified name
        const foundWatchlist = parsedWatchlist.find(
            (data) => data.name === watchlistName
        );

        if (foundWatchlist) {
            setWatchlist(foundWatchlist);
        } else {
            setAllWatchlist(null);
        }
    }, [watchlistName]);

    // Update the watchlist state when input fields change
    function handleChange(e) {
        const { name, value } = e.target;

        setWatchlist((prevWatchlist) => ({
            ...prevWatchlist,
            [name]: value,
        }));
    }

    // Remove a movie from the watchlist by Id
    function handleRemoveMovie(movieId) {
        setWatchlist((prevWatchlist) => ({
            ...prevWatchlist,
            movies: prevWatchlist.movies.filter((movie) => movie.id !== movieId),
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Update the watchlist data in local storage
        const existingWatchlist = localStorage.getItem("allWatchlist");
        const parsedWatchlist = JSON.parse(existingWatchlist);

        const updatedWatchlist = parsedWatchlist.map((data) => {
            if (data.name === watchlistName) {
                return {
                    ...data,
                    name: watchlist.name,
                    description: watchlist.description,
                    movies: watchlist.movies,
                };
            }
            return data;
        });

        localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist));
        navigate(`/watchlist/${watchlist.name}`);
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
            <img src={movie.image} alt={movie.name} />
            <p>{movie.name} <span>({movie.year})</span></p>
            <button onClick={() => handleRemoveMovie(movie.id)}>Remove</button>
        </div>
    ));

    function handleDeleteWatchlist() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this watchlist?"
        );

        if (confirmed) {
            // Remove the watchlist from local storage and refresh the outlet context
            const updatedWatchlist = allWatchlist.filter(
                (watchlist) => watchlist.name !== watchlistName
            );
            localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist));
            setRefresh(prev => !prev);
            navigate("/");
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
    );
}

export default EditWatchlist