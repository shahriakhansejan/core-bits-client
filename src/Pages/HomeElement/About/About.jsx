import accessoriesImg from "../../../assets/images/accessories.jpg";
import Tab from "./Tab";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto bg-orange-50 py-20">
      <div className="flex flex-col lg:flex-row items-center rounded-md bg-[#FEBF00]">
        <div className="w-full lg:w-1/2">
          <img className="rounded-md" src={accessoriesImg} alt="" />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <div className="">
            <h2 className="text-4xl titleFont font-semibold dark1">About Us</h2>
            <h4 className="text-2xl titleFont font-semibold dark1 mb-2">
              Welcome to CoreBits
            </h4>
      
            <p className="font-medium dark1 text-justify">
            At CoreBits, we empower HR professionals to streamline product management and boost employee engagement. Our platform offers intuitive tools that enhance communication and oversight, tailored for the modern HR leader.
            </p>
          </div>
          <div className="mt-8">
            <Tab></Tab>
          </div>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {};

export default About;
