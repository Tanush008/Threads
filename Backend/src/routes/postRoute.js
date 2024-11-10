import express from "express";
import {
  createPost,
  deletePost,
  feedPost,
  getPost,
  likesPost,
  repliesPost,
} from "../controllers/postControllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.route("/create").post(isAuthenticated, createPost);
router.route("/:id").get(isAuthenticated, getPost);
router.route("/:id").delete(isAuthenticated, deletePost);
router.route("/likes/:id").post(isAuthenticated, likesPost);
router.route("/reply/:id").post(isAuthenticated, repliesPost);
router.route("/feed/:id").get(isAuthenticated, feedPost);
export default router;
