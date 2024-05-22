import login from "../controllers/auth/login";
import { Router } from "express";
const router = Router();

router.post("/login", login);

export default router;
