import { Router } from "express";
import { saveAdminController, authAdminController, deleteAllAdminsController } from "../controllers/adminController.js";

const router = Router();

router.post("/saveAdmin", saveAdminController);

router.post("/authAdmin", authAdminController);

router.delete("/deleteAllAdmins", deleteAllAdminsController);

export default router;