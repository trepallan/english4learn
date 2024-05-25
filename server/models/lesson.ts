import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  name: String,
  index: {
    type: Number,
    required: true,
  },
  theme_count: Number,
});

export default mongoose.model("Lesson", lessonSchema);
