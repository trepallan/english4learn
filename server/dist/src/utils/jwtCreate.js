"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
/////// Takes user object and returns token and refresh token ///////
function jwtGenerate(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("No secret specified from environment");
    //   Generate JWT
    const token = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, secret, {
        expiresIn: "1h",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id, username: user.username }, secret, {
        expiresIn: "7d",
    });
    return { token, refreshToken };
}
exports.default = jwtGenerate;
