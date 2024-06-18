"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../controllers/auth/login"));
const register_1 = __importDefault(require("../controllers/auth/register"));
const refreshToken_1 = __importDefault(require("../controllers/auth/refreshToken"));
const express_1 = require("express");
const router = (0, express_1.Router)();
// Mddlewares
const register_2 = __importDefault(require("./middleware/register"));
const login_2 = __importDefault(require("./middleware/login"));
router.post("/login", login_2.default, login_1.default);
router.post("/register", register_2.default, register_1.default);
router.post("/refresh-token", refreshToken_1.default);
exports.default = router;
