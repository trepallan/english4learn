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
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
  },
  done: {
    type: Number,
    required: true,
  }, //// Done and score are in % (0-100) ////
  score: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Score", scoreSchema);
