import getActivities from "../controllers/Activities/getActivities";
import markAsDone from "../controllers/Activities/markAsDoneTheme";
import getNextLesson from "../controllers/Activities/getNextLesson";
import getNextMD from "./middleware/getNextMD";
import markASDoneMD from "./middleware/markAsDone";
import getNextUnit from "../controllers/Activities/getNextUnit";
import getNextCourse from "../controllers/Activities/getNextCourse";
import getNextActivity from "../controllers/Activities/getNextActivity";
import getInfo from "../controllers/Activities/getInfo";
import { Router } from "express";
const router = Router();

router.get("/next", getNextActivity);
router.get("/:id", getActivities);
router.post("/mark_as_done/:id", markASDoneMD, markAsDone);
router.post("/nextLesson/:id", getNextMD, getNextLesson);
router.post("/nextUnit/:id", getNextMD, getNextUnit);
router.post("/nextCourse/:id", getNextMD, getNextCourse);
router.get("/get_info/:type/:id/:theme_count", getInfo);

export default router;
