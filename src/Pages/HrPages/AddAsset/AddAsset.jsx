import { useForm } from "react-hook-form";
import selfImg from "../../../assets/images/self.jpg";
import Title from "../../Shared/Title/Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { HelmetProvider, Helmet } from "react-helmet-async";


const img_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgBB_API
}`;
const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(img_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const asset = {
        product_name: data.name,
        img: res.data.data.display_url,
        product_type: data.type,
        product_quantity: parseInt(data.quantity),
        date_added: moment().format("YYYY-MM-DD"),
        hr_email: user?.email,
      };
      const assetRes = await axiosSecure.post("/assets", asset);
      // console.log(assetRes.data);
      if (assetRes.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} added Successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/asset-list");
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Add-Asset</title>
      </Helmet>
      <div className="bg-orange-50 min-h-screen px-2">
        <div className="max-w-7xl mx-auto">
          <Title title="Add an Asset" subTitle="Effortlessly Record"></Title>
          <div className="flex py-16 flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2">
              <img className="rounded" src={selfImg} alt="" />
            </div>
            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body dark2"
              >
                {/* product Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium">Product Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Type Product Name"
                    className="input input-bordered"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      Product Name is Required
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* photo */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="font-medium">Product Photo</span>
                    </label>
                    <input
                      {...register("image", { required: true })}
                      name="image"
                      type="file"
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm">
                        Product Photo is Required
                      </p>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="font-medium">Product Quantity</span>
                    </label>
                    <input
                      type="number"
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
                    defaultValue="default"
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
                  <button className="btn btn-warning rounded-none">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AddAsset;
