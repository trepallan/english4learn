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
const theme_1 = __importDefault(require("../../../models/theme"));
const CompletedThemes_1 = __importDefault(require("../../../models/CompletedThemes"));
const lesson_1 = __importDefault(require("../../../models/lesson"));
const path_1 = require("../../../models/path");
function markAsDone(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        // Score percentage **if the activity is not a quiz the score will be 100**
        let { percentage } = req.body;
        percentage = Number(percentage); // Make sure that the percentage is a number
        try {
            const theme = yield theme_1.default.findById(id);
            if (!theme)
                return res.status(404).json({ message: "Theme not found" });
            // Check if a score already exists for this theme
            const existingScore = yield CompletedThemes_1.default.findOne({
                theme: theme._id,
                user: req.user._id,
            });
            if (percentage === 101)
                percentage = null;
            //  101 means that the activity is not any type of quiz wich means that is no need to create a score
            else
                percentage = Math.round(percentage);
            if (existingScore) {
                // Update the existing score
                if (percentage !== null) {
                    existingScore.score = percentage;
                    yield existingScore.save();
                }
            }
            else {
                const Lessonpath = yield (0, path_1.getPath)(theme.lesson.toString());
                // Create a new score
                yield CompletedThemes_1.default.create({
                    user: req.user._id,
                    course: Lessonpath[0].id, // Course id
                    unit: Lessonpath[1].id, // unit id
                    lesson: theme.lesson,
                    theme: theme._id,
                    score: percentage,
                });
            }
            const lesson = yield lesson_1.default.findById(theme.lesson);
            if (!lesson)
                throw new Error("Lesson not found");
            let hasNext = false;
            // index starts from 1
            if (lesson.theme_count > theme.index) {
                hasNext = true;
            }
            // If there is no next themes
            if (!hasNext) {
                const lessonScore = yield CompletedThemes_1.default.find({
                    lesson: lesson.id,
                    user: req.user._id,
                    score: { $ne: null },
                }).select("score");
                if (!lessonScore)
                    throw new Error("Lesson score not found");
                let total = lessonScore.reduce((a, b) => a + b.score, 0);
                const average = Math.round(total / lessonScore.length);
                return res.status(200).json({ lesson, hasNext, score: average });
            } /// No next theme
            const nextTheme = yield theme_1.default.findOne({
                lesson: theme.lesson,
                index: theme.index + 1,
            });
            if (!nextTheme)
                throw new Error("Next theme not found");
            return res.status(200).json({ nextTheme, hasNext });
            // Check if there is a next theme
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    });
}
exports.default = markAsDone;
