"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const markAsRead = [
    (0, express_validator_1.body)("percentage")
        .notEmpty()
        .escape()
        .isNumeric()
        .withMessage("percentage is required")
        .custom((value) => {
        if (value < 0 || value > 101) {
            throw new Error("percentage must be between 0 and 100");
        }
        return true;
    }),
    (0, express_validator_1.query)().notEmpty().escape().isString().withMessage("themeId is required"),
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
exports.default = markAsRead;
