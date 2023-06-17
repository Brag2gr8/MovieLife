import PropTypes from "prop-types";

const CastCard = ({ name, character, image }) => (
  <div className="cast-card">
    <img src={image} alt={`${name} as ${character}`} />
    <div className="cast-card-details">
      <h4>{name}</h4>
      <p>({character})</p>
    </div>
  </div>
);

CastCard.propTypes = {
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

CastCard.defaultProps = {
  name: "Unknown Name",
  character: "Unknown role",
  image: "https://via.placeholder.com/300x450.png?text=No+Profile+Available"
};

export default CastCard;
