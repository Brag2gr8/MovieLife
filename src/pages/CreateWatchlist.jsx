import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"


export default function CreateWatchList() {
    const [currentWatchlist, setCurrentWatchlist] = useState([])
    const { setRefresh } = useOutletContext()
    const [formData, setFormData] = useState({
        id: nanoid(),
        name: "",
        description: ""
    })
    const navigate = useNavigate()
    
    useEffect(() => {
        const existingWatchList = localStorage.getItem("allWatchlist")
        const data = JSON.parse(existingWatchList)

        if(data) {
            setCurrentWatchlist(data)
        }

        
    }, [currentWatchlist.length])

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
        e.preventDefault()
        alert(`${formData.name} WatchList successfully created`)
        setRefresh(prev => !prev)
        const updatedWatchlist= [...currentWatchlist, formData];
        setCurrentWatchlist(updatedWatchlist)
        localStorage.setItem('allWatchlist', JSON.stringify(updatedWatchlist))
        navigate("/")
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