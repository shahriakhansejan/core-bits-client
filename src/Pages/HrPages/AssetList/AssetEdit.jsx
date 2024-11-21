import moment from "moment";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const img_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgBB_API
}`;
const AssetEdit = ({ asset, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    let imageUrl;
    
    if(data.image.length){
        const imageFile = { image: data.image[0]}
        const res = await axiosPublic.post(img_hosting_api, imageFile, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
          imageUrl = res.data.data.display_url;
    }
    else{
        imageUrl = asset.img;
    }
    if(imageUrl){
      const updatedAsset = {
        product_name: data.name,
        img: imageUrl,
        product_type: data.type,
        product_quantity: parseInt(data.quantity)
      }
      const assetRes = await axiosSecure.patch(`/assets/${asset?._id}`, updatedAsset)
      // console.log(assetRes.data)
      if(assetRes.data.modifiedCount > 0){
        document.getElementById(asset._id).close()
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };
  return (
    <div>
      <div className="modal-box max-w-6xl">
        <span className="flex justify-end mr-2">
          <button
            onClick={() => document.getElementById(asset._id).close()}
            className="text-xl"
          >
            X
          </button>
        </span>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body dark2">
          {/* product Name */}
          <div className="form-control">
            <label className="label">
              <span className="font-medium">Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={asset.product_name}
              placeholder="Type Product Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Product Name is Required</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* photo */}
            <div className="form-control w-full">
              <label className="label">
                <span className="font-medium">Product Photo</span>
              </label>
              <input
                name="image"
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="font-medium">Product Quantity</span>
              </label>
              <input
                type="number"
                defaultValue={asset.product_quantity}
                name="quantity"
                placeholder="Enter Product Quantity"
                className="input input-bordered"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  Product Quantity is Required
                </p>
              )}
            </div>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-medium">Product Type</span>
            </label>
            <select
              name="type"
              {...register("type", { required: true })}
              className="select select-bordered w-full"
              defaultValue={asset.product_type}
            >
              <option disabled value="default">
                Select Product Type
              </option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non - Returnable</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">Please Select a Type</p>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-warning rounded-none">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetEdit;
