/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import awful from '../assets/awfulEmoji.png'
import normal from '../assets/normalEmoji.png'
import great from '../assets/greatEmoji.png'
import ribbon from '../assets/ribbon.svg'

export default function MovieCard(props) {
  const [isDropdownVisible, setDropdownVisible] = useState(false)
  const [selectedWatchlist, setSelectedWatchlist] = useState('')
  const [watchlistItems, setWatchlistItems] = useState([])

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('allWatchlist')) || []
    setWatchlistItems(watchlist)
  }, [])

  const {id, name,image, year, rating, isWatchlist } = props

  function openWatchlistSelect() {
    if (watchlistItems.length === 0) {
      alert('Create a watchlist first to add the movie.')
    } else {
      setDropdownVisible(true)
    }
  }

  function addToWatchlist() {
    if (!selectedWatchlist) {
      alert('Please select a watchlist from the options')
      return
    }
  
    const watchlist = watchlistItems.find((w) => w.name === selectedWatchlist)
    if (!watchlist) {
      alert('Invalid watchlist')
      return
    }
  
    const movieExists = watchlist.movies.some((movie) => movie.id === id)
    if (movieExists) {
      alert('Movie already exists in this watchlist.')
      setDropdownVisible(false)
      return
    }
  
    const updatedWatchlist = watchlistItems.map((w) => {
      if (w.name === selectedWatchlist) {
        return {
          ...w,
          movies: [
            {
              id,
              image,
              name,
              year,
              rating,
            },
            ...w.movies,
          ],
        }
      }
      return w
    })
  
    localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist))
    setDropdownVisible(false)
    alert(`Added movie to ${selectedWatchlist}`)
    window.location.reload()
  }

  const emoji =
    rating <= 50 ? (
      <img src={awful} alt="Awful Emoji" />
    ) : rating > 50 && rating < 75 ? (
      <img src={normal} alt="Normal Emoji" />
    ) : (
      rating >= 75 && <img src={great} alt="Great Emoji" />
    )

  return (
    <div className="movie-card">
      {!isWatchlist && <img
          className="movie-ribbon"
          src={ribbon}
          onClick={openWatchlistSelect}
          alt="Ribbon"
        />
      }
      <Link to={`/movies/all/${id}`}>
        <img src={image} className="movie-card-image" alt="Movie" />
      </Link>
      <div className="movie-card-rating">
        {emoji}
        <div>
          {rating}
          <span>/100</span>
        </div>
      </div>
      <h2>{name}</h2>
      <p>({year})</p>
      {isDropdownVisible && (
        <div className="watchlist-dropdown">
          <span 
        className='movie-card-cancel-modal'
        onClick={() => setDropdownVisible(false)}
        >
          X
        </span>
        <div className="movie-card-modal">
          <div className="movie-card-modal-content">
            <h3>Select a watchlist</h3>
            <select
              value={selectedWatchlist}
              onChange={(e) => setSelectedWatchlist(e.target.value)}
            >
              <option value="">Select a watchlist</option>
              {watchlistItems.map((watchlist, i) => (
                <option key={i} value={watchlist.name}>
                  {watchlist.name}
                </option>
              ))}
            </select>
            <button onClick={addToWatchlist}>Add to Watchlist</button>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}