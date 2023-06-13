
import { Link } from "react-router-dom"
import profile from "../assets/profile-dummy.png"

export default function Profile(props) {

    return(    
        <Link 
            to="/dashboard" 
            className="modal-profile"
            onClick={() => props.setIsOpen(false)}
        >
            <div className="guest">
                <img src={profile} />
                <p>Guest</p>
            </div>
            <i className="fa-solid fa-ellipsis"></i>
        </Link>
    )
}