import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { publicRequest } from "../utils/axios";
import NewsCard from "./NewsCard";

const NewsFetch = ({ onSelect }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await publicRequest.get("/api/news", {
          params: { category: onSelect.toLowerCase() },
        });
        setNews(response.data.articles);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [onSelect]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <section className="text-gray-600 body-font">
      <motion.div
        className="text-3xl md:text-4xl lg:text-5xl text-indigo-600 font-extrabold mb-8 mt-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.0,
          delay: 0.3,
          ease: [0.175, 0.885, 0.32, 1.275],
        }}
      >
        <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 bg-clip-text text-transparent">
          {" "}
          NewsFusion
        </span>{" "}
        - Top Headlines for {capitalizeFirstLetter(onSelect)}
      </motion.div>
      <div className="container px-5 py-10 mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {news.map((item) => (
              <NewsCard articles={item} key={item.url} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsFetch;
