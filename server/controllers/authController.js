import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import News from "../models/News.js";
dotenv.config({ path: "./config.env" });

// Register user
export const registerUser = async (req, res) => {
  try {
    // Checking if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ message: "User already registered" });
    }

    // Hashing the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      ...req.body,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await user.save();

    const news = new News({
      userId: user._id,
      selectedInterests: ["business"],
    });
    await news.save();

    // Responding with user data without the password
    const { password, confirmPassword, ...userData } = user.toObject();
    res.status(200).json({ user: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    // Finding the user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Comparing the passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Generating an access token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );

    // Responding with user data and access token
    const { password, confirmPassword, ...userData } = user.toObject();
    res.status(200).json({ user: userData, token }); // Send the user data and token in the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Logout
export const logoutController = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};
