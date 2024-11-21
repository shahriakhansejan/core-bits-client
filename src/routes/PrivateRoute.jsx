import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading){
        return <progress className="progress w-full mt-6"></progress>
    }

    if(user){
        return children;
    }
    return <Navigate to='/sign-in'></Navigate>
};



export default PrivateRoute;