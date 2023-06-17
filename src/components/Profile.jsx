import { Link } from "react-router-dom";
import dummy from "../assets/profile-dummy.png";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/firebase";

//Profile component
export default function Profile(props) {
  const { currentUser, logout } = useAuth();
  const [username, setUsername] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    // Obtain user from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (currentUser && userData) {
      setUsername(userData.nickname);
      setPicture(userData.profilePicture);
    }
  }, []);
  
  // Close Modal to reveal page on mobile
  function closeModal() {
    props.setIsOpen(false)
  }

  // Logout the user
  async function handleLogout() {
    try {
      await logout();
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="modal-profile" >
    {currentUser ? (
      <>
        <Link
          to="/dashboard"
          className="guest"
          onClick={closeModal}
        >
          <img src={picture || dummy} alt="Profile Picture" />
          <p>{username || "Guest"}</p>
        </Link>
        <button 
          className="little-logout-button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </>
    ) : (
      <>
        <div className="guest">
          <img src={picture || dummy} alt="Profile Picture" />
          <p>{username || "Guest"}</p>
        </div>
        <i className="fa-solid fa-ellipsis"></i>
      </>
    )}
  </div>
  )
}
