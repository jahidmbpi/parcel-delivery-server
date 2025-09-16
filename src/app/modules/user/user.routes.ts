import { Router } from "express";
import { userController } from "./user.controllers";
import validateRequest from "../../utils/validateRequest";
import { updatedUserZodSchema, userZodSchema } from "./user.validation";
import { cheakAuth } from "../../utils/cheakAuth";
import { Role } from "./user.interface";

const router = Router();
router.get("/", cheakAuth(Role.ADMIN), userController.getAllUser);
router.post(
  "/register",
  validateRequest(userZodSchema),
  userController.createUser
);

router.get(
  "/me",
  cheakAuth(Role.ADMIN, Role.RECEIVER, Role.SENDER),
  userController.getMe
);
router.patch(
  "/update/:id",
  cheakAuth(Role.ADMIN, Role.RECEIVER, Role.SENDER),
  validateRequest(updatedUserZodSchema),
  userController.updateUser
);

export const userRoutes = router;
