import { Router } from "express";
import usersController from "../controller/api/v1/usersController";
import { Authenticate, restrictUsers } from "../middlewares/authentication";

const router = Router();

router.get("/", Authenticate, restrictUsers, usersController.getUsers);
router.get("/email", Authenticate, restrictUsers, usersController.getUserByEmail);
router.get("/:id", Authenticate, restrictUsers, usersController.getUserById);
router.post("/create", Authenticate, restrictUsers, usersController.createUser);
router.put("/update/:id", Authenticate, restrictUsers, usersController.updateUser);
router.delete("/delete/:id", Authenticate, restrictUsers, usersController.deleteUser);

export default router;