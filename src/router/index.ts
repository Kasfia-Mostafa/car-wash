import { Router } from "express";
import { UserRoutes } from "../users/user.route";
import { LoginRoutes } from "../auth/login.route";

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: LoginRoutes,
  },
 
 
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;