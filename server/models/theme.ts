import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  name: String,
  activity_count: Number,
  isDone: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Theme", themeSchema);
