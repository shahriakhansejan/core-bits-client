import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import Title from "../../Shared/Title/Title";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const { data: requestedAssets = [], refetch } = useQuery({
    queryKey: ["requestedAssets", user?.email, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hr-requests?email=${user.email}&search=${search}`
      );
      return res.data;
    },
  });

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleApprove = (asset) => {
    // console.log(asset);

    axiosSecure.get(`assets/${asset.asset_id}`).then((res) => {
      // console.log(res.data.product_quantity);
      if (res.data.product_quantity > 0) {
        const quantityUpdate = {
          product_quantity: res.data.product_quantity - 1,
        };
        axiosSecure
          .patch(`/assets-quantity/${asset.asset_id}`, quantityUpdate)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              const updateAsset = {
                approve_date: moment().format("YYYY-MM-DD"),
                status: "approved",
              };
              axiosSecure
                .patch(`requests/${asset._id}`, updateAsset)
                .then((res) => {
                  if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire("Request Approved!");
                  }
                });
            }
          });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject the Request?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Back",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(id);
        axiosSecure.delete(`/reject/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Request Rejected",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | All-Request</title>
      </Helmet>
      <div className="bg-[#f3f3f3] px-2 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Title
            title="Request Management"
            subTitle="Manage Asset Requests"
          ></Title>
          <div className="pt-12 pb-2 flex justify-end">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch(event.target.search.value);
              }}
            >
              <label className="input input-bordered input-sm flex items-center gap-2">
                <input
                  type="text"
                  name="search"
                  className="grow"
                  placeholder="Search here..."
                  onBlur={(event) => {
                    handleSearch(event.target.search.value);
                  }}
                />
                <button className="hover:text-blue-500 text-blue-700">
                  <IoSearch className="text-xl" />
                </button>
              </label>
            </form>
          </div>
          {requestedAssets.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 pb-12 lg:grid-cols-3 gap-4">
              {requestedAssets.map((asset) => (
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

                    <div>
                      {asset.status === "pending" ? (
                        <span className="flex mt-2 gap-2">
                          <button
                            onClick={() => handleApprove(asset)}
                            className="btn w-1/2  btn-outline rounded-none btn-success btn-sm text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(asset._id)}
                            className="btn w-1/2 btn-outline rounded-none btn-error btn-sm text-xs"
                          >
                            Reject
                          </button>
                        </span>
                      ) : (
                        <span className="flex mt-2 gap-3">
                          <h3 className="text-green-500 font-bold capitalize w-1/2 text-center">
                            {asset.status}
                          </h3>
                          <button
                            disabled
                            className="btn w-1/2 btn-outline rounded-none btn-error btn-sm text-xs"
                          >
                            Reject
                          </button>
                        </span>
                      )}
                    </div>
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
    </HelmetProvider>
  );
};

export default AllRequests;
