import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"


export default function CreateWatchList() {
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
    
    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const data = JSON.parse(existingWatchList)

        if(data) {
            setAllWatchlist(data)
        }

        
    }, [])

    function handleChange(e) {
        const {name, value} = e.target

        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        const isInWatchlist = allWatchlist.some(el => formData.name === el.name)
        
        if (!isInWatchlist) {
            console.log(isInWatchlist)
            e.preventDefault()
            alert(`${formData.name} WatchList successfully created`)
            setRefresh(prev => !prev)
            const updatedWatchlist= [...allWatchlist, formData];
            setAllWatchlist(updatedWatchlist)
            localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist))
            navigate("/")
        } else {
            alert("watchlist name already exists, choose another name")
        }
    }

    return (
        <div className="create-watchlist-page">
            <form onSubmit={handleSubmit} className="create-watchlist-form">
                <label>
                    Name
                    <input 
                        className="create-watchlist-input"
                        type= "text"
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
                        type= "text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button className="create-watchlist-button">
                    Create Watchlist
                </button>
            </form>
        </div>
    )
}
