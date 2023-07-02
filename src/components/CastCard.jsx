import PropTypes from "prop-types";

const CastCard = ({ name, character, image }) => {
  // Check if name, character, or image is empty and assign default values
  const defaultName = name !== "" ? name : "Unknown Name";
  const defaultCharacter = character !== "" ? character : "Unknown role";
  const defaultImage =
    image !== "https://image.tmdb.org/t/p/originalnull" ? image : "https://via.placeholder.com/300x450.png?text=No+Profile+Available";

  return (
    <div className="cast-card">
      <img src={defaultImage} alt={`${defaultName} as ${defaultCharacter}`} />
      <div className="cast-card-details">
        <h4>{defaultName}</h4>
        <p>** {defaultCharacter}</p>
      </div>
    </div>
  );
};

CastCard.propTypes = {
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CastCard;
