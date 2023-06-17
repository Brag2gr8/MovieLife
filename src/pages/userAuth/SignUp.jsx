import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import dummy from "../../assets/profile-dummy.png"
import { convertBlobToDataURL } from "../../utils/profileUtils";

const SignUp = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    profilePicture: null,
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const [profilePlaceholder, setProfilePlaceholder] = useState(dummy)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profilePicture: file }));
  
    // Create a temporary URL for the selected file
    const fileUrl = URL.createObjectURL(file);
  
    // Set the profilePlaceholder state with the file URL
    setProfilePlaceholder(fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nickname, profilePicture, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setSigningUp(true);
      setError(null);

      // Create user with email and password
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      
      // Send email verification
      await user.sendEmailVerification();

        // Convert profile picture to URL if selected
        let profilePictureUrl = "";
        if (profilePicture) {
          profilePictureUrl = await convertBlobToDataURL(profilePicture)
        }

        // Store profile picture URL and nickname in localStorage
        localStorage.setItem("user", JSON.stringify({
          profilePicture: profilePictureUrl,
          nickname: nickname
        }));

      // Reset form data
      setFormData({
        nickname: "",
        profilePicture: null,
        email: "",
        password: "",
        confirmPassword: ""
      });

      setSigningUp(false);
      window.alert("Sign up successful!"); // Display alert

      // Redirect to Email verified page
      navigate("/login?message=A verification email has been sent. Please check your inbox to complete the registration process.")

      // Replace "/dashboard" with the desired URL
      // history.push("/dashboard");
    } catch (error) {
      setError(error.message);
      setSigningUp(false);
    }
  };

  return (
    <div className="signup-page">
      <h2>Create an account</h2>
      <form 
        onSubmit={handleSubmit}
        className="create-watchlist-form signup-form"
      >
          <img src={profilePlaceholder} className="account-picture"/>
          <label className="custom-file-label">
            <h4><i className="fa-solid fa-camera"></i> -- Choose An Avatar *</h4>
            <input
              className="custom-file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <label>
            Nickname *
            <input
              className="create-watchlist-input"
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              required
            />
          </label>
          <label>
            Email *
            <input
              className="create-watchlist-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter a valid email address"
            />
          </label>
          <label>
            Password *
            <input
              className="create-watchlist-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </label>
          <label>
            Confirm Password *
            <input
              className="create-watchlist-input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="confirm your password"
              required
            />
          </label>
        <button
            type="submit"
            disabled={signingUp}
            className="create-watchlist-button"
        >
          {signingUp ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="below-alternate-signup">
        Have an account? <Link to="/login">Log in</Link>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignUp;
