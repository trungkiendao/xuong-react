import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "src/components/Sidebar"

const LayoutAdmin = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    console.log("Alo",token);

    
    
    useEffect (()=>{
        if(!token){
            console.log("Khong co token");
            
             navigate('/login')
        }
    },[token,navigate])
    return (
        <>
          
                
                <Sidebar >
                <Outlet />
                </Sidebar>
            
        </>

    )
}

export default LayoutAdmin

