import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router();

router.post("/register", userController.createUser);

export const userRoutes = router;
