import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset errors when user starts typing
    setErrors({
      ...errors,
      [name]: "", // Reset the specific error when user starts typing
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name = value.trim() ? "" : "Please provide your name";
        break;
      case "email":
        newErrors.email = /\S+@\S+\.\S+/.test(value) ? "" : "Please provide a valid email";
        break;
      case "phoneNumber":
        newErrors.phoneNumber = /^[0]\d{10}$/.test(value) ? "" : "Please provide a valid phone number";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleNext = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Please provide your name';
    }

    if (!formData.email) {
      newErrors.email = 'Please provide your email';
    }

    if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please provide a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setGuestInfo(formData);
    navigate("/Booking/booking-summary"); // Navigate to the next page
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[0]\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg mx-2 border-[#86aaf9] border-4 border-opacity-30 shadow-2xl bg-white rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md py-4">
        <h2 className="mt-4 text-center text-[30px] md:text-[35px] font-extrabold text-slate-800 text-3xl">
          Guest Information
          <h1 className="text-center text-base mt-2">Who Is Lodging ?</h1>
        </h2>
      </div>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-700"
            >
              Guest Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Wishot Cipher"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}  // Add this line
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                placeholder="081-0544-4154"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}  // Add this line
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
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
                placeholder="Wishotstudio@gmail.com"
                onChange={handleChange}
                onBlur={handleBlur}  // Add this line
                className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base font-bold"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button" 
              onClick={handleNext}
              disabled={!formData.name || !formData.email || !isValidPhoneNumber(formData.phoneNumber)}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-base rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-bold`}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
