import React, { useState, useEffect } from "react";
import { useAuth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { currentUser, logout, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || "");
      setProfilePicture(currentUser.photoURL || "");
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Perform any necessary image upload logic
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        displayName: displayName,
        photoURL: profilePicture,
      });
      // Display a success message or perform any other related actions
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {currentUser ? (
        <div>
          <div>
            <p>Welcome, {displayName || "User"}!</p>
            <p>Email: {currentUser.email}</p>
            {profilePicture && (
              <p>
                Profile Picture:{" "}
                <img src={profilePicture} alt="Profile Picture" />
              </p>
            )}
          </div>
          <form onSubmit={handleProfileUpdate}>
            <label>
              Name:
              <input
                type="text"
                value={displayName}
                onChange={handleNameChange}
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
              />
            </label>
            <button type="submit">Update Profile</button>
          </form>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="text-reveal loading">
          <h1 className="text">Loading user information...</h1>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
