import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHrInfo from "../../../hooks/useHrInfo";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

const UpdatePackage = () => {
  const { user } = useAuth();
  const [hrInfo] = useHrInfo();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handlePackage = (event) => {
    event.preventDefault();
    const currentPackage = event.target.package.value;
    const updatePackage = {
      package: hrInfo?.package + parseInt(currentPackage),
    };

    axiosSecure.patch(`/hr-info/${hrInfo?._id}`, updatePackage).then((res) => {
      // console.log(res.data);
      if (res.data.modifiedCount > 0) {
        navigate("/add-employee");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Added to your Team!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Package</title>
      </Helmet>
      <div className="bg-[#f3f3f3] min-h-screen py-12">
        <h2 className="text-5xl dark1 font-extrabold titleFont my-8 text-center">
          Update Your Package
        </h2>
        <div className="max-w-3xl mx-auto bg-white">
          <form onSubmit={handlePackage} className="card-body">
            <span className="py-2 pl-2">
              <h4 className="text-xl uppercase text-yellow-500 font-bold">
                Name: {user?.displayName}
              </h4>
              <h4 className="text-lg dark2 py-1 font-bold">
                Email: {user?.email}
              </h4>
              <p className="font-semibold dark2">
                Package Available : {hrInfo?.package}
              </p>
            </span>
            <div className="form-control w-full">
              <label className="label">
                <span className="font-semibold dark2">Update your Package</span>
              </label>
              <select
                defaultValue="default"
                name="package"
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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-warning">Update Package</button>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UpdatePackage;
