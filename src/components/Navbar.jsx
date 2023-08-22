import React, { useState, useEffect } from "react";
import agelessLogo from "../assets/AgelessLogo.png";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faClose,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState(false);

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
      <nav className="py-1 shadow-2xl my-2 w-full md:px-2">
        <div className="w-[95%]  flex justify-between items-center mx-auto">
          <div>
            <img
              src={agelessLogo}
              alt="Ageless Hotel Logo"
              className=" md:w-26 lg:h-16 w-28 h-16"
            />
          </div>
          <div
            className={`lg_pro:sticky absolute bg-white lg_pro:min-h-fit min-h-[50vh] left-0 ${
              active
                ? "top-[10%] transition-all duration-1000 ease-in-out"
                : "top-[-100%] transition-all duration-1000 ease-in-out"
            } lg_pro:w-auto w-full flex flex-col items-center pt-10 lg_pro:py-5 lg_pro:items-center lg_pro:justify-center`}
          >
            <ul className="flex lg_pro:items-center lg_pro:gap-[5px] lg_pro:flex-row flex-col gap-10 w-full">
              <li>
                <NavLink
                  to={"/"}
                  className=" hover:text-gray-500 flex"
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <h1 className=" font-bold px-8 cursor-pointer">Home</h1>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about"}
                  className={"hover:text-gray-500"}
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <h4 className="font-bold px-8 cursor-pointer"> About</h4>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="hover:text-gray-500"
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <h4 className="font-bold px-8 cursor-pointer"> Contact</h4>
                </NavLink>
              </li>
              {!loggedIn && (
                <li>
                  <NavLink
                    to={"/reservation"}
                    className="hover:text-gray-500"
                    style={navLinkStyles}
                    onClick={showMenu}
                  >
                    <h4 className="font-bold px-8 cursor-pointer"> Book</h4>
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to={"/location"}
                  className=" hover:text-gray-500"
                  style={navLinkStyles}
                  onClick={showMenu}
                >
                  <h4 className="font-bold px-8 cursor-pointer"> Location</h4>
                </NavLink>
              </li>
              {loggedIn && (
                <li>
                  <NavLink
                    to={"/Dashboard"}
                    className="hover:text-gray-500"
                    style={navLinkStyles}
                    onClick={showMenu}
                  >
                    <h4 className="font-bold px-8 cursor-pointer">Dashboard</h4>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="flex justify-center items-center">
            {!loggedIn && (
              <button
                className=" text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={showMenu}
              >
                <NavLink to={"/login"}>Sign In</NavLink>
              </button>
            )}
            {loggedIn && (
              <button
                className=" text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hidden smallest:block"
                onClick={handleBookButt}
              >
                <NavLink to={"/reservation"}>Book Now</NavLink>
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
