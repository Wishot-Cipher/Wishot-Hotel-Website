import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ReservationForm from "../components/ReservationForm";
import { AgeNavbar } from "../components/AgeNavbar";
import UserDashboard from "../components/UserDashboard";
import Footer from "../components/Footer";
import Register from "../components/Register";
import { Login } from "../components/Login";
import AdminDashboard from "../components/AdminDashboard";
import { BookingProvider } from "../bookingComponents/BookingContext";
import { DateInput } from "../bookingComponents/DateInput";
import { GuestInfo } from "../bookingComponents/GuestInfo";
import { BookingSummary } from "../bookingComponents/BookingSummary";
import { RoomSelection } from "../bookingComponents/RoomSelection";
import { PaymentPage } from "../bookingComponents/PaymentPage";
// import {
//   DateInput,
//   RoomSelection,
//   GuestInfo,
//   BookingSummary,
//   PaymentPage
// } from '../bookingComponents'; // This is correct assuming your file structure matches the one I provided earlier

// The above import statement assumes that you have the files in the correct locations within the `booking-components` folder.

export const BookingRoutes = () => {
  return (
    <div>
      <AgeNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Reservation" element={<ReservationForm />} />
        <Route
          path="Booking/*"
          element={
            <BookingProvider>
              <Routes>
              {/* <DateInput /> */}
                <Route index element={<DateInput />} />
                <Route path="select-room" element={<RoomSelection />} />
                <Route path="guest-info" element={<GuestInfo />} />
                <Route path="booking-summary" element={<BookingSummary />} />
                <Route path="payment-page" element={<PaymentPage />} />
              </Routes>
            </BookingProvider>
          }
        />

        <Route path="Dashboard" element={<UserDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};
