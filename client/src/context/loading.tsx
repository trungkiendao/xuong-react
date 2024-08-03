// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface LoadingContextProps {
//   loading: boolean;
//   setLoading: (loading: boolean) => void;
// }

// const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [loading, setLoading] = useState<boolean>(false);

//   return (
//     <LoadingContext.Provider value={{ loading, setLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = (): LoadingContextProps => {
//   const context = useContext(LoadingContext);
//   if (context === undefined) {
//     throw new Error('useLoading must be used within a LoadingProvider');
//   }
//   return context;
// };


import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextProps {
  loading:boolean,
  setLoading: (loading:boolean) => void
}

const LoadingContext = createContext<LoadingContextProps| undefined>(undefined)

export const LoadingProvider:React.FC<{children:ReactNode}> = ({children} ) =>{
const [loading,setLoading] = useState<boolean>(false)

return (
  <LoadingContext.Provider value={{loading,setLoading}}>
    {children}
  </LoadingContext.Provider>
)
}


export const useLoading = ():LoadingContextProps => {
const context = useContext(LoadingContext)
if(context == undefined){
  throw new Error("Alo")
}
return context

}
