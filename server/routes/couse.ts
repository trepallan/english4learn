import getCourses from "../controllers/Course/getCouses";
import getUnits from "../controllers/Course/getUnits";
import getLessons from "../controllers/Course/getLessons";
import getThemes from "../controllers/Course/getThemes";
import { Router } from "express";
const router = Router();

router.get("/", getCourses);
router.get("/units/:id", getUnits);
router.get("/lessons/:id", getLessons);
router.get("/themes/:id", getThemes);

export default router;
