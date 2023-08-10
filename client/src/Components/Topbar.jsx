import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { createAuthorizedRequest } from "../utils/axios";

function Topbar() {
  const navigate = useNavigate();
  const authJson = localStorage.getItem("user");
  const auth = authJson ? JSON.parse(authJson) : null;

  const handleLogout = async () => {
    try {
      const authorizedRequest = createAuthorizedRequest();

      await authorizedRequest.get("/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      toast("Logout failed");
    }
  };

  return (
    <header
      className="bg-cover bg-center font-roboto font-bold bg-fixed bg-no-repeat py-8 md:py-12"
      style={{
        backgroundImage: 'url("/assets/galaxy.jpg")',
      }}
    >
      <div className="container mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between">
          <NavLink
            to="/"
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <motion.div
              whileHover={{ scale: 1.1, x: 50 }}
              className="ml-3 text-3xl font-sans bg-gradient-to-r from-purple-500 via-orange-400 to-teal-500 bg-clip-text text-transparent"
            >
              NewsFusion
            </motion.div>
          </NavLink>
          <motion.div
            whileHover={{ scale: 1.1, x: -10 }}
            className="md:ml-auto flex flex-wrap items-center text-base justify-center"
          >
            <NavLink
              to="/recommendations"
              className="mr-5 text-lg hover:text-green-900 text-cyan-700 transition-colors duration-300"
            >
              Recommended Articles
            </NavLink>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, x: -10 }}
            className="md:ml-auto flex flex-wrap items-center text-base justify-center"
          >
            <NavLink
              to="/saved"
              className="mr-5 text-lg hover:text-red-900 text-purple-700 transition-colors duration-300"
            >
              Saved Articles
            </NavLink>
          </motion.div>
          {auth ? (
            <div className="flex gap-4 items-center text-gray-900">
              <p className="font-serif text-purple-400">
                Logged in as:{" "}
                <span className="text-red-400">{auth.user.username}</span>
              </p>
              <button
                onClick={handleLogout}
                className=" text-lg hover:scale-110 rounded-md py-2 px-4 text-white hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <NavLink
                to="/login"
                className="bg-red-300 px-4 py-2 hover:scale-110 rounded-md text-white hover:bg-red-400 transition-colors duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-red-400 px-4 py-2 hover:scale-110 rounded-md text-white hover:bg-red-500 transition-colors duration-300 flex items-center"
              >
                Signup
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
