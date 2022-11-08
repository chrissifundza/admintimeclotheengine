import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';
export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [CurrentUserEmail, setCurrentUserEmail] = useState('')
  const [LoggedID, setLoggedID] = useState(0)
    
   
      //Reset password
        

        useEffect(() => {
          const unsubscribe = auth.onAuthStateChanged((user) => {

            if(user){
              console.log("User logged in")
             
              
            }else{
              console.log("User logged out")
             
            }
            
            console.log(user.email)
            setCurrentUserEmail(user.email)
            getUse(user.email)
           
          });
      
          return unsubscribe;
        }, []);
       
          
        async function getUse(user){
         let response= await Axios.get("http://localhost:3001/admin/"+user)
            console.log(response.data)
            setLoggedID(response.data[0].idadmin)
          
         return response.data
         }
        
          
    const value = {
      CurrentUserEmail,
      LoggedID
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}