import mongoose from "mongoose";

const themeSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  name: String,
  indice: {
    type: Number,
    required: true,
  },
  subject_count: Number,
});

export default mongoose.model("Theme", themeSchema);
