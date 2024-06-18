"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const getNextMD = [
    (0, express_validator_1.query)()
        .notEmpty()
        .escape()
        .exists()
        .withMessage(" ID is required")
        .isString()
        .withMessage("ID must be a string"),
    (req, res, next) => {
        const result = (0, express_validator_1.validationResult)(req);
        if (result.isEmpty()) {
            return next();
        }
        console.log(result.array());
        return res.status(400).json({
            message: result.array()[0].msg,
        });
    },
];
exports.default = getNextMD;
