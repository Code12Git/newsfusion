import express from "express";
import cors from "cors";
import connection from "./db/conn.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import newsRoute from "./routes/news.js";
import session from "express-session";

// Loading environment variables from the config file
dotenv.config({ path: "./config.env" });

// Importing the database connection
connection();

// Creating an instance of the Express app
const app = express();

// Defining the port for the server to listen on
const port = process.env.PORT || 3000;

// Appling middleware
app.use(cookieParser());
const corsOptions = {
  origin: "https://newsfusion.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "session",
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "none",
      secure: true,
    },
  })
);

app.set("trust proxy", 1);

app.use(express.json());

// Enabling Cross-Origin Resource Sharing (CORS)
app.use("/api/auth", authRoute); //Api for authentication
app.use("/api/news", newsRoute); //Api for News

// Testing route to check if the server is working
app.get("/", (req, res) => {
  res.status(200).json("Working!");
});

// Starting the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is up on PORT: ${port}`);
});
