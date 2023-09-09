import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom"; // Import `useNavigate`
import { BookingContext } from "./BookingContext";
import { ToastContainer, toast } from "react-toastify";

export const DateInput = () => {
  const { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate } =
    useContext(BookingContext);

  const navigate = useNavigate(); // Initialize `navigate` from useNavigate

  const handleNext = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select both check-in and check-out dates");
      // alert('error')
      return;
    }

    // Navigate to the next page
    navigate("/Booking/select-room");
  };

  return (
    <div className="lg_pro:h-[75vh] bg-gray-100 h-[80vh]"> 
    <div className="text-center pt-16 block lg_pro:flex w-full justify-center mb-10 lg_pro:mb-2 h-[70vh] lg_pro:h-[50vh] py-auto">
      <div className="mb-4 lg_pro: sm:mr-0 px-5 bg-white m-2 rounded-lg py-8 lg_pro:py-0 shadow-xl shadow-indigo-500">
        <ToastContainer />
        <h1 className="text-xl lg_pro:pt-8 mb-4 font-bold">When Are You Arriving? </h1>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          placeholderText="Check-in Date"
          className="p-3 px-10 border border-gray-600 mb-4 bg-indigo-700 text-white rounded-xl font-semibold mx-3 "
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate ? checkInDate : new Date()}
          placeholderText="Check-out Date"
          className="p-3 px-10  border border-gray-600 mb-4 bg-indigo-700 text-white rounded-xl font-semibold"
        />
        <hr  className=" font-bold"/>
        <div className="flex justify-end lg_pro:justify-center mt-2">
          <button
            onClick={handleNext}
            className="btn bg-orange-500 text-white rounded-xl h-fit mt-3  py-3 my-3 px-8 mx-3 hover:bg-orange-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
