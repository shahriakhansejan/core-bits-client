import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useIsEmployee from "../hooks/useIsEmployee";


const PrivateEmployee = ({children}) => {
    const {user, loading} = useAuth();
    const [ isEmployee, employeeLoading ] = useIsEmployee();

    if(loading || employeeLoading){
        return <progress className="progress w-full mt-6"></progress>
    }

    if(user && isEmployee){
        return children;
    }
    return <Navigate to='/sign-in'></Navigate>
};



export default PrivateEmployee;