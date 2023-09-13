import { Router } from "express";
import { login, logout, profile, register } from "../controllers";
import { authRequired } from "../middlewares";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout)

router.get("/profile", authRequired ,profile)

export default router;
