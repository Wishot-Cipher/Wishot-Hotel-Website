import React, { useEffect, useState } from 'react';
import { auth, firestore } from '../config/firebase';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  //  Listen for user authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }

      if (user) {
        // Fetch user reservations from Firestore
        firestore
          .collection('reservations')
          .where('userId', '==', user.uid)
          .get()
          .then((snapshot) => {
            const userReservations = snapshot.docs.map((doc) => doc.data());
            setReservations(userReservations);
          })
          .catch((error) => {
            console.error('Error fetching reservations:', error);
          });
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.email}</h2>
          <h3 className="text-xl font-bold mb-2">Your Reservations:</h3>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id} className="my-2">
                <h3 className="text-lg font-semibold">{reservation.roomType}</h3>
                <p>Check-in: {reservation.checkInDate}</p>
                <p>Check-out: {reservation.checkOutDate}</p>
                <p className="text-gray-600">Status: {reservation.status}</p>
              </li>
            ))}
               {loggedIn && (
                <li className='flex justify-end' >
                  <button
                    onClick={handleLogOut}
                    className="text-md font-medium text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <NavLink to={"/login"}> Log Out</NavLink>
                  </button>
                </li>
              )}
          </ul>
        </div>
      ) : (
        <h2 className="text-xl font-bold">Please login to view your dashboard.</h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
