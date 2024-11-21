import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Title from "../../Shared/Title/Title";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AssetEdit from "./AssetEdit";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState("Quantity");
  const [status,setStatus] = useState("status");
  const [type, setType] = useState('type')

  const { data: assets = [], refetch } = useQuery({
    queryKey: ["assets", user?.email, search, sort, status, type],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?email=${user.email}&search=${search}&sort=${sort}&status=${status}&type=${type}`);
      return res?.data || [];
    },
  });

  const handleSearch = searchText =>{
    setSearch(searchText)
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/assets/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: "Your asset has been Removed!.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Asset-List</title>
      </Helmet>
      <div className="bg-[#f4f4f4] min-h-screen">
      <div className="max-w-7xl p-2 mx-auto">
      <Title title="Asset Inventory" subTitle="Track Assets Easily"></Title>
      <div className="flex mt-10 flex-col-reverse gap-2 md:flex-row justify-between my-2">
          <span className="flex gap-1">
          <form onSubmit={
            (event)=>{
              event.preventDefault();
              handleSearch(event.target.search.value);
            }
          }>
            <label className="input input-bordered input-sm flex items-center gap-2">
              <input
                type="text"
                name="search"
                className="grow"
                placeholder="Search here..."
                onBlur={
                  (event)=>{
                    handleSearch(event.target.search.value);
                  }
                }
              />
              <button className="hover:text-blue-500 text-blue-700"><IoSearch className="text-xl" /></button>
            </label>
          </form>
          <select defaultValue='Quantity'
            onChange={(e)=>setSort(e.target.value)}
             className="select select-sm select-primary">
              <option value='status'>
              Quantity
              </option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
            </select>
          </span>
          <span className="flex gap-1">
            <select defaultValue='status'
            onChange={(e)=>setStatus(e.target.value)}
             className="select select-sm select-primary">
              <option value='status'>
              Availability
              </option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out-of-Stock</option>
            </select>
            <select defaultValue="type"
            onChange={(e)=>setType(e.target.value)}
             className="select select-sm select-primary">
              <option value="type">
                Type
              </option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
          </span>
        </div>
        <div className="overflow-x-auto">
         
          {
            assets.length ?
            <table className="table font-medium dark2">
            {/* head */}
            <thead className="bg-[#FEBF00] dark1 text-lg titleFont">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {/* row  */}
              { (
                assets.map((asset, index) => (
                  <tr key={asset._id}>
                    <td>{index + 1}.</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={asset.img} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{asset.product_name}</div>
                          <div className="text-sm opacity-50">
                            {asset.date_added}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="capitalize">{asset.product_type}</p>
                    </td>
                    <td>Quantity: {asset.product_quantity}</td>
                    <th>
                      <span className="flex gap-6">
                        <button
                          onClick={() =>
                            document.getElementById(asset._id).showModal()
                          }
                          className="text-yellow-600 hover:text-yellow-500 text-2xl"
                        >
                          <FaEdit />{" "}
                        </button>
                        <button
                          onClick={() => handleDelete(asset._id)}
                          className="text-2xl text-red-500 hover:text-red-600"
                        >
                          <MdDeleteForever />{" "}
                        </button>
                      </span>
                      <dialog id={asset._id} className="modal">
                        <AssetEdit refetch={refetch} asset={asset}></AssetEdit>
                      </dialog>
                    </th>
                  </tr>
                ))
              ) }
            </tbody>
          </table>
          :
           (
            <h1 className="text-xl lg:text-3xl font-bold text-center dark1 w-full py-20">
              No Item to Show.....
            </h1>
          )
          }
        </div>
      </div>
    </div>
      </HelmetProvider>
  );
};

export default AssetList;
