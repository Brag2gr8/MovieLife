import { Link } from "react-router-dom";
import dummy from "../assets/profile-dummy.png";
import { useState, useEffect } from "react";
import { currentUser, logout } from "../utils/firebase";

export default function Profile(props) {
  const user = currentUser();
  const [username, setUsername] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUsername(userData.nickname);
      setPicture(userData.profilePicture);
    }
  }, []);

  function closeModal() {
    props.setIsOpen(false)
  }

  async function handleLogout() {
    await logout();
    closeModal()
  }

  return (
    <div className="modal-profile" >
    {user ? (
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
          <img src={dummy} alt="Profile Picture" />
          <p>{"Guest"}</p>
        </div>
        <button 
          className="little-logout-button"
          onClick={closeModal}
        >
          <Link to="/login">Log in</Link>
        </button>
      </>
    )}
  </div>
  )
}
