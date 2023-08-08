import mongoose from "mongoose";
import dotenv from "dotenv";

// Loading environment variables from the .env file
dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);

// Getting the MongoDB URI from the environment variables
const URI = process.env.MONGO_URI;

// Define an asynchronous function to establish the database connection
const connection = async () => {
  try {
    // Connect to the MongoDB database using Mongoose
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected Successfully!");
  } catch (error) {
    console.log("Error while connecting", error.message);
  }
};

export default connection;
