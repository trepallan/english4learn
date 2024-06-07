import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
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
  lesson_count: {
    type: Number,
    required: true,
  },
  theme_count: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Unit", unitSchema);
