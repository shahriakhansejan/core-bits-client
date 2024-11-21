import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#FEBF00]">
      <footer className="footer max-w-7xl mx-auto p-10 dark1 font-medium">
        <nav>
          <h6 className="dark2 titleFont text-xl font-semibold">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="dark2 titleFont text-xl font-semibold">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="dark2 titleFont text-xl font-semibold">
            Social Media
          </h6>
          <span className="flex gap-3">
            <a href="https://facebook.com/" target="_blank" className="p-2 hover:bg-gray-50 rounded-md">
              <FaFacebookSquare className="text-3xl" />{" "}
            </a>
            <a href="https://www.instagram.com" target="_blank" className="p-2 hover:bg-gray-50 rounded-md">
              <FaInstagramSquare className="text-3xl" />{" "}
            </a>
            <a href="https://x.com" target="_blank" className="p-2 hover:bg-gray-50 rounded-md">
              <BsTwitterX className="text-3xl" />{" "}
            </a>
          </span>
        </nav>
      </footer>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
