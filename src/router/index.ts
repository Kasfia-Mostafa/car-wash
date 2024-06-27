import { Router } from "express";
import { UserRoutes } from "../module/users/user.route";
import { CarServiceRoutes } from "../module/carService/carService.route";
import { BookingRoutes } from "../module/booking/booking.route";
import { slotRoutes } from "../module/slots/slots.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: CarServiceRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/",
    route: BookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
