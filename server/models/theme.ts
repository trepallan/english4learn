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
  name: String,
  activity_count: Number,
});

export default mongoose.model("Theme", themeSchema);
