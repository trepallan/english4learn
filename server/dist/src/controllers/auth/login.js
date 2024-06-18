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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtCreate_1 = __importDefault(require("../../utils/jwtCreate"));
function login(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = request.body;
        try {
            const user = yield user_1.default.findOne({ email }).select("+hashed_password");
            if (!user) {
                return response.status(400).json({
                    message: "User not found",
                });
            }
            try {
                const isMatch = yield bcrypt_1.default.compare(password, user.hashed_password);
                if (!isMatch) {
                    return response.status(400).json({
                        message: "Invalid email or password",
                    });
                }
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({
                    message: "Invalid email or password",
                });
            }
            // Creating a copy of the user object without the hashed password
            const userWithoutPassword = Object.assign({}, user.toObject());
            delete userWithoutPassword.hashed_password;
            const auth = (0, jwtCreate_1.default)(userWithoutPassword);
            return response.status(200).json({ user: userWithoutPassword, auth });
        }
        catch (error) {
            return response.status(500).json({
                message: "Internal server error",
            });
        }
    });
}
exports.default = login;
