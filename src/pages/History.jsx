import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"
import { Link } from "react-router-dom"


const History = () => {
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
        if (history.length === 0) {
            return alert("you have no movie in your history")
        }
        const confirmed = window.confirm('Are you sure you want to clear history?');
      
        if (confirmed) {
            localStorage.removeItem("history")
            setHistory([])
        }
    }

    console.log(history.length)


    return history.length === 0 ?
        (
            <div className="no-movie"> 
                <h1>No Movie in history yet</h1>
                <Link to="/">
                    <button className="return-home">
                        Return to Homepage
                    </button>
                </Link>
            </div>
        )
        :
        (
            <div className="history-page">
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

export default History