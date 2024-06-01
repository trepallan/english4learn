import getActivities from "../controllers/Activities/getActivities";
import { Router } from "express";
const router = Router();

router.get("/:id", getActivities);

export default router;
