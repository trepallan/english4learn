import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  name: String,
  indice: {
    type: Number,
    required: true,
  },
  lesson_count: Number,
});

export default mongoose.model("Unit", unitSchema);
