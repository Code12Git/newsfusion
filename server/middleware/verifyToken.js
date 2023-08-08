import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config" });

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Token is invalid" });
  }
};
