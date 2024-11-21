import { useQuery } from "@tanstack/react-query";
import Title from "../../Shared/Title/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { useState } from "react";
import AssetModal from "./AssetModal";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import { HelmetProvider, Helmet } from "react-helmet-async";

const MyAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("status");
  const [type, setType] = useState("type");

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const handleModal = (asset) => {
    setSelectedAsset(asset);
    document.getElementById(asset._id).showModal();
  };

  const { data: requestedAssets = [], refetch } = useQuery({
    queryKey: ["requestedAssets", user?.email, search, type, status],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/request-assets?email=${user.email}&search=${search}&status=${status}&type=${type}`
      );
      return res.data;
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel your Request?",
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
        axiosSecure.delete(`/requests/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleReturn = (asset) => {
    const updatedAsset = {
      approve_date: asset.approve_date,
      status: "returned",
    };
    axiosSecure.patch(`/requested/${asset._id}`, updatedAsset).then((res) => {
      // console.log(res.data, "1");
      if (res.data.modifiedCount > 0) {
        axiosSecure.get(`/asset/${asset.asset_id}`).then((res) => {
          // console.log(res.data, "2");
          if (res.data) {
            const updatedQuantity = {
              product_quantity: res.data.product_quantity + 1,
            };
            axiosSecure
              .patch(
                `/assets-quantity-update/${asset.asset_id}`,
                updatedQuantity
              )
              .then((res) => {
                // console.log(res.data, "3");
                refetch();
                if (res.data.modifiedCount) {
                  Swal.fire("Asset has been Returned!");
                }
              });
          }
        });
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Requested</title>
      </Helmet>
      <div className="bg-[#f3f3f3] min-h-screen px-1">
        <Title title="Requested Assets" subTitle="Manage & Track"></Title>
        <div className="max-w-7xl mx-auto py-12 overflow-x-auto">
          <div className="flex flex-col-reverse gap-2 md:flex-row justify-between my-2">
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
            <span className="flex gap-1">
              <select
                defaultValue="status"
                onChange={(e) => setStatus(e.target.value)}
                className="select select-sm select-primary"
              >
                <option value="status">Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="returned">Returned</option>
              </select>
              <select
                defaultValue="type"
                onChange={(e) => setType(e.target.value)}
                className="select select-sm select-primary"
              >
                <option value="type">Type</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </select>
            </span>
          </div>

          {requestedAssets.length ? (
            <div className="overflow-x-scroll">
              <table className="table">
                {/* head */}
                <thead className="bg-[#FEBF00] dark1">
                  <tr>
                    <th>#</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Request Date</th>
                    <th>Approve Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white font-medium dark2">
                  {/* row 1 */}
                  {requestedAssets.map((asset, index) => (
                    <tr key={asset._id}>
                      <th>{index + 1}.</th>
                      <td>{asset.asset_name}</td>
                      <td className="capitalize">{asset.asset_type}</td>
                      <td>
                        {moment(`${asset.request_date}`).format("DD MMM YYYY")}
                      </td>
                      <td>
                        {asset.approve_date
                          ? moment(`${asset.approve_date}`).format(
                              "DD MMM YYYY"
                            )
                          : "_ _ _"}
                      </td>
                      <td>
                        <span
                          className={`badge capitalize ${
                            asset.status === "pending"
                              ? "badge-secondary"
                              : "badge-success"
                          } badge-outline`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td>
                        {asset.status === "pending" ? (
                          <button
                            onClick={() => handleCancel(asset._id)}
                            className="badge badge-outline badge-error"
                          >
                            Cancel
                          </button>
                        ) : asset.status === "returned" ? (
                          <p className="text-blue-400 font-semibold">
                            Returned
                          </p>
                        ) : asset.asset_type === "returnable" ? (
                          <button
                            onClick={() => handleReturn(asset)}
                            className="badge badge-outline badge-info"
                          >
                            Return
                          </button>
                        ) : (
                          <button
                            onClick={() => handleModal(asset)}
                            className="badge badge-outline"
                          >
                            Print
                          </button>
                        )}
                      </td>
                      {/* modal */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="text-2xl md:text-5xl font-bold text-center dark1 w-full py-20">
              No Item to Show.....
            </h1>
          )}
        </div>
        <dialog id={`${selectedAsset._id}`} className="modal">
          <AssetModal asset={selectedAsset}></AssetModal>
        </dialog>
      </div>
    </HelmetProvider>
  );
};

export default MyAsset;
