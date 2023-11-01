import { Navigate, Outlet } from "react-router-dom"
import {UserS} from '../context/UserContext';


const LayoutPrivate = () => {

    const {user} = UserS()
    return( user ? <Outlet/> : <Navigate to="/"/> )
}
export default LayoutPrivate