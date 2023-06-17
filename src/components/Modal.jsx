import SearchForm from "./SearchForm"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react" // Importing react components that are needed.
import { currentUser } from "../utils/firebase"
import Profile from "./Profile"
import mLogo from "../assets/mLogo.png"

// This component is a Modal
const Modal = ({isOpen, setIsOpen, refresh, setRefresh }) => {
    const user = currentUser()
    const [allWatchlist, setAllWatchlist] = useState([]) 
    const style = isOpen ? "show" : "none"
    const navigate = useNavigate() 

    // Styling for navigation link when active
    const activeStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    }

    useEffect(() => {
        // Get all watchlists from local storage
        const existingWatchList = localStorage.getItem("allWatchlist") 
        const data = JSON.parse(existingWatchList)

        // If user is logged in and there is existing data of watchlists, then set the state with the all existing watchlists.
        if(data && user) { 
            setAllWatchlist(data)
        }
        
    }, [isOpen, refresh])

    // Deletes a watch list by ID
    function deleteWatchlist(id) {
        const confirmed = window.confirm('Are you sure you want to delete this watchlist?');

        if (confirmed) { 
          const updatedWatchlist = allWatchlist.filter((watchlist) => watchlist.id !== id);
          setAllWatchlist(updatedWatchlist);
          localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist));
        }
    }

    // Map through all the watch lists and create an HTML element for each
    const watchlistEl = allWatchlist.map( watchlist => {
        return (
            <div 
                key={watchlist.id}
                className="watchlist-items-div"
            >
                <NavLink 
                    to={`/watchlist/${watchlist.name}`}
                    style={({isActive}) => isActive ? activeStyle : null}
                    onClick={() => setIsOpen(false)}
                >
                    <img src={mLogo} alt="mLogo" />
                    <p>{watchlist.name}</p>
                </NavLink>
                <i 
                    className="fa-solid fa-trash"
                    onClick={() => deleteWatchlist(watchlist.id)}
                ></i>
            </div>
        )
    })

    // Navigating user to create a new watchlist
    function CreateWatchList() {
        navigate(`/create-watchlist`) 
        setIsOpen(false)
        if(refresh) {
            setRefresh(prev => !prev)
        }
    }

    // Render the Modal component
    return (
        <div className={`modal ${style}`} >
            <SearchForm 
                setIsOpen={setIsOpen}
            />
            <nav>
                <NavLink 
                    to="/" 
                    style={({isActive}) => isActive ? activeStyle : null}
                    onClick={() => setIsOpen(false)}
                >
                    <i className="fa-solid fa-house-chimney"></i>
                    <p>Home</p>
                </NavLink>
                <NavLink 
                    to="movies" 
                    style={({isActive}) => isActive ? activeStyle : null}
                    onClick={() => setIsOpen(false)}
                    >
                    <i className="fa-solid fa-film"></i>
                    <p>Movies</p>
                </NavLink>
                <NavLink 
                    to="/history" 
                    style={({isActive}) => isActive ? activeStyle : null}
                    onClick={() => setIsOpen(false)}
                    >
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <p>History</p>
                </NavLink>
                { !user && (
                    <NavLink 
                        to="/signup" 
                        style={({isActive}) => isActive ? activeStyle : null}
                        onClick={() => setIsOpen(false)}
                    >
                        <i className="fa-solid fa-user"></i>
                        <p>Sign Up</p>
                    </NavLink>
                )}
            </nav>
            <button onClick={() => CreateWatchList()}>
                + Create watchList
            </button>
            <hr />
            <span>My Lists</span>
            <div className="watchlist-items">
                {watchlistEl.length === 0 && 
                <p className="success">Log in to view all your watchlist !</p>}
                {watchlistEl}
            </div>
            <Profile setIsOpen={setIsOpen}/>
        </div>
    )
}

export default Modal;
