import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 8,
      unique: true,
    },
    profilePic: {
      type: String,
    },
    following: {
      type: [String],
      default: [],
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
