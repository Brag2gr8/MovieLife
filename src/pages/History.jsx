import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"

export default function History() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const storedHistory = localStorage.getItem("history")
        const parsedHistory = storedHistory ? JSON.parse(storedHistory) : []
        setHistory(parsedHistory)
    }, [])

    const historyEl = history.map(movie => {
        return <MovieCard
        key={movie.id}
        id={movie.id}
        name={movie.name}
        rating={movie.rating}
        image={movie.image}
        year={movie.year}
      />
    })

    function clearHistory() {
        localStorage.removeItem("history")
    }

    return (
        <div className="search-page history">
            <div className="history-header">
                <h1>History movies</h1>
                <p onClick={() => clearHistory()}>
                    Clear history
                </p>
            </div>
            <div className="movie-tray">
                {historyEl}
            </div>
       </div>
    )
}