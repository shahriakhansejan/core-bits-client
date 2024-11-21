import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useIsEmployee = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isEmployee, isPending: employeeLoading} = useQuery({
        queryKey: [ 'isEmployee', user?.email ],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/employee/${user.email}`)
            return res.data.employee;
        }
    })
    return [ isEmployee, employeeLoading ]
};

export default useIsEmployee;