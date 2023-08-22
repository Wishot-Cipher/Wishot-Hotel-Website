import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import { Navbar } from "./components/navbar";
import UserDashboard from "./components/UserDashboard";
import Footer from "./components/Footer";
import Register from "./components/Register";
import { Login } from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

export const Router = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Reservation" element={<ReservationForm />} />
        <Route path="Dashboard" element={<UserDashboard />} />
        <Route path="AdminDashboard" element={<AdminDashboard /> } />
        <Route path="Register" element={<Register /> } />
        <Route path="Login" element={<Login /> } />
      </Routes>
      <Footer />
    </div>
  );
};
