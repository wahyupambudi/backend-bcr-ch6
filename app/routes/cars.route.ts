import { Router } from "express";
import carImg from "../middlewares/multer";
import carsController from "../controller/api/v1/carsController";
import { Authenticate, restrictMember } from "../middlewares/authentication";

const router = Router();

router.get("/", Authenticate, carsController.getCars);
router.get("/available", Authenticate, carsController.getCarsAvailable);
router.get("/deleted", Authenticate, restrictMember, carsController.getCarsDeleted);
router.get("/:id", Authenticate, carsController.getCarsById);
router.post("/create", Authenticate, restrictMember, carImg.single('img'), carsController.createCar);
router.put("/update/:id", Authenticate, restrictMember, carImg.single('img'), carsController.updateCar);
router.delete("/delete/:id", Authenticate, restrictMember, carsController.deleteCar);

export default router;