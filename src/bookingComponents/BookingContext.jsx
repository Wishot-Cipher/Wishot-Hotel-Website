// booking-components/BookingContext.js
import React, { createContext, useState } from "react";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomSelection, setRoomSelection] = useState({
    standard: 0,
    queens: 0,
    suite: 0,
    vip: 0,
  });
  const [guestInfo, setGuestInfo] = useState({});

  return (
    <BookingContext.Provider
      value={{
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        roomSelection,
        setRoomSelection,
        guestInfo,
        setGuestInfo,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
