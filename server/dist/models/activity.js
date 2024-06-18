"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// activity
const activitySchema = new mongoose_1.default.Schema({
    theme: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
            "multioption",
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
exports.default = mongoose_1.default.model("Activity", activitySchema);
