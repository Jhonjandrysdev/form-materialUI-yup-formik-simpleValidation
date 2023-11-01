import { Outlet } from "react-router-dom"
import NavBar from "../components/Navbar"

const LayoutRoot = () => {
    return(
        <>
        <Outlet/>
        </>
    )
}
export default LayoutRoot