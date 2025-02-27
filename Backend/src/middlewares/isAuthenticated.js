// import { JsonWebTokenError } from "jsonwebtoken";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies.token;
    // console.log(req.cookies);
    // console.log(process.env.JWT_SECRET);
    console.log(token);
    if (!token) {
      return res.status(400).json({
        message: "user not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }
    const user = await User.findById(decode.userId).select("-password");
    req.user = user;
    // req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
