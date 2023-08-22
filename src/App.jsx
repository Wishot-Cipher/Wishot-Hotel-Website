import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import ReservationForm from "./components/ReservationForm";
import { Router } from "./Router";
// import UserDashboard from "./components/UserDashboard";

export default function App() {
  return (
    <>
    
      <div>
          <Router />
      </div>
    </>
  );
}
