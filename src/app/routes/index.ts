import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoute } from "../modules/auth/auth.route";
import { percelRoute } from "../modules/percel/percel.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/percel",
    route: percelRoute,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
