import { Router } from "express";
import authController from "../controller/api/v1/authController";
import { Authenticate } from "../middlewares/authentication";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/googlelogin", authController.loginWithGoogle);
router.get("/whoami", Authenticate, authController.whoami);

export default router;