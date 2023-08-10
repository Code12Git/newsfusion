import News from "../models/News.js"; // Import the News model
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//Updating News Interest

export const updateNewsInterests = async (req, res) => {
  const userId = req.user.id;

  const { selectedInterests } = req.body;

  try {
    const userNews = await News.findOne({ userId });
    if (!userNews) {
      return res.status(404).json({ error: "User news not found" });
    }

    userNews.selectedInterests = selectedInterests;

    const updatedNews = await userNews.save();

    res.json({ userNews: updatedNews });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating interests",
    });
  }
};

export const fetchNews = async (req, res) => {
  const { category } = req.query;

  try {
    // Fetching news articles based on the specified category
    const newsApiResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );
    const articles = newsApiResponse.data.articles;

    res.json({ articles });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching articles",
    });
  }
};

// Save the articles
export const saveArticle = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const { articleId, title, source, content, imageUrl, publishedAt } = req.body;

  try {
    // Checking if the article is already saved by the user
    const userNews = await News.findOne({ userId });
    if (!userNews) {
      return res.status(404).json({ error: "User news not found" });
    }

    const isArticleSaved = userNews.savedArticles.some(
      (article) => article.articleId === articleId
    );

    if (isArticleSaved) {
      return res.status(400).json({ error: "Article already saved" });
    }

    const updatedNews = await News.findOneAndUpdate(
      { userId },
      {
        $push: {
          savedArticles: {
            articleId,
            title,
            source,
            content,
            imageUrl,
            publishedAt,
          },
        },
      },
      { new: true }
    );

    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while saving the article",
    });
  }
};

//Fetch the article
export const fetchSavedArticles = async (req, res) => {
  const userId = req.user.id;

  try {
    const userNews = await News.findOne({ userId });
    if (!userNews) {
      return res.status(404).json({ error: "User news not found" });
    }

    const savedArticles = userNews.savedArticles || [];
    res.json({ savedArticles });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching saved articles",
    });
  }
};

//Viewing the Article

export const viewArticle = async (req, res) => {
  const userId = req.user.id;
  const { articleId, category } = req.body;

  try {
    const userNews = await News.findOne({ userId });
    if (!userNews) {
      return res.status(404).json({ error: "User news not found" });
    }

    const isArticleViewed = userNews.viewedArticles.some(
      (article) => article.articleId === articleId
    );

    if (!isArticleViewed) {
      userNews.viewedArticles.push({ articleId, category });
      await userNews.save();
    }

    res.json({ message: "Article viewed successfully" });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while viewing the article",
    });
  }
};

//Recommended Articles
export const getRecommendedArticles = async (req, res) => {
  const userId = req.user.id;

  try {
    const userNews = await News.findOne({ userId });
    if (!userNews) {
      return res.status(404).json({ error: "User news not found" });
    }

    const userInterests = userNews.selectedInterests || [];
    const viewedArticles = userNews.viewedArticles || [];

    const recommendedApiResponse = await axios.get(
      `https://newsapi.org/v2/everything?q=${userInterests.join(
        "+"
      )}&lang=en&apikey=${process.env.NEWS_API_KEY}`
    );
    const recommendedArticles = recommendedApiResponse.data.articles;

    const uniqueRecommendedArticles = recommendedArticles.filter(
      (article) =>
        !viewedArticles.some((viewed) => viewed.articleId === article.articleId)
    );

    res.json({ recommendedArticles: uniqueRecommendedArticles });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching recommended articles",
    });
  }
};
