import { Link } from "react-router-dom"
import error from "../assets/404.png"

const InvalidPage = () => {

    return (
        <div className="invalid-page">
            <img src={error} />
            <h2>PAGE NOT FOUND</h2>
            <Link to="/">
                <button className="return-home">
                    Return to Homepage
                </button>
            </Link>
        </div>
    )
}
export default InvalidPage