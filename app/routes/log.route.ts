import { Router } from "express";
import logController from "../controller/api/v1/logController";
import { Authenticate, restrictMember } from "../middlewares/authentication";

const router = Router();

router.get("/", Authenticate, restrictMember, logController.findAll);
router.get("/insert", Authenticate, restrictMember, logController.findInsert);
router.get("/update", Authenticate, restrictMember, logController.findUpdate);
router.get("/delete", Authenticate, restrictMember, logController.findDelete);

export default router;