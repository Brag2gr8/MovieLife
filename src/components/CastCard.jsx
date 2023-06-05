/* eslint-disable react/prop-types */


export default function CastCard(props) {
    const {name, character, image} = props;

    return (
        <div className="cast-card">
            <img src={image} />
            <div className="cast-card-details">
                <h4>{name}</h4>
                <p>( {character} )</p>
            </div>
        </div>
    )
}