import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Admin = () =>{
    const navigate = useNavigate()
    const token = sessionStorage.getItem('accessToken')
    // useEffect (()=>{
    //     if(!token){
    //         console.log("alo");
            
    //          navigate('/login')
    //     }
    // },[token])
 
    return (
        <>
        Admin
        </>
    )
}

export default Admin