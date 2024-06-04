import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
    select: false,
  },
});

export default mongoose.model("User", userSchema);
