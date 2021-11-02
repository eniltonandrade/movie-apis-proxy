"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const needle_1 = __importDefault(require("needle"));
const apicache_1 = __importDefault(require("apicache"));
const router = (0, express_1.Router)();
exports.router = router;
const API_BASE_URL = process.env.OMDB_URL;
const API_KEY_NAME = process.env.OMDB_KEY_NAME;
const API_KEY_VALUE = process.env.OMDB_KEY_VALUE;
let cache = apicache_1.default.middleware;
router.get('/', cache('2 minutes'), async (req, res) => {
    const urlQueryParams = req.query;
    try {
        const params = new URLSearchParams(Object.assign({ [API_KEY_NAME]: API_KEY_VALUE }, urlQueryParams));
        process.env.NODE_ENV === 'production' ? null : console.log(`REQUEST: ${API_BASE_URL}?${params}`);
        const apiRes = await (0, needle_1.default)('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});
