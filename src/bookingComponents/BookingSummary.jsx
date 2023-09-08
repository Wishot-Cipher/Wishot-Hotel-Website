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
        <h2 className="text-xl font-bold mb-4">Booking Dates</h2>
        <p className=" font-semibold">Check-in Date: {checkInDate && checkInDate.toDateString()}</p>
        <p className=" font-semibold">Check-out Date: {checkOutDate && checkOutDate.toDateString()}</p>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Selected Rooms</h2>
        <ul>
          {Object.keys(roomSelection).map(
            (roomType) =>
              roomSelection[roomType] > 0 && (
                <li key={roomType} className=" font-semibold">
                  {roomType.charAt(0).toUpperCase() + roomType.slice(1)}:{" "}
                  {roomSelection[roomType]}
                </li>
              )
          )}
        </ul>
      </div>
      <div className="bg-white p-4 shadow-2xl rounded">
        <h2 className="text-xl font-bold mb-4">Guest Info</h2>
        <p className=" font-semibold">Name: {guestInfo.name}</p>
        <p className=" font-semibold">Phone Number: {guestInfo.phoneNumber}</p>
        <p className=" font-semibold">Email: {guestInfo.email}</p>
      </div>
      <Link
        to="/Booking/payment-page"
        onClick={handleConfirm}
        className="btn bg-indigo-600 text-white rounded-xl px-6 py-3 mx-3 hover:bg-indigo-700 h-fit w-[50%]  flex items-center justify-center font-bold lg_pro:m-auto my-4"
      >
        Confirm
        <FontAwesomeIcon icon={faGreaterThan} className="text-sm ml-3 mt-1" />
        <FontAwesomeIcon icon={faGreaterThan} className="text-sm ml-1 mt-1" />
      </Link>
    </div>
  );
};
