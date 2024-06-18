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
const user_1 = __importDefault(require("../../../models/user"));
const jwtCreate_1 = __importDefault(require("../../utils/jwtCreate"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function register(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, confirmPassword, email } = request.body;
            if (password !== confirmPassword) {
                return response.status(400).json({
                    message: "Passwords do not match",
                });
            }
            const hashed_password = bcrypt_1.default.hashSync(password, 10);
            const user = yield user_1.default.create({
                username,
                hashed_password,
                email,
            });
            if (!user) {
                return response.status(400).json({
                    message: "Failed to create user",
                });
            }
            const auth = (0, jwtCreate_1.default)(user);
            return response.status(201).json({ user, auth });
        }
        catch (error) {
            return response.status(400).json({
                message: "Internal server error",
            });
        }
    });
}
exports.default = register;
