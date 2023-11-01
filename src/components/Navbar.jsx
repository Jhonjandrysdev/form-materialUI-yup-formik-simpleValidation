import {NavLink} from "react-router-dom"
import {UserS} from '../context/UserContext';


const NavBar = () => {

    const {user,setUser} = UserS()
    return(
        <>
        <h1>NavBar</h1>
        <NavLink to="/">Home</NavLink> |
        {
            user && (
                <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                </>
            )
        } 

        </>
    )
}
export default NavBar