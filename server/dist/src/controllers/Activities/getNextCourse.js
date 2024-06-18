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
const course_1 = __importDefault(require("../../../models/course"));
const unit_1 = __importDefault(require("../../../models/unit"));
const lesson_1 = __importDefault(require("../../../models/lesson"));
const theme_1 = __importDefault(require("../../../models/theme"));
function getNextCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return res.status(500).json({ message: "Something went wrong" });
            const course = yield course_1.default.findById(id);
            if (!course)
                return res.status(404).json({ message: "Course not found" });
            // Last course
            if (course.name === "Course 4")
                return res.status(200).json({});
            const nextCourse = yield course_1.default.findOne({ index: course.index + 1 });
            if (!nextCourse)
                return res.status(404).json({ message: "Course not found" });
            const nextUnit = yield unit_1.default.findOne({
                index: 1,
                course: nextCourse._id,
            });
            if (!nextUnit)
                return res.status(404).json({ message: "Unit not found" });
            const nextLesson = yield lesson_1.default.findOne({
                index: 1,
                unit: nextUnit._id,
            });
            if (!nextLesson)
                return res.status(404).json({ message: "Lesson not found" });
            const nextTheme = yield theme_1.default.findOne({
                index: 1,
                lesson: nextLesson._id,
            });
            if (!nextTheme)
                return res.status(404).json({ message: "Theme not found" });
            res.status(200).json({ theme: nextTheme._id });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.default = getNextCourse;
