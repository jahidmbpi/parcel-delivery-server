import { Router } from "express";
import { cheakAuth } from "../../utils/cheakAuth";
import { Role } from "../user/user.interface";
import { percelController } from "./percel.controller";

const router = Router();

router.post(
  "/create-percel",
  cheakAuth(Role.SENDER),
  percelController.createPercel
);

export const percelRoute = router;
