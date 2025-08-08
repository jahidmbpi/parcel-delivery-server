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

router.get("/me", cheakAuth(Role.RECEIVER), percelController.incomingParcel);
router.get("/sender", cheakAuth(Role.SENDER), percelController.senderParcel);

router.get(
  "/admin-percel",
  cheakAuth(Role.ADMIN),
  percelController.getPercelForAdmin
);

export const percelRoute = router;
