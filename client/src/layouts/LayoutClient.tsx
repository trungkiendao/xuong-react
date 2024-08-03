import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useEffect } from "react"
import Banner from "src/components/Banner"
import { CartProvider } from "src/context/cart"

const LayoutClient = () =>{
  const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect (()=>{
        if(!token){
            console.log("alo");
            
             navigate('/login')
        }
    },[token])
    return (
        <>
        <CartProvider>
      <Header/>
      <Banner/>
      <Outlet/>
      </CartProvider>
      <Footer/>
      </>
    )
}

export default LayoutClient

