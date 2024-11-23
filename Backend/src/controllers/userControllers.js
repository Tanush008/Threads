import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All details required",
        success: false,
      });
    }
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        error: "user already exist",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });
    // const tokenData = { newUseId: newUser._id };
    // const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
    //   expiresIn: "15d",
    // });//Not required every time but after login token requires
    if (user) {
      return (
        res
          .status(200)
          // .cookie("token", token, {
          //   maxAge: 15 * 24 * 60 * 1000,
          //   httpOnly: true,
          //   sameStrict: "strict",
          // })
          .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            message: "User sign up successfully ",
            success: true,
          })
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(password);
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    } 
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({
        message: "Invalid username or password",
        success: false,
      });
    }
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameStrict: "strict",
      })
      .json({
        _id: user._id,
        name: user.name,
        username: user.username,
        message: "login successfully",
        success: true,
        token: token,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("jwt", { maxAge: 1 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const followAndUnfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const UserModify = await User.findById(id);
    const currUser = await User.findById(req.user._id);
    if (id == req.user._id.toString()) {
      return res.status(400).json({
        message: "you cannot follow yourself",
      });
    }
    if (!UserModify || !currUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isFollowing = currUser.following.includes(id);
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({
        message: "User unfollowed successfully",
        success: true,
      });
    } else {
      // Follow User
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({
        message: "User followed successfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { username, name, password, email, bio } = req.body;
    const userId = req.user._id;
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    if (req.params.id !== req.user._id.toString()) {
      return res.status(400).json({
        message: "you cannot update other profile",
        success: false,
      });
    }
    if (password) {
      const hashedPassword = bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    (user.password = password || user.password),
      (user.name = name || user.name),
      (user.email = email || user.email),
      (user.bio = bio || user.bio),
      (user.username = username || user.username);
    user = await user.save();
    res.status(200).json({
      message: "Updated profile",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .select("-password")
      .select("-updatedAt");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        succeess: false,
      });
    }
    res.status(200).json({
      message: "User found",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
