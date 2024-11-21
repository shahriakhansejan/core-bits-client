import { Link, NavLink } from "react-router-dom";
import CoreBitsLogo from "../../../assets/images/CoreBits.png";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import bgImg from "../../../assets/images/bg.png";
import useIsEmployee from "../../../hooks/useIsEmployee";
import useIsHr from "../../../hooks/useIsHr";
import useHrInfo from "../../../hooks/useHrInfo";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [isEmployee] = useIsEmployee();
  const [isHr] = useIsHr();
  const [hrInfo] = useHrInfo();

  const handleSignOut = () => {
    logOutUser().then().catch();
  };

  const navMenu = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/employee-register">Join-as-Employee</NavLink>
      </li>
      <li>
        <NavLink to="/hr-register">Join-as-HR-Manager</NavLink>
      </li>
    </>
  );

  const hrNav = (
    <>
      <li>
        <NavLink to="/hr-home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/asset-list">Asset List</NavLink>
      </li>
      <li>
        <NavLink to="/add-asset">Add Asset</NavLink>
      </li>
      <li>
        <NavLink to="/all-requests">All Requests</NavLink>
      </li>
      <li>
        <NavLink to="/employee-list">Employee List</NavLink>
      </li>
      <li>
        <NavLink to="/add-employee">Add Employee</NavLink>
      </li>
    </>
  );
  const employeeNav = (
    <>
      <li>
        <NavLink to="/employee-home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/my-asset">My Requested</NavLink>
      </li>
      <li>
        <NavLink to="/my-team">My Team</NavLink>
      </li>
      <li>
        <NavLink to="/add-request">Add Request</NavLink>
      </li>
    </>
  );

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="sticky top-0 z-20 bg-red-600"
    >
      <div className="navbar max-w-7xl mx-auto">
        <div className="w-1/4 justify-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <AiOutlineMenu className="text-2xl text-white" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user ? (
                isHr ? (
                  hrNav
                ) : isEmployee ? (
                  employeeNav
                ) : (
                  <li to="/user-page">
                    {" "}
                    <NavLink>Home</NavLink>
                  </li>
                )
              ) : (
                navMenu
              )}
            </ul>
          </div>
          {isHr || isEmployee ? (
            <img
              className="w-12 bg-white p-2 rounded-full"
              src={hrInfo?.company_logo}
              alt=""
            />
          ) : (
            <img
              className="w-12 bg-white p-2 rounded-full"
              src={CoreBitsLogo}
              alt=""
            />
          )}
        </div>
        <div className="w-3/4 text-white font-medium justify-end">
          <ul className="hidden lg:flex text-sm gap-8 activeNav px-4">
            {user ? (
              isHr ? (
                hrNav
              ) : isEmployee ? (
                employeeNav
              ) : (
                <li to="/user-page">
                  {" "}
                  <NavLink>Home</NavLink>
                </li>
              )
            ) : (
              navMenu
            )}
          </ul>
          {user ? (
            <span className="flex gap-2 items-center">
              <button
                onClick={handleSignOut}
                className="font-bold bg-white text-sm px-2 py-1 rounded text-red-600"
              >
                SignOut
              </button>
              <div className="dropdown dropdown-end dropdown-hover">
                <div tabIndex={0} role="button" className="">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user?.photoURL}
                    alt="img"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white dark2 rounded z-[1] w-48 p-3 shadow"
                >
                  <div className="">
                    <h1 className="font-semibold dark1">Name: {user?.displayName}</h1>
                    <h2 className="text-sm font-medium dark2">
                      @: {user?.email}
                    </h2>
                    {/* <button className="text-xs w-full mt-2 border hover:border-red-400 rounded px-2 py-1">
                      Update
                    </button> */}
                  </div>
                </ul>
              </div>
            </span>
          ) : (
            <Link to="/sign-in">
              <button className="font-bold bg-white text-sm px-2 py-1 rounded text-green-600">
                SignIn
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
