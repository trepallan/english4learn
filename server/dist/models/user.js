"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    hashed_password: {
        type: String,
        required: true,
        select: false,
    },
    theme: {
        // Keep track of the user's last completed theme
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Theme",
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
