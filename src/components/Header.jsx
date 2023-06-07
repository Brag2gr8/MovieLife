import { Link } from "react-router-dom"

export default function Header(props) {
// eslint-disable-next-line react/prop-types
const {isOpen, setIsOpen} = props

    const icon = isOpen ? 
    <i className="fa-solid fa-xmark cancel" onClick={() => setIsOpen(false)}></i>
        : <i className="fa-solid fa-bars" onClick={() => setIsOpen(true)}></i>

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