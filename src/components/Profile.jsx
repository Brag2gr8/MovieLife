import { Link } from "react-router-dom";
import dummy from "../assets/profile-dummy.png";
import { useState, useEffect } from "react";
import { currentUser, logout } from "../utils/firebase";

export default function Profile(props) {
  const user = currentUser();
  const [name, setName] = useState("");
  useEffect(() => {
    // Obtain user from local storage
    const nickname = JSON.parse(localStorage.getItem("nickname"));
    if (nickname) {
      setName(nickname);
    }
  }, []);

   // Close Modal to reveal page on mobile
  function closeModal() {
    props.setIsOpen(false)
  }

  // Logout the user and close the modal
  async function handleLogout() {
    await logout();
    closeModal()
  }

  return (
    <div className="modal-profile" >
      <div
        className="guest"
      >
        <img src={dummy} alt="Profile Picture" />
        <p>{name || "Guest"}</p>
      </div>
    {user ? (
      <button 
        className="little-logout-button"
        onClick={handleLogout}
      >
        Log out
      </button>
    ) : (
      <button 
        className="little-logout-button"
        onClick={closeModal}
      >
        <Link to="/login">Log in</Link>
      </button>
    )}
  </div>
  )
}