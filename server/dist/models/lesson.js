"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    unit: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
    },
    name: String,
    index: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    theme_count: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Lesson", lessonSchema);
