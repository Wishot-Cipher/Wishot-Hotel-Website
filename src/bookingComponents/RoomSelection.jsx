// booking-components/RoomSelection.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "./BookingContext";

export const RoomSelection = () => {
  const { roomSelection, setRoomSelection } = useContext(BookingContext);

  const handleIncrement = (roomType) => {
    if (roomSelection[roomType] < 30) {
      setRoomSelection((prevSelection) => ({
        ...prevSelection,
        [roomType]: prevSelection[roomType] + 1,
      }));
    }
  };

  const handleDecrement = (roomType) => {
    if (roomSelection[roomType] > 0) {
      setRoomSelection((prevSelection) => ({
        ...prevSelection,
        [roomType]: prevSelection[roomType] - 1,
      }));
    }
  };

  return (
    <div className="text-center mt-16 grid grid-cols-2 gap-6">
      {Object.keys(roomSelection).map((roomType) => (
        <div key={roomType} className="mb-4 font-serif font-bold text-lg">
          <p className="font-bold text-xl">
            {roomType.charAt(0).toUpperCase() + roomType.slice(1)}
          </p>
          <div className="flex items-center justify-center">
            <button
              onClick={() => handleDecrement(roomType)}
              className="btn btn-sm bg-indigo-700 text-white font-bold px-5 py-2 rounded-lg mr-4"
            >
              -
            </button>
            <span>{roomSelection[roomType]}</span>
            <button
              onClick={() => handleIncrement(roomType)}
              className="btn btn-sm bg-indigo-700 text-white font-extrabold px-5 py-2 rounded-lg ml-4"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="col-span-2 flex justify-center">
        <Link to="/Booking/guest-info" className="btn bg-orange-500 text-white font-bold px-6 py-3 rounded-xl w-[40%] lg_pro:w-[20%] mb-6">
          Next
        </Link>
      </div>
    </div>
  );
};
