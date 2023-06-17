// baseurl for all api requests
const baseUrl = "https://api.themoviedb.org/3/"

// basePath for posters and profile images
const basePath ="https://image.tmdb.org/t/p/original"

// Resquest api key fro dotenv
const apiKey = import.meta.env.VITE_API_KEY

// Reusable function for all movieList
async function runFetch(path, str) {
    let page
    if(str) {
        page = str
    } else {
        page = "1"
    }
    
    const url = `${baseUrl}${path}?page=${page}&api_key=${apiKey}`
    
    //get movieList  from api
    const res = await fetch(url)
    const data = await res.json()
    const returnedMovies = data.results.map(movie => {
        return processMovie(movie)
    })
    const totalPages = data.total_pages

    return {returnedMovies, totalPages}
}

//Get search result movies from api
export async function getRequestedMovies(query, page) {
    const res = await fetch(`${baseUrl}search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
    const data = await res.json()
    
    const returnedMovies = data.results.map(movie => {
        return processMovie(movie)
    })
    const totalPages = data.total_pages
    return {returnedMovies, totalPages}
}

// get popular movies with runFetch()
export async function getPopularMovies(str) {
    const data = await runFetch("movie/popular", str)
    return data
}

//get trending movies with runFetch()
export async function getTrendingMovies(str) {
    const data = await runFetch("trending/movie/day", str)
    return data
}

//get topRated movies with runFetch()
export async function getTopRatedMovies(str) {
    const data = await runFetch("movie/top_rated", str)
    return data
}

//get nowPlaying movies with runFetch()
export async function getNowPlayingMovies(str) {
    const data = await runFetch("movie/now_playing", str)
    return data
}

//get upcoming movies with runFetch()
export async function getUpcomingMovies(str) {
    const data = await runFetch("movie/upcoming", str)
    return data
}

// get related Movies from api
export async function getRelatedMovies(id) {
    const res = await fetch(`${baseUrl}movie/${id}/similar?api_key=${apiKey}`)
    const data = await res.json()
    const returnedMovies = data.results.map(movie => {
        return processMovie(movie)
    })
    return returnedMovies
}

// get movies details from api
export async function getMovieDetails(id) {
    const res = await fetch(`${baseUrl}movie/${id}?api_key=${apiKey}`)
    const data = await res.json()
    const processedMovie = processMovie(data)
    const genres = []
    data.genres.map(genre => genres.push(genre.name))
    
    function minutesToHours(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}hrs ${remainingMinutes}m`;
    }
    
    return ({
        id: processedMovie.id,
        title: processedMovie.name,
        year: processedMovie.year,
        image: processedMovie.image,
        genres: genres.join(', '),
        duration: minutesToHours(data.runtime),
        rating: processedMovie.rating,
        overview: data.overview,
    })
    

}

//get movie cast  from api
export async function getCast(id) {
    const res = await fetch(`${baseUrl}movie/${id}/credits?api_key=${apiKey}`)
    const data = await res.json()
    const processedCast = data.cast.map (item => {
        return processCast(item)
    })

    return processedCast
}

//get movie trailer  from api
export async function getTrailer(id) {
    const res = await fetch(`${baseUrl}movie/${id}/videos?api_key=${apiKey}`)
    const data = await res.json()
    let trailerPaths = []
    
    if (data.results.length > 0) {
        data.results.map(el => {
            if(el.type == "Trailer") {
                trailerPaths.push({
                    name: el.name,
                    video: `https://www.youtube.com/embed/${el.key}`
                })
            } 
        })
    } else {
        trailerPaths.push({
            name: "There are currently no trailer for this movie",
            video: "https://www.youtube.com/embed/LMlCN6_vUvs"
        })
    }

    // 682177
    return trailerPaths
}

// process movie to suit movieCard component
function processMovie(obj) {
        const {id, title, poster_path, release_date, vote_average} = obj
        let poster
        let date
        
        if (!poster_path) {
            poster = "https://via.placeholder.com/300x450.png?text=No+Poster+Available"
        } else {poster = `${basePath}${poster_path}`}
        
        if (release_date === "") {
            date = "No date"
        } else { date = release_date.split("-")[0]}
        
        const voteAverage = vote_average === 0 ? "0" 
            : (Number.isInteger(vote_average) && vote_average > 0) ? `${vote_average}0`
            : (!Number.isInteger(vote_average)) ? Math.floor(vote_average * 10) : false
        
        return {
            id: id,
            name: title,
            image: poster,
            year: date,
            rating: voteAverage
        }
}

// Process cast to suit castCard component
function processCast(obj) {
    const {id, name, character, profile_path} = obj
    let image
    let role 
    
    if (!profile_path) {
        image = "https://via.placeholder.com/300x450.png?text=No+Profile+Available"
    } else {image =`${basePath}${profile_path}`}
    
    if (character) {
        role = character
    } else { role = "unknown role"}

    return {
        id: id,
        name: name,
        character: role,
        image: image,
    }
}

// export function addToWatchlist() {

// }