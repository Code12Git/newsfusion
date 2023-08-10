import express from "express";
import cors from "cors";
import connection from "./db/conn.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import newsRoute from "./routes/news.js";
import session from "express-session";
import connectMongo from "connect-mongo";

// Loading environment variables from the config file
dotenv.config({ path: "./config.env" });

// Importing the database connection
connection();

// Creating an instance of the Express app
const app = express();

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Applying middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: "https://newsfusionapp.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY || "session-secret",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      secure: true,
    },
  })
);

app.set("trust proxy", 1);

// Enabling Cross-Origin Resource Sharing (CORS)
app.use("/api/auth", authRoute); // API for authentication
app.use("/api/news", newsRoute); // API for News

// Testing route to check if the server is working
app.get("/", (req, res) => {
  res.status(200).json("Working!");
});

// Starting the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is up on PORT: ${port}`);
});
