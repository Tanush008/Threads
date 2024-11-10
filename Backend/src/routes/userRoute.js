import express, { Route } from "express";
import {
  followAndUnfollow,
  getProfile,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/userControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/follow/:id").post(isAuthenticated, followAndUnfollow);
router.route("/update/:id").post(isAuthenticated, updateProfile);
router.route("/profile/:id").get(isAuthenticated, getProfile);
export default router;
