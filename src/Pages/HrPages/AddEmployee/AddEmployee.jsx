import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Title from "../../Shared/Title/Title";
import { Link } from "react-router-dom";
import useHrInfo from "../../../hooks/useHrInfo";
import { HelmetProvider, Helmet } from "react-helmet-async";

const AddEmployee = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [hrInfo] = useHrInfo();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users?role=user");
      return res.data;
    },
  });

  const handleAddToTeam = (id) => {
      if (hrInfo?.package > 0) {
        const updatePackage = { package: hrInfo?.package - 1 };
        axiosSecure
          .patch(`/hr-info/${hrInfo?._id}`, updatePackage)
          .then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
              const userInfo = {
                updateRole: "employee",
                updateHrEmail: user.email,
                asset_id: id
              };
              axiosSecure.patch(`/users/${id}`, userInfo).then((res) => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                  refetch();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Added to your Team!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
            }
          });
      } else {
        return Swal.fire({
          icon: "error",
          title: "Maximum Limit Reached!",
          // text: "Maximum Limit Reached",
          footer: '<a href="/update-package">Upgrade your package?</a>',
        });
      }
   
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Add-Employee</title>
      </Helmet>
      <div className="bg-[#f4f4f4] min-h-screen">
      <Title title="Add New Employee" subTitle="Bringing new Talent"></Title>
      <div className="overflow-x-auto py-12 max-w-7xl mx-auto">
        <div className="overflow-x-auto max-w-7xl p-2 mx-auto">
          <span className="flex justify-end mb-2 text-sm font-semibold dark1 hover:text-blue-600"><Link to='/update-package'>Update Package?</Link></span>
          <table className="table">
            {/* head */}
            <thead className="bg-[#FEBF00] dark1 text-lg titleFont">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="dark2 font-medium bg-white">
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>
                    <label className="flex items-center gap-2">
                      {index + 1}.
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="avatar mask mask-squircle h-14 w-14">
                      <img src={user.img} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </td>
                  <td>
                    {user.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user.email}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <button
                      onClick={() => handleAddToTeam(user._id)}
                      className="btn btn-outline btn-info btn-sm text-[11px]"
                    >
                      Add to Team
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
};

export default AddEmployee;
