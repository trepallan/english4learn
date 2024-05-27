import getActivities from "../controllers/Activities/getactivities";
import { Router } from "express";
const router = Router();

router.get("/:id", getActivities);

export default router;
