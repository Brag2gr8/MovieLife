import { Link } from "react-router-dom"


export default function Movies() {
    return (
        <div className="movies">
            <div className="movies-list-container">
                <Link to="/movies/trending"><span>Trending</span></Link>
                <Link to="/movies/popular"><span>Popular</span></Link>
                <Link to= "/movies/now-playing"><span>Now playing</span></Link>
                <Link to= "/movies/top-rated"><span>Top rated</span></Link>
                <Link to="/movies/upcoming"><span>Upcoming</span></Link>
            </div>
        </div>
    )
}