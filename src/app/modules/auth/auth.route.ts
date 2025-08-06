import { Router } from "express";
import { authController } from "./auth.controller";

import { Role } from "../user/user.interface";
import { cheakAuth } from "../../utils/cheakAuth";

const router = Router();

router.post("/login", authController.credentialLogIn);
router.post("/logout", authController.logOut);
router.post(
  "/reset-password",
  cheakAuth(Role.ADMIN, Role.RECEIVER, Role.SENDER),
  authController.resetPssword
);
export const authRoute = router;
