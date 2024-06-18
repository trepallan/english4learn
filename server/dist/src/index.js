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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const startup_1 = __importDefault(require("./startup/startup"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// Conect to MongoDB
(function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL)
            throw new Error(" cannot get mongodb url from environment");
        try {
            yield mongoose_1.default.connect(MONGODB_URL);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.log(error);
        }
    });
})();
// Create Express server
const CLIENT_URL = process.env.CLIENT_URL;
if (!CLIENT_URL)
    throw new Error(" cannot get client url from environment");
const corsOptions = {
    origin: CLIENT_URL,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use(express_1.default.json());
exports.app.use((0, compression_1.default)());
(0, startup_1.default)(exports.app);
// Start Express server
const server = http_1.default.createServer(exports.app);
const SERVER_PORT = process.env.PORT;
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
});
