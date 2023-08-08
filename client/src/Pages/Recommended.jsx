import React, { useEffect, useState } from "react";
import { publicRequest } from "../utils/axios";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Topbar from "../Components/Topbar";
import ClipLoader from "react-spinners/ClipLoader";

const Recommended = () => {
  const [articles, setRecommendedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await publicRequest.get("/news/recommendations");
        setRecommendedArticles(res.data.recommendedArticles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recommended articles:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color="maroon" loading={isLoading} size={100} />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols- xl:grid-cols-4"
          style={{
            backgroundImage: 'url("/assets/galaxy.jpg")',
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}
        >
          <ToastContainer autoClose={1000} closeOnClick />
          {articles.map((article, index) => (
            <NavLink
              key={article.articleId}
              to={article.url}
              className={`my-3 relative mt-0 ${
                index !== 0 ? "md:mr-2 lg:mr-2 xl:mr-2" : ""
              }`}
            >
              <span
                className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-full"
                style={{ zIndex: "10" }}
              >
                {article.source.name}
              </span>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform hover:scale-105 mr-2">
                <div className="aspect-w-4 aspect-h-3">
                  {!article.urlToImage ? (
                    <img
                      src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Imagenotavailable"
                      className="w-full h-52"
                    />
                  ) : (
                    <img
                      src={article.urlToImage}
                      alt="ArticleImage"
                      className="w-full h-52"
                    />
                  )}
                </div>
                <div className="p-4 h-52">
                  <h5 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title.length > 40
                      ? article.title.substring(0, 40) + "..."
                      : article.title}
                  </h5>
                  <p className="text-sm text-gray-600 mb-3">
                    {article.description?.length > 150
                      ? article.description.substring(0, 120) + "..."
                      : article.description}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      <p>
                        {new Date(article.publishedAt).toLocaleDateString()}
                        <span className="mx-1 text-gray-300">•</span>
                        {article.author || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default Recommended;
