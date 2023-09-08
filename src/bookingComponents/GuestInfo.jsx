import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BookingContext } from "./BookingContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GuestInfo = () => {
  const { setGuestInfo } = useContext(BookingContext);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (!formData.name || !formData.email) {
      toast.error('Please fill in your name and email');
      return;
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      toast.error('Please provide a valid phone number');
      return;
    }

    setGuestInfo(formData);
    history.push("/Booking/booking-summary"); // Navigate to the next page
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0]\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const isNextDisabled = !formData.name || !formData.email || !isValidPhoneNumber(formData.phoneNumber);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg mx-2 border-[#86aaf9] border-4 border-opacity-30 shadow-2xl bg-white rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md py-4">
        <h2 className="mt-4 text-center text-[30px] md:text-[35px] font-extrabold text-slate-800 text-3xl">
          Guest Information
        </h2>
      </div>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-base font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/Booking/booking-summary"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-base rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold`}
              onClick={handleNext}
              disabled={isNextDisabled}
            >
              Next
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
