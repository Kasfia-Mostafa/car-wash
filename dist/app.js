"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api", router_1.default);
const test = (req, res) => {
    const a = 10;
    res.send({ value: a });
};
app.get("/", test);
// Global "Not Found" handler
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
// Global error handling middleware
app.use((err, req, res) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
});
exports.default = app;
