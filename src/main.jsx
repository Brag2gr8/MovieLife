import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements, 
  Route 
} from "react-router-dom";
import HomeLayout from "./components/HomeLayout";
import Home, { loader as homeLoader } from "./pages/Home";
import Movies, { loader as moviesLoader } from "./pages/movies/Movies";
import MovieDetails, { loader as movieDetailsLoader } from "./pages/movies/MovieDetails";
import Trending from "./pages/movies/Trending";
import Popular from "./pages/movies/Popular";
import TopRated from "./pages/movies/TopRated";
import NowPlaying from "./pages/movies/NowPlaying";
import Upcoming from "./pages/movies/Upcoming";
import Search from "./pages/Search";
import History from "./pages/History";
import About from "./pages/About";
import CreateWatchlist from "./pages/CreateWatchlist";
import EditWatchlist from "./pages/EditWatchlist";
import Watchlist from "./pages/Watchlist";
import InvalidPage from "./pages/InvalidPage";
import Error from "./pages/Error";
import Login, { loader as loginLoader } from "./pages/userAuth/LogIn"
import SignUp from "./pages/userAuth/SignUp"
import { requireAuth } from './utils/authUtils';
// import Dashboard from "./pages/userAuth/Dashboard"

const movieLife = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<HomeLayout />} >
    <Route 
      index 
      element={<Home />} 
      loader={homeLoader}  
      errorElement={Error}
    />
    <Route 
      path="movies" 
      element={<Movies />} 
      loader={moviesLoader} 
    />
    <Route path="movies/trending" element={<Trending />} />
    <Route path="movies/popular" element={<Popular />} />
    <Route path="movies/now-playing" element={<NowPlaying />} />
    <Route path="movies/top-rated" element={<TopRated />} />
    <Route path="movies/upcoming" element={<Upcoming />} />
    <Route
      path='movies/all/:id'
      element={<MovieDetails />}
      loader={movieDetailsLoader}
    />
    <Route path="search" element={<Search />} />
    <Route 
      path="history" 
      element={<History />}
      loader={async ({ request }) => await requireAuth(request)}
    />
    <Route path="about" element={<About />} />
    <Route path="create-watchList" element={<CreateWatchlist />}/>
    <Route path="edit-watchList" element={<EditWatchlist />} />
    <Route path="watchlist/:name" element={<Watchlist />} />
    <Route path="login" element={<Login />}  loader={loginLoader} />
    <Route path="signup" element={<SignUp />}/>
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
