import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay, Navigation } from "swiper/modules";
import { EffectFlip } from "swiper/modules";
import hrBg from "../../../assets/images/Banner/hr.jpg";
import employeeBg from "../../../assets/images/Banner/employee.jpg";
import { Link } from "react-router-dom";


const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // navigation
        modules={[Autoplay, Navigation, EffectFlip]}
        className="mySwiper"
        effect="flip"
        grabCursor={true}
        centeredSlides={true}
        flipEffect={{
          slideShadows: true,
        }}
      >
        <SwiperSlide>
          <div
            className=""
            style={{
              backgroundImage: `url(${hrBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-gradient-to-r from-black/75 to-black/5 h-auto py-36">
              <div className="w-full md:w-2/3 lg:w-1/2 pr-6 md:pr-0 pl-6 md:pl-16">
                <h1 className="text-5xl md:text-7xl text-[#FEBF00] titleFont">
                  Join the HR Revolution
                </h1>
                <p className="text-justify text-white py-12 font-medium">
                Take the lead in shaping our culture and success. Register today to access tools for talent management, employee engagement, and strategic growth. Together, we can make a difference!
                </p>
                <Link to='/hr-register'><button className="btn btn-warning">Join as HR</button></Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className=""
            style={{
              backgroundImage: `url(${employeeBg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-gradient-to-r from-black/75 to-black/5 h-auto py-36">
              <div className="w-full md:w-2/3 lg:w-1/2 pr-6 md:pr-0 pl-6 md:pl-16">
                <h1 className="text-5xl md:text-7xl text-[#FEBF00] titleFont">
                  Embrace Your Future
                </h1>
                <p className="text-justify text-white py-12 font-medium">
                "Welcome aboard! Register to explore a wealth of resources
              designed to help you thrive in your new role. Connect with your
              colleagues, manage your profile, and embark on a rewarding journey
              with us."
                </p>
                <Link to='/employee-register'><button className="btn btn-warning">Join as Employee</button></Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
