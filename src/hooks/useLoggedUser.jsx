import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useLoggedUser = () => {
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: loggedUser} = useQuery({
        queryKey: ['loggedUser', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data;
        }
    })
    return [loggedUser];
};

export default useLoggedUser;