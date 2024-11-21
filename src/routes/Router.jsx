import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/HomeElement/Home/Home";
import HRSignUp from "../Pages/Authentication/HRSignUp";
import EmployeeSignUp from "../Pages/Authentication/EmployeeSignUp";
import HrHome from "../Pages/HrPages/Home/HrHome";
import AddAsset from "../Pages/HrPages/AddAsset/AddAsset";
import SignIn from "../Pages/Authentication/SignIn";
import AssetList from "../Pages/HrPages/AssetList/AssetList";
import UserPage from "../Pages/Shared/UserPage/UserPage";
import AddEmployee from "../Pages/HrPages/AddEmployee/AddEmployee";
import EmployeeList from "../Pages/HrPages/EmployeeList/EmployeeList";
import EmployeeHome from "../Pages/EmployeePages/EmployeeHome/EmployeeHome";
import MyAsset from "../Pages/EmployeePages/MyAsset/MyAsset";
import MyTeam from "../Pages/EmployeePages/MyTeam/MyTeam";
import AddRequest from "../Pages/EmployeePages/AddRequest/AddRequest";
import AllRequests from "../Pages/HrPages/AllRequests/AllRequests";
import PrivateEmployee from "./PrivateEmployee";
import PrivateHr from "./PrivateHr";
import PrivateRoute from "./PrivateRoute";
import UpdatePackage from "../Pages/HrPages/AddEmployee/UpdatePackage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/hr-register',
            element: <HRSignUp></HRSignUp>
        },
        {
          path: '/employee-register',
          element: <EmployeeSignUp></EmployeeSignUp>
        },
        {
          path: '/sign-in',
          element: <SignIn></SignIn>
        },
        // user Page
        {
          path: '/user-page',
          element: <PrivateRoute><UserPage></UserPage></PrivateRoute>
        },
        // hr Pages
        {
          path: '/hr-home',
          element: <PrivateHr><HrHome></HrHome></PrivateHr>
        },
        {
          path: '/add-asset',
          element: <PrivateHr><AddAsset></AddAsset></PrivateHr>
        },
        {
          path: '/asset-list',
          element: <PrivateHr><AssetList></AssetList></PrivateHr>
        },
        {
          path: '/add-employee',
          element: <PrivateHr><AddEmployee></AddEmployee></PrivateHr>
        },
        {
          path: '/employee-list',
          element: <PrivateHr><EmployeeList></EmployeeList></PrivateHr>
        },
        {
          path: '/all-requests',
          element: <PrivateHr><AllRequests></AllRequests></PrivateHr>
        },
        {
          path: '/update-package',
          element: <UpdatePackage></UpdatePackage>
        },
        // Employee routes
        {
          path: '/employee-home',
          element: <PrivateEmployee><EmployeeHome></EmployeeHome></PrivateEmployee>
        },
        {
          path: '/my-asset',
          element: <PrivateEmployee><MyAsset></MyAsset></PrivateEmployee>
        },
        {
          path: '/my-team',
          element: <PrivateEmployee><MyTeam></MyTeam></PrivateEmployee>
        },
        {
          path: '/add-request',
          element: <PrivateEmployee><AddRequest></AddRequest></PrivateEmployee>
        }
      ]
    },
  ]);

  export default router;