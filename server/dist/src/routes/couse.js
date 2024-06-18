"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCouses_1 = __importDefault(require("../controllers/Course/getCouses"));
const getUnits_1 = __importDefault(require("../controllers/Course/getUnits"));
const getLessons_1 = __importDefault(require("../controllers/Course/getLessons"));
const getThemes_1 = __importDefault(require("../controllers/Course/getThemes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", getCouses_1.default);
router.get("/units/:id", getUnits_1.default);
router.get("/lessons/:id", getLessons_1.default);
router.get("/themes/:id", getThemes_1.default);
exports.default = router;
