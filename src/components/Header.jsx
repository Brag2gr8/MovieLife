import { Link } from "react-router-dom"

const Header = ({isOpen, setIsOpen}) => {
    const icon = isOpen ? 
    <i className="fa-solid fa-xmark cancel" onClick={() => setIsOpen(false)}></i>
        : <i className="fa-solid fa-bars" onClick={() => setIsOpen(true)}></i>

    return (
        <header>
            <div className="header-title">
                <Link 
                    to="/"
                    onClick={() => setIsOpen(false)}
                >
                    <h2>MovieLife</h2>
                </Link>
                <span className="beta">beta</span>
            </div>
            <div className="icon">
                {icon}
            </div>
        </header>
    )
}

export default Header