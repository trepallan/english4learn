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
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../../../models/user"));
const register = [
    (0, express_validator_1.body)("username")
        .notEmpty()
        .isString()
        .withMessage("username is required")
        .custom((value) => {
        const dangerousChars = /[\`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        if (dangerousChars.test(value)) {
            throw new Error("username cannot contain especial characters");
        }
        return true;
    }),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    (0, express_validator_1.body)("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }
        return true;
    }),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .escape()
        .isEmail()
        .withMessage("email is required")
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: value });
        if (user) {
            throw new Error("Email already in use");
        }
    })),
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
exports.default = register;
