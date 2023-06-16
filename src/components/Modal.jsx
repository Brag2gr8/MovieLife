/* eslint-disable react/prop-types */

import SearchForm from "./SearchForm"
import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../utils/firebase"
import Profile from "./Profile"
import mLogo from "../assets/mLogo.png"

export default function Modal(props) {
    const {currentUser} = useAuth()
    const [allWatchlist, setAllWatchlist] = useState([])
    const {isOpen, setIsOpen, refresh, setRefresh } = props
    const style = isOpen ? "show" : "none"
    const navigate = useNavigate()
    
    const activeStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    }

    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const data = JSON.parse(existingWatchList)

        if(data) {
            setAllWatchlist(data)
        }
        
    }, [props, refresh])



    function deleteWatchlist(id) {
        const confirmed = window.confirm('Are you sure you want to delete this watchlist?');
      
        if (confirmed) {
          const updatedWatchlist = allWatchlist.filter((watchlist) => watchlist.id !== id);
          setAllWatchlist(updatedWatchlist);
          localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist));
        }
      }

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
                    <img src={mLogo} />
                    <p>{watchlist.name}</p>
                </NavLink>
                <i 
                    className="fa-solid fa-trash"
                    onClick={() => deleteWatchlist(watchlist.id)}
                ></i>
            </div>
        )
    })

    function CreateWatchList() {
        navigate(`/create-watchlist`)
        setIsOpen(false)
        if(refresh) {
            setRefresh(prev => !prev)
        }
    }

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
                    to="/login" 
                    style={({isActive}) => isActive ? activeStyle : null}
                    onClick={() => setIsOpen(false)}
                    >
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <p>History</p>
                </NavLink>
                { !currentUser && (
                    <NavLink 
                        to="/login" 
                        style={({isActive}) => isActive ? activeStyle : null}
                        onClick={() => setIsOpen(false)}
                    >
                        <i className="fa-solid fa-user"></i>
                        <p>Login</p>
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
                <p>All created watchlists will automatically appear here !</p>}
                {watchlistEl}
            </div>
            <Profile setIsOpen={setIsOpen}/>
        </div>
    )
}