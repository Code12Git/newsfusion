import React, { useState } from "react";
import { motion } from "framer-motion";
import { publicRequest } from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const submitChange = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = credentials;
    try {
      if (!username || !email || !password || !confirmPassword) {
        toast.error("Please enter all required fields");
      } else {
        await publicRequest.post("/auth/register", {
          username,
          email,
          password,
          confirmPassword,
        });
        toast.success("User has been successfully registered");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1000} closeOnClick />
      <section
        className="text-gray-600 body-font bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: 'url("/assets/register.jpg")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto px-5 py-24">
          <div className="flex flex-wrap mt-20 items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 ">
              <motion.div
                className="title-font font-semibold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight"
                whileHover={{ scale: 1.1, x: 30 }}
              >
                Discover a World of Perspectives with{" "}
                <span className="text-indigo-500">NewsFusion</span>
              </motion.div>
              <motion.div
                className="text-green-500 text-lg md:text-xl lg:text-2xl mb-8"
                whileHover={{ scale: 1.2, x: 70 }}
              >
                NewsFusion is your window to a diverse and dynamic world of
                news. Seamlessly blending trending stories, thought-provoking
                articles, and personalized insights, NewsFusion brings you an
                unparalleled news experience.
              </motion.div>
            </div>

            <div className="lg:w-2/6 md:w-1/2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-opacity-90 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-lg">
              <h2 className="text-gray-100 text-3xl font-semibold mb-4">
                Sign Up
              </h2>
              <div className="mb-4">
                <label htmlFor="full-name" className="text-sm text-gray-100">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={credentials.username}
                  name="username"
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-80 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="full-name" className="text-sm text-gray-100">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-80 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm text-gray-100">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-80 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm text-gray-100">
                  ConfirmPassword
                </label>
                <input
                  type="password"
                  id="password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white bg-opacity-80 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={submitChange}
                className="bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg text-white font-semibold"
              >
                Sign Up
              </button>

              <p className="text-lg">
                Already have an account?{" "}
                <NavLink to="/login" className="text-red-600">
                  Login
                </NavLink>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegistrationForm;
