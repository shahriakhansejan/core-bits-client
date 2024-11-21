import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../Shared/Title/Title";
import useLoggedUser from "../../../hooks/useLoggedUser";
import { HelmetProvider, Helmet } from "react-helmet-async";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  // const { roleUser } = useIdentifyUser();
  const [loggedUser] = useLoggedUser();

  const { data: team = [] } = useQuery({
    queryKey: ["team", loggedUser?.hrEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/team-hr-email?hrEmail=${loggedUser.hrEmail}`
      );
      return res.data;
    },
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | Team</title>
      </Helmet>
      <div className="bg-[#f3f3f3] h-screen">
        <Title title="Meet the Team" subTitle="Behind our Success"></Title>
        <div className="max-w-6xl py-12 mx-auto">
          <table className="table font-semibold">
            {/* head */}
            <thead className="bg-[#FEBF00] dark1">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {team.map((emp, index) => (
                <tr className="dark2 bg-white" key={emp._id}>
                  <th>{index + 1}.</th>
                  <td>
                    <img
                      className="w-12 h-12 rounded-2xl"
                      src={emp.img}
                      alt=""
                    />
                  </td>
                  <td>
                    {emp.name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {emp.email}
                    </span>
                  </td>
                  <td>
                    <span className="capitalize badge badge-secondary">
                      {emp.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default MyTeam;
