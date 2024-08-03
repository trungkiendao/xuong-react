

import React, { createContext, ReactNode, useContext, useState } from "react";

interface CartContextProps {
  Cart:number,
  setCart: (Cart:number) => void
}

const CartContext = createContext<CartContextProps| undefined>(undefined)

export const CartProvider:React.FC<{children:ReactNode}> = ({children} ) =>{
const [Cart,setCart] = useState<number>(0)

return (
  <CartContext.Provider value={{Cart,setCart}}>
    {children}
  </CartContext.Provider>
)
}


export const useCart = ():CartContextProps => {
const context = useContext(CartContext)
if(context == undefined){
  throw new Error("Alo")
}
return context

}
