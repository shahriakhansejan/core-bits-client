import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useIsHr from "../../hooks/useIsHr";
import useIsEmployee from "../../hooks/useIsEmployee";
import useIsUser from "../../hooks/useIsUser";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [ isHr ] = useIsHr();
  const [ isEmployee ] = useIsEmployee();
  const [ isUser ] = useIsUser();
  

 
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;


    signInUser(email, password)
      .then((result) => {
        // console.log(result.user);

      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message)
      });
  };

  useEffect(()=>{
    if(user && (isHr || isEmployee || isUser)){
      if(isHr){
        navigate('/hr-home')
        Swal.fire("HR login Successfully!");
      }
      else if(isEmployee){
        navigate('/employee-home')
        Swal.fire("Employee login Successfully!");
      }
      else if(isUser){
        navigate( '/user-page' )
        Swal.fire("User login Successfully!");
      }
    }
  },[user, isHr, isEmployee, isUser])
  
 
  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | SignIn</title>
      </Helmet>
      <div className="mx-2">
        <div className="card bg-white shadow-md rounded max-w-4xl mx-auto my-12 py-8">
          <h1 className="text-5xl font-bold titleFont text-center pt-16 pb-8 dark1">
            Sign In Now !
          </h1>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control w-full">
              <label className="label">
                <span className="font-semibold dark2">Your Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type your Email"
                className="input input-bordered"
                required
              />
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
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-2xl -ml-9"
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </span>
              </span>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-warning">Sign In</button>
            </div>
            {error && <p className="text-red-400 ml-2">{error}</p>}
          </form>

          {/* <div className="text-center">
            <h4 className="text-lg dark1 font-semibold">Or,</h4>
            <GoogleSignIn></GoogleSignIn>
          </div> */}
        </div>
      </div>
    </HelmetProvider>
  );
};


export default SignIn;
