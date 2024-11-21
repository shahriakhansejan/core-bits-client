import { Link, useNavigate } from "react-router-dom";
import errorGif from "../../assets/images/404.gif"
import { IoMdHome } from "react-icons/io";
import { IoCaretBack } from "react-icons/io5";


const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="flex justify-center items-center">
                <img src={errorGif} alt="" />
            </div>
            <div className="cinzel flex font-semibold text-sm text-white justify-around">
                <button 
                className="flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-500 px-3 py-2" 
                onClick={()=>navigate(-1)}>Back <IoCaretBack className="text-2xl"/> </button>
                {/* <Link to='/'><button className="flex items-center gap-2 bg-gradient-to-r from-[#835D23] to-[#B58130] px-3 py-2">Back to Home <IoMdHome className="text-2xl"/> </button></Link> */}
            </div>
        </div>
    );
};


export default ErrorPage;