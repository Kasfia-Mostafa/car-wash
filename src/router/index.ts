import { Router } from "express";
import { UserRoutes } from "../users/user.route";
import { CarServiceRoutes } from "../carService/carService.route";

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
