import { Link } from "react-router-dom"
/* eslint-disable react/prop-types */
import awful from "../assets/awfulEmoji.png"
import normal from "../assets/normalEmoji.png"
import great from "../assets/greatEmoji.png"
import ribbon from "../assets/ribbon.svg"

export default function MovieCard(props) {
        
    const emoji = props.rating <= 50 ? <img src={awful} />
        : (props.rating > 50 && props.rating < 75) ? <img src={normal} />
        : props.rating >= 75 ? <img src={great} /> : false
    
    return (
        <div className="movie-card" >
            <img className="movie-ribbon" src={ribbon} />
            <Link to={`/movies/all/${props.id}`}>
                <img src={props.image} className="movie-card-image" />
            </Link>
            <div className="movie-card-rating">
                {emoji}
                <div>{props.rating}<span>/100</span></div>
            </div>
            <h2>{props.name}</h2>
            <p>({props.year})</p>
        </div>
    )
}