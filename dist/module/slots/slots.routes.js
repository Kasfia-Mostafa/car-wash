"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRoutes = void 0;
const express_1 = require("express");
const slots_controller_1 = require("./slots.controller");
const router = (0, express_1.Router)();
router.get("/availability", slots_controller_1.slotController.getAvailableSlots);
exports.slotRoutes = router;
