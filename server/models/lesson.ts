import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Unit",
    required: true,
  },
  indice: {
    type: Number,
    required: true,
  },
  name: String,
  theme_count: Number,
});

export default mongoose.model("Lesson", lessonSchema);
