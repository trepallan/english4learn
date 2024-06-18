"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Keep track of All themes completed by a user
const themeSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    unit: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    },
    lesson: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
    },
    theme: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Theme",
        required: true,
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
    },
});
exports.default = mongoose_1.default.model("Score", themeSchema);
