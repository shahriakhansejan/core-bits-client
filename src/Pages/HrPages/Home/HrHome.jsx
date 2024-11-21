import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Chart from "./Chart";
import { HelmetProvider, Helmet } from "react-helmet-async";


const HrHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {data: assets = []} = useQuery({
        queryKey: ['assets', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/hr-stats?email=${user.email}`)
            return res.data;
        }
    })
  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | HR-Home</title>
      </Helmet>
      <div className="bg-[#f3f3f3] min-h-screen px-2">
      <div className="max-w-7xl mx-auto">
      <div className="text-center w-full mx-auto py-12 md:w-1/2">
        <h2 className="dark1 titleFont font-semibold text-5xl">
          Welcome to HR Hub
        </h2>
        <p className="text-base md:text-lg font-medium italic py-3 themeColor mb-4">
          Empowering People, Driving Success
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-stretch">

        <div className="w-full lg:w-1/3 mx-auto">
            <h1 className="text-2xl text-blue-600 mb-2 font-bold">Pending Requests:</h1>
            <div className="bg-blue-50 h-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-scroll p-8">
                {
                    assets?.pendingRequests?.map(asset => 
                        <div key={asset._id} className="card bg-white rounded-none">
              <div className="card-body dark2">
                <h2 className="card-title">
                  {asset.asset_name}
                  <div className="badge capitalize badge-secondary">
                    {asset.status}
                  </div>
                </h2>
                <p className="text-sm font-medium capitalize">
                  {asset.asset_type}
                </p>
                <hr />
                <h4 className="font-semibold">
                  <span className="text-orange-700">Employee:</span>{" "}
                  {asset.requester_name}
                </h4>
                <h4 className="font-semibold">
                  <span className="text-orange-700">Email:</span>{" "}
                  {asset.requester_email}
                </h4>
                <h4 className="font-semibold">
                  <span className="text-orange-700">Requested on</span>{" "}
                  {moment(asset.request).format("DD MMM YYYY")}
                </h4>
                <p className="bg-gray-100 font-medium dark2 text-sm px-3 py-1 rounded-lg">
                  <span className="font-semibold">Note: </span>
                  {asset.note}
                </p>
                        <Link to='/all-requests'>
                        <button className="btn mt-2 w-full btn-outline rounded-full btn-success btn-sm text-xs">
                        Approve</button>
                        </Link>
              </div>
            </div>
                    )
                }
            </div>
        </div>

        <div className="w-full lg:w-1/3 mx-auto">
            <h1 className="text-2xl text-yellow-500 mb-2 font-bold">Top most Requested Items:</h1>
            <div className="bg-yellow-50 h-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-scroll p-8">
                {
                    assets?.topRequested?.map(asset => 
                        <div
                        key={asset._id}
                        className="card card-compact rounded-none bg-white"
                      >
                        <figure>
                          <img src={asset.img} alt="asset" />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title dark1">
                            {asset.product_name}
                            <div className="badge badge-secondary">
                              {asset.product_quantity > 0 ? "Available" : "Out of Stock"}
                            </div>
                          </h2>
                          <p className="capitalize dark2 flex items-center gap-2 font-semibold">
                            <FaRegArrowAltCircleRight className="text-lg" />{" "}
                            {asset.product_type}
                          </p>
                
                          <button
                              className="w-full my-2 text-xs p-1 font-semibold border-2 rounded-2xl"
                            >
                              Added On { moment(asset.date_added).format('DD MMM YY')}
                            </button>
                        </div>
                      </div>
                    )
                }
            </div>
        </div>

        <div className="w-full lg:w-1/3 mx-auto">
            <h1 className="text-2xl text-orange-600 mb-2 font-bold">Limited Stock Items:</h1>
            <div className="bg-orange-50 h-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-scroll p-8">
                {
                    assets?.limitedStock?.map(asset => 
                        <div
                        key={asset._id}
                        className="card card-compact rounded-none bg-white"
                      >
                        <figure>
                          <img src={asset.img} alt="asset" />
                        </figure>
                        <h2 className="absolute z-10 text-white text-2xl font-bold bg-black/50 py-1 px-2">Only {asset.product_quantity} left in stock !</h2>
                        <div className="card-body">
                          <h2 className="card-title dark1">
                            {asset.product_name}
                            <div className="badge badge-secondary">
                              Limited Stock
                            </div>
                          </h2>
                          <p className="capitalize dark2 flex items-center gap-2 font-semibold">
                            <FaRegArrowAltCircleRight className="text-lg" />{" "}
                            {asset.product_type}
                          </p>
                
                          <button
                              className="w-full my-2 text-xs p-1 font-semibold border-2 rounded-2xl"
                            >
                              Added On { moment(asset.date_added).format('DD MMM YY')}
                            </button>
                        </div>
                      </div>
                    )
                }
            </div>
        </div>

      </div>
      <div className="py-12">
      <Chart type={assets?.typeCounts? assets.typeCounts : []}></Chart>
      </div>
      </div>
    </div>
    </HelmetProvider>
  );
};

HrHome.propTypes = {};

export default HrHome;
