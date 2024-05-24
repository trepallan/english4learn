import getCOurses from "../controllers/Course/getCouses";
import { Router } from "express";
const router = Router();

router.get("/", getCOurses);

export default router;
