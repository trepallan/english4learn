import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  hashed_password: String,
});

export default mongoose.model("User", userSchema);
