import mongoose from "mongoose";

// Defining the schema for the "News" collection
const newsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the "User" model
    required: true,
  },
  selectedInterests: [String], // Array of user's selected interests
  savedArticles: [
    {
      articleId: String,
      title: String,
      description: String,
      source: String,
      content: String,
      imageUrl: String,
      publishedAt: String,
    },
  ], // Array of saved articles with their details
  viewedArticles: [
    {
      articleId: String,
      category: String,
    },
  ], // Array of viewed articles with their details
});

// Creating the "News" model using the schema
const News = mongoose.model("News", newsSchema);

export default News;
