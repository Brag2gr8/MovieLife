import  {useState} from "react"
import Header from "./Header"
import Modal from "./Modal"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

export default function HomeLayout() {
    // Declare state for modal
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
                    refresh = {refresh}
                    setRefresh = {setRefresh}
                />
                <div className={`outlet-div ${isOpen && "hide"}`}>
                    <Outlet context={{setRefresh}}/>
                    <Footer
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />    
                </div>
            </main>   
        </div>
    )
}