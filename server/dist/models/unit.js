"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const unitSchema = new mongoose_1.default.Schema({
    course: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    name: String,
    lesson_count: {
        type: Number,
        required: true,
    },
    theme_count: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Unit", unitSchema);
