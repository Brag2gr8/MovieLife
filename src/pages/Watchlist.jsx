import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

export default function WatchList() {
  const [allWatchlist, setAllWatchlist] = useState([])
  const [currentWatchlist, setCurrentWatchlist] = useState({
    name: "myWatchList",
    description: "WatchList description",
  })
  const { name } = useParams()
  const topRef = useRef()
  console.log(allWatchlist)

  console.log(name)

    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const data = JSON.parse(existingWatchList)

        if(data) {
            setAllWatchlist(data)
        }

        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" })
        }


    }, [allWatchlist, name])

    allWatchlist.map(item => {
        if (item.name === name) {
            setCurrentWatchlist(item)
        } 
    })

    return (
        <div ref={topRef} className="watchlist-page">
            <div className="watchlist-title">
                <h1>{name}</h1>
                <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div className="watchlist-main-details">
                <h3>About this watchlist</h3>
                <p>{currentWatchlist.description}</p>
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