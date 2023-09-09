import React from "react";
import heroSec from "../assets/hero2.png";
import { Link } from "react-router-dom";
// import { getRoomTypes } from '../roomTypesAPI';

const Home = () => {
  // ... (your existing code)

  return (
      <div className="relative lg_pro:mx-auto p-0 bg-[url(/src/assets/bgtransformed.jpeg)] lg_pro:h-[90vh] bg-no-repeat lg_pro:bg-cover bg-cover bg-center h-[55vh]  bg-blend-darken">
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Add this overlay */}
        <div className=" lg_pro:py-20 lg:pro:px-12 py-8 px-2 w-[90%] lg_pro:w-[60%]">
          <h1 className="lg_pro:text-[3.8rem] text-2xl lg_pro:mb-4 mb-3 text-white font-serif lg_pro:font-semibold lg_pro:px-8 mix-blend-lighten z-10 leading-tight relative font-bold px-4 pt-10">
            Welcome to Our Oasis of Hospitality
          </h1>
          <div className="lg_pro:text-lg text-base px-3 text-white font-semibold mix-blend-lighten lg_pro:w-[80%] lg_pro:px-8 lg_pro:block w-[100%]">
            <p>
              Step into a World of Unparalleled Comfort and Hospitality, Where
              Every Guest is Family. We're Thrilled to Welcome You!
            </p>
          </div>
          <div className="flex lg_pro:my-10 justify-left text-center mb-4 lg_pro:mx-4 mx-3">
            <Link
              to={"/rooms"}
              className=" text-base z-10 relative text-white mx-3 mt-4 px-4 py-2 text-center bg-[#7C6802] rounded font-semibold"
            >
              Room Types
            </Link>
            <Link
              to="/Booking"
              className="mt-4 bg-[#7C6802] text-white px-4 py-2 rounded z-10 relative text-base font-semibold"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Home;
