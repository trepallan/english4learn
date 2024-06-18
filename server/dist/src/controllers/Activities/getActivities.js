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
const activity_1 = __importDefault(require("../../../models/activity"));
const theme_1 = __importDefault(require("../../../models/theme"));
const user_1 = __importDefault(require("../../../models/user"));
function getActivities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return res.status(500).json({ message: "Something went wrong" });
            const theme = yield theme_1.default.findById(id);
            if (!theme)
                return res.status(404).json({ message: "Theme not found" });
            const activities = yield activity_1.default
                .find({ theme: id })
                .sort({ index: 1 });
            if (!activities)
                return res.status(404).json({ message: "Activities not found" });
            // Set user theme
            yield user_1.default.findByIdAndUpdate(req.user._id, { theme: theme._id });
            res.status(200).json({ activities, theme });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}
exports.default = getActivities;
