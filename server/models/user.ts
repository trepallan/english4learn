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
  theme: {
    // Keep track of the user's last completed theme
    default: new mongoose.Types.ObjectId("6662f09b511149d2b9cced3c"), // first class
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
  },
});

export default mongoose.model("User", userSchema);
