import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const img_hosting_api = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_imgBB_API
}`;

const HRSignUp = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUserInfo, isUserExists } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const logoFile = { image: data.logo[0] };
    const res = await axiosPublic.post(img_hosting_api, logoFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const logoUrl = res.data.data.display_url;
      createUser(data.email, data.password)
        .then((result) => {
          // console.log(result.user);
          if (result.user) {
            updateUserInfo(data.name, data.photo).then(() => {
              postUserInfo(data, logoUrl);
            });
          }
        })
        .catch((error) => {
          console.error(error.message);
          if(error){
            Swal.fire({
              title: "You are already user",
              text: "Are you want register as HR?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Continue!"
            }).then((result) => {
              if (result.isConfirmed) {
                postUserInfo(data, logoUrl);
              }
            });
          }
        });
    }
  };

  const postUserInfo = (data, logoUrl) =>{
    const hrInfo = {
      name: data.name,
      email: data.email,
      company: data.company,
      company_logo: logoUrl,
      package: parseInt(data.package),
    };
    axiosSecure.post("/hr-info", hrInfo).then((res) => {
      // console.log(res.data);
      if (res.data) {
        const userData = {
          name: data.name,
          email: data.email,
          img: data.photo,
          birthday: moment(data.birthday).format("YYYY-MM-DD"),
          role: "hr",
        };
        axiosSecure.post("/users", userData).then((res) => {
          // console.log(res.data);
          if (res.data) {
            Swal.fire("HR Registration Successfully!");
            navigate("/hr-home");
            reset();
          }
        });
      }
    });
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | SignUp</title>
      </Helmet>
      <div className="mx-2">
        <div className="card bg-white shadow-md rounded max-w-4xl border mx-auto my-12 py-8">
          <h1 className="text-5xl font-bold titleFont text-center pt-16 pb-8 dark1">
            Join as HR Manager
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <span className="flex flex-col md:flex-row gap-1">
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="font-semibold dark2">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Full Name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Name is Required</p>
                )}
              </div>
              <div className="form-control w-full md:w-1/2">
                <label className="label">
                  <span className="font-semibold dark2">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  {...register("photo", { required: true })}
                />
                {errors.photo && (
                  <p className="text-red-500">Photo is Required</p>
                )}
              </div>
            </span>
            <span className="flex gap-1 flex-col md:flex-row">
              <div className="form-control w-full md:w-2/3">
                <label className="label">
                  <span className="font-semibold dark2">Company Name</span>
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your Company Name"
                  className="input input-bordered"
                  {...register("company", { required: true })}
                />
                {errors.company && (
                  <p className="text-red-500">Company Name is Required</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="font-semibold dark2">Company Logo</span>
                </label>
                <input
                  name="logo"
                  type="file"
                  className="file-input file-input-bordered w-full"
                  {...register("logo", { required: true })}
                />
              </div>
            </span>
            <span className="flex gap-1 flex-col md:flex-row">
              <div className="form-control w-full">
                <label className="label">
                  <span className="font-semibold dark2">Your Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type your Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500">Email is Required</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="font-semibold dark2">Password</span>
                </label>
                <span className="flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="input input-bordered w-full"
                    {...register("password", {
                      required: true,
                      maxLength: 20,
                      minLength: 6,
                      pattern: /^(?=.*[A-Za-z])(?=.*\d){6,}/,
                    })}
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-2xl -ml-9"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                  </span>
                </span>
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is Required</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-500">
                    Password must not exceed 20 characters
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters or longer
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password should have one small letter one capital letter and
                    one number
                  </p>
                )}
              </div>
            </span>
            <span className="flex gap-1 flex-col md:flex-row">
              <div className="form-control w-full">
                <label className="label">
                  <span className="font-semibold dark2">Date of Birth</span>
                </label>
                <input
                  type="date"
                  name="birthday"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("birthday", { required: true })}
                />
                {errors.birthday && (
                  <p className="text-red-500">Birthday is Required</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="font-semibold dark2">Select a Package</span>
                </label>
                <select
                  defaultValue="default"
                  name="package"
                  {...register("package", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    {" "}
                    Select One
                  </option>
                  <option value="5">5 Members for $5</option>
                  <option value="10">10 Members for $8</option>
                  <option value="20">20 Members for $15</option>
                </select>
                {errors.package && (
                  <p className="text-red-500">Please Select a Package</p>
                )}
              </div>
            </span>
            <div className="form-control mt-6">
              <button className="btn btn-warning">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

HRSignUp.propTypes = {};

export default HRSignUp;
