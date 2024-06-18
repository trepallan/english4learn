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
const unit_1 = __importDefault(require("../../../models/unit"));
const course_1 = __importDefault(require("../../../models/course"));
const theme_1 = __importDefault(require("../../../models/theme"));
const lesson_1 = __importDefault(require("../../../models/lesson"));
const CompletedThemes_1 = __importDefault(require("../../../models/CompletedThemes"));
function getNextUnit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const unit = yield unit_1.default.findById(id);
            if (!unit) {
                return res.status(404).json({ message: "Unit not found" });
            }
            const course = yield course_1.default.findById(unit.course);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            // If there is no next unit into the course
            if (course.unit_count === unit.index) {
                const themesScore = yield CompletedThemes_1.default.find({
                    user: req.user._id,
                    course: course._id,
                    score: { $ne: null },
                }).select("score");
                if (themesScore.length === 0)
                    return res.status(200).json({ course });
                const total = themesScore.reduce((a, b) => a + b.score, 0);
                const average = Math.round(total / themesScore.length);
                return res.status(200).json({ course, total: average });
            }
            const nextUnit = yield unit_1.default
                .findOne({
                course: course._id,
                index: unit.index + 1,
            })
                .select("_id");
            if (!nextUnit) {
                return res.status(404).json({ message: "Next unit not found" });
            }
            const nextLesson = yield lesson_1.default
                .findOne({
                unit: nextUnit._id,
                index: 1,
            })
                .select("_id");
            if (!nextLesson) {
                return res.status(404).json({ message: "Next lesson not found" });
            }
            const nextTheme = yield theme_1.default.findOne({
                lesson: nextLesson._id,
                index: 1,
            });
            if (!nextTheme) {
                return res.status(404).json({ message: "Next theme not found" });
            }
            return res.status(200).json({ theme: nextTheme._id });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.default = getNextUnit;
