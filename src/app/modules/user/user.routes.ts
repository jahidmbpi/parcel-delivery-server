import { Router } from "express";
import { userController } from "./user.controllers";
import validateRequest from "../../utils/validateRequest";
import { userZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(userZodSchema),
  userController.createUser
);

export const userRoutes = router;
