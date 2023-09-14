import { Router } from "express";
import { login, logout, profile, register } from "../controllers";
import { authRequired } from "../middlewares";
import { validateSchema } from "../middlewares";
import { registerSchema, loginSchema } from "../schemas";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;
