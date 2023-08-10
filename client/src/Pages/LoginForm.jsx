import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAuthorizedRequest } from "../utils/axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (!username || !password) {
      toast.error("Please enter your username and password");
    }

    try {
      const authorizedRequest = createAuthorizedRequest();

      const res = await authorizedRequest.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");

      toast.success("Login successful");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <section
      className="text-gray-600 body-font bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: 'url("/assets/Login.jpg")',
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <ToastContainer autoClose={1000} closeOnClick />
      <div className="container mx-auto px-5 py-24">
        <div className="flex flex-wrap mt-20 items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 ">
            <motion.div
              className="title-font font-semibold text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight"
              whileHover={{ scale: 1.1, x: 30 }}
            >
              Discover a World of Perspectives with{" "}
              <span className="text-green-500">NewsFusion</span>
            </motion.div>
            <motion.div
              className="text-cyan-500 text-lg md:text-xl lg:text-2xl mb-8"
              whileHover={{ scale: 1.2, x: 70 }}
            >
              NewsFusion is your window to a diverse and dynamic world of news.
              Seamlessly blending trending stories, thought-provoking articles,
              and personalized insights, NewsFusion brings you an unparalleled
              news experience.
            </motion.div>
          </div>

          <div className="lg:w-2/6 md:w-1/2 bg-gradient-to-r from-green-400 via-orange-400 to-cyan-500 bg-opacity-90 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-lg">
            <h2 className="text-gray-100 text-3xl font-semibold mb-4">
              Sign In
            </h2>
            <div className="mb-4">
              <label htmlFor="full-name" className="text-sm text-gray-100">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={credentials.username}
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
                onChange={handleChange}
                name="password"
                value={credentials.password}
                className="w-full bg-white bg-opacity-80 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              onClick={submitHandler}
              className="bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg text-white font-semibold"
            >
              Login
            </button>
            <p className="text-lg text-gray-500 mt-3">
              Don't have an account yet?{" "}
              <NavLink to="/register" className="text-blue-500">
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
