import {useState} from "react"
import {useNavigate} from "react-router-dom"

const Search = ({setIsOpen}) => {
    const [title, setTitle] = useState("")
    const navigate = useNavigate()
    
    
    function handleSubmit(e) {
        e.preventDefault();
        navigate(`search?title=${title}`)
        setTitle('')
        if(setIsOpen) {
            setIsOpen(false)
        }
    }
    
    function handleChange(e) {
        setTitle(e.target.value)
    }
    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
                type="text"
                onChange={handleChange}
                name="title"
                value={title}
                placeholder="Search for movies by title"
                required
            />
            <button>search</button>
        </form>
    )
}

export default Search