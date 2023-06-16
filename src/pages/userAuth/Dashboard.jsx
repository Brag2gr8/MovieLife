import React, { useState, useEffect } from "react";
import { currentUser, logout } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { convertBlobToDataURL } from "../../utils/profileUtils";



const Dashboard = () => {
  const user = currentUser();
  const [isUpdating, setIsUpdating] = useState(false)
  const [userData, setUserData] = useState(null)
  const [profilePlaceholder, setProfilePlaceholder] = useState(null)
  const [newFormData, setNewFormData] = useState({nickname: "", profilePicture: ""})
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));
    if (parsedUser) {
      setUserData(parsedUser)
      setProfilePlaceholder(parsedUser.profilePicture)
    }

  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const handleNameChange = (e) => {
    setNewFormData(prev => (
      {...prev, nickname: e.target.value}
    ));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
  
    setNewFormData((prevData) => ({ ...prevData, profilePicture: file }));;

    // Create a temporary URL for the selected file
    const fileUrl = URL.createObjectURL(file);
  
    // Set the profilePlaceholder state with the file URL
    setProfilePlaceholder(fileUrl);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true)
    const { nickname, profilePicture} = newFormData
    let name = ""
    let pictureUrl = ""

    if(!nickname) {
      name = userData.nickname
    }
    if(!profilePicture) {
      pictureUrl = userData.profilePicture;
    }
    
    try {

      if (profilePicture) {
        pictureUrl = await convertBlobToDataURL(profilePicture)
      } 

      localStorage.setItem("user", JSON.stringify({
        profilePicture: pictureUrl,
        nickname: nickname || name
      }));

      alert("profile updated successfully")
    } catch (err) {setError(err)}
    setIsUpdating(false)
    window.location.reload()
  };

  if (user && !user.emailVerified) {
    return (
      <div className="signup-page">
        <h2>Email Not Verified</h2>
        <p>Please verify your email before accessing the user dashboard.</p>
        <button
          className="create-watchlist-button logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="signup-page dashboard">
      <h2>User Dashboard</h2>
      {user ? (
        <div>
          <div className="dashboard-details">
            <p>Welcome, {userData?.nickname || "User"}!</p>
            <p>Email: {user.email}</p>
            {profilePlaceholder && (
              <>
                <p>
                  Profile Picture
                </p>
                <img 
                  src={profilePlaceholder} 
                  alt="Profile Picture" className="account-picture"
                />
              </>
            )}
          </div>
          <form 
            onSubmit={handleProfileUpdate} 
            className="create-watchlist-form signup-form" 
          >
          <label className="custom-file-label">
            <h4><i className="fa-solid fa-camera"></i> -- Choose An Avatar *</h4>
            <input
              className="custom-file-input"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
          </label>
            <label>
              Name
              <input
                className="create-watchlist-input"
                type="text"
                value={newFormData.nickname}
                placeholder={userData?.nickname}
                onChange={handleNameChange}
              />
            </label>
            <button 
              className="create-watchlist-button dashboard-button"
              type="submit"
              disabled={isUpdating}
            >
              Update Profile
            </button>
          </form>
          {error && <p className="error">{error.message}</p>}
          <button 
            className="create-watchlist-button logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-reveal loading">
          <h3 className="text">Loading user information...</h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
