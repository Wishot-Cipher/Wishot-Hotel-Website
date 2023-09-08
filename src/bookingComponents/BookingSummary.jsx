import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "./BookingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { firestore } from "../config/firebase"; // Assuming you have this file
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

export const BookingSummary = () => {
  const { checkInDate, checkOutDate, roomSelection, guestInfo } =
    useContext(BookingContext);

  const handleConfirm = () => {
    // Assuming you have a 'bookings' collection in your Firestore
    firestore
      .collection("bookings")
      .add({
        checkInDate,
        checkOutDate,
        roomSelection,
        guestInfo,
        timestamp: new Date(),
      })
      .then(() => {
        console.log("Booking added successfully!");
        // You can add any additional logic here, like redirecting the user to a confirmation page.
      })
      .catch((error) => {
        console.error("Error adding booking: ", error);
      });
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="lg_pro:col-span-2 flex justify-center my-4 text-center text-[30px] md:text-[35px] font-extrabold text-slate-800 text-3xl">
        Booking Summary
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4  bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-xl">
          Booking Dates
        </h2>
        <p className=" font-extrabold text-gray-900 flex justify-between pr-10 py-2">
          <span>Check-in Date:</span>
          <span className=" font-sans font-extrabold text-gray-500">
            {checkInDate && checkInDate.toDateString()}
          </span>
        </p>
        <p className="font-extrabold text-gray-900 flex justify-between pr-10 py-2">
          <span>Check-out Date:</span>
          <span className=" font-sans font-extrabold text-gray-500">
            {checkOutDate && checkOutDate.toDateString()}
          </span>
        </p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4  bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-xl">
          Selected Rooms
        </h2>
        <ul>
          {Object.keys(roomSelection).map(
            (roomType) =>
              roomSelection[roomType] > 0 && (
                <li
                  key={roomType}
                  className=" font-extrabold text-gray-900 flex justify-between pr-10 py-2"
                >
                  {roomType.charAt(0).toUpperCase() + roomType.slice(1)}:{" "}
                  <p className=" font-sans text-lg font-extrabold text-gray-500">
                    {roomSelection[roomType]}
                  </p>
                </li>
              )
          )}
        </ul>
      </div>
      <div className="bg-white p-4 shadow-2xl rounded mb-5">
        <h2 className="text-xl font-bold mb-4  bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-2 rounded-xl">
          Guest Info
        </h2>
        <p className=" font-extrabold text-gray-900 flex justify-between pr-4 py-2">
          <span>Name: </span>
          <span className=" font-serif font-bold text-gray-600">
            
            {guestInfo.name}
          </span>
        </p>
        <p className=" font-extrabold text-gray-900 flex justify-between pr-4 py-2">
          <span> Phone Number: </span>
          <span className=" font-sans font-bold text-gray-600">
            
            {guestInfo.phoneNumber}
          </span>
        </p>
        <p className=" font-extrabold text-gray-900 flex justify-between pr-4 py-2">
          
          <span> Email: </span>
          <span className=" font-sans font-bold text-gray-600">
            
            {guestInfo.email}
          </span>
        </p>
      </div>
      <Link
        to="/Booking/payment-page"
        onClick={handleConfirm}
        className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 mx-3 h-fit w-[50%]  flex items-center justify-center font-bold lg_pro:m-auto my-4"
      >
        Confirm
        <FontAwesomeIcon
          icon={faGreaterThan}
          className="text-sm ml-3 mt-1 font-bold"
        />
        <FontAwesomeIcon
          icon={faGreaterThan}
          className="text-sm ml-1 mt-1 font-bold"
        />
      </Link>
    </div>
  );
};
