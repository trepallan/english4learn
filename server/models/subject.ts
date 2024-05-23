import mongoose from "mongoose";

const subject = new mongoose.Schema({
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  indice: {
    type: Number,
    required: true,
  },
  name: String,
  activities_count: Number,
});

export default mongoose.model("Subject", subject);
