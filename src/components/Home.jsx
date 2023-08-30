import React from "react";
import heroSec from "../assets/hero2.png";
import { Link } from "react-router-dom";
// import { getRoomTypes } from '../roomTypesAPI';

const Home = () => {
  const [roomTypes, setRoomTypes] = React.useState([]);

  React.useEffect(() => {
    const fetchRoomTypes = async () => {
      const roomTypesData = await getRoomTypes();
      setRoomTypes(roomTypesData);
    };

    fetchRoomTypes();
  }, []);

  return (
    <div className="container lg_pro:mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Hotel</h1>
      <div className="w-full">
        <img src={heroSec} alt="" className=" w-screen" />
      </div>
      <h2 className="text-xl font-bold mb-2">Room Types</h2>
      <ul className="list-disc ml-6">
        {roomTypes.map((room) => (
          <li key={room.id} className="my-2">
            <h3 className="text-lg font-semibold">{room.type}</h3>
            <p>Price: ${room.price}</p>
            <p className="text-gray-600">{room.description}</p>
            {/* You can add images and other details here */}
          </li>
        ))}
      </ul>
      <Link
        to="/reservation"
        className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </Link>
    </div>
  );
};

export default Home;
