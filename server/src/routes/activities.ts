import getActivities from "../controllers/Activities/getActivities";
import markAsDone from "../controllers/Activities/markAsDone";
import markASDoneMD from "./middleware/markAsDone";
import { Router } from "express";
const router = Router();

router.get("/:id", getActivities);
router.post("/mark_as_done/:id", markASDoneMD, markAsDone);

export default router;
