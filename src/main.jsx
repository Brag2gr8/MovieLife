import ReactDOM from 'react-dom/client';
import {createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import HomeLayout from "./components/HomeLayout"
import Home, {loader as homeLoader} from "./pages/Home"
import Movies from "./pages/movies/Movies"
import MovieDetails, {
  loader as MovieDetailLoader
} from "./pages/movies/MovieDetails"
import Trending from "./pages/movies/Trending"
import Popular from "./pages/movies/Popular"
import TopRated from "./pages/movies/TopRated"
import NowPlaying from "./pages/movies/NowPlaying"
import Upcoming from "./pages/movies/Upcoming"
import Search from "./pages/Search"
import History from "./pages/History"
import CreateWatchlist from "./pages/CreateWatchlist"
import Watchlist from "./pages/Watchlist"
import InvalidPage from "./pages/InvalidPage"


const movieLife = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<HomeLayout />} >
      <Route index element={<Home />} loader={homeLoader} />
      <Route path="movies" element={<Movies />} />
      <Route path="movies/trending" element={<Trending />} />
      <Route path="movies/popular" element={<Popular />} />
      <Route path="movies/now-playing" element={<NowPlaying />} />
      <Route path="movies/top-rated" element={<TopRated />} />
      <Route path="movies/upcoming" element={<Upcoming />} />
      <Route 
        path='movies/all/:id' 
        element={<MovieDetails />} 
        loader={MovieDetailLoader} 
      />
      <Route path="search" element={<Search />} />
      <Route path="history" element={<History />} />
      <Route path="create-watchList" element={<CreateWatchlist />} />
      <Route path="watchlist/:name" element={<Watchlist />} />
      <Route path="*" element={<InvalidPage />} />
    </Route>
  ));

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    <RouterProvider router={movieLife} />
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);