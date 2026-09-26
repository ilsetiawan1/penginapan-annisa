import { Router } from "express";
import { storageController } from "./storage.controller";

const router = Router();

router.get("/view", storageController.getFile);
router.get("/list", storageController.listFiles);

export default router;

