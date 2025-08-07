import { Router } from "express";
import { userController } from "./user.controllers";
import validateRequest from "../../utils/validateRequest";
import { userZodSchema } from "./user.validation";
import { cheakAuth } from "../../utils/cheakAuth";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(userZodSchema),
  userController.createUser
);

router.patch(
  "/update/:id",
  cheakAuth(Role.ADMIN, Role.RECEIVER, Role.SENDER),
  userController.updateUser
);

export const userRoutes = router;
