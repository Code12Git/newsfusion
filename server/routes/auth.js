import express from "express";
import {
  loginUser,
  logoutController,
  registerUser,
} from "../controllers/authController.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

//Register User
router.post("/register", registerUser);

//Login User

router.post("/login", loginUser);

//Logout User
router.get("/logout", logoutController);

export default router;
