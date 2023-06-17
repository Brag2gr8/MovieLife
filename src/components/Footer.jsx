import { Link } from "react-router-dom"

export default function Footer(props) {
    // eslint-disable-next-line react/prop-types
    const { isOpen, setIsOpen } = props

    const icon = isOpen ?
        <i className="fa-solid fa-xmark cancel" onClick={() => setIsOpen(false)}></i>
        :
        <i className="fa-solid fa-bars" onClick={() => setIsOpen(true)}></i>

    return (
        <footer>
            <p>Made with ❤️ form Nigeria</p>
            <div className="social-icons">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-brands fa-github"></i>

            </div>
        </footer>
    )
}