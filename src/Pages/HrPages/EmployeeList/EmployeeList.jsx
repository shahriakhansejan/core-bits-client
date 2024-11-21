import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Title from "../../Shared/Title/Title";
import useHrInfo from "../../../hooks/useHrInfo";
import { HelmetProvider, Helmet } from "react-helmet-async";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [hrInfo] = useHrInfo();

  const { data: employers = [], refetch } = useQuery({
    queryKey: ["employers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users-hr-email?hrEmail=${user.email}`
      );
      return res.data;
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove him!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (hrInfo) {
          const updatePackage = { package: hrInfo.package + 1 };
          axiosSecure
            .patch(`/hr-info/${hrInfo._id}`, updatePackage)
            .then((res) => {
              // console.log(res.data);
              if (res.data.modifiedCount > 0) {
                const userInfo = {
                  updateRole: "user",
                  updateHrEmail: " ",
                };
                axiosSecure.patch(`/users/${id}`, userInfo).then((res) => {
                  // console.log(res.data);
                  if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Successfully Removed !",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              }
            });
        }
      }
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Employee-List</title>
      </Helmet>
      <div className="bg-[#f4f4f4] min-h-screen">
        <Title
          title="Employee Directory"
          subTitle="Shining in Every Role"
        ></Title>
        <div className="overflow-x-auto max-w-7xl py-12 mx-auto">
          <div className="overflow-x-auto max-w-7xl p-2 mx-auto">
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
                {employers.map((employee, index) => (
                  <tr key={employee._id}>
                    <th>{index + 1}.</th>
                    <td>
                      <div className="avatar mask mask-squircle h-14 w-14">
                        <img
                          src={employee.img}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </td>
                    <td>
                      {employee.name}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {employee.email}
                      </span>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleRemove(employee._id)}
                        className="btn btn-outline btn-error btn-sm text-[11px]"
                      >
                        Remove
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

export default EmployeeList;
