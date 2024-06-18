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
const express_validator_1 = require("express-validator");
const login = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .escape()
        .isString()
        .withMessage("email is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: value });
        if (!user) {
            throw new Error("Invalid email or password");
        }
    })),
    (0, express_validator_1.body)("password").notEmpty(),
    (req, res, next) => {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return next();
        }
        return res.status(400).json({
            message: result.array()[0].msg,
        });
    },
];
exports.default = login;
