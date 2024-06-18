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
const path_1 = require("../../../models/path");
function getLessons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return res.status(500).json({ message: "Something went wrong" });
            const lessons = yield lesson_1.default.find({ unit: id }).sort({ index: 1 });
            res.status(200).json({ data: lessons, path: yield (0, path_1.getPath)(id) });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
}
exports.default = getLessons;
