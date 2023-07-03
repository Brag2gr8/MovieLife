// Importing `useState` hook and UI components from other files
import  { useState } from "react"
import Header from "./Header"
import Modal from "./Modal"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

// Defining a functional component named `HomeLayout`
const HomeLayout = () => {
    
    // Using `useState` to create two state variables `isOpen` and `refresh`
    const [isOpen, setIsOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)

    return (
        <div className="home-layout">
            <Header 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
            />
            <main>
                <Modal 
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
                <div className={`outlet-div ${isOpen && "hide"}`}>
                    <Outlet context={{setRefresh, setIsOpen}}/>
                    <Footer
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />    
                </div>
            </main>   
        </div>
    )
}

export default HomeLayout