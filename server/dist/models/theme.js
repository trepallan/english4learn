"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const themeSchema = new mongoose_1.default.Schema({
    lesson: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Lesson",
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
    activity_count: Number,
});
exports.default = mongoose_1.default.model("Theme", themeSchema);
