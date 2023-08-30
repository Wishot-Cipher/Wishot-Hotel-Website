import React, { useState } from "react";

// import { getRoomTypes } from '../roomTypesAPI';
import { auth, firestore } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";

const ReservationForm = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  React.useEffect(() => {
    // Listen for user authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Fetch room types
    const fetchRoomTypes = async () => {
      const roomTypesData = await getRoomTypes();
      setRoomTypes(roomTypesData);
    };
    fetchRoomTypes();

    return () => unsubscribe();
  }, []);

  const handleReservation = async (e) => {
    e.preventDefault();

    // Ensure user is authenticated before proceeding
    if (!user) {
      console.error("Please login to make a reservation.");
      toast.error("Login failed. Please try again.");

      return;
    }

    const selectedRoomType = roomTypes.find(
      (roomType) => roomType.type === selectedRoom
    );

    if (!selectedRoomType) {
      console.error("Please select a room type.");
      toast.error("Please select a room type.");
      return;
    }

    try {
      // Save the reservation data to Firestore
      const reservationData = {
        userId: user.uid,
        name,
        checkInDate,
        checkOutDate,
        roomType: selectedRoomType.type,
        price: selectedRoomType.price,
        description: selectedRoomType.description,
        status: "active", // You can set the initial status here
      };

      await firestore.collection("reservations").add(reservationData);

      // Reset the form after successful booking
      setName("");
      setCheckInDate("");
      setCheckOutDate("");
      setSelectedRoom("");
      toast.success("Reservation successful! Thank you for booking with us.");
      alert("Reservation successful! Thank you for booking with us.");
    } catch (error) {
      console.error("Error adding reservation:", error);
      alert("Oops! Something went wrong. Please try again later.");
      toast.error('("Reservation successful! Thank you for booking with us.")');
    }
  };

  return (
    <div className="container p-4">
      {user ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Welcome, {user.email}</h2>
          <form onSubmit={handleReservation} className="max-w-md">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="checkInDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Check-in Date
              </label>
              <input
                type="date"
                id="checkInDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="checkOutDate"
                className="block text-gray-700 font-bold mb-2"
              >
                Check-out Date
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="selectedRoom"
                className="block text-gray-700 font-bold mb-2"
              >
                Room Type
              </label>
              <select
                id="selectedRoom"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                <option value="">Select Room Type</option>
                {roomTypes.map((room) => (
                  <option key={room.id} value={room.type}>
                    {room.type}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Book Now
            </button>
          </form>
        </div>
      ) : (
        <h2 className="text-xl font-bold">
          Please login to make a reservation.
        </h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default ReservationForm;
