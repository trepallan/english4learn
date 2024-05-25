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
  name: String,
  lesson_count: Number,
});

export default mongoose.model("Unit", unitSchema);
