import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useIsHr from "../hooks/useIsHr";


const PrivateHr = ({children}) => {
    const {user, loading} = useAuth();
    const [ isHr, hrLoading ] = useIsHr();

    if(loading || hrLoading){
        return <progress className="progress w-full mt-6"></progress>
    }

    if(user && isHr){
        return children;
    }
    return <Navigate to='/sign-in'></Navigate>
};


export default PrivateHr;