import {Out} from '../firebase/myapp';
import {Button} from '@mui/material';

const Dashboard = () => {

    const handleOut = async() => {
        try {
            await Out()
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
        
        <h1>Dashboard(Ruta Protegida)</h1>
        <Button onClick={handleOut}>LogOut</Button>
        </>
    )
}
export default Dashboard