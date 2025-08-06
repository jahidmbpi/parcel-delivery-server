import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.credentialLogIn);
router.post("/logout", authController.logOut);
export const authRoute = router;
