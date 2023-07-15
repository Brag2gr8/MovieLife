import { useState } from "react";
import { useNavigate, Link, useLoaderData, redirect } from "react-router-dom";
import { auth, currentUser } from "../../utils/firebase";

// Loader function to get the "message" query parameter from the URL
export function loader({ request }) {
  const user = currentUser()
  return new URL(request.url).searchParams.get("message")
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const message = useLoaderData()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      const user = auth.currentUser;

      if (user && !user.emailVerified) {
        setError("Verify your email before logging in");
        await auth.signOut();
        setLoading(false);
        return; // Stop further execution
      }

      setLoading(false);
      alert("Successfully logged in");
      navigate("/");
      window.location.reload()
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleLogin} className="create-watchlist-form signup-form">
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
      {error && <p className="error">{error}</p>}
      <p className="below-alternate-signup">
        Or create an account? <Link to="/signup">Here</Link>
      </p>
    </div>
  );
}

export default Login