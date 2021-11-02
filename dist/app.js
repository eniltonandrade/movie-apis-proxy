"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = require("path");
const dotenv_1 = require("dotenv");
const pathToConfig = '../.env';
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, pathToConfig) });
const tmdb_1 = require("./routes/tmdb");
const omdb_1 = require("./routes/omdb");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 5
});
//app.use(limiter);
//app.set('trust proxy', 1);
app.use((0, cors_1.default)());
app.use('/tmdb', tmdb_1.router);
app.use('/omdb', omdb_1.router);
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT} `));
