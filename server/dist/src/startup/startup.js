"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth/auth"));
const authorization_1 = __importDefault(require("../routes/authorization"));
const couse_1 = __importDefault(require("../routes/couse"));
const activities_1 = __importDefault(require("../routes/activities"));
function startup(app) {
    // Free routes
    app.use("/authorization", authorization_1.default);
    app.use("/courses", couse_1.default);
    // Auth routes
    app.use("/activities", auth_1.default, activities_1.default);
}
exports.default = startup;
