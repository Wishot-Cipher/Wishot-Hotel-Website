import React from "react";
import { auth, firestore } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminDashboard = () => {
  const [user, setUser] = React.useState(null);
  const [availableRooms, setAvailableRooms] = React.useState([]);
  const [roomType, setRoomType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    // Listen for user authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
    
        setUser(user);
    });

    // Fetch available rooms
    const fetchAvailableRooms = async () => {
      try {
        const snapshot = await firestore.collection("roomTypes").get();
        const availableRoomsData = snapshot.docs.map((doc) => doc.data());
        setAvailableRooms(availableRoomsData);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };
    fetchAvailableRooms();

    return () => unsubscribe();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();

    // if (()) {
    //   navigate("/AdminDashboard");
    // } 

    if (!user) {
      console.error("Please login as admin.");
      toast.error("Please login as admin.");
      return;
    }

    try {
      await firestore.collection("roomTypes").add({
        type: roomType,
        price: parseFloat(price),
        description,
      });

      setRoomType("");
      setPrice("");
      setDescription("");

      alert("Room added successfully.");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container lg_pro:mx-auto p-4">
      {user ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Welcome, Admin</h2>
          <h3 className="text-lg font-bold mb-2">Add Available Room</h3>
          <form onSubmit={handleAddRoom} className="max-w-md">
            <div className="mb-4">
              <label
                htmlFor="roomType"
                className="block text-gray-700 font-bold mb-2"
              >
                Room Type
              </label>
              <input
                type="text"
                id="roomType"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Room Type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none focus:shadow-outline"
            >
              Add Room
            </button>
          </form>
          <h3 className="text-xl font-bold mt-4">Available Rooms:</h3>
          <ul>
            {availableRooms.map((room) => (
              <li key={room.id} className="my-2">
                <h3 className="text-lg font-semibold">{room.type}</h3>
                <p>Price: ${room.price}</p>
                <p className="text-gray-600">{room.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 className="text-xl font-bold">
          Please login as admin to access this page.
        </h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
