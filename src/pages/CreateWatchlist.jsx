import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { nanoid } from "nanoid";

const CreateWatchList = () => {
  // State to hold the current watchlist data
  const [currentWatchlist, setCurrentWatchlist] = useState([]);

  // Accessing the refresh function from the outlet context
  const { setRefresh } = useOutletContext();

  // State to hold the form data for creating a new watchlist
  const [formData, setFormData] = useState({
    id: nanoid(),
    name: "",
    description: "",
    movies: [],
  });

  // Navigate function from react-router-dom to handle routing
  const navigate = useNavigate();

  // useEffect hook to load existing watchlist data from local storage
  useEffect(() => {
    const existingWatchList = localStorage.getItem("allWatchlist");
    const data = JSON.parse(existingWatchList);

    if (data) {
      setCurrentWatchlist(data);
    }
  }, [currentWatchlist.length]);

  // Event handler for input changes in the form
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  // Event handler for form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Check if the watchlist name already exists
    const isExistingWatchlist = currentWatchlist.some(
      (watchlist) => watchlist.name === formData.name
    );

    // If the watchlist name already exists, show an alert and return early
    if (isExistingWatchlist) {
      alert("Watchlist name already exists. Please choose a different name.");
      return;
    }

    // If the watchlist name is unique, show success alert, update watchlist data, and navigate to the home page
    alert(`${formData.name} WatchList successfully created`);
    setRefresh((prev) => !prev);

    const updatedWatchlist = [...currentWatchlist, formData];
    setCurrentWatchlist(updatedWatchlist);
    localStorage.setItem("allWatchlist", JSON.stringify(updatedWatchlist));
    navigate("/");
  }

  return (
    <div className="create-watchlist-page">
      <form onSubmit={handleSubmit} className="create-watchlist-form">
        <label>
          Name
          <input
            className="create-watchlist-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            className="create-watchlist-textarea"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button className="create-watchlist-button">Create Watchlist</button>
      </form>
    </div>
  );
}

export default CreateWatchList 