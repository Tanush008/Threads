import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

export const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({
        message: "All field required",
        suceess: false,
      });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(400).json({
        message: "user is not found",
        suceess: false,
      });
    }
    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        message: "Unauthourized access",
        success: false,
      });
    }
    const maxLength = 500;
    if (text.length > maxLength) {
      return res.status(400).json({
        message: `Text must be shorter ${maxLength} characters`,
        suceess: false,
      });
    }
    const newPost = new Post({
      postedBy,
      text,
    });
    await newPost.save();
    res
      .status(200)
      .json({ message: "Post created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Post found",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
        success: false,
      });
    }
    if (req.user._id.toString() !== post.postedBy.toString()) {
      return res.status(400).json({
        message: "Unauthorized access to post",
        success: false,
      });
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "Post delete",
      succeess: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const likesPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
        success: false,
      });
    }
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // Unlike Post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      return res.status(200).json({
        message: "Unlike the post",
        success: true,
      });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
export const repliesPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const username = req.user.username;
    const userProfilePic = req.user.profilePic;
    if (!text) {
      return res.status(400).json({
        message: "Text field is required",
        succees: false,
      });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "Post not found",
        succees: false,
      });
    }
    const reply = { userId, text, userProfilePic, username };
    post.replies.push(reply);
    await post.save();
    return res.status(200).json({
      message: "Reply successfully",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const feedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(req.user._id);
    const user = await User.findById(userId);
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        succees: false,
      });
    }
    const following = user.following;
    const feedPost = await Post.find({
      postedBy: { $in: following },
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: "Feed post is here",
      feedPost,
    });
  } catch (error) {
    console.log(error);
  }
};
