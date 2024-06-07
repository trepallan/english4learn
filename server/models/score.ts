import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    unique: true,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Score", scoreSchema);
