import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useIsHr = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isHr, isPending: hrLoading } = useQuery({
        queryKey: ['isHr', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/hr/${user.email}`)
            return res.data.hr
        }
    })

    return [ isHr, hrLoading ];
};


export default useIsHr;