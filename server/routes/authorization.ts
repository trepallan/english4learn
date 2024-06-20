import login from "../controllers/auth/login";
import register from "../controllers/auth/register";
import refreshToken from "../controllers/auth/refreshToken";
import { Router } from "express";
const router = Router();
// Mddlewares
import registerMD from "./middleware/register";
import loginMD from "./middleware/login";

router.post("/login", loginMD, login);
router.post("/register", registerMD, register);
router.post("/refresh-token", refreshToken);

export default router;
