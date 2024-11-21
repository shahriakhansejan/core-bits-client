import moment from "moment";
import { useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EmployeeSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {createUser, updateUserInfo} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        // console.log(result.user);
        if (result.user) {
          updateUserInfo(data.name, data.photo)
          .then(() => {
            postUserInfo(data)
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
              postUserInfo(data);
            }
          });
        }
      });
  };

  const postUserInfo = data =>{
    const userData = {
      name: data.name,
      email: data.email,
      img: data.photo,
      birthday: moment(data.birthday).format("YYYY-MM-DD"),
      role: "user",
      hrEmail : ""
    };
    axiosSecure.post("/users", userData).then((res) => {
      // console.log(res.data);
      if (res.data) {
        navigate('/user-page')
        Swal.fire("Registration Successfully!");
      }
    });
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | SignUp</title>
      </Helmet>
      <div className="mx-2">
        <div className="card bg-white shadow-md rounded max-w-4xl mx-auto my-12 py-8">
          <h1 className="text-5xl font-bold titleFont text-center pt-16 pb-8 dark1">
            Join as Employee
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control w-full">
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
                <p className="text-red-400 text-sm">Name is required</p>
              )}
            </div>

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
                <p className="text-red-400 text-sm">Email is required</p>
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
                  <p className="text-red-400 text-sm">
                    Date of Birth is required
                  </p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="font-semibold dark2">Photo URL</span>
                </label>
                <input
                  name="photo"
                  placeholder="Photo URL"
                  type="text"
                  className="input input-bordered"
                  {...register("photo", { required: true })}
                />
                {errors.photo && (
                  <p className="text-red-400 text-sm">Photo is required</p>
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

export default EmployeeSignUp;
