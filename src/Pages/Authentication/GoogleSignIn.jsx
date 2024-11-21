// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// const GoogleSignIn = () => {
//   const { googleSignIn } = useAuth();
//   const navigate = useNavigate();

//   const handleGoogleSignIn = () => {
//     googleSignIn()
//       .then((result) => {
//         console.log(result.user);
//         navigate('/notic')
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn} className="btn btn-outline my-6">
//         <FcGoogle className="text-2xl" /> Sign In With Google
//       </button>
//     </div>
//   );
// };

// GoogleSignIn.propTypes = {};

// export default GoogleSignIn;
