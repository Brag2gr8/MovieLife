import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route 
} from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies, { loader as MoviesLoader } from "./pages/movies/Movies";
import MovieDetails, { loader as MovieDetailLoader } from "./pages/movies/MovieDetails";
import Trending from "./pages/movies/Trending";
import Popular from "./pages/movies/Popular";
import TopRated from "./pages/movies/TopRated";
import NowPlaying from "./pages/movies/NowPlaying";
import Upcoming from "./pages/movies/Upcoming";
import Search from "./pages/Search";
import History from "./pages/History";
import CreateWatchlist from "./pages/CreateWatchlist";
import EditWatchlist from "./pages/EditWatchlist";
import Watchlist from "./pages/Watchlist";
import InvalidPage from "./pages/InvalidPage";
import Login, { loader as loginLoader } from "./pages/userAuth/LogIn"
import SignUp from "./pages/userAuth/SignUp"
import Dashboard from "./pages/userAuth/Dashboard"
import { requireAuth } from './utils/authUtils';

const movieLife = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<HomeLayout />} >
    <Route index element={<Home />} loader={homeLoader} />
    <Route path="movies" element={<Movies />} loader={MoviesLoader} />
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
    <Route 
      path="history" 
      element={<History />}
      loader={async ({ request }) => await requireAuth(request)}
    />
    <Route 
      path="create-watchList" 
      element={<CreateWatchlist />} 
      loader={async ({ request }) => await requireAuth(request)}
    />
    <Route path="edit-watchList" element={<EditWatchlist />} />
    <Route 
      path="watchlist/:name" 
      element={<Watchlist />} 
      loader={async ({ request }) => await requireAuth(request)}
    />
    <Route path="login" element={<Login />}  loader={loginLoader} />
    <Route path="signup" element={<SignUp />}/>
    <Route 
      path="dashboard" 
      element={<Dashboard />}
      loader={async ({ request }) => await requireAuth(request)}
    />
    <Route path="*" element={<InvalidPage />} />
  </Route>
));

function App() {
  return (
    <RouterProvider router={movieLife} />
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />);
