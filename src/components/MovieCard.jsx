import { useState, useEffect } from 'react' 
import { Link, useNavigate } from 'react-router-dom' 
import awful from '../assets/awfulEmoji.png' 
import normal from '../assets/normalEmoji.png' 
import great from '../assets/greatEmoji.png' 
import ribbon from '../assets/ribbon.svg'

const MovieCard = ({id, name,image, year, rating, isWatchlist }) => { 
  const [isDropdownVisible, setDropdownVisible] = useState(false) 
  const [selectedWatchlist, setSelectedWatchlist] = useState('') 
  const [watchlistItems, setWatchlistItems] = useState([])

  useEffect(() => { 
    // Retrieves the watchlist items from local storage, or an empty array if there are no items.
    const watchlist = JSON.parse(localStorage.getItem('allWatchlist')) || []
    setWatchlistItems(watchlist)
  }, [])
  
  // Show dropdow to seected watchlist to be used
  async function openWatchlistSelect() {

    if (watchlistItems.length === 0) { 
      alert('Create a watchlist first to add the movie.') 
    } else {
      setDropdownVisible(true) 
    }
  }

  // Add the movie to the selected watchlist
  function addToWatchlist() { 
    // Checks if there is a value for selectedWatchlist.
    if (!selectedWatchlist) { 
      alert('Please select a watchlist from the options')
      return 
    }
  
    // Searches watchlistItems array for a watchlist that matches selectedWatchlist name.
    const watchlist = watchlistItems.find((w) => w.name === selectedWatchlist)
    if (!watchlist) { 
      alert('Invalid watchlist')
      return 
    }
  
    // Checks if the current movie exists in the watchlist.
    const movieExists = watchlist.movies.some((movie) => movie.id === id) 
    if (movieExists) { 
      alert('Movie already exists in this watchlist.') 
      setDropdownVisible(false) 
      return
    }
  
    // Loops over each item in the watchlistItems array and update the selected watchlist
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
  
    // Sets the local storage with the new updated watchlist.
    localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist)) 
    setDropdownVisible(false) 
    alert(`Added movie to ${selectedWatchlist}`) 
    window.location.reload() 
  }

  const emoji =
    rating <= 50 ? (
      <img src={awful} alt="Awful Emoji" /> // Displayed when rating is less than or equal to 50.
    ) : rating > 50 && rating < 75 ? (
      <img src={normal} alt="Normal Emoji" /> // Displayed when rating is between 50 and 75.
    ) : (
      rating >= 75 && <img src={great} alt="Great Emoji" /> // Displayed when rating is greater than or equal to 75.
    )

  // Assign default values if the string props are empty
  const defaultName = name !== "" ? name : "No Name";
  const defaultImage = image !== "https://image.tmdb.org/t/p/originalnull" ? 
  image : "https://via.placeholder.com/300x450.png?text=No+Poster+Available";
  const defaultYear = year !== "" ? year : "No Year";

  return (
    <div className="movie-card"> 
      {!isWatchlist && (
        <img
          className="movie-ribbon"
          src={ribbon}
          onClick={openWatchlistSelect}
          alt="Ribbon"
        />
      )}
      <Link to={`/movies/all/${id}`}>
        <img src={defaultImage} className="movie-card-image" alt="Movie" />
      </Link>
      <div className="movie-card-rating">
        {emoji}
        <div>
          {rating}
          <span>/100</span>
        </div>
      </div>
      <h2>{defaultName}</h2>
      <p>({defaultYear})</p>
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

// MovieCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   name: PropTypes.string,
//   image: PropTypes.string,
//   year: PropTypes.string,
//   rating: PropTypes.number,
//   isWatchlist: PropTypes.bool,
// };

export default MovieCard
