import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Topbar from "../Components/Topbar";
import ClipLoader from "react-spinners/ClipLoader";
import { createAuthorizedRequest } from "../utils/axios";

const SavedArticles = () => {
  const [articles, setSavedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorizedRequest = createAuthorizedRequest();

        const res = await authorizedRequest.get("/news/saved-articles");
        setSavedArticles(res.data.savedArticles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Topbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <ClipLoader color="red" loading={isLoading} size={100} />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 "
          style={{
            backgroundImage: 'url("/assets/galaxy.jpg")',
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}
        >
          {articles?.map((article) => (
            <NavLink key={article._id} to={article.articleId}>
              <div className="flex flex-col my-3">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 transform ">
                  <img
                    src={
                      !article.imageUrl
                        ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-announcements/-476x249w4/gsmarena_00.jpg"
                        : article.imageUrl
                    }
                    className="w-full h-40 object-cover object-center"
                    alt="..."
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-xl font-semibold text-gray-900 mb-2">
                      {article.title.length > 45
                        ? article.title.substring(0, 45) + "..."
                        : article.title}
                    </h5>
                    <p className="text-sm text-gray-600 mb-3 flex-grow">
                      {article.content.length > 200
                        ? article.content.substring(0, 120) + "..."
                        : article.content}
                    </p>
                    <div className="text-xs text-gray-500">
                      <p>
                        {new Date(article.publishedAt).toLocaleDateString()}
                        <span className="mx-1 text-gray-300">•</span>
                        {article.source}
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

export default SavedArticles;
