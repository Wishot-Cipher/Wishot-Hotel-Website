// booking-components/DateInput.js
import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { BookingContext } from "./BookingContext";

export const DateInput = () => {
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
  } = useContext(BookingContext);



  return (
    <div className="text-center mt-16 block lg_pro:flex w-full justify-center mb-10 lg_pro:mb-2 ">
      <div className="mb-4 sm:mr-0 px-5">
        <h1 className="text-2xl mb-4 font-bold">Choose Dates</h1>
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
      </div>
      <Link to="/Booking/select-room" className="btn bg-orange-500 text-white rounded-xl h-fit mt-8 lg_pro:mt-12 py-3 px-8 mx-3 hover:bg-orange-600">
        Next
      </Link>
    </div>
  );
};

// export default DateInput;
