import { Link } from "react-router-dom"
import PropTypes from "prop-types";

const Header = ({isOpen, setIsOpen}) => {
    const icon = isOpen ? 
    <i className="fa-solid fa-xmark cancel" onClick={() => setIsOpen(false)}></i>
        : 
    <i className="fa-solid fa-bars" onClick={() => setIsOpen(true)}></i>

    return (
        <header>
            <Link 
                to="/"
                onClick={() => setIsOpen(false)}
            >
                <h2>MovieLife</h2>
            </Link>
            <div className="icon">
                {icon}
            </div>
        </header>
    )
}

Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
};

export default Header