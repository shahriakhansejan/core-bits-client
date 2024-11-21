import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../Shared/Title/Title";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import useLoggedUser from "../../../hooks/useLoggedUser";
import { IoSearch } from "react-icons/io5";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AddRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState([]);
  const { user } = useAuth();
  const [loggedUser] = useLoggedUser();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("status");
  const [type, setType] = useState("type");

  const handleSearch = (searchText) => {
    setSearch(searchText);
  };

  const { data: assets = [] } = useQuery({
    queryKey: ["assets", loggedUser?.hrEmail, search, type, status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hr-assets?email=${loggedUser.hrEmail}&search=${search}&type=${type}&status=${status}`
      );
      return res.data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const note = form.note.value;

    const requestedData = {
      asset_name: requestData.product_name,
      asset_id: requestData._id,
      requester_name: user?.displayName,
      requester_email: user?.email,
      hr_email: requestData.hr_email,
      note: note,
      asset_type: requestData.product_type,
      request_date: moment().format("YYYY-MM-DD"),
      approve_date: "",
      status: "pending",
    };

    axiosSecure.post("/requests", requestedData).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        document.getElementById(requestData._id).close();
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your request has been recorded",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Add-Request</title>
      </Helmet>
      <div className="bg-[#f3f3f3] min-h-screen">
        <Title
          title="Submit Request"
          subTitle=" for Review and Approved"
        ></Title>
        <div className="max-w-7xl py-12 px-8 lg:px-2 mx-auto">
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
                <option value="status">Availability</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out-of-Stock</option>
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

          {assets.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {assets.map((asset) => (
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
                        {asset.product_quantity > 0
                          ? "Available"
                          : "Out of Stock"}
                      </div>
                    </h2>
                    <p className="capitalize dark2 flex items-center gap-2 font-semibold">
                      <FaRegArrowAltCircleRight className="text-lg" />{" "}
                      {asset.product_type}
                    </p>

                    {asset.product_quantity > 0 ? (
                      <button
                        onClick={() => {
                          document.getElementById(asset._id).showModal(),
                            setRequestData(asset);
                        }}
                        className="w-full mt-2 text-xs p-1 hover:border-[#e83e8c] font-semibold border-2 rounded-2xl"
                      >
                        Request
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full mt-2 text-xs p-1 font-semibold border-2 rounded-2xl"
                      >
                        Request
                      </button>
                    )}
                    {/* modal */}
                    <dialog id={`${asset._id}`} className="modal">
                      <div className="modal-box rounded-none bg-white">
                        <span className="flex justify-end">
                          <button
                            onClick={() =>
                              document.getElementById(asset._id).close()
                            }
                            className="text-xl"
                          >
                            X
                          </button>
                        </span>
                        <h3 className="font-bold dark1 titleFont text-2xl">
                          {asset.product_name}
                        </h3>
                        <p className="dark2 text-lg font-semibold">
                          <span className="text-red-500 text-xl">*</span>{" "}
                          Additional Note:
                        </p>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <textarea
                              name="note"
                              className="textarea w-full textarea-bordered"
                              placeholder="Add additional note"
                            ></textarea>
                            <input
                              className="btn btn-outline w-full btn-sm mt-2 rounded-full btn-secondary"
                              type="submit"
                              value="Request"
                            />
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="text-2xl md:text-5xl font-bold text-center dark1 w-full py-20">
              No Item to Show.....
            </h1>
          )}
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AddRequest;
