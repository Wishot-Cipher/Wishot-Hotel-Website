import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
// import image from "../assets/loginBackground.jpg"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setLoggedIn(true);
      setEmail("");
      setPassword("");

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      setLoggedIn(true);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-[100vh]  flex flex-col justify-center sm:px-6 lg:px-8 md:mx-0 bg-[url(/src/assets/loginBackground.jpg)] bg-cover bg-no-repeat ${
        loggedIn ? " bg-gray-200" : " bg-gray-100"
      }`}
    >
      <div></div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg mx-2 border-[#86aaf9] border-4 border-opacity-30 shadow-2xl bg-white rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-md my-4">
        <h2 className="mt-4 text-center text-[30px] md:text-[35px] font-extrabold text-slate-800 text-3xl">
          Log In
        </h2>
      </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loggedIn
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
                disabled={loggedIn}
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              onClick={signInWithGoogle}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loggedIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              }`}
              disabled={loggedIn}
            >
              Log In with Google
            </button>
          </div>
          <div className=" text-center text-xs my-2 font-semibold">
            Don't have an acctount ?{" "}
            <Link
              className=" text-blue-500 underline font-bold"
              to={"/register"}
            >
              {" "}
              Sign Up{" "}
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
