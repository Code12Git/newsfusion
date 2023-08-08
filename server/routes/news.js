import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  fetchNews,
  fetchSavedArticles,
  saveArticle,
  updateNewsInterests,
  getRecommendedArticles,
  viewArticle,
} from "../controllers/newsController.js";
const router = express.Router();

//Get News
router.get("/", verifyToken, fetchNews);

//Update Interests
router.post("/", verifyToken, updateNewsInterests);

//Save Articles
router.post("/save-article", verifyToken, saveArticle);

//Fetching Saved Articles
router.get("/saved-articles", verifyToken, fetchSavedArticles);

//View Article
router.post("/view-article", verifyToken, viewArticle);

//Recommending Article
router.get("/recommendations", verifyToken, getRecommendedArticles);

export default router;
