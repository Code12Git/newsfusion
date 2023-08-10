import React from "react";
import NewsFetch from "../Components/NewsFetch";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAuthorizedRequest } from "../utils/axios";

import Topbar from "../Components/Topbar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "business"
  );

  const handleChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);

    localStorage.setItem("selectedCategory", newCategory);
  };

  const handleSubmit = async () => {
    try {
      const authorizedRequest = createAuthorizedRequest();

      await authorizedRequest.post("/news", {
        selectedInterests: [selectedCategory],
      });
      toast.success("News Updated successfully");
    } catch (error) {
      toast.error("Error saving interests:", error);
    }
  };
  return (
    <>
      <Topbar />

      <div
        className="bg-gray-100 min-h-screen"
        style={{
          backgroundImage: 'url("/assets/galaxy.jpg")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto py-12">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-lg shadow-xl  ">
            <ToastContainer autoClose={1000} closeOnClick />

            <h2 className="text-4xl font-extrabold text-white mb-4">
              Choose Your Interests
            </h2>
            <div className="relative inline-block w-full text-gray-700">
              <select
                onChange={handleChange}
                value={selectedCategory}
                className="bg-white appearance-none border border-gray-300 rounded-md py-3 px-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
              >
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="health">Health</option>
                <option value="world">World</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-6 w-6 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-300 mt-3 text-sm">
              Personalize your news feed by selecting the topics you're
              interested in.
            </p>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-indigo-700 text-white py-3 px-6 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transform hover:scale-105 transition-transform"
            >
              Save Interests
            </button>
          </div>

          <NewsFetch onSelect={selectedCategory} />
        </div>
      </div>
    </>
  );
};

export default Home;
