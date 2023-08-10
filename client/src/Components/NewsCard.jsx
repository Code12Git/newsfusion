import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAuthorizedRequest } from "../utils/axios";

const NewsCard = ({ articles }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = async (url) => {
    try {
      const authorizedRequest = createAuthorizedRequest();
      await authorizedRequest.post("/news/save-article", {
        articleId: url,
        title: articles.title,
        source: articles.source.name,
        content: articles.content,
        imageUrl: articles.urlToImage,
        publishedAt: articles.publishedAt,
      });
      setIsSaved(true);

      toast.success("Article saved successfully");
    } catch (error) {
      toast.error("Error saving article: " + error.message);
    }
  };

  const handleViewClick = async () => {
    try {
      const authorizedRequest = createAuthorizedRequest();

      await authorizedRequest.post("/news/view-article", {
        articleId: articles.url,
        title: articles.title,
        source: articles.source.name,
        content: articles.content,
        imageUrl: articles.urlToImage,
        publishedAt: articles.publishedAt,
      });
    } catch (error) {
      toast.error("Error tracking viewed article");
    }
  };

  if (articles?.source?.name === "Google News") {
    return null;
  }

  return (
    <NavLink onClick={handleViewClick} key={articles.url} to={articles.url}>
      <div className="my-3 relative">
        <ToastContainer autoClose={1000} closeOnClick />
        <span
          className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-full"
          style={{ zIndex: "10" }}
        >
          {articles?.source?.name}
        </span>
        <div className="bg-white  shadow-xl rounded-lg overflow-hidden transition duration-300 transform hover:scale-105">
          {!articles.urlToImage ? (
            <img
              src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Imagenotavailable"
              className="w-full h-44 object-cover"
            />
          ) : (
            <img
              src={articles.urlToImage}
              alt="ArticleImage"
              className="w-full h-44 object-cover"
            />
          )}

          <div className="p-4">
            <h5 className="text-xl font-semibold text-gray-900 mb-2">
              {articles.title.length > 40
                ? articles.title.substring(0, 40) + "..."
                : articles.title}
            </h5>
            <p className="text-sm text-gray-600 mb-3">
              {articles.content.length > 120
                ? articles.content.substring(0, 120) + "..."
                : articles.content}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <p>
                  {new Date(articles.publishedAt).toLocaleDateString()}
                  <span className="mx-1 text-gray-300">•</span>
                  {articles.author || "Unknown"}
                </p>
              </div>

              <button
                rel="noreferrer"
                href={articles.url}
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  handleSaveClick(articles.url);
                }}
                className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 text-xs"
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default NewsCard;
