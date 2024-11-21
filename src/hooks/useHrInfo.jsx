import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useHrInfo = () => {

    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth();

    const {data : hrInfo} = useQuery({
        queryKey: ['hrInfo', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/hr-info/${user.email}`)
            return res?.data;
        }
    })


    return [ hrInfo ]
};


export default useHrInfo;