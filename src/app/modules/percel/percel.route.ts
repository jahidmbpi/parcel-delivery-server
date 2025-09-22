import { Router } from "express";
import { cheakAuth } from "../../utils/cheakAuth";
import { Role } from "../user/user.interface";
import { percelController } from "./percel.controller";
import validateRequest from "../../utils/validateRequest";
import { percelZodSchema, updatePerceldZodSchema } from "./parcel.validation";

const router = Router();

router.post(
  "/create-percel",
  cheakAuth(Role.SENDER),
  validateRequest(percelZodSchema),
  percelController.createPercel
);

router.get("/me", cheakAuth(Role.RECEIVER), percelController.incomingParcel);
router.get("/sender", cheakAuth(Role.SENDER), percelController.senderParcel);
router.get(
  "/history",
  cheakAuth(Role.RECEIVER),
  percelController.deliverHistory
);

router.get(
  "/admin-percel",
  cheakAuth(Role.ADMIN),
  percelController.getPercelForAdmin
);

router.patch(
  "/update/:id",
  cheakAuth(Role.SENDER, Role.ADMIN, Role.RECEIVER),
  validateRequest(updatePerceldZodSchema),
  percelController.updateStatus
);

export const percelRoute = router;
