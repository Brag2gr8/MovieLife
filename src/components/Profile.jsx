import { Link, useNavigate } from "react-router-dom";
import dummy from "../assets/profile-dummy.png";
import { useState, useEffect } from "react";
import { currentUser, logout, firestore } from "../utils/firebase";

const Profile = ({setIsOpen}) => {
  const user = currentUser();
  const [name, setName] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNickname = async () => {
        if (user) {
          const userDoc = await firestore.collection("users").doc(user.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const nickname = userData.nickname;
            setName(nickname);
            console.log("Nickname:", nickname);
            // You can use the nickname variable as needed
          } 
        }
    };

    fetchNickname();
  }, [user]);

  // Close Modal to reveal page on mobile
  function closeModal() {
    setIsOpen(false);
  }

  // Logout the user and close the modal
  async function handleLogout() {
    await logout();
    setName("Guest")
    navigate("/login?message=You have successfully logged out")
    closeModal();
  }

  return (
    <div className="modal-profile">
      <div className="guest">
        <img src={dummy} alt="Profile Picture" />
        <p>{name || "Guest"}</p>
      </div>
      {user ? (
        <button className="little-logout-button" onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <button className="little-logout-button" onClick={closeModal}>
          <Link to="/login">Log in</Link>
        </button>
      )}
    </div>
  );
};

export default Profile;
