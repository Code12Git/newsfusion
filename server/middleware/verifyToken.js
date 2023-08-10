import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config" });

// Verify Token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};
