import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="container mx-auto">
        <Link to="/" className="text-white mr-4">
          Home
        </Link>
        <Link to="/rooms" className="text-white mr-4">
          Rooms
        </Link>
        <Link to="/reservation" className="text-white mr-4">
          Reservation
        </Link>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;
