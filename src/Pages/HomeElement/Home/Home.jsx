import { HelmetProvider, Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import About from "../About/About";
import Packages from "../Packages/Packages";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
  return (
    <HelmetProvider>
    <Helmet>
        <title>CoreBits | Home</title>
    </Helmet>
      <div>
        <Banner></Banner>
        <About></About>
        <Packages></Packages>
        <Footer></Footer>
      </div>
    </HelmetProvider>
  );
};

export default Home;
