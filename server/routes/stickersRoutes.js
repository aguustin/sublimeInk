import { Router } from "express";
import { uploadProductController } from "../controllers/stickersController.js";

const router = Router();

router.post("/uploadProduct", uploadProductController);

export default router;