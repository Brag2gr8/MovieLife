import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../utils/firebase";

export default function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      alert("Succesfully logged in")

      // Redirect to the home page after successful login
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form 
        onSubmit={handleLogin}
        className="create-watchlist-form signup-form"
      >
        <label>
          Email *
          <input
            className="create-watchlist-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <button 
            type="submit" 
            disabled={loading}
            className="create-watchlist-button"
        >
          {loading ? "logging in" : "Login"}
        </button>
      </form>
      <p className="below-alternate-signup">
        Or create an account? <Link to="/signup">Here</Link>
      </p>
    </div>
  );
}
