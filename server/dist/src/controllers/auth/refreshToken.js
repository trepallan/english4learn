"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../../models/user"));
require("dotenv/config");
function refreshToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        try {
            jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return res.status(401).json({ message: "expired refresh token" });
                }
                const currentTime = Date.now() / 1000;
                if (currentTime > decoded.exp) {
                    return res.status(401).json({ message: "expired refresh token" });
                }
                const user = yield user_1.default.findById(decoded._id);
                if (!user)
                    return res.status(401).json({ message: "expired refresh token" });
                const token = jsonwebtoken_1.default.sign({ _id: decoded._id, username: decoded.username }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                const newRefreshToken = jsonwebtoken_1.default.sign({ _id: decoded._id, username: decoded.username }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                res.json({ token, refreshToken: newRefreshToken });
            }));
        }
        catch (error) {
            return res.status(401).json({ message: "expired refresh token" });
        }
    });
}
exports.default = refreshToken;
