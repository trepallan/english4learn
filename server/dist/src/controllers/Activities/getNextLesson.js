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
const lesson_1 = __importDefault(require("../../../models/lesson"));
const theme_1 = __importDefault(require("../../../models/theme"));
const CompletedThemes_1 = __importDefault(require("../../../models/CompletedThemes"));
const unit_1 = __importDefault(require("../../../models/unit"));
function getNextLesson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const lesson = yield lesson_1.default.findById(id);
            if (!lesson) {
                return res.status(404).json({ message: "Lesson not found" });
            }
            const unit = yield unit_1.default.findById(lesson.unit);
            if (!unit) {
                return res.status(404).json({ message: "Unit not found" });
            }
            // if unit has no more lessons
            if (unit.lesson_count <= lesson.index) {
                // Get score
                const themesScore = yield CompletedThemes_1.default.find({
                    unit: unit._id,
                    user: req.user._id,
                    score: { $ne: null },
                }).select("score");
                if (themesScore.length === 0)
                    return res.status(200).json({ unit });
                let total = themesScore.reduce((a, b) => a + b.score, 0);
                const average = Math.round(total / themesScore.length);
                return res.status(200).json({ unit, total: average });
            }
            const nextLesson = yield lesson_1.default
                .findOne({ index: lesson.index + 1, unit: unit._id })
                .select("_id");
            if (!nextLesson)
                return res.status(404).json({ message: "Lesson not found" });
            const theme = yield theme_1.default
                .findOne({ lesson: nextLesson._id, index: 1 })
                .select("_id");
            if (!theme)
                return res.status(404).json({ message: "Theme not found" });
            return res.status(200).json({ theme: theme._id.toString() });
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}
exports.default = getNextLesson;
