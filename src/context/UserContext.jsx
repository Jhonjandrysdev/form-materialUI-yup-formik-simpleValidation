import { onAuthStateChanged } from 'firebase/auth';
import {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase/myapp';
export const UserContext = createContext()

const StateUser = ({children}) => {

    const [user, setUser] = useState(false)

    useEffect(()=> {
        const inactive = onAuthStateChanged(auth, (user) => {
            console.log(user);
            setUser(user)
        })
        return inactive
    },[])

    if (user === false) return <p>Loading App...</p>

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}
export default StateUser

export const UserS = () => useContext(UserContext)