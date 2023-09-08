import React, { useState, useEffect } from "react";
import agelessLogo from "../assets/AgelessLogo.png";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faClose } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export const AgeNavbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#6D7AFA" : "rgba(5, 5, 5, 0.7)",
    };
  };

  const showMenu = () => {
    setActive(!active);
    // console.log("am active");
  };
  const handleBookButt = () => {
    setActive(false);
  };

  return (
    <div>
      <nav className="py-1 shadow-2xl my-2 lg_pro:w-full md:px-2 relative">
        <div className="w-[95%]  flex justify-between items-center mx-auto">
          <div>
            <Link to={"/"}>
              <img
                src={agelessLogo}
                alt="Ageless Hotel Logo"
                className=" md:w-26 lg:h-16 w-28 h-16"
              />
            </Link>
          </div>
          <div
            className={`lg_pro:sticky absolute lg_pro:bg-white bg-gray-100 lg_pro:min-h-fit min-h-[100vh] -top-10 w-4/6 z-50 ${
              active
                ? "left-[0%] transition-all duration-1000 ease-in-out"
                : "left-[-100%] transition-all duration-1000 ease-in-out"
            } lg_pro:w-auto flex flex-col  pt-10 lg_pro:py-5 lg_pro:items-center lg_pro:justify-center`}
          >
            <ul className="flex lg_pro:items-center lg_pro:gap-[5px] lg_pro:flex-row flex-col">
              <li className=" bg-white">
                <img
                  src={agelessLogo}
                  alt="Ageless Hotel Logo"
                  className=" md:w-26  w-28 h-15 lg_pro:hidden mb-8 px-1 pt-2"
                />
              </li>

              <NavLink
                to={"/"}
                className=" hover:text-gray-500  bg-white"
                style={navLinkStyles}
                onClick={showMenu}
              >
                <li className=" lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0 border-t-2  lg_pro:border-none">
                  <h1 className=" font-bold px-4 lg_pro:px-8 cursor-pointer">
                    Home
                  </h1>
                </li>
              </NavLink>
              <NavLink
                to={"/about"}
                className={"hover:text-gray-500 bg-white"}
                style={navLinkStyles}
                onClick={showMenu}
              >
                <li className="lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0  lg_pro:border-none">
                  <h4 className="font-bold px-4 lg_pro:px-8  cursor-pointer">
                    About
                  </h4>
                </li>
              </NavLink>
              <NavLink
                to={"/contact"}
                className="hover:text-gray-500 bg-white"
                style={navLinkStyles}
                onClick={showMenu}
              >
                <li className="lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0  lg_pro:border-none">
                  <h4 className="font-bold px-4 lg_pro:px-8  cursor-pointer">
                    {" "}
                    Contact
                  </h4>
                </li>
              </NavLink>
              {!loggedIn && (
                <NavLink
                  to={"/reservation"}
                  className="hover:text-gray-500 bg-white"
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <li className="lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0  lg_pro:border-none">
                    <h4 className="font-bold px-4 lg_pro:px-8  cursor-pointer">
                      {" "}
                      Book
                    </h4>
                  </li>
                </NavLink>
              )}

              <NavLink
                to={"/location"}
                className=" hover:text-gray-500 bg-white"
                style={navLinkStyles}
                onClick={showMenu}
              >
                <li className="lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0  lg_pro:border-none">
                  <h4 className="font-bold px-4 lg_pro:px-8  cursor-pointer">
                    {" "}
                    Location
                  </h4>
                </li>
              </NavLink>
              {loggedIn && (
                <NavLink
                  to={"/Dashboard"}
                  className="hover:text-gray-500 bg-white"
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <li className="lg_pro:py-0 py-5 border-b-2 border-gray-300 lg_pro:mt-0  lg_pro:border-none">
                    <h4 className="font-bold px-4 lg_pro:px-8  cursor-pointer">
                      Dashboard
                    </h4>
                  </li>
                </NavLink>
              )}
            </ul>
          </div>
          <div className="flex justify-center items-center">
            {!loggedIn && (
              <button
                className=" text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleBookButt}
              >
                <NavLink to={"/login"}>Sign In</NavLink>
              </button>
            )}
            {loggedIn && (
              <button
                className=" text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hidden smallest:block"
                onClick={handleBookButt}
              >
                <NavLink to={"/Booking"}>Book Now</NavLink>
              </button>
            )}
            <div className=" ml-6 block lg_pro:hidden" onClick={showMenu}>
              {!active ? (
                <FontAwesomeIcon icon={faBarsStaggered} className=" text-3xl" />
              ) : (
                <FontAwesomeIcon icon={faClose} className=" text-3xl" />
              )}
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
};
