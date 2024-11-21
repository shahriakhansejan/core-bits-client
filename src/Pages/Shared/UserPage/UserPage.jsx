import { HiOutlineInformationCircle } from "react-icons/hi";
import { HelmetProvider, Helmet } from "react-helmet-async";

const UserPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>CoreBits | User-Home</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg px-6 py-8 bg-white rounded-lg shadow-lg text-center">
          <HiOutlineInformationCircle className="text-blue-600 mx-auto text-6xl mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            User Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            It seems that you’re not currently associated with any company.
          </p>
          <p className="text-gray-700">
            To access the full facilities of this website, please reach out to
            your HR representative to be added to their company.
          </p>
          <div className="mt-6 text-blue-600 font-medium">
            <p>Contact your HR for more details.</p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default UserPage;
