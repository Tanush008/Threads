import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/userRoute.js";
import postRoute from "./src/routes/postRoute.js";
import cors from "cors";
const app = express();
// const cookieParser = require('cookie-parser');
dotenv.config({});
const PORT = process.env.PORT || 3000;
// use of middleware
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/users/posts", postRoute);
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  connectDB();
  console.log(`Server start at https://localhost:${PORT}`);
});
