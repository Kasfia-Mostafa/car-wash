"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/users/user.route");
const carService_route_1 = require("../module/carService/carService.route");
const booking_route_1 = require("../module/booking/booking.route");
const slots_routes_1 = require("../module/slots/slots.routes");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/services",
        route: carService_route_1.CarServiceRoutes,
    },
    {
        path: "/slots",
        route: slots_routes_1.slotRoutes,
    },
    {
        path: "/",
        route: booking_route_1.BookingRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
