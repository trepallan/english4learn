import getActivities from "../controllers/Activities/getActivities";
import markAsDone from "../controllers/Activities/markAsDoneTheme";
import getNextLesson from "../controllers/Activities/getNextLesson";
import getNextLessonMD from "./middleware/getNextLessonMD";
import markASDoneMD from "./middleware/markAsDone";
import { Router } from "express";
const router = Router();

router.get("/:id", getActivities);
router.post("/mark_as_done/:id", markASDoneMD, markAsDone);
router.post("/nextLesson/:id", getNextLessonMD, getNextLesson);

export default router;
