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
exports.getPath = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const pathSchema = new mongoose_1.default.Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId, // Could be Unit lesson or theme
        unique: true,
        immutable: true,
    },
    path: {
        type: String,
        unique: true,
        immutable: true,
    },
});
exports.default = mongoose_1.default.model("Path", pathSchema);
const PathModel = mongoose_1.default.model("Path", pathSchema);
function getPath(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = yield PathModel.findOne({ id: id });
        if (path)
            if (!path.path)
                throw new Error("Path not found");
        if (path === null)
            throw new Error("Path not found");
        const pathString = path.path;
        return JSON.parse(pathString);
    });
}
exports.getPath = getPath;
