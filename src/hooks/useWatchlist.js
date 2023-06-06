import { useState, useEffect } from 'react';

export function useWatchlist() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('allWatchlist')) || [];
    setWatchlistItems(watchlist);
  }, []);

  const openWatchlistSelect = () => {
    if (watchlistItems.length === 0) {
      alert('Create a watchlist first to add the movie.');
    } else {
      setDropdownVisible(true);
    }
  };

  const addToWatchlist = (movie) => {
    const { id } = movie;

    const movieExists = watchlistItems.some((watchlist) =>
      watchlist.movies.some((movie) => movie.id === id)
    );

    if (movieExists) {
      alert('Movie already exists in the watchlist.');
    } else {
      const updatedWatchlist = watchlistItems.map((watchlist) => {
        if (watchlist.name === movie.watchlist) {
          if (!watchlist.movies) {
            watchlist.movies = [];
          }
          watchlist.movies.push(movie);
        }
        return watchlist;
      });

      localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist));
      setWatchlistItems(updatedWatchlist);
      alert(`Added movie to ${movie.watchlist}`);
      setDropdownVisible(false);
    }
  };

  return {
    watchlistItems,
    isDropdownVisible,
    openWatchlistSelect,
    addToWatchlist,
  };
}
