import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

export default function WatchList() {
  const [currentWatchlist, setCurrentWatchlist] = useState([])
  const location = useLocation()
  const name = location.state?.name
  const topRef = useRef()

    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const data = JSON.parse(existingWatchList)

        if(data) {
            setCurrentWatchlist(data)
        }

        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" })
        }
        
    }, [name])

    console.log(location.state)

    return (
        <div ref={topRef} className="watchlist-page">
            <div className="watchlist-title">
                <h1>{name}</h1>
                <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div className="watchlist-main-details">
                <h3>About this watchlist</h3>
                <p>???</p>
            </div>
            <div className="watchlist-sub-details">
                <div>
                    <h4>ITEMS ON LIST</h4>
                    <span>???</span>
                </div>
                <div>
                    <h4>UNWATCHED RUNTIME</h4>
                    <span>???</span>
                </div>
                <div>
                    <h4>AVERAGE SCORE</h4>
                    <span>???</span>
                </div>
            </div>
            <div className="watclist-movies">

            </div>
        </div>
    )
}