import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';
export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [CurrentUserEmail, setCurrentUserEmail] = useState('')
  const [LoggedID, setLoggedID] = useState(0)
  const [Photo, setPhoto] = useState("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg")
   
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
         let response= await Axios.get("https://admintimeclothengine.herokuapp.com/admin/"+user)
            console.log(response.data)
            setLoggedID(response.data[0].idadmin)
            setPhoto(response.data[0].UserPhoto)
         return response.data
         }
        
        
          
    const value = {
      CurrentUserEmail,
      LoggedID,
      Photo, setPhoto
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}