import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  index: {
    type: Number,
    required: true,
  },
  unit_count: Number,
});

export default mongoose.model("Course", courseSchema);
