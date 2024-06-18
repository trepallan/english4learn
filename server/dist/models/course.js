"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    name: String,
    index: {
        type: Number,
        required: true,
    },
    unit_count: Number,
    theme_count: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Course", courseSchema);
