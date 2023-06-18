import React, { useState } from "react";
import { auth, currentUser } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

export function loader() {
  const user = currentUser()
  console.log(user)
  if(user) {
    alert("you are already logged in")
    throw new redirect("/")
  }
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nickname, email, password, confirmPassword } = formData;

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

        // Store nickname in localStorage
        localStorage.setItem("nickname", JSON.stringify(nickname));

      // Reset form data
      setFormData({
        nickname: "",
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
