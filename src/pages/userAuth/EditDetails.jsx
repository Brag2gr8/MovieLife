import { useState } from "react";
import { auth } from "../../utils/firebase";

export default function UserDetailsEditComponent() {
  const [nickname, setNickname] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = auth.currentUser;

      await user.updateProfile({
        displayName: nickname,
        photoURL: profilePicture,
      });

      setLoading(false);
      setError("");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit User Details</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSave}>
        <label>
          Nickname:
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </label>
        <label>
          Profile Picture:
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          Save
        </button>
      </form>
    </div>
  );
}
