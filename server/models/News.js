import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  selectedInterests: [String],
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
  ],
  viewedArticles: [
    {
      articleId: String,
      category: String,
    },
  ],
});

const News = mongoose.model("News", newsSchema);

export default News;
