import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import moment from "moment";
import { MdDateRange } from "react-icons/md";
import Calender from "./Calender";
import { HelmetProvider, Helmet } from "react-helmet-async";

const EmployeeHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: requestedAssets = [] } = useQuery({
    queryKey: ["requestedAssets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Employee-Home</title>
      </Helmet>
      <div className="bg-[#f3f3f3] min-h-screen px-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center w-full mx-auto py-12 md:w-1/2">
            <h2 className="dark1 titleFont font-semibold text-5xl">
              Employee Portal
            </h2>
            <p className="text-base md:text-lg font-medium italic py-3 themeColor mb-4">
              Your hub for updates, tasks, and seamless workflow management
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-16 md:gap-6">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl dark1 font-bold mb-4 titleFont">
                Pending Requests :
              </h1>
              {requestedAssets?.pendingRequests?.length ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-screen overflow-y-scroll">
                  {requestedAssets?.pendingRequests?.map((request) => (
                    <div
                      key={request._id}
                      className="card card-compact bg-white"
                    >
                      <div className="card-body">
                        <h2 className="card-title dark1">
                          {request.asset_name}
                        </h2>
                        <p className="capitalize dark2 flex items-center gap-2 font-semibold">
                          <FaRegArrowAltCircleRight className="text-lg" />
                          {request.asset_type}
                        </p>
                        <p className="font-semibold pl-1 text-sm flex gap-1 items-center text-blue-600">
                          <MdDateRange />{" "}
                          {moment(request.request_date).format("DD MMMM YY")}
                        </p>
                        <button className="border-2 rounded-full p-1 font-bold my-2">
                          Pending
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-xl lg:text-3xl font-bold text-center dark1 w-full py-20">
                  No Item to Show.....
                </h1>
              )}
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="text-3xl dark1 font-bold mb-6 titleFont">
                Requested This {moment().format("MMMM")} :
              </h1>
              {requestedAssets?.currentMonthRequests?.length ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-h-screen overflow-y-scroll">
                  {requestedAssets?.currentMonthRequests?.map((request) => (
                    <div
                      key={request._id}
                      className="card card-compact bg-white"
                    >
                      <div className="card-body">
                        <h2 className="card-title dark1">
                          {request.asset_name}
                        </h2>
                        <p className="capitalize dark2 flex items-center gap-2 font-semibold">
                          <FaRegArrowAltCircleRight className="text-lg" />
                          {request.asset_type}
                        </p>
                        <p className="font-semibold pl-1 text-sm flex gap-1 items-center text-blue-600">
                          <MdDateRange />{" "}
                          {moment(request.request_date).format("DD MMMM YY")}
                        </p>
                        <button className="border-2 rounded-full p-1 font-bold capitalize my-2">
                          {request.status}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="text-xl lg:text-3xl font-bold text-center dark1 w-full py-20">
                  No Item to Show.....
                </h1>
              )}
            </div>
          </div>

          <Calender></Calender>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default EmployeeHome;
