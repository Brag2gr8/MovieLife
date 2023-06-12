import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      // Redirect to the home page after successful login
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form 
        onSubmit={handleLogin}
        className="create-watchlist-form signup-form"
      >
        <input
          className="create-watchlist-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="create-watchlist-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
            type="submit" 
            disabled={loading}
            className="create-watchlist-button"
        >
          {loading ? "logging in" : "Login"}
        </button>
      </form>
    </div>
  );
}
