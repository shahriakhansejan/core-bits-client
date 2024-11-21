import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useIsUser = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isUser, isPending: userLoading } = useQuery({
        queryKey: ['isUser', user?.email],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/user-role/${user.email}`)
            return res.data.userRole
        }
    })

    return [ isUser, userLoading ];
}

export default useIsUser;