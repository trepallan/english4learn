import mongoose from "mongoose";

// activity

const activitySchema = new mongoose.Schema({
  theme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "concentration",
      "mutioption",
      "quiz",
      "read",
      "pronunciation",
      "spelling",
      "vocabulary",
      "selectImage",
    ],
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  header: {
    type: String,
    required: false,
  },
  hasMedia: {
    type: String,
    enum: ["video", "image"],
    required: false,
  },
  media: {
    type: String,
    required: false,
  },
  table: {
    type: String,
    required: false,
  },
  audio: {
    type: String,
    required: false,
  },
  answer: {
    type: String,
    required: false,
  },
  options: [
    {
      id: {
        type: Number,
      },
      text: {
        type: String,
        required: false,
      },
      is_correct: {
        type: Boolean,
        required: false,
      },
    },
  ],
  concentration: [
    {
      id: {
        type: Number,
      },
      key: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      IsImage: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

export default mongoose.model("Activity", activitySchema);
